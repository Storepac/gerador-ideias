'use client';

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function DiscoverSelectionFeedback() {
  return (
    <section
      className="flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-2xl border border-blue-500/20 bg-white/[0.03] p-8 text-center"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-cyan-400/30"
          animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border border-blue-500/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-950/40"
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 0.75, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
        </motion.div>
      </div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Conectando os pontos</p>
      <p className="mt-2 text-sm text-slate-400">Selecionando um conceito para você explorar agora...</p>
    </section>
  );
}
