'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, Search } from 'lucide-react';
import { GrowthTopic, CATEGORIES } from '@/lib/growthTopics';
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

export const TopicLibrary: React.FC<TopicLibraryProps> = ({ topics, onExplain, onAddToPlan, onStartChallenge, bookmarkedIds, onToggleBookmark, plannedTopicIds, onOpenCreateTopicModal }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  const filtered = topics.filter((topic) => {
    const term = query.trim().toLowerCase();
    const matchesText = !term || topic.title.toLowerCase().includes(term) || topic.shortDescription.toLowerCase().includes(term) || topic.tags.some((tag) => tag.toLowerCase().includes(term));
    const matchesCategory = category === 'all' || topic.category === category;
    const matchesDifficulty = difficulty === 'all' || topic.difficulty === difficulty;
    const matchesBookmark = !onlyBookmarks || bookmarkedIds.includes(topic.id);
    return matchesText && matchesCategory && matchesDifficulty && matchesBookmark;
  });

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-blue-500/20 bg-white/[0.03] p-6 sm:p-8">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Biblioteca TechForWeb</span>
        <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">Repertório para aprender e aplicar.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Explore conceitos de produto, growth, marketing, vendas e estratégia. Salve o que faz sentido e leve para seu plano de estudo.</p>
          </div>
          <button type="button" onClick={onOpenCreateTopicModal} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"><Plus className="h-4 w-4" aria-hidden="true" />Novo tema</button>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-12">
        <label className="relative md:col-span-6">
          <span className="sr-only">Buscar tema</span>
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar tema, framework ou métrica..." className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-600" />
        </label>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-white md:col-span-3">
          {CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
        <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} className="rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-white md:col-span-3">
          <option value="all">Todos os níveis</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <span>{filtered.length} de {topics.length} temas</span>
        <label className="inline-flex items-center gap-2"><input type="checkbox" checked={onlyBookmarks} onChange={(event) => setOnlyBookmarks(event.target.checked)} />Somente favoritos ({bookmarkedIds.length})</label>
      </div>

      {filtered.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((topic) => <TopicCard key={topic.id} topic={topic} onExplain={onExplain} onAddToPlan={onAddToPlan} onStartChallenge={onStartChallenge} isBookmarked={bookmarkedIds.includes(topic.id)} onToggleBookmark={onToggleBookmark} isInPlan={plannedTopicIds.includes(topic.id)} />)}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center"><BookOpen className="mx-auto h-8 w-8 text-slate-600" aria-hidden="true" /><h2 className="mt-3 font-bold text-white">Nenhum tema encontrado</h2><p className="mt-2 text-sm text-slate-500">Ajuste os filtros ou cadastre um novo assunto.</p></div>
      )}
    </div>
  );
};
