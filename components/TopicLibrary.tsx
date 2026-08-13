'use client';

import React, { useState } from 'react';
import { GrowthTopic, CATEGORIES } from '@/lib/growthTopics';
import { TopicCard } from './TopicCard';
import { Search, Filter, Plus, BookOpen, Sparkles, Library } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);

  const filteredTopics = topics.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || t.difficulty === selectedDifficulty;
    const matchesBookmark = !onlyBookmarks || bookmarkedIds.includes(t.id);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmark;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0d0d0d] rounded-3xl border border-white/10 p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#c8a45d]">
            <Library className="w-3.5 h-3.5" />
            <span>Acervo Interno de Conhecimento</span>
          </div>
          <h2 className="text-3xl font-serif text-white tracking-tight">
            Repositório Estratégico de <span className="italic text-[#c8a45d]">Marketing, Produto & Vendas</span>
          </h2>
          <p className="text-xs text-white/60 max-w-xl leading-relaxed">
            Consulte qualquer um dos {topics.length} conceitos do acervo interno. Pesquise por termos de tráfego, branding, copywriting, CRO, onboarding, retenção e estratégia.
          </p>
        </div>

        <button
          onClick={onOpenCreateTopicModal}
          className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#c8a45d] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(200,164,93,0.2)] transition-all shrink-0"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Cadastrar Novo Tema</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-white/30 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por termo, métrica, framework (ex: Retention, CAC, Hook Model)..."
              className="w-full bg-[#141414] border border-white/10 rounded-full pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#c8a45d]"
            />
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-full px-4 py-3 text-xs text-white/90 focus:outline-none focus:border-[#c8a45d]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-full px-4 py-3 text-xs text-white/90 focus:outline-none focus:border-[#c8a45d]"
            >
              <option value="all">Todas as Dificuldades</option>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
        </div>

        {/* Bookmark Filter Toggle & Count */}
        <div className="flex items-center justify-between text-xs text-white/60 pt-1">
          <span className="font-bold text-white/80 uppercase tracking-widest text-[10px]">
            Exibindo {filteredTopics.length} de {topics.length} temas
          </span>

          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyBookmarks}
              onChange={(e) => setOnlyBookmarks(e.target.checked)}
              className="rounded border-white/10 bg-[#141414] text-[#c8a45d] focus:ring-[#c8a45d]"
            />
            <span className="text-xs">Apenas Favoritos ⭐ ({bookmarkedIds.length})</span>
          </label>
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length === 0 ? (
        <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-white/20 mx-auto" />
          <h4 className="text-base font-serif text-white">Nenhum tema encontrado</h4>
          <p className="text-xs text-white/40 max-w-sm mx-auto">
            Tente remover os filtros de busca ou crie um novo tema personalizado para o seu plano.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onExplain={onExplain}
              onAddToPlan={onAddToPlan}
              onStartChallenge={onStartChallenge}
              isBookmarked={bookmarkedIds.includes(topic.id)}
              onToggleBookmark={onToggleBookmark}
              isInPlan={plannedTopicIds.includes(topic.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

