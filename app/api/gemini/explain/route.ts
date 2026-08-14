import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import {
  AI_MODEL,
  AiReservation,
  applyAiQuota,
  logAiUsage,
  readJsonBody,
  readOptionalText,
  readRequiredText,
  releaseAiRequest,
  reserveAiRequest,
} from "@/lib/ai-guard";

export async function POST(req: NextRequest) {
  const guard = reserveAiRequest(req);
  if (!guard.ok) return guard.response;

  const reservation: AiReservation = guard.reservation;

  try {
    let body: Record<string, unknown>;
    let topicTitle: string;
    let topicCategory: string;
    let difficulty: string;
    let shortDescription: string;
    let productContext: string;

    try {
      body = await readJsonBody(req);
      topicTitle = readRequiredText(body.topicTitle, "Tema", 220);
      topicCategory = readRequiredText(body.topicCategory, "Categoria", 120);
      difficulty = readRequiredText(body.difficulty, "Nível", 40);
      shortDescription = readRequiredText(body.shortDescription, "Descrição", 600);
      productContext = readOptionalText(body.productContext, 1000);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Solicitação inválida.";
      return applyAiQuota(NextResponse.json({ error: message }, { status: 400 }), reservation);
    }

    const ai = new GoogleGenAI({ apiKey: reservation.apiKey });
    const prompt = `
Você é um mentor de Growth Product Management da TechForWeb. Crie um guia de estudo claro, prático e crítico em português do Brasil.

TEMA: ${topicTitle}
CATEGORIA: ${topicCategory}
NÍVEL: ${difficulty}
DESCRIÇÃO: ${shortDescription}
${productContext ? `CONTEXTO DO USUÁRIO: ${productContext}` : ""}

Regras:
- explique sem jargão vazio;
- seja conciso: cada seção deve priorizar o que realmente ajuda a entender e aplicar;
- diferencie conceito, métrica e aplicação;
- não invente números, pesquisas ou resultados empresariais;
- se citar um caso real que precise de confirmação externa, sinalize isso claramente;
- priorize entendimento e aplicação, não memorização.

Use estas seções em Markdown:
### 1. Conceito central
### 2. Por que isso importa
### 3. Métricas de entrada e saída
### 4. Como aplicar em 4 passos
### 5. Exemplo prático
### 6. Hipótese de experimento
### 7. Perguntas para pensar
### 8. Leituras e referências
### 9. O que vale conferir em fontes externas
`;

    try {
      const response = await ai.models.generateContent({
        model: AI_MODEL,
        contents: prompt,
        config: {
          maxOutputTokens: 1600,
          thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
        },
      });

      logAiUsage("guide", response, reservation.remaining);
      return applyAiQuota(
        NextResponse.json({
          explanation: response.text || "Não foi possível gerar a explicação no momento.",
          quota: { remaining: reservation.remaining, limit: reservation.dailyLimit },
        }),
        reservation,
      );
    } catch (error: unknown) {
      console.error("[ai-provider-error]", {
        feature: "guide",
        name: error instanceof Error ? error.name : "UnknownError",
      });
      return applyAiQuota(
        NextResponse.json({ error: "O provedor de IA não respondeu corretamente. Tente novamente mais tarde." }, { status: 502 }),
        reservation,
      );
    }
  } finally {
    releaseAiRequest(reservation);
  }
}
