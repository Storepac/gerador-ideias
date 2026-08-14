import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { Buffer } from "node:buffer";
import { NextRequest, NextResponse } from "next/server";

export const AI_MODEL = "gemini-3.5-flash-lite";

const QUOTA_COOKIE = "t4w_ai_quota_v1";
const BURST_WINDOW_MS = 10 * 60 * 1000;
const BURST_LIMIT = 5;
const DEFAULT_DAILY_LIMIT = 3;
const DEFAULT_IP_DAILY_LIMIT = 12;
const MAX_BODY_BYTES = 16_000;

type Bucket = {
  count: number;
  resetAt: number;
};

type DailyBucket = {
  day: string;
  count: number;
};

type QuotaPayload = {
  v: 1;
  day: string;
  count: number;
};

export type AiReservation = {
  apiKey: string;
  clientIp: string;
  dailyLimit: number;
  remaining: number;
  resetAt: number;
  quotaCookie: string;
};

export type AiGuardResult =
  | { ok: true; reservation: AiReservation }
  | { ok: false; response: NextResponse };

type UsageMetadataLike = {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
  thoughtsTokenCount?: number;
  totalTokenCount?: number;
};

const burstBuckets = new Map<string, Bucket>();
const ipDailyBuckets = new Map<string, DailyBucket>();
const inFlightByIp = new Map<string, number>();

function boundedInteger(value: string | undefined, fallback: number, min: number, max: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function currentUtcDay() {
  return new Date().toISOString().slice(0, 10);
}

function nextUtcMidnight() {
  const now = new Date();
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
}

function secondsUntil(timestamp: number) {
  return Math.max(1, Math.ceil((timestamp - Date.now()) / 1000));
}

function clientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function requestHost(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim().toLowerCase() ||
    request.headers.get("host")?.trim().toLowerCase() ||
    ""
  );
}

function originIsAllowed(request: NextRequest) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) {
    return fetchSite === "same-origin" || fetchSite === "same-site";
  }

  try {
    return new URL(origin).host.toLowerCase() === requestHost(request);
  } catch {
    return false;
  }
}

function signingKey(apiKey: string) {
  return createHash("sha256").update(`techforweb-ai-quota:v1:${apiKey}`).digest();
}

function signPayload(encodedPayload: string, apiKey: string) {
  return createHmac("sha256", signingKey(apiKey)).update(encodedPayload).digest("base64url");
}

