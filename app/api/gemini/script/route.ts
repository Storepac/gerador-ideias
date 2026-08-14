import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { checkAiRateLimit, readOptionalText, readRequiredText } from "@/lib/ai-guard";

export async function POST(req: NextRequest) {
  try {
    const rateLimit = checkAiRateLimit(req, { limit: 8, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Muitas gerações em pouco tempo. Tente novamente em alguns minutos." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        },
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
      return NextResponse.json(
        { error: "A IA ainda não foi configurada neste ambiente." },
        { status: 503 },
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
Você é um editor de conteúdo técnico da TechForWeb. Sua função é transformar um tema de estudo em um roteiro curto, didático e confiável para Instagram/Reels de 60 a 90 segundos.

TEMA: ${topicTitle}
CATEGORIA: ${topicCategory}
NÍVEL: ${difficulty}
CONTEXTO: ${shortDescription}
${productContext ? `CONTEXTO DE PRODUTO/NEGÓCIO DO USUÁRIO: ${productContext}` : ""}

Regras obrigatórias:
- escreva em português do Brasil;
- tom claro, profissional, humano e direto;
- não use linguagem de guru, promessa exagerada ou jargão desnecessário;
- o roteiro falado deve ter aproximadamente 130 a 190 palavras;
- explique uma ideia central, um exemplo e uma aplicação prática;
- não invente estatísticas, pesquisas, datas, empresas ou resultados;
- quando um caso real exigir confirmação factual, coloque-o no bloco de verificação em vez de apresentar como fato;
- o objetivo é ajudar alguém a aprender e depois explicar o tema com as próprias palavras.

Use exatamente esta estrutura em Markdown:

### Gancho
Uma abertura de 1 ou 2 frases que gere curiosidade sem clickbait enganoso.

### Roteiro 60–90s
Texto corrido, natural para falar olhando para a câmera. Comece do problema, explique o conceito, dê um exemplo simples e termine com uma aplicação prática.

### Fechamento
Uma frase curta para encerrar o vídeo e estimular reflexão, comentário ou salvamento.

### Legenda
Uma legenda curta que complemente o vídeo, sem repetir o roteiro inteiro.

### 3 títulos
Três opções de título curtas e específicas.

### O que conferir antes de publicar
Liste qualquer afirmação factual, exemplo real ou referência que mereça checagem externa. Se não houver nada relevante, escreva: "Nenhuma checagem factual adicional necessária para este roteiro conceitual."
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: { temperature: 0.55 },
    });

    return NextResponse.json({
      script: response.text || "Não foi possível gerar o roteiro no momento.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao gerar roteiro.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
