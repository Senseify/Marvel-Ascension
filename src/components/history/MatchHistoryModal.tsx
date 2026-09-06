import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MatchHistoryEntry } from '../../types/game';
import { soundManager } from '../../audio/soundManager';
import { 
  X, Trophy, Swords, Zap, Shield, Calendar, Clock, 
  Award, Sparkles, ChevronRight, ChevronDown, Flame, User, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

interface Props {
  onClose: () => void;
}

type ModeFilter = 'ALL' | 'RANKED' | 'CASUAL' | 'DUNGEON' | 'AUCTION';

export function MatchHistoryModal({ onClose }: Props) {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<ModeFilter>('ALL');
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  const matches: MatchHistoryEntry[] = user?.matchHistory || [];

  const filteredMatches = matches.filter(m => {
    if (selectedFilter === 'ALL') return true;
    return m.matchMode === selectedFilter;
  });

  const getModeBadge = (mode: string) => {
    switch (mode) {
      case 'RANKED':
        return <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 font-extrabold text-[10px] flex items-center gap-1">⚡ RANKED</span>;
      case 'DUNGEON':
        return <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 font-extrabold text-[10px] flex items-center gap-1">🗡️ DUNGEON</span>;
      case 'AUCTION':
        return <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 font-extrabold text-[10px] flex items-center gap-1">💰 AUCTION</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-slate-800 border border-white/10 text-slate-300 font-extrabold text-[10px] flex items-center gap-1">⚔️ CASUAL</span>;
    }
  };

  const getResultBadge = (result: string) => {
    if (result === 'VICTORY') {
      return (
        <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-black text-xs uppercase tracking-wider shadow-glow-green flex items-center gap-1">
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
          VICTORY
        </span>
      );
    }
    if (result === 'DEFEAT') {
      return (
        <span className="px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-400 font-black text-xs uppercase tracking-wider flex items-center gap-1">
          <ArrowDownRight className="w-3.5 h-3.5 stroke-[3]" />
          DEFEAT
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-600 text-slate-300 font-black text-xs uppercase">
        DRAW
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-white/20 rounded-2xl shadow-2xl p-4 sm:p-6 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-white/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-4 border-b border-white/10 shrink-0">
          <span className="text-[10px] font-black uppercase tracking-widest text-marvel-red block">
            MULTIVERSE COMBAT LOG
          </span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-1">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-wide flex items-center gap-2">
              <Swords className="w-7 h-7 text-red-500" />
              <span>CAREER MATCH HISTORY</span>
              <span className="text-xs bg-slate-800 text-slate-400 font-bold px-2.5 py-0.5 rounded-full border border-white/10">
                {matches.length} RECORDED
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Comprehensive battle ledger of your competitive matches, participants, power clashes, MVP champions, and earned rewards.
          </p>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
            {(['ALL', 'RANKED', 'CASUAL', 'DUNGEON', 'AUCTION'] as ModeFilter[]).map(mode => (
              <button
                key={mode}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedFilter(mode);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                  selectedFilter === mode
                    ? 'bg-amber-500 text-black shadow-glow-amber'
                    : 'bg-black/50 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {mode === 'ALL' ? `All Matches (${matches.length})` : mode}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-3">
          {filteredMatches.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl bg-black/20 space-y-3">
              <Swords className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-heading font-bold text-white uppercase">
                No Matches Found
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No battles found matching this filter. Jump into Ascension Ranked Arena, Casual 3v3, or Ancient Dungeon to log your first match!
              </p>
            </div>
          ) : (
            filteredMatches.map(match => {
              const isExpanded = expandedMatchId === match.id;
              const dateStr = new Date(match.timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={match.id}
                  className={`rounded-xl border transition-all overflow-hidden ${
                    match.result === 'VICTORY'
                      ? 'bg-gradient-to-r from-emerald-950/20 via-black/40 to-black/60 border-emerald-500/30'
                      : 'bg-gradient-to-r from-rose-950/20 via-black/40 to-black/60 border-rose-500/30'
                  }`}
                >
                  {/* Summary Row */}
                  <div
                    onClick={() => {
                      soundManager.playClick();
                      setExpandedMatchId(isExpanded ? null : match.id);
                    }}
                    className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-white/[0.02]"
                  >
                    {/* Left: Mode, Result, Date */}
                    <div className="flex items-center gap-3">
                      {getResultBadge(match.result)}
                      <div>
                        <div className="flex items-center gap-2">
                          {getModeBadge(match.matchMode)}
                          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            {dateStr}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-bold mt-1">
                          {match.battleSummary || `${match.result === 'VICTORY' ? 'Victory' : 'Defeat'} in ${match.matchMode}`}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Power Clash */}
                    <div className="flex items-center gap-4 text-xs font-bold self-start sm:self-center">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-normal">YOU</span>
                        <span className="text-amber-400 font-black flex items-center justify-end gap-1">
                          <Zap className="w-3 h-3" />
                          {(match.playerTotalPower || 0).toLocaleString()} PWR
                        </span>
                      </div>
                      <span className="text-slate-500 text-xs font-black">VS</span>
                      <div className="text-left">
                        <span className="text-[10px] text-slate-400 block font-normal truncate max-w-[100px]">
                          {match.opponentName || 'OPPONENT'}
                        </span>
                        <span className="text-slate-300 font-black flex items-center gap-1">
                          <Zap className="w-3 h-3 text-slate-500" />
                          {(match.opponentTotalPower || 0).toLocaleString()} PWR
                        </span>
                      </div>
                    </div>

                    {/* Right: MVP & Rewards & Toggle */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                      <div className="text-left sm:text-right text-xs">
                        <span className="text-[10px] text-amber-400/90 font-bold flex items-center gap-1">
                          <Award className="w-3 h-3" /> MVP: {match.mvpCharacterName || 'Leader'}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] font-extrabold mt-0.5">
                          {match.rewards?.xp ? <span className="text-purple-400">+{match.rewards.xp} XP</span> : null}
                          {match.rewards?.astra ? <span className="text-amber-400">+{match.rewards.astra} Astra</span> : null}
                          {match.rewards?.rankDelta !== undefined && match.rewards.rankDelta !== 0 && (
                            <span className={match.rewards.rankDelta > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                              {match.rewards.rankDelta > 0 ? `+${match.rewards.rankDelta}` : match.rewards.rankDelta} MMR
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-slate-400 hover:text-white">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="p-4 bg-black/60 border-t border-white/10 space-y-4 animate-fade-in">
                      {/* Both Teams Lineup */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Player Team */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">
                            YOUR SQUAD ({(match.playerTeam || []).length} HEROES)
                          </span>
                          <div className="space-y-1.5">
                            {(match.playerTeam || []).map((char, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-white/5 text-xs"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/20 overflow-hidden shrink-0 flex items-center justify-center font-bold text-[10px]">
                                    {char.name?.charAt(0) || 'H'}
                                  </div>
                                  <span className="font-bold text-white truncate">{char.name}</span>
                                </div>
                                <span className="text-amber-400 font-extrabold flex items-center gap-1 shrink-0">
                                  <Zap className="w-3 h-3" />
                                  {char.power || 80} PWR
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Opponent Team */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 block">
                            OPPONENT: {match.opponentName || 'CHALLENGER'}
                          </span>
                          {match.opponentTeam && match.opponentTeam.length > 0 ? (
                            <div className="space-y-1.5">
                              {match.opponentTeam.map((char, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-white/5 text-xs"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/20 overflow-hidden shrink-0 flex items-center justify-center font-bold text-[10px]">
                                      {char.name?.charAt(0) || 'E'}
                                    </div>
                                    <span className="font-bold text-white truncate">{char.name}</span>
                                  </div>
                                  <span className="text-slate-300 font-extrabold flex items-center gap-1 shrink-0">
                                    <Zap className="w-3 h-3 text-slate-500" />
                                    {char.power || 80} PWR
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-3 text-center text-xs text-slate-500 border border-white/5 rounded-lg bg-black/30">
                              Opponent lineup not archived for this simulation.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Combat Statistics Breakdown */}
                      <div className="p-3 bg-black/40 rounded-xl border border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block">OUTCOME</span>
                          <span className={match.result === 'VICTORY' ? 'text-emerald-400 font-black' : 'text-rose-400 font-black'}>
                            {match.result}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block">MVP FIGHTER</span>
                          <span className="text-amber-400 font-black truncate block">
                            {match.mvpCharacterName || 'Commander'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block">TOTAL DAMAGE</span>
                          <span className="text-rose-400 font-black">
                            {(match.damageDealt || 0).toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block">XP / ASTRA</span>
                          <span className="text-purple-400 font-black">
                            +{match.rewards?.xp || 0} / +{match.rewards?.astra || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>Showing latest {filteredMatches.length} matches</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-white/10 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
