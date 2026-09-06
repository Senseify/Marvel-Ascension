import React, { useMemo, useState } from 'react';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { Character } from '../../types/game';
import { useAuth } from '../../context/AuthContext';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { AscensionUpgradeModal } from './AscensionUpgradeModal';
import { ArrowUpCircle, Lock, Shield, Sparkles, Swords, Zap } from 'lucide-react';

type DetailTab = 'OVERVIEW' | 'STATS' | 'ABILITIES' | 'BIO';

const gradeAccent: Record<Character['grade'], string> = {
  C: 'border-emerald-500/40 shadow-[0_0_16px_rgba(16,185,129,0.12)]',
  B: 'border-cyan-500/50 shadow-[0_0_18px_rgba(6,182,212,0.16)]',
  A: 'border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]',
  MYTHIC: 'border-purple-400/80 shadow-[0_0_26px_rgba(168,85,247,0.32)]',
};

function ManagementCard({
  character,
  level,
  power,
  selected,
  isNew,
  onSelect,
}: {
  character: Character;
  level: number;
  power: number;
  selected: boolean;
  isNew: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full overflow-hidden rounded-2xl border bg-[#0B0D12] text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 ${gradeAccent[character.grade]} ${
        selected ? 'ring-2 ring-amber-300/80 ring-offset-2 ring-offset-[#07080B]' : ''
      }`}
      aria-pressed={selected}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <CharacterPortrait
          character={character}
          size="fill"
          aspect="card"
          showBadge={false}
          showPowerBadge={false}
          fit="contain"
          className="h-full w-full rounded-none border-none shadow-none"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/75 to-transparent px-2 pb-2 pt-8">
          <div className="truncate font-heading text-[11px] font-black uppercase tracking-wide text-white">{character.name}</div>
          <div className="mt-1 flex items-center justify-between gap-1 text-[9px] font-mono font-bold">
            <span className="text-amber-300">{character.grade === 'MYTHIC' ? 'MYTHIC' : `GRADE ${character.grade}`}</span>
            <span className="text-slate-300">LV {level}</span>
          </div>
        </div>
        {isNew && <span className="absolute right-1.5 top-1.5 rounded-md bg-red-600 px-1.5 py-0.5 text-[8px] font-black text-white shadow-lg">NEW</span>}
        {selected && <span className="absolute left-1.5 top-1.5 rounded-md bg-amber-400 px-1.5 py-0.5 text-[8px] font-black text-black">SELECTED</span>}
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.06] px-2 py-1.5 text-[9px] font-mono">
        <span className="text-slate-400">⚡ POWER</span>
        <span className="font-black text-amber-300">{power.toLocaleString()}</span>
      </div>
    </button>
  );
}

function LockedCard({ character }: { character: Character }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08090D] opacity-70">
      <div className="relative aspect-[4/5] overflow-hidden grayscale">
        <CharacterPortrait character={character} size="fill" aspect="card" showBadge={false} showPowerBadge={false} fit="contain" className="h-full w-full rounded-none border-none opacity-25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 text-center">
          <Lock className="mb-1 h-4 w-4 text-slate-400" />
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-300">Locked</span>
          <span className="mt-1 px-2 text-[8px] text-slate-500">Unlock through play</span>
        </div>
      </div>
    </div>
  );
}

export function AscensionCharacterRoster() {
  const { user } = useAuth();
  const [selectedId, setSelectedId] = useState<string | null>(user?.ownedCharacters?.[0] || null);
  const [detailTab, setDetailTab] = useState<DetailTab>('OVERVIEW');
  const [newIds, setNewIds] = useState<string[]>(user?.ownedCharacters?.slice(-2) || []);
  const [upgradeCharacter, setUpgradeCharacter] = useState<Character | null>(null);

  const ownedIds = user?.ownedCharacters || [];
  const ownedCharacters = useMemo(
    () => ownedIds.map(id => ALL_CHARACTERS.find(character => character.id === id)).filter((character): character is Character => Boolean(character)),
    [ownedIds]
  );
  const selectedCharacter = ownedCharacters.find(character => character.id === selectedId) || ownedCharacters[0];
  const lockedCharacters = useMemo(
    () => ALL_CHARACTERS.filter(character => !ownedIds.includes(character.id)).slice(0, 8),
    [ownedIds]
  );

  const level = selectedCharacter ? (user?.characterLevels?.[selectedCharacter.id] || 1) : 1;
  const boosts = selectedCharacter ? (user?.characterStatsBoosts?.[selectedCharacter.id] || { power: 0, hp: 0, defense: 0, speed: 0 }) : { power: 0, hp: 0, defense: 0, speed: 0 };
  const power = selectedCharacter ? selectedCharacter.overallPower + boosts.power : 0;
  const xp = Math.min(level * 100, (user?.xp || 0) % 1000);
  const nextXp = level * 100;
  const canUpgrade = Boolean(selectedCharacter && (user?.astra || 0) >= level * 150);

  const selectCharacter = (id: string) => {
    setSelectedId(id);
    setNewIds(ids => ids.filter(newId => newId !== id));
  };

  if (!selectedCharacter) {
    return (
      <div className="flex min-h-[calc(100vh-260px)] items-center justify-center rounded-3xl border border-white/[0.08] bg-[#0E1017] p-8 text-center">
        <div>
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-amber-400" />
          <h2 className="font-heading text-xl font-black uppercase text-white">Character Roster Offline</h2>
          <p className="mt-2 text-sm text-slate-400">Unlock your first character to begin Ascension progression.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-260px)] flex-col gap-4 overflow-hidden lg:h-[calc(100vh-260px)] lg:flex-row">
      <section className="flex min-h-0 w-full flex-col rounded-3xl border border-white/[0.08] bg-[#0E1017] p-3 shadow-2xl lg:w-[390px]">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-cyan-300"><Swords className="h-3.5 w-3.5" /> Character Roster</div>
            <h2 className="mt-1 font-heading text-lg font-black uppercase text-white">Vanguard Collection <span className="text-amber-400">({ownedCharacters.length})</span></h2>
          </div>
          <span className="rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-[9px] font-mono text-slate-400">SCROLL DECK</span>
        </div>
        <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1 custom-scrollbar">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2">
            {ownedCharacters.map(character => (
              <ManagementCard
                key={character.id}
                character={character}
                level={user?.characterLevels?.[character.id] || 1}
                power={character.overallPower + (user?.characterStatsBoosts?.[character.id]?.power || 0)}
                selected={character.id === selectedCharacter.id}
                isNew={newIds.includes(character.id)}
                onSelect={() => selectCharacter(character.id)}
              />
            ))}
            {lockedCharacters.map(character => <LockedCard key={character.id} character={character} />)}
          </div>
        </div>
        <div className="mt-2 border-t border-white/[0.07] pt-2 text-[9px] font-mono uppercase tracking-wider text-slate-500">Roster boundary • browse unlocked and locked heroes</div>
      </section>

      <section className="min-h-0 flex-1 overflow-y-auto rounded-3xl border border-white/[0.08] bg-[#0E1017] p-4 shadow-2xl custom-scrollbar sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.07] pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-amber-400">Selected Character // Ascension Matrix</span>
            <h1 className="mt-1 font-heading text-3xl font-black uppercase tracking-wider text-white sm:text-5xl">{selectedCharacter.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono font-black uppercase">
              <span className={`rounded-md border px-2 py-1 ${gradeAccent[selectedCharacter.grade]}`}>{selectedCharacter.grade === 'MYTHIC' ? 'MYTHIC' : `GRADE ${selectedCharacter.grade}`}</span>
              <span className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-slate-300">{selectedCharacter.alignment}</span>
              <span className="rounded-md border border-cyan-500/30 bg-cyan-950/30 px-2 py-1 text-cyan-300">LEVEL {level}</span>
            </div>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 px-4 py-3 text-right">
            <div className="text-[9px] font-mono uppercase tracking-wider text-amber-400">Combat Power</div>
            <div className="text-2xl font-black text-amber-200">⚡ {power.toLocaleString()}</div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.2fr)]">
          <div className={`relative mx-auto w-full max-w-[340px] overflow-hidden rounded-3xl border bg-black/30 p-2 lg:mx-0 lg:max-w-none ${gradeAccent[selectedCharacter.grade]}`}>
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <CharacterPortrait character={selectedCharacter} size="fill" aspect="card" showBadge={false} showPowerBadge={false} fit="contain" className="h-full w-full rounded-none border-none" />
            </div>
            <div className="flex items-center justify-between px-2 py-2 text-[10px] font-mono font-black uppercase">
              <span className="text-slate-400">Ownership</span><span className="text-emerald-300">UNLOCKED</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-1.5 border-b border-white/[0.07] pb-2">
              {(['OVERVIEW', 'STATS', 'ABILITIES', 'BIO'] as DetailTab[]).map(tab => (
                <button key={tab} type="button" onClick={() => setDetailTab(tab)} className={`rounded-lg px-3 py-1.5 text-[10px] font-heading font-black uppercase tracking-wider transition ${detailTab === tab ? 'bg-amber-400 text-black' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>{tab}</button>
              ))}
            </div>
            {detailTab === 'BIO' && <div className="rounded-2xl border border-white/[0.07] bg-black/25 p-4 text-sm leading-relaxed text-slate-300">{selectedCharacter.description}</div>}
            {detailTab === 'ABILITIES' && <div className="space-y-2">{selectedCharacter.specialAbilities.map(ability => <div key={ability.name} className="rounded-xl border border-white/[0.07] bg-black/25 p-3"><div className="font-bold text-white">{ability.name}</div><div className="mt-1 text-xs text-slate-400">{ability.description}</div></div>)}</div>}
            {(detailTab === 'OVERVIEW' || detailTab === 'STATS') && (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                <Stat label="HP" value={100 + boosts.hp} icon={<Shield className="h-3.5 w-3.5 text-rose-400" />} />
                <Stat label="ATTACK" value={selectedCharacter.stats.strength + boosts.power} icon={<Swords className="h-3.5 w-3.5 text-red-400" />} />
                <Stat label="DEFENSE" value={selectedCharacter.stats.durability + boosts.defense} icon={<Shield className="h-3.5 w-3.5 text-cyan-400" />} />
                <Stat label="SPEED" value={selectedCharacter.stats.speed + boosts.speed} icon={<Zap className="h-3.5 w-3.5 text-amber-400" />} />
                <Stat label="POWER" value={power} icon={<Sparkles className="h-3.5 w-3.5 text-purple-400" />} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-4">
            <div className="flex items-center justify-between"><h3 className="font-heading text-sm font-black uppercase text-white">Progression</h3><span className="text-[10px] font-mono text-slate-400">{xp} / {nextXp} XP</span></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-amber-400" style={{ width: `${Math.min(100, (xp / nextXp) * 100)}%` }} /></div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400"><span>Ascension Stage I</span><span className="text-amber-300">Stage II locked</span></div>
          </div>
          <div className="rounded-2xl border border-purple-500/20 bg-purple-950/10 p-4">
            <div className="flex items-center justify-between"><h3 className="font-heading text-sm font-black uppercase text-white">Ascension</h3><span className="text-[10px] font-mono text-purple-300">NEXT STAGE</span></div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] font-mono"><Requirement label="LEVEL" value={`${level}/10`} complete={level >= 10} /><Requirement label="SHARDS" value="0/25" complete={false} /><Requirement label="ASTRA" value="0/500" complete={false} /></div>
            <button type="button" disabled className="mt-4 w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/5 py-2 text-[10px] font-heading font-black uppercase tracking-wider text-slate-500">Requirements Incomplete</button>
          </div>
        </div>

        {canUpgrade && (
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-amber-500/30 bg-amber-950/15 p-4">
            <div><div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Upgrade Available</div><div className="mt-1 text-sm text-slate-300">Level {level} → {level + 1} • Power {power} → {power + 2}</div></div>
            <button type="button" onClick={() => setUpgradeCharacter(selectedCharacter)} className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-[10px] font-heading font-black uppercase text-black transition hover:bg-amber-300"><ArrowUpCircle className="h-4 w-4" /> Upgrade</button>
          </div>
        )}
      </section>
      {upgradeCharacter && <AscensionUpgradeModal character={upgradeCharacter} onClose={() => setUpgradeCharacter(null)} />}
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return <div className="rounded-xl border border-white/[0.07] bg-black/30 p-3"><div className="flex items-center gap-1 text-[9px] font-mono font-bold text-slate-400">{icon}{label}</div><div className="mt-1 text-lg font-black text-white">{value.toLocaleString()}</div></div>;
}

function Requirement({ label, value, complete }: { label: string; value: string; complete: boolean }) {
  return <div className={`rounded-lg border p-2 ${complete ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300' : 'border-white/[0.07] bg-black/30 text-slate-400'}`}><div>{label}</div><div className="mt-1 font-black text-white">{value}</div></div>;
}
