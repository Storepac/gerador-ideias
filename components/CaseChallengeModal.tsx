'use client';

import React, { useState, useEffect } from 'react';
import { GrowthTopic } from '@/lib/growthTopics';
import { Target, X, Send, Award, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CaseChallengeModalProps {
  topic: GrowthTopic | null;
  onClose: () => void;
}

export const CaseChallengeModal: React.FC<CaseChallengeModalProps> = ({ topic, onClose }) => {
  const [loadingChallenge, setLoadingChallenge] = useState<boolean>(false);
  const [challengePrompt, setChallengePrompt] = useState<string>('');
  const [userSolution, setUserSolution] = useState<string>('');
  const [loadingEvaluation, setLoadingEvaluation] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [quotaRemaining, setQuotaRemaining] = useState<number | null>(null);

  const readQuotaRemaining = (response: Response, data: { quota?: { remaining?: number } }) => {
    const fromBody = data.quota?.remaining;
    const fromHeader = response.headers.get('X-AI-Daily-Remaining');
    if (typeof fromBody === 'number') setQuotaRemaining(fromBody);
    else if (fromHeader !== null && Number.isFinite(Number(fromHeader))) setQuotaRemaining(Number(fromHeader));
  };

  const generateChallenge = React.useCallback(async (targetTopic: GrowthTopic) => {
    setLoadingChallenge(true);
    setError(null);
    setChallengePrompt('');
    setEvaluation('');
    setUserSolution('');

    try {
      const res = await fetch('/api/gemini/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          topicTitle: targetTopic.title,
          category: targetTopic.categoryLabel,
        }),
      });

      const data = await res.json();
      const remaining = data.quota?.remaining ?? Number(res.headers.get('X-AI-Daily-Remaining'));
      if (Number.isFinite(remaining)) setQuotaRemaining(remaining);
      if (!res.ok) throw new Error(data.error || 'Erro ao gerar o desafio.');
      setChallengePrompt(data.challenge);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com servidor.');
    } finally {
      setLoadingChallenge(false);
    }
  }, []);

  useEffect(() => {
    if (!topic) return;
    const timer = setTimeout(() => {
      generateChallenge(topic);
    }, 0);
    return () => clearTimeout(timer);
  }, [topic, generateChallenge]);

  const submitSolution = async () => {
    if (!userSolution.trim() || !challengePrompt || !topic) return;

    setLoadingEvaluation(true);
    setError(null);

    try {
      const res = await fetch('/api/gemini/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate',
          topicTitle: topic.title,
          category: topic.categoryLabel,
          challengePrompt,
          userSolution,
        }),
      });

      const data = await res.json();
      readQuotaRemaining(res, data);
      if (!res.ok) throw new Error(data.error || 'Erro ao avaliar a solução.');
      setEvaluation(data.evaluation);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro na avaliação.');
    } finally {
      setLoadingEvaluation(false);
    }
  };

  if (!topic) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 p-2 flex items-center justify-center">
                <Target className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">Simulação de Caso Prático de Growth</span>
                <h3 className="text-base font-bold text-white truncate max-w-md">{topic.title}</h3>
                <p className="mt-1 text-[11px] text-slate-500">
                  {quotaRemaining === null
                    ? 'IA: até 3 gerações por dia. Gerar e avaliar contam separadamente.'
                    : `${quotaRemaining} geração${quotaRemaining === 1 ? '' : 'ões'} de IA restante${quotaRemaining === 1 ? '' : 's'} hoje.`}
                </p>
              </div>
            </div>

            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" aria-label="Fechar desafio">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
            {loadingChallenge && (
              <div className="py-16 flex flex-col items-center justify-center space-y-3">
                <div className="w-10 h-10 rounded-full border-4 border-pink-500/20 border-t-pink-500 animate-spin" />
                <p className="text-xs font-medium text-slate-300">Criando cenário de dilema de produto realista para {topic.title}...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-300 text-xs space-y-2">
                <div className="flex items-center space-x-2 font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>Erro no Desafio</span>
                </div>
                <p>{error}</p>
              </div>
            )}

            {!loadingChallenge && challengePrompt && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-pink-400 font-bold">
                    <span>CENÁRIO DO DESAFIO DE HOJE</span>
                    <button onClick={() => generateChallenge(topic)} className="text-slate-400 hover:text-slate-200 flex items-center space-x-1 font-normal text-[11px]">
                      <RefreshCw className="w-3 h-3" />
                      <span>Gerar Outro Cenário</span>
                    </button>
                  </div>
                  <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">{challengePrompt}</div>
                </div>

                {!evaluation && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-300">Sua Resposta como Growth PM (Diagnóstico, Métricas e Hipóteses de Solução):</label>
                    <textarea
                      rows={5}
                      value={userSolution}
                      onChange={(e) => setUserSolution(e.target.value)}
                      placeholder="Descreva como você analisaria os dados, qual hipótese testaria e quais métricas de entrada/saída usaria..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 resize-none"
                    />

                    <button
                      onClick={submitSolution}
                      disabled={loadingEvaluation || !userSolution.trim()}
                      className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-pink-600/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                    >
                      {loadingEvaluation ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Avaliando sua resposta...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar solução para feedback</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {evaluation && (
                  <div className="space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-pink-500/30">
                    <div className="flex items-center space-x-2 text-pink-400 font-bold text-sm">
                      <Award className="w-5 h-5 text-amber-400" />
                      <span>FEEDBACK SOBRE O RACIOCÍNIO</span>
                    </div>
                    <div className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{evaluation}</div>
                    <div className="pt-3 border-t border-slate-800 flex justify-end">
                      <button onClick={() => { setEvaluation(''); setUserSolution(''); }} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700">
                        Refazer Resposta
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};