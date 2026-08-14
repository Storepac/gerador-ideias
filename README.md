# TechForWeb Learning Lab

Laboratório de aprendizado da TechForWeb para explorar temas de produto, growth, marketing, dados e estratégia, aplicar conceitos em exercícios e transformar estudo em explicações curtas.

## Produto

O projeto nasceu como um gerador pessoal de temas criado no Google AI Studio. A direção atual é mais ampla:

1. **Aprender** — biblioteca de conceitos e guias de aprofundamento com IA.
2. **Aplicar** — plano semanal, anotações e desafios fictícios.
3. **Explicar** — Content Lab para gerar estruturas de vídeos de 60–90 segundos.

A IA funciona como apoio de estudo e edição. O produto orienta a separar conceitos, hipóteses e afirmações que merecem verificação antes de publicação.

## Áreas

- `/` — Learning Lab, biblioteca, plano e recursos pessoais.
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

A aplicação espera `GEMINI_API_KEY` no ambiente do servidor. A chave não deve ser exposta em código client-side.

## Segurança e custo de IA

As rotas de IA possuem validação básica de payload e rate limit em memória por IP. Esse mecanismo reduz abuso casual, mas não é um rate limiter distribuído. Antes de escalar tráfego público, substituir por uma solução persistente/edge e definir limites de custo e observabilidade.

## Estado

Piloto em evolução. O projeto permanece `noindex` enquanto identidade, build, deploy e fluxo público ainda estão sendo validados.

O primeiro preview Vercel da branch de reposicionamento deve ser tratado como gate visual e técnico antes de qualquer merge para `main`.
