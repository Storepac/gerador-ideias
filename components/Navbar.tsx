'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Library, Sparkles, Video } from 'lucide-react';

interface NavbarProps {
  activeTab: 'roulette' | 'planner' | 'library';
  setActiveTab: (tab: 'roulette' | 'planner' | 'library') => void;
  masteredCount: number;
  totalPlannedCount: number;
  openProductContextModal: () => void;
  productContext: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  masteredCount,
  totalPlannedCount,
  openProductContextModal,
  productContext,
}) => {
  const tabClass = (active: boolean) => active
    ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/20'
    : 'text-slate-400 hover:bg-white/5 hover:text-white';

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="TechForWeb Learning Lab - início">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-950/30">
            <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <div className="hidden sm:block">
            <span className="block text-sm font-black leading-none text-white">TechForWeb</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">Learning Lab</span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1" aria-label="Áreas do Learning Lab">
          <button type="button" onClick={() => setActiveTab('roulette')} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${tabClass(activeTab === 'roulette')}`}>
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /><span className="hidden md:inline">Descobrir</span>
          </button>
          <button type="button" onClick={() => setActiveTab('planner')} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${tabClass(activeTab === 'planner')}`}>
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" /><span className="hidden md:inline">Plano</span>
            {totalPlannedCount > 0 && <span className="text-[10px] opacity-75">{masteredCount}/{totalPlannedCount}</span>}
          </button>
          <button type="button" onClick={() => setActiveTab('library')} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${tabClass(activeTab === 'library')}`}>
            <Library className="h-3.5 w-3.5" aria-hidden="true" /><span className="hidden md:inline">Biblioteca</span>
          </button>
          <Link href="/roteiro" className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-400/10">
            <Video className="h-3.5 w-3.5" aria-hidden="true" /><span className="hidden md:inline">Roteiros</span>
          </Link>
        </nav>

        <button type="button" onClick={openProductContextModal} className="hidden max-w-48 items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white lg:flex" title="Contexto usado para personalizar exemplos da IA">
          <BookOpen className="h-3.5 w-3.5 text-blue-300" aria-hidden="true" />
          <span className="truncate">{productContext || 'Contexto do produto'}</span>
        </button>
      </div>
    </header>
  );
};
