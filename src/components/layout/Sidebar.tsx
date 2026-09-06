import React, { useState, useMemo } from 'react';
import { GamePhase } from '../../types/game';
import { AscensionTab } from '../ascension/AscensionHub';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../audio/soundManager';
import {
  Home, Users, Dna,
  Crown, Award, Target, CheckCircle2, Star,
  ShoppingBag, Hammer, Coins, Package, RotateCcw,
  Trophy, HelpCircle, ShieldAlert,
  ChevronLeft, ChevronRight, X
} from 'lucide-react';

export interface SidebarProps {
  currentPhase: GamePhase;
  ascensionTab?: AscensionTab;
  onNavigatePhase: (phase: GamePhase) => void;
  onNavigateAscensionTab: (tab: AscensionTab) => void;
  onHomeClick: () => void;
  onOpenHowToPlayModal?: () => void;
  onOpenPlaygroundModal?: () => void;
  onOpenAIAssistant?: () => void;
  isMobileOpen?: boolean;
  onToggleMobile?: () => void;
}

interface NavItemDef {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  isActive: boolean;
  badge?: number | string;
  badgeColor?: string;
  tooltipText: string;
}

interface NavCategoryDef {
  title: string;
  items: NavItemDef[];
}

export function Sidebar({
  currentPhase,
  ascensionTab = 'HOME',
  onNavigatePhase,
  onNavigateAscensionTab,
  onHomeClick,
  onOpenHowToPlayModal,
  isMobileOpen = false,
  onToggleMobile,
}: SidebarProps) {
  const { user } = useAuth();

  // Collapsed state persisted in localStorage
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('marvel_sidebar_collapsed');
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  const toggleCollapse = () => {
    soundManager.playClick();
    setIsCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('marvel_sidebar_collapsed', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const unreadMissionsCount = useMemo(() => {
    return (user?.dailyMissions || []).filter(m => m.isCompleted && !m.isClaimed).length;
  }, [user?.dailyMissions]);

  const wheelSpinsCount = user?.wheelSpins || 0;
  const isAdmin = user?.role === 'admin' && user?.isAdmin === true;

  // Build navigation items categories
  // STRICT RULE: The following 8 items MUST NOT APPEAR ANYWHERE:
  // 1. Redeem, 2. Crates, 3. Ranked Arena, 4. Custom Match Room,
  // 5. Dungeons, 6. Auction Arenas, 7. Relic Vault, 8. Skill Vault.
  const categories: NavCategoryDef[] = useMemo(() => {
    return [
      {
        title: 'COMMAND',
        items: [
          {
            id: 'home',
            label: 'Command HQ',
            icon: Home,
            action: () => {
              soundManager.playClick();
              onHomeClick();
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'HOME',
            tooltipText: 'Command Center Home',
          },
        ],
      },
      {
        title: 'COMBAT',
        items: [
          {
            id: 'synergies',
            label: '🧬 Synergies',
            icon: Dna,
            action: () => {
              soundManager.playClick();
              onNavigatePhase('SYNERGIES');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'SYNERGIES',
            badge: '300',
            badgeColor: 'bg-purple-600 text-white font-mono',
            tooltipText: '300 Character Synergies Archive',
          },
          {
            id: 'team_builder',
            label: 'Team Builder',
            icon: Users,
            action: () => {
              soundManager.playClick();
              onNavigateAscensionTab('TEAM_BUILDER');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'ASCENSION' && ascensionTab === 'TEAM_BUILDER',
            tooltipText: 'Team Builder & Synergies',
          },
        ],
      },
      {
        title: 'PROGRESSION',
        items: [
          {
            id: 'battle_pass',
            label: 'Battle Pass',
            icon: Crown,
            action: () => {
              soundManager.playClick();
              onNavigateAscensionTab('BATTLE_PASS');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'ASCENSION' && ascensionTab === 'BATTLE_PASS',
            badge: 'S1',
            badgeColor: 'bg-amber-500 text-black',
            tooltipText: 'Season 1 Battle Pass',
          },
          {
            id: 'level_rewards',
            label: 'Level Rewards',
            icon: Award,
            action: () => {
              soundManager.playClick();
              onNavigateAscensionTab('LEVEL_REWARDS');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'ASCENSION' && ascensionTab === 'LEVEL_REWARDS',
            tooltipText: 'Commander Level Milestones',
          },
          {
            id: 'missions',
            label: 'Missions',
            icon: Target,
            action: () => {
              soundManager.playClick();
              onNavigateAscensionTab('MISSIONS');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'ASCENSION' && ascensionTab === 'MISSIONS',
            badge: unreadMissionsCount > 0 ? unreadMissionsCount : undefined,
            badgeColor: 'bg-red-500 text-white',
            tooltipText: 'Daily & Weekly Operations',
          },
          {
            id: 'achievements',
            label: 'Achievements',
            icon: CheckCircle2,
            action: () => {
              soundManager.playClick();
              onNavigateAscensionTab('ACHIEVEMENTS');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'ASCENSION' && ascensionTab === 'ACHIEVEMENTS',
            tooltipText: 'Milestone Achievements',
          },
          {
            id: 'hero_mastery',
            label: 'Hero Mastery',
            icon: Star,
            action: () => {
              soundManager.playClick();
              onNavigateAscensionTab('MASTERY');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'ASCENSION' && ascensionTab === 'MASTERY',
            tooltipText: 'Hero Mastery Tiers',
          },
        ],
      },
      {
        title: 'ARSENAL',
        items: [
          {
            id: 'astra_shop',
            label: 'Astra Shop',
            icon: ShoppingBag,
            action: () => {
              soundManager.playClick();
              onNavigatePhase('SHOP');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'SHOP',
            tooltipText: 'Astra Character Shop',
          },
          {
            id: 'card_forge',
            label: 'Card Forge',
            icon: Hammer,
            action: () => {
              soundManager.playClick();
              onNavigateAscensionTab('CARD_FORGE');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'ASCENSION' && ascensionTab === 'CARD_FORGE',
            tooltipText: 'Card Crafting Forge',
          },
          {
            id: 'token_forge',
            label: 'Token Forge',
            icon: Coins,
            action: () => {
              soundManager.playClick();
              onNavigateAscensionTab('TOKEN_FORGE');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'ASCENSION' && ascensionTab === 'TOKEN_FORGE',
            tooltipText: 'Hero Token Exchange',
          },
          {
            id: 'inventory',
            label: 'Inventory',
            icon: Package,
            action: () => {
              soundManager.playClick();
              onNavigatePhase('INVENTORY');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'INVENTORY' || (currentPhase === 'ASCENSION' && ascensionTab === 'INVENTORY'),
            tooltipText: 'Inventory & Armory',
          },
          {
            id: 'mystery_wheel',
            label: 'Mystery Wheel',
            icon: RotateCcw,
            action: () => {
              soundManager.playClick();
              onNavigateAscensionTab('MYSTERY_WHEEL');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'ASCENSION' && ascensionTab === 'MYSTERY_WHEEL',
            badge: wheelSpinsCount > 0 ? wheelSpinsCount : undefined,
            badgeColor: 'bg-pink-500 text-white',
            tooltipText: 'Cosmic Prize Wheel',
          },
        ],
      },
      {
        title: 'INTEL',
        items: [
          {
            id: 'leaderboards',
            label: 'Leaderboards',
            icon: Trophy,
            action: () => {
              soundManager.playClick();
              onNavigateAscensionTab('LEADERBOARDS');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'ASCENSION' && ascensionTab === 'LEADERBOARDS',
            tooltipText: 'Global Rankings',
          },
          {
            id: 'rules_manual',
            label: 'Rules & Guide',
            icon: HelpCircle,
            action: () => {
              soundManager.playClick();
              if (onOpenHowToPlayModal) onOpenHowToPlayModal();
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: false,
            tooltipText: 'Rules & Combat Manual',
          },
          ...(isAdmin ? [{
            id: 'admin_panel',
            label: 'Admin Panel',
            icon: ShieldAlert,
            action: () => {
              soundManager.playClick();
              onNavigateAscensionTab('ADMIN');
              if (onToggleMobile && isMobileOpen) onToggleMobile();
            },
            isActive: currentPhase === 'ASCENSION' && ascensionTab === 'ADMIN',
            badge: 'OPS',
            badgeColor: 'bg-rose-900 text-rose-200',
            tooltipText: 'Master Operations Panel',
          }] : []),
        ],
      },
    ];
  }, [
    currentPhase, ascensionTab, unreadMissionsCount, wheelSpinsCount,
    isAdmin, onHomeClick, onNavigateAscensionTab, onNavigatePhase,
    onOpenHowToPlayModal, onToggleMobile, isMobileOpen
  ]);

  const sidebarContent = (
    <aside
      className={`relative sticky top-[58px] h-[calc(100vh-58px)] flex flex-col justify-between select-none bg-[#07080B] border-r border-white/[0.08] shadow-[4px_0_30px_rgba(0,0,0,0.85)] z-40 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-[68px]' : 'w-[240px]'
      }`}
    >
      {/* Subtle Cinematic Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-red-950/10 via-transparent to-black/40" />

      {/* 1. TOP HEADER: Navigation & Collapse Control */}
      <div className={`relative z-10 flex items-center border-b border-white/[0.08] min-h-[50px] ${
        isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3.5 py-2.5'
      }`}>
        {!isCollapsed && (
          <span className="font-heading font-black text-[11px] tracking-[0.2em] uppercase text-amber-400/90 truncate select-none">
            NAVIGATION
          </span>
        )}
        <button
          type="button"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          className="p-1.5 rounded-lg bg-[#11141C] border border-white/10 hover:border-amber-400/50 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0 group"
          title={isCollapsed ? 'Expand Navigation' : 'Collapse Navigation'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
          )}
        </button>
      </div>

      {/* 2. MIDDLE SECTION: Categorized Navigation Items */}
      <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-2 px-2 space-y-4">
        {categories.map((cat, catIdx) => (
          <div key={cat.title} className="space-y-1">
            {/* Category Header */}
            {!isCollapsed ? (
              <div className="px-2.5 py-1 text-[9px] font-heading font-black tracking-[0.22em] text-slate-500 uppercase">
                {cat.title}
              </div>
            ) : (
              catIdx > 0 && <div className="h-px bg-white/[0.06] my-2 mx-2" />
            )}

            {/* Category Item List */}
            <div className="space-y-0.5">
              {cat.items.map(item => {
                const ItemIcon = item.icon;
                return (
                  <div key={item.id} className="relative group/item">
                    <button
                      type="button"
                      onClick={item.action}
                      className={`group relative flex w-full items-center rounded-xl transition-all cursor-pointer ${
                        isCollapsed
                          ? 'justify-center p-2.5'
                          : 'gap-2.5 px-3 py-2 text-left'
                      } ${
                        item.isActive
                          ? 'bg-gradient-to-r from-red-950/60 via-white/[0.04] to-transparent text-white font-black border-l-2 border-[#E62429] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.05] border-l-2 border-transparent'
                      }`}
                    >
                      {/* Icon */}
                      <ItemIcon
                        className={`w-4 h-4 shrink-0 transition-all ${
                          item.isActive
                            ? 'text-amber-400 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                            : 'text-slate-400 group-hover/item:text-slate-200'
                        }`}
                      />

                      {/* Label & Badges (Expanded Mode) */}
                      {!isCollapsed && (
                        <>
                          <span className="text-[11px] font-heading font-bold uppercase tracking-wider truncate flex-1">
                            {item.label}
                          </span>
                          {item.badge != null && (
                            <span
                              className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded-full leading-tight shrink-0 ${
                                item.badgeColor || 'bg-amber-400 text-black'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>

                    {/* Tooltip on Hover (Collapsed Mode) */}
                    {isCollapsed && (
                      <div className="pointer-events-none fixed left-[76px] hidden group-hover/item:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#12151F] border border-white/20 text-white text-xs font-heading font-black uppercase tracking-wider shadow-[0_10px_30px_rgba(0,0,0,0.9)] whitespace-nowrap z-[100] animate-fadeIn">
                        <span>{item.tooltipText}</span>
                        {item.badge != null && (
                          <span
                            className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded-full leading-tight ${
                              item.badgeColor || 'bg-amber-400 text-black'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 3. BOTTOM SECTION: Dedicated Collapse / Expand Footer */}
      <div className="relative z-10 border-t border-white/[0.08] bg-[#0A0C12] p-2">
        <button
          type="button"
          onClick={toggleCollapse}
          className={`w-full flex items-center rounded-xl bg-[#11141C] border border-white/10 hover:border-amber-400/50 text-slate-400 hover:text-white transition-all cursor-pointer py-2 ${
            isCollapsed ? 'justify-center px-2' : 'justify-center gap-2 px-3'
          }`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-amber-400" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 text-slate-400" />
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-300">
                Collapse Menu
              </span>
            </>
          )}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Persistent Left Sidebar */}
      <div className="hidden lg:block shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile Slide-Out Drawer Overlay (Triggered by Top Header Hamburger) */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fadeIn"
            onClick={onToggleMobile}
          />
          {/* Drawer Sidebar */}
          <div className="relative z-10 w-[270px] h-full shadow-2xl animate-slideRight bg-[#07080B] flex flex-col border-r border-white/10">
            {/* Drawer Header with Close Button */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.08] bg-[#0A0C12]">
              <span className="text-xs font-heading font-black tracking-[0.2em] uppercase text-amber-400">
                NAVIGATION
              </span>
              <button
                type="button"
                onClick={onToggleMobile}
                className="p-1.5 rounded-lg bg-[#11141C] border border-white/10 text-slate-300 hover:text-white cursor-pointer"
                title="Close Navigation"
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>
            {/* Drawer Nav List (Expanded Mode) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar py-2 px-2 space-y-4">
              {categories.map((cat) => (
                <div key={cat.title} className="space-y-1">
                  <div className="px-2.5 py-1 text-[9px] font-heading font-black tracking-[0.22em] text-slate-500 uppercase">
                    {cat.title}
                  </div>
                  <div className="space-y-0.5">
                    {cat.items.map(item => {
                      const ItemIcon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={item.action}
                          className={`group relative flex w-full items-center gap-2.5 px-3 py-2 text-left rounded-xl transition-all cursor-pointer ${
                            item.isActive
                              ? 'bg-gradient-to-r from-red-950/60 via-white/[0.04] to-transparent text-white font-black border-l-2 border-[#E62429] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.05] border-l-2 border-transparent'
                          }`}
                        >
                          <ItemIcon
                            className={`w-4 h-4 shrink-0 transition-all ${
                              item.isActive
                                ? 'text-amber-400 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                                : 'text-slate-400 group-hover:text-slate-200'
                            }`}
                          />
                          <span className="text-[11px] font-heading font-bold uppercase tracking-wider truncate flex-1">
                            {item.label}
                          </span>
                          {item.badge != null && (
                            <span
                              className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded-full leading-tight shrink-0 ${
                                item.badgeColor || 'bg-amber-400 text-black'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
