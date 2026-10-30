import React from 'react';
import { X, Printer, Download, CheckCircle, Terminal, ShieldCheck } from 'lucide-react';
import { SprintTier, IntakeFormData, Currency } from '../types';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: SprintTier;
  formData: IntakeFormData;
  currency: Currency;
  receiptNumber?: string;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  tier,
  formData,
  currency,
  receiptNumber = 'SOW-2026-8941',
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        {/* Actions bar (hidden during print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-slate-100">Statement of Work & Deposit Receipt</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Print Receipt / Save PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official SOW / Receipt Content */}
        <div className="mt-6 space-y-6 text-sm">
          {/* Header invoice info */}
          <div className="flex justify-between items-start pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span className="font-bold text-lg text-slate-100">Nachiketh V. // Sprint Practice</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">14-Day Production-Grade PoC Engineering</p>
              <p className="text-xs text-slate-400 font-mono">Contact: nachiketh.JO@gmail.com</p>
            </div>
            <div className="text-right font-mono">
              <span className="text-xs text-cyan-400 uppercase font-bold tracking-wider">Receipt & SOW</span>
              <p className="text-sm font-bold text-slate-200 mt-0.5">#{receiptNumber}</p>
              <p className="text-xs text-slate-400">Date: {new Date().toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-[10px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                50% Deposit Confirmed
              </span>
            </div>
          </div>

          {/* Client & Sprint Metadata */}
          <div className="grid sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
            <div>
              <span className="text-slate-500 uppercase">Client Details:</span>
              <p className="text-slate-200 font-bold mt-0.5">{formData.name || 'Client Lead'}</p>
              <p className="text-slate-300">{formData.company || 'Enterprise Partner'}</p>
              <p className="text-slate-400">{formData.email || 'client@company.com'}</p>
            </div>
            <div>
              <span className="text-slate-500 uppercase">Sprint Term:</span>
              <p className="text-slate-200 font-bold mt-0.5">14 Calendar Days</p>
              <p className="text-slate-300">Track: {tier.name}</p>
              <p className="text-cyan-400">IP Ownership: 100% Client</p>
            </div>
          </div>

          {/* Scope statement */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              Deliverables Statement
            </h4>
            <div className="space-y-1.5 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {tier.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment breakdown */}
          <div className="border-t border-slate-800 pt-4 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Total 14-Day Fixed Fee:</span>
              <span className="text-slate-200 font-semibold">{tier.pricing[currency].display}</span>
            </div>
            <div className="flex justify-between text-emerald-400 font-bold">
              <span>50% Upfront Kickoff Deposit Paid:</span>
              <span>{tier.pricing[currency].depositDisplay}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Remaining Balance (Due upon Day 14 Handover):</span>
              <span className="text-slate-300">{tier.pricing[currency].depositDisplay}</span>
            </div>
          </div>

          {/* Guarantees */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">Terms & Guarantees:</p>
            <p>1. <span className="text-slate-300">Scope Lock Guarantee:</span> If on Day 1 kickoff the scope is determined unfeasible within 14 days, deposit is 100% refunded immediately.</p>
            <p>2. <span className="text-slate-300">Warranty:</span> 14 days of bug-fixing warranty included from the day of final Git repository handover.</p>
            <p>3. <span className="text-slate-300">Confidentiality:</span> All data, logs, credentials, and codebases are strictly confidential under standard mutual NDA.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
