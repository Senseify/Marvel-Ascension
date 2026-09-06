import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGameSettings } from '../../context/SettingsContext';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { CharacterImage } from '../common/CharacterImage';
import { MatchHistoryModal } from '../history/MatchHistoryModal';
import { NotificationCenterModal } from '../notifications/NotificationCenterModal';
import { PlaygroundModal } from './PlaygroundModal';
import { CircularProgressRing } from '../common/CinematicUI';
import { Announcement, GameEvent, GameMode } from '../../types/game';
import { formatPlaytime } from '../../utils/progression';
import { soundManager } from '../../audio/soundManager';
import marvelBannerImg from '../../assets/Marvel-Banner.jpg';
import {
  Gamepad2, Settings, Swords, Hammer, Layers, Trophy,
  Shield, ShoppingBag, Sparkles, ChevronRight, Play, MoreVertical,
  Target, Flame, Award, CheckCircle2, Zap, ArrowRight, Download, Radio,
  Users, Clock, BarChart3, Activity, Compass, Coins, Gift, Check, KeyRound, RotateCcw, FlaskConical, Dna
} from 'lucide-react';
import { getFeaturedSynergies } from '../../data/synergies/characterSynergies';

interface Props {
  onPlayAscension?: () => void;
  onPlayDungeon?: () => void;
  onPlayBossRaid?: () => void;
  onPlayRanked?: () => void;
  onOpenCollection?: () => void;
  onOpenArmory?: () => void;
  onPlayAuction?: (mode?: GameMode) => void;
  onPlayAuctionMultiplayer?: () => void;
  onOpenCodex?: () => void;
  onOpenDailyMissions?: () => void;
  onOpenBattlePass?: () => void;
  onOpenLeaderboards?: () => void;
  onOpenProfile?: () => void;
  onOpenSettings?: () => void;
  onOpenNotifications?: () => void;
  onOpenPlaygroundHub?: () => void;
  onSwitchToArcade?: () => void;
  onOpenShop?: () => void;
  onOpenCrates?: () => void;
  onOpenRedeem?: () => void;
  onOpenInventory?: () => void;
  onOpenSynergies?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export function PlayerDashboard({
  onPlayAscension,
  onPlayDungeon,
  onPlayBossRaid,
  onPlayRanked,
  onOpenCollection,
  onOpenArmory,
  onPlayAuction,
  onPlayAuctionMultiplayer,
  onOpenCodex,
  onOpenDailyMissions,
  onOpenBattlePass,
  onOpenLeaderboards,
  onOpenProfile,
  onOpenSettings,
  onOpenNotifications,
  onOpenPlaygroundHub,
  onSwitchToArcade,
  onOpenShop,
  onOpenCrates,
  onOpenRedeem,
  onOpenInventory,
  onOpenSynergies,
  onNavigateTab,
}: Props) {
  const { user, fetchPublicAnnouncements, fetchPublicEvents, claimDailyLogin } = useAuth();
  const { openSettings } = useGameSettings();

  const [showMatchHistory, setShowMatchHistory] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);
  const [publicAnnouncements, setPublicAnnouncements] = useState<Announcement[]>([]);
  const [publicEvents, setPublicEvents] = useState<GameEvent[]>([]);

  const [isClaimingDaily, setIsClaimingDaily] = useState(false);
  const [dailyClaimToast, setDailyClaimToast] = useState<string | null>(null);

  useEffect(() => {
    fetchPublicAnnouncements().then(res => {
      if (res.success && res.announcements) setPublicAnnouncements(res.announcements);
    });
    fetchPublicEvents().then(res => {
      if (res.success && res.events) setPublicEvents(res.events);
    });
  }, [fetchPublicAnnouncements, fetchPublicEvents]);

