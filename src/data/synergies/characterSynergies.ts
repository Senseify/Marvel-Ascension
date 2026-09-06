// ============================================================================
// MARVEL ASCENSION: COMPLETE 300 CHARACTER SYNERGIES CATALOG
// EXACTLY 300 UNIQUE SYNERGIES MAPPED TO THE 350-CHARACTER ROSTER
// ============================================================================

import { CharacterSynergy, SynergyType, SynergyEffectCategory } from '../../types/synergy';
import { Character } from '../../types/game';

export const ALL_CHARACTER_SYNERGIES: CharacterSynergy[] = [
  {
    "id": "syn-001",
    "name": "Brothers of Asgard",
    "type": "Duo",
    "characterIds": [
      "char-a-001",
      "char-exp49-001"
    ],
    "characterNames": [
      "Thor Odinson",
      "Loki (God of Stories)"
    ],
    "activationCondition": "Field all required heroes (Thor Odinson + Loki (God of Stories)) in combat squad",
    "abilityName": "Mischief Thunderstrike",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Thor channels lightning while Loki creates trickster decoys, disorienting foes and striking with heavy electric chaos.",
    "bonusPower": 18,
    "shieldAmount": 15,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.25,
    "colorAccent": "#A855F7",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-002",
    "name": "Shield Repulsor Overload",
    "type": "Duo",
    "characterIds": [
      "char-b-002",
      "char-b-003"
    ],
    "characterNames": [
      "Iron Man",
      "Captain America"
    ],
    "activationCondition": "Field all required heroes (Iron Man + Captain America) in combat squad",
    "abilityName": "Prismatic Deflection",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Iron Man fires maximum unibeams into Captain America’s shield, refracting a 360-degree kinetic blast across the battlefield.",
    "bonusPower": 20,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EF4444",
    "badgeIcon": "🛡️"
  },
  {
    "id": "syn-003",
    "name": "Weapon X Carnage",
    "type": "Duo",
    "characterIds": [
      "char-b-005",
      "char-b-006"
    ],
    "characterNames": [
      "Wolverine",
      "Deadpool"
    ],
    "activationCondition": "Field all required heroes (Wolverine + Deadpool) in combat squad",
    "abilityName": "Regenerative Berserker Rush",
    "effectCategory": "HEALING",
    "gameplayDescription": "Both adamantium and katanas slice in synchronized bloodlust while healing factors regenerate health each round.",
    "bonusPower": 16,
    "shieldAmount": 0,
    "healAmount": 22,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-004",
    "name": "Spider-Verse Web Blossom",
    "type": "Duo",
    "characterIds": [
      "char-b-001",
      "char-exp-001"
    ],
    "characterNames": [
      "Spider-Man",
      "Miles Morales"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Miles Morales) in combat squad",
    "abilityName": "Bio-Electric Web Net",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Miles releases a venom shock pulse along Peter’s high-tensile web-lines, electrocuting and pinning the target.",
    "bonusPower": 17,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#06B6D4",
    "badgeIcon": "🕸️"
  },
  {
    "id": "syn-005",
    "name": "Fastball Special",
    "type": "Duo",
    "characterIds": [
      "char-b-005",
      "char-b-014"
    ],
    "characterNames": [
      "Wolverine",
      "Colossus"
    ],
    "activationCondition": "Field all required heroes (Wolverine + Colossus) in combat squad",
    "abilityName": "Kinetic Catapult",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Colossus hurls Wolverine headfirst at supersonic speed, impaling defenses with unstoppable adamantium claws.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 12,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "💥"
  },
  {
    "id": "syn-006",
    "name": "Hex Synthesis",
    "type": "Duo",
    "characterIds": [
      "char-a-002",
      "char-a-014"
    ],
    "characterNames": [
      "Scarlet Witch",
      "Vision"
    ],
    "activationCondition": "Field all required heroes (Scarlet Witch + Vision) in combat squad",
    "abilityName": "Chaos Density Collapse",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Wanda wraps Vision in reality-warping chaos magic as he shifts density through enemy armor to deliver a fatal core strike.",
    "bonusPower": 21,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EC4899",
    "badgeIcon": "🔮"
  },
  {
    "id": "syn-007",
    "name": "Guardians Core Duo",
    "type": "Duo",
    "characterIds": [
      "char-b-024",
      "char-b-025"
    ],
    "characterNames": [
      "Star-Lord",
      "Groot"
    ],
    "activationCondition": "Field all required heroes (Star-Lord + Groot) in combat squad",
    "abilityName": "Arboreal Heavy Artillery",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Groot expands dense ironwood root shields while Star-Lord fires dual element guns from atop his branches.",
    "bonusPower": 16,
    "shieldAmount": 24,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#10B981",
    "badgeIcon": "🌳"
  },
  {
    "id": "syn-008",
    "name": "Light & Dark Harmony",
    "type": "Duo",
    "characterIds": [
      "char-exp49-033",
      "char-exp49-034"
    ],
    "characterNames": [
      "Cloak (Tyrone Johnson)",
      "Dagger (Tandy Bowen)"
    ],
    "activationCondition": "Field all required heroes (Cloak (Tyrone Johnson) + Dagger (Tandy Bowen)) in combat squad",
    "abilityName": "Living Light Purge",
    "effectCategory": "HEALING",
    "gameplayDescription": "Cloak banishes threats to the Darkforce dimension while Dagger floods the void with purifying daggers of living light.",
    "bonusPower": 16,
    "shieldAmount": 15,
    "healAmount": 20,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#6366F1",
    "badgeIcon": "✨"
  },
  {
    "id": "syn-009",
    "name": "Pym Particle Disruption",
    "type": "Duo",
    "characterIds": [
      "char-b-012",
      "char-b-061"
    ],
    "characterNames": [
      "Ant-Man",
      "Yellowjacket"
    ],
    "activationCondition": "Field all required heroes (Ant-Man + Yellowjacket) in combat squad",
    "abilityName": "Quantum Sting Overdrive",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Shrinking and growing in rapid micro-second succession, delivering concussive quantum stingers that bypass armor.",
    "bonusPower": 15,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#EAB308",
    "badgeIcon": "🐜"
  },
  {
    "id": "syn-010",
    "name": "Budapest Protocols",
    "type": "Duo",
    "characterIds": [
      "char-c-001",
      "char-c-002"
    ],
    "characterNames": [
      "Hawkeye",
      "Black Widow"
    ],
    "activationCondition": "Field all required heroes (Hawkeye + Black Widow) in combat squad",
    "abilityName": "Covert Bullseye Strike",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Natasha draws enemy crosshairs with acrobatics while Clint releases pinpoint trick arrows into exposed weak points.",
    "bonusPower": 15,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#64748B",
    "badgeIcon": "🎯"
  },
  {
    "id": "syn-011",
    "name": "Shadows of Hell's Kitchen",
    "type": "Duo",
    "characterIds": [
      "char-b-077",
      "char-c-007"
    ],
    "characterNames": [
      "Daredevil (Shadowland Master)",
      "Elektra Natchios"
    ],
    "activationCondition": "Field all required heroes (Daredevil (Shadowland Master) + Elektra Natchios) in combat squad",
    "abilityName": "Hand Assassination Flank",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Twin radar precision and deadly twin sai strikes create a lethal melee crossfire from which none escape.",
    "bonusPower": 16,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 14,
    "stunChance": 0,
    "colorAccent": "#B91C1C",
    "badgeIcon": "⚔️"
  },
  {
    "id": "syn-012",
    "name": "Heroes for Hire",
    "type": "Duo",
    "characterIds": [
      "char-b-020",
      "char-b-021"
    ],
    "characterNames": [
      "Luke Cage",
      "Iron Fist"
    ],
    "activationCondition": "Field all required heroes (Luke Cage + Iron Fist) in combat squad",
    "abilityName": "Unbreakable Dragon Punch",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Luke Cage absorbs the brunt of incoming fire while Danny Rand channels the flaming Chi of Shou-Lao through his fists.",
    "bonusPower": 19,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#FBBF24",
    "badgeIcon": "👊"
  },
  {
    "id": "syn-013",
    "name": "Dark Dimension Archmages",
    "type": "Duo",
    "characterIds": [
      "char-a-003",
      "char-a-040"
    ],
    "characterNames": [
      "Doctor Strange",
      "Clea Strange"
    ],
    "activationCondition": "Field all required heroes (Doctor Strange + Clea Strange) in combat squad",
    "abilityName": "Faltine Mystic Conflagration",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "The Sorcerer Supreme and Sorceress Supreme weave Eldritch shields with Faltine flames to incinerate dark forces.",
    "bonusPower": 22,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#8B5CF6",
    "badgeIcon": "👁️"
  },
  {
    "id": "syn-014",
    "name": "Midnight Blood Moon",
    "type": "Duo",
    "characterIds": [
      "char-exp-003",
      "char-b-018"
    ],
    "characterNames": [
      "Blade",
      "Moon Knight"
    ],
    "activationCondition": "Field all required heroes (Blade + Moon Knight) in combat squad",
    "abilityName": "Khonshu Silver Cleave",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Under the crescent moon, Blade’s daywalker fury unites with Moon Knight’s brutal crescent darts against occult foes.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 12,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#475569",
    "badgeIcon": "🌙"
  },
  {
    "id": "syn-015",
    "name": "House of M Alliance",
    "type": "Duo",
    "characterIds": [
      "char-a-031",
      "char-a-009"
    ],
    "characterNames": [
      "Professor X",
      "Magneto"
    ],
    "activationCondition": "Field all required heroes (Professor X + Magneto) in combat squad",
    "abilityName": "Cerebro-Magnetic Dominance",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Telepathic lockdown paralyzes enemy neural pathways while magnetic fields tear apart metallic armor and weapons.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#8B5CF6",
    "badgeIcon": "🧲"
  },
  {
    "id": "syn-016",
    "name": "Mutant Alpha Resonance",
    "type": "Duo",
    "characterIds": [
      "char-b-013",
      "char-a-012"
    ],
    "characterNames": [
      "Cyclops",
      "Jean Grey (Phoenix Avatar)"
    ],
    "activationCondition": "Field all required heroes (Cyclops + Jean Grey (Phoenix Avatar)) in combat squad",
    "abilityName": "Psychic Optic Superbeam",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Jean telekinetically focuses Scott’s optic devastation into an amplified, micro-focused beam that incinerates targets.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F97316",
    "badgeIcon": "🔥"
  },
  {
    "id": "syn-017",
    "name": "Southern Charm & Lethal Touch",
    "type": "Duo",
    "characterIds": [
      "char-b-016",
      "char-b-015"
    ],
    "characterNames": [
      "Rogue",
      "Gambit"
    ],
    "activationCondition": "Field all required heroes (Rogue + Gambit) in combat squad",
    "abilityName": "Kinetic Overdrive Kiss",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Gambit charges energized playing cards with explosive kinetic energy while Rogue drains enemy vigor to sustain them.",
    "bonusPower": 17,
    "shieldAmount": 0,
    "healAmount": 15,
    "counterDamage": 14,
    "stunChance": 0,
    "colorAccent": "#EC4899",
    "badgeIcon": "🃏"
  },
  {
    "id": "syn-018",
    "name": "Gamma Smash Kinship",
    "type": "Duo",
    "characterIds": [
      "char-a-006",
      "char-b-019"
    ],
    "characterNames": [
      "The Incredible Hulk",
      "She-Hulk"
    ],
    "activationCondition": "Field all required heroes (The Incredible Hulk + She-Hulk) in combat squad",
    "abilityName": "Earth-Shaking Thunderclap",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Double gamma thunderclaps create a seismic shockwave that pulverizes the arena floor and knocks down all opponents.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#22C55E",
    "badgeIcon": "💥"
  },
  {
    "id": "syn-019",
    "name": "High-Altitude Firepower",
    "type": "Duo",
    "characterIds": [
      "char-a-004",
      "char-b-011"
    ],
    "characterNames": [
      "Captain Marvel",
      "War Machine"
    ],
    "activationCondition": "Field all required heroes (Captain Marvel + War Machine) in combat squad",
    "abilityName": "Binary Heavy Barrage",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Carol absorbs ambient radiation and channels it into Rhodey’s shoulder guns, boosting ordnance velocity tenfold.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#38BDF8",
    "badgeIcon": "🚀"
  },
  {
    "id": "syn-020",
    "name": "Symbiotic Truce",
    "type": "Duo",
    "characterIds": [
      "char-b-001",
      "char-b-007"
    ],
    "characterNames": [
      "Spider-Man",
      "Venom"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Venom) in combat squad",
    "abilityName": "Lethal Protector Web-Lash",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Putting aside their feud, Peter and Eddie combine acrobatic web-shooting with viscous symbiote tendril slams.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 12,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#0F172A",
    "badgeIcon": "🕷️"
  },
  {
    "id": "syn-021",
    "name": "Thunder Bros",
    "type": "Duo",
    "characterIds": [
      "char-a-001",
      "char-a-016"
    ],
    "characterNames": [
      "Thor Odinson",
      "Beta Ray Bill"
    ],
    "activationCondition": "Field all required heroes (Thor Odinson + Beta Ray Bill) in combat squad",
    "abilityName": "Mjolnir-Stormbreaker Cataclysm",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Twin enchanted Uru hammers strike simultaneously, summoning a cosmic lightning tempest that blankets the field.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.25,
    "colorAccent": "#38BDF8",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-022",
    "name": "Royal Blood of Wakanda",
    "type": "Duo",
    "characterIds": [
      "char-b-004",
      "char-a-024"
    ],
    "characterNames": [
      "Black Panther",
      "Storm"
    ],
    "activationCondition": "Field all required heroes (Black Panther + Storm) in combat squad",
    "abilityName": "Monsoon Bast Fury",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Ororo calls down gale-force torrential monsoons while T'Challa weaves through the storm with Bast’s divine protection.",
    "bonusPower": 18,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#6366F1",
    "badgeIcon": "🐆"
  },
  {
    "id": "syn-023",
    "name": "Sisters of Thanos",
    "type": "Duo",
    "characterIds": [
      "char-b-022",
      "char-b-026"
    ],
    "characterNames": [
      "Gamora",
      "Nebula"
    ],
    "activationCondition": "Field all required heroes (Gamora + Nebula) in combat squad",
    "abilityName": "Cybernetic Precision Strike",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Deadliest woman in the galaxy teams with cybernetically upgraded assassin to decapitate enemy vanguard units.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 15,
    "stunChance": 0,
    "colorAccent": "#06B6D4",
    "badgeIcon": "🗡️"
  },
  {
    "id": "syn-024",
    "name": "Cosmic Vengeance & Lead",
    "type": "Duo",
    "characterIds": [
      "char-a-019",
      "char-b-076"
    ],
    "characterNames": [
      "Ghost Rider (Johnny Blaze)",
      "The Punisher (Tactical Armor)"
    ],
    "activationCondition": "Field all required heroes (Ghost Rider (Johnny Blaze) + The Punisher (Tactical Armor)) in combat squad",
    "abilityName": "Penance Bullet Hail",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Frank Castle loads depleted uranium rounds coated in hellfire, purging sinful foes with relentless ballistic infernos.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EA580C",
    "badgeIcon": "💀"
  },
  {
    "id": "syn-025",
    "name": "Star-Lord & Shadowcat",
    "type": "Duo",
    "characterIds": [
      "char-b-024",
      "char-b-055"
    ],
    "characterNames": [
      "Star-Lord",
      "Shadowcat & Lockheed"
    ],
    "activationCondition": "Field all required heroes (Star-Lord + Shadowcat & Lockheed) in combat squad",
    "abilityName": "Phased Element Volley",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Kitty phases Peter through walls and defenses so he can plant point-blank elemental plasma charges on targets.",
    "bonusPower": 16,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#A855F7",
    "badgeIcon": "🌌"
  },
  {
    "id": "syn-026",
    "name": "BAMF Slicer",
    "type": "Duo",
    "characterIds": [
      "char-b-017",
      "char-b-005"
    ],
    "characterNames": [
      "Nightcrawler",
      "Wolverine"
    ],
    "activationCondition": "Field all required heroes (Nightcrawler + Wolverine) in combat squad",
    "abilityName": "Teleporting Claw Ambush",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Kurt teleports Logan directly behind the enemy commander, delivering instant blindside adamantium slashes.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 16,
    "stunChance": 0,
    "colorAccent": "#1E40AF",
    "badgeIcon": "💨"
  },
  {
    "id": "syn-027",
    "name": "Howling Commandos Reborn",
    "type": "Duo",
    "characterIds": [
      "char-b-003",
      "char-b-010"
    ],
    "characterNames": [
      "Captain America",
      "Winter Soldier"
    ],
    "activationCondition": "Field all required heroes (Captain America + Winter Soldier) in combat squad",
    "abilityName": "Bionic Shield Slam",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Steve rebounds his shield off Bucky’s bionic arm into the enemy squad with pinpoint lethal trajectory.",
    "bonusPower": 18,
    "shieldAmount": 16,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#3B82F6",
    "badgeIcon": "⭐"
  },
  {
    "id": "syn-028",
    "name": "Iron Legion Vanguard",
    "type": "Duo",
    "characterIds": [
      "char-b-002",
      "char-b-011"
    ],
    "characterNames": [
      "Iron Man",
      "War Machine"
    ],
    "activationCondition": "Field all required heroes (Iron Man + War Machine) in combat squad",
    "abilityName": "Twin Smart-Missile Swarm",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Synchronized Stark targeting lock activates, raining over 100 micro-cluster missiles on enemy positions.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🚀"
  },
  {
    "id": "syn-029",
    "name": "Spidey-Pool Buddies",
    "type": "Duo",
    "characterIds": [
      "char-b-001",
      "char-b-006"
    ],
    "characterNames": [
      "Spider-Man",
      "Deadpool"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Deadpool) in combat squad",
    "abilityName": "Maximum Sarcasm & Bullets",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Constant fourth-wall breaking banter distracts enemy commanders while swords and webs eliminate the guards.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 16,
    "stunChance": 0,
    "colorAccent": "#EF4444",
    "badgeIcon": "❤️"
  },
  {
    "id": "syn-030",
    "name": "Kamar-Taj Sanctorum Guard",
    "type": "Duo",
    "characterIds": [
      "char-a-003",
      "char-b-032"
    ],
    "characterNames": [
      "Doctor Strange",
      "Wong"
    ],
    "activationCondition": "Field all required heroes (Doctor Strange + Wong) in combat squad",
    "abilityName": "Mirror Dimension Barrier",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Twin master sorcerers cast the Tao Mandalas and shield the team inside pristine crystalline mirror dimensions.",
    "bonusPower": 15,
    "shieldAmount": 24,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EAB308",
    "badgeIcon": "🛡️"
  },
  {
    "id": "syn-031",
    "name": "Time-Traveling Chimichanga",
    "type": "Duo",
    "characterIds": [
      "char-b-006",
      "char-a-042"
    ],
    "characterNames": [
      "Deadpool",
      "Cable (Full Unbound Power)"
    ],
    "activationCondition": "Field all required heroes (Deadpool + Cable (Full Unbound Power)) in combat squad",
    "abilityName": "Chronal Disruption Firefight",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Cable provides telekinetic covering fire and chronal rifts while Wade dances through gunfire with explosive ordnance.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 14,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F43F5E",
    "badgeIcon": "⏳"
  },
  {
    "id": "syn-032",
    "name": "Guardians of the Infinite",
    "type": "Duo",
    "characterIds": [
      "char-m-003",
      "char-a-013"
    ],
    "characterNames": [
      "Silver Surfer",
      "Adam Warlock"
    ],
    "activationCondition": "Field all required heroes (Silver Surfer + Adam Warlock) in combat squad",
    "abilityName": "Cosmic Soul Surge",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The Power Cosmic resonates with Soul Gem energies, purging dark corruptions and unleashing pure reality beams.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 18,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EAB308",
    "badgeIcon": "🪐"
  },
  {
    "id": "syn-033",
    "name": "Mastery of Magnetism",
    "type": "Duo",
    "characterIds": [
      "char-a-009",
      "char-b-048"
    ],
    "characterNames": [
      "Magneto",
      "Polaris"
    ],
    "activationCondition": "Field all required heroes (Magneto + Polaris) in combat squad",
    "abilityName": "Electromagnetic EMP Singularity",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Father and daughter align their mutant magnetic fields, creating a catastrophic global pulse that disables all technology.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#10B981",
    "badgeIcon": "🧲"
  },
  {
    "id": "syn-034",
    "name": "Utopian Commanders",
    "type": "Duo",
    "characterIds": [
      "char-a-032",
      "char-b-013"
    ],
    "characterNames": [
      "Emma Frost",
      "Cyclops"
    ],
    "activationCondition": "Field all required heroes (Emma Frost + Cyclops) in combat squad",
    "abilityName": "Diamond Tactical Assault",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Emma in organic diamond form absorbs frontal assaults while telepathically directing Scott’s optic blasts flawlessly.",
    "bonusPower": 18,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#06B6D4",
    "badgeIcon": "💎"
  },
  {
    "id": "syn-035",
    "name": "Dragon Fist Mastery",
    "type": "Duo",
    "characterIds": [
      "char-b-009",
      "char-b-021"
    ],
    "characterNames": [
      "Shang-Chi",
      "Iron Fist"
    ],
    "activationCondition": "Field all required heroes (Shang-Chi + Iron Fist) in combat squad",
    "abilityName": "Ten Rings Chi Convergence",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The mystical Ten Rings rotate in harmony with the immortal fist of Shou-Lao, shattering enemy energy barriers.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 15,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "🐉"
  },
  {
    "id": "syn-036",
    "name": "Klyntar Bloodbath",
    "type": "Duo",
    "characterIds": [
      "char-b-007",
      "char-b-008"
    ],
    "characterNames": [
      "Venom",
      "Carnage"
    ],
    "activationCondition": "Field all required heroes (Venom + Carnage) in combat squad",
    "abilityName": "Red Symbiote Tendril Storm",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Reluctantly bonding their tendrils, black and red symbiotes erupt into an all-consuming razor-sharp flesh hurricane.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 14,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#991B1B",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-037",
    "name": "Architects of Terror",
    "type": "Duo",
    "characterIds": [
      "char-b-027",
      "char-b-028"
    ],
    "characterNames": [
      "Green Goblin",
      "Doctor Octopus"
    ],
    "activationCondition": "Field all required heroes (Green Goblin + Doctor Octopus) in combat squad",
    "abilityName": "Tentacle Pumpkin Barrage",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Octavius’s titanium tentacles hold opponents immobilized while Osborn drops high-explosive pumpkin bombs down range.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.25,
    "colorAccent": "#15803D",
    "badgeIcon": "🎃"
  },
  {
    "id": "syn-038",
    "name": "Throne of Wakanda",
    "type": "Duo",
    "characterIds": [
      "char-b-004",
      "char-b-029"
    ],
    "characterNames": [
      "Black Panther",
      "Killmonger"
    ],
    "activationCondition": "Field all required heroes (Black Panther + Killmonger) in combat squad",
    "abilityName": "Vibranium Claws Duel Strike",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Old royal rivals unite their suits, channeling kinetic impact explosions that devastate everything within 20 yards.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 14,
    "stunChance": 0,
    "colorAccent": "#4F46E5",
    "badgeIcon": "🐾"
  },
  {
    "id": "syn-039",
    "name": "Nexus Event Convergence",
    "type": "Duo",
    "characterIds": [
      "char-exp49-001",
      "char-exp49-002"
    ],
    "characterNames": [
      "Loki (God of Stories)",
      "Sylvie Laufeydottir (Lady Loki)"
    ],
    "activationCondition": "Field all required heroes (Loki (God of Stories) + Sylvie Laufeydottir (Lady Loki)) in combat squad",
    "abilityName": "Enchanted Timeline Sever",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Twin Loki variants combine enchanting touch with narrative thread manipulation to rewrite the battle outcome.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#10B981",
    "badgeIcon": "🗡️"
  },
  {
    "id": "syn-040",
    "name": "All-New Captains",
    "type": "Duo",
    "characterIds": [
      "char-b-003",
      "char-b-080"
    ],
    "characterNames": [
      "Captain America",
      "Falcon (Captain America Suit)"
    ],
    "activationCondition": "Field all required heroes (Captain America + Falcon (Captain America Suit)) in combat squad",
    "abilityName": "Aerial Vibranium Shield Intercept",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Sam executes supersonic fly-bys deflecting incoming strikes while Steve commands tactical battle positions.",
    "bonusPower": 17,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#2563EB",
    "badgeIcon": "🦅"
  },
  {
    "id": "syn-041",
    "name": "Web-Warriors of Earth-65",
    "type": "Duo",
    "characterIds": [
      "char-exp-001",
      "char-exp-002"
    ],
    "characterNames": [
      "Miles Morales",
      "Ghost-Spider"
    ],
    "activationCondition": "Field all required heroes (Miles Morales + Ghost-Spider) in combat squad",
    "abilityName": "Interdimensional Rhythm Clash",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Drum-beat acrobatics synchronize with venom blasts to dance around attacks and counter from all blind spots.",
    "bonusPower": 17,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#F43F5E",
    "badgeIcon": "🥁"
  },
  {
    "id": "syn-042",
    "name": "Children of Bor and Odin",
    "type": "Duo",
    "characterIds": [
      "char-a-001",
      "char-a-008"
    ],
    "characterNames": [
      "Thor Odinson",
      "Hela"
    ],
    "activationCondition": "Field all required heroes (Thor Odinson + Hela) in combat squad",
    "abilityName": "Necro-Lightning Execution",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Asgard’s God of Thunder and Goddess of Death unite storm and soul-piercing necro-blades in absolute fury.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 15,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#047857",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-043",
    "name": "The God Butchers",
    "type": "Duo",
    "characterIds": [
      "char-m-001",
      "char-m-013"
    ],
    "characterNames": [
      "Knull",
      "Gorr the God Butcher"
    ],
    "activationCondition": "Field all required heroes (Knull + Gorr the God Butcher) in combat squad",
    "abilityName": "All-Black Necro-Annihilation",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The Creator of Symbiotes and the Butcher of Gods manifest twin Necroswords to sever deities from existence.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 18,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#450A0A",
    "badgeIcon": "⚔️"
  },
  {
    "id": "syn-044",
    "name": "Herald & Devourer",
    "type": "Duo",
    "characterIds": [
      "char-m-002",
      "char-m-003"
    ],
    "characterNames": [
      "Galactus",
      "Silver Surfer"
    ],
    "activationCondition": "Field all required heroes (Galactus + Silver Surfer) in combat squad",
    "abilityName": "Planetary Siphon Ray",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Surfer scouts and anchors the target while Galactus channels the primal Power Cosmic to disintegrate defenses.",
    "bonusPower": 25,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#7E22CE",
    "badgeIcon": "🌌"
  },
  {
    "id": "syn-045",
    "name": "Court of Death",
    "type": "Duo",
    "characterIds": [
      "char-a-005",
      "char-a-008"
    ],
    "characterNames": [
      "Thanos (Base / Armor)",
      "Hela"
    ],
    "activationCondition": "Field all required heroes (Thanos (Base / Armor) + Hela) in combat squad",
    "abilityName": "Decimation of the Living",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Thanos offers the souls of his slain enemies to Hela, empowering her blades with eternal cosmic decay.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 16,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#6B21A8",
    "badgeIcon": "💀"
  },
  {
    "id": "syn-046",
    "name": "Kin of Weapon X",
    "type": "Duo",
    "characterIds": [
      "char-b-005",
      "char-b-039"
    ],
    "characterNames": [
      "Wolverine",
      "X-23"
    ],
    "activationCondition": "Field all required heroes (Wolverine + X-23) in combat squad",
    "abilityName": "Double Adamantium Whirlwind",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Father and daughter unleash synchronized four-claw and foot-claw cross-slashes through enemy armor.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#E11D48",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-047",
    "name": "Sub-Zero Blizzard",
    "type": "Duo",
    "characterIds": [
      "char-a-024",
      "char-a-025"
    ],
    "characterNames": [
      "Storm",
      "Iceman (Omega Level)"
    ],
    "activationCondition": "Field all required heroes (Storm + Iceman (Omega Level)) in combat squad",
    "abilityName": "Absolute Frost Gale",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Storm whips Bobby Drake’s sub-zero ice crystals into a blinding arctic storm that freezes enemies solid.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#38BDF8",
    "badgeIcon": "❄️"
  },
  {
    "id": "syn-048",
    "name": "Rasputin Siblings",
    "type": "Duo",
    "characterIds": [
      "char-b-014",
      "char-a-028"
    ],
    "characterNames": [
      "Colossus",
      "Magik"
    ],
    "activationCondition": "Field all required heroes (Colossus + Magik) in combat squad",
    "abilityName": "Soulsword Steel Bulwark",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Colossus shields Illyana while she cleaves magical barriers with her Soulsword, summoning demonic portals.",
    "bonusPower": 20,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#A855F7",
    "badgeIcon": "🛡️"
  },
  {
    "id": "syn-049",
    "name": "BFF Avengers",
    "type": "Duo",
    "characterIds": [
      "char-b-046",
      "char-exp-017"
    ],
    "characterNames": [
      "Beast",
      "Wonder Man"
    ],
    "activationCondition": "Field all required heroes (Beast + Wonder Man) in combat squad",
    "abilityName": "Ionic Acrobatics Slam",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Simon’s ionic strength launches Hank McCoy for an acrobatic aerial body slam into heavily armored lines.",
    "bonusPower": 17,
    "shieldAmount": 15,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#818CF8",
    "badgeIcon": "💪"
  },
  {
    "id": "syn-050",
    "name": "Passing the Quiver",
    "type": "Duo",
    "characterIds": [
      "char-c-001",
      "char-c-003"
    ],
    "characterNames": [
      "Hawkeye",
      "Kate Bishop"
    ],
    "activationCondition": "Field all required heroes (Hawkeye + Kate Bishop) in combat squad",
    "abilityName": "Trick Arrow Crossfire",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Clint and Kate fire synchronized sonic and acid trick arrows that detonate simultaneously across enemy lines.",
    "bonusPower": 17,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.25,
    "colorAccent": "#8B5CF6",
    "badgeIcon": "🏹"
  },
  {
    "id": "syn-051",
    "name": "Red Room Sisters",
    "type": "Duo",
    "characterIds": [
      "char-c-002",
      "char-c-004"
    ],
    "characterNames": [
      "Black Widow",
      "Yelena Belova"
    ],
    "activationCondition": "Field all required heroes (Black Widow + Yelena Belova) in combat squad",
    "abilityName": "Widow's Bite Overload",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Dual acrobatic martial arts finish with twin 50,000-volt electroshock gauntlet discharges to the chest.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#DC2626",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-052",
    "name": "Superior Resonance",
    "type": "Duo",
    "characterIds": [
      "char-b-028",
      "char-b-001"
    ],
    "characterNames": [
      "Doctor Octopus",
      "Spider-Man"
    ],
    "activationCondition": "Field all required heroes (Doctor Octopus + Spider-Man) in combat squad",
    "abilityName": "Cyber-Web Entanglement",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Peter’s webs reinforce Otto’s mechanical tentacles, wrapping targets in electrified steel-web cocoons.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#B45309",
    "badgeIcon": "🐙"
  },
  {
    "id": "syn-053",
    "name": "Brotherhood Juggernaut",
    "type": "Duo",
    "characterIds": [
      "char-a-009",
      "char-a-026"
    ],
    "characterNames": [
      "Magneto",
      "Juggernaut"
    ],
    "activationCondition": "Field all required heroes (Magneto + Juggernaut) in combat squad",
    "abilityName": "Magnetic Missile Blitz",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Magneto uses magnetic polarity to accelerate the unstoppable Juggernaut to terminal kinetic collision speed.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#B91C1C",
    "badgeIcon": "🛑"
  },
  {
    "id": "syn-054",
    "name": "Oracles of Mutancy",
    "type": "Duo",
    "characterIds": [
      "char-exp-005",
      "char-exp-030"
    ],
    "characterNames": [
      "Mystique",
      "Destiny"
    ],
    "activationCondition": "Field all required heroes (Mystique + Destiny) in combat squad",
    "abilityName": "Precognitive Shapeshift",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Destiny foresees enemy maneuvers seconds ahead, allowing Mystique to flawlessly dodge and counter-strike.",
    "bonusPower": 16,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 22,
    "stunChance": 0,
    "colorAccent": "#3B82F6",
    "badgeIcon": "🔮"
  },
  {
    "id": "syn-055",
    "name": "Feral Nemesis Prowl",
    "type": "Duo",
    "characterIds": [
      "char-exp-006",
      "char-b-005"
    ],
    "characterNames": [
      "Sabretooth",
      "Wolverine"
    ],
    "activationCondition": "Field all required heroes (Sabretooth + Wolverine) in combat squad",
    "abilityName": "Savage Bloodlust Clashes",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Deadly rivals coordinate an instinctual predatory ambush that tears apart enemy forward barricades.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 14,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#D97706",
    "badgeIcon": "🐾"
  },
  {
    "id": "syn-056",
    "name": "Time-Displaced Soldiers",
    "type": "Duo",
    "characterIds": [
      "char-b-042",
      "char-a-042"
    ],
    "characterNames": [
      "Bishop",
      "Cable (Full Unbound Power)"
    ],
    "activationCondition": "Field all required heroes (Bishop + Cable (Full Unbound Power)) in combat squad",
    "abilityName": "Chronal Energy Discharge",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Bishop absorbs kinetic laser blasts and channels the raw energy directly into Cable’s plasma rifle batteries.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 16,
    "stunChance": 0,
    "colorAccent": "#2563EB",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-057",
    "name": "Energy Kinetic Conduit",
    "type": "Duo",
    "characterIds": [
      "char-b-015",
      "char-b-042"
    ],
    "characterNames": [
      "Gambit",
      "Bishop"
    ],
    "activationCondition": "Field all required heroes (Gambit + Bishop) in combat squad",
    "abilityName": "Charged Bio-Kinetic Burst",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Gambit charges Bishop’s body with kinetic cards, allowing Bishop to release an amplified radiant explosion.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EC4899",
    "badgeIcon": "💥"
  },
  {
    "id": "syn-058",
    "name": "Spider-Heroines United",
    "type": "Duo",
    "characterIds": [
      "char-exp-002",
      "char-exp-012"
    ],
    "characterNames": [
      "Ghost-Spider",
      "Spider-Woman"
    ],
    "activationCondition": "Field all required heroes (Ghost-Spider + Spider-Woman) in combat squad",
    "abilityName": "Venom Blast Acrobatic Strike",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Jessica Drew’s bio-electric blast supercharges Gwen’s dimensional web sling for an overwhelming shockwave.",
    "bonusPower": 17,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.25,
    "colorAccent": "#DB2777",
    "badgeIcon": "🕸️"
  },
  {
    "id": "syn-059",
    "name": "Pheromone Web Bond",
    "type": "Duo",
    "characterIds": [
      "char-exp-013",
      "char-b-001"
    ],
    "characterNames": [
      "Silk",
      "Spider-Man"
    ],
    "activationCondition": "Field all required heroes (Silk + Spider-Man) in combat squad",
    "abilityName": "Hyper-Reflex Web Trap",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Their primal Spider-Totem connection grants supernatural evasion and razor-sharp silk tendril traps.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 16,
    "stunChance": 0,
    "colorAccent": "#E11D48",
    "badgeIcon": "🕷️"
  },
  {
    "id": "syn-060",
    "name": "Multiverse Web Timeline",
    "type": "Duo",
    "characterIds": [
      "char-exp-009",
      "char-b-001"
    ],
    "characterNames": [
      "Spider-Man 2099",
      "Spider-Man"
    ],
    "activationCondition": "Field all required heroes (Spider-Man 2099 + Spider-Man) in combat squad",
    "abilityName": "Digital Talon Rend",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Miguel O’Hara’s paralytic talons strike in tandem with Peter’s fluid martial arts to incapacitate leaders.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#2563EB",
    "badgeIcon": "⏳"
  },
  {
    "id": "syn-061",
    "name": "Brothers in Spandex",
    "type": "Duo",
    "characterIds": [
      "char-exp-045",
      "char-b-001"
    ],
    "characterNames": [
      "Scarlet Spider",
      "Spider-Man"
    ],
    "activationCondition": "Field all required heroes (Scarlet Spider + Spider-Man) in combat squad",
    "abilityName": "Stingers of the Other",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Kaine Parker unleashes razor-sharp wrist stingers while Peter webs enemy hands to leave them wide open.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#991B1B",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-062",
    "name": "Legal Defense Smash",
    "type": "Duo",
    "characterIds": [
      "char-b-019",
      "char-b-077"
    ],
    "characterNames": [
      "She-Hulk",
      "Daredevil (Shadowland Master)"
    ],
    "activationCondition": "Field all required heroes (She-Hulk + Daredevil (Shadowland Master)) in combat squad",
    "abilityName": "Courtroom Knockout",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Attorney allies deliver a synchronized legal beatdown: Murdock sets up the blindspot, Jennifer smashes the gavel.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.25,
    "colorAccent": "#16A34A",
    "badgeIcon": "⚖️"
  },
  {
    "id": "syn-063",
    "name": "Power Couple of Harlem",
    "type": "Duo",
    "characterIds": [
      "char-c-018",
      "char-b-020"
    ],
    "characterNames": [
      "Jessica Jones",
      "Luke Cage"
    ],
    "activationCondition": "Field all required heroes (Jessica Jones + Luke Cage) in combat squad",
    "abilityName": "Unbreakable Ground Pound",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Jessica hurls Luke down from the sky, detonating the ground like a seismic bomb against grouped enemies.",
    "bonusPower": 19,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#4B5563",
    "badgeIcon": "💍"
  },
  {
    "id": "syn-064",
    "name": "Dragon Blade Synergy",
    "type": "Duo",
    "characterIds": [
      "char-b-021",
      "char-c-017"
    ],
    "characterNames": [
      "Iron Fist",
      "Colleen Wing"
    ],
    "activationCondition": "Field all required heroes (Iron Fist + Colleen Wing) in combat squad",
    "abilityName": "Chi-Infused Katana Slash",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Danny channels Shou-Lao’s flame directly into Colleen’s ancestral katana, slicing cleanly through tank plating.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 15,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "🗡️"
  },
  {
    "id": "syn-065",
    "name": "Daughters of the Dragon",
    "type": "Duo",
    "characterIds": [
      "char-c-016",
      "char-c-017"
    ],
    "characterNames": [
      "Misty Knight",
      "Colleen Wing"
    ],
    "activationCondition": "Field all required heroes (Misty Knight + Colleen Wing) in combat squad",
    "abilityName": "Bionic Lotus Kick",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Misty’s Stark-built bionic arm punches open armored hulls so Colleen can carve through the inner systems.",
    "bonusPower": 17,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 14,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🐉"
  },
  {
    "id": "syn-066",
    "name": "Masters of the Mystic Arts",
    "type": "Duo",
    "characterIds": [
      "char-a-003",
      "char-a-002"
    ],
    "characterNames": [
      "Doctor Strange",
      "Scarlet Witch"
    ],
    "activationCondition": "Field all required heroes (Doctor Strange + Scarlet Witch) in combat squad",
    "abilityName": "Chaos Magic Eldritch Inversion",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Order magic and Chaos magic merge, creating reality-bending distortions that nullify all enemy buffs.",
    "bonusPower": 24,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🔮"
  },
  {
    "id": "syn-067",
    "name": "Nightstalker Exorcism",
    "type": "Duo",
    "characterIds": [
      "char-a-003",
      "char-exp-003"
    ],
    "characterNames": [
      "Doctor Strange",
      "Blade"
    ],
    "activationCondition": "Field all required heroes (Doctor Strange + Blade) in combat squad",
    "abilityName": "Crimson Seal of Vishanti",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Strange blesses Blade’s silver swords with the Book of Vishanti, banishing dark entities on contact.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 15,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#7C3AED",
    "badgeIcon": "🗡️"
  },
  {
    "id": "syn-068",
    "name": "Purging Hellfire",
    "type": "Duo",
    "characterIds": [
      "char-a-019",
      "char-exp-003"
    ],
    "characterNames": [
      "Ghost Rider (Johnny Blaze)",
      "Blade"
    ],
    "activationCondition": "Field all required heroes (Ghost Rider (Johnny Blaze) + Blade) in combat squad",
    "abilityName": "Damnation Chain Guillotine",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Ghost Rider wraps Blade’s blades in blazing chains, slicing demonic foes while incinerating their essence.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EA580C",
    "badgeIcon": "🔥"
  },
  {
    "id": "syn-069",
    "name": "Midnight Crescent Ward",
    "type": "Duo",
    "characterIds": [
      "char-b-018",
      "char-a-003"
    ],
    "characterNames": [
      "Moon Knight",
      "Doctor Strange"
    ],
    "activationCondition": "Field all required heroes (Moon Knight + Doctor Strange) in combat squad",
    "abilityName": "Ankh Astral Projection",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Strange projects an astral energy shield while Khonshu’s avatar deflects physical strikes with adamantium truncheons.",
    "bonusPower": 17,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#94A3B8",
    "badgeIcon": "🌙"
  },
  {
    "id": "syn-070",
    "name": "Cosmic Romance",
    "type": "Duo",
    "characterIds": [
      "char-b-024",
      "char-b-022"
    ],
    "characterNames": [
      "Star-Lord",
      "Gamora"
    ],
    "activationCondition": "Field all required heroes (Star-Lord + Gamora) in combat squad",
    "abilityName": "Godslayer Element Blasts",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Peter covers Gamora with rapid quad-blaster suppression fire as she leaps forward for a fatal neck strike.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 14,
    "stunChance": 0,
    "colorAccent": "#10B981",
    "badgeIcon": "💘"
  },
  {
    "id": "syn-071",
    "name": "Gentle Soul & The Destroyer",
    "type": "Duo",
    "characterIds": [
      "char-b-023",
      "char-b-069"
    ],
    "characterNames": [
      "Drax the Destroyer",
      "Mantis (Martial Empath)"
    ],
    "activationCondition": "Field all required heroes (Drax the Destroyer + Mantis (Martial Empath)) in combat squad",
    "abilityName": "Pacifying Knife Flurry",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Mantis touches enemy foreheads to induce deep sleep or catatonia while Drax drives twin daggers home.",
    "bonusPower": 17,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#84CC16",
    "badgeIcon": "💤"
  },
  {
    "id": "syn-072",
    "name": "Titan-Slayer Veterans",
    "type": "Duo",
    "characterIds": [
      "char-b-022",
      "char-b-023"
    ],
    "characterNames": [
      "Gamora",
      "Drax the Destroyer"
    ],
    "activationCondition": "Field all required heroes (Gamora + Drax the Destroyer) in combat squad",
    "abilityName": "Dual Decapitation Strike",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Veterans of countless cosmic wars coordinate low and high melee strikes that sever giant monster limbs.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#059669",
    "badgeIcon": "🗡️"
  },
  {
    "id": "syn-073",
    "name": "Cybernetic Flora",
    "type": "Duo",
    "characterIds": [
      "char-b-025",
      "char-b-026"
    ],
    "characterNames": [
      "Groot",
      "Nebula"
    ],
    "activationCondition": "Field all required heroes (Groot + Nebula) in combat squad",
    "abilityName": "Thorny Cyber-Whip Enclosure",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Nebula electrifies Groot’s extending branches, entangling enemy lines in a web of shocking wooden barbs.",
    "bonusPower": 16,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.2,
    "colorAccent": "#0284C7",
    "badgeIcon": "🌱"
  },
  {
    "id": "syn-074",
    "name": "Father and Son of Ravagers",
    "type": "Duo",
    "characterIds": [
      "char-b-068",
      "char-b-024"
    ],
    "characterNames": [
      "Yondu Udonta",
      "Star-Lord"
    ],
    "activationCondition": "Field all required heroes (Yondu Udonta + Star-Lord) in combat squad",
    "abilityName": "Yaka Arrow Symphony",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Yondu’s whistle sends the red Yaka arrow streaking through dozens of enemies while Quill clears stragglers.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EF4444",
    "badgeIcon": "🏹"
  },
  {
    "id": "syn-075",
    "name": "Infinity Watch Custodians",
    "type": "Duo",
    "characterIds": [
      "char-a-013",
      "char-a-005"
    ],
    "characterNames": [
      "Adam Warlock",
      "Thanos (Base / Armor)"
    ],
    "activationCondition": "Field all required heroes (Adam Warlock + Thanos (Base / Armor)) in combat squad",
    "abilityName": "Cosmic Soul Equilibrium",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Balancing life and death, Warlock and Thanos stabilize universal reality to neutralize incoming ultimate moves.",
    "bonusPower": 25,
    "shieldAmount": 0,
    "healAmount": 20,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "🪐"
  },
  {
    "id": "syn-076",
    "name": "Lightning on the Shield",
    "type": "Duo",
    "characterIds": [
      "char-b-003",
      "char-a-001"
    ],
    "characterNames": [
      "Captain America",
      "Thor Odinson"
    ],
    "activationCondition": "Field all required heroes (Captain America + Thor Odinson) in combat squad",
    "abilityName": "Mjolnir Batter-Up",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Thor swings Mjolnir like a bat into Cap’s shield, launching an acoustic shockwave that obliterates fortified doors.",
    "bonusPower": 22,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#0284C7",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-077",
    "name": "Lightning Re-Charge",
    "type": "Duo",
    "characterIds": [
      "char-b-002",
      "char-a-001"
    ],
    "characterNames": [
      "Iron Man",
      "Thor Odinson"
    ],
    "activationCondition": "Field all required heroes (Iron Man + Thor Odinson) in combat squad",
    "abilityName": "Overcharged 400% Capacity",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Thor blasts Iron Man’s armor with lightning, charging his arc reactor to 400% for an ultra-destructive beam.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-078",
    "name": "Friends from Work",
    "type": "Duo",
    "characterIds": [
      "char-a-006",
      "char-a-001"
    ],
    "characterNames": [
      "The Incredible Hulk",
      "Thor Odinson"
    ],
    "activationCondition": "Field all required heroes (The Incredible Hulk + Thor Odinson) in combat squad",
    "abilityName": "Arena Heavy Slam",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The two strongest Avengers trade punches then grab each other to spin into a catastrophic double-impact toss.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.25,
    "colorAccent": "#16A34A",
    "badgeIcon": "🏆"
  },
  {
    "id": "syn-079",
    "name": "Vibranium-Stark Tech Convergence",
    "type": "Duo",
    "characterIds": [
      "char-b-004",
      "char-b-002"
    ],
    "characterNames": [
      "Black Panther",
      "Iron Man"
    ],
    "activationCondition": "Field all required heroes (Black Panther + Iron Man) in combat squad",
    "abilityName": "Nanotech Kinetic Shield",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Wakandan vibranium weave bonds with Stark nanotech, creating a suit that absorbs and redirects kinetic shock.",
    "bonusPower": 20,
    "shieldAmount": 25,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#6366F1",
    "badgeIcon": "🛡️"
  },
  {
    "id": "syn-080",
    "name": "Cosmic Web Flight",
    "type": "Duo",
    "characterIds": [
      "char-a-004",
      "char-b-001"
    ],
    "characterNames": [
      "Captain Marvel",
      "Spider-Man"
    ],
    "activationCondition": "Field all required heroes (Captain Marvel + Spider-Man) in combat squad",
    "abilityName": "Sub-Orbital Web Drop",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Carol carries Peter to the upper stratosphere then throws him down at terminal velocity for a web ambush.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#FACC15",
    "badgeIcon": "🚀"
  },
  {
    "id": "syn-081",
    "name": "Claws in the Tempest",
    "type": "Duo",
    "characterIds": [
      "char-b-005",
      "char-a-024"
    ],
    "characterNames": [
      "Wolverine",
      "Storm"
    ],
    "activationCondition": "Field all required heroes (Wolverine + Storm) in combat squad",
    "abilityName": "Lightning Claw Tempest",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Storm charges Logan’s adamantium skeleton with high-voltage electricity as he leaps into the heart of the enemy.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#38BDF8",
    "badgeIcon": "🌩️"
  },
  {
    "id": "syn-082",
    "name": "Summers Plasma Resonance",
    "type": "Duo",
    "characterIds": [
      "char-b-013",
      "char-b-047"
    ],
    "characterNames": [
      "Cyclops",
      "Havok"
    ],
    "activationCondition": "Field all required heroes (Cyclops + Havok) in combat squad",
    "abilityName": "Cosmic Optic Cascade",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Brothers align optic concussive beams with ambient cosmic plasma rings to scorch wide battlefield swaths.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F97316",
    "badgeIcon": "💥"
  },
  {
    "id": "syn-083",
    "name": "Psionic Queens of Krakoa",
    "type": "Duo",
    "characterIds": [
      "char-a-032",
      "char-a-012"
    ],
    "characterNames": [
      "Emma Frost",
      "Jean Grey (Phoenix Avatar)"
    ],
    "activationCondition": "Field all required heroes (Emma Frost + Jean Grey (Phoenix Avatar)) in combat squad",
    "abilityName": "Dual Telepathic Mindwipe",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Twin omega-level telepaths overload enemy mental synapses, rendering the opposing champion completely helpless.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.45,
    "colorAccent": "#EC4899",
    "badgeIcon": "🧠"
  },
  {
    "id": "syn-084",
    "name": "Deadly Wings & Psychic Blade",
    "type": "Duo",
    "characterIds": [
      "char-b-035",
      "char-b-041"
    ],
    "characterNames": [
      "Psylocke",
      "Archangel"
    ],
    "activationCondition": "Field all required heroes (Psylocke + Archangel) in combat squad",
    "abilityName": "Razor Feather Psionic Flurry",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Warren fires metallic flechette feathers while Betsy slips through defenses to drive her psi-blade into brains.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 16,
    "stunChance": 0,
    "colorAccent": "#9333EA",
    "badgeIcon": "🪶"
  },
  {
    "id": "syn-085",
    "name": "House of Magnus Supremacy",
    "type": "Duo",
    "characterIds": [
      "char-a-009",
      "char-a-002"
    ],
    "characterNames": [
      "Magneto",
      "Scarlet Witch"
    ],
    "activationCondition": "Field all required heroes (Magneto + Scarlet Witch) in combat squad",
    "abilityName": "Chaos Magnetic Singularity",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Magneto crushes enemy weaponry into metal spheres while Wanda hexes them into antimatter detonators.",
    "bonusPower": 25,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#B91C1C",
    "badgeIcon": "🔮"
  },
  {
    "id": "syn-086",
    "name": "The Maximoff Twins",
    "type": "Duo",
    "characterIds": [
      "char-b-033",
      "char-a-002"
    ],
    "characterNames": [
      "Quicksilver",
      "Scarlet Witch"
    ],
    "activationCondition": "Field all required heroes (Quicksilver + Scarlet Witch) in combat squad",
    "abilityName": "Supersonic Hex Barrage",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Pietro runs at Mach 5 placing Wanda’s hex traps directly under enemy feet before they can react.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#38BDF8",
    "badgeIcon": "💨"
  },
  {
    "id": "syn-087",
    "name": "Crimson Syndicate Contract",
    "type": "Duo",
    "characterIds": [
      "char-b-075",
      "char-c-006"
    ],
    "characterNames": [
      "Kingpin",
      "Bullseye"
    ],
    "activationCondition": "Field all required heroes (Kingpin + Bullseye) in combat squad",
    "abilityName": "Fatal Point-Blank Execution",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Fisk crushes defenses with brute titanium canes while Bullseye fires a lethal projectile through armor gaps.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 17,
    "stunChance": 0,
    "colorAccent": "#64748B",
    "badgeIcon": "🎯"
  },
  {
    "id": "syn-088",
    "name": "Hydra High Command",
    "type": "Duo",
    "characterIds": [
      "char-b-063",
      "char-b-064"
    ],
    "characterNames": [
      "Red Skull",
      "Baron Helmut Zemo"
    ],
    "activationCondition": "Field all required heroes (Red Skull + Baron Helmut Zemo) in combat squad",
    "abilityName": "Totalitarian Blitzkrieg",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Tactical discipline and super-soldier serum serum unite to execute a brutal, calculated advance.",
    "bonusPower": 18,
    "shieldAmount": 16,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#991B1B",
    "badgeIcon": "🐙"
  },
  {
    "id": "syn-089",
    "name": "Sovereigns of Earth",
    "type": "Duo",
    "characterIds": [
      "char-a-007",
      "char-a-009"
    ],
    "characterNames": [
      "Doctor Doom",
      "Magneto"
    ],
    "activationCondition": "Field all required heroes (Doctor Doom + Magneto) in combat squad",
    "abilityName": "Latverian Magnetic Aegis",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Doom’s arcane-scientific forcefields interlock with Magneto’s planetary magnetic grid to repel all damage.",
    "bonusPower": 24,
    "shieldAmount": 30,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#059669",
    "badgeIcon": "👑"
  },
  {
    "id": "syn-090",
    "name": "Synthetic Father & Son",
    "type": "Duo",
    "characterIds": [
      "char-a-020",
      "char-a-014"
    ],
    "characterNames": [
      "Ultron Prime",
      "Vision"
    ],
    "activationCondition": "Field all required heroes (Ultron Prime + Vision) in combat squad",
    "abilityName": "Vibranium Cybernetic Breach",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Ultron hacks enemy systems while Vision phases through armor to sever power conduits at the atomic scale.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#DC2626",
    "badgeIcon": "🤖"
  },
  {
    "id": "syn-091",
    "name": "Masters of Chronos",
    "type": "Duo",
    "characterIds": [
      "char-a-018",
      "char-a-007"
    ],
    "characterNames": [
      "Kang The Conqueror",
      "Doctor Doom"
    ],
    "activationCondition": "Field all required heroes (Kang The Conqueror + Doctor Doom) in combat squad",
    "abilityName": "Timeline Erasure Protocol",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Time-traveling tyrants erase the enemy’s most advantageous combat rounds from the historical record.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#8B5CF6",
    "badgeIcon": "⏳"
  },
  {
    "id": "syn-092",
    "name": "The Gwens of the Multiverse",
    "type": "Duo",
    "characterIds": [
      "char-exp-002",
      "char-c-033"
    ],
    "characterNames": [
      "Ghost-Spider",
      "Gwenpool"
    ],
    "activationCondition": "Field all required heroes (Ghost-Spider + Gwenpool) in combat squad",
    "abilityName": "Comic Panel Sidestep",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Gwenpool steps into the gutters between panels to pull Ghost-Spider out of incoming attacks and ambush behind.",
    "bonusPower": 17,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 20,
    "stunChance": 0,
    "colorAccent": "#F43F5E",
    "badgeIcon": "📖"
  },
  {
    "id": "syn-093",
    "name": "Blood of Asgardian Kings",
    "type": "Duo",
    "characterIds": [
      "char-m-011",
      "char-a-001"
    ],
    "characterNames": [
      "Odin Borson",
      "Thor Odinson"
    ],
    "activationCondition": "Field all required heroes (Odin Borson + Thor Odinson) in combat squad",
    "abilityName": "Odinforce Thunder Surge",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The All-Father channels ancient cosmic wisdom directly into Thor, elevating Mjolnir strikes to divine devastation.",
    "bonusPower": 25,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EAB308",
    "badgeIcon": "👑"
  },
  {
    "id": "syn-094",
    "name": "Silent Crown of Attilan",
    "type": "Duo",
    "characterIds": [
      "char-a-015",
      "char-exp49-015"
    ],
    "characterNames": [
      "Black Bolt",
      "Medusa (Inhuman Queen)"
    ],
    "activationCondition": "Field all required heroes (Black Bolt + Medusa (Inhuman Queen)) in combat squad",
    "abilityName": "Living Hair Sonic Shriek",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Medusa immobilizes foes with tensile steel-hard hair before Black Bolt whispers a whisper that levels mountains.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#0284C7",
    "badgeIcon": "👑"
  },
  {
    "id": "syn-095",
    "name": "Kings of Atlantis & Wakanda",
    "type": "Duo",
    "characterIds": [
      "char-a-033",
      "char-b-004"
    ],
    "characterNames": [
      "Namor the Sub-Mariner",
      "Black Panther"
    ],
    "activationCondition": "Field all required heroes (Namor the Sub-Mariner + Black Panther) in combat squad",
    "abilityName": "Tsunami Vibranium Shock",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Tidal waves flood the battle arena, conducting Wakandan kinetic vibranium pulses across all underwater targets.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.25,
    "colorAccent": "#0D9488",
    "badgeIcon": "🔱"
  },
  {
    "id": "syn-096",
    "name": "Cosmic Vanguards",
    "type": "Duo",
    "characterIds": [
      "char-m-003",
      "char-a-021"
    ],
    "characterNames": [
      "Silver Surfer",
      "Nova Prime (Richard Rider)"
    ],
    "activationCondition": "Field all required heroes (Silver Surfer + Nova Prime (Richard Rider)) in combat squad",
    "abilityName": "Centurion Cosmic Nova",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The Nova Force combines with the Power Cosmic to generate a blinding stellar flare that obliterates armada hulls.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#0284C7",
    "badgeIcon": "⭐"
  },
  {
    "id": "syn-097",
    "name": "Fault Line Breakers",
    "type": "Duo",
    "characterIds": [
      "char-exp49-016",
      "char-exp49-017"
    ],
    "characterNames": [
      "Karnak the Shatterer",
      "Gorgon (Inhuman Titan)"
    ],
    "activationCondition": "Field all required heroes (Karnak the Shatterer + Gorgon (Inhuman Titan)) in combat squad",
    "abilityName": "Flaw Seismic Fracture",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Karnak identifies the single microscopic stress point in enemy armor and Gorgon stomps the ground to shatter it.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#78716C",
    "badgeIcon": "🥋"
  },
  {
    "id": "syn-098",
    "name": "Code Green Contingency",
    "type": "Duo",
    "characterIds": [
      "char-c-031",
      "char-a-006"
    ],
    "characterNames": [
      "Hulkbuster Iron Man",
      "The Incredible Hulk"
    ],
    "activationCondition": "Field all required heroes (Hulkbuster Iron Man + The Incredible Hulk) in combat squad",
    "abilityName": "Piston Smash Resonance",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "A heavy mechanical hydraulic fist and a raw gamma fist collide simultaneously on the target’s skull.",
    "bonusPower": 23,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🦾"
  },
  {
    "id": "syn-099",
    "name": "Punisher of the End Times",
    "type": "Duo",
    "characterIds": [
      "char-m-014",
      "char-a-005"
    ],
    "characterNames": [
      "Cosmic Ghost Rider",
      "Thanos (Base / Armor)"
    ],
    "activationCondition": "Field all required heroes (Cosmic Ghost Rider + Thanos (Base / Armor)) in combat squad",
    "abilityName": "Chains of Absolute Sin",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Frank Castle’s cosmic hellfire chains bind the damned while Thanos crushes their souls with raw titan might.",
    "bonusPower": 25,
    "shieldAmount": 0,
    "healAmount": 16,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EA580C",
    "badgeIcon": "💀"
  },
  {
    "id": "syn-100",
    "name": "Star Portal Nexus",
    "type": "Duo",
    "characterIds": [
      "char-b-085",
      "char-c-041"
    ],
    "characterNames": [
      "America Chavez",
      "Doctor Strange Supreme"
    ],
    "activationCondition": "Field all required heroes (America Chavez + Doctor Strange Supreme) in combat squad",
    "abilityName": "Multiversal Void Kick",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "America kicks open star-shaped interdimensional rifts while Strange banishes enemy weapons into dark pocket dimensions.",
    "bonusPower": 22,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#2563EB",
    "badgeIcon": "⭐"
  },
  {
    "id": "syn-101",
    "name": "The Avengers Trinity",
    "type": "Trio",
    "characterIds": [
      "char-b-003",
      "char-b-002",
      "char-a-001"
    ],
    "characterNames": [
      "Captain America",
      "Iron Man",
      "Thor Odinson"
    ],
    "activationCondition": "Field all required heroes (Captain America + Iron Man + Thor Odinson) in combat squad",
    "abilityName": "Avengers Assemble Cataclysm",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Shield, armor repulsors, and Mjolnir strike in unison, wiping the combat zone with triumphant hero power.",
    "bonusPower": 26,
    "shieldAmount": 25,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🅰️"
  },
  {
    "id": "syn-102",
    "name": "Spider-Trio of the Multiverse",
    "type": "Trio",
    "characterIds": [
      "char-b-001",
      "char-exp-001",
      "char-exp-002"
    ],
    "characterNames": [
      "Spider-Man",
      "Miles Morales",
      "Ghost-Spider"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Miles Morales + Ghost-Spider) in combat squad",
    "abilityName": "Dimensional Web Hurricane",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Three web-slingers weave a high-velocity bio-electric web funnel, immobilizing and shocking all adversaries.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#06B6D4",
    "badgeIcon": "🕸️"
  },
  {
    "id": "syn-103",
    "name": "Mutant Triangle Core",
    "type": "Trio",
    "characterIds": [
      "char-b-005",
      "char-b-013",
      "char-a-012"
    ],
    "characterNames": [
      "Wolverine",
      "Cyclops",
      "Jean Grey (Phoenix Avatar)"
    ],
    "activationCondition": "Field all required heroes (Wolverine + Cyclops + Jean Grey (Phoenix Avatar)) in combat squad",
    "abilityName": "Optic Phoenix Claw Storm",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Optic devastation and Phoenix fire engulf enemy positions as Wolverine leaps through the blaze unharmed to execute the boss.",
    "bonusPower": 25,
    "shieldAmount": 0,
    "healAmount": 18,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F97316",
    "badgeIcon": "🔥"
  },
  {
    "id": "syn-104",
    "name": "Midnight Sons Trinity",
    "type": "Trio",
    "characterIds": [
      "char-exp-003",
      "char-b-018",
      "char-a-019"
    ],
    "characterNames": [
      "Blade",
      "Moon Knight",
      "Ghost Rider (Johnny Blaze)"
    ],
    "activationCondition": "Field all required heroes (Blade + Moon Knight + Ghost Rider (Johnny Blaze)) in combat squad",
    "abilityName": "Damnation Purge Ritual",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Silver, Khonshu crescent darts, and unholy hellfire chains converge into a devastating occult exorcism wave.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 20,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#475569",
    "badgeIcon": "🌙"
  },
  {
    "id": "syn-105",
    "name": "The Illuminati Triumvirate",
    "type": "Trio",
    "characterIds": [
      "char-a-003",
      "char-b-002",
      "char-b-004"
    ],
    "characterNames": [
      "Doctor Strange",
      "Iron Man",
      "Black Panther"
    ],
    "activationCondition": "Field all required heroes (Doctor Strange + Iron Man + Black Panther) in combat squad",
    "abilityName": "Calculated Reality Defense",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Magic, technology, and vibranium science form an impregnable omni-shield that absorbs all incoming turn damage.",
    "bonusPower": 23,
    "shieldAmount": 32,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#8B5CF6",
    "badgeIcon": "👁️"
  },
  {
    "id": "syn-106",
    "name": "Daughters of the Mad Titan",
    "type": "Trio",
    "characterIds": [
      "char-b-022",
      "char-b-026",
      "char-a-005"
    ],
    "characterNames": [
      "Gamora",
      "Nebula",
      "Thanos (Base / Armor)"
    ],
    "activationCondition": "Field all required heroes (Gamora + Nebula + Thanos (Base / Armor)) in combat squad",
    "abilityName": "Balancing the Universe",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Thanos commands his deadliest cybernetic daughters in a merciless high-speed flanking decimation maneuver.",
    "bonusPower": 25,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 20,
    "stunChance": 0,
    "colorAccent": "#7E22CE",
    "badgeIcon": "🗡️"
  },
  {
    "id": "syn-107",
    "name": "Asgardian Crown Succession",
    "type": "Trio",
    "characterIds": [
      "char-a-001",
      "char-exp49-001",
      "char-a-008"
    ],
    "characterNames": [
      "Thor Odinson",
      "Loki (God of Stories)",
      "Hela"
    ],
    "activationCondition": "Field all required heroes (Thor Odinson + Loki (God of Stories) + Hela) in combat squad",
    "abilityName": "Ragnarok Royal Decree",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Thunder, trickery, and death magic merge into an apocalyptic royal burst that rewrites combat rolls.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 16,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#10B981",
    "badgeIcon": "👑"
  },
  {
    "id": "syn-108",
    "name": "Web-Head's Worst Nightmares",
    "type": "Trio",
    "characterIds": [
      "char-b-027",
      "char-b-028",
      "char-b-007"
    ],
    "characterNames": [
      "Green Goblin",
      "Doctor Octopus",
      "Venom"
    ],
    "activationCondition": "Field all required heroes (Green Goblin + Doctor Octopus + Venom) in combat squad",
    "abilityName": "Symbiotic Pumpkin Carnage",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Tentacles ensnare, pumpkin bombs explode, and symbiote jaws rend targets in pure villainous pandemonium.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#15803D",
    "badgeIcon": "🎃"
  },
  {
    "id": "syn-109",
    "name": "Marvel Knights Urban Purge",
    "type": "Trio",
    "characterIds": [
      "char-b-077",
      "char-b-076",
      "char-c-007"
    ],
    "characterNames": [
      "Daredevil (Shadowland Master)",
      "The Punisher (Tactical Armor)",
      "Elektra Natchios"
    ],
    "activationCondition": "Field all required heroes (Daredevil (Shadowland Master) + The Punisher (Tactical Armor) + Elektra Natchios) in combat squad",
    "abilityName": "Cleanse the Streets",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Non-lethal radar strikes set up pinpoint ballistic snipes and sai executions in a relentless street war.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 20,
    "stunChance": 0,
    "colorAccent": "#B91C1C",
    "badgeIcon": "⚔️"
  },
  {
    "id": "syn-110",
    "name": "Defenders Ground Crew",
    "type": "Trio",
    "characterIds": [
      "char-b-020",
      "char-b-021",
      "char-c-018"
    ],
    "characterNames": [
      "Luke Cage",
      "Iron Fist",
      "Jessica Jones"
    ],
    "activationCondition": "Field all required heroes (Luke Cage + Iron Fist + Jessica Jones) in combat squad",
    "abilityName": "Harlem Earthquake Stomp",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Three unbreakable champions stomp the earth simultaneously, launching shockwaves that topple heavily armored targets.",
    "bonusPower": 21,
    "shieldAmount": 24,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "👊"
  },
  {
    "id": "syn-111",
    "name": "Quiet Council Triumvirate",
    "type": "Trio",
    "characterIds": [
      "char-a-031",
      "char-a-009",
      "char-a-032"
    ],
    "characterNames": [
      "Professor X",
      "Magneto",
      "Emma Frost"
    ],
    "activationCondition": "Field all required heroes (Professor X + Magneto + Emma Frost) in combat squad",
    "abilityName": "Omega Telepathic Grid",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Immense psychic and magnetic pressures lock down enemy mental faculties while stripping away all metallic arms.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.45,
    "colorAccent": "#EC4899",
    "badgeIcon": "🧠"
  },
  {
    "id": "syn-112",
    "name": "Shield Brothers Legacy",
    "type": "Trio",
    "characterIds": [
      "char-b-003",
      "char-b-010",
      "char-b-080"
    ],
    "characterNames": [
      "Captain America",
      "Winter Soldier",
      "Falcon (Captain America Suit)"
    ],
    "activationCondition": "Field all required heroes (Captain America + Winter Soldier + Falcon (Captain America Suit)) in combat squad",
    "abilityName": "Tactical Triangle Maneuver",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Three wielders of the stars and stripes form an impenetrable defensive barrier and leap-frog counter-offensive.",
    "bonusPower": 22,
    "shieldAmount": 26,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#2563EB",
    "badgeIcon": "⭐"
  },
  {
    "id": "syn-113",
    "name": "Precision Infiltration Cell",
    "type": "Trio",
    "characterIds": [
      "char-c-001",
      "char-c-003",
      "char-c-002"
    ],
    "characterNames": [
      "Hawkeye",
      "Kate Bishop",
      "Black Widow"
    ],
    "activationCondition": "Field all required heroes (Hawkeye + Kate Bishop + Black Widow) in combat squad",
    "abilityName": "Stealth Bullseye Snipe",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Acrobatic distraction creates absolute silence for dual sonic trick arrows to disable enemy command systems.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 22,
    "stunChance": 0,
    "colorAccent": "#8B5CF6",
    "badgeIcon": "🎯"
  },
  {
    "id": "syn-114",
    "name": "Playful Avengers Strike",
    "type": "Trio",
    "characterIds": [
      "char-b-012",
      "char-b-019",
      "char-b-001"
    ],
    "characterNames": [
      "Ant-Man",
      "She-Hulk",
      "Spider-Man"
    ],
    "activationCondition": "Field all required heroes (Ant-Man + She-Hulk + Spider-Man) in combat squad",
    "abilityName": "Micro-Giant Pinball Blitz",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Ant-Man shrinks She-Hulk who is web-slung by Spidey, then expands to full size at point-blank range on the boss!",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#16A34A",
    "badgeIcon": "🐜"
  },
  {
    "id": "syn-115",
    "name": "Guardians Strike Core",
    "type": "Trio",
    "characterIds": [
      "char-b-024",
      "char-b-022",
      "char-b-023"
    ],
    "characterNames": [
      "Star-Lord",
      "Gamora",
      "Drax the Destroyer"
    ],
    "activationCondition": "Field all required heroes (Star-Lord + Gamora + Drax the Destroyer) in combat squad",
    "abilityName": "Milano Orbital Drop",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Quill calls down an orbital artillery barrage while Gamora and Drax carve a bloody corridor through enemy lines.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#059669",
    "badgeIcon": "🚀"
  },
  {
    "id": "syn-116",
    "name": "Cosmic Vanguards Trinity",
    "type": "Trio",
    "characterIds": [
      "char-m-003",
      "char-a-013",
      "char-a-016"
    ],
    "characterNames": [
      "Silver Surfer",
      "Adam Warlock",
      "Beta Ray Bill"
    ],
    "activationCondition": "Field all required heroes (Silver Surfer + Adam Warlock + Beta Ray Bill) in combat squad",
    "abilityName": "Galactic Storm Annihilation",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Power Cosmic, Soul Gem, and Stormbreaker channel the elemental fury of creation to incinerate star fleets.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#0284C7",
    "badgeIcon": "🌌"
  },
  {
    "id": "syn-117",
    "name": "Symbiote Godhead Unbound",
    "type": "Trio",
    "characterIds": [
      "char-m-001",
      "char-b-008",
      "char-exp-049"
    ],
    "characterNames": [
      "Knull",
      "Carnage",
      "King in Black Venom"
    ],
    "activationCondition": "Field all required heroes (Knull + Carnage + King in Black Venom) in combat squad",
    "abilityName": "Abyssal Hive Necro-Cleave",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The God of the Klyntar and his apex avatars tear open the void, flooding the combat arena in all-consuming black ooze.",
    "bonusPower": 28,
    "shieldAmount": 0,
    "healAmount": 20,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#450A0A",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-118",
    "name": "Masters of Villainy",
    "type": "Trio",
    "characterIds": [
      "char-a-007",
      "char-a-009",
      "char-b-063"
    ],
    "characterNames": [
      "Doctor Doom",
      "Magneto",
      "Red Skull"
    ],
    "activationCondition": "Field all required heroes (Doctor Doom + Magneto + Red Skull) in combat squad",
    "abilityName": "Cabal World Domination",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Ruthless strategic intellects pool arcane runes, magnetic pulses, and supreme tactical arrogance to crush opponents.",
    "bonusPower": 26,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#047857",
    "badgeIcon": "👑"
  },
  {
    "id": "syn-119",
    "name": "Omega Mutant Council",
    "type": "Trio",
    "characterIds": [
      "char-a-024",
      "char-a-025",
      "char-a-009"
    ],
    "characterNames": [
      "Storm",
      "Iceman (Omega Level)",
      "Magneto"
    ],
    "activationCondition": "Field all required heroes (Storm + Iceman (Omega Level) + Magneto) in combat squad",
    "abilityName": "Atmospheric Hyper-Storm",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Atmospheric storms, absolute-zero subatomic freeze, and planetary electromagnetism rip the battlefield to shreds.",
    "bonusPower": 28,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#0EA5E9",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-120",
    "name": "Giant-Size X-Men Strike",
    "type": "Trio",
    "characterIds": [
      "char-b-014",
      "char-b-005",
      "char-b-017"
    ],
    "characterNames": [
      "Colossus",
      "Wolverine",
      "Nightcrawler"
    ],
    "activationCondition": "Field all required heroes (Colossus + Wolverine + Nightcrawler) in combat squad",
    "abilityName": "BAMF Fastball Guillotine",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Nightcrawler teleports behind enemies as Colossus launches Logan directly through the target’s armored center.",
    "bonusPower": 25,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "💥"
  },
  {
    "id": "syn-121",
    "name": "House of LeBeau & Darkholme",
    "type": "Trio",
    "characterIds": [
      "char-b-016",
      "char-b-015",
      "char-exp-005"
    ],
    "characterNames": [
      "Rogue",
      "Gambit",
      "Mystique"
    ],
    "activationCondition": "Field all required heroes (Rogue + Gambit + Mystique) in combat squad",
    "abilityName": "Infiltration Kinetic Theft",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Mystique disorients enemy formations allowing Rogue to siphon life essence and Gambit to detonate weapons.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 18,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#DB2777",
    "badgeIcon": "🃏"
  },
  {
    "id": "syn-122",
    "name": "Wakandan Royal Legion",
    "type": "Trio",
    "characterIds": [
      "char-b-004",
      "char-b-067",
      "char-b-029"
    ],
    "characterNames": [
      "Black Panther",
      "Okoye",
      "Killmonger"
    ],
    "activationCondition": "Field all required heroes (Black Panther + Okoye + Killmonger) in combat squad",
    "abilityName": "Spear of the Black Panther",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Vibranium energy shields form a phalanx while divine panther totems leap forward to execute elite threats.",
    "bonusPower": 23,
    "shieldAmount": 26,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#4F46E5",
    "badgeIcon": "🐾"
  },
  {
    "id": "syn-123",
    "name": "Black Order Vanguard",
    "type": "Trio",
    "characterIds": [
      "char-a-048",
      "char-a-047",
      "char-a-046"
    ],
    "characterNames": [
      "Corvus Glaive",
      "Proxima Midnight",
      "Cull Obsidian"
    ],
    "activationCondition": "Field all required heroes (Corvus Glaive + Proxima Midnight + Cull Obsidian) in combat squad",
    "abilityName": "Titan's Wrath Encirclement",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Invulnerable glaives, star-spears, and massive war-hammers crush the opposition beneath brutal extraterrestrial tyranny.",
    "bonusPower": 25,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#581C87",
    "badgeIcon": "🪐"
  },
  {
    "id": "syn-124",
    "name": "Sinister Heavy Hitters",
    "type": "Trio",
    "characterIds": [
      "char-b-038",
      "char-b-045",
      "char-b-072"
    ],
    "characterNames": [
      "Electro",
      "Rhino",
      "Scorpion"
    ],
    "activationCondition": "Field all required heroes (Electro + Rhino + Scorpion) in combat squad",
    "abilityName": "High-Voltage Battering Ram",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Electro charges Rhino’s armor with millions of volts as he charges down enemy lines, followed by acidic tail strikes.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#EAB308",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-125",
    "name": "Hunters of the Illusion",
    "type": "Trio",
    "characterIds": [
      "char-b-036",
      "char-b-040",
      "char-b-037"
    ],
    "characterNames": [
      "Mysterio",
      "Kraven the Hunter",
      "Sandman"
    ],
    "activationCondition": "Field all required heroes (Mysterio + Kraven the Hunter + Sandman) in combat squad",
    "abilityName": "Quicksand Mirage Ambush",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Mysterio conjures disorienting phantoms while Sandman engulfs enemy footing and Kraven delivers fatal poisoned blows.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#10B981",
    "badgeIcon": "⏳"
  },
  {
    "id": "syn-126",
    "name": "Spider-Verse Rebellion",
    "type": "Trio",
    "characterIds": [
      "char-exp-009",
      "char-c-025",
      "char-c-026"
    ],
    "characterNames": [
      "Spider-Man 2099",
      "Spider-Punk",
      "Spider-Man Noir"
    ],
    "activationCondition": "Field all required heroes (Spider-Man 2099 + Spider-Punk + Spider-Man Noir) in combat squad",
    "abilityName": "Anarchic Punk Sonic Webbing",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Punk rock sound amplifiers blast distortion chords as future talons and 1930s revolver rounds overwhelm defenses.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#EF4444",
    "badgeIcon": "🎸"
  },
  {
    "id": "syn-127",
    "name": "Excalibur Royal Court",
    "type": "Trio",
    "characterIds": [
      "char-exp-014",
      "char-b-035",
      "char-exp-015"
    ],
    "characterNames": [
      "Captain Britain",
      "Psylocke",
      "Black Knight"
    ],
    "activationCondition": "Field all required heroes (Captain Britain + Psylocke + Black Knight) in combat squad",
    "abilityName": "Ebony Blade Avalon Glory",
    "effectCategory": "SHIELD",
    "gameplayDescription": "The mystic energies of Otherworld and the Ebony Blade project an ancient holy aura that repels magical attacks.",
    "bonusPower": 24,
    "shieldAmount": 25,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#3B82F6",
    "badgeIcon": "🛡️"
  },
  {
    "id": "syn-128",
    "name": "Lords of the Deep Ocean",
    "type": "Trio",
    "characterIds": [
      "char-a-033",
      "char-c-053",
      "char-c-065"
    ],
    "characterNames": [
      "Namor the Sub-Mariner",
      "Tiger Shark",
      "Triton"
    ],
    "activationCondition": "Field all required heroes (Namor the Sub-Mariner + Tiger Shark + Triton) in combat squad",
    "abilityName": "Tidal Abyssal Maelstrom",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Triton calls forth ocean sea-beasts while Namor and Attuma lead an aquatic charge that drowns landlocked armies.",
    "bonusPower": 23,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#0D9488",
    "badgeIcon": "🔱"
  },
  {
    "id": "syn-129",
    "name": "Royal Court of Attilan",
    "type": "Trio",
    "characterIds": [
      "char-a-015",
      "char-exp49-015",
      "char-exp49-016"
    ],
    "characterNames": [
      "Black Bolt",
      "Medusa (Inhuman Queen)",
      "Karnak the Shatterer"
    ],
    "activationCondition": "Field all required heroes (Black Bolt + Medusa (Inhuman Queen) + Karnak the Shatterer) in combat squad",
    "abilityName": "Terrigenesis Royal Decree",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Karnak reveals structural weaknesses, Medusa restrains the target, and Black Bolt whispers total annihilation.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#0369A1",
    "badgeIcon": "👑"
  },
  {
    "id": "syn-130",
    "name": "Gods of the Frontline",
    "type": "Trio",
    "characterIds": [
      "char-a-010",
      "char-a-057",
      "char-a-030"
    ],
    "characterNames": [
      "The Sentry",
      "Ares",
      "Hercules"
    ],
    "activationCondition": "Field all required heroes (The Sentry + Ares + Hercules) in combat squad",
    "abilityName": "Olympian Hyper-Slam",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Golden age mythology and the power of a million exploding suns collide in an earth-shattering brute force shockwave.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "☀️"
  },
  {
    "id": "syn-131",
    "name": "Sorcerers of the Arcane Veil",
    "type": "Trio",
    "characterIds": [
      "char-a-003",
      "char-exp-037",
      "char-a-028"
    ],
    "characterNames": [
      "Doctor Strange",
      "Doctor Voodoo",
      "Magik"
    ],
    "activationCondition": "Field all required heroes (Doctor Strange + Doctor Voodoo + Magik) in combat squad",
    "abilityName": "Astral Banishing Hex",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Voodoo loa spirits and Limbo hell portals amplify Strange’s Eldritch spells to purge entire demonic legions.",
    "bonusPower": 25,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#7C3AED",
    "badgeIcon": "🔮"
  },
  {
    "id": "syn-132",
    "name": "The Three Logans",
    "type": "Trio",
    "characterIds": [
      "char-b-005",
      "char-exp-006",
      "char-exp-040"
    ],
    "characterNames": [
      "Wolverine",
      "Sabretooth",
      "Old Man Logan"
    ],
    "activationCondition": "Field all required heroes (Wolverine + Sabretooth + Old Man Logan) in combat squad",
    "abilityName": "Immortal Berserker Rage",
    "effectCategory": "HEALING",
    "gameplayDescription": "Past, present, and alternate future apex predators attack in savage synchronization, healing rapidly after every round.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 24,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#B91C1C",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-133",
    "name": "Heavy Armor Artillery Division",
    "type": "Trio",
    "characterIds": [
      "char-c-031",
      "char-b-011",
      "char-b-078"
    ],
    "characterNames": [
      "Hulkbuster Iron Man",
      "War Machine",
      "Iron Patriot"
    ],
    "activationCondition": "Field all required heroes (Hulkbuster Iron Man + War Machine + Iron Patriot) in combat squad",
    "abilityName": "Full Armament Salvo",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Triple heavy Stark ordnance units unleash sustained micro-missiles, kinetic miniguns, and repulsor cannons.",
    "bonusPower": 24,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🚀"
  },
  {
    "id": "syn-134",
    "name": "Council of Prankster Lokis",
    "type": "Trio",
    "characterIds": [
      "char-exp49-006",
      "char-exp49-003",
      "char-exp49-007"
    ],
    "characterNames": [
      "Kid Loki",
      "Classic Loki (Glorious Purpose)",
      "Alligator Loki"
    ],
    "activationCondition": "Field all required heroes (Kid Loki + Classic Loki (Glorious Purpose) + Alligator Loki) in combat squad",
    "abilityName": "Glorious Chaos Mirage",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Illusory golden Asgard projections baffle enemy tracking while the Alligator variant bites the commander’s hand off!",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.45,
    "colorAccent": "#16A34A",
    "badgeIcon": "🐊"
  },
  {
    "id": "syn-135",
    "name": "All-Riders Damnation Grand Prix",
    "type": "Trio",
    "characterIds": [
      "char-a-019",
      "char-c-035",
      "char-m-014"
    ],
    "characterNames": [
      "Ghost Rider (Johnny Blaze)",
      "Ghost Rider (Robbie Reyes)",
      "Cosmic Ghost Rider"
    ],
    "activationCondition": "Field all required heroes (Ghost Rider (Johnny Blaze) + Ghost Rider (Robbie Reyes) + Cosmic Ghost Rider) in combat squad",
    "abilityName": "Triple Hellfire Hell-Cycle Drift",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Three spirit of vengeance riders roar across the arena, scorching the earth in blue, orange, and cosmic hellfire.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EA580C",
    "badgeIcon": "🔥"
  },
  {
    "id": "syn-136",
    "name": "The Classic Avengers Core",
    "type": "Team",
    "characterIds": [
      "char-b-003",
      "char-b-002",
      "char-a-001",
      "char-c-002"
    ],
    "characterNames": [
      "Captain America",
      "Iron Man",
      "Thor Odinson",
      "Black Widow"
    ],
    "activationCondition": "Field all required heroes (Captain America + Iron Man + Thor Odinson + Black Widow) in combat squad",
    "abilityName": "Earth's Mightiest Heroes Protocol",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The founding pillars of the Avengers execute integrated military tactical supremacy across all combat zones.",
    "bonusPower": 28,
    "shieldAmount": 25,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🅰️"
  },
  {
    "id": "syn-137",
    "name": "X-Men Gold Squad",
    "type": "Team",
    "characterIds": [
      "char-b-013",
      "char-a-012",
      "char-b-005",
      "char-a-024"
    ],
    "characterNames": [
      "Cyclops",
      "Jean Grey (Phoenix Avatar)",
      "Wolverine",
      "Storm"
    ],
    "activationCondition": "Field all required heroes (Cyclops + Jean Grey (Phoenix Avatar) + Wolverine + Storm) in combat squad",
    "abilityName": "Krakoan Evolutionary Ascendance",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Mutant synergy at peak perfection: weather manipulation, telepathy, optics, and adamantium shred all opposition.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 20,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "❌"
  },
  {
    "id": "syn-138",
    "name": "Web-Warriors Multiverse Corps",
    "type": "Team",
    "characterIds": [
      "char-b-001",
      "char-exp-001",
      "char-exp-002",
      "char-exp-009"
    ],
    "characterNames": [
      "Spider-Man",
      "Miles Morales",
      "Ghost-Spider",
      "Spider-Man 2099"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Miles Morales + Ghost-Spider + Spider-Man 2099) in combat squad",
    "abilityName": "The Great Web Overdrive",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "The Web of Life and Destiny binds all four heroes, granting precognitive evasion and overwhelming web traps.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.45,
    "colorAccent": "#0284C7",
    "badgeIcon": "🕸️"
  },
  {
    "id": "syn-139",
    "name": "Midnight Sons Grand Coven",
    "type": "Team",
    "characterIds": [
      "char-exp-003",
      "char-b-018",
      "char-a-019",
      "char-a-003"
    ],
    "characterNames": [
      "Blade",
      "Moon Knight",
      "Ghost Rider (Johnny Blaze)",
      "Doctor Strange"
    ],
    "activationCondition": "Field all required heroes (Blade + Moon Knight + Ghost Rider (Johnny Blaze) + Doctor Strange) in combat squad",
    "abilityName": "Banishment to the Outer Dark",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Four masters of the occult combine mystic spells, hellfire, silver, and crescent steel to banish dark lords.",
    "bonusPower": 28,
    "shieldAmount": 0,
    "healAmount": 22,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#7E22CE",
    "badgeIcon": "🌙"
  },
  {
    "id": "syn-140",
    "name": "Guardians of the Galaxy Prime",
    "type": "Team",
    "characterIds": [
      "char-b-024",
      "char-b-022",
      "char-b-023",
      "char-b-025"
    ],
    "characterNames": [
      "Star-Lord",
      "Gamora",
      "Drax the Destroyer",
      "Groot"
    ],
    "activationCondition": "Field all required heroes (Star-Lord + Gamora + Drax the Destroyer + Groot) in combat squad",
    "abilityName": "Cosmic Mix Vol. 1 Beatdown",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Blasting 1970s rock through com-links, the ragtag crew unleashes chaotic, uncoordinated brilliance that always wins.",
    "bonusPower": 26,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#10B981",
    "badgeIcon": "🎸"
  },
  {
    "id": "syn-141",
    "name": "Sinister Four Devastation",
    "type": "Team",
    "characterIds": [
      "char-b-027",
      "char-b-028",
      "char-b-007",
      "char-b-038"
    ],
    "characterNames": [
      "Green Goblin",
      "Doctor Octopus",
      "Venom",
      "Electro"
    ],
    "activationCondition": "Field all required heroes (Green Goblin + Doctor Octopus + Venom + Electro) in combat squad",
    "abilityName": "New York City Blackout Smash",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Four legendary supervillains level city blocks with concentrated electricity, tentacles, bombs, and symbiotes.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#16A34A",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-142",
    "name": "Defenders of New York",
    "type": "Team",
    "characterIds": [
      "char-b-077",
      "char-b-020",
      "char-b-021",
      "char-c-018"
    ],
    "characterNames": [
      "Daredevil (Shadowland Master)",
      "Luke Cage",
      "Iron Fist",
      "Jessica Jones"
    ],
    "activationCondition": "Field all required heroes (Daredevil (Shadowland Master) + Luke Cage + Iron Fist + Jessica Jones) in combat squad",
    "abilityName": "Street-Level Justice Overdrive",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Harlem, Hell's Kitchen, and Chinatown unite behind unbreakable skin, Chi dragons, radar, and super-strength.",
    "bonusPower": 25,
    "shieldAmount": 25,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "🏙️"
  },
  {
    "id": "syn-143",
    "name": "The Black Order Armada",
    "type": "Team",
    "characterIds": [
      "char-a-005",
      "char-a-048",
      "char-a-047",
      "char-a-046"
    ],
    "characterNames": [
      "Thanos (Base / Armor)",
      "Corvus Glaive",
      "Proxima Midnight",
      "Cull Obsidian"
    ],
    "activationCondition": "Field all required heroes (Thanos (Base / Armor) + Corvus Glaive + Proxima Midnight + Cull Obsidian) in combat squad",
    "abilityName": "Cull the Unworthy",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Thanos and his generals execute cold-blooded planetary conquest, disintegrating enemy defensive lines.",
    "bonusPower": 29,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#581C87",
    "badgeIcon": "🪐"
  },
  {
    "id": "syn-144",
    "name": "Brotherhood of Evil Mutants",
    "type": "Team",
    "characterIds": [
      "char-a-009",
      "char-exp-005",
      "char-exp-006",
      "char-a-026"
    ],
    "characterNames": [
      "Magneto",
      "Mystique",
      "Sabretooth",
      "Juggernaut"
    ],
    "activationCondition": "Field all required heroes (Magneto + Mystique + Sabretooth + Juggernaut) in combat squad",
    "abilityName": "Homo Superior Dominance",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Unstoppable momentum, magnetic cataclysm, feral slaughter, and flawless espionage overwhelm human authority.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#B91C1C",
    "badgeIcon": "🧲"
  },
  {
    "id": "syn-145",
    "name": "Pantheon of Asgardian Gods",
    "type": "Team",
    "characterIds": [
      "char-a-001",
      "char-exp49-001",
      "char-a-008",
      "char-m-011"
    ],
    "characterNames": [
      "Thor Odinson",
      "Loki (God of Stories)",
      "Hela",
      "Odin Borson"
    ],
    "activationCondition": "Field all required heroes (Thor Odinson + Loki (God of Stories) + Hela + Odin Borson) in combat squad",
    "abilityName": "Twilight of the Gods Awakening",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The entire ruling dynasty of Asgard channels the divine Odinforce, ancient necromancy, and multiversal story magic.",
    "bonusPower": 30,
    "shieldAmount": 25,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EAB308",
    "badgeIcon": "👑"
  },
  {
    "id": "syn-146",
    "name": "The Illuminati Cabal",
    "type": "Team",
    "characterIds": [
      "char-a-003",
      "char-b-002",
      "char-b-004",
      "char-a-033"
    ],
    "characterNames": [
      "Doctor Strange",
      "Iron Man",
      "Black Panther",
      "Namor the Sub-Mariner"
    ],
    "activationCondition": "Field all required heroes (Doctor Strange + Iron Man + Black Panther + Namor the Sub-Mariner) in combat squad",
    "abilityName": "Incursion Protocol Zero",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "The secret architects of Marvel Earth anticipate every enemy move three turns in advance, neutralizing threats.",
    "bonusPower": 28,
    "shieldAmount": 30,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#6366F1",
    "badgeIcon": "👁️"
  },
  {
    "id": "syn-147",
    "name": "X-Force Strike Team",
    "type": "Team",
    "characterIds": [
      "char-b-005",
      "char-b-006",
      "char-b-014",
      "char-b-035"
    ],
    "characterNames": [
      "Wolverine",
      "Deadpool",
      "Colossus",
      "Psylocke"
    ],
    "activationCondition": "Field all required heroes (Wolverine + Deadpool + Colossus + Psylocke) in combat squad",
    "abilityName": "Black-Ops Lethal Incursion",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "No rules, no prisoners: mutant black-ops team deploys silenced sniper fire, katanas, and psychic blades.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 24,
    "stunChance": 0,
    "colorAccent": "#334155",
    "badgeIcon": "⚔️"
  },
  {
    "id": "syn-148",
    "name": "Vigilantes of the Dark",
    "type": "Team",
    "characterIds": [
      "char-b-001",
      "char-b-077",
      "char-b-076",
      "char-b-018"
    ],
    "characterNames": [
      "Spider-Man",
      "Daredevil (Shadowland Master)",
      "The Punisher (Tactical Armor)",
      "Moon Knight"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Daredevil (Shadowland Master) + The Punisher (Tactical Armor) + Moon Knight) in combat squad",
    "abilityName": "Rooftop Midnight Snare",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Four urban shadow legends ambush from rooftops, leaving opponents disoriented, disarmed, and unconscious.",
    "bonusPower": 25,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 22,
    "stunChance": 0,
    "colorAccent": "#475569",
    "badgeIcon": "🦇"
  },
  {
    "id": "syn-149",
    "name": "Super-Soldier Special Operations",
    "type": "Team",
    "characterIds": [
      "char-b-003",
      "char-b-010",
      "char-b-080",
      "char-c-024"
    ],
    "characterNames": [
      "Captain America",
      "Winter Soldier",
      "Falcon (Captain America Suit)",
      "Sharon Carter"
    ],
    "activationCondition": "Field all required heroes (Captain America + Winter Soldier + Falcon (Captain America Suit) + Sharon Carter) in combat squad",
    "abilityName": "Stars and Stripes Crossfire",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Tactical combat perfection: overlapping shields, drone surveillance, sniper cover, and espionage mastery.",
    "bonusPower": 24,
    "shieldAmount": 28,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#1D4ED8",
    "badgeIcon": "🛡️"
  },
  {
    "id": "syn-150",
    "name": "The Iron Legion Armory",
    "type": "Team",
    "characterIds": [
      "char-b-002",
      "char-b-011",
      "char-c-031",
      "char-b-079"
    ],
    "characterNames": [
      "Iron Man",
      "War Machine",
      "Hulkbuster Iron Man",
      "Ironheart"
    ],
    "activationCondition": "Field all required heroes (Iron Man + War Machine + Hulkbuster Iron Man + Ironheart) in combat squad",
    "abilityName": "Full Spectrum Repulsor Grid",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Stark Industries orbital satellite links all four armored heroes for a blinding, sustained unibeam orbital strike.",
    "bonusPower": 27,
    "shieldAmount": 24,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🚀"
  },
  {
    "id": "syn-151",
    "name": "Cosmic End-Bringer Quartet",
    "type": "Team",
    "characterIds": [
      "char-m-001",
      "char-m-013",
      "char-a-008",
      "char-a-005"
    ],
    "characterNames": [
      "Knull",
      "Gorr the God Butcher",
      "Hela",
      "Thanos (Base / Armor)"
    ],
    "activationCondition": "Field all required heroes (Knull + Gorr the God Butcher + Hela + Thanos (Base / Armor)) in combat squad",
    "abilityName": "Universal Deicide Cleave",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The four most terrifying extinction-level villains in Marvel history align to extinguish all light in the cosmos.",
    "bonusPower": 30,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#3B0764",
    "badgeIcon": "💀"
  },
  {
    "id": "syn-152",
    "name": "Annihilators Cosmic Armada",
    "type": "Team",
    "characterIds": [
      "char-m-003",
      "char-a-013",
      "char-a-016",
      "char-a-021"
    ],
    "characterNames": [
      "Silver Surfer",
      "Adam Warlock",
      "Beta Ray Bill",
      "Nova Prime (Richard Rider)"
    ],
    "activationCondition": "Field all required heroes (Silver Surfer + Adam Warlock + Beta Ray Bill + Nova Prime (Richard Rider)) in combat squad",
    "abilityName": "Galactic Core Annihilation",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Assembled to combat threats that would destroy entire galaxies, channeling boundless stellar cosmic wrath.",
    "bonusPower": 29,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#0284C7",
    "badgeIcon": "🌌"
  },
  {
    "id": "syn-153",
    "name": "Inhuman Royal Family",
    "type": "Team",
    "characterIds": [
      "char-a-015",
      "char-exp49-015",
      "char-exp49-016",
      "char-exp49-017"
    ],
    "characterNames": [
      "Black Bolt",
      "Medusa (Inhuman Queen)",
      "Karnak the Shatterer",
      "Gorgon (Inhuman Titan)"
    ],
    "activationCondition": "Field all required heroes (Black Bolt + Medusa (Inhuman Queen) + Karnak the Shatterer + Gorgon (Inhuman Titan)) in combat squad",
    "abilityName": "Terrigenesis Awakening Strike",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The genetic perfection of the Inhuman lineage overwhelms foes with royal voices, hair, fractures, and seismic stomps.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#0284C7",
    "badgeIcon": "👑"
  },
  {
    "id": "syn-154",
    "name": "Gamma World Smashers",
    "type": "Team",
    "characterIds": [
      "char-a-006",
      "char-b-019",
      "char-a-027",
      "char-exp-016"
    ],
    "characterNames": [
      "The Incredible Hulk",
      "She-Hulk",
      "Red Hulk",
      "Skaar"
    ],
    "activationCondition": "Field all required heroes (The Incredible Hulk + She-Hulk + Red Hulk + Skaar) in combat squad",
    "abilityName": "Planetary Cataclysm Quake",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Four hulking gamma titans slam the bedrock simultaneously, shattering the tectonic plates of the battlefield.",
    "bonusPower": 29,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#15803D",
    "badgeIcon": "💥"
  },
  {
    "id": "syn-155",
    "name": "Spider-Thief Syndicate",
    "type": "Team",
    "characterIds": [
      "char-b-001",
      "char-exp-004",
      "char-exp-012",
      "char-exp-013"
    ],
    "characterNames": [
      "Spider-Man",
      "Black Cat",
      "Spider-Woman",
      "Silk"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Black Cat + Spider-Woman + Silk) in combat squad",
    "abilityName": "Acrobatic Silk Heist",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Fluid movement, bad-luck hexes, and razor-sharp silk nets rob opponents of weapons and combat focus.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 20,
    "stunChance": 0,
    "colorAccent": "#EC4899",
    "badgeIcon": "🐾"
  },
  {
    "id": "syn-156",
    "name": "Masters of the Mystic Sanctums",
    "type": "Team",
    "characterIds": [
      "char-a-003",
      "char-a-040",
      "char-b-032",
      "char-exp-037"
    ],
    "characterNames": [
      "Doctor Strange",
      "Clea Strange",
      "Wong",
      "Doctor Voodoo"
    ],
    "activationCondition": "Field all required heroes (Doctor Strange + Clea Strange + Wong + Doctor Voodoo) in combat squad",
    "abilityName": "Shield of the Vishanti Ward",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Four sorcerers anchor the four corners of reality, casting an ancient multi-layered ward that turns aside all magic.",
    "bonusPower": 26,
    "shieldAmount": 32,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EAB308",
    "badgeIcon": "✨"
  },
  {
    "id": "syn-157",
    "name": "Monster Hunters of the Night",
    "type": "Team",
    "characterIds": [
      "char-a-019",
      "char-exp-003",
      "char-c-058",
      "char-c-056"
    ],
    "characterNames": [
      "Ghost Rider (Johnny Blaze)",
      "Blade",
      "Elsa Bloodstone",
      "Werewolf by Night"
    ],
    "activationCondition": "Field all required heroes (Ghost Rider (Johnny Blaze) + Blade + Elsa Bloodstone + Werewolf by Night) in combat squad",
    "abilityName": "Lycanthrope Hellfire Hunt",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Bloodstone rifles, silver blades, werewolf claws, and hellfire chains track down and butcher supernatural targets.",
    "bonusPower": 25,
    "shieldAmount": 0,
    "healAmount": 18,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#78350F",
    "badgeIcon": "🐺"
  },
  {
    "id": "syn-158",
    "name": "Uncanny Claremont Legends",
    "type": "Team",
    "characterIds": [
      "char-b-005",
      "char-b-014",
      "char-b-017",
      "char-a-024"
    ],
    "characterNames": [
      "Wolverine",
      "Colossus",
      "Nightcrawler",
      "Storm"
    ],
    "activationCondition": "Field all required heroes (Wolverine + Colossus + Nightcrawler + Storm) in combat squad",
    "abilityName": "Danger Room Routine Omega",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Decades of shared training result in flawless subconscious teamwork, anticipating each other’s moves instantly.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 22,
    "stunChance": 0,
    "colorAccent": "#2563EB",
    "badgeIcon": "🕹️"
  },
  {
    "id": "syn-159",
    "name": "Hydra Tactical High Command",
    "type": "Team",
    "characterIds": [
      "char-b-063",
      "char-b-064",
      "char-b-065",
      "char-b-034"
    ],
    "characterNames": [
      "Red Skull",
      "Baron Helmut Zemo",
      "Crossbones",
      "Taskmaster"
    ],
    "activationCondition": "Field all required heroes (Red Skull + Baron Helmut Zemo + Crossbones + Taskmaster) in combat squad",
    "abilityName": "Absolute Subjugation Flank",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Predictive photographic reflexes and brutal military super-soldiers crush all resistance with textbook cruelty.",
    "bonusPower": 25,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#7F1D1D",
    "badgeIcon": "🐙"
  },
  {
    "id": "syn-160",
    "name": "The Multiverse Loki Variants",
    "type": "Team",
    "characterIds": [
      "char-exp49-001",
      "char-exp49-003",
      "char-exp49-002",
      "char-exp49-006"
    ],
    "characterNames": [
      "Loki (God of Stories)",
      "Classic Loki (Glorious Purpose)",
      "Sylvie Laufeydottir (Lady Loki)",
      "Kid Loki"
    ],
    "activationCondition": "Field all required heroes (Loki (God of Stories) + Classic Loki (Glorious Purpose) + Sylvie Laufeydottir (Lady Loki) + Kid Loki) in combat squad",
    "abilityName": "The Yggdrasil Grand Illusion",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Four iterations of the trickster weave a reality-twisting tapestry that bends fate, luck, and damage in their favor.",
    "bonusPower": 28,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#059669",
    "badgeIcon": "🎭"
  },
  {
    "id": "syn-161",
    "name": "Avengers: Earth's Mightiest Call",
    "type": "Faction",
    "characterIds": [
      "char-b-003",
      "char-a-001"
    ],
    "characterNames": [
      "Captain America",
      "Thor Odinson"
    ],
    "activationCondition": "Field all required heroes (Captain America + Thor Odinson) in combat squad",
    "abilityName": "Avengers Assemble Morale Surge",
    "effectCategory": "PASSIVE",
    "gameplayDescription": "When Avengers heroes are deployed, team combat power scales with heroic resilience and moral determination.",
    "bonusPower": 18,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🅰️"
  },
  {
    "id": "syn-162",
    "name": "X-Men: Mutant Resurgence",
    "type": "Faction",
    "characterIds": [
      "char-b-013",
      "char-b-005"
    ],
    "characterNames": [
      "Cyclops",
      "Wolverine"
    ],
    "activationCondition": "Field all required heroes (Cyclops + Wolverine) in combat squad",
    "abilityName": "X-Gene Tactical Surge",
    "effectCategory": "PASSIVE",
    "gameplayDescription": "Mutant synergy triggers innate survival adaptations, boosting resistance against elemental and status attacks.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 15,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "🧬"
  },
  {
    "id": "syn-163",
    "name": "Spider-Verse: Web of Destiny",
    "type": "Faction",
    "characterIds": [
      "char-b-001",
      "char-exp-001"
    ],
    "characterNames": [
      "Spider-Man",
      "Miles Morales"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Miles Morales) in combat squad",
    "abilityName": "Great Web Precognition",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "The interconnected Web of Life warns heroes of incoming threats, raising dodge and counter rates across the board.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#0284C7",
    "badgeIcon": "🕸️"
  },
  {
    "id": "syn-164",
    "name": "Midnight Sons: Occult Purge",
    "type": "Faction",
    "characterIds": [
      "char-exp-003",
      "char-a-019"
    ],
    "characterNames": [
      "Blade",
      "Ghost Rider (Johnny Blaze)"
    ],
    "activationCondition": "Field all required heroes (Blade + Ghost Rider (Johnny Blaze)) in combat squad",
    "abilityName": "Banish the Night",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Occult energy cleanses demonic corruption and inflicts continuous burning damage on unholy opponents.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 16,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#7E22CE",
    "badgeIcon": "🌙"
  },
  {
    "id": "syn-165",
    "name": "Black Order: Ruthless Conquest",
    "type": "Faction",
    "characterIds": [
      "char-a-005",
      "char-a-048"
    ],
    "characterNames": [
      "Thanos (Base / Armor)",
      "Corvus Glaive"
    ],
    "activationCondition": "Field all required heroes (Thanos (Base / Armor) + Corvus Glaive) in combat squad",
    "abilityName": "Cull of the Stars",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The generals of the Mad Titan execute brutal battlefield decrees, shattering armor and sapping morale.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#581C87",
    "badgeIcon": "🪐"
  },
  {
    "id": "syn-166",
    "name": "Guardians: Outlaw Rhythm",
    "type": "Faction",
    "characterIds": [
      "char-b-024",
      "char-b-022"
    ],
    "characterNames": [
      "Star-Lord",
      "Gamora"
    ],
    "activationCondition": "Field all required heroes (Star-Lord + Gamora) in combat squad",
    "abilityName": "Milano High-G Stunt Flank",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Chaotic space outlaw tactics keep enemies guessing, turning defensive mistakes into devastating counter-attacks.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 16,
    "stunChance": 0,
    "colorAccent": "#10B981",
    "badgeIcon": "🚀"
  },
  {
    "id": "syn-167",
    "name": "Brotherhood: Mutant Supremacy",
    "type": "Faction",
    "characterIds": [
      "char-a-009",
      "char-exp-005"
    ],
    "characterNames": [
      "Magneto",
      "Mystique"
    ],
    "activationCondition": "Field all required heroes (Magneto + Mystique) in combat squad",
    "abilityName": "Homo Superior Revolution",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Uncompromising mutant pride fuels lethal strikes and shields teammates behind dense electromagnetic fields.",
    "bonusPower": 21,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#B91C1C",
    "badgeIcon": "🧲"
  },
  {
    "id": "syn-168",
    "name": "Sinister Six: Criminal Syndicate",
    "type": "Faction",
    "characterIds": [
      "char-b-027",
      "char-b-028"
    ],
    "characterNames": [
      "Green Goblin",
      "Doctor Octopus"
    ],
    "activationCondition": "Field all required heroes (Green Goblin + Doctor Octopus) in combat squad",
    "abilityName": "Malevolent Grand Heist",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Underworld masterminds trap heroes in complex mechanical and chemical ambushes that cripple reaction speed.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#16A34A",
    "badgeIcon": "🎃"
  },
  {
    "id": "syn-169",
    "name": "Defenders: Unbreakable Streets",
    "type": "Faction",
    "characterIds": [
      "char-b-077",
      "char-b-020"
    ],
    "characterNames": [
      "Daredevil (Shadowland Master)",
      "Luke Cage"
    ],
    "activationCondition": "Field all required heroes (Daredevil (Shadowland Master) + Luke Cage) in combat squad",
    "abilityName": "Concrete Bastion",
    "effectCategory": "SHIELD",
    "gameplayDescription": "The gritty defenders of Hell's Kitchen and Harlem absorb enemy strikes and stand immovable like concrete pillars.",
    "bonusPower": 18,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "🏙️"
  },
  {
    "id": "syn-170",
    "name": "Cosmic Entities: Power Cosmic Dominion",
    "type": "Faction",
    "characterIds": [
      "char-m-002",
      "char-m-003"
    ],
    "characterNames": [
      "Galactus",
      "Silver Surfer"
    ],
    "activationCondition": "Field all required heroes (Galactus + Silver Surfer) in combat squad",
    "abilityName": "Singularity Reality Warp",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The primordial forces of the universe manipulate time, space, and matter to disintegrate all mortal barriers.",
    "bonusPower": 25,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#9333EA",
    "badgeIcon": "🌌"
  },
  {
    "id": "syn-171",
    "name": "Wakanda: Vibranium Vanguard",
    "type": "Faction",
    "characterIds": [
      "char-b-004",
      "char-b-067"
    ],
    "characterNames": [
      "Black Panther",
      "Okoye"
    ],
    "activationCondition": "Field all required heroes (Black Panther + Okoye) in combat squad",
    "abilityName": "Bast's Divine Shielding",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Centuries of Wakandan martial heritage and vibranium weave deflect kinetic projectiles back into enemy lines.",
    "bonusPower": 19,
    "shieldAmount": 24,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#4F46E5",
    "badgeIcon": "🐆"
  },
  {
    "id": "syn-172",
    "name": "Hydra: Cut Off One Head",
    "type": "Faction",
    "characterIds": [
      "char-b-063",
      "char-b-064"
    ],
    "characterNames": [
      "Red Skull",
      "Baron Helmut Zemo"
    ],
    "activationCondition": "Field all required heroes (Red Skull + Baron Helmut Zemo) in combat squad",
    "abilityName": "Inexorable Hydra Surge",
    "effectCategory": "PASSIVE",
    "gameplayDescription": "Hydra doctrine ensures that whenever an ally is wounded, the remaining squad members gain increased ferocity.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 16,
    "stunChance": 0,
    "colorAccent": "#7F1D1D",
    "badgeIcon": "🐙"
  },
  {
    "id": "syn-173",
    "name": "Inhumans: Terrigen Heritage",
    "type": "Faction",
    "characterIds": [
      "char-a-015",
      "char-exp49-015"
    ],
    "characterNames": [
      "Black Bolt",
      "Medusa (Inhuman Queen)"
    ],
    "activationCondition": "Field all required heroes (Black Bolt + Medusa (Inhuman Queen)) in combat squad",
    "abilityName": "Voice of Attilan Sovereignty",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Royal Inhuman genetics unleash royal authority that silences opposing abilities and stuns enemy leaders.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#0284C7",
    "badgeIcon": "👑"
  },
  {
    "id": "syn-174",
    "name": "X-Force: Lethal Strike Directive",
    "type": "Faction",
    "characterIds": [
      "char-b-006",
      "char-a-042"
    ],
    "characterNames": [
      "Deadpool",
      "Cable (Full Unbound Power)"
    ],
    "activationCondition": "Field all required heroes (Deadpool + Cable (Full Unbound Power)) in combat squad",
    "abilityName": "Extreme Measures Black-Ops",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "When diplomacy fails, X-Force executes surgical, lethal interventions with zero moral hesitation.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#334155",
    "badgeIcon": "💀"
  },
  {
    "id": "syn-175",
    "name": "Masters of the Mystic Arts: Sanctum Ward",
    "type": "Faction",
    "characterIds": [
      "char-a-003",
      "char-b-032"
    ],
    "characterNames": [
      "Doctor Strange",
      "Wong"
    ],
    "activationCondition": "Field all required heroes (Doctor Strange + Wong) in combat squad",
    "abilityName": "Vishanti Sacred Mandalas",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Ancient spells handed down through generations of Sorcerers Supreme fortify the squad against dark curses.",
    "bonusPower": 19,
    "shieldAmount": 25,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EAB308",
    "badgeIcon": "✨"
  },
  {
    "id": "syn-176",
    "name": "Stark Industries: High-Tech Superiority",
    "type": "Faction",
    "characterIds": [
      "char-b-002",
      "char-b-011"
    ],
    "characterNames": [
      "Iron Man",
      "War Machine"
    ],
    "activationCondition": "Field all required heroes (Iron Man + War Machine) in combat squad",
    "abilityName": "Stark Repulsor Network Sync",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Autonomous Stark satellite links enhance sensor targeting and accelerate weapon recharge times.",
    "bonusPower": 20,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "📡"
  },
  {
    "id": "syn-177",
    "name": "Klyntar: Hivemind Resonance",
    "type": "Faction",
    "characterIds": [
      "char-b-007",
      "char-b-008"
    ],
    "characterNames": [
      "Venom",
      "Carnage"
    ],
    "activationCondition": "Field all required heroes (Venom + Carnage) in combat squad",
    "abilityName": "Living Tendril Overrun",
    "effectCategory": "HEALING",
    "gameplayDescription": "Symbiotes communicate through the ancient Hive, regenerating damaged tissues and devouring enemy stamina.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 20,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#991B1B",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-178",
    "name": "Asgard: Golden Realm Glory",
    "type": "Faction",
    "characterIds": [
      "char-m-011",
      "char-a-001"
    ],
    "characterNames": [
      "Odin Borson",
      "Thor Odinson"
    ],
    "activationCondition": "Field all required heroes (Odin Borson + Thor Odinson) in combat squad",
    "abilityName": "Bifrost Thunder Descent",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The divine majesty of Asgard shines upon the squad, granting divine protection and shattering lightning blows.",
    "bonusPower": 24,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#FACC15",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-179",
    "name": "Crime Syndicate: Underworld Monarchy",
    "type": "Faction",
    "characterIds": [
      "char-b-075",
      "char-c-006"
    ],
    "characterNames": [
      "Kingpin",
      "Bullseye"
    ],
    "activationCondition": "Field all required heroes (Kingpin + Bullseye) in combat squad",
    "abilityName": "Lethal Debt Collection",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Cold financial ruthlessness and hired assassin contracts bring terror and destruction to anyone who defies the boss.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 17,
    "stunChance": 0,
    "colorAccent": "#64748B",
    "badgeIcon": "💼"
  },
  {
    "id": "syn-180",
    "name": "Atlantis: Depths of the Seven Seas",
    "type": "Faction",
    "characterIds": [
      "char-a-033",
      "char-c-053"
    ],
    "characterNames": [
      "Namor the Sub-Mariner",
      "Tiger Shark"
    ],
    "activationCondition": "Field all required heroes (Namor the Sub-Mariner + Tiger Shark) in combat squad",
    "abilityName": "Abyssal Trident Charge",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The fierce warriors of the deep ocean strike with oceanic pressure, crushing enemy breath and shields.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.25,
    "colorAccent": "#0D9488",
    "badgeIcon": "🔱"
  },
  {
    "id": "syn-181",
    "name": "Gamma Protocol: Apex Smashers",
    "type": "Faction",
    "characterIds": [
      "char-c-031",
      "char-a-006"
    ],
    "characterNames": [
      "Hulkbuster Iron Man",
      "The Incredible Hulk"
    ],
    "activationCondition": "Field all required heroes (Hulkbuster Iron Man + The Incredible Hulk) in combat squad",
    "abilityName": "Gamma Radiation Overload",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Raw irradiated muscle and reinforced hydraulic armor unleash pure, unadulterated structural devastation.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#16A34A",
    "badgeIcon": "💥"
  },
  {
    "id": "syn-182",
    "name": "Latveria: Doom Reigns Supreme",
    "type": "Faction",
    "characterIds": [
      "char-a-007",
      "char-m-004"
    ],
    "characterNames": [
      "Doctor Doom",
      "God Emperor Doom"
    ],
    "activationCondition": "Field all required heroes (Doctor Doom + God Emperor Doom) in combat squad",
    "abilityName": "Monarch's Absolute Will",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Victor von Doom tolerates no failure: all allies are shielded by his genius and all foes are rendered insignificant.",
    "bonusPower": 26,
    "shieldAmount": 26,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#047857",
    "badgeIcon": "🏰"
  },
  {
    "id": "syn-183",
    "name": "Archer Guild: Trick Arrow Arsenal",
    "type": "Faction",
    "characterIds": [
      "char-c-001",
      "char-c-003"
    ],
    "characterNames": [
      "Hawkeye",
      "Kate Bishop"
    ],
    "activationCondition": "Field all required heroes (Hawkeye + Kate Bishop) in combat squad",
    "abilityName": "Endless Volley Protocol",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Precision bowmen blanket the sky with EMP, freeze, and explosive arrows, neutralizing all offensive rushes.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#8B5CF6",
    "badgeIcon": "🏹"
  },
  {
    "id": "syn-184",
    "name": "Micro-Verse: Subatomic Exploration",
    "type": "Faction",
    "characterIds": [
      "char-b-012",
      "char-b-061"
    ],
    "characterNames": [
      "Ant-Man",
      "Yellowjacket"
    ],
    "activationCondition": "Field all required heroes (Ant-Man + Yellowjacket) in combat squad",
    "abilityName": "Quantum Realm Breach",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Disappearing into the subatomic realm allows unexpected ambushes that bypass the heaviest kinetic armor.",
    "bonusPower": 17,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#CA8A04",
    "badgeIcon": "🔬"
  },
  {
    "id": "syn-185",
    "name": "Nova Corps: Galactic Peacekeepers",
    "type": "Faction",
    "characterIds": [
      "char-a-004",
      "char-a-021"
    ],
    "characterNames": [
      "Captain Marvel",
      "Nova Prime (Richard Rider)"
    ],
    "activationCondition": "Field all required heroes (Captain Marvel + Nova Prime (Richard Rider)) in combat squad",
    "abilityName": "Centurion Stellar Beam",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Intergalactic peacekeepers unleash focused photon and Nova Force radiation to incinerate orbital threats.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#0284C7",
    "badgeIcon": "⭐"
  },
  {
    "id": "syn-186",
    "name": "House of Odin",
    "type": "Family",
    "characterIds": [
      "char-m-011",
      "char-a-001"
    ],
    "characterNames": [
      "Odin Borson",
      "Thor Odinson"
    ],
    "activationCondition": "Field all required heroes (Odin Borson + Thor Odinson) in combat squad",
    "abilityName": "All-Father Royal Blessing",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The royal blood of Asgard flows strong: ancient wisdom and thunderous might protect the realm.",
    "bonusPower": 24,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "👑"
  },
  {
    "id": "syn-187",
    "name": "Sons of Asgard",
    "type": "Family",
    "characterIds": [
      "char-a-001",
      "char-exp49-001"
    ],
    "characterNames": [
      "Thor Odinson",
      "Loki (God of Stories)"
    ],
    "activationCondition": "Field all required heroes (Thor Odinson + Loki (God of Stories)) in combat squad",
    "abilityName": "Fraternal Paradox",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Brothers who have fought together and against each other understand every nuance of tactical surprise.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#10B981",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-188",
    "name": "Blood of the Magnetic Sovereign",
    "type": "Family",
    "characterIds": [
      "char-a-009",
      "char-b-048"
    ],
    "characterNames": [
      "Magneto",
      "Polaris"
    ],
    "activationCondition": "Field all required heroes (Magneto + Polaris) in combat squad",
    "abilityName": "Polarity Inherited Resonator",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Father and daughter align their shared genetic gifts, doubling the radius of their magnetic destruction.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#16A34A",
    "badgeIcon": "🧲"
  },
  {
    "id": "syn-189",
    "name": "Lineage of Magnus",
    "type": "Family",
    "characterIds": [
      "char-a-009",
      "char-a-002"
    ],
    "characterNames": [
      "Magneto",
      "Scarlet Witch"
    ],
    "activationCondition": "Field all required heroes (Magneto + Scarlet Witch) in combat squad",
    "abilityName": "Reality-Warping Ferrokinesis",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Wanda’s chaos magic elevates her father’s magnetic control into the realm of molecular alteration.",
    "bonusPower": 25,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🔮"
  },
  {
    "id": "syn-190",
    "name": "Speed of the Master",
    "type": "Family",
    "characterIds": [
      "char-a-009",
      "char-b-033"
    ],
    "characterNames": [
      "Magneto",
      "Quicksilver"
    ],
    "activationCondition": "Field all required heroes (Magneto + Quicksilver) in combat squad",
    "abilityName": "Supersonic Metallic Shrapnel",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Pietro accelerates metallic debris to orbital velocity while Magneto guides the lethal cloud into enemy ranks.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#38BDF8",
    "badgeIcon": "💨"
  },
  {
    "id": "syn-191",
    "name": "Maximoff Bloodline",
    "type": "Family",
    "characterIds": [
      "char-a-002",
      "char-b-033"
    ],
    "characterNames": [
      "Scarlet Witch",
      "Quicksilver"
    ],
    "activationCondition": "Field all required heroes (Scarlet Witch + Quicksilver) in combat squad",
    "abilityName": "Twin Miracle Convergence",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Born with impossible powers, the twins operate with psychic synchronization that leaves opponents breathless.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 20,
    "stunChance": 0,
    "colorAccent": "#EC4899",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-192",
    "name": "The Summers Brothers",
    "type": "Family",
    "characterIds": [
      "char-b-013",
      "char-b-047"
    ],
    "characterNames": [
      "Cyclops",
      "Havok"
    ],
    "activationCondition": "Field all required heroes (Cyclops + Havok) in combat squad",
    "abilityName": "Solar Plasma Feedback",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Immune to each other’s powers, Scott and Alex absorb excess energy from one another to fire continuous mega-beams.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F97316",
    "badgeIcon": "☀️"
  },
  {
    "id": "syn-193",
    "name": "Summers Father & Son",
    "type": "Family",
    "characterIds": [
      "char-b-013",
      "char-a-042"
    ],
    "characterNames": [
      "Cyclops",
      "Cable (Full Unbound Power)"
    ],
    "activationCondition": "Field all required heroes (Cyclops + Cable (Full Unbound Power)) in combat squad",
    "abilityName": "Askani Tactical Dominance",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Nathan Summers and Scott coordinate battle formations, reinforcing tactical positions with telekinetic shields.",
    "bonusPower": 23,
    "shieldAmount": 24,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#2563EB",
    "badgeIcon": "🛡️"
  },
  {
    "id": "syn-194",
    "name": "Rasputin Blood Ties",
    "type": "Family",
    "characterIds": [
      "char-b-014",
      "char-a-028"
    ],
    "characterNames": [
      "Colossus",
      "Magik"
    ],
    "activationCondition": "Field all required heroes (Colossus + Magik) in combat squad",
    "abilityName": "Steel and Sorcery",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Piotr’s organic steel shields Illyana while her mystical dark Soulsword banishes demonic and alien foes.",
    "bonusPower": 22,
    "shieldAmount": 24,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#A855F7",
    "badgeIcon": "🗡️"
  },
  {
    "id": "syn-195",
    "name": "Weapon X Kin",
    "type": "Family",
    "characterIds": [
      "char-b-005",
      "char-b-039"
    ],
    "characterNames": [
      "Wolverine",
      "X-23"
    ],
    "activationCondition": "Field all required heroes (Wolverine + X-23) in combat squad",
    "abilityName": "Genetic Legacy Slashes",
    "effectCategory": "HEALING",
    "gameplayDescription": "Sharing the exact same feral healing factor and claw mutation, they cut down entire platoons and heal instantly.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 22,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-196",
    "name": "Sins of the Father",
    "type": "Family",
    "characterIds": [
      "char-b-005",
      "char-c-068"
    ],
    "characterNames": [
      "Wolverine",
      "Wolverine (Laura Kinney)"
    ],
    "activationCondition": "Field all required heroes (Wolverine + Wolverine (Laura Kinney)) in combat squad",
    "abilityName": "Pheromone Claws Ambush",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Daken’s deceptive emotional manipulation distracts enemy defenses while Logan tears through the opening.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#D97706",
    "badgeIcon": "🐾"
  },
  {
    "id": "syn-197",
    "name": "Sakaar World-Breakers",
    "type": "Family",
    "characterIds": [
      "char-a-006",
      "char-exp-016"
    ],
    "characterNames": [
      "The Incredible Hulk",
      "Skaar"
    ],
    "activationCondition": "Field all required heroes (The Incredible Hulk + Skaar) in combat squad",
    "abilityName": "Old Power Gamma Eruption",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Father and son channel the raw Old Power of Sakaar and gamma rage to crack mountains in twain.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#15803D",
    "badgeIcon": "🌋"
  },
  {
    "id": "syn-198",
    "name": "Father and Favorite Daughter",
    "type": "Family",
    "characterIds": [
      "char-a-005",
      "char-b-022"
    ],
    "characterNames": [
      "Thanos (Base / Armor)",
      "Gamora"
    ],
    "activationCondition": "Field all required heroes (Thanos (Base / Armor) + Gamora) in combat squad",
    "abilityName": "Titan Godslayer Protocol",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Trained from childhood to be the ultimate weapon, Gamora executes Thanos’s ruthless strategies without flaw.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 19,
    "stunChance": 0,
    "colorAccent": "#7E22CE",
    "badgeIcon": "🗡️"
  },
  {
    "id": "syn-199",
    "name": "Cybernetic Reckoning",
    "type": "Family",
    "characterIds": [
      "char-a-005",
      "char-b-026"
    ],
    "characterNames": [
      "Thanos (Base / Armor)",
      "Nebula"
    ],
    "activationCondition": "Field all required heroes (Thanos (Base / Armor) + Nebula) in combat squad",
    "abilityName": "Cyborg Vengeance Surge",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Nebula channels her torment into lethal cybernetic laser strikes while Thanos anchors the frontline.",
    "bonusPower": 22,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#0284C7",
    "badgeIcon": "🦾"
  },
  {
    "id": "syn-200",
    "name": "Brothers of Attilan",
    "type": "Family",
    "characterIds": [
      "char-a-015",
      "char-exp49-019"
    ],
    "characterNames": [
      "Black Bolt",
      "Maximus the Mad"
    ],
    "activationCondition": "Field all required heroes (Black Bolt + Maximus the Mad) in combat squad",
    "abilityName": "Mind-Control Sonic Blast",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Maximus hypnotizes the enemy vanguard into lowering their ear protection right before Black Bolt whispers.",
    "bonusPower": 25,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.45,
    "colorAccent": "#0284C7",
    "badgeIcon": "🧠"
  },
  {
    "id": "syn-201",
    "name": "Rulers of Hel & Stories",
    "type": "Family",
    "characterIds": [
      "char-a-008",
      "char-exp49-001"
    ],
    "characterNames": [
      "Hela",
      "Loki (God of Stories)"
    ],
    "activationCondition": "Field all required heroes (Hela + Loki (God of Stories)) in combat squad",
    "abilityName": "Necrotic Illusion Veil",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Loki’s narrative trickery masks Hela’s fatal necro-swords, ensuring enemies never see their execution coming.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 16,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#047857",
    "badgeIcon": "💀"
  },
  {
    "id": "syn-202",
    "name": "House of Xavier Psionic Surge",
    "type": "Family",
    "characterIds": [
      "char-a-031",
      "char-a-051"
    ],
    "characterNames": [
      "Professor X",
      "Legion"
    ],
    "activationCondition": "Field all required heroes (Professor X + Legion) in combat squad",
    "abilityName": "Multitude Mindstorm",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Charles Xavier anchors David Haller’s thousands of fragmented mutant personalities into a single focused reality strike.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#EC4899",
    "badgeIcon": "🧠"
  },
  {
    "id": "syn-203",
    "name": "The Reincarnated Twins",
    "type": "Family",
    "characterIds": [
      "char-b-082",
      "char-b-083"
    ],
    "characterNames": [
      "Wiccan",
      "Speed"
    ],
    "activationCondition": "Field all required heroes (Wiccan + Speed) in combat squad",
    "abilityName": "Speed of Magic",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Billy’s reality-warping spells are carried across the battlefield at supersonic speeds by Tommy’s kinetic dash.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#38BDF8",
    "badgeIcon": "✨"
  },
  {
    "id": "syn-204",
    "name": "Dynasty of the Goblin",
    "type": "Family",
    "characterIds": [
      "char-b-027",
      "char-b-074"
    ],
    "characterNames": [
      "Green Goblin",
      "Hobgoblin"
    ],
    "activationCondition": "Field all required heroes (Green Goblin + Hobgoblin) in combat squad",
    "abilityName": "Serum Rage Rampage",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Father and son unleash the terrifying physical enhancements of the Goblin Formula in a crazed explosive blitz.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#16A34A",
    "badgeIcon": "🎃"
  },
  {
    "id": "syn-205",
    "name": "Richards Family Intellect",
    "type": "Family",
    "characterIds": [
      "char-m-020",
      "char-a-044"
    ],
    "characterNames": [
      "Franklin Richards (Prime)",
      "High Evolutionary"
    ],
    "activationCondition": "Field all required heroes (Franklin Richards (Prime) + High Evolutionary) in combat squad",
    "abilityName": "Pocket Universe Reconstruction",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Reed’s unparalleled scientific intellect guides Franklin’s omnipotent reality-shaping powers to reset battle damage.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 24,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#0284C7",
    "badgeIcon": "🌌"
  },
  {
    "id": "syn-206",
    "name": "Bitter Foes of the Bridge",
    "type": "Rivalry",
    "characterIds": [
      "char-b-001",
      "char-b-027"
    ],
    "characterNames": [
      "Spider-Man",
      "Green Goblin"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Green Goblin) in combat squad",
    "abilityName": "Glider Web Snare Collision",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Their legendary hatred turns into a deadly crossfire as Peter turns Norman’s glider into an uncontrollable missile.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#16A34A",
    "badgeIcon": "🎃"
  },
  {
    "id": "syn-207",
    "name": "Lifelong Bloodshed",
    "type": "Rivalry",
    "characterIds": [
      "char-b-005",
      "char-exp-006"
    ],
    "characterNames": [
      "Wolverine",
      "Sabretooth"
    ],
    "activationCondition": "Field all required heroes (Wolverine + Sabretooth) in combat squad",
    "abilityName": "Feral Carnage Clashes",
    "effectCategory": "HEALING",
    "gameplayDescription": "Generations of lethal combat between mutant brothers-in-arms create an unrelenting vortex of claws and healing factor.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 20,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#B45309",
    "badgeIcon": "🐾"
  },
  {
    "id": "syn-208",
    "name": "Dream versus Destiny",
    "type": "Rivalry",
    "characterIds": [
      "char-a-031",
      "char-a-009"
    ],
    "characterNames": [
      "Professor X",
      "Magneto"
    ],
    "activationCondition": "Field all required heroes (Professor X + Magneto) in combat squad",
    "abilityName": "Ideological War Paradigm",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Conflicting visions of mutant destiny collide, creating an overwhelming mental and magnetic shockwave across the arena.",
    "bonusPower": 25,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.45,
    "colorAccent": "#7C3AED",
    "badgeIcon": "🧲"
  },
  {
    "id": "syn-209",
    "name": "Target Acquired",
    "type": "Rivalry",
    "characterIds": [
      "char-b-077",
      "char-c-006"
    ],
    "characterNames": [
      "Daredevil (Shadowland Master)",
      "Bullseye"
    ],
    "activationCondition": "Field all required heroes (Daredevil (Shadowland Master) + Bullseye) in combat squad",
    "abilityName": "Fatal Rebound Shrapnel",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Bullseye’s impossible accuracy is matched only by Daredevil’s radar senses, reflecting fatal projectiles into the enemy line.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 24,
    "stunChance": 0,
    "colorAccent": "#B91C1C",
    "badgeIcon": "🎯"
  },
  {
    "id": "syn-210",
    "name": "Monsters of the Desert",
    "type": "Rivalry",
    "characterIds": [
      "char-a-006",
      "char-a-049"
    ],
    "characterNames": [
      "The Incredible Hulk",
      "Abomination"
    ],
    "activationCondition": "Field all required heroes (The Incredible Hulk + Abomination) in combat squad",
    "abilityName": "Unstoppable Titan Smash",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Two radioactive behemoths batter each other so violently that the collateral damage crushes everyone around them.",
    "bonusPower": 25,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#15803D",
    "badgeIcon": "💥"
  },
  {
    "id": "syn-211",
    "name": "Blood Oath Rivalry",
    "type": "Rivalry",
    "characterIds": [
      "char-a-001",
      "char-exp49-001"
    ],
    "characterNames": [
      "Thor Odinson",
      "Loki (God of Stories)"
    ],
    "activationCondition": "Field all required heroes (Thor Odinson + Loki (God of Stories)) in combat squad",
    "abilityName": "Trickster Lightning Trap",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Thor knows every trick Loki plays, allowing them to bait opponents into catastrophic lightning ambushes.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 20,
    "stunChance": 0,
    "colorAccent": "#A855F7",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-212",
    "name": "Liberty versus Tyranny",
    "type": "Rivalry",
    "characterIds": [
      "char-b-003",
      "char-b-063"
    ],
    "characterNames": [
      "Captain America",
      "Red Skull"
    ],
    "activationCondition": "Field all required heroes (Captain America + Red Skull) in combat squad",
    "abilityName": "Totalitarian Clash of Wills",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The eternal clash between freedom and fascism supercharges the squad with relentless ideological willpower.",
    "bonusPower": 22,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "⭐"
  },
  {
    "id": "syn-213",
    "name": "Disciples of the Ancient One",
    "type": "Rivalry",
    "characterIds": [
      "char-a-003",
      "char-a-062"
    ],
    "characterNames": [
      "Doctor Strange",
      "Baron Mordo"
    ],
    "activationCondition": "Field all required heroes (Doctor Strange + Baron Mordo) in combat squad",
    "abilityName": "Black Magic Eldritch Duality",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "White and black magic clash and intertwine, casting dual-natured hexes that bypass all known arcane defenses.",
    "bonusPower": 23,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#7C3AED",
    "badgeIcon": "👁️"
  },
  {
    "id": "syn-214",
    "name": "The Original Grudge",
    "type": "Rivalry",
    "characterIds": [
      "char-b-001",
      "char-b-007"
    ],
    "characterNames": [
      "Spider-Man",
      "Venom"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Venom) in combat squad",
    "abilityName": "Symbiotic Bell Tower Resonance",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The high-frequency kinetic clash between spider and symbiote generates an ear-splitting sonic shockwave.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#0F172A",
    "badgeIcon": "🕷️"
  },
  {
    "id": "syn-215",
    "name": "Adamantium Vengeance",
    "type": "Rivalry",
    "characterIds": [
      "char-b-005",
      "char-exp-027"
    ],
    "characterNames": [
      "Wolverine",
      "Lady Deathstrike"
    ],
    "activationCondition": "Field all required heroes (Wolverine + Lady Deathstrike) in combat squad",
    "abilityName": "Ten-Finger Razor Shred",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Cybernetic adamantium fingernails and mutant claws dice through heavy enemy armor with blistering speed.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 20,
    "stunChance": 0,
    "colorAccent": "#E11D48",
    "badgeIcon": "💅"
  },
  {
    "id": "syn-216",
    "name": "Waterfall Duelists",
    "type": "Rivalry",
    "characterIds": [
      "char-b-004",
      "char-b-029"
    ],
    "characterNames": [
      "Black Panther",
      "Killmonger"
    ],
    "activationCondition": "Field all required heroes (Black Panther + Killmonger) in combat squad",
    "abilityName": "Challenge Day Fury",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The ancient ritual combat of Wakanda transforms into a relentless dual-panther assault that tears through bosses.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#4338CA",
    "badgeIcon": "🐆"
  },
  {
    "id": "syn-217",
    "name": "Starforce Intercept",
    "type": "Rivalry",
    "characterIds": [
      "char-a-004",
      "char-a-039"
    ],
    "characterNames": [
      "Captain Marvel",
      "Ronan The Accuser"
    ],
    "activationCondition": "Field all required heroes (Captain Marvel + Ronan The Accuser) in combat squad",
    "abilityName": "Cosmic Accuser Hammer Blow",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Binary photon blasts ignite Ronan’s Universal Weapon, unleashing an explosive judgment strike upon the target.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#0284C7",
    "badgeIcon": "⚖️"
  },
  {
    "id": "syn-218",
    "name": "Quantum Laboratory Feud",
    "type": "Rivalry",
    "characterIds": [
      "char-b-012",
      "char-b-061"
    ],
    "characterNames": [
      "Ant-Man",
      "Yellowjacket"
    ],
    "activationCondition": "Field all required heroes (Ant-Man + Yellowjacket) in combat squad",
    "abilityName": "Subatomic Laser Cascade",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Pym particles collide with weaponized bio-lasers, causing localized spatial distortions that shrink enemy power.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#CA8A04",
    "badgeIcon": "🔬"
  },
  {
    "id": "syn-219",
    "name": "Genetic Obsession",
    "type": "Rivalry",
    "characterIds": [
      "char-b-013",
      "char-exp-007"
    ],
    "characterNames": [
      "Cyclops",
      "Mister Sinister"
    ],
    "activationCondition": "Field all required heroes (Cyclops + Mister Sinister) in combat squad",
    "abilityName": "Cloned Optic Destruction",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Sinister’s centuries of genetic tampering supercharge Scott’s optic blasts to pure, unfiltered nuclear intensity.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#BE123C",
    "badgeIcon": "🧬"
  },
  {
    "id": "syn-220",
    "name": "War for Hell's Kitchen",
    "type": "Rivalry",
    "characterIds": [
      "char-b-077",
      "char-b-075"
    ],
    "characterNames": [
      "Daredevil (Shadowland Master)",
      "Kingpin"
    ],
    "activationCondition": "Field all required heroes (Daredevil (Shadowland Master) + Kingpin) in combat squad",
    "abilityName": "Underworld Bone Crusher",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The Devil and the Kingpin briefly crush a mutual third-party threat beneath billy clubs and heavy titanium canes.",
    "bonusPower": 21,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#475569",
    "badgeIcon": "🏙️"
  },
  {
    "id": "syn-221",
    "name": "Vanko Legacy Clash",
    "type": "Rivalry",
    "characterIds": [
      "char-b-002",
      "char-b-062"
    ],
    "characterNames": [
      "Iron Man",
      "Whiplash"
    ],
    "activationCondition": "Field all required heroes (Iron Man + Whiplash) in combat squad",
    "abilityName": "Electrified Plasma Whips",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Whiplash’s energised plasma whips wrap around Stark’s repulsors, creating an arc-reactor lightning cage.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#DC2626",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-222",
    "name": "God of Thunder vs Goddess of Death",
    "type": "Rivalry",
    "characterIds": [
      "char-a-001",
      "char-a-008"
    ],
    "characterNames": [
      "Thor Odinson",
      "Hela"
    ],
    "activationCondition": "Field all required heroes (Thor Odinson + Hela) in combat squad",
    "abilityName": "Necro-Storm Annihilation",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The sky darkens with thunderclouds and raining necro-blades, executing any foe who dares step between the siblings.",
    "bonusPower": 25,
    "shieldAmount": 0,
    "healAmount": 18,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#047857",
    "badgeIcon": "💀"
  },
  {
    "id": "syn-223",
    "name": "Mind vs Muscle Rivals",
    "type": "Rivalry",
    "characterIds": [
      "char-b-001",
      "char-b-028"
    ],
    "characterNames": [
      "Spider-Man",
      "Doctor Octopus"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Doctor Octopus) in combat squad",
    "abilityName": "Tentacle Web Trap Matrix",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Octavius’s intellect and Peter’s tactical agility combine to wrap the entire enemy squad in inescapable steel-web netting.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#B45309",
    "badgeIcon": "🐙"
  },
  {
    "id": "syn-224",
    "name": "Uncopyable Madness",
    "type": "Rivalry",
    "characterIds": [
      "char-b-018",
      "char-b-034"
    ],
    "characterNames": [
      "Moon Knight",
      "Taskmaster"
    ],
    "activationCondition": "Field all required heroes (Moon Knight + Taskmaster) in combat squad",
    "abilityName": "Kamikaze Rebound Strike",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Marc Spector’s willingness to take blows rather than dodge breaks Taskmaster’s predictive algorithms and counters hard.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 24,
    "stunChance": 0,
    "colorAccent": "#E2E8F0",
    "badgeIcon": "🌙"
  },
  {
    "id": "syn-225",
    "name": "Blood of the Damned",
    "type": "Rivalry",
    "characterIds": [
      "char-exp-003",
      "char-c-054"
    ],
    "characterNames": [
      "Blade",
      "Morbius the Living Vampire"
    ],
    "activationCondition": "Field all required heroes (Blade + Morbius the Living Vampire) in combat squad",
    "abilityName": "Vampiric Thirst Shred",
    "effectCategory": "HEALING",
    "gameplayDescription": "Daywalker sword mastery and living vampire bloodlust tear through enemies, siphoning health back to the squad.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 22,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#991B1B",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-226",
    "name": "Cybernetic Sisterhood Rivalry",
    "type": "Rivalry",
    "characterIds": [
      "char-b-022",
      "char-b-026"
    ],
    "characterNames": [
      "Gamora",
      "Nebula"
    ],
    "activationCondition": "Field all required heroes (Gamora + Nebula) in combat squad",
    "abilityName": "Assassins of Thanos Clash",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Every fight between them was to the death; together, they execute enemy commanders before they can draw weapons.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#06B6D4",
    "badgeIcon": "🗡️"
  },
  {
    "id": "syn-227",
    "name": "The Baxter-Latverian Intellectual War",
    "type": "Rivalry",
    "characterIds": [
      "char-a-007",
      "char-m-004"
    ],
    "characterNames": [
      "Doctor Doom",
      "God Emperor Doom"
    ],
    "activationCondition": "Field all required heroes (Doctor Doom + God Emperor Doom) in combat squad",
    "abilityName": "Rival Intellect Overdrive",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Neither will allow the other to be outshone, driving both to unlock impossible scientific and arcane breakthroughs.",
    "bonusPower": 27,
    "shieldAmount": 25,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#047857",
    "badgeIcon": "🏰"
  },
  {
    "id": "syn-228",
    "name": "Green vs Red Gamma War",
    "type": "Rivalry",
    "characterIds": [
      "char-a-006",
      "char-a-027"
    ],
    "characterNames": [
      "The Incredible Hulk",
      "Red Hulk"
    ],
    "activationCondition": "Field all required heroes (The Incredible Hulk + Red Hulk) in combat squad",
    "abilityName": "Thermonuclear Shockwave",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Ross’s burning radiation heats Banner’s gamma rage to boiling point, unleashing a catastrophic thermonuclear punch.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "☢️"
  },
  {
    "id": "syn-229",
    "name": "Symbiote Father & Son War",
    "type": "Rivalry",
    "characterIds": [
      "char-b-007",
      "char-b-008"
    ],
    "characterNames": [
      "Venom",
      "Carnage"
    ],
    "activationCondition": "Field all required heroes (Venom + Carnage) in combat squad",
    "abilityName": "Maximum Carnage Eruption",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "A chaotic bloodbath of flailing tendrils and gaping jaws that consumes enemy armor like tissue paper.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 18,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#991B1B",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-230",
    "name": "God vs God Butcher",
    "type": "Rivalry",
    "characterIds": [
      "char-a-001",
      "char-m-013"
    ],
    "characterNames": [
      "Thor Odinson",
      "Gorr the God Butcher"
    ],
    "activationCondition": "Field all required heroes (Thor Odinson + Gorr the God Butcher) in combat squad",
    "abilityName": "Thunder Across the Necro-Void",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The god who wields thunder and the mortal who butchers deities clash, unleashing reality-cracking shockwaves.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#450A0A",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-231",
    "name": "The Cosmic Hunger",
    "type": "Cosmic",
    "characterIds": [
      "char-m-002",
      "char-m-003"
    ],
    "characterNames": [
      "Galactus",
      "Silver Surfer"
    ],
    "activationCondition": "Field all required heroes (Galactus + Silver Surfer) in combat squad",
    "abilityName": "Devourer's Annihilation Beam",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The Power Cosmic is channeled at absolute maximum scale, wiping out planetary-scale armor in a single discharge.",
    "bonusPower": 28,
    "shieldAmount": 24,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#9333EA",
    "badgeIcon": "🪐"
  },
  {
    "id": "syn-232",
    "name": "Pillars of the Multiverse",
    "type": "Cosmic",
    "characterIds": [
      "char-m-007",
      "char-m-009"
    ],
    "characterNames": [
      "Living Tribunal",
      "Eternity"
    ],
    "activationCondition": "Field all required heroes (Living Tribunal + Eternity) in combat squad",
    "abilityName": "Multiversal Equilibrium Shift",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The supreme judges of all reality intervene, restoring the balance of power and canceling all enemy critical rolls.",
    "bonusPower": 30,
    "shieldAmount": 0,
    "healAmount": 25,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EAB308",
    "badgeIcon": "⚖️"
  },
  {
    "id": "syn-233",
    "name": "Beyond the Multiverse Realm",
    "type": "Cosmic",
    "characterIds": [
      "char-m-006",
      "char-m-007"
    ],
    "characterNames": [
      "The Beyonder",
      "Living Tribunal"
    ],
    "activationCondition": "Field all required heroes (The Beyonder + Living Tribunal) in combat squad",
    "abilityName": "Reality Transmutation Null",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Raw omnipotent curiosity alters the physical constants of the battle arena, rewriting damage mathematics.",
    "bonusPower": 30,
    "shieldAmount": 30,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EC4899",
    "badgeIcon": "🌌"
  },
  {
    "id": "syn-234",
    "name": "The Dark Phoenix Ascendant",
    "type": "Cosmic",
    "characterIds": [
      "char-m-008",
      "char-a-012"
    ],
    "characterNames": [
      "Phoenix Force",
      "Jean Grey (Phoenix Avatar)"
    ],
    "activationCondition": "Field all required heroes (Phoenix Force + Jean Grey (Phoenix Avatar)) in combat squad",
    "abilityName": "Cosmic Rebirth Immolation",
    "effectCategory": "HEALING",
    "gameplayDescription": "If defeated, the avatar bursts into cosmic fire, immediately rising from the ashes with 50% vitality restored.",
    "bonusPower": 28,
    "shieldAmount": 0,
    "healAmount": 30,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F97316",
    "badgeIcon": "🔥"
  },
  {
    "id": "syn-235",
    "name": "Primordial Void Sovereign",
    "type": "Cosmic",
    "characterIds": [
      "char-m-001",
      "char-m-013"
    ],
    "characterNames": [
      "Knull",
      "Gorr the God Butcher"
    ],
    "activationCondition": "Field all required heroes (Knull + Gorr the God Butcher) in combat squad",
    "abilityName": "Darkness Before the Stars",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The ancient primordial darkness that existed before the Big Bang envelops the arena, blinding all opponents.",
    "bonusPower": 29,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.45,
    "colorAccent": "#18181B",
    "badgeIcon": "🗡️"
  },
  {
    "id": "syn-236",
    "name": "Keepers of the Infinity Balance",
    "type": "Cosmic",
    "characterIds": [
      "char-a-013",
      "char-m-003"
    ],
    "characterNames": [
      "Adam Warlock",
      "Silver Surfer"
    ],
    "activationCondition": "Field all required heroes (Adam Warlock + Silver Surfer) in combat squad",
    "abilityName": "Soul-Cosmic Superconvergence",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The Soul Gem illuminates the darkness of space, exposing the soul weaknesses of all cosmic entities.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 22,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "✨"
  },
  {
    "id": "syn-237",
    "name": "The Inevitable Convergence",
    "type": "Cosmic",
    "characterIds": [
      "char-a-005",
      "char-m-010"
    ],
    "characterNames": [
      "Thanos (Base / Armor)",
      "Infinity Gauntlet Thanos"
    ],
    "activationCondition": "Field all required heroes (Thanos (Base / Armor) + Infinity Gauntlet Thanos) in combat squad",
    "abilityName": "Snap of Omnipotence",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Alternate timelines of the Mad Titan merge their will, guaranteeing an unblockable critical execution strike.",
    "bonusPower": 30,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#7E22CE",
    "badgeIcon": "🧤"
  },
  {
    "id": "syn-238",
    "name": "Wisdom of the World Tree",
    "type": "Cosmic",
    "characterIds": [
      "char-m-011",
      "char-m-015"
    ],
    "characterNames": [
      "Odin Borson",
      "Rune King Thor"
    ],
    "activationCondition": "Field all required heroes (Odin Borson + Rune King Thor) in combat squad",
    "abilityName": "Rune Magic Reality Sever",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Having sacrificed both eyes for omniscience, father and son read the threads of fate to dictate victory.",
    "bonusPower": 29,
    "shieldAmount": 26,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EAB308",
    "badgeIcon": "🌳"
  },
  {
    "id": "syn-239",
    "name": "Flames of Ragnarok",
    "type": "Cosmic",
    "characterIds": [
      "char-m-016",
      "char-a-008"
    ],
    "characterNames": [
      "Surtur (Twilight Sword)",
      "Hela"
    ],
    "activationCondition": "Field all required heroes (Surtur (Twilight Sword) + Hela) in combat squad",
    "abilityName": "Twilight Blade Cleave",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The Twilight Sword ignites the realm of death, burning the battlefield in eternal cosmic fire.",
    "bonusPower": 28,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EA580C",
    "badgeIcon": "🔥"
  },
  {
    "id": "syn-240",
    "name": "Necro-Deicide Conclave",
    "type": "Cosmic",
    "characterIds": [
      "char-m-013",
      "char-m-001"
    ],
    "characterNames": [
      "Gorr the God Butcher",
      "Knull"
    ],
    "activationCondition": "Field all required heroes (Gorr the God Butcher + Knull) in combat squad",
    "abilityName": "Black Sun Eclipse",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The dark essence of the Necrosword reaches full resonance, draining divine energy and converting it into pure strike power.",
    "bonusPower": 28,
    "shieldAmount": 0,
    "healAmount": 20,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#450A0A",
    "badgeIcon": "⚔️"
  },
  {
    "id": "syn-241",
    "name": "Pillars of the Galactic Front",
    "type": "Cosmic",
    "characterIds": [
      "char-a-004",
      "char-a-021"
    ],
    "characterNames": [
      "Captain Marvel",
      "Nova Prime (Richard Rider)"
    ],
    "activationCondition": "Field all required heroes (Captain Marvel + Nova Prime (Richard Rider)) in combat squad",
    "abilityName": "Binary Nova Flare",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Carol’s white-hot binary form focuses through Richard Rider’s Nova Force field, disintegrating shields.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#38BDF8",
    "badgeIcon": "🚀"
  },
  {
    "id": "syn-242",
    "name": "Multiversal Incursion Safeguard",
    "type": "Cosmic",
    "characterIds": [
      "char-b-085",
      "char-c-041"
    ],
    "characterNames": [
      "America Chavez",
      "Doctor Strange Supreme"
    ],
    "activationCondition": "Field all required heroes (America Chavez + Doctor Strange Supreme) in combat squad",
    "abilityName": "Star-Shaped Gateway Banishment",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Punching star portals across the multiverse to redirect lethal incoming attacks directly back at the caster.",
    "bonusPower": 25,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 26,
    "stunChance": 0,
    "colorAccent": "#3B82F6",
    "badgeIcon": "⭐"
  },
  {
    "id": "syn-243",
    "name": "Golden Sun & Consuming Void",
    "type": "Cosmic",
    "characterIds": [
      "char-a-010",
      "char-exp-039"
    ],
    "characterNames": [
      "The Sentry",
      "The Void"
    ],
    "activationCondition": "Field all required heroes (The Sentry + The Void) in combat squad",
    "abilityName": "Dual Million Exploding Suns",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The light of pure benevolence and the darkness of absolute terror strike simultaneously, breaking enemy spirits.",
    "bonusPower": 29,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#FBBF24",
    "badgeIcon": "☀️"
  },
  {
    "id": "syn-244",
    "name": "Void Gods of the Abyss",
    "type": "Cosmic",
    "characterIds": [
      "char-exp49-024",
      "char-m-001"
    ],
    "characterNames": [
      "Dark Sentry (The Void Merged)",
      "Knull"
    ],
    "activationCondition": "Field all required heroes (Dark Sentry (The Void Merged) + Knull) in combat squad",
    "abilityName": "Tendril of Infinite Torment",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The merged entity of the Void unites with the God of the Klyntar to drown reality in living, suffocating darkness.",
    "bonusPower": 29,
    "shieldAmount": 0,
    "healAmount": 20,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#171717",
    "badgeIcon": "🖤"
  },
  {
    "id": "syn-245",
    "name": "Heralds of Cosmic Madness",
    "type": "Cosmic",
    "characterIds": [
      "char-m-014",
      "char-m-003"
    ],
    "characterNames": [
      "Cosmic Ghost Rider",
      "Silver Surfer"
    ],
    "activationCondition": "Field all required heroes (Cosmic Ghost Rider + Silver Surfer) in combat squad",
    "abilityName": "Hellfire Cosmic Surf",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Surfing through the astral plane at warp speeds while raining cosmic hellfire chains on all opponents.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#06B6D4",
    "badgeIcon": "🏄"
  },
  {
    "id": "syn-246",
    "name": "Herald of the World Eater",
    "type": "Cosmic",
    "characterIds": [
      "char-exp49-020",
      "char-m-002"
    ],
    "characterNames": [
      "Cosmic King Thor (Herald)",
      "Galactus"
    ],
    "activationCondition": "Field all required heroes (Cosmic King Thor (Herald) + Galactus) in combat squad",
    "abilityName": "Thunderous Cosmic Devastation",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Galactus bestows the Power Cosmic upon the All-Father, creating an unstoppable cosmic king who shatters stars.",
    "bonusPower": 30,
    "shieldAmount": 25,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#38BDF8",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-247",
    "name": "Duality of the Universal Avatar",
    "type": "Cosmic",
    "characterIds": [
      "char-a-013",
      "char-exp49-012"
    ],
    "characterNames": [
      "Adam Warlock",
      "In-Betweener"
    ],
    "activationCondition": "Field all required heroes (Adam Warlock + In-Betweener) in combat squad",
    "abilityName": "Cosmic Soul Schism",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The holy savior and the dark conqueror harmonize their power, tearing reality across physical and astral planes.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 22,
    "stunChance": 0,
    "colorAccent": "#9333EA",
    "badgeIcon": "🔮"
  },
  {
    "id": "syn-248",
    "name": "White Event Protocol",
    "type": "Cosmic",
    "characterIds": [
      "char-exp49-011",
      "char-a-022"
    ],
    "characterNames": [
      "Starbrand (Kevin Connor)",
      "Blue Marvel"
    ],
    "activationCondition": "Field all required heroes (Starbrand (Kevin Connor) + Blue Marvel) in combat squad",
    "abilityName": "Planetary Defense Super-Burst",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The infinite defensive power of the Starbrand activates, repelling cosmic armadas and protecting allies.",
    "bonusPower": 25,
    "shieldAmount": 28,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "🌟"
  },
  {
    "id": "syn-249",
    "name": "Heavyweights of the Cosmos",
    "type": "Cosmic",
    "characterIds": [
      "char-a-023",
      "char-a-017"
    ],
    "characterNames": [
      "Hyperion",
      "Gladiator"
    ],
    "activationCondition": "Field all required heroes (Hyperion + Gladiator) in combat squad",
    "abilityName": "Strontian Atomic Heat Beam",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Two nearly invulnerable champions unleash double atomic vision blasts that melt through celestial metal.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "💥"
  },
  {
    "id": "syn-250",
    "name": "Titan Dynasty Temporal Shift",
    "type": "Cosmic",
    "characterIds": [
      "char-exp49-013",
      "char-a-005"
    ],
    "characterNames": [
      "Kronos (Titan Patriarch)",
      "Thanos (Base / Armor)"
    ],
    "activationCondition": "Field all required heroes (Kronos (Titan Patriarch) + Thanos (Base / Armor)) in combat squad",
    "abilityName": "Chronal Disruption Pulse",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The ancient Titan of Time bends chronological progression, giving the squad extra tactical strike actions.",
    "bonusPower": 28,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#6D28D9",
    "badgeIcon": "⏳"
  },
  {
    "id": "syn-251",
    "name": "Captains of Liberty",
    "type": "Hero",
    "characterIds": [
      "char-b-003",
      "char-b-080"
    ],
    "characterNames": [
      "Captain America",
      "Falcon (Captain America Suit)"
    ],
    "activationCondition": "Field all required heroes (Captain America + Falcon (Captain America Suit)) in combat squad",
    "abilityName": "Sentinel of Liberty Wall",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Two champions of the American ideal inspire total team resilience, granting shields and morale bonuses.",
    "bonusPower": 18,
    "shieldAmount": 24,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#2563EB",
    "badgeIcon": "⭐"
  },
  {
    "id": "syn-252",
    "name": "Guardians of the Boroughs",
    "type": "Hero",
    "characterIds": [
      "char-b-001",
      "char-b-077"
    ],
    "characterNames": [
      "Spider-Man",
      "Daredevil (Shadowland Master)"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Daredevil (Shadowland Master)) in combat squad",
    "abilityName": "Radar-Sense Blindside",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Spider-sense and radar-sense coordinate flawlessly to detect and counter every ambush attempt.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 22,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🏙️"
  },
  {
    "id": "syn-253",
    "name": "Champions of the Oppressed",
    "type": "Hero",
    "characterIds": [
      "char-b-020",
      "char-b-021"
    ],
    "characterNames": [
      "Luke Cage",
      "Iron Fist"
    ],
    "activationCondition": "Field all required heroes (Luke Cage + Iron Fist) in combat squad",
    "abilityName": "Dragon Heart Defense",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Unbreakable titanium skin absorbs blows while Shou-Lao’s flame pulverizes the armor of corrupt overlords.",
    "bonusPower": 19,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "👊"
  },
  {
    "id": "syn-254",
    "name": "Protectors of Travelers at Night",
    "type": "Hero",
    "characterIds": [
      "char-b-018",
      "char-exp-003"
    ],
    "characterNames": [
      "Moon Knight",
      "Blade"
    ],
    "activationCondition": "Field all required heroes (Moon Knight + Blade) in combat squad",
    "abilityName": "Silver Moon Cross-Rend",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Watching over the vulnerable in the dark, they slice down predators with silver weapons and crescent steel.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 16,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#64748B",
    "badgeIcon": "🌙"
  },
  {
    "id": "syn-255",
    "name": "Princes of the Realm",
    "type": "Hero",
    "characterIds": [
      "char-a-001",
      "char-a-030"
    ],
    "characterNames": [
      "Thor Odinson",
      "Hercules"
    ],
    "activationCondition": "Field all required heroes (Thor Odinson + Hercules) in combat squad",
    "abilityName": "Olympian Asgardian Clash",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Two immortal warrior princes trade heroic boasts and deliver devastating seismic blows to gigantic foes.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#F59E0B",
    "badgeIcon": "🏆"
  },
  {
    "id": "syn-256",
    "name": "Protectors of the Golden City",
    "type": "Hero",
    "characterIds": [
      "char-b-004",
      "char-b-067"
    ],
    "characterNames": [
      "Black Panther",
      "Okoye"
    ],
    "activationCondition": "Field all required heroes (Black Panther + Okoye) in combat squad",
    "abilityName": "Vibranium Bastion Charge",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Wakandan monarchs channel Bast’s divine power and sonic spear artillery to safeguard their allies.",
    "bonusPower": 20,
    "shieldAmount": 25,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#4F46E5",
    "badgeIcon": "🐆"
  },
  {
    "id": "syn-257",
    "name": "Avengers Field Agents",
    "type": "Hero",
    "characterIds": [
      "char-c-001",
      "char-exp-020"
    ],
    "characterNames": [
      "Hawkeye",
      "Mockingbird"
    ],
    "activationCondition": "Field all required heroes (Hawkeye + Mockingbird) in combat squad",
    "abilityName": "Battle Stave Arrow Volley",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Tactical acrobatics and battle-stave martial arts create an impenetrable perimeter against enemy infiltration.",
    "bonusPower": 17,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#8B5CF6",
    "badgeIcon": "🎯"
  },
  {
    "id": "syn-258",
    "name": "Pym Particle Legacy",
    "type": "Hero",
    "characterIds": [
      "char-b-012",
      "char-c-042"
    ],
    "characterNames": [
      "Ant-Man",
      "Awesome Android"
    ],
    "activationCondition": "Field all required heroes (Ant-Man + Awesome Android) in combat squad",
    "abilityName": "Colossal Pym Stomp",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Subatomic shrinking and 60-foot colossal growth combine to disorient and flatten enemy defenses.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#EAB308",
    "badgeIcon": "🐜"
  },
  {
    "id": "syn-259",
    "name": "Faith and Claws",
    "type": "Hero",
    "characterIds": [
      "char-b-005",
      "char-b-017"
    ],
    "characterNames": [
      "Wolverine",
      "Nightcrawler"
    ],
    "activationCondition": "Field all required heroes (Wolverine + Nightcrawler) in combat squad",
    "abilityName": "Teleporting Decapitation",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Kurt’s deep compassion and Logan’s lethal edge balance each other, executing instantaneous blindspot strikes.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#1E40AF",
    "badgeIcon": "✝️"
  },
  {
    "id": "syn-260",
    "name": "Royal Grace & Lightning",
    "type": "Hero",
    "characterIds": [
      "char-a-024",
      "char-b-004"
    ],
    "characterNames": [
      "Storm",
      "Black Panther"
    ],
    "activationCondition": "Field all required heroes (Storm + Black Panther) in combat squad",
    "abilityName": "Goddess Bast Hurricane",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The Weather Goddess commands lightning while the King of Wakanda cuts down stunned champions.",
    "bonusPower": 21,
    "shieldAmount": 20,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#6366F1",
    "badgeIcon": "🌩️"
  },
  {
    "id": "syn-261",
    "name": "Sanctum Guardians Oath",
    "type": "Hero",
    "characterIds": [
      "char-a-003",
      "char-b-032"
    ],
    "characterNames": [
      "Doctor Strange",
      "Wong"
    ],
    "activationCondition": "Field all required heroes (Doctor Strange + Wong) in combat squad",
    "abilityName": "Shield of the Vishanti Mandalas",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Vowed to protect Earth from interdimensional invasion, they weave impenetrable Eldritch geometry.",
    "bonusPower": 18,
    "shieldAmount": 26,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EAB308",
    "badgeIcon": "🛡️"
  },
  {
    "id": "syn-262",
    "name": "Heart of the X-Men",
    "type": "Hero",
    "characterIds": [
      "char-b-014",
      "char-b-055"
    ],
    "characterNames": [
      "Colossus",
      "Shadowcat & Lockheed"
    ],
    "activationCondition": "Field all required heroes (Colossus + Shadowcat & Lockheed) in combat squad",
    "abilityName": "Phased Steel Meteor",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Piotr’s organic steel is phased through enemy armor by Kitty, solidifying inside weak points for massive shock.",
    "bonusPower": 20,
    "shieldAmount": 22,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#0284C7",
    "badgeIcon": "💖"
  },
  {
    "id": "syn-263",
    "name": "Great Protectors of K'un-Lun",
    "type": "Hero",
    "characterIds": [
      "char-b-009",
      "char-b-021"
    ],
    "characterNames": [
      "Shang-Chi",
      "Iron Fist"
    ],
    "activationCondition": "Field all required heroes (Shang-Chi + Iron Fist) in combat squad",
    "abilityName": "Dragon Spirit Whirling Strike",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Legendary martial masters harmonize the Ten Rings with the immortal Chi dragon, breaking all incoming shields.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#D97706",
    "badgeIcon": "🥋"
  },
  {
    "id": "syn-264",
    "name": "Web-Warriors of Justice",
    "type": "Hero",
    "characterIds": [
      "char-exp-002",
      "char-exp-013"
    ],
    "characterNames": [
      "Ghost-Spider",
      "Silk"
    ],
    "activationCondition": "Field all required heroes (Ghost-Spider + Silk) in combat squad",
    "abilityName": "Silk-Gwen Aerial Dance",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Spider-women combine agility and natural silk production to ensnare opponents from every angle.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#EC4899",
    "badgeIcon": "🕸️"
  },
  {
    "id": "syn-265",
    "name": "Brothers in Arms",
    "type": "Hero",
    "characterIds": [
      "char-b-003",
      "char-b-010"
    ],
    "characterNames": [
      "Captain America",
      "Winter Soldier"
    ],
    "activationCondition": "Field all required heroes (Captain America + Winter Soldier) in combat squad",
    "abilityName": "Vibranium Bionic Rampart",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Decades of shared war forge an unbreakable defensive barrier that turns back bullets, lasers, and magic.",
    "bonusPower": 19,
    "shieldAmount": 25,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#3B82F6",
    "badgeIcon": "⭐"
  },
  {
    "id": "syn-266",
    "name": "Armor Wars Vanguard",
    "type": "Hero",
    "characterIds": [
      "char-b-002",
      "char-b-011"
    ],
    "characterNames": [
      "Iron Man",
      "War Machine"
    ],
    "activationCondition": "Field all required heroes (Iron Man + War Machine) in combat squad",
    "abilityName": "Omni-Directional Smart Salvo",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Micro-repulsors, kinetic chainguns, and shoulder rockets discharge in complete synchronized annihilation.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#DC2626",
    "badgeIcon": "🚀"
  },
  {
    "id": "syn-267",
    "name": "Light of the Marvels",
    "type": "Hero",
    "characterIds": [
      "char-a-004",
      "char-c-037"
    ],
    "characterNames": [
      "Captain Marvel",
      "Firestar"
    ],
    "activationCondition": "Field all required heroes (Captain Marvel + Firestar) in combat squad",
    "abilityName": "Photonic Super-Luminescence",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Wavelength manipulation and raw cosmic photon blasts scorch enemy shielding into glowing slag.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#FACC15",
    "badgeIcon": "✨"
  },
  {
    "id": "syn-268",
    "name": "Law & Claws",
    "type": "Hero",
    "characterIds": [
      "char-b-019",
      "char-exp-018"
    ],
    "characterNames": [
      "She-Hulk",
      "Tigra"
    ],
    "activationCondition": "Field all required heroes (She-Hulk + Tigra) in combat squad",
    "abilityName": "Acrobatic Case Closed",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Hellcat’s agile martial arts lure enemy commanders into range for Jennifer’s high-impact body slam.",
    "bonusPower": 18,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 16,
    "stunChance": 0,
    "colorAccent": "#16A34A",
    "badgeIcon": "⚖️"
  },
  {
    "id": "syn-269",
    "name": "Cabal of the Tyrants",
    "type": "Villain",
    "characterIds": [
      "char-a-007",
      "char-a-009"
    ],
    "characterNames": [
      "Doctor Doom",
      "Magneto"
    ],
    "activationCondition": "Field all required heroes (Doctor Doom + Magneto) in combat squad",
    "abilityName": "Monarch's Iron Fist",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Two calculating sovereign rulers pool their mastery over science and magnetism to dictate the terms of victory.",
    "bonusPower": 26,
    "shieldAmount": 26,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#047857",
    "badgeIcon": "👑"
  },
  {
    "id": "syn-270",
    "name": "Sinister Masterminds",
    "type": "Villain",
    "characterIds": [
      "char-b-027",
      "char-b-028"
    ],
    "characterNames": [
      "Green Goblin",
      "Doctor Octopus"
    ],
    "activationCondition": "Field all required heroes (Green Goblin + Doctor Octopus) in combat squad",
    "abilityName": "Toxic Tentacle Assault",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Pumpkin bombs filled with hallucinogenic nerve gas explode as titanium tentacles tear down fortifications.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#15803D",
    "badgeIcon": "🎃"
  },
  {
    "id": "syn-271",
    "name": "The Hydra Axis",
    "type": "Villain",
    "characterIds": [
      "char-b-063",
      "char-b-064"
    ],
    "characterNames": [
      "Red Skull",
      "Baron Helmut Zemo"
    ],
    "activationCondition": "Field all required heroes (Red Skull + Baron Helmut Zemo) in combat squad",
    "abilityName": "Totalitarian Blitz",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Calculating military cruelty and ruthless discipline break enemy morale and force errors.",
    "bonusPower": 20,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#7F1D1D",
    "badgeIcon": "🐙"
  },
  {
    "id": "syn-272",
    "name": "Monarchs of Annihilation",
    "type": "Villain",
    "characterIds": [
      "char-a-005",
      "char-a-008"
    ],
    "characterNames": [
      "Thanos (Base / Armor)",
      "Hela"
    ],
    "activationCondition": "Field all required heroes (Thanos (Base / Armor) + Hela) in combat squad",
    "abilityName": "Universal Decimation Scythe",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The Mad Titan and the Goddess of Death unite cosmic might with soul-slaying blades to reap enemy teams.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 18,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#581C87",
    "badgeIcon": "💀"
  },
  {
    "id": "syn-273",
    "name": "The Necro-Lords",
    "type": "Villain",
    "characterIds": [
      "char-m-001",
      "char-m-013"
    ],
    "characterNames": [
      "Knull",
      "Gorr the God Butcher"
    ],
    "activationCondition": "Field all required heroes (Knull + Gorr the God Butcher) in combat squad",
    "abilityName": "Slaughter of the Divines",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Primordial darkness and the God Butcher’s vengeance manifest twin black blades that cleave through deities.",
    "bonusPower": 28,
    "shieldAmount": 0,
    "healAmount": 20,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#450A0A",
    "badgeIcon": "⚔️"
  },
  {
    "id": "syn-274",
    "name": "Klyntar Carnage Unleashed",
    "type": "Villain",
    "characterIds": [
      "char-b-007",
      "char-b-008"
    ],
    "characterNames": [
      "Venom",
      "Carnage"
    ],
    "activationCondition": "Field all required heroes (Venom + Carnage) in combat squad",
    "abilityName": "Symbiotic Crimson Tempest",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Black and red symbiote tendrils lash out in blind hunger, impaling and devouring enemy vitality.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 18,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#991B1B",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-275",
    "name": "Underworld Contracts",
    "type": "Villain",
    "characterIds": [
      "char-b-075",
      "char-c-006"
    ],
    "characterNames": [
      "Kingpin",
      "Bullseye"
    ],
    "activationCondition": "Field all required heroes (Kingpin + Bullseye) in combat squad",
    "abilityName": "Lethal Shakedown Execution",
    "effectCategory": "COUNTER",
    "gameplayDescription": "Fisk breaks the enemy's guard with brutal strength while Bullseye puts a bullet through their skull.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 22,
    "stunChance": 0,
    "colorAccent": "#475569",
    "badgeIcon": "🎯"
  },
  {
    "id": "syn-276",
    "name": "Extinction Across Timelines",
    "type": "Villain",
    "characterIds": [
      "char-a-020",
      "char-a-018"
    ],
    "characterNames": [
      "Ultron Prime",
      "Kang The Conqueror"
    ],
    "activationCondition": "Field all required heroes (Ultron Prime + Kang The Conqueror) in combat squad",
    "abilityName": "Temporal Nanite Virus",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Ultron’s self-replicating techno-virus is weaponized across time streams by Kang, infecting weapons before they fire.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#DC2626",
    "badgeIcon": "🤖"
  },
  {
    "id": "syn-277",
    "name": "High-Voltage Battering Ram",
    "type": "Villain",
    "characterIds": [
      "char-b-038",
      "char-b-045"
    ],
    "characterNames": [
      "Electro",
      "Rhino"
    ],
    "activationCondition": "Field all required heroes (Electro + Rhino) in combat squad",
    "abilityName": "Supercharged Kinetic Trample",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Electro charges Rhino’s dense polymer horn with millions of volts as he stampedes through enemy lines.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#EAB308",
    "badgeIcon": "🦏"
  },
  {
    "id": "syn-278",
    "name": "Cold War Murder Machines",
    "type": "Villain",
    "characterIds": [
      "char-exp-006",
      "char-exp-028"
    ],
    "characterNames": [
      "Sabretooth",
      "Omega Red"
    ],
    "activationCondition": "Field all required heroes (Sabretooth + Omega Red) in combat squad",
    "abilityName": "Carbonadium Tentacle Rend",
    "effectCategory": "HEALING",
    "gameplayDescription": "Omega Red’s death spores drain enemy life force while Sabretooth rips through the weakened opposition.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 22,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#B91C1C",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-279",
    "name": "The Illusory Safari",
    "type": "Villain",
    "characterIds": [
      "char-b-036",
      "char-b-040"
    ],
    "characterNames": [
      "Mysterio",
      "Kraven the Hunter"
    ],
    "activationCondition": "Field all required heroes (Mysterio + Kraven the Hunter) in combat squad",
    "abilityName": "Phantasm Jungle Trap",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Mysterio’s illusions disorient the prey while Kraven stalks from the shadows to deliver a lethal neurotoxin.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#059669",
    "badgeIcon": "🦁"
  },
  {
    "id": "syn-280",
    "name": "Chrono-Arcane Dominance",
    "type": "Villain",
    "characterIds": [
      "char-a-007",
      "char-a-018"
    ],
    "characterNames": [
      "Doctor Doom",
      "Kang The Conqueror"
    ],
    "activationCondition": "Field all required heroes (Doctor Doom + Kang The Conqueror) in combat squad",
    "abilityName": "Paradox Doom Ray",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Time-travel technology married to dark sorcery creates a localized time dilation field that traps enemy turns.",
    "bonusPower": 27,
    "shieldAmount": 24,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#7E22CE",
    "badgeIcon": "⏳"
  },
  {
    "id": "syn-281",
    "name": "Brain & Brawn of Gamma Crime",
    "type": "Villain",
    "characterIds": [
      "char-a-049",
      "char-a-061"
    ],
    "characterNames": [
      "Abomination",
      "MODOK Supreme"
    ],
    "activationCondition": "Field all required heroes (Abomination + MODOK Supreme) in combat squad",
    "abilityName": "Gamma Mind-Smash Protocol",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The Leader’s mega-intellect coordinates Abomination’s savage gamma brute force to target structural weak points.",
    "bonusPower": 22,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#15803D",
    "badgeIcon": "🧠"
  },
  {
    "id": "syn-282",
    "name": "Kree Starforce Inquisitors",
    "type": "Villain",
    "characterIds": [
      "char-a-039",
      "char-a-035"
    ],
    "characterNames": [
      "Ronan The Accuser",
      "Super-Skrull"
    ],
    "activationCondition": "Field all required heroes (Ronan The Accuser + Super-Skrull) in combat squad",
    "abilityName": "Universal Weapon Judgment",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The Kree Empire’s supreme judges enforce imperial law, crushing resistance beneath gravity hammers.",
    "bonusPower": 21,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#0369A1",
    "badgeIcon": "⚖️"
  },
  {
    "id": "syn-283",
    "name": "Dark Elves of Svartalfheim",
    "type": "Villain",
    "characterIds": [
      "char-a-055",
      "char-a-060"
    ],
    "characterNames": [
      "Malekith the Accursed",
      "Executioner (Skurge)"
    ],
    "activationCondition": "Field all required heroes (Malekith the Accursed + Executioner (Skurge)) in combat squad",
    "abilityName": "Aether Corrupted Strike",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Dark magical curses empower Kurse’s brutal physical strength, shattering Asgardian steel and shields.",
    "bonusPower": 23,
    "shieldAmount": 18,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#4C1D95",
    "badgeIcon": "🌑"
  },
  {
    "id": "syn-284",
    "name": "Hydra's Bloodiest Enforcers",
    "type": "Villain",
    "characterIds": [
      "char-b-065",
      "char-b-063"
    ],
    "characterNames": [
      "Crossbones",
      "Red Skull"
    ],
    "activationCondition": "Field all required heroes (Crossbones + Red Skull) in combat squad",
    "abilityName": "Merciless Guerrilla Execution",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Pure sadism and heavy ordnance combine to wipe out retreating foes with fragmentation explosives.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 18,
    "stunChance": 0,
    "colorAccent": "#991B1B",
    "badgeIcon": "💀"
  },
  {
    "id": "syn-285",
    "name": "Dark Dimension Covenant",
    "type": "Villain",
    "characterIds": [
      "char-m-005",
      "char-a-062"
    ],
    "characterNames": [
      "Dormammu",
      "Baron Mordo"
    ],
    "activationCondition": "Field all required heroes (Dormammu + Baron Mordo) in combat squad",
    "abilityName": "Flames of the Faltine Void",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Mordo channels Dormammu’s cosmic flames, corrupting the magic of any sorcerer who opposes them.",
    "bonusPower": 26,
    "shieldAmount": 0,
    "healAmount": 18,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EA580C",
    "badgeIcon": "🔥"
  },
  {
    "id": "syn-286",
    "name": "Otto and Peter: Mind Exchange",
    "type": "Character-Specific",
    "characterIds": [
      "char-b-001",
      "char-c-034"
    ],
    "characterNames": [
      "Spider-Man",
      "Superior Spider-Man"
    ],
    "activationCondition": "Field all required heroes (Spider-Man + Superior Spider-Man) in combat squad",
    "abilityName": "Spider-Bot Tactician Web",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Otto Octavius’s ruthless efficiency blends with Peter’s moral responsibility, deploying spider-bots and webs simultaneously.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.35,
    "colorAccent": "#DC2626",
    "badgeIcon": "🕷️"
  },
  {
    "id": "syn-287",
    "name": "Chronal Spider-Bond",
    "type": "Character-Specific",
    "characterIds": [
      "char-exp-009",
      "char-exp-001"
    ],
    "characterNames": [
      "Spider-Man 2099",
      "Miles Morales"
    ],
    "activationCondition": "Field all required heroes (Spider-Man 2099 + Miles Morales) in combat squad",
    "abilityName": "Paralytic Bio-Shock Net",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Miguel’s futuristic paralytic venom pairs with Miles’s bio-electric blast to incapacitate armored targets.",
    "bonusPower": 20,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#2563EB",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-288",
    "name": "Endo-Sym Biotech Overload",
    "type": "Character-Specific",
    "characterIds": [
      "char-b-002",
      "char-b-078"
    ],
    "characterNames": [
      "Iron Man",
      "Iron Patriot"
    ],
    "activationCondition": "Field all required heroes (Iron Man + Iron Patriot) in combat squad",
    "abilityName": "Liquid Metal Dominance",
    "effectCategory": "SHIELD",
    "gameplayDescription": "The psionically bonded liquid smart-metal Endo-Sym armor repairs itself in real time while firing unibeams.",
    "bonusPower": 24,
    "shieldAmount": 28,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#E2E8F0",
    "badgeIcon": "🦾"
  },
  {
    "id": "syn-289",
    "name": "Rupture of the World",
    "type": "Character-Specific",
    "characterIds": [
      "char-a-006",
      "char-m-017"
    ],
    "characterNames": [
      "The Incredible Hulk",
      "World Breaker Hulk"
    ],
    "activationCondition": "Field all required heroes (The Incredible Hulk + World Breaker Hulk) in combat squad",
    "abilityName": "Continental Gamma Rupture",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The angrier Hulk gets, the stronger he gets: pure radioactive footsteps fracture the entire battleground.",
    "bonusPower": 28,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#16A34A",
    "badgeIcon": "🌋"
  },
  {
    "id": "syn-290",
    "name": "Odinson Ascended",
    "type": "Character-Specific",
    "characterIds": [
      "char-a-001",
      "char-m-015"
    ],
    "characterNames": [
      "Thor Odinson",
      "Rune King Thor"
    ],
    "activationCondition": "Field all required heroes (Thor Odinson + Rune King Thor) in combat squad",
    "abilityName": "Rune of Absolute Thunder",
    "effectCategory": "COSMIC",
    "gameplayDescription": "The warrior prince and the omniscient rune king strike together, erasing magical shields from reality.",
    "bonusPower": 28,
    "shieldAmount": 24,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EAB308",
    "badgeIcon": "⚡"
  },
  {
    "id": "syn-291",
    "name": "Past Regrets & Future Claws",
    "type": "Character-Specific",
    "characterIds": [
      "char-b-005",
      "char-exp-040"
    ],
    "characterNames": [
      "Wolverine",
      "Old Man Logan"
    ],
    "activationCondition": "Field all required heroes (Wolverine + Old Man Logan) in combat squad",
    "abilityName": "Weary Berserker Fury",
    "effectCategory": "HEALING",
    "gameplayDescription": "The grizzled veteran of the Wasteland fights alongside his prime self, sharing combat lessons and healing factor.",
    "bonusPower": 23,
    "shieldAmount": 0,
    "healAmount": 24,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#78716C",
    "badgeIcon": "🐺"
  },
  {
    "id": "syn-292",
    "name": "Giant of Jötunheim & God of Stories",
    "type": "Character-Specific",
    "characterIds": [
      "char-exp49-001",
      "char-exp49-004"
    ],
    "characterNames": [
      "Loki (God of Stories)",
      "Frost Giant Loki (Jotunheim Heir)"
    ],
    "activationCondition": "Field all required heroes (Loki (God of Stories) + Frost Giant Loki (Jotunheim Heir)) in combat squad",
    "abilityName": "Glacial Myth Weave",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Crystalline Jotunheim frost freezes enemy limbs solid while the God of Stories rewrites their defensive stats.",
    "bonusPower": 24,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.4,
    "colorAccent": "#38BDF8",
    "badgeIcon": "❄️"
  },
  {
    "id": "syn-293",
    "name": "Ascension of the Klyntar",
    "type": "Character-Specific",
    "characterIds": [
      "char-b-007",
      "char-exp-049"
    ],
    "characterNames": [
      "Venom",
      "King in Black Venom"
    ],
    "activationCondition": "Field all required heroes (Venom + King in Black Venom) in combat squad",
    "abilityName": "All-Black Dragon Wings",
    "effectCategory": "COSMIC",
    "gameplayDescription": "Eddie Brock summons cosmic symbiote dragons to carry the team above enemy ground attacks and drop death from above.",
    "bonusPower": 27,
    "shieldAmount": 24,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#0F172A",
    "badgeIcon": "🐉"
  },
  {
    "id": "syn-294",
    "name": "Bikers from Hell & Beyond",
    "type": "Character-Specific",
    "characterIds": [
      "char-a-019",
      "char-m-014"
    ],
    "characterNames": [
      "Ghost Rider (Johnny Blaze)",
      "Cosmic Ghost Rider"
    ],
    "activationCondition": "Field all required heroes (Ghost Rider (Johnny Blaze) + Cosmic Ghost Rider) in combat squad",
    "abilityName": "Cosmic Penance Stare",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "The Penance Stare is amplified with the Power Cosmic, forcing cosmic tyrants to experience all the pain they ever caused.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#EA580C",
    "badgeIcon": "💀"
  },
  {
    "id": "syn-295",
    "name": "Multiversal Super-Soldiers",
    "type": "Character-Specific",
    "characterIds": [
      "char-b-003",
      "char-c-029"
    ],
    "characterNames": [
      "Captain America",
      "Captain Carter"
    ],
    "activationCondition": "Field all required heroes (Captain America + Captain Carter) in combat squad",
    "abilityName": "Twin Vibranium Shield Crash",
    "effectCategory": "SHIELD",
    "gameplayDescription": "Steve and Peggy bounce their vibranium shields off each other at supersonic speeds, bowling over entire battle lines.",
    "bonusPower": 21,
    "shieldAmount": 26,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#1E40AF",
    "badgeIcon": "⭐"
  },
  {
    "id": "syn-296",
    "name": "Jazz & Punk Anarchy",
    "type": "Character-Specific",
    "characterIds": [
      "char-c-026",
      "char-c-025"
    ],
    "characterNames": [
      "Spider-Man Noir",
      "Spider-Punk"
    ],
    "activationCondition": "Field all required heroes (Spider-Man Noir + Spider-Punk) in combat squad",
    "abilityName": "Chords of Shadow & Rebellion",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "1930s trenchcoat stealth pairs with screaming electric guitar feedback to shatter enemy formation lines.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.3,
    "colorAccent": "#18181B",
    "badgeIcon": "🎸"
  },
  {
    "id": "syn-297",
    "name": "Breaking the Fourth Wall",
    "type": "Character-Specific",
    "characterIds": [
      "char-c-033",
      "char-m-025"
    ],
    "characterNames": [
      "Gwenpool",
      "Gwenpool (Full Comic Awareness)"
    ],
    "activationCondition": "Field all required heroes (Gwenpool + Gwenpool (Full Comic Awareness)) in combat squad",
    "abilityName": "Editorial Retcon Strike",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Gwen literally flips back a comic page to delete the opponent’s last successful hit and replace it with a miss.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 25,
    "stunChance": 0,
    "colorAccent": "#F43F5E",
    "badgeIcon": "📚"
  },
  {
    "id": "syn-298",
    "name": "Sorcerer of the Lost Universe",
    "type": "Character-Specific",
    "characterIds": [
      "char-a-003",
      "char-c-041"
    ],
    "characterNames": [
      "Doctor Strange",
      "Doctor Strange Supreme"
    ],
    "activationCondition": "Field all required heroes (Doctor Strange + Doctor Strange Supreme) in combat squad",
    "abilityName": "Demon-Absorbing Eldritch Flare",
    "effectCategory": "ABILITY_MOD",
    "gameplayDescription": "Strange Supreme unbinds the demonic entities trapped inside his cloak, unleashing a terrifying vortex of dark magic.",
    "bonusPower": 27,
    "shieldAmount": 0,
    "healAmount": 20,
    "counterDamage": 0,
    "stunChance": 0,
    "colorAccent": "#4C1D95",
    "badgeIcon": "👁️"
  },
  {
    "id": "syn-299",
    "name": "The All-New Wolverines",
    "type": "Character-Specific",
    "characterIds": [
      "char-c-068",
      "char-b-039"
    ],
    "characterNames": [
      "Wolverine (Laura Kinney)",
      "X-23"
    ],
    "activationCondition": "Field all required heroes (Wolverine (Laura Kinney) + X-23) in combat squad",
    "abilityName": "Foot-Claw Acrobatic Decapitation",
    "effectCategory": "COMBINED_ATTACK",
    "gameplayDescription": "Laura Kinney in her classic X-23 and Wolverine suits executes high-flying acrobatic slashes with razor foot-claws.",
    "bonusPower": 22,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 20,
    "stunChance": 0,
    "colorAccent": "#E11D48",
    "badgeIcon": "🩸"
  },
  {
    "id": "syn-300",
    "name": "Cartoon Logic Overdrive",
    "type": "Character-Specific",
    "characterIds": [
      "char-c-028",
      "char-exp-050"
    ],
    "characterNames": [
      "Spider-Ham",
      "Howard the Duck (Prime Hero)"
    ],
    "activationCondition": "Field all required heroes (Spider-Ham + Howard the Duck (Prime Hero)) in combat squad",
    "abilityName": "Giant Mallet & Quack-Fu",
    "effectCategory": "STATUS_EFFECT",
    "gameplayDescription": "Dropping 10-ton cartoon anvils and executing lethal Quack-Fu kicks that leave serious cosmic warlords completely dazed.",
    "bonusPower": 19,
    "shieldAmount": 0,
    "healAmount": 0,
    "counterDamage": 0,
    "stunChance": 0.45,
    "colorAccent": "#F59E0B",
    "badgeIcon": "🦆"
  }
];

