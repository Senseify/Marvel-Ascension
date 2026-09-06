import { useEffect, useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { Navbar } from './components/common/Navbar';
import { HomeScreen } from './components/home/HomeScreen';
import { HowToPlayModal } from './components/home/HowToPlayModal';
import { PlaygroundModal } from './components/home/PlaygroundModal';
import { LocalSetup } from './components/setup/LocalSetup';
import { OnlineLobby } from './components/setup/OnlineLobby';
import { AuctionArena } from './components/auction/AuctionArena';
import { MythicCinematic } from './components/common/MythicCinematic';
import { BattlePhase } from './components/battle/BattlePhase';
import { TournamentBracket } from './components/tournament/TournamentBracket';
import { VictoryScreen } from './components/champion/VictoryScreen';
import { CharacterDatabase } from './components/encyclopedia/CharacterDatabase';
import { BattleSandbox } from './components/sandbox/BattleSandbox';
import { EquipmentShop } from './components/shop/EquipmentShop';
import { SkillVaultPage } from './components/shop/SkillVaultPage';
import { GradeVotingModal } from './components/auction/GradeVotingModal';
import { MarvelCinematicIntro } from './components/common/MarvelCinematicIntro';
import { BossRaidManager } from './components/raid/BossRaidManager';
import { DungeonExpeditionHub } from './components/dungeon/DungeonExpeditionHub';
import { LevelUpModal } from './components/common/LevelUpModal';
import { useAuth } from './context/AuthContext';
import { AscensionShop } from './components/ascension/AscensionShop';
import { CratesPage } from './components/ascension/CratesPage';
import { AscensionInventory } from './components/ascension/AscensionInventory';
import { SpectatorChatDrawer } from './components/battle/SpectatorChatDrawer';
import { BattlePresentation3D } from './components/battle/BattlePresentation3D';
import { AscensionHub, AscensionTab } from './components/ascension/AscensionHub';
import { MatchLeaveConfirmModal } from './components/common/MatchLeaveConfirmModal';
import { GeminiChatbot } from './components/common/GeminiChatbot';
import { GamePhase } from './types/game';
import { soundManager } from './audio/soundManager';
import { Sparkles, Swords, Film } from 'lucide-react';

export function App() {
  const { isLevelUpOpen, levelUpData, closeLevelUpModal } = useAuth();
  const {
    state,
    isOnlineMode,
    setIsOnlineMode,
    socketHook,
    setPhase,
    updateLocalSettings,
    addLocalPlayer,
    removeLocalPlayer,
    startLocalGame,
    placeBid,
    voteSkip,
    instantSkipCurrentAuction,
    concedeCurrentAuction,
    submitGradeVotes,
    executeBattleRoundAction,
    concedeCurrentMatch,
    skipCurrentMatch,
    useHealingPotion,
    triggerFlashbang,
    playMatch,
    discardCharacter,
    restartGame,
    updatePlayerCollection,
    proceedFromShopToBattles,
    sendSpectatorChat,
    voteRematch,
    updateHostSettings,
  } = useGameState();

  const [showBootIntro, setShowBootIntro] = useState(true);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [previousPhaseBeforeBrowse, setPreviousPhaseBeforeBrowse] = useState<GamePhase>('HOME');
  const [deviceView, setDeviceView] = useState<'pc' | 'phone'>('pc');
  const [showLeaveConfirmModal, setShowLeaveConfirmModal] = useState(false);
  const [pendingTargetPhase, setPendingTargetPhase] = useState<GamePhase | null>(null);
  const [showPlaygroundModal, setShowPlaygroundModal] = useState(false);
  const [ascensionTab, setAscensionTab] = useState<AscensionTab>('HOME');

  useEffect(() => {
    if (window.location.pathname === '/ai-assistant' && state.phase !== 'AI_ASSISTANT') {
      setPreviousPhaseBeforeBrowse('HOME');
      setPhase('AI_ASSISTANT');
    }
  }, [setPhase, state.phase]);

  const handleNavigateToAscension = (tab: AscensionTab = 'HOME') => {
    soundManager.playClick();
    setPreviousPhaseBeforeBrowse(state.phase);
    setAscensionTab(tab);
    setPhase('ASCENSION');
  };

  const handleOpenAIAssistant = () => {
    setPreviousPhaseBeforeBrowse(state.phase);
    window.history.pushState({ phase: 'AI_ASSISTANT' }, '', '/ai-assistant');
    setPhase('AI_ASSISTANT');
  };

  const dedicatedPagePhases: GamePhase[] = [
    'AI_ASSISTANT', 'SHOP', 'CRATES', 'INVENTORY', 'ONLINE_LOBBY', 'SKILL_VAULT', 'ENCYCLOPEDIA',
    'SANDBOX', 'BOSS_RAID',
  ];
  const handleBackToPreviousPage = () => {
    if (state.phase === 'AI_ASSISTANT') {
      window.history.pushState({ phase: previousPhaseBeforeBrowse }, '', previousPhaseBeforeBrowse === 'HOME' ? '/home' : '/');
    }
    setPhase(previousPhaseBeforeBrowse || 'HOME');
  };

  const isMatchInProgress = ['AUCTION', 'AUCTION_WINNER', 'BATTLE_SELECT', 'BATTLE_FIGHT', 'BATTLE_ROUND_RESULT', 'DUNGEON', 'BOSS_RAID'].includes(state.phase);

  const handleNavigate = (targetPhase: GamePhase) => {
    soundManager.playClick();
    if (isMatchInProgress && targetPhase !== state.phase) {
      setPendingTargetPhase(targetPhase);
      setShowLeaveConfirmModal(true);
      return;
    }

    if (targetPhase === 'HOW_TO_PLAY') {
      setShowHowToPlay(true);
    } else if (targetPhase === 'ENCYCLOPEDIA') {
      setPreviousPhaseBeforeBrowse(state.phase);
      setPhase('ENCYCLOPEDIA');
    } else {
      setPhase(targetPhase);
    }
  };

  const handleReturnHome = () => {
    soundManager.playClick();
    if (isMatchInProgress) {
      setPendingTargetPhase('HOME');
      setShowLeaveConfirmModal(true);
      return;
    }

    if (isOnlineMode) {
      setIsOnlineMode(false);
    }
    setPhase('HOME');
  };

  const handleConfirmLeaveMatch = () => {
    setShowLeaveConfirmModal(false);
    if (isOnlineMode) {
      setIsOnlineMode(false);
    }
    const target = pendingTargetPhase || 'HOME';
    setPendingTargetPhase(null);
    if (target === 'HOW_TO_PLAY') {
      setShowHowToPlay(true);
    } else if (target === 'ENCYCLOPEDIA') {
      setPhase('ENCYCLOPEDIA');
    } else {
      setPhase(target);
    }
  };

  return (
    <div className="ui-lite min-h-screen flex flex-col bg-marvel-darker text-slate-100 relative selection:bg-marvel-red selection:text-white">
      {/* Marvel Cinematic Intro on Website Boot */}
      {showBootIntro && (
        <MarvelCinematicIntro onComplete={() => setShowBootIntro(false)} />
      )}
      {state.phase === 'SHOP' && (
        <div className="min-h-screen bg-[#07080B] p-4 sm:p-8">
          <AscensionShop />
        </div>
      )}
      {state.phase === 'CRATES' && <CratesPage onBack={handleBackToPreviousPage} />}
      {/* Leave Match Confirmation Modal */}
      {showLeaveConfirmModal && (
        <MatchLeaveConfirmModal
          isOpen={showLeaveConfirmModal}
          onConfirmLeave={handleConfirmLeaveMatch}
          onStay={() => {
            setShowLeaveConfirmModal(false);
            setPendingTargetPhase(null);
          }}
        />
      )}

      {/* Navigation Header - Unified Persistent Marvel Ascension Command Navbar */}
      <Navbar
        state={state}
        phase={state.phase}
        roomId={state.roomId}
        isOnline={isOnlineMode}
        onNavigate={handleNavigate}
        onHomeClick={handleReturnHome}
        deviceView={deviceView}
        onToggleDeviceView={() => setDeviceView(prev => prev === 'pc' ? 'phone' : 'pc')}
        onNavigateToAscensionTab={handleNavigateToAscension}
        onOpenPlaygroundModal={() => setShowPlaygroundModal(true)}
        onOpenHowToPlayModal={() => setShowHowToPlay(true)}
        onOpenAIAssistant={handleOpenAIAssistant}
      />

      {/* Main Content Router */}
      <main className={`flex-1 relative z-20 transition-all duration-300 w-full overflow-x-hidden ${
        deviceView === 'phone'
          ? 'max-w-[430px] w-full mx-auto my-3 rounded-[36px] border-4 border-slate-700/80 shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-x-hidden bg-[#06080E] ring-1 ring-white/10'
          : 'w-full overflow-x-hidden'
      }`}>
        {dedicatedPagePhases.includes(state.phase) && (
          <button
            type="button"
            onClick={handleBackToPreviousPage}
            className="absolute left-3 top-3 z-40 inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-[#0B0D12]/95 px-3 py-2 text-xs font-heading font-black uppercase tracking-wider text-slate-200 shadow-lg backdrop-blur-md transition hover:border-amber-400/50 hover:text-amber-300"
          >
            ← Back
          </button>
        )}
        <GeminiChatbot
          state={state}
          launcherPlacement={state.phase === 'AI_ASSISTANT' ? 'page' : 'hidden'}
        />
        {/* 0. ASCENSION FLAGSHIP HUB */}
        {state.phase === 'ASCENSION' && (
          <AscensionHub
            initialTab={ascensionTab}
            onBackToHome={() => setPhase('HOME')}
            onPlayAuction={(mode) => {
              setPreviousPhaseBeforeBrowse('ASCENSION');
              setIsOnlineMode(false);
              updateLocalSettings({ gameMode: mode, auctionTimerSeconds: mode === 'blitz' ? 5 : 15 });
              setPhase('LOCAL_SETUP');
            }}
          />
        )}

        {/* 1. HOME SCREEN */}
        {state.phase === 'HOME' && (
          <HomeScreen
            onPlayAscension={() => handleNavigateToAscension('HOME')}
            onOpenArmory={() => handleNavigateToAscension('INVENTORY')}
            onOpenBattlePass={() => handleNavigateToAscension('BATTLE_PASS')}
            onOpenLeaderboards={() => handleNavigateToAscension('LEADERBOARDS')}
            onOpenDailyMissions={() => handleNavigateToAscension('MISSIONS')}
            onNavigateTab={(tab) => handleNavigateToAscension(tab as any)}
            onPlayLocal={() => {
              setIsOnlineMode(false);
              updateLocalSettings({ gameMode: 'classic', auctionTimerSeconds: 15 });
              setPhase('LOCAL_SETUP');
            }}
            onPlayChaosAuction={() => {
              setIsOnlineMode(false);
              updateLocalSettings({ gameMode: 'chaos_auction', auctionTimerSeconds: 15 });
              setPhase('LOCAL_SETUP');
            }}
            onPlayBlindBidding={() => {
              setIsOnlineMode(false);
              updateLocalSettings({ gameMode: 'blind_bidding', auctionTimerSeconds: 15 });
              setPhase('LOCAL_SETUP');
            }}
            onPlayBlitz={() => {
              setIsOnlineMode(false);
              updateLocalSettings({ gameMode: 'blitz', auctionTimerSeconds: 5 });
              setPhase('LOCAL_SETUP');
            }}
            onPlayBossRaid={() => {
              setPreviousPhaseBeforeBrowse('HOME');
              setPhase('BOSS_RAID');
            }}
            onPlayDungeon={() => {
              setPreviousPhaseBeforeBrowse('HOME');
              setPhase('DUNGEON');
            }}
            onPlayMultiplayer={() => {
              setPreviousPhaseBeforeBrowse('HOME');
              setIsOnlineMode(true);
              setPhase('ONLINE_LOBBY');
            }}
            onPlayAuctionMultiplayer={() => {
              setPreviousPhaseBeforeBrowse('HOME');
              setIsOnlineMode(true);
              updateLocalSettings({ gameMode: 'classic', auctionTimerSeconds: 15 });
              setPhase('ONLINE_LOBBY');
            }}
            onOpenEncyclopedia={() => {
              setPreviousPhaseBeforeBrowse('HOME');
              setPhase('ENCYCLOPEDIA');
            }}
            onOpenHowToPlay={() => setShowHowToPlay(true)}
            onOpenSandbox={() => {
              setPreviousPhaseBeforeBrowse('HOME');
              setPhase('SANDBOX');
            }}
            onOpenRelicShop={() => {
              setPreviousPhaseBeforeBrowse('HOME');
              setPhase('EQUIPMENT_SHOP');
            }}
            onOpenSkillVault={() => {
              setPreviousPhaseBeforeBrowse('HOME');
              setPhase('SKILL_VAULT');
            }}
            onPlayIntro={() => setShowBootIntro(true)}
            onOpenShop={() => { setPreviousPhaseBeforeBrowse(state.phase); setPhase('SHOP'); }}
            onOpenCrates={() => { setPreviousPhaseBeforeBrowse(state.phase); setPhase('CRATES'); }}
            onOpenInventory={() => { setPreviousPhaseBeforeBrowse(state.phase); setPhase('INVENTORY'); }}
          />
        )}
        {state.phase === 'INVENTORY' && (
          <div className="min-h-screen bg-[#07080B] p-3 sm:p-6 lg:p-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-3">
              <button
                type="button"
                onClick={handleBackToPreviousPage}
                className="self-start rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10"
              >
                ← Back
              </button>
              <AscensionInventory />
            </div>
          </div>
        )}

        {/* 2. LOCAL SETUP */}
        {state.phase === 'LOCAL_SETUP' && (
          <LocalSetup
            players={state.players}
            settings={state.settings}
            onUpdateSettings={updateLocalSettings}
            onAddPlayer={addLocalPlayer}
            onRemovePlayer={removeLocalPlayer}
            onStartGame={startLocalGame}
            onBack={() => handleBackToPreviousPage()}
          />
        )}

        {/* 3. ONLINE LOBBY */}
        {state.phase === 'ONLINE_LOBBY' && (
          <OnlineLobby
            state={state}
            socketId={socketHook.socketId || socketHook.socket?.id}
            isConnected={socketHook.isConnected}
            onSetReady={socketHook.setReady}
            onAddBot={socketHook.addBot}
            onUpdateSettings={socketHook.updateSettings}
            onStartGame={socketHook.startGame}
            onLeaveRoom={() => {
              setIsOnlineMode(false);
              handleBackToPreviousPage();
            }}
            onCreateRoom={socketHook.createRoom}
            onJoinRoom={socketHook.joinRoom}
            onSendMessage={sendSpectatorChat}
            isInRoom={!!socketHook.onlineState}
            error={socketHook.lastError}
          />
        )}

        {/* 4. AUCTION INTRO TRANSITION */}
        {state.phase === 'AUCTION_INTRO' && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4 animate-shake">
            <div className="p-4 bg-red-950/80 rounded-full border border-red-500 shadow-glow-red">
              <Sparkles className="w-10 h-10 text-marvel-gold animate-spin" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-black text-white uppercase tracking-wider">
              AUCTIONS ARE COMMENCING
            </h1>
            <p className="text-sm font-bold text-red-300 uppercase tracking-widest animate-pulse">
              GET READY TO BID ON 300 MARVEL HEROES & VILLAINS
            </p>
          </div>
        )}

        {/* 5. MYTHIC CINEMATIC OVERLAY */}
        {state.phase === 'AUCTION_REVEAL_MYTHIC' && state.auction.currentCharacter && (
          <MythicCinematic
            character={state.auction.currentCharacter}
            onDismiss={() => setPhase('AUCTION')}
          />
        )}

        {/* 5B. 3-ROUND GRADE TIER VOTING MODAL */}
        {state.phase === 'GRADE_VOTING' && (
          <GradeVotingModal
            players={state.players}
            onVoteSubmit={submitGradeVotes}
            isLocalMode={!isOnlineMode}
            controllingPlayerId={socketHook.socketId || socketHook.socket?.id}
          />
        )}

        {/* 6. AUCTION ARENA & WINNER REVEAL */}
        {(state.phase === 'AUCTION' || state.phase === 'AUCTION_WINNER') && (
          <AuctionArena
            state={state}
            socketId={socketHook.socketId || socketHook.socket?.id}
            onPlaceBid={placeBid}
            onVoteSkip={voteSkip}
            onInstantSkip={instantSkipCurrentAuction}
            onConcede={concedeCurrentAuction}
            onTriggerFlashbang={triggerFlashbang}
            onDiscardCharacter={discardCharacter}
            onOpenRelicShop={() => {
              setPreviousPhaseBeforeBrowse(state.phase);
              setPhase('EQUIPMENT_SHOP');
            }}
            isLocalMode={!isOnlineMode}
          />
        )}

        {/* 7. AUCTION COMPLETE & EQUIPMENT SHOP */}
        {state.phase === 'AUCTION_COMPLETE' && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4 animate-shake">
            <div className="p-4 bg-purple-950/80 rounded-full border border-purple-500 shadow-glow-cosmic">
              <Sparkles className="w-12 h-12 text-marvel-gold animate-pulse" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1 rounded-full border border-emerald-500">
              ROSTER RECRUITMENT COMPLETE
            </span>
            <h1 className="text-4xl sm:text-7xl font-heading font-black text-marvel-gradient uppercase tracking-widest">
              RELIC VAULT OPENING
            </h1>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Entering the Tactical Artifacts & Equipment Shop...
            </p>
          </div>
        )}

        {/* 7.5 HERO SKILL VAULT (301 CHARACTERS) */}
        {state.phase === 'SKILL_VAULT' && (
          <SkillVaultPage
            onBack={() => setPhase(previousPhaseBeforeBrowse || 'HOME')}
          />
        )}

        {/* 8. TACTICAL ARTIFACTS & EQUIPMENT SHOP */}
        {state.phase === 'EQUIPMENT_SHOP' && (
          <EquipmentShop
            players={state.players}
            onUpdatePlayerCollection={updatePlayerCollection}
            onDiscardCharacter={discardCharacter}
            onProceedToBattles={proceedFromShopToBattles}
            onBack={() => setPhase(previousPhaseBeforeBrowse || 'HOME')}
            isLocalMode={!isOnlineMode}
            controllingPlayerId={socketHook.socket?.id}
          />
        )}

        {/* 9. BATTLE TRANSITION MARVEL INTRO */}
        {state.phase === 'BATTLE_TRANSITION' && (
          <>
            <MarvelCinematicIntro
              title="MARVEL"
              subtitle="THE TOURNAMENT BATTLES COMMENCE"
              onComplete={() => setPhase('TOURNAMENT_TREE')}
            />
            {state.players[0]?.collection?.[0] && state.players[1]?.collection?.[0] && (
              <BattlePresentation3D
                player={state.players[0].collection[0]}
                opponent={state.players[1].collection[0]}
                effectType="cosmic"
                title="AUCTION COMPLETE • BATTLE DEPLOYMENT"
                className="mx-auto max-w-5xl -mt-24 relative z-30"
              />
            )}
          </>
        )}

        {/* 10. TOURNAMENT BRACKET */}
        {(state.phase === 'TOURNAMENT_TREE' || state.phase === 'MATCH_RESULT') && (
          <TournamentBracket
            state={state}
            onPlayMatch={playMatch}
            isOnlineMode={isOnlineMode}
            currentUserId={socketHook.socket?.id}
          />
        )}

        {/* 11. BATTLE FIGHT PHASE */}
        {state.phase === 'BATTLE_FIGHT' && (
          <BattlePhase
            state={state}
            onReturnToTree={() => setPhase('TOURNAMENT_TREE')}
            onExecuteAction={executeBattleRoundAction}
            onConcedeMatch={concedeCurrentMatch}
            onSkipMatch={skipCurrentMatch}
            onUseHealingPotion={useHealingPotion}
            onTriggerFlashbang={triggerFlashbang}
            onSendSpectatorChat={sendSpectatorChat}
            isOnlineMode={isOnlineMode}
            controllingPlayerId={socketHook.socket?.id}
          />
        )}

        {/* 12. CHAMPION VICTORY SCREEN */}
        {state.phase === 'CHAMPION' && state.champion && (
          <VictoryScreen
            champion={state.champion}
            state={state}
            onPlayAgain={restartGame}
            onVoteRematch={voteRematch}
          />
        )}

        {/* 13. ENCYCLOPEDIA */}
        {state.phase === 'ENCYCLOPEDIA' && (
          <CharacterDatabase
            onBack={() => setPhase(previousPhaseBeforeBrowse)}
          />
        )}

        {/* 14. BATTLE SANDBOX */}
        {state.phase === 'SANDBOX' && (
          <BattleSandbox
            onBack={() => setPhase(previousPhaseBeforeBrowse)}
          />
        )}

        {/* 15. CO-OP BOSS RAID CAMPAIGN (1-6 PLAYERS, SHARED FUNDS, RELIC VAULT & 9 TITANS) */}
        {state.phase === 'BOSS_RAID' && (
          <BossRaidManager
            onExit={() => setPhase('HOME')}
          />
        )}

        {/* 16. ROGUELITE DUNGEON EXPEDITIONS */}
        {state.phase === 'DUNGEON' && (
          <DungeonExpeditionHub
            onExit={() => setPhase('HOME')}
          />
        )}
      </main>

      {/* Global Multiplayer Spectator Chat & Roster Hub (Accessible in all online phases except BATTLE_FIGHT where it is already integrated) */}
      {(isOnlineMode || state.isOnline) && state.phase !== 'BATTLE_FIGHT' && (
        <SpectatorChatDrawer
          players={state.players}
          messages={state.spectatorChat || []}
          currentUserId={socketHook.socket?.id}
          isSpectator={!state.players.some(p => p.id === socketHook.socket?.id && !p.isBot && p.status !== 'SPECTATING')}
          onSendMessage={sendSpectatorChat}
        />
      )}

      {/* How to Play Modal */}
      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}

      {/* Global Level-Up Promotion Modal */}
      {isLevelUpOpen && levelUpData && (
        <LevelUpModal
          isOpen={isLevelUpOpen}
          onClose={closeLevelUpModal}
          oldLevel={levelUpData.oldLevel}
          newLevel={levelUpData.newLevel}
          username={levelUpData.user.displayName || levelUpData.user.username}
        />
      )}

      {/* Game Modes Playground Catalog Modal */}
      {showPlaygroundModal && (
        <PlaygroundModal
          isOpen={showPlaygroundModal}
          onClose={() => setShowPlaygroundModal(false)}
          onLaunchAscensionBattle={() => { setShowPlaygroundModal(false); handleNavigateToAscension('BATTLE'); }}
          onLaunchRanked={() => { setShowPlaygroundModal(false); handleNavigateToAscension('RANKED'); }}
          onLaunchDungeon={() => { setShowPlaygroundModal(false); handleNavigateToAscension('DUNGEON'); }}
          onLaunchBossRaid={() => { setShowPlaygroundModal(false); setPreviousPhaseBeforeBrowse('HOME'); setPhase('BOSS_RAID'); }}
          onLaunchAuction={(mode) => {
            setShowPlaygroundModal(false);
            setIsOnlineMode(false);
            updateLocalSettings({ gameMode: mode, auctionTimerSeconds: mode === 'blitz' ? 5 : 15 });
            setPhase('LOCAL_SETUP');
          }}
          onLaunchMultiplayer={() => {
            setShowPlaygroundModal(false);
            setPreviousPhaseBeforeBrowse('HOME');
            setIsOnlineMode(true);
            setPhase('ASCENSION');
            setAscensionTab('CUSTOM');
          }}
          onLaunchAuctionMultiplayer={() => {
            setShowPlaygroundModal(false);
            setPreviousPhaseBeforeBrowse('HOME');
            setIsOnlineMode(true);
            updateLocalSettings({ gameMode: 'classic', auctionTimerSeconds: 15 });
            setPhase('ONLINE_LOBBY');
          }}
          onLaunchSandbox={() => { setShowPlaygroundModal(false); setPhase('SANDBOX'); }}
        />
      )}
    </div>
  );
}

export default App;
