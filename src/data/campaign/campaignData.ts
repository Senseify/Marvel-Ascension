import { Character } from '../../types/game';

export interface CampaignEnemy {
  id: string;
  name: string;
  avatar: string;
  imageUrl: string;
  grade: 'C' | 'B' | 'A' | 'MYTHIC';
  power: number;
  hp: number;
  maxHp: number;
  powers: string;
  description: string;
}

export interface CampaignStage {
  id: string;
  chapterNumber: number;
  stageNumber: number;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  recommendedPower: number;
  isBoss: boolean;
  enemies: CampaignEnemy[];
  victoryConditions: string[];
  firstClearRewards: {
    xp: number;
    astra: number;
    shards?: { category: 'MYTHIC' | 'A' | 'B' | 'C'; amount: number };
    characterId?: string;
  };
  repeatRewards: {
    xp: number;
    astra: number;
  };
}

export interface ChapterInfo {
  number: number;
  title: string;
  subtitle: string;
  location: string;
  themeColor: string;
  gradient: string;
  backdropUrl: string;
  description: string;
  requiredCommanderLevel: number;
  stages: CampaignStage[];
}

export const CAMPAIGN_CHAPTERS: ChapterInfo[] = [
  // ==========================================
  // CHAPTER 1 — EARTH
  // ==========================================
  {
    number: 1,
    title: 'CHAPTER 1: EARTH',
    subtitle: 'THE INVASION OF MIDGARD',
    location: 'New York & Global Outposts',
    themeColor: 'red',
    gradient: 'from-red-950/60 via-zinc-950/80 to-black/95',
    backdropUrl: "/Images%20Marvel/Captain%20America.jpg",
    description: 'Dimensional rifts rupture across Manhattan. Assemble your squad to repel invading Chitauri shock troops, rogue synthoids, and confront the God of Mischief.',
    requiredCommanderLevel: 1,
    stages: [
      {
        id: 'stage-1-1',
        chapterNumber: 1,
        stageNumber: 1,
        title: 'Manhattan Incursion',
        subtitle: 'Chitauri Vanguard',
        location: 'Times Square, New York',
        description: 'Chitauri forward scouts have fortified Times Square with plasma cannons. Clear the intersection before civilian casualties mount.',
        recommendedPower: 350,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-chitauri-soldier-1',
            name: 'Chitauri Foot Soldier',
            avatar: '👽',
            imageUrl: "/Images%20Marvel/Loki%20(God%20of%20Stories).jpg",
            grade: 'C',
            power: 110,
            hp: 200,
            maxHp: 200,
            powers: 'Plasma Rifle, Cybernetic Neural Link',
            description: 'Cybernetically enslaved infantry bound to the mothership hivemind.'
          },
          {
            id: 'enemy-chitauri-brute',
            name: 'Chitauri Heavy Enforcer',
            avatar: '🧌',
            imageUrl: "/Images%20Marvel/The%20Destroyer%20(Asgardian%20Automaton).jpg",
            grade: 'C',
            power: 130,
            hp: 260,
            maxHp: 260,
            powers: 'Energy Lance, Kinetic Armor',
            description: 'Armored vanguard specializing in clearing barricades.'
          },
          {
            id: 'enemy-chitauri-soldier-2',
            name: 'Chitauri Scout',
            avatar: '👽',
            imageUrl: "/Images%20Marvel/Kid%20Loki.jpg",
            grade: 'C',
            power: 110,
            hp: 200,
            maxHp: 200,
            powers: 'Plasma Rifle, Evasive Thruster',
            description: 'Fast aerial skirmisher providing overwatch.'
          }
        ],
        victoryConditions: ['Defeat all 3 invaders', 'Finish with all 3 squad heroes alive', 'Clear within 7 rounds'],
        firstClearRewards: { xp: 120, astra: 250, shards: { category: 'C', amount: 10 } },
        repeatRewards: { xp: 35, astra: 70 }
      },
      {
        id: 'stage-1-2',
        chapterNumber: 1,
        stageNumber: 2,
        title: 'Stark Tower Breach',
        subtitle: 'Ultron Sub-Sentry Swarm',
        location: 'Stark Tower Penthouse',
        description: 'Sub-routines of an exiled Ultron AI have hijacked Stark Industries security sentries. Reclaim the arc reactor core.',
        recommendedPower: 650,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-ultron-sentry-1',
            name: 'Ultron Prime Sentry',
            avatar: '🤖',
            imageUrl: "/Images%20Marvel/Infinity%20Ultron.jpg",
            grade: 'B',
            power: 210,
            hp: 350,
            maxHp: 350,
            powers: 'Concussive Blasters, Vibranium Plating',
            description: 'Cold computational automaton executing human extinction protocols.'
          },
          {
            id: 'enemy-ultron-sentry-2',
            name: 'Ultron Disrupter',
            avatar: '⚡',
            imageUrl: "/Images%20Marvel/Ultron.jpg",
            grade: 'B',
            power: 220,
            hp: 320,
            maxHp: 320,
            powers: 'EMP Field, Tractor Beam',
            description: 'Specializes in disabling hero technology and kinetic shielding.'
          },
          {
            id: 'enemy-ultron-sentry-3',
            name: 'Ultron Infiltrator',
            avatar: '🤖',
            imageUrl: "/Images%20Marvel/Vision.jpg",
            grade: 'B',
            power: 220,
            hp: 340,
            maxHp: 340,
            powers: 'Laser Barrage, Self-Repair Array',
            description: 'Rapid-firing airborne drone.'
          }
        ],
        victoryConditions: ['Purge the Ultron swarm', 'Keep squad HP above 40%', 'Clear within 6 rounds'],
        firstClearRewards: { xp: 180, astra: 380, shards: { category: 'B', amount: 8 } },
        repeatRewards: { xp: 50, astra: 100 }
      },
      {
        id: 'stage-1-3',
        chapterNumber: 1,
        stageNumber: 3,
        title: 'Sanctum Sanctorum Siege',
        subtitle: 'Dimensional Shadow Marauders',
        location: 'Bleecker Street Sanctum',
        description: 'Dark mystic entities are attempting to breach the Sanctum wards. Protect the Eye of Agamotto vault.',
        recommendedPower: 950,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-zealot-mage',
            name: 'Kaecilius Zealot Adept',
            avatar: '🔮',
            imageUrl: "/Images%20Marvel/Kaecilius.jpg",
            grade: 'B',
            power: 310,
            hp: 420,
            maxHp: 420,
            powers: 'Space Shards, Mirror Dimension Folding',
            description: 'Fanatical practitioner bending Euclidean reality to crush trespassers.'
          },
          {
            id: 'enemy-dark-dimension-golem',
            name: 'Dormammu Entity Beast',
            avatar: '👹',
            imageUrl: "/Images%20Marvel/Dormammu.jpg",
            grade: 'A',
            power: 340,
            hp: 550,
            maxHp: 550,
            powers: 'Entropy Void, Matter Crushing',
            description: 'Monstrosity molded from dark energy and temporal rot.'
          },
          {
            id: 'enemy-zealot-mage-2',
            name: 'Dark Siphon Cultist',
            avatar: '🔮',
            imageUrl: "/Images%20Marvel/Dark%20Carnage.jpg",
            grade: 'B',
            power: 300,
            hp: 400,
            maxHp: 400,
            powers: 'Soul Leech, Eldritch Shield',
            description: 'Channels unholy energy to siphon vital life essence.'
          }
        ],
        victoryConditions: ['Neutralize dark entities', 'Win with 2+ heroes alive', 'Clear within 7 rounds'],
        firstClearRewards: { xp: 240, astra: 500, shards: { category: 'B', amount: 12 } },
        repeatRewards: { xp: 70, astra: 140 }
      },
      {
        id: 'stage-1-4',
        chapterNumber: 1,
        stageNumber: 4,
        title: 'Climax: God of Mischief',
        subtitle: 'Loki’s Sovereign Challenge',
        location: 'Stark Tower Rooftop Portal',
        description: 'Loki holds the Chitauri scepter high, intending to open a permanent cosmic gate over Earth. Bring him to his knees.',
        recommendedPower: 1250,
        isBoss: true,
        enemies: [
          {
            id: 'enemy-destroyer-husk',
            name: 'Asgardian Destroyer Sentry',
            avatar: '🤖',
            imageUrl: "/Images%20Marvel/The%20Destroyer%20(Asgardian%20Automaton).jpg",
            grade: 'A',
            power: 380,
            hp: 600,
            maxHp: 600,
            powers: 'Disintegration Beam, Uru Armor',
            description: 'Automated suit forged from enchanted Uru metal.'
          },
          {
            id: 'enemy-boss-loki',
            name: 'Loki (God of Mischief)',
            avatar: '👑',
            imageUrl: "/Images%20Marvel/Loki%20(God%20of%20Stories).jpg",
            grade: 'A',
            power: 520,
            hp: 950,
            maxHp: 950,
            powers: 'Mind Stone Blast, Mirror Illusion Decoy, Astral Daggers',
            description: 'Prince of Asgard and master of illusion wielding the Chitauri Scepter.'
          },
          {
            id: 'enemy-frost-giant-lieutenant',
            name: 'Jotunheim Frost Lieutenant',
            avatar: '❄️',
            imageUrl: "/Images%20Marvel/Frost%20Giant%20Loki%20(Jotunheim%20Heir).jpg",
            grade: 'B',
            power: 350,
            hp: 550,
            maxHp: 550,
            powers: 'Cryo Spear, Glacial Armor',
            description: 'Ancient giant whose touch flash-freezes biological tissue.'
          }
        ],
        victoryConditions: ['Defeat Boss Loki', 'No heroes fall in battle', 'Clear within 8 rounds'],
        firstClearRewards: { 
          xp: 450, 
          astra: 1000, 
          shards: { category: 'A', amount: 15 },
          characterId: 'char-b-031' // Awards Loki (or rare hero)
        },
        repeatRewards: { xp: 120, astra: 250 }
      }
    ]
  },

  // ==========================================
  // CHAPTER 2 — WAKANDA
  // ==========================================
  {
    number: 2,
    title: 'CHAPTER 2: WAKANDA',
    subtitle: 'THE BATTLE FOR VIBRANIUM',
    location: 'Birnin Zana & The Great Mound',
    themeColor: 'purple',
    gradient: 'from-purple-950/70 via-slate-900/80 to-amber-950/80',
    backdropUrl: "/Images%20Marvel/Captain%20America.jpg",
    description: 'Black-market syndicates led by Klaue and an insurgent faction armed by Killmonger have infiltrated the Vibranium vaults under Mount Bashenga.',
    requiredCommanderLevel: 8,
    stages: [
      {
        id: 'stage-2-1',
        chapterNumber: 2,
        stageNumber: 1,
        title: 'Border Shield Outpost',
        subtitle: 'Klaue Mercenary Infiltration',
        location: 'Wakandan Border Savanna',
        description: 'Sonic-cannon armed smugglers have dismantled the stealth camouflage barrier. Secure the perimeter.',
        recommendedPower: 1600,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-klaue-mercenary-1',
            name: 'Klaue Smuggler Vanguard',
            avatar: '🔫',
            imageUrl: "/Images%20Marvel/Killmonger.jpg",
            grade: 'B',
            power: 490,
            hp: 680,
            maxHp: 680,
            powers: 'Sonic Disruptor Gun, Tactical Body Armor',
            description: 'Heavy weapons mercenary with black market cybernetics.'
          },
          {
            id: 'enemy-klaue-mercenary-2',
            name: 'Sonic Demolitionist',
            avatar: '💣',
            imageUrl: "/Images%20Marvel/Shocker.jpg",
            grade: 'B',
            power: 530,
            hp: 720,
            maxHp: 720,
            powers: 'Vibranium Breaching Charges',
            description: 'Explosives expert trained in sonic frequency disruption.'
          },
          {
            id: 'enemy-klaue-mercenary-3',
            name: 'Syndicate Spotter',
            avatar: '🎯',
            imageUrl: "/Images%20Marvel/Falcon.jpg",
            grade: 'B',
            power: 500,
            hp: 650,
            maxHp: 650,
            powers: 'Sniper Laser, Optical Cloak',
            description: 'Sharpshooter firing armor-piercing kinetic rounds.'
          }
        ],
        victoryConditions: ['Clear all 3 smugglers', 'Take down enemies before round 7', 'Keep MVP above 60% HP'],
        firstClearRewards: { xp: 320, astra: 700, shards: { category: 'A', amount: 8 } },
        repeatRewards: { xp: 90, astra: 180 }
      },
      {
        id: 'stage-2-2',
        chapterNumber: 2,
        stageNumber: 2,
        title: 'Great Mound Vibranium Mines',
        subtitle: 'Sub-Terra Ambush',
        location: 'Mount Bashenga Mine Shaft 4',
        description: 'Deep in the glowing purple veins of raw Vibranium, an elite strike force attempts to destabilize the mag-lev train system.',
        recommendedPower: 2100,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-rebel-wardog-1',
            name: 'Rogue War Dog Commando',
            avatar: '🗡️',
            imageUrl: "/Images%20Marvel/Killmonger.jpg",
            grade: 'A',
            power: 650,
            hp: 850,
            maxHp: 850,
            powers: 'Vibranium Ring Blades, Ghost Cloaking',
            description: 'Elite deep-cover operative turncoat with military training.'
          },
          {
            id: 'enemy-mining-mech',
            name: 'Repurposed Mining Mech',
            avatar: '🦾',
            imageUrl: "/Images%20Marvel/Hulkbuster.jpg",
            grade: 'A',
            power: 700,
            hp: 1050,
            maxHp: 1050,
            powers: 'Sonic Drill, Kinetic Dampening Plates',
            description: 'Heavy industrial walking rig converted for lethal defense.'
          },
          {
            id: 'enemy-rebel-wardog-2',
            name: 'Rogue War Dog Scout',
            avatar: '🗡️',
            imageUrl: "/Images%20Marvel/Okoye.jpg",
            grade: 'A',
            power: 660,
            hp: 880,
            maxHp: 880,
            powers: 'Energy Darts, Kinetic Absorption',
            description: 'High agility flanker aiming for vital artery strikes.'
          }
        ],
        victoryConditions: ['Neutralize rogue squad', 'Finish in under 6 rounds', 'Win with all squad alive'],
        firstClearRewards: { xp: 400, astra: 900, shards: { category: 'A', amount: 12 } },
        repeatRewards: { xp: 110, astra: 220 }
      },
      {
        id: 'stage-2-3',
        chapterNumber: 2,
        stageNumber: 3,
        title: 'Shuri’s Laboratory Defense',
        subtitle: 'Sonic Arm Cannon Battery',
        location: 'Royal Tech Research Facility',
        description: 'Ulysses Klaue himself has breached the research levels, wielding his prosthetic vibranium sonic arm cannon at maximum frequency.',
        recommendedPower: 2600,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-klaue-boss',
            name: 'Ulysses Klaue (Sonic Overdrive)',
            avatar: '🦿',
            imageUrl: "/Images%20Marvel/Killmonger.jpg",
            grade: 'A',
            power: 880,
            hp: 1300,
            maxHp: 1300,
            powers: 'Full-Spectrum Sonic Cannon, Seismic Pulse Wave',
            description: 'Ruthless South African arms dealer empowered by raw sonic vibranium.'
          },
          {
            id: 'enemy-heavy-enforcer-1',
            name: 'Klaue Cyber-Bodyguard',
            avatar: '🛡️',
            imageUrl: "/Images%20Marvel/Crossbones.jpg",
            grade: 'A',
            power: 800,
            hp: 1150,
            maxHp: 1150,
            powers: 'Riot Shield, Kinetic Shockwave',
            description: 'Heavy armor guard deflecting energy blasts back to sender.'
          },
          {
            id: 'enemy-heavy-enforcer-2',
            name: 'Klaue Cyber-Bodyguard',
            avatar: '🛡️',
            imageUrl: "/Images%20Marvel/Crossbones.jpg",
            grade: 'A',
            power: 800,
            hp: 1150,
            maxHp: 1150,
            powers: 'Plasma Baton, Suppressive Fire',
            description: 'Crowd-control enforcer locking down melee combatants.'
          }
        ],
        victoryConditions: ['Defeat Ulysses Klaue', 'No ally faints', 'Clear in 7 rounds or fewer'],
        firstClearRewards: { xp: 500, astra: 1200, shards: { category: 'A', amount: 16 } },
        repeatRewards: { xp: 140, astra: 280 }
      },
      {
        id: 'stage-2-4',
        chapterNumber: 2,
        stageNumber: 4,
        title: 'Climax: Golden Jaguar',
        subtitle: 'Killmonger’s Challenge for the Throne',
        location: 'Warrior Falls Ritual Arena',
        description: 'Erik Killmonger dons the golden habit suit, empowered by the Heart-Shaped Herb. He intends to arm global insurgencies with Wakandan war weapons.',
        recommendedPower: 3200,
        isBoss: true,
        enemies: [
          {
            id: 'enemy-border-tribe-warrior',
            name: 'W’Kabi Armored Vanguard',
            avatar: '🦏',
            imageUrl: "/Images%20Marvel/Armor.jpg",
            grade: 'A',
            power: 950,
            hp: 1400,
            maxHp: 1400,
            powers: 'Shield Mantle, Armored Rhino Charge',
            description: 'Commanding general fielding impenetrable personal energy shields.'
          },
          {
            id: 'enemy-boss-killmonger',
            name: 'Erik Killmonger (Golden Jaguar)',
            avatar: '🐆',
            imageUrl: "/Images%20Marvel/Killmonger.jpg",
            grade: 'MYTHIC',
            power: 1250,
            hp: 2100,
            maxHp: 2100,
            powers: 'Kinetic Shockwave Blast, Vibranium Daggers, Apex Reflexes',
            description: 'Black Ops killer and royal heir wielding unmatched ruthless close-quarters mastery.'
          },
          {
            id: 'enemy-rebel-wardog-elite',
            name: 'Ghost War Dog Elite',
            avatar: '🗡️',
            imageUrl: "/Images%20Marvel/Black%20Panther%20(Shuri).jpg",
            grade: 'A',
            power: 920,
            hp: 1350,
            maxHp: 1350,
            powers: 'Cloaking Shroud, Vibranium Talon',
            description: 'Stealth assassin targeting weakened heroes.'
          }
        ],
        victoryConditions: ['Defeat Boss Killmonger', 'Clear stage with 2+ heroes alive', 'Clear within 8 rounds'],
        firstClearRewards: { 
          xp: 800, 
          astra: 2000, 
          shards: { category: 'MYTHIC', amount: 5 },
          characterId: 'char-b-005'
        },
        repeatRewards: { xp: 180, astra: 350 }
      }
    ]
  },

  // ==========================================
  // CHAPTER 3 — ASGARD
  // ==========================================
  {
    number: 3,
    title: 'CHAPTER 3: ASGARD',
    subtitle: 'RAGNAROK & THE REALM OF GODS',
    location: 'The Rainbow Bridge & Royal Palace',
    themeColor: 'amber',
    gradient: 'from-amber-950/70 via-slate-900/80 to-rose-950/80',
    backdropUrl: "/Images%20Marvel/Captain%20America.jpg",
    description: 'Hela has returned from the prison realm of Hel, resurrecting her Berserker army and laying waste to the golden spires of Asgard.',
    requiredCommanderLevel: 15,
    stages: [
      {
        id: 'stage-3-1',
        chapterNumber: 3,
        stageNumber: 1,
        title: 'The Bifrost Shattered',
        subtitle: 'Berserker Undead Legion',
        location: 'Heimdall’s Observatory',
        description: 'Undead Asgardian Berserkers pour across the rainbow bridge. Hold the cosmic gateway.',
        recommendedPower: 3800,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-berserker-1',
            name: 'Undead Asgardian Berserker',
            avatar: '🧟',
            imageUrl: "/Images%20Marvel/Gorrs%20Shadow%20Berserker.jpg'",
            grade: 'A',
            power: 1150,
            hp: 1700,
            maxHp: 1700,
            powers: 'Necrotic Axes, Relentless Frenzy',
            description: 'Ancient warrior reanimated by Hela’s dark necro-flame.'
          },
          {
            id: 'enemy-berserker-2',
            name: 'Berserker Juggernaut',
            avatar: '🪓',
            imageUrl: "/Images%20Marvel/Juggernaut.jpg",
            grade: 'A',
            power: 1250,
            hp: 1950,
            maxHp: 1950,
            powers: 'Ground Slam, Undead Fortitude',
            description: 'Massive warrior immune to stun and bleeding.'
          },
          {
            id: 'enemy-berserker-3',
            name: 'Undead Asgardian Berserker',
            avatar: '🧟',
            imageUrl: "/Images%20Marvel/Gorrs%20Shadow%20Berserker.jpg'",
            grade: 'A',
            power: 1150,
            hp: 1700,
            maxHp: 1700,
            powers: 'Necrotic Axes, Bloodlust',
            description: 'Ruthless soldier heedless of self-preservation.'
          }
        ],
        victoryConditions: ['Purge undead berserkers', 'Finish under 7 rounds', 'All squad members survive'],
        firstClearRewards: { xp: 600, astra: 1500, shards: { category: 'A', amount: 15 } },
        repeatRewards: { xp: 160, astra: 320 }
      },
      {
        id: 'stage-3-2',
        chapterNumber: 3,
        stageNumber: 2,
        title: 'Sakaar Coliseum Enforcers',
        subtitle: 'Champions of the Scrapper King',
        location: 'Contest of Champions Arena',
        description: 'Hela has allied with rogue interstellar gladiators and execution squads to crush Asgardian defenders.',
        recommendedPower: 4500,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-sakaar-champion-1',
            name: 'Korg (Coliseum Rebel)',
            avatar: '🗿',
            imageUrl: "/Images%20Marvel/Korg.jpg",
            grade: 'A',
            power: 1400,
            hp: 2200,
            maxHp: 2200,
            powers: 'Kronan Rock Armor, Heavy Blaster Club',
            description: 'Kronan gladiator constructed of solid sentient stone.'
          },
          {
            id: 'enemy-sakaar-champion-2',
            name: 'Skurge the Executioner',
            avatar: '🔫',
            imageUrl: "/Images%20Marvel/Executioner%20(Skurge).jpg",
            grade: 'A',
            power: 1450,
            hp: 2100,
            maxHp: 2100,
            powers: 'Twin M16 Rifles (Des and Troy), Bloodaxe',
            description: 'Conflicted Asgardian warrior bound by fear to Hela’s command.'
          },
          {
            id: 'enemy-sakaar-champion-3',
            name: 'Miek (Blade Form)',
            avatar: '🪲',
            imageUrl: "/Images%20Marvel/Blade.jpg",
            grade: 'A',
            power: 1350,
            hp: 1900,
            maxHp: 1900,
            powers: 'Exosuit Blades, Acid Spray',
            description: 'Insectoid fighter with deadly dual titanium arm scythes.'
          }
        ],
        victoryConditions: ['Overcome the champions', 'Finish in 6 rounds', 'MVP deals 5,000+ damage'],
        firstClearRewards: { xp: 750, astra: 1800, shards: { category: 'A', amount: 20 } },
        repeatRewards: { xp: 200, astra: 400 }
      },
      {
        id: 'stage-3-3',
        chapterNumber: 3,
        stageNumber: 3,
        title: 'The Hall of Odin’s Relics',
        subtitle: 'Fenris the Giant Wolf',
        location: 'Underground Vault of Relics',
        description: 'Fenris, the legendary monstrous wolf of Hel, guards the eternal flame vault. Subdue the beast before Hela ignites Surtur.',
        recommendedPower: 5200,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-fenris-wolf',
            name: 'Fenris (Great Wolf of Hel)',
            avatar: '🐺',
            imageUrl: "/Images%20Marvel/Werewolf%20by%20Night.jpg",
            grade: 'MYTHIC',
            power: 1750,
            hp: 2900,
            maxHp: 2900,
            powers: 'Titanic Bite, Unstoppable Roar, Necro-Flesh',
            description: 'Mythological Asgardian wolf whose jaw can crush dreadnought hulls.'
          },
          {
            id: 'enemy-necro-blade-adept-1',
            name: 'Necro-Sword Conjurer',
            avatar: '🗡️',
            imageUrl: "/Images%20Marvel/Gorrs%20Shadow%20Berserker.jpg'",
            grade: 'A',
            power: 1500,
            hp: 2100,
            maxHp: 2100,
            powers: 'Black Blade Rain, Telekinetic Thrust',
            description: 'Conjures endless volleys of obsidian blades from thin air.'
          },
          {
            id: 'enemy-necro-blade-adept-2',
            name: 'Necro-Sword Conjurer',
            avatar: '🗡️',
            imageUrl: "/Images%20Marvel/Gorrs%20Shadow%20Berserker.jpg'",
            grade: 'A',
            power: 1500,
            hp: 2100,
            maxHp: 2100,
            powers: 'Shadow Impale, Dark Ward',
            description: 'Dark sorcerer protecting Fenris from divine light.'
          }
        ],
        victoryConditions: ['Defeat Fenris', 'Finish in under 7 rounds', 'Survive all ultimate attacks'],
        firstClearRewards: { xp: 900, astra: 2200, shards: { category: 'MYTHIC', amount: 8 } },
        repeatRewards: { xp: 240, astra: 480 }
      },
      {
        id: 'stage-3-4',
        chapterNumber: 3,
        stageNumber: 4,
        title: 'Climax: Goddess of Death',
        subtitle: 'Hela’s Dominion over Asgard',
        location: 'Throne Room of Valhalla',
        description: 'Hela draws unlimited strength from the soil of Asgard. Face the rightful heir of the executioner wars in her full dreadful majesty.',
        recommendedPower: 6000,
        isBoss: true,
        enemies: [
          {
            id: 'enemy-undead-einhenjar',
            name: 'Ancient Einherjar Warlord',
            avatar: '🛡️',
            imageUrl: "/Images%20Marvel/Odin.jpg",
            grade: 'A',
            power: 1700,
            hp: 2600,
            maxHp: 2600,
            powers: 'Uru Greatsword, Shield Wall',
            description: 'Odin’s fallen personal guard reanimated in service of death.'
          },
          {
            id: 'enemy-boss-hela',
            name: 'Hela (Goddess of Death)',
            avatar: '👑',
            imageUrl: "/Images%20Marvel/Hela.jpg",
            grade: 'MYTHIC',
            power: 2300,
            hp: 3800,
            maxHp: 3800,
            powers: 'Infinite Necro-Blades, Asgardian Immortality, Death Spikes Wave',
            description: 'Firstborn of Odin whose power grows infinitely while she stands upon Asgard.'
          },
          {
            id: 'enemy-undead-asgardian-captain',
            name: 'Berserker Vanguard Captain',
            avatar: '⚔️',
            imageUrl: "/Images%20Marvel/Gorrs%20Shadow%20Berserker.jpg'",
            grade: 'A',
            power: 1650,
            hp: 2500,
            maxHp: 2500,
            powers: 'Cleaving Axe, Necro-Shield',
            description: 'Ruthless frontline commander.'
          }
        ],
        victoryConditions: ['Defeat Goddess Hela', 'All squad members survive', 'Clear in 8 rounds'],
        firstClearRewards: { 
          xp: 1200, 
          astra: 3000, 
          shards: { category: 'MYTHIC', amount: 12 },
          characterId: 'char-b-013'
        },
        repeatRewards: { xp: 300, astra: 600 }
      }
    ]
  },

  // ==========================================
  // CHAPTER 4 — QUANTUM REALM
  // ==========================================
  {
    number: 4,
    title: 'CHAPTER 4: QUANTUM REALM',
    subtitle: 'THE CHRONOPOLIS DYNASTY',
    location: 'Axia City & Kang’s Citadel',
    themeColor: 'emerald',
    gradient: 'from-emerald-950/70 via-slate-900/80 to-cyan-950/80',
    backdropUrl: "/Images%20Marvel/Black%20Panther.jpg",
    description: 'Trapped outside space and time, Kang the Conqueror has harnessed the quantum engine to erase timelines that oppose his supremacy.',
    requiredCommanderLevel: 22,
    stages: [
      {
        id: 'stage-4-1',
        chapterNumber: 4,
        stageNumber: 1,
        title: 'Sub-Atomic Wasteland',
        subtitle: 'Quantum Micro-Fauna Swarm',
        location: 'The Quantum Storm Plains',
        description: 'Massive quantum beasts and energy-feeding organisms swarm the Pym particle landing zone.',
        recommendedPower: 6800,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-quantum-ray-1',
            name: 'Quantum Sun-Stalker',
            avatar: '🦇',
            imageUrl: "/Images%20Marvel/Nova.jpg",
            grade: 'A',
            power: 2100,
            hp: 3100,
            maxHp: 3100,
            powers: 'Sub-Atomic Radiation Breath, Phase Evasion',
            description: 'Colossal flying creature that feeds on timeline radiation.'
          },
          {
            id: 'enemy-quantum-colossus',
            name: 'Chrono-Slug Colossus',
            avatar: '🪱',
            imageUrl: "/Images%20Marvel/Colossus.jpg",
            grade: 'MYTHIC',
            power: 2300,
            hp: 3600,
            maxHp: 3600,
            powers: 'Quantum Crush, Probability Shield',
            description: 'Massive armored creature existing in multiple realities simultaneously.'
          },
          {
            id: 'enemy-quantum-ray-2',
            name: 'Quantum Sun-Stalker',
            avatar: '🦇',
            imageUrl: "/Images%20Marvel/Nova.jpg",
            grade: 'A',
            power: 2100,
            hp: 3100,
            maxHp: 3100,
            powers: 'Disruption Wave, Wing Slash',
            description: 'Sub-atomic hunter targeting energy signatures.'
          }
        ],
        victoryConditions: ['Survive the quantum beasts', 'Clear in 7 rounds', 'No heroes fall'],
        firstClearRewards: { xp: 1100, astra: 2800, shards: { category: 'MYTHIC', amount: 10 } },
        repeatRewards: { xp: 280, astra: 560 }
      },
      {
        id: 'stage-4-2',
        chapterNumber: 4,
        stageNumber: 2,
        title: 'Axia Underbelly Defense',
        subtitle: 'MODOK’s Cybernetic Assault',
        location: 'City of Axia Outer Ring',
        description: 'Darren Cross, rebuilt as the Mechanized Organism Designed Only for Killing, intercepts your squad at the city gates.',
        recommendedPower: 7600,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-kang-soldier-1',
            name: 'Chrono-Centurion Guard',
            avatar: '🛡️',
            imageUrl: "/Images%20Marvel/Guardian.jpg",
            grade: 'A',
            power: 2300,
            hp: 3400,
            maxHp: 3400,
            powers: 'Phase Rifle, Tachyon Barrier',
            description: 'Future-tech soldier equipped with 31st century weapon systems.'
          },
          {
            id: 'enemy-boss-modok',
            name: 'M.O.D.O.K. (Mechanized Organism)',
            avatar: '🧠',
            imageUrl: "/Images%20Marvel/MODOK%20Supreme.jpg",
            grade: 'MYTHIC',
            power: 2600,
            hp: 4200,
            maxHp: 4200,
            powers: 'Headband Mind Beam, Rocket Salvo, Doomsday Shield',
            description: 'Cynical cybernetic weapon designed for relentless lethal calculations.'
          },
          {
            id: 'enemy-kang-soldier-2',
            name: 'Chrono-Centurion Guard',
            avatar: '🛡️',
            imageUrl: "/Images%20Marvel/Guardian.jpg",
            grade: 'A',
            power: 2300,
            hp: 3400,
            maxHp: 3400,
            powers: 'Phase Disrupter, Grav-Grenade',
            description: 'Kang’s personal security cadre.'
          }
        ],
        victoryConditions: ['Defeat MODOK', 'Keep squad HP above 50%', 'Clear in under 7 rounds'],
        firstClearRewards: { xp: 1300, astra: 3400, shards: { category: 'MYTHIC', amount: 15 } },
        repeatRewards: { xp: 330, astra: 660 }
      },
      {
        id: 'stage-4-3',
        chapterNumber: 4,
        stageNumber: 3,
        title: 'The Time Core Crucible',
        subtitle: 'Council of Kang Enforcers',
        location: 'Citadel of Chronopolis',
        description: 'Elite timeline variants guarding Kang’s Multiverse Engine attempt to erase your heroes from history before the main battle.',
        recommendedPower: 8500,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-kang-variant-1',
            name: 'Pharaoh Rama-Tut Variant',
            avatar: '🏺',
            imageUrl: "/Images%20Marvel/Kang%20The%20Conqueror.jpg",
            grade: 'MYTHIC',
            power: 2750,
            hp: 4400,
            maxHp: 4400,
            powers: 'Solar Ray Gun, Ancient Chrono-Spells',
            description: 'Kang variant who conquered ancient Egypt with future technology.'
          },
          {
            id: 'enemy-kang-variant-2',
            name: 'Scarlet Centurion Variant',
            avatar: '⚔️',
            imageUrl: "/Images%20Marvel/Kang%20the%20Conqueror%20(He%20Who%20Remains).jpg",
            grade: 'MYTHIC',
            power: 2850,
            hp: 4600,
            maxHp: 4600,
            powers: 'Particle Lance, Force Field Matrix',
            description: 'Armored warlord variant armed with reality-rending laser artillery.'
          },
          {
            id: 'enemy-kang-soldier-elite',
            name: 'Tachyon Commando Captain',
            avatar: '🛡️',
            imageUrl: "/Images%20Marvel/Captain%20America%20(Sam%20Wilson).jpg",
            grade: 'A',
            power: 2500,
            hp: 3900,
            maxHp: 3900,
            powers: 'Tachyon Cannon, Time Slip',
            description: 'Special forces commander who can rewind battle damage.'
          }
        ],
        victoryConditions: ['Defeat timeline variants', 'Clear in 6 rounds', 'Win with 2+ heroes standing'],
        firstClearRewards: { xp: 1600, astra: 4000, shards: { category: 'MYTHIC', amount: 20 } },
        repeatRewards: { xp: 400, astra: 800 }
      },
      {
        id: 'stage-4-4',
        chapterNumber: 4,
        stageNumber: 4,
        title: 'Climax: The Conqueror',
        subtitle: 'Kang’s Quantum Annihilation',
        location: 'The Quantum Engine Nexus',
        description: 'Kang stands atop his time core. With a thought, he can rewrite existence. Break his forcefield and shatter the engine.',
        recommendedPower: 9600,
        isBoss: true,
        enemies: [
          {
            id: 'enemy-chrono-titan',
            name: 'Sub-Atomic War Rig',
            avatar: '🤖',
            imageUrl: "/Images%20Marvel/Iron%20Man%20(Model%20Prime).jpg",
            grade: 'MYTHIC',
            power: 2900,
            hp: 4800,
            maxHp: 4800,
            powers: 'Heavy Gauss Cannon, Anti-Matter Missiles',
            description: 'Giant walking battle tank shielding Kang’s flank.'
          },
          {
            id: 'enemy-boss-kang',
            name: 'Kang the Conqueror',
            avatar: '⏳',
            imageUrl: "/Images%20Marvel/Kang%20The%20Conqueror.jpg",
            grade: 'MYTHIC',
            power: 3600,
            hp: 5800,
            maxHp: 5800,
            powers: 'Time-Stop Freeze, Disintegration Beams, Quantum Armor Mastery',
            description: 'Master of the multiverse whose armor allows him to manipulate the very fabric of time.'
          },
          {
            id: 'enemy-chrono-titan-2',
            name: 'Sub-Atomic War Rig',
            avatar: '🤖',
            imageUrl: "/Images%20Marvel/Iron%20Man%20(Model%20Prime).jpg",
            grade: 'MYTHIC',
            power: 2900,
            hp: 4800,
            maxHp: 4800,
            powers: 'Plasma Gatling, Shield Overcharge',
            description: 'Automated combat engine.'
          }
        ],
        victoryConditions: ['Defeat Boss Kang', 'All squad members survive', 'Clear within 8 rounds'],
        firstClearRewards: { 
          xp: 2200, 
          astra: 5000, 
          shards: { category: 'MYTHIC', amount: 25 },
          characterId: 'char-b-055'
        },
        repeatRewards: { xp: 550, astra: 1100 }
      }
    ]
  },

  // ==========================================
  // CHAPTER 5 — COSMIC
  // ==========================================
  {
    number: 5,
    title: 'CHAPTER 5: COSMIC',
    subtitle: 'THE INFINITY WAR',
    location: 'Sanctuary II & The Soul World',
    themeColor: 'rose',
    gradient: 'from-rose-950/70 via-slate-900/80 to-purple-950/80',
    backdropUrl: "/Images%20Marvel/Thor%20(Herald%20of%20Thunder).jpg",
    description: 'Thanos has gathered the Infinity Stones. The Black Order commands the cosmic armada Sanctuary II. The fate of all living souls across the multiverse rests in this final strike.',
    requiredCommanderLevel: 30,
    stages: [
      {
        id: 'stage-5-1',
        chapterNumber: 5,
        stageNumber: 1,
        title: 'Sanctuary II Outer Hull',
        subtitle: 'The Black Order Vanguard',
        location: 'Low Orbit of Titan',
        description: 'Corvus Glaive and Proxima Midnight lead the outer defense armada. Disable the warp drive.',
        recommendedPower: 10800,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-corvus-glaive',
            name: 'Corvus Glaive',
            avatar: '🗡️',
            imageUrl: "/Images%20Marvel/Corvus%20Glaive.jpg",
            grade: 'MYTHIC',
            power: 3400,
            hp: 5200,
            maxHp: 5200,
            powers: 'Immortal Halberd, Piercing Strike, Shadow Step',
            description: 'Cruel lieutenant whose weapon cuts atoms themselves; cannot die while his blade remains unbroken.'
          },
          {
            id: 'enemy-outrider-swarm',
            name: 'Outrider Blood-Pack',
            avatar: '🕷️',
            imageUrl: "/Images%20Marvel/Venom%20(Lethal%20Protector).jpg",
            grade: 'A',
            power: 3100,
            hp: 4800,
            maxHp: 4800,
            powers: 'Six-Arm Frenzy, Savage Maul',
            description: 'Genetically bred berserker beasts loyal to Thanos unto absolute annihilation.'
          },
          {
            id: 'enemy-proxima-midnight',
            name: 'Proxima Midnight',
            avatar: '🔱',
            imageUrl: "/Images%20Marvel/Proxima%20Midnight.jpg",
            grade: 'MYTHIC',
            power: 3500,
            hp: 5400,
            maxHp: 5400,
            powers: 'Star-Forged Spear, Solar Arc Beam',
            description: 'Deadliest combatant in the Black Order whose spear never misses its victim.'
          }
        ],
        victoryConditions: ['Defeat the Black Order Vanguard', 'Clear in under 7 rounds', 'Win with all squad alive'],
        firstClearRewards: { xp: 2600, astra: 6000, shards: { category: 'MYTHIC', amount: 20 } },
        repeatRewards: { xp: 650, astra: 1300 }
      },
      {
        id: 'stage-5-2',
        chapterNumber: 5,
        stageNumber: 2,
        title: 'Bridge of the Dreadnought',
        subtitle: 'Ebony Maw & Cull Obsidian',
        location: 'Sanctuary II Command Deck',
        description: 'Ebony Maw’s telekinetic mastery and Cull Obsidian’s brutal hammer guard the entrance to the Mad Titan’s chamber.',
        recommendedPower: 11800,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-cull-obsidian',
            name: 'Cull Obsidian',
            avatar: '🔨',
            imageUrl: "/Images%20Marvel/Cull%20Obsidian.jpg",
            grade: 'MYTHIC',
            power: 3800,
            hp: 6500,
            maxHp: 6500,
            powers: 'Chain Hammer, Spiked Armored Shield',
            description: 'Towering powerhouse whose swings shatter starship plating.'
          },
          {
            id: 'enemy-ebony-maw',
            name: 'Ebony Maw',
            avatar: '👽',
            imageUrl: "/Images%20Marvel/Ebony%20Maw.jpg",
            grade: 'MYTHIC',
            power: 4100,
            hp: 6000,
            maxHp: 6000,
            powers: 'Telekinetic Spikes, Metallic Constriction, Levitation',
            description: 'Vocal herald of Thanos who reshapes matter and gravity with subtle gestures.'
          },
          {
            id: 'enemy-chitauri-leviathan-core',
            name: 'Leviathan Siege Drone',
            avatar: '🐉',
            imageUrl: "/Images%20Marvel/Dragon%20Man.jpg",
            grade: 'MYTHIC',
            power: 3700,
            hp: 6200,
            maxHp: 6200,
            powers: 'Plasma Breath, Heavy Ram',
            description: 'Floating bio-mechanical behemoth armored in heavy chitin.'
          }
        ],
        victoryConditions: ['Defeat Maw and Obsidian', 'Clear in under 7 rounds', 'Keep squad HP above 50%'],
        firstClearRewards: { xp: 3200, astra: 7500, shards: { category: 'MYTHIC', amount: 25 } },
        repeatRewards: { xp: 800, astra: 1600 }
      },
      {
        id: 'stage-5-3',
        chapterNumber: 5,
        stageNumber: 3,
        title: 'The Soul World Threshold',
        subtitle: 'Phantoms of the Fallen',
        location: 'Vormir Altar of Soul',
        description: 'Before reaching the Mad Titan, you must overcome cosmic echoes of the heroes who fell defending the universe.',
        recommendedPower: 12800,
        isBoss: false,
        enemies: [
          {
            id: 'enemy-soul-phantom-1',
            name: 'Cosmic Echo: Iron Sentinel',
            avatar: '🤖',
            imageUrl: "/Images%20Marvel/Silver%20Surfer.jpg",
            grade: 'MYTHIC',
            power: 4200,
            hp: 6800,
            maxHp: 6800,
            powers: 'Unibeam, Nanotech Blade',
            description: 'Phantom memory of Tony Stark fighting with desperate valor.'
          },
          {
            id: 'enemy-soul-phantom-2',
            name: 'Cosmic Echo: Asgardian Thunder',
            avatar: '⚡',
            imageUrl: "/Images%20Marvel/Thor%20(Herald%20of%20Thunder).jpg",
            grade: 'MYTHIC',
            power: 4400,
            hp: 7200,
            maxHp: 7200,
            powers: 'Lightning Wrath, Stormbreaker Slam',
            description: 'Resonating avatar of pure thunder.'
          },
          {
            id: 'enemy-soul-phantom-3',
            name: 'Cosmic Echo: Mystic Master',
            avatar: '🔮',
            imageUrl: "/Images%20Marvel/Doctor%20Strange%20(Sorcerer%20Supreme).jpg",
            grade: 'MYTHIC',
            power: 4300,
            hp: 6900,
            maxHp: 6900,
            powers: 'Crimson Bands, Mirror Phantasm',
            description: 'Mystic illusion testing the willpower of the challenger.'
          }
        ],
        victoryConditions: ['Survive the soul trial', 'Clear in 6 rounds', 'All 3 heroes alive at conclusion'],
        firstClearRewards: { xp: 4000, astra: 9000, shards: { category: 'MYTHIC', amount: 30 } },
        repeatRewards: { xp: 1000, astra: 2000 }
      },
      {
        id: 'stage-5-4',
        chapterNumber: 5,
        stageNumber: 4,
        title: 'Final Climax: The Mad Titan',
        subtitle: 'Thanos and the Infinity Gauntlet',
        location: 'The Throne of Universal Destiny',
        description: 'Thanos wields all six Infinity Stones upon the golden gauntlet. The fate of 50 trillion souls hangs in the balance. Strike him down.',
        recommendedPower: 14000,
        isBoss: true,
        enemies: [
          {
            id: 'enemy-titan-war-hound',
            name: 'Infinity Armada Dreadnought',
            avatar: '🚀',
            imageUrl: "/Images%20Marvel/Thanos.jpg",
            grade: 'MYTHIC',
            power: 4500,
            hp: 7500,
            maxHp: 7500,
            powers: 'Orbital Bombardment, Anti-Titanium Barrier',
            description: 'Flagship artillery platform supporting Thanos.'
          },
          {
            id: 'enemy-boss-thanos',
            name: 'Thanos (The Mad Titan)',
            avatar: '👑',
            imageUrl: "/Images%20Marvel/Infinity%20Gauntlet%20Thanos.jpg",
            grade: 'MYTHIC',
            power: 5800,
            hp: 9900,
            maxHp: 9900,
            powers: 'Infinity Gauntlet Snap (Annihilation Beam), Power Stone Blast, Reality Alteration, Space Warp',
            description: 'Supreme galactic warlord possessing absolute mastery over all 6 aspects of creation.'
          },
          {
            id: 'enemy-titan-general',
            name: 'Outrider Warmaster',
            avatar: '🕷️',
            imageUrl: "/Images%20Marvel/Carnage.jpg",
            grade: 'MYTHIC',
            power: 4400,
            hp: 7200,
            maxHp: 7200,
            powers: 'Vicious Strike, Savage Howl',
            description: 'Supreme beast commander.'
          }
        ],
        victoryConditions: ['Defeat Thanos (The Mad Titan)', 'Endure the Infinity Gauntlet', 'Clear stage to save the Multiverse'],
        firstClearRewards: { 
          xp: 8000, 
          astra: 20000, 
          shards: { category: 'MYTHIC', amount: 50 },
          characterId: 'char-b-005'
        },
        repeatRewards: { xp: 1800, astra: 3500 }
      }
    ]
  }
];

export function getStageById(stageId: string): CampaignStage | undefined {
  for (const ch of CAMPAIGN_CHAPTERS) {
    const found = ch.stages.find(s => s.id === stageId);
    if (found) return found;
  }
  return undefined;
}

export function getChapterByNumber(num: number): ChapterInfo | undefined {
  return CAMPAIGN_CHAPTERS.find(c => c.number === num);
}
