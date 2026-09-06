import React, { useState } from 'react';
import { Character } from '../../types/game';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../audio/soundManager';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { getCharacterAscensionRarity } from './AscensionShop';
import { 
  X, Zap, Shield, Flame, ArrowUpCircle, AlertTriangle, 
  Check, Sparkles, Heart, Activity
} from 'lucide-react';

interface Props {
  character: Character;
  onClose: () => void;
}

export function AscensionUpgradeModal({ character, onClose }: Props) {
  const { user, upgradeCharacter } = useAuth();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const currentLevel = (user?.characterLevels || {})[character.id] || 1;
  const maxLevel = character.grade === 'MYTHIC' ? 25 : 50;
  const boosts = (user?.characterStatsBoosts || {})[character.id] || { power: 0, hp: 0, defense: 0, speed: 0 };

  const requiredCoins = Math.round((150 * Math.pow(currentLevel, 1.8)) / 50) * 50;
  const canAfford = (user?.astra || 0) >= requiredCoins;

  const handleUpgrade = async () => {
    if (!canAfford) {
      soundManager.playAttackHit();
      setStatusMessage({ type: 'error', text: 'Insufficient Astra!' });
      return;
    }

    setIsUpgrading(true);
    setStatusMessage(null);

    const result = await upgradeCharacter(character.id, character.grade === 'MYTHIC' || character.alignment === 'Cosmic');
    setIsUpgrading(false);

    if (result.success) {
      soundManager.playVictory();
      setStatusMessage({ type: 'success', text: `Success! ${character.name} upgraded to Level ${result.newLevel}!` });
      setTimeout(() => setStatusMessage(null), 3000);
    } else {
      soundManager.playAttackHit();
      setStatusMessage({ type: 'error', text: result.error || 'Failed to upgrade character.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fadeIn select-none">
      <div className="relative w-full max-w-lg bg-[#0E1017] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden p-5 sm:p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#12141C] border border-white/[0.08] text-amber-400">
              <ArrowUpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-heading font-black text-white uppercase tracking-wider">
                CHARACTER <span className="text-amber-400">UPGRADE STATION</span>
              </h2>
              <span className="text-[10px] text-slate-400 font-mono">
                Level 1 to Level {maxLevel} Progression Matrix
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Showcase Card */}
        <div className="p-4 rounded-xl bg-[#12141C] border border-white/[0.08] flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/[0.1] shrink-0 bg-black">
            <CharacterPortrait character={character} size="lg" className="w-full h-full object-cover" />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-black">
                {character.grade === 'MYTHIC' ? `MYTHIC • LEVEL ${currentLevel} / ${maxLevel}` : `LEVEL ${currentLevel} / ${maxLevel}`}
              </span>
              <span className="text-xs font-mono font-bold text-amber-300">
                ⚡ {character.overallPower + boosts.power} PWR
              </span>
            </div>
            <h3 className="font-heading font-black text-white text-base truncate">
              {character.name}
            </h3>
            <span className="text-xs text-slate-300 block truncate font-mono">
              {character.powers}
            </span>
          </div>
        </div>

        {/* Status Alert */}
        {statusMessage && (
          <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
              : 'bg-red-950/80 border-red-500/50 text-red-300'
          }`}>
            {statusMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <div className="space-y-4">
            
            {/* Stat Gains Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase flex items-center gap-1 font-mono">
                  <Zap className="w-3.5 h-3.5" /> Total Power
                </span>
                <div className="flex items-center justify-between text-xs font-mono font-black text-white">
                  <span>{character.overallPower + boosts.power}</span>
                  <span className="text-emerald-400">+{boosts.power + 2} (Next)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                <span className="text-[10px] text-rose-400 font-bold uppercase flex items-center gap-1 font-mono">
                  <Heart className="w-3.5 h-3.5" /> Max Vitality (HP)
                </span>
                <div className="flex items-center justify-between text-xs font-mono font-black text-white">
                  <span>{100 + boosts.hp} HP</span>
                  <span className="text-emerald-400">+{boosts.hp + 5} HP</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                <span className="text-[10px] text-cyan-400 font-bold uppercase flex items-center gap-1 font-mono">
                  <Shield className="w-3.5 h-3.5" /> Defense Bonus
                </span>
                <div className="flex items-center justify-between text-xs font-mono font-black text-white">
                  <span>+{boosts.defense} DEF</span>
                  <span className="text-emerald-400">+{boosts.defense + 2} DEF</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                <span className="text-[10px] text-purple-400 font-bold uppercase flex items-center gap-1 font-mono">
                  <Activity className="w-3.5 h-3.5" /> Agility & Speed
                </span>
                <div className="flex items-center justify-between text-xs font-mono font-black text-white">
                  <span>+{boosts.speed} SPD</span>
                  <span className="text-emerald-400">+{boosts.speed + 1} SPD</span>
                </div>
              </div>
            </div>

            {/* Upgrade Cost Card */}
            <div className="p-3.5 rounded-xl bg-[#12141C] border border-white/[0.08] flex items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">UPGRADE COST (LVL {currentLevel + 1})</span>
                <div className="flex items-center gap-3 font-mono font-black mt-0.5">
                  <span className="text-amber-400 flex items-center gap-1">
                    ✨ {requiredCoins.toLocaleString()} Astra ({(user?.astra || 0).toLocaleString()} owned)
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={isUpgrading || !canAfford || currentLevel >= maxLevel}
                onClick={handleUpgrade}
                className={`py-2.5 px-4 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                  canAfford && currentLevel < maxLevel
                    ? 'btn-gold-cinematic text-black'
                    : 'bg-[#181B26] text-slate-600 border border-white/[0.05] cursor-not-allowed'
                }`}
              >
                <ArrowUpCircle className="w-4 h-4" />
                <span>{isUpgrading ? 'UPGRADING...' : currentLevel >= maxLevel ? 'MAX LEVEL' : 'UPGRADE NOW'}</span>
              </button>
            </div>

        </div>

      </div>
    </div>
  );
}
