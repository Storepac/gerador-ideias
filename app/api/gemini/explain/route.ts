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
import { formatReferencesForPrompt } from "@/lib/topicReferences";

export async function POST(req: NextRequest) {
  const guard = reserveAiRequest(req);
  if (!guard.ok) return guard.response;

  const reservation: AiReservation = guard.reservation;

  try {
    let body: Record<string, unknown>;
    let topicId: string;
    let topicTitle: string;
    let topicCategory: string;
    let difficulty: string;
    let shortDescription: string;
    let productContext: string;

    try {
      body = await readJsonBody(req);
      topicId = readOptionalText(body.topicId, 60);
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
    const fontes = formatReferencesForPrompt(topicId);
    const prompt = `
Você é um mentor de Growth Product Management da TechForWeb. Crie um guia de estudo claro, prático e crítico em português do Brasil.

TEMA: ${topicTitle}
CATEGORIA: ${topicCategory}
NÍVEL: ${difficulty}
DESCRIÇÃO: ${shortDescription}
${productContext ? `CONTEXTO DO USUÁRIO: ${productContext}` : ""}

${
  fontes
    ? `FONTES VERIFICADAS (a seção 8 usa apenas estas, e nenhuma outra):
${fontes}`
    : "Não há fontes verificadas para este tema. Na seção 8, diga isso e sugira que tipo de fonte procurar, sem citar títulos ou links específicos."
}

Regras:
- explique sem jargão vazio;
- seja conciso: cada seção deve priorizar o que realmente ajuda a entender e aplicar;
- diferencie conceito, métrica e aplicação;
- não invente números, pesquisas ou resultados empresariais;
- nunca invente título de livro, artigo, autor ou link: fora da lista acima, não existe;
- se citar um caso real que precise de confirmação externa, sinalize isso claramente;
- o leitor é brasileiro: traga o exemplo para a realidade daqui, com maquininha, parcelamento, Pix, frete, imposto e marketplace quando couber, em vez de assumir o cenário americano;
- mantenha o termo técnico em inglês, porque é como ele aparece nas ferramentas, mas explique o que ele significa na primeira vez que usar;
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
