import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../audio/soundManager';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { 
  CAMPAIGN_CHAPTERS, CampaignStage, ChapterInfo, CampaignEnemy 
} from '../../data/campaign/campaignData';
import { 
  Globe, Star, Lock, Swords, ChevronRight, ArrowLeft, Shield, 
  Sparkles, Award, Zap, Heart, AlertTriangle, CheckCircle2, 
  Crown, Play, Skull, RefreshCw, Flame, Gem
} from 'lucide-react';
import { Character } from '../../types/game';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface CombatFighter {
  id: string;
  name: string;
  imageUrl: string;
  avatar: string;
  currentHp: number;
  maxHp: number;
  power: number;
  energy: number; // 0 to 100
  isPlayer: boolean;
  grade: string;
  powers: string;
  isDefending?: boolean;
}

export function CampaignMode({ isOpen, onClose }: Props) {
  const { user, token, refreshProfile } = useAuth();
  
  // Views: 'CHAPTER_MAP' | 'STAGE_SELECT' | 'SQUAD_PREP' | 'BATTLE_ARENA' | 'VICTORY_SCREEN'
  const [currentView, setCurrentView] = useState<'CHAPTER_MAP' | 'STAGE_SELECT' | 'SQUAD_PREP' | 'BATTLE_ARENA' | 'VICTORY_SCREEN'>('CHAPTER_MAP');
  const [selectedChapter, setSelectedChapter] = useState<ChapterInfo>(CAMPAIGN_CHAPTERS[0]);
  const [selectedStage, setSelectedStage] = useState<CampaignStage>(CAMPAIGN_CHAPTERS[0].stages[0]);
  
  // Squad Selection
  const [selectedSquadIds, setSelectedSquadIds] = useState<string[]>([]);
  
  // Combat State
  const [playerFighters, setPlayerFighters] = useState<CombatFighter[]>([]);
  const [enemyFighters, setEnemyFighters] = useState<CombatFighter[]>([]);
  const [currentTurn, setCurrentTurn] = useState<'PLAYER' | 'ENEMY'>('PLAYER');
  const [activeFighterIndex, setActiveFighterIndex] = useState<number>(0);
  const [combatRound, setCombatRound] = useState<number>(1);
  const [combatLogs, setCombatLogs] = useState<string[]>([]);
  const [isProcessingTurn, setIsProcessingTurn] = useState<boolean>(false);
  const [battleResult, setBattleResult] = useState<{
    victory: boolean;
    stars: number;
    rewards?: any;
    unlockedNextChapter?: boolean;
  } | null>(null);

  const unlockedChapter = user?.campaignProgress?.unlockedChapter || 1;
  const completedStageIds = user?.campaignProgress?.completedStageIds || [];
  const stageStars = user?.campaignProgress?.stageStars || {};
  const totalStars = user?.campaignProgress?.totalStars || 0;

  // Initialize squad with user's top owned characters
  useEffect(() => {
    if (user?.ownedCharacters && user.ownedCharacters.length > 0 && selectedSquadIds.length === 0) {
      setSelectedSquadIds(user.ownedCharacters.slice(0, 3));
    }
  }, [user?.ownedCharacters, selectedSquadIds.length]);

  if (!isOpen) return null;

  // Squad power calculation
  const getSquadPower = () => {
    return selectedSquadIds.reduce((total, id) => {
      const char = ALL_CHARACTERS.find(c => c.id === id);
      return total + (char?.overallPower ? char.overallPower * 25 : 500);
    }, 0);
  };

  // Select a chapter to enter
  const handleSelectChapter = (chapter: ChapterInfo) => {
    if (chapter.number > unlockedChapter) {
      soundManager.playAttackHit();
      return;
    }
    soundManager.playClick();
    setSelectedChapter(chapter);
    setSelectedStage(chapter.stages[0]);
    setCurrentView('STAGE_SELECT');
  };

  // Select a stage to prepare squad
  const handleSelectStage = (stage: CampaignStage) => {
    soundManager.playClick();
    setSelectedStage(stage);
    setCurrentView('SQUAD_PREP');
  };

  // Toggle squad member
  const handleToggleSquadMember = (charId: string) => {
    soundManager.playClick();
    if (selectedSquadIds.includes(charId)) {
      if (selectedSquadIds.length > 1) {
        setSelectedSquadIds(prev => prev.filter(id => id !== charId));
      }
    } else {
      if (selectedSquadIds.length < 3) {
        setSelectedSquadIds(prev => [...prev, charId]);
      } else {
        setSelectedSquadIds(prev => [prev[1], prev[2], charId]);
      }
    }
  };

  // Launch Battle
  const handleStartBattle = () => {
    if (selectedSquadIds.length === 0) return;
    soundManager.playClick();

    // Map Player Fighters
    const squadFighters: CombatFighter[] = selectedSquadIds.map(id => {
      const char = ALL_CHARACTERS.find(c => c.id === id);
      const basePower = char?.overallPower ? char.overallPower * 25 : 500;
      const baseHp = (char?.stats?.durability || 70) * 15;
      return {
        id: char?.id || id,
        name: char?.name || 'Hero',
        imageUrl: char?.imageUrl || '',
        avatar: '🦸‍♂️',
        currentHp: baseHp,
        maxHp: baseHp,
        power: basePower,
        energy: 20,
        isPlayer: true,
        grade: char?.grade || 'B',
        powers: char?.powers || 'Combat Strike'
      };
    });

    // Map Enemy Fighters
    const enemies: CombatFighter[] = selectedStage.enemies.map(e => ({
      id: e.id,
      name: e.name,
      imageUrl: e.imageUrl,
      avatar: e.avatar,
      currentHp: e.hp,
      maxHp: e.maxHp,
      power: e.power * 5,
      energy: 10,
      isPlayer: false,
      grade: e.grade,
      powers: e.powers
    }));

    setPlayerFighters(squadFighters);
    setEnemyFighters(enemies);
    setCurrentTurn('PLAYER');
    setActiveFighterIndex(0);
    setCombatRound(1);
    setCombatLogs([`Battle commenced at ${selectedStage.location}! Enemies engage.`]);
    setBattleResult(null);
    setCurrentView('BATTLE_ARENA');
  };

  // Player action: Attack, Special, Defend, Ultimate
  const handlePlayerAction = (actionType: 'ATTACK' | 'SPECIAL' | 'DEFEND' | 'ULTIMATE') => {
    if (isProcessingTurn || currentTurn !== 'PLAYER') return;
    setIsProcessingTurn(true);

    const activeHero = playerFighters[activeFighterIndex];
    if (!activeHero || activeHero.currentHp <= 0) {
      setIsProcessingTurn(false);
      return;
    }

    // Pick first living enemy target
    const targetIdx = enemyFighters.findIndex(e => e.currentHp > 0);
    if (targetIdx === -1) {
      handleCombatEnd(true);
      return;
    }

    const updatedEnemies = [...enemyFighters];
    const targetEnemy = updatedEnemies[targetIdx];
    const updatedPlayers = [...playerFighters];

    let dmg = 0;
    let logMsg = '';

    if (actionType === 'ATTACK') {
      soundManager.playAttackHit();
      dmg = Math.floor(activeHero.power * (0.85 + Math.random() * 0.3));
      targetEnemy.currentHp = Math.max(0, targetEnemy.currentHp - dmg);
      activeHero.energy = Math.min(100, activeHero.energy + 25);
      logMsg = `${activeHero.name} strikes ${targetEnemy.name} for ${dmg} kinetic damage!`;
    } else if (actionType === 'SPECIAL') {
      soundManager.playAttackHit();
      dmg = Math.floor(activeHero.power * 1.5);
      targetEnemy.currentHp = Math.max(0, targetEnemy.currentHp - dmg);
      activeHero.energy = Math.min(100, activeHero.energy + 35);
      logMsg = `${activeHero.name} unleashes SIGNATURE SKILL on ${targetEnemy.name} for ${dmg} elemental damage!`;
    } else if (actionType === 'DEFEND') {
      soundManager.playClick();
      activeHero.isDefending = true;
      activeHero.currentHp = Math.min(activeHero.maxHp, activeHero.currentHp + Math.floor(activeHero.maxHp * 0.2));
      activeHero.energy = Math.min(100, activeHero.energy + 15);
      logMsg = `${activeHero.name} enters defensive guard and restores vital shielding!`;
    } else if (actionType === 'ULTIMATE') {
      soundManager.playVictory();
      dmg = Math.floor(activeHero.power * 2.8);
      targetEnemy.currentHp = Math.max(0, targetEnemy.currentHp - dmg);
      // Also splash damage other enemies
      updatedEnemies.forEach((e, idx) => {
        if (idx !== targetIdx && e.currentHp > 0) {
          e.currentHp = Math.max(0, e.currentHp - Math.floor(dmg * 0.4));
        }
      });
      activeHero.energy = 0;
      logMsg = `💥 COSMIC OVERDRIVE! ${activeHero.name} unleashes supreme ultimate for ${dmg} critical damage!`;
    }

    setPlayerFighters(updatedPlayers);
    setEnemyFighters(updatedEnemies);
    setCombatLogs(prev => [logMsg, ...prev.slice(0, 7)]);

    // Check if all enemies defeated
    if (updatedEnemies.every(e => e.currentHp <= 0)) {
      setTimeout(() => handleCombatEnd(true), 1200);
      return;
    }

    // Advance to next living player hero, or switch to ENEMY turn
    const livingHeroIndices = updatedPlayers.map((p, idx) => p.currentHp > 0 ? idx : -1).filter(idx => idx !== -1);
    const currentPosInLiving = livingHeroIndices.indexOf(activeFighterIndex);

    if (currentPosInLiving < livingHeroIndices.length - 1) {
      setActiveFighterIndex(livingHeroIndices[currentPosInLiving + 1]);
      setIsProcessingTurn(false);
    } else {
      // Switch to ENEMY turn
      setCurrentTurn('ENEMY');
      setTimeout(() => executeEnemyTurns(updatedPlayers, updatedEnemies), 1000);
    }
  };

  // Enemy Turn Execution
  const executeEnemyTurns = (players: CombatFighter[], enemies: CombatFighter[]) => {
    const livingEnemies = enemies.filter(e => e.currentHp > 0);
    const updatedPlayers = [...players];
    const roundLogs: string[] = [];

    livingEnemies.forEach(enemy => {
      const livingPlayerTargets = updatedPlayers.filter(p => p.currentHp > 0);
      if (livingPlayerTargets.length === 0) return;

      const targetPlayer = livingPlayerTargets[Math.floor(Math.random() * livingPlayerTargets.length)];
      let dmg = Math.floor(enemy.power * (0.65 + Math.random() * 0.3));
      if (targetPlayer.isDefending) {
        dmg = Math.floor(dmg * 0.4);
      }

      targetPlayer.currentHp = Math.max(0, targetPlayer.currentHp - dmg);
      roundLogs.push(`${enemy.name} attacks ${targetPlayer.name} dealing ${dmg} damage!`);
    });

    // Reset defend flags
    updatedPlayers.forEach(p => p.isDefending = false);

    setPlayerFighters(updatedPlayers);
    setCombatLogs(prev => [...roundLogs, ...prev.slice(0, 6)]);

    // Check if player squad wiped
    if (updatedPlayers.every(p => p.currentHp <= 0)) {
      setTimeout(() => handleCombatEnd(false), 1200);
      return;
    }

    // Advance round and return turn to player
    setCombatRound(prev => prev + 1);
    setCurrentTurn('PLAYER');
    const firstLivingHeroIdx = updatedPlayers.findIndex(p => p.currentHp > 0);
    setActiveFighterIndex(firstLivingHeroIdx);
    setIsProcessingTurn(false);
  };

  // Combat Conclusion
  const handleCombatEnd = async (isVictory: boolean) => {
    setIsProcessingTurn(false);

    if (!isVictory) {
      soundManager.playAttackHit();
      setBattleResult({ victory: false, stars: 0 });
      setCurrentView('VICTORY_SCREEN');
      return;
    }

    soundManager.playVictory();

    // Calculate stars
    let stars = 1;
    const allHeroesAlive = playerFighters.every(p => p.currentHp > 0);
    if (allHeroesAlive) stars++;
    if (combatRound <= 8) stars++;

    // Submit to server
    try {
      const res = await fetch('/api/campaign/complete-stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          stageId: selectedStage.id,
          stars,
          playerTeamIds: selectedSquadIds
        })
      });
      const data = await res.json();
      if (data.success) {
        setBattleResult({
          victory: true,
          stars,
          rewards: data.rewardsAwarded,
          unlockedNextChapter: data.unlockedNextChapter
        });
        refreshProfile();
      } else {
        setBattleResult({ victory: true, stars, rewards: selectedStage.firstClearRewards });
      }
    } catch (e) {
      setBattleResult({ victory: true, stars, rewards: selectedStage.firstClearRewards });
    }

    setCurrentView('VICTORY_SCREEN');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/90 backdrop-blur-md select-none animate-fade-in text-slate-100">
      <div className="relative w-full max-w-5xl bg-slate-900/95 border border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col h-[92vh] overflow-hidden">
        
        {/* Universal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wider text-white flex items-center gap-2 font-display">
                WORLD CAMPAIGN
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  PvE EXPEDITIONS
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Earth • Wakanda • Asgard • Quantum Realm • Cosmic Multiverse
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Player Stars Total */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{totalStars} / 60 Stars</span>
            </div>

            {/* Back / Close button */}
            {currentView !== 'CHAPTER_MAP' && currentView !== 'BATTLE_ARENA' ? (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  if (currentView === 'SQUAD_PREP') setCurrentView('STAGE_SELECT');
                  else if (currentView === 'STAGE_SELECT') setCurrentView('CHAPTER_MAP');
                  else setCurrentView('CHAPTER_MAP');
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Dynamic View Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">

          {/* ============================================================== */}
          {/* VIEW 1: CHAPTER SELECT MAP */}
          {/* ============================================================== */}
          {currentView === 'CHAPTER_MAP' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">
                    Select Multiverse Chapter
                  </h3>
                  <p className="text-xs text-slate-400">
                    Defeat the final boss in each realm to unlock progressive chapters.
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-400">
                  Chapter {unlockedChapter} / 5 Available
                </span>
              </div>

              {/* 5 Chapters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CAMPAIGN_CHAPTERS.map(chapter => {
                  const isUnlocked = chapter.number <= unlockedChapter;
                  const chapterStars = chapter.stages.reduce((acc, s) => acc + (stageStars[s.id] || 0), 0);
                  const isCompleted = chapterStars === chapter.stages.length * 3;

                  return (
                    <div
                      key={chapter.number}
                      onClick={() => handleSelectChapter(chapter)}
                      className={`relative group rounded-2xl border p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 min-h-[220px] ${
                        isUnlocked
                          ? 'bg-gradient-to-b ' + chapter.gradient + ' border-slate-700/80 hover:border-cyan-400/80 cursor-pointer shadow-lg hover:shadow-cyan-950/40 hover:-translate-y-1'
                          : 'bg-slate-900/60 border-slate-800/80 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      {/* Chapter Background Banner Overlay */}
                      <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity" style={{ backgroundImage: `url(${chapter.backdropUrl})` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

                      {/* Card Content */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-black/60 text-cyan-300 border border-cyan-500/30">
                            CHAPTER {chapter.number}
                          </span>
                          {isUnlocked ? (
                            <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span>{chapterStars} / 12</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Lock className="w-3.5 h-3.5" />
                              <span>Locked</span>
                            </div>
                          )}
                        </div>

                        <h4 className="text-lg font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                          {chapter.title}
                        </h4>
                        <p className="text-xs text-cyan-400 font-semibold">{chapter.subtitle}</p>
                        <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                          {chapter.description}
                        </p>
                      </div>

                      <div className="relative z-10 pt-4 flex items-center justify-between border-t border-white/10 mt-3">
                        <span className="text-[11px] text-slate-400">
                          {chapter.stages.length} Battle Stages
                        </span>
                        {isUnlocked ? (
                          <div className="flex items-center gap-1 text-xs font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
                            <span>Deploy</span> <ChevronRight className="w-4 h-4" />
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-500">
                            Complete Chapter {chapter.number - 1} Boss
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 2: CHAPTER STAGE SELECT */}
          {/* ============================================================== */}
          {currentView === 'STAGE_SELECT' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                    {selectedChapter.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {selectedChapter.title} — Expedition Stages
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Squad Power:</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">{getSquadPower()} PWR</span>
                </div>
              </div>

              {/* Stages List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedChapter.stages.map((stage, idx) => {
                  const isCompleted = completedStageIds.includes(stage.id);
                  const stars = stageStars[stage.id] || 0;
                  const squadPower = getSquadPower();
                  const isReady = squadPower >= stage.recommendedPower;

                  return (
                    <div
                      key={stage.id}
                      onClick={() => handleSelectStage(stage)}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                        stage.isBoss 
                          ? 'bg-gradient-to-br from-rose-950/40 via-slate-900 to-purple-950/40 border-rose-500/40 hover:border-rose-400' 
                          : 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-700/60 hover:border-cyan-500/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300">
                              STAGE {stage.stageNumber}
                            </span>
                            {stage.isBoss && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                                <Skull className="w-3 h-3" /> CHAPTER CLIMAX
                              </span>
                            )}
                          </div>

                          {/* Stars Earned */}
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3].map(s => (
                              <Star
                                key={s}
                                className={`w-4 h-4 ${
                                  s <= stars 
                                    ? 'fill-amber-400 text-amber-400' 
                                    : 'text-slate-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <h4 className="text-base font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                          {stage.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">{stage.description}</p>
                      </div>

                      {/* Enemies Preview */}
                      <div className="my-3 py-2 px-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {stage.enemies.map(e => (
                              <div
                                key={e.id}
                                className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden flex items-center justify-center text-sm"
                                title={e.name}
                              >
                                {e.avatar}
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-slate-300 font-medium">
                            {stage.enemies.length} Hostiles
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">RECOMMENDED</span>
                          <span className={`text-xs font-mono font-bold ${isReady ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {stage.recommendedPower} PWR
                          </span>
                        </div>
                      </div>

                      {/* Rewards Preview & Launch */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-400">First Clear:</span>
                          <span className="text-amber-300 font-bold">+{stage.firstClearRewards.astra} Astra</span>
                          <span className="text-cyan-300 font-bold">+{stage.firstClearRewards.xp} XP</span>
                        </div>

                        <button
                          type="button"
                          className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-600/30 flex items-center gap-1"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" /> Prep Squad
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 3: SQUAD SELECTION & PREP */}
          {/* ============================================================== */}
          {currentView === 'SQUAD_PREP' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                    STAGE PREPARATION
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {selectedStage.title} — {selectedStage.subtitle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Location: <span className="text-slate-200">{selectedStage.location}</span> • Recommended: <span className="text-amber-300 font-mono font-bold">{selectedStage.recommendedPower} PWR</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">YOUR SQUAD POWER</span>
                    <span className="text-base font-bold font-mono text-emerald-400">{getSquadPower()} PWR</span>
                  </div>
                  <button
                    type="button"
                    disabled={selectedSquadIds.length === 0}
                    onClick={handleStartBattle}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
                  >
                    <Swords className="w-4 h-4" /> Launch Expedition
                  </button>
                </div>
              </div>

              {/* Active 3 Hero Slots */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                  Active Expedition Squad ({selectedSquadIds.length}/3 Heroes Selected)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[0, 1, 2].map(slotIdx => {
                    const charId = selectedSquadIds[slotIdx];
                    const char = ALL_CHARACTERS.find(c => c.id === charId);

                    return (
                      <div
                        key={slotIdx}
                        className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                          char
                            ? 'bg-slate-800/60 border-cyan-500/40'
                            : 'bg-slate-900/40 border-dashed border-slate-700/60'
                        }`}
                      >
                        {char ? (
                          <>
                            <img
                              src={char.imageUrl}
                              alt={char.name}
                              className="w-12 h-12 rounded-xl object-cover border border-cyan-400/40"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 uppercase">
                                {char.grade} GRADE
                              </span>
                              <h5 className="text-sm font-bold text-white truncate mt-0.5">{char.name}</h5>
                              <span className="text-xs text-emerald-400 font-mono font-bold">
                                {char.overallPower ? char.overallPower * 25 : 500} PWR
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleToggleSquadMember(char.id)}
                              className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                            >
                              ✕
                            </button>
                          </>
                        ) : (
                          <div className="w-full text-center py-3 text-xs text-slate-500">
                            Empty Squad Slot. Select a hero below.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Roster Picker */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                  Your Available Heroes Roster
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                  {(user?.ownedCharacters || []).map(id => {
                    const char = ALL_CHARACTERS.find(c => c.id === id);
                    if (!char) return null;
                    const isSelected = selectedSquadIds.includes(char.id);

                    return (
                      <div
                        key={id}
                        onClick={() => handleToggleSquadMember(char.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center ${
                          isSelected
                            ? 'bg-cyan-950/60 border-cyan-400 ring-2 ring-cyan-400/30'
                            : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-500'
                        }`}
                      >
                        <img
                          src={char.imageUrl}
                          alt={char.name}
                          className="w-14 h-14 rounded-lg object-cover mb-1.5 border border-white/10"
                        />
                        <span className="text-xs font-bold text-white truncate w-full">{char.name}</span>
                        <span className="text-[10px] text-cyan-300 font-mono">
                          {char.overallPower ? char.overallPower * 25 : 500} PWR
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-bold text-emerald-400 mt-1">✓ IN SQUAD</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 4: BATTLE ARENA */}
          {/* ============================================================== */}
          {currentView === 'BATTLE_ARENA' && (
            <div className="h-full flex flex-col justify-between space-y-4">
              
              {/* Battle Header */}
              <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-bold uppercase">{selectedStage.title}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 font-mono">ROUND {combatRound}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    currentTurn === 'PLAYER'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {currentTurn === 'PLAYER' ? 'YOUR SQUAD TURN' : 'ENEMY COUNTER-ATTACK'}
                  </span>
                </div>
              </div>

              {/* Combatants Arena */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-auto">
                
                {/* Left Side: Player Squad */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                    COMMANDER SQUAD (YOU)
                  </span>
                  {playerFighters.map((fighter, idx) => {
                    const isActive = currentTurn === 'PLAYER' && idx === activeFighterIndex;
                    const hpPercent = Math.max(0, Math.min(100, (fighter.currentHp / fighter.maxHp) * 100));

                    return (
                      <div
                        key={fighter.id}
                        className={`p-3 rounded-2xl border transition-all ${
                          isActive
                            ? 'bg-cyan-950/50 border-cyan-400 shadow-lg shadow-cyan-950/50'
                            : fighter.currentHp <= 0
                            ? 'bg-slate-900/30 border-slate-800 opacity-40'
                            : 'bg-slate-800/40 border-slate-700/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={fighter.imageUrl}
                            alt={fighter.name}
                            className="w-12 h-12 rounded-xl object-cover border border-white/20"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-white">{fighter.name}</span>
                              <span className="text-xs font-mono font-bold text-slate-300">
                                {fighter.currentHp} / {fighter.maxHp} HP
                              </span>
                            </div>

                            {/* HP Bar */}
                            <div className="w-full bg-slate-950 rounded-full h-2 mt-1.5 overflow-hidden border border-slate-700">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  hpPercent > 50 ? 'bg-emerald-500' : hpPercent > 25 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${hpPercent}%` }}
                              />
                            </div>

                            {/* Energy Bar */}
                            <div className="w-full bg-slate-950 rounded-full h-1 mt-1 overflow-hidden">
                              <div
                                className="h-full bg-cyan-400 transition-all duration-300"
                                style={{ width: `${fighter.energy}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Side: Hostile Squad */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block text-right">
                    HOSTILE ENCOUNTERS (AI)
                  </span>
                  {enemyFighters.map((enemy) => {
                    const hpPercent = Math.max(0, Math.min(100, (enemy.currentHp / enemy.maxHp) * 100));

                    return (
                      <div
                        key={enemy.id}
                        className={`p-3 rounded-2xl border transition-all ${
                          enemy.currentHp <= 0
                            ? 'bg-slate-900/30 border-slate-800 opacity-40'
                            : 'bg-slate-800/40 border-rose-500/30'
                        }`}
                      >
                        <div className="flex items-center gap-3 justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-white">{enemy.name}</span>
                              <span className="text-xs font-mono font-bold text-slate-300">
                                {enemy.currentHp} / {enemy.maxHp} HP
                              </span>
                            </div>

                            {/* HP Bar */}
                            <div className="w-full bg-slate-950 rounded-full h-2 mt-1.5 overflow-hidden border border-slate-700">
                              <div
                                className="h-full bg-rose-500 transition-all duration-300"
                                style={{ width: `${hpPercent}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1 block truncate">
                              Specialty: {enemy.powers}
                            </span>
                          </div>

                          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-rose-500/40 flex items-center justify-center text-2xl">
                            {enemy.avatar}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Combat Action Controls */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Active Hero: <strong className="text-white">{playerFighters[activeFighterIndex]?.name || 'Hero'}</strong>
                  </span>
                  <div className="text-xs text-slate-500 font-mono">
                    Select tactical command
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    disabled={currentTurn !== 'PLAYER' || isProcessingTurn}
                    onClick={() => handlePlayerAction('ATTACK')}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold text-xs flex flex-col items-center gap-1 transition-all border border-slate-700"
                  >
                    <Swords className="w-4 h-4 text-cyan-400" />
                    <span>Kinetic Strike</span>
                  </button>

                  <button
                    type="button"
                    disabled={currentTurn !== 'PLAYER' || isProcessingTurn}
                    onClick={() => handlePlayerAction('SPECIAL')}
                    className="p-3 rounded-xl bg-gradient-to-r from-blue-900/60 to-indigo-900/60 hover:from-blue-800 hover:to-indigo-800 disabled:opacity-50 text-white font-bold text-xs flex flex-col items-center gap-1 transition-all border border-blue-500/40"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Signature Ability</span>
                  </button>

                  <button
                    type="button"
                    disabled={currentTurn !== 'PLAYER' || isProcessingTurn}
                    onClick={() => handlePlayerAction('DEFEND')}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold text-xs flex flex-col items-center gap-1 transition-all border border-slate-700"
                  >
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Shield & Heal</span>
                  </button>

                  <button
                    type="button"
                    disabled={currentTurn !== 'PLAYER' || isProcessingTurn || (playerFighters[activeFighterIndex]?.energy || 0) < 100}
                    onClick={() => handlePlayerAction('ULTIMATE')}
                    className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 disabled:opacity-40 text-white font-bold text-xs flex flex-col items-center gap-1 transition-all shadow-lg shadow-purple-600/30"
                  >
                    <Flame className="w-4 h-4 text-yellow-300" />
                    <span>Cosmic Ultimate (100% NRG)</span>
                  </button>
                </div>

                {/* Combat Log */}
                <div className="bg-slate-900/80 p-2 rounded-xl text-[11px] text-slate-400 font-mono max-h-16 overflow-y-auto">
                  {combatLogs[0]}
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 5: VICTORY & REWARDS SCREEN */}
          {/* ============================================================== */}
          {currentView === 'VICTORY_SCREEN' && battleResult && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 max-w-lg mx-auto">
              {battleResult.victory ? (
                <>
                  <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl animate-bounce shadow-2xl shadow-amber-500/30">
                    🏆
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-wider font-display">
                      EXPEDITION TRIUMPH!
                    </h3>
                    <p className="text-xs text-cyan-300 mt-1">
                      {selectedStage.title} successfully cleared!
                    </p>
                  </div>

                  {/* Stars Awarded */}
                  <div className="flex items-center gap-3">
                    {[1, 2, 3].map(s => (
                      <div
                        key={s}
                        className={`p-3 rounded-2xl border ${
                          s <= battleResult.stars
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 scale-110 shadow-lg shadow-amber-500/30'
                            : 'bg-slate-800/40 border-slate-700 text-slate-600'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </div>
                    ))}
                  </div>

                  {/* Rewards Breakdown */}
                  <div className="w-full bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3 text-left">
                    <span className="text-xs font-bold text-slate-400 uppercase block tracking-wider">
                      REWARDS SECURED:
                    </span>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <div>
                          <span className="text-slate-400 block text-[10px]">COMMANDER XP</span>
                          <span className="text-white font-bold">+{battleResult.rewards?.xp || 150} XP</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                        <Gem className="w-4 h-4 text-amber-400" />
                        <div>
                          <span className="text-slate-400 block text-[10px]">ASTRA CURRENCY</span>
                          <span className="text-white font-bold">+{battleResult.rewards?.astra || 300} Astra</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Unlocked Chapter Alert */}
                  {battleResult.unlockedNextChapter && (
                    <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-pulse">
                      <Crown className="w-4 h-4 text-emerald-400" />
                      <span>CLIMAX VICTORY! Chapter {selectedChapter.number + 1} is now unlocked!</span>
                    </div>
                  )}

                  <div className="flex gap-3 w-full pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentView('STAGE_SELECT')}
                      className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                    >
                      Stage Select
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentView('CHAPTER_MAP')}
                      className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 transition-all"
                    >
                      World Map
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-3xl bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-4xl">
                    💀
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-wider">
                      SQUAD DEFEATED
                    </h3>
                    <p className="text-xs text-red-300 mt-1">
                      The enemy overwhelmed your defenses. Upgrade hero builds and try again.
                    </p>
                  </div>
                  <div className="flex gap-3 w-full pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentView('STAGE_SELECT')}
                      className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      Retreat to Stages
                    </button>
                    <button
                      type="button"
                      onClick={handleStartBattle}
                      className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/30"
                    >
                      Retry Expedition
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
