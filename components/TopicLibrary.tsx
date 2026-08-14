'use client';

import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Plus, Route, Search, X } from 'lucide-react';
import { GrowthTopic, CATEGORIES } from '@/lib/growthTopics';
import {
  LEARNING_TRACKS,
  getLearningTrack,
  getTopicsForTrack,
  type LearningTrackId,
} from '@/lib/learningTracks';
import { TopicCard } from './TopicCard';

interface TopicLibraryProps {
  topics: GrowthTopic[];
  onExplain: (topic: GrowthTopic) => void;
  onAddToPlan: (topic: GrowthTopic) => void;
  onStartChallenge: (topic: GrowthTopic) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  plannedTopicIds: string[];
  onOpenCreateTopicModal: () => void;
}

type TrackFilter = 'all' | LearningTrackId;

export const TopicLibrary: React.FC<TopicLibraryProps> = ({
  topics,
  onExplain,
  onAddToPlan,
  onStartChallenge,
  bookmarkedIds,
  onToggleBookmark,
  plannedTopicIds,
  onOpenCreateTopicModal,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<TrackFilter>('all');

  const selectedTrack = selectedTrackId === 'all' ? undefined : getLearningTrack(selectedTrackId);

  const trackTopics = useMemo(
    () => selectedTrackId === 'all' ? topics : getTopicsForTrack(topics, selectedTrackId),
    [selectedTrackId, topics],
  );

  const filtered = trackTopics.filter((topic) => {
    const term = query.trim().toLowerCase();
    const matchesText = !term
      || topic.title.toLowerCase().includes(term)
      || topic.shortDescription.toLowerCase().includes(term)
      || topic.tags.some((tag) => tag.toLowerCase().includes(term));
    const matchesCategory = category === 'all' || topic.category === category;
    const matchesDifficulty = difficulty === 'all' || topic.difficulty === difficulty;
    const matchesBookmark = !onlyBookmarks || bookmarkedIds.includes(topic.id);
    return matchesText && matchesCategory && matchesDifficulty && matchesBookmark;
  });

  const selectTrack = (trackId: LearningTrackId) => {
    setSelectedTrackId(trackId);
    setCategory('all');
    setQuery('');
  };

  const clearTrack = () => {
    setSelectedTrackId('all');
    setCategory('all');
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-blue-500/20 bg-white/[0.03] p-6 sm:p-8">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Biblioteca TechForWeb</span>
        <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">Repertório para aprender e aplicar.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Escolha uma trilha pronta ou explore livremente Product Management, Growth, Dados, IA, Marketing, Vendas e Estratégia.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenCreateTopicModal}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Novo tema
          </button>
        </div>
      </section>

      <section aria-labelledby="learning-tracks-title" className="space-y-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">
              <Route className="h-4 w-4" aria-hidden="true" /> Trilhas de aprendizado
            </span>
            <h2 id="learning-tracks-title" className="mt-2 text-2xl font-black text-white">Escolha um caminho, não só um assunto.</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Cada trilha combina temas de áreas diferentes em uma sequência curada. Um mesmo tema pode aparecer em mais de uma trilha quando ele conecta competências.
            </p>
          </div>
          {selectedTrack && (
            <button
              type="button"
              onClick={clearTrack}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" /> Ver todos os temas
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {LEARNING_TRACKS.map((track) => {
            const isActive = selectedTrackId === track.id;
            const availableTopics = getTopicsForTrack(topics, track.id);
            const plannedCount = availableTopics.filter((topic) => plannedTopicIds.includes(topic.id)).length;

            return (
              <button
                key={track.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectTrack(track.id)}
                className={`group rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 hover:border-blue-400/40 ${track.accent} ${isActive ? 'ring-2 ring-blue-400/50 ring-offset-2 ring-offset-[#07111f]' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-80">Trilha</span>
                    <h3 className="mt-1 text-lg font-black text-white">{track.title}</h3>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{track.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold">
                  <span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-slate-200">{availableTopics.length} temas</span>
                  {plannedCount > 0 && (
                    <span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-slate-200">{plannedCount} no plano</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {selectedTrack && (
        <section className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300">Trilha ativa</span>
          <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-black text-white">{selectedTrack.title}</h2>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">{selectedTrack.outcome}</p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-blue-200">{trackTopics.length} temas na sequência</span>
          </div>
        </section>
      )}

      <section className="grid gap-3 md:grid-cols-12" aria-label="Filtros da biblioteca">
        <label className="relative md:col-span-6">
          <span className="sr-only">Buscar tema</span>
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar tema, framework ou métrica..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-600"
          />
        </label>
        <select
          aria-label="Filtrar por categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-white md:col-span-3"
        >
          {CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
        <select
          aria-label="Filtrar por dificuldade"
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
          className="rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-white md:col-span-3"
        >
          <option value="all">Todos os níveis</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <span>{filtered.length} de {selectedTrack ? trackTopics.length : topics.length} temas{selectedTrack ? ` na trilha ${selectedTrack.shortTitle}` : ''}</span>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={onlyBookmarks} onChange={(event) => setOnlyBookmarks(event.target.checked)} />
          Somente favoritos ({bookmarkedIds.length})
        </label>
      </div>

      {filtered.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((topic, index) => (
            <div key={topic.id} className="relative">
              {selectedTrack && (
                <span className="absolute -left-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-blue-400/30 bg-[#0b1728] text-[10px] font-black text-blue-200 shadow-lg">
                  {index + 1}
                </span>
              )}
              <TopicCard
                topic={topic}
                onExplain={onExplain}
                onAddToPlan={onAddToPlan}
                onStartChallenge={onStartChallenge}
                isBookmarked={bookmarkedIds.includes(topic.id)}
                onToggleBookmark={onToggleBookmark}
                isInPlan={plannedTopicIds.includes(topic.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-slate-600" aria-hidden="true" />
          <h2 className="mt-3 font-bold text-white">Nenhum tema encontrado</h2>
          <p className="mt-2 text-sm text-slate-500">Ajuste os filtros, escolha outra trilha ou cadastre um novo assunto.</p>
        </div>
      )}
    </div>
  );
};