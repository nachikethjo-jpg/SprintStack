import React from 'react';
import { Terminal, Check, Globe } from 'lucide-react';
import { Currency } from '../types';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenScopeChecker: () => void;
  onOpenFaq?: () => void;
  step: string;
  onResetToLanding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenScopeChecker,
  onOpenFaq,
  step,
  onResetToLanding,
}) => {
  return (
    <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
      {/* Brand logo & title */}
      <div 
        onClick={onResetToLanding}
        className="flex items-center space-x-2.5 cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
          <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold tracking-tight text-base sm:text-lg bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Nachiketh V.
            </span>
            <span className="text-slate-500 font-mono text-xs hidden sm:inline">// Sprint Practice</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>14-Day Production PoCs</span>
          </div>
        </div>
      </div>

      {/* Navigation actions */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Readiness Quiz button */}
        <button
          onClick={onOpenScopeChecker}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-all cursor-pointer"
        >
          <span className="text-cyan-400">⚡</span>
          <span>Scope Readiness Check</span>
        </button>

        {/* Currency selector toggle */}
        <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-lg p-0.5 text-xs">
          {(['INR', 'USD', 'EUR'] as Currency[]).map((curr) => (
            <button
              key={curr}
              onClick={() => onCurrencyChange(curr)}
              className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                currentCurrency === curr
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {curr === 'INR' ? '₹ INR' : curr === 'USD' ? '$ USD' : '€ EUR'}
            </button>
          ))}
        </div>

        {/* Sprints status badge */}
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span className="hidden sm:inline">2 Sprints Open This Month</span>
          <span className="sm:hidden">2 Slots Left</span>
        </div>
      </div>
    </nav>
  );
};
