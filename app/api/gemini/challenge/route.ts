import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { action, topicTitle, category, userSolution, challengePrompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "A chave GEMINI_API_KEY não foi configurada nas variáveis de ambiente." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    if (action === "generate") {
      const prompt = `
Você é um VP de Growth realizando um teste prático de avaliação de habilidades com um candidato a Senior Growth Product Manager.
Com base no tema de estudo: "${topicTitle}" (Categoria: ${category}).

Crie um DESAFIO DE CASO PRÁTICO REALISTA (Simulação de Dilema de Produto) em Português.

Sua resposta deve conter em Markdown:
1. **Contexto da Empresa**: Um produto fictício realista (ex: SaaS B2B, App B2C de Finanças, E-commerce PLG ou EdTech).
2. **O Problema/Gargalo**: Uma queda de métrica repentina ou uma oportunidade não explorada relacionada ao tema "${topicTitle}".
3. **Seu Desafio como Growth PM**: 3 perguntas/tarefas específicas que o candidato precisa responder (ex: como diagnosticar, quais métricas olhar primeiro, e qual experimento propor).
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: { temperature: 0.8 },
      });

      return NextResponse.json({ challenge: response.text || "Desafio não gerado." });
    } else if (action === "evaluate") {
      const prompt = `
Você é um Diretor de Growth PM avaliando a resposta de um Product Manager para o seguinte desafio prático:

**DESAFIO ORIGINAL:**
${challengePrompt}

**RESPOSTA/SOLUÇÃO DO GROWTH PM:**
"${userSolution}"

Por favor, forneça um feedback estruturado e construtivo em Português (Brasil) contendo:
1. **Pontos Fortes da Resposta** (Raciocínio orientado a dados, clareza de métricas, foco em usuário).
2. **Gargalos ou Pontos Cegos** (O que faltou considerar? Riscos não mencionados?).
3. **Nota de Avaliação (1 a 10)** com justificativa de Senioridade (Iniciante, Pleno, Sênior, Staff).
4. **Como um VP de Growth resolveria este dilema** (Dica de ouro de senioridade).
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: { temperature: 0.7 },
      });

      return NextResponse.json({ evaluation: response.text || "Feedback não gerado." });
    }

    return NextResponse.json({ error: "Ação inválida especificada." }, { status: 400 });
  } catch (error: unknown) {
    console.error("Erro na rota /api/gemini/challenge:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro interno ao conectar com Gemini.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
