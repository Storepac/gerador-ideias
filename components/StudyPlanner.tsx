'use client';

import React, { useState } from 'react';
import { WeeklyPlanItem } from '@/lib/storage';
import { GrowthTopic } from '@/lib/growthTopics';
import { Calendar, CheckCircle2, Flame, BookOpen, Trash2, Plus, Sparkles, Check, ChevronDown, Award, FileText, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudyPlannerProps {
  plan: WeeklyPlanItem[];
  allTopics: GrowthTopic[];
  onUpdateItemStatus: (itemId: string, status: WeeklyPlanItem['status']) => void;
  onUpdateItemNotes: (itemId: string, notes: string) => void;
  onRemoveItem: (itemId: string) => void;
  onExplainTopic: (topic: GrowthTopic) => void;
  onOpenLibraryToSelect: (weekNumber: number) => void;
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({
  plan,
  allTopics,
  onUpdateItemStatus,
  onUpdateItemNotes,
  onRemoveItem,
  onExplainTopic,
  onOpenLibraryToSelect,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);

  // Weeks range (1 to 8)
  const weeks = Array.from({ length: 8 }, (_, i) => i + 1);

  const currentWeekPlan = plan.filter((item) => item.weekNumber === selectedWeek);

  const totalMastered = plan.filter((item) => item.status === 'mastered' || item.status === 'applied').length;
  const totalCount = plan.length;
  const progressPercent = totalCount > 0 ? Math.round((totalMastered / totalCount) * 100) : 0;

  const handleStatusChange = (itemId: string, newStatus: WeeklyPlanItem['status']) => {
    onUpdateItemStatus(itemId, newStatus);

    if (newStatus === 'mastered' || newStatus === 'applied') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c8a45d', '#e5c583', '#ffffff'],
      });
    }
  };

  const statusLabels = {
    planned: { label: 'Planejado', color: 'bg-[#141414] text-white/70 border-white/10' },
    studying: { label: 'Em Estudo 📖', color: 'bg-[#c8a45d]/10 text-[#c8a45d] border-[#c8a45d]/30' },
    mastered: { label: 'Dominado 🎉', color: 'bg-[#c8a45d]/20 text-[#f5d898] border-[#c8a45d]/50 font-bold' },
    applied: { label: 'Aplicado no Trabalho 🚀', color: 'bg-[#c8a45d] text-black border-[#c8a45d] font-bold' },
  };

  return (
    <div className="space-y-8">
      {/* Top Overview Bar */}
      <div className="bg-[#0d0d0d] rounded-3xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#c8a45d]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Plano Estratégico de Estudo Semanal</span>
            </div>
            <h2 className="text-3xl font-serif text-white tracking-tight">
              Sua Jornada de <span className="italic text-[#c8a45d]">Senioridade em Growth</span>
            </h2>
            <p className="text-xs text-white/60 max-w-xl leading-relaxed">
              Organize seus tópicos por semana, registre notas pessoais, aplique hipóteses reais no seu produto e acompanhe seu progresso de domínio.
            </p>
          </div>

          {/* Progress gauge card */}
          <div className="bg-[#141414] p-5 rounded-2xl border border-white/10 min-w-[250px] space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs text-white/80 font-bold uppercase tracking-wider">
              <span>Progresso Geral</span>
              <span className="text-[#c8a45d] font-mono">{progressPercent}%</span>
            </div>

            <div className="w-full h-2 bg-[#0a0a0a] rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-[#c8a45d] transition-all duration-500 shadow-[0_0_10px_rgba(200,164,93,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40 font-semibold pt-1">
              <span>{totalMastered} Concluídos</span>
              <span>{totalCount} No Plano</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weeks Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {weeks.map((weekNum) => {
          const weekItems = plan.filter((i) => i.weekNumber === weekNum);
          const weekCompleted = weekItems.filter((i) => i.status === 'mastered' || i.status === 'applied').length;

          return (
            <button
              key={weekNum}
              onClick={() => setSelectedWeek(weekNum)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${
                selectedWeek === weekNum
                  ? 'bg-[#c8a45d] text-black shadow-[0_0_20px_rgba(200,164,93,0.25)]'
                  : 'bg-[#0d0d0d] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              <span>Semana {weekNum}</span>
              {weekItems.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  selectedWeek === weekNum ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'
                }`}>
                  {weekCompleted}/{weekItems.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Week Header & Add Button */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-serif text-white flex items-center space-x-3">
            <span>Semana {selectedWeek}</span>
            <span className="text-xs font-sans text-white/40 uppercase tracking-widest font-normal">
              ({currentWeekPlan.length} conceito{currentWeekPlan.length !== 1 ? 's' : ''} agendado{currentWeekPlan.length !== 1 ? 's' : ''})
            </span>
          </h3>
        </div>

        <button
          onClick={() => onOpenLibraryToSelect(selectedWeek)}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#141414] hover:bg-white/10 text-[#c8a45d] hover:text-[#e5c583] font-bold text-xs uppercase tracking-wider border border-[#c8a45d]/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Tema</span>
        </button>
      </div>

      {/* Week Topics List */}
      {currentWeekPlan.length === 0 ? (
        <div className="bg-[#0d0d0d] rounded-2xl border border-dashed border-white/10 p-12 text-center space-y-3">
          <Calendar className="w-10 h-10 text-white/20 mx-auto" />
          <h4 className="text-base font-serif text-white/80">Nenhum tema agendado para a Semana {selectedWeek}</h4>
          <p className="text-xs text-white/40 max-w-sm mx-auto leading-relaxed">
            Use o sorteador de conhecimento ou adicione temas da biblioteca para estruturar seus estudos nesta semana.
          </p>
          <button
            onClick={() => onOpenLibraryToSelect(selectedWeek)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#c8a45d] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(200,164,93,0.2)]"
          >
            <Plus className="w-4 h-4" />
            <span>Escolher Temas na Biblioteca</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {currentWeekPlan.map((item) => (
            <div
              key={item.id}
              className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-6 space-y-4 hover:border-[#c8a45d]/30 transition-all shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/5 text-white/70 border border-white/10">
                      {item.topic.categoryLabel}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      {item.topic.difficulty}
                    </span>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-white">{item.topic.title}</h4>
                </div>

                {/* Status Selector dropdown */}
                <div className="flex items-center space-x-2 shrink-0">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value as WeeklyPlanItem['status'])}
                    className={`text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5 border focus:outline-none transition-all cursor-pointer bg-[#0a0a0a] ${
                      statusLabels[item.status].color
                    }`}
                  >
                    <option value="planned">Planejado</option>
                    <option value="studying">Em Estudo 📖</option>
                    <option value="mastered">Dominado 🎉</option>
                    <option value="applied">Aplicado no Trabalho 🚀</option>
                  </select>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-white/30 hover:text-red-400 rounded-full hover:bg-white/5 transition-colors"
                    title="Remover do plano"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-white/60 leading-relaxed">
                {item.topic.shortDescription}
              </p>

              {/* Personal Notes Box */}
              <div className="bg-[#141414] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-white/40">
                  <span className="flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#c8a45d]" />
                    <span>Minhas Anotações & Observações Práticas</span>
                  </span>
                  {editingNotesId !== item.id && (
                    <button
                      onClick={() => setEditingNotesId(item.id)}
                      className="text-[#c8a45d] hover:underline text-[10px] uppercase font-bold"
                    >
                      {item.notes ? 'Editar' : 'Adicionar Nota'}
                    </button>
                  )}
                </div>

                {editingNotesId === item.id ? (
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      defaultValue={item.notes}
                      onBlur={(e) => {
                        onUpdateItemNotes(item.id, e.target.value);
                        setEditingNotesId(null);
                      }}
                      autoFocus
                      placeholder="Anote sacadas, dados do seu produto atual, experimentos rodados ou dúvidas..."
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-xs text-white/90 focus:outline-none focus:border-[#c8a45d]"
                    />
                    <p className="text-[10px] text-white/30">
                      Clique fora do campo para salvar suas anotações.
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-white/70 italic font-serif">
                    {item.notes ? item.notes : 'Nenhuma anotação pessoal ainda. Clique em "Adicionar Nota" para registrar seus aprendizados.'}
                  </p>
                )}
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => onExplainTopic(item.topic)}
                  className="flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#c8a45d] hover:text-[#e5c583] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ver Guia de IA Completo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

