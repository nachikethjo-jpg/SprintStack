import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface ScopeCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack: (trackId: 'ai' | 'security' | 'iot') => void;
}

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: { text: string; points: number; note: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'How defined is your target deliverable?',
    subtitle: '14-day sprints succeed best when there is a focused hypothesis to prove.',
    options: [
      { text: 'Laser-focused: Exactly 1 core bottleneck or automation workflow', points: 30, note: 'Ideal fit' },
      { text: 'Moderately clear: 2-3 feature components, but needs some trimming', points: 20, note: 'We will lock scope on Day 1' },
      { text: 'Broad vision: An entire end-to-end multi-tenant platform', points: 5, note: 'Best split into sequential 14-day phases' }
    ]
  },
  {
    id: 2,
    question: 'Do you have API credentials, sample data, or hardware ready?',
    subtitle: 'We hit the ground running on Day 1 without waiting on blocked credentials.',
    options: [
      { text: 'Yes, sample logs, API keys, or target boards are ready to hand over', points: 30, note: 'Immediate kickoff ready' },
      { text: 'Almost: Can be generated/approved within 24-48 hours', points: 20, note: 'Feasible' },
      { text: 'No: Requires multi-week enterprise procurement approval', points: 0, note: 'Better to secure access first' }
    ]
  },
  {
    id: 3,
    question: 'How fast can your team review the Day 8 demo?',
    subtitle: 'Rapid feedback ensures Day 9-14 hardening meets all expectations.',
    options: [
      { text: 'Same day / within 24 hours (Founder / Tech Lead available)', points: 25, note: 'Blazing fast velocity' },
      { text: 'Within 48 hours', points: 15, note: 'Standard' },
      { text: 'Takes 1-2 weeks through a large committee', points: 0, note: 'Committee delays risk sprint handovers' }
    ]
  },
  {
    id: 4,
    question: 'Which domain is your primary challenge in?',
    subtitle: 'Select the technical specialty that matches your project.',
    options: [
      { text: 'AI / LLM pipelines, prompt QA, document extraction, RAG', points: 15, note: 'Track: AI Workflow' },
      { text: 'SIEM alert noise, log parsing, SOAR scripts, threat triage', points: 15, note: 'Track: Security & SIEM' },
      { text: 'ESP32 firmware, sensor data pipelines, MQTT / cloud telemetry', points: 15, note: 'Track: Smart Edge / IoT' }
    ]
  }
];

export const ScopeCheckerModal: React.FC<ScopeCheckerModalProps> = ({
  isOpen,
  onClose,
  onSelectTrack,
}) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!isOpen) return null;

  const currentQ = QUESTIONS[currentIdx];
  const totalScore = Object.values(answers).reduce((acc, pts) => acc + pts, 0);
  const isFinished = Object.keys(answers).length === QUESTIONS.length;

  const handleSelectOption = (qId: number, points: number) => {
    const updated = { ...answers, [qId]: points };
    setAnswers(updated);
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentIdx(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-lg text-slate-100">Sprint Readiness Evaluator</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished ? (
          <div className="mt-6 space-y-6">
            {/* Progress tracker */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Question {currentIdx + 1} of {QUESTIONS.length}</span>
              <span>{Math.round(((currentIdx) / QUESTIONS.length) * 100)}% complete</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-cyan-400 h-full transition-all duration-300"
                style={{ width: `${((currentIdx) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question title */}
            <div>
              <h4 className="text-lg font-bold text-slate-100">{currentQ.question}</h4>
              <p className="text-sm text-slate-400 mt-1">{currentQ.subtitle}</p>
            </div>

            {/* Options list */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, opt.points)}
                  className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group flex items-start justify-between cursor-pointer"
                >
                  <div className="space-y-1 pr-3">
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors block">
                      {opt.text}
                    </span>
                    <span className="text-xs text-slate-400">
                      💡 {opt.note}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className="mt-6 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
              {totalScore >= 75 ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              ) : (
                <AlertCircle className="w-8 h-8 text-amber-400" />
              )}
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Evaluation Score: {totalScore} / 100
              </span>
              <h4 className="text-2xl font-bold mt-1 text-slate-100">
                {totalScore >= 75
                  ? 'Prime Fit for a 14-Day Sprint!'
                  : 'Feasible with Day 1 Scope Boundary'}
              </h4>
              <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                {totalScore >= 75
                  ? 'Your requirements and access speed align with our 14-day production delivery standard. We can scope lock quickly on Day 1 and hit your Day 8 demo with high velocity.'
                  : 'Your project has solid potential. We will spend extra focus on Day 1 carving out the most valuable core slice so you get working production code without scope drag.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 text-slate-300">
              <div className="font-semibold text-slate-200 uppercase tracking-wider">Sprint Guarantee:</div>
              <p>• If Day 1 scope lock determines the project cannot realistically be shipped within 14 days, you receive a full 100% deposit refund immediately.</p>
              <p>• 14-day bug warranty included after Day 14 Git repository handover.</p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={resetQuiz}
                className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <span>Browse Sprint Tracks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
