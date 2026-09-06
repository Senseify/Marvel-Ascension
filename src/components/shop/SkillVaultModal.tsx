import { useState } from 'react';
import { Player, Character } from '../../types/game';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { getSkillsForCharacter, CharacterSkill } from '../../data/skills/characterSkills';
import { Sparkles, Zap, Shield, ArrowRight, Check, DollarSign, X } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

interface Props {
  player: Player;
  onProceedToRelicVault: () => void;
  onEquipSkill: (heroId: string, skill: CharacterSkill) => void;
  teamFunds?: number;
  onDeductTeamFunds?: (amount: number) => void;
}

export function SkillVaultModal({
  player,
  onProceedToRelicVault,
  onEquipSkill,
  teamFunds,
  onDeductTeamFunds
}: Props) {
  const [selectedHeroIdx, setSelectedHeroIdx] = useState<number>(0);
  const selectedHero: Character | undefined = player.collection[selectedHeroIdx];

  const currentFunds = teamFunds !== undefined ? teamFunds : player.money;

  const handleBuyAndEquip = (hero: Character, skill: CharacterSkill) => {
    if (currentFunds < skill.cost) return;

    soundManager.playAbilityTrigger();
    if (onDeductTeamFunds) {
      onDeductTeamFunds(skill.cost);
    } else {
      player.money -= skill.cost;
    }

    // Attach skill to hero
    if (!hero.equippedSkills) {
      hero.equippedSkills = [];
    }

    if (!hero.equippedSkills.some(s => s.id === skill.id)) {
      hero.equippedSkills.push(skill);
      hero.overallPower += Math.floor(skill.bonusPower / 2);
    }

    onEquipSkill(hero.id, skill);
  };

  const skillsList = selectedHero ? getSkillsForCharacter(selectedHero) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative max-w-5xl w-full max-w-[calc(100vw-1.5rem)] max-h-[90dvh] overflow-y-auto bg-marvel-card rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-2xl shadow-glow-red">
              <Sparkles className="w-6 h-6 text-marvel-gold animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400 block">
                STEP 1 OF 2 • HERO MASTERY VAULT
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-wide">
                SKILL VAULT
              </h2>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/50 px-4 py-2 rounded-2xl">
              <DollarSign className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">AVAILABLE FUNDS</span>
                <span className="text-lg font-black text-emerald-300 font-mono">${currentFunds}</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onProceedToRelicVault();
              }}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase rounded-2xl border border-red-500 shadow-glow-red transition-all transform hover:scale-105"
            >
              <span>PROCEED TO RELIC VAULT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Selector Bar */}
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
            SELECT DRAFTED HERO TO UNLOCK SKILLS:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {player.collection.map((hero, idx) => {
              const isSelected = selectedHeroIdx === idx;
              const equippedCount = hero.equippedSkills?.length || 0;

              return (
                <button
                  key={`${hero.id}-${idx}`}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedHeroIdx(idx);
                  }}
                  className={`p-2.5 rounded-2xl border transition-all flex items-center gap-2.5 text-left ${
                    isSelected
                      ? 'bg-red-950/40 border-red-500 ring-2 ring-red-500/50 shadow-glow-red scale-[1.02]'
                      : 'bg-marvel-dark/60 border-white/10 hover:border-red-500/40 text-slate-300'
                  }`}
                >
                  <CharacterPortrait character={hero} size="sm" showBadge={false} />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-black text-white block truncate">{hero.name}</span>
                    <span className="text-[10px] text-marvel-gold font-bold block">
                      {equippedCount > 0 ? `✨ ${equippedCount} Skills` : '0 Skills'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Hero 5 Unique Skills Grid */}
        {selectedHero ? (
          <div className="space-y-3 bg-marvel-dark/70 p-4 sm:p-5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white">
                  5 UNIQUE SKILLS FOR: <strong className="text-marvel-gold">{selectedHero.name}</strong>
                </span>
              </div>
              <span className="text-[11px] text-slate-400 italic">
                Equip up to 2 skills per hero (Balanced Non-P2W)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {skillsList.map((skill, sIdx) => {
                const isEquipped = selectedHero.equippedSkills?.some(s => s.id === skill.id);
                const canAfford = currentFunds >= skill.cost;

                return (
                  <div
                    key={skill.id}
                    className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                      isEquipped
                        ? 'bg-red-950/40 border-red-500 shadow-glow-red ring-1 ring-red-500'
                        : 'bg-marvel-surface border-white/10 hover:border-red-500/40'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{skill.icon}</span>
                        <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                          ${skill.cost}
                        </span>
                      </div>

                      <h4 className="text-xs font-black text-white leading-tight">{skill.name}</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3">
                        {skill.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-marvel-gold font-extrabold">
                        <span>+ {skill.bonusPower} PWR</span>
                        <span>{Math.round(skill.triggerRate * 100)}% Rate</span>
                      </div>

                      {isEquipped ? (
                        <div className="w-full py-1.5 bg-red-950/70 text-red-300 text-xs font-black text-center rounded-xl border border-red-500/50 flex items-center justify-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>EQUIPPED</span>
                        </div>
                      ) : (
                        <button
                          disabled={!canAfford}
                          onClick={() => handleBuyAndEquip(selectedHero, skill)}
                          className={`w-full py-1.5 text-xs font-black rounded-xl border transition-all flex items-center justify-center gap-1 ${
                            canAfford
                              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white border-red-500 shadow-sm transform hover:scale-[1.02]'
                              : 'bg-marvel-cardElevated text-slate-500 border-white/5 cursor-not-allowed'
                          }`}
                        >
                          <DollarSign className="w-3 h-3" />
                          <span>BUY & EQUIP (${skill.cost})</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Bottom Footer Proceed */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-slate-400">
            Skills increase battle strike efficiency, survivability, and activation power.
          </span>

          <button
            onClick={() => {
              soundManager.playClick();
              onProceedToRelicVault();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase rounded-2xl border border-red-500 shadow-glow-red transition-all"
          >
            <span>NEXT: ENTER RELIC VAULT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