// Verify synergy count at module runtime
if (ALL_CHARACTER_SYNERGIES.length !== 300) {
  console.warn(`[SYNERGIES ENGINE] Expected 300 synergies, found ${ALL_CHARACTER_SYNERGIES.length}`);
}

export const SYNERGIES_BY_ID: Record<string, CharacterSynergy> = ALL_CHARACTER_SYNERGIES.reduce(
  (acc, syn) => {
    acc[syn.id] = syn;
    return acc;
  },
  {} as Record<string, CharacterSynergy>
);

export function getSynergyById(id: string): CharacterSynergy | undefined {
  return SYNERGIES_BY_ID[id];
}

/**
 * Returns all synergies where the given character is one of the required members.
 */
export function getSynergiesForCharacter(characterId: string): CharacterSynergy[] {
  return ALL_CHARACTER_SYNERGIES.filter(s => s.characterIds.includes(characterId));
}

/**
 * Evaluates a deployed combat squad and returns all active synergies where ALL required heroes are present.
 */
export function getActiveSynergiesForTeam(team: (Character | string)[]): CharacterSynergy[] {
  if (!team || team.length === 0) return [];

  const teamIds = new Set(team.map(member => (typeof member === 'string' ? member : member.id)));

  return ALL_CHARACTER_SYNERGIES.filter(syn => {
    return syn.characterIds.every(id => teamIds.has(id));
  });
}

