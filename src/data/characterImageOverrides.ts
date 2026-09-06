export interface ImageFramingOverride {
  /**
   * CSS object-position string, e.g. '50% 35%', 'center 65%', '30% center'.
   * Defaults to 'center center' (50% 50%).
   */
  objectPosition?: string;
}

/**
 * Targeted per-character framing & alignment overrides.
 * Only applied when source artwork contains letterboxing, off-center focal subjects,
 * or extreme aspect ratio composition. All other characters use 'center center'.
 */
export const CHARACTER_IMAGE_OVERRIDES: Record<string, ImageFramingOverride> = {
  // 1. Characters with baked-in dark border bars from source artwork
  // char-m-001: Knull (has 96px black right band in source image)
  'char-m-001': { objectPosition: '28% center' },

  // char-b-051: Gorgon (has 100px top black band in source image)
  'char-b-051': { objectPosition: 'center 68%' },

  // char-a-030: Ares (has 100px top black band in source image)
  'char-a-030': { objectPosition: 'center 68%' },

  // char-b-060: Nightmask (has 84px top black band in source image)
  'char-b-060': { objectPosition: 'center 65%' },

  // char-c-021: Living Mummy (has 100px top black band & side bars)
  'char-c-021': { objectPosition: 'center 65%' },

  // char-c-056: Red Raven (has 30px top dark bar)
  'char-c-056': { objectPosition: 'center 58%' },

  // char-a-058: Kraglin (has 56px bottom dark bar)
  'char-a-058': { objectPosition: 'center 38%' },

  // char-b-073: Swordswoman (has 24px top dark bar)
  'char-b-073': { objectPosition: 'center 55%' },

  // char-c-014: Speedball (has 18px top dark bar)
  'char-c-014': { objectPosition: 'center 55%' },

  // char-c-057: Super-Adaptoid (has 18px top dark bar)
  'char-c-057': { objectPosition: 'center 55%' },

  // char-c-064: Gorr's Shadow Berserker (wide 1.74 aspect ratio with bottom bar)
  'char-c-064': { objectPosition: 'center 42%' },

  // char-exp49-032: Cardiac (has 36px left bar & wide banner ratio)
  'char-exp49-032': { objectPosition: '62% center' },

  // 2. High-head/tall character composition overrides (ensure face/head isn't cut off)
  // char-a-005: Thanos (wide landscape art with head at upper 35%)
  'char-a-005': { objectPosition: '50% 32%' },

  // char-a-061: MODOK Supreme (wide art, center his giant floating face)
  'char-a-061': { objectPosition: '50% 45%' },

  // char-c-043: Sasquatch (wide landscape art)
  'char-c-043': { objectPosition: '50% 35%' },

  // char-m-002: Galactus (massive cosmic character with helmet high in frame)
  'char-m-002': { objectPosition: '50% 30%' },

  // char-m-004: Living Tribunal (triple-faced entity positioned high)
  'char-m-004': { objectPosition: '50% 32%' },

  // char-m-005: Eternity (cosmic silhouette positioned high)
  'char-m-005': { objectPosition: '50% 30%' },

  // char-m-008: Beyonder (portrait with head at upper frame)
  'char-m-008': { objectPosition: '50% 35%' },

  // char-m-010: Franklin Richards
  'char-m-010': { objectPosition: '50% 35%' },

  // char-m-017: Jean Grey (Phoenix) (wings expand high)
  'char-m-017': { objectPosition: '50% 35%' },

  // char-a-001: Iron Man (Mark 85)
  'char-a-001': { objectPosition: '50% 35%' },

  // char-a-002: Captain America (Worthy)
  'char-a-002': { objectPosition: '50% 35%' },

  // char-a-003: Thor (Awakened King)
  'char-a-003': { objectPosition: '50% 35%' },

  // char-a-004: Hulk (World Breaker)
  'char-a-004': { objectPosition: '50% 35%' },

  // char-a-007: Doctor Strange (Sorcerer Supreme)
  'char-a-007': { objectPosition: '50% 35%' },

  // char-a-008: Scarlet Witch (Chaos Magic)
  'char-a-008': { objectPosition: '50% 35%' },

  // char-b-001: Spider-Man (Peter Parker)
  'char-b-001': { objectPosition: '50% 38%' },

  // char-b-007: Wolverine (Logan)
  'char-b-007': { objectPosition: '50% 35%' }
};

/**
 * Returns safe object positioning for a given character without changing scale.
 */
export function getCharacterImageStyle(characterId?: string): {
  objectPosition: string;
} {
  if (!characterId) {
    return { objectPosition: 'center center' };
  }

  const override = CHARACTER_IMAGE_OVERRIDES[characterId];
  if (!override) {
    return { objectPosition: 'center center' };
  }

  return { objectPosition: override.objectPosition || 'center center' };
}
