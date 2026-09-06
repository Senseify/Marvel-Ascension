import React, { useEffect, useState } from 'react';
import {
  Activity, Gift, LayoutDashboard, Search, ShieldAlert, Users, X,
  Swords, Flame, Sparkles, Coins, Megaphone, Calendar, Server,
  CheckCircle2, RefreshCw, AlertTriangle, Trash2, Plus, Clock,
  Sliders, Eye, ArrowUpRight, TrendingUp, Radio, Cpu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminActionLog, RedeemCode, Announcement, GameEvent } from '../../types/game';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { soundManager } from '../../audio/soundManager';

type Section = 
  | 'dashboard' 
  | 'players' 
  | 'battles' 
  | 'dungeon' 
  | 'battlepass' 
  | 'economy' 
  | 'announcements' 
  | 'events' 
  | 'server' 
  | 'codes' 
  | 'activity' 
  | 'danger';

const card = 'rounded-2xl border border-white/10 bg-slate-900/80 shadow-xl backdrop-blur-md';
const input = 'w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs sm:text-sm text-white outline-none focus:border-cyan-400 transition-colors';

export const AscensionAdminPanel: React.FC = () => {
  const {
    user, fetchAdminStats, fetchAdminPlayers, fetchAdminPlayerDetail,
    adminApplyPlayerAction, adminDeletePlayer, fetchAdminActivity, fetchAdminCodes,
    createAdminCode, toggleAdminCode, deleteAdminCode,
    fetchAdminServerStatus, fetchAdminBattles, fetchAdminDungeonStats,
    fetchAdminBattlePassStats, fetchAdminEconomyStats,
    fetchAdminAnnouncements, saveAdminAnnouncement, deleteAdminAnnouncement,
    fetchAdminEvents, saveAdminEvent, deleteAdminEvent,
    adminDangerResetLadder, adminDangerResetDungeon, adminDangerPurgeGuests
  } = useAuth();

  const [section, setSection] = useState<Section>('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [serverStatus, setServerStatus] = useState<any>(null);
  const [battlesData, setBattlesData] = useState<any>(null);
  const [dungeonStats, setDungeonStats] = useState<any>(null);
  const [battlePassStats, setBattlePassStats] = useState<any>(null);
  const [economyStats, setEconomyStats] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<GameEvent[]>([]);
  
  // Players Tab State
  const [players, setPlayers] = useState<any[]>([]);
  const [playerPage, setPlayerPage] = useState(1);
  const [playerTotalPages, setPlayerTotalPages] = useState(1);
  const [playerSearch, setPlayerSearch] = useState('');
  const [playerFilterRank, setPlayerFilterRank] = useState('ALL');
  const [selected, setSelected] = useState<any>(null);
  const [details, setDetails] = useState<any>(null);

  // Activity & Codes State
  const [logs, setLogs] = useState<AdminActionLog[]>([]);
  const [activityFilter, setActivityFilter] = useState('');
  const [codes, setCodes] = useState<RedeemCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Player Moderation Action State
  const [action, setAction] = useState('grant_astra');
  const [amount, setAmount] = useState(5000);
  const [actionCharacter, setActionCharacter] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  // Code Creator State
  const [newCode, setNewCode] = useState({ astraReward: 5000, maxUses: 100, expiresAt: '2026-12-31', code: '' });
  const [codeRewardType, setCodeRewardType] = useState<'ASTRA' | 'CHARACTER' | 'SHARD' | 'CRATE'>('ASTRA');
  const [codeCharacter, setCodeCharacter] = useState('');
  const [codeShardCategory, setCodeShardCategory] = useState('RARE');
  const [codeCrateType, setCodeCrateType] = useState('SHARD_CRATE_RARE');

  // Announcement Creator State
  const [newAnn, setNewAnn] = useState({
    id: '',
    title: '',
    content: '',
    category: 'UPDATE' as Announcement['category'],
    priority: 'HIGH' as Announcement['priority'],
    scheduledAt: '',
    expiresAt: '',
    isPublished: true
  });

  // Event Creator State
  const [newEvent, setNewEvent] = useState({
    id: '',
    title: '',
    description: '',
    bannerType: 'DOUBLE_XP' as GameEvent['bannerType'],
    multiplier: 2.0,
    durationDays: 3,
    startTime: '',
    endTime: '',
    rewardsXp: 0,
    rewardsAstra: 0,
    rewardsShards: 0,
    isActive: true
  });

  // Danger Zone Confirmation State
  const [dangerConfirmText, setDangerConfirmText] = useState('');
  const [dangerModalAction, setDangerModalAction] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin' && user.isAdmin;

  // Refresh data across sections
  const refresh = async () => {
    if (!isAdmin) { setLoading(false); return; }
    setLoading(true);
    setError('');
    
    try {
      const [statsRes, codeRes, activityRes] = await Promise.all([
        fetchAdminStats(), fetchAdminCodes(), fetchAdminActivity(100),
      ]);
      if (statsRes.success) setStats(statsRes.stats);
      if (codeRes.success) setCodes(codeRes.codes || []);
      if (activityRes.success) setLogs(activityRes.logs || []);

      // Load section-specific data
      if (section === 'server') {
        const sRes = await fetchAdminServerStatus();
        if (sRes.success) setServerStatus(sRes.serverStatus);
      } else if (section === 'battles') {
        const bRes = await fetchAdminBattles();
        if (bRes.success) setBattlesData(bRes);
      } else if (section === 'dungeon') {
        const dRes = await fetchAdminDungeonStats();
        if (dRes.success) setDungeonStats(dRes);
      } else if (section === 'battlepass') {
        const bpRes = await fetchAdminBattlePassStats();
        if (bpRes.success) setBattlePassStats(bpRes);
      } else if (section === 'economy') {
        const ecoRes = await fetchAdminEconomyStats();
        if (ecoRes.success) setEconomyStats(ecoRes);
      } else if (section === 'announcements') {
        const aRes = await fetchAdminAnnouncements();
        if (aRes.success) setAnnouncements(aRes.announcements || []);
      } else if (section === 'events') {
        const evRes = await fetchAdminEvents();
        if (evRes.success) setEvents(evRes.events || []);
      }
    } catch (e: any) {
      setError(e?.message || 'Error syncing data.');
    } finally {
      setLoading(false);
    }
  };

  const loadPlayers = async (page = playerPage, search = playerSearch) => {
    const result = await fetchAdminPlayers({ page, pageSize: 25, search });
    if (!result.success) { setError(result.error || 'Unable to load players.'); return; }
    setPlayers(result.players || []);
    setPlayerPage(result.page || page);
    setPlayerTotalPages(result.totalPages || 1);
  };

  useEffect(() => { refresh(); }, [isAdmin, section]);
  useEffect(() => { 
    if (isAdmin && (section === 'players' || section === 'danger')) {
      loadPlayers(playerPage, playerSearch);
    }
  }, [isAdmin, section, playerPage]);

  const openPlayer = async (player: any) => {
    soundManager.playClick();
    setSelected(player);
    const result = await fetchAdminPlayerDetail(player.id);
    if (result.success) { setDetails(result); }
    else setError(result.error || 'Unable to load player.');
  };

  const applyAction = async () => {
    if (!selected) return;

    if (action === 'delete_account') {
      const confirmText = window.prompt(`⚠️ CRITICAL: Permanently delete player account @${selected.username} (${details?.player?.displayName || selected.displayName})?\n\nThis will purge all characters, currency, inventory, and stats from the database.\n\nType DELETE to confirm:`);
      if (confirmText !== 'DELETE') {
        setActionMessage('Account deletion aborted. Confirmation text did not match.');
        return;
      }
      soundManager.playClick();
      const result = await adminDeletePlayer(selected.id);
      if (!result.success) { setActionMessage(result.error || 'Failed to delete account.'); return; }
      soundManager.playVictory();
      setSuccessMsg(`Player @${selected.username} account was permanently deleted.`);
      setSelected(null);
      setDetails(null);
      setActionMessage('');
      await Promise.all([refresh(), loadPlayers(1, playerSearch)]);
      return;
    }

    const label = action.replace(/_/g, ' ').toUpperCase();
    const expiry = (document.getElementById('admin-suspension-expiry') as HTMLInputElement | null)?.value;
    const characterName = (details?.characters || []).find((c: any) => c.id === actionCharacter)?.name || actionCharacter;
    const destructive = ['ban_player', 'suspend_player', 'remove_all_inventory', 'remove_character', 'reset_progression'].includes(action);
    
    const promptMsg = `Confirm ${label} for ${selected.username}${characterName && action === 'remove_character' ? ` (${characterName})` : ''}${expiry && action === 'suspend_player' ? ` until ${expiry}` : ''}?${destructive ? ' ⚠️ THIS ACTION IS IRREVERSIBLE AND AUDITED.' : ''}`;
    if (!window.confirm(promptMsg)) return;
    
    if (action === 'suspend_player' && !expiry) { setActionMessage('Choose a suspension expiry first.'); return; }

    const result = await adminApplyPlayerAction(selected.id, action, Number(amount), actionCharacter || undefined, expiry || undefined);
    if (!result.success) { setActionMessage(result.error || 'Action failed.'); return; }
    
    soundManager.playVictory();
    setActionMessage('✅ Operation applied successfully and recorded in immutable audit log.');
    const detail = await fetchAdminPlayerDetail(selected.id);
    if (detail.success) setDetails(detail);
    await Promise.all([refresh(), loadPlayers(playerPage, playerSearch)]);
  };

  const applyModerationAction = async (
    actionType: string,
    options?: { expiry?: string; characterId?: string; promptText?: string }
  ) => {
    if (!selected) return;

    if (actionType === 'delete_account') {
      const confirmText = window.prompt(`⚠️ CRITICAL: Permanently delete player account @${selected.username} (${details?.player?.displayName || selected.displayName})?\n\nThis will purge all characters, currency, inventory, and stats from the database.\n\nType DELETE to confirm:`);
      if (confirmText !== 'DELETE') {
        setActionMessage('Account deletion aborted. Confirmation text did not match.');
        return;
      }
      soundManager.playClick();
      const result = await adminDeletePlayer(selected.id);
      if (!result.success) {
        setActionMessage(`❌ ${result.error || 'Failed to delete account.'}`);
        return;
      }
      soundManager.playVictory();
      setSuccessMsg(`Player @${selected.username} account was permanently deleted.`);
      setSelected(null);
      setDetails(null);
      setActionMessage('');
      await Promise.all([refresh(), loadPlayers(1, playerSearch)]);
      return;
    }

    const label = actionType.replace(/_/g, ' ').toUpperCase();
    const expiry = options?.expiry;
    const characterId = options?.characterId;
    const characterName = (details?.characters || []).find((c: any) => c.id === characterId)?.name || characterId;

    if (actionType === 'suspend_player') {
      if (!expiry || Number.isNaN(new Date(expiry).getTime()) || new Date(expiry).getTime() <= Date.now()) {
        setActionMessage('⚠️ Suspension expiry must be a valid future date and time.');
        return;
      }
    }

    const defaultPrompt = `Confirm ${label} for @${selected.username}${characterName ? ` (${characterName})` : ''}${expiry ? ` until ${new Date(expiry).toLocaleString()}` : ''}?\n\n⚠️ THIS DESTRUCTIVE ACTION IS RECORDED IN THE IMMUTABLE AUDIT LOG.`;
    const promptMsg = options?.promptText || defaultPrompt;
    if (!window.confirm(promptMsg)) return;

    soundManager.playClick();
    const result = await adminApplyPlayerAction(selected.id, actionType, 0, characterId || undefined, expiry || undefined);
    if (!result.success) {
      setActionMessage(`❌ ${result.error || 'Action failed.'}`);
      return;
    }

    soundManager.playVictory();
    setActionMessage(`✅ ${label} successfully executed and recorded in audit log.`);
    const detail = await fetchAdminPlayerDetail(selected.id);
    if (detail.success) setDetails(detail);
    await Promise.all([refresh(), loadPlayers(playerPage, playerSearch)]);
  };

  const createCode = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    const result = await createAdminCode({
      code: newCode.code || undefined,
      astraReward: Number(newCode.astraReward),
      rewardType: codeRewardType,
      rewardAmount: Number(newCode.astraReward),
      characterId: codeRewardType === 'CHARACTER' ? codeCharacter : codeRewardType === 'SHARD' ? codeShardCategory : undefined,
      crateType: codeRewardType === 'CRATE' ? codeCrateType : undefined,
      maxUses: Number(newCode.maxUses),
      expiresAt: newCode.expiresAt,
      isActive: true,
    });
    if (!result.success) setError(result.error || 'Unable to create code.');
    else { 
      soundManager.playVictory();
      setSuccessMsg('Redeem code published successfully!');
      setNewCode({ ...newCode, code: '' }); 
      await refresh(); 
    }
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnn.title.trim() || !newAnn.content.trim()) return;
    soundManager.playClick();
    const res = await saveAdminAnnouncement({
      id: newAnn.id || undefined,
      title: newAnn.title,
      content: newAnn.content,
      category: newAnn.category,
      priority: newAnn.priority,
      scheduledAt: newAnn.scheduledAt ? new Date(newAnn.scheduledAt).getTime() : undefined,
      expiresAt: newAnn.expiresAt ? new Date(newAnn.expiresAt).getTime() : undefined,
      isPublished: newAnn.isPublished
    });
    if (res.success) {
      soundManager.playVictory();
      setSuccessMsg('Announcement published to in-game network!');
      setNewAnn({ id: '', title: '', content: '', category: 'UPDATE', priority: 'HIGH', scheduledAt: '', expiresAt: '', isPublished: true });
      await refresh();
    } else {
      setError(res.error || 'Failed to publish announcement.');
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim() || !newEvent.description.trim()) return;
    soundManager.playClick();
    const now = Date.now();
    const startTime = newEvent.startTime ? new Date(newEvent.startTime).getTime() : now;
    const endTime = newEvent.endTime ? new Date(newEvent.endTime).getTime() : startTime + (newEvent.durationDays * 86400000);
    const res = await saveAdminEvent({
      id: newEvent.id || undefined,
      title: newEvent.title,
      description: newEvent.description,
      bannerType: newEvent.bannerType,
      multiplier: Number(newEvent.multiplier) || 2.0,
      startTime,
      endTime,
      rewards: {
        xp: Number(newEvent.rewardsXp) || 0,
        astra: Number(newEvent.rewardsAstra) || 0,
        shards: Number(newEvent.rewardsShards) || 0
      },
      isActive: newEvent.isActive
    });
    if (res.success) {
      soundManager.playVictory();
      setSuccessMsg('Event broadcasted successfully!');
      setNewEvent({ id: '', title: '', description: '', bannerType: 'DOUBLE_XP', multiplier: 2.0, durationDays: 3, startTime: '', endTime: '', rewardsXp: 0, rewardsAstra: 0, rewardsShards: 0, isActive: true });
      await refresh();
    } else {
      setError(res.error || 'Failed to publish event.');
    }
  };

  const executeDangerAction = async (actionType: string) => {
    if (dangerConfirmText !== 'CONFIRM_DANGER') {
      setError('Confirmation phrase does not match: type CONFIRM_DANGER');
      return;
    }
    soundManager.playClick();
    let res: any;
    if (actionType === 'reset_ladder') {
      res = await adminDangerResetLadder();
    } else if (actionType === 'reset_dungeon') {
      res = await adminDangerResetDungeon();
    } else if (actionType === 'purge_guests') {
      res = await adminDangerPurgeGuests();
    }
    if (res?.success) {
      soundManager.playVictory();
      setSuccessMsg(`Danger action completed! Affected records: ${res.affectedCount ?? res.purgedCount ?? 0}`);
      setDangerModalAction(null);
      setDangerConfirmText('');
      await refresh();
    } else {
      setError(res?.error || 'Danger action failed.');
    }
  };

  if (!isAdmin) {
    return (
      <div className={`${card} mx-auto my-12 max-w-xl p-10 text-center border-rose-500/40 bg-rose-950/30`}>
        <ShieldAlert className="mx-auto mb-4 h-14 w-14 text-rose-400 animate-pulse" />
        <h2 className="text-2xl font-black text-rose-300 uppercase tracking-widest">ACCESS DENIED</h2>
        <p className="mt-2 text-sm text-slate-400">Restricted to Commander darksenseify. Server authorization failed.</p>
      </div>
    );
  }

  const navItems: Array<{ id: Section; label: string; icon: React.ReactNode; badge?: string | number }> = [
    { id: 'dashboard', label: 'Command Center', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'players', label: 'Players', icon: <Users className="h-4 w-4" />, badge: stats?.totalPlayers },
    { id: 'battles', label: 'Battles', icon: <Swords className="h-4 w-4" /> },
    { id: 'dungeon', label: 'Dungeon', icon: <Flame className="h-4 w-4" /> },
    { id: 'battlepass', label: 'Battle Pass', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'economy', label: 'Economy', icon: <Coins className="h-4 w-4" /> },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone className="h-4 w-4" />, badge: stats?.activeAnnouncementsCount },
    { id: 'events', label: 'Events', icon: <Calendar className="h-4 w-4" />, badge: stats?.activeEventsCount },
    { id: 'server', label: 'Server Status', icon: <Server className="h-4 w-4" />, badge: stats?.onlinePlayers ? `${stats.onlinePlayers} ON` : undefined },
    { id: 'codes', label: 'Redeem Codes', icon: <Gift className="h-4 w-4" />, badge: stats?.totalRedeemCodes },
    { id: 'activity', label: 'Activity Log', icon: <Activity className="h-4 w-4" /> },
    { id: 'danger', label: 'Danger Zone', icon: <ShieldAlert className="h-4 w-4 text-rose-400" /> },
  ];

  return (
    <div className="flex min-h-[820px] flex-col gap-5 text-slate-100 lg:flex-row animate-fadeIn">
      {/* 1. LEFT NAVIGATION SIDEBAR */}
      <aside className={`${card} h-fit w-full shrink-0 p-3 lg:w-64 border-cyan-500/30`}>
        <div className="mb-4 border-b border-white/10 px-3 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="text-[10px] font-bold uppercase tracking-[.25em] text-cyan-400">Master Operations</div>
          </div>
          <h2 className="mt-1 text-lg font-black tracking-wide bg-gradient-to-r from-cyan-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
            ASCENSION OPS 2.0
          </h2>
          <div className="mt-1 text-[11px] text-slate-400 font-mono">Operator: @{user?.username}</div>
        </div>

        <nav className="space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { soundManager.playClick(); setSection(item.id); }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider transition-all ${
                section === item.id 
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white font-black shadow-glow-red' 
                  : item.id === 'danger'
                  ? 'text-rose-400 hover:bg-rose-950/40 hover:text-rose-300'
                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge != null && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  section === item.id 
                    ? 'bg-black/40 text-white font-black' 
                    : item.id === 'server'
                    ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                    : 'bg-white/10 text-slate-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => { soundManager.playClick(); refresh(); }} 
          disabled={loading}
          className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-3 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400 transition"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'SYNCING...' : 'SYNC TELEMETRY'}</span>
        </button>
      </aside>

      {/* 2. MAIN SECTION CONTENT */}
      <section className="min-w-0 flex-1 space-y-5">
        
        {/* Universal Section Header */}
        <header className={`${card} flex flex-wrap items-center justify-between gap-3 p-5 border-cyan-500/20`}>
          <div>
            <div className="text-xs font-bold uppercase tracking-[.25em] text-cyan-400 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              Marvel Ascension Operations / {section.toUpperCase()}
            </div>
            <h1 className="mt-1 text-2xl font-black text-white">
              {section === 'dashboard' && 'Operations Command Center'}
              {section === 'players' && 'Commander Directory & Moderation'}
              {section === 'battles' && 'Arena Battles & Tournament Telemetry'}
              {section === 'dungeon' && 'Infinity Dungeon Expeditions'}
              {section === 'battlepass' && 'Battle Pass Progression & Tiers'}
              {section === 'economy' && 'Astra Circulation & Economic Velocity'}
              {section === 'announcements' && 'Broadcast & In-Game Announcements'}
              {section === 'events' && 'Multiverse Events & Buff Engine'}
              {section === 'server' && 'Real-Time Server & Socket Telemetry'}
              {section === 'codes' && 'Redemption Keys & Promo Protocol'}
              {section === 'activity' && 'Immutable Operator Audit Stream'}
              {section === 'danger' && 'Danger Zone — Destructive Overrides'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-xs text-cyan-300 font-mono">
              v4.0.0-PROD
            </span>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-200">
              Commander: <b>{user?.displayName}</b>
            </div>
          </div>
        </header>

        {/* Global Notifications */}
        {error && (
          <div className="rounded-xl border border-rose-500/40 bg-rose-950/70 p-3.5 text-sm text-rose-300 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError('')} className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
          </div>
        )}

        {successMsg && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/70 p-3.5 text-sm text-emerald-300 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg('')} className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
          </div>
        )}

        {/* TAB 1: COMMAND CENTER (DASHBOARD) */}
        {section === 'dashboard' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Players', val: stats?.totalPlayers, sub: `${stats?.onlinePlayers ?? 0} active now`, color: 'text-cyan-300', icon: <Users className="w-5 h-5 text-cyan-400" /> },
                { label: 'Astra in Circulation', val: stats?.totalAstraInCirculation?.toLocaleString(), sub: `Total Earned: ${(stats?.totalAstraEarned || 0).toLocaleString()}`, color: 'text-amber-300', icon: <Coins className="w-5 h-5 text-amber-400" /> },
                { label: 'Total Matches', val: stats?.totalMatches?.toLocaleString(), sub: 'Recorded on server', color: 'text-purple-300', icon: <Swords className="w-5 h-5 text-purple-400" /> },
                { label: 'Crates Opened', val: stats?.totalCratesOpened?.toLocaleString(), sub: `Trades: ${stats?.totalTradesExecuted ?? 0}`, color: 'text-emerald-300', icon: <Sparkles className="w-5 h-5 text-emerald-400" /> },
              ].map(cardItem => (
                <div key={cardItem.label} className={`${card} p-4 flex flex-col justify-between border-white/10 hover:border-cyan-500/30 transition`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-slate-400">{cardItem.label}</span>
                    {cardItem.icon}
                  </div>
                  <div className={`mt-3 text-2xl font-black font-mono ${cardItem.color}`}>{cardItem.val ?? '—'}</div>
                  <div className="mt-1 text-[11px] text-slate-500">{cardItem.sub}</div>
                </div>
              ))}
            </div>

            {/* Quick Overview Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className={`${card} p-5`}>
                <h3 className="font-black text-sm uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Competitive Rank Distribution
                </h3>
                <div className="space-y-2">
                  {Object.entries(stats?.rankDistribution || {}).map(([tier, count]: [string, any]) => (
                    <div key={tier} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                      <span className="font-bold text-slate-300">{tier}</span>
                      <span className="font-mono text-cyan-300 font-bold">{count} players</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${card} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-sm uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Recent Operations
                  </h3>
                  <button onClick={() => setSection('activity')} className="text-xs text-cyan-300 hover:underline">
                    View full audit
                  </button>
                </div>
                <ActivityRows logs={logs.slice(0, 5)} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PLAYERS */}
        {section === 'players' && (
          <div className="space-y-5 animate-fadeIn">
            <div className={`${card} flex flex-wrap gap-2 p-4`}>
              <div className="relative min-w-[220px] flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input 
                  className={`${input} pl-9`} 
                  value={playerSearch} 
                  onChange={e => setPlayerSearch(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && loadPlayers(1, playerSearch)} 
                  placeholder="Search username or display name..." 
                />
              </div>
              <button 
                onClick={() => { soundManager.playClick(); loadPlayers(1, playerSearch); }} 
                className="rounded-xl bg-cyan-500 px-6 py-2 text-xs font-black text-slate-950 hover:bg-cyan-400 transition"
              >
                SEARCH
              </button>
            </div>

            <div className={`${card} overflow-x-auto p-4`}>
              <table className="w-full min-w-[650px] text-left text-xs">
                <thead className="border-b border-white/10 text-[10px] uppercase text-slate-500">
                  <tr>
                    <th className="p-3">Player</th>
                    <th className="p-3">Level / Rank</th>
                    <th className="p-3">Astra Vault</th>
                    <th className="p-3">Matches (W/L)</th>
                    <th className="p-3">Characters</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {players.map(p => (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{p.avatar || '🦸‍♂️'}</span>
                          <div>
                            <div className="font-bold text-white">{p.displayName}</div>
                            <div className="text-[10px] text-slate-500">@{p.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-cyan-300">Lv.{p.level}</span>
                        <div className="text-[10px] text-slate-400">{p.rankedTier} {p.rankedRating ? `(${p.rankedRating})` : ''}</div>
                      </td>
                      <td className="p-3 font-mono font-bold text-amber-300">
                        {(p.astra || 0).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span>{p.matchesPlayed || 0}</span>
                        <span className="text-[10px] text-slate-500 ml-1">({p.wins || 0}W / {p.losses || 0}L)</span>
                      </td>
                      <td className="p-3 font-mono text-purple-300">
                        {p.ownedCharactersCount || 0}
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.role === 'admin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {p.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => openPlayer(p)} 
                            className="rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-3 py-1 text-xs font-bold text-cyan-300 hover:bg-cyan-900/60"
                          >
                            Inspect & Mod
                          </button>
                          {p.role !== 'admin' && (
                            <button
                              type="button"
                              onClick={async () => {
                                const confirmText = window.prompt(`⚠️ PERMANENT ACCOUNT DELETION: Are you sure you want to permanently delete player @${p.username} (${p.displayName})?\n\nType DELETE to confirm:`);
                                if (confirmText !== 'DELETE') return;
                                soundManager.playClick();
                                const res = await adminDeletePlayer(p.id);
                                if (res.success) {
                                  soundManager.playVictory();
                                  setSuccessMsg(`Player @${p.username} was permanently deleted.`);
                                  if (selected?.id === p.id) { setSelected(null); setDetails(null); }
                                  await Promise.all([refresh(), loadPlayers(playerPage, playerSearch)]);
                                } else {
                                  setError(res.error || 'Failed to delete account.');
                                }
                              }}
                              title="Permanently Delete Account"
                              className="rounded-lg border border-rose-500/40 bg-rose-950/40 p-1.5 text-rose-400 hover:bg-rose-900 hover:text-white transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Page {playerPage} / {playerTotalPages}</span>
                <div className="space-x-2">
                  <button 
                    disabled={playerPage <= 1} 
                    onClick={() => setPlayerPage(playerPage - 1)} 
                    className="rounded-lg border border-slate-700 px-3 py-1 disabled:opacity-30 hover:bg-slate-800"
                  >
                    Prev
                  </button>
                  <button 
                    disabled={playerPage >= playerTotalPages} 
                    onClick={() => setPlayerPage(playerPage + 1)} 
                    className="rounded-lg border border-slate-700 px-3 py-1 disabled:opacity-30 hover:bg-slate-800"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* PLAYER INSPECT & MODERATION DRAWER */}
            {details && selected && (
              <PlayerDetail 
                details={details} 
                selected={selected} 
                action={action} 
                setAction={setAction} 
                amount={amount} 
                setAmount={setAmount} 
                actionCharacter={actionCharacter} 
                setActionCharacter={setActionCharacter} 
                actionMessage={actionMessage} 
                onApply={applyAction} 
                onClose={() => { setSelected(null); setDetails(null); }} 
              />
            )}
          </div>
        )}

        {/* TAB 3: BATTLES */}
        {section === 'battles' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Live Arena Rooms */}
            <div className={`${card} p-5`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" /> Active Multiplayer Battles ({battlesData?.activeBattles?.totalActive || 0})
              </h3>
              {(!battlesData?.activeBattles?.arena?.length && !battlesData?.activeBattles?.auction?.length) ? (
                <div className="py-8 text-center text-xs text-slate-500">No live matches actively in progress on server rooms.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(battlesData?.activeBattles?.arena || []).map((b: any) => (
                    <div key={b.roomId} className="p-3 rounded-xl border border-white/10 bg-slate-950/60 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-300">Room #{b.roomId.slice(-6)}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">{b.mode?.toUpperCase()} {b.format}</span>
                      </div>
                      <div className="text-xs text-white">
                        <b>{b.p1?.name || 'P1'}</b> vs <b>{b.p2?.name || 'P2'}</b>
                      </div>
                      <div className="text-[10px] text-slate-400">Round {b.round} • Status: {b.status}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Matches History */}
            <div className={`${card} p-5`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
                <Swords className="w-4 h-4" /> Global Completed Matches Log ({battlesData?.totalMatchesRecorded || 0})
              </h3>
              {(!battlesData?.recentCompletedMatches?.length) ? (
                <div className="py-8 text-center text-xs text-slate-500">No match records logged.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[600px]">
                    <thead className="border-b border-white/10 text-[10px] text-slate-500 uppercase">
                      <tr>
                        <th className="p-2">Match Mode</th>
                        <th className="p-2">Result</th>
                        <th className="p-2">Power</th>
                        <th className="p-2">Opponent</th>
                        <th className="p-2">MVP</th>
                        <th className="p-2">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {battlesData.recentCompletedMatches.map((m: any, idx: number) => (
                        <tr key={m.id || idx} className="hover:bg-slate-800/40">
                          <td className="p-2 font-bold text-cyan-300">{m.matchMode}</td>
                          <td className="p-2">
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                              m.result === 'VICTORY' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                            }`}>
                              {m.result}
                            </span>
                          </td>
                          <td className="p-2 font-mono">{m.playerTotalPower?.toLocaleString() ?? '—'}</td>
                          <td className="p-2 text-slate-300">{m.opponentName || 'AI Challenger'}</td>
                          <td className="p-2 font-bold text-amber-300">{m.mvpCharacterName || '—'}</td>
                          <td className="p-2 text-slate-500">{new Date(m.timestamp).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: DUNGEON */}
        {section === 'dungeon' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Highest Wave Ever</div>
                <div className="mt-2 text-3xl font-black font-mono text-amber-400">Wave {dungeonStats?.highestWaveEver || 0}</div>
              </div>
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Total Expeditions</div>
                <div className="mt-2 text-3xl font-black font-mono text-cyan-400">{(dungeonStats?.totalRuns || 0).toLocaleString()}</div>
              </div>
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Participants</div>
                <div className="mt-2 text-3xl font-black font-mono text-purple-400">{(dungeonStats?.totalParticipants || 0).toLocaleString()}</div>
              </div>
            </div>

            {/* Wave Distribution Histogram */}
            <div className={`${card} p-5`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-cyan-400 mb-3">Wave Progression Distribution</h3>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(dungeonStats?.waveBuckets || {}).map(([b, count]: [string, any]) => (
                  <div key={b} className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-center">
                    <div className="text-xs font-bold text-slate-400">Wave {b}</div>
                    <div className="mt-2 text-xl font-mono font-black text-emerald-400">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Dungeon Performers */}
            <div className={`${card} p-5`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-amber-400 mb-3">All-Time Dungeon Peak Leaderboard</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="border-b border-white/10 text-[10px] text-slate-500 uppercase">
                    <tr>
                      <th className="p-2">Rank</th>
                      <th className="p-2">Player</th>
                      <th className="p-2">Peak Wave</th>
                      <th className="p-2">Total Runs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {(dungeonStats?.topPlayers || []).map((p: any, idx: number) => (
                      <tr key={p.id} className="hover:bg-slate-800/40">
                        <td className="p-2 font-mono font-bold text-slate-400">#{idx + 1}</td>
                        <td className="p-2">
                          <span className="mr-2">{p.avatar || '🦸‍♂️'}</span>
                          <b className="text-white">{p.displayName}</b>
                          <span className="ml-1 text-[10px] text-slate-500">@{p.username}</span>
                        </td>
                        <td className="p-2 font-mono font-bold text-amber-300">Wave {p.dungeonPeak}</td>
                        <td className="p-2 font-mono text-cyan-300">{p.dungeonRuns} runs</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BATTLE PASS */}
        {section === 'battlepass' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Total Tier Claims</div>
                <div className="mt-2 text-3xl font-black font-mono text-cyan-400">{(battlePassStats?.totalClaims || 0).toLocaleString()}</div>
              </div>
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Total Commanders</div>
                <div className="mt-2 text-3xl font-black font-mono text-purple-400">{(battlePassStats?.totalPlayers || 0).toLocaleString()}</div>
              </div>
            </div>

            {/* Level Distribution */}
            <div className={`${card} p-5`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-cyan-400 mb-3">Battle Pass Level Brackets</h3>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(battlePassStats?.levelBuckets || {}).map(([b, count]: [string, any]) => (
                  <div key={b} className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-center">
                    <div className="text-xs font-bold text-slate-400">Level {b}</div>
                    <div className="mt-2 text-xl font-mono font-black text-purple-400">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top BP Commanders */}
            <div className={`${card} p-5`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-amber-400 mb-3">Top Battle Pass Commanders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="border-b border-white/10 text-[10px] text-slate-500 uppercase">
                    <tr>
                      <th className="p-2">Rank</th>
                      <th className="p-2">Player</th>
                      <th className="p-2">BP Level</th>
                      <th className="p-2">Claimed Tiers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {(battlePassStats?.topPlayers || []).map((p: any, idx: number) => (
                      <tr key={p.id} className="hover:bg-slate-800/40">
                        <td className="p-2 font-mono font-bold text-slate-400">#{idx + 1}</td>
                        <td className="p-2">
                          <span className="mr-2">{p.avatar || '🦸‍♂️'}</span>
                          <b className="text-white">{p.displayName}</b>
                          <span className="ml-1 text-[10px] text-slate-500">@{p.username}</span>
                        </td>
                        <td className="p-2 font-mono font-bold text-purple-300">Level {p.battlePassLevel}</td>
                        <td className="p-2 font-mono text-cyan-300">{p.claimsCount} claimed</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ECONOMY */}
        {section === 'economy' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Circulation</div>
                <div className="mt-2 text-2xl font-black font-mono text-amber-300">{(economyStats?.totalCirculation || 0).toLocaleString()}</div>
              </div>
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Total Earned</div>
                <div className="mt-2 text-2xl font-black font-mono text-emerald-300">{(economyStats?.totalEarned || 0).toLocaleString()}</div>
              </div>
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Total Spent</div>
                <div className="mt-2 text-2xl font-black font-mono text-rose-300">{(economyStats?.totalSpent || 0).toLocaleString()}</div>
              </div>
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Crates Opened</div>
                <div className="mt-2 text-2xl font-black font-mono text-purple-300">{(economyStats?.totalCratesOpened || 0).toLocaleString()}</div>
              </div>
            </div>

            {/* Top Astra Holders */}
            <div className={`${card} p-5`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-amber-400 mb-3">Top Astra Vault Reserves</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="border-b border-white/10 text-[10px] text-slate-500 uppercase">
                    <tr>
                      <th className="p-2">Rank</th>
                      <th className="p-2">Player</th>
                      <th className="p-2">Astra Balance</th>
                      <th className="p-2">Auction Wins</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {(economyStats?.topHolders || []).map((p: any, idx: number) => (
                      <tr key={p.id} className="hover:bg-slate-800/40">
                        <td className="p-2 font-mono font-bold text-slate-400">#{idx + 1}</td>
                        <td className="p-2">
                          <span className="mr-2">{p.avatar || '🦸‍♂️'}</span>
                          <b className="text-white">{p.displayName}</b>
                          <span className="ml-1 text-[10px] text-slate-500">@{p.username}</span>
                        </td>
                        <td className="p-2 font-mono font-bold text-amber-300">{(p.astra || 0).toLocaleString()} ASTRA</td>
                        <td className="p-2 font-mono text-cyan-300">{p.auctionWins || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Player-to-Player Trades */}
            <div className={`${card} p-5`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-cyan-400 mb-3">Recent Player Trading Ticker</h3>
              {(!economyStats?.recentTrades?.length) ? (
                <div className="py-6 text-center text-xs text-slate-500">No trade exchanges completed yet.</div>
              ) : (
                <div className="space-y-2">
                  {economyStats.recentTrades.map((t: any) => (
                    <div key={t.id} className="p-3 rounded-xl border border-white/5 bg-slate-950/60 flex items-center justify-between text-xs">
                      <div>
                        <b>{t.playerAUname}</b> traded <span className="text-amber-300 font-mono">{t.playerAOffered?.type === 'CHARACTER' ? t.playerAOffered.characterName : `${t.playerAOffered?.shardAmount} ${t.playerAOffered?.shardCategory} shards`}</span>
                        <span className="mx-2 text-slate-500">⇄</span>
                        <b>{t.playerBUname}</b> traded <span className="text-cyan-300 font-mono">{t.playerBOffered?.type === 'CHARACTER' ? t.playerBOffered.characterName : `${t.playerBOffered?.shardAmount} ${t.playerBOffered?.shardCategory} shards`}</span>
                      </div>
                      <time className="text-slate-500 text-[10px]">{new Date(t.timestamp).toLocaleTimeString()}</time>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 7: ANNOUNCEMENTS */}
        {section === 'announcements' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Announcement Creator Form */}
            <form onSubmit={handleCreateAnnouncement} className={`${card} p-5 space-y-4 border-cyan-500/30`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Plus className="w-4 h-4" /> {newAnn.id ? 'Edit In-Game Announcement' : 'Broadcast New In-Game Announcement'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input 
                  className={input} 
                  required 
                  placeholder="Announcement Title (e.g. Server Maintenance)" 
                  value={newAnn.title} 
                  onChange={e => setNewAnn({ ...newAnn, title: e.target.value })} 
                />
                <select 
                  className={input} 
                  value={newAnn.category} 
                  onChange={e => setNewAnn({ ...newAnn, category: e.target.value as any })}
                >
                  <option value="UPDATE">Category: System Update</option>
                  <option value="EVENT">Category: Live Event</option>
                  <option value="MAINTENANCE">Category: Maintenance</option>
                  <option value="ALERT">Category: Urgent Alert</option>
                </select>
                <select 
                  className={input} 
                  value={newAnn.priority} 
                  onChange={e => setNewAnn({ ...newAnn, priority: e.target.value as any })}
                >
                  <option value="LOW">Priority: Low</option>
                  <option value="MEDIUM">Priority: Medium</option>
                  <option value="HIGH">Priority: High</option>
                  <option value="URGENT">Priority: URGENT / CRITICAL</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="text-[10px] text-slate-400">Schedule (optional)
                  <input className={`${input} mt-1`} type="datetime-local" value={newAnn.scheduledAt} onChange={e => setNewAnn({ ...newAnn, scheduledAt: e.target.value })} />
                </label>
                <label className="text-[10px] text-slate-400">Expire (optional)
                  <input className={`${input} mt-1`} type="datetime-local" value={newAnn.expiresAt} onChange={e => setNewAnn({ ...newAnn, expiresAt: e.target.value })} />
                </label>
              </div>
              <textarea 
                className={`${input} min-h-[80px] resize-none`} 
                required 
                placeholder="Announcement message content displayed to all commanders..." 
                value={newAnn.content} 
                onChange={e => setNewAnn({ ...newAnn, content: e.target.value })} 
              />
              <button className="rounded-xl bg-cyan-500 px-6 py-2.5 text-xs font-black text-slate-950 hover:bg-cyan-400 transition shadow-glow-cyan">
                {newAnn.id ? 'SAVE ANNOUNCEMENT' : 'PUBLISH ANNOUNCEMENT'}
              </button>
              {newAnn.id && <button type="button" onClick={() => setNewAnn({ id: '', title: '', content: '', category: 'UPDATE', priority: 'HIGH', scheduledAt: '', expiresAt: '', isPublished: true })} className="ml-3 rounded-xl border border-slate-700 px-6 py-2.5 text-xs font-bold text-slate-300">CANCEL EDIT</button>}
            </form>

            {/* Announcements Table */}
            <div className={`${card} p-5`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-white mb-3">Active In-Game Announcements ({announcements.length})</h3>
              {(!announcements.length) ? (
                <div className="py-8 text-center text-xs text-slate-500">No announcements published.</div>
              ) : (
                <div className="space-y-3">
                  {announcements.map(a => (
                    <div key={a.id} className="p-4 rounded-xl border border-white/10 bg-slate-950/60 flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                            a.priority === 'URGENT' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                          }`}>
                            {a.priority}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">[{a.category}]</span>
                          <h4 className="font-bold text-sm text-white">{a.title}</h4>
                        </div>
                        <p className="text-xs text-slate-300">{a.content}</p>
                        <div className="text-[10px] text-slate-500">Published by {a.author} • {new Date(a.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button onClick={() => setNewAnn({ id: a.id, title: a.title, content: a.content, category: a.category, priority: a.priority, scheduledAt: a.scheduledAt ? new Date(a.scheduledAt).toISOString().slice(0, 16) : '', expiresAt: a.expiresAt ? new Date(a.expiresAt).toISOString().slice(0, 16) : '', isPublished: a.isPublished })} className="rounded-lg px-2 py-1 text-xs font-bold text-cyan-300 hover:bg-cyan-950/40">EDIT</button>
                        <button onClick={() => saveAdminAnnouncement({ ...a, isPublished: !a.isPublished }).then(refresh)} className="rounded-lg px-2 py-1 text-xs font-bold text-amber-300 hover:bg-amber-950/40">{a.isPublished ? 'UNPUBLISH' : 'PUBLISH'}</button>
                        <button onClick={() => window.confirm(`Delete announcement "${a.title}"?`) && deleteAdminAnnouncement(a.id).then(refresh)} className="rounded-lg p-2 text-rose-400 hover:bg-rose-950/40"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 8: EVENTS */}
        {section === 'events' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Event Creator Form */}
            <form onSubmit={handleCreateEvent} className={`${card} p-5 space-y-4 border-amber-500/30`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Schedule Multiverse Event & Buff
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input 
                  className={input} 
                  required 
                  placeholder="Event Title (e.g. Multiverse Surge)" 
                  value={newEvent.title} 
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} 
                />
                <select 
                  className={input} 
                  value={newEvent.bannerType} 
                  onChange={e => setNewEvent({ ...newEvent, bannerType: e.target.value as any })}
                >
                  <option value="DOUBLE_XP">Buff: 2X XP Weekend</option>
                  <option value="DOUBLE_ASTRA">Buff: 2X Astra Rewards</option>
                  <option value="CRATE_FRENZY">Buff: Crate Frenzy Boost</option>
                  <option value="BOSS_INVASION">Buff: Boss Invasion Crisis</option>
                </select>
                <input 
                  className={input} 
                  type="number" 
                  step="0.5" 
                  min="1.5" 
                  max="5.0" 
                  value={newEvent.multiplier} 
                  onChange={e => setNewEvent({ ...newEvent, multiplier: Number(e.target.value) })} 
                  placeholder="Multiplier (e.g. 2.0x)" 
                />
                <input 
                  className={input} 
                  type="number" 
                  min="1" 
                  max="30" 
                  value={newEvent.durationDays} 
                  onChange={e => setNewEvent({ ...newEvent, durationDays: Number(e.target.value) })} 
                  placeholder="Duration (days)" 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <label className="text-[10px] text-slate-400">Start
                  <input className={`${input} mt-1`} type="datetime-local" value={newEvent.startTime} onChange={e => setNewEvent({ ...newEvent, startTime: e.target.value })} />
                </label>
                <label className="text-[10px] text-slate-400">End
                  <input className={`${input} mt-1`} type="datetime-local" value={newEvent.endTime} onChange={e => setNewEvent({ ...newEvent, endTime: e.target.value })} />
                </label>
                <input className={input} type="number" min="0" value={newEvent.rewardsXp} onChange={e => setNewEvent({ ...newEvent, rewardsXp: Number(e.target.value) })} placeholder="Bonus XP" />
                <input className={input} type="number" min="0" value={newEvent.rewardsAstra} onChange={e => setNewEvent({ ...newEvent, rewardsAstra: Number(e.target.value) })} placeholder="Bonus Astra" />
              </div>
              <input className={input} type="number" min="0" value={newEvent.rewardsShards} onChange={e => setNewEvent({ ...newEvent, rewardsShards: Number(e.target.value) })} placeholder="Bonus shards" />
              <textarea 
                className={`${input} min-h-[70px] resize-none`} 
                required 
                placeholder="Description of the event bonus and rewards for players..." 
                value={newEvent.description} 
                onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} 
              />
              <button className="rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-black text-slate-950 hover:bg-amber-400 transition">
                {newEvent.id ? 'SAVE MULTIVERSE EVENT' : 'ACTIVATE MULTIVERSE EVENT'}
              </button>
              {newEvent.id && <button type="button" onClick={() => setNewEvent({ id: '', title: '', description: '', bannerType: 'DOUBLE_XP', multiplier: 2.0, durationDays: 3, startTime: '', endTime: '', rewardsXp: 0, rewardsAstra: 0, rewardsShards: 0, isActive: true })} className="ml-3 rounded-xl border border-slate-700 px-6 py-2.5 text-xs font-bold text-slate-300">CANCEL EDIT</button>}
            </form>

            {/* Events List */}
            <div className={`${card} p-5`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-white mb-3">Multiverse Event Schedule ({events.length})</h3>
              {(!events.length) ? (
                <div className="py-8 text-center text-xs text-slate-500">No events scheduled.</div>
              ) : (
                <div className="space-y-3">
                  {events.map(ev => {
                    const isLive = ev.isActive && Date.now() >= ev.startTime && Date.now() <= ev.endTime;
                    return (
                      <div key={ev.id} className="p-4 rounded-xl border border-white/10 bg-slate-950/60 flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                              isLive ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {isLive ? '⚡ LIVE NOW' : 'SCHEDULED'}
                            </span>
                            <span className="text-[10px] font-bold text-amber-300 font-mono">[{ev.multiplier}X {ev.bannerType}]</span>
                            <h4 className="font-bold text-sm text-white">{ev.title}</h4>
                          </div>
                          <p className="text-xs text-slate-300">{ev.description}</p>
                          <div className="text-[10px] text-slate-500">
                            Valid until {new Date(ev.endTime).toLocaleDateString()} • Created by @{ev.createdBy}
                          </div>
                        </div>
                        <div className="flex shrink-0 gap-1">
                          <button onClick={() => setNewEvent({ id: ev.id, title: ev.title, description: ev.description, bannerType: ev.bannerType, multiplier: ev.multiplier, durationDays: 3, startTime: new Date(ev.startTime).toISOString().slice(0, 16), endTime: new Date(ev.endTime).toISOString().slice(0, 16), rewardsXp: ev.rewards?.xp || 0, rewardsAstra: ev.rewards?.astra || 0, rewardsShards: ev.rewards?.shards || 0, isActive: ev.isActive })} className="rounded-lg px-2 py-1 text-xs font-bold text-cyan-300 hover:bg-cyan-950/40">EDIT</button>
                          <button onClick={() => saveAdminEvent({ ...ev, isActive: !ev.isActive, startTime: !ev.isActive && ev.startTime <= Date.now() ? Date.now() : ev.startTime, endTime: !ev.isActive && ev.endTime <= Date.now() ? Date.now() + 86400000 : (ev.isActive ? Date.now() : ev.endTime) }).then(refresh)} className="rounded-lg px-2 py-1 text-xs font-bold text-amber-300 hover:bg-amber-950/40">{ev.isActive ? 'END' : 'ACTIVATE'}</button>
                          <button onClick={() => window.confirm(`Delete event "${ev.title}"?`) && deleteAdminEvent(ev.id).then(refresh)} className="rounded-lg p-2 text-rose-400 hover:bg-rose-950/40"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 9: SERVER STATUS */}
        {section === 'server' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Server Uptime</div>
                <div className="mt-2 text-2xl font-black font-mono text-cyan-300">
                  {Math.floor((serverStatus?.uptimeSeconds || 0) / 3600)}h {Math.floor(((serverStatus?.uptimeSeconds || 0) % 3600) / 60)}m
                </div>
              </div>
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Heap Memory</div>
                <div className="mt-2 text-2xl font-black font-mono text-purple-300">
                  {serverStatus?.memory?.heapUsedMb || 0} MB / {serverStatus?.memory?.heapTotalMb || 0} MB
                </div>
              </div>
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Active Sockets</div>
                <div className="mt-2 text-2xl font-black font-mono text-emerald-300">
                  {serverStatus?.socketsCount || 0} Connected
                </div>
              </div>
              <div className={`${card} p-4`}>
                <div className="text-xs font-bold text-slate-400 uppercase">Environment</div>
                <div className="mt-2 text-2xl font-black font-mono text-amber-300">
                  Node {serverStatus?.nodeVersion || 'v20'}
                </div>
              </div>
            </div>

            {/* Online Players Roster */}
            <div className={`${card} p-5`}>
              <h3 className="font-black text-sm uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" /> Online Player Sockets ({serverStatus?.onlineUsers?.length || 0})
              </h3>
              {(!serverStatus?.onlineUsers?.length) ? (
                <div className="py-6 text-center text-xs text-slate-500">No players currently connected via WebSockets.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {serverStatus.onlineUsers.map((u: any) => (
                    <div key={u.socketId} className="p-3 rounded-xl border border-white/5 bg-slate-950/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span>{u.avatar || '🦸‍♂️'}</span>
                        <div>
                          <b className="text-white">{u.displayName}</b>
                          <div className="text-[10px] text-slate-500">@{u.username}</div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-400 font-bold">ONLINE</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 10: REDEEM CODES */}
        {section === 'codes' && (
          <div className="space-y-5 animate-fadeIn">
            <form onSubmit={createCode} className={`${card} grid gap-3 p-5 md:grid-cols-4`}>
              <input 
                className={input} 
                value={newCode.code} 
                maxLength={10} 
                onChange={e => setNewCode({ ...newCode, code: e.target.value.replace(/\D/g, '') })} 
                placeholder="Optional 10-digit code" 
              />
              <select className={input} value={codeRewardType} onChange={e => setCodeRewardType(e.target.value as any)}>
                <option value="ASTRA">Reward: Astra Currency</option>
                <option value="CHARACTER">Reward: Character Unlock</option>
                <option value="SHARD">Reward: Category Shards</option>
                <option value="CRATE">Reward: Supply Crate</option>
              </select>
              <input 
                className={input} 
                type="number" 
                min={1} 
                max={1000000} 
                value={newCode.astraReward} 
                onChange={e => setNewCode({ ...newCode, astraReward: Number(e.target.value) })} 
                placeholder="Reward amount" 
              />
              {codeRewardType === 'CHARACTER' ? (
                <select className={input} required value={codeCharacter} onChange={e => setCodeCharacter(e.target.value)}>
                  <option value="">Select character</option>
                  {ALL_CHARACTERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              ) : codeRewardType === 'SHARD' ? (
                <select className={input} value={codeShardCategory} onChange={e => setCodeShardCategory(e.target.value)}>
                  <option>RARE</option><option>EPIC</option><option>MYTHIC</option><option>HERO</option><option>VILLAIN</option><option>COSMIC</option>
                </select>
              ) : codeRewardType === 'CRATE' ? (
                <select className={input} value={codeCrateType} onChange={e => setCodeCrateType(e.target.value)}>
                  <option>SHARD_CRATE_RARE</option><option>SHARD_CRATE_EPIC</option><option>SHARD_CRATE_LEGENDARY</option><option>SHARD_CRATE_MYTHIC</option>
                  <option>CHARACTER_CRATE_RARE</option><option>CHARACTER_CRATE_EPIC</option><option>CHARACTER_CRATE_LEGENDARY</option><option>CHARACTER_CRATE_MYTHIC</option>
                </select>
              ) : <span />}
              <input 
                className={input} 
                type="number" 
                min={1} 
                max={100000} 
                value={newCode.maxUses} 
                onChange={e => setNewCode({ ...newCode, maxUses: Number(e.target.value) })} 
                placeholder="Max uses" 
              />
              <input 
                className={input} 
                type="date" 
                value={newCode.expiresAt} 
                onChange={e => setNewCode({ ...newCode, expiresAt: e.target.value })} 
              />
              <button className="rounded-xl bg-amber-500 px-4 text-xs font-black text-slate-950 hover:bg-amber-400 transition">
                PUBLISH KEY
              </button>
            </form>

            <div className={`${card} overflow-x-auto p-4`}>
              <table className="w-full min-w-[620px] text-left text-xs">
                <thead className="border-b border-white/10 text-[10px] uppercase text-slate-500">
                  <tr>
                    <th className="p-3">Code</th>
                    <th className="p-3">Reward</th>
                    <th className="p-3">Usage</th>
                    <th className="p-3">Expiry</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {codes.map(code => (
                    <tr key={code.code} className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-amber-300">{code.code}</td>
                      <td className="p-3">
                        {code.rewardType === 'CHARACTER' ? code.characterId : code.rewardType === 'CRATE' ? code.crateType : code.rewardType === 'SHARD' ? `${code.rewardAmount} shards` : `${code.astraReward.toLocaleString()} ASTRA`}
                      </td>
                      <td className="p-3 font-mono">{code.usedCount} / {code.maxUses}</td>
                      <td className="p-3 font-mono">{code.expiresAt}</td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${code.isActive ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                          {code.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>
                      <td className="space-x-2 p-3 text-right">
                        <button onClick={() => toggleAdminCode(code.code, !code.isActive).then(refresh)} className="text-cyan-300 hover:underline">
                          {code.isActive ? 'Disable' : 'Enable'}
                        </button>
                        <button onClick={() => window.confirm(`Revoke ${code.code}?`) && deleteAdminCode(code.code).then(refresh)} className="text-rose-400 hover:underline">
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 11: ACTIVITY LOGS */}
        {section === 'activity' && (
          <div className={`${card} p-5 space-y-4 animate-fadeIn`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-black text-sm uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Immutable Operator Audit Stream ({logs.length})
              </h3>
              <input 
                className={`${input} max-w-xs`} 
                placeholder="Filter logs by keyword..." 
                value={activityFilter} 
                onChange={e => setActivityFilter(e.target.value)} 
              />
            </div>
            <ActivityRows logs={logs.filter(l => !activityFilter || l.action.toLowerCase().includes(activityFilter.toLowerCase()) || l.details.toLowerCase().includes(activityFilter.toLowerCase()))} />
          </div>
        )}

        {/* TAB 12: DANGER ZONE */}
        {section === 'danger' && (
          <div className={`${card} border-rose-500/50 p-6 space-y-6 animate-fadeIn bg-rose-950/20`}>
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-8 w-8 text-rose-400 shrink-0" />
              <div>
                <h3 className="text-xl font-black text-rose-300 uppercase tracking-wide">Danger Zone — Destructive Overrides</h3>
                <p className="text-xs text-slate-300">Operations here alter live player data, rankings, or reset server progression. Explicit confirmation is required.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-rose-500/30 bg-black/60 space-y-3">
                <h4 className="font-bold text-sm text-rose-300">Seasonal Ladder Reset</h4>
                <p className="text-xs text-slate-400">Resets all non-admin players to UNRANKED and sets MMR rating to 1000 for a new competitive season.</p>
                <button 
                  onClick={() => { soundManager.playClick(); setDangerModalAction('reset_ladder'); }} 
                  className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-wider"
                >
                  Reset Ranked Ladder
                </button>
              </div>

              <div className="p-4 rounded-xl border border-rose-500/30 bg-black/60 space-y-3">
                <h4 className="font-bold text-sm text-rose-300">Dungeon Leaderboard Reset</h4>
                <p className="text-xs text-slate-400">Wipes all player dungeon peak waves and records back to Wave 0 for a new expedition cycle.</p>
                <button 
                  onClick={() => { soundManager.playClick(); setDangerModalAction('reset_dungeon'); }} 
                  className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-wider"
                >
                  Reset Dungeon Peak
                </button>
              </div>

              <div className="p-4 rounded-xl border border-rose-500/30 bg-black/60 space-y-3">
                <h4 className="font-bold text-sm text-rose-300">Purge Inactive Guests</h4>
                <p className="text-xs text-slate-400">Permanently removes unauthenticated test guest accounts with 0 matches played and 0 playtime.</p>
                <button 
                  onClick={() => { soundManager.playClick(); setDangerModalAction('purge_guests'); }} 
                  className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-wider"
                >
                  Purge Inactive Guests
                </button>
              </div>
            </div>

            {/* Player-level moderation quick-select */}
            <div className="pt-4 border-t border-rose-500/20">
              <h4 className="font-bold text-sm text-white mb-2">Destructive Player Action & Moderation</h4>
              <div className="flex flex-wrap gap-2">
                <select 
                  className={`${input} max-w-xl`} 
                  value={selected?.id || ''} 
                  onChange={async e => { 
                    const p = players.find(cand => cand.id === e.target.value); 
                    if (p) await openPlayer(p); 
                    else { setSelected(null); setDetails(null); }
                  }}
                >
                  <option value="">Select a player to moderate or delete account</option>
                  {players.map(p => {
                    const statusTag = p.isBanned ? ' [⛔ BANNED]' : (p.suspendedUntil && new Date(p.suspendedUntil).getTime() > Date.now()) ? ' [⏳ SUSPENDED]' : '';
                    return (
                      <option key={p.id} value={p.id}>{p.displayName} (@{p.username}){statusTag}</option>
                    );
                  })}
                </select>
                <button onClick={() => loadPlayers(1, playerSearch)} className="rounded-xl border border-slate-700 px-4 text-xs font-bold text-cyan-300 hover:bg-slate-800 transition">
                  REFRESH
                </button>
              </div>
            </div>

            {selected && details && (
              <DangerModerationView 
                details={details} 
                selected={selected} 
                actionMessage={actionMessage} 
                onApplyModeration={applyModerationAction} 
                onClose={() => { setSelected(null); setDetails(null); setActionMessage(''); }} 
              />
            )}
          </div>
        )}

      </section>

      {/* DANGER MODAL WITH TYPED CONFIRMATION */}
      {dangerModalAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl border-2 border-rose-500 bg-slate-950 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-black uppercase tracking-wider">Confirm Destructive Action</h3>
            </div>
            <p className="text-xs text-slate-300">
              You are about to execute: <b className="text-rose-300">{dangerModalAction.toUpperCase()}</b>.
              To proceed, please type <code className="bg-rose-950 text-rose-300 px-2 py-0.5 rounded font-mono font-bold">CONFIRM_DANGER</code> below:
            </p>
            <input 
              className={`${input} border-rose-500/50 font-mono`} 
              placeholder="CONFIRM_DANGER" 
              value={dangerConfirmText} 
              onChange={e => setDangerConfirmText(e.target.value)} 
            />
            <div className="flex items-center justify-end gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => { setDangerModalAction(null); setDangerConfirmText(''); }} 
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                CANCEL
              </button>
              <button 
                type="button" 
                disabled={dangerConfirmText !== 'CONFIRM_DANGER'} 
                onClick={() => executeDangerAction(dangerModalAction)} 
                className="px-6 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-wider disabled:opacity-30 shadow-lg shadow-rose-600/40"
              >
                EXECUTE NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ActivityRows = ({ logs }: { logs: AdminActionLog[] }) => (
  logs.length ? (
    <div className="space-y-2">
      {logs.map(log => (
        <div key={log.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/5 bg-slate-950/70 p-3 text-xs">
          <span>
            <b className="text-amber-300 font-mono">{log.action}</b>
            <span className="ml-2 text-slate-300">{log.details}</span>
          </span>
          <time className="text-slate-500 font-mono text-[10px]">{new Date(log.timestamp).toLocaleString()}</time>
        </div>
      ))}
    </div>
  ) : (
    <div className="py-8 text-center text-sm text-slate-500">No operator operations recorded in audit log.</div>
  )
);

const PlayerDetail = ({ details, selected, action, setAction, amount, setAmount, actionCharacter, setActionCharacter, actionMessage, onApply, onClose }: any) => (
  <div className={`${card} relative p-5 border-cyan-500/40 animate-fadeIn`}>
    <button onClick={onClose} className="absolute right-4 top-4 text-slate-500 hover:text-white"><X className="h-4 w-4" /></button>
    
    <div className="flex items-center gap-3">
      <span className="text-3xl">{details.player.avatar || '🦸‍♂️'}</span>
      <div>
        <h3 className="text-lg font-black text-white">{details.player.displayName} <span className="text-xs font-normal text-slate-400">@{details.player.username}</span></h3>
        <div className="text-xs text-cyan-300 font-mono">ID: {details.player.id}</div>
      </div>
    </div>

    <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs sm:grid-cols-5">
      {[
        ['Level', details.player.level],
        ['XP', (details.player.xp || 0).toLocaleString()],
        ['Astra Vault', (details.player.astra || 0).toLocaleString()],
        ['Wins / Losses', `${details.player.wins || 0} / ${details.player.losses || 0}`],
        ['Characters', details.characters?.length || 0]
      ].map(([label, val]) => (
        <div key={String(label)} className="rounded-xl bg-slate-950 p-3 border border-white/5">
          <div className="text-slate-500 text-[10px] uppercase font-bold">{label}</div>
          <b className="text-sm font-mono text-white mt-0.5 block">{val}</b>
        </div>
      ))}
    </div>

    {/* Moderation Controls */}
    <div className="mt-5 border-t border-white/10 pt-4">
      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
        <Sliders className="w-3.5 h-3.5" /> Operator Action Dispatcher
      </div>
      <div className="grid gap-2 sm:grid-cols-4">
        <select className={input} value={action} onChange={e => setAction(e.target.value)}>
          <option value="grant_astra">Grant Astra</option>
          <option value="grant_xp">Grant XP</option>
          <option value="grant_card_shards">Grant Card Shards</option>
          <option value="grant_wheel_spins">Grant Wheel Spins</option>
          <option value="set_level">Set Level</option>
          <option value="grant_character">Grant Character</option>
          <option value="unban_player">Unban Player</option>
          <option value="ban_player">⚠️ Ban Player</option>
          <option value="unsuspend_player">Unsuspend Player</option>
          <option value="suspend_player">⚠️ Temporary Suspend</option>
          <option value="remove_character">⚠️ Remove Selected Character</option>
          <option value="remove_all_inventory">⚠️ Wipe All Inventory</option>
          <option value="reset_progression">⚠️ Reset Player Progression</option>
          <option value="delete_account">⚠️ Delete Account</option>
        </select>
        
        <input 
          className={input} 
          type="number" 
          min={0} 
          value={amount} 
          onChange={e => setAmount(Number(e.target.value))} 
          disabled={['ban_player', 'unban_player', 'suspend_player', 'unsuspend_player', 'remove_all_inventory', 'remove_character', 'reset_progression', 'delete_account'].includes(action)} 
        />

        <select 
          className={input} 
          value={actionCharacter} 
          onChange={e => setActionCharacter(e.target.value)} 
          disabled={!['grant_character', 'remove_character'].includes(action)}
        >
          <option value="">Select Character</option>
          {(action === 'remove_character' ? (details.characters || []) : ALL_CHARACTERS).map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {action === 'suspend_player' ? (
          <input 
            id="admin-suspension-expiry" 
            className={input} 
            type="datetime-local" 
            min={new Date(Date.now() + 60000).toISOString().slice(0, 16)} 
            required 
          />
        ) : (
          <button 
            onClick={onApply} 
            className={`rounded-xl px-4 text-xs font-black text-white transition ${
              action === 'delete_account' 
                ? 'bg-rose-700 hover:bg-rose-600 shadow-md shadow-rose-950/50' 
                : 'bg-rose-600 hover:bg-rose-500'
            }`}
          >
            {action === 'delete_account' ? 'DELETE ACCOUNT' : 'EXECUTE ACTION'}
          </button>
        )}
      </div>

      {action === 'suspend_player' && (
        <button onClick={onApply} className="mt-2 w-full rounded-xl bg-rose-600 hover:bg-rose-500 py-2 text-xs font-black text-white transition">
          CONFIRM SUSPENSION
        </button>
      )}

      {actionMessage && <div className="mt-2 text-xs text-emerald-300 font-bold">{actionMessage}</div>}
    </div>

    {/* Owned Characters list */}
    <div className="mt-5">
      <div className="mb-2 text-xs font-bold uppercase text-slate-500">Owned Characters ({details.characters?.length || 0})</div>
      <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto pr-1">
        {(details.characters || []).map((c: any) => (
          <span key={c.id} className="rounded-lg border border-white/10 bg-slate-950 px-2 py-1 text-xs text-white">
            {c.name} <span className="text-cyan-300 font-mono">Lv.{c.level}</span>
          </span>
        ))}
      </div>
    </div>
  </div>
);

const getFutureIsoLocal = (minutesAhead: number) => {
  const d = new Date(Date.now() + minutesAhead * 60000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const formatRemainingTime = (isoExpiry?: string) => {
  if (!isoExpiry) return '';
  const diffMs = new Date(isoExpiry).getTime() - Date.now();
  if (diffMs <= 0) return 'Expired';
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ${hours % 24}h remaining`;
  if (hours > 0) return `${hours}h ${mins % 60}m remaining`;
  return `${mins}m remaining`;
};

const DangerModerationView: React.FC<{
  details: any;
  selected: any;
  actionMessage: string;
  onApplyModeration: (actionType: string, options?: { expiry?: string; characterId?: string; promptText?: string }) => Promise<void>;
  onClose: () => void;
}> = ({ details, selected, actionMessage, onApplyModeration, onClose }) => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('');
  const [suspensionExpiry, setSuspensionExpiry] = useState<string>(() => getFutureIsoLocal(60 * 24));
  const [typedConfirm, setTypedConfirm] = useState<string>('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const isCommanderOwner = selected?.username?.toLowerCase() === 'darksenseify' || details?.player?.role === 'admin';
  const isBanned = !!details?.player?.isBanned || !!selected?.isBanned;
  const isSuspended = !!(details?.player?.suspendedUntil && new Date(details.player.suspendedUntil).getTime() > Date.now());
  const suspensionRemaining = isSuspended ? formatRemainingTime(details.player.suspendedUntil) : '';

  const ownedCharacters = details?.characters || [];

  return (
    <div className="relative rounded-2xl border-2 border-rose-500/60 bg-slate-950/90 p-5 shadow-2xl backdrop-blur-md animate-fadeIn space-y-6">
      <button 
        onClick={onClose} 
        className="absolute right-4 top-4 text-slate-400 hover:text-white transition p-1"
        title="Close Moderation Drawer"
      >
        <X className="h-5 w-5" />
      </button>

      {/* 1. Header & Identity */}
      <div className="flex flex-wrap items-start justify-between gap-4 pr-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{details.player.avatar || '🦸‍♂️'}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-white">{details.player.displayName}</h3>
              <span className="text-xs text-slate-400 font-mono">@{details.player.username}</span>
            </div>
            <div className="text-xs text-cyan-300 font-mono">ID: {details.player.id}</div>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {isBanned && (
            <span className="px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-600 text-rose-300 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <AlertTriangle className="w-3.5 h-3.5" /> Permanently Banned
            </span>
          )}
          {isSuspended && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500 text-amber-300 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Clock className="w-3.5 h-3.5" /> Suspended ({suspensionRemaining})
            </span>
          )}
          {!isBanned && !isSuspended && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-600 text-emerald-300 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" /> Good Standing
            </span>
          )}
          {isCommanderOwner && (
            <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500 text-purple-300 font-bold text-xs uppercase tracking-wider">
              🛡️ Protected Commander
            </span>
          )}
        </div>
      </div>

      {/* Action Message Feedback */}
      {actionMessage && (
        <div className={`p-3 rounded-xl border text-xs font-bold ${
          actionMessage.startsWith('❌') 
            ? 'bg-rose-950/80 border-rose-600 text-rose-200' 
            : 'bg-emerald-950/80 border-emerald-600 text-emerald-200'
        }`}>
          {actionMessage}
        </div>
      )}

      {/* Protected Notice */}
      {isCommanderOwner && (
        <div className="p-3 rounded-xl border border-purple-500/40 bg-purple-950/30 text-xs text-purple-200 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
          <span><b>Protected Account:</b> This is the Commander administrator account. Bans, suspensions, and account deletion are prohibited to protect server integrity.</span>
        </div>
      )}

      {/* Section Grid: Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* PROTOCOL A: PERMANENT BAN */}
        <div className="p-4 rounded-xl border border-rose-500/40 bg-black/70 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" /> Account Ban Protocol
            </div>
            <p className="text-xs text-slate-300">
              Permanently revokes platform access, blocks authentication, and halts all match participation for this player.
            </p>
            {isBanned ? (
              <div className="text-xs text-rose-300 font-medium bg-rose-950/50 p-2 rounded-lg border border-rose-900">
                ⛔ Player is currently <b>BANNED</b>.
              </div>
            ) : (
              <div className="text-xs text-slate-400">
                Status: Account is in active standing.
              </div>
            )}
          </div>

          <div className="pt-2">
            {isBanned ? (
              <button
                disabled={isCommanderOwner}
                onClick={() => onApplyModeration('unban_player')}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition disabled:opacity-30 shadow-md shadow-emerald-900/30"
              >
                Lift Permanent Ban (Restore Access)
              </button>
            ) : (
              <button
                disabled={isCommanderOwner}
                onClick={() => onApplyModeration('ban_player')}
                className="w-full py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-black uppercase tracking-wider transition disabled:opacity-30 shadow-md shadow-rose-950/40"
              >
                Ban Player Permanently
              </button>
            )}
          </div>
        </div>

        {/* PROTOCOL B: TEMPORARY SUSPENSION */}
        <div className="p-4 rounded-xl border border-amber-500/40 bg-black/70 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4" /> Temporary Suspension Protocol
            </div>
            <p className="text-xs text-slate-300">
              Locks account access until a scheduled future timestamp. The account automatically reactivates when expired.
            </p>
            {isSuspended && (
              <div className="text-xs text-amber-300 font-medium bg-amber-950/50 p-2 rounded-lg border border-amber-900 flex items-center justify-between">
                <span>⏳ Suspended until {new Date(details.player.suspendedUntil).toLocaleString()}</span>
                <span className="font-bold font-mono">({suspensionRemaining})</span>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-1">
            {/* Duration Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Presets:</span>
              {[
                { label: '1 Hr', mins: 60 },
                { label: '24 Hrs', mins: 1440 },
                { label: '7 Days', mins: 10080 },
                { label: '30 Days', mins: 43200 },
              ].map(preset => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setSuspensionExpiry(getFutureIsoLocal(preset.mins))}
                  className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-amber-300 border border-amber-500/20"
                >
                  +{preset.label}
                </button>
              ))}
            </div>

            <input
              type="datetime-local"
              value={suspensionExpiry}
              min={getFutureIsoLocal(5)}
              onChange={e => setSuspensionExpiry(e.target.value)}
              className={`${input} border-amber-500/40 text-xs`}
            />

            <div className="flex items-center gap-2 pt-1">
              {isSuspended && (
                <button
                  disabled={isCommanderOwner}
                  onClick={() => onApplyModeration('unsuspend_player')}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase transition disabled:opacity-30"
                >
                  Lift Suspension Early
                </button>
              )}
              <button
                disabled={isCommanderOwner || !suspensionExpiry}
                onClick={() => onApplyModeration('suspend_player', { expiry: suspensionExpiry })}
                className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider transition disabled:opacity-30 shadow-md shadow-amber-900/30"
              >
                Apply Suspension
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: DESTRUCTIVE OVERRIDES & ACCOUNT DELETION */}
      <div className="p-4 rounded-xl border border-rose-500/40 bg-black/70 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-300 font-black text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-rose-400" /> Destructive Account Overrides
          </div>
          <span className="text-[10px] font-bold text-rose-400/80 uppercase">Irreversible Audited Operations</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Override 1: Revoke Character */}
          <div className="p-3 rounded-lg border border-white/5 bg-slate-950/80 space-y-2 flex flex-col justify-between">
            <div>
              <h5 className="text-xs font-bold text-white">Revoke Character</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">Revokes a specific hero from their roster.</p>
              <select
                className={`${input} mt-2 text-xs`}
                value={selectedCharacterId}
                onChange={e => setSelectedCharacterId(e.target.value)}
              >
                <option value="">Select character ({ownedCharacters.length})</option>
                {ownedCharacters.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name} (Lv.{c.level})</option>
                ))}
              </select>
            </div>
            <button
              disabled={isCommanderOwner || !selectedCharacterId}
              onClick={() => onApplyModeration('remove_character', { characterId: selectedCharacterId })}
              className="w-full py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700/50 text-xs font-bold transition disabled:opacity-30"
            >
              Revoke Selected
            </button>
          </div>

          {/* Override 2: Wipe Inventory */}
          <div className="p-3 rounded-lg border border-white/5 bg-slate-950/80 space-y-2 flex flex-col justify-between">
            <div>
              <h5 className="text-xs font-bold text-white">Wipe All Inventory</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">Clears all relics, consumables, skills, and shards from player account.</p>
            </div>
            <button
              disabled={isCommanderOwner}
              onClick={() => onApplyModeration('remove_all_inventory')}
              className="w-full py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700/50 text-xs font-bold transition disabled:opacity-30"
            >
              Wipe Inventory
            </button>
          </div>

          {/* Override 3: Reset Progression */}
          <div className="p-3 rounded-lg border border-white/5 bg-slate-950/80 space-y-2 flex flex-col justify-between">
            <div>
              <h5 className="text-xs font-bold text-white">Reset Progression</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">Resets account level to 1, XP to 0, Astra vault to 0, and clears achievements.</p>
            </div>
            <button
              disabled={isCommanderOwner}
              onClick={() => onApplyModeration('reset_progression')}
              className="w-full py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700/50 text-xs font-bold transition disabled:opacity-30"
            >
              Reset Progression
            </button>
          </div>
        </div>

        {/* OVERRIDE 4: DELETE ACCOUNT (PERMANENT PURGE) */}
        <div className="mt-4 p-4 rounded-xl border-2 border-rose-600/80 bg-rose-950/40 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <h5 className="text-sm font-black text-rose-200 uppercase tracking-wide">Permanently Delete Account</h5>
                <p className="text-xs text-rose-300/80 mt-0.5">
                  Completely and irreversibly purges player <b>@{details.player.username}</b> ({details.player.displayName}) from the server database, active dungeons, and battle logs.
                </p>
              </div>
            </div>

            {!showDeleteConfirm ? (
              <button
                disabled={isCommanderOwner}
                onClick={() => {
                  soundManager.playClick();
                  setShowDeleteConfirm(true);
                  setTypedConfirm('');
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-wider transition disabled:opacity-30 shadow-lg shadow-rose-900/50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete Account
              </button>
            ) : null}
          </div>

          {showDeleteConfirm && (
            <div className="mt-3 p-3 rounded-lg border border-rose-500/60 bg-black/80 space-y-2 animate-fadeIn">
              <div className="text-xs text-rose-200 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>CONFIRMATION REQUIRED: Type <code className="bg-rose-950 px-1.5 py-0.5 rounded text-rose-300 font-mono font-black">DELETE</code> below to permanently destroy this account:</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type DELETE to confirm"
                  value={typedConfirm}
                  onChange={e => setTypedConfirm(e.target.value)}
                  className={`${input} border-rose-500/50 font-mono text-xs`}
                />
                <button
                  type="button"
                  onClick={() => { setShowDeleteConfirm(false); setTypedConfirm(''); }}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={typedConfirm !== 'DELETE'}
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    onApplyModeration('delete_account');
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-wider disabled:opacity-30 shrink-0 shadow-md shadow-rose-950/40"
                >
                  DESTROY ACCOUNT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

