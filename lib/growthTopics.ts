export interface GrowthTopic {
  id: string;
  title: string;
  category: 'acquisition' | 'activation' | 'retention' | 'monetization' | 'plg' | 'experimentation' | 'psychology' | 'strategy' | 'branding' | 'content' | 'sales' | 'cro';
  categoryLabel: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  shortDescription: string;
  keyQuestions: string[];
  tags: string[];
  suggestedFramework?: string;
  realWorldExample?: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'Todos os Módulos', icon: 'Sparkles', color: 'bg-amber-500' },
  { id: 'branding', label: 'Branding, Posicionamento & Marca', icon: 'Award', color: 'bg-yellow-500' },
  { id: 'content', label: 'Inbound, Conteúdo & SEO', icon: 'FileText', color: 'bg-emerald-500' },
  { id: 'acquisition', label: 'Mídia Paga, Tráfego & Performance', icon: 'TrendingUp', color: 'bg-blue-500' },
  { id: 'cro', label: 'CRO, Copywriting & Neuromarketing', icon: 'Zap', color: 'bg-purple-500' },
  { id: 'sales', label: 'Vendas, Outbound & Product Marketing (PMM)', icon: 'Briefcase', color: 'bg-rose-500' },
  { id: 'activation', label: 'Ativação & Product Onboarding', icon: 'Play', color: 'bg-cyan-500' },
  { id: 'retention', label: 'Retenção, Churn & Customer Success', icon: 'Repeat', color: 'bg-teal-500' },
  { id: 'monetization', label: 'Monetização, Pricing & LTV/CAC', icon: 'DollarSign', color: 'bg-indigo-500' },
  { id: 'plg', label: 'Product-Led Growth (PLG) & Virilidade', icon: 'Rocket', color: 'bg-pink-500' },
  { id: 'experimentation', label: 'Analytics, A/B Testing & Atribuição', icon: 'BarChart', color: 'bg-orange-500' },
  { id: 'strategy', label: 'Estratégia, Go-To-Market & Operação', icon: 'Target', color: 'bg-slate-500' },
] as const;