function encodeQuota(payload: QuotaPayload, apiKey: string) {
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${encoded}.${signPayload(encoded, apiKey)}`;
}

function readQuota(request: NextRequest, apiKey: string): QuotaPayload {
  const fallback: QuotaPayload = { v: 1, day: currentUtcDay(), count: 0 };
  const raw = request.cookies.get(QUOTA_COOKIE)?.value;
  if (!raw) return fallback;

  const [encoded, signature] = raw.split(".");
  if (!encoded || !signature) return fallback;

  const expected = signPayload(encoded, apiKey);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as Partial<QuotaPayload>;
    if (parsed.v !== 1 || parsed.day !== currentUtcDay() || !Number.isInteger(parsed.count) || Number(parsed.count) < 0) {
      return fallback;
    }
    return { v: 1, day: parsed.day, count: Number(parsed.count) };
  } catch {
    return fallback;
  }
}

function quotaHeaders(limit: number, remaining: number, resetAt: number) {
  return {
    "X-AI-Daily-Limit": String(limit),
    "X-AI-Daily-Remaining": String(Math.max(0, remaining)),
    "X-AI-Quota-Reset": new Date(resetAt).toISOString(),
    "Cache-Control": "no-store",
  };
}

function jsonError(message: string, status: number, options?: { retryAfter?: number; limit?: number; remaining?: number; resetAt?: number }) {
  const headers: Record<string, string> = { "Cache-Control": "no-store" };
  if (options?.retryAfter) headers["Retry-After"] = String(options.retryAfter);
  if (options?.limit !== undefined && options.resetAt !== undefined) {
    Object.assign(headers, quotaHeaders(options.limit, options.remaining ?? 0, options.resetAt));
  }
  return NextResponse.json({ error: message }, { status, headers });
}

export async function readJsonBody(request: NextRequest, maxBytes = MAX_BODY_BYTES) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error("Content-Type inválido.");
  }

  const declaredLength = Number.parseInt(request.headers.get("content-length") || "0", 10);
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new Error("Solicitação excede o tamanho permitido.");
  }

  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > maxBytes) {
    throw new Error("Solicitação excede o tamanho permitido.");
  }

  const parsed = JSON.parse(raw) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Corpo da solicitação inválido.");
  }
  return parsed as Record<string, unknown>;
}

export function reserveAiRequest(request: NextRequest): AiGuardResult {
  if (!originIsAllowed(request)) {
    return { ok: false, response: jsonError("Origem da solicitação não permitida.", 403) };
  }

  if (process.env.AI_ENABLED === "false") {
    return { ok: false, response: jsonError("Os recursos de IA estão temporariamente pausados.", 503) };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { ok: false, response: jsonError("A IA ainda não foi configurada neste ambiente.", 503) };
  }

  const now = Date.now();
  const ip = clientIp(request);
  const resetAt = nextUtcMidnight();
  const dailyLimit = boundedInteger(process.env.AI_DAILY_LIMIT, DEFAULT_DAILY_LIMIT, 1, 10);
  const ipDailyLimit = boundedInteger(process.env.AI_IP_DAILY_LIMIT, DEFAULT_IP_DAILY_LIMIT, dailyLimit, 100);

  const burst = burstBuckets.get(ip);
  if (!burst || burst.resetAt <= now) {
    burstBuckets.set(ip, { count: 1, resetAt: now + BURST_WINDOW_MS });
  } else if (burst.count >= BURST_LIMIT) {
    return {
      ok: false,
      response: jsonError("Muitas solicitações de IA em pouco tempo. Tente novamente mais tarde.", 429, {
        retryAfter: secondsUntil(burst.resetAt),
      }),
    };
  } else {
    burst.count += 1;
    burstBuckets.set(ip, burst);
  }

  const day = currentUtcDay();
  const ipDaily = ipDailyBuckets.get(ip);
  if (!ipDaily || ipDaily.day !== day) {
    ipDailyBuckets.set(ip, { day, count: 1 });
  } else if (ipDaily.count >= ipDailyLimit) {
    return {
      ok: false,
      response: jsonError("O limite de IA deste acesso foi atingido por hoje.", 429, {
        retryAfter: secondsUntil(resetAt),
      }),
    };
  } else {
    ipDaily.count += 1;
    ipDailyBuckets.set(ip, ipDaily);
  }

  const quota = readQuota(request, apiKey);
  if (quota.count >= dailyLimit) {
    return {
      ok: false,
      response: jsonError("Você já usou as gerações de IA disponíveis hoje. Tente novamente amanhã.", 429, {
        retryAfter: secondsUntil(resetAt),
        limit: dailyLimit,
        remaining: 0,
        resetAt,
      }),
    };
  }

  const inFlight = inFlightByIp.get(ip) ?? 0;
  if (inFlight >= 1) {
    return {
      ok: false,
      response: jsonError("Já existe uma geração de IA em andamento para este acesso.", 429, { retryAfter: 5 }),
    };
  }
  inFlightByIp.set(ip, inFlight + 1);

  const nextCount = quota.count + 1;
  return {
    ok: true,
    reservation: {
      apiKey,
      clientIp: ip,
      dailyLimit,
      remaining: Math.max(0, dailyLimit - nextCount),
      resetAt,
      quotaCookie: encodeQuota({ v: 1, day, count: nextCount }, apiKey),
    },
  };
}

export function releaseAiRequest(reservation: AiReservation) {
  const current = inFlightByIp.get(reservation.clientIp) ?? 0;
  if (current <= 1) inFlightByIp.delete(reservation.clientIp);
  else inFlightByIp.set(reservation.clientIp, current - 1);
}

export function applyAiQuota(response: NextResponse, reservation: AiReservation) {
  response.cookies.set(QUOTA_COOKIE, reservation.quotaCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: secondsUntil(reservation.resetAt),
  });
  const headers = quotaHeaders(reservation.dailyLimit, reservation.remaining, reservation.resetAt);
  Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
  return response;
}

export function readRequiredText(value: unknown, field: string, maxLength = 240) {
  if (typeof value !== "string") throw new Error(`${field} inválido.`);
  const normalized = value.trim();
  if (!normalized) throw new Error(`${field} é obrigatório.`);
  if (normalized.length > maxLength) throw new Error(`${field} excede o limite de ${maxLength} caracteres.`);
  return normalized;
}

export function readOptionalText(value: unknown, maxLength = 1200) {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value !== "string") throw new Error("Campo de texto inválido.");
  const normalized = value.trim();
  if (normalized.length > maxLength) throw new Error(`Campo de texto excede o limite de ${maxLength} caracteres.`);
  return normalized;
}

export function logAiUsage(feature: string, response: { usageMetadata?: UsageMetadataLike }, remaining: number) {
  const usage = response.usageMetadata;
  console.info("[ai-usage]", {
    feature,
    model: AI_MODEL,
    promptTokens: usage?.promptTokenCount ?? null,
    outputTokens: usage?.candidatesTokenCount ?? null,
    thinkingTokens: usage?.thoughtsTokenCount ?? null,
    totalTokens: usage?.totalTokenCount ?? null,
    dailyRemaining: remaining,
  });
}
