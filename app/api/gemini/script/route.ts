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
    let audience: string;

    try {
      const body = await readJsonBody(req);
      topicTitle = readRequiredText(body.topicTitle, "Tema", 220);
      topicCategory = readRequiredText(body.topicCategory, "Categoria", 120);
      difficulty = readRequiredText(body.difficulty, "Nível", 40);
      shortDescription = readRequiredText(body.shortDescription, "Descrição", 600);
      productContext = readOptionalText(body.productContext, 1000);
      audience = readOptionalText(body.audience, 20) === "peers" ? "peers" : "owner";
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Solicitação inválida.";
      return applyAiQuota(NextResponse.json({ error: message }, { status: 400 }), reservation);
    }

    const ai = new GoogleGenAI({ apiKey: reservation.apiKey });

    const audienceBrief =
      audience === "peers"
        ? `PÚBLICO: gente que já trabalha com produto, growth e marketing.
- pode usar o vocabulário da área sem parar para explicar;
- vá fundo no mecanismo, no trade-off e no que costuma dar errado;
- não transforme o roteiro em aula introdutória.`
        : `PÚBLICO: dono de negócio, gestor e time de operação, gente que não vive de vocabulário de produto.
- escreva como quem explica para um amigo que toca uma loja ou uma empresa pequena;
- não abra o roteiro com jargão: roadmap, backlog, churn, onboarding, discovery, PLG, funil, ICP;
- se o termo for mesmo necessário, explique a ideia em palavras simples primeiro e só depois dê o nome dele, uma vez ("a lista do que a gente vai construir nos próximos meses, o tal do roadmap");
- prefira exemplos de rotina real: pedido, estoque, margem, cliente que some, planilha, WhatsApp;
- mantenha a profundidade da ideia, o que muda é a palavra, não o conteúdo.`;

    const prompt = `
Você é um editor de conteúdo técnico da TechForWeb. Transforme o tema em um roteiro curto, didático e confiável para Instagram/Reels de 60 a 90 segundos.

TEMA: ${topicTitle}
CATEGORIA: ${topicCategory}
NÍVEL: ${difficulty}
CONTEXTO: ${shortDescription}
${productContext ? `CONTEXTO DE PRODUTO/NEGÓCIO DO USUÁRIO: ${productContext}` : ""}

${audienceBrief}

Regras obrigatórias:
- português do Brasil;
- tom claro, profissional, humano e direto;
- sem linguagem de guru, promessa exagerada ou jargão desnecessário;
- o gancho precisa funcionar para quem não conhece o assunto: nada de termo técnico na primeira frase;
- roteiro falado de aproximadamente 130 a 190 palavras;
- explique uma ideia central, um exemplo e uma aplicação prática;
- não invente estatísticas, pesquisas, datas, empresas ou resultados;
- o público é brasileiro: use exemplo daqui, com maquininha, parcelamento, Pix, frete, imposto e marketplace quando couber, nunca o cenário americano por padrão;
- termo técnico em inglês pode ficar, porque é como ele aparece nas ferramentas, desde que venha explicado;
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
