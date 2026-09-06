import React from 'react';
import { Character } from '../../types/game';
import { CharacterImage } from '../common/CharacterImage';
import { Shield, Heart } from 'lucide-react';

export interface BattleFighterCardProps {
  character: Character | any;
  side?: 'p1' | 'p2' | 'player' | 'opponent' | 'boss';
  currentHp?: number;
  maxHp?: number;
  overallPower?: number;
  level?: number;
  playerName?: string;
  playerAvatar?: string;
  isReady?: boolean;
  isAttacking?: boolean;
  isTakingHit?: boolean;
  isDefending?: boolean;
  isDefeated?: boolean;
  isSuperActive?: boolean;
  damageTaken?: number | null;
  statusBadge?: React.ReactNode;
  children?: React.ReactNode; // Attack & ability buttons directly underneath!
  className?: string;
  compact?: boolean;
}

export function BattleFighterCard({
  character,
  side = 'p1',
  currentHp,
  maxHp = 100,
  overallPower,
  level,
  playerName,
  playerAvatar,
  isReady,
  isAttacking = false,
  isTakingHit = false,
  isDefending = false,
  isDefeated = false,
  isSuperActive = false,
  damageTaken = null,
  statusBadge,
  children,
  className = '',
  compact = false,
}: BattleFighterCardProps) {
  const isP1 = side === 'p1' || side === 'player';
  const effectiveHp = currentHp !== undefined ? currentHp : (character.currentHp !== undefined ? character.currentHp : 100);
  const effectiveMaxHp = maxHp || character.maxHp || 100;
  const hpPercent = Math.max(0, Math.min(100, Math.round((effectiveHp / effectiveMaxHp) * 100)));
  const effectivePower = overallPower !== undefined ? overallPower : (character.overallPower || 80);
  const effectiveDefeated = isDefeated || effectiveHp <= 0;

  const getHpGradient = () => {
    if (hpPercent > 60) return isP1 ? 'from-emerald-500 to-green-400' : 'from-emerald-500 to-teal-400';
    if (hpPercent > 25) return 'from-amber-500 to-yellow-400';
    return 'from-red-600 to-rose-500';
  };

  const getCardBorder = () => {
    if (isSuperActive) return 'border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.5)] ring-2 ring-amber-400/50';
    if (isP1) return 'border-red-500/50 shadow-[0_10px_30px_rgba(230,36,41,0.25)]';
    if (side === 'boss') return 'border-purple-500/60 shadow-[0_10px_35px_rgba(168,85,247,0.3)]';
    return 'border-amber-500/50 shadow-[0_10px_30px_rgba(245,158,11,0.25)]';
  };

  const getAnimationClass = () => {
    if (effectiveDefeated) return 'opacity-50 grayscale contrast-125';
    if (isTakingHit) return 'animate-shake brightness-125';
    if (isAttacking) return isP1 ? 'translate-x-3 sm:translate-x-6' : '-translate-x-3 sm:-translate-x-6';
    return '';
  };

  return (
    <div
      className={`battle-fighter-card relative flex flex-col rounded-3xl bg-[#0C0F17] border ${getCardBorder()} p-3 sm:p-5 transition-all duration-300 select-none ${getAnimationClass()} ${className}`}
    >
      {/* 1. Header Row: Player Name / Ready Tag & Power */}
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-2.5 mb-3">
        <div className="flex items-center gap-1.5 min-w-0">
          {playerAvatar && (
            <span className="text-base sm:text-lg shrink-0 drop-shadow">{playerAvatar}</span>
          )}
          <span
            className={`text-[10px] sm:text-xs font-black uppercase px-2.5 py-0.5 rounded-full border truncate ${
              isP1
                ? 'bg-red-950/80 text-red-200 border-red-500/40'
                : side === 'boss'
                ? 'bg-purple-950/80 text-purple-200 border-purple-500/40'
                : 'bg-amber-950/80 text-amber-200 border-amber-500/40'
            }`}
          >
            {playerName || (isP1 ? 'PLAYER 1' : side === 'boss' ? 'TITAN BOSS' : 'PLAYER 2')}
          </span>
          {isReady !== undefined && (
            <span
              className={`text-[9px] font-black px-1.5 py-0.2 rounded-full font-mono uppercase ${
                isReady ? 'bg-emerald-500 text-black animate-pulse' : 'bg-stone-800 text-stone-400'
              }`}
            >
              {isReady ? 'READY' : 'CHOOSING'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[10px] sm:text-xs font-mono font-black text-amber-300 bg-black/70 px-2 py-0.5 rounded-lg border border-amber-500/30">
            ⚡ {effectivePower} PWR
          </span>
        </div>
      </div>

      {/* 2. Main Artwork Container - Large, sharp, clear, never shrunken */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-black/90 border border-white/10 shadow-inner group">
        {/* Floating Damage Numbers */}
        {damageTaken != null && damageTaken > 0 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-bounce">
            <div className="bg-red-600 text-white font-heading font-black text-sm sm:text-base px-3 py-1 rounded-full border-2 border-white shadow-[0_0_20px_rgba(230,36,41,0.9)] whitespace-nowrap">
              💥 -{damageTaken} HP!
            </div>
          </div>
        )}

        {/* Defense Shield Indicator */}
        {isDefending && (
          <div className="absolute inset-0 bg-cyan-500/20 border-2 border-cyan-400 rounded-2xl z-20 pointer-events-none flex items-center justify-center">
            <div className="bg-cyan-950/90 text-cyan-300 font-heading font-black text-xs px-3 py-1 rounded-full border border-cyan-400 shadow-lg flex items-center gap-1.5 animate-pulse">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>DEFENSE SHIELD (50% GUARD)</span>
            </div>
          </div>
        )}

        {/* K.O. Stamp Overlay */}
        {effectiveDefeated && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs rounded-2xl flex items-center justify-center z-30 pointer-events-none">
            <div className="bg-red-600 text-white font-heading font-black text-2xl sm:text-3xl px-6 py-2 rounded-2xl border-4 border-white shadow-[0_0_30px_rgba(230,36,41,0.9)] rotate-[-6deg]">
              💥 K.O.
            </div>
          </div>
        )}

        {/* Grade Ribbon (Top-Left) */}
        <div className="absolute top-2 left-2 z-10 pointer-events-none">
          <span
            className={`text-[9px] sm:text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-lg shadow-md border ${
              character.grade === 'MYTHIC'
                ? 'bg-purple-950/90 text-amber-300 border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                : character.grade === 'A'
                ? 'bg-red-950/90 text-red-200 border-red-500/60'
                : character.grade === 'B'
                ? 'bg-cyan-950/90 text-cyan-200 border-cyan-500/60'
                : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/60'
            }`}
          >
            {character.grade === 'MYTHIC' ? '★ MYTHIC' : `GRADE ${character.grade}`}
          </span>
        </div>

        {/* Hero Artwork - High Resolution, correctly proportioned */}
        <div className={`w-full ${compact ? 'h-40 sm:h-48' : 'h-48 sm:h-60 md:h-72 lg:h-80'} relative`}>
          <CharacterImage
            character={character}
            aspect="fill"
            fit="cover"
            glow={false}
            hoverZoom={false}
            priority={true}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Status Badge Overlay */}
        {statusBadge && (
          <div className="absolute bottom-2 left-2 right-2 z-10">
            {statusBadge}
          </div>
        )}
      </div>

      {/* 3. Character Info & Identity */}
      <div className="mt-3 space-y-1 text-left">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-heading font-black text-base sm:text-xl text-white uppercase tracking-wide truncate">
            {character.name}
          </h3>
          {level && (
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/70 border border-amber-500/30 px-1.5 py-0.2 rounded shrink-0">
              LVL {level}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate">
          <span className="text-cyan-300 font-bold">
            {character.factions?.[0] || character.alignment || 'Multiverse'}
          </span>
          {character.alias && (
            <>
              <span>•</span>
              <span className="truncate italic">"{character.alias}"</span>
            </>
          )}
        </div>
      </div>

      {/* 4. Health Bar Container */}
      <div className="mt-3 space-y-1.5 bg-black/60 p-2.5 rounded-2xl border border-white/[0.08]">
        <div className="flex justify-between items-center text-xs font-black">
          <span className="text-slate-300 flex items-center gap-1 text-[11px]">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>VITALITY</span>
          </span>
          <span className="font-mono text-[11px] text-emerald-400">
            {effectiveHp} / {effectiveMaxHp} HP ({hpPercent}%)
          </span>
        </div>
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/10">
          <div
            className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ${getHpGradient()}`}
            style={{ width: `${hpPercent}%` }}
          />
        </div>
      </div>

      {/* 5. ATTACK + ABILITY CONTROLS DIRECTLY UNDERNEATH */}
      {children && (
        <div className="mt-3.5 pt-3 border-t border-white/[0.08] space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}
