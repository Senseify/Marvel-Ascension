import { Character } from '../../types/game';

/**
 * Fair Budget Recruits ("Bad Characters for $1")
 * Specifically balanced for players with $1 or low treasury who need to fill their roster.
 * - Grade: C
 * - Starting Price: $1
 * - Overall Power: 50 - 55 (fair & balanced vs standard 75-85 heroes)
 * - Standard 100 HP, working combat stats, and genuine abilities.
 */
export const BUDGET_RECRUITS: Character[] = [
  {
    id: 'budget-001',
    name: 'Trapster (Paste-Pot Pete)',
    alias: 'Master of Adhesives',
    grade: 'C',
    alignment: 'Villain',
    startingPrice: 1,
    powers: 'Multi-polymer adhesive glue gun, solvent sprays, and sticky traps.',
    description: 'Bargain-bin chemist armed with pressurized adhesive canisters that occasionally stick to his own boots.',
    imageUrl: '/Images%20Marvel/Trapster%20(Paste-Pot%20Pete).jpg',
    color: '#84CC16',
    stats: { strength: 48, speed: 50, durability: 52, intelligence: 62, energy: 45, combat: 50 },
    specialAbilities: [
      { name: 'Sticky Glue Trap', description: 'Coats enemy boots in industrial polymer, restricting movement.', bonusPower: 2, triggerRate: 0.45, type: 'tactical' }
    ],
    overallPower: 53
  },
  {
    id: 'budget-002',
    name: 'Leap-Frog (Vincent Patilio)',
    alias: 'Amphibious Marauder',
    grade: 'C',
    alignment: 'Villain',
    startingPrice: 1,
    powers: 'Spring-loaded coil boots with highly erratic and unpredictable bounce trajectory.',
    description: 'Well-meaning amateur villain whose oversized frog-suit coils launch him wildly across the arena.',
    imageUrl: '/Images%20Marvel/Leap-Frog%20(Vincent%20Patilio).jpg',
    color: '#16A34A',
    stats: { strength: 46, speed: 58, durability: 48, intelligence: 42, energy: 35, combat: 48 },
    specialAbilities: [
      { name: 'Erratic Leap Crash', description: 'Bounces erratically off the ceiling and crashes into the target.', bonusPower: 2, triggerRate: 0.45, type: 'attack' }
    ],
    overallPower: 52
  },
  {
    id: 'budget-003',
    name: 'J. Jonah Jameson',
    alias: 'Daily Bugle Publisher',
    grade: 'C',
    alignment: 'Anti-Hero',
    startingPrice: 1,
    powers: 'Front-page smear headlines, deafening megaphone shouting, and legal intimidation.',
    description: 'Fiercely demanding newspaper publisher who weaponizes libel, high blood pressure, and verbal abuse.',
    imageUrl: '/Images%20Marvel/J.%20Jonah%20Jameson.jpg',
    color: '#71717A',
    stats: { strength: 38, speed: 45, durability: 45, intelligence: 72, energy: 30, combat: 42 },
    specialAbilities: [
      { name: 'Slanderous Headline', description: 'Prints a scathing exposé that demoralizes the opposing fighter.', bonusPower: 2, triggerRate: 0.5, type: 'tactical' }
    ],
    overallPower: 50
  },
  {
    id: 'budget-004',
    name: 'Stilt-Man (Wilbur Day)',
    alias: 'High-Rise Crook',
    grade: 'C',
    alignment: 'Villain',
    startingPrice: 1,
    powers: 'Hydraulic telescopic titanium legs towering up to 50 feet in the air.',
    description: 'Petty burglar who towers above the opposition on wobbly mechanical legs prone to losing balance.',
    imageUrl: '/Images%20Marvel/Stilt-Man%20(Wilbur%20Day).jpg',
    color: '#0284C7',
    stats: { strength: 52, speed: 46, durability: 54, intelligence: 55, energy: 40, combat: 48 },
    specialAbilities: [
      { name: 'Hydraulic Stomp', description: 'Extends a massive mechanical stilt downward with clumsy kinetic force.', bonusPower: 3, triggerRate: 0.4, type: 'attack' }
    ],
    overallPower: 54
  },
  {
    id: 'budget-005',
    name: 'Tinkerer (Phineas Mason)',
    alias: 'Underworld Mechanic',
    grade: 'C',
    alignment: 'Villain',
    startingPrice: 1,
    powers: 'Makeshift jury-rigged energy blasters assembled from consumer scrap electronics.',
    description: 'Elderly underground technician who cobbles together budget weapons from discarded microwave parts.',
    imageUrl: '/Images%20Marvel/Tinkerer.jpg',
    color: '#64748B',
    stats: { strength: 35, speed: 40, durability: 42, intelligence: 78, energy: 52, combat: 45 },
    specialAbilities: [
      { name: 'Scrap-Tech Overload', description: 'Jury-rigs a capacitor into a brief electrical shock burst.', bonusPower: 2, triggerRate: 0.45, type: 'attack' }
    ],
    overallPower: 51
  },
  {
    id: 'budget-006',
    name: 'Hydra Foot Soldier',
    alias: 'Operative Bob',
    grade: 'C',
    alignment: 'Villain',
    startingPrice: 1,
    powers: 'Standard issue energy carbine, Kevlar vest, and tactical retreat protocol.',
    description: 'Low-ranking henchman just trying to survive comic-book battles and collect his dental benefits.',
    imageUrl: '/Images%20Marvel/Crossbones.jpg',
    color: '#15803D',
    stats: { strength: 48, speed: 50, durability: 48, intelligence: 45, energy: 42, combat: 48 },
    specialAbilities: [
      { name: 'Panic Carbine Spray', description: 'Closes his eyes and sprays three rapid shots before ducking.', bonusPower: 2, triggerRate: 0.45, type: 'attack' }
    ],
    overallPower: 50
  },
  {
    id: 'budget-007',
    name: 'A.I.M. Lab Scout',
    alias: 'Beekeeper Scientist',
    grade: 'C',
    alignment: 'Villain',
    startingPrice: 1,
    powers: 'Yellow hazmat beekeeper suit, volatile beaker concoctions, and scientific panic.',
    description: 'Junior lab assistant pushed onto the front lines wearing a signature yellow beekeeper jumpsuit.',
    imageUrl: '/Images%20Marvel/MODOK%20Supreme.jpg',
    color: '#EAB308',
    stats: { strength: 42, speed: 46, durability: 50, intelligence: 68, energy: 48, combat: 44 },
    specialAbilities: [
      { name: 'Acidic Flask Toss', description: 'Shatters a corrosive chemistry flask on the battlefield floor.', bonusPower: 2, triggerRate: 0.45, type: 'tactical' }
    ],
    overallPower: 50
  },
  {
    id: 'budget-008',
    name: 'Spider-Ham (Peter Porker)',
    alias: 'Spectacular Swine',
    grade: 'C',
    alignment: 'Hero',
    startingPrice: 1,
    powers: 'Cartoon physics, pocket-dimension wooden mallet, and comedy timing.',
    description: 'Anthropomorphic pig hero wielding cartoon slapstick weapons and absurd resilience.',
    imageUrl: '/Images%20Marvel/Spider-Ham.jpg',
    color: '#EC4899',
    stats: { strength: 52, speed: 58, durability: 55, intelligence: 50, energy: 45, combat: 52 },
    specialAbilities: [
      { name: 'Giant Mallet Bonk', description: 'Pulls a massive oversized wooden mallet from behind his back.', bonusPower: 3, triggerRate: 0.45, type: 'attack' }
    ],
    overallPower: 55
  },
  {
    id: 'budget-009',
    name: 'Toad (Mortimer Toynbee)',
    alias: 'Brotherhood Minion',
    grade: 'C',
    alignment: 'Villain',
    startingPrice: 1,
    powers: 'Prehensile 13-foot elastic tongue, acidic spit, and leap agility.',
    description: 'Subservient mutant scrapper who harasses enemies with sticky tongue lashes and low kicks.',
    imageUrl: '/Images%20Marvel/Toad.jpg',
    color: '#65A30D',
    stats: { strength: 50, speed: 56, durability: 50, intelligence: 45, energy: 38, combat: 50 },
    specialAbilities: [
      { name: 'Tongue Snare', description: 'Whips out an elastic tongue to trip or disarm the opposing duelist.', bonusPower: 2, triggerRate: 0.45, type: 'tactical' }
    ],
    overallPower: 52
  },
  {
    id: 'budget-010',
    name: 'Batroc the Leaper',
    alias: 'Savate Mercenary',
    grade: 'C',
    alignment: 'Villain',
    startingPrice: 1,
    powers: 'Olympic jumping mastery, French savate kickboxing, and theatrical mustache.',
    description: 'Honorable French mercenary who refuses weapons in favor of acrobatic jumping roundhouse kicks.',
    imageUrl: '/Images%20Marvel/Batroc%20the%20Leaper.jpg',
    color: '#B45309',
    stats: { strength: 54, speed: 60, durability: 52, intelligence: 52, energy: 30, combat: 58 },
    specialAbilities: [
      { name: 'Savate Dropkick', description: 'Leaps high into the air delivering a pinpoint acrobatic heel strike.', bonusPower: 3, triggerRate: 0.5, type: 'attack' }
    ],
    overallPower: 55
  }
];

/**
 * Returns a random budget recruit from the pool, prioritizing ones not already owned.
 */
export function getRandomBudgetRecruit(excludedIds: string[] = []): Character {
  const candidates = BUDGET_RECRUITS.filter(c => !excludedIds.includes(c.id));
  const pool = candidates.length > 0 ? candidates : BUDGET_RECRUITS;
  const picked = pool[Math.floor(Math.random() * pool.length)];
  return {
    ...picked,
    currentHp: 100,
    maxHp: 100,
    isFainted: false,
  };
}
