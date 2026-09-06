import React, { useState, useMemo } from 'react';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { MARVEL_ARTIFACTS } from '../../data/artifacts';
import { Character, ArtifactItem } from '../../types/game';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../audio/soundManager';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { AscensionUpgradeModal } from './AscensionUpgradeModal';
import { getShardConfig } from '../../data/shardConfig';
import { getApiUrl } from '../../config/api';
import { 
  Package, Shield, Zap, Sparkles, Filter, Search, 
  ArrowUpCircle, Check, Lock, ChevronRight, Layers, Sliders, Trash2, AlertTriangle, X
} from 'lucide-react';

export type InventoryTab = 'CHARACTERS' | 'LABORATORY' | 'RELICS' | 'SKILLS' | 'COSMETICS';

export function AscensionInventory() {
  const { user, token, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<InventoryTab>('CHARACTERS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHeroForUpgrade, setSelectedHeroForUpgrade] = useState<Character | null>(null);
  const [discardTarget, setDiscardTarget] = useState<Character | null>(null);
  const [isDiscarding, setIsDiscarding] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const ownedCharIds = useMemo(() => new Set(user?.ownedCharacters || []), [user?.ownedCharacters]);
  const ownedRelicIds = useMemo(() => new Set(user?.ownedRelics || []), [user?.ownedRelics]);
  const ownedSkillIds = useMemo(() => new Set(user?.ownedSkills || []), [user?.ownedSkills]);

  const ownedCharacters = useMemo(() => {
    return ALL_CHARACTERS.filter(c => ownedCharIds.has(c.id)).filter(c => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        (c.alias && c.alias.toLowerCase().includes(q)) ||
        (c.powers && c.powers.toLowerCase().includes(q)) ||
        (c.alignment && c.alignment.toLowerCase().includes(q)) ||
        (c.description && c.description.toLowerCase().includes(q))
      );
    });
  }, [ownedCharIds, searchQuery]);

  const ownedRelics = useMemo(() => {
    return MARVEL_ARTIFACTS.filter(a => ownedRelicIds.has(a.id)).filter(a => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
    });
  }, [ownedRelicIds, searchQuery]);

  const handleDiscardConfirm = async () => {
    if (!discardTarget || !token) return;
    setIsDiscarding(true);
    try {
      const res = await fetch(getApiUrl('/api/inventory/discard-character'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ characterId: discardTarget.id }),
      });
      const data = await res.json();
      if (data.success) {
        soundManager.playVictory();
        setFeedback({
          type: 'success',
          message: `Successfully discarded ${discardTarget.name}! Received +${data.refundAmount.toLocaleString()} Astra Coins (60% Refund).`,
        });
        refreshProfile();
        setDiscardTarget(null);
      } else {
        soundManager.playAttackHit();
        setFeedback({ type: 'error', message: data.error || 'Failed to discard character.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network connection failed.' });
    } finally {
      setIsDiscarding(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn select-none">
      
      {/* Feedback Toast */}
      {feedback && (
        <div className={`p-4 rounded-2xl border text-sm font-bold flex items-center justify-between animate-slideDown ${
          feedback.type === 'success' ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200' : 'bg-red-950/90 border-red-400 text-red-200'
        }`}>
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)} className="p-1 hover:bg-white/10 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Inventory Top Header */}
      <div className="p-5 sm:p-7 rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
        <div className="space-y-1 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-widest">
            <Package className="w-3.5 h-3.5" />
            <span>COMMANDER VAULT & ARSENAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-wider">
            Inventory & Collection
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage your roster of heroes, tactical relics, skill augmentations, and discard unwanted heroes for 60% Astra refund.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-[#07080B] p-1.5 rounded-xl border border-white/[0.06] shrink-0 relative z-10">
          <button
            type="button"
            onClick={() => { soundManager.playClick(); setActiveTab('LABORATORY'); }}
            className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'LABORATORY' ? 'bg-amber-400 text-black font-black shadow-lg shadow-amber-400/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🧪 Laboratory
          </button>
          <button
            type="button"
            onClick={() => { soundManager.playClick(); setActiveTab('CHARACTERS'); }}
            className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'CHARACTERS'
                ? 'bg-amber-400 text-black font-black shadow-lg shadow-amber-400/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🦸 Heroes ({ownedCharacters.length})
          </button>
          <button
            type="button"
            onClick={() => { soundManager.playClick(); setActiveTab('RELICS'); }}
            className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'RELICS'
                ? 'bg-amber-400 text-black font-black shadow-lg shadow-amber-400/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🏺 Relics ({ownedRelics.length})
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#0E1017] border border-white/[0.08]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab.toLowerCase()}...`}
            className="w-full pl-9 pr-3.5 py-1.5 rounded-lg bg-[#07080B] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {(['HERO', 'RARE', 'EPIC', 'VILLAIN', 'COSMIC', 'MYTHIC'] as const).map(key => {
          const shard = getShardConfig(key);
          const amount = (user as any)?.shardBalances?.[key] || 0;
          return (
            <div key={key} className="rounded-xl border border-white/[0.08] bg-[#0E1017] p-3">
              <div className="text-xs font-black" style={{ color: shard.color }}>{shard.icon} {shard.name}</div>
              <div className="mt-1 text-sm font-bold text-white font-mono">{amount} / 50</div>
              <div className="mt-1 h-1 rounded-full bg-white/10">
                <div className="h-1 rounded-full bg-amber-400 opacity-80" style={{ width: `${Math.min(100, amount * 2)}%` }} />
              </div>
              <div className="mt-1 text-[10px] text-slate-400 font-mono">{amount >= 50 ? 'Token ready' : `${50 - amount} more needed`}</div>
            </div>
          );
        })}
      </div>

      {/* TAB 1: CHARACTERS VAULT */}
      {activeTab === 'CHARACTERS' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {ownedCharacters.map(char => {
            const charLevel = user?.characterLevels?.[char.id] || 1;
            const isMythic = char.grade === 'MYTHIC' || char.alignment === 'Cosmic';
            const shards = user?.characterShards?.[char.id] || 0;
            const boosts = user?.characterStatsBoosts?.[char.id] || { power: 0, hp: 0, defense: 0, speed: 0 };
            const baseValue = char.startingPrice ? char.startingPrice * 100 : 1000;
            const refundAmount = Math.max(100, Math.floor(baseValue * 0.6));

            return (
              <div
                key={char.id}
                className="relative rounded-xl bg-[#0E1017] border border-white/[0.08] hover:border-amber-400/40 shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Level & Power Badge */}
                <div className="p-2.5 flex items-center justify-between border-b border-white/[0.06] bg-[#07080B]">
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-black">
                    {isMythic ? 'MYTHIC' : `LVL ${charLevel}`}
                  </span>
                  <span className="text-xs font-mono font-black text-amber-300">
                    {char.overallPower + boosts.power} PWR
                  </span>
                </div>

                {/* Character Portrait */}
                <div className="p-3 text-center space-y-2">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-xl overflow-hidden border border-white/10 shadow-md group-hover:scale-105 transition-transform bg-black/60">
                    <CharacterPortrait 
                      character={char} 
                      size="fill"
                      aspect="square"
                      showBadge={false} 
                      showPowerBadge={false} 
                      className="w-full h-full border-none shadow-none rounded-none" 
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-heading font-black text-xs sm:text-sm text-white uppercase line-clamp-2 min-h-[2.4rem] flex items-center justify-center text-center leading-snug group-hover:text-amber-400 transition-colors">
                      {char.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {char.factions?.[0] || char.alignment}
                    </span>
                  </div>
                </div>

                {/* Inventory actions */}
                <div className="p-2.5 bg-[#07080B] border-t border-white/[0.06] space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                    <span>Shards: <strong className="text-amber-400">{shards}</strong></span>
                    <span className="text-emerald-400">+{boosts.hp} HP</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setDiscardTarget(char);
                    }}
                    className="w-full py-1 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 hover:text-red-100 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                    <span>Discard (60% Refund)</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'LABORATORY' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-white/[0.08] bg-[#0E1017] p-5">
            <h2 className="text-xl font-black uppercase text-white font-heading">Character Laboratory</h2>
            <p className="mt-1 text-sm text-slate-400">Select a character to view every upgrade cost, level, shard balance, and stat boost.</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {ownedCharacters.map(char => {
              const level = user?.characterLevels?.[char.id] || 1;
              const maxLevel = char.grade === 'MYTHIC' ? 25 : 50;
              const boosts = user?.characterStatsBoosts?.[char.id] || { power: 0, hp: 0, defense: 0, speed: 0 };
              const upgradeCost = Math.round((150 * Math.pow(level, 1.8)) / 50) * 50;
              const atMaxLevel = level >= maxLevel;
              return (
              <button
                key={char.id}
                type="button"
                onClick={() => { soundManager.playClick(); setSelectedHeroForUpgrade(char); }}
                className="flex min-w-0 items-stretch gap-3 rounded-xl border border-white/[0.08] bg-[#0E1017] p-3 text-left hover:border-amber-400/50 transition-all cursor-pointer group"
              >
                <div className="h-28 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/60">
                  <CharacterPortrait character={char} size="fill" aspect="card" showBadge={false} showPowerBadge={false} className="h-full w-full rounded-none border-none object-contain" />
                </div>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="line-clamp-2 text-sm font-black uppercase text-white group-hover:text-amber-400">{char.name}</span>
                    <span className="shrink-0 text-[10px] font-mono font-bold text-amber-400">LVL {level}/{maxLevel}</span>
                  </div>
                  <p className="line-clamp-2 text-[10px] leading-relaxed text-slate-400">{char.description || char.powers}</p>
                  <div className="grid grid-cols-2 gap-x-2 text-[10px] font-mono text-slate-300">
                    <span>⚡ {char.overallPower + boosts.power} PWR</span>
                    <span className="text-rose-300">❤ {100 + boosts.hp} HP</span>
                    <span className="text-cyan-300">🛡 {boosts.defense} DEF</span>
                    <span className="text-purple-300">↯ {boosts.speed} SPD</span>
                  </div>
                  <div className="border-t border-white/[0.06] pt-1 text-[10px] font-mono font-bold text-amber-300">
                    {atMaxLevel ? 'MAX LEVEL' : `NEXT UPGRADE: ✨ ${upgradeCost.toLocaleString()} ASTRA`}
                  </div>
                </div>
              </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: RELICS VAULT */}
      {activeTab === 'RELICS' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {ownedRelics.map(relic => (
            <div
              key={relic.id}
              className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.08] hover:border-amber-400/40 shadow-lg flex flex-col justify-between space-y-3 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#12141C] border border-amber-400/40 flex items-center justify-center text-2xl shadow-sm">
                  {relic.icon}
                </div>
                <div>
                  <h3 className="font-heading font-black text-white text-sm uppercase">
                    {relic.name}
                  </h3>
                  <span className="text-[10px] text-amber-400 font-mono font-bold uppercase block">
                    TACTICAL RELIC
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {relic.description}
              </p>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-emerald-400 font-bold font-mono">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> UNLOCKED & READY
                </span>
                <span className="text-slate-500 font-mono">ID: {relic.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upgrade Hero Modal */}
      {selectedHeroForUpgrade && (
        <AscensionUpgradeModal
          character={selectedHeroForUpgrade}
          onClose={() => setSelectedHeroForUpgrade(null)}
        />
      )}

      {/* Discard Confirmation Modal (60% Money Value Refund) */}
      {discardTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl bg-[#0E1017] border border-red-500/40 shadow-2xl p-6 space-y-5 text-center">
            
            {/* Warning Icon */}
            <div className="w-16 h-16 mx-auto rounded-xl bg-red-950/40 border border-red-500/40 flex items-center justify-center text-3xl text-red-400 shadow-lg">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400 font-mono">
                DISCARD CHARACTER CONFIRMATION
              </span>
              <h2 className="text-2xl font-heading font-black text-white uppercase">
                Discard {discardTarget.name}?
              </h2>
              <p className="text-xs text-slate-400">
                This hero will be permanently removed from your active roster in exchange for a 60% Astra refund.
              </p>
            </div>

            {/* Character Info Card */}
            <div className="p-4 rounded-xl bg-[#07080B] border border-white/[0.08] flex items-center gap-4 text-left">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 bg-black shrink-0">
                <CharacterPortrait character={discardTarget} size="sm" showBadge={false} showPowerBadge={false} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-heading font-black text-sm text-white truncate">{discardTarget.name}</h4>
                <div className="text-xs font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                  <span className="text-amber-400 font-bold">{discardTarget.grade} Grade</span>
                  <span>•</span>
                  <span>⚡ {discardTarget.overallPower} PWR</span>
                </div>
              </div>
            </div>

            {/* Refund Calculation Breakdown */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>Original Valuation:</span>
                <span className="font-bold text-white">
                  {(discardTarget.startingPrice ? discardTarget.startingPrice * 100 : 1000).toLocaleString()} Astra
                </span>
              </div>
              <div className="flex items-center justify-between text-amber-300 font-bold pt-2 border-t border-red-500/20 text-sm">
                <span>60% Refund Payout:</span>
                <span className="text-amber-400 font-black text-base">
                  +{(Math.max(100, Math.floor((discardTarget.startingPrice ? discardTarget.startingPrice * 100 : 1000) * 0.6))).toLocaleString()} Astra
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDiscardTarget(null)}
                disabled={isDiscarding}
                className="py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-heading font-bold text-xs uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDiscardConfirm}
                disabled={isDiscarding}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isDiscarding ? 'Discarding...' : 'Confirm Discard'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
