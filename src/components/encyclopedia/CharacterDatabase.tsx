import { useState, useMemo } from 'react';
import { Character } from '../../types/game';
import { ALL_CHARACTERS, CHARACTERS_BY_GRADE } from '../../data/characters/index';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { useAuth } from '../../context/AuthContext';
import { CharacterBuildModal } from '../ascension/CharacterBuildModal';
import { getSkillsForCharacter } from '../../data/skills/characterSkills';
import { 
  Search, X, Zap, Shield, Swords, Brain, Flame, Award, 
  Lock, CheckCircle2, Sparkles, Filter, Heart, Activity, Compass
} from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

interface Props {
  onBack?: () => void;
}

type OwnershipFilter = 'ALL' | 'OWNED' | 'NOT_OWNED';
type FactionFilter = 'ALL' | 'AVENGERS' | 'X_MEN' | 'COSMIC' | 'SPIDER_VERSE' | 'MIDNIGHT_SONS' | 'HEROES' | 'VILLAINS';

export function CharacterDatabase({ onBack }: Props) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [selectedFaction, setSelectedFaction] = useState<FactionFilter>('ALL');
  const [ownershipFilter, setOwnershipFilter] = useState<OwnershipFilter>('ALL');
  const [sortBy, setSortBy] = useState<'power' | 'grade' | 'name' | 'level'>('power');
  const [inspectCharacter, setInspectCharacter] = useState<Character | null>(null);
  const [buildCharacter, setBuildCharacter] = useState<Character | null>(null);

  const ownedCharIds = useMemo(() => new Set(user?.ownedCharacters || []), [user?.ownedCharacters]);
  const gradeWeights: Record<string, number> = { MYTHIC: 4, A: 3, B: 2, C: 1 };

  // Helper to determine faction affiliations
  const matchesFaction = (char: Character, faction: FactionFilter): boolean => {
    if (faction === 'ALL') return true;
    const text = `${char.name} ${char.alias || ''} ${char.powers} ${char.description}`.toLowerCase();
    
    switch (faction) {
      case 'AVENGERS':
        return text.includes('avenger') || text.includes('stark') || text.includes('shield') || text.includes('captain america') || text.includes('thor') || text.includes('hulk') || text.includes('hawkeye');
      case 'X_MEN':
        return text.includes('x-men') || text.includes('mutant') || text.includes('xavier') || text.includes('wolverine') || text.includes('magneto') || text.includes('krakoa');
      case 'COSMIC':
        return char.alignment === 'Cosmic' || text.includes('cosmic') || text.includes('celestial') || text.includes('galaxy') || text.includes('herald') || text.includes('knull') || text.includes('thanos') || text.includes('infinity');
      case 'SPIDER_VERSE':
        return text.includes('spider') || text.includes('web') || text.includes('symbiote') || text.includes('venom') || text.includes('carnage');
      case 'MIDNIGHT_SONS':
        return text.includes('ghost rider') || text.includes('blade') || text.includes('moon knight') || text.includes('sorcerer') || text.includes('darkhold') || text.includes('magic') || text.includes('vampire') || text.includes('strange');
      case 'HEROES':
        return char.alignment === 'Hero';
      case 'VILLAINS':
        return char.alignment === 'Villain';
      default:
        return true;
    }
  };

  const filteredCharacters = useMemo(() => {
    return ALL_CHARACTERS.filter(char => {
      const matchSearch =
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (char.alias && char.alias.toLowerCase().includes(searchQuery.toLowerCase())) ||
        char.powers.toLowerCase().includes(searchQuery.toLowerCase());

      const matchGrade = selectedGrade === 'ALL' || char.grade === selectedGrade;
      const matchFaction = matchesFaction(char, selectedFaction);

      const isOwned = ownedCharIds.has(char.id);
      const matchOwnership = 
        ownershipFilter === 'ALL' || 
        (ownershipFilter === 'OWNED' && isOwned) || 
        (ownershipFilter === 'NOT_OWNED' && !isOwned);

      return matchSearch && matchGrade && matchFaction && matchOwnership;
    }).sort((a, b) => {
      if (sortBy === 'power') return b.overallPower - a.overallPower;
      if (sortBy === 'grade') return (gradeWeights[b.grade] || 0) - (gradeWeights[a.grade] || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'level') {
        const lvlA = user?.characterLevels?.[a.id] || 0;
        const lvlB = user?.characterLevels?.[b.id] || 0;
        return lvlB - lvlA;
      }
      return 0;
    });
  }, [searchQuery, selectedGrade, selectedFaction, ownershipFilter, sortBy, ownedCharIds, user?.characterLevels]);

  const ownedCount = ALL_CHARACTERS.filter(c => ownedCharIds.has(c.id)).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-marvel-red block">
            OFFICIAL CODEX & ARCHIVES
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-white uppercase tracking-wide flex items-center gap-2">
            <span>MARVEL CHARACTER CODEX</span>
            <span className="text-sm bg-slate-800 text-slate-300 font-bold px-3 py-1 rounded-xl border border-white/10">
              {ALL_CHARACTERS.length} HEROES
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Encyclopedia of every champion in Marvel Ascension. Owned: <span className="text-emerald-400 font-bold">{ownedCount}</span> / {ALL_CHARACTERS.length}
          </p>
        </div>

        {onBack && (
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-white/10 transition-colors"
          >
            ← Back to Game
          </button>
        )}
      </div>

      {/* Filter Controls Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
        {/* Row 1: Search & Ownership Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box (6 cols) */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search 350 heroes by name, powers, alias (e.g. Miles, Blade, Thor, Knull)..."
              className="w-full bg-black/50 border border-white/10 pl-10 pr-4 py-2 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Ownership Toggle Buttons (6 cols) */}
          <div className="sm:col-span-6 flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => {
                soundManager.playClick();
                setOwnershipFilter('ALL');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                ownershipFilter === 'ALL'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({ALL_CHARACTERS.length})
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setOwnershipFilter('OWNED');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                ownershipFilter === 'OWNED'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Owned ({ownedCount})</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setOwnershipFilter('NOT_OWNED');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                ownershipFilter === 'NOT_OWNED'
                  ? 'bg-rose-900 text-white shadow-sm'
                  : 'text-slate-400 hover:text-rose-400'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>Unowned ({ALL_CHARACTERS.length - ownedCount})</span>
            </button>
          </div>
        </div>

        {/* Row 2: Category / Faction, Grade, Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-white/5">
          {/* Faction / Category (4 cols) */}
          <div className="sm:col-span-4">
            <select
              value={selectedFaction}
              onChange={e => setSelectedFaction(e.target.value as FactionFilter)}
              className="w-full bg-black/50 border border-white/10 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-red-500 font-bold"
            >
              <option value="ALL">All Categories & Factions</option>
              <option value="AVENGERS">🛡️ Avengers & S.H.I.E.L.D.</option>
              <option value="X_MEN">🧬 X-Men & Mutants</option>
              <option value="COSMIC">🌌 Cosmic Forces & Celestials</option>
              <option value="SPIDER_VERSE">🕷️ Spider-Verse & Symbiotes</option>
              <option value="MIDNIGHT_SONS">🌙 Midnight Sons & Mystics</option>
              <option value="HEROES">⭐ Heroes Only</option>
              <option value="VILLAINS">💀 Villains Only</option>
            </select>
          </div>

          {/* Grade Filter (4 cols) */}
          <div className="sm:col-span-4">
            <select
              value={selectedGrade}
              onChange={e => setSelectedGrade(e.target.value)}
              className="w-full bg-black/50 border border-white/10 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-red-500 font-bold"
            >
              <option value="ALL">All Grades ({ALL_CHARACTERS.length})</option>
              <option value="MYTHIC">★ Mythic Cosmic ({CHARACTERS_BY_GRADE.MYTHIC.length})</option>
              <option value="A">Grade A ({CHARACTERS_BY_GRADE.A.length})</option>
              <option value="B">Grade B ({CHARACTERS_BY_GRADE.B.length})</option>
              <option value="C">Grade C ({CHARACTERS_BY_GRADE.C.length})</option>
            </select>
          </div>

          {/* Sort By (4 cols) */}
          <div className="sm:col-span-4">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full bg-black/50 border border-white/10 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-red-500 font-bold"
            >
              <option value="power">Sort by Base Power ↓</option>
              <option value="grade">Sort by Tier (Mythic → C)</option>
              <option value="name">Sort by Name (A-Z)</option>
              <option value="level">Sort by Owned Level ↓</option>
            </select>
          </div>
        </div>

        {/* Count Summary */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold pt-1 border-t border-white/5">
          <span>Showing {filteredCharacters.length} of {ALL_CHARACTERS.length} Codex entries</span>
          <span className="text-slate-500 hidden sm:inline">Click any character card to inspect abilities, stats, lore & builds</span>
        </div>
      </div>

      {/* Grid of Characters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredCharacters.map(char => {
          const isOwned = ownedCharIds.has(char.id);
          const charLvl = user?.characterLevels?.[char.id] || 1;
          const charBuild = user?.characterBuilds?.[char.id];

          return (
            <div
              key={char.id}
              onClick={() => {
                soundManager.playClick();
                setInspectCharacter(char);
              }}
              className={`glass-panel p-3 rounded-xl border cursor-pointer transition-all hover:scale-[1.03] group relative overflow-hidden flex flex-col items-center text-center ${
                isOwned
                  ? 'border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/10'
                  : 'border-white/10 hover:border-slate-500 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Ownership Status Badge */}
              <div className="absolute top-2 left-2 z-10">
                {isOwned ? (
                  <span className="flex items-center gap-1 bg-emerald-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    OWNED
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-black/70 text-slate-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-white/10">
                    <Lock className="w-2.5 h-2.5" />
                    LOCKED
                  </span>
                )}
              </div>

              {/* Level Badge if owned */}
              {isOwned && (
                <div className="absolute top-2 right-2 z-10 bg-amber-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                  LVL {charLvl}
                </div>
              )}

              <div className="mt-4">
                <CharacterPortrait character={char} size="md" showBadge={true} />
              </div>

              <h3 className="font-heading font-black text-xs sm:text-sm text-white mt-2 truncate w-full group-hover:text-red-400 transition-colors">
                {char.name}
              </h3>

              <span className="text-[10px] text-slate-400 italic truncate w-full mb-1">
                {char.alias || char.alignment}
              </span>

              {charBuild && isOwned && (
                <span className="text-[9px] font-bold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30 truncate max-w-[90%] mb-1">
                  {charBuild.buildName}
                </span>
              )}

              <div className="mt-auto w-full flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-extrabold">
                <span className="text-[10px] text-slate-400 uppercase">
                  {char.grade}
                </span>
                <span className="text-amber-400 flex items-center gap-1 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                  <Zap className="w-2.5 h-2.5 fill-current" />
                  PWR {char.overallPower}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Modal Card & Lore Inspector */}
      {inspectCharacter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="relative max-w-2xl w-full bg-slate-950 border border-white/20 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 my-auto max-h-[92vh] flex flex-col">
            <button
              onClick={() => setInspectCharacter(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-white/10 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Inspector Top Row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-white/10 shrink-0">
              <div className="relative shrink-0">
                <CharacterPortrait character={inspectCharacter} size="lg" showBadge={false} />
                <div className="absolute -bottom-2 -right-1 bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                  {ownedCharIds.has(inspectCharacter.id)
                    ? `LVL ${user?.characterLevels?.[inspectCharacter.id] || 1}`
                    : 'UNOWNED'}
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {inspectCharacter.grade} GRADE
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {inspectCharacter.alignment}
                  </span>
                  {ownedCharIds.has(inspectCharacter.id) ? (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      OWNED IN ROSTER
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      NOT YET RECRUITED
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-wide">
                  {inspectCharacter.name}
                </h2>
                {inspectCharacter.alias && (
                  <p className="text-xs font-medium text-slate-400 italic">
                    "{inspectCharacter.alias}"
                  </p>
                )}

                <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 text-xs font-bold">
                  <span className="text-amber-400 flex items-center gap-1 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    PWR {inspectCharacter.overallPower}
                  </span>
                  <span className="text-rose-400 flex items-center gap-1 bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-500/30">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    100 HP
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Middle Details */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {/* Lore / Description */}
              <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  CHARACTER BIOGRAPHY & LORE
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {inspectCharacter.description}
                </p>
              </div>

              {/* Powers */}
              <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  CANONICAL POWERS & TRAITS
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {inspectCharacter.powers}
                </p>
              </div>

              {/* Base Stat Radar Grid */}
              <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  COMBAT ATTRIBUTES (1–100 SCALE)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="flex items-center justify-between text-xs p-1.5 bg-slate-900 rounded-lg">
                    <span className="flex items-center gap-1 text-red-400 font-bold text-[10px]">
                      <Swords className="w-3 h-3" /> STRENGTH
                    </span>
                    <span className="font-extrabold text-white">{inspectCharacter.stats.strength}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-1.5 bg-slate-900 rounded-lg">
                    <span className="flex items-center gap-1 text-amber-400 font-bold text-[10px]">
                      <Zap className="w-3 h-3" /> SPEED
                    </span>
                    <span className="font-extrabold text-white">{inspectCharacter.stats.speed}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-1.5 bg-slate-900 rounded-lg">
                    <span className="flex items-center gap-1 text-blue-400 font-bold text-[10px]">
                      <Shield className="w-3 h-3" /> DURABILITY
                    </span>
                    <span className="font-extrabold text-white">{inspectCharacter.stats.durability}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-1.5 bg-slate-900 rounded-lg">
                    <span className="flex items-center gap-1 text-emerald-400 font-bold text-[10px]">
                      <Brain className="w-3 h-3" /> INTELLECT
                    </span>
                    <span className="font-extrabold text-white">{inspectCharacter.stats.intelligence}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-1.5 bg-slate-900 rounded-lg">
                    <span className="flex items-center gap-1 text-purple-400 font-bold text-[10px]">
                      <Flame className="w-3 h-3" /> ENERGY
                    </span>
                    <span className="font-extrabold text-white">{inspectCharacter.stats.energy}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-1.5 bg-slate-900 rounded-lg">
                    <span className="flex items-center gap-1 text-rose-400 font-bold text-[10px]">
                      <Award className="w-3 h-3" /> COMBAT SKILL
                    </span>
                    <span className="font-extrabold text-white">{inspectCharacter.stats.combat}</span>
                  </div>
                </div>
              </div>

              {/* Signature Combat Abilities */}
              <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  SIGNATURE COMBAT SKILLS
                </span>
                <div className="space-y-1.5">
                  {getSkillsForCharacter(inspectCharacter).map(skill => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between p-2 bg-slate-900/80 rounded-lg text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base">{skill.icon}</span>
                        <div className="min-w-0">
                          <span className="font-bold text-white block truncate">{skill.name}</span>
                          <span className="text-[10px] text-slate-400 line-clamp-1">{skill.description}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30 shrink-0 ml-2">
                        +{skill.bonusPower} PWR
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              {ownedCharIds.has(inspectCharacter.id) ? (
                <>
                  <div className="text-xs text-emerald-400 font-semibold text-center sm:text-left">
                    ✓ Hero recruited in your Ascension roster.
                  </div>
                  <button
                    onClick={() => {
                      const charToBuild = inspectCharacter;
                      setInspectCharacter(null);
                      setBuildCharacter(charToBuild);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-glow-amber transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Open Character Build Laboratory</span>
                  </button>
                </>
              ) : (
                <div className="w-full text-center text-xs text-slate-400 bg-black/40 p-2.5 rounded-xl border border-white/5">
                  Unlock this hero through <strong className="text-white">Astra Crate Openings</strong>, <strong className="text-white">Auction Wars</strong>, or the <strong className="text-white">Relic & Shard Bazaar</strong>.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Build Laboratory Modal */}
      {buildCharacter && (
        <CharacterBuildModal
          character={buildCharacter}
          onClose={() => setBuildCharacter(null)}
        />
      )}
    </div>
  );
}
