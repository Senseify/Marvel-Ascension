import React, { useState, useMemo } from 'react';
import { ALL_CHARACTER_SYNERGIES, getDiscoveredSynergyStats } from '../../data/synergies/characterSynergies';
import { CharacterSynergy, SynergyType, SynergyEffectCategory } from '../../types/synergy';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../audio/soundManager';
import {
  Search, Filter, Sparkles, Swords, Shield, Heart, Zap,
  CheckCircle2, Lock, ArrowLeft, Dna, Flame, Award, Eye,
  RefreshCw, ChevronRight, Star, Layers, Activity
} from 'lucide-react';

interface Props {
  onBack: () => void;
  onPlayAscension?: () => void;
}

export function SynergiesPage({ onBack, onPlayAscension }: Props) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<SynergyType | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'ACTIVE' | 'LOCKED'>('ALL');
  const [selectedEffect, setSelectedEffect] = useState<SynergyEffectCategory | 'ALL'>('ALL');

  const ownedCharIds = useMemo(() => new Set(user?.ownedCharacters || []), [user?.ownedCharacters]);

  // Character lookup map
  const charMap = useMemo(() => {
    const map = new Map();
    for (const c of ALL_CHARACTERS) {
      map.set(c.id, c);
    }
    return map;
  }, []);

  // Stats calculation
  const stats = useMemo(() => {
    return getDiscoveredSynergyStats(Array.from(ownedCharIds));
  }, [ownedCharIds]);

  // Filtered synergies
  const filteredSynergies = useMemo(() => {
    return ALL_CHARACTER_SYNERGIES.filter(syn => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = syn.name.toLowerCase().includes(q);
        const matchesAbility = syn.abilityName.toLowerCase().includes(q);
        const matchesDesc = syn.gameplayDescription.toLowerCase().includes(q);
        const matchesHeroes = syn.characterNames.some(name => name.toLowerCase().includes(q));
        if (!matchesName && !matchesAbility && !matchesDesc && !matchesHeroes) {
          return false;
        }
      }

      // 2. Type Filter
      if (selectedType !== 'ALL' && syn.type !== selectedType) {
        return false;
      }

      // 3. Status Filter
      const isOwned = syn.characterIds.every(id => ownedCharIds.has(id));
      if (selectedStatus === 'ACTIVE' && !isOwned) return false;
      if (selectedStatus === 'LOCKED' && isOwned) return false;

      // 4. Effect Category Filter
      if (selectedEffect !== 'ALL' && syn.effectCategory !== selectedEffect) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedType, selectedStatus, selectedEffect, ownedCharIds]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: ALL_CHARACTER_SYNERGIES.length };
    for (const s of ALL_CHARACTER_SYNERGIES) {
      counts[s.type] = (counts[s.type] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[#07080B] text-slate-100 p-3 sm:p-6 lg:p-8 select-none">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 1. TOP HEADER & PROGRESS CARD */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0E1017] border border-white/[0.08] p-6 sm:p-8 shadow-2xl">
          {/* Subtle Ambient Nebula Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onBack();
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Command HQ</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-black uppercase text-cyan-300 tracking-wider">
                  TACTICAL COMBAT ARCHIVE
                </span>
                <span className="px-3 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-[10px] font-black uppercase text-purple-300 tracking-wider">
                  300 CANONICAL FORMATIONS
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-wide uppercase flex items-center gap-3">
                <span>🧬 CHARACTER SYNERGIES</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                Field synchronized Marvel champions to trigger combined attacks, absorption shields, health regeneration, counter-strikes, and battle-altering passive effects.
              </p>
            </div>

            {/* Progress Meter Box */}
            <div className="p-5 rounded-2xl bg-[#12141C] border border-white/[0.08] shadow-xl min-w-[280px] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-mono">
                  DISCOVERY PROGRESS
                </span>
                <span className="text-xs font-mono font-black text-amber-400">
                  {stats.discoveredPercent}%
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-heading font-black text-white font-mono">
                  {stats.discoveredCount}
                </span>
                <span className="text-xs text-slate-500 font-mono font-bold">
                  / {stats.total} DISCOVERED
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-black/60 border border-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400 transition-all duration-700 shadow-glow-cyan"
                  style={{ width: `${Math.max(4, stats.discoveredPercent)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1">
                <span>Active: <strong className="text-emerald-400">{stats.discoveredCount}</strong></span>
                <span>Locked: <strong className="text-slate-500">{stats.total - stats.discoveredCount}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SEARCH & ADVANCED FILTERS */}
        <div className="space-y-3">
          {/* Search Bar & Status Switcher */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by synergy name, hero name (Thor, Loki...), ability, or effect..."
                className="w-full bg-[#0E1017] border border-white/[0.08] focus:border-amber-400 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono px-2 py-0.5 rounded cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1 sm:gap-1.5 bg-[#0E1017] p-1.5 rounded-xl border border-white/[0.08] shrink-0 w-full sm:w-auto justify-center sm:justify-start flex-wrap sm:flex-nowrap">
              {(['ALL', 'ACTIVE', 'LOCKED'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedStatus(status);
                  }}
                  className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black uppercase transition cursor-pointer text-center ${
                    selectedStatus === status
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {status === 'ALL' ? `All (${ALL_CHARACTER_SYNERGIES.length})` : status === 'ACTIVE' ? `Active (${stats.discoveredCount})` : `Locked (${stats.total - stats.discoveredCount})`}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter Pills Row */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {(['ALL', 'Duo', 'Trio', 'Team', 'Faction', 'Family', 'Rivalry', 'Cosmic', 'Hero', 'Villain', 'Character-Specific'] as const).map(type => {
              const count = typeCounts[type] || 0;
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedType(type);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                    isSelected
                      ? 'bg-purple-600 border-purple-400 text-white shadow-glow-cosmic'
                      : 'bg-[#0E1017] border-white/[0.06] text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {type === 'ALL' ? 'All Types' : type} ({count})
                </button>
              );
            })}
          </div>

          {/* Effect Category Filter Pills Row */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[9px] px-1 font-mono">Effect:</span>
            {(['ALL', 'COMBINED_ATTACK', 'SHIELD', 'HEALING', 'COUNTER', 'STATUS_EFFECT', 'ABILITY_MOD', 'COSMIC', 'PASSIVE'] as const).map(effect => {
              const isSelected = selectedEffect === (effect as any);
              const label = effect === 'ALL' ? 'All Effects' : effect.replace('_', ' ');
              return (
                <button
                  key={effect}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedEffect(effect as any);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono transition cursor-pointer border ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-white/[0.03] border-white/[0.05] text-slate-400 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. SYNERGIES CARD GRID */}
        {filteredSynergies.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
              🔍
            </div>
            <h3 className="text-lg font-heading font-black text-white uppercase">
              No Synergies Found
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No character synergies match your current search query or filter combination.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('ALL');
                setSelectedStatus('ALL');
                setSelectedEffect('ALL');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSynergies.map(syn => {
              const isDiscovered = syn.characterIds.every(id => ownedCharIds.has(id));

              return (
                <div
                  key={syn.id}
                  className={`group relative rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between gap-4 shadow-lg ${
                    isDiscovered
                      ? 'bg-[#0E1017] border-white/[0.12] hover:border-amber-400/50 hover:shadow-[0_8px_30px_-6px_rgba(245,158,11,0.2)]'
                      : 'bg-[#0A0B10]/90 border-white/[0.05] opacity-80 hover:opacity-100 hover:border-white/20'
                  }`}
                >
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase font-mono tracking-wider border shadow-sm"
                      style={{
                        backgroundColor: `${syn.colorAccent || '#8B5CF6'}15`,
                        borderColor: `${syn.colorAccent || '#8B5CF6'}40`,
                        color: syn.colorAccent || '#A855F7',
                      }}
                    >
                      {syn.badgeIcon || '⚡'} {syn.type} Synergy
                    </span>

                    {isDiscovered ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-black text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>FIELD READY</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] font-black text-slate-500 font-mono bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" />
                        <span>UNOWNED HEROES</span>
                      </span>
                    )}
                  </div>

                  {/* Required Characters Row */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block font-mono">
                      REQUIRED COMBATANTS ({syn.characterNames.length}):
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {syn.characterIds.map((charId, idx) => {
                        const char = charMap.get(charId);
                        const isCharOwned = ownedCharIds.has(charId);

                        return (
                          <div
                            key={charId}
                            className={`flex items-center gap-2 p-1.5 rounded-xl border transition ${
                              isCharOwned
                                ? 'bg-[#12141C] border-white/15 text-white'
                                : 'bg-[#0A0C12] border-dashed border-white/10 text-slate-400'
                            }`}
                          >
                            {char ? (
                              <CharacterPortrait character={char} size="avatar" showBadge={false} />
                            ) : (
                              <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[10px]">
                                🦸
                              </div>
                            )}
                            <div className="min-w-0 pr-1">
                              <span className="text-[11px] font-black truncate block max-w-[120px]">
                                {syn.characterNames[idx] || char?.name || charId}
                              </span>
                              <span className={`text-[8px] font-mono block ${isCharOwned ? 'text-emerald-400 font-bold' : 'text-slate-600'}`}>
                                {isCharOwned ? '✓ Owned' : 'Missing'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Title & Signature Ability Box */}
                  <div className="space-y-1.5 pt-1 border-t border-white/[0.06]">
                    <h3 className="font-heading font-black text-base text-white tracking-wide group-hover:text-amber-300 transition-colors">
                      {syn.name}
                    </h3>

                    <div className="p-3 rounded-xl bg-[#07080B] border border-white/[0.06] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          <span>{syn.abilityName}</span>
                        </span>
                        <span className="text-[9px] font-mono font-bold uppercase text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                          {syn.effectCategory.replace('_', ' ')}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {syn.gameplayDescription}
                      </p>
                    </div>
                  </div>

                  {/* Numerical Battle Modifiers */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-white/[0.06] text-[10px] font-mono">
                    {syn.bonusPower ? (
                      <div className="p-1.5 rounded-lg bg-red-950/40 border border-red-500/20 text-center">
                        <span className="text-[8px] text-red-400 block font-bold">POWER ROLL</span>
                        <span className="font-black text-red-300">+{syn.bonusPower} PWR</span>
                      </div>
                    ) : null}

                    {syn.shieldAmount ? (
                      <div className="p-1.5 rounded-lg bg-blue-950/40 border border-blue-500/20 text-center">
                        <span className="text-[8px] text-blue-400 block font-bold">ABSORB SHIELD</span>
                        <span className="font-black text-blue-300">{syn.shieldAmount} HP</span>
                      </div>
                    ) : null}

                    {syn.healAmount ? (
                      <div className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-center">
                        <span className="text-[8px] text-emerald-400 block font-bold">VITALITY RECOVERY</span>
                        <span className="font-black text-emerald-300">+{syn.healAmount} HP</span>
                      </div>
                    ) : null}

                    {syn.counterDamage ? (
                      <div className="p-1.5 rounded-lg bg-purple-950/40 border border-purple-500/20 text-center">
                        <span className="text-[8px] text-purple-400 block font-bold">REFLECT COUNTER</span>
                        <span className="font-black text-purple-300">{syn.counterDamage} DMG</span>
                      </div>
                    ) : null}

                    {syn.stunChance ? (
                      <div className="p-1.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-center">
                        <span className="text-[8px] text-amber-400 block font-bold">STUN CHANCE</span>
                        <span className="font-black text-amber-300">{Math.round(syn.stunChance * 100)}% DAZE</span>
                      </div>
                    ) : null}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
