'use client';

import React, { useState } from 'react';
import { GrowthTopic, CATEGORIES } from '@/lib/growthTopics';
import { TopicCard } from './TopicCard';
import { Sparkles, Dices, Layers, Filter, RefreshCw, Trophy, Zap, ArrowRight, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface RandomWheelProps {
  topics: GrowthTopic[];
  onExplain: (topic: GrowthTopic) => void;
  onAddToPlan: (topic: GrowthTopic) => void;
  onStartChallenge: (topic: GrowthTopic) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  plannedTopicIds: string[];
  onOpenLibrary?: () => void;
}

export const RandomWheel: React.FC<RandomWheelProps> = ({
  topics,
  onExplain,
  onAddToPlan,
  onStartChallenge,
  bookmarkedIds,
  onToggleBookmark,
  plannedTopicIds,
  onOpenLibrary,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [drawMode, setDrawMode] = useState<'single' | 'triple'>('single');
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [drawnTopics, setDrawnTopics] = useState<GrowthTopic[]>([]);
  const [spinCount, setSpinCount] = useState<number>(0);

  // Filter topics
  const filteredTopics = topics.filter((t) => {
    const categoryMatch = selectedCategory === 'all' || t.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || t.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const handleDraw = () => {
    if (filteredTopics.length === 0) return;

    setIsSpinning(true);
    setDrawnTopics([]);

    setTimeout(() => {
      let results: GrowthTopic[] = [];

      if (drawMode === 'single') {
        const randomIndex = Math.floor(Math.random() * filteredTopics.length);
        results = [filteredTopics[randomIndex]];
      } else {
        const shuffled = [...filteredTopics].sort(() => 0.5 - Math.random());
        results = shuffled.slice(0, Math.min(3, shuffled.length));
      }

      setDrawnTopics(results);
      setIsSpinning(false);
      setSpinCount((prev) => prev + 1);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c8a45d', '#e5c583', '#ffffff'],
      });

      // Smooth scroll directly to the drawn theme card
      setTimeout(() => {
        const resultsEl = document.getElementById('drawn-results');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 1200);
  };

  return (
    <div className="space-y-10">
      {/* Banner & Control Panel */}
      <div className="relative overflow-hidden bg-[#0d0d0d] rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c8a45d]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#c8a45d]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#c8a45d]/10 border border-[#c8a45d]/30 text-[#c8a45d] text-[10px] uppercase tracking-[0.2em] font-bold">
            <Zap className="w-3.5 h-3.5 text-[#c8a45d] fill-[#c8a45d]" />
            <span>Marketing, Growth & Strategy Hub</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
            Qual conceito de Marketing & Produto você vai <br className="hidden sm:inline" />
            <span className="italic text-[#c8a45d]">dominar esta semana?</span>
          </h2>

          <p className="text-sm text-white/60 leading-relaxed max-w-xl mx-auto">
            Sorteie temas de alto impacto em Marketing Digital, Branding, Vendas, Retenção, Mídia Paga, CRO, SEO e Estratégia de Produto.
          </p>

          {/* Mode selector */}
          <div className="pt-2 flex items-center justify-center space-x-3">
            <button
              onClick={() => setDrawMode('single')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                drawMode === 'single'
                  ? 'bg-[#c8a45d] text-black shadow-[0_0_20px_rgba(200,164,93,0.25)]'
                  : 'bg-[#141414] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              <Dices className="w-4 h-4" />
              <span>Sorteio Único (1 Tema)</span>
            </button>

            <button
              onClick={() => setDrawMode('triple')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                drawMode === 'triple'
                  ? 'bg-[#c8a45d] text-black shadow-[0_0_20px_rgba(200,164,93,0.25)]'
                  : 'bg-[#141414] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Combo Trio (3 Temas)</span>
            </button>
          </div>

          {/* Filters Bar */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto bg-[#141414] p-4 rounded-2xl border border-white/10">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-white/40 text-left mb-1.5 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#c8a45d]" /> Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#0a0a0a] text-white/90 text-xs rounded-xl border border-white/10 px-3 py-2.5 focus:outline-none focus:border-[#c8a45d]/60"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-white/40 text-left mb-1.5">
                Dificuldade
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-[#0a0a0a] text-white/90 text-xs rounded-xl border border-white/10 px-3 py-2.5 focus:outline-none focus:border-[#c8a45d]/60"
              >
                <option value="all">Todas as Dificuldades</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>
          </div>

          {/* Spin Trigger Button */}
          <div className="pt-4">
            <button
              onClick={handleDraw}
              disabled={isSpinning || filteredTopics.length === 0}
              className="relative group overflow-hidden px-10 py-4 bg-[#c8a45d] text-black font-bold text-sm uppercase tracking-[0.15em] hover:brightness-110 shadow-[0_0_30px_rgba(200,164,93,0.25)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <Dices className={`w-5 h-5 ${isSpinning ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                <span>{isSpinning ? 'Sortando Conceito...' : 'Sortear Tema da Semana'}</span>
                <Sparkles className="w-4 h-4 text-black" />
              </span>
            </button>

            {filteredTopics.length === 0 && (
              <p className="text-xs text-[#c8a45d] mt-3">
                Nenhum tema encontrado para este filtro. Ajuste os filtros acima.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Spinning Visual Effect or Drawn Results */}
      {isSpinning && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="w-16 h-16 rounded-full border border-[#c8a45d] bg-[#141414] p-1 flex items-center justify-center shadow-[0_0_25px_rgba(200,164,93,0.3)]"
          >
            <Dices className="w-8 h-8 text-[#c8a45d]" />
          </motion.div>
          <p className="text-xs uppercase tracking-widest text-white/50 animate-pulse">
            Sorteando conceito de alta alavancagem...
          </p>
        </div>
      )}

      {!isSpinning && drawnTopics.length > 0 && (
        <motion.div
          id="drawn-results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 pt-2 scroll-mt-24"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <Trophy className="w-5 h-5 text-[#c8a45d]" />
              <h3 className="text-xl font-serif text-white">
                {drawMode === 'single' ? 'Tema Sorteado para Estudo' : 'Combo de 3 Conceitos Interseccionados'}
              </h3>
            </div>

            <button
              onClick={handleDraw}
              className="flex items-center space-x-2 text-xs text-[#c8a45d] hover:text-[#e5c583] bg-[#141414] px-4 py-2 rounded-full border border-[#c8a45d]/30 uppercase tracking-wider font-semibold transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sortear Novamente</span>
            </button>
          </div>

          {/* If triple combo mode, show combo challenge header */}
          {drawMode === 'triple' && drawnTopics.length === 3 && (
            <div className="bg-[#0d0d0d] p-6 rounded-2xl border border-[#c8a45d]/30 shadow-lg">
              <div className="flex items-center space-x-2 text-[#c8a45d] text-xs font-bold uppercase tracking-widest mb-2">
                <Lightbulb className="w-4 h-4" />
                <span>Desafio de Interseção de Growth</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed font-serif">
                Como você combinaria <strong className="text-white">{drawnTopics[0].title}</strong>, <strong className="text-white">{drawnTopics[1].title}</strong> e <strong className="text-white">{drawnTopics[2].title}</strong> para alavancar retenção e monetização no seu produto hoje?
              </p>
            </div>
          )}

          <div
            className={`grid gap-6 ${
              drawnTopics.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-3'
            }`}
          >
            {drawnTopics.map((topic) => (
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
        </motion.div>
      )}

      {!isSpinning && drawnTopics.length === 0 && (
        <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-10 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#141414] text-[#c8a45d] border border-[#c8a45d]/30 flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-serif text-white">Pronto para começar seu estudo semanal?</h4>
          <p className="text-xs text-white/50 max-w-md mx-auto leading-relaxed">
            Clique no botão acima para sortear um tema de alta alavancagem em Marketing, Produto ou Vendas, ou consulte diretamente nosso acervo interno de {topics.length} conceitos.
          </p>

          {onOpenLibrary && (
            <div className="pt-2">
              <button
                onClick={onOpenLibrary}
                className="inline-flex items-center space-x-2 text-xs text-white/70 hover:text-white bg-[#141414] hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 font-medium transition-all"
              >
                <span>Consultar Acervo Interno ({topics.length} Conceitos)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c8a45d]" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

