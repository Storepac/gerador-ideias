'use client';

import React from 'react';
import { GrowthTopic } from '@/lib/growthTopics';
import { Sparkles, Bookmark, CalendarPlus, Target, HelpCircle, CheckCircle2, ChevronRight } from 'lucide-react';

interface TopicCardProps {
  topic: GrowthTopic;
  onExplain: (topic: GrowthTopic) => void;
  onAddToPlan: (topic: GrowthTopic) => void;
  onStartChallenge: (topic: GrowthTopic) => void;
  isBookmarked: boolean;
  onToggleBookmark: (topicId: string) => void;
  isInPlan?: boolean;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  onExplain,
  onAddToPlan,
  onStartChallenge,
  isBookmarked,
  onToggleBookmark,
  isInPlan = false,
}) => {
  const difficultyColors = {
    Iniciante: 'bg-[#c8a45d]/10 text-[#c8a45d] border-[#c8a45d]/30',
    Intermediário: 'bg-[#c8a45d]/15 text-[#e5c583] border-[#c8a45d]/40',
    Avançado: 'bg-[#c8a45d]/20 text-[#f5d898] border-[#c8a45d]/50',
  };

  return (
    <div className="group relative bg-[#0d0d0d] hover:bg-[#121212] rounded-2xl border border-white/10 hover:border-[#c8a45d]/40 p-6 transition-all duration-300 shadow-xl flex flex-col justify-between">
      <div>
        {/* Header Badges */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/5 text-white/70 border border-white/10">
              {topic.categoryLabel}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                difficultyColors[topic.difficulty]
              }`}
            >
              {topic.difficulty}
            </span>
          </div>

          <button
            onClick={() => onToggleBookmark(topic.id)}
            className={`p-1.5 rounded-full transition-colors ${
              isBookmarked
                ? 'text-[#c8a45d] bg-[#c8a45d]/10 border border-[#c8a45d]/30'
                : 'text-white/30 hover:text-white/80 hover:bg-white/5'
            }`}
            title={isBookmarked ? 'Remover dos favoritos' : 'Favoritar tema'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#c8a45d] transition-colors mb-2.5 leading-snug">
          {topic.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-white/60 leading-relaxed mb-4 line-clamp-3">
          {topic.shortDescription}
        </p>

        {/* Key Questions Preview */}
        {topic.keyQuestions && topic.keyQuestions.length > 0 && (
          <div className="mb-4 bg-[#141414] rounded-xl p-3 border border-white/5">
            <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-widest font-bold text-[#c8a45d] mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questão Guia</span>
            </div>
            <p className="text-xs text-white/80 italic font-serif">
              &quot;{topic.keyQuestions[0]}&quot;
            </p>
          </div>
        )}

        {/* Framework & Real Example Badge */}
        {topic.suggestedFramework && (
          <div className="mb-4 flex items-center space-x-2 text-[11px] text-white/50">
            <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Framework:</span>
            <span className="bg-white/5 text-white/80 px-2 py-0.5 rounded text-xs border border-white/10 truncate max-w-full font-mono">
              {topic.suggestedFramework}
            </span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-white/10 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onExplain(topic)}
            className="flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-full bg-[#c8a45d] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(200,164,93,0.15)] transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guia IA</span>
          </button>

          <button
            onClick={() => onStartChallenge(topic)}
            className="flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-full bg-[#141414] hover:bg-white/10 text-white/80 hover:text-white font-medium text-xs uppercase tracking-wider transition-all border border-white/10"
          >
            <Target className="w-3.5 h-3.5 text-[#c8a45d]" />
            <span>Desafio</span>
          </button>
        </div>

        <button
          onClick={() => onAddToPlan(topic)}
          className={`w-full flex items-center justify-center space-x-1.5 px-3 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
            isInPlan
              ? 'bg-[#c8a45d]/10 text-[#c8a45d] border border-[#c8a45d]/30'
              : 'bg-[#141414] hover:bg-white/5 text-white/60 hover:text-white border border-white/10'
          }`}
        >
          {isInPlan ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c8a45d]" />
              <span>No Plano Semanal</span>
            </>
          ) : (
            <>
              <CalendarPlus className="w-3.5 h-3.5 text-[#c8a45d]" />
              <span>Adicionar ao Plano</span>
              <ChevronRight className="w-3 h-3 text-white/30" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

