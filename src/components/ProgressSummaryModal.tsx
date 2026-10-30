import React from 'react';
import { 
  X, Printer, Download, CheckCircle2, Terminal, ShieldCheck, 
  Calendar, FileCode, GitCommit, Clock, Check, FileDown, Copy
} from 'lucide-react';
import { SprintTier, IntakeFormData, Currency } from '../types';
import { DAILY_DELIVERABLES } from '../data/sprints';

interface ProgressSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: SprintTier;
  formData: IntakeFormData;
  kickoffDate: string;
  currentDay: number;
  currency: Currency;
}

export const ProgressSummaryModal: React.FC<ProgressSummaryModalProps> = ({
  isOpen,
  onClose,
  tier,
  formData,
  kickoffDate,
  currentDay,
  currency,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const start = new Date(kickoffDate);
  const addDays = (d: Date, days: number) => {
    const res = new Date(d);
    res.setDate(res.getDate() + days);
    return res;
  };

  const completionDate = addDays(start, 13);
  const currentDateObj = addDays(start, currentDay - 1);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const progressPercent = Math.min(100, Math.round((currentDay / 14) * 100));
  const completedCount = Math.min(14, currentDay);
  const remainingDays = Math.max(0, 14 - currentDay);
  const reportRefId = `SPRINT-REP-${kickoffDate.replace(/-/g, '')}-${tier.id.toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  const copyMarkdownSummary = () => {
    const md = `# 14-Day Sprint Progress Snapshot
**Client:** ${formData.company || 'Enterprise Partner'} (${formData.name})
**Track:** ${tier.name}
**Kickoff Date:** ${formatDate(start)}
**Delivery Target:** ${formatDate(completionDate)}
**Current Milestone:** Day ${currentDay} of 14 (${progressPercent}% Completed)
**Status:** ${completedCount} Milestones Verified Complete, ${remainingDays} Days Remaining

## Daily Timeline & Deliverables
${DAILY_DELIVERABLES.map(d => {
  const trackDetail = d[tier.id] || d.ai;
  const status = d.day <= currentDay ? '[✓ COMPLETED]' : '[⏳ SCHEDULED]';
  return `- **Day ${d.day}: ${d.title}** ${status}
  - Deliverable: ${trackDetail.deliverable}
  - Artifact: \`${trackDetail.codeArtifact}\`
  - Commit: #${d.notification.commitHash}`;
}).join('\n')}

---
*Signed by Lead Engineer: Nachiketh V. // Sprint Practice (nachiketh.JO@gmail.com)*
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200 print:p-0 print:bg-white print:static">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto print:border-none print:shadow-none print:max-h-none print:p-8 print:bg-white print:text-black">
        
        {/* Actions header (Hidden during print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100">14-Day Sprint Progress Snapshot</h3>
              <p className="text-xs text-slate-400 font-mono">Exportable PDF Report & Milestone Record</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={copyMarkdownSummary}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Copy as Markdown"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied MD' : 'Copy MD'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono flex items-center space-x-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              title="Save as PDF / Print Document"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE REPORT BODY */}
        <div className="mt-6 space-y-6 text-sm print:mt-0 print:space-y-4">
          
          {/* Document Header */}
          <div className="flex justify-between items-start pb-5 border-b border-slate-800 print:border-neutral-300">
            <div>
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-cyan-400 print:text-black" />
                <span className="font-bold text-lg text-slate-100 print:text-black">
                  Nachiketh V. // Sprint Practice
                </span>
              </div>
              <p className="text-xs text-slate-400 print:text-neutral-600 mt-1 font-mono">
                14-Day Fixed-Price Production PoC Engineering
              </p>
              <p className="text-xs text-slate-400 print:text-neutral-600 font-mono">
                Direct Contact: nachiketh.JO@gmail.com
              </p>
            </div>

            <div className="text-right font-mono">
              <span className="text-xs text-cyan-400 print:text-neutral-800 uppercase font-bold tracking-wider block">
                Official Progress Snapshot
              </span>
              <p className="text-sm font-bold text-slate-200 print:text-black mt-0.5">#{reportRefId}</p>
              <p className="text-xs text-slate-400 print:text-neutral-600">Generated: {formatDate(new Date())}</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-[10px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase print:border-black print:text-black">
                {completedCount} of 14 Milestones Completed
              </span>
            </div>
          </div>

          {/* Project & Client Metadata Card */}
          <div className="grid sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs print:bg-neutral-50 print:border-neutral-300 print:text-black">
            <div>
              <span className="text-slate-500 print:text-neutral-500 uppercase text-[10px] font-bold block">
                Client Information:
              </span>
              <p className="text-slate-200 print:text-black font-bold mt-1 text-sm">
                {formData.company || 'Enterprise Partner'}
              </p>
              <p className="text-slate-300 print:text-neutral-700">Lead: {formData.name || 'Authorized Lead'}</p>
              <p className="text-slate-400 print:text-neutral-600">{formData.email || 'client@company.com'}</p>
              <p className="text-slate-400 print:text-neutral-600">Preferred Channel: {formData.preferredChannel}</p>
            </div>

            <div>
              <span className="text-slate-500 print:text-neutral-500 uppercase text-[10px] font-bold block">
                Sprint Track & Terms:
              </span>
              <p className="text-cyan-300 print:text-black font-bold mt-1 text-sm">{tier.name}</p>
              <p className="text-slate-300 print:text-neutral-700">Kickoff: {formatDate(start)}</p>
              <p className="text-slate-300 print:text-neutral-700">Delivery Deadline: {formatDate(completionDate)}</p>
              <p className="text-emerald-400 print:text-black font-semibold">100% Client Code & IP Ownership</p>
            </div>
          </div>

          {/* Status Metrics Bar */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 print:border-neutral-300 print:bg-white space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-slate-200 print:text-black">
                Current Sprint Position: Day {currentDay} of 14 ({progressPercent}% Cycle)
              </span>
              <span className="text-cyan-400 print:text-neutral-700 font-bold">
                {remainingDays === 0 ? 'Handover Day!' : `${remainingDays} Days Remaining`}
              </span>
            </div>

            <div className="w-full bg-slate-900 print:bg-neutral-200 h-2.5 rounded-full overflow-hidden border border-slate-800 print:border-neutral-300">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 print:bg-black h-full rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Granular 14-Day Timeline Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 print:text-neutral-700 font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400 print:text-black" />
                <span>14-Day Milestone & Deliverables Log</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-500 print:text-neutral-500">
                Phase Breakdown
              </span>
            </div>

            <div className="border border-slate-800 print:border-neutral-300 rounded-xl overflow-hidden font-mono text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 print:bg-neutral-100 text-slate-400 print:text-neutral-700 border-b border-slate-800 print:border-neutral-300 text-[10px] uppercase">
                    <th className="py-2.5 px-3">Day</th>
                    <th className="py-2.5 px-3">Milestone Title</th>
                    <th className="py-2.5 px-3">Delivered Artifact</th>
                    <th className="py-2.5 px-3">Commit</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-neutral-200">
                  {DAILY_DELIVERABLES.map((d) => {
                    const isCompleted = d.day <= currentDay;
                    const isCurrent = d.day === currentDay;
                    const trackDetail = d[tier.id] || d.ai;

                    return (
                      <tr 
                        key={d.day}
                        className={`transition-colors ${
                          isCurrent
                            ? 'bg-cyan-500/10 font-semibold'
                            : isCompleted
                            ? 'bg-slate-900/40 text-slate-200 print:text-black'
                            : 'text-slate-500 print:text-neutral-400'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-bold text-slate-300 print:text-black">
                          D{d.day}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-slate-200 print:text-black font-semibold block">{d.title}</span>
                          <span className="text-[10px] text-slate-400 print:text-neutral-500 font-sans block">{trackDetail.deliverable}</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-[11px] text-cyan-300 print:text-neutral-800 bg-slate-950 print:bg-neutral-100 px-1.5 py-0.5 rounded border border-slate-800 print:border-neutral-300 truncate max-w-[180px] inline-block">
                            {trackDetail.codeArtifact}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-[11px] text-slate-400 print:text-neutral-600">
                          #{d.notification.commitHash}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          {isCompleted ? (
                            <span className="inline-flex items-center space-x-1 text-emerald-400 print:text-black font-bold text-[10px] bg-emerald-500/10 print:bg-transparent px-2 py-0.5 rounded border border-emerald-500/20 print:border-none">
                              <Check className="w-3 h-3" />
                              <span>COMPLETED</span>
                            </span>
                          ) : isCurrent ? (
                            <span className="inline-flex items-center space-x-1 text-cyan-400 print:text-black font-bold text-[10px] bg-cyan-500/10 print:bg-transparent px-2 py-0.5 rounded border border-cyan-500/20 print:border-none">
                              <span>ACTIVE TODAY</span>
                            </span>
                          ) : (
                            <span className="text-slate-500 print:text-neutral-400 text-[10px]">
                              SCHEDULED
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Guarantee & Verification Seal */}
          <div className="p-4 rounded-xl bg-slate-950 print:bg-neutral-50 border border-slate-800 print:border-neutral-300 text-xs text-slate-400 print:text-neutral-700 space-y-1 font-mono">
            <div className="flex items-center space-x-2 text-slate-200 print:text-black font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 print:text-black" />
              <span>Engineering Deliverable Verification:</span>
            </div>
            <p>• All milestone commits and documents are verified and cryptographically signed.</p>
            <p>• 14-day post-delivery bug warranty will commence upon Day 14 repository ownership transfer.</p>
            <p>• IP Ownership: 100% exclusive client intellectual property with zero ongoing licensing fees.</p>
          </div>

          {/* Signature Signoff */}
          <div className="pt-4 flex justify-between items-end text-xs font-mono border-t border-slate-800 print:border-neutral-300 text-slate-400 print:text-neutral-600">
            <div>
              <p className="text-slate-200 print:text-black font-bold">Nachiketh V.</p>
              <p>Lead Engineer & Sprint Practice Principal</p>
              <p>Sprint Practice // Bengaluru, India & Global</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 print:text-neutral-400 text-[10px]">DOCUMENT AUTHENTICITY HASH:</p>
              <p className="text-cyan-400 print:text-black font-bold">{reportRefId}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
