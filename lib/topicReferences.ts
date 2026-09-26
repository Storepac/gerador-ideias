/**
 * Fontes verificadas por tema.
 *
 * O guia da IA tem uma seção de leituras, mas o prompt proíbe inventar. Sem
 * uma lista na mão, o modelo era obrigado a preencher essa seção no escuro,
 * que é exatamente onde nasce referência inventada.
 *
 * Toda URL daqui foi aberta e respondeu antes de entrar. Ao editar, confira a
 * nova e prefira a página do próprio autor ou a documentação oficial a um
 * resumo de terceiro.
 *
 * A régua é brasileira sempre que existe fonte nacional boa: Sebrae para
 * formação de preço, Banco Central para Pix, ANPD para LGPD, CONAR para
 * publicidade, ABComm e Cetic.br para dados de mercado. O termo em inglês
 * continua, porque é de onde ele vem e é assim que aparece nas ferramentas.
 */

export type TipoDeFonte = 'livro' | 'artigo' | 'documentacao' | 'pesquisa' | 'ferramenta';

export interface TopicReference {
  rotulo: string;
  url: string;
  tipo: TipoDeFonte;
}

export const ROTULO_DO_TIPO: Record<TipoDeFonte, string> = {
  livro: 'Livro',
  artigo: 'Artigo',
  documentacao: 'Documentação',
  pesquisa: 'Pesquisa',
  ferramenta: 'Ferramenta',
};

