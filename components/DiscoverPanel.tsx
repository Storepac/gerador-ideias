'use client';

import { useState } from 'react';
import { ArrowRight, Filter, Layers, RefreshCw, Search, Sparkles } from 'lucide-react';
import { CATEGORIES, type GrowthTopic } from '@/lib/growthTopics';
import { TopicCard } from './TopicCard';

interface DiscoverPanelProps {
  topics: GrowthTopic[];
  onExplain: (topic: GrowthTopic) => void;
  onAddToPlan: (topic: GrowthTopic) => void;
  onStartChallenge: (topic: GrowthTopic) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  plannedTopicIds: string[];
  onOpenLibrary?: () => void;
}

export function DiscoverPanel({
  topics,
  onExplain,
  onAddToPlan,
  onStartChallenge,
  bookmarkedIds,
  onToggleBookmark,
  plannedTopicIds,
  onOpenLibrary,
}: DiscoverPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [mode, setMode] = useState<'single' | 'triple'>('single');
  const [selectedTopics, setSelectedTopics] = useState<GrowthTopic[]>([]);

  const filteredTopics = topics.filter((topic) => {
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const chooseTopics = () => {
    if (filteredTopics.length === 0) return;

    const startIndex = Date.now() % filteredTopics.length;
    const quantity = mode === 'single' ? 1 : Math.min(3, filteredTopics.length);
    const result = Array.from({ length: quantity }, (_, index) => filteredTopics[(startIndex + index) % filteredTopics.length]);
    setSelectedTopics(result);

    window.setTimeout(() => {
      document.getElementById('discover-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-[#0b1728] p-8 shadow-2xl shadow-blue-950/20 sm:p-12">
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Qual conceito de Marketing & Produto você vai
            <span className="mt-2 block text-blue-300">dominar esta semana?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Encontre um próximo assunto para estudar, aplicar em um problema real e transformar em conteúdo quando fizer sentido.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setMode('single')}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${mode === 'single' ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/30' : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              1 tema
            </button>
            <button
              type="button"
              onClick={() => setMode('triple')}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${mode === 'triple' ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/30' : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Layers className="h-4 w-4" aria-hidden="true" />
              3 temas
            </button>
          </div>

          <div className="mx-auto mt-6 grid max-w-xl grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-[#07111f]/70 p-4 sm:grid-cols-2">
            <div className="text-left">
              <label htmlFor="discover-category" className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <Filter className="h-3 w-3 text-blue-300" aria-hidden="true" /> Categoria
              </label>
              <select id="discover-category" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#07111f] px-3 py-2.5 text-xs text-white focus:border-blue-500/60 focus:outline-none">
                {CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}
              </select>
            </div>

            <div className="text-left">
              <label htmlFor="discover-difficulty" className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-400">Dificuldade</label>
              <select id="discover-difficulty" value={selectedDifficulty} onChange={(event) => setSelectedDifficulty(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#07111f] px-3 py-2.5 text-xs text-white focus:border-blue-500/60 focus:outline-none">
                <option value="all">Todas as dificuldades</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>
          </div>

          <button type="button" onClick={chooseTopics} disabled={filteredTopics.length === 0} className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-950/30 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Encontrar tema da semana
          </button>

          {filteredTopics.length === 0 && <p className="mt-3 text-xs text-cyan-300">Nenhum tema encontrado. Ajuste os filtros.</p>}
        </div>
      </section>

      {selectedTopics.length > 0 ? (
        <section id="discover-results" className="scroll-mt-24 space-y-5">
          <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Próximo passo</p>
              <h2 className="mt-1 text-xl font-bold text-white">{selectedTopics.length === 1 ? 'Tema para explorar agora' : 'Temas para conectar'}</h2>
            </div>
            <button type="button" onClick={chooseTopics} className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-200 transition hover:bg-blue-500/15">
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> Outra seleção
            </button>
          </div>

          <div className={`grid gap-6 ${selectedTopics.length === 1 ? 'mx-auto max-w-2xl grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            {selectedTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} onExplain={onExplain} onAddToPlan={onAddToPlan} onStartChallenge={onStartChallenge} isBookmarked={bookmarkedIds.includes(topic.id)} onToggleBookmark={onToggleBookmark} isInPlan={plannedTopicIds.includes(topic.id)} />
            ))}
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="text-sm text-slate-500">Você também pode navegar por todos os conceitos já cadastrados.</p>
          {onOpenLibrary && (
            <button type="button" onClick={onOpenLibrary} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white">
              Abrir biblioteca <ArrowRight className="h-3.5 w-3.5 text-blue-300" aria-hidden="true" />
            </button>
          )}
        </section>
      )}
    </div>
  );
}
