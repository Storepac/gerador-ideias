'use client';

import React, { useEffect, useState } from 'react';
import { Check, Copy, RefreshCw, Video, X } from 'lucide-react';
import { GrowthTopic } from '@/lib/growthTopics';

interface ContentScriptModalProps {
  topic: GrowthTopic | null;
  productContext: string;
  onClose: () => void;
}

export function ContentScriptModal({ topic, productContext, onClose }: ContentScriptModalProps) {
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = React.useCallback(async (targetTopic: GrowthTopic) => {
    setLoading(true);
    setError(null);
    setScript('');

    try {
      const response = await fetch('/api/gemini/script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: targetTopic.title,
          topicCategory: targetTopic.categoryLabel,
          difficulty: targetTopic.difficulty,
          shortDescription: targetTopic.shortDescription,
          productContext: productContext || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Falha ao gerar roteiro.');
      setScript(data.script);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com a IA.');
    } finally {
      setLoading(false);
    }
  }, [productContext]);

  useEffect(() => {
    if (!topic) return;
    const timer = setTimeout(() => generate(topic), 0);
    return () => clearTimeout(timer);
  }, [topic, generate]);

  if (!topic) return null;

  const copyScript = async () => {
    if (!script) return;
    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="content-script-title">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-blue-500/20 bg-[#07111f] shadow-2xl shadow-blue-950/40">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
              <Video className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">TechForWeb Content Lab</p>
              <h2 id="content-script-title" className="mt-1 text-lg font-bold text-white sm:text-xl">Roteiro de 60–90s</h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-400">{topic.title}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar roteiro" className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {loading && (
            <div className="flex min-h-72 flex-col items-center justify-center gap-4 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500/20 border-t-blue-400" />
              <div>
                <p className="font-semibold text-white">Transformando o tema em uma explicação curta...</p>
                <p className="mt-1 text-sm text-slate-400">O foco é clareza, exemplo e aplicação prática.</p>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
              <p className="font-semibold text-red-200">Não foi possível gerar o roteiro.</p>
              <p className="mt-2 text-sm text-red-200/80">{error}</p>
              <button type="button" onClick={() => generate(topic)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/25">
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Tentar novamente
              </button>
            </div>
          )}

          {!loading && !error && script && (
            <div className="space-y-4">
              {script.split(/(?=### )/).map((section, index) => {
                if (!section.trim()) return null;
                const lines = section.trim().split('\n');
                const heading = lines[0].replace('### ', '');
                const body = lines.slice(1).join('\n').trim();
                const isVerification = heading.toLowerCase().includes('conferir');

                return (
                  <section key={`${heading}-${index}`} className={`rounded-2xl border p-5 ${isVerification ? 'border-amber-500/20 bg-amber-500/5' : 'border-white/10 bg-white/[0.03]'}`}>
                    <h3 className={`text-sm font-bold uppercase tracking-[0.12em] ${isVerification ? 'text-amber-300' : 'text-blue-300'}`}>{heading}</h3>
                    <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-200">{body}</div>
                  </section>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/10 px-5 py-4 sm:px-6">
          <p className="max-w-xl text-xs leading-relaxed text-slate-500">Use o roteiro como estrutura. Antes de gravar, entenda o conceito e adapte para sua forma de falar.</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => generate(topic)} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/5 disabled:opacity-50">
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Gerar novamente
            </button>
            <button type="button" onClick={copyScript} disabled={!script || loading} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50">
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? 'Copiado' : 'Copiar roteiro'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
