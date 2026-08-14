import type { NextRequest } from "next/server";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function checkAiRateLimit(
  request: NextRequest,
  options: { limit?: number; windowMs?: number } = {},
) {
  const limit = options.limit ?? 10;
  const windowMs = options.windowMs ?? 10 * 60 * 1000;
  const now = Date.now();
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const key = `${clientIp}:${request.nextUrl.pathname}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  buckets.set(key, current);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function readRequiredText(value: unknown, field: string, maxLength = 240) {
  if (typeof value !== "string") {
    throw new Error(`${field} inválido.`);
  }

  const normalized = value.trim();
  if (!normalized) {
    throw new Error(`${field} é obrigatório.`);
  }

  if (normalized.length > maxLength) {
    throw new Error(`${field} excede o limite de ${maxLength} caracteres.`);
  }

  return normalized;
}

export function readOptionalText(value: unknown, maxLength = 1200) {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value !== "string") throw new Error("Campo de texto inválido.");

  const normalized = value.trim();
  if (normalized.length > maxLength) {
    throw new Error(`Campo de texto excede o limite de ${maxLength} caracteres.`);
  }

  return normalized;
}
