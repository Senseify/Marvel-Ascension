import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { soundManager } from '../../audio/soundManager';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { socket } from '../../socket/socket';
import { getApiUrl } from '../../config/api';
import {
  Users, Plus, Trash2, Edit3, Check, X, Swords,
  Crown, Play, UserPlus, Copy, Hash, LogIn, Search, Loader2, Wifi, Send, ChevronRight,
} from 'lucide-react';

interface Team {
  id: string; name: string; characterIds: string[];
  createdAt: number; updatedAt: number;
}
interface RoomPlayer {
  userId: string; username: string; displayName: string; avatar: string;
  characterIds: string[]; teamPower: number; isHost: boolean; isReady: boolean;
}
interface TournamentRoom {
  id: string; code: string; hostId: string; hostUserId?: string; teamSize: number;
  maxPlayers: number; players: RoomPlayer[]; status?: 'WAITING' | 'STARTED'; phase?: string;
  bracketMatches?: BracketMatch[]; currentRound?: number;
}
interface BracketMatch {
  id: string; round: number; matchNumber: number;
  player1?: RoomPlayer; player2?: RoomPlayer; winner?: RoomPlayer;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}
interface OnlineFriend {
  userId: string; username: string; displayName: string; avatar: string; isOnline: boolean;
}

