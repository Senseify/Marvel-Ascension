import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../audio/soundManager';
import {
  Bell, X, CheckCheck, Sparkles, Trophy, Calendar, ShieldAlert,
  Award, ArrowRight, Zap, Gift, Check, Clock
} from 'lucide-react';
import { Announcement, GameEvent } from '../../types/game';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  announcements?: Announcement[];
  events?: GameEvent[];
  onNavigateToTab?: (tab: string) => void;
}

type NotificationCategory = 'ALL' | 'REWARDS' | 'EVENTS' | 'SYSTEM' | 'RANK';

interface NotificationItem {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
  isRead: boolean;
  actionLabel?: string;
  actionTab?: string;
  badge?: string;
}

export function NotificationCenterModal({
  isOpen,
  onClose,
  announcements = [],
  events = [],
  onNavigateToTab,
}: Props) {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory>('ALL');
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  // Generate real notifications based on player state and server announcements
  const notifications = useMemo<NotificationItem[]>(() => {
    const list: NotificationItem[] = [];

    // 1. Daily Login Claim Reward
    if (user?.canClaimDailyLogin) {
      list.push({
        id: 'daily-claim-ready',
        category: 'REWARDS',
        title: 'Daily Coin Drop Ready',
        description: `Your Day ${user.dailyLoginStreak + 1} daily login reward is ready to claim! Keep your streak active.`,
        time: 'Today',
        icon: <Gift className="w-4 h-4 text-amber-400" />,
        iconBg: 'bg-amber-950/80 border-amber-500/40',
        isRead: readIds.has('daily-claim-ready'),
        actionLabel: 'Claim in Ascension',
        actionTab: 'HOME',
        badge: 'READY',
      });
    }

    // 2. Unclaimed Missions
    const unclaimedDaily = (user?.dailyMissions || []).filter(m => m.isCompleted && !m.isClaimed).length;
    const unclaimedWeekly = (user?.weeklyMissions || []).filter(m => m.isCompleted && !m.isClaimed).length;
    if (unclaimedDaily + unclaimedWeekly > 0) {
      list.push({
        id: 'missions-claimable',
        category: 'REWARDS',
        title: `${unclaimedDaily + unclaimedWeekly} Quest Rewards Ready`,
        description: 'You have completed combat objectives. Collect your Astra coins, shards, and Commander XP.',
        time: 'Active',
        icon: <Trophy className="w-4 h-4 text-purple-400" />,
        iconBg: 'bg-purple-950/80 border-purple-500/40',
        isRead: readIds.has('missions-claimable'),
        actionLabel: 'Collect Rewards',
        actionTab: 'MISSIONS',
        badge: `${unclaimedDaily + unclaimedWeekly} CLAIMABLE`,
      });
    }

    // 3. Free Mystery Wheel Spins
    if ((user?.wheelSpins || 0) > 0) {
      list.push({
        id: 'wheel-spins-ready',
        category: 'REWARDS',
        title: `${user?.wheelSpins} Cosmic Wheel Spin${(user?.wheelSpins || 0) > 1 ? 's' : ''} Available`,
        description: 'Test your luck on the Mystery Wheel for bonus Astra coins, hero shards, and relics.',
        time: 'Ready',
        icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
        iconBg: 'bg-cyan-950/80 border-cyan-500/40',
        isRead: readIds.has('wheel-spins-ready'),
        actionLabel: 'Spin Wheel',
        actionTab: 'MYSTERY_WHEEL',
      });
    }

    // 4. Server Announcements
    announcements.forEach((ann) => {
      list.push({
        id: `ann-${ann.id}`,
        category: 'SYSTEM',
        title: ann.title,
        description: ann.content,
        time: ann.createdAt ? new Date(ann.createdAt).toLocaleDateString() : 'Recent',
        icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />,
        iconBg: 'bg-emerald-950/80 border-emerald-500/40',
        isRead: readIds.has(`ann-${ann.id}`),
        badge: ann.priority ? ann.priority.toUpperCase() : undefined,
      });
    });

    // 5. Active Events
    events.forEach((ev) => {
      list.push({
        id: `event-${ev.id}`,
        category: 'EVENTS',
        title: ev.title,
        description: ev.description,
        time: 'Live Event',
        icon: <Calendar className="w-4 h-4 text-amber-300" />,
        iconBg: 'bg-amber-950/80 border-amber-500/40',
        isRead: readIds.has(`event-${ev.id}`),
        badge: 'ACTIVE EVENT',
      });
    });

    // 6. Ranked Status
    if (user?.rankedTier && user.rankedTier !== 'UNRANKED') {
      list.push({
        id: 'ranked-tier-update',
        category: 'RANK',
        title: `Competitive Rank: ${user.rankedTier} ${user.rankedDivision || ''}`,
        description: `Current rating at ${(user.rankedRating || 0).toLocaleString()} MMR. Compete in Ranked 1v1 Arena to climb into Top 50.`,
        time: 'Season 1',
        icon: <Award className="w-4 h-4 text-purple-300" />,
        iconBg: 'bg-purple-950/80 border-purple-500/40',
        isRead: readIds.has('ranked-tier-update'),
        actionLabel: 'View Ladder',
        actionTab: 'LEADERBOARDS',
      });
    } else {
      list.push({
        id: 'ranked-placements',
        category: 'RANK',
        title: 'Ranked Placement Matches Available',
        description: `Complete ${10 - (user?.placementMatchesPlayed || 0)} more placement matches to calibrate your official season ranking.`,
        time: 'Season 1',
        icon: <Award className="w-4 h-4 text-slate-400" />,
        iconBg: 'bg-[#12141C] border-white/10',
        isRead: readIds.has('ranked-placements'),
        actionLabel: 'Enter Ranked Arena',
        actionTab: 'BATTLE',
      });
    }

    return list;
  }, [user, announcements, events, readIds]);

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter(
    n => selectedCategory === 'ALL' || n.category === selectedCategory
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    soundManager.playClick();
    const allIds = new Set(notifications.map(n => n.id));
    setReadIds(allIds);
  };

  const handleItemClick = (item: NotificationItem) => {
    soundManager.playClick();
    setReadIds(prev => new Set(prev).add(item.id));
    if (item.actionTab && onNavigateToTab) {
      onNavigateToTab(item.actionTab);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-2xl bg-[#0E1017] border border-white/[0.09] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.08] bg-[#0A0C14]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-heading font-black text-white uppercase tracking-wider">
                  NOTIFICATION CENTER
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[9px] font-black tracking-wide shadow-sm">
                    {unreadCount} NEW
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Live battle updates, system announcements, and reward drops
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#141722] hover:bg-[#1C2030] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-bold transition cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mark All Read</span>
              </button>
            )}

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
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 p-2.5 border-b border-white/[0.07] bg-[#0A0C14]/60 overflow-x-auto">
          {(['ALL', 'REWARDS', 'EVENTS', 'SYSTEM', 'RANK'] as NotificationCategory[]).map(cat => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-heading font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'btn-primary-cinematic'
                  : 'bg-[#12141C] text-slate-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notifications Scroll List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredNotifications.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#12141C] border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                <Bell className="w-5 h-5 opacity-40" />
              </div>
              <h4 className="font-heading font-black text-sm text-slate-300 uppercase">
                ALL CAUGHT UP
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No active notifications in this channel. Check back after battles or events!
              </p>
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`group p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  item.isRead
                    ? 'bg-[#12141C]/60 border-white/[0.05] opacity-75 hover:opacity-100 hover:border-white/15'
                    : 'bg-[#12141C] border-white/[0.1] hover:border-purple-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  {/* Icon Badge */}
                  <div className={`p-2.5 rounded-xl border shrink-0 ${item.iconBg} shadow-sm group-hover:scale-105 transition-transform`}>
                    {item.icon}
                  </div>

                  {/* Body */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-heading font-black text-xs sm:text-sm text-white uppercase tracking-wide truncate">
                        {item.title}
                      </h4>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/40 text-[9px] font-black uppercase text-purple-300 tracking-wider">
                          {item.badge}
                        </span>
                      )}
                      {!item.isRead && (
                        <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_#EF4444]" />
                      )}
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono pt-0.5">
                      <Clock className="w-3 h-3 text-slate-600" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                {item.actionLabel && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick(item);
                    }}
                    className="btn-gold-cinematic shrink-0 px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer mt-2 sm:mt-0"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-white/[0.08] bg-[#0A0C14] flex items-center justify-between text-xs text-slate-500">
          <span>Marvel Ascension Communications Hub</span>
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
