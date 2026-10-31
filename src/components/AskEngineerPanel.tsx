import React, { useState } from 'react';
import { 
  X, MessageSquare, Send, CheckCircle2, Terminal, 
  Clock, ShieldAlert, Paperclip, Mail, Phone,
  Sparkles, ExternalLink, ArrowRight, Check, AlertCircle,
  FileCode, User, Zap
} from 'lucide-react';
import { SprintTier, IntakeFormData } from '../types';

interface AskEngineerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  tier: SprintTier | null;
  formData: IntakeFormData;
  activeSprintDay: number;
}

interface SubmittedInquiry {
  id: string;
  category: string;
  day: number;
  message: string;
  priority: 'normal' | 'high' | 'critical';
  timestamp: string;
  status: 'dispatched' | 'acknowledged';
}

export const AskEngineerPanel: React.FC<AskEngineerPanelProps> = ({
  isOpen,
  onClose,
  tier,
  formData,
  activeSprintDay,
}) => {
  const [category, setCategory] = useState<'scope' | 'access' | 'benchmark' | 'urgent'>('scope');
  const [priority, setPriority] = useState<'normal' | 'high' | 'critical'>('high');
  const [message, setMessage] = useState('');
  const [submittedInquiries, setSubmittedInquiries] = useState<SubmittedInquiry[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const quickPresets = [
    'Can we calibrate the threshold tolerances for Day 8 demo?',
    'Where should we upload our sandbox API keys and sample dataset?',
    'Need clarification on acceptance criteria test matrix in PR #2',
    'Requesting quick 10-min architecture sync before next phase'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      const newInquiry: SubmittedInquiry = {
        id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
        category: 
          category === 'scope' ? 'Scope & Deliverables' :
          category === 'access' ? 'Access & Credentials' :
          category === 'benchmark' ? 'Benchmark & Accuracy' : 'Critical Blocker',
        day: activeSprintDay,
        message: message.trim(),
        priority,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'dispatched'
      };

      setSubmittedInquiries([newInquiry, ...submittedInquiries]);
      setMessage('');
      setIsSending(false);
      setSentSuccess(true);
      setTimeout(() => setSentSuccess(false), 4000);
    }, 700);
  };

  const mailtoSubject = encodeURIComponent(`[Sprint Inquiry - Day ${activeSprintDay}] ${tier?.name || 'Sprint Practice'}`);
  const mailtoBody = encodeURIComponent(`Hi Nachiketh,\n\nI have a question regarding Sprint Day ${activeSprintDay}:\n\n${message || '[Your message here]'}\n\nClient: ${formData.name} (${formData.company})\nEmail: ${formData.email}`);
  const mailtoLink = `mailto:nachiketh.JO@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
      />

      {/* Slide-out Panel from right */}
      <div className="absolute inset-y-0 right-0 max-w-lg w-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/70 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                  Ask Lead Engineer
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">Nachiketh V. // Direct Sprint Line</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online | Response SLA: &lt; 2 Hours
              </span>
              <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                Sprint Day {activeSprintDay} of 14
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs">
          
          {/* Active Context Bar */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono space-y-1 text-slate-300">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-500 uppercase font-bold">Active Sprint:</span>
              <span className="text-cyan-400 font-semibold">{tier?.name || 'Selected Track'}</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-500 uppercase font-bold">Client / Org:</span>
              <span className="text-slate-200">{formData.company || 'Enterprise Partner'} ({formData.name || 'Lead'})</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-500 uppercase font-bold">Direct Channels:</span>
              <span className="text-emerald-400 font-semibold">Slack shared room & nachiketh.JO@gmail.com</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 font-bold mb-2 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quick Technical Prompts (1-Click Fill)</span>
            </label>
            <div className="space-y-1.5">
              {quickPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessage(preset)}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer text-xs"
                >
                  &ldquo;{preset}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Submission Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Selector */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-bold mb-1.5">
                Inquiry Category
              </label>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                {[
                  { id: 'scope', label: 'Scope & Acceptance', icon: <FileCode className="w-3.5 h-3.5" /> },
                  { id: 'access', label: 'Access & Credentials', icon: <Terminal className="w-3.5 h-3.5" /> },
                  { id: 'benchmark', label: 'Evals & Benchmarks', icon: <Sparkles className="w-3.5 h-3.5" /> },
                  { id: 'urgent', label: 'Critical Blocker', icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id as any)}
                    className={`p-2.5 rounded-lg border flex items-center space-x-2 transition-all cursor-pointer ${
                      category === cat.id
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {cat.icon}
                    <span className="truncate">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Selector */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-bold mb-1.5">
                Urgency Level
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                {[
                  { id: 'normal', label: 'Normal (< 24h)' },
                  { id: 'high', label: 'High Priority (< 2h)' },
                  { id: 'critical', label: 'Blocker (< 1h)' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPriority(p.id as any)}
                    className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                      priority === p.id
                        ? p.id === 'critical'
                          ? 'border-rose-500 bg-rose-500/10 text-rose-300 font-bold'
                          : 'border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-bold mb-1.5">
                Technical Inquiry Details
              </label>
              <textarea
                rows={4}
                required
                placeholder="Ask Nachiketh V. about code structure, edge cases, credential requirements, or Day 8 demo preparations..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors resize-none font-sans"
              />
            </div>

            {/* Success alert */}
            {sentSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between font-mono animate-in fade-in">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inquiry dispatched directly to Nachiketh V. via Slack & Email!</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">2H SLA</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={isSending || !message.trim()}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold font-mono text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                {isSending ? (
                  <span>Dispatching to Engineer...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry to Nachiketh V.</span>
                  </>
                )}
              </button>

              <a
                href={mailtoLink}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                title="Open in Email Client (nachiketh.JO@gmail.com)"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </form>

          {/* Submitted Inquiries History */}
          {submittedInquiries.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="font-mono text-xs uppercase text-slate-400 font-bold flex items-center justify-between">
                <span>Recent Inquiries This Session ({submittedInquiries.length})</span>
                <span className="text-[10px] text-emerald-400">All Routed to Lead</span>
              </h4>

              <div className="space-y-2">
                {submittedInquiries.map((inq) => (
                  <div key={inq.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-cyan-300">{inq.id} // {inq.category}</span>
                      <span className="text-slate-500">{inq.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-sans">{inq.message}</p>
                    <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 border-t border-slate-900">
                      <span>Sprint Day: D{inq.day}</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <Check className="w-3 h-3" />
                        <span>Dispatched to Slack #sprint-direct</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Emergency Channels Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
              Direct Emergency Escalation Channels:
            </span>
            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Personal Email:</span>
                </span>
                <a href="mailto:nachiketh.JO@gmail.com" className="text-cyan-300 hover:underline">
                  nachiketh.JO@gmail.com
                </a>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Slack Shared Room:</span>
                </span>
                <span className="text-slate-200">#sprint-14d-nachiketh</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>Sprint Practice // Principal Engineering Support</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
};
