import { CharacterShardCategory } from './ascensionProgression';

export const SHARD_CONFIG: Record<CharacterShardCategory, {
  name: string;
  color: string;
  icon: string;
  token: string;
}> = {
  HERO: { name: 'Hero Shards', color: '#ef4444', icon: '✦', token: 'Hero Token' },
  RARE: { name: 'Rare Shards', color: '#34d399', icon: '◆', token: 'Rare Token' },
  EPIC: { name: 'Epic Shards', color: '#3b82f6', icon: '◆', token: 'Epic Token' },
  VILLAIN: { name: 'Villain Shards', color: '#a855f7', icon: '✦', token: 'Villain Token' },
  COSMIC: { name: 'Cosmic Shards', color: '#06b6d4', icon: '✧', token: 'Cosmic Token' },
  MYTHIC: { name: 'Mythic Shards', color: '#facc15', icon: '✦', token: 'Mythic Token' },
};

export function getShardConfig(category?: string) {
  const normalized = (category || 'RARE').toUpperCase();
  const aliases: Record<string, CharacterShardCategory> = {
    C: 'RARE',
    B: 'RARE',
    A: 'EPIC',
  };
  return SHARD_CONFIG[aliases[normalized] || normalized as CharacterShardCategory] || SHARD_CONFIG.RARE;
}

export function getRewardShardCategory(sourceId: string, tier?: string): CharacterShardCategory {
  const normalizedTier = (tier || '').toUpperCase();
  if (normalizedTier === 'BRONZE') return 'HERO';
  if (normalizedTier === 'SILVER') return 'EPIC';
  if (normalizedTier === 'GOLD') return 'RARE';
  if (normalizedTier === 'PLATINUM' || normalizedTier === 'VIBRANIUM') return 'EPIC';
  if (normalizedTier === 'COSMIC' || normalizedTier === 'ASCENDER') return 'MYTHIC';

  const hash = Array.from(sourceId).reduce((total, char) => total + char.charCodeAt(0), 0);
  return (['HERO', 'EPIC', 'VILLAIN', 'MYTHIC'] as CharacterShardCategory[])[hash % 4];
}
