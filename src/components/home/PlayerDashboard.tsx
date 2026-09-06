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
import {
  Gamepad2, Settings, Swords, Hammer, Layers, Trophy,
  Shield, ShoppingBag, Sparkles, ChevronRight, Play, Bookmark, MoreVertical,
  Target, Flame, Award, CheckCircle2, Zap, ArrowRight, Download, Radio,
  Users, Clock, BarChart3, Activity, Compass, Coins, Gift, Check, KeyRound, RotateCcw, FlaskConical
} from 'lucide-react';

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
  onNavigateTab,
}: Props) {
  const { user, fetchPublicAnnouncements, fetchPublicEvents, claimDailyLogin } = useAuth();
  const { openSettings } = useGameSettings();

  const [showMatchHistory, setShowMatchHistory] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);
  const [publicAnnouncements, setPublicAnnouncements] = useState<Announcement[]>([]);
  const [publicEvents, setPublicEvents] = useState<GameEvent[]>([]);
  const [activeNav, setActiveNav] = useState('Command Center');
  const [expandedNav, setExpandedNav] = useState<Record<string, boolean>>({
    'All Hubs': true,
    Combat: true,
    Progression: true,
    Arsenal: true,
    Intel: true,
  });
  const [isBookmarked, setIsBookmarked] = useState(false);
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

  const featuredCharacter = useMemo(() => {
    const owned = (user?.ownedCharacters || []).map(id => ALL_CHARACTERS.find(c => c.id === id)).find(Boolean);
    return owned || ALL_CHARACTERS.find(c => c.id === 'iron_man') || ALL_CHARACTERS[0];
  }, [user?.ownedCharacters]);

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

  // Unclaimed rewards indicator count for notifications
  const unclaimedItems = (currentUser.canClaimDailyLogin ? 1 : 0) +
    ((currentUser.wheelSpins || 0) > 0 ? 1 : 0) +
    (currentUser.dailyMissions || []).filter(m => m.isCompleted && !m.isClaimed).length;

  const navigate = (callback?: () => void, navName?: string) => {
    if (navName) setActiveNav(navName);
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

  const navGroups = [
    {
      label: 'All Hubs',
      icon: Layers,
      items: [
        { label: 'Redeem', icon: KeyRound, action: onOpenRedeem },
        { label: 'Crates', icon: Gift, action: onOpenCrates },
      ],
    },
    {
      label: 'Combat',
      icon: Swords,
      items: [
        { label: 'Ranked Arena', icon: Trophy, action: onPlayRanked },
        { label: 'Battle Arena', icon: Swords, action: () => onNavigateTab?.('BATTLE') },
        { label: 'Custom Match', icon: Users, action: () => onNavigateTab?.('CUSTOM') },
        { label: 'Teams', icon: Users, action: () => onNavigateTab?.('TEAM_BUILDER') },
        { label: 'Dungeon (PvE)', icon: Flame, action: onPlayDungeon },
        { label: 'Auction Wars', icon: Hammer, action: onPlayAuctionMultiplayer || onPlayAuction },
      ],
    },
    {
      label: 'Progression',
      icon: Award,
      items: [
        { label: 'Command HQ', icon: Compass, action: undefined },
        { label: 'Level Rewards', icon: Award, action: () => onNavigateTab?.('LEVEL_REWARDS') },
        { label: 'Battle Pass', icon: Layers, action: onOpenBattlePass || (() => onNavigateTab?.('BATTLE_PASS')) },
        { label: 'Missions', icon: Target, action: onOpenDailyMissions || (() => onNavigateTab?.('MISSIONS')) },
        { label: 'Achievements', icon: CheckCircle2, action: () => onNavigateTab?.('ACHIEVEMENTS') },
        { label: 'Hero Mastery', icon: Sparkles, action: () => onNavigateTab?.('MASTERY') },
      ],
    },
    {
      label: 'Arsenal',
      icon: Shield,
      items: [
        { label: 'Relic Vault', icon: Shield, action: () => onNavigateTab?.('RELICS') },
        { label: 'Skill Vault', icon: Zap, action: () => onNavigateTab?.('SKILLS') },
        { label: 'Card Forge', icon: Hammer, action: () => onNavigateTab?.('CARD_FORGE') },
        { label: 'Token Forge', icon: Hammer, action: () => onNavigateTab?.('TOKEN_FORGE') },
        { label: 'Shard Vault', icon: Layers, action: onOpenInventory },
        { label: 'Wheel', icon: RotateCcw, action: () => onNavigateTab?.('MYSTERY_WHEEL') },
      ],
    },
    {
      label: 'Intel',
      icon: BarChart3,
      items: [
        { label: 'Leaderboards', icon: Trophy, action: onOpenLeaderboards || onPlayRanked },
        { label: 'Admin Panel', icon: Settings, action: () => onNavigateTab?.('ADMIN') },
      ],
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-53px)] lg:h-[calc(100vh-53px)] lg:max-h-[calc(100vh-53px)] w-full bg-[#07080B] text-slate-100 font-sans selection:bg-amber-500 selection:text-black flex flex-col lg:overflow-hidden select-none">
      {/* Layered cinematic lighting matching reference image */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_40%_-10%,rgba(139,92,246,0.12),transparent),radial-gradient(ellipse_50%_40%_at_90%_90%,rgba(245,158,11,0.06),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.04),transparent_50%)]" />

      {/* Main Command Center Body: Fixed 3-Column Layout on Desktop */}
      <div className="relative flex w-full flex-1 min-h-0 lg:overflow-hidden">
        
        {/* ========================================================================= */}
        {/* COLUMN 1: LEFT NAVIGATION SIDEBAR                                         */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex w-[210px] shrink-0 flex-col justify-between border-r border-white/[0.07] bg-[#0A0C12]/95 p-3 select-none">
          
          {/* Navigation Pill List */}
          <nav className="space-y-1">
            <div className="px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase">
              MAIN NAVIGATION
            </div>
            {navGroups.map(group => {
              const GroupIcon = group.icon;
              const isExpanded = expandedNav[group.label];
              return (
                <div key={group.label} className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => setExpandedNav(prev => ({ ...prev, [group.label]: !prev[group.label] }))}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[10px] font-black uppercase tracking-wider text-amber-300 hover:bg-white/[0.05]"
                  >
                    <GroupIcon className="h-3.5 w-3.5 text-amber-400" />
                    <span className="flex-1">{group.label}</span>
                    <ChevronRight className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                  {isExpanded && group.items.map(item => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => navigate(item.action, item.label)}
                        className={`group relative flex w-full items-center gap-2 rounded-xl py-1.5 pl-7 pr-2 text-left text-[11px] font-bold transition-all cursor-pointer ${
                          activeNav === item.label ? 'nav-pill-active' : 'nav-pill-idle'
                        }`}
                      >
                        <ItemIcon className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-300" />
                        <span className="truncate tracking-wide">{item.label}</span>
                        {activeNav === item.label && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-red-500" />}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>

          {/* Sidebar Bottom: Settings & Level Progression Track */}
          <div className="pt-3 border-t border-white/[0.07] space-y-2.5">
            <button
              onClick={handleOpenSettings}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-bold text-slate-400 hover:text-white hover:bg-white/[0.04] transition cursor-pointer"
            >
              <Settings className="h-3.5 w-3.5 text-slate-400" />
              <span className="tracking-wide">Settings</span>
            </button>

            <div className="px-2 pb-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                  Level {level}
                </span>
                <span className="text-[9px] font-mono text-amber-400 font-bold">
                  {xp.toLocaleString()} / {xpNext.toLocaleString()} XP
                </span>
              </div>
              <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/[0.08]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* COLUMN 2: CENTRAL COMMAND CANVAS (Fixed viewport on desktop)              */}
        {/* ========================================================================= */}
        <main className="flex-1 flex flex-col justify-between gap-3 p-3 sm:p-4 lg:p-5 lg:overflow-hidden overflow-y-auto">
          
          {/* SECTION A: HERO FEATURED BANNER */}
          <div className="relative overflow-hidden rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-[0_12px_36px_-8px_rgba(0,0,0,0.85)] p-5 sm:p-6 flex flex-col justify-between min-h-[220px] lg:h-[42%] shrink-0">
            
            {/* Background Hero Artwork with Vignette */}
            <div className="absolute inset-0 opacity-35 mix-blend-luminosity">
              <CharacterImage character={featuredCharacter} aspect="fill" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080B] via-[#07080B]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-transparent" />

            {/* Top Pill Status */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-[9px] font-black uppercase text-purple-200 tracking-wider shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                SEASON 1: COSMIC ASCENSION IS LIVE
              </span>
              
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsBookmarked(prev => !prev);
                }}
                className={`p-1.5 rounded-xl bg-black/50 border border-white/10 transition cursor-pointer ${
                  isBookmarked ? 'text-amber-400 border-amber-400/40' : 'text-slate-400 hover:text-white'
                }`}
                title="Bookmark Game"
              >
                <Bookmark className="h-3.5 w-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
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

                <div className="flex items-center gap-2.5 pt-1 flex-wrap">
                  <button
                    onClick={handleOpenPlayground}
                    className="btn-primary-cinematic inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-glow-cyan"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>PLAYGROUND MODES</span>
                  </button>

                  <button
                    onClick={() => navigate(onOpenArmory || onOpenCodex)}
                    className="btn-secondary-cinematic px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    ARMORY
                  </button>

                  <button
                    onClick={() => navigate(onPlayAscension)}
                    className="btn-gold-cinematic px-4 py-2.5 rounded-xl text-xs font-black cursor-pointer"
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

          {/* SECTION B: INFORMATION-ONLY GAME MODE OVERVIEW */}
          <div className="space-y-2 lg:h-[35%] flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-xs sm:text-sm text-white uppercase tracking-wider">
                  QUICK DEPLOY • GAME MODES
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">TACTICAL OVERVIEW</span>
              </div>
              <button
                onClick={handleOpenPlayground}
                className="text-[11px] font-bold text-purple-300 hover:text-white transition cursor-pointer flex items-center gap-1"
              >
                <span>Playground</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8 flex-1">
              {[
                { name: 'Battle Arena', type: 'PVP', format: '1v1–5v5', desc: 'Tactical live combat', icon: Swords, accent: 'border-purple-500/30 bg-purple-950/70 text-purple-300', stat: 'Live queue' },
                { name: 'Ranked Ladder', type: 'RANKED PVP', format: '1v1', desc: 'MMR competitive climb', icon: Trophy, accent: 'border-amber-500/30 bg-amber-950/70 text-amber-300', stat: `MMR ${realMmr}` },
                { name: 'Dungeon', type: 'PVE', format: 'SOLO', desc: 'Endless relic expedition', icon: Flame, accent: 'border-orange-500/30 bg-orange-950/70 text-orange-300', stat: 'Wave survival' },
                { name: 'Auction Wars', type: 'AUCTION', format: '2–8', desc: 'Draft heroes, then battle', icon: Hammer, accent: 'border-cyan-500/30 bg-cyan-950/70 text-cyan-300', stat: 'Live bidding' },
                { name: 'Boss Raid', type: 'CO-OP PVE', format: '1–6', desc: 'Conquer cosmic titans', icon: Target, accent: 'border-rose-500/30 bg-rose-950/70 text-rose-300', stat: 'Team assault' },
                { name: 'Custom Match', type: 'PVP', format: 'PRIVATE', desc: 'Friends and room rules', icon: Users, accent: 'border-emerald-500/30 bg-emerald-950/70 text-emerald-300', stat: 'Room lobby' },
                { name: 'Sandbox', type: 'SIMULATION', format: 'SOLO', desc: 'Test builds and matchups', icon: FlaskConical, accent: 'border-indigo-500/30 bg-indigo-950/70 text-indigo-300', stat: 'No stakes' },
                { name: 'Ascension', type: 'RPG / PVP', format: 'LIVE', desc: 'Progression arena system', icon: Sparkles, accent: 'border-pink-500/30 bg-pink-950/70 text-pink-300', stat: `${realOwnedCharacters} heroes` },
              ].map(mode => {
                const Icon = mode.icon;
                return (
                  <div key={mode.name} className={`min-w-0 rounded-xl border border-white/[0.08] bg-[#0E1017] p-2 shadow-md flex flex-col justify-between gap-2`}>
                    <div className="flex items-start justify-between gap-1">
                      <div className={`rounded-lg p-1.5 ${mode.accent}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-right text-[8px] font-black uppercase leading-tight text-slate-400">{mode.type}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="truncate text-[10px] font-black uppercase text-white">{mode.name}</h4>
                      <p className="mt-0.5 line-clamp-2 text-[9px] leading-tight text-slate-400">{mode.desc}</p>
                    </div>
                    <div className="border-t border-white/[0.06] pt-1 text-[8px] font-mono text-slate-500">
                      <span className="text-slate-300">{mode.format}</span> • {mode.stat}
                    </div>
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