const TEAM_SYNERGY_TAGS: Record<string, { label: string; color: string }> = {
  Avengers: { label: 'Avengers Sync', color: 'text-amber-400' },
  'X-Men': { label: 'X-Men Sync', color: 'text-yellow-400' },
  Villains: { label: 'Villain Sync', color: 'text-red-400' },
  Guardians: { label: 'Guardians Sync', color: 'text-green-400' },
};
function detectSynergy(characters: typeof ALL_CHARACTERS): string | null {
  const alignments = characters.map(c => c.alignment);
  const factions = characters.flatMap(c => (c.factions || []) as string[]);
  if (factions.filter(a => a === 'Avengers').length >= 2) return 'Avengers';
  if (factions.filter(a => a === 'X-Men').length >= 2) return 'X-Men';
  if (alignments.filter(a => a === 'Villain').length >= 3) return 'Villains';
  if (factions.filter(a => a === 'Guardians of the Galaxy').length >= 2) return 'Guardians';
  return null;
}
const GRADE_COLORS: Record<string, string> = {
  C: 'from-slate-500 to-slate-600', B: 'from-emerald-600 to-teal-700',
  A: 'from-purple-500 to-indigo-700', MYTHIC: 'from-amber-400 to-yellow-600',
};
export function TeamBuilder() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState<'ROSTER' | 'BATTLE_TEAM'>('ROSTER');
  const [teams, setTeams] = useState<Team[]>(user?.savedTeams || []);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [editName, setEditName] = useState('');
  const [selectedChars, setSelectedChars] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAlignment, setFilterAlignment] = useState<'All' | 'Hero' | 'Villain' | 'Cosmic'>('All');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [teamSize, setTeamSize] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [playerSelectedHeroes, setPlayerSelectedHeroes] = useState<string[]>([]);
  type LobbyMode = 'HOME' | 'QUEUE' | 'IN_ROOM' | 'BRACKET' | 'CHAMPION';
  const [lobbyMode, setLobbyMode] = useState<LobbyMode>('HOME');
  const [room, setRoom] = useState<TournamentRoom | null>(null);
  const [isQueuing, setIsQueuing] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [joinLoading, setJoinLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState<2 | 4 | 6 | 8 | 10>(2);
  const [bracketMatches, setBracketMatches] = useState<BracketMatch[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [champion, setChampion] = useState<RoomPlayer | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [onlineFriends, setOnlineFriends] = useState<OnlineFriend[]>([]);
  const [inviteLoading, setInviteLoading] = useState<string | null>(null);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const ownedIds = user?.ownedCharacters || [];
  const ownedCharacters = ALL_CHARACTERS.filter(c => ownedIds.includes(c.id));
  const isHost = (room?.hostId === user?.id) || (room?.hostUserId === user?.id);
  const myPlayer = room?.players.find(p => p.userId === user?.id);

  useEffect(() => { if (user?.savedTeams) setTeams(user.savedTeams); }, [user?.savedTeams]);
  useEffect(() => {
    if (ownedCharacters.length > 0)
      setPlayerSelectedHeroes(ownedCharacters.slice(0, teamSize).map(c => c.id));
  }, [teamSize, ownedCharacters.length]);

  useEffect(() => {
    if (!socket) return;
    const onRoomUpdated = (r: TournamentRoom) => {
      setRoom(r);
      if (r.bracketMatches && r.bracketMatches.length > 0) {
        setBracketMatches(r.bracketMatches);
      }
      if (r.currentRound) {
        setCurrentRound(r.currentRound);
      }
    };
    const onMatchFound = (data: { room: TournamentRoom }) => {
      const targetRoom = data?.room || data;
      setRoom(targetRoom);
      setIsQueuing(false);
      setLobbyMode('IN_ROOM');
      showToast('Match found! You have been placed in a tournament room.', 'success');
      soundManager.playVictory();
    };
    const onBracketStarted = (data: any) => {
      const targetRoom = data?.room || data;
      const targetMatches = data?.matches || targetRoom?.bracketMatches || [];
      if (targetRoom) setRoom(targetRoom);
      setBracketMatches(targetMatches);
      setCurrentRound(1);
      setLobbyMode('BRACKET');
      soundManager.playVictory();
    };
    const onMatchResolved = (data: any) => {
      const targetMatches = data?.matches || data?.room?.bracketMatches || [];
      if (targetMatches.length > 0) setBracketMatches(targetMatches);
      if (data?.room) setRoom(data.room);
      soundManager.playAttackHit();
    };
    const onChampionCrowned = (data: { champion: RoomPlayer; room?: TournamentRoom }) => {
      setChampion(data.champion);
      if (data.room) setRoom(data.room);
      setLobbyMode('CHAMPION');
      soundManager.playVictory();
    };
    const onRoundAdvanced = (data: { matches?: BracketMatch[]; round?: number; room?: TournamentRoom }) => {
      if (data.room) setRoom(data.room);
      if (data.matches) setBracketMatches(prev => [...prev, ...(data.matches || [])]);
      if (data.round) setCurrentRound(data.round);
    };
    socket.on('tournament_room_updated', onRoomUpdated);
    socket.on('tournament_match_found', onMatchFound);
    socket.on('tournament_bracket_started', onBracketStarted);
    socket.on('tournament_match_resolved', onMatchResolved);
    socket.on('tournament_champion_crowned', onChampionCrowned);
    socket.on('tournament_round_advanced', onRoundAdvanced);
    return () => {
      socket.off('tournament_room_updated', onRoomUpdated);
      socket.off('tournament_match_found', onMatchFound);
      socket.off('tournament_bracket_started', onBracketStarted);
      socket.off('tournament_match_resolved', onMatchResolved);
      socket.off('tournament_champion_crowned', onChampionCrowned);
      socket.off('tournament_round_advanced', onRoundAdvanced);
    };
  }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMsg(msg); setToastType(type); setTimeout(() => setToastMsg(null), 3500);
  };
  const filteredOwned = ownedCharacters.filter(c => {
    const matchSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchAlign = filterAlignment === 'All' || c.alignment === filterAlignment;
    return matchSearch && matchAlign;
  });
  const getTeamPower = (ids: string[]) => ids.reduce((t, id) => t + (ALL_CHARACTERS.find(c => c.id === id)?.overallPower || 70), 0);

  const startCreate = () => { setEditingTeam(null); setEditName('New Team'); setSelectedChars([]); setIsCreating(true); soundManager.playClick(); };
  const startEdit = (team: Team) => { setEditingTeam(team); setEditName(team.name); setSelectedChars([...team.characterIds]); setIsCreating(true); soundManager.playClick(); };
  const cancelEdit = () => { setIsCreating(false); setEditingTeam(null); setSelectedChars([]); setEditName(''); };
  const toggleChar = (id: string) => {
    if (selectedChars.includes(id)) { setSelectedChars(prev => prev.filter(c => c !== id)); }
    else if (selectedChars.length < 5) { setSelectedChars(prev => [...prev, id]); soundManager.playClick(); }
    else showToast('Max 5 characters per team!', 'error');
  };
  const handleSave = async () => {
    if (!editName.trim()) { showToast('Please enter a team name', 'error'); return; }
    if (selectedChars.length === 0) { showToast('Select at least 1 character', 'error'); return; }
    setSaving(true);
    try {
      const newTeam: Team = { id: editingTeam?.id || `team-${Date.now()}`, name: editName.trim(), characterIds: selectedChars, createdAt: editingTeam?.createdAt || Date.now(), updatedAt: Date.now() };
      const updated = editingTeam ? teams.map(t => t.id === editingTeam.id ? newTeam : t) : [...teams, newTeam];
      setTeams(updated); try { localStorage.setItem('mcu_saved_teams', JSON.stringify(updated)); } catch {}
      cancelEdit(); showToast('Team saved!'); soundManager.playVictory();
    } finally { setSaving(false); }
  };
  const handleDelete = (teamId: string) => {
    const updated = teams.filter(t => t.id !== teamId); setTeams(updated);
    try { localStorage.setItem('mcu_saved_teams', JSON.stringify(updated)); } catch {}
    showToast('Team deleted'); soundManager.playClick();
  };
  const toggleTournamentHero = (charId: string) => {
    if (playerSelectedHeroes.includes(charId)) {
      if (playerSelectedHeroes.length <= 1) { showToast('Must keep at least 1 hero.', 'error'); return; }
      setPlayerSelectedHeroes(prev => prev.filter(id => id !== charId));
    } else {
      if (playerSelectedHeroes.length >= teamSize) { showToast(`Max ${teamSize} heroes for ${teamSize}v${teamSize}.`, 'error'); return; }
      setPlayerSelectedHeroes(prev => [...prev, charId]);
    }
    soundManager.playClick();
    if (room && socket) socket.emit('tournament_update_team', { roomId: room.id, characterIds: playerSelectedHeroes });
  };
  const handleQueue = () => {
    if (!socket || !user) { showToast('Must be signed in to queue.', 'error'); return; }
    if (playerSelectedHeroes.length !== teamSize) { showToast(`Select exactly ${teamSize} heroes first.`, 'error'); return; }
    setIsQueuing(true); setLobbyMode('QUEUE');
    socket.emit('tournament_queue', { teamSize, characterIds: playerSelectedHeroes, authToken: token }, (res: any) => {
      if (!res?.success) { setIsQueuing(false); setLobbyMode('HOME'); showToast(res?.error || 'Failed to enter queue.', 'error'); }
    });
    soundManager.playClick();
  };
  const handleCancelQueue = () => {
    if (!socket) return;
    socket.emit('tournament_cancel_queue', {}, () => {});
    setIsQueuing(false); setLobbyMode('HOME'); soundManager.playClick();
  };
  const handleCreateRoom = () => {
    if (!socket || !user) { showToast('Must be signed in.', 'error'); return; }
    if (playerSelectedHeroes.length !== teamSize) { showToast(`Select exactly ${teamSize} heroes first.`, 'error'); return; }
    setCreateLoading(true);
    socket.emit('tournament_create_room', { teamSize, maxPlayers, characterIds: playerSelectedHeroes, authToken: token }, (res: any) => {
      setCreateLoading(false);
      if (res?.success && res.room) { setRoom(res.room); setLobbyMode('IN_ROOM'); soundManager.playVictory(); }
      else showToast(res?.error || 'Failed to create room.', 'error');
    });
  };
  const handleJoinRoom = () => {
    if (!socket || !user) { showToast('Must be signed in.', 'error'); return; }
    if (!joinCode.trim()) { showToast('Enter a room code.', 'error'); return; }
    if (playerSelectedHeroes.length !== teamSize) { showToast(`Select exactly ${teamSize} heroes first.`, 'error'); return; }
    setJoinLoading(true);
    socket.emit('tournament_join_room', { code: joinCode.trim().toUpperCase(), characterIds: playerSelectedHeroes, authToken: token }, (res: any) => {
      setJoinLoading(false);
      if (res?.success && res.room) { setRoom(res.room); setTeamSize(res.room.teamSize as 1|2|3|4|5); setLobbyMode('IN_ROOM'); soundManager.playVictory(); }
      else showToast(res?.error || 'Room not found or full.', 'error');
    });
  };
  const handleLeaveRoom = () => {
    if (!socket || !room) return;
    socket.emit('tournament_leave_room', { roomId: room.id }, () => {});
    setRoom(null); setBracketMatches([]); setLobbyMode('HOME'); setIsQueuing(false); soundManager.playClick();
  };
  const handleToggleReady = () => {
    if (!socket || !room) return;
    socket.emit('tournament_toggle_ready', { roomId: room.id, isReady: !myPlayer?.isReady }, (res: any) => {
      if (!res?.success) showToast(res?.error || 'Failed.', 'error');
    });
    soundManager.playClick();
  };
  const handleStartTournament = () => {
    if (!socket || !room) return;
    if (!room.players.every(p => p.isReady)) { showToast('All players must be ready!', 'error'); return; }
    if (room.players.length < 2) { showToast('Need at least 2 players.', 'error'); return; }
    socket.emit('tournament_start', { roomId: room.id }, (res: any) => { if (!res?.success) showToast(res?.error || 'Failed.', 'error'); });
    soundManager.playVictory();
  };
  const handleCopyCode = () => {
    if (!room) return;
    navigator.clipboard.writeText(room.code).catch(() => {});
    setCodeCopied(true); setTimeout(() => setCodeCopied(false), 2000); soundManager.playClick();
  };
  const handleSimulateMatch = (matchId: string) => {
    if (!socket || !room) return;
    socket.emit('tournament_simulate_match', { roomId: room.id, matchId }, (res: any) => { if (!res?.success) showToast(res?.error || 'Failed.', 'error'); });
    soundManager.playAttackHit();
  };
  const handleAdvanceRound = () => {
    if (!socket || !room) return;
    if (!bracketMatches.filter(m => m.round === currentRound).every(m => m.status === 'COMPLETED')) { showToast('Resolve all matches first!', 'error'); return; }
    socket.emit('tournament_advance_round', { roomId: room.id }, (res: any) => { if (!res?.success) showToast(res?.error || 'Failed.', 'error'); });
    soundManager.playVictory();
  };
  const fetchOnlineFriends = async () => {
    if (!token) return; setFriendsLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/social/friends'), { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setOnlineFriends((data.friends || []).filter((f: OnlineFriend) => f.isOnline));
    } catch {} setFriendsLoading(false);
  };
  const openInviteModal = () => { setShowInviteModal(true); fetchOnlineFriends(); soundManager.playClick(); };
  const handleInviteFriend = (friendId: string) => {
    if (!socket || !room) return; setInviteLoading(friendId);
    socket.emit('tournament_invite_friend', { roomId: room.id, targetUserId: friendId, authToken: token }, (res: any) => {
      setInviteLoading(null);
      if (res?.success) showToast('Invite sent!', 'success'); else showToast(res?.error || 'Failed.', 'error');
    });
    soundManager.playClick();
  };

  return (
    <div className="space-y-6 animate-fadeIn select-none">
      {toastMsg && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl border text-sm shadow-2xl flex items-center gap-2 font-bold ${toastType === 'error' ? 'bg-red-950 border-red-500 text-red-200' : 'bg-emerald-900 border-emerald-500 text-emerald-200'}`}>
          {toastType === 'error' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          <span>{toastMsg}</span>
        </div>
      )}
      {showInviteModal && room && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setShowInviteModal(false)}>
          <div className="bg-[#0E1017] border border-white/[0.08] rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-black text-white text-lg flex items-center gap-2"><UserPlus className="w-5 h-5 text-amber-400" /> Invite Online Friends</h3>
              <button onClick={() => setShowInviteModal(false)} className="p-2 hover:bg-white/10 rounded-xl cursor-pointer"><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            {friendsLoading ? (
              <div className="flex items-center justify-center py-8 gap-2 text-slate-400"><Loader2 className="w-5 h-5 animate-spin" /><span className="text-sm">Loading...</span></div>
            ) : onlineFriends.length === 0 ? (
              <div className="text-center py-8 text-slate-500 space-y-2">
                <Wifi className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-sm">No friends online. Share code: <span className="text-amber-400 font-mono font-black">{room.code}</span></p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {onlineFriends.map(friend => (
                  <div key={friend.userId} className="flex items-center justify-between p-3 rounded-xl bg-[#07080B] border border-white/[0.06] hover:border-amber-400/40 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#12141C] border border-white/20 flex items-center justify-center text-lg">{friend.avatar || '?'}</div>
                      <div>
                        <div className="font-heading font-black text-white text-sm">{friend.displayName || friend.username}</div>
                        <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" /><span className="text-[10px] text-emerald-400 font-mono">Online</span></div>
                      </div>
                    </div>
                    <button onClick={() => handleInviteFriend(friend.userId)} disabled={inviteLoading === friend.userId} className="px-3 py-1.5 rounded-lg bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all">
                      {inviteLoading === friend.userId ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}<span>Invite</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-3 border-t border-white/[0.08] text-center">
              <p className="text-xs text-slate-400">Room code:</p>
              <div className="mt-2 flex items-center gap-2 justify-center">
                <span className="font-mono font-black text-amber-400 text-xl tracking-widest">{room.code}</span>
                <button onClick={handleCopyCode} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/40 cursor-pointer">
                  {codeCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-2xl flex-wrap gap-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-1"><Users className="w-7 h-7 text-amber-400" />
            <h1 className="text-2xl font-heading font-black text-white uppercase tracking-wider">{activeTab === 'ROSTER' ? 'Squad Roster Builder' : 'Battle Team Tournament'}</h1>
          </div>
          <p className="text-slate-400 text-sm">{activeTab === 'ROSTER' ? 'Build and save synergy squads for competitive play' : 'Real-player multiplayer tournaments — queue, create rooms, invite friends and battle'}</p>
        </div>
        <div className="flex items-center gap-2 bg-[#07080B] p-1.5 rounded-xl border border-white/[0.06] relative z-10">
          <button type="button" onClick={() => { soundManager.playClick(); setActiveTab('ROSTER'); }} className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'ROSTER' ? 'bg-amber-400 text-black font-black shadow-lg shadow-amber-400/20' : 'text-slate-400 hover:text-white'}`}>Squad Rosters</button>
          <button type="button" onClick={() => { soundManager.playClick(); setActiveTab('BATTLE_TEAM'); }} className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'BATTLE_TEAM' ? 'bg-amber-400 text-black font-black shadow-lg shadow-amber-400/20' : 'text-slate-400 hover:text-white'}`}>Tournament</button>
        </div>
      </div>

      {activeTab === 'ROSTER' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">{teams.length} / 5 Teams Saved</span>
            {!isCreating && (<button type="button" onClick={startCreate} disabled={teams.length >= 5} className="btn-primary-cinematic px-4 py-2 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"><Plus className="w-4 h-4" /><span>New Team</span></button>)}
          </div>
          {isCreating && (
            <div className="rounded-2xl p-6 bg-[#0E1017] border border-white/[0.08] shadow-2xl space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <input type="text" value={editName} onChange={e => setEditName(e.target.value)} placeholder="Enter Team Name..." className="bg-[#07080B] border border-white/15 rounded-xl px-4 py-2 text-white font-heading font-black text-lg focus:outline-none focus:border-amber-400 w-64" />
                <div className="flex items-center gap-2">
                  <button type="button" onClick={cancelEdit} className="px-3 py-2 rounded-xl border border-white/20 text-slate-400 hover:text-white text-xs font-bold cursor-pointer">Cancel</button>
                  <button type="button" onClick={handleSave} disabled={saving} className="btn-gold-cinematic px-5 py-2 rounded-xl font-heading font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 cursor-pointer"><Check className="w-4 h-4" /><span>{saving ? 'Saving...' : 'Save Team'}</span></button>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-300 block mb-2">Team Members ({selectedChars.length}/5):</span>
                <div className="grid grid-cols-5 gap-3">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const char = ALL_CHARACTERS.find(c => c.id === selectedChars[i]);
                    return char ? (
                      <div key={char.id} onClick={() => toggleChar(char.id)} className="p-2 rounded-xl bg-[#12141C] border border-amber-400/40 flex flex-col items-center cursor-pointer hover:scale-105 transition-all">
                        <CharacterPortrait character={char} size="sm" showBadge={false} /><span className="text-xs font-bold text-white truncate w-full mt-1">{char.name}</span><span className="text-[10px] text-amber-400 font-mono">Power {char.overallPower}</span>
                      </div>
                    ) : (<div key={`e-${i}`} className="h-28 rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-slate-600 text-xs font-mono">Slot {i+1}</div>);
                  })}
                </div>
              </div>
              <div className="space-y-3 pt-3 border-t border-white/[0.08]">
                <div className="flex items-center justify-between gap-3">
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search heroes..." className="bg-[#07080B] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 w-48" />
                  <div className="flex gap-1">{(['All','Hero','Villain','Cosmic'] as const).map(align => (<button key={align} type="button" onClick={() => setFilterAlignment(align)} className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${filterAlignment===align?'bg-amber-400 text-black font-black':'bg-white/5 text-slate-400 border border-white/10'}`}>{align}</button>))}</div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {filteredOwned.map(char => { const sel = selectedChars.includes(char.id); return (<div key={char.id} onClick={() => toggleChar(char.id)} className={`p-2 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center ${sel?'bg-[#12141C] border-amber-400 shadow-lg shadow-amber-400/10':'bg-[#12141C]/60 border-white/[0.06] hover:border-amber-400/40'}`}><CharacterPortrait character={char} size="sm" showBadge={false} /><span className="text-[11px] font-bold text-white truncate w-full mt-1">{char.name}</span><span className="text-[9px] text-amber-400 font-mono">Pwr {char.overallPower}</span></div>); })}
                </div>
              </div>
            </div>
          )}
          {teams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teams.map(team => {
                const chars = ALL_CHARACTERS.filter(c => team.characterIds.includes(c.id));
                const synergy = detectSynergy(chars); const power = chars.reduce((s,c) => s+(c.overallPower||0),0);
                return (<div key={team.id} className="rounded-2xl border border-white/[0.08] bg-[#0E1017] p-5 space-y-4 hover:border-amber-400/40 transition-all shadow-xl">
                  <div className="flex items-start justify-between">
                    <div><div className="font-heading font-black text-white text-lg">{team.name}</div>{synergy&&<div className={`text-xs font-bold ${TEAM_SYNERGY_TAGS[synergy]?.color}`}>{TEAM_SYNERGY_TAGS[synergy]?.label}</div>}</div>
                    <div className="flex gap-1.5"><button onClick={() => startEdit(team)} className="p-2 hover:bg-white/10 rounded-xl cursor-pointer"><Edit3 className="w-4 h-4 text-slate-400 hover:text-white" /></button><button onClick={() => handleDelete(team.id)} className="p-2 hover:bg-red-950/50 rounded-xl cursor-pointer"><Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" /></button></div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">{chars.map(c => (<span key={c.id} className={`text-xs font-bold px-2.5 py-1 rounded-lg bg-gradient-to-r ${GRADE_COLORS[c.grade]||'from-slate-600 to-slate-700'} text-white`}>{c.name}</span>))}</div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.06] font-mono"><span className="flex items-center gap-1.5 text-amber-400 font-bold"><Swords className="w-3.5 h-3.5" /> Total Power: {power}</span><span>{chars.length} Heroes</span></div>
                </div>
              );
            })}
          </div>
        ) : !isCreating && (
          <div className="text-center py-16 text-slate-500 space-y-3 bg-[#0E1017] rounded-2xl border border-white/[0.08]"><Users className="w-12 h-12 mx-auto opacity-20" /><p className="font-semibold text-slate-300">No teams saved yet</p><p className="text-sm">Click New Team to craft your first synergy squad</p></div>
        )}
        </div>
      )}

      {activeTab === 'BATTLE_TEAM' && (
        <div className="space-y-6">
          {lobbyMode === 'HOME' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-2xl space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-3 border-b border-white/[0.08] pb-4">
                  <div><span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block font-mono">STEP 1 - BUILD YOUR TEAM</span><h2 className="text-xl font-heading font-black text-white">Select Your Tournament Heroes</h2></div>
                  <div className="flex items-center gap-1 bg-[#07080B] p-1 rounded-xl border border-white/[0.06] text-xs font-mono">
                    <span className="text-slate-400 px-2 font-bold">FORMAT:</span>
                    {([1,2,3,4,5] as const).map(size => (<button key={size} type="button" onClick={() => { setTeamSize(size); soundManager.playClick(); }} className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-all ${teamSize===size?'bg-amber-400 text-black shadow-sm font-black':'text-slate-400 hover:text-white'}`}>{size}v{size}</button>))}
                  </div>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-slate-300">{playerSelectedHeroes.length} / {teamSize} Selected</span>
                  <span className="text-xs font-mono font-bold text-amber-400">Team Power: {getTeamPower(playerSelectedHeroes)} PWR</span>
                </div>
                <div className="flex gap-2 flex-wrap max-h-48 overflow-y-auto pr-1">
                  {ownedCharacters.map(char => { const sel = playerSelectedHeroes.includes(char.id); return (<div key={char.id} onClick={() => toggleTournamentHero(char.id)} className={`p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${sel?'bg-[#12141C] border-amber-400 shadow-lg shadow-amber-400/10':'bg-[#12141C]/60 border-white/[0.06] hover:border-white/20'}`}><div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black/60"><CharacterPortrait character={char} size="fill" aspect="square" showBadge={false} showPowerBadge={false} className="w-full h-full border-none shadow-none rounded-none" /></div><div className="text-left"><div className="text-xs font-bold text-white leading-tight">{char.name}</div><div className="text-[9px] text-amber-400 font-mono">Pwr {char.overallPower}</div></div>{sel&&<Check className="w-3.5 h-3.5 text-amber-400 ml-auto shrink-0" />}</div>); })}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-2xl space-y-4">
                <div className="border-b border-white/[0.08] pb-4"><span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block font-mono">STEP 2 - ENTER THE TOURNAMENT</span><h2 className="text-xl font-heading font-black text-white">Choose How to Play</h2><p className="text-xs text-slate-400 mt-0.5">Real players only — authentic competition, no bots.</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button type="button" onClick={handleQueue} className="group p-5 rounded-xl bg-[#12141C] border border-white/[0.08] hover:border-amber-400/40 transition-all cursor-pointer text-left space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3"><Search className="w-5 h-5 text-amber-400" /></div>
                    <div className="font-heading font-black text-white text-base uppercase">Quick Match</div>
                    <p className="text-xs text-slate-400">Enter matchmaking. When another player queues, you are instantly matched into a live tournament.</p>
                    <div className="mt-3 flex items-center gap-1.5 text-amber-400 text-xs font-bold font-mono"><span>Queue for {teamSize}v{teamSize}</span><ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
                  </button>
                  <div className="p-5 rounded-xl bg-[#12141C] border border-white/[0.08] space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3"><Hash className="w-5 h-5 text-amber-400" /></div>
                    <div className="font-heading font-black text-white text-base uppercase">Create Private Room</div>
                    <p className="text-xs text-slate-400">Get a room code and share it with friends to organize your own private tournament.</p>
                    <div className="flex items-center gap-1 flex-wrap"><span className="text-[10px] text-slate-400 font-mono mr-1">SIZE:</span>{([2,4,6,8,10] as const).map(n => (<button key={n} type="button" onClick={() => { setMaxPlayers(n); soundManager.playClick(); }} className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${maxPlayers===n?'bg-amber-400 text-black font-black':'bg-[#07080B] text-slate-400 border border-white/10'}`}>{n}P</button>))}</div>
                    <button type="button" onClick={handleCreateRoom} disabled={createLoading} className="btn-gold-cinematic w-full py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50">
                      {createLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}<span>{createLoading ? 'Creating...' : `Create ${maxPlayers}-Player Room`}</span>
                    </button>
                  </div>
                  <div className="p-5 rounded-xl bg-[#12141C] border border-white/[0.08] space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3"><LogIn className="w-5 h-5 text-amber-400" /></div>
                    <div className="font-heading font-black text-white text-base uppercase">Join with Code</div>
                    <p className="text-xs text-slate-400">Enter a room code shared by a friend to join their private tournament.</p>
                    <input type="text" value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} placeholder="TOURN-XXXXXX" maxLength={12} className="w-full bg-[#07080B] border border-white/15 rounded-xl px-3 py-2 text-white font-mono font-black text-sm focus:outline-none focus:border-amber-400 placeholder-slate-600 tracking-widest" />
                    <button type="button" onClick={handleJoinRoom} disabled={joinLoading || !joinCode.trim()} className="btn-primary-cinematic w-full py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50">
                      {joinLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}<span>{joinLoading ? 'Joining...' : 'Join Room'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {lobbyMode === 'QUEUE' && (
            <div className="p-8 rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-2xl text-center space-y-6 animate-fadeIn">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-[#12141C] border border-amber-400/40 flex items-center justify-center shadow-lg animate-pulse"><Search className="w-10 h-10 text-amber-400" /></div>
              <div className="space-y-2"><span className="text-[10px] font-black uppercase text-amber-400 tracking-widest font-mono">MATCHMAKING QUEUE</span><h2 className="text-2xl font-heading font-black text-white">Searching for Opponents...</h2><p className="text-slate-400 text-sm">Waiting for a <span className="text-amber-300 font-bold font-mono">{teamSize}v{teamSize}</span> opponent. You will be matched instantly.</p></div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <div className="flex items-center justify-center gap-3 text-sm text-slate-400 bg-[#07080B] rounded-xl px-6 py-3 w-fit mx-auto border border-white/[0.06]"><Swords className="w-4 h-4 text-amber-400" /><span>Team power: <strong className="text-amber-300 font-mono">{getTeamPower(playerSelectedHeroes)} PWR</strong></span></div>
              <button type="button" onClick={handleCancelQueue} className="px-6 py-2.5 rounded-xl border border-white/20 text-slate-400 hover:text-white font-bold text-sm transition-all cursor-pointer">Cancel Queue</button>
            </div>
          )}

          {lobbyMode === 'IN_ROOM' && room && (
            <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-2xl space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 flex-wrap gap-4">
                <div><span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block font-mono">TOURNAMENT LOBBY</span><h2 className="text-xl font-heading font-black text-white">{room.players.length} / {room.maxPlayers} Players - {room.teamSize}v{room.teamSize} Format</h2></div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-2 bg-[#07080B] px-3 py-2 rounded-xl border border-white/[0.08]"><span className="text-[10px] text-slate-400 font-mono uppercase">Code:</span><span className="font-mono font-black text-amber-400 tracking-widest text-sm">{room.code}</span><button onClick={handleCopyCode} className="p-1 rounded-lg hover:bg-white/10 cursor-pointer">{codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}</button></div>
                  <button type="button" onClick={openInviteModal} className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"><UserPlus className="w-3.5 h-3.5 text-amber-400" /><span>Invite Friends</span></button>
                  <button type="button" onClick={handleLeaveRoom} className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"><X className="w-3.5 h-3.5" /><span>Leave</span></button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {Array.from({ length: room.maxPlayers }).map((_, idx) => {
                  const player = room.players[idx];
                  if (player) {
                    const pChars = player.characterIds.map(id => ALL_CHARACTERS.find(c => c.id === id)).filter(Boolean);
                    return (<div key={player.userId} className={`p-3.5 rounded-xl border flex flex-col items-center text-center relative shadow-lg transition-all ${player.isReady ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-[#12141C] border-white/[0.08]'}`}>
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-xl mb-1">{player.avatar || '?'}</div>
                      <div className="font-heading font-black text-xs text-white truncate w-full mb-0.5">{player.displayName || player.username}</div>
                      <div className="text-[10px] font-mono mb-2">{player.isHost ? <span className="text-amber-400 font-bold">HOST</span> : player.isReady ? <span className="text-emerald-400 font-bold">READY</span> : <span className="text-slate-500">WAITING</span>}</div>
                      <div className="flex items-center justify-center gap-1 my-1 flex-wrap">{pChars.map((char, ci) => (<div key={ci} className="w-7 h-7 rounded-lg bg-slate-900 border border-white/10 overflow-hidden shrink-0"><CharacterPortrait character={char!} size="fill" aspect="square" showBadge={false} showPowerBadge={false} className="w-full h-full border-none shadow-none rounded-none" /></div>))}</div>
                      <div className="text-[10px] text-amber-400 font-mono mt-1 font-bold">Pwr {player.teamPower}</div>
                      {player.userId === user?.id && <span className="absolute -top-1.5 -right-1.5 text-[9px] font-black bg-amber-400 text-black px-1.5 py-0.5 rounded-full font-mono">YOU</span>}
                    </div>);
                  }
                  return (<div key={`s-${idx}`} className="h-36 rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-slate-600 text-xs font-mono gap-1"><Wifi className="w-5 h-5 opacity-30" /><span>Slot {idx+1}</span><span className="text-[10px] text-slate-700">Waiting...</span></div>);
                })}
              </div>
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
                <div className="text-xs text-slate-400 font-mono">{room.players.filter(p => p.isReady).length} / {room.players.length} players ready</div>
                <div className="flex items-center gap-3">
                  {!isHost && (<button type="button" onClick={handleToggleReady} className={`px-5 py-2.5 rounded-xl font-heading font-black text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${myPlayer?.isReady ? 'bg-white/5 border border-white/20 text-slate-300 hover:text-white' : 'btn-gold-cinematic text-black'}`}>{myPlayer?.isReady ? <><X className="w-4 h-4" /> Unready</> : <><Check className="w-4 h-4" /> Ready Up</>}</button>)}
                  {isHost && (<button type="button" onClick={handleStartTournament} disabled={room.players.length < 2 || !room.players.every(p => p.isReady)} className="btn-gold-cinematic px-8 py-3 rounded-xl font-heading font-black text-sm uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"><Play className="w-4 h-4 fill-current" /><span>Start Tournament</span></button>)}
                </div>
              </div>
              {isHost && room.players.length >= 2 && !room.players.every(p => p.isReady) && (<div className="text-center text-xs text-amber-400 font-mono animate-pulse">Waiting for all players to ready up...</div>)}
            </div>
          )}

          {lobbyMode === 'BRACKET' && room && (
            <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-2xl space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 flex-wrap gap-3">
                <div><span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block font-mono">TOURNAMENT ROUND {currentRound} - {room.teamSize}v{room.teamSize}</span><h2 className="text-2xl font-heading font-black text-white">Round {currentRound} Bracket</h2></div>
                <div className="flex items-center gap-2">
                  {isHost && (<button type="button" onClick={handleAdvanceRound} className="btn-gold-cinematic px-6 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"><span>Advance Round</span><Crown className="w-4 h-4" /></button>)}
                  <button type="button" onClick={handleLeaveRoom} className="px-4 py-2.5 rounded-xl border border-white/20 text-slate-400 hover:text-white text-xs font-bold transition-all cursor-pointer">Leave</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bracketMatches.filter(m => m.round === currentRound).map(match => {
                  const p1 = match.player1; const p2 = match.player2; const isBye = !p2;
                  return (<div key={match.id} className={`p-4 rounded-xl border transition-all space-y-3 ${match.status==='COMPLETED'?'bg-[#12141C] border-emerald-500/40':'bg-[#12141C] border-white/[0.08] shadow-lg'}`}>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400"><span>Match #{match.matchNumber}</span><span className={match.status==='COMPLETED'?'text-emerald-400 font-bold':'text-amber-400 font-bold'}>{isBye?'BYE':match.status==='COMPLETED'?'RESOLVED':'READY'}</span></div>
                    <div className="space-y-2">{[p1,p2].filter(Boolean).map((player,pi) => (<div key={pi} className={`p-2.5 rounded-lg flex items-center justify-between ${match.winner?.userId===player?.userId?'bg-emerald-950/40 border border-emerald-400/40':'bg-[#07080B] border border-white/[0.04]'}`}><div className="flex items-center gap-2"><span className="text-lg">{player?.avatar||'?'}</span><div><div className="font-heading font-black text-xs text-white">{player?.displayName||player?.username}</div><div className="text-[9px] text-amber-400 font-mono">Pwr {player?.teamPower}</div></div></div>{match.winner?.userId===player?.userId&&<span className="text-[10px] font-black text-emerald-400 font-mono">WINNER</span>}</div>))}</div>
                    {match.status!=='COMPLETED'&&!isBye&&isHost&&(<button type="button" onClick={() => handleSimulateMatch(match.id)} className="btn-primary-cinematic w-full py-2 rounded-lg font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"><Swords className="w-3.5 h-3.5" /><span>Resolve Match</span></button>)}
                    {match.status!=='COMPLETED'&&!isBye&&!isHost&&(<div className="text-center text-xs text-slate-500 font-mono py-1">Waiting for host to resolve...</div>)}
                  </div>);
                })}
              </div>
            </div>
          )}

          {lobbyMode === 'CHAMPION' && champion && (
            <div className="p-8 rounded-2xl bg-[#0E1017] border border-amber-400/50 shadow-2xl text-center space-y-6 animate-fadeIn">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-[#12141C] border border-amber-400 flex items-center justify-center text-4xl shadow-lg shadow-amber-400/20 animate-bounce">👑</div>
              <div className="space-y-2"><span className="text-xs font-black uppercase text-amber-400 tracking-widest font-mono">TOURNAMENT CHAMPION</span><h2 className="text-3xl sm:text-4xl font-heading font-black text-white uppercase">{champion.displayName || champion.username}</h2><p className="text-slate-400 text-sm">Defeated all opponents in a real-player {room?.teamSize}v{room?.teamSize} tournament!</p></div>
              <div className="flex items-center justify-center gap-4 flex-wrap"><div className="px-6 py-3 rounded-xl bg-[#07080B] border border-amber-400/40 text-center"><div className="text-[10px] text-slate-400 uppercase font-mono">CHAMPION REWARD</div><div className="text-xl font-black text-amber-300 font-mono">5,000 Astra Coins</div></div><div className="px-6 py-3 rounded-xl bg-[#07080B] border border-white/[0.08] text-center"><div className="text-[10px] text-slate-400 uppercase font-mono">EXCLUSIVE SHARDS</div><div className="text-xl font-black text-cyan-300 font-mono">+50 Card Shards</div></div></div>
              <button type="button" onClick={() => { soundManager.playClick(); setLobbyMode('HOME'); setRoom(null); setBracketMatches([]); setChampion(null); setCurrentRound(1); }} className="btn-gold-cinematic px-8 py-3 rounded-xl font-heading font-black text-sm uppercase tracking-wider transition-all cursor-pointer">Start New Tournament</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
