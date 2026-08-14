import type { GrowthTopic } from './growthTopics';

export const EXTRA_GROWTH_TOPICS: GrowthTopic[] = [
  {
    id: 'prod-01',
    title: 'Continuous Discovery e Opportunity Solution Tree (OST)',
    category: 'strategy',
    categoryLabel: 'Product Management & Discovery',
    difficulty: 'Intermediário',
    shortDescription: 'Como transformar objetivos de negócio em oportunidades de usuário, soluções candidatas e experimentos sem pular direto para features.',
    keyQuestions: [
      'Qual outcome de produto queremos mover e qual comportamento do usuário está ligado a ele?',
      'Quais oportunidades foram observadas em evidências reais e quais são apenas suposições do time?',
      'Qual é o experimento mais barato capaz de reduzir a incerteza antes de construir?'
    ],
    tags: ['Continuous Discovery', 'OST', 'Product Discovery', 'Teresa Torres'],
    suggestedFramework: 'Opportunity Solution Tree — Teresa Torres'
  },
  {
    id: 'prod-02',
    title: 'Jobs to Be Done e Switching Forces',
    category: 'strategy',
    categoryLabel: 'Product Management & Discovery',
    difficulty: 'Intermediário',
    shortDescription: 'Entender por que alguém troca o status quo por um produto analisando progresso desejado, ansiedade, hábitos e forças que empurram a mudança.',
    keyQuestions: [
      'Qual progresso o usuário está tentando fazer quando procura nossa solução?',
      'O que torna a alternativa atual boa o bastante para ele não mudar?',
      'Quais ansiedades aparecem imediatamente antes da compra ou adoção?'
    ],
    tags: ['JTBD', 'Switching Forces', 'Customer Research', 'Product Strategy'],
    suggestedFramework: 'Jobs to Be Done + Forces of Progress'
  },
  {
    id: 'prod-03',
    title: 'Roadmap Orientado a Outcomes em vez de Features',
    category: 'strategy',
    categoryLabel: 'Product Strategy & Roadmap',
    difficulty: 'Intermediário',
    shortDescription: 'Como construir roadmaps que expressem problemas e resultados esperados, preservando espaço para discovery e aprendizagem.',
    keyQuestions: [
      'Nosso roadmap promete entregas ou explicita resultados que queremos alcançar?',
      'Cada iniciativa possui métrica de sucesso e hipótese clara?',
      'O time pode abandonar uma solução se descobrir uma alternativa melhor para o mesmo outcome?'
    ],
    tags: ['Outcome Roadmap', 'Product Strategy', 'Roadmap', 'Prioritization'],
    suggestedFramework: 'Outcome-Based Roadmapping'
  },
  {
    id: 'prod-04',
    title: 'Priorização com RICE, ICE e Cost of Delay',
    category: 'strategy',
    categoryLabel: 'Product Strategy & Prioritization',
    difficulty: 'Intermediário',
    shortDescription: 'Como usar frameworks de priorização sem transformar números subjetivos em falsa precisão e sem ignorar risco estratégico.',
    keyQuestions: [
      'Quais inputs do score são observados e quais são estimativas?',
      'Qual custo existe em adiar esta iniciativa por um trimestre?',
      'Existe risco regulatório, operacional ou técnico que o score simples não captura?'
    ],
    tags: ['RICE', 'ICE', 'Cost of Delay', 'Prioritization'],
    suggestedFramework: 'RICE + Cost of Delay + Strategic Risk Review'
  },
  {
    id: 'prod-05',
    title: 'MVP, Protótipo, Concierge e Fake Door: escolha do teste certo',
    category: 'strategy',
    categoryLabel: 'Product Discovery & Experimentation',
    difficulty: 'Iniciante',
    shortDescription: 'Diferenciar formas de testar demanda, usabilidade, operação e valor antes de investir em uma implementação completa.',
    keyQuestions: [
      'Qual é a incerteza principal: desejo, usabilidade, viabilidade ou disposição a pagar?',
      'Precisamos de código para aprender isso?',
      'Qual evidência seria suficiente para continuar, ajustar ou abandonar a hipótese?'
    ],
    tags: ['MVP', 'Prototype', 'Fake Door', 'Concierge Test'],
    suggestedFramework: 'Assumption Mapping + Test Card'
  },
  {
    id: 'prod-06',
    title: 'Product Strategy: diagnóstico, tese e apostas coerentes',
    category: 'strategy',
    categoryLabel: 'Product Strategy',
    difficulty: 'Avançado',
    shortDescription: 'Como formular estratégia de produto a partir de um diagnóstico real, uma tese de vantagem e escolhas explícitas sobre onde não competir.',
    keyQuestions: [
      'Qual é o principal obstáculo que impede o produto de alcançar seu objetivo agora?',
      'Qual vantagem ou capacidade própria sustenta nossa tese?',
      'Quais oportunidades boas decidimos conscientemente não perseguir?'
    ],
    tags: ['Product Strategy', 'Strategic Bets', 'Diagnosis', 'Product Vision'],
    suggestedFramework: 'Strategy Kernel — Diagnosis, Guiding Policy, Coherent Actions'
  },
  {
    id: 'data-01',
    title: 'Tracking Plan, Taxonomia de Eventos e Instrumentação de Produto',
    category: 'experimentation',
    categoryLabel: 'Product Analytics & Data',
    difficulty: 'Intermediário',
    shortDescription: 'Como definir eventos, propriedades e identidade de usuário antes de abrir dashboards e tomar decisões com dados inconsistentes.',
    keyQuestions: [
      'Quais decisões de produto cada evento precisa permitir?',
      'Os nomes e propriedades são consistentes entre web, app e backend?',
      'Como validamos duplicidade, perda de eventos e mudanças de schema?'
    ],
    tags: ['Tracking Plan', 'Event Taxonomy', 'Analytics', 'Instrumentation'],
    suggestedFramework: 'Event Taxonomy + Analytics QA Checklist'
  },
  {
    id: 'data-02',
    title: 'Cohort Analysis, Curvas de Retenção e Plateau',
    category: 'experimentation',
    categoryLabel: 'Product Analytics & Data',
    difficulty: 'Intermediário',
    shortDescription: 'Leitura de retenção por coorte para separar crescimento de aquisição de crescimento realmente sustentado pelo produto.',
    keyQuestions: [
      'A curva de retenção estabiliza ou continua caindo até zero?',
      'Quais cohorts mudaram depois de alterações importantes no produto?',
      'Que comportamento inicial está mais associado às cohorts que retêm melhor?'
    ],
    tags: ['Cohort Analysis', 'Retention Curve', 'Product Analytics', 'Stickiness'],
    suggestedFramework: 'Retention Cohort Curve Analysis'
  },
  {
    id: 'data-03',
    title: 'Growth Accounting: novos, retidos, ressuscitados e churned',
    category: 'experimentation',
    categoryLabel: 'Growth Analytics',
    difficulty: 'Avançado',
    shortDescription: 'Decompor crescimento líquido para descobrir se o produto cresce por aquisição, retenção, ressurreição ou apenas repõe usuários perdidos.',
    keyQuestions: [
      'Qual parcela do crescimento vem de usuários realmente novos?',
      'Quantos usuários retornam depois de um período de inatividade?',
      'O churn absoluto está crescendo mais rápido que a aquisição?'
    ],
    tags: ['Growth Accounting', 'Resurrection', 'Churn', 'Active Users'],
    suggestedFramework: 'Reforge Growth Accounting'
  },
  {
    id: 'data-04',
    title: 'Guardrail Metrics, Métricas de Vaidade e Goodhart’s Law',
    category: 'experimentation',
    categoryLabel: 'Product Analytics & Data',
    difficulty: 'Intermediário',
    shortDescription: 'Como impedir que uma otimização local melhore a métrica principal enquanto piora qualidade, margem, satisfação ou retenção.',
    keyQuestions: [
      'Qual comportamento ruim pode surgir se o time otimizar apenas a métrica principal?',
      'Quais métricas de qualidade e saúde precisam acompanhar o experimento?',
      'Estamos medindo valor entregue ou apenas atividade fácil de aumentar?'
    ],
    tags: ['Guardrail Metrics', 'Goodhart Law', 'Vanity Metrics', 'Measurement'],
    suggestedFramework: 'Primary Metric + Guardrails + Diagnostic Metrics'
  },
  {
    id: 'data-05',
    title: 'Incrementalidade vs Atribuição em Marketing e Growth',
    category: 'experimentation',
    categoryLabel: 'Growth Analytics',
    difficulty: 'Avançado',
    shortDescription: 'Entender a diferença entre receber crédito por uma conversão e realmente causar uma conversão adicional.',
    keyQuestions: [
      'Quantas conversões aconteceriam mesmo sem o canal ou campanha?',
      'Temos holdout, geo test ou outro desenho capaz de estimar causalidade?',
      'O modelo de atribuição está premiando canais de captura em vez de geração de demanda?'
    ],
    tags: ['Incrementality', 'Attribution', 'Causal Inference', 'Marketing Measurement'],
    suggestedFramework: 'Holdout Tests + Geo Experiments'
  },
  {
    id: 'ai-01',
    title: 'AI Product Discovery: quando IA é solução e quando é só feature',
    category: 'strategy',
    categoryLabel: 'AI Product Management',
    difficulty: 'Intermediário',
    shortDescription: 'Avaliar se IA realmente reduz um problema relevante ou apenas adiciona complexidade, custo e incerteza ao produto.',
    keyQuestions: [
      'Qual tarefa do usuário fica materialmente melhor com IA?',
      'Qual é o baseline sem IA que precisamos superar?',
      'O ganho de velocidade ou qualidade compensa custo, risco e variabilidade?'
    ],
    tags: ['AI Product', 'Product Discovery', 'AI Strategy', 'Use Case Selection'],
    suggestedFramework: 'User Value × Model Capability × Operational Feasibility'
  },
  {
    id: 'ai-02',
    title: 'Prompting, RAG e Fine-Tuning: escolher a arquitetura certa',
    category: 'strategy',
    categoryLabel: 'AI Product & Architecture',
    difficulty: 'Avançado',
    shortDescription: 'Como decidir entre contexto em prompt, recuperação de conhecimento e ajuste de modelo conforme precisão, custo, atualização e domínio.',
    keyQuestions: [
      'O problema é falta de contexto, comportamento inconsistente ou conhecimento especializado?',
      'A informação precisa ser atualizada frequentemente?',
      'Qual abordagem reduz custo operacional sem sacrificar qualidade?'
    ],
    tags: ['RAG', 'Fine-Tuning', 'Prompt Engineering', 'LLM Architecture'],
    suggestedFramework: 'Prompt → RAG → Fine-Tuning Escalation Ladder'
  },
  {
    id: 'ai-03',
    title: 'Evals para IA: qualidade, custo, latência e taxa de falha',
    category: 'experimentation',
    categoryLabel: 'AI Product Evaluation',
    difficulty: 'Avançado',
    shortDescription: 'Criar um sistema de avaliação contínua para não depender de demos bonitas ou testes manuais subjetivos.',
    keyQuestions: [
      'Quais casos de teste representam o uso real do produto?',
      'Como medimos qualidade além de “parece bom”?',
      'Qual trade-off aceitável entre precisão, latência e custo por tarefa?'
    ],
    tags: ['AI Evals', 'LLM Quality', 'Latency', 'Cost'],
    suggestedFramework: 'Golden Dataset + Automated Evals + Human Review'
  },
  {
    id: 'ai-04',
    title: 'Human-in-the-Loop, Fallbacks e UX para incerteza da IA',
    category: 'cro',
    categoryLabel: 'AI UX & Trust',
    difficulty: 'Intermediário',
    shortDescription: 'Desenhar experiências que reconhecem incerteza, permitem correção e evitam que uma resposta errada vire uma ação irreversível.',
    keyQuestions: [
      'Em quais decisões a IA pode agir sozinha e em quais precisa de revisão humana?',
      'Como o usuário percebe confiança, fonte ou limite da resposta?',
      'Qual é o fallback quando o modelo falha, demora ou não sabe?'
    ],
    tags: ['Human in the Loop', 'AI UX', 'Fallback', 'Trust'],
    suggestedFramework: 'Autonomy Levels + Confidence Thresholds'
  },
  {
    id: 'ai-05',
    title: 'Agentes de IA, Tool Use e Workflows Agentic',
    category: 'strategy',
    categoryLabel: 'AI Product & Automation',
    difficulty: 'Avançado',
    shortDescription: 'Entender quando usar um agente com ferramentas e múltiplas etapas em vez de uma chamada simples de modelo.',
    keyQuestions: [
      'A tarefa exige planejamento, uso de ferramentas ou execução em múltiplos sistemas?',
      'Quais ações precisam ser idempotentes, auditáveis e reversíveis?',
      'Como limitamos autonomia para evitar loops, custos e ações incorretas?'
    ],
    tags: ['AI Agents', 'Tool Use', 'Agentic Workflow', 'Automation'],
    suggestedFramework: 'Plan → Act → Observe → Verify with Bounded Tools'
  },
  {
    id: 'ai-06',
    title: 'Unit Economics de IA: tokens, inferência, margem e pricing',
    category: 'monetization',
    categoryLabel: 'AI Monetization & Economics',
    difficulty: 'Avançado',
    shortDescription: 'Como modelar custo por tarefa de IA e transformar consumo variável em um modelo de preço sustentável.',
    keyQuestions: [
      'Quanto custa uma tarefa completa no P50 e no P95?',
      'Qual comportamento de usuário pode explodir o custo sem aumentar receita?',
      'Devemos cobrar por usuário, crédito, tarefa, volume ou valor entregue?'
    ],
    tags: ['AI Unit Economics', 'Token Cost', 'Pricing', 'Gross Margin'],
    suggestedFramework: 'Cost per Successful Task + Contribution Margin'
  },
  {
    id: 'growth-01',
    title: 'Growth Loops vs Funil: motores compostos de crescimento',
    category: 'plg',
    categoryLabel: 'Growth Systems',
    difficulty: 'Intermediário',
    shortDescription: 'Como identificar ciclos em que o output de uma ação gera novos inputs para crescimento, em vez de depender apenas de aquisição linear.',
    keyQuestions: [
      'Qual output do uso do produto cria o próximo usuário, conteúdo, dado ou distribuição?',
      'Onde o loop perde energia entre uma volta e outra?',
      'Qual tempo de ciclo determina a velocidade de composição do crescimento?'
    ],
    tags: ['Growth Loops', 'Compounding Growth', 'PLG', 'Distribution'],
    suggestedFramework: 'Reforge Growth Loops'
  },
  {
    id: 'act-03',
    title: 'Time to Value e definição do verdadeiro evento de ativação',
    category: 'activation',
    categoryLabel: 'Activation & Onboarding',
    difficulty: 'Intermediário',
    shortDescription: 'Encontrar o primeiro comportamento que demonstra valor recebido e reduzir o tempo necessário para o usuário chegar até ele.',
    keyQuestions: [
      'Qual ação inicial está mais correlacionada à retenção posterior?',
      'Quanto tempo o usuário leva até experimentar valor real?',
      'Quais passos do onboarding existem por hábito interno e não por necessidade do usuário?'
    ],
    tags: ['Activation', 'Time to Value', 'Onboarding', 'Aha Moment'],
    suggestedFramework: 'Activation Event + Time-to-Value Funnel'
  },
  {
    id: 'mon-03',
    title: 'Packaging Good-Better-Best e arquitetura de planos SaaS',
    category: 'monetization',
    categoryLabel: 'Monetização & Pricing',
    difficulty: 'Intermediário',
    shortDescription: 'Como organizar recursos, limites e valor entre planos para facilitar escolha, upgrade e expansão sem criar complexidade artificial.',
    keyQuestions: [
      'Qual segmento recebe valor suficiente em cada plano?',
      'Os limites incentivam expansão natural ou punem o uso?',
      'Existe diferença clara de valor percebido entre os planos sem depender apenas de lista de features?'
    ],
    tags: ['Packaging', 'SaaS Pricing', 'Good Better Best', 'Expansion Revenue'],
    suggestedFramework: 'Good-Better-Best Packaging + Value Metrics'
  },
  {
    id: 'str-03',
    title: 'Marketplaces: liquidez, cold start e equilíbrio entre oferta e demanda',
    category: 'strategy',
    categoryLabel: 'Marketplace Strategy',
    difficulty: 'Avançado',
    shortDescription: 'Como medir e resolver o problema de criar valor para dois lados do mercado quando nenhum deles quer chegar primeiro.',
    keyQuestions: [
      'Qual lado do marketplace é mais difícil de adquirir e reter?',
      'Qual métrica melhor representa liquidez: fill rate, match rate, tempo até match ou outra?',
      'Qual nicho geográfico ou vertical permite resolver o cold start antes de expandir?'
    ],
    tags: ['Marketplace', 'Liquidity', 'Cold Start', 'Network Effects'],
    suggestedFramework: 'Atomic Network + Liquidity Metrics'
  }
];
