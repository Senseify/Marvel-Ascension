import React from 'react';
import { Character } from '../../types/game';
import { CharacterImage } from './CharacterImage';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

interface Props {
  character: Character;
  currentCount: number;
  characterLimit: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DiscardConfirmModal({
  character,
  currentCount,
  characterLimit,
  onConfirm,
  onCancel,
}: Props) {
  const refundAmount = Math.floor((character.startingPrice || 1) * 0.6);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn select-none">
      <div className="relative w-full max-w-md bg-[#0F0C08] border-2 border-amber-500/80 rounded-3xl p-6 shadow-[0_0_50px_rgba(245,158,11,0.3)] space-y-5 text-center">
        
        {/* Close button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onCancel();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon Badge */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950/80 border border-amber-500 flex items-center justify-center text-amber-400 shadow-lg animate-pulse">
          <Trash2 className="w-8 h-8" />
        </div>

        {/* Header Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-950 border border-amber-500/40 text-amber-400 text-[10px] font-black uppercase tracking-widest">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>SELL CHARACTER FOR 60% REFUND</span>
          </div>
          <h2 className="text-2xl font-heading font-black text-white uppercase tracking-wider">
            SELL CARD?
          </h2>
        </div>

        {/* Hero Preview */}
        <div className="flex items-center gap-3 bg-black/60 p-3 rounded-2xl border border-white/10 text-left">
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-amber-500/50 shadow-md shrink-0 bg-black/60">
            <CharacterImage character={character} aspect="square" className="w-full h-full" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block">
              Grade {character.grade} • {character.overallPower} PWR
            </span>
            <h4 className="font-heading font-black text-white text-sm truncate">
              {character.name}
            </h4>
            <span className="text-[10px] text-slate-400 block truncate">
              {character.alignment} • {character.factions?.[0] || 'Marvel Universe'}
            </span>
          </div>
        </div>

        {/* 60% Refund & Slot freeing details */}
        <div className="p-3.5 bg-amber-950/30 rounded-2xl border border-amber-500/30 text-xs space-y-1.5 text-left">
          <div className="flex items-center justify-between text-amber-300 font-bold">
            <span>Refund Amount (60%):</span>
            <span className="text-emerald-400 font-black">+${refundAmount} Coins</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Roster Slots:</span>
            <span className="font-mono font-bold text-emerald-400">
              {currentCount}/{characterLimit} ➔ {Math.max(0, currentCount - 1)}/{characterLimit} Free
            </span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
            Selling this character refunds exactly <strong>60% of their base cost (+${refundAmount})</strong> directly back to your balance and frees up your roster slot.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onCancel();
            }}
            className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-slate-300 font-heading font-black text-xs uppercase tracking-wider border border-white/10 transition-all cursor-pointer"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={() => {
              soundManager.playAttackHit();
              onConfirm();
            }}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-heading font-black text-xs uppercase tracking-wider shadow-lg transition-all transform hover:scale-105 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5 text-black" />
            <span>SELL (+${refundAmount})</span>
          </button>
        </div>

      </div>
    </div>
  );
}
