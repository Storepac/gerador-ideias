'use client';

import React from 'react';
import { Sparkles, BookOpen, Calendar, Library, Rocket, Flame } from 'lucide-react';

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
  return (
    <header className="sticky top-0 z-40 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/10 text-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full border border-[#c8a45d]/40 bg-[#141414] flex items-center justify-center shadow-[0_0_15px_rgba(200,164,93,0.15)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#c8a45d]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold block">
                  Growth Architecture
                </span>
              </div>
              <h1 className="font-serif italic text-xl text-white tracking-tight flex items-center gap-2">
                Knowledge Architect
                <span className="text-[9px] not-italic uppercase tracking-widest px-2 py-0.5 rounded border border-[#c8a45d]/30 text-[#c8a45d] bg-[#c8a45d]/10 font-sans">
                  PRO
                </span>
              </h1>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 bg-[#141414] p-1 rounded-full border border-white/10">
            <button
              onClick={() => setActiveTab('roulette')}
              className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                activeTab === 'roulette'
                  ? 'bg-[#c8a45d] text-black font-bold shadow-[0_0_20px_rgba(200,164,93,0.25)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sorteador</span>
            </button>

            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                activeTab === 'planner'
                  ? 'bg-[#c8a45d] text-black font-bold shadow-[0_0_20px_rgba(200,164,93,0.25)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Plano Semanal</span>
              {totalPlannedCount > 0 && (
                <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  activeTab === 'planner' ? 'bg-black/20 text-black' : 'bg-[#c8a45d]/20 text-[#c8a45d]'
                }`}>
                  {masteredCount}/{totalPlannedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                activeTab === 'library'
                  ? 'bg-[#c8a45d] text-black font-bold shadow-[0_0_20px_rgba(200,164,93,0.25)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Library className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Acervo Interno</span>
              <span className="sm:hidden">Acervo</span>
            </button>
          </nav>

          {/* Right Status & Context */}
          <div className="flex items-center space-x-3">
            <button
              onClick={openProductContextModal}
              className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#141414] hover:bg-white/5 text-xs text-white/70 border border-white/10 transition-all hover:border-[#c8a45d]/40"
              title="Configure o contexto do seu produto atual para que a IA personalize os exemplos"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#c8a45d]" />
              <span className="max-w-[130px] truncate">
                {productContext ? productContext : 'Configurar Produto'}
              </span>
            </button>

            <div className="flex items-center space-x-2 bg-[#141414] border border-[#c8a45d]/30 px-3.5 py-1.5 rounded-full text-[#c8a45d] text-xs uppercase tracking-wider font-semibold">
              <Flame className="w-3.5 h-3.5 text-[#c8a45d] animate-pulse" />
              <span>{masteredCount} Concluídos</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

