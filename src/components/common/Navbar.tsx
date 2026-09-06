import React, { useState, useEffect, useRef } from 'react';
import { GamePhase } from '../../types/game';
import { AscensionTab } from '../ascension/AscensionHub';
import { SkillMasteryModal } from './SkillMasteryModal';
import { ComicFunFactsModal } from './ComicFunFactsModal';
import { AuthModal } from '../auth/AuthModal';
import { PlayerProfileModal } from './PlayerProfileModal';
import { GameState } from '../../types/game';
import { SettingsModal } from '../settings/SettingsModal';
import { FriendsModal, PartyState } from '../social/FriendsModal';
import { PartyInviteBanner, PartyInviteData } from '../social/PartyInviteBanner';
import { NotificationCenterModal } from '../notifications/NotificationCenterModal';
import { useAuth } from '../../context/AuthContext';
import { useGameSettings } from '../../context/SettingsContext';
import { soundManager } from '../../audio/soundManager';
import { socket } from '../../socket/socket';
import { 
  Home, Swords, Trophy, ShoppingBag, Zap, Lightbulb, Menu, X, Shield, 
  Settings, Sparkles, Users, Bell, ChevronDown, BookOpen, HelpCircle,
  Gamepad2, Flame, Globe, Package, KeyRound
} from 'lucide-react';

interface Props {
  state?: GameState;
  phase: GamePhase;
  roomId?: string;
  isOnline: boolean;
  onNavigate: (phase: GamePhase) => void;
  onHomeClick: () => void;
  deviceView?: 'pc' | 'phone';
  onToggleDeviceView?: () => void;
  onNavigateToAscensionTab?: (tab: AscensionTab) => void;
  onOpenPlaygroundModal?: () => void;
  onOpenHowToPlayModal?: () => void;
  onOpenAIAssistant?: () => void;
  onToggleMobileDrawer?: () => void;
  isMobileDrawerOpen?: boolean;
}

