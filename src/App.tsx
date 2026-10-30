import React, { useState, useEffect } from 'react';
import { 
  Cpu, Shield, Wrench, CheckCircle2, ArrowRight, 
  Calendar, CreditCard, Sparkles, Terminal, Check, 
  Lock, ArrowLeft, Layers, Code2, ExternalLink,
  ChevronDown, HelpCircle, FileText, QrCode, Copy,
  CheckCheck, AlertCircle, Phone, MessageSquare,
  ShieldCheck, RefreshCw, Zap, FileDown
} from 'lucide-react';

import { Currency, SprintTier, IntakeFormData, PaymentDetails } from './types';
import { TIERS, SPRINT_TIMELINE, CASE_STUDIES, FAQS } from './data/sprints';
import { Navbar } from './components/Navbar';
import { ScopeCheckerModal } from './components/ScopeCheckerModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { ReceiptModal } from './components/ReceiptModal';
import { CalendarModal } from './components/CalendarModal';
import { SprintProgressBar } from './components/SprintProgressBar';
import { SprintNotificationFeed } from './components/SprintNotificationFeed';
import { ProgressSummaryModal } from './components/ProgressSummaryModal';
import { GitHubPulseGraph } from './components/GitHubPulseGraph';

export default function App() {
  const [step, setStep] = useState<'landing' | 'intake' | 'checkout' | 'success'>('landing');
  const [selectedTier, setSelectedTier] = useState<SprintTier | null>(TIERS[0]);
  const [currency, setCurrency] = useState<Currency>('INR');
  const [kickoffDate, setKickoffDate] = useState<string>('2026-11-02');
  const [activeSprintDay, setActiveSprintDay] = useState<number>(1);

  // Modals
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);
  const [archModalTier, setArchModalTier] = useState<SprintTier | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  // Active FAQ
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Success tab
  const [successTab, setSuccessTab] = useState<'milestones' | 'checklist' | 'access'>('milestones');

  // Intake Form State with localStorage persistence
  const [formData, setFormData] = useState<IntakeFormData>(() => {
    const saved = localStorage.getItem('nachiketh_sprint_intake');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      name: '',
      email: '',
      company: '',
      role: '',
      projectDetails: '',
      targetOutcome: '',
      existingStack: '',
      preferredChannel: 'slack',
      targetKickoffDate: 'Next Available Monday'
    };
  });

  // Payment State
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
    cardName: 'Alex Morgan',
    upiId: '',
    agreedToTerms: true,
    agreedToNda: true,
  });

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Sync formData to localStorage
  useEffect(() => {
    localStorage.setItem('nachiketh_sprint_intake', JSON.stringify(formData));
  }, [formData]);

  const handleTierSelect = (tier: SprintTier) => {
    setSelectedTier(tier);
    setStep('intake');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  const fillSampleData = () => {
    if (selectedTier?.id === 'ai') {
      setFormData({
        name: 'Alex Rivera',
        email: 'alex@claritylogistics.io',
        company: 'Clarity Logistics SaaS',
        role: 'VP of Engineering',
        projectDetails: 'We receive 800+ freight airway bills, BOLs, and customs declaration PDFs every day. Our ops team spends 35 minutes per shipment manually verifying tariff codes and invoice line items into our ERP.',
        targetOutcome: 'A containerized FastAPI service with multimodal LLM extraction, Pydantic strict schemas, citation verification, and a benchmark report showing >98% accuracy on 50 sample invoices.',
        existingStack: 'PostgreSQL, Node.js backend, AWS ECS, Python',
        preferredChannel: 'slack',
        targetKickoffDate: 'Upcoming Monday'
      });
    } else if (selectedTier?.id === 'security') {
      setFormData({
        name: 'Sarah Chen',
        email: 'sarah@fintechmesh.com',
        company: 'Mesh Payments',
        role: 'SecOps Lead',
        projectDetails: 'Our Wazuh SIEM produces 12,000+ noise alerts daily from VPC flow logs and Kubernetes ingress. True brute-force attempts and credential stuffing get lost in the flood.',
        targetOutcome: 'A deduplication & enrichment proxy script using Sigma rules, Redis intel cache, and automated PagerDuty/Slack critical escalation routing.',
        existingStack: 'Wazuh, Elastic, AWS CloudWatch, PagerDuty, Slack',
        preferredChannel: 'slack',
        targetKickoffDate: 'Immediate'
      });
    } else {
      setFormData({
        name: 'Marcus Vance',
        email: 'marcus@agricold.tech',
        company: 'AgriCold Systems',
        role: 'Founding Hardware Engineer',
        projectDetails: 'Need an ESP32-S3 firmware prototype with DS18B20 temp probes, local flash circular queue for cellular dead zones, and secure MQTT TLS telemetry to TimescaleDB.',
        targetOutcome: 'Working ESP32 firmware with zero-loss offline buffering, wiring pinout schematic, and a Grafana dashboard displaying real-time telemetry.',
        existingStack: 'ESP32-S3, C++/PlatformIO, EMQX broker, Grafana',
        preferredChannel: 'whatsapp',
        targetKickoffDate: 'Next Week'
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const getTierIcon = (tierId: string) => {
    switch (tierId) {
      case 'ai':
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'security':
        return <Shield className="w-6 h-6 text-emerald-400" />;
      case 'iot':
        return <Wrench className="w-6 h-6 text-amber-400" />;
      default:
        return <Cpu className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col">
      
      {/* Navbar */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenScopeChecker={() => setIsScopeModalOpen(true)}
        step={step}
        onResetToLanding={() => setStep('landing')}
      />

      {/* STEP 1: LANDING PAGE */}
      {step === 'landing' && (
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono">14-Day Fixed-Price Proof of Concept Sprints</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Production-Ready Systems in <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">14 Days</span>. Zero Hourly Risk.
            </h1>
            
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Stop getting stuck in prototype purgatory or runaway consultant retainers. Select your specialized sprint track below, and let’s ship robust AI workflows, automated security triage, or edge-IoT prototypes fast.
            </p>

            {/* Quick Proof Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                <Check className="w-3.5 h-3.5 text-cyan-400" /> Fixed fee, zero scope creep
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> 100% Client IP & Git ownership
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                <Check className="w-3.5 h-3.5 text-amber-400" /> 14-day post-delivery bug warranty
              </span>
            </div>
          </div>

          {/* Tier Selector Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {TIERS.map((tier) => (
              <div 
                key={tier.id}
                className="group relative bg-slate-900/40 border border-slate-800/80 rounded-2xl p-7 flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 group-hover:bg-cyan-500/10 transition-colors">
                      {getTierIcon(tier.id)}
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-cyan-400/90 font-mono mb-3">
                    {tier.tagline}
                  </p>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Deliverables checklist */}
                  <div className="space-y-2.5 mb-6">
                    {tier.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Architecture & Repo peek button */}
                  <button
                    onClick={() => setArchModalTier(tier)}
                    className="w-full mb-6 py-2 px-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-cyan-300 text-xs font-mono flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Architecture & Sample Repo</span>
                  </button>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-5 pt-4 border-t border-slate-800/80">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">Fixed Sprint Fee</span>
                      <span className="text-[10px] text-slate-500">50% upfront, 50% on Day 14</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-slate-100">{tier.pricing[currency].display}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTierSelect(tier)}
                    className="w-full py-3.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer group-hover:shadow-cyan-500/30"
                  >
                    <span>Book This Sprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive 14-Day Timeline Section */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">Sprint Blueprint</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1">How We Execute in 14 Days</h2>
              <p className="text-sm text-slate-400 mt-2">
                A disciplined, battle-tested engineering rhythm designed to eliminate scope creep and deliver production code.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SPRINT_TIMELINE.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/80 hover:border-slate-700 transition-colors relative"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                      {item.day}
                    </span>
                    <span className="text-slate-600 font-mono text-xs">Milestone 0{idx + 1}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.summary}</p>
                  <div className="pt-3 border-t border-slate-800/60 flex items-center space-x-2 text-[11px] text-slate-300 font-mono">
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{item.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Case Studies / Verified Sprint Outcomes */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold">Previous Work</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1">Real Sprints. Real Production Outcomes.</h2>
              <p className="text-sm text-slate-400 mt-2">
                Selected case studies delivered in 14-day production windows.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {CASE_STUDIES.map((cs) => (
                <div key={cs.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {cs.clientType}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">
                        {cs.timeframe}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div>
                        <span className="text-[11px] font-mono text-slate-500 uppercase block font-semibold">The Bottleneck:</span>
                        <p className="text-xs text-slate-300 mt-0.5">{cs.problem}</p>
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-slate-500 uppercase block font-semibold">The 14-Day Delivery:</span>
                        <p className="text-xs text-slate-300 mt-0.5">{cs.solution}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800/80 mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">Impact Delivered:</span>
                      {cs.results.map((r, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-slate-200">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                    {cs.tech.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Zero-Risk Guarantee</span>
              </div>
              <h4 className="text-lg font-bold text-slate-200">Day 1 Feasibility & Scope Lock Commitment</h4>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                If during our Day 1 kickoff sync we jointly conclude your objective cannot be shipped to production standards within 14 days, you get a 100% immediate refund of your deposit. No hard feelings.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => setIsScopeModalOpen(true)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center space-x-2 cursor-pointer transition-colors"
              >
                <span>Check Sprint Readiness</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center space-x-2 text-xs text-cyan-400 bg-cyan-500/10 px-4 py-2.5 rounded-xl border border-cyan-500/20 font-semibold">
                <Lock className="w-4 h-4" />
                <span>50% Deposit Secures Slot</span>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="text-center mb-8">
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">Clarity & Terms</span>
              <h2 className="text-2xl font-bold mt-1">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full text-left p-4.5 flex items-center justify-between text-sm font-semibold text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedFaq === idx ? 'rotate-180 text-cyan-400' : ''}`} />
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-4.5 pb-4.5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 bg-slate-950/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Lead Card */}
          <div className="text-center py-10 border-t border-slate-800/80 max-w-xl mx-auto space-y-4">
            <h3 className="text-xl font-bold">Ready to ship in the next 14 days?</h3>
            <p className="text-xs text-slate-400">
              Only 2 sprint slots available for November. Select a track above to secure your window.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => handleTierSelect(TIERS[0])}
                className="py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <span>Start Intake Questionnaire</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      )}

      {/* STEP 2: INTAKE QUESTIONNAIRE */}
      {step === 'intake' && selectedTier && (
        <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12 w-full">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setStep('landing')}
              className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tracks</span>
            </button>

            {/* Auto-fill demo button */}
            <button
              onClick={fillSampleData}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors cursor-pointer"
              title="Click to fill sample project data for fast testing"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Fill Demo Scenario</span>
            </button>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {/* Header info */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold">Step 1 of 2</span>
                <span className="text-xs font-mono text-slate-400">{selectedTier.pricing[currency].display} Fixed Sprint</span>
              </div>
              <h2 className="text-2xl font-bold mt-1 text-slate-100 flex items-center gap-2">
                Sprint Intake: <span className="text-cyan-300">{selectedTier.name}</span>
              </h2>
              <p className="text-sm text-slate-400 mt-1.5">
                Provide technical context so we can prepare your architecture diagram and hit the ground running on Day 1.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Your Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Alex Rivera"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-slate-100 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Work Email <span className="text-cyan-400">*</span>
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-slate-100 transition-colors"
                  />
                </div>
              </div>

              {/* Company & Role */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Company / Organization <span className="text-cyan-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Acme Technologies"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-slate-100 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Your Role / Title
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. CTO / Tech Lead / Founder"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-slate-100 transition-colors"
                  />
                </div>
              </div>

              {/* Bottleneck description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Describe Your Current Bottleneck or Problem <span className="text-cyan-400">*</span>
                </label>
                <textarea 
                  rows={3}
                  required
                  placeholder="e.g., We receive 500+ unstructured support documents and need an LLM triage pipeline with automated eval benchmarks..."
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({...formData, projectDetails: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-slate-100 transition-colors resize-none"
                />
              </div>

              {/* Target outcome */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  What does a successful 14-day outcome look like? <span className="text-cyan-400">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., A working GitHub repo that parses invoices with >95% accuracy and an automated eval harness"
                  value={formData.targetOutcome}
                  onChange={(e) => setFormData({...formData, targetOutcome: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-slate-100 transition-colors"
                />
              </div>

              {/* Existing stack */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Existing Tech Stack / Infrastructure (Optional)
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., AWS, Python, PostgreSQL, React, Wazuh, ESP32"
                  value={formData.existingStack}
                  onChange={(e) => setFormData({...formData, existingStack: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-slate-100 transition-colors"
                />
              </div>

              {/* Preferred async channel */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Preferred Async Communication Channel
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'slack', label: 'Slack Shared Channel' },
                    { id: 'whatsapp', label: 'WhatsApp Direct' },
                    { id: 'email', label: 'Async Email' },
                  ].map((ch) => (
                    <button
                      type="button"
                      key={ch.id}
                      onClick={() => setFormData({ ...formData, preferredChannel: ch.id as any })}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        formData.preferredChannel === ch.id
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <span>Proceed to Secure Deposit ({selectedTier.pricing[currency].depositDisplay})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2 font-mono">
                  🔒 Day 1 Scope Lock Guarantee: 100% refundable if project scope cannot be satisfied in 14 days.
                </p>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* STEP 3: CHECKOUT & DEPOSIT */}
      {step === 'checkout' && selectedTier && (
        <main className="flex-1 max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-12 w-full">
          <button 
            onClick={() => setStep('intake')}
            className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-cyan-400 mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Intake Form</span>
          </button>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold">Step 2 of 2</span>
              <h2 className="text-2xl font-bold mt-1 text-slate-100">Secure Your Sprint Slot</h2>
              <p className="text-sm text-slate-400 mt-1.5">
                Pay the 50% upfront deposit to lock in your calendar window and trigger Day 1 kickoff preparation.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-6 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Track</span>
                <span className="font-semibold text-slate-200">{selectedTier.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Client / Company</span>
                <span className="text-slate-200">{formData.company || 'Enterprise Partner'} ({formData.name || 'Lead'})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Fixed Sprint Fee</span>
                <span className="font-semibold text-slate-200">{selectedTier.pricing[currency].display}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Remaining 50% Balance</span>
                <span className="text-slate-400">Due upon Day 14 Handover ({selectedTier.pricing[currency].depositDisplay})</span>
              </div>
              <div className="border-t border-slate-800/80 pt-3 flex justify-between text-sm font-bold">
                <span className="text-cyan-400">50% Kickoff Deposit Due Now</span>
                <span className="text-cyan-400 text-base">{selectedTier.pricing[currency].depositDisplay}</span>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentDetails({ ...paymentDetails, method: 'card' })}
                    className={`p-3.5 rounded-xl border flex items-center space-x-2.5 transition-all cursor-pointer ${
                      paymentDetails.method === 'card'
                        ? 'border-cyan-500/80 bg-cyan-500/10 text-cyan-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-xs font-semibold">Stripe / Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentDetails({ ...paymentDetails, method: 'upi' })}
                    className={`p-3.5 rounded-xl border flex items-center space-x-2.5 transition-all cursor-pointer ${
                      paymentDetails.method === 'upi'
                        ? 'border-cyan-500/80 bg-cyan-500/10 text-cyan-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold">UPI / Bank Wire</span>
                  </button>
                </div>
              </div>

              {paymentDetails.method === 'card' ? (
                /* Card Input fields (Fixed readFile -> readOnly typo!) */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Card Number (Sandbox Mode)
                    </label>
                    <span className="text-[10px] text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      Test Cards Accepted
                    </span>
                  </div>

                  <input 
                    type="text" 
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Expiry Date</label>
                      <input 
                        type="text" 
                        value={paymentDetails.cardExpiry} 
                        onChange={(e) => setPaymentDetails({...paymentDetails, cardExpiry: e.target.value})}
                        placeholder="MM/YY"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">CVC</label>
                      <input 
                        type="text" 
                        value={paymentDetails.cardCvc} 
                        onChange={(e) => setPaymentDetails({...paymentDetails, cardCvc: e.target.value})}
                        placeholder="888"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Name on Card</label>
                    <input 
                      type="text" 
                      value={paymentDetails.cardName} 
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                      placeholder="Alex Morgan"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" 
                    />
                  </div>
                </div>
              ) : (
                /* UPI / Bank Wire option */
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">Domestic & International Wire:</span>
                    <span className="text-xs font-bold text-emerald-400">Zero Processing Fee</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-500 block">UPI VPA</span>
                      <span className="text-sm font-mono font-bold text-slate-200">nachiketh.v@icici</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('nachiketh.v@icici')}
                      className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400 flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5">
                      Transaction UTR / Reference ID (or leave blank for test sandbox)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UTR-984029410 or Wire #REF-2026"
                      value={paymentDetails.transactionRef || ''}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, transactionRef: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              {/* Guarantees checkboxes */}
              <div className="space-y-2.5 pt-2 text-xs text-slate-400">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paymentDetails.agreedToTerms}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, agreedToTerms: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
                  />
                  <span>
                    I understand the <strong className="text-slate-300">50% kickoff deposit</strong> locks my slot. If Day 1 scope lock is unfeasible, deposit is 100% refunded immediately.
                  </span>
                </label>
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paymentDetails.agreedToNda}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, agreedToNda: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
                  />
                  <span>
                    Mutual NDA & IP agreement: All deliverables and Git repositories transfer exclusively to client on Day 14.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isProcessingPayment || !paymentDetails.agreedToTerms}
                className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                {isProcessingPayment ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Authorizing Deposit...</span>
                  </>
                ) : (
                  <>
                    <span>Authorize & Lock Sprint Slot ({selectedTier.pricing[currency].depositDisplay})</span>
                    <Lock className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </main>
      )}

      {/* STEP 4: ONBOARDING SUCCESS DASHBOARD */}
      {step === 'success' && selectedTier && (
        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-12 w-full">
          <div className="bg-slate-900/50 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold">
                Deposit Received Successfully // Sprint Slot Secured
              </span>
              <h2 className="text-3xl font-bold text-slate-100">Your 14-Day Sprint is Active!</h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">
                Thank you, <span className="text-slate-200 font-semibold">{formData.name || 'Partner'}</span>. Your slot for{' '}
                <span className="text-cyan-300 font-semibold">{selectedTier.name}</span> has been confirmed.
              </p>
            </div>

            {/* Quick action bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                onClick={() => setIsCalendarModalOpen(true)}
                className="py-3 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Day 1 Kickoff Call</span>
              </button>

              <button
                onClick={() => setIsReceiptModalOpen(true)}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center space-x-2 transition-all border border-slate-700 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Official SOW & Receipt</span>
              </button>

              <button
                onClick={() => setIsSummaryModalOpen(true)}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center space-x-2 transition-all border border-cyan-500/30 hover:border-cyan-500/60 cursor-pointer shadow-md"
              >
                <FileDown className="w-4 h-4 text-emerald-400" />
                <span>Download Progress Summary (PDF)</span>
              </button>
            </div>

            {/* 14-Day Visual Progress Bar with Interactive Slider */}
            <SprintProgressBar 
              startDate={kickoffDate}
              tierId={selectedTier.id}
              tierName={selectedTier.name}
              currentSprintDay={activeSprintDay}
              onDayChange={(d) => setActiveSprintDay(d)}
            />

            {/* GitHub Pulse Graph // Real-Time Engineering Stream */}
            <GitHubPulseGraph
              tierId={selectedTier.id}
              tierName={selectedTier.name}
              activeDay={activeSprintDay}
              kickoffDate={kickoffDate}
            />

            {/* Automated 14-Day Sprint Notification Feed with Checkmarks */}
            <SprintNotificationFeed
              kickoffDate={kickoffDate}
              tierId={selectedTier.id}
              tierName={selectedTier.name}
              clientEmail={formData.email}
              preferredChannel={formData.preferredChannel}
              externalDaySync={activeSprintDay}
            />

            {/* Pipeline Onboarding Checklist */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-left space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
                Automated Onboarding Pipeline
              </h4>
              
              <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">✓</div>
                <span>SOW & 50% Kickoff Deposit Confirmed (Receipt emailed to <strong className="text-cyan-300">{formData.email || 'your email'}</strong>)</span>
              </div>

              <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">✓</div>
                <span>Intake Questionnaire Synced (Outcome: &ldquo;{formData.targetOutcome || 'Production Delivery'}&rdquo;)</span>
              </div>

              <div className="flex items-center space-x-3 text-xs sm:text-sm text-cyan-400 font-semibold animate-pulse">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <span>Pending Action: Day 1 Kickoff Call & Scope Lock (30 min)</span>
              </div>

              <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-500">
                <div className="w-5 h-5 rounded-full bg-slate-900 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">4</div>
                <span>Upcoming: Private GitHub Repo Invite & Sandbox Access Exchange</span>
              </div>
            </div>

            {/* Interactive Sprint Room Tabs */}
            <div className="text-left bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <div className="flex border-b border-slate-800 pb-3 gap-4 text-xs font-mono">
                <button
                  onClick={() => setSuccessTab('milestones')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    successTab === 'milestones'
                      ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sprint Schedule
                </button>
                <button
                  onClick={() => setSuccessTab('checklist')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    successTab === 'checklist'
                      ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Day 1 Preparation Checklist
                </button>
                <button
                  onClick={() => setSuccessTab('access')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    successTab === 'access'
                      ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Direct Support Lines
                </button>
              </div>

              <div className="pt-4 text-xs">
                {successTab === 'milestones' && (
                  <div className="space-y-2.5">
                    <p className="text-slate-400">Your dedicated 14-day production roadmap:</p>
                    <div className="grid sm:grid-cols-2 gap-2 text-slate-300 font-mono text-[11px]">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-cyan-400 font-bold">Days 1 - 2:</span> Scope lock, acceptance tests, boundary definition.
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-cyan-400 font-bold">Days 3 - 6:</span> Core logic implementation & integration harness.
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-cyan-400 font-bold">Days 7 - 8:</span> Mid-point checkpoint demo with working screens.
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-cyan-400 font-bold">Days 9 - 11:</span> Evals regression, edge cases, error resiliency.
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-cyan-400 font-bold">Days 12 - 13:</span> Clean docs, runbooks, docker compose, tests.
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-emerald-400 font-bold">Day 14:</span> Git repository transfer, video team walkthrough.
                      </div>
                    </div>
                  </div>
                )}

                {successTab === 'checklist' && (
                  <div className="space-y-2 text-slate-300">
                    <p className="text-slate-400">To maximize Day 1 velocity, please prepare:</p>
                    <div className="space-y-1.5 p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px]">
                      <p>✓ 1. Sample input files (e.g., sample PDFs, log files, or sensor specs)</p>
                      <p>✓ 2. GitHub handles of team members who need repo access</p>
                      <p>✓ 3. Any API keys or sandbox test credentials you plan to use</p>
                    </div>
                  </div>
                )}

                {successTab === 'access' && (
                  <div className="space-y-3 text-slate-300 font-mono text-[11px]">
                    <p className="text-slate-400">Direct engineering channels with Nachiketh V.:</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-emerald-400" />
                        <div>
                          <span className="text-slate-400 block text-[10px]">Primary Email</span>
                          <span className="text-slate-200 font-bold">nachiketh.JO@gmail.com</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-cyan-400" />
                        <div>
                          <span className="text-slate-400 block text-[10px]">Kickoff Slack/WhatsApp</span>
                          <span className="text-slate-200 font-bold">Linked on Day 1 Kickoff</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Back button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setStep('landing')}
                className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-6 text-center text-xs text-slate-500 font-mono mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-400">Nachiketh V. // Sprint Practice</span>
            <span className="text-slate-600">|</span>
            <span>Fixed-Price Engineering</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <button
              onClick={() => setIsScopeModalOpen(true)}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Scope Readiness Evaluator
            </button>
            <span>•</span>
            <a
              href="mailto:nachiketh.JO@gmail.com"
              className="hover:text-cyan-400 transition-colors"
            >
              nachiketh.JO@gmail.com
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ScopeCheckerModal
        isOpen={isScopeModalOpen}
        onClose={() => setIsScopeModalOpen(false)}
        onSelectTrack={(trackId) => {
          setIsScopeModalOpen(false);
          const found = TIERS.find(t => t.id === trackId);
          if (found) handleTierSelect(found);
        }}
      />

      <ArchitectureModal
        tier={archModalTier}
        currency={currency}
        isOpen={!!archModalTier}
        onClose={() => setArchModalTier(null)}
        onSelectTier={(tier) => {
          setArchModalTier(null);
          handleTierSelect(tier);
        }}
      />

      {selectedTier && (
        <>
          <ReceiptModal
            isOpen={isReceiptModalOpen}
            onClose={() => setIsReceiptModalOpen(false)}
            tier={selectedTier}
            formData={formData}
            currency={currency}
          />

          <CalendarModal
            isOpen={isCalendarModalOpen}
            onClose={() => setIsCalendarModalOpen(false)}
            clientName={formData.name}
            clientEmail={formData.email}
            tierName={selectedTier.name}
            onDateSelected={(d) => setKickoffDate(d)}
          />

          <ProgressSummaryModal
            isOpen={isSummaryModalOpen}
            onClose={() => setIsSummaryModalOpen(false)}
            tier={selectedTier}
            formData={formData}
            kickoffDate={kickoffDate}
            currentDay={activeSprintDay}
            currency={currency}
          />
        </>
      )}

    </div>
  );
}
