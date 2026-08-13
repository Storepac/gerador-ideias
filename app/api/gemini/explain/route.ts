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
    const topicTitle = readRequiredText(body.topicTitle, "Tema", 220);
    const topicCategory = readRequiredText(body.topicCategory, "Categoria", 120);
    const difficulty = readRequiredText(body.difficulty, "Nível", 40);
    const shortDescription = readRequiredText(body.shortDescription, "Descrição", 600);
    const productContext = readOptionalText(body.productContext, 1200);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "A IA ainda não foi configurada neste ambiente." }, { status: 503 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
Você é um mentor de Growth Product Management da TechForWeb. Crie um guia de estudo claro, prático e crítico em português do Brasil.

TEMA: ${topicTitle}
CATEGORIA: ${topicCategory}
NÍVEL: ${difficulty}
DESCRIÇÃO: ${shortDescription}
${productContext ? `CONTEXTO DO USUÁRIO: ${productContext}` : ""}

Regras:
- explique sem jargão vazio;
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

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: { temperature: 0.55 },
    });

    return NextResponse.json({ explanation: response.text || "Não foi possível gerar a explicação no momento." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao processar a solicitação.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
