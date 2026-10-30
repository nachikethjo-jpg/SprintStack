import React from 'react';
import { X, FolderGit2, Cpu, Shield, Wrench, CheckCircle2, ArrowRight, Layers, FileCode, Terminal } from 'lucide-react';
import { SprintTier, Currency } from '../types';

interface ArchitectureModalProps {
  tier: SprintTier | null;
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tier: SprintTier) => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  tier,
  currency,
  isOpen,
  onClose,
  onSelectTier,
}) => {
  if (!isOpen || !tier) return null;

  const getIcon = () => {
    switch (tier.id) {
      case 'ai':
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'security':
        return <Shield className="w-6 h-6 text-emerald-400" />;
      case 'iot':
        return <Wrench className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              {getIcon()}
            </div>
            <div>
              <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${tier.badgeColor}`}>
                {tier.badge}
              </span>
              <h3 className="text-xl font-bold text-slate-100 mt-1">{tier.name}</h3>
              <p className="text-xs text-slate-400">{tier.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="py-6 space-y-6">
          {/* Deliverables detail */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Full 14-Day Deliverables Package</span>
            </h4>
            <div className="space-y-2.5 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
              {tier.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-200">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Repository Tree */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>Sample Delivered Repository Layout</span>
            </h4>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-1.5 overflow-x-auto">
              <div className="text-slate-500 text-[11px] pb-1 border-b border-slate-900 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>github.com/your-org/{tier.id}-sprint-poc</span>
              </div>
              {tier.sampleRepoStructure.map((file, idx) => (
                <div key={idx} className="flex items-center space-x-2 py-0.5">
                  <FileCode className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-slate-300">{file}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Engineered Tech Stack & Tools</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {tier.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Ideal for card */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs space-y-1 text-slate-300">
            <span className="font-bold text-cyan-300 uppercase tracking-wider">Ideal For:</span>
            <p className="text-slate-300">{tier.idealFor}</p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400">Total Fixed Fee</div>
            <div className="text-xl font-bold text-slate-100">
              {tier.pricing[currency].display}
              <span className="text-xs font-normal text-slate-400 ml-1.5">
                ({tier.pricing[currency].depositDisplay} 50% deposit)
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectTier(tier);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <span>Book This Sprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
