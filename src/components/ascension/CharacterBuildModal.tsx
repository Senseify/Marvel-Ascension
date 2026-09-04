import React, { useState } from 'react';
import { Character, CharacterBuild } from '../../types/game';
import { useAuth } from '../../context/AuthContext';
import { getSkillsForCharacter } from '../../data/skills/characterSkills';
import { MARVEL_ARTIFACTS } from '../../data/artifacts';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { soundManager } from '../../audio/soundManager';
import { 
  X, Zap, Shield, Swords, Sparkles, Award, ArrowUpCircle, 
  Check, Info, Plus, Trash2, Heart, Activity, Flame 
} from 'lucide-react';

interface Props {
  character: Character;
  onClose: () => void;
}

interface SpecConfig {
  id: string;
  name: string;
  focus: string;
  icon: string;
  passiveName: string;
  passiveDescription: string;
  bonusPower: number;
  bonusHp: number;
  bonusDefense: number;
  bonusSpeed: number;
}

function getCharacterSpecializations(char: Character): SpecConfig[] {
  const name = char.name.toLowerCase();
  if (name.includes('thor')) {
    return [
      {
        id: 'storm',
        name: '⚡ Storm Bringer',
        focus: 'Lightning & Ability Power',
        icon: '⚡',
        passiveName: 'Mjölner Overdrive',
        passiveDescription: 'Lightning ability strikes deal 20% bonus burst power and ignore 10% enemy armor.',
        bonusPower: 12,
        bonusHp: 20,
        bonusDefense: 4,
        bonusSpeed: 8
      },
      {
        id: 'strength',
        name: '🔨 Asgardian Strength',
        focus: 'Physical Strike & Brawler',
        icon: '🔨',
        passiveName: 'Thunder God Might',
        passiveDescription: 'Reduces all incoming physical damage by 15% and increases normal strike power.',
        bonusPower: 8,
        bonusHp: 65,
        bonusDefense: 12,
        bonusSpeed: 4
      },
      {
        id: 'god',
        name: '👑 All-Father God',
        focus: 'Defensive Ward & Survivability',
        icon: '👑',
        passiveName: 'Odinforce Aegis',
        passiveDescription: 'Regenerates 10% of maximum HP when falling below 35% health in combat.',
        bonusPower: 6,
        bonusHp: 120,
        bonusDefense: 20,
        bonusSpeed: 0
      }
    ];
  }

  if (name.includes('iron man') || name.includes('tony')) {
    return [
      {
        id: 'storm',
        name: '⚡ Arc Overcharge',
        focus: 'High Energy Beam Burst',
        icon: '⚡',
        passiveName: 'Repulsor Cascade',
        passiveDescription: 'Unibeam and repulsor attacks deal +20% extra energy damage on critical hit.',
        bonusPower: 14,
        bonusHp: 20,
        bonusDefense: 4,
        bonusSpeed: 6
      },
      {
        id: 'strength',
        name: '🛡️ Nanotech Aegis',
        focus: 'Nanite Shielding & Armor',
        icon: '🛡️',
        passiveName: 'Kinetic Dissipation',
        passiveDescription: 'Deploys nanite lattice absorbing 15% of all incoming damage.',
        bonusPower: 7,
        bonusHp: 75,
        bonusDefense: 16,
        bonusSpeed: 2
      },
      {
        id: 'god',
        name: '🛰️ Veronica Orbital',
        focus: 'Tactical Precision & Evasion',
        icon: '🛰️',
        passiveName: 'Orbital Recon Matrix',
        passiveDescription: 'Tactical targeting computer guarantees first strike critical impact.',
        bonusPower: 9,
        bonusHp: 40,
        bonusDefense: 8,
        bonusSpeed: 10
      }
    ];
  }

  if (name.includes('wolverine') || name.includes('logan')) {
    return [
      {
        id: 'storm',
        name: '🩸 Berserker Rage',
        focus: 'Lethal Evisceration & Crit',
        icon: '🩸',
        passiveName: 'Animalistic Fury',
        passiveDescription: 'Increases attack power by 1% for every 2% health lost during combat.',
        bonusPower: 15,
        bonusHp: 15,
        bonusDefense: 2,
        bonusSpeed: 8
      },
      {
        id: 'strength',
        name: '⚔️ Weapon X Lethality',
        focus: 'Adamantium Armor Shred',
        icon: '⚔️',
        passiveName: 'Adamantium Rend',
        passiveDescription: 'Attacks cause lasting bleed damage, bypassing 20% enemy defense.',
        bonusPower: 10,
        bonusHp: 50,
        bonusDefense: 10,
        bonusSpeed: 5
      },
      {
        id: 'god',
        name: '💉 Immortal Mutant',
        focus: 'Cellular Regeneration',
        icon: '💉',
        passiveName: 'Hyper-Regen Factor',
        passiveDescription: 'Recovers 8 HP at the beginning of each combat turn.',
        bonusPower: 5,
        bonusHp: 110,
        bonusDefense: 18,
        bonusSpeed: 2
      }
    ];
  }

  if (name.includes('spider-man') || name.includes('parker') || name.includes('miles')) {
    return [
      {
        id: 'storm',
        name: '🕸️ Spider-Sense Reflexes',
        focus: 'Precognitive Evasion & Speed',
        icon: '🕸️',
        passiveName: 'Precognitive Dodge',
        passiveDescription: 'Grants a 20% chance to completely evade basic enemy strikes.',
        bonusPower: 10,
        bonusHp: 25,
        bonusDefense: 4,
        bonusSpeed: 14
      },
      {
        id: 'strength',
        name: '🎯 Web Tactician',
        focus: 'Crowd Control & Pinning',
        icon: '🎯',
        passiveName: 'Tensile Web Snare',
        passiveDescription: 'Web attacks reduce enemy initiative and speed by 15%.',
        bonusPower: 9,
        bonusHp: 55,
        bonusDefense: 8,
        bonusSpeed: 8
      },
      {
        id: 'god',
        name: '🦾 Iron Spider Armor',
        focus: 'Waldoes & Kinetic Defense',
        icon: '🦾',
        passiveName: 'Nanotech Waldoes',
        passiveDescription: 'Deploys 4 mechanical spider arms reflecting 10% incoming damage.',
        bonusPower: 8,
        bonusHp: 85,
        bonusDefense: 16,
        bonusSpeed: 4
      }
    ];
  }

  // Default Archetype Specializations
  return [
    {
      id: 'storm',
      name: '⚡ Cosmic Striker',
      focus: 'Burst Damage & High Power',
      icon: '⚡',
      passiveName: 'Cosmic Surge',
      passiveDescription: 'Critical attacks deal 20% extra impact damage to the enemy vanguard.',
      bonusPower: 12,
      bonusHp: 25,
      bonusDefense: 4,
      bonusSpeed: 8
    },
    {
      id: 'strength',
      name: '🔨 Titanium Brawler',
      focus: 'Sustained Damage & Resilience',
      icon: '🔨',
      passiveName: 'Unbroken Fortitude',
      passiveDescription: 'Reduces all incoming direct damage by 12% across combat rounds.',
      bonusPower: 8,
      bonusHp: 65,
      bonusDefense: 12,
      bonusSpeed: 4
    },
    {
      id: 'god',
      name: '👑 Celestial Vanguard',
      focus: 'Kinetic Shielding & Endurance',
      icon: '👑',
      passiveName: 'Aegis Ward',
      passiveDescription: 'Deploys a protective kinetic barrier granting +75 temporary HP at battle start.',
      bonusPower: 5,
      bonusHp: 110,
      bonusDefense: 18,
      bonusSpeed: 1
    }
  ];
}

