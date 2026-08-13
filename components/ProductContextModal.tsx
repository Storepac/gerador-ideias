'use client';

import React, { useState } from 'react';
import { BookOpen, Check, Sparkles, X } from 'lucide-react';

interface ProductContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  productContext: string;
  onSaveProductContext: (context: string) => void;
}

interface ProductContextEditorProps extends Omit<ProductContextModalProps, 'isOpen'> {}

const presets = [
  'App B2C de finanças pessoais com modelo freemium e assinatura anual',
  'Plataforma B2B SaaS com onboarding self-service e vendas assistidas',
  'E-commerce ou marketplace com foco em recorrência, margem e retenção',
  'Produto digital em fase de descoberta, validação de problema e MVP',
];

function ProductContextEditor({ onClose, productContext, onSaveProductContext }: ProductContextEditorProps) {
  const [contextInput, setContextInput] = useState(productContext);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    onSaveProductContext(contextInput.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="product-context-title">
      <div className="w-full max-w-lg rounded-3xl border border-blue-500/20 bg-[#0b1728] p-6 shadow-2xl shadow-blue-950/30 sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-300">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Personalização</p>
              <h2 id="product-context-title" className="mt-1 text-xl font-bold text-white">Contexto do produto</h2>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar contexto do produto" className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-400">Descreva o tipo de produto ou cenário em que você está trabalhando. A IA usa esse contexto para adaptar exemplos, perguntas e hipóteses.</p>

        <form onSubmit={handleSave} className="mt-6 space-y-5">
          <div>
            <label htmlFor="product-context" className="mb-2 block text-xs font-semibold text-slate-300">Produto, empresa ou cenário atual</label>
            <textarea id="product-context" name="productContext" rows={4} maxLength={1200} value={contextInput} onChange={(event) => setContextInput(event.target.value)} placeholder="Ex.: trabalho em um SaaS B2B para PMEs e quero melhorar ativação, retenção e monetização..." className="w-full resize-none rounded-2xl border border-white/10 bg-[#07111f] p-4 text-sm leading-6 text-white placeholder:text-slate-600" />
            <p className="mt-1 text-right text-xs text-slate-600">{contextInput.length}/1200</p>
          </div>

          <div>
            <span className="mb-2 block text-xs font-semibold text-slate-400">Exemplos rápidos</span>
            <div className="space-y-2">
              {presets.map((preset) => (
                <button key={preset} type="button" onClick={() => setContextInput(preset)} className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left text-sm text-slate-300 transition hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-white">
                  <span>{preset}</span>
                  <Sparkles className="h-4 w-4 shrink-0 text-blue-300" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
            <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/5">Cancelar</button>
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500">
              <Check className="h-4 w-4" aria-hidden="true" /> Salvar contexto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const ProductContextModal: React.FC<ProductContextModalProps> = ({ isOpen, ...props }) => {
  if (!isOpen) return null;
  return <ProductContextEditor {...props} />;
};
