import { useState } from 'react';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { Character, CharacterGrade } from '../../types/game';
import { getSkillsForCharacter, CharacterSkill } from '../../data/skills/characterSkills';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { soundManager } from '../../audio/soundManager';
import { Sparkles, Search, Zap, Shield, Swords, DollarSign, ArrowLeft, Check, Percent } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export function SkillVaultPage({ onBack }: Props) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<'ALL' | CharacterGrade>('ALL');
  const [selectedCharId, setSelectedCharId] = useState<string>(ALL_CHARACTERS[0]?.id || '');

  const filteredCharacters = ALL_CHARACTERS.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (char.alias && char.alias.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGrade = selectedGrade === 'ALL' || char.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const selectedChar: Character | undefined = ALL_CHARACTERS.find(c => c.id === selectedCharId) || ALL_CHARACTERS[0];
  const skillsList: CharacterSkill[] = selectedChar ? getSkillsForCharacter(selectedChar) : [];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-marvel-card border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="p-2.5 bg-marvel-dark hover:bg-marvel-cardElevated text-slate-300 hover:text-white rounded-2xl border border-white/10 transition-all flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4 text-marvel-red" />
            <span>BACK</span>
          </button>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-950/60 text-red-300 text-[10px] font-black uppercase tracking-widest border border-red-500/40">
              <Sparkles className="w-3 h-3 text-marvel-gold animate-spin" />
              <span>301 MARVEL HEROES • 1,505 UNIQUE SKILLS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-wide mt-0.5">
              HERO SKILL VAULT
            </h1>
          </div>
        </div>

        {/* Search & Tier Filter */}
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search hero or villain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-marvel-dark border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-marvel-red"
            />
          </div>

          <div className="flex items-center gap-1">
            {(['ALL', 'MYTHIC', 'A', 'B', 'C'] as const).map(grade => (
              <button
                key={grade}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedGrade(grade);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-[10px] font-heading font-black transition-all border ${
                  selectedGrade === grade
                    ? 'bg-marvel-red text-white border-red-500 shadow-glow-red'
                    : 'bg-marvel-dark/80 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                {grade === 'ALL' ? 'ALL' : grade}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout: Left Roster Grid (4 cols), Right Selected Hero 5 Skills (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 301 Characters Selection Drawer (4 cols) */}
        <div className="lg:col-span-4 glass-panel p-4 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              SELECT HERO ({filteredCharacters.length})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredCharacters.map(char => {
              const isSelected = char.id === selectedCharId;
              return (
                <button
                  key={char.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCharId(char.id);
                  }}
                  className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-red-950/40 border-red-500 ring-2 ring-red-500/50 shadow-glow-red scale-[1.02]'
                      : 'bg-marvel-dark/60 border-white/10 hover:border-red-500/40 text-slate-300'
                  }`}
                >
                  <CharacterPortrait character={char} size="sm" showBadge={false} />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-black text-white block truncate">{char.name}</span>
                    <span className="text-[10px] text-marvel-gold font-bold block">{char.grade} Tier</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Hero 5 Unique Skills Showcase (8 cols) */}
        {selectedChar && (
          <div className="lg:col-span-8 space-y-4">
            {/* Hero Card Header Banner */}
            <div className="glass-panel p-5 rounded-3xl border border-white/10 bg-marvel-card flex flex-col sm:flex-row items-center gap-5">
              <CharacterPortrait character={selectedChar} size="lg" showBadge={true} />
              
              <div className="space-y-1.5 text-center sm:text-left flex-1 min-w-0">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="px-2.5 py-0.5 rounded-md bg-red-950/60 text-red-300 border border-red-500/40 text-[10px] font-black uppercase">
                    {selectedChar.grade} TIER
                  </span>
                  <span className="text-xs text-marvel-gold font-black">
                    ⚡ {selectedChar.overallPower} BASE POWER
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-black text-white truncate">
                  {selectedChar.name}
                </h2>
                
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {selectedChar.description}
                </p>
              </div>
            </div>

            {/* 5 Unique Skills Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-marvel-red" />
                  5 UNIQUE SKILLS FOR {selectedChar.name.toUpperCase()}:
                </span>
                <span className="text-[11px] text-slate-400 font-bold">Balanced Pricing: $6 - $15</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsList.map((skill, sIdx) => (
                  <div
                    key={skill.id}
                    className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between space-y-3 bg-marvel-card"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{skill.icon}</span>
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-wider text-red-400 block">
                              SKILL #{sIdx + 1} • {skill.effectType.toUpperCase()}
                            </span>
                            <h4 className="text-sm font-heading font-black text-white leading-tight">
                              {skill.name}
                            </h4>
                          </div>
                        </div>

                        <span className="text-xs font-black text-emerald-400 bg-emerald-950/90 px-2.5 py-1 rounded-xl border border-emerald-500/40">
                          ${skill.cost}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-marvel-gold font-extrabold">
                        <span>+ {skill.bonusPower} Power Boost</span>
                      </div>
                      <div className="text-slate-300 font-mono font-bold">
                        {Math.round(skill.triggerRate * 100)}% Activation Rate
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
