import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, Check, Bell, Sparkles, 
  ExternalLink, MessageSquare, Terminal, GitCommit,
  Filter, RotateCcw, ChevronRight, Play, AlertCircle,
  FileCode, CheckCheck, Send
} from 'lucide-react';
import { DAILY_DELIVERABLES, DayDeliverable } from '../data/sprints';

interface SprintNotificationFeedProps {
  kickoffDate: string;
  tierId?: 'ai' | 'security' | 'iot';
  tierName: string;
  clientEmail?: string;
  preferredChannel?: 'slack' | 'whatsapp' | 'email' | 'discord';
  externalDaySync?: number;
}

export const SprintNotificationFeed: React.FC<SprintNotificationFeedProps> = ({
  kickoffDate,
  tierId = 'ai',
  tierName,
  clientEmail = 'alex@company.com',
  preferredChannel = 'slack',
  externalDaySync,
}) => {
  // Calculate default sprint day relative to actual today vs kickoffDate
  const calculateRelativeDay = () => {
    const kickoff = new Date(kickoffDate);
    const now = new Date();
    // Days elapsed since kickoff (1-indexed)
    const diffMs = now.getTime() - kickoff.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
    // Default to at least Day 1 for demonstration if kickoff is today or upcoming
    return Math.max(1, Math.min(14, days > 0 ? days : 1));
  };

  // Simulated day state (defaults to relative day, but user can advance/scrub)
  const [simulatedDay, setSimulatedDay] = useState<number>(() => calculateRelativeDay());
  const [filter, setFilter] = useState<'all' | 'completed' | 'upcoming'>('all');
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  // Sync with external slider if provided
  const activeDay = externalDaySync !== undefined ? externalDaySync : simulatedDay;

  // Compute dates relative to kickoff
  const kickoff = new Date(kickoffDate);
  const getDayDate = (dayOffset: number) => {
    const d = new Date(kickoff);
    d.setDate(d.getDate() + (dayOffset - 1));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const completedCount = Math.min(14, activeDay);
  const remainingCount = Math.max(0, 14 - activeDay);

  const filteredDeliverables = DAILY_DELIVERABLES.filter((item) => {
    const isCompleted = item.day < activeDay;
    const isCurrent = item.day === activeDay;
    if (filter === 'completed') return isCompleted || isCurrent;
    if (filter === 'upcoming') return item.day > activeDay;
    return true;
  });

  const handleTriggerTestNotification = () => {
    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 3000);
  };

  const getChannelBadge = () => {
    switch (preferredChannel) {
      case 'slack':
        return '#sprint-14d-nachiketh (Slack)';
      case 'whatsapp':
        return 'WhatsApp Priority Line';
      case 'email':
        return `Digest &rarr; ${clientEmail}`;
      default:
        return '#sprint-updates';
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 text-left shadow-lg space-y-5 relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
              Automated 14-Day Sprint Notification Feed
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              LIVE BOT
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulating asynchronous daily recaps dispatched to your channel. Checkmarks mark verified completed milestones.
          </p>
        </div>

        {/* Channel destination pill */}
        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">Target Channel:</span>
          <span className="font-bold text-cyan-300">{getChannelBadge()}</span>
        </div>
      </div>

      {/* Progress & Simulation Controller */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Milestone Completed Counter */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-base">
            {completedCount}
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
              <span>{completedCount} of 14 Milestones Completed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              Based on Kickoff: <strong className="text-slate-300">{getDayDate(1)}</strong> ({remainingCount} days remaining)
            </p>
          </div>
        </div>

        {/* Day Stepper & Simulation tools */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setSimulatedDay(Math.max(1, simulatedDay - 1))}
            disabled={simulatedDay <= 1}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-300 disabled:opacity-40 transition-colors cursor-pointer"
            title="Roll back 1 day in sprint timeline"
          >
            -1 Day
          </button>

          <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-bold">
            Simulated Day: {activeDay} / 14
          </span>

          <button
            onClick={() => setSimulatedDay(Math.min(14, simulatedDay + 1))}
            disabled={simulatedDay >= 14}
            className="px-2.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-40 transition-colors cursor-pointer shadow-sm"
            title="Advance sprint by 1 day to test checkmark trigger"
          >
            +1 Day (Advance)
          </button>

          <button
            onClick={handleTriggerTestNotification}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Send test simulated alert to feed"
          >
            <Send className="w-3 h-3 text-cyan-400" />
            <span>Send Test Alert</span>
          </button>
        </div>
      </div>

      {/* Test Notification Banner if clicked */}
      {testNotificationSent && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between font-mono animate-in fade-in">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Simulated webhook alert successfully broadcast to {getChannelBadge()}!</span>
          </div>
          <span className="text-[10px] text-emerald-400/80">HTTP 200 OK</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center space-x-1 text-xs font-mono bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-slate-800 text-slate-100 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Updates (14)
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-md flex items-center space-x-1 transition-colors cursor-pointer ${
              filter === 'completed'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Completed Checkmarks ({completedCount})</span>
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              filter === 'upcoming'
                ? 'bg-slate-800 text-slate-100 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Upcoming Milestones ({remainingCount})
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
          Auto-synced with sprint calendar
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {filteredDeliverables.map((item) => {
          const isCompleted = item.day < activeDay;
          const isCurrent = item.day === activeDay;
          const isUpcoming = item.day > activeDay;
          const trackDetail = item[tierId] || item.ai;

          return (
            <div
              key={item.day}
              className={`p-4 rounded-xl border transition-all text-xs ${
                isCurrent
                  ? 'bg-cyan-500/5 border-cyan-500/60 shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/30'
                  : isCompleted
                  ? 'bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500/60'
                  : 'bg-slate-900/30 border-slate-800/80 opacity-60 hover:opacity-90'
              }`}
            >
              {/* Item Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/60">
                <div className="flex items-center space-x-2.5">
                  {/* Status Indicator Icon */}
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/40 animate-pulse">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center shrink-0 border border-slate-700">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-200">
                        Day {item.day}: {item.title}
                      </span>
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCheck className="w-3 h-3" />
                          <span>VERIFIED COMPLETE</span>
                        </span>
                      )}
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1 animate-pulse">
                          <span>TODAY'S ACTIVE MILESTONE</span>
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-800">
                          SCHEDULED
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 font-mono text-[11px] text-slate-400">
                  <span>{getDayDate(item.day)}</span>
                  <span>•</span>
                  <span>{item.notification.time}</span>
                </div>
              </div>

              {/* Subject line and summary */}
              <div className="space-y-1.5 pl-8">
                <h5 className="font-semibold text-slate-200 text-xs">
                  {item.notification.subject}
                </h5>
                <p className="text-slate-400 leading-relaxed text-xs">
                  {item.notification.summary}
                </p>

                {/* Delivered code artifact badge */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-slate-400">Artifact:</span>
                    <span className="font-semibold text-slate-200">{trackDetail.codeArtifact}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400">
                    <GitCommit className="w-3 h-3 text-emerald-400" />
                    <span>commit {item.notification.commitHash}</span>
                  </div>

                  {item.notification.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 font-mono text-[10px]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer info note */}
      <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <div className="flex items-center space-x-1.5 text-slate-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>All milestone updates are signed cryptographically and mirrored to your repo commit log.</span>
        </div>
        <div className="text-cyan-400 font-semibold">
          14-Day Delivery SLA: 100% On-Time
        </div>
      </div>
    </div>
  );
};