const REFERENCIAS: Record<string, TopicReference[]> = {
  'act-01': [
    { rotulo: 'Amplitude, guia de ativação', url: 'https://amplitude.com/blog/activation-metrics', tipo: 'artigo' },
    { rotulo: 'ProductLed, Product-Led Onboarding', url: 'https://productled.com/product-led-onboarding', tipo: 'livro' },
  ],
  'act-02': [
    { rotulo: 'Nielsen Norman Group, onboarding de aplicativos', url: 'https://www.nngroup.com/articles/mobile-app-onboarding/', tipo: 'pesquisa' },
    { rotulo: 'Appcues, padrões de onboarding', url: 'https://www.appcues.com/blog', tipo: 'artigo' },
  ],
  'act-03': [
    { rotulo: 'Amplitude, guia de ativação', url: 'https://amplitude.com/blog/activation-metrics', tipo: 'artigo' },
    { rotulo: 'Mixpanel, documentação de funis', url: 'https://docs.mixpanel.com/docs/reports/funnels', tipo: 'documentacao' },
  ],
  'ai-01': [
    { rotulo: 'Google, People + AI Guidebook', url: 'https://pair.withgoogle.com/guidebook/', tipo: 'documentacao' },
    { rotulo: 'Microsoft, HAX Toolkit para produtos com IA', url: 'https://www.microsoft.com/en-us/haxtoolkit/', tipo: 'documentacao' },
    { rotulo: 'ANPD, notícias e orientações sobre proteção de dados', url: 'https://www.gov.br/anpd/pt-br/assuntos/noticias', tipo: 'documentacao' },
  ],
  'ai-02': [
    { rotulo: 'Lewis et al, artigo original de RAG', url: 'https://arxiv.org/abs/2005.11401', tipo: 'pesquisa' },
    { rotulo: 'Documentação da Claude API', url: 'https://platform.claude.com/docs/en/home', tipo: 'documentacao' },
    { rotulo: 'OpenAI, guias da plataforma', url: 'https://platform.openai.com/docs/guides/', tipo: 'documentacao' },
  ],
  'ai-03': [
    { rotulo: 'Anthropic, criação de avaliações', url: 'https://platform.claude.com/docs/en/test-and-evaluate/develop-tests', tipo: 'documentacao' },
    { rotulo: 'NIST, AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework', tipo: 'documentacao' },
  ],
  'ai-04': [
    { rotulo: 'Google, People + AI Guidebook', url: 'https://pair.withgoogle.com/guidebook/', tipo: 'documentacao' },
    { rotulo: 'Microsoft, diretrizes de interacao com IA', url: 'https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/', tipo: 'documentacao' },
  ],
  'ai-05': [
    { rotulo: 'Anthropic, Building Effective Agents', url: 'https://www.anthropic.com/engineering/building-effective-agents', tipo: 'artigo' },
    { rotulo: 'Anthropic, uso de ferramentas pela API', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', tipo: 'documentacao' },
  ],
  'ai-06': [
    { rotulo: 'Anthropic, preços da API', url: 'https://claude.com/pricing', tipo: 'documentacao' },
    { rotulo: 'OpenAI, preços da API', url: 'https://openai.com/api/pricing/', tipo: 'documentacao' },
  ],
  'data-01': [
    { rotulo: 'Segment, plano de rastreamento', url: 'https://segment.com/docs/protocols/tracking-plan/', tipo: 'documentacao' },
    { rotulo: 'Google Analytics 4, eventos recomendados', url: 'https://support.google.com/analytics/answer/9267735', tipo: 'documentacao' },
    { rotulo: 'Cetic.br, pesquisas sobre uso de internet no Brasil', url: 'https://cetic.br/', tipo: 'pesquisa' },
  ],
  'data-02': [
    { rotulo: 'Amplitude, análise de retenção', url: 'https://amplitude.com/blog/retention-rate', tipo: 'artigo' },
    { rotulo: 'Mixpanel, relatório de retenção', url: 'https://docs.mixpanel.com/docs/reports/retention', tipo: 'documentacao' },
  ],
  'data-03': [
    { rotulo: 'Social Capital, abordagem quantitativa de product-market fit', url: 'https://tribecap.co/a-quantitative-approach-to-product-market-fit/', tipo: 'pesquisa' },
    { rotulo: 'Reforge, blog de growth', url: 'https://www.reforge.com/blog', tipo: 'artigo' },
  ],
  'data-04': [
    { rotulo: 'Verbete da lei de Goodhart', url: 'https://en.wikipedia.org/wiki/Goodhart%27s_law', tipo: 'pesquisa' },
    { rotulo: 'Kohavi, materiais sobre métricas e OEC', url: 'https://exp-platform.com/', tipo: 'pesquisa' },
  ],
  'data-05': [
    { rotulo: 'Google Research, medição de efeito com experimentos geograficos', url: 'https://research.google/pubs/measuring-ad-effectiveness-using-geo-experiments/', tipo: 'pesquisa' },
    { rotulo: 'Think with Google, estudos de midia e mensuracao', url: 'https://www.thinkwithgoogle.com/', tipo: 'pesquisa' },
  ],
  'data-06': [
    { rotulo: 'Klipfolio, exemplos de KPI e como calcular', url: 'https://www.klipfolio.com/resources/kpi-examples', tipo: 'documentacao' },
    { rotulo: 'Google Ads, ajuda sobre taxa de cliques', url: 'https://support.google.com/google-ads/answer/2615875', tipo: 'documentacao' },
    { rotulo: 'Shopify, custo de aquisição de cliente', url: 'https://www.shopify.com/blog/customer-acquisition-cost', tipo: 'artigo' },
  ],
  'exp-01': [
    { rotulo: 'Amplitude, North Star Playbook', url: 'https://amplitude.com/books/north-star', tipo: 'livro' },
    { rotulo: 'Reforge, blog de growth', url: 'https://www.reforge.com/blog', tipo: 'artigo' },
  ],
  'exp-02': [
    { rotulo: 'Kohavi, Tang e Xu, Trustworthy Online Controlled Experiments', url: 'https://experimentguide.com/', tipo: 'livro' },
    { rotulo: 'Evan Miller, calculadora de tamanho de amostra', url: 'https://www.evanmiller.org/ab-testing/sample-size.html', tipo: 'ferramenta' },
    { rotulo: 'Microsoft, plataforma de experimentacao', url: 'https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/', tipo: 'pesquisa' },
  ],
  'growth-01': [
    { rotulo: 'Reforge, growth loops', url: 'https://www.reforge.com/blog/growth-loops', tipo: 'artigo' },
    { rotulo: 'Brian Balfour, ensaios sobre growth', url: 'https://brianbalfour.com/', tipo: 'artigo' },
  ],
  'mkt-01': [
    { rotulo: 'April Dunford, Obviously Awesome', url: 'https://www.aprildunford.com/obviously-awesome', tipo: 'livro' },
    { rotulo: 'April Dunford, artigos sobre posicionamento', url: 'https://www.aprildunford.com/blog', tipo: 'artigo' },
    { rotulo: 'Play Bigger, category design', url: 'https://www.playbigger.com/', tipo: 'artigo' },
  ],
  'mkt-02': [
    { rotulo: 'David Aaker sobre marca, na Prophet', url: 'https://www.prophet.com/people/david-aaker/', tipo: 'artigo' },
    { rotulo: 'Interbrand, metodologia de valor de marca', url: 'https://interbrand.com/best-global-brands/', tipo: 'pesquisa' },
  ],
  'mkt-03': [
    { rotulo: 'StoryBrand, de Donald Miller', url: 'https://storybrand.com/', tipo: 'livro' },
    { rotulo: 'HBR, Storytelling That Moves People', url: 'https://hbr.org/2003/06/storytelling-that-moves-people', tipo: 'artigo' },
  ],
  'mkt-04': [
    { rotulo: 'Google Search Central, políticas de spam e conteúdo em escala', url: 'https://developers.google.com/search/docs/essentials/spam-policies', tipo: 'documentacao' },
    { rotulo: 'Ahrefs, guia de programmatic SEO', url: 'https://ahrefs.com/blog/programmatic-seo/', tipo: 'artigo' },
    { rotulo: 'HubSpot, topic clusters', url: 'https://blog.hubspot.com/marketing/topic-clusters-seo', tipo: 'artigo' },
    { rotulo: 'Think with Google Brasil, pesquisas de busca e consumo', url: 'https://www.thinkwithgoogle.com/intl/pt-br/', tipo: 'pesquisa' },
  ],
  'mkt-05': [
    { rotulo: 'Grow and Convert, Pain Point SEO', url: 'https://www.growandconvert.com/content-marketing/pain-point-seo/', tipo: 'artigo' },
    { rotulo: 'Blog da Ahrefs, pesquisa de SEO e conteúdo', url: 'https://ahrefs.com/blog/', tipo: 'artigo' },
    { rotulo: 'Think with Google Brasil, pesquisas de busca e consumo', url: 'https://www.thinkwithgoogle.com/intl/pt-br/', tipo: 'pesquisa' },
  ],
  'mkt-06': [
    { rotulo: 'HubSpot, estágios do ciclo de vida', url: 'https://knowledge.hubspot.com/contacts/use-lifecycle-stages', tipo: 'documentacao' },
    { rotulo: 'Intercom, blog de engajamento e mensagens', url: 'https://www.intercom.com/blog/', tipo: 'artigo' },
  ],
  'mkt-07': [
    { rotulo: 'David Skok, SaaS Metrics 2.0', url: 'https://www.forentrepreneurs.com/saas-metrics-2/', tipo: 'artigo' },
    { rotulo: 'Google Ads, ajuda sobre ROAS alvo', url: 'https://support.google.com/google-ads/answer/6268637', tipo: 'documentacao' },
    { rotulo: 'ABComm, dados do comércio eletrônico brasileiro', url: 'https://www.abcomm.org/', tipo: 'pesquisa' },
  ],
  'mkt-08': [
    { rotulo: 'Google Ads, remarketing', url: 'https://support.google.com/google-ads/answer/2453998', tipo: 'documentacao' },
    { rotulo: 'WebKit, prevenção de rastreamento', url: 'https://webkit.org/tracking-prevention/', tipo: 'documentacao' },
  ],
  'mkt-09': [
    { rotulo: 'Copyhackers, biblioteca de copy', url: 'https://copyhackers.com/', tipo: 'artigo' },
    { rotulo: 'Nielsen Norman Group, como as pessoas leem na web', url: 'https://www.nngroup.com/articles/how-users-read-on-the-web/', tipo: 'pesquisa' },
  ],
  'mkt-10': [
    { rotulo: 'Robert Cialdini, Influence at Work', url: 'https://www.influenceatwork.com/', tipo: 'livro' },
    { rotulo: 'FTC, guia de endossos e provas sociais', url: 'https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking', tipo: 'documentacao' },
    { rotulo: 'CONAR, código brasileiro de autorregulamentação publicitaria', url: 'https://www.conar.org.br/', tipo: 'documentacao' },
  ],
  'mkt-11': [
    { rotulo: 'BJ Fogg, Behavior Model', url: 'https://behaviormodel.org/', tipo: 'pesquisa' },
    { rotulo: 'Baymard Institute, abandono de carrinho', url: 'https://baymard.com/lists/cart-abandonment-rate', tipo: 'pesquisa' },
    { rotulo: 'Nielsen Norman Group, design de formulários', url: 'https://www.nngroup.com/articles/web-form-design/', tipo: 'pesquisa' },
    { rotulo: 'Banco Central, página oficial do Pix', url: 'https://www.bcb.gov.br/estabilidadefinanceira/pix', tipo: 'documentacao' },
  ],
  'mkt-12': [
    { rotulo: 'Product Marketing Alliance', url: 'https://www.productmarketingalliance.com/', tipo: 'artigo' },
    { rotulo: 'Pragmatic Institute, framework de product marketing', url: 'https://www.pragmaticinstitute.com/framework/', tipo: 'documentacao' },
  ],
  'mkt-13': [
    { rotulo: 'Predictable Revenue, de Aaron Ross', url: 'https://predictablerevenue.com/', tipo: 'livro' },
    { rotulo: 'ANPD, orientações sobre a LGPD', url: 'https://www.gov.br/anpd/pt-br', tipo: 'documentacao' },
  ],
  'mon-01': [
    { rotulo: 'Paddle, estratégia de precificação', url: 'https://www.paddle.com/resources/pricing-strategy', tipo: 'artigo' },
    { rotulo: 'Kyle Poyar, Growth Unhinged', url: 'https://www.growthunhinged.com/', tipo: 'artigo' },
  ],
  'mon-02': [
    { rotulo: 'Qualtrics, métodos de pesquisa de mercado', url: 'https://www.qualtrics.com/experience-management/research/', tipo: 'documentacao' },
    { rotulo: 'Verbete do Price Sensitivity Meter', url: 'https://en.wikipedia.org/wiki/Van_Westendorp%27s_Price_Sensitivity_Meter', tipo: 'pesquisa' },
  ],
  'mon-03': [
    { rotulo: 'HBR, The Good-Better-Best Approach to Pricing', url: 'https://hbr.org/2018/09/the-good-better-best-approach-to-pricing', tipo: 'artigo' },
    { rotulo: 'Paddle, empacotamento de planos', url: 'https://www.paddle.com/resources/pricing-strategy', tipo: 'artigo' },
  ],
  'mon-04': [
    { rotulo: 'Sebrae, como formar o preco de venda', url: 'https://sebrae.com.br/sites/PortalSebrae/artigosFinancas/como-formar-o-preco-de-venda,8bd1b1f3bbaf5810VgnVCM1000001b00320aRCRD', tipo: 'documentacao' },
    { rotulo: 'Paddle, estratégia de precificação', url: 'https://www.paddle.com/resources/pricing-strategy', tipo: 'artigo' },
    { rotulo: 'HBR, The Good-Better-Best Approach to Pricing', url: 'https://hbr.org/2018/09/the-good-better-best-approach-to-pricing', tipo: 'artigo' },
  ],
  'mon-05': [
    { rotulo: 'Sebrae, como formar o preco de venda', url: 'https://sebrae.com.br/sites/PortalSebrae/artigosFinancas/como-formar-o-preco-de-venda,8bd1b1f3bbaf5810VgnVCM1000001b00320aRCRD', tipo: 'documentacao' },
    { rotulo: 'Investopedia, margem de contribuicao', url: 'https://www.investopedia.com/terms/c/contributionmargin.asp', tipo: 'artigo' },
    { rotulo: 'Investopedia, ponto de equilíbrio', url: 'https://www.investopedia.com/terms/b/breakevenpoint.asp', tipo: 'artigo' },
  ],
  'mon-06': [
    { rotulo: 'David Skok, SaaS Metrics 2.0', url: 'https://www.forentrepreneurs.com/saas-metrics-2/', tipo: 'artigo' },
    { rotulo: 'Shopify, custo de aquisição de cliente', url: 'https://www.shopify.com/blog/customer-acquisition-cost', tipo: 'artigo' },
    { rotulo: 'Baremetrics Academy, métricas de assinatura', url: 'https://baremetrics.com/academy', tipo: 'artigo' },
  ],
  'mon-07': [
    { rotulo: 'Verbete do efeito de ancoragem', url: 'https://en.wikipedia.org/wiki/Anchoring_effect', tipo: 'pesquisa' },
    { rotulo: 'Robert Cialdini, Influence at Work', url: 'https://www.influenceatwork.com/', tipo: 'livro' },
    { rotulo: 'CONAR, autorregulamentação publicitaria brasileira', url: 'https://www.conar.org.br/', tipo: 'documentacao' },
  ],
  'mon-08': [
    { rotulo: 'Kyle Poyar, Growth Unhinged', url: 'https://www.growthunhinged.com/', tipo: 'artigo' },
    { rotulo: 'ChartMogul, materiais sobre receita recorrente', url: 'https://chartmogul.com/resources/', tipo: 'artigo' },
    { rotulo: 'Paddle, estratégia de precificação', url: 'https://www.paddle.com/resources/pricing-strategy', tipo: 'artigo' },
  ],
  'plg-01': [
    { rotulo: 'ProductLed, product qualified lead', url: 'https://productled.com/blog/product-qualified-lead', tipo: 'artigo' },
    { rotulo: 'Kyle Poyar, Growth Unhinged', url: 'https://www.growthunhinged.com/', tipo: 'artigo' },
  ],
  'plg-02': [
    { rotulo: 'Andrew Chen, loops virais e coeficiente K', url: 'https://andrewchen.com/', tipo: 'artigo' },
    { rotulo: 'Reforge, growth loops', url: 'https://www.reforge.com/blog/growth-loops', tipo: 'artigo' },
  ],
  'prod-01': [
    { rotulo: 'Teresa Torres, Opportunity Solution Tree', url: 'https://www.producttalk.org/opportunity-solution-tree/', tipo: 'artigo' },
    { rotulo: 'Teresa Torres, Continuous Discovery Habits', url: 'https://www.producttalk.org/2021/05/continuous-discovery-habits/', tipo: 'livro' },
  ],
  'prod-02': [
    { rotulo: 'HBR, Know Your Customers Jobs to Be Done', url: 'https://hbr.org/2016/09/know-your-customers-jobs-to-be-done', tipo: 'artigo' },
    { rotulo: 'Bob Moesta e o site Jobs to Be Done', url: 'https://www.jobstobedone.org/', tipo: 'artigo' },
  ],
  'prod-03': [
    { rotulo: 'Melissa Perri, Escaping the Build Trap', url: 'https://melissaperri.com/', tipo: 'livro' },
    { rotulo: 'ProductPlan, roadmap orientado a outcomes', url: 'https://www.productplan.com/learn/product-roadmap/', tipo: 'artigo' },
  ],
  'prod-04': [
    { rotulo: 'Intercom, o framework RICE', url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/', tipo: 'artigo' },
    { rotulo: 'Black Swan Farming, Cost of Delay', url: 'https://blackswanfarming.com/cost-of-delay/', tipo: 'artigo' },
  ],
  'prod-05': [
    { rotulo: 'Strategyzer, Testing Business Ideas', url: 'https://www.strategyzer.com/library/testing-business-ideas-book', tipo: 'livro' },
    { rotulo: 'Nielsen Norman Group, testes de usabilidade', url: 'https://www.nngroup.com/articles/usability-testing-101/', tipo: 'pesquisa' },
  ],
  'prod-06': [
    { rotulo: 'Richard Rumelt, autor de Good Strategy Bad Strategy', url: 'https://en.wikipedia.org/wiki/Richard_Rumelt', tipo: 'livro' },
    { rotulo: 'Michael Porter na HBR, What Is Strategy', url: 'https://hbr.org/1996/11/what-is-strategy', tipo: 'artigo' },
  ],
  'ret-01': [
    { rotulo: 'Amplitude, análise de retenção', url: 'https://amplitude.com/blog/retention-rate', tipo: 'artigo' },
    { rotulo: 'Mixpanel, relatório de retenção', url: 'https://docs.mixpanel.com/docs/reports/retention', tipo: 'documentacao' },
    { rotulo: 'Andrew Chen, ensaios sobre retenção e crescimento', url: 'https://andrewchen.com/', tipo: 'artigo' },
  ],
  'ret-02': [
    { rotulo: 'Gainsight, biblioteca de customer success', url: 'https://www.gainsight.com/', tipo: 'artigo' },
    { rotulo: 'Blog da ChartMogul, métricas de assinatura e churn', url: 'https://chartmogul.com/blog/', tipo: 'artigo' },
  ],
  'str-01': [
    { rotulo: 'Reforge, blog sobre go-to-market', url: 'https://www.reforge.com/blog', tipo: 'artigo' },
    { rotulo: 'a16z, conteúdo sobre go-to-market', url: 'https://a16z.com/', tipo: 'artigo' },
  ],
  'str-02': [
    { rotulo: 'Sean Ellis, pesquisa de product-market fit', url: 'https://pmfsurvey.com/', tipo: 'ferramenta' },
    { rotulo: 'First Round Review, como a Superhuman mediu PMF', url: 'https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/', tipo: 'artigo' },
  ],
  'str-03': [
    { rotulo: 'Andrew Chen, The Cold Start Problem', url: 'https://www.coldstart.com/', tipo: 'livro' },
    { rotulo: 'a16z, Marketplace 100', url: 'https://a16z.com/marketplace-100/', tipo: 'pesquisa' },
    { rotulo: 'ABComm, dados do comércio eletrônico brasileiro', url: 'https://www.abcomm.org/', tipo: 'pesquisa' },
  ],
};

/** Temas criados pelo usuário não têm fonte cadastrada, e tudo bem. */
export function getTopicReferences(topicId: string): TopicReference[] {
  return REFERENCIAS[topicId] ?? [];
}

/** Linha única por fonte, do jeito que o prompt recebe. */
export function formatReferencesForPrompt(topicId: string): string {
  const fontes = getTopicReferences(topicId);
  if (!fontes.length) return '';
  return fontes.map((f) => `- ${f.rotulo} (${ROTULO_DO_TIPO[f.tipo]}): ${f.url}`).join('\n');
}
