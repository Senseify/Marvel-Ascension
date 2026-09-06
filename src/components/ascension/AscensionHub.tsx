import React, { useState, useEffect } from 'react';
import { AscensionHome } from './AscensionHome';
import { AscensionInventory } from './AscensionInventory';
import { AscensionAuctionMenu } from './AscensionAuctionMenu';
import { GameMode } from '../../types/game';
import { AscensionBattleArena } from './AscensionBattleArena';
import { AscensionRankedArena } from './AscensionRankedArena';
import { AscensionRelicVault } from './AscensionRelicVault';
import { AscensionSkillVault } from './AscensionSkillVault';
import { AscensionBattlePass } from './AscensionBattlePass';
import { AscensionLeaderboards } from './AscensionLeaderboards';
import { AscensionAdminPanel } from './AscensionAdminPanel';
import { RedeemCodeModal } from './RedeemCodeModal';
import { PlayerProfileModal } from '../common/PlayerProfileModal';
import { AscensionCustomLobby } from './AscensionCustomLobby';
import { CardForge } from './CardForge';
import { DailyMissions } from './DailyMissions';
import { Achievements } from './Achievements';
import { MysteryWheel } from './MysteryWheel';
import { TeamBuilder } from './TeamBuilder';
import { CharacterMastery } from './CharacterMastery';
import { CrateOpening } from './CrateOpening';
import { NewPlayerChooser } from './NewPlayerChooser';
import { CharacterTokenForge } from './CharacterTokenForge';
import { DungeonExpeditionHub } from '../dungeon/DungeonExpeditionHub';
import { PlayerLevelRewards } from './PlayerLevelRewards';
import { PLAYER_LEVEL_REWARDS } from '../../data/playerLevelRewards';
import { FriendsModal } from '../social/FriendsModal';
import { soundManager } from '../../audio/soundManager';
import { useAuth } from '../../context/AuthContext';
import {
  Home, Users, Shield, Zap, Swords,
  Package, Crown, Trophy, Sparkles, KeyRound, ShieldAlert,
  Hammer, Target, Star, RotateCcw, BookOpen, Globe, Award
} from 'lucide-react';

export type AscensionTab =
  | 'HOME'
  | 'RANKED'
  | 'LEVEL_REWARDS'
  | 'RELICS'
  | 'SKILLS'
  | 'BATTLE'
  | 'AUCTION'
  | 'CUSTOM'
  | 'INVENTORY'
  | 'BATTLE_PASS'
  | 'LEADERBOARDS'
  | 'MISSIONS'
  | 'ACHIEVEMENTS'
  | 'CARD_FORGE'
  | 'MYSTERY_WHEEL'
  | 'TEAM_BUILDER'
  | 'MASTERY'
  | 'TOKEN_FORGE'
  | 'DUNGEON'
  | 'ADMIN';

interface Props {
  onBackToHome: () => void;
  onPlayAuction: (mode: GameMode) => void;
  initialTab?: AscensionTab;
  openRedeemOnMount?: boolean;
}

