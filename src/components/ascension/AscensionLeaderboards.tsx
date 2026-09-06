import React, { useState, useEffect } from 'react';
import { useAuth, UserProfile } from '../../context/AuthContext';
import { getRankLabel } from '../../data/ascensionProgression';
import { soundManager } from '../../audio/soundManager';
import { getApiUrl } from '../../config/api';
import { 
  Trophy, Award, Crown, Zap, Flame, Shield, 
  Users, Clock, Sparkles, Filter, Check, Star, Loader2
} from 'lucide-react';

export type LeaderboardCategory = 'RANK' | 'WINS' | 'LEVEL_XP' | 'MVP' | 'DUNGEON_PEAK' | 'PLAY_TIME' | 'AUCTION_WINS';

export function AscensionLeaderboards() {
  const { user, token } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<LeaderboardCategory>('RANK');
  const [selectedScope, setSelectedScope] = useState<'global' | 'friends'>('global');
  const [leaderboardData, setLeaderboardData] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === 'visible') {
        fetchLeaderboard(selectedCategory, selectedScope);
      }
    };
    refresh();
    const refreshTimer = window.setInterval(() => {
      refresh();
    }, 5000);
    window.addEventListener('focus', refresh);
    return () => {
      window.clearInterval(refreshTimer);
      window.removeEventListener('focus', refresh);
    };
  }, [selectedCategory, selectedScope]);

  const fetchLeaderboard = async (category: LeaderboardCategory, scope: 'global' | 'friends') => {
    setIsLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(getApiUrl(`/api/ascension/leaderboards?category=${category}&scope=${scope}`), { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.leaderboard)) {
          setLeaderboardData(data.leaderboard);
        }
      }
    } catch (err) {
      console.error('Failed to fetch Ascension leaderboards:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankDisplay = (p: UserProfile) => {
    if (!p.isPlacementsCompleted || p.rankedTier === 'UNRANKED') {
      return 'UNRANKED';
    }
    if (p.rankedTier === 'ASCENDER') {
      return '⚡ ASCENDER';
    }
    return getRankLabel(p.rankedTier || 'UNRANKED', p.rankedDivision || 0);
  };

  const getMetricDisplay = (player: UserProfile) => {
    if (selectedCategory === 'RANK') return `${(player.rankedRating ?? 0).toLocaleString()} Rating • ${getRankDisplay(player)}`;
    if (selectedCategory === 'WINS') return `${player.wins ?? 0} Wins (${player.winRate || 0}% WR)`;
    if (selectedCategory === 'LEVEL_XP') return `Level ${player.level ?? 1} (${(player.xp ?? 0).toLocaleString()} XP)`;
    if (selectedCategory === 'MVP') return `${player.mvpAwards ?? 0} MVP Awards`;
    if (selectedCategory === 'DUNGEON_PEAK') return `Wave ${player.dungeonPeak || player.dungeonMaxWave || 0}`;
    if (selectedCategory === 'PLAY_TIME') return player.playtimeFormatted || '0m';
    if (selectedCategory === 'AUCTION_WINS') return `${player.auctionWins ?? 0} Auction Victories`;
    return `${player.wins ?? 0} Wins`;
  };

  const top3 = leaderboardData.slice(0, 3);
  const restList = leaderboardData.slice(3);

  return (
    <div className="space-y-6 animate-fadeIn select-none">
      
      {/* Header Banner */}
      <div className="p-5 sm:p-7 rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
        <div className="space-y-1 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>{selectedScope === 'global' ? 'GLOBAL MULTIVERSE HALL OF FAME' : 'FRIENDS CIRCLE RANKINGS'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-wider">
            Ascension Top 50 Leaderboards
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Live rankings of the top commanders in the Marvel Ascension multiverse across competitive Ranked MMR, career victories, level XP, MVP dominance, and auction triumphs.
          </p>

          {/* Scope Toggle: Global vs Friends */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedScope('global');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedScope === 'global'
                  ? 'bg-amber-400 text-black font-black shadow-lg shadow-amber-400/20'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              🌍 Global Multiverse
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedScope('friends');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedScope === 'friends'
                  ? 'bg-amber-400 text-black font-black shadow-lg shadow-amber-400/20'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Friends ({user?.friends?.length || 0})</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-xl bg-[#07080B] border border-white/[0.06] shrink-0 relative z-10">
          {(['RANK', 'WINS', 'LEVEL_XP', 'MVP', 'DUNGEON_PEAK', 'PLAY_TIME', 'AUCTION_WINS'] as LeaderboardCategory[]).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-black font-black shadow-lg shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat === 'RANK' ? '🏆 RANK' : cat === 'AUCTION_WINS' ? '💰 AUCTION' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-amber-400">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="font-heading font-black text-sm uppercase tracking-wider text-slate-300">Retrieving Multiverse Rankings...</p>
        </div>
      ) : leaderboardData.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-3">
          <Trophy className="w-12 h-12 mx-auto text-amber-400 opacity-40 animate-pulse" />
          <h3 className="font-heading font-black text-lg text-white uppercase">No Ranked Commanders Found Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Be the first legend to climb the multiverse ladder! Play ranked Ascension matches or level up to claim your crown in the Top 50 Hall of Fame.
          </p>
        </div>
      ) : (
        <>
          {/* TOP 3 PODIUM */}
          {top3.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              {/* 🥈 #2 Silver */}
              {top3[1] && (
                <div className="order-2 md:order-1 p-5 rounded-2xl bg-[#0E1017] border border-slate-400/40 text-center space-y-3 shadow-lg transform hover:scale-102 transition-transform">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-300 text-black font-heading font-black text-lg flex items-center justify-center shadow-md">
                    🥈 #2
                  </div>
                  <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden border border-slate-300 bg-black flex items-center justify-center text-3xl shadow-md">
                    {top3[1].customAvatarUrl ? (
                      <img src={top3[1].customAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{top3[1].avatar || '🦸‍♂️'}</span>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-heading font-black text-base text-white uppercase truncate">
                      {top3[1].displayName || top3[1].username}
                    </h3>
                    <span className="text-xs text-amber-300 font-mono font-bold block">
                      {getRankDisplay(top3[1])}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono block">
                      {getMetricDisplay(top3[1])}
                    </span>
                  </div>
                </div>
              )}

              {/* 🥇 #1 Champion */}
              {top3[0] && (
                <div className="order-1 md:order-2 p-6 rounded-2xl bg-[#12141C] border border-amber-400 text-center space-y-3 shadow-lg shadow-amber-400/10 transform md:-translate-y-3 scale-105 transition-transform relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-heading font-black uppercase tracking-widest shadow-md flex items-center gap-1">
                    <Crown className="w-3 h-3" /> #1 GLOBAL TITAN
                  </div>
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-400 text-black font-heading font-black text-xl flex items-center justify-center shadow-lg shadow-amber-400/30">
                    🥇
                  </div>
                  <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border border-amber-400 bg-black flex items-center justify-center text-4xl shadow-md">
                    {top3[0].customAvatarUrl ? (
                      <img src={top3[0].customAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{top3[0].avatar || '🦸‍♂️'}</span>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-heading font-black text-lg text-white uppercase truncate">
                      {top3[0].displayName || top3[0].username}
                    </h3>
                    <span className="text-sm text-amber-300 font-mono font-black block">
                      {getRankDisplay(top3[0])}
                    </span>
                    <span className="text-xs text-amber-200/80 font-mono block">
                      {getMetricDisplay(top3[0])}
                    </span>
                  </div>
                </div>
              )}

              {/* 🥉 #3 Bronze */}
              {top3[2] && (
                <div className="order-3 p-5 rounded-2xl bg-[#0E1017] border border-amber-700/40 text-center space-y-3 shadow-lg transform hover:scale-102 transition-transform">
                  <div className="w-10 h-10 mx-auto rounded-full bg-amber-700 text-white font-heading font-black text-lg flex items-center justify-center shadow-md">
                    🥉 #3
                  </div>
                  <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden border border-amber-700 bg-black flex items-center justify-center text-3xl shadow-md">
                    {top3[2].customAvatarUrl ? (
                      <img src={top3[2].customAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{top3[2].avatar || '🦸‍♂️'}</span>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-heading font-black text-base text-white uppercase truncate">
                      {top3[2].displayName || top3[2].username}
                    </h3>
                    <span className="text-xs text-amber-300 font-mono font-bold block">
                      {getRankDisplay(top3[2])}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono block">
                      {getMetricDisplay(top3[2])}
                    </span>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TOP 4 - 50 TABLE LIST */}
          {restList.length > 0 && (
            <div className="p-4 sm:p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-xl space-y-2">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs font-mono font-bold text-slate-400 uppercase">
                <span className="w-12 text-center">Rank</span>
                <span className="flex-1 text-left px-4">Commander</span>
                <span className="w-32 text-center hidden sm:block">Rank Tier</span>
                <span className="w-36 text-right">Performance</span>
              </div>

              {restList.map((player, idx) => {
                const rankPos = idx + 4;
                const isCurrentPlayer = user && user.id === player.id;

                return (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
                      isCurrentPlayer
                        ? 'bg-[#12141C] border-amber-400 shadow-lg shadow-amber-400/10'
                        : 'bg-[#07080B] border-white/[0.04] hover:border-white/[0.12]'
                    }`}
                  >
                    {/* Rank Position */}
                    <div className="w-12 text-center font-heading font-black text-sm text-slate-400 font-mono">
                      #{rankPos}
                    </div>

                    {/* Commander Name & Avatar */}
                    <div className="flex-1 flex items-center gap-3 px-4">
                      <div className="w-9 h-9 rounded-lg bg-slate-800 border border-white/10 overflow-hidden flex items-center justify-center text-base">
                        {player.customAvatarUrl ? (
                          <img src={player.customAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span>{player.avatar || '🦸‍♂️'}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-heading font-black text-xs sm:text-sm text-white uppercase">
                          {player.displayName || player.username}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          LVL {player.level || 1} • {player.wins || 0} Wins
                        </span>
                      </div>
                    </div>

                    {/* Rank Tier Badge */}
                    <div className="w-32 text-center hidden sm:block">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300 text-[10px] font-mono font-bold">
                        {getRankDisplay(player)}
                      </span>
                    </div>

                    {/* Performance Metric Value */}
                    <div className="w-36 text-right font-mono font-bold text-xs text-amber-400">
                      {getMetricDisplay(player)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

    </div>
  );
}
