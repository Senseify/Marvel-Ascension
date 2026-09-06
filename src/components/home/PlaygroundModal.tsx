import React from 'react';
import { soundManager } from '../../audio/soundManager';
import {
  Gamepad2, X, Swords, Trophy, Flame, Shield, Users,
  Globe, Sparkles, ArrowRight, Play, Crosshair
} from 'lucide-react';
import { GameMode } from '../../types/game';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLaunchAscensionBattle: () => void;
  onLaunchRanked: () => void;
  onLaunchDungeon: () => void;
  onLaunchBossRaid: () => void;
  onLaunchAuction: (mode: GameMode) => void;
  onLaunchMultiplayer: () => void;
  onLaunchAuctionMultiplayer: () => void;
  onLaunchSandbox: () => void;
}

interface GameModeCard {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  players: string;
  icon: React.ReactNode;
  iconBg: string;
  action: () => void;
  isPopular?: boolean;
}

export function PlaygroundModal({
  isOpen,
  onClose,
  onLaunchAscensionBattle,
  onLaunchRanked,
  onLaunchDungeon,
  onLaunchBossRaid,
  onLaunchAuction,
  onLaunchMultiplayer,
  onLaunchAuctionMultiplayer,
  onLaunchSandbox,
}: Props) {
  if (!isOpen) return null;

  const modes: GameModeCard[] = [
    {
      id: 'pvp-arena',
      title: 'Ascension Battle Arena',
      badge: 'FLAGSHIP PVP',
      badgeColor: 'bg-purple-950/90 text-purple-300 border-purple-500/40',
      description: 'Engage in 1v1 up to 5v5 tactical card battles with real-time skills and artifact triggers.',
      players: '1v1 – 5v5',
      icon: <Swords className="w-5 h-5 text-purple-400" />,
      iconBg: 'bg-purple-950/80 border-purple-500/40',
      action: onLaunchAscensionBattle,
      isPopular: true,
    },
    {
      id: 'ranked-arena',
      title: 'Ranked Competitive Ladder',
      badge: 'SEASON 1 MMR',
      badgeColor: 'bg-amber-950/90 text-amber-300 border-amber-500/40',
      description: 'Climb through Bronze to Ascender tier. Calibrate MMR ratings and compete for global Top 50.',
      players: '1v1 Ranked',
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      iconBg: 'bg-amber-950/80 border-amber-500/40',
      action: onLaunchRanked,
      isPopular: true,
    },
    {
      id: 'dungeon-survival',
      title: 'Roguelite Dungeon Expedition',
      badge: 'PVE ROGUELITE',
      badgeColor: 'bg-orange-950/90 text-orange-300 border-orange-500/40',
      description: 'Advance through infinite wave floors, collect dungeon boons, buy relics, and test endurance.',
      players: 'Solo PvE',
      icon: <Flame className="w-5 h-5 text-orange-400" />,
      iconBg: 'bg-orange-950/80 border-orange-500/40',
      action: onLaunchDungeon,
    },
    {
      id: 'boss-raid',
      title: 'Co-Op Cosmic Boss Raid',
      badge: 'TITAN RAID',
      badgeColor: 'bg-red-950/90 text-rose-300 border-rose-500/40',
      description: 'Band together with 1 to 6 players to defeat 9 cosmic raid bosses with shared strategy & bank.',
      players: '1 – 6 Co-op',
      icon: <Crosshair className="w-5 h-5 text-rose-400" />,
      iconBg: 'bg-red-950/80 border-red-500/40',
      action: onLaunchBossRaid,
    },
    {
      id: 'auction-classic',
      title: 'Classic Auction Tournament',
      badge: 'FAST DRAFT',
      badgeColor: 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40',
      description: 'Outbid opponents across 15-second live auctions, recruit 300 heroes, and fight in a bracket.',
      players: '2 – 8 Players',
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      iconBg: 'bg-cyan-950/80 border-cyan-500/40',
      action: () => onLaunchAuction('classic'),
    },
    {
      id: 'auction-chaos',
      title: 'Chaos Auction Draft',
      badge: 'WILD MODIFIERS',
      badgeColor: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40',
      description: 'High-stakes auction rules with randomized card attributes, mystery picks, and market surges.',
      players: '2 – 8 Players',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      iconBg: 'bg-emerald-950/80 border-emerald-500/40',
      action: () => onLaunchAuction('chaos_auction'),
    },
    {
      id: 'multiplayer-lobby',
      title: 'Ascension Multiplayer',
      badge: 'LOBBY BROWSER',
      badgeColor: 'bg-indigo-950/90 text-indigo-300 border-indigo-500/40',
      description: 'Create private custom rooms with friends, host password-protected battles, or spectate.',
      players: 'Global Net',
      icon: <Globe className="w-5 h-5 text-indigo-400" />,
      iconBg: 'bg-indigo-950/80 border-indigo-500/40',
      action: onLaunchMultiplayer,
    },
    {
      id: 'auction-multiplayer',
      title: 'Auction Multiplayer',
      badge: 'LIVE AUCTION',
      badgeColor: 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40',
      description: 'Create or join an online auction room with configurable starting money, timers, and roster limits.',
      players: '2 – 8 Players',
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      iconBg: 'bg-cyan-950/80 border-cyan-500/40',
      action: onLaunchAuctionMultiplayer,
    },
  ];

  const handleLaunch = (mode: GameModeCard) => {
    soundManager.playClick();
    onClose();
    mode.action();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-4xl bg-[#0E1017] border border-white/[0.09] rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/[0.08] bg-[#0A0C14]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-cyan-500 border border-purple-400/50 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-heading font-black text-white uppercase tracking-wider">
                  PLAYGROUND • GAME MODE HUB
                </h2>
                <span className="hidden xs:inline px-2.5 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/40 text-purple-300 text-[9px] font-black uppercase tracking-wider">
                  7 GAME MODES
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Choose your tactical battle format: PvP, Ranked, Roguelite, Co-Op Raids, or Live Auctions
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/[0.04] hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modes Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {modes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => handleLaunch(mode)}
              className="group relative p-4 rounded-2xl bg-[#12141C] hover:bg-[#181B26] border border-white/[0.08] hover:border-purple-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all cursor-pointer flex flex-col justify-between gap-3 hover:-translate-y-0.5"
            >
              {mode.isPopular && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-black uppercase tracking-wider">
                  <span>★ POPULAR</span>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${mode.iconBg} shadow-sm group-hover:scale-105 transition-transform`}>
                    {mode.icon}
                  </div>
                  <div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${mode.badgeColor}`}>
                      {mode.badge}
                    </span>
                    <h3 className="font-heading font-black text-sm text-white uppercase tracking-wide group-hover:text-purple-300 transition-colors mt-1">
                      {mode.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {mode.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
                <span className="font-mono text-[10px] text-slate-400">
                  Format: <strong className="text-slate-200">{mode.players}</strong>
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLaunch(mode);
                  }}
                  className="btn-primary-cinematic px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>PLAY NOW</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#0A0C14] flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Multiplayer matchmaking servers online</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#141722] hover:bg-[#1E2232] text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