/**
 * Calculates discovered synergies count based on owned character IDs.
 * A synergy is discovered if the player owns all required characters or has fielded them.
 */
export function getDiscoveredSynergyStats(ownedCharacterIds: string[]): {
  total: number;
  discoveredCount: number;
  discoveredPercent: number;
  discoveredSynergies: CharacterSynergy[];
  lockedSynergies: CharacterSynergy[];
} {
  const ownedSet = new Set(ownedCharacterIds);
  const discoveredSynergies: CharacterSynergy[] = [];
  const lockedSynergies: CharacterSynergy[] = [];

  for (const syn of ALL_CHARACTER_SYNERGIES) {
    const isUnlocked = syn.characterIds.every(id => ownedSet.has(id));
    if (isUnlocked) {
      discoveredSynergies.push(syn);
    } else {
      lockedSynergies.push(syn);
    }
  }

  const total = ALL_CHARACTER_SYNERGIES.length;
  const discoveredCount = discoveredSynergies.length;
  const discoveredPercent = Math.round((discoveredCount / total) * 100);

  return {
    total,
    discoveredCount,
    discoveredPercent,
    discoveredSynergies,
    lockedSynergies,
  };
}

/**
 * Returns 4 flagship featured synergies for the Homepage preview.
 */
export function getFeaturedSynergies(): CharacterSynergy[] {
  // Thor + Loki, Iron Man + Cap, Wolverine + Colossus, Scarlet Witch + Vision
  return [
    ALL_CHARACTER_SYNERGIES[0], // Brothers of Asgard (Thor + Loki)
    ALL_CHARACTER_SYNERGIES[1], // Shield Repulsor Overload (Iron Man + Cap)
    ALL_CHARACTER_SYNERGIES[4], // Fastball Special (Wolverine + Colossus)
    ALL_CHARACTER_SYNERGIES[5], // Hex Synthesis (Scarlet Witch + Vision)
  ].filter(Boolean);
}
