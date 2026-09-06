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
import { FriendsModal } from '../social/FriendsModal';
import { soundManager } from '../../audio/soundManager';
import { useAuth } from '../../context/AuthContext';

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

  const handleTabClick = (tabId: AscensionTab) => {
    soundManager.playClick();
    setActiveTab(tabId);
  };

  return (
    <div className="ui-lite min-h-screen bg-[#07080B] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black relative">
      {/* Subtle cinematic ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(139,92,246,0.08),transparent),radial-gradient(ellipse_60%_40%_at_90%_100%,rgba(245,158,11,0.05),transparent)]" />

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
