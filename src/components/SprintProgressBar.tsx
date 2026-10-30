import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, Calendar, ArrowRight, 
  Sparkles, ShieldCheck, PlayCircle, Flag, ChevronRight,
  AlertCircle, FileCode, Check, Sliders, Layers,
  Terminal, ChevronLeft
} from 'lucide-react';
import { DAILY_DELIVERABLES, DayDeliverable } from '../data/sprints';

interface SprintProgressBarProps {
  startDate?: string;
  tierId?: 'ai' | 'security' | 'iot';
  tierName: string;
  currentSprintDay?: number; // actual day elapsed since kickoff
  onDayChange?: (day: number) => void;
}

interface SprintPhase {
  id: number;
  name: string;
  dayRange: string;
  startDay: number;
  endDay: number;
  description: string;
  clientActionNeeded: string;
}

const PHASES: SprintPhase[] = [
  {
    id: 1,
    name: 'Scope Lock & Architecture',
    dayRange: 'Days 1 - 2',
    startDay: 1,
    endDay: 2,
    description: 'Day 1 kickoff call, API/hardware access exchange, and signed acceptance criteria lock.',
    clientActionNeeded: 'Attend 30-min kickoff call & provide sandbox API tokens or sample logs'
  },
  {
    id: 2,
    name: 'Core Engine & Ingestion',
    dayRange: 'Days 3 - 6',
    startDay: 3,
    endDay: 6,
    description: 'Writing primary logic: LLM orchestration, parser pipelines, or embedded firmware state machine.',
    clientActionNeeded: 'Review async daily Slack/WhatsApp update recap'
  },
  {
    id: 3,
    name: 'Mid-Point Demo & Review',
    dayRange: 'Days 7 - 8',
    startDay: 7,
    endDay: 8,
    description: 'Live interactive screen-share checkpoint with working code and initial output validation.',
    clientActionNeeded: 'Participate in 25-min live demo walkthrough & provide calibration feedback'
  },
  {
    id: 4,
    name: 'Hardening, Evals & Stress QA',
    dayRange: 'Days 9 - 11',
    startDay: 9,
    endDay: 11,
    description: 'DeepEval prompt regression, false-positive benchmarking, sensor stress tests, and error guardrails.',
    clientActionNeeded: 'Validate golden dataset results & edge-case samples'
  },
  {
    id: 5,
    name: 'Packaging & IP Handover',
    dayRange: 'Days 12 - 14',
    startDay: 12,
    endDay: 14,
    description: 'Clean repository, Docker containers, runbooks, Git transfer, and recorded team walkthrough.',
    clientActionNeeded: 'Accept GitHub ownership transfer & confirm final signoff'
  }
];

