import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../audio/soundManager';
import { CheckCircle, Clock, Sparkles, Target, Calendar, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { ShardIcon } from '../common/ShardIcon';

const EVENT_LABELS: Record<string, string> = {
  battle_win: 'Win Battles',
  battle_play: 'Play Battles',
  ranked_play: 'Play Ranked',
  ranked_win: 'Win Ranked',
  dungeon_wave: 'Clear Dungeon Waves',
  dungeon_complete: 'Complete Dungeons',
  buy_char: 'Purchase Characters',
  open_crate: 'Open Crates',
  spin_wheel: 'Spin the Wheel',
  card_forge: 'Craft in Forge',
};

function MissionCard({ mission, onClaim, isClaiming }: { mission: any; onClaim: (id: string) => void; isClaiming: boolean }) {
  const progressPct = Math.min(100, Math.round((mission.progress / mission.target) * 100));
  const isCompleted = mission.progress >= mission.target;

  const rewardColors: Record<string, string> = {
    astra: 'text-cyan-400',
    cardShards: 'text-indigo-400',
    xp: 'text-green-400',
  };
  const rewardColor = rewardColors[mission.rewardType as string] || 'text-slate-300';

  const rewardIcons: Record<string, string> = {
    astra: '✨',
    cardShards: '🔷',
    xp: '⭐',
  };
  const rewardIcon = rewardIcons[mission.rewardType as string] || '🎁';

  return (
    <div className={`rounded-xl border p-4 transition-all ${
      mission.isClaimed
        ? 'border-white/[0.04] bg-[#07080B]/50 opacity-50'
        : isCompleted
        ? 'border-amber-400/40 bg-[#12141C] shadow-lg shadow-amber-400/5'
        : 'border-white/[0.08] bg-[#0E1017]'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {mission.isClaimed ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : isCompleted ? (
              <div className="w-4 h-4 rounded-full bg-amber-400 flex-shrink-0 animate-pulse" />
            ) : (
              <Target className="w-4 h-4 text-slate-400 flex-shrink-0" />
            )}
            <span className="font-heading font-black text-white text-sm truncate">{mission.title}</span>
          </div>
          <div className="text-xs text-slate-400 mb-3">{mission.description}</div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">{EVENT_LABELS[mission.eventType] || mission.eventType}</span>
              <span className={isCompleted ? 'text-amber-400 font-bold font-mono' : 'text-slate-400 font-mono'}>
                {mission.progress} / {mission.target}
              </span>
            </div>
            <div className="h-1.5 bg-[#07080B] rounded-full overflow-hidden border border-white/[0.04]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted ? 'bg-amber-400' : 'bg-slate-600'
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className={`text-sm font-black font-mono ${rewardColor}`}>
            {mission.rewardType === 'cardShards' ? <ShardIcon sourceId={mission.missionId} amount={mission.rewardAmount} /> : `${rewardIcon} ${mission.rewardAmount.toLocaleString()}`}
          </div>
          {!mission.isClaimed && isCompleted && (
            <button
              onClick={() => onClaim(mission.missionId)}
              disabled={isClaiming}
              className="btn-gold-cinematic px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
            >
              {isClaiming ? '...' : 'Claim'}
            </button>
          )}
          {mission.isClaimed && (
            <span className="text-xs text-emerald-400 font-bold font-mono">Claimed ✓</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function DailyMissions() {
  const { user, getDailyMissions, claimDailyMission, getWeeklyChallenges, claimWeeklyChallenge } = useAuth();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const dailyMissions = user?.dailyMissions || [];
  const weeklyMissions = user?.weeklyMissions || [];

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 4000);
  };

  useEffect(() => {
    getDailyMissions();
    getWeeklyChallenges();
  }, []);

  const handleClaimDaily = async (missionId: string) => {
    setClaimingId(missionId);
    const data = await claimDailyMission(missionId);
    setClaimingId(null);
    if (data.success) {
      soundManager.playVictoryFanfare();
      const label = data.rewardType === 'astra' ? '✨ ASTRA' : data.rewardType === 'cardShards' ? 'category-specific shards' : '⭐ XP';
      showToast('success', `Mission claimed! +${data.rewardAmount?.toLocaleString()} ${label}`);
    } else {
      soundManager.playAttackHit();
      showToast('error', data.error || 'Failed to claim.');
    }
  };

  const handleClaimWeekly = async (missionId: string) => {
    setClaimingId(missionId);
    const data = await claimWeeklyChallenge(missionId);
    setClaimingId(null);
    if (data.success) {
      soundManager.playVictoryFanfare();
      const label = data.rewardType === 'astra' ? '✨ ASTRA' : data.rewardType === 'cardShards' ? 'category-specific shards' : '⭐ XP';
      showToast('success', `Challenge claimed! +${data.rewardAmount?.toLocaleString()} ${label}`);
    } else {
      soundManager.playAttackHit();
      showToast('error', data.error || 'Failed to claim.');
    }
  };

  // Progress counts
  const dailyCompleted = dailyMissions.filter(m => m.isClaimed).length;
  const weeklyCompleted = weeklyMissions.filter(m => m.isClaimed).length;

  // Time remaining until reset
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const hoursLeft = Math.floor((midnight.getTime() - now.getTime()) / 3600000);
  const minLeft = Math.floor(((midnight.getTime() - now.getTime()) % 3600000) / 60000);

  const dayOfWeek = now.getDay();
  const daysUntilSunday = (7 - dayOfWeek) % 7 || 7;
  const weekDaysLeft = daysUntilSunday;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast */}
      {toastMsg && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl font-bold text-sm shadow-2xl flex items-center gap-2 ${
          toastMsg.type === 'success' ? 'bg-emerald-900 border border-emerald-500 text-emerald-200' : 'bg-red-900 border border-red-500 text-red-200'
        }`}>
          {toastMsg.text}
        </div>
      )}

      {/* Header */}
      <div className="rounded-2xl p-6 bg-[#0E1017] border border-white/[0.08] overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-heading font-black text-white uppercase tracking-wider flex items-center gap-3">
              <Target className="w-6 h-6 text-amber-400" /> Missions & Challenges
            </h1>
            <p className="text-slate-400 text-sm mt-1">Complete tasks to earn Astra, Card Shards, and XP</p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="text-center p-2 rounded-xl bg-[#07080B] border border-white/[0.06] min-w-[80px]">
              <div className="text-xl font-black text-amber-400 font-mono">{dailyCompleted}/{dailyMissions.length}</div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">Daily Done</div>
            </div>
            <div className="text-center p-2 rounded-xl bg-[#07080B] border border-white/[0.06] min-w-[80px]">
              <div className="text-xl font-black text-amber-400 font-mono">{weeklyCompleted}/{weeklyMissions.length}</div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">Weekly Done</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 bg-[#07080B] p-1.5 rounded-xl border border-white/[0.06]">
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'daily'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" /> Daily
            <span className="text-[11px] font-mono opacity-80">({hoursLeft}h {minLeft}m left)</span>
          </span>
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'weekly'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" /> Weekly
            <span className="text-[11px] font-mono opacity-80">({weekDaysLeft}d left)</span>
          </span>
        </button>
      </div>

      {/* Missions */}
      <div className="space-y-3">
        {activeTab === 'daily' && (
          dailyMissions.length > 0 ? (
            dailyMissions.map(m => (
              <MissionCard
                key={m.missionId}
                mission={m}
                onClaim={handleClaimDaily}
                isClaiming={claimingId === m.missionId}
              />
            ))
          ) : (
            <div className="text-center py-10 text-slate-500">
              <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Loading daily missions...</p>
            </div>
          )
        )}

        {activeTab === 'weekly' && (
          weeklyMissions.length > 0 ? (
            weeklyMissions.map(m => (
              <MissionCard
                key={m.missionId}
                mission={m}
                onClaim={handleClaimWeekly}
                isClaiming={claimingId === m.missionId}
              />
            ))
          ) : (
            <div className="text-center py-10 text-slate-500">
              <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Loading weekly challenges...</p>
            </div>
          )
        )}
      </div>

      {/* Mission Tips */}
      <div className="rounded-xl p-4 bg-[#0E1017] border border-white/[0.08] text-xs text-slate-400 space-y-1">
        <div className="font-bold text-amber-400 mb-2 font-mono uppercase text-[11px]">How Missions Work</div>
        <p>• Daily missions refresh every midnight. Complete all 5 for bonus rewards!</p>
        <p>• Weekly challenges reset every Sunday. Higher rewards but harder targets.</p>
        <p>• Mission progress is tracked automatically as you play the game.</p>
        <p>• Unclaimed rewards expire when missions reset — claim them in time!</p>
      </div>
    </div>
  );
}
