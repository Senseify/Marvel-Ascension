import React, { useState, useMemo } from 'react';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { Character } from '../../types/game';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../audio/soundManager';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { ShardIcon } from '../common/ShardIcon';
import { 
  ShoppingBag, Sparkles, Filter, Search, Check, Zap, 
  Shield, Flame, Layers, AlertCircle, Award
} from 'lucide-react';

export type AscensionRarity = 'ALL' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'MYTHIC';

export function getCharacterAscensionRarity(char: Character): { rarity: 'RARE' | 'EPIC' | 'LEGENDARY' | 'MYTHIC'; cost: number; badgeColor: string } {
  if (char.name === 'J. Jonah Jameson') {
    return { rarity: 'RARE', cost: 3500, badgeColor: 'from-red-600 to-rose-500' };
  }
  if (char.grade === 'MYTHIC' || char.alignment === 'Cosmic') {
    return { rarity: 'MYTHIC', cost: 50000, badgeColor: 'from-amber-400 via-rose-500 to-purple-600' };
  }
  if (char.overallPower >= 90) {
    return { rarity: 'LEGENDARY', cost: 15000, badgeColor: 'from-amber-500 to-yellow-400' };
  }
  if (char.grade === 'A' || char.overallPower >= 80) {
    return { rarity: 'EPIC', cost: 7500, badgeColor: 'from-purple-500 to-indigo-400' };
  }
  if (char.grade === 'B' || char.overallPower >= 70) {
    return { rarity: 'RARE', cost: 3500, badgeColor: 'from-red-600 to-rose-500' };
  }
  return { rarity: 'RARE', cost: 1500, badgeColor: 'from-emerald-500 to-green-400' };
}

