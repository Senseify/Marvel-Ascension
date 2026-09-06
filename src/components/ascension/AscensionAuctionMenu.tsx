import React from 'react';
import { Gavel, EyeOff, Zap, Shuffle } from 'lucide-react';
import { GameMode } from '../../types/game';

interface Props {
  onPlay: (mode: GameMode) => void;
}

const MODES: Array<{ mode: GameMode; label: string; description: string; icon: React.ReactNode }> = [
  { mode: 'classic', label: 'Classic Auction', description: 'Standard open bidding with tactical drafting.', icon: <Gavel className="h-5 w-5" /> },
  { mode: 'blind_bidding', label: 'Blind Bidding', description: 'Submit sealed bids and reveal the winner together.', icon: <EyeOff className="h-5 w-5" /> },
  { mode: 'blitz', label: 'Blitz Auction', description: 'Fast five-second bidding for rapid matches.', icon: <Zap className="h-5 w-5" /> },
  { mode: 'chaos_auction', label: 'Chaos Auction', description: 'Unpredictable auction rules and multiverse twists.', icon: <Shuffle className="h-5 w-5" /> },
];

export function AscensionAuctionMenu({ onPlay }: Props) {
  return (
    <section className="space-y-5 animate-fadeIn">
      <div className="glass-panel rounded-3xl border border-white/10 bg-marvel-card p-6">
        <div className="flex items-center gap-3">
          <Gavel className="h-8 w-8 text-marvel-gold" />
          <div>
            <h1 className="text-2xl font-black uppercase text-white">Auction Arena</h1>
            <p className="text-sm text-slate-300">Choose an auction format and build your roster through bidding.</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {MODES.map(item => (
          <button
            key={item.mode}
            type="button"
            onClick={() => onPlay(item.mode)}
            className="group rounded-2xl border border-white/10 bg-marvel-surface p-5 text-left transition-all hover:border-marvel-red hover:bg-marvel-card cursor-pointer"
          >
            <div className="mb-3 flex items-center gap-2 text-marvel-gold">{item.icon}<span className="font-black uppercase text-white">{item.label}</span></div>
            <p className="text-sm text-slate-400">{item.description}</p>
            <span className="mt-4 inline-block text-xs font-black uppercase text-marvel-red">Play Auction →</span>
          </button>
        ))}
      </div>
    </section>
  );
}
