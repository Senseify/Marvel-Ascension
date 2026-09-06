import { Character, CharacterGrade } from '../../types/game';
import { MYTHIC_CHARACTERS } from './mythic';
import { GRADE_A_CHARACTERS } from './gradeA';
import { GRADE_A_PART2 } from './gradeA_part2';
import { GRADE_B_CHARACTERS } from './gradeB';
import { GRADE_B_PART2 } from './gradeB_part2';
import { GRADE_C_CHARACTERS } from './gradeC';
import { GRADE_C_PART2 } from './gradeC_part2';
import { EXPANSION_50_CHARACTERS } from './expansion50';
import { EXPANSION_49_CHARACTERS } from './expansion49';

export const ALL_CHARACTERS: Character[] = [
  ...MYTHIC_CHARACTERS,
  ...GRADE_A_CHARACTERS,
  ...GRADE_A_PART2,
  ...GRADE_B_CHARACTERS,
  ...GRADE_B_PART2,
  ...GRADE_C_CHARACTERS,
  ...GRADE_C_PART2,
  ...EXPANSION_50_CHARACTERS,
  ...EXPANSION_49_CHARACTERS,
];

// Verify character count during module load
if (ALL_CHARACTERS.length !== 350) {
  console.warn(`[MARVEL: AUCTION WARS] Expected 350 characters, found ${ALL_CHARACTERS.length}`);
}

export const CHARACTERS_BY_ID: Record<string, Character> = ALL_CHARACTERS.reduce(
  (acc, char) => {
    acc[char.id] = char;
    return acc;
  },
  {} as Record<string, Character>
);

export const CHARACTERS_BY_GRADE: Record<CharacterGrade, Character[]> = {
  MYTHIC: ALL_CHARACTERS.filter(c => c.grade === 'MYTHIC'),
  A: ALL_CHARACTERS.filter(c => c.grade === 'A'),
  B: ALL_CHARACTERS.filter(c => c.grade === 'B'),
  C: ALL_CHARACTERS.filter(c => c.grade === 'C'),
};

export const getCharacterById = (id: string): Character | undefined => {
  return CHARACTERS_BY_ID[id];
};

export const getRandomCharacter = (excludeIds: Set<string> = new Set()): Character | null => {
  const available = ALL_CHARACTERS.filter(c => !excludeIds.has(c.id));
  if (available.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
};

export const getGradeColor = (grade: CharacterGrade): string => {
  switch (grade) {
    case 'MYTHIC':
      return '#A855F7'; // Cosmic purple / gold
    case 'A':
      return '#EF4444'; // Radiant Red
    case 'B':
      return '#06B6D4'; // Tactical Cyan / Vibranium
    case 'C':
      return '#10B981'; // Emerald Green
    default:
      return '#94A3B8';
  }
};

export const getGradeBadgeClass = (grade: CharacterGrade): string => {
  switch (grade) {
    case 'MYTHIC':
      return 'bg-[#180E2B] text-amber-300 border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.35)]';
    case 'A':
      return 'bg-[#200B0E] text-red-300 border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
    case 'B':
      return 'bg-[#0A1622] text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]';
    case 'C':
      return 'bg-[#091C14] text-emerald-300 border-emerald-500/40';
    default:
      return 'bg-[#12141C] text-slate-300 border-white/10';
  }
};
