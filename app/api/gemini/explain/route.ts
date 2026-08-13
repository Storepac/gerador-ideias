import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topicTitle, topicCategory, difficulty, shortDescription, productContext } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "A chave GEMINI_API_KEY não foi configurada nas variáveis de ambiente do servidor." },
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

    const prompt = `
Você é um líder mundial especialista em Growth Product Management (Senior Director of Growth em empresas como Reforge, Duolingo, Slack, Stripe e Notion).
Sua missão é criar um GUIA COMPLETO DE ESTUDO E APROFUNDAMENTO SEMANAL para um Growth PM sobre o seguinte tema:

📌 TEMA: "${topicTitle}"
📂 CATEGORIA: ${topicCategory}
📈 NÍVEL: ${difficulty}
📝 DESCRIÇÃO BÁSICA: ${shortDescription}
${productContext ? `🏢 CONTEXTO DO PRODUTO ATUAL DO PM: ${productContext}` : ''}

Por favor, forneça um guia altamente estruturado, prático, profundo e direto ao ponto, em PORTUGUÊS (Brasil).
Formate a resposta em Markdown bem estruturado utilizando exatamente estas seções:

### 1. 🎯 Conceito Central & Importância Estratégica
Explique o conceito em detalhes, eliminando jargões vazios. Por que este conceito é vital para o crescimento sustentável do produto? Qual o erro comum que Product Managers cometem ao tentar aplicá-lo?

### 2. 📊 Métricas Chave (Input vs Output Metrics)
- **Output Metric (Métrica de Saída/Resultado Final):** Qual indicador de alto nível esta alavanca move?
- **Input Metrics (Métricas de Entrada/Operacionais):** Quais 2 a 3 métricas diárias/semanais que o squad pode manipular diretamente para mover o indicador final?

### 3. 🛠️ Framework de Aplicação Prática (Passo a Passo)
Um guia acionável em 4 ou 5 passos claros de como implementar ou analisar este conceito no dia a dia do produto.

### 4. 💡 Estudo de Caso Real do Mercado
Apresente um exemplo real e conciso (ex: Spotify, Duolingo, Notion, Nubank, Airbnb, Canva ou Slack) demonstrando como essa estratégia foi aplicada na prática com sucesso e métricas impactadas.

### 5. 🧪 Hipótese de Experimento para Esta Semana
Formule uma hipótese de experimento completa no formato clássico de Growth PM:
- **Se nós [Alteração/Inovação]**
- **Para [Público-Alvo/Coorte]**
- **Nós veremos [Impacto Esperado em Métrica X]**
- **Porque [Justificativa Comportamental/Psicológica]**

### 6. ❓ 3 Perguntas Provocativas para sua Reunião de Growth
Perguntas profundas que o Growth PM deve fazer ao seu time de produto, dados e engenharia esta semana para descobrir oportunidades escondidas.

### 7. 📚 Leitura & Leituras Recomendadas
Mencione livros clássicos, artigos ou autores referência no assunto (ex: Reforge, Andrew Chen, Elena Verna, Brian Balfour, Casey Winters, Nir Eyal, Cialdini, Sean Ellis).
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    const explanation = response.text || "Não foi possível gerar a explicação no momento.";

    return NextResponse.json({ explanation });
  } catch (error: unknown) {
    console.error("Erro na rota /api/gemini/explain:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao processar com Gemini.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
