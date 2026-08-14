import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { checkAiRateLimit, readOptionalText, readRequiredText } from "@/lib/ai-guard";

export async function POST(req: NextRequest) {
  try {
    const rateLimit = checkAiRateLimit(req, { limit: 10, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Muitas gerações em pouco tempo. Tente novamente em alguns minutos." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const body = await req.json();
    const action = readRequiredText(body.action, "Ação", 20);
    const topicTitle = readRequiredText(body.topicTitle, "Tema", 220);
    const category = readRequiredText(body.category, "Categoria", 120);
    const userSolution = readOptionalText(body.userSolution, 5000);
    const challengePrompt = readOptionalText(body.challengePrompt, 6000);

    if (action !== "generate" && action !== "evaluate") {
      return NextResponse.json({ error: "Ação inválida." }, { status: 400 });
    }

    if (action === "evaluate" && (!userSolution || !challengePrompt)) {
      return NextResponse.json({ error: "Desafio e resposta são obrigatórios para avaliação." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "A IA ainda não foi configurada neste ambiente." }, { status: 503 });
    }

    const ai = new GoogleGenAI({ apiKey });

    if (action === "generate") {
      const prompt = `
Crie um desafio fictício de Growth Product Management em português do Brasil para praticar o tema "${topicTitle}" da categoria "${category}".

Estrutura:
### Contexto fictício
### Problema
### Dados disponíveis
### Seu desafio
Inclua 3 perguntas: diagnóstico, métricas e experimento.

Não use empresas reais nem apresente números como dados verdadeiros. O caso deve ser explicitamente fictício e plausível.
`;
      const response = await ai.models.generateContent({ model: "gemini-3.6-flash", contents: prompt, config: { temperature: 0.7 } });
      return NextResponse.json({ challenge: response.text || "Desafio não gerado." });
    }

    const prompt = `
Avalie de forma construtiva a resposta abaixo para um exercício fictício de Growth Product Management.

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

Evite transformar a avaliação em um ranking absoluto de senioridade. Avalie o raciocínio demonstrado nesta resposta específica.
`;
    const response = await ai.models.generateContent({ model: "gemini-3.6-flash", contents: prompt, config: { temperature: 0.55 } });
    return NextResponse.json({ evaluation: response.text || "Feedback não gerado." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao processar a solicitação.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