export function Navbar({ 
  state,
  phase, 
  onNavigate, 
  onHomeClick,
  onNavigateToAscensionTab,
  onOpenPlaygroundModal,
  onOpenHowToPlayModal,
  onOpenAIAssistant,
  onToggleMobileDrawer,
  isMobileDrawerOpen = false,
}: Props) {
  const { user, isAuthenticated } = useAuth();
  const { openSettings } = useGameSettings();
  
  // Modals state
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isFactsModalOpen, setIsFactsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Party / Multiplayer invites
  const [partyState, setPartyState] = useState<PartyState | null>(null);
  const [pendingPartyInvite, setPendingPartyInvite] = useState<PartyInviteData | null>(null);
  const [tournamentInvite, setTournamentInvite] = useState<{ inviterName: string; teamSize: number; maxPlayers: number; roomCode?: string } | null>(null);

  // Dropdown menus
  const [activeDropdown, setActiveDropdown] = useState<'NONE' | 'MODES' | 'VAULT' | 'INTEL'>('NONE');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown('NONE');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handlePartyInviteReceived = (invite: PartyInviteData) => {
      soundManager.playClick();
      setPendingPartyInvite(invite);
    };
    const handlePartyUpdated = (party: PartyState) => {
      setPartyState(party);
    };

    const handleTournamentInviteReceived = (payload: { inviterName: string; teamSize: number; maxPlayers: number; roomCode?: string }) => {
      soundManager.playClick();
      setTournamentInvite(payload);
      setTimeout(() => setTournamentInvite(null), 15000);
    };

    socket.on('party_invite_received', handlePartyInviteReceived);
    socket.on('party_state_updated', handlePartyUpdated);
    socket.on('team_battle_invite_received', handleTournamentInviteReceived);

    return () => {
      socket.off('party_invite_received', handlePartyInviteReceived);
      socket.off('party_state_updated', handlePartyUpdated);
      socket.off('team_battle_invite_received', handleTournamentInviteReceived);
    };
  }, []);

  const handleAcceptPartyInvite = (partyId: string) => {
    if (!socket) return;
    socket.emit('party_invite_response', { partyId, accept: true }, (res: any) => {
      if (res?.success && res.party) {
        setPartyState(res.party);
        setIsFriendsModalOpen(true);
      }
      setPendingPartyInvite(null);
    });
  };

  const handleDeclinePartyInvite = (partyId: string) => {
    if (!socket) return;
    socket.emit('party_invite_response', { partyId, accept: false });
    setPendingPartyInvite(null);
  };

  const navigateToTab = (tab: AscensionTab) => {
    setActiveDropdown('NONE');
    setIsMobileMenuOpen(false);
    if (onNavigateToAscensionTab) {
      onNavigateToAscensionTab(tab);
    } else {
      onNavigate('ASCENSION');
    }
  };

  const handleMobileNav = (targetPhase: GamePhase) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown('NONE');
    onNavigate(targetPhase);
  };

  const unreadMissionsCount = (user?.dailyMissions || []).filter(m => m.isCompleted && !m.isClaimed).length;

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#07080B]/95 backdrop-blur-md border-b border-white/[0.08] px-2 sm:px-6 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
        <div className="w-full max-w-[1750px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* 1. Left: Marvel Ascension Brand Logo */}
          <div 
            onClick={() => {
              setIsMobileMenuOpen(false);
              setActiveDropdown('NONE');
              onHomeClick();
            }}
            className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
            title="Return to Command Center Home"
          >
            <div className="bg-gradient-to-r from-[#E62429] to-[#991B1B] text-white font-heading font-black text-sm sm:text-base px-2.5 py-0.5 rounded-lg tracking-wider shadow-md transform group-hover:scale-105 transition-transform shrink-0 border border-red-400/40">
              MARVEL
            </div>
            <span className="font-heading font-black text-xs sm:text-sm tracking-[0.2em] uppercase hidden xs:inline shrink-0 text-amber-400">
              ASCENSION
            </span>
          </div>

          {/* 2. Center: Streamlined Desktop Navigation Bar (Organized & Clutter-Free) */}
          <div ref={dropdownRef} className="hidden lg:flex relative z-50 flex-1 min-w-0 items-center justify-start overflow-visible gap-1 xl:gap-1.5 px-2">
            
            {/* HOME */}
            <button
              type="button"
              onClick={() => { soundManager.playClick(); setActiveDropdown('NONE'); onHomeClick(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
                phase === 'HOME'
                  ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>HOME</span>
            </button>

            {/* RANKED (Prominently Highlighted Game Mode) */}
            <button
              type="button"
              onClick={() => { soundManager.playClick(); navigateToTab('RANKED'); }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all bg-gradient-to-r from-amber-500/20 via-amber-500/30 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-500/40 text-amber-300 border border-amber-500/50 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:scale-105 cursor-pointer"
              title="Enter Competitive Ranked Arena (MMR Ladder & Summit)"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>RANKED</span>
              <span className="px-1.5 py-0.2 text-[9px] bg-amber-400 text-black font-black rounded-full leading-none">
                S1
              </span>
            </button>

            {/* PLAY MODES DROPDOWN */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveDropdown(prev => prev === 'MODES' ? 'NONE' : 'MODES');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeDropdown === 'MODES'
                    ? 'bg-red-950/60 text-red-300 border border-red-500/50 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Gamepad2 className={`w-3.5 h-3.5 ${activeDropdown === 'MODES' ? 'text-red-400' : 'text-slate-400'}`} />
                <span>MODES</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${activeDropdown === 'MODES' ? 'rotate-180 text-red-400' : ''}`} />
              </button>

              {activeDropdown === 'MODES' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[#0B0D12]/95 border border-white/15 rounded-2xl shadow-[0_14px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl p-2 z-[100] space-y-1 animate-fadeIn">
                  <div className="px-3 py-1 text-[9px] font-heading font-black text-slate-500 uppercase tracking-widest border-b border-white/5 mb-1">
                    Game Modes
                  </div>

                  <button
                    type="button"
                    onClick={() => navigateToTab('RANKED')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-amber-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-amber-200 group-hover:text-amber-100 flex items-center gap-1.5">
                        <span>Competitive Ranked</span>
                        <span className="text-[8px] bg-amber-500 text-black px-1 rounded font-black">HOT</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">1v1, 3v3 & 5v5 MMR Placement Ladder</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToTab('BATTLE')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-purple-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 group-hover:scale-105">
                      <Swords className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-purple-200 group-hover:text-purple-100">
                        Ascension Battle Duel
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">Tactical PvP Combat Arena</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToTab('DUNGEON')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-orange-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-300 shrink-0 group-hover:scale-105">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-orange-200 group-hover:text-orange-100">
                        Dungeon Expeditions
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">Roguelite PvE Gauntlet & Relic Hunter</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToTab('AUCTION')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-red-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-300 shrink-0 group-hover:scale-105">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-red-200 group-hover:text-red-100">
                        Auction Wars
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">Classic, Blitz, Chaos & Blind Lot Bidding</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToTab('CUSTOM')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-cyan-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 group-hover:scale-105">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-cyan-200 group-hover:text-cyan-100">
                        Custom Match Room
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">Create or Join Private Lobbies</div>
                    </div>
                  </button>

                  {onOpenPlaygroundModal && (
                    <div className="pt-1 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveDropdown('NONE');
                          onOpenPlaygroundModal();
                        }}
                        className="w-full py-2 px-3 text-center text-xs font-heading font-black uppercase text-amber-400 hover:text-amber-300 hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                      >
                        🎮 View All Game Modes...
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ASCENSION MODE */}
            <button
              type="button"
              onClick={() => { soundManager.playClick(); setActiveDropdown('NONE'); onNavigate('ASCENSION'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
                phase === 'ASCENSION'
                  ? 'btn-primary-cinematic scale-[1.02]'
                  : 'bg-[#131620] text-slate-300 border border-white/10 hover:border-red-500/40 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>ASCENSION</span>
            </button>

            {/* ROSTER / CHARACTERS */}
            <button
              type="button"
              onClick={() => { soundManager.playClick(); setActiveDropdown('NONE'); onNavigate('ENCYCLOPEDIA'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
                phase === 'ENCYCLOPEDIA'
                  ? 'bg-red-950/80 text-red-200 border border-red-500 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-red-400" />
              <span>ROSTER</span>
            </button>

            {/* VAULT / SHOP DROPDOWN */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveDropdown(prev => prev === 'VAULT' ? 'NONE' : 'VAULT');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeDropdown === 'VAULT' || phase === 'EQUIPMENT_SHOP'
                    ? 'bg-amber-950/60 text-amber-300 border border-amber-400/50 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span>VAULT</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${activeDropdown === 'VAULT' ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {activeDropdown === 'VAULT' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#0B0D12]/95 border border-white/15 rounded-2xl shadow-[0_14px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl p-2 z-[100] space-y-1 animate-fadeIn">
                  <div className="px-3 py-1 text-[9px] font-heading font-black text-slate-500 uppercase tracking-widest border-b border-white/5 mb-1">
                    Arsenal & Economy
                  </div>

                  <button
                    type="button"
                    onClick={() => { setActiveDropdown('NONE'); onNavigate('SHOP'); }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-amber-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-amber-200">Astra Shop</div>
                      <div className="text-[10px] text-slate-400 truncate">Recruit heroes with Astra</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveDropdown('NONE'); onNavigate('CRATES'); }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-purple-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-purple-200">Crate Vault</div>
                      <div className="text-[10px] text-slate-400 truncate">Open earned reward crates</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToTab('SKILLS')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-yellow-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-300 shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-yellow-200">Skill Vault</div>
                      <div className="text-[10px] text-slate-400 truncate">5 Signature Skills per Hero</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToTab('INVENTORY')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-emerald-200">Shard & Crate Vault</div>
                      <div className="text-[10px] text-slate-400 truncate">Collection & unboxing</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToTab('HOME')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-purple-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-purple-200">Redeem Voucher</div>
                      <div className="text-[10px] text-slate-400 truncate">Unlock gift codes & Astra</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* INTEL & LORE DROPDOWN */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveDropdown(prev => prev === 'INTEL' ? 'NONE' : 'INTEL');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeDropdown === 'INTEL'
                    ? 'bg-slate-800 text-white border border-white/20 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-300" />
                <span>INTEL</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${activeDropdown === 'INTEL' ? 'rotate-180 text-white' : ''}`} />
              </button>

              {activeDropdown === 'INTEL' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#0B0D12]/95 border border-white/15 rounded-2xl shadow-[0_14px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl p-2 z-[100] space-y-1 animate-fadeIn">
                  <div className="px-3 py-1 text-[9px] font-heading font-black text-slate-500 uppercase tracking-widest border-b border-white/5 mb-1">
                    Guides & Lore
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveDropdown('NONE');
                      setIsSkillModalOpen(true);
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-yellow-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-300 shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-yellow-200">Skill Mastery</div>
                      <div className="text-[10px] text-slate-400 truncate">Explore 5 skills per hero</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveDropdown('NONE');
                      setIsFactsModalOpen(true);
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-rose-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 shrink-0">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-rose-200">Comic Fun Facts</div>
                      <div className="text-[10px] text-slate-400 truncate">150 Easter eggs & lore</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveDropdown('NONE');
                      onNavigate('SANDBOX');
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-purple-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                      <Swords className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-purple-200">Duel Simulator</div>
                      <div className="text-[10px] text-slate-400 truncate">Combat sandbox simulator</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveDropdown('NONE');
                      if (onOpenHowToPlayModal) {
                        onOpenHowToPlayModal();
                      } else {
                        onNavigate('HOW_TO_PLAY');
                      }
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-cyan-500/10 text-left group transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-heading font-black text-cyan-200">Rules & Manual</div>
                      <div className="text-[10px] text-slate-400 truncate">Game rules & mechanic guide</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* ALLIANCE */}
            {isAuthenticated && user && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsFriendsModalOpen(true);
                }}
                className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#12141C] border border-purple-500/30 hover:border-purple-400 text-purple-200 hover:text-white transition-all shadow-sm cursor-pointer"
                title="Open Alliance & Squad Friends List"
              >
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs font-heading font-black">
                  ALLIANCE
                </span>
                <span className="text-[9px] bg-purple-600 text-white font-mono font-bold px-1.5 py-0.2 rounded-full">
                  {user.friendsCount || (user.friends || []).length}
                </span>
                {partyState && partyState.members.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-ping" />
                )}
              </button>
            )}
          </div>

          {/* 3. Right: Notifications, Settings, Currency & Account */}
          <div className="navbar-header-actions flex items-center gap-1 sm:gap-2.5 shrink-0">

            {/* Astra Currency Counter */}
            {isAuthenticated && user && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#12141C] border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.12)]">
                <span className="text-amber-400 text-xs">✨</span>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[8px] text-slate-400 font-mono font-bold uppercase hidden md:inline">
                    ASTRA
                  </span>
                  <span className="font-heading font-black text-xs sm:text-sm text-amber-300">
                    {(user.astra ?? user.ascensionCoins ?? 0).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsNotificationsOpen(true);
              }}
              className="relative p-2 rounded-xl bg-[#12141C] border border-white/[0.08] hover:border-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Notification Center"
            >
              <Bell className="w-4 h-4" />
              {unreadMissionsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 text-white text-[8px] font-black rounded-full flex items-center justify-center animate-pulse">
                  {unreadMissionsCount}
                </span>
              )}
            </button>

            {/* AI Assistant */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenAIAssistant?.();
              }}
              aria-label="AI Assistant"
              className="relative z-[60] flex items-center justify-center p-2 rounded-xl bg-[#12141C] border border-white/[0.08] text-cyan-300 hover:text-cyan-200 hover:border-cyan-400/50 transition-all cursor-pointer shadow-[0_0_12px_rgba(34,211,238,0.18)]"
              title="AI Assistant"
            >
              <span className="absolute inset-1 rounded-full bg-cyan-400 animate-ping opacity-20 pointer-events-none" />
              <Sparkles className="w-4 h-4 relative z-10" />
            </button>

            {/* Commander Account Dossier / Sign In */}
            {isAuthenticated && user ? (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsProfileModalOpen(true);
                }}
                className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-[#131620] border border-white/[0.08] hover:border-amber-400/50 text-white transition-all cursor-pointer group"
                title="View Commander Dossier & Stats"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-red-600 to-amber-500 p-0.5 shadow-sm">
                  <div className="w-full h-full rounded-md bg-[#07080A] overflow-hidden flex items-center justify-center text-xs">
                    {user.customAvatarUrl ? (
                      <img
                        src={user.customAvatarUrl}
                        alt={user.displayName || user.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{user.avatar || '🦸‍♂️'}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-left leading-none hidden sm:flex">
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] bg-red-950/80 text-red-200 border border-red-500/40 px-1 rounded font-black font-mono">
                      LVL {user.level}
                    </span>
                    <span className="text-xs font-heading font-black text-white max-w-[85px] truncate group-hover:text-amber-300">
                      {user.displayName || user.username}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                    {user.wins} Wins
                  </span>
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-primary-cinematic hover:brightness-110 text-white font-heading font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                title="Sign In or Create Commander Account"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="navbar-signin-label">Sign In</span>
              </button>
            )}

            {/* Settings Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                openSettings();
              }}
              className="p-2 rounded-xl bg-[#12141C] border border-white/[0.08] hover:border-amber-400/40 text-amber-300 hover:text-amber-200 transition-all cursor-pointer"
              title="Game Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle (Visible on screens < lg) */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                if (onToggleMobileDrawer) {
                  onToggleMobileDrawer();
                } else {
                  setIsMobileMenuOpen(prev => !prev);
                }
              }}
              className="lg:hidden p-2 rounded-xl bg-[#131620] border border-white/10 text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
              title="Toggle Navigation Menu"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileDrawerOpen || isMobileMenuOpen ? (
                <X className="w-5 h-5 text-red-400" />
              ) : (
                <Menu className="w-5 h-5 text-amber-400" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Drawer (Fallback only when onToggleMobileDrawer is not supplied) */}
        {!onToggleMobileDrawer && isMobileMenuOpen && (
          <div className="lg:hidden mt-2 pt-3 pb-2 border-t border-white/10 space-y-3 animate-fadeIn select-none">
            {/* Commander Account Summary on Mobile */}
            <div className="p-3 rounded-2xl bg-[#0F1219] border border-white/10 flex items-center justify-between">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 p-0.5">
                    <div className="w-full h-full rounded-lg bg-[#07080A] overflow-hidden flex items-center justify-center text-sm">
                      {user.customAvatarUrl ? (
                        <img src={user.customAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span>{user.avatar || '🦸‍♂️'}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading font-black text-xs text-white truncate">{user.displayName || user.username}</span>
                      <span className="text-[9px] bg-red-950 text-red-200 border border-red-500/40 font-black px-1 rounded">LVL {user.level}</span>
                    </div>
                    <span className="text-[10px] text-amber-400 font-mono">✨ {(user.astra ?? user.ascensionCoins ?? 0).toLocaleString()} Astra • {user.wins} Wins</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-300">
                  <span className="font-heading font-black text-white">Guest Commander</span>
                  <span className="block text-[10px] text-slate-400">Sign in to save progression & ratings</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsMobileMenuOpen(false);
                  if (isAuthenticated) {
                    setIsProfileModalOpen(true);
                  } else {
                    setIsAuthModalOpen(true);
                  }
                }}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl transition-all"
              >
                {isAuthenticated ? 'Dossier' : 'Sign In'}
              </button>
            </div>

            {/* Core Destinations Grid */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { soundManager.playClick(); onHomeClick(); setIsMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl border text-xs font-heading font-black uppercase text-left flex items-center gap-2 ${
                  phase === 'HOME' ? 'bg-white/10 text-white border-white/30' : 'bg-[#12141C] text-slate-300 border-white/5'
                }`}
              >
                <Home className="w-4 h-4 text-cyan-400" />
                <span>Home</span>
              </button>

              <button
                type="button"
                onClick={() => navigateToTab('RANKED')}
                className="p-2.5 rounded-xl border bg-amber-950/40 border-amber-500/40 text-amber-300 text-xs font-heading font-black uppercase text-left flex items-center gap-2 shadow-sm"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Ranked Arena</span>
              </button>

              <button
                type="button"
                onClick={() => handleMobileNav('ASCENSION')}
                className={`p-2.5 rounded-xl border text-xs font-heading font-black uppercase text-left flex items-center gap-2 ${
                  phase === 'ASCENSION' ? 'btn-primary-cinematic' : 'bg-[#12141C] text-purple-300 border-purple-500/30'
                }`}
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Ascension Hub</span>
              </button>

              <button
                type="button"
                onClick={() => handleMobileNav('ENCYCLOPEDIA')}
                className={`p-2.5 rounded-xl border text-xs font-heading font-black uppercase text-left flex items-center gap-2 ${
                  phase === 'ENCYCLOPEDIA' ? 'bg-red-950/80 text-red-200 border-red-500' : 'bg-[#12141C] text-red-300 border-white/5'
                }`}
              >
                <Users className="w-4 h-4 text-red-400" />
                <span>Roster (350)</span>
              </button>

              <button
                type="button"
                onClick={() => handleMobileNav('EQUIPMENT_SHOP')}
                className={`p-2.5 rounded-xl border text-xs font-heading font-black uppercase text-left flex items-center gap-2 ${
                  phase === 'EQUIPMENT_SHOP' ? 'bg-amber-950/80 text-amber-200 border-amber-500' : 'bg-[#12141C] text-amber-300 border-white/5'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Relic Arsenal</span>
              </button>

              <button
                type="button"
                onClick={() => navigateToTab('DUNGEON')}
                className="p-2.5 rounded-xl border bg-[#12141C] text-orange-300 border-white/5 text-xs font-heading font-black uppercase text-left flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Dungeon Expeditions</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsMobileMenuOpen(false);
                  setIsSkillModalOpen(true);
                }}
                className="p-2.5 rounded-xl border bg-[#12141C] text-yellow-300 border-white/5 text-xs font-heading font-black uppercase text-left flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Skill Mastery</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsMobileMenuOpen(false);
                  setIsFactsModalOpen(true);
                }}
                className="p-2.5 rounded-xl border bg-[#12141C] text-rose-300 border-white/5 text-xs font-heading font-black uppercase text-left flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4 text-rose-400" />
                <span>Comic Facts</span>
              </button>
            </div>

            {/* Mobile Footer Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsMobileMenuOpen(false);
                  setIsFriendsModalOpen(true);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#12141C] text-purple-300 border border-purple-500/30 text-xs font-heading font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Alliance</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsMobileMenuOpen(false);
                  openSettings();
                }}
                className="py-2.5 px-4 rounded-xl bg-[#12141C] text-amber-300 border border-amber-500/30 text-xs font-heading font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Skill Mastery Modal */}
      <SkillMasteryModal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
      />

      {/* Comic Fun Facts Modal */}
      <ComicFunFactsModal
        isOpen={isFactsModalOpen}
        onClose={() => setIsFactsModalOpen(false)}
      />

      {/* Auth Modal (Sign In / Sign Up) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Player Profile Modal */}
      {isProfileModalOpen && (
        <PlayerProfileModal
          profile={user}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}

      {/* Alliance & Squad Friends Modal */}
      <FriendsModal
        isOpen={isFriendsModalOpen}
        onClose={() => setIsFriendsModalOpen(false)}
        partyState={partyState}
        onUpdateParty={setPartyState}
      />

      {/* Notification Center Modal */}
      <NotificationCenterModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateToTab={(tab: string) => navigateToTab(tab as AscensionTab)}
      />

      {/* Floating Real-time Party Invite Banner */}
      <PartyInviteBanner
        invite={pendingPartyInvite}
        onAccept={handleAcceptPartyInvite}
        onDecline={handleDeclinePartyInvite}
      />

      {/* Game Settings Modal */}
      <SettingsModal />

      {/* Floating Tournament Invite Banner */}
      {tournamentInvite && (
        <div className="fixed top-4 right-4 z-[9999] max-w-sm w-full animate-fadeIn">
          <div className="bg-gradient-to-r from-amber-950 via-[#1A1205] to-orange-950 border-2 border-amber-500/60 rounded-2xl p-4 shadow-2xl shadow-amber-900/40">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-900/60 border border-amber-500/50 flex items-center justify-center text-xl shrink-0">⚔️</div>
                <div>
                  <div className="font-heading font-black text-white text-sm leading-tight">
                    Tournament Invite!
                  </div>
                  <div className="text-xs text-amber-300 mt-0.5">
                    <strong>{tournamentInvite.inviterName}</strong> invited you to a{' '}
                    <strong>{tournamentInvite.maxPlayers}-Player</strong> tournament ({tournamentInvite.teamSize}v{tournamentInvite.teamSize})
                  </div>
                  {tournamentInvite.roomCode && (
                    <div className="mt-1 text-[10px] text-slate-400 font-mono">
                      Room Code: <span className="text-amber-400 font-black tracking-widest">{tournamentInvite.roomCode}</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setTournamentInvite(null)}
                className="p-1.5 hover:bg-white/10 rounded-lg cursor-pointer shrink-0 transition-all"
              >
                <X className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => { navigateToTab('BATTLE'); setTournamentInvite(null); }}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-heading font-black text-xs uppercase tracking-wider transition-all hover:brightness-110 cursor-pointer"
              >
                Go to Tournament
              </button>
              <button
                onClick={() => setTournamentInvite(null)}
                className="px-4 py-2 rounded-xl border border-white/20 text-slate-400 hover:text-white text-xs font-bold cursor-pointer transition-all"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
