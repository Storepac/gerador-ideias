'use client';

import React, { useState, useEffect } from 'react';
import { GrowthTopic } from '@/lib/growthTopics';
import { Sparkles, X, Copy, Check, CalendarPlus, Target, Download, RefreshCw, AlertTriangle, Video, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Markdown, splitMarkdownSections } from '@/components/Markdown';
import { getTopicReferences, ROTULO_DO_TIPO } from '@/lib/topicReferences';

interface AiDeepDiveModalProps {
  topic: GrowthTopic | null;
  onClose: () => void;
  onAddToPlan: (topic: GrowthTopic, cachedExplanation?: string) => void;
  onStartChallenge: (topic: GrowthTopic) => void;
  onCreateScript: (topic: GrowthTopic) => void;
  productContext: string;
  isInPlan: boolean;
}

export const AiDeepDiveModal: React.FC<AiDeepDiveModalProps> = ({
  topic,
  onClose,
  onAddToPlan,
  onStartChallenge,
  onCreateScript,
  productContext,
  isInPlan,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const fetchExplanation = React.useCallback(async (targetTopic: GrowthTopic) => {
    setLoading(true);
    setError(null);
    setExplanation('');

    try {
      const res = await fetch('/api/gemini/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: targetTopic.id,
          topicTitle: targetTopic.title,
          topicCategory: targetTopic.categoryLabel,
          difficulty: targetTopic.difficulty,
          shortDescription: targetTopic.shortDescription,
          productContext: productContext || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Falha ao gerar o guia com IA');
      }

      setExplanation(data.explanation);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Erro ao conectar com a IA');
    } finally {
      setLoading(false);
    }
  }, [productContext]);

  useEffect(() => {
    if (!topic) return;
    const timer = setTimeout(() => {
      fetchExplanation(topic);
    }, 0);
    return () => clearTimeout(timer);
  }, [topic, fetchExplanation]);

  const handleCopy = () => {
    if (!explanation) return;
    navigator.clipboard.writeText(explanation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!explanation || !topic) return;
    const blob = new Blob([explanation], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Growth-PM-${topic.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const guide = React.useMemo(() => splitMarkdownSections(explanation), [explanation]);
  const fontes = topic ? getTopicReferences(topic.id) : [];

  if (!topic) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  Guia de Aprofundamento por IA
                </span>
                <h3 className="text-lg font-bold text-white truncate max-w-md sm:max-w-xl">
                  {topic.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
            {loading && (
              <div className="py-20 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                <p className="text-sm font-semibold text-slate-300">
                  Gerando framework acionável, métricas e estudo de caso para {topic.title}...
                </p>
                <p className="text-xs text-slate-500">Pode levar alguns segundos.</p>
              </div>
            )}

            {error && (
              <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-300 space-y-3">
                <div className="flex items-center space-x-2 font-bold">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span>Não foi possível carregar a explicação</span>
                </div>
                <p className="text-xs">{error}</p>
                <button
                  onClick={() => fetchExplanation(topic)}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Tentar Novamente</span>
                </button>
              </div>
            )}

            {!loading && !error && explanation && (
              <div className="max-w-none space-y-4 text-sm">
                {guide.intro && (
                  <Markdown
                    text={guide.intro}
                    className={
                      guide.sections.length
                        ? 'space-y-3 rounded-2xl border border-blue-500/15 bg-blue-500/[0.06] p-5 text-sm'
                        : 'space-y-3 text-sm'
                    }
                  />
                )}

                {guide.sections.map((section, idx) => (
                  <section
                    key={`${section.title}-${idx}`}
                    className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5"
                  >
                    <h4 className="border-b border-slate-800/80 pb-2 text-base font-bold text-blue-300">
                      {section.title}
                    </h4>
                    <Markdown text={section.body} />
                  </section>
                ))}

                {fontes.length > 0 && (
                  <section className="space-y-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-5">
                    <div className="flex items-center gap-2 border-b border-emerald-500/20 pb-2">
                      <BookOpen className="h-4 w-4 text-emerald-400" />
                      <h4 className="text-base font-bold text-emerald-300">Fontes conferidas</h4>
                    </div>
                    <p className="text-xs leading-5 text-slate-400">
                      Links abertos e checados por nós, fora do que a IA escreveu acima. Se algo no guia
                      contradisser uma destas, confie na fonte.
                    </p>
                    <ul className="space-y-2">
                      {fontes.map((fonte) => (
                        <li key={fonte.url} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                          <span className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            {ROTULO_DO_TIPO[fonte.tipo]}
                          </span>
                          <a
                            href={fonte.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="font-medium text-blue-300 underline decoration-blue-400/40 underline-offset-2 transition hover:text-blue-200"
                          >
                            {fonte.rotulo}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 px-6 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-10">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                disabled={!explanation || loading}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all disabled:opacity-50"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado!' : 'Copiar Guia'}</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={!explanation || loading}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Baixar .MD</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  onCreateScript(topic);
                  onClose();
                }}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                <Video className="w-4 h-4 text-cyan-300" />
                <span>Virar roteiro</span>
              </button>

              <button
                onClick={() => {
                  onStartChallenge(topic);
                  onClose();
                }}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                <Target className="w-4 h-4 text-pink-400" />
                <span>Simular Desafio PM</span>
              </button>

              <button
                onClick={() => {
                  onAddToPlan(topic, explanation);
                  onClose();
                }}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>{isInPlan ? 'Atualizar no Plano' : 'Adicionar ao Plano Semanal'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