export function AscensionHub({ onBackToHome, onPlayAuction, initialTab, openRedeemOnMount = false }: Props) {
  const { user, getDailyMissions, getWeeklyChallenges } = useAuth();
  const [activeTab, setActiveTab] = useState<AscensionTab>(initialTab || 'HOME');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (openRedeemOnMount) setIsRedeemOpen(true);
  }, [openRedeemOnMount]);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [isCrateOpen, setIsCrateOpen] = useState(false);
  const [availableCrates, setAvailableCrates] = useState<any[]>([]);
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [showNewPlayerChooser, setShowNewPlayerChooser] = useState(false);

  const isAdmin = user?.role === 'admin' && user?.isAdmin === true;

  // Count unclaimed items for badge indicators
  const unclaimedMissions = (user?.dailyMissions || []).filter(m => m.isCompleted && !m.isClaimed).length
    + (user?.weeklyMissions || []).filter(m => m.isCompleted && !m.isClaimed).length;

  const claimedLevelCrates = user?.claimedLevelCrates || [];
  const claimedLevelCratesKey = claimedLevelCrates.join(',');
  const userLevel = user?.level || 1;

  // Check for available level crates
  useEffect(() => {
    const crates = [
      ...Array.from({ length: user?.crateInventory?.shard || 0 }, (_, index) => ({
        level: 0, type: 'SHARD_CRATE' as const, canClaim: true, inventory: true, id: `shard-${index}`,
      })),
      ...Array.from({ length: user?.crateInventory?.character || 0 }, (_, index) => ({
        level: 0, type: 'CHARACTER_CRATE' as const, canClaim: true, inventory: true, id: `character-${index}`,
      })),
      ...[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map(lvl => ({
        level: lvl,
        type: lvl % 25 === 0 ? 'CHARACTER_CRATE' as const : 'SHARD_CRATE' as const,
        canClaim: userLevel >= lvl && !claimedLevelCrates.includes(lvl),
        inventory: false,
        id: `level-${lvl}`,
      })),
    ];
    setAvailableCrates(crates);
  }, [
    userLevel,
    user?.crateInventory?.shard,
    user?.crateInventory?.character,
    claimedLevelCratesKey,
  ]);

  const claimableCratesCount = availableCrates.filter(c => c.canClaim).length;

  // Load missions on mount
  useEffect(() => {
    if (user) {
      getDailyMissions();
      getWeeklyChallenges();
      setShowNewPlayerChooser(!user.onboardingCompleted && user.ownedCharacters.length === 0);
    }
  }, []);

  type TabCategory = 'ALL' | 'COMBAT' | 'PROGRESSION' | 'ARSENAL' | 'INTEL';
  const [selectedCategory, setSelectedCategory] = useState<TabCategory>('ALL');

  const unclaimedLevelRewardsCount = PLAYER_LEVEL_REWARDS.filter(
    r => r.level <= (user?.level || 1) && !(user?.claimedLevelRewards || []).includes(r.level)
  ).length;

  interface NavTabItem {
    id: AscensionTab;
    label: string;
    icon: React.ReactNode;
    category: TabCategory;
    badge?: number;
    highlight?: boolean;
  }

  const ALL_NAV_TABS: NavTabItem[] = [
    // COMBAT
    { id: 'RANKED',        label: 'Ranked Arena',  category: 'COMBAT',      icon: <Trophy className="w-3.5 h-3.5 text-amber-400" />, highlight: true },
    { id: 'BATTLE',        label: 'Battle Arena',  category: 'COMBAT',      icon: <Swords className="w-3.5 h-3.5 text-purple-400" /> },
    { id: 'CUSTOM',        label: 'Custom Match',  category: 'COMBAT',      icon: <Globe className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'TEAM_BUILDER',  label: 'Teams',         category: 'COMBAT',      icon: <Users className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'DUNGEON',       label: 'Dungeon (PvE)', category: 'COMBAT',      icon: <Swords className="w-3.5 h-3.5 text-orange-400" /> },
    { id: 'AUCTION',       label: 'Auction Wars',  category: 'COMBAT',      icon: <Hammer className="w-3.5 h-3.5 text-rose-400" /> },

    // PROGRESSION
    { id: 'HOME',          label: 'Command HQ',    category: 'PROGRESSION', icon: <Home className="w-3.5 h-3.5 text-slate-300" /> },
    { id: 'LEVEL_REWARDS', label: 'Level Rewards', category: 'PROGRESSION', icon: <Award className="w-3.5 h-3.5 text-amber-400" />, badge: unclaimedLevelRewardsCount || undefined },
    { id: 'BATTLE_PASS',   label: 'Battle Pass',   category: 'PROGRESSION', icon: <Crown className="w-3.5 h-3.5 text-amber-300" /> },
    { id: 'MISSIONS',      label: 'Missions',      category: 'PROGRESSION', icon: <Target className="w-3.5 h-3.5 text-cyan-400" />, badge: unclaimedMissions || undefined },
    { id: 'ACHIEVEMENTS',  label: 'Achievements',  category: 'PROGRESSION', icon: <Trophy className="w-3.5 h-3.5 text-yellow-400" /> },
    { id: 'MASTERY',       label: 'Hero Mastery',  category: 'PROGRESSION', icon: <Star className="w-3.5 h-3.5 text-purple-400" /> },

    // ARSENAL & FORGE
    { id: 'RELICS',        label: 'Relic Vault',   category: 'ARSENAL',     icon: <Shield className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'SKILLS',        label: 'Skill Vault',   category: 'ARSENAL',     icon: <Zap className="w-3.5 h-3.5 text-yellow-400" /> },
    { id: 'CARD_FORGE',    label: 'Card Forge',    category: 'ARSENAL',     icon: <Hammer className="w-3.5 h-3.5 text-indigo-400" /> },
    { id: 'TOKEN_FORGE',   label: 'Token Forge',   category: 'ARSENAL',     icon: <Hammer className="w-3.5 h-3.5 text-orange-400" /> },
    { id: 'INVENTORY',     label: 'Shard Vault',   category: 'ARSENAL',     icon: <Package className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'MYSTERY_WHEEL', label: 'Wheel',         category: 'ARSENAL',     icon: <RotateCcw className="w-3.5 h-3.5 text-pink-400" />, badge: (user?.wheelSpins || 0) > 0 ? user!.wheelSpins : undefined },

    // INTEL & DATABASE
    { id: 'LEADERBOARDS',  label: 'Leaderboards',  category: 'INTEL',       icon: <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> },
    ...(isAdmin ? [{ id: 'ADMIN' as AscensionTab, label: 'Admin Panel', category: 'INTEL' as TabCategory, icon: <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> }] : [])
  ];

  const filteredTabs = selectedCategory === 'ALL' 
    ? ALL_NAV_TABS 
    : ALL_NAV_TABS.filter(t => t.category === selectedCategory);

  const handleTabClick = (tabId: AscensionTab) => {
    soundManager.playClick();
    setActiveTab(tabId);
  };

  return (
    <div className="ui-lite min-h-screen bg-[#07080B] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black relative">
      {/* Subtle cinematic ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(139,92,246,0.08),transparent),radial-gradient(ellipse_60%_40%_at_90%_100%,rgba(245,158,11,0.05),transparent)]" />

      {/* Top Navigation Tabs Bar — Cinematic Command Center Tabs */}
      <nav className="block">
        <div className="w-full max-w-[1750px] mx-auto px-2 sm:px-4 py-2 space-y-2">
          
          {/* Category Filter Pills + Quick Actions */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 custom-scrollbar">
            <div className="flex items-center gap-1.5 shrink-0 bg-[#07080B] p-1 rounded-xl border border-white/[0.06]">
              {(['ALL', 'COMBAT', 'PROGRESSION', 'ARSENAL', 'INTEL'] as TabCategory[]).map(cat => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { soundManager.playClick(); setSelectedCategory(cat); }}
                    className={`px-3 py-1 rounded-lg text-[10px] font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat === 'COMBAT' ? '⚔️ Combat' : cat === 'PROGRESSION' ? '🏆 Progression' : cat === 'ARSENAL' ? '⚒️ Arsenal' : cat === 'INTEL' ? '📊 Intel' : '✨ All Hubs'}
                  </button>
                );
              })}
            </div>

            {/* Quick Actions Right */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Quick Action: Redeem Key */}
              <button
                type="button"
                onClick={() => { soundManager.playClick(); setIsRedeemOpen(true); }}
                className="shrink-0 h-8 flex items-center justify-center gap-1.5 px-3 rounded-xl text-[10px] font-heading font-black uppercase tracking-wider bg-[#12141C] hover:bg-[#181B26] text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-400/50 transition-all cursor-pointer shadow-sm"
              >
                <KeyRound className="w-3 h-3 text-purple-400" />
                <span>Redeem</span>
              </button>

              {/* Quick Action: Crates Modal */}
              <button
                type="button"
                onClick={() => { soundManager.playClick(); setIsCrateOpen(true); }}
                className="relative shrink-0 h-8 flex items-center justify-center gap-1.5 px-3 rounded-xl text-[10px] font-heading font-black uppercase tracking-wider bg-[#12141C] hover:bg-[#181B26] text-amber-300 hover:text-white border border-amber-500/30 hover:border-amber-400/50 transition-all cursor-pointer shadow-sm"
              >
                <Package className="w-3 h-3 text-amber-400" />
                <span>Crates</span>
                {claimableCratesCount > 0 && (
                  <span className="ml-1 w-3.5 h-3.5 bg-amber-500 text-black text-[8px] font-black rounded-full flex items-center justify-center animate-pulse">
                    {claimableCratesCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Sub-Tabs Grid / Row */}
          <div className="ascension-nav-actions flex max-w-full flex-nowrap items-center justify-start gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center lg:justify-start sm:overflow-visible">
            {filteredTabs.map(t => {
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTabClick(t.id)}
                  className={`relative shrink-0 h-9 flex items-center justify-center gap-1.5 px-3.5 rounded-xl text-[11px] sm:text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? t.highlight 
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)] font-black scale-[1.02]'
                        : 'btn-primary-cinematic scale-[1.02]'
                      : t.highlight
                        ? 'bg-amber-950/40 text-amber-300 border border-amber-500/40 hover:bg-amber-900/50'
                        : 'bg-[#12141C] hover:bg-[#181B26] text-slate-300 hover:text-white border border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                  {t.badge != null && t.badge > 0 && (
                    <span className="ml-1 w-4 h-4 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow">
                      {t.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 3. Main Content Views */}
      <main className="flex-1 min-w-0 max-w-[1700px] w-full mx-auto p-3 sm:p-6 lg:pl-10">
        {activeTab === 'HOME'          && <AscensionHome onNavigateTab={handleTabClick} />}
        {activeTab === 'RANKED'        && <AscensionRankedArena />}
        {activeTab === 'LEVEL_REWARDS' && <PlayerLevelRewards />}
        {activeTab === 'RELICS'       && <AscensionRelicVault />}
        {activeTab === 'SKILLS'       && <AscensionSkillVault />}
        {activeTab === 'BATTLE'       && <AscensionBattleArena />}
        {activeTab === 'AUCTION'      && <AscensionAuctionMenu onPlay={onPlayAuction} />}
        {activeTab === 'CUSTOM'       && <AscensionCustomLobby onBackToHub={() => setActiveTab('HOME')} />}
        {activeTab === 'INVENTORY'    && <AscensionInventory />}
        {activeTab === 'BATTLE_PASS'  && <AscensionBattlePass />}
        {activeTab === 'LEADERBOARDS' && <AscensionLeaderboards />}
        {activeTab === 'ADMIN'        && isAdmin && <AscensionAdminPanel />}
        {activeTab === 'MISSIONS'     && <DailyMissions />}
        {activeTab === 'ACHIEVEMENTS' && <Achievements />}
        {activeTab === 'CARD_FORGE'   && <CardForge />}
        {activeTab === 'MYSTERY_WHEEL' && <MysteryWheel />}
        {activeTab === 'TEAM_BUILDER'  && <TeamBuilder />}
        {activeTab === 'MASTERY'       && <CharacterMastery />}
        {activeTab === 'TOKEN_FORGE'   && <CharacterTokenForge />}
        {activeTab === 'DUNGEON'       && <DungeonExpeditionHub onExit={() => setActiveTab('HOME')} />}
      </main>

      {/* 4. Modals */}
      {isProfileOpen && (
        <PlayerProfileModal onClose={() => setIsProfileOpen(false)} />
      )}

      {isFriendsOpen && (
        <FriendsModal
          isOpen={isFriendsOpen}
          onClose={() => setIsFriendsOpen(false)}
        />
      )}

      {isRedeemOpen && (
        <RedeemCodeModal
          isOpen={isRedeemOpen}
          onClose={() => setIsRedeemOpen(false)}
        />
      )}

      {isCrateOpen && (
        <CrateOpening
          crates={availableCrates}
          onClose={() => setIsCrateOpen(false)}
          onClaimed={() => {
            // Refresh crate state (user is updated via AuthContext)
          }}
        />
      )}
      {showNewPlayerChooser && <NewPlayerChooser onComplete={() => setShowNewPlayerChooser(false)} />}
    </div>
  );
}
