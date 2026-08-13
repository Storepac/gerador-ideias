'use client';

import React, { useState } from 'react';
import { GrowthTopic, CATEGORIES } from '@/lib/growthTopics';
import { X, Plus, Sparkles } from 'lucide-react';

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
  const [realExample, setRealExample] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) return;

    const catObj = CATEGORIES.find((c) => c.id === category);

    const newTopic: GrowthTopic = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      categoryLabel: catObj ? catObj.label : 'Geral',
      difficulty,
      shortDescription: shortDescription.trim(),
      keyQuestions: keyQuestion.trim() ? [keyQuestion.trim()] : ['Como aplicar este conceito no meu produto?'],
      tags: ['Personalizado', catObj ? catObj.label : 'Growth'],
      suggestedFramework: framework.trim() || undefined,
      realWorldExample: realExample.trim() || undefined,
    };

    onCreateTopic(newTopic);
    onClose();

    // Reset form
    setTitle('');
    setShortDescription('');
    setKeyQuestion('');
    setFramework('');
    setRealExample('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#141414] text-[#c8a45d] border border-[#c8a45d]/30 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-serif text-white">Criar Tema Personalizado de Estudo</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5">Título do Conceito / Tema *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Viral Coefficient em Produtos B2B, Micro-Copy de Paywall..."
              className="w-full bg-[#141414] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#c8a45d]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5">Categoria *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GrowthTopic['category'])}
                className="w-full bg-[#141414] border border-white/10 rounded-xl p-3 text-white/90 focus:outline-none focus:border-[#c8a45d]"
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5">Nível de Dificuldade</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as GrowthTopic['difficulty'])}
                className="w-full bg-[#141414] border border-white/10 rounded-xl p-3 text-white/90 focus:outline-none focus:border-[#c8a45d]"
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5">Descrição Curta *</label>
            <textarea
              rows={2}
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Resumo do motivo pelo qual você deseja estudar este tema..."
              className="w-full bg-[#141414] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#c8a45d] resize-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5">Pergunta Provocativa (Opcional)</label>
            <input
              type="text"
              value={keyQuestion}
              onChange={(e) => setKeyQuestion(e.target.value)}
              placeholder="Ex: Como esta métrica varia por coorte de aquisição?"
              className="w-full bg-[#141414] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#c8a45d]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5">Framework Referência</label>
              <input
                type="text"
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                placeholder="Ex: Reforge, Hooked, RICE"
                className="w-full bg-[#141414] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#c8a45d]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5">Exemplo de Empresa</label>
              <input
                type="text"
                value={realExample}
                onChange={(e) => setRealExample(e.target.value)}
                placeholder="Ex: Spotify, Duolingo, Stripe"
                className="w-full bg-[#141414] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#c8a45d]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-[#141414] hover:bg-white/10 text-white/70 font-semibold uppercase tracking-wider text-xs border border-white/10"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#c8a45d] hover:brightness-110 text-black font-bold uppercase tracking-wider text-xs shadow-[0_0_15px_rgba(200,164,93,0.2)]"
            >
              Salvar Tema
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

