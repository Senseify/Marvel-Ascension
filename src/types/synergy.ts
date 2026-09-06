export type SynergyType = 
  | 'Duo'
  | 'Trio'
  | 'Team'
  | 'Faction'
  | 'Family'
  | 'Rivalry'
  | 'Cosmic'
  | 'Hero'
  | 'Villain'
  | 'Character-Specific';

export type SynergyEffectCategory =
  | 'COMBINED_ATTACK'
  | 'SHIELD'
  | 'HEALING'
  | 'COUNTER'
  | 'STATUS_EFFECT'
  | 'TURN_EFFECT'
  | 'PASSIVE'
  | 'ONCE_PER_BATTLE'
  | 'ABILITY_MOD'
  | 'COSMIC';

export interface CharacterSynergy {
  id: string; // Unique identifier (e.g., 'syn-001')
  name: string; // Thematic title (e.g., 'Brothers of Asgard')
  type: SynergyType;
  characterIds: string[]; // Valid IDs from ALL_CHARACTERS
  characterNames: string[]; // Human-readable names of required characters
  activationCondition: string; // Detailed trigger requirement
  abilityName: string; // Unique signature synergy ability
  effectCategory: SynergyEffectCategory;
  gameplayDescription: string; // Clear description of gameplay mechanic
  bonusPower?: number; // Extra combat roll power bonus
  shieldAmount?: number; // Damage absorption shield
  healAmount?: number; // Vitality recovery
  counterDamage?: number; // Retaliatory damage to attacker
  stunChance?: number; // 0.0 - 1.0 chance to daze/slow opponent roll
  colorAccent?: string; // Thematic hex accent color
  badgeIcon?: string; // Emoji or icon identifier
}
