import React, { useState } from 'react';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { Character } from '../../types/game';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../audio/soundManager';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { AscensionGiftingModal } from './AscensionGiftingModal';
import { 
  Sparkles, Swords, Trophy, Gift, Check, Calendar, 
  Flame, Crown, ArrowRight, Shield, Zap, Package, Award
} from 'lucide-react';

interface Props {
  onNavigateTab: (tab: any) => void;
}

export function AscensionHome({ onNavigateTab }: Props) {
  const { user, claimDailyLogin } = useAuth();
  const [isClaimingLogin, setIsClaimingLogin] = useState(false);
  const [loginClaimToast, setLoginClaimToast] = useState<{ success: boolean; text: string } | null>(null);
  const [isGiftingOpen, setIsGiftingOpen] = useState(false);

  // Daily coin rewards (Astra remains the server-side legacy currency alias).
  const dailyRewards = [
    { day: 1, astra: 250, label: 'Day 1' },
    { day: 2, astra: 350, label: 'Day 2' },
    { day: 3, astra: 500, label: 'Day 3' },
    { day: 4, astra: 750, label: 'Day 4' },
    { day: 5, astra: 1000, label: 'Day 5' },
    { day: 6, astra: 1500, label: 'Day 6' },
    { day: 7, astra: 3000, label: '🌟 Grand Jackpot' }
  ];

  const currentStreak = user?.dailyLoginStreak || 0;
  const canClaimToday = user?.canClaimDailyLogin ?? true;

  // Spotlight character
  const spotlightHero = ALL_CHARACTERS.find(c => c.name === 'Iron Man' || c.grade === 'MYTHIC') || ALL_CHARACTERS[0];

  const handleClaimDaily = async () => {
    if (!user) {
      soundManager.playAttackHit();
      setLoginClaimToast({ success: false, text: 'Please sign in to claim your daily coins.' });
      return;
    }

    if (!canClaimToday) {
      soundManager.playAttackHit();
      setLoginClaimToast({ success: false, text: "Today's coin reward has already been claimed! Return tomorrow." });
      return;
    }

    setIsClaimingLogin(true);
    setLoginClaimToast(null);

    const res = await claimDailyLogin();
    setIsClaimingLogin(false);

    if (res.success) {
      soundManager.playVictoryFanfare();
      setLoginClaimToast({
        success: true,
        text: `🎉 Successfully claimed +🪙 ${(res.coinsAwarded || res.astraAwarded || 250).toLocaleString()} coins! (Streak: Day ${res.streak})`
      });
      setTimeout(() => setLoginClaimToast(null), 5000);
    } else {
      soundManager.playAttackHit();
      setLoginClaimToast({
        success: false,
        text: res.error || "Today's reward has already been claimed."
      });
      setTimeout(() => setLoginClaimToast(null), 4000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn select-none">
      
      {/* 1. HERO SPOTLIGHT & QUICK PLAY BANNER */}
      <div className="ascension-hero-panel relative w-full min-w-0 rounded-3xl p-4 sm:p-8 bg-[#0E1017] border border-white/[0.08] shadow-[0_14px_40px_-8px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Glow Ambient Orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="min-w-0 max-w-full space-y-3.5 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-200 text-[10px] font-mono font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(139,92,246,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
            <span>SEASON 1: COSMIC ASCENSION IS LIVE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-wider leading-tight">
            FORGE YOUR <span className="text-amber-400">MULTIVERSE LEGEND</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Recruit 350 Marvel Heroes, level them up from 1 to 50, conquer 1v1–5v5 Online Battles, unlock competitive Ranked at Level 10, and advance through the <strong>100-Level Battle Pass</strong> to become an <strong>⚡ ASCENDER</strong>!
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onNavigateTab('BATTLE');
              }}
              className="btn-primary-cinematic py-3 px-6 rounded-2xl text-xs flex items-center gap-2 cursor-pointer"
            >
              <Swords className="w-4 h-4" />
              <span>ONLINE BATTLE ARENA</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onNavigateTab('CUSTOM');
              }}
              className="btn-secondary-cinematic py-3 px-6 rounded-2xl text-xs flex items-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>CUSTOM ROOMS</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onNavigateTab('AUCTION');
              }}
              className="btn-secondary-cinematic py-3 px-6 rounded-2xl text-xs flex items-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>AUCTION ARENA</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onNavigateTab('DUNGEON');
              }}
              className="btn-gold-cinematic py-3 px-6 rounded-2xl text-xs flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4" />
              <span>DUNGEON SURVIVAL</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onNavigateTab('CHARACTERS');
              }}
              className="btn-secondary-cinematic py-3 px-6 rounded-2xl text-xs flex items-center gap-2 cursor-pointer"
            >
              <span>CHARACTER MARKET</span>
            </button>
          </div>
        </div>

        {/* Hero Spotlight Display Card */}
        <div className="relative w-full max-w-[240px] p-4 rounded-3xl bg-[#12141C] border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.8)] shrink-0 text-center space-y-2.5 z-10 group">
          <div className="w-36 aspect-[3/4] sm:w-44 mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-md bg-black/60">
            <CharacterPortrait character={spotlightHero} size="fill" aspect="card" className="w-full h-full border-none shadow-none rounded-none" />
          </div>
          <div className="font-heading font-black text-base text-white uppercase">
            {spotlightHero.name}
          </div>
          <div className="inline-block px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-black uppercase font-mono shadow-sm">
            ★ {spotlightHero.grade} TIER SPOTLIGHT
          </div>
        </div>
      </div>

      {/* 2. DAILY ASTRA LOGIN REWARDS (7-DAY STREAK) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-[#12141C] border border-white/[0.08] shadow-[0_14px_40px_-8px_rgba(0,0,0,0.75)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.07] pb-3">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h2 className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-wider">
              DAILY CLAIM — COIN SUPPLY DROP (7-DAY CYCLE)
            </h2>
          </div>
          <div className="text-xs font-mono font-bold text-slate-300">
            Current Streak: <span className="text-amber-300 font-black">Day {currentStreak} of 7</span>
          </div>
        </div>

        {/* 7 Day Streak Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {dailyRewards.map((r) => {
            const isCompleted = currentStreak > r.day || (currentStreak === r.day && !canClaimToday);
            const isToday = (canClaimToday && currentStreak + 1 === r.day) || (currentStreak === 0 && r.day === 1);

            return (
              <div
                key={r.day}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col justify-between ${
                  isToday
                    ? 'bg-gradient-to-b from-amber-950/60 to-[#141722] border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.25)] scale-105'
                    : isCompleted
                    ? 'bg-[#141722]/80 border-emerald-500/30 opacity-80'
                    : 'bg-[#141722]/40 border-white/[0.05] opacity-50'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  {r.label}
                </div>
                <div className="text-2xl my-1.5">{r.day === 7 ? '🌟' : '✨'}</div>
                <div className="text-xs font-heading font-black text-amber-300">
                  +{r.astra.toLocaleString()} COINS
                </div>

                <div className="mt-2 pt-1 border-t border-white/[0.05] text-[9px] font-mono font-bold">
                  {isCompleted ? (
                    <span className="text-emerald-400 flex items-center justify-center gap-1">
                      <Check className="w-3 h-3" /> CLAIMED
                    </span>
                  ) : isToday ? (
                    <span className="text-amber-300 font-black animate-pulse">
                      READY TODAY!
                    </span>
                  ) : (
                    <span className="text-slate-500">LOCKED</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Daily Claim Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {loginClaimToast ? (
            <div className={`p-3 rounded-xl text-xs font-bold w-full sm:w-auto ${
              loginClaimToast.success ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-200' : 'bg-rose-950/80 border border-rose-500 text-rose-200'
            }`}>
              {loginClaimToast.text}
            </div>
          ) : (
            <div className="text-xs text-slate-400">
              {canClaimToday
                ? 'Claim your daily coin reward now to increase your consecutive login streak!'
                : '✅ You have claimed today’s coin supply drop. Return tomorrow for the next tier!'}
            </div>
          )}

          <button
            type="button"
            disabled={!canClaimToday || isClaimingLogin}
            onClick={handleClaimDaily}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed btn-gold-cinematic"
          >
            {isClaimingLogin ? 'CLAIMING...' : canClaimToday ? '🪙 CLAIM TODAY (+COINS)' : '✓ CLAIMED TODAY'}
          </button>
        </div>
      </div>

      {/* 3. FOUR CORE ASCENSION HUBS NAVIGATION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Relic Vault */}
        <div
          onClick={() => {
            soundManager.playClick();
            onNavigateTab('RELICS');
          }}
          className="p-5 rounded-3xl bg-[#12141C] border border-white/[0.08] hover:border-cyan-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer transition-all hover:-translate-y-1 group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-sm">
            🛡️
          </div>
          <h3 className="font-heading font-black text-white text-base uppercase group-hover:text-cyan-300 transition-colors">
            50 Relic Vault
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Arm your heroes with 50 distinct tactical artifacts, reality-warping Infinity Gauntlets, and healing serums.
          </p>
          <span className="text-[11px] font-mono font-bold text-cyan-400 flex items-center gap-1 pt-1">
            OPEN RELIC VAULT →
          </span>
        </div>

        {/* Card 2: Skill Vault */}
        <div
          onClick={() => {
            soundManager.playClick();
            onNavigateTab('SKILLS');
          }}
          className="p-5 rounded-3xl bg-[#12141C] border border-white/[0.08] hover:border-yellow-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer transition-all hover:-translate-y-1 group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-yellow-950/80 border border-yellow-500/30 flex items-center justify-center text-2xl shadow-sm">
            ⚡
          </div>
          <h3 className="font-heading font-black text-white text-base uppercase group-hover:text-yellow-300 transition-colors">
            Signature Skills
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Master 5 unique character-specific combat abilities per hero. Skills unlock at character Levels 5, 10, 20, 30, 40!
          </p>
          <span className="text-[11px] font-mono font-bold text-yellow-400 flex items-center gap-1 pt-1">
            TRAIN SKILLS →
          </span>
        </div>

        {/* Card 3: 100 Level Battle Pass */}
        <div
          onClick={() => {
            soundManager.playClick();
            onNavigateTab('BATTLE_PASS');
          }}
          className="p-5 rounded-3xl bg-[#12141C] border border-white/[0.08] hover:border-purple-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer transition-all hover:-translate-y-1 group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-2xl shadow-sm">
            👑
          </div>
          <h3 className="font-heading font-black text-white text-base uppercase group-hover:text-purple-300 transition-colors">
            100-Level Battle Pass
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Progress through 100 tiers of coins, Random Shard Crates, and Character Card Crates.
          </p>
          <span className="text-[11px] font-mono font-bold text-purple-400 flex items-center gap-1 pt-1">
            VIEW BATTLE PASS →
          </span>
        </div>

        {/* Card 4: Top 50 Leaderboards */}
        <div
          onClick={() => {
            soundManager.playClick();
            onNavigateTab('LEADERBOARDS');
          }}
          className="p-5 rounded-3xl bg-[#12141C] border border-white/[0.08] hover:border-amber-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer transition-all hover:-translate-y-1 group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-2xl shadow-sm">
            🏆
          </div>
          <h3 className="font-heading font-black text-white text-base uppercase group-hover:text-amber-300 transition-colors">
            Top 50 Leaderboards
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Compete across Ranked MMR, Career Wins, Level XP, and MVP accolades for global supremacy.
          </p>
          <span className="text-[11px] font-mono font-bold text-amber-400 flex items-center gap-1 pt-1">
            VIEW RANKINGS →
          </span>
        </div>

      </div>

      {/* Multiverse Gifting Modal */}
      {isGiftingOpen && (
        <AscensionGiftingModal onClose={() => setIsGiftingOpen(false)} />
      )}

    </div>
  );
}
