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
    Iniciante: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    Intermediário: 'bg-cyan-500/10 text-cyan-200 border-cyan-500/20',
    Avançado: 'bg-violet-500/10 text-violet-200 border-violet-500/20',
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.05]">
      <div>
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-300">{topic.categoryLabel}</span>
            <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${difficultyColors[topic.difficulty]}`}>{topic.difficulty}</span>
          </div>
          <button type="button" onClick={() => onToggleBookmark(topic.id)} aria-label={isBookmarked ? 'Remover dos favoritos' : 'Favoritar tema'} className={isBookmarked ? 'rounded-full border border-blue-500/20 bg-blue-500/10 p-1.5 text-blue-300' : 'rounded-full p-1.5 text-slate-500 hover:bg-white/5 hover:text-white'}>
            <Bookmark className="h-4 w-4" fill={isBookmarked ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>
        </div>

        <h3 className="mb-2.5 text-xl font-bold leading-snug text-white transition group-hover:text-blue-200">{topic.title}</h3>
        <p className="mb-4 line-clamp-3 text-sm leading-6 text-slate-400">{topic.shortDescription}</p>

        {topic.keyQuestions?.[0] && (
          <div className="mb-4 rounded-xl border border-white/5 bg-black/15 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-300"><HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />Questão guia</div>
            <p className="text-xs leading-5 text-slate-300">{topic.keyQuestions[0]}</p>
          </div>
        )}
      </div>

      <div className="space-y-2 border-t border-white/10 pt-4">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onExplain(topic)} className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" />Guia IA</button>
          <button type="button" onClick={() => onStartChallenge(topic)} className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"><Target className="h-3.5 w-3.5 text-blue-300" aria-hidden="true" />Desafio</button>
        </div>
        <button type="button" onClick={() => onAddToPlan(topic)} className={isInPlan ? 'flex w-full items-center justify-center gap-1.5 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-200' : 'flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white'}>
          {isInPlan ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />}
          {isInPlan ? 'No plano semanal' : 'Adicionar ao plano'}
          {!isInPlan && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
};