  const currentUser = user || {
    id: 'guest',
    username: 'Guest Commander',
    displayName: 'Guest Commander',
    avatar: '🦸‍♂️',
    customAvatarUrl: undefined,
    level: 1,
    xp: 0,
    currentLevelXp: 0,
    xpForNextLevel: 1000,
    progressPercent: 0,
    playtimeFormatted: '0h 00m',
    playtimeSeconds: 0,
    ownedCharacters: [],
    characterLevels: {},
    achievements: {},
    rankedRating: 0,
    rankedTier: 'UNRANKED',
    rankedDivision: 0,
    astra: 0,
    ascensionCoins: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    stats: { matchesPlayed: 0, wins: 0, losses: 0, totalAstraEarned: 0 },
    canClaimDailyLogin: false,
    dailyLoginStreak: 0,
    wheelSpins: 0,
    dailyMissions: [],
    weeklyMissions: [],
  };

  // Real player data computations
  const level = currentUser.level || 1;
  const xp = currentUser.currentLevelXp ?? (currentUser.xp ? currentUser.xp % 1000 : 0);
  const xpNext = currentUser.xpForNextLevel ?? 1000;
  const xpPercent = currentUser.progressPercent ?? Math.min(100, Math.max(0, (xp / Math.max(1, xpNext)) * 100));
  
  const rank = currentUser.rankedTier && currentUser.rankedTier !== 'UNRANKED'
    ? `${currentUser.rankedTier} ${currentUser.rankedDivision || ''}`
    : 'UNRANKED';

  // Real statistics — Zero fake numbers
  const realPlaytime = currentUser.playtimeFormatted || (currentUser.playtimeSeconds ? formatPlaytime(currentUser.playtimeSeconds) : '0h 00m');
  const realOwnedCharacters = currentUser.ownedCharacters?.length ?? 0;
  const realAchievementsCount = Object.values(currentUser.achievements || {}).filter((a: any) => a && (a.isClaimed || a.unlockedAt)).length;
  const realMmr = currentUser.rankedRating && currentUser.rankedRating > 0 ? currentUser.rankedRating.toLocaleString() : '—';
  
  const totalMatches = ((currentUser as any).matchesPlayed ?? (currentUser.wins + currentUser.losses)) || 0;
  const winRate = totalMatches > 0
    ? `${Math.round(((currentUser.wins || 0) / totalMatches) * 100)}%`
    : '—';

  const collection = (currentUser.ownedCharacters || [])
    .map(id => ALL_CHARACTERS.find(c => c.id === id))
    .filter(Boolean) as typeof ALL_CHARACTERS;
  const displayCollection = collection;

  const featuredSynergies = useMemo(() => getFeaturedSynergies(), []);

  // Unclaimed rewards indicator count for notifications
  const unclaimedItems = (currentUser.canClaimDailyLogin ? 1 : 0) +
    ((currentUser.wheelSpins || 0) > 0 ? 1 : 0) +
    (currentUser.dailyMissions || []).filter(m => m.isCompleted && !m.isClaimed).length;

  const navigate = (callback?: () => void) => {
    soundManager.playClick();
    if (callback) callback();
  };

  const handleOpenPlayground = () => {
    soundManager.playClick();
    if (onOpenPlaygroundHub) {
      onOpenPlaygroundHub();
    } else {
      setShowPlayground(true);
    }
  };

  const handleOpenNotifications = () => {
    soundManager.playClick();
    if (onOpenNotifications) {
      onOpenNotifications();
    } else {
      setShowNotifications(true);
    }
  };

  const handleOpenSettings = () => {
    soundManager.playClick();
    if (onOpenSettings) {
      onOpenSettings();
    } else {
      openSettings();
    }
  };

