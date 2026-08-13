'use client';

import React, { useState } from 'react';
import { BookOpen, Calendar, FileText, Plus, Sparkles, Trash2 } from 'lucide-react';
import type { WeeklyPlanItem } from '@/lib/storage';
import type { GrowthTopic } from '@/lib/growthTopics';

interface StudyPlannerProps {
  plan: WeeklyPlanItem[];
  allTopics: GrowthTopic[];
  onUpdateItemStatus: (itemId: string, status: WeeklyPlanItem['status']) => void;
  onUpdateItemNotes: (itemId: string, notes: string) => void;
  onRemoveItem: (itemId: string) => void;
  onExplainTopic: (topic: GrowthTopic) => void;
  onOpenLibraryToSelect: (weekNumber: number) => void;
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({ plan, onUpdateItemStatus, onUpdateItemNotes, onRemoveItem, onExplainTopic, onOpenLibraryToSelect }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const weeks = Array.from({ length: 8 }, (_, index) => index + 1);
  const currentWeekPlan = plan.filter((item) => item.weekNumber === selectedWeek);
  const completed = plan.filter((item) => item.status === 'mastered' || item.status === 'applied').length;
  const progress = plan.length ? Math.round((completed / plan.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-blue-500/20 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-300"><Calendar className="h-4 w-4" aria-hidden="true" />Plano de estudo</span>
            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Aprender com intenção, não por acúmulo.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Organize o que quer estudar, registre observações e marque quando o conceito foi entendido ou aplicado.</p>
          </div>
          <div className="min-w-56 rounded-2xl border border-white/10 bg-black/15 p-4">
            <div className="flex justify-between text-xs font-semibold text-slate-400"><span>Progresso</span><span className="text-blue-300">{progress}%</span></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all" style={{ width: `${progress}%` }} /></div>
            <p className="mt-2 text-xs text-slate-500">{completed} concluídos de {plan.length}</p>
          </div>
        </div>
      </section>

      <nav className="flex gap-2 overflow-x-auto pb-2" aria-label="Semanas do plano">
        {weeks.map((week) => {
          const count = plan.filter((item) => item.weekNumber === week).length;
          return <button key={week} type="button" onClick={() => setSelectedWeek(week)} className={selectedWeek === week ? 'shrink-0 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white' : 'shrink-0 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:bg-white/5 hover:text-white'}>Semana {week}{count ? ` · ${count}` : ''}</button>;
        })}
      </nav>

      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div><span className="text-xs font-bold uppercase tracking-wider text-blue-300">Semana {selectedWeek}</span><h2 className="mt-1 text-xl font-bold text-white">{currentWeekPlan.length} tema{currentWeekPlan.length === 1 ? '' : 's'} planejado{currentWeekPlan.length === 1 ? '' : 's'}</h2></div>
        <button type="button" onClick={() => onOpenLibraryToSelect(selectedWeek)} className="inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5 text-sm font-semibold text-blue-100 hover:bg-blue-500/15"><Plus className="h-4 w-4" aria-hidden="true" />Adicionar tema</button>
      </div>

      {currentWeekPlan.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center"><BookOpen className="mx-auto h-8 w-8 text-slate-600" aria-hidden="true" /><h2 className="mt-3 font-bold text-white">Semana ainda vazia</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Escolha um tema na biblioteca e use este espaço para acompanhar o que realmente quer aprender.</p></section>
      ) : (
        <div className="space-y-4">
          {currentWeekPlan.map((item) => (
            <article key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div><span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">{item.topic.categoryLabel}</span><h3 className="mt-1 text-xl font-bold text-white">{item.topic.title}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{item.topic.shortDescription}</p></div>
                <div className="flex items-center gap-2">
                  <select value={item.status} onChange={(event) => onUpdateItemStatus(item.id, event.target.value as WeeklyPlanItem['status'])} className="rounded-xl border border-white/10 bg-[#07111f] px-3 py-2 text-xs font-semibold text-slate-300">
                    <option value="planned">Planejado</option><option value="studying">Em estudo</option><option value="mastered">Dominado</option><option value="applied">Aplicado</option>
                  </select>
                  <button type="button" onClick={() => onRemoveItem(item.id)} aria-label="Remover tema do plano" className="rounded-xl p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-300"><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/5 bg-black/15 p-4">
                <div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400"><FileText className="h-4 w-4 text-blue-300" aria-hidden="true" />Minhas anotações</span>{editingNotesId !== item.id && <button type="button" onClick={() => setEditingNotesId(item.id)} className="text-xs font-semibold text-blue-300 hover:text-blue-200">{item.notes ? 'Editar' : 'Adicionar'}</button>}</div>
                {editingNotesId === item.id ? <textarea rows={3} defaultValue={item.notes} autoFocus onBlur={(event) => { onUpdateItemNotes(item.id, event.target.value); setEditingNotesId(null); }} className="mt-3 w-full rounded-xl border border-white/10 bg-[#07111f] p-3 text-sm text-white" placeholder="O que você entendeu, onde aplicaria e o que ainda precisa conferir?" /> : <p className="mt-3 text-sm leading-6 text-slate-400">{item.notes || 'Nenhuma anotação ainda.'}</p>}
              </div>

              <button type="button" onClick={() => onExplainTopic(item.topic)} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200"><Sparkles className="h-4 w-4" aria-hidden="true" />Abrir guia de estudo</button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
