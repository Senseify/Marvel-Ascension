import React, { useState, useRef } from 'react';
import { Player, PlayerProfile, ProfileShowcase } from '../../types/game';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { 
  Trophy, Award, Swords, Shield, Star, X, User, Zap, Flame, Crown, 
  Clock, Sparkles, LogOut, Skull, HeartHandshake, Compass, Layers, 
  Upload, Edit3, Check, Gift, Activity, BarChart3, Palette, CheckCircle2
} from 'lucide-react';
import { soundManager } from '../../audio/soundManager';
import { useAuth } from '../../context/AuthContext';
import { getLevelFromXp, formatPlaytime } from '../../utils/progression';

interface Props {
  player?: Player | null;
  profile?: PlayerProfile | null;
  viewOnlyProfile?: any | null;
  isOpen?: boolean;
  onClose: () => void;
}

const BACKDROP_THEMES: Record<string, { label: string; icon: string; classes: string }> = {
  multiverse: { label: 'Cosmic Multiverse', icon: '🌌', classes: 'from-[#141A2E] via-[#0D1222] to-[#070914] border-cyan-500/50 shadow-[0_0_60px_rgba(6,182,212,0.4)]' },
  asgard: { label: 'Golden Asgard', icon: '⚡', classes: 'from-[#241A06] via-[#140E04] to-[#080501] border-amber-500/60 shadow-[0_0_60px_rgba(245,158,11,0.4)]' },
  wakanda: { label: 'Wakanda Citadel', icon: '🐾', classes: 'from-[#1C0D2E] via-[#0F081C] to-[#06030B] border-purple-500/60 shadow-[0_0_60px_rgba(168,85,247,0.4)]' },
  quantum: { label: 'Quantum Realm', icon: '🔬', classes: 'from-[#082228] via-[#041217] to-[#02080B] border-teal-400/60 shadow-[0_0_60px_rgba(45,212,191,0.4)]' },
  avengers: { label: 'Avengers Tower', icon: '🛡️', classes: 'from-[#2A0C14] via-[#16060A] to-[#0A0204] border-red-500/60 shadow-[0_0_60px_rgba(239,68,68,0.4)]' },
  knowhere: { label: 'Knowhere Celestial', icon: '🪐', classes: 'from-[#211608] via-[#120B04] to-[#070401] border-yellow-500/60 shadow-[0_0_60px_rgba(234,179,8,0.4)]' }
};

const TITLE_OPTIONS = [
  'Multiverse Challenger',
  'Ancient Ruins Conqueror',
  'Cosmic Gladiator',
  'War Hero',
  'Master Collector',
  'Titan Slayer',
  'Master Forger',
  'Ascender Supreme'
];

const BADGE_OPTIONS = ['🏆', '⚔️', '👑', '⚡', '💎', '🛡️', '🌟', '🔥'];

