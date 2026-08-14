'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Route, Video } from 'lucide-react';
import { ContentScriptModal } from '@/components/ContentScriptModal';
import type { GrowthTopic } from '@/lib/growthTopics';
import { LEARNING_TRACKS, getTopicsForTrack, type LearningTrackId } from '@/lib/learningTracks';
import { OFFICIAL_TOPICS } from '@/lib/topicCatalog';
import { getStoredPrefs } from '@/lib/storage';

type TrackFilter = 'all' | LearningTrackId;

export default function RoteiroPage() {
  const [selectedTopic, setSelectedTopic] = useState<GrowthTopic | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<TrackFilter>('all');
  const [productContext] = useState(() => typeof window !== 'undefined' ? getStoredPrefs().productContext : '');

  const visibleTopics = useMemo(
    () => selectedTrackId === 'all' ? OFFICIAL_TOPICS : getTopicsForTrack(OFFICIAL_TOPICS, selectedTrackId),
    [selectedTrackId],
  );

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar ao Learning Lab
      </Link>

      <section className="mt-8 rounded-[2rem] border border-blue-500/20 bg-white/[0.03] p-6 sm:p-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-100">
          <Video className="h-3.5 w-3.5" aria-hidden="true" /> TechForWeb Content Lab
        </span>
        <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl">Transforme estudo em uma explicação de 60–90 segundos.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">Escolha um tema, gere uma estrutura e use o roteiro como apoio. O objetivo é entender primeiro e gravar depois com a sua própria forma de falar.</p>
      </section>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6" aria-labelledby="content-track-title">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-200">
            <Route className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h2 id="content-track-title" className="font-bold text-white">Filtre pela trilha que você está estudando</h2>
            <p className="mt-1 text-sm leading-6 text-slate-400">Assim o Content Lab mostra apenas os assuntos daquele caminho e mantém a sequência de estudo.</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={selectedTrackId === 'all'}
            onClick={() => setSelectedTrackId('all')}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${selectedTrackId === 'all' ? 'border-blue-400/40 bg-blue-500/15 text-blue-100' : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}`}
          >
            Todos os temas
          </button>
          {LEARNING_TRACKS.map((track) => (
            <button
              key={track.id}
              type="button"
              aria-pressed={selectedTrackId === track.id}
              onClick={() => setSelectedTrackId(track.id)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${selectedTrackId === track.id ? 'border-blue-400/40 bg-blue-500/15 text-blue-100' : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}`}
            >
              {track.shortTitle}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-white">Escolha o assunto</h2>
          <span className="text-xs text-slate-500">{visibleTopics.length} temas</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleTopics.map((topic, index) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => setSelectedTopic(topic)}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-white/[0.05]"
            >
              {selectedTrackId !== 'all' && (
                <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-[10px] font-black text-blue-200">{index + 1}</span>
              )}
              <span className="pr-8 text-[10px] font-bold uppercase tracking-wider text-blue-300">{topic.categoryLabel}</span>
              <h3 className="mt-2 pr-5 font-bold leading-snug text-white">{topic.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{topic.shortDescription}</p>
            </button>
          ))}
        </div>
      </section>

      <ContentScriptModal topic={selectedTopic} productContext={productContext} onClose={() => setSelectedTopic(null)} />
    </main>
  );
}
