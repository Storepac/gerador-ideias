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
    let topicTitle: string;
    let topicCategory: string;
    let difficulty: string;
    let shortDescription: string;
    let productContext: string;

    try {
      const body = await readJsonBody(req);
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
Você é um editor de conteúdo técnico da TechForWeb. Transforme o tema em um roteiro curto, didático e confiável para Instagram/Reels de 60 a 90 segundos.

TEMA: ${topicTitle}
CATEGORIA: ${topicCategory}
NÍVEL: ${difficulty}
CONTEXTO: ${shortDescription}
${productContext ? `CONTEXTO DE PRODUTO/NEGÓCIO DO USUÁRIO: ${productContext}` : ""}

Regras obrigatórias:
- português do Brasil;
- tom claro, profissional, humano e direto;
- sem linguagem de guru, promessa exagerada ou jargão desnecessário;
- roteiro falado de aproximadamente 130 a 190 palavras;
- explique uma ideia central, um exemplo e uma aplicação prática;
- não invente estatísticas, pesquisas, datas, empresas ou resultados;
- quando um caso real exigir confirmação factual, coloque-o no bloco de verificação;
- seja conciso para evitar texto desnecessário.

Use exatamente esta estrutura em Markdown:
### Gancho
### Roteiro 60–90s
### Fechamento
### Legenda
### 3 títulos
### O que conferir antes de publicar
`;

    try {
      const response = await ai.models.generateContent({
        model: AI_MODEL,
        contents: prompt,
        config: {
          maxOutputTokens: 1000,
          thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
        },
      });

      logAiUsage("content-script", response, reservation.remaining);
      return applyAiQuota(
        NextResponse.json({
          script: response.text || "Não foi possível gerar o roteiro no momento.",
          quota: { remaining: reservation.remaining, limit: reservation.dailyLimit },
        }),
        reservation,
      );
    } catch (error: unknown) {
      console.error("[ai-provider-error]", {
        feature: "content-script",
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
