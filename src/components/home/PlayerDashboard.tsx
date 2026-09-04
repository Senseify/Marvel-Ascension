import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { soundManager } from '../../audio/soundManager';
import { MatchHistoryModal } from '../history/MatchHistoryModal';
import { Announcement, GameEvent } from '../../types/game';
import { 
  Sparkles, Trophy, Swords, Shield, Zap, Flame, Clock, 
  Gift, CheckCircle2, ArrowRight, Coins, Layers, Award, 
  Crown, Play, ChevronRight, Calendar, Skull, Star, Globe,
  Megaphone, Radio
} from 'lucide-react';

interface Props {
  onPlayAscension?: () => void;
  onPlayDungeon?: () => void;
  onPlayRanked?: () => void;
  onOpenCollection?: () => void;
  onPlayAuction?: () => void;
  onOpenCodex?: () => void;
  onOpenDailyMissions?: () => void;
  onOpenProfile?: () => void;
  onSwitchToArcade?: () => void;
  onPlayCampaign?: () => void;
}

export function PlayerDashboard({
  onPlayAscension,
  onPlayDungeon,
  onPlayRanked,
  onOpenCollection,
  onPlayAuction,
  onOpenCodex,
  onOpenDailyMissions,
  onOpenProfile,
  onSwitchToArcade,
  onPlayCampaign,
}: Props) {
  const { user, claimDailyLogin, claimDailyMission, fetchPublicAnnouncements, fetchPublicEvents } = useAuth();
  const [showMatchHistory, setShowMatchHistory] = useState(false);
  const [publicAnnouncements, setPublicAnnouncements] = useState<Announcement[]>([]);
  const [publicEvents, setPublicEvents] = useState<GameEvent[]>([]);

  useEffect(() => {
    fetchPublicAnnouncements().then(res => {
      if (res.success && res.announcements) setPublicAnnouncements(res.announcements);
    });
    fetchPublicEvents().then(res => {
      if (res.success && res.events) setPublicEvents(res.events);
    });
  }, []);

  if (!user) return null;

  const currentLevel = user.level || 1;
  const currentXp = user.currentLevelXp ?? 0;
  const nextXp = user.xpForNextLevel ?? 1000;
  const progressPercent = user.progressPercent ?? Math.min(100, Math.round((currentXp / Math.max(1, nextXp)) * 100));
  const astraBalance = (user.astra ?? user.ascensionCoins ?? 0).toLocaleString();
  const dungeonPeak = user.dungeonPeak || user.dungeonMaxWave || 0;
  const bpLevel = user.battlePassLevel || 1;
  const rankLabel = user.rankedTier === 'ASCENDER' 
    ? '⚡ ASCENDER' 
    : user.rankedTier && user.rankedTier !== 'UNRANKED' 
    ? `${user.rankedTier} ${user.rankedDivision || ''}` 
    : 'UNRANKED';

  // Recent 4 characters
  const recentCharacterIds = (user.ownedCharacters || []).slice(-4).reverse();
  const recentCharacters = recentCharacterIds
    .map(id => ALL_CHARACTERS.find(c => c.id === id))
    .filter(Boolean);

  // Active Daily Missions (Top 3)
  const activeMissions = (user.dailyMissions || []).slice(0, 3);

  // Handle claiming daily login
  const handleClaimLogin = async () => {
    soundManager.playVictory();
    await claimDailyLogin();
  };

  // Handle claiming daily mission
  const handleClaimMission = async (missionId: string) => {
    soundManager.playVictory();
    await claimDailyMission(missionId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 text-slate-100 animate-fadeIn">
      
      {/* 0. LIVE ANNOUNCEMENTS & ACTIVE EVENTS BANNER */}
      {(publicEvents.length > 0 || publicAnnouncements.length > 0) && (
        <div className="space-y-2.5">
          {publicEvents.map(ev => (
            <div key={ev.id} className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/80 via-purple-950/80 to-cyan-950/80 border border-amber-500/40 p-3.5 sm:p-4 shadow-[0_0_25px_rgba(245,158,11,0.25)] flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Zap className="w-5 h-5 text-amber-400 animate-bounce" />
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500 text-black">
                      {ev.multiplier}X {ev.bannerType}
                    </span>
                    <h3 className="font-bold text-sm text-white">{ev.title}</h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{ev.description}</p>
                </div>
              </div>
              <span className="hidden sm:inline-flex text-[10px] font-mono font-bold text-amber-300 px-2 py-1 rounded-lg bg-black/40 border border-amber-500/20">
                ACTIVE MULTIVERSE BUFF
              </span>
            </div>
          ))}

          {publicAnnouncements.slice(0, 1).map(ann => (
            <div key={ann.id} className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-slate-950/80 border border-cyan-500/30 p-3 sm:p-3.5 flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <Megaphone className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
                <div className="text-xs text-slate-200">
                  <span className="font-bold text-cyan-300 mr-2">[{ann.category}] {ann.title}:</span>
                  <span>{ann.content}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 1. TOP COMMANDER PROGRESSION BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#170C28] via-[#0E1736] to-[#0A1A2E] border-2 border-cyan-500/50 p-5 sm:p-7 shadow-[0_0_45px_rgba(6,182,212,0.3)]">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left: Avatar & Identity */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div 
              onClick={onOpenProfile}
              className="relative cursor-pointer group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-red-600 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0B0F19] rounded-[14px] flex items-center justify-center overflow-hidden">
                  {user.customAvatarUrl ? (
                    <img src={user.customAvatarUrl} alt={user.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl sm:text-4xl">{user.avatar || '🦸‍♂️'}</span>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] font-mono shadow-md border border-amber-200">
                LVL {currentLevel}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-white uppercase tracking-wider">
                  {user.displayName || user.username}
                </h1>
                {user.profileShowcase?.title && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-bold text-[10px] font-mono uppercase">
                    {user.profileShowcase.title}
                  </span>
                )}
                {user.profileShowcase?.badges?.map((badge, idx) => (
                  <span key={idx} className="text-sm">{badge}</span>
                ))}
              </div>

              {/* Badges Bar */}
              <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                <span className="text-cyan-400 font-bold">✨ {astraBalance} ASTRA</span>
                <span className="text-slate-600">•</span>
                <span className="text-purple-300 font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  <span>BP LVL {bpLevel}</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>{rankLabel}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Switch to Arcade View Button */}
          <div className="flex items-center gap-2 self-end lg:self-center">
            {onSwitchToArcade && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onSwitchToArcade();
                }}
                className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Multiverse Arcade</span>
              </button>
            )}
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>COMMANDER XP PROGRESSION</span>
            </span>
            <span className="text-cyan-300 font-black">
              {currentXp.toLocaleString()} / {nextXp.toLocaleString()} XP ({progressPercent}%)
            </span>
          </div>
          <div className="relative w-full h-3 bg-slate-900/90 rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-400 rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
              style={{ width: `${Math.max(4, Math.min(100, progressPercent))}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Current Level: {currentLevel}</span>
            <span>Next Level: {currentLevel + 1}</span>
          </div>
        </div>
      </div>

      {/* 2. PROMINENT QUICK ACTIONS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        
        {/* Action 1: Flagship Ascension Mode */}
        <button
          onClick={() => {
            soundManager.playClick();
            onPlayAscension?.();
          }}
          className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1C0F32] to-[#0A1128] border-2 border-cyan-500/60 hover:border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all text-left flex flex-col justify-between overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="space-y-1">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mb-2 group-hover:rotate-6 transition-transform">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">FLAGSHIP RPG & PVP</span>
            <h3 className="text-base sm:text-lg font-heading font-black text-white uppercase tracking-wider">MARVEL ASCENSION</h3>
            <p className="text-xs text-slate-400 line-clamp-2">Enter custom lobbies, ranked ladder, or assemble your 3v3 dream team.</p>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
            <span>Play Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Action 2: Ancient Ruins Dungeon */}
        <button
          onClick={() => {
            soundManager.playClick();
            onPlayDungeon?.();
          }}
          className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1D1405] to-[#120D1E] border-2 border-amber-500/60 hover:border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] transition-all text-left flex flex-col justify-between overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="space-y-1">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mb-2 group-hover:rotate-6 transition-transform">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">WAVE RUN</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">Peak: {dungeonPeak}</span>
            </div>
            <h3 className="text-base sm:text-lg font-heading font-black text-white uppercase tracking-wider">ANCIENT DUNGEON</h3>
            <p className="text-xs text-slate-400 line-clamp-2">Test your endurance across endless waves of cosmic guardians.</p>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
            <span>Enter Dungeon</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Action 3: Ranked Arena */}
        <button
          onClick={() => {
            soundManager.playClick();
            onPlayRanked?.();
          }}
          className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#25081E] to-[#110E26] border-2 border-purple-500/60 hover:border-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all text-left flex flex-col justify-between overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="space-y-1">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center mb-2 group-hover:rotate-6 transition-transform">
              <Swords className="w-5 h-5 text-purple-300" />
            </div>
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">COMPETITIVE QUEUE</span>
            <h3 className="text-base sm:text-lg font-heading font-black text-white uppercase tracking-wider">RANKED LADDER</h3>
            <p className="text-xs text-slate-400 line-clamp-2">Climb from Bronze to Ascender against real multiverse challengers.</p>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-purple-300 group-hover:translate-x-1 transition-transform">
            <span>Matchmake</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Action 4: Hero Codex & Collection */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenCodex?.();
          }}
          className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0F1E28] to-[#0A121E] border-2 border-emerald-500/60 hover:border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] transition-all text-left flex flex-col justify-between overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="space-y-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-2 group-hover:rotate-6 transition-transform">
              <Layers className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">ROSTER CODEX</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">{user.ownedCharacters?.length || 0} Owned</span>
            </div>
            <h3 className="text-base sm:text-lg font-heading font-black text-white uppercase tracking-wider">CHARACTER CODEX</h3>
            <p className="text-xs text-slate-400 line-clamp-2">Explore {ALL_CHARACTERS.length} Marvel heroes, abilities, and custom builds.</p>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-300 group-hover:translate-x-1 transition-transform">
            <span>Browse Codex</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Action 5: PvE World Campaign */}
        <button
          onClick={() => {
            soundManager.playClick();
            onPlayCampaign?.();
          }}
          className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1F102A] to-[#0D182A] border-2 border-cyan-400/60 hover:border-cyan-200 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] transition-all text-left flex flex-col justify-between overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="space-y-1">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mb-2 group-hover:rotate-6 transition-transform">
              <Globe className="w-5 h-5 text-cyan-300" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">PvE EXPEDITIONS</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">Ch. {user.campaignProgress?.unlockedChapter || 1}/5</span>
            </div>
            <h3 className="text-base sm:text-lg font-heading font-black text-white uppercase tracking-wider">WORLD CAMPAIGN</h3>
            <p className="text-xs text-slate-400 line-clamp-2">Earth • Wakanda • Asgard • Quantum • Cosmic Bosses.</p>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
            <span>Embark</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* 3. MIDDLE SECTION: DAILY CONTENT & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Left (7 cols): Daily Content & Missions */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Daily Login Streak Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-heading font-black text-white uppercase tracking-wide">
                  7-DAY LOGIN REWARD STREAK
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">
                Streak: Day {user.dailyLoginStreak || 0}/7
              </span>
            </div>

            {/* 7 Days Visual Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map(day => {
                const isClaimed = (user.dailyLoginStreak || 0) >= day && !user.canClaimDailyLogin;
                const isCurrent = (user.dailyLoginStreak || 0) + (user.canClaimDailyLogin ? 1 : 0) === day;
                return (
                  <div
                    key={day}
                    className={`p-2 rounded-xl text-center border transition-all flex flex-col items-center justify-between min-h-[64px] ${
                      isClaimed
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                        : isCurrent && user.canClaimDailyLogin
                        ? 'bg-amber-950/60 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse'
                        : 'bg-black/40 border-white/5 text-slate-500'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold">D{day}</span>
                    {isClaimed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Gift className={`w-4 h-4 ${isCurrent && user.canClaimDailyLogin ? 'text-amber-400' : 'text-slate-600'}`} />
                    )}
                    <span className="text-[9px] font-mono">
                      {day === 7 ? '10K' : `${day * 500}`}
                    </span>
                  </div>
                );
              })}
            </div>

            {user.canClaimDailyLogin && (
              <button
                onClick={handleClaimLogin}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4" />
                <span>Claim Day {(user.dailyLoginStreak || 0) + 1} Reward</span>
              </button>
            )}
          </div>

          {/* Daily Missions Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <h2 className="text-sm font-heading font-black text-white uppercase tracking-wide">
                  ACTIVE DAILY MISSIONS
                </h2>
              </div>
              {onOpenDailyMissions && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenDailyMissions();
                  }}
                  className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {activeMissions.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">No active missions at this time.</p>
            ) : (
              <div className="space-y-2.5">
                {activeMissions.map((m) => {
                  const percent = Math.min(100, Math.round(((m.progress || 0) / Math.max(1, m.target || 1)) * 100));
                  return (
                    <div 
                      key={m.missionId}
                      className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white truncate">{m.title}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                            +{m.rewardAmount} {m.rewardType.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{m.description}</p>
                        {/* Progress Bar */}
                        <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cyan-400 rounded-full transition-all"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Claim or Progress */}
                      {m.isCompleted && !m.isClaimed ? (
                        <button
                          onClick={() => handleClaimMission(m.missionId)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
                        >
                          Claim
                        </button>
                      ) : (
                        <span className="text-xs font-mono text-slate-400 shrink-0">
                          {m.progress || 0}/{m.target}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right (5 cols): Recent Activity & Roster Showcase */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Recently Obtained Heroes */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-heading font-black text-white uppercase tracking-wide">
                  RECENT HERO RECRUITS
                </h2>
              </div>
              {onOpenCollection && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenCollection();
                  }}
                  className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Vault</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {recentCharacters.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4">No characters unlocked yet. Visit the Ascension Shop to recruit your first hero!</p>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {recentCharacters.map((char: any) => (
                  <div
                    key={char.id}
                    className="p-2.5 rounded-xl bg-black/50 border border-white/10 flex items-center gap-2.5 group hover:border-cyan-500/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-slate-950 shrink-0">
                      <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-white truncate block">{char.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400 block">{char.grade} Tier</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Career Quick Stats & Recent Match */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-heading font-black text-white uppercase tracking-wide">
                  COMBAT RECORD
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setShowMatchHistory(true);
                  }}
                  className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 cursor-pointer flex items-center gap-1"
                >
                  <span>Match History</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenProfile?.();
                  }}
                  className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer"
                >
                  Full Stats →
                </button>
              </div>
            </div>

            {/* Quick Stat Counter Boxes */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Wins</span>
                <span className="text-base font-heading font-black text-amber-300">{user.wins || 0}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Win Rate</span>
                <span className="text-base font-heading font-black text-emerald-400">{user.winRate || 0}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">MVPs</span>
                <span className="text-base font-heading font-black text-purple-300">{user.mvpAwards || 0}</span>
              </div>
            </div>

            {/* Recent Match Preview */}
            <div className="pt-2 border-t border-white/5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                LATEST MATCH RESULT
              </span>
              {user.matchHistory && user.matchHistory.length > 0 ? (
                (() => {
                  const lastMatch = user.matchHistory[0];
                  return (
                    <div
                      onClick={() => {
                        soundManager.playClick();
                        setShowMatchHistory(true);
                      }}
                      className="p-2.5 rounded-xl bg-black/50 border border-white/10 hover:border-amber-500/40 cursor-pointer transition-all flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                          lastMatch.result === 'VICTORY'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                            : 'bg-rose-950 text-rose-400 border border-rose-500/40'
                        }`}>
                          {lastMatch.result}
                        </span>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white block truncate">
                            {lastMatch.matchMode} • {lastMatch.battleSummary || 'Combat Clash'}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            MVP: {lastMatch.mvpCharacterName}
                          </span>
                        </div>
                      </div>

                      <div className="text-right text-[11px] font-bold text-amber-400 shrink-0">
                        <span>+{lastMatch.rewards?.xp || 0} XP</span>
                        <span className="block text-[10px] text-slate-400">+{lastMatch.rewards?.astra || 0} Astra</span>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 text-center text-xs text-slate-500 italic">
                  No completed matches yet. Play Ranked Arena to record your first victory!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Match History Modal */}
      {showMatchHistory && (
        <MatchHistoryModal onClose={() => setShowMatchHistory(false)} />
      )}
    </div>
  );
}
