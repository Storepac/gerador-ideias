# TechForWeb Learning Lab

Laboratório de aprendizado da TechForWeb para explorar temas de produto, growth, marketing, dados e IA, aplicar conceitos em exercícios e transformar estudo em explicações curtas.

## Produto

O projeto nasceu como um gerador pessoal de temas criado no Google AI Studio e evoluiu para um Learning Lab público:

1. **Aprender** — biblioteca, trilhas e guias de aprofundamento.
2. **Aplicar** — plano semanal, anotações e desafios fictícios.
3. **Explicar** — Content Lab para gerar estruturas de vídeos de 60–90 segundos.

A IA funciona como apoio de estudo e edição. O conteúdo base, as trilhas e a biblioteca continuam úteis mesmo quando a IA está indisponível ou quando a cota diária termina.

## Áreas

- `/` — Learning Lab, biblioteca, trilhas, plano e recursos pessoais.
- `/roteiro` — Content Lab para roteiros curtos.
- `/api/gemini/explain` — guia de estudo.
- `/api/gemini/challenge` — geração e avaliação de exercícios fictícios.
- `/api/gemini/script` — estrutura para conteúdo de 60–90 segundos.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Google GenAI / Gemini
- armazenamento local no navegador para plano, preferências e temas personalizados

## Variáveis de ambiente

A aplicação espera `GEMINI_API_KEY` exclusivamente no ambiente do servidor. Nunca exponha a chave em variáveis `NEXT_PUBLIC_*`.

Variáveis de proteção:

- `AI_ENABLED` — kill switch; `false` pausa todas as rotas de IA.
- `AI_DAILY_LIMIT` — cota diária por navegador, padrão `3`.
- `AI_IP_DAILY_LIMIT` — proteção adicional por IP, padrão `12`.

## Segurança e custo de IA

As três rotas Gemini compartilham a mesma política de proteção:

- modelo fixado em `gemini-3.5-flash-lite`, priorizando baixo custo;
- 3 gerações por navegador/dia por padrão, compartilhadas entre Guia, Desafio e Roteiro;
- cota diária armazenada em cookie HttpOnly assinado no servidor com chave derivada de `GEMINI_API_KEY`;
- burst limit por IP: no máximo 5 solicitações em 10 minutos por instância;
- proteção diária adicional por IP, priorizando `CF-Connecting-IP` quando a Cloudflare está na frente da Vercel;
- apenas uma geração simultânea por IP por instância;
- bloqueio de chamadas cross-site e validação de `Origin`/host;
- corpo JSON limitado a 16 KB e campos com limites individuais;
- limites explícitos de tokens de saída por funcionalidade;
- `thinkingLevel` mínimo no modelo econômico;
- logs estruturados de uso de tokens sem prompt, resposta ou IP;
- `Cache-Control: no-store` nas respostas da IA;
- `AI_ENABLED=false` funciona como desligamento de emergência sem alteração de código.

Os controles em memória são defesa complementar e não constituem um limite global distribuído entre todas as instâncias serverless. Para um teto financeiro realmente rígido, mantenha também quota/budget no projeto Gemini e, se o tráfego crescer, configure rate limiting distribuído/WAF na borda.

## SEO e publicação

O endereço canônico é `https://ideias.techforweb.com.br`. O projeto possui metadata, Open Graph, JSON-LD, `robots.txt` e `sitemap.xml` próprios do TechForWeb Learning Lab.