export const SprintProgressBar: React.FC<SprintProgressBarProps> = ({
  startDate = '2026-11-02',
  tierId = 'ai',
  tierName,
  currentSprintDay = 1,
  onDayChange,
}) => {
  // Interactive slider day (1 to 14)
  const [sliderDay, setSliderDay] = useState<number>(1);
  const totalDays = 14;

  const handleSliderChange = (newDay: number) => {
    const clamped = Math.max(1, Math.min(14, newDay));
    setSliderDay(clamped);
    if (onDayChange) {
      onDayChange(clamped);
    }
  };

  // Calculate dates relative to start date
  const start = new Date(startDate);
  const addDays = (d: Date, days: number) => {
    const res = new Date(d);
    res.setDate(res.getDate() + days);
    return res;
  };

  const selectedDateObj = addDays(start, sliderDay - 1);
  const completionDateObj = addDays(start, 13);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const daysRemaining = Math.max(0, totalDays - sliderDay);
  const progressPercent = Math.min(100, Math.round((sliderDay / totalDays) * 100));

  // Current phase based on sliderDay
  const currentPhase = PHASES.find(p => sliderDay >= p.startDay && sliderDay <= p.endDay) || PHASES[0];

  // Current day deliverable details
  const dayData = DAILY_DELIVERABLES.find(d => d.day === sliderDay) || DAILY_DELIVERABLES[0];
  const trackDetail = dayData[tierId] || dayData.ai;

  const getPhaseStatus = (phase: SprintPhase) => {
    if (sliderDay > phase.endDay) return 'completed';
    if (sliderDay >= phase.startDay && sliderDay <= phase.endDay) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 text-left shadow-lg relative overflow-hidden">
      {/* Decorative top accent glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400" />

      {/* Header with relative day statistics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
              14-Day Sprint Execution Tracker
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
              {tierName}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Drag the interactive slider below to inspect expected deliverables for any day in the cycle.
          </p>
        </div>

        {/* Sprint dates & remaining days badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Kickoff Date</span>
            <span className="text-slate-200 font-bold">{formatDate(start)}</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Delivery Target</span>
            <span className="text-emerald-400 font-bold">{formatDate(completionDateObj)}</span>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-xl font-mono text-xs">
            <span className="text-cyan-400 block text-[10px] uppercase font-semibold">Relative Remaining</span>
            <span className="text-cyan-300 font-bold">
              {daysRemaining === 0 ? 'Handover Day!' : `${daysRemaining} Days Left`}
            </span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE SLIDER SECTION */}
      <div className="pt-6 pb-4">
        {/* Metric summary bar with dynamic Day callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono mb-3">
          <div className="flex items-center space-x-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-bold text-cyan-300 text-sm flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Day {sliderDay} of {totalDays}
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-300 font-semibold truncate">
              {dayData.title}
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-slate-400">
            <span>Date: <strong className="text-slate-200">{formatDate(selectedDateObj)}</strong></span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-bold">{progressPercent}% Cycle</span>
          </div>
        </div>

        {/* The Interactive Slider Control */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-inner space-y-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
            <span className="flex items-center gap-1 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Day 1: Scope Lock
            </span>
            <span className="text-cyan-400 font-bold hidden sm:inline">
              ← Drag Slider to Inspect Any Day →
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              Day 14: Handover
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </span>
          </div>

          {/* Range Input element */}
          <div className="relative pt-1 pb-2">
            <input 
              type="range"
              min="1"
              max="14"
              step="1"
              value={sliderDay}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-ew-resize accent-cyan-400 focus:outline-none border border-slate-800 shadow-inner"
            />

            {/* Custom 14-day Tick Marks */}
            <div className="flex justify-between items-center px-1 pt-2 font-mono text-[10px] text-slate-500">
              {Array.from({ length: 14 }, (_, i) => i + 1).map((d) => (
                <button
                  key={d}
                  onClick={() => handleSliderChange(d)}
                  className={`transition-colors cursor-pointer flex flex-col items-center ${
                    sliderDay === d
                      ? 'text-cyan-300 font-bold scale-110'
                      : d === 1 || d === 8 || d === 14
                      ? 'text-slate-300 font-semibold'
                      : 'hover:text-slate-300'
                  }`}
                >
                  <span className={`w-1 h-1.5 rounded-full mb-1 ${
                    sliderDay === d
                      ? 'bg-cyan-400'
                      : d === 8
                      ? 'bg-amber-400'
                      : d === 14
                      ? 'bg-emerald-400'
                      : 'bg-slate-700'
                  }`} />
                  <span>{d}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stepper buttons (prev / next day quick controls) */}
          <div className="flex items-center justify-between pt-1 text-xs font-mono">
            <button
              onClick={() => handleSliderChange(sliderDay - 1)}
              disabled={sliderDay === 1}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-300 disabled:opacity-40 disabled:hover:text-slate-300 flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev Day ({Math.max(1, sliderDay - 1)})</span>
            </button>

            {/* Milestone quick jump buttons */}
            <div className="hidden md:flex items-center space-x-1.5">
              {[
                { day: 1, label: 'Kickoff (D1)' },
                { day: 3, label: 'Ingestion (D3)' },
                { day: 8, label: 'Demo (D8)' },
                { day: 10, label: 'Evals (D10)' },
                { day: 14, label: 'Handover (D14)' },
              ].map((jump) => (
                <button
                  key={jump.day}
                  onClick={() => handleSliderChange(jump.day)}
                  className={`px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
                    sliderDay === jump.day
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {jump.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleSliderChange(sliderDay + 1)}
              disabled={sliderDay === 14}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-300 disabled:opacity-40 disabled:hover:text-slate-300 flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <span>Next Day ({Math.min(14, sliderDay + 1)})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5-Phase Horizontal Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mt-4">
          {PHASES.map((phase) => {
            const status = getPhaseStatus(phase);

            return (
              <button
                key={phase.id}
                onClick={() => handleSliderChange(phase.startDay)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative group ${
                  status === 'current'
                    ? 'bg-cyan-500/10 border-cyan-500/80 shadow-md shadow-cyan-500/10'
                    : status === 'completed'
                    ? 'bg-slate-900/90 border-emerald-500/40 text-slate-300 hover:border-emerald-500/70'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                {/* Status icon & Day badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    status === 'current'
                      ? 'bg-cyan-500 text-slate-950'
                      : status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {phase.dayRange}
                  </span>

                  {status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : status === 'current' ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  )}
                </div>

                <div className={`text-xs font-bold truncate ${
                  status === 'current' ? 'text-cyan-300' : status === 'completed' ? 'text-slate-200' : 'text-slate-400'
                }`}>
                  {phase.name}
                </div>

                <div className="text-[10px] text-slate-500 font-mono mt-1">
                  {status === 'completed' ? 'Completed' : status === 'current' ? 'Active Now' : 'Upcoming'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DYNAMIC EXPECTED DELIVERABLES CARD FOR THE SELECTED SLIDER DAY */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 mt-2 space-y-4 shadow-md transition-all">
        {/* Day Header with Live Status Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <span className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
              D{dayData.day}
            </span>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                Expected Deliverable for Day {dayData.day} of 14
              </span>
              <h4 className="text-sm font-bold text-slate-100">{dayData.title}</h4>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-md border font-semibold bg-cyan-500/10 text-cyan-300 border-cyan-500/20">
              Phase {dayData.phaseId}: {dayData.phaseName}
            </span>
            <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
              {formatDate(selectedDateObj)}
            </span>
          </div>
        </div>

        {/* Technical Deliverables breakdown for this day */}
        <div className="grid md:grid-cols-2 gap-3.5">
          {/* Deliverable focus & code artifact */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-2 font-mono">
            <span className="text-[10px] uppercase text-slate-500 font-bold block flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>Deliverable & Code Artifact</span>
            </span>
            <p className="text-xs text-slate-200 font-sans leading-relaxed font-semibold">
              {trackDetail.deliverable}
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-cyan-300 bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{trackDetail.codeArtifact}</span>
            </div>
          </div>

          {/* Acceptance criteria & notification simulation */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acceptance & Verification Metric</span>
            </span>
            <div className="flex items-start space-x-2 text-xs text-slate-200">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{trackDetail.acceptanceMetric}</span>
            </div>

            <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Async Daily Update:</span>
              <span className="text-emerald-400 font-semibold">{dayData.notification.time} EST</span>
            </div>
          </div>
        </div>

        {/* Phase Client Action reminder */}
        <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/30 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-cyan-400 font-bold text-[10px] uppercase">Client Action:</span>
            <span>{currentPhase.clientActionNeeded}</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400/90 hidden sm:inline">
            Commit Ref: #{dayData.notification.commitHash}
          </span>
        </div>
      </div>
    </div>
  );
};