export function PlayerProfileModal({ player, profile: directProfile, viewOnlyProfile, isOpen = true, onClose }: Props) {
  const { user: authUser, logout, updateCustomAvatar, updateAvatar, updateProfileShowcase } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeTab, setActiveTab] = useState<'overview' | 'statistics' | 'showcase' | 'history'>('overview');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [customAvatarPreview, setCustomAvatarPreview] = useState<string | null>(null);

  // Showcase edit local state
  const [showcaseFavHero, setShowcaseFavHero] = useState<string>('');
  const [showcaseTeam, setShowcaseTeam] = useState<string[]>([]);
  const [showcaseBg, setShowcaseBg] = useState<any>('multiverse');
  const [showcaseTitle, setShowcaseTitle] = useState<string>('Multiverse Challenger');
  const [showcaseBadges, setShowcaseBadges] = useState<string[]>(['🏆']);
  const [isSavingShowcase, setIsSavingShowcase] = useState(false);
  const [showcaseSavedMsg, setShowcaseSavedMsg] = useState(false);

  if (isOpen === false) return null;

  // Prefer viewOnlyProfile, then direct profile, then player.profile, then authUser if player matches, then fallback
  let profile: any;
  if (viewOnlyProfile) {
    profile = viewOnlyProfile;
  } else if (directProfile) {
    profile = directProfile;
  } else if (player?.profile) {
    profile = player.profile;
  } else if (authUser && (!player || player.id === authUser.id || player.name.toLowerCase() === authUser.username.toLowerCase())) {
    profile = authUser;
  } else {
    const safePlayer: Player = player || {
      id: 'guest',
      name: 'Guest Commander',
      avatar: '🦸‍♂️',
      money: 30,
      collection: [],
      isHost: false,
      isReady: false,
      isBot: false,
      level: 1,
      stats: { battlesWon: 0, moneySpent: 0, highestBid: 0 }
    };
    profile = {
      id: safePlayer.id,
      username: safePlayer.name,
      displayName: safePlayer.name,
      avatar: safePlayer.avatar || '🦸‍♂️',
      level: safePlayer.level || 1,
      xp: 0,
      matchesPlayed: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      charactersPurchased: safePlayer.collection?.length || 0,
      battlesWon: safePlayer.stats?.battlesWon || 0,
      mvpAwards: 0,
      tournamentWins: 0,
      playtimeSeconds: 0,
      playtimeFormatted: '0m',
      astra: 0,
      rankedTier: 'BRONZE',
      rankedDivision: 3,
      rankedRating: 1000,
      currentWinStreak: 0,
      bestWinStreak: 0,
      totalDamageDealt: 0,
      bossesDefeated: 0,
      dungeonsCompleted: 0
    };
  }

  const levelInfo = getLevelFromXp(profile.xp || 0);
  const currentLevel = profile.level || levelInfo.level || 1;
  const currentLevelXp = profile.currentLevelXp ?? levelInfo.currentLevelXp;
  const xpForNextLevel = profile.xpForNextLevel ?? levelInfo.xpForNextLevel;
  const progressPercent = profile.progressPercent ?? levelInfo.progressPercent;
  const winRate = profile.matchesPlayed > 0 ? Math.round((profile.wins / profile.matchesPlayed) * 100) : 0;
  const playtime = profile.playtimeFormatted || formatPlaytime(profile.playtimeSeconds || 0);

  const showcase: ProfileShowcase = profile.profileShowcase || {
    favoriteCharacterId: profile.favoriteCharacterId || '',
    favoriteTeam: [],
    profileBackground: 'multiverse',
    title: 'Multiverse Challenger',
    badges: ['🏆'],
    featuredAchievementId: 'first_blood'
  };

  const favoriteHeroId = showcase.favoriteCharacterId || profile.favoriteCharacterId;
  const favoriteHero = favoriteHeroId ? ALL_CHARACTERS.find(c => c.id === favoriteHeroId) : null;
  const favoriteTeamHeroes = (showcase.favoriteTeam || [])
    .map(id => ALL_CHARACTERS.find(c => c.id === id))
    .filter(Boolean);

  const isOwnProfile = authUser && (
    profile.id === authUser.id || 
    (profile.username && profile.username.toLowerCase() === authUser.username.toLowerCase())
  );

  // Initialize customizer state when tab opened
  const handleOpenShowcaseTab = () => {
    setShowcaseFavHero(showcase.favoriteCharacterId || profile.favoriteCharacterId || '');
    setShowcaseTeam(showcase.favoriteTeam || []);
    setShowcaseBg(showcase.profileBackground || 'multiverse');
    setShowcaseTitle(showcase.title || 'Multiverse Challenger');
    setShowcaseBadges(showcase.badges || ['🏆']);
    setActiveTab('showcase');
  };

  const handleSaveShowcase = async () => {
    if (!updateProfileShowcase) return;
    setIsSavingShowcase(true);
    soundManager.playVictory();
    const res = await updateProfileShowcase({
      favoriteCharacterId: showcaseFavHero,
      favoriteTeam: showcaseTeam,
      profileBackground: showcaseBg,
      title: showcaseTitle,
      badges: showcaseBadges
    });
    setIsSavingShowcase(false);
    if (res.success) {
      setShowcaseSavedMsg(true);
      setTimeout(() => setShowcaseSavedMsg(false), 2500);
    }
  };

  const toggleBadge = (badge: string) => {
    soundManager.playClick();
    if (showcaseBadges.includes(badge)) {
      setShowcaseBadges(showcaseBadges.filter(b => b !== badge));
    } else {
      if (showcaseBadges.length >= 3) return; // max 3
      setShowcaseBadges([...showcaseBadges, badge]);
    }
  };

  const toggleTeamHero = (heroId: string) => {
    soundManager.playClick();
    if (showcaseTeam.includes(heroId)) {
      setShowcaseTeam(showcaseTeam.filter(id => id !== heroId));
    } else {
      if (showcaseTeam.length >= 3) return; // max 3
      setShowcaseTeam([...showcaseTeam, heroId]);
    }
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size exceeds 2MB limit.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setCustomAvatarPreview(base64);
      if (updateCustomAvatar) {
        await updateCustomAvatar(base64);
        soundManager.playVictory();
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBio = async () => {
    if (updateCustomAvatar) {
      await updateCustomAvatar(undefined, bioInput);
      soundManager.playClick();
    }
    setIsEditingBio(false);
  };

  const currentTheme = BACKDROP_THEMES[showcase.profileBackground || 'multiverse'] || BACKDROP_THEMES.multiverse;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 animate-fadeIn select-none">
      <div className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto custom-scrollbar bg-gradient-to-b ${currentTheme.classes} border-2 rounded-3xl p-5 sm:p-6 space-y-5 text-white transition-colors duration-500`}>
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-full border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 3 Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 pr-10">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('overview');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('statistics');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'statistics'
                ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Career Statistics</span>
          </button>

          {isOwnProfile && (
            <button
              onClick={() => {
                soundManager.playClick();
                handleOpenShowcaseTab();
              }}
              className={`px-3.5 py-1.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'showcase'
                  ? 'bg-purple-500 text-white shadow-glow-cosmic'
                  : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Showcase & Themes</span>
            </button>
          )}

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('history');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-rose-600 text-white shadow-glow-red'
                : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Match History ({profile.matchHistory?.length || 0})</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: OVERVIEW */}
        {/* ============================================================ */}
        {activeTab === 'overview' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Header Avatar & Identity */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative group shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-red-600 p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.5)]">
                  <div className="w-full h-full bg-[#0B0F19] rounded-[14px] flex items-center justify-center overflow-hidden">
                    {customAvatarPreview || profile.customAvatarUrl ? (
                      <img
                        src={customAvatarPreview || profile.customAvatarUrl}
                        alt={profile.displayName || profile.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl sm:text-4xl">{profile.avatar || '🦸‍♂️'}</span>
                    )}
                  </div>
                </div>

                <div className="absolute -bottom-2 -right-1 bg-amber-500 text-black font-black text-[10px] px-2 py-0.5 rounded-full border border-amber-200 shadow-md">
                  LVL {currentLevel}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-heading font-black text-white tracking-wide truncate">
                    {profile.displayName || profile.username || player?.name}
                  </h2>
                  {showcase.title && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-bold text-[10px] font-mono uppercase">
                      {showcase.title}
                    </span>
                  )}
                  {showcase.badges?.map((badge, idx) => (
                    <span key={idx} className="text-sm">{badge}</span>
                  ))}
                </div>
                
                <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-400 font-mono mt-1">
                  <span className="text-amber-300 font-bold">✨ {(profile.astra ?? profile.ascensionCoins ?? 0).toLocaleString()} ASTRA</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-400 text-purple-200 text-[10px] font-bold">
                    {profile.rankedTier === 'ASCENDER'
                      ? '⚡ ASCENDER'
                      : !profile.isPlacementsCompleted || profile.rankedTier === 'UNRANKED'
                      ? 'UNRANKED'
                      : `${profile.rankedTier} ${profile.rankedDivision || ''}`} ({(profile.rankedRating ?? 0).toLocaleString()} MMR)
                  </span>
                </div>

                {/* Bio */}
                {profile.bio && (
                  <p className="text-xs text-slate-300 italic mt-1.5 max-w-sm line-clamp-2">
                    "{profile.bio}"
                  </p>
                )}
              </div>
            </div>

            {/* XP Level & Progression Bar */}
            <div className="p-3.5 bg-black/60 border border-cyan-500/30 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-heading font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>LEVEL {currentLevel} PROGRESSION</span>
                </span>
                <span className="font-mono text-cyan-300 font-bold">
                  {currentLevelXp.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP ({progressPercent}%)
                </span>
              </div>

              <div className="relative w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-400 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  style={{ width: `${Math.max(4, Math.min(100, progressPercent))}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Total Career XP: {(profile.xp || 0).toLocaleString()}</span>
                <span>Next: Level {currentLevel + 1}</span>
              </div>
            </div>

            {/* Quick Stat Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-black/50 p-3 rounded-2xl border border-white/10 text-center">
                <Trophy className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase font-bold block">VICTORIES</span>
                <span className="text-lg font-heading font-black text-amber-300">{profile.wins || 0}</span>
              </div>

              <div className="bg-black/50 p-3 rounded-2xl border border-white/10 text-center">
                <Skull className="w-4 h-4 text-rose-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase font-bold block">DEFEATS</span>
                <span className="text-lg font-heading font-black text-rose-300">{profile.losses || 0}</span>
              </div>

              <div className="bg-black/50 p-3 rounded-2xl border border-white/10 text-center">
                <Flame className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase font-bold block">WIN RATE</span>
                <span className="text-lg font-heading font-black text-emerald-400">{winRate}%</span>
              </div>

              <div className="bg-black/50 p-3 rounded-2xl border border-white/10 text-center">
                <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase font-bold block">PLAY TIME</span>
                <span className="text-base font-heading font-black text-cyan-300 truncate block">
                  {playtime}
                </span>
              </div>
            </div>

            {/* Favorite Hero Card Showcase */}
            {favoriteHero ? (
              <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-500/40 flex items-center justify-between gap-3 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-cyan-400 shrink-0 bg-black">
                    <img src={favoriteHero.imageUrl} alt={favoriteHero.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] text-amber-400 font-mono font-bold uppercase tracking-widest block">
                      FEATURED HERO SHOWCASE
                    </span>
                    <h4 className="text-base font-heading font-black text-white truncate">
                      {favoriteHero.name}
                    </h4>
                    <p className="text-[11px] text-slate-300 truncate">
                      {favoriteHero.grade} Tier • {favoriteHero.alignment} • Power {favoriteHero.overallPower}
                    </p>
                  </div>
                </div>

                {isOwnProfile && (
                  <button
                    onClick={handleOpenShowcaseTab}
                    className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    Customize
                  </button>
                )}
              </div>
            ) : null}

            {/* Favorite 3-Hero Team Lineup */}
            {favoriteTeamHeroes.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-widest block">
                  SHOWCASE COMBAT SQUAD
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {favoriteTeamHeroes.map((hero: any) => (
                    <div key={hero.id} className="p-2 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-2">
                      <img src={hero.imageUrl} alt={hero.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold text-white truncate block">{hero.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono block">{hero.grade} Tier</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bio Editor for Own Profile */}
            {isOwnProfile && (
              <div className="pt-2 border-t border-white/10">
                {isEditingBio ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      maxLength={140}
                      value={bioInput}
                      onChange={e => setBioInput(e.target.value)}
                      placeholder="Enter commander bio..."
                      className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingBio(false)}
                        className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveBio}
                        className="px-3 py-1 rounded-lg bg-cyan-500 text-black font-bold text-xs shadow-glow-cyan cursor-pointer"
                      >
                        Save Bio
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setBioInput(profile.bio || '');
                        setIsEditingBio(true);
                      }}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{profile.bio ? 'Edit Bio' : 'Add Bio'}</span>
                    </button>

                    {logout && (
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          onClose();
                        }}
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: ADVANCED STATISTICS */}
        {/* ============================================================ */}
        {activeTab === 'statistics' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-black text-amber-300 uppercase tracking-wide flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span>COMPLETE CAREER MULTIVERSE STATISTICS</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {/* Total Battles */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Total Battles</span>
                <span className="text-base font-heading font-black text-white">{profile.matchesPlayed || (profile.wins + profile.losses) || 0}</span>
              </div>

              {/* Wins & Losses */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Wins / Losses</span>
                <span className="text-base font-heading font-black text-emerald-400">{profile.wins || 0} <span className="text-slate-500 font-normal">/</span> <span className="text-rose-400">{profile.losses || 0}</span></span>
              </div>

              {/* Win Rate */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Win Rate</span>
                <span className="text-base font-heading font-black text-amber-300">{winRate}%</span>
              </div>

              {/* MVPs */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">MVP Awards</span>
                <span className="text-base font-heading font-black text-purple-300">{profile.mvpAwards || 0}</span>
              </div>

              {/* Characters Owned */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Heroes Owned</span>
                <span className="text-base font-heading font-black text-cyan-300">{profile.ownedCharacters?.length || profile.charactersPurchased || 0} / {ALL_CHARACTERS.length}</span>
              </div>

              {/* Characters Upgraded */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Hero Upgrades</span>
                <span className="text-base font-heading font-black text-emerald-300">{Object.keys(profile.characterLevels || {}).length}</span>
              </div>

              {/* Auction Wins */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Auction Wins</span>
                <span className="text-base font-heading font-black text-amber-300">{profile.auctionWins || profile.tournamentWins || 0}</span>
              </div>

              {/* Dungeon Peak */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Dungeon Peak</span>
                <span className="text-base font-heading font-black text-cyan-300">Wave {profile.dungeonPeak || profile.dungeonMaxWave || 0}</span>
              </div>

              {/* Highest Rank Achieved */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Highest Rank</span>
                <span className="text-base font-heading font-black text-purple-300 truncate block">{profile.highestRank || 'UNRANKED'}</span>
              </div>

              {/* Play Time */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Play Time</span>
                <span className="text-base font-heading font-black text-white">{playtime}</span>
              </div>

              {/* Astra Earned */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Astra Earned</span>
                <span className="text-base font-heading font-black text-amber-300">{(profile.astraEarned || profile.astra || 0).toLocaleString()}</span>
              </div>

              {/* Crates Opened */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Crates Opened</span>
                <span className="text-base font-heading font-black text-purple-300">{profile.cratesOpened || 0}</span>
              </div>

              {/* Login Streak */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Login Streak</span>
                <span className="text-base font-heading font-black text-amber-400">{profile.dailyLoginStreak || 0} Days</span>
              </div>

              {/* Current Win Streak */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Win Streak</span>
                <span className="text-base font-heading font-black text-emerald-400">{profile.currentWinStreak || 0} (Best: {profile.bestWinStreak || 0})</span>
              </div>

              {/* Total Damage */}
              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Damage Dealt</span>
                <span className="text-base font-heading font-black text-cyan-300">{(profile.totalDamageDealt || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: SHOWCASE & THEMES CUSTOMIZER */}
        {/* ============================================================ */}
        {activeTab === 'showcase' && isOwnProfile && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-black text-purple-300 uppercase tracking-wide flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" />
                <span>CUSTOMIZE PROFILE IDENTITY & SHOWCASE</span>
              </h3>
              {showcaseSavedMsg && (
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Showcase Saved!</span>
                </span>
              )}
            </div>

            {/* 1. Backdrop Theme Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
                Profile Backdrop Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(BACKDROP_THEMES).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setShowcaseBg(key as any);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 cursor-pointer ${
                      showcaseBg === key
                        ? 'bg-purple-950/80 border-purple-400 text-white shadow-glow-cosmic'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-bold truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Title Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
                Commander Title
              </label>
              <select
                value={showcaseTitle}
                onChange={e => setShowcaseTitle(e.target.value)}
                className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              >
                {TITLE_OPTIONS.map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
            </div>

            {/* 3. Badges Selector (Max 3) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold uppercase">Display Badges (Select up to 3)</span>
                <span className="text-amber-400 font-bold">{showcaseBadges.length}/3 Selected</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {BADGE_OPTIONS.map(badge => {
                  const selected = showcaseBadges.includes(badge);
                  return (
                    <button
                      key={badge}
                      type="button"
                      onClick={() => toggleBadge(badge)}
                      className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center border transition-all cursor-pointer ${
                        selected
                          ? 'bg-amber-500/30 border-amber-400 shadow-glow-gold scale-105'
                          : 'bg-black/40 border-white/10 text-slate-500 hover:text-white'
                      }`}
                    >
                      {badge}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Featured Hero Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
                Featured Hero Showcase
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-40 overflow-y-auto custom-scrollbar p-1">
                {((authUser?.ownedCharacters && authUser.ownedCharacters.length > 0)
                  ? ALL_CHARACTERS.filter(c => authUser.ownedCharacters.includes(c.id))
                  : ALL_CHARACTERS.slice(0, 18)
                ).map(char => (
                  <button
                    key={char.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setShowcaseFavHero(char.id);
                    }}
                    className={`p-1 rounded-xl border text-center transition-all cursor-pointer ${
                      showcaseFavHero === char.id
                        ? 'bg-cyan-500/30 border-cyan-400 shadow-glow-cyan'
                        : 'bg-black/40 border-white/10 hover:border-cyan-400/50'
                    }`}
                  >
                    <img src={char.imageUrl} alt={char.name} className="w-8 h-8 mx-auto rounded object-cover mb-1" />
                    <span className="text-[9px] font-bold text-white truncate block">{char.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Save Showcase Button */}
            <button
              type="button"
              disabled={isSavingShowcase}
              onClick={handleSaveShowcase}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-heading font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{isSavingShowcase ? 'Saving Showcase...' : 'Save Profile Showcase'}</span>
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: MATCH HISTORY */}
        {/* ============================================================ */}
        {activeTab === 'history' && (
          <div className="space-y-3 animate-fadeIn max-h-[60vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                RECORDED MULTIVERSE BATTLES
              </span>
              <span className="text-xs font-bold text-amber-400">
                {profile.matchHistory?.length || 0} Total Clashes
              </span>
            </div>

            {!profile.matchHistory || profile.matchHistory.length === 0 ? (
              <div className="p-8 text-center bg-black/40 rounded-2xl border border-white/5 space-y-2">
                <Swords className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-sm font-heading font-bold text-white uppercase">No Recorded Matches Yet</h4>
                <p className="text-xs text-slate-400">
                  Participate in competitive Ascension Ranked Arena, Casual 3v3, or Ancient Dungeon to log combat history.
                </p>
              </div>
            ) : (
              profile.matchHistory.map((match: any) => (
                <div
                  key={match.id}
                  className={`p-3 sm:p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    match.result === 'VICTORY'
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${
                      match.result === 'VICTORY'
                        ? 'bg-emerald-500 text-black shadow-glow-green'
                        : 'bg-rose-600 text-white'
                    }`}>
                      {match.result}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-heading font-black text-white">{match.matchMode}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(match.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <span className="text-xs text-slate-300 font-medium block truncate max-w-sm">
                        {match.battleSummary || 'Ascension Arena Clash'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-bold self-end sm:self-center">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-normal">POWER CLASH</span>
                      <span className="text-amber-400 font-black">
                        {(match.playerTotalPower || 0).toLocaleString()} vs {(match.opponentTotalPower || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-normal">MVP</span>
                      <span className="text-white font-bold truncate max-w-[100px] block">
                        {match.mvpCharacterName || 'Leader'}
                      </span>
                    </div>
                    <div className="text-right text-emerald-400 font-black">
                      <span>+{match.rewards?.xp || 0} XP</span>
                      <span className="block text-amber-400 text-[10px]">+{match.rewards?.astra || 0} Astra</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
