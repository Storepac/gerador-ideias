'use client';

import React, { useState } from 'react';
import { X, BookOpen, Sparkles, Check } from 'lucide-react';

interface ProductContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  productContext: string;
  onSaveProductContext: (context: string) => void;
}

export const ProductContextModal: React.FC<ProductContextModalProps> = ({
  isOpen,
  onClose,
  productContext,
  onSaveProductContext,
}) => {
  const [contextInput, setContextInput] = useState(productContext);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProductContext(contextInput.trim());
    onClose();
  };

  const presetExamples = [
    'App B2C de Finanças Pessoais (Modelo Freemium + Assinatura Anual)',
    'Plataforma B2B SaaS de Recursos Humanos (Modelo Product-Led Sales)',
    'E-commerce / Marketplace de Moda (Foco em LTV, Recorrência e Indicação)',
    'EdTech B2C de Cursos de Tecnologia (Onboarding Gamificado e Retenção)',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#141414] text-[#c8a45d] border border-[#c8a45d]/30 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-serif text-white">Configurar Contexto do Seu Produto</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-white/60 leading-relaxed">
          Informe o tipo de produto em que você atua hoje. A Inteligência Artificial usará estas informações para adaptar os exemplos, hipóteses de teste e perguntas provocativas diretamente para a sua realidade.
        </p>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5">Seu Produto / Empresa Atualmente:</label>
            <textarea
              rows={3}
              value={contextInput}
              onChange={(e) => setContextInput(e.target.value)}
              placeholder="Ex: Sou Growth PM de uma plataforma B2B SaaS de gestão financeira para PMEs com onboarding self-serve e planos pagos por quantidade de usuários..."
              className="w-full bg-[#141414] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#c8a45d] resize-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">Ou escolha um exemplo rápido:</label>
            <div className="space-y-2">
              {presetExamples.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setContextInput(preset)}
                  className="w-full text-left p-3 rounded-xl bg-[#141414] hover:bg-white/10 border border-white/10 text-xs text-white/80 transition-colors flex items-center justify-between"
                >
                  <span className="truncate">{preset}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#c8a45d] shrink-0 ml-2" />
                </button>
              ))}
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
              className="px-6 py-2.5 rounded-full bg-[#c8a45d] hover:brightness-110 text-black font-bold uppercase tracking-wider text-xs shadow-[0_0_15px_rgba(200,164,93,0.2)] flex items-center space-x-2"
            >
              <Check className="w-4 h-4 text-black" />
              <span>Salvar Contexto</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

