import React from 'react';
import { Character } from '../../../types/game';
import { CharacterPortrait } from '../../common/CharacterPortrait';
import { Shield, Zap, Sparkles, Flame, Swords } from 'lucide-react';

interface Props {
  character: Character;
  side: 'p1' | 'p2';
  isAttacking?: boolean;
  isTakingHit?: boolean;
  isDefending?: boolean;
  isSuperActive?: boolean;
  isDefeated?: boolean;
  activeSkillName?: string | null;
  damageTaken?: number | null;
}

export function Fighter2DSprite({
  character,
  side,
  isAttacking = false,
  isTakingHit = false,
  isDefending = false,
  isSuperActive = false,
  isDefeated = false,
  activeSkillName = null,
  damageTaken = null
}: Props) {
  const isP1 = side === 'p1';

  const getAnimationClass = () => {
    if (isDefeated) return 'opacity-50 grayscale contrast-125 transition-all duration-500';
    if (isTakingHit) return 'animate-recoil brightness-125';
    if (isAttacking) return isP1 ? 'animate-combat-p1' : 'animate-combat-p2';
    return '';
  };

  const getGradeTheme = () => {
    switch (character.grade) {
      case 'MYTHIC':
        return {
          auraColor: 'rgba(168,85,247,0.3)',
          glowRing: 'ring-1 ring-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
          badgeBg: 'bg-purple-950/90 border-purple-400 text-purple-200',
          flame: 'from-purple-600 via-fuchsia-500 to-indigo-600'
        };
      case 'A':
        return {
          auraColor: 'rgba(239,68,68,0.3)',
          glowRing: 'ring-1 ring-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.35)]',
          badgeBg: 'bg-red-950/90 border-red-400 text-red-200',
          flame: 'from-red-600 via-amber-500 to-orange-600'
        };
      case 'B':
        return {
          auraColor: 'rgba(56,189,248,0.25)',
          glowRing: 'ring-1 ring-cyan-400/50 shadow-[0_0_12px_rgba(56,189,248,0.3)]',
          badgeBg: 'bg-cyan-950/90 border-cyan-400 text-cyan-200',
          flame: 'from-cyan-500 via-teal-500 to-emerald-600'
        };
      default:
        return {
          auraColor: 'rgba(16,185,129,0.2)',
          glowRing: 'ring-1 ring-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.25)]',
          badgeBg: 'bg-emerald-950/90 border-emerald-400 text-emerald-200',
          flame: 'from-emerald-500 via-teal-500 to-green-600'
        };
    }
  };

  const theme = getGradeTheme();

  return (
    <div className="relative flex flex-col items-center select-none group">
      {/* 1. Behind-Fighter Subtle Ambient Edge Backlight (Refined, not blinding) */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 blur-lg opacity-30"
        style={{
          background: `radial-gradient(circle at center, ${theme.auraColor} 0%, transparent 75%)`
        }}
      />

      {/* 2. Defensive Kinetic Bubble Shield */}
      {isDefending && (
        <div className="absolute -inset-4 rounded-3xl border-2 border-cyan-300 bg-cyan-400/10 shadow-[0_0_25px_rgba(34,211,238,0.5)] z-20 pointer-events-none animate-pulse" />
      )}

      {/* 3. Floating Combat Arcade Damage Pop */}
      {isTakingHit && (
        <div className="absolute -top-10 z-50 pointer-events-none animate-damage-pop">
          <div className="flex items-center gap-1 px-3.5 py-1 rounded-2xl bg-black/95 border-2 border-red-500 shadow-[0_0_20px_#EF4444] text-red-400 font-heading font-black text-base sm:text-xl tracking-wider">
            <Flame className="w-4 h-4 text-red-500 animate-bounce fill-current" />
            <span>{damageTaken ? `-${damageTaken} HP` : 'HIT!'}</span>
          </div>
        </div>
      )}

      {/* 4. 2D Animated Fighter Avatar Body */}
      <div className={`relative z-10 transition-transform duration-300 ${getAnimationClass()}`}>
        
        {/* Core Character Portrait - Crystal clear & sharp */}
        <div className="relative">
          <CharacterPortrait
            character={character}
            size="xl"
            showBadge={true}
            className={`shadow-xl transition-all duration-300 border border-white/20 ${
              isSuperActive 
                ? 'ring-2 ring-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)]' 
                : isAttacking
                ? `${theme.glowRing}`
                : isTakingHit 
                ? 'brightness-125' 
                : ''
            }`}
          />

          {/* Floating Super Skill Indicator Pill */}
          {activeSkillName && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap">
              <div className="bg-purple-950/95 text-purple-200 border-2 border-purple-400 px-3.5 py-1 rounded-full text-xs font-heading font-black uppercase tracking-wider shadow-glow-cosmic flex items-center gap-1.5 animate-bounce">
                <Zap className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                <span>{activeSkillName}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Dynamic Fighter Arena Ground Platform */}
      <div 
        className={`w-36 sm:w-48 h-6 rounded-full blur-md -mt-2 transition-all duration-300 ${
          isAttacking 
            ? 'scale-150 bg-amber-400/70 shadow-[0_0_35px_#F59E0B]' 
            : isTakingHit
            ? 'scale-90 bg-red-600/70 shadow-[0_0_25px_#EF4444]'
            : 'bg-black/70 border border-white/20'
        }`}
      />
    </div>
  );
}
