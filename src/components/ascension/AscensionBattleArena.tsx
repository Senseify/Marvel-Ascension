import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { Character } from '../../types/game';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../hooks/useSocket';
import { soundManager } from '../../audio/soundManager';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { BattlePresentation3D } from '../battle/BattlePresentation3D';
import { getSkillsForCharacter } from '../../data/skills/characterSkills';
import { 
  Swords, Shield, Zap, Sparkles, Flame, 
  RotateCcw, Award, Check, AlertCircle, Users, Activity, Globe
} from 'lucide-react';

export type PvPFormat = 
  | '1v1' | '2v2' | '3v3' | '4v4' | '5v5' 
  | '1v2' | '1v3' | '1v4' | '1v5' 
  | '2v3' | '2v4' | '2v5' 
  | '3v4' | '3v5' | '4v5';

export function AscensionBattleArena() {
  const { user, refreshProfile } = useAuth();
  const socket = useSocket();
  const [selectedFormat, setSelectedFormat] = useState<PvPFormat>('1v1');
  const [battleState, setBattleState] = useState<'SELECT_TEAM' | 'MATCHMAKING' | 'FIGHTING' | 'VICTORY' | 'DEFEAT'>('SELECT_TEAM');

  const [playerTeam, setPlayerTeam] = useState<Character[]>([]);
  const [enemyTeam, setEnemyTeam] = useState<Character[]>([]);
  const [opponentName, setOpponentName] = useState<string>('Online Challenger');
  const [combatLogs, setCombatLogs] = useState<string[]>([]);
  const [lastMatchRewards, setLastMatchRewards] = useState<{ astra: number; xp: number } | null>(null);
  const [isResolving, setIsResolving] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'ATTACK' | 'SPECIAL' | 'DEFEND' | 'ARTIFACT'>('ATTACK');
  const [selectedSkillId, setSelectedSkillId] = useState<string | undefined>();
  const [onlineMode, setOnlineMode] = useState<'casual' | 'custom'>('casual');
  const [customRoomCode, setCustomRoomCode] = useState('');
  const matchTokenRef = useRef<string>('');

  const ownedCharIds = useMemo(() => new Set(user?.ownedCharacters || []), [user?.ownedCharacters]);
  const availableRoster = useMemo(() => ALL_CHARACTERS.filter(c => ownedCharIds.has(c.id)), [ownedCharIds]);

  useEffect(() => {
    const state = socket.ascensionState;
    if (!state) return;
    const myId = socket.socketId || socket.socket?.id;
    if (state.phase === 'MATCHMAKING') setBattleState('MATCHMAKING');
    if (state.phase === 'BATTLE') setBattleState('FIGHTING');
    if (state.phase === 'RESULT') {
      setBattleState(state.winnerId === myId ? 'VICTORY' : 'DEFEAT');
      const reward = state.rewards?.[myId || ''];
      if (reward) setLastMatchRewards({ astra: reward.astraAwarded, xp: reward.xpAwarded });
    }
    if (state.phase === 'LOBBY') setBattleState('SELECT_TEAM');
    const me = state.players.find(player => player.id === myId);
    const rival = state.players.find(player => player.id !== myId);
    if (me?.team?.length) setPlayerTeam(me.team);
    if (rival) {
      setOpponentName(rival.name);
      setEnemyTeam(rival.team);
    }
    if (state.combatLogs.length) setCombatLogs(state.combatLogs.slice(-20));
  }, [socket.ascensionState, socket.socket, socket.socketId]);

  useEffect(() => {
    if (socket.ascensionResult) {
      refreshProfile();
      socket.setAscensionResult(null);
    }
  }, [socket.ascensionResult, refreshProfile, socket]);

  // Derive Team Sizes based on format
  const [team1Size, team2Size] = useMemo(() => {
    if (selectedFormat.includes('v')) {
      const parts = selectedFormat.split('v').map(Number);
      return [parts[0] || 1, parts[1] || 1];
    }
    return [1, 1];
  }, [selectedFormat]);

  const toggleSelectHero = (hero: Character) => {
    soundManager.playClick();
    if (playerTeam.some(c => c.id === hero.id)) {
      setPlayerTeam(prev => prev.filter(c => c.id !== hero.id));
    } else {
      if (playerTeam.length < team1Size) {
        setPlayerTeam(prev => [...prev, hero]);
      }
    }
  };

  const handleStartOnlineMatchmaking = () => {
    if (playerTeam.length !== team1Size) return;

    soundManager.playClick();
    setBattleState('MATCHMAKING');
    matchTokenRef.current = `ascension-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    socket.queueAscension('casual', selectedFormat, playerTeam.map(hero => hero.id));
  };

  const mySocketId = socket.socketId || socket.socket?.id;
  const isActionLocked = Boolean(mySocketId && socket.ascensionState?.pendingActions?.[mySocketId]);
  const activeHero = playerTeam[0] || ALL_CHARACTERS[0];
  const activeSkills = getSkillsForCharacter(activeHero);
  const signatureSkill = activeSkills[activeSkills.length - 1];
  const activeLevel = user?.characterLevels?.[activeHero.id] || 1;
  const signatureUnlocked = Boolean(signatureSkill && activeLevel >= signatureSkill.requiredLevel);

  const handleExecuteTurnAction = async () => {
    if (isResolving || isActionLocked || battleState !== 'FIGHTING') return;
    setIsResolving(true);
    soundManager.playAttackHit();
    await socket.submitAscensionAction(selectedAction, 0, selectedAction === 'SPECIAL' ? selectedSkillId : undefined);
    setIsResolving(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#0E1017] border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-950/80 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Globe className="w-3 h-3 text-amber-400" /> Online Multiplayer Only
            </span>
            <span className="text-xs text-purple-300 font-mono">Live Cross-Platform Queue</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-wide mt-1.5">
            Ascension Battle Arena
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-0.5 leading-relaxed">
            Queue into real online multiplayer battles. Deploy custom loadouts with tactical relics and character-specific signature skills.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-[#12141C] border border-amber-500/30 text-center shadow-sm">
            <div className="text-[10px] text-slate-400 font-mono font-bold uppercase">Multiplayer Wins</div>
            <div className="text-xl font-heading font-black text-amber-300">
              {user?.wins || 0}
            </div>
          </div>
        </div>
      </div>

      {/* 1. SELECT TEAM STATE */}
      {battleState === 'SELECT_TEAM' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Format Picker */}
          <div className="p-5 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4 shadow-lg">
            <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-400" />
              <span>Choose Online Format</span>
            </h3>

            {/* Standard Formats */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase font-mono">Standard Symmetric:</div>
              <div className="grid grid-cols-5 gap-1.5">
                {(['1v1', '2v2', '3v3', '4v4', '5v5'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedFormat(fmt);
                      setPlayerTeam([]);
                    }}
                    className={`py-2 rounded-xl text-xs font-heading font-black transition-all cursor-pointer ${
                      selectedFormat === fmt
                        ? 'btn-primary-cinematic scale-105'
                        : 'bg-[#12141C] text-slate-400 hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Asymmetric Custom Combos */}
            <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
              <div className="text-[11px] font-bold text-amber-400 uppercase font-mono">Custom Asymmetric Formats:</div>
              <div className="grid grid-cols-3 gap-1.5">
                {(['1v2', '1v3', '1v4', '1v5', '2v3', '2v4', '2v5', '3v4', '3v5', '4v5'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedFormat(fmt);
                      setPlayerTeam([]);
                    }}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedFormat === fmt
                        ? 'bg-amber-500 text-black font-black shadow-glow-amber scale-105'
                        : 'bg-[#12141C] text-slate-400 hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Team Preview */}
            <div className="p-3 rounded-xl bg-[#12141C] border border-white/[0.06] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Team Size Required:</span>
                <span className="font-bold text-purple-300">{team1Size} Hero{team1Size > 1 ? 'es' : ''}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Enemy Vanguard Size:</span>
                <span className="font-bold text-rose-400">{team2Size} Hero{team2Size > 1 ? 'es' : ''}</span>
              </div>
            </div>

            {/* Launch Online Matchmaking */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOnlineMode('casual')}
                className={`py-2 rounded-xl text-[10px] font-black uppercase border cursor-pointer ${onlineMode === 'casual' ? 'bg-purple-950/80 text-purple-300 border-purple-400' : 'text-slate-400 border-white/10 bg-[#12141C]'}`}
              >
                Quick Match
              </button>
              <button
                type="button"
                onClick={() => setOnlineMode('custom')}
                className={`py-2 rounded-xl text-[10px] font-black uppercase border cursor-pointer ${onlineMode === 'custom' ? 'bg-amber-950/80 text-amber-300 border-amber-400' : 'text-slate-400 border-white/10 bg-[#12141C]'}`}
              >
                Custom Room
              </button>
            </div>
            <button
              type="button"
              disabled={playerTeam.length !== team1Size}
              onClick={() => {
                if (onlineMode === 'custom') {
                  socket.createAscensionRoom('casual', selectedFormat, playerTeam.map(hero => hero.id));
                } else {
                  handleStartOnlineMatchmaking();
                }
              }}
              className="btn-primary-cinematic w-full py-3.5 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              {playerTeam.length === team1Size ? (onlineMode === 'custom' ? 'CREATE CUSTOM ROOM' : `🌐 FIND ONLINE ${selectedFormat} MATCH`) : `Select ${team1Size - playerTeam.length} More Hero${team1Size - playerTeam.length > 1 ? 'es' : ''}`}
            </button>
            {onlineMode === 'custom' && (
              <div className="flex gap-2">
                <input
                  value={customRoomCode}
                  onChange={event => setCustomRoomCode(event.target.value.toUpperCase())}
                  placeholder="ASC-ROOM-123456"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-[10px] font-mono text-white"
                />
                <button
                  type="button"
                  disabled={!customRoomCode || playerTeam.length !== team1Size}
                  onClick={() => socket.joinAscensionRoom(customRoomCode, playerTeam.map(hero => hero.id))}
                  className="rounded-xl border border-amber-400/50 px-3 py-2 text-[10px] font-black text-amber-300 disabled:opacity-40"
                >
                  JOIN
                </button>
              </div>
            )}
            {socket.ascensionState?.phase === 'LOBBY' && (
              <div className="rounded-xl border border-amber-400/30 bg-black/40 p-3 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-amber-300">
                  <span>ROOM {socket.ascensionState.roomId}</span>
                  <span>{socket.ascensionState.players.length}/10 PLAYERS</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {socket.ascensionState.players.map(player => (
                    <span key={player.id} className={`rounded-lg px-2 py-1 text-[10px] ${player.isReady ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-900 text-slate-400'}`}>
                      {player.name} {player.isReady ? '✓' : '…'}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => {
                    const myId = socket.socketId || socket.socket?.id;
                    socket.setAscensionReady(socket.ascensionState?.players.find(player => player.id === myId)?.isReady !== true);
                  }} className="flex-1 rounded-lg bg-emerald-600 py-2 text-[10px] font-black text-white">
                    {socket.ascensionState?.players.find(player => player.id === (socket.socketId || socket.socket?.id))?.isReady ? 'UNREADY' : 'READY'}
                  </button>
                  {socket.ascensionState.hostId === (socket.socketId || socket.socket?.id) && (
                    <button onClick={() => socket.startAscensionBattle()} className="flex-1 rounded-lg bg-amber-500 py-2 text-[10px] font-black text-black">START BATTLE</button>
                  )}
                  <button onClick={() => { socket.leaveAscensionRoom(); setBattleState('SELECT_TEAM'); }} className="rounded-lg border border-rose-400/50 px-3 py-2 text-[10px] font-black text-rose-300">LEAVE</button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Character Selection */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider">
                Select Your Vanguard ({playerTeam.length}/{team1Size})
              </h3>
              <span className="text-xs text-amber-300 font-mono font-bold">
                Owned: {availableRoster.length}
              </span>
            </div>

            {availableRoster.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm">
                No heroes unlocked yet. Purchase heroes in the Astra Shop or claim Battle Pass rewards!
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto pr-1">
                {availableRoster.map(char => {
                  const isSelected = playerTeam.some(c => c.id === char.id);
                  const pwrBoost = user?.characterStatsBoosts[char.id]?.power || 0;
                  const currentLevel = user?.characterLevels[char.id] || 1;

                  return (
                    <div
                      key={char.id}
                      onClick={() => toggleSelectHero(char)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                        isSelected
                          ? 'bg-purple-950/70 border-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-105'
                          : 'bg-[#12141C] border-white/[0.06] hover:border-white/20'
                      }`}
                    >
                      <CharacterPortrait character={char} size="sm" showBadge={false} />
                      <div className="font-heading font-black text-xs text-white mt-1.5 truncate w-full">
                        {char.name}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[9px] bg-[#181B26] text-slate-300 px-1.5 py-0.5 rounded font-mono font-bold">
                          LVL {currentLevel}
                        </span>
                        <span className="text-[10px] text-amber-300 font-mono font-bold">
                          ⚡ {char.overallPower + pwrBoost}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. MATCHMAKING STATE */}
      {battleState === 'MATCHMAKING' && (
        <div className="py-16 text-center bg-[#0E1017] border border-purple-500/40 rounded-3xl shadow-2xl space-y-4 animate-pulse">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(139,92,246,0.5)]">
            🌐
          </div>
          <h3 className="text-2xl font-heading font-black text-white uppercase tracking-wider">
            Searching for Online Match...
          </h3>
          <p className="text-xs text-purple-300 font-mono">
            Connecting to Live Cross-Platform Matchmaking Lobby • Format: {selectedFormat.toUpperCase()}
          </p>
          <button onClick={() => { socket.cancelAscensionQueue(); setBattleState('SELECT_TEAM'); }} className="rounded-xl border border-white/20 bg-[#141722] hover:bg-[#1E2232] px-4 py-2 text-xs font-bold text-slate-300 transition cursor-pointer">
            CANCEL SEARCH
          </button>
        </div>
      )}

      {/* 3. COMBAT STATE */}
      {battleState === 'FIGHTING' && (
        <div className="p-6 rounded-3xl bg-[#0E1017] border border-white/[0.08] shadow-[0_14px_40px_rgba(0,0,0,0.85)] space-y-6">
          {playerTeam[0] && enemyTeam[0] && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="min-w-0 rounded-2xl border border-purple-500/40 bg-[#12141C] p-3">
                <div className="flex items-center gap-3">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-black/60">
                    <CharacterPortrait character={playerTeam[0]} size="fill" aspect="card" showBadge={false} showPowerBadge={false} className="h-full w-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-black uppercase text-white">{playerTeam[0].name}</div>
                    <div className="text-[10px] font-mono text-amber-300">LEVEL {user?.characterLevels?.[playerTeam[0].id] || 1}</div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-black"><div className="h-full w-full bg-emerald-500" /></div>
                    <div className="mt-1 text-[10px] font-mono text-emerald-300">HP {playerTeam[0].currentHp ?? playerTeam[0].maxHp ?? 100}/{playerTeam[0].maxHp ?? 100}</div>
                  </div>
                </div>
              </div>
              <div className="text-center text-2xl font-black text-amber-400">VS</div>
              <div className="min-w-0 rounded-2xl border border-rose-500/40 bg-[#12141C] p-3">
                <div className="flex items-center gap-3">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-black/60">
                    <CharacterPortrait character={enemyTeam[0]} size="fill" aspect="card" showBadge={false} showPowerBadge={false} className="h-full w-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-black uppercase text-white">{enemyTeam[0].name}</div>
                    <div className="text-[10px] font-mono text-amber-300">OPPONENT VANGUARD</div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-black"><div className="h-full w-full bg-rose-500" /></div>
                    <div className="mt-1 text-[10px] font-mono text-rose-300">HP {enemyTeam[0].currentHp ?? enemyTeam[0].maxHp ?? 100}/{enemyTeam[0].maxHp ?? 100}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Player Vanguard */}
            <div className="p-5 rounded-2xl bg-[#12141C] border border-purple-500/40 text-center space-y-2">
              <span className="text-[10px] font-mono font-bold text-purple-300 uppercase">Your Squad</span>
              <div className="text-lg font-heading font-black text-white">
                {playerTeam.map(c => c.name).join(', ')}
              </div>
              <div className="text-sm font-mono font-bold text-amber-300">
                ⚡ PWR {playerTeam.reduce((acc, c) => acc + c.overallPower + (user?.characterStatsBoosts[c.id]?.power || 0), 0)}
              </div>
            </div>

            {/* Enemy Vanguard */}
            <div className="p-5 rounded-2xl bg-[#12141C] border border-rose-500/40 text-center space-y-2">
              <span className="text-[10px] font-mono font-bold text-rose-400 uppercase">Rival: {opponentName}</span>
              <div className="text-lg font-heading font-black text-white">
                {enemyTeam.map(c => c.name).join(', ')}
              </div>
              <div className="text-sm font-mono font-bold text-amber-300">
                ⚡ PWR {enemyTeam.reduce((acc, c) => acc + c.overallPower, 0)}
              </div>
            </div>
          </div>

          {/* Action selection and authoritative lock-in */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-black text-slate-300 uppercase tracking-wider text-center">
              {isActionLocked ? 'ACTION LOCKED — WAITING FOR OPPONENT' : 'CHOOSE ACTION, THEN LOCK IN'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {([
                ['ATTACK', '⚔️ Attack'],
                ['SPECIAL', '💥 Special Strike'],
                ['DEFEND', '🛡️ Defence'],
                ['ARTIFACT', '💎 Relic'],
              ] as const).map(([action, label]) => (
                <button key={action} type="button" onClick={() => { setSelectedAction(action); if (action !== 'SPECIAL') setSelectedSkillId(undefined); }} disabled={isResolving || isActionLocked} className={`rounded-xl border px-3 py-3 text-[10px] font-black uppercase ${selectedAction === action ? 'border-amber-400 bg-amber-950/60 text-amber-200' : 'border-white/10 bg-[#12141C] text-slate-300'} disabled:opacity-50`}>
                  {label}
                </button>
              ))}
              <button type="button" onClick={() => { setSelectedAction('SPECIAL'); setSelectedSkillId(signatureSkill?.id); }} disabled={!signatureUnlocked || isResolving || isActionLocked} className={`rounded-xl border px-3 py-3 text-[10px] font-black uppercase ${selectedSkillId === signatureSkill?.id ? 'border-purple-400 bg-purple-950/60 text-purple-200' : 'border-white/10 bg-[#12141C] text-slate-300'} disabled:cursor-not-allowed disabled:opacity-40`}>
                ✨ Signature Ability
              </button>
            </div>
            {selectedAction === 'SPECIAL' && (
              <select value={selectedSkillId || ''} onChange={event => setSelectedSkillId(event.target.value || undefined)} disabled={isActionLocked || isResolving} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white">
                <option value="">Special Strike</option>
                {activeSkills.filter(skill => activeLevel >= skill.requiredLevel).map(skill => <option key={skill.id} value={skill.id}>{skill.name} • Lv {skill.requiredLevel}</option>)}
              </select>
            )}
            <button type="button" onClick={handleExecuteTurnAction} disabled={isResolving || isActionLocked || (selectedAction === 'SPECIAL' && selectedSkillId === signatureSkill?.id && !signatureUnlocked)} className="w-full rounded-2xl bg-amber-500 py-3 text-xs font-black uppercase tracking-widest text-black disabled:opacity-40">
              {isActionLocked ? 'LOCKED IN' : '🔒 LOCK IN'}
            </button>
          </div>

          {/* Combat Log */}
          <div className="p-4 rounded-xl bg-[#07080B] border border-white/[0.07] space-y-1 font-mono text-xs max-h-40 overflow-y-auto">
            {combatLogs.map((log, i) => (
              <div key={i} className="text-slate-300">{log}</div>
            ))}
          </div>
        </div>
      )}

      {/* 4. VICTORY / DEFEAT STATE */}
      {(battleState === 'VICTORY' || battleState === 'DEFEAT') && (
        <div className="p-8 rounded-3xl bg-[#0E1017] border border-white/[0.08] text-center space-y-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
          <div className="text-5xl">{battleState === 'VICTORY' ? '🏆' : '💀'}</div>
          <h3 className="text-2xl font-heading font-black text-white uppercase tracking-wider">
            {battleState === 'VICTORY' ? 'MATCH VICTORY!' : 'MATCH DEFEAT'}
          </h3>
          <div className="flex justify-center gap-4 text-xs font-mono font-bold">
            <span className="text-amber-300">✨ +{(lastMatchRewards?.astra || 0).toLocaleString()} ASTRA</span>
            <span className="text-purple-300">⚡ +{lastMatchRewards?.xp || 0} XP</span>
          </div>
          <button
            onClick={() => setBattleState('SELECT_TEAM')}
            className="btn-primary-cinematic px-6 py-2.5 rounded-xl text-xs uppercase font-black cursor-pointer shadow-md"
          >
            Return to Arena
          </button>
        </div>
      )}
    </div>
  );
}