export const INITIAL_TOPICS: GrowthTopic[] = [
  // BRANDING & POSICIONAMENTO
  {
    id: 'mkt-01',
    title: 'Posicionamento Estratégico e Categoria Única (Category Creation)',
    category: 'branding',
    categoryLabel: 'Branding & Posicionamento',
    difficulty: 'Avançado',
    shortDescription: 'Como definir a proposta de valor e criar ou liderar uma nova categoria de mercado para escapar da briga por preço com concorrentes estabelecidos.',
    keyQuestions: [
      'Qual problema urgente e doloroso nosso produto resolve que o status quo ignora?',
      'Se fôssemos descrever nossa solução para um cliente em uma única frase marcante, qual seria?',
      'Estamos competindo em uma categoria existente ou definindo uma nova linguagem?'
    ],
    tags: ['Branding', 'Category Creation', 'Positioning', 'Value Proposition'],
    suggestedFramework: 'April Dunford Positioning Framework (Obviously Awesome)',
    realWorldExample: 'Salesforce criou a categoria "No Software" para definir o modelo SaaS no início dos anos 2000.'
  },
  {
    id: 'mkt-02',
    title: 'Brand Equity, Arquétipos de Marca e Identidade de Tom de Voz',
    category: 'branding',
    categoryLabel: 'Branding & Posicionamento',
    difficulty: 'Intermediário',
    shortDescription: 'Construção da personalidade da marca, consistência de marca através de múltiplos canais e o valor intangível percebido pelo cliente.',
    keyQuestions: [
      'Nossa marca conversa de forma condizente com a emoção e urgência do nosso cliente ideal?',
      'Como a percepção visual e de copy se diferencia dos 3 maiores concorrentes?',
      'Qual o impacto do reconhecimento de marca (brand awareness) no CAC orgânico?'
    ],
    tags: ['Brand Equity', 'Tone of Voice', 'Brand Identity', 'Brand Awareness'],
    suggestedFramework: 'Aaker Brand Equity Model',
    realWorldExample: 'Apple utiliza o arquétipo do Criador/Inovador para justificar margens premium sustentáveis.'
  },
  {
    id: 'mkt-03',
    title: 'Storytelling Corporativo e a Jornada do Herói no Marketing',
    category: 'branding',
    categoryLabel: 'Branding & Posicionamento',
    difficulty: 'Iniciante',
    shortDescription: 'Estruturação de narrativas de marketing onde o CLIENTE é o herói da história e o produto é o guia transformador.',
    keyQuestions: [
      'Quem é o "vilão" ou vilania que o nosso produto ajuda o cliente a derrotar?',
      'Nossas páginas de vendas destacam o resultado final do cliente ou focam em lista de funcionalidades?',
      'Qual a transformação concreta que prometemos entregar no menor tempo possível?'
    ],
    tags: ['Storytelling', 'Copywriting', 'Brand Narrative', 'StoryBrand'],
    suggestedFramework: 'Building a StoryBrand Framework (Donald Miller)'
  },

  // CONTEÚDO, INBOUND & SEO
  {
    id: 'mkt-04',
    title: 'Programmatic SEO e Conteúdo Gerado por Usuários/Produto (Product Content Loops)',
    category: 'content',
    categoryLabel: 'Inbound & SEO',
    difficulty: 'Avançado',
    shortDescription: 'Criação de milhares de páginas indexáveis no Google de forma automatizada a partir do próprio banco de dados e templates do produto.',
    keyQuestions: [
      'O uso normal do produto gera páginas/documentos/templates públicos que podem ser indexados?',
      'Como estruturar uma arquitetura de dados para rankear em palavras-chave de cauda longa com alto volume?',
      'Qual a taxa de conversão de visitantes orgânicos de SEO para testes gratuitos ou contatos de vendas?'
    ],
    tags: ['Programmatic SEO', 'Inbound Marketing', 'Search Intent', 'Long-Tail SEO'],
    suggestedFramework: 'HubSpot Topic Cluster & Programmatic SEO Engine',
    realWorldExample: 'Zapier e Canva geram milhões de visitas orgânicas mensais com landing pages automáticas de integrações e templates.'
  },
  {
    id: 'mkt-05',
    title: 'Estratégia de Marketing de Conteúdo Bottom-of-Funnel (BOFU) e Comparison Pages',
    category: 'content',
    categoryLabel: 'Inbound & SEO',
    difficulty: 'Intermediário',
    shortDescription: 'Foco no público pronto para comprar criando conteúdos comparativos ("Nossa Marca vs Concorrente X") e guias de migração de alta intenção.',
    keyQuestions: [
      'Temos landing pages otimizadas para pessoas buscando termos como "[Concorrente] alternativas"?',
      'Como posicionar nossos diferenciais com transparência e ética para capturar clientes insatisfeitos da concorrência?',
      'Qual o custo de aquisição (CAC) desse tráfego comparado aos anúncios pagos?'
    ],
    tags: ['BOFU Content', 'Alternative Pages', 'Comparison SEO', 'High Intent'],
    suggestedFramework: 'Pain-Point SEO Framework (Grow-Growth)'
  },
  {
    id: 'mkt-06',
    title: 'Lead Nurturing, Drip Campaigns e Automação de Marketing de Alta Conversão',
    category: 'content',
    categoryLabel: 'Inbound & SEO',
    difficulty: 'Iniciante',
    shortDescription: 'Arquitetura de réguas de comunicação por e-mail/WhatsApp para educar leads do topo até o fundo do funil com gatilhos comportamentais.',
    keyQuestions: [
      'Quais ações do usuário no site/app disparam sequências de e-mails personalizadas?',
      'A nossa sequência de nutrição oferece valor prático antes de pedir uma reunião de vendas?',
      'Qual a taxa de abertura, clique e resposta da nossa sequência principal de boas-vindas?'
    ],
    tags: ['Lead Nurturing', 'Marketing Automation', 'Email Marketing', 'Conversion Loops'],
    suggestedFramework: 'Lifecycle Marketing Framework (ActiveCampaign / HubSpot)'
  },

  // MÍDIA PAGA & PERFORMANCE
  {
    id: 'mkt-07',
    title: 'CAC Payback Period, ROAS e Gestão de Mídia de Performance Scalable',
    category: 'acquisition',
    categoryLabel: 'Mídia Paga & Performance',
    difficulty: 'Intermediário',
    shortDescription: 'Como calcular e otimizar campanhas de tráfego pago no Google Ads, Meta Ads e LinkedIn Ads mantendo margem de contribuição positiva.',
    keyQuestions: [
      'Em quantos meses o valor gerado pelo cliente recupera o Custo de Aquisição de Mídia (CAC Payback)?',
      'Estamos medindo o ROAS (Return on Ad Spend) de curto prazo ou a receita incremental real do canal?',
      'Qual o teto de gastos no canal antes do início da curva de rendimentos decrescentes?'
    ],
    tags: ['Paid Media', 'ROAS', 'CAC Payback', 'Meta Ads', 'Google Ads'],
    suggestedFramework: 'Performance Marketing Unit Economics Matrix'
  },
  {
    id: 'mkt-08',
    title: 'Estratégia de Retargeting Dinâmico e Account-Based Marketing (ABM) Ads',
    category: 'acquisition',
    categoryLabel: 'Mídia Paga & Performance',
    difficulty: 'Avançado',
    shortDescription: 'Exibição de anúncios hipersegmentados para tomadores de decisão em empresas-alvo estratégicas e visitantes que abandonaram o checkout.',
    keyQuestions: [
      'Temos listas de contas alvos (ICP) sendo impactadas com anúncios exclusivos no LinkedIn e display?',
      'Qual a variação na mensagem oferecida a quem visitou a página de preços vs quem apenas leu um artigo?',
      'Como evitar a fadiga de anúncios com limites de frequência rigorosos?'
    ],
    tags: ['ABM', 'Retargeting', 'Account-Based Marketing', 'Paid Social'],
    suggestedFramework: 'Demandbase ABM Framework'
  },

  // CRO, COPYWRITING & NEUROMARKETING
  {
    id: 'mkt-09',
    title: 'AIDA, PAS e Arquitetura de Copywriting de Alta Conversão',
    category: 'cro',
    categoryLabel: 'CRO & Neuromarketing',
    difficulty: 'Iniciante',
    shortDescription: 'Aplicação de estruturas consagradas de escrita persuasiva (Atenção, Interesse, Desejo, Ação e Problema, Agitação, Solução) em landing pages.',
    keyQuestions: [
      'A primeira dobra da nossa landing page responde em 3 segundos o que fazemos e para quem é?',
      'Estamos agitando a dor real do cliente antes de apresentar as funcionalidades?',
      'O Call To Action (CTA) descreve o benefício direto em vez de termos genéricos como "Enviar"?'
    ],
    tags: ['Copywriting', 'AIDA', 'PAS Framework', 'Landing Page CRO'],
    suggestedFramework: 'PAS (Problem, Agitate, Solution) Copy Framework'
  },
  {
    id: 'mkt-10',
    title: 'Aversão à Perda, Escassez e Prova Social Ética no Neuromarketing',
    category: 'cro',
    categoryLabel: 'CRO & Neuromarketing',
    difficulty: 'Intermediário',
    shortDescription: 'Uso de gatilhos mentais validados pela economia comportamental para reduzir a fricção de decisão e acelerar a conversão.',
    keyQuestions: [
      'Como mostrar visualmente o que o cliente está perdendo a cada dia sem a nossa solução?',
      'Temos depoimentos, dados da comunidade e logos de clientes relevantes próximos dos botões de compra?',
      'Evitamos gatilhos falsos de escassez que destroem a credibilidade da marca no longo prazo?'
    ],
    tags: ['Neuromarketing', 'Behavioral Economics', 'Social Proof', 'Conversion Rate'],
    suggestedFramework: 'Cialdini 6 Principles of Persuasion'
  },
  {
    id: 'mkt-11',
    title: 'Modelo de Comportamento de Fogg (B = MAP) e Fricção UX em Checkout',
    category: 'cro',
    categoryLabel: 'CRO & Neuromarketing',
    difficulty: 'Intermediário',
    shortDescription: 'Redução de etapas e esforço cognitivo exigido do cliente no momento em que o gatilho de compra é disparado.',
    keyQuestions: [
      'A baixa conversão é por falta de motivação do cliente ou porque o formulário exige esforço excessivo?',
      'Quantos campos podemos remover imediatamente do formulário de cadastro/pagamento?',
      'O gatilho de ação ocorre no momento exato de maior motivação do usuário?'
    ],
    tags: ['Fogg Behavior Model', 'Friction Audit', 'Checkout CRO', 'UX Design'],
    suggestedFramework: 'BJ Fogg Behavior Model (B=MAP)'
  },

  // VENDAS, OUTBOUND & PRODUCT MARKETING (PMM)
  {
    id: 'mkt-12',
    title: 'Product Marketing & Habilitação de Vendas (Sales Enablement & Battlecards)',
    category: 'sales',
    categoryLabel: 'Vendas & Product Marketing',
    difficulty: 'Intermediário',
    shortDescription: 'Criação de materiais competitivos, guias de contorno de objeções (battlecards) e alinhamento entre times de produto, marketing e vendas.',
    keyQuestions: [
      'O time de vendas tem respostas prontas e validadas para as 5 maiores objeções dos clientes?',
      'Como o marketing de produto traduz releases técnicos em histórias de valor que encantam o comprador?',
      'Qual a taxa de vitória (win-rate) de vendas contra nossos 3 maiores concorrentes diretos?'
    ],
    tags: ['Product Marketing', 'Sales Enablement', 'Competitive Intelligence', 'Battlecards'],
    suggestedFramework: 'PMA (Product Marketing Alliance) Go-To-Market Playbook'
  },
  {
    id: 'mkt-13',
    title: 'Outbound B2B, Definição de ICP e Prospecção Focada em Valor',
    category: 'sales',
    categoryLabel: 'Vendas & Product Marketing',
    difficulty: 'Avançado',
    shortDescription: 'Mapeamento do Perfil de Cliente Ideal (ICP), enriquecimento de dados e cadências de abordagem fria altamente personalizadas.',
    keyQuestions: [
      'Quais características quantitativas (faturamento, tamanho do time, tecnologia) definem nossos 20% melhores clientes?',
      'Nossa mensagem de outbound aborda uma dor específica do cargo do tomador de decisão?',
      'Qual a taxa de agendamento de reuniões a partir de listas qualificadas de outbound?'
    ],
    tags: ['ICP', 'Outbound Sales', 'Cold Outreach', 'B2B Prospecting'],
    suggestedFramework: 'Predictable Revenue Framework (Aaron Ross)'
  },

  // ATIVAÇÃO & ONBOARDING
  {
    id: 'act-01',
    title: 'Aha! Moment & Redução Radical do Time-to-Value (TTV)',
    category: 'activation',
    categoryLabel: 'Ativação & Onboarding',
    difficulty: 'Iniciante',
    shortDescription: 'Identificação do momento exato em que o usuário entende o valor principal do produto e a remoção de barreiras até essa experiência.',
    keyQuestions: [
      'Qual é a ação precisa realizada no primeiro dia que prevê 90% da retenção no D30?',
      'Quantos cliques, telas e minutos o usuário novo precisa percorrer para atingir esse momento?',
      'Podemos pré-popular dados ou oferecer templates para acelerar a entrega de valor?'
    ],
    tags: ['Aha Moment', 'Time to Value', 'Onboarding', 'Activation Rate'],
    suggestedFramework: 'Product-Led Onboarding Index (Ramli John)',
    realWorldExample: 'Dropbox descobriu que usuários que colocavam 1 arquivo na pasta sincronizada tinham retenção 4x maior.'
  },
  {
    id: 'act-02',
    title: 'Onboarding Progressivo vs Checklist de Conclusão com Recompensas',
    category: 'activation',
    categoryLabel: 'Ativação & Onboarding',
    difficulty: 'Intermediário',
    shortDescription: 'Uso de barras de progresso, checklists gamificados e revelação gradual de recursos para engajar novos cadastros sem sobrecarregá-los.',
    keyQuestions: [
      'Nosso onboarding guia o cliente por tarefas práticas em vez de usar tours estáticos de telas?',
      'Qual o impacto visual de oferecer uma barra de progresso já iniciada em 20% (Goal Gradient Effect)?',
      'Onde está a maior taxa de desistência dentro das etapas do primeiro acesso?'
    ],
    tags: ['Progressive Disclosure', 'Gamification', 'User Activation', 'UX Onboarding'],
    suggestedFramework: 'Reforge Setup & Habit Building Framework'
  },

  // RETENÇÃO, CHURN & CUSTOMER SUCCESS
  {
    id: 'ret-01',
    title: 'Análise de Coortes e Estabilização da Curva de Retenção (Flattening Curve)',
    category: 'retention',
    categoryLabel: 'Retenção & Customer Success',
    difficulty: 'Intermediário',
    shortDescription: 'Acompanhamento sistemático do comportamento de coortes de clientes para provar o Product-Market Fit e garantir retenção assintótica.',
    keyQuestions: [
      'A curva de retenção das nossas coortes estabiliza horizontalmente após x dias/meses?',
      'Existe diferença de retenção entre clientes vindos de tráfego pago vs indicação orgânica?',
      'Quais funcionalidades são consumidas exclusivamente pelos clientes com maior tempo de vida (LTV)?'
    ],
    tags: ['Cohorts', 'Retention Curve', 'PMF', 'D1/D7/D30 Retention'],
    suggestedFramework: 'Reforge Retention & Engagement Deep Dive',
    realWorldExample: 'Slack observou que equipes que trocam 2.000 mensagens têm 93% de retenção no longo prazo.'
  },
  {
    id: 'ret-02',
    title: 'Churn Precoce vs Churn Tardio e Programas Proativos de Customer Success',
    category: 'retention',
    categoryLabel: 'Retenção & Customer Success',
    difficulty: 'Avançado',
    shortDescription: 'Diferenciação de cancelamentos na fase de expectativa/ativação vs perda de valor ao longo do tempo, e criação de Health Score proativo.',
    keyQuestions: [
      'Quais indicadores de baixo uso (Health Score) acendem alertas de risco de churn com 30 dias de antecedência?',
      'Nosso churn ocorre majoritariamente nos primeiros 14 dias ou no momento do renovação anual?',
      'Como estruturar campanhas de reengajamento personalizadas antes do pedido formal de cancelamento?'
    ],
    tags: ['Churn Analysis', 'Customer Success', 'Health Score', 'Retention Engine'],
    suggestedFramework: 'Gainsight Customer Success Matrix'
  },

  // MONETIZAÇÃO, PRICING & UNIT ECONOMICS
  {
    id: 'mon-01',
    title: 'Métricas de Valor (Value Metrics) e Eixos de Escalabilidade de Preço',
    category: 'monetization',
    categoryLabel: 'Monetização & Pricing',
    difficulty: 'Avançado',
    shortDescription: 'Definição do modelo de cobrança onde a receita por cliente cresce automaticamente à medida que ele consome mais valor com o produto.',
    keyQuestions: [
      'Nossa métrica de cobrança escala com o sucesso do cliente (ex: assentos, chamadas de API, volume transacionado)?',
      'O preço é transparente e previne surpresas desagradáveis na fatura no final do mês?',
      'Quais são os limites estratégicos que incentivam o upgrade do plano básico para o plano pro?'
    ],
    tags: ['Value Metric', 'Pricing Strategy', 'SaaS Pricing', 'Monetization'],
    suggestedFramework: 'ProfitWell / Price Intelligently Framework',
    realWorldExample: 'HubSpot cobra por quantidade de contatos; Zapier cobra por número de tarefas rodadas.'
  },
  {
    id: 'mon-02',
    title: 'Pesquisa Quantitativa de Disposição a Pagar (Van Westendorp PSM)',
    category: 'monetization',
    categoryLabel: 'Monetização & Pricing',
    difficulty: 'Intermediário',
    shortDescription: 'Aplicações de pesquisas de sensibilidade de preço com usuários reais para identificar a faixa perfeita entre preço barato e inacessível.',
    keyQuestions: [
      'A qual preço o cliente potencial acha o produto tão barato que duvida da sua qualidade?',
      'Qual é o valor exato onde o produto começa a ser considerado caro, mas ainda aceitável?',
      'Como varia a elasticidade de preço entre clientes PME e clientes Enterprise?'
    ],
    tags: ['Van Westendorp', 'Price Sensitivity', 'Willingness to Pay', 'Pricing Research'],
    suggestedFramework: 'Van Westendorp Price Sensitivity Meter'
  },

  // PLG & VIRALIDADE
  {
    id: 'plg-01',
    title: 'Product Qualified Leads (PQL) e Integração de Product-Led Sales',
    category: 'plg',
    categoryLabel: 'PLG & Virilidade',
    difficulty: 'Intermediário',
    shortDescription: 'Qualificação de contas corporativas a partir de dados comportamentais em planos gratuitos para acionar o time de vendas no timing certo.',
    keyQuestions: [
      'Quais ações dentro do app gratuito indicam que a empresa está pronta para fechar um contrato corporativo?',
      'Como automatizar o envio de alertas para os executivos de vendas quando uma conta atinge o score de PQL?',
      'Qual a taxa de fechamento de PQLs comparada aos MQLs tradicionais de formulário?'
    ],
    tags: ['PQL', 'Product-Led Sales', 'PLG', 'Lead Scoring'],
    suggestedFramework: 'OpenView Product-Led Sales Index'
  },
  {
    id: 'plg-02',
    title: 'Viral Loops, Coeficiente K e Mecanismos de Indicação Orgânica',
    category: 'plg',
    categoryLabel: 'PLG & Virilidade',
    difficulty: 'Avançado',
    shortDescription: 'Design de recursos onde o uso natural do produto exige ou convida novos usuários a participarem da experiência.',
    keyQuestions: [
      'Cada novo usuário convida em média quantas pessoas para colaborar no produto (K-Factor)?',
      'Qual é o tempo de ciclo do convite (da recepção até a ativação do convidado)?',
      'O incentivo de indicação é bilateral e gera valor real para ambas as partes?'
    ],
    tags: ['K-Factor', 'Viral Loops', 'Referral Mechanics', 'Product Growth'],
    suggestedFramework: 'K-Factor Formula = (Convites enviadas/user) * (% Conversão)'
  },

  // ANALYTICS & EXPERIMENTAÇÃO
  {
    id: 'exp-01',
    title: 'North Star Metric (NSM) e Árvore de Input Metrics Operacionais',
    category: 'experimentation',
    categoryLabel: 'Analytics & Métricas',
    difficulty: 'Iniciante',
    shortDescription: 'Escolha da métrica que captura a essência do valor entregue aos clientes e o mapeamento das alavancas semanais para cada squad.',
    keyQuestions: [
      'Nossa North Star Metric reflete o valor recebido pelo cliente ou é apenas uma métrica de vaidade?',
      'Quais são as 3 a 4 métricas operacionais que influenciam diretamente a North Star?',
      'Como garantir que a otimização da NSM não prejudique a rentabilidade do negócio?'
    ],
    tags: ['North Star Metric', 'Input Metrics', 'Growth Tree', 'Product Metrics'],
    suggestedFramework: 'Amplitude North Star Framework',
    realWorldExample: 'Spotify: "Tempo de audição de usuários ativos"; Airbnb: "Noites reservadas".'
  },
  {
    id: 'exp-02',
    title: 'Rigor Estatístico em Testes A/B: Tamanho de Amostra, MDE e P-Value',
    category: 'experimentation',
    categoryLabel: 'Analytics & Métricas',
    difficulty: 'Avançado',
    shortDescription: 'Garantia de decisões embasadas em experimentos sem cair em armadilhas de peeking problem ou amostras insuficientes.',
    keyQuestions: [
      'Qual o tamanho mínimo de amostra necessário para detectar um aumento de 5% na conversão?',
      'Rodamos o teste durante semanas completas para neutralizar variações nos dias de semana vs fim de semana?',
      'Nossa decisão leva em conta o nível de confiança estatística de pelo menos 95%?'
    ],
    tags: ['A/B Testing', 'Statistical Significance', 'P-value', 'MDE'],
    suggestedFramework: 'Frequentist & Bayesian Testing Model'
  },

  // ESTRATÉGIA, GO-TO-MARKET & OPERAÇÃO
  {
    id: 'str-01',
    title: 'Estratégia de Go-To-Market (GTM) para Lançamentos de Alto Impacto',
    category: 'strategy',
    categoryLabel: 'Estratégia & Go-To-Market',
    difficulty: 'Intermediário',
    shortDescription: 'Planejamento e orquestração integrada entre produto, marketing, vendas e suporte para colocar uma nova solução no mercado.',
    keyQuestions: [
      'Qual é a mensagem central do lançamento e qual o canal prioritário para impactar o ICP?',
      'Todos os times da empresa estão treinados e com materiais prontos para o dia do lançamento?',
      'Como mediremos o sucesso do lançamento nas primeiras 24 horas, 7 dias e 30 dias?'
    ],
    tags: ['Go To Market', 'GTM Strategy', 'Product Launch', 'Commercial Execution'],
    suggestedFramework: 'Reforge Go-To-Market Masterclass'
  },
  {
    id: 'str-02',
    title: 'Pesquisa de Sean Ellis para Medição de Product-Market Fit (40% Rule)',
    category: 'strategy',
    categoryLabel: 'Estratégia & Go-To-Market',
    difficulty: 'Iniciante',
    shortDescription: 'Pesquisa direta com usuários para saber o quão decepcionados ficariam se o produto deixasse de existir hoje.',
    keyQuestions: [
      'Temos pelo menos 40% de usuários ativos dizendo que ficariam "Muito Desapontados" sem o produto?',
      'Quais são os atributos em comum dos usuários que amam incondicionalmente a nossa solução?',
      'Como usar esse feedback para focar nosso roadmap de produto exatamente no que gera valor real?'
    ],
    tags: ['PMF Engine', 'Sean Ellis Test', 'Product-Market Fit', 'Superhuman Engine'],
    suggestedFramework: 'Rahul Vohra (Superhuman) PMF Engine Framework'
  }
];
