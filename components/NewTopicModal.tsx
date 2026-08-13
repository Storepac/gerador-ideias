'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { GrowthTopic, CATEGORIES } from '@/lib/growthTopics';

interface NewTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTopic: (topic: GrowthTopic) => void;
}

export const NewTopicModal: React.FC<NewTopicModalProps> = ({ isOpen, onClose, onCreateTopic }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GrowthTopic['category']>('retention');
  const [difficulty, setDifficulty] = useState<GrowthTopic['difficulty']>('Intermediário');
  const [shortDescription, setShortDescription] = useState('');
  const [keyQuestion, setKeyQuestion] = useState('');
  const [framework, setFramework] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !shortDescription.trim()) return;
    const selectedCategory = CATEGORIES.find((item) => item.id === category);
    onCreateTopic({
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      categoryLabel: selectedCategory?.label || 'Geral',
      difficulty,
      shortDescription: shortDescription.trim(),
      keyQuestions: keyQuestion.trim() ? [keyQuestion.trim()] : ['Como aplicar este conceito em um problema real?'],
      tags: ['Personalizado', selectedCategory?.label || 'Produto'],
      suggestedFramework: framework.trim() || undefined,
    });
    setTitle('');
    setShortDescription('');
    setKeyQuestion('');
    setFramework('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="new-topic-title">
      <div className="w-full max-w-xl rounded-3xl border border-blue-500/20 bg-[#0b1728] p-6 shadow-2xl shadow-blue-950/30 sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-300"><Plus className="h-5 w-5" aria-hidden="true" /></div><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Biblioteca</p><h2 id="new-topic-title" className="mt-1 text-xl font-bold text-white">Adicionar tema de estudo</h2></div></div>
          <button type="button" onClick={onClose} aria-label="Fechar novo tema" className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"><X className="h-5 w-5" aria-hidden="true" /></button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div><label htmlFor="topic-title" className="mb-1.5 block text-xs font-semibold text-slate-300">Tema</label><input id="topic-title" required value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#07111f] p-3 text-sm text-white" placeholder="Ex.: North Star Metric em marketplaces" /></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label htmlFor="topic-category" className="mb-1.5 block text-xs font-semibold text-slate-300">Categoria</label><select id="topic-category" value={category} onChange={(event) => setCategory(event.target.value as GrowthTopic['category'])} className="w-full rounded-xl border border-white/10 bg-[#07111f] p-3 text-sm text-white">{CATEGORIES.filter((item) => item.id !== 'all').map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></div>
            <div><label htmlFor="topic-difficulty" className="mb-1.5 block text-xs font-semibold text-slate-300">Nível</label><select id="topic-difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value as GrowthTopic['difficulty'])} className="w-full rounded-xl border border-white/10 bg-[#07111f] p-3 text-sm text-white"><option value="Iniciante">Iniciante</option><option value="Intermediário">Intermediário</option><option value="Avançado">Avançado</option></select></div>
          </div>
          <div><label htmlFor="topic-description" className="mb-1.5 block text-xs font-semibold text-slate-300">Por que estudar isso?</label><textarea id="topic-description" required rows={3} value={shortDescription} onChange={(event) => setShortDescription(event.target.value)} className="w-full resize-none rounded-xl border border-white/10 bg-[#07111f] p-3 text-sm text-white" placeholder="Descreva o conceito ou a dúvida que quer aprofundar." /></div>
          <div><label htmlFor="topic-question" className="mb-1.5 block text-xs font-semibold text-slate-300">Pergunta guia</label><input id="topic-question" value={keyQuestion} onChange={(event) => setKeyQuestion(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#07111f] p-3 text-sm text-white" placeholder="Ex.: como essa métrica muda a priorização do roadmap?" /></div>
          <div><label htmlFor="topic-framework" className="mb-1.5 block text-xs font-semibold text-slate-300">Framework ou referência</label><input id="topic-framework" value={framework} onChange={(event) => setFramework(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#07111f] p-3 text-sm text-white" placeholder="Opcional" /></div>

          <div className="flex justify-end gap-3 border-t border-white/10 pt-5"><button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5">Cancelar</button><button type="submit" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500">Salvar tema</button></div>
        </form>
      </div>
    </div>
  );
};