export function CharacterBuildModal({ character, onClose }: Props) {
  const { user, updateCharacterBuild, upgradeAbilityLevel } = useAuth();
  
  const existingBuild = user?.characterBuilds?.[character.id];
  const charLevel = user?.characterLevels?.[character.id] || 1;
  const userAbilityLevels = user?.characterAbilityLevels?.[character.id] || {};
  
  const specs = getCharacterSpecializations(character);
  const [selectedSpecId, setSelectedSpecId] = useState<string>(
    existingBuild?.specialization || specs[0].id
  );

  const [equippedRelics, setEquippedRelics] = useState<string[]>(
    existingBuild?.equippedRelicIds || user?.equippedRelics?.[character.id] || []
  );

  const [isSaving, setIsSaving] = useState(false);
  const [upgradingSkillId, setUpgradingSkillId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showRelicPicker, setShowRelicPicker] = useState(false);

  const selectedSpec = specs.find(s => s.id === selectedSpecId) || specs[0];
  const skills = getSkillsForCharacter(character);

  // Owned relics list from MARVEL_ARTIFACTS
  const ownedRelicItems = (user?.ownedRelics || [])
    .map(id => MARVEL_ARTIFACTS.find(art => art.id === id))
    .filter(Boolean) as typeof MARVEL_ARTIFACTS;

  const equippedRelicItems = equippedRelics
    .map(id => MARVEL_ARTIFACTS.find(art => art.id === id))
    .filter(Boolean) as typeof MARVEL_ARTIFACTS;

  const relicBonusPower = equippedRelicItems.reduce((acc, r) => acc + (r.bonusPower || r.statModifiers?.power || 0), 0);
  const relicBonusHp = equippedRelicItems.reduce((acc, r) => acc + (r.statModifiers?.hp || 0), 0);
  const relicBonusDefense = equippedRelicItems.reduce((acc, r) => acc + (r.statModifiers?.defense || 0), 0);
  const relicBonusSpeed = equippedRelicItems.reduce((acc, r) => acc + (r.statModifiers?.speed || 0), 0);

  const totalBonusPower = selectedSpec.bonusPower + relicBonusPower;
  const totalBonusHp = selectedSpec.bonusHp + relicBonusHp;
  const totalBonusDefense = selectedSpec.bonusDefense + relicBonusDefense;
  const totalBonusSpeed = selectedSpec.bonusSpeed + relicBonusSpeed;

  const finalPower = character.overallPower + totalBonusPower + Math.floor((charLevel - 1) * 0.8);
  const finalHp = 100 + totalBonusHp + (charLevel - 1) * 5;

  const handleUpgradeAbility = async (skillId: string) => {
    const currentLvl = userAbilityLevels[skillId] || 1;
    if (currentLvl >= 5) return;
    const astraCost = currentLvl * 500;
    const shardCost = currentLvl * 10;
    if ((user?.astra || 0) < astraCost) {
      setFeedbackMsg({ type: 'error', text: `Insufficient Astra. Need ${astraCost.toLocaleString()} Astra.` });
      return;
    }
    if ((user?.cardShards || 0) < shardCost) {
      setFeedbackMsg({ type: 'error', text: `Insufficient Card Shards. Need ${shardCost} Shards.` });
      return;
    }

    setUpgradingSkillId(skillId);
    soundManager.playBidPlaced();
    const res = await upgradeAbilityLevel(character.id, skillId);
    setUpgradingSkillId(null);

    if (res.success) {
      setFeedbackMsg({ type: 'success', text: `Ability leveled up to Level ${res.newLevel || currentLvl + 1}!` });
      setTimeout(() => setFeedbackMsg(null), 3500);
    } else {
      setFeedbackMsg({ type: 'error', text: res.error || 'Failed to upgrade ability.' });
    }
  };

  const handleToggleRelic = (relicId: string) => {
    soundManager.playClick();
    if (equippedRelics.includes(relicId)) {
      setEquippedRelics(prev => prev.filter(id => id !== relicId));
    } else {
      if (equippedRelics.length >= 2) {
        setFeedbackMsg({ type: 'error', text: 'Maximum 2 Relics can be equipped. Unequip one first.' });
        return;
      }
      setEquippedRelics(prev => [...prev, relicId]);
    }
  };

  const handleSaveBuild = async () => {
    setIsSaving(true);
    soundManager.playGavelWon();
    
    const buildPayload: Partial<CharacterBuild> = {
      characterId: character.id,
      specialization: selectedSpec.id,
      buildName: selectedSpec.name,
      passiveName: selectedSpec.passiveName,
      passiveDescription: selectedSpec.passiveDescription,
      bonusPower: totalBonusPower,
      bonusHp: totalBonusHp,
      bonusDefense: totalBonusDefense,
      bonusSpeed: totalBonusSpeed,
      equippedRelicIds: equippedRelics,
      abilityLevels: userAbilityLevels
    };

    const res = await updateCharacterBuild(character.id, buildPayload);
    setIsSaving(false);

    if (res.success) {
      setFeedbackMsg({ type: 'success', text: `"${selectedSpec.name}" build activated & persisted!` });
      setTimeout(() => setFeedbackMsg(null), 3500);
    } else {
      setFeedbackMsg({ type: 'error', text: res.error || 'Failed to save build.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl p-4 sm:p-6 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-white/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero Banner */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-white/10 shrink-0">
          <div className="relative shrink-0">
            <CharacterPortrait character={character} size="lg" showBadge={false} />
            <div className="absolute -bottom-2 -right-1 bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg border border-white/30">
              LVL {charLevel}
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {character.grade} TIER
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {character.alignment} • {character.alias || character.name}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                OWNED HERO
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-wide truncate">
              {character.name} BUILD LABORATORY
            </h2>
            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
              Customize specializations, unlock passive abilities, level up skills, and equip cosmic relics.
            </p>

            {/* Calculated Battle Stats Bar */}
            <div className="grid grid-cols-4 gap-2 mt-3 bg-black/40 p-2 rounded-xl border border-white/5 text-center">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">COMBAT POWER</span>
                <span className="text-sm font-black text-amber-400 flex items-center justify-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  {finalPower}
                  {totalBonusPower > 0 && <span className="text-[10px] text-emerald-400">+{totalBonusPower}</span>}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">HEALTH POOL</span>
                <span className="text-sm font-black text-rose-400 flex items-center justify-center gap-1">
                  <Heart className="w-3.5 h-3.5" />
                  {finalHp} HP
                  {totalBonusHp > 0 && <span className="text-[10px] text-emerald-400">+{totalBonusHp}</span>}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">DEFENSE WARD</span>
                <span className="text-sm font-black text-blue-400 flex items-center justify-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  {character.stats.durability + totalBonusDefense}
                  {totalBonusDefense > 0 && <span className="text-[10px] text-emerald-400">+{totalBonusDefense}</span>}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">INITIATIVE</span>
                <span className="text-sm font-black text-emerald-400 flex items-center justify-center gap-1">
                  <Activity className="w-3.5 h-3.5" />
                  {character.stats.speed + totalBonusSpeed}
                  {totalBonusSpeed > 0 && <span className="text-[10px] text-emerald-400">+{totalBonusSpeed}</span>}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div className={`mt-3 p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between animate-fade-in ${
            feedbackMsg.type === 'success' 
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' 
              : 'bg-rose-950/80 border-rose-500/50 text-rose-300'
          }`}>
            <span>{feedbackMsg.text}</span>
            <button onClick={() => setFeedbackMsg(null)} className="text-white/60 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Scrollable Content: 3 Columns / Sections */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-6">

          {/* SECTION 1: SPECIALIZATION PATHWAYS */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                1. Select Combat Specialization
              </h3>
              <span className="text-[11px] text-slate-400">Choose 1 of 3 Archetypes</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {specs.map(spec => {
                const isSelected = selectedSpecId === spec.id;
                return (
                  <div
                    key={spec.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedSpecId(spec.id);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 shadow-glow-amber ring-1 ring-amber-500/50'
                        : 'bg-black/30 border-white/10 hover:border-white/30 hover:bg-black/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-heading font-black text-sm text-white flex items-center gap-1.5">
                        <span>{spec.icon}</span>
                        {spec.name}
                      </span>
                      {isSelected && (
                        <span className="bg-amber-500 text-black rounded-full p-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    
                    <span className="text-[11px] font-bold text-amber-300/90 block mb-2">
                      Focus: {spec.focus}
                    </span>

                    {/* Passive Box */}
                    <div className="bg-black/50 p-2 rounded-lg border border-white/5 text-[11px] space-y-1 mb-2">
                      <span className="text-slate-300 font-black flex items-center gap-1 text-[10px] uppercase text-emerald-400">
                        <Flame className="w-3 h-3" />
                        PASSIVE: {spec.passiveName}
                      </span>
                      <p className="text-slate-400 text-[10px] leading-tight">
                        {spec.passiveDescription}
                      </p>
                    </div>

                    {/* Stat Badges */}
                    <div className="flex flex-wrap gap-1 text-[10px] font-bold">
                      <span className="px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-500/30">
                        +{spec.bonusPower} PWR
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-400 border border-rose-500/30">
                        +{spec.bonusHp} HP
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-500/30">
                        +{spec.bonusDefense} DEF
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                        +{spec.bonusSpeed} SPD
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: SIGNATURE ABILITY PROGRESSION */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5" />
                2. Signature Ability Mastery (Levels 1–5)
              </h3>
              <span className="text-[11px] text-slate-400">
                Astra: {user?.astra?.toLocaleString() || 0} • Shards: {user?.cardShards || 0}
              </span>
            </div>

            <div className="space-y-2">
              {skills.map((skill, idx) => {
                const currentLvl = userAbilityLevels[skill.id] || 1;
                const isMax = currentLvl >= 5;
                const upgradeAstraCost = currentLvl * 500;
                const upgradeShardCost = currentLvl * 10;
                const isUpgrading = upgradingSkillId === skill.id;

                return (
                  <div
                    key={skill.id}
                    className="p-2.5 sm:p-3 bg-black/40 border border-white/10 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl p-2 bg-slate-900 border border-white/10 rounded-xl shrink-0">
                        {skill.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-black text-sm text-white truncate">
                            {skill.name}
                          </h4>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10">
                            {skill.effectType.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {skill.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[11px]">
                          <span className="text-amber-400 font-bold">
                            Base: +{skill.bonusPower} PWR
                          </span>
                          <span className="text-emerald-400 font-bold">
                            Total: +{skill.bonusPower + (currentLvl - 1) * 3} PWR
                          </span>
                          <span className="text-slate-500">
                            ({Math.round(skill.triggerRate * 100)}% trigger)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Level Display & Upgrade Button */}
                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      {/* Level Stars / Bar */}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold block">ABILITY LEVEL</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(lvl => (
                            <div
                              key={lvl}
                              className={`w-4 h-2 rounded-sm ${
                                lvl <= currentLvl ? 'bg-amber-400' : 'bg-slate-800 border border-white/10'
                              }`}
                            />
                          ))}
                          <span className="text-xs font-black text-amber-400 ml-1">
                            {currentLvl}/5
                          </span>
                        </div>
                      </div>

                      {/* Button */}
                      {isMax ? (
                        <span className="px-3 py-1.5 bg-amber-500/20 text-amber-300 font-black text-xs rounded-xl border border-amber-500/40">
                          MAX LEVEL
                        </span>
                      ) : (
                        <button
                          onClick={() => handleUpgradeAbility(skill.id)}
                          disabled={isUpgrading}
                          className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <ArrowUpCircle className="w-3.5 h-3.5" />
                          <span>Upgrade</span>
                          <span className="text-[10px] font-bold bg-black/30 text-amber-200 px-1.5 rounded">
                            {upgradeAstraCost} Astra
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: RELIC SLOTS */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                3. Compatible Cosmic Relics ({equippedRelics.length}/2 Equipped)
              </h3>
              <button
                onClick={() => setShowRelicPicker(!showRelicPicker)}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 underline"
              >
                {showRelicPicker ? 'Hide Relic Vault' : '+ Browse Owned Relics'}
              </button>
            </div>

            {/* Currently Equipped Relics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {[0, 1].map(slotIdx => {
                const relicId = equippedRelics[slotIdx];
                const relic = relicId ? MARVEL_ARTIFACTS.find(r => r.id === relicId) : null;

                if (relic) {
                  return (
                    <div
                      key={slotIdx}
                      className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/40 flex items-center justify-between gap-3 relative"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-2xl p-1.5 bg-black/50 rounded-lg border border-white/10 shrink-0">
                          {relic.icon}
                        </span>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                            SLOT {slotIdx + 1} • {relic.rarity}
                          </span>
                          <h4 className="font-heading font-black text-xs text-white truncate">
                            {relic.name}
                          </h4>
                          <span className="text-[10px] text-emerald-400 font-bold">
                            +{relic.bonusPower} PWR • +{relic.statModifiers?.hp || 0} HP
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleRelic(relic.id)}
                        className="p-1.5 bg-rose-950 hover:bg-rose-900 text-rose-400 rounded-lg border border-rose-500/30 transition-colors"
                        title="Unequip Relic"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                }

                return (
                  <div
                    key={slotIdx}
                    onClick={() => setShowRelicPicker(true)}
                    className="p-3 rounded-xl bg-black/20 border border-dashed border-white/20 hover:border-amber-500/50 cursor-pointer flex items-center justify-center gap-2 text-slate-500 hover:text-amber-400 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-xs font-bold">Empty Relic Slot {slotIdx + 1}</span>
                  </div>
                );
              })}
            </div>

            {/* Relic Picker Drawer */}
            {showRelicPicker && (
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    Your Owned Relics Vault ({ownedRelicItems.length} available)
                  </span>
                  <span className="text-[10px] text-slate-500">Click to Equip / Unequip</span>
                </div>

                {ownedRelicItems.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-white/10 rounded-lg">
                    You don't own any relics yet. Obtain relics in Ancient Dungeon expeditions, Astra Shop, or Crate openings!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {ownedRelicItems.map(item => {
                      const isEquipped = equippedRelics.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleToggleRelic(item.id)}
                          className={`p-2 rounded-lg border cursor-pointer flex items-center justify-between gap-2 transition-all ${
                            isEquipped
                              ? 'bg-amber-500/20 border-amber-500 text-white'
                              : 'bg-slate-900 border-white/5 hover:border-white/20 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-lg">{item.icon}</span>
                            <div className="min-w-0">
                              <h5 className="text-xs font-bold truncate">{item.name}</h5>
                              <span className="text-[10px] text-emerald-400 block">
                                +{item.bonusPower} PWR • {item.rarity}
                              </span>
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isEquipped ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {isEquipped ? 'EQUIPPED' : 'EQUIP'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>Selected Build: </span>
            <strong className="text-amber-400">{selectedSpec.name}</strong>
            <span className="text-slate-500 ml-1">({totalBonusPower > 0 ? `+${totalBonusPower} Power Bonus` : 'Standard'})</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveBuild}
              disabled={isSaving}
              className="flex-1 sm:flex-none px-6 py-2 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-glow-amber transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{isSaving ? 'Activating...' : 'Activate Build'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
