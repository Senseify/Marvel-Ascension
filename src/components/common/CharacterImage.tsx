import React, { useState } from 'react';
import { getCharacterImageUrl } from '../../data/marvelImageMap';
import { getCharacterImageStyle } from '../../data/characterImageOverrides';

export interface CharacterImageProps {
  character: {
    id?: string;
    name?: string;
    imageUrl?: string;
    color?: string;
    grade?: string;
  };
  /**
   * Container aspect ratio:
   * - 'card': Standard 3:4 card aspect ratio (ideal for portraits & cards)
   * - 'square': 1:1 square ratio (ideal for avatars, icons, grid tokens)
   * - 'fill': 100% width and height of parent without imposing an aspect ratio
   * - 'auto': Natural layout sizing without enforced aspect ratio
   */
  aspect?: 'card' | 'square' | 'fill' | 'auto';
  className?: string;
  imageClassName?: string;
  glow?: boolean;
  hoverZoom?: boolean;
  alt?: string;
  priority?: boolean;
  fit?: 'cover' | 'contain';
}

export const CharacterImage: React.FC<CharacterImageProps> = ({
  character,
  aspect = 'card',
  className = '',
  imageClassName = '',
  glow = false,
  hoverZoom = false,
  alt,
  priority = false,
  fit = 'cover',
}) => {
  const getAspectClass = () => {
    switch (aspect) {
      case 'card':
        return 'aspect-[3/4]';
      case 'square':
        return 'aspect-square';
      case 'fill':
        return 'w-full h-full';
      case 'auto':
        return '';
      default:
        return 'aspect-[3/4]';
    }
  };

  const [hasError, setHasError] = useState(false);
  const targetSrc = getCharacterImageUrl(character);
  const framingStyle = getCharacterImageStyle(character.id);
  const objectPos = framingStyle.objectPosition === 'center center' ? 'center center' : framingStyle.objectPosition;

  return (
    <div
      className={`character-image-container relative isolate w-full overflow-hidden shrink-0 select-none bg-[#07080B] box-border ${getAspectClass()} ${className}`}
    >
      {/* Ambient character color aura behind transparent or edge areas */}
      {glow && (
        <div
          className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${character.color || '#E62429'} 0%, transparent 70%)`
          }}
        />
      )}

      <img
        src={targetSrc}
        alt={alt || character.name || 'Character'}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        loading={priority ? 'eager' : 'lazy'}
        style={{
          objectFit: fit,
          objectPosition: objectPos,
        }}
        className={`${hasError ? 'hidden' : ''} absolute inset-0 block h-full w-full min-h-0 min-w-0 object-contain transition-transform duration-500 ease-out ${
          hoverZoom ? 'group-hover:scale-105' : ''
        } ${imageClassName}`}
        aria-hidden={hasError}
      />

      {/* Subtle cinematic edge vignette to blend image into matte UI */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/[0.06] z-10" />
    </div>
  );
};
