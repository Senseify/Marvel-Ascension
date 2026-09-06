import React from 'react';
import { Character, CharacterGrade } from '../../types/game';
import { Zap } from 'lucide-react';
import { CharacterImage } from './CharacterImage';

export interface CharacterPortraitProps {
  character: Character;
  className?: string;
  size?: 'avatar' | 'sm' | 'md' | 'lg' | 'xl' | 'fill';
  aspect?: 'card' | 'square' | 'fill' | 'auto';
  showBadge?: boolean;
  showPowerBadge?: boolean;
  hoverZoom?: boolean;
  priority?: boolean;
  fit?: 'cover' | 'contain';
}

export function CharacterPortrait({
  character,
  className = '',
  size = 'md',
  aspect,
  showBadge = true,
  showPowerBadge = true,
  hoverZoom = true,
  priority = false,
  fit = 'cover'
}: CharacterPortraitProps) {
  const hasCustomDimensions =
    className.includes('w-') || className.includes('h-') || className.includes('aspect-');

  const getDimensions = () => {
    if (hasCustomDimensions) {
      return '';
    }
    switch (size) {
      case 'avatar':
        return 'w-10 h-10 rounded-xl';
      case 'sm':
        return 'w-20 aspect-[3/4] sm:w-24 rounded-xl';
      case 'md':
        return 'w-28 aspect-[3/4] sm:w-36 rounded-2xl';
      case 'lg':
        return 'w-36 aspect-[3/4] sm:w-44 rounded-2xl';
      case 'xl':
        return 'w-48 aspect-[3/4] sm:w-60 rounded-2xl';
      case 'fill':
        return 'w-full h-full rounded-xl';
      default:
        return 'w-28 aspect-[3/4] sm:w-36 rounded-2xl';
    }
  };

  const getBorderGlow = (grade: CharacterGrade) => {
    if (className.includes('border-none') || className.includes('no-border')) {
      return 'border border-white/[0.08]';
    }
    switch (grade) {
      case 'MYTHIC':
        return 'border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/20';
      case 'A':
        return 'border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.25)] ring-1 ring-red-400/20';
      case 'B':
        return 'border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/20';
      case 'C':
        return 'border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.15)]';
      default:
        return 'border border-white/[0.08]';
    }
  };

  // Determine effective aspect: match size or custom sizing
  const effectiveAspect =
    aspect ||
    (size === 'avatar'
      ? 'square'
      : size === 'fill' || hasCustomDimensions
      ? 'fill'
      : 'card');

  return (
    <div
      className={`character-portrait relative isolate overflow-hidden shrink-0 group bg-[#07080B] box-border ${getDimensions()} ${getBorderGlow(
        character.grade
      )} ${className}`}
    >
      {/* Standard Character Image from Images Marvel */}
      <CharacterImage
        character={character}
        aspect={effectiveAspect}
        glow={true}
        hoverZoom={hoverZoom}
        priority={priority}
        fit={fit}
        className="absolute inset-0 w-full h-full min-w-0 min-h-0"
      />

      {/* Grade Overlay Ribbon */}
      {showBadge && size !== 'avatar' && (
        <div className="absolute top-1.5 left-1.5 z-20 pointer-events-none">
          <span
            className={`text-[8px] sm:text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md shadow-lg backdrop-blur-md border ${
              character.grade === 'MYTHIC'
                ? 'bg-[#180E2B]/90 text-amber-300 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                : character.grade === 'A'
                ? 'bg-[#200B0E]/90 text-red-200 border-red-500/50 shadow-[0_0_8px_rgba(239,68,68,0.3)]'
                : character.grade === 'B'
                ? 'bg-[#0A1622]/90 text-cyan-200 border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'bg-[#091C14]/90 text-emerald-200 border-emerald-500/40'
            }`}
          >
            {character.grade === 'MYTHIC' ? '★ MYTHIC' : `GRADE ${character.grade}`}
          </span>
        </div>
      )}

      {/* Power Badge */}
      {showPowerBadge && character.overallPower !== undefined && size !== 'avatar' && (
        <div className="absolute bottom-1.5 right-1.5 z-20 flex items-center gap-1 bg-black/85 backdrop-blur-md border border-amber-500/30 px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-black text-amber-300 shadow pointer-events-none">
          <Zap className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <span>{character.overallPower}</span>
        </div>
      )}
    </div>
  );
}