export function AscensionShop() {
  const { user, buyCharacter } = useAuth();
  const [selectedRarity, setSelectedRarity] = useState<AscensionRarity>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaction, setSelectedFaction] = useState('ALL');
  const [isPurchasing, setIsPurchasing] = useState<string | null>(null);
  const [purchaseNotice, setPurchaseNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const ownedCharacterIds = useMemo(() => new Set(user?.ownedCharacters || []), [user?.ownedCharacters]);

  const filteredCharacters = useMemo(() => {
    return ALL_CHARACTERS.filter(char => {
      const { rarity } = getCharacterAscensionRarity(char);
      if (selectedRarity !== 'ALL' && rarity !== selectedRarity) return false;
      if (selectedFaction !== 'ALL' && !char.factions?.includes(selectedFaction as any)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = char.name.toLowerCase().includes(q);
        const matchAlias = char.alias?.toLowerCase().includes(q);
        const matchPower = char.powers.toLowerCase().includes(q);
        if (!matchName && !matchAlias && !matchPower) return false;
      }
      return true;
    });
  }, [selectedRarity, selectedFaction, searchQuery]);

  const handleBuy = async (char: Character) => {
    if (!user) {
      soundManager.playAttackHit();
      setPurchaseNotice({ type: 'error', text: 'Please sign in to recruit characters in Astra Shop.' });
      return;
    }

    const { cost } = getCharacterAscensionRarity(char);
    const userAstra = user.astra ?? 0;
    if (userAstra < cost) {
      soundManager.playAttackHit();
      setPurchaseNotice({ type: 'error', text: `Insufficient Astra! Need ✨ ${cost.toLocaleString()} Astra, you have ✨ ${userAstra.toLocaleString()}.` });
      return;
    }

    setIsPurchasing(char.id);
    setPurchaseNotice(null);

    const result = await buyCharacter(char.id, cost);
    setIsPurchasing(null);

    if (result.success) {
      soundManager.playVictory();
      if (result.isDuplicate) {
        setPurchaseNotice({
          type: 'success',
          text: `Duplicate ${char.name} recruited! Converted into +${result.shardsAwarded || 20} Character Shards for upgrades.`
        });
      } else {
        setPurchaseNotice({
          type: 'success',
          text: `Successfully recruited ${char.name} to your persistent Ascension collection!`
        });
      }
      setTimeout(() => setPurchaseNotice(null), 4000);
    } else {
      soundManager.playAttackHit();
      setPurchaseNotice({ type: 'error', text: result.error || 'Failed to purchase character.' });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn select-none">
      
      {/* Shop Header Banner */}
      <div className="relative p-5 sm:p-7 rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141C] border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MULTIVERSE HERO RECRUITMENT REPOSITORY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-wider">
            ASTRA <span className="text-amber-400">CHARACTER SHOP</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Spend earned <strong>Astra (✨)</strong> to recruit permanent Marvel heroes. Duplicates automatically convert to <strong>Character Shards</strong> for Level 1–50 upgrades!
          </p>
        </div>

        {/* Player Balance Card */}
        <div className="p-4 rounded-xl bg-[#12141C] border border-white/[0.08] shadow-lg flex items-center gap-3.5 shrink-0 z-10">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-black flex items-center justify-center text-2xl font-bold">
            ✨
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
              AVAILABLE BALANCE
            </span>
            <span className="text-2xl font-heading font-black text-white">
              {(user?.astra ?? 0).toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 block font-mono">ASTRA COINS</span>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {purchaseNotice && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-bold animate-fadeIn ${
          purchaseNotice.type === 'success'
            ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
            : 'bg-red-950/90 border-red-500/50 text-red-200'
        }`}>
          {purchaseNotice.type === 'success' ? <Check className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
          <span>{purchaseNotice.text}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0E1017] border border-white/[0.08]">
        
        {/* Rarity Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          {(['ALL', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC'] as AscensionRarity[]).map(rarity => (
            <button
              key={rarity}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedRarity(rarity);
              }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-heading font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedRarity === rarity
                  ? 'bg-amber-400 text-black shadow-sm font-black'
                  : 'bg-[#12141C] text-slate-400 hover:text-white border border-white/[0.04]'
              }`}
            >
              {rarity}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search 350 characters..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#12141C] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 font-mono"
          />
        </div>
      </div>

      {/* Character Cards Grid */}
      {filteredCharacters.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-heading font-black text-white uppercase">No Characters Found</h3>
          <p className="text-xs text-slate-400">Try changing your search query or rarity filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {filteredCharacters.map(char => {
          const { rarity, cost, badgeColor } = getCharacterAscensionRarity(char);
          const isOwned = ownedCharacterIds.has(char.id);
          const shardCount = user?.characterShards[char.id] || 0;
          const charLevel = (user?.characterLevels as any)?.[char.id] || 1;

          return (
            <div
              key={char.id}
              className={`relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-xl bg-[#0E1017] border transition-all group shadow-lg ${
                isOwned
                  ? 'border-emerald-500/40 hover:border-emerald-400/80'
                  : 'border-white/[0.08] hover:border-amber-400/60'
              }`}
            >
              {/* Rarity & Power Header Badge */}
              <div className="p-2.5 flex items-center justify-between border-b border-white/[0.06] bg-black/40">
                <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-gradient-to-r ${badgeColor} text-black`}>
                  {rarity}
                </span>
                <span className="text-[11px] font-mono font-black text-amber-300">
                  ⚡ {char.overallPower}
                </span>
              </div>

              {/* Character Portrait */}
              <div className="p-3 text-center space-y-2">
                <div className="w-full h-40 sm:h-48 mx-auto rounded-xl overflow-hidden border border-white/10 shadow-md group-hover:scale-[1.02] transition-transform bg-black">
                  <CharacterPortrait 
                    character={char} 
                    size="fill" 
                    aspect="square"
                    showBadge={false} 
                    showPowerBadge={false} 
                    className="w-full h-full border-none shadow-none rounded-none" 
                    fit="contain"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading font-black text-xs sm:text-sm text-white uppercase line-clamp-2 min-h-[2.4rem] flex items-center justify-center text-center leading-snug group-hover:text-amber-300 transition-colors">
                    {char.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 block truncate font-mono">
                    {char.factions?.[0] || char.alignment}
                  </span>
                </div>
              </div>

              {/* Status / Purchase Action Button */}
              <div className="p-2.5 bg-black/40 border-t border-white/[0.06] space-y-1.5">
                {isOwned && (
                  <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold px-1">
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" /> OWNED (LVL {charLevel})
                    </span>
                    {shardCount > 0 && (
                      <ShardIcon category={char.grade} amount={shardCount} className="text-amber-300" />
                    )}
                  </div>
                )}

                <button
                  type="button"
                  disabled={isPurchasing === char.id}
                  onClick={() => handleBuy(char)}
                  className={`w-full py-2 px-2.5 rounded-lg font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isPurchasing === char.id
                      ? 'bg-slate-800 text-slate-500'
                      : isOwned
                      ? 'bg-[#181B26] hover:bg-[#202534] text-slate-300 border border-white/[0.08]'
                      : 'btn-gold-cinematic text-black'
                  }`}
                >
                  {isPurchasing === char.id ? (
                    <span>RECRUITING...</span>
                  ) : isOwned ? (
                    <span className="flex items-center gap-1">
                      <span>BUY DUPE (+20 SHARDS)</span>
                      <span className="text-amber-400 font-mono">✨{cost.toLocaleString()}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span>RECRUIT</span>
                      <span className="font-mono font-bold">✨{cost.toLocaleString()}</span>
                    </span>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>
      )}
    </div>
  );
}
