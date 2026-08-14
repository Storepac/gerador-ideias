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
    let action: string;
    let topicTitle: string;
    let category: string;
    let userSolution: string;
    let challengePrompt: string;

    try {
      const body = await readJsonBody(req);
      action = readRequiredText(body.action, "Ação", 20);
      topicTitle = readRequiredText(body.topicTitle, "Tema", 220);
      category = readRequiredText(body.category, "Categoria", 120);
      userSolution = readOptionalText(body.userSolution, 3000);
      challengePrompt = readOptionalText(body.challengePrompt, 4000);

      if (action !== "generate" && action !== "evaluate") {
        throw new Error("Ação inválida.");
      }
      if (action === "evaluate" && (!userSolution || !challengePrompt)) {
        throw new Error("Desafio e resposta são obrigatórios para avaliação.");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Solicitação inválida.";
      return applyAiQuota(NextResponse.json({ error: message }, { status: 400 }), reservation);
    }

    const ai = new GoogleGenAI({ apiKey: reservation.apiKey });

    try {
      if (action === "generate") {
        const prompt = `
Crie um desafio fictício e conciso de Growth Product Management em português do Brasil para praticar o tema "${topicTitle}" da categoria "${category}".

Estrutura:
### Contexto fictício
### Problema
### Dados disponíveis
### Seu desafio
Inclua 3 perguntas: diagnóstico, métricas e experimento.

Não use empresas reais nem apresente números como dados verdadeiros. O caso deve ser explicitamente fictício, plausível e direto.
`;
        const response = await ai.models.generateContent({
          model: AI_MODEL,
          contents: prompt,
          config: {
            maxOutputTokens: 800,
            thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
          },
        });
        logAiUsage("challenge-generate", response, reservation.remaining);
        return applyAiQuota(
          NextResponse.json({
            challenge: response.text || "Desafio não gerado.",
            quota: { remaining: reservation.remaining, limit: reservation.dailyLimit },
          }),
          reservation,
        );
      }

      const prompt = `
Avalie de forma construtiva e concisa a resposta abaixo para um exercício fictício de Growth Product Management.

TEMA: ${topicTitle}
CATEGORIA: ${category}

DESAFIO:
${challengePrompt}

RESPOSTA:
${userSolution}

Use:
### Pontos fortes
### Pontos cegos
### Qualidade do raciocínio
### Próximo passo para melhorar
### Uma solução possível

Evite ranking absoluto de senioridade. Avalie apenas o raciocínio demonstrado nesta resposta.
`;
      const response = await ai.models.generateContent({
        model: AI_MODEL,
        contents: prompt,
        config: {
          maxOutputTokens: 1100,
          thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
        },
      });
      logAiUsage("challenge-evaluate", response, reservation.remaining);
      return applyAiQuota(
        NextResponse.json({
          evaluation: response.text || "Feedback não gerado.",
          quota: { remaining: reservation.remaining, limit: reservation.dailyLimit },
        }),
        reservation,
      );
    } catch (error: unknown) {
      console.error("[ai-provider-error]", {
        feature: `challenge-${action}`,
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
