import type { GrowthTopic } from './growthTopics';

/**
 * Precificação e alfabetização em métricas.
 *
 * O acervo tinha três temas de monetização, todos de nível avançado e todos
 * partindo do pressuposto de que a pessoa já sabe ler um CAC. Faltava a base:
 * como se forma um preço, o que cada sigla quer dizer e quando o cliente se
 * paga.
 *
 * A sigla continua em inglês, porque é de onde ela vem e é assim que aparece
 * em qualquer ferramenta. O que muda é a régua: o exemplo é de loja
 * brasileira, com maquininha, parcelamento, Pix, frete e imposto, não de SaaS
 * americano com trial de 14 dias.
 */
export const PRICING_METRICS_TOPICS: GrowthTopic[] = [
  {
    id: 'mon-04',
    title: 'Como formar preço: custo, valor percebido e concorrência',
    category: 'monetization',
    categoryLabel: 'Monetização & Pricing',
    difficulty: 'Iniciante',
    shortDescription:
      'As três âncoras que definem um preço e por que a mais comum no Brasil, custo mais uma porcentagem, é também a que mais aperta a margem quando o custo sobe.',
    keyQuestions: [
      'Você sabe quanto custa entregar uma unidade, já contando maquininha, frete, imposto e troca?',
      'Seu preço reflete o valor que o cliente enxerga ou só o seu custo com uma porcentagem em cima?',
      'Se o preço subisse 10 por cento, quantos clientes você perderia de verdade, e a margem total subiria ou cairia?',
    ],
    tags: ['Pricing', 'Margem', 'Value-Based Pricing', 'Custo'],
    suggestedFramework: 'Cost-Plus, Value-Based e Competition-Based Pricing',
    realWorldExample:
      'O Sebrae publica um roteiro de formação de preço de venda que parte do custo, do imposto e da comissão, útil como piso de decisão antes de discutir valor percebido.',
  },
  {
    id: 'mon-05',
    title: 'Margem de contribuição e ponto de equilíbrio: o preço que paga a conta',
    category: 'monetization',
    categoryLabel: 'Monetização & Pricing',
    difficulty: 'Iniciante',
    shortDescription:
      'O que sobra de cada venda depois do custo variável, quantas vendas fecham a conta do mês e por que faturamento alto convive com caixa no vermelho.',
    keyQuestions: [
      'Qual é a margem de contribuição de cada produto, e não a média da loja inteira?',
      'Quantas vendas por mês cobrem o custo fixo antes de qualquer lucro?',
      'Qual produto vende muito, aparece bem no relatório e mesmo assim contribui pouco?',
    ],
    tags: ['Margem de Contribuição', 'Break-Even', 'Custo Fixo', 'Unit Economics'],
    suggestedFramework: 'Margem de Contribuição e Ponto de Equilíbrio',
    realWorldExample:
      'Uma loja com faturamento crescente e caixa apertado costuma estar vendendo bem o item de menor margem, situação que só aparece quando a conta é feita por produto.',
  },
  {
    id: 'mon-06',
    title: 'LTV, CAC e payback: quando o cliente se paga',
    category: 'monetization',
    categoryLabel: 'Monetização & Pricing',
    difficulty: 'Intermediário',
    shortDescription:
      'Quanto custa conquistar um cliente, quanto ele deixa ao longo da relação e em quantos meses ele devolve o que custou. O trio que decide se dá para acelerar o investimento.',
    keyQuestions: [
      'Seu CAC inclui só a mídia ou também o time, a ferramenta e a comissão de venda?',
      'Seu LTV usa receita ou margem? Com receita, o número engana e a conta parece melhor do que é.',
      'Em quantos meses o cliente devolve o CAC, e o seu caixa aguenta esperar esse tempo?',
    ],
    tags: ['LTV', 'CAC', 'Payback', 'Unit Economics'],
    suggestedFramework: 'LTV sobre CAC e CAC Payback Period',
    realWorldExample:
      'A regra de bolso de LTV/CAC igual a três vem do mercado de SaaS americano. Ela serve de referência, não de meta, e muda bastante em operação com estoque e frete.',
  },
  {
    id: 'mon-07',
    title: 'Desconto, âncora de preço e o custo escondido da promoção',
    category: 'monetization',
    categoryLabel: 'Monetização & Pricing',
    difficulty: 'Intermediário',
    shortDescription:
      'Por que um desconto de 10 por cento pode consumir metade do lucro, como a âncora muda a percepção de caro e barato, e quando a promoção só antecipa uma venda que já viria.',
    keyQuestions: [
      'Quantos por cento da margem, e não do preço, esse desconto está consumindo?',
      'A promoção trouxe cliente novo ou só adiantou a compra de quem já viria?',
      'Seu preço cheio aparece em algum lugar para servir de âncora, ou o cliente só conhece o preço promocional?',
    ],
    tags: ['Desconto', 'Ancoragem', 'Promoção', 'Margem'],
    suggestedFramework: 'Efeito de Ancoragem e Impacto do Desconto na Margem',
    realWorldExample:
      'Em um produto com 20 por cento de margem, um desconto de 10 por cento no preço leva metade do lucro da venda. A conta é a mesma em qualquer setor e quase nunca é feita antes da campanha.',
  },
  {
    id: 'mon-08',
    title: 'Reajuste de preço sem perder o cliente',
    category: 'monetization',
    categoryLabel: 'Monetização & Pricing',
    difficulty: 'Avançado',
    shortDescription:
      'Como preparar, comunicar e escalonar um aumento de preço, quem deve ser poupado, e como medir o efeito real em cancelamento e receita em vez de reagir ao barulho.',
    keyQuestions: [
      'O que mudou no valor entregue desde o último preço, e isso está visível para o cliente?',
      'O aumento vale para a base inteira ou só para quem entrar a partir de agora?',
      'Qual é o limite de cancelamento que você aceita antes de recuar?',
    ],
    tags: ['Price Increase', 'Retenção', 'Comunicação', 'Receita'],
    suggestedFramework: 'Grandfathering, Aviso Prévio e Medição de Churn Pós-Reajuste',
  },
  {
    id: 'data-06',
    title: 'Dicionário de siglas: CAC, LTV, ARPU, MRR, ROAS, CPA, CTR, CVR',
    category: 'experimentation',
    categoryLabel: 'Analytics & Métricas',
    difficulty: 'Iniciante',
    shortDescription:
      'O que cada sigla mede de fato, qual pergunta ela responde, com qual ela é confundida e quando ela engana. A tradução do vocabulário que aparece em toda ferramenta e em todo relatório.',
    keyQuestions: [
      'Você sabe dizer, sem consultar, a diferença entre CPA e CAC, e entre ROAS e ROI?',
      'Quais dessas siglas o seu negócio realmente acompanha hoje, e qual decisão cada uma mudou no último mês?',
      'Alguma delas está sendo usada como métrica de vaidade, bonita no slide e inútil na decisão?',
    ],
    tags: ['Métricas', 'KPI', 'Glossário', 'Analytics'],
    suggestedFramework: 'Métrica Primária, Métricas de Diagnóstico e Guardrails',
    realWorldExample:
      'CPA e CAC são tratados como sinônimos com frequência. CPA é o custo por ação dentro da campanha, CAC é o custo de conquistar um cliente pagante contando todo o investimento comercial.',
  },
];
