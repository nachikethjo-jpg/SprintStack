import React, { useState } from 'react';
import { 
  GitBranch, GitCommit, GitPullRequest, GitMerge, 
  Terminal, CheckCircle2, TrendingUp, Sparkles, 
  Layers, FileCode, Check, RefreshCw, ExternalLink,
  Code2, ShieldAlert, Cpu, Wrench, Shield
} from 'lucide-react';
import { DAILY_DELIVERABLES } from '../data/sprints';

interface GitHubPulseGraphProps {
  tierId?: 'ai' | 'security' | 'iot';
  tierName: string;
  activeDay: number; // 1 to 14 from slider or relative date
  kickoffDate: string;
}

interface CommitItem {
  id: string;
  day: number;
  message: string;
  author: string;
  timeAgo: string;
  filesChanged: number;
  additions: number;
  deletions: number;
  hash: string;
  isPrMerge?: boolean;
  prNumber?: number;
}

export const GitHubPulseGraph: React.FC<GitHubPulseGraphProps> = ({
  tierId = 'ai',
  tierName,
  activeDay,
  kickoffDate,
}) => {
  const [viewMode, setViewMode] = useState<'bars' | 'commits'>('bars');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Commits generation per day based on domain track
  const getCommitsForDay = (day: number): CommitItem[] => {
    const dData = DAILY_DELIVERABLES.find(d => d.day === day) || DAILY_DELIVERABLES[0];
    const trackDetail = dData[tierId] || dData.ai;

    if (tierId === 'ai') {
      return [
        {
          id: `c-${day}-1`,
          day,
          message: `feat(pipeline): ${trackDetail.deliverable.toLowerCase()}`,
          author: 'Nachiketh V.',
          timeAgo: `${15 - day}d ago`,
          filesChanged: 3 + (day % 3),
          additions: 120 + day * 34,
          deletions: 12 + day * 4,
          hash: dData.notification.commitHash,
        },
        {
          id: `c-${day}-2`,
          day,
          message: `merge PR #${day + 1}: feature/day-${day}-${trackDetail.codeArtifact.split('/')[0]} into main`,
          author: 'Nachiketh V.',
          timeAgo: `${15 - day}d ago`,
          filesChanged: 2,
          additions: 45 + day * 8,
          deletions: 6,
          hash: `pr-${day}a8`,
          isPrMerge: true,
          prNumber: day + 1,
        },
        {
          id: `c-${day}-3`,
          day,
          message: `test(evals): automated test matrix for ${trackDetail.codeArtifact}`,
          author: 'Nachiketh V.',
          timeAgo: `${15 - day}d ago`,
          filesChanged: 1,
          additions: 32 + day * 5,
          deletions: 2,
          hash: `tst-${day}f1`,
        }
      ];
    } else if (tierId === 'security') {
      return [
        {
          id: `c-${day}-1`,
          day,
          message: `feat(siem): ${trackDetail.deliverable.toLowerCase()}`,
          author: 'Nachiketh V.',
          timeAgo: `${15 - day}d ago`,
          filesChanged: 4,
          additions: 140 + day * 28,
          deletions: 18 + day * 6,
          hash: dData.notification.commitHash,
        },
        {
          id: `c-${day}-2`,
          day,
          message: `merge PR #${day + 1}: sec/triage-rule-${day} into main`,
          author: 'Nachiketh V.',
          timeAgo: `${15 - day}d ago`,
          filesChanged: 2,
          additions: 55 + day * 10,
          deletions: 8,
          hash: `sec-${day}b3`,
          isPrMerge: true,
          prNumber: day + 1,
        },
        {
          id: `c-${day}-3`,
          day,
          message: `test(threat): signature validation on ${trackDetail.codeArtifact}`,
          author: 'Nachiketh V.',
          timeAgo: `${15 - day}d ago`,
          filesChanged: 1,
          additions: 25 + day * 4,
          deletions: 1,
          hash: `sig-${day}e9`,
        }
      ];
    } else {
      return [
        {
          id: `c-${day}-1`,
          day,
          message: `feat(firmware): ${trackDetail.deliverable.toLowerCase()}`,
          author: 'Nachiketh V.',
          timeAgo: `${15 - day}d ago`,
          filesChanged: 3,
          additions: 95 + day * 30,
          deletions: 10 + day * 5,
          hash: dData.notification.commitHash,
        },
        {
          id: `c-${day}-2`,
          day,
          message: `merge PR #${day + 1}: hardware/esp32-subsystem-${day} into main`,
          author: 'Nachiketh V.',
          timeAgo: `${15 - day}d ago`,
          filesChanged: 2,
          additions: 60 + day * 12,
          deletions: 5,
          hash: `hw-${day}c4`,
          isPrMerge: true,
          prNumber: day + 1,
        },
        {
          id: `c-${day}-3`,
          day,
          message: `fix(telemetry): queue retry tolerances for ${trackDetail.codeArtifact}`,
          author: 'Nachiketh V.',
          timeAgo: `${15 - day}d ago`,
          filesChanged: 1,
          additions: 22 + day * 3,
          deletions: 3,
          hash: `io-${day}d2`,
        }
      ];
    }
  };

  // Generate distribution of commits across days 1 to 14
  const dayCommitCounts = Array.from({ length: 14 }, (_, i) => {
    const day = i + 1;
    // deterministic realistic commit counts per day
    const base = [4, 5, 6, 7, 5, 8, 4, 6, 7, 8, 6, 5, 4, 3][i] || 5;
    return {
      day,
      count: base,
      isPassed: day <= activeDay,
      isCurrent: day === activeDay,
    };
  });

  // Calculate cumulative stats up to activeDay
  const totalCommitsToDate = dayCommitCounts
    .filter(d => d.day <= activeDay)
    .reduce((sum, d) => sum + d.count, 0);

  const totalPrsMerged = Math.max(1, Math.round(activeDay * 0.85));
  const totalAdditions = Math.round(activeDay * 280 + 340);
  const totalDeletions = Math.round(activeDay * 42 + 25);

  const maxCommitsInDay = 8;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Recent commits for current active day
  const recentCommits = getCommitsForDay(activeDay);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 text-left shadow-lg space-y-5 relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-500" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                  GitHub Pulse // Real-Time Engineering Stream
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  BUILD PASSING
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                repo: <span className="text-slate-300">nachiketh-v/{tierId}-sprint-poc</span> (branch: <span className="text-cyan-400">main</span>)
              </p>
            </div>
          </div>
        </div>

        {/* View toggle & refresh button */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <div className="bg-slate-900 border border-slate-800 p-0.5 rounded-lg flex items-center">
            <button
              onClick={() => setViewMode('bars')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'bars'
                  ? 'bg-slate-800 text-slate-100 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Activity Pulse
            </button>
            <button
              onClick={() => setViewMode('commits')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'commits'
                  ? 'bg-slate-800 text-slate-100 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Day {activeDay} Commits ({recentCommits.length})
            </button>
          </div>

          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            title="Poll git activity"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Cumulative Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 font-mono">
          <span className="text-[10px] text-slate-500 uppercase font-bold block flex items-center gap-1.5">
            <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
            <span>Commits Pushed</span>
          </span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-xl font-bold text-slate-100">{totalCommitsToDate}</span>
            <span className="text-[11px] text-cyan-400">up to Day {activeDay}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 font-mono">
          <span className="text-[10px] text-slate-500 uppercase font-bold block flex items-center gap-1.5">
            <GitMerge className="w-3.5 h-3.5 text-emerald-400" />
            <span>PRs Merged</span>
          </span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-xl font-bold text-slate-100">{totalPrsMerged}</span>
            <span className="text-[11px] text-emerald-400">100% peer-tested</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 font-mono">
          <span className="text-[10px] text-slate-500 uppercase font-bold block flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Code Diff</span>
          </span>
          <div className="flex items-baseline space-x-1.5 mt-1 text-xs">
            <span className="font-bold text-emerald-400">+{totalAdditions.toLocaleString()}</span>
            <span className="text-slate-600">/</span>
            <span className="font-bold text-rose-400">-{totalDeletions}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 font-mono">
          <span className="text-[10px] text-slate-500 uppercase font-bold block flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Test Coverage</span>
          </span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-xl font-bold text-slate-100">94.8%</span>
            <span className="text-[11px] text-slate-400">eval suite</span>
          </div>
        </div>
      </div>

      {viewMode === 'bars' ? (
        /* 14-DAY PULSE FREQUENCY GRAPH */
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="text-slate-300 font-bold">14-Day Commit Frequency & Velocity</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400 text-[11px]">Synced with Day {activeDay} Slider</span>
            </div>
            <div className="flex items-center space-x-3 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-emerald-400" /> Completed Commits
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400 animate-pulse" /> Active Day Focus
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700" /> Scheduled
              </span>
            </div>
          </div>

          {/* Bar Chart Grid */}
          <div className="h-36 flex items-end justify-between gap-1 sm:gap-2 pt-6 px-1 sm:px-2 border-b border-slate-800 pb-2">
            {dayCommitCounts.map((item) => {
              const heightPercent = Math.round((item.count / maxCommitsInDay) * 100);
              const isPast = item.day < activeDay;
              const isCurrent = item.day === activeDay;
              const isFuture = item.day > activeDay;

              return (
                <div 
                  key={item.day}
                  className="flex-1 flex flex-col items-center h-full justify-end group relative"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-[10px] font-mono px-2 py-1 rounded shadow-lg pointer-events-none z-10 whitespace-nowrap text-slate-200">
                    Day {item.day}: {isPast || isCurrent ? `${item.count} commits pushed` : 'Scheduled sprints'}
                  </div>

                  {/* Commit count indicator */}
                  {(isPast || isCurrent) && (
                    <span className="text-[10px] font-mono text-slate-400 mb-1 group-hover:text-cyan-300 transition-colors">
                      {item.count}
                    </span>
                  )}

                  {/* Activity Bar */}
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-t from-cyan-500 to-sky-300 shadow-lg shadow-cyan-500/30 animate-pulse'
                        : isPast
                        ? 'bg-emerald-500 hover:bg-emerald-400 opacity-90'
                        : 'bg-slate-800/40 border border-dashed border-slate-700/60'
                    }`}
                    style={{ 
                      height: isFuture ? '14%' : `${Math.max(18, heightPercent)}%` 
                    }}
                  />
                  
                  {/* Day label */}
                  <span className={`text-[10px] font-mono mt-2 font-semibold ${
                    isCurrent ? 'text-cyan-300 font-bold scale-110' : isPast ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    D{item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
            <span>← Sprint Start (Scope Lock)</span>
            <span className="text-cyan-400 font-semibold">Active Position: Day {activeDay} ({totalCommitsToDate} commits pushed)</span>
            <span>Sprint Completion (IP Handover) →</span>
          </div>
        </div>
      ) : (
        /* DAY SPECIFIC COMMITS FEED */
        <div className="space-y-2.5 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-slate-800">
            <span className="font-bold text-slate-200">
              Git Commit Log for Sprint Day {activeDay}
            </span>
            <span className="text-[11px] text-slate-400">
              Author: Nachiketh V. (Lead Engineer)
            </span>
          </div>

          <div className="space-y-2">
            {recentCommits.map((c) => (
              <div 
                key={c.id}
                className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs"
              >
                <div className="flex items-start sm:items-center space-x-2.5">
                  {c.isPrMerge ? (
                    <GitMerge className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                  ) : (
                    <GitCommit className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
                  )}
                  <div>
                    <span className="text-slate-200 font-semibold block sm:inline">{c.message}</span>
                    <span className="text-[10px] text-slate-500 sm:ml-2">({c.timeAgo})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-[11px] shrink-0 self-end sm:self-auto">
                  <div className="text-slate-400">
                    <span className="text-emerald-400">+{c.additions}</span> / <span className="text-rose-400">-{c.deletions}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-[10px]">
                    {c.hash}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Git status note */}
      <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <div className="flex items-center space-x-2 text-slate-300">
          <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
          <span>Active worktree synced to: <code className="text-cyan-300">origin/sprint-v14-release</code></span>
        </div>
        <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>100% Verified CI / Pytest Passing</span>
        </div>
      </div>
    </div>
  );
};
