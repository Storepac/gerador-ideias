'use client';

import React from 'react';
import { GrowthTopic } from '@/lib/growthTopics';
import { Bookmark, CalendarPlus, CheckCircle2, HelpCircle, Sparkles, Target, Video } from 'lucide-react';

interface TopicCardProps {
  topic: GrowthTopic;
  onExplain: (topic: GrowthTopic) => void;
  onCreateScript: (topic: GrowthTopic) => void;
  onAddToPlan: (topic: GrowthTopic) => void;
  onStartChallenge: (topic: GrowthTopic) => void;
  isBookmarked: boolean;
  onToggleBookmark: (topicId: string) => void;
  isInPlan?: boolean;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onExplain, onCreateScript, onAddToPlan, onStartChallenge, isBookmarked, onToggleBookmark, isInPlan = false }) => {
  return (
    <article className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.05]">
      <div>
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-300">{topic.categoryLabel}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300">{topic.difficulty}</span>
          </div>
          <button type="button" onClick={() => onToggleBookmark(topic.id)} aria-label={isBookmarked ? 'Remover dos favoritos' : 'Favoritar tema'} className={isBookmarked ? 'rounded-xl bg-blue-500/10 p-2 text-blue-300 ring-1 ring-blue-500/20' : 'rounded-xl p-2 text-slate-500 transition hover:bg-white/5 hover:text-white'}>
            <Bookmark className="h-4 w-4" fill={isBookmarked ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>
        </div>

        <h3 className="text-xl font-bold leading-snug text-white transition group-hover:text-blue-200">{topic.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{topic.shortDescription}</p>

        {topic.keyQuestions?.[0] && (
          <div className="mt-5 rounded-2xl border border-white/5 bg-black/15 p-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-300"><HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />Pergunta para pensar</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{topic.keyQuestions[0]}</p>
          </div>
        )}

        {topic.suggestedFramework && <div className="mt-4 text-xs leading-5 text-slate-500"><span className="font-semibold text-slate-400">Framework: </span>{topic.suggestedFramework}</div>}
      </div>

      <div className="mt-6 space-y-2 border-t border-white/10 pt-5">
        <button type="button" onClick={() => onExplain(topic)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"><Sparkles className="h-4 w-4" aria-hidden="true" />Entender com IA</button>
        <button type="button" onClick={() => onCreateScript(topic)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/15"><Video className="h-4 w-4" aria-hidden="true" />Roteiro 60–90s</button>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onStartChallenge(topic)} className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"><Target className="h-3.5 w-3.5 text-blue-300" aria-hidden="true" />Aplicar</button>
          <button type="button" onClick={() => onAddToPlan(topic)} className={isInPlan ? 'flex items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-200' : 'flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white'}>
            {isInPlan ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />}{isInPlan ? 'No plano' : 'Planejar'}
          </button>
        </div>
      </div>
    </article>
  );
};
