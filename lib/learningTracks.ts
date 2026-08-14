import type { GrowthTopic } from './growthTopics';

export type LearningTrackId =
  | 'product-manager'
  | 'growth-pm'
  | 'ai-product'
  | 'data-metrics'
  | 'marketing-acquisition'
  | 'saas-monetization';

export interface LearningTrack {
  id: LearningTrackId;
  title: string;
  shortTitle: string;
  description: string;
  outcome: string;
  topicIds: string[];
  accent: string;
}

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: 'product-manager',
    title: 'Product Manager',
    shortTitle: 'Product Manager',
    description: 'Discovery, estratégia, priorização, roadmap, MVP, ativação e métricas para conduzir produto do problema ao aprendizado.',
    outcome: 'Aprenda a transformar evidências em decisões de produto e roadmaps orientados a outcomes.',
    topicIds: [
      'prod-01',
      'prod-02',
      'prod-06',
      'prod-04',
      'prod-05',
      'prod-03',
      'str-02',
      'act-01',
      'exp-01',
      'data-01',
    ],
    accent: 'border-blue-500/30 bg-blue-500/[0.07] text-blue-200',
  },
  {
    id: 'growth-pm',
    title: 'Growth Product Manager',
    shortTitle: 'Growth PM',
    description: 'Ativação, retenção, loops, PLG, experimentação e monetização para crescer a partir do comportamento real do produto.',
    outcome: 'Conecte produto e growth em um sistema de aquisição, ativação, retenção e receita.',
    topicIds: [
      'exp-01',
      'act-01',
      'act-03',
      'ret-01',
      'data-02',
      'data-03',
      'growth-01',
      'plg-01',
      'plg-02',
      'data-04',
      'mon-01',
      'ret-02',
    ],
    accent: 'border-cyan-500/30 bg-cyan-500/[0.07] text-cyan-200',
  },
  {
    id: 'ai-product',
    title: 'IA para Produto',
    shortTitle: 'IA para Produto',
    description: 'Discovery de casos de uso, arquitetura, evals, UX de confiança, agentes e unit economics para produtos com IA.',
    outcome: 'Saiba quando usar IA, como avaliar qualidade e como construir uma experiência sustentável e segura.',
    topicIds: [
      'ai-01',
      'prod-05',
      'ai-02',
      'ai-03',
      'ai-04',
      'ai-05',
      'data-04',
      'ai-06',
    ],
    accent: 'border-violet-500/30 bg-violet-500/[0.07] text-violet-200',
  },
  {
    id: 'data-metrics',
    title: 'Dados & Métricas',
    shortTitle: 'Dados & Métricas',
    description: 'Instrumentação, North Star, coortes, growth accounting, guardrails, experimentação e incrementalidade.',
    outcome: 'Construa uma base de métricas capaz de sustentar decisões de produto e growth sem depender de métricas de vaidade.',
    topicIds: [
      'data-01',
      'exp-01',
      'data-02',
      'ret-01',
      'data-03',
      'data-04',
      'exp-02',
      'data-05',
    ],
    accent: 'border-emerald-500/30 bg-emerald-500/[0.07] text-emerald-200',
  },
  {
    id: 'marketing-acquisition',
    title: 'Marketing & Aquisição',
    shortTitle: 'Marketing & Aquisição',
    description: 'Posicionamento, conteúdo, SEO, mídia paga, CRO, product marketing, vendas e mensuração de aquisição.',
    outcome: 'Organize aquisição como sistema: mensagem, canal, conversão, vendas e medição de impacto.',
    topicIds: [
      'mkt-01',
      'mkt-02',
      'mkt-03',
      'mkt-04',
      'mkt-05',
      'mkt-06',
      'mkt-07',
      'mkt-08',
      'mkt-09',
      'mkt-10',
      'mkt-11',
      'mkt-12',
      'mkt-13',
      'str-01',
      'data-05',
    ],
    accent: 'border-rose-500/30 bg-rose-500/[0.07] text-rose-200',
  },
  {
    id: 'saas-monetization',
    title: 'SaaS & Monetização',
    shortTitle: 'SaaS & Monetização',
    description: 'Product-market fit, pricing, packaging, PLG, retenção, expansão e economics para produtos recorrentes e marketplaces.',
    outcome: 'Entenda como desenhar valor, cobrança, expansão e retenção em produtos com receita recorrente.',
    topicIds: [
      'str-02',
      'act-01',
      'act-03',
      'ret-02',
      'mon-01',
      'mon-02',
      'mon-03',
      'plg-01',
      'str-03',
      'ai-06',
    ],
    accent: 'border-indigo-500/30 bg-indigo-500/[0.07] text-indigo-200',
  },
];

export function getLearningTrack(trackId: string): LearningTrack | undefined {
  return LEARNING_TRACKS.find((track) => track.id === trackId);
}

export function getTopicsForTrack(topics: GrowthTopic[], trackId: string): GrowthTopic[] {
  const track = getLearningTrack(trackId);
  if (!track) return topics;

  const topicsById = new Map(topics.map((topic) => [topic.id, topic]));
  return track.topicIds
    .map((topicId) => topicsById.get(topicId))
    .filter((topic): topic is GrowthTopic => Boolean(topic));
}