  const handleClaimDailyDrop = async () => {
    if (!currentUser.canClaimDailyLogin || isClaimingDaily) return;
    setIsClaimingDaily(true);
    const res = await claimDailyLogin();
    setIsClaimingDaily(false);
    if (res.success) {
      soundManager.playVictoryFanfare();
      setDailyClaimToast(`+${(res.coinsAwarded || 250).toLocaleString()} Coins Claimed! Streak: Day ${res.streak}`);
      setTimeout(() => setDailyClaimToast(null), 4000);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-53px)] lg:h-[calc(100vh-53px)] lg:max-h-[calc(100vh-53px)] w-full bg-[#07080B] text-slate-100 font-sans selection:bg-amber-500 selection:text-black flex flex-col lg:overflow-hidden select-none">
      {/* Layered cinematic lighting matching reference image */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_40%_-10%,rgba(139,92,246,0.12),transparent),radial-gradient(ellipse_50%_40%_at_90%_90%,rgba(245,158,11,0.06),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.04),transparent_50%)]" />

      {/* Main Command Center Body: Full-Width 2-Column Canvas & Dossier (Stacked on Mobile) */}
      <div className="relative flex flex-col lg:flex-row w-full flex-1 min-h-0 lg:overflow-hidden">

        {/* ========================================================================= */}
        {/* COLUMN 2: CENTRAL COMMAND CANVAS (Fixed viewport on desktop)              */}
        {/* ========================================================================= */}
        <main className="flex-1 flex flex-col justify-between gap-3 p-3 sm:p-4 lg:p-5 lg:overflow-hidden overflow-y-auto min-w-0">
          
          {/* SECTION A: HERO FEATURED BANNER */}
          <div className="relative overflow-hidden rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-[0_12px_36px_-8px_rgba(0,0,0,0.85)] p-4 sm:p-6 flex flex-col justify-between min-h-fit lg:h-[42%] shrink-0">
            
            {/* Background Marvel Banner Comic Artwork (Full Hero Rectangle, Faded/Translucent Cinematic Integration) */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
              <img
                src={marvelBannerImg}
                alt="Marvel Banner"
                className="w-full h-full object-cover object-center opacity-70 transition-opacity duration-500"
              />
              {/* Subtle dark matte edge vignette for text contrast while keeping comic artwork clearly visible */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#07080B]/75 via-[#07080B]/25 to-transparent"
                style={{ backgroundImage: 'linear-gradient(to right, rgba(7, 8, 11, 0.75), rgba(7, 8, 11, 0.25), transparent)' }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#07080B]/60 via-transparent to-transparent"
                style={{ backgroundImage: 'linear-gradient(to top, rgba(7, 8, 11, 0.6), transparent, transparent)' }}
              />
            </div>

            {/* Top Pill Status */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-[9px] font-black uppercase text-purple-200 tracking-wider shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                SEASON 1: COSMIC ASCENSION IS LIVE
              </span>
            </div>

            {/* Title & Fast Launch CTAs */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-end mt-2">
              <div className="md:col-span-8 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
                  TACTICAL MULTIVERSE ARENA
                </span>
                <h1 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-wide uppercase leading-tight">
                  MARVEL <span className="text-amber-400">ASCENSION</span>
                </h1>
                <p className="text-xs text-slate-300 max-w-lg line-clamp-2 leading-relaxed">
                  Recruit 350 iconic heroes, forge card synergies, and conquer competitive battles across the multiverse.
                </p>

                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <button
                    onClick={handleOpenPlayground}
                    className="btn-primary-cinematic inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-black cursor-pointer shadow-glow-cyan"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>PLAYGROUND MODES</span>
                  </button>

                  <button
                    onClick={() => navigate(onOpenArmory || onOpenCodex)}
                    className="btn-secondary-cinematic px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold cursor-pointer"
                  >
                    ARMORY
                  </button>

                  <button
                    onClick={() => navigate(onPlayAscension)}
                    className="btn-gold-cinematic px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-black cursor-pointer"
                  >
                    ASCENSION HUB
                  </button>
                </div>
              </div>

              {/* Right Side: Real Playtime & Telemetry Badge */}
              <div className="md:col-span-4 bg-[#12141C]/90 border border-white/[0.08] rounded-xl p-3 flex items-center justify-between gap-3 backdrop-blur-sm">
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 block">
                    COMMANDER STATUS
                  </span>
                  <h4 className="font-heading font-black text-xs text-white uppercase truncate">
                    {currentUser.displayName || currentUser.username}
                  </h4>
                  <div className="pt-1 text-[10px] text-slate-400 space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-500" />
                      <span>Play Time: <strong className="text-slate-200">{realPlaytime}</strong></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3 text-emerald-400" />
                      <span>Win Rate: <strong className="text-emerald-300">{winRate}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  <CircularProgressRing
                    progress={Math.round(xpPercent)}
                    size={64}
                    strokeWidth={5}
                    color="violet"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: CHARACTER SYNERGIES PREVIEW (300 SYNERGIES) */}
          <div className="space-y-2 lg:h-[35%] flex flex-col justify-center min-h-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-400">
                  <Dna className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-xs sm:text-sm text-white uppercase tracking-wider">
                      CHARACTER SYNERGIES
                    </h3>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                      300 COMBOS
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">ICONIC TEAMUPS • REAL COMBAT EFFECTS</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  if (onOpenSynergies) onOpenSynergies();
                }}
                className="group text-[11px] font-heading font-black text-amber-400 hover:text-amber-300 transition cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 hover:bg-amber-400/20 hover:border-amber-400/60 shadow-sm shrink-0"
              >
                <span>VIEW ALL 300 SYNERGIES</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 flex-1">
              {featuredSynergies.map((syn) => {
                const requiredHeroes = syn.characterIds.map((charId, idx) => {
                  const found = ALL_CHARACTERS.find(c => c.id === charId);
                  return {
                    id: charId,
                    name: found?.name || syn.characterNames[idx] || 'Hero',
                    imageUrl: found?.imageUrl,
                  };
                });

                return (
                  <div
                    key={syn.id}
                    onClick={() => {
                      soundManager.playClick();
                      if (onOpenSynergies) onOpenSynergies();
                    }}
                    className="group relative rounded-xl border border-white/[0.08] bg-[#0E1017] p-3 shadow-md hover:border-purple-500/50 hover:bg-[#12141F] transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-600/10 via-amber-500/5 to-transparent pointer-events-none rounded-bl-full" />

                    <div>
                      {/* Top Row: Type Badge + Bonus Power */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-300">
                          {syn.type} SYNERGY
                        </span>
                        <span className="text-[10px] font-mono font-black text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                          +{syn.bonusPower} PWR
                        </span>
                      </div>

                      {/* Character Artwork Row */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex -space-x-2 shrink-0">
                          {requiredHeroes.map((hero) => (
                            <div
                              key={hero.id}
                              className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 shadow-md bg-black shrink-0 relative z-10 group-hover:scale-105 transition-transform"
                              title={hero.name}
                            >
                              <CharacterImage
                                character={{ id: hero.id, name: hero.name, imageUrl: hero.imageUrl }}
                                aspect="square"
                                fit="cover"
                                className="w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-heading font-black text-white uppercase tracking-tight truncate">
                            {syn.characterNames.join(' + ')}
                          </div>
                          <div className="text-[9px] font-mono text-slate-400 italic truncate">
                            {syn.name}
                          </div>
                        </div>
                      </div>

                      {/* Unique Special Ability */}
                      <div className="text-[10px] font-heading font-black text-amber-300 group-hover:text-amber-200 transition-colors flex items-center gap-1">
                        <span className="text-purple-400 font-bold">→</span>
                        <span className="truncate">{syn.abilityName}</span>
                      </div>
                    </div>

                    <p className="mt-2 line-clamp-2 text-[10px] leading-snug text-slate-400 border-t border-white/[0.06] pt-1.5">
                      {syn.gameplayDescription}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION C: DAILY COIN SUPPLY CLAIM & ACTIVE TICKER */}
          <div className="rounded-2xl bg-[#0E1017] border border-white/[0.08] p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-xs sm:text-sm text-white uppercase tracking-wide">
                    DAILY COIN SUPPLY DROP
                  </span>
                  <span className="px-2 py-0.2 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30 text-[9px] font-bold font-mono">
                    STREAK: DAY {currentUser.dailyLoginStreak || 0}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block">
                  {currentUser.canClaimDailyLogin
                    ? 'Claim your daily coin crate now to boost your balance and streak!'
                    : '✓ Daily coin reward claimed for today. Next drop available tomorrow.'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {dailyClaimToast && (
                <span className="text-xs font-bold text-amber-300 bg-amber-950/90 px-3 py-1 rounded-xl border border-amber-500/40 animate-pulse">
                  {dailyClaimToast}
                </span>
              )}
              <button
                disabled={!currentUser.canClaimDailyLogin || isClaimingDaily}
                onClick={handleClaimDailyDrop}
                className="btn-gold-cinematic px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
              >
                {isClaimingDaily ? 'CLAIMING...' : currentUser.canClaimDailyLogin ? '🪙 CLAIM TODAY' : '✓ CLAIMED'}
              </button>
            </div>
          </div>

        </main>

        {/* ========================================================================= */}
        {/* COLUMN 3: RIGHT TELEMETRY & PLAYER STATUS                                 */}
        {/* ========================================================================= */}
        <aside className="w-full lg:w-[310px] shrink-0 min-h-0 flex flex-col justify-between gap-3 p-3 sm:p-4 lg:border-l lg:border-white/[0.07] bg-[#0A0B10]/80 select-none overflow-y-auto lg:overflow-hidden">
          
          {/* CARD 1: COMMANDER IDENTITY & RANK */}
          <div className="bg-[#0E1017] border border-white/[0.08] rounded-2xl p-4 space-y-3 shadow-md shrink-0">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.07]">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full p-0.5 bg-gradient-to-tr from-purple-600 to-amber-400 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  <div className="h-full w-full rounded-full bg-[#0E1017] overflow-hidden flex items-center justify-center text-sm">
                    {currentUser.customAvatarUrl ? (
                      <img src={currentUser.customAvatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <span>{currentUser.avatar || '🦸‍♂️'}</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-heading font-black text-sm text-white tracking-wide truncate max-w-[130px]">
                      {currentUser.displayName || currentUser.username}
                    </span>
                    <CheckCircle2 className="h-3 w-3 text-purple-400 shrink-0" />
                  </div>
                  <span className="text-[10px] font-bold font-mono text-purple-300 uppercase block">
                    {rank}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">TOTAL MATCHES</span>
                <span className="text-xs font-mono font-black text-white">{totalMatches}</span>
              </div>
            </div>

            {/* REAL PLAYER STATISTICS GRID — Absolutely no invented stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#12141C] border border-white/[0.06] rounded-xl p-2.5">
                <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold block">
                  Play Time
                </span>
                <span className="font-heading font-black text-xs sm:text-sm text-white">
                  {realPlaytime}
                </span>
              </div>

              <div className="bg-[#12141C] border border-white/[0.06] rounded-xl p-2.5">
                <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold block">
                  Characters
                </span>
                <span className="font-heading font-black text-xs sm:text-sm text-amber-400">
                  {realOwnedCharacters}
                </span>
              </div>

              <div className="bg-[#12141C] border border-white/[0.06] rounded-xl p-2.5">
                <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold block">
                  Achievements
                </span>
                <span className="font-heading font-black text-xs sm:text-sm text-cyan-400">
                  {realAchievementsCount}
                </span>
              </div>

              <div className="bg-[#12141C] border border-white/[0.06] rounded-xl p-2.5">
                <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold block">
                  MMR Score
                </span>
                <span className="font-heading font-black text-xs sm:text-sm text-purple-300">
                  {realMmr}
                </span>
              </div>
            </div>
          </div>

          {/* CARD 2: FULL VANGUARD ROSTER */}
          <div className="min-h-0 h-[min(52vh,520px)] lg:h-auto lg:max-h-[calc(100vh-355px)] bg-[#0E1017] border border-white/[0.08] rounded-2xl p-3.5 space-y-2 shadow-md flex flex-col">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.07]">
              <div>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 block">
                  VANGUARD ROSTER
                </span>
                <h3 className="font-heading font-black text-xs text-white uppercase tracking-wide">
                  COLLECTION ({realOwnedCharacters})
                </h3>
              </div>
              <button
                onClick={() => navigate(onOpenArmory || onOpenCodex)}
                className="flex items-center gap-0.5 text-[10px] font-bold text-amber-400 hover:text-amber-300 transition cursor-pointer"
              >
                <span>Armory</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Scrollable roster list with readable cards for the full collection */}
            <div className="min-h-0 flex-1 overflow-y-auto pr-1 space-y-1.5 overscroll-contain">
              {displayCollection.map(char => {
                const charLvl = (currentUser.characterLevels as any)?.[char.id] || 1;
                const charPower = char.overallPower || 80;

                return (
                  <div
                    key={char.id}
                    onClick={() => navigate(onOpenArmory || onOpenCodex)}
                    className="group flex items-center gap-2.5 p-1.5 rounded-xl bg-[#12141C] hover:bg-[#181B26] border border-white/[0.05] hover:border-purple-500/30 transition cursor-pointer"
                  >
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-black/50 border border-white/10 shrink-0">
                      <CharacterImage character={char} aspect="square" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-black text-xs text-white truncate group-hover:text-purple-300 transition">
                          {char.name}
                        </span>
                        <span className="text-[9px] font-bold font-mono text-amber-400">
                          PWR {charPower}
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-400 block">
                        LVL {charLvl} • {char.grade}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions Bar inside Telemetry */}
            <div className="pt-2 border-t border-white/[0.06] grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowMatchHistory(true)}
                className="px-2.5 py-1.5 rounded-xl bg-[#12141C] hover:bg-[#181B26] text-slate-300 hover:text-white border border-white/10 text-[10px] font-bold transition text-center cursor-pointer"
              >
                Match History
              </button>
              <button
                onClick={() => navigate(onOpenDailyMissions)}
                className="px-2.5 py-1.5 rounded-xl bg-[#12141C] hover:bg-[#181B26] text-slate-300 hover:text-white border border-white/10 text-[10px] font-bold transition text-center cursor-pointer"
              >
                Quests & XP
              </button>
            </div>
          </div>

        </aside>

      </div>

      {/* MODALS */}
      {showMatchHistory && (
        <MatchHistoryModal onClose={() => setShowMatchHistory(false)} />
      )}

      {showNotifications && (
        <NotificationCenterModal
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          announcements={publicAnnouncements}
          events={publicEvents}
          onNavigateToTab={onNavigateTab}
        />
      )}

      {showPlayground && (
        <PlaygroundModal
          isOpen={showPlayground}
          onClose={() => setShowPlayground(false)}
          onLaunchAscensionBattle={() => {
            if (onNavigateTab) onNavigateTab('BATTLE');
            else if (onPlayAscension) onPlayAscension();
          }}
          onLaunchRanked={() => {
            if (onPlayRanked) onPlayRanked();
            else if (onPlayAscension) onPlayAscension();
          }}
          onLaunchDungeon={() => {
            if (onPlayDungeon) onPlayDungeon();
          }}
          onLaunchBossRaid={() => {
            if (onPlayBossRaid) onPlayBossRaid();
          }}
          onLaunchAuction={(mode) => {
            if (onPlayAuction) onPlayAuction(mode);
          }}
          onLaunchMultiplayer={() => {
            if (onNavigateTab) onNavigateTab('CUSTOM');
          }}
          onLaunchAuctionMultiplayer={() => {
            if (onPlayAuctionMultiplayer) onPlayAuctionMultiplayer();
            else if (onPlayAuction) onPlayAuction('classic');
          }}
          onLaunchSandbox={() => {
            if (onNavigateTab) onNavigateTab('CHARACTERS');
          }}
        />
      )}

    </div>
  );
}
