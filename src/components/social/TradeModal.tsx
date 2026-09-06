import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../audio/soundManager';
import { socket } from '../../socket/socket';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { CharacterImage } from '../common/CharacterImage';
import { 
  ArrowLeftRight, Check, X, ShieldAlert, AlertTriangle, 
  Sparkles, History, Gem, User, CheckCircle2, Lock, 
  HelpCircle, RefreshCw, Layers
} from 'lucide-react';
import { TradeSession, TradeOfferItem, TradeHistoryLog } from '../../types/game';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeTrade: TradeSession | null;
  onTradeUpdated: (trade: TradeSession | null) => void;
}

export function TradeModal({ isOpen, onClose, activeTrade, onTradeUpdated }: Props) {
  const { user, token, refreshProfile } = useAuth();
  const [selectedOfferType, setSelectedOfferType] = useState<'CHARACTER' | 'SHARDS'>('CHARACTER');
  const [selectedCharId, setSelectedCharId] = useState<string>('');
  const [selectedShardCat, setSelectedShardCat] = useState<'HERO' | 'RARE' | 'EPIC' | 'VILLAIN' | 'COSMIC' | 'MYTHIC'>('RARE');
  const [shardAmount, setShardAmount] = useState<number>(10);
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'trade' | 'history'>('trade');
  const [tradeLogs, setTradeLogs] = useState<TradeHistoryLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [completedNotification, setCompletedNotification] = useState<string | null>(null);

  const isInitiator = activeTrade?.initiatorId === user?.id;
  const myOffer = isInitiator ? activeTrade?.initiatorOffer : activeTrade?.responderOffer;
  const partnerOffer = isInitiator ? activeTrade?.responderOffer : activeTrade?.initiatorOffer;
  const myConfirmed = isInitiator ? activeTrade?.initiatorConfirmed : activeTrade?.responderConfirmed;
  const partnerConfirmed = isInitiator ? activeTrade?.responderConfirmed : activeTrade?.initiatorConfirmed;
  const partnerName = isInitiator ? activeTrade?.responderUsername : activeTrade?.initiatorUsername;
  const partnerAvatar = isInitiator ? activeTrade?.responderAvatar : activeTrade?.initiatorAvatar;

  // Set initial selected character if owned
  useEffect(() => {
    if (user?.ownedCharacters && user.ownedCharacters.length > 0 && !selectedCharId) {
      setSelectedCharId(user.ownedCharacters[0]);
    }
  }, [user?.ownedCharacters, selectedCharId]);

  // Fetch trade history logs
  const fetchTradeLogs = async () => {
    if (!token) return;
    setIsLoadingLogs(true);
    try {
      const res = await fetch('/api/social/trades/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTradeLogs(data.logs || []);
      }
    } catch (e) {
      console.error('Failed to load trade logs:', e);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchTradeLogs();
    }
  }, [activeTab]);

  // Real-time socket listeners for active trade
  useEffect(() => {
    if (!socket) return;

    const handleTradeUpdated = (data: { trade: TradeSession }) => {
      onTradeUpdated(data.trade);
      setActionError(null);
    };

    const handleTradeError = (data: { error: string }) => {
      setActionError(data.error);
      soundManager.playAttackHit();
    };

    const handleTradeCompleted = (data: { trade: TradeSession; log: TradeHistoryLog }) => {
      onTradeUpdated(data.trade);
      soundManager.playVictory();
      setCompletedNotification(`Trade completed successfully with ${partnerName}! Items have been transferred.`);
      refreshProfile();
      setTimeout(() => {
        setCompletedNotification(null);
        onTradeUpdated(null);
        onClose();
      }, 4000);
    };

    const handleTradeCancelled = (data: { reason: string }) => {
      soundManager.playAttackHit();
      setActionError(data.reason || 'Trade was cancelled.');
      setTimeout(() => {
        onTradeUpdated(null);
        onClose();
      }, 2500);
    };

    socket.on('trade_updated', handleTradeUpdated);
    socket.on('trade_error', handleTradeError);
    socket.on('trade_completed', handleTradeCompleted);
    socket.on('trade_cancelled', handleTradeCancelled);

    return () => {
      socket.off('trade_updated', handleTradeUpdated);
      socket.off('trade_error', handleTradeError);
      socket.off('trade_completed', handleTradeCompleted);
      socket.off('trade_cancelled', handleTradeCancelled);
    };
  }, [socket, partnerName, onTradeUpdated, refreshProfile, onClose]);

  if (!isOpen) return null;

  // Handle setting/submitting local offer to server
  const handleSetOffer = () => {
    if (!activeTrade || !socket) return;
    soundManager.playClick();
    setActionError(null);

    let offer: TradeOfferItem | null = null;
    if (selectedOfferType === 'CHARACTER') {
      const char = ALL_CHARACTERS.find(c => c.id === selectedCharId);
      if (!char) {
        setActionError('Select a valid character to trade.');
        return;
      }
      offer = {
        type: 'CHARACTER',
        characterId: char.id,
        characterName: char.name,
        characterGrade: char.grade || 'B',
        characterImageUrl: char.imageUrl,
      };
    } else {
      const available = user?.shardBalances?.[selectedShardCat] || 0;
      if (shardAmount <= 0 || shardAmount > available) {
        setActionError(`You only have ${available} ${selectedShardCat} shards.`);
        return;
      }
      offer = {
        type: 'SHARDS',
        shardCategory: selectedShardCat,
        shardAmount: Number(shardAmount),
      };
    }

    const authToken = token || (typeof localStorage !== 'undefined' ? localStorage.getItem('mcu_auth_token') : undefined);
    socket.emit('trade_update_offer', { tradeId: activeTrade.id, offer, authToken }, (res: any) => {
      if (res?.success) {
        onTradeUpdated(res.trade);
      } else {
        setActionError(res?.error || 'Failed to update offer.');
      }
    });
  };

  // Handle confirming trade
  const handleConfirmTrade = () => {
    if (!activeTrade || !socket) return;
    if (!myOffer || !partnerOffer) {
      setActionError('Both players must place an offer before confirming.');
      return;
    }
    soundManager.playClick();
    setShowFinalConfirm(false);

    const authToken = token || (typeof localStorage !== 'undefined' ? localStorage.getItem('mcu_auth_token') : undefined);
    socket.emit('trade_confirm', { tradeId: activeTrade.id, authToken }, (res: any) => {
      if (res?.success) {
        onTradeUpdated(res.trade);
      } else {
        setActionError(res?.error || 'Confirmation failed.');
      }
    });
  };

  // Handle cancelling trade
  const handleCancelTrade = () => {
    if (!activeTrade || !socket) {
      onClose();
      return;
    }
    soundManager.playClick();
    const authToken = token || (typeof localStorage !== 'undefined' ? localStorage.getItem('mcu_auth_token') : undefined);
    socket.emit('trade_cancel', { tradeId: activeTrade.id, authToken });
    onTradeUpdated(null);
    onClose();
  };

  // Character detail helper
  const getCharacterDetails = (charId?: string) => {
    return ALL_CHARACTERS.find(c => c.id === charId);
  };

  const getRarityColor = (grade?: string) => {
    switch (grade) {
      case 'MYTHIC': return 'border-amber-400 bg-amber-500/10 text-amber-300';
      case 'A': return 'border-purple-400 bg-purple-500/10 text-purple-300';
      case 'B': return 'border-emerald-400 bg-emerald-500/10 text-emerald-300';
      default: return 'border-slate-500 bg-slate-500/10 text-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-marvel-card border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-marvel-surface">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-950/40">
              <ArrowLeftRight className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wider text-white flex items-center gap-2 font-display">
                QUANTUM TRADE EXCHANGE
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-950/60 text-red-300 border border-red-500/40">
                  SECURE P2P
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Atomic peer-to-peer hero & shard trading with two-phase verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tabs: Active Trade vs History */}
            <div className="flex bg-slate-800/80 p-1 rounded-lg border border-slate-700/50">
              <button
                onClick={() => { setActiveTab('trade'); soundManager.playClick(); }}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  activeTab === 'trade' 
                    ? 'bg-cyan-500 text-slate-950 shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Active Trade
              </button>
              <button
                onClick={() => { setActiveTab('history'); soundManager.playClick(); }}
                className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-semibold transition-all ${
                  activeTab === 'history' 
                    ? 'bg-cyan-500 text-slate-950 shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" /> Logs
              </button>
            </div>

            <button
              onClick={handleCancelTrade}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-white transition-colors"
              title="Close/Cancel Trade"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications & Error Banners */}
        {actionError && (
          <div className="mx-6 mt-3 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center justify-between animate-shake">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{actionError}</span>
            </div>
            <button onClick={() => setActionError(null)} className="text-red-400 hover:text-red-200">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {completedNotification && (
          <div className="mx-6 mt-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{completedNotification}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          
          {activeTab === 'history' ? (
            /* Trade History View */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <History className="w-4 h-4 text-cyan-400" />
                  Your Atomic Trade History
                </h3>
                <button
                  onClick={fetchTradeLogs}
                  disabled={isLoadingLogs}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLogs ? 'animate-spin' : ''}`} /> Refresh
                </button>
              </div>

              {tradeLogs.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <ArrowLeftRight className="w-12 h-12 mx-auto mb-2 opacity-30 text-slate-400" />
                  <p className="text-sm">No completed trades on record yet.</p>
                  <p className="text-xs text-slate-600 mt-1">Initiate a trade with any online friend from the Social tab.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {tradeLogs.map(log => {
                    const isUserA = log.playerAId === user?.id;
                    const partnerUname = isUserA ? log.playerBUname : log.playerAUname;
                    const sentOffer = isUserA ? log.playerAOffered : log.playerBOffered;
                    const receivedOffer = isUserA ? log.playerBOffered : log.playerAOffered;

                    return (
                      <div 
                        key={log.id} 
                        className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold">
                            ✓
                          </div>
                          <div>
                            <div className="text-slate-200 font-medium">
                              Traded with <span className="text-cyan-300 font-semibold">{partnerUname}</span>
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {new Date(log.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
                          <div>
                            <span className="text-slate-500 block text-[10px]">YOU GAVE</span>
                            <span className="text-rose-300 font-semibold">
                              {sentOffer.type === 'CHARACTER' 
                                ? sentOffer.characterName 
                                : `${sentOffer.shardAmount}x ${sentOffer.shardCategory} Shards`}
                            </span>
                          </div>
                          <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" />
                          <div>
                            <span className="text-slate-500 block text-[10px]">YOU RECEIVED</span>
                            <span className="text-emerald-300 font-semibold">
                              {receivedOffer.type === 'CHARACTER' 
                                ? receivedOffer.characterName 
                                : `${receivedOffer.shardAmount}x ${receivedOffer.shardCategory} Shards`}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : !activeTrade ? (
            /* No Active Trade State */
            <div className="py-16 text-center">
              <ArrowLeftRight className="w-16 h-16 mx-auto mb-3 text-slate-600 animate-pulse" />
              <h3 className="text-lg font-bold text-slate-300">No Active Trade Session</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Open your Friends list in the social hub and click "Trade" next to an online friend to launch an atomic trade session.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            /* Active Two-Sided Trade Arena */
            <div className="space-y-6">
              
              {/* Status Header */}
              <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-slate-400">SESSION:</span>
                  <span className="font-mono text-cyan-300 font-bold">{activeTrade.id}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span>STATUS:</span>
                  <span className="font-semibold text-emerald-400 uppercase tracking-wider">{activeTrade.status}</span>
                </div>
              </div>

              {/* Two Sided Exchange Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Side A: Your Offer (YOU) */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/80 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <div className="text-xl">{user?.avatar || '🦸‍♂️'}</div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          {user?.displayName || user?.username} (YOU)
                          {myConfirmed && (
                            <span className="px-1.5 py-0.2 text-[10px] rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                              LOCKED & READY
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-cyan-400">Level {user?.level || 1} Commander</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {myConfirmed ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <Check className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-700/40 border border-slate-600/40 flex items-center justify-center text-slate-500">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Display Current Offer */}
                  <div className="my-4 min-h-[140px] flex items-center justify-center">
                    {myOffer ? (
                      myOffer.type === 'CHARACTER' ? (
                        <div className={`w-full p-3 rounded-xl border flex items-center gap-3.5 ${getRarityColor(myOffer.characterGrade)}`}>
                          <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/20 shadow shrink-0 bg-black/60">
                            <CharacterImage
                              character={{
                                id: myOffer.characterId || '',
                                name: myOffer.characterName,
                                grade: myOffer.characterGrade,
                                imageUrl: myOffer.characterImageUrl
                              }}
                              aspect="square"
                              className="w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-black/40 uppercase">
                              {myOffer.characterGrade} GRADE
                            </span>
                            <h4 className="text-sm font-bold text-white mt-1">{myOffer.characterName}</h4>
                            <p className="text-[11px] text-slate-300">Offered Character Asset</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full p-3 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-200 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                            <Gem className="w-6 h-6 text-amber-300" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-950/60 uppercase text-amber-300">
                              {myOffer.shardCategory} CATEGORY
                            </span>
                            <h4 className="text-base font-bold text-white mt-0.5">{myOffer.shardAmount} Shards</h4>
                            <p className="text-[11px] text-amber-300/80">Infusion Materials</p>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="text-center p-6 border-2 border-dashed border-slate-700/60 rounded-xl w-full text-slate-500">
                        <Sparkles className="w-8 h-8 mx-auto mb-1 opacity-30 text-cyan-400" />
                        <span className="text-xs">No item placed yet. Configure below.</span>
                      </div>
                    )}
                  </div>

                  {/* Offer Configuration Selector (Disabled if confirmed) */}
                  {!myConfirmed && (
                    <div className="space-y-3 pt-3 border-t border-slate-700/40 bg-slate-900/40 p-3 rounded-xl">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedOfferType('CHARACTER')}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                            selectedOfferType === 'CHARACTER'
                              ? 'bg-cyan-600/30 border-cyan-500 text-cyan-200'
                              : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Hero Character
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedOfferType('SHARDS')}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                            selectedOfferType === 'SHARDS'
                              ? 'bg-amber-600/30 border-amber-500 text-amber-200'
                              : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Infusion Shards
                        </button>
                      </div>

                      {selectedOfferType === 'CHARACTER' ? (
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Select Owned Character:</label>
                          <select
                            value={selectedCharId}
                            onChange={e => setSelectedCharId(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                          >
                            {(user?.ownedCharacters || []).map(id => {
                              const char = ALL_CHARACTERS.find(c => c.id === id);
                              if (!char) return null;
                              return (
                                <option key={id} value={id}>
                                  {char.name} ({char.grade || 'B'}) — {char.alignment || 'HERO'}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] text-slate-400 block mb-1">Category:</label>
                            <select
                              value={selectedShardCat}
                              onChange={e => setSelectedShardCat(e.target.value as any)}
                              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            >
                              <option value="HERO">HERO ({user?.shardBalances?.HERO || 0})</option>
                              <option value="RARE">RARE ({user?.shardBalances?.RARE || 0})</option>
                              <option value="EPIC">EPIC ({user?.shardBalances?.EPIC || 0})</option>
                              <option value="VILLAIN">VILLAIN ({user?.shardBalances?.VILLAIN || 0})</option>
                              <option value="COSMIC">COSMIC ({user?.shardBalances?.COSMIC || 0})</option>
                              <option value="MYTHIC">MYTHIC ({user?.shardBalances?.MYTHIC || 0})</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 block mb-1">Quantity:</label>
                            <input
                              type="number"
                              min={1}
                              max={user?.shardBalances?.[selectedShardCat] || 1}
                              value={shardAmount}
                              onChange={e => setShardAmount(Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleSetOffer}
                        className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-600/30"
                      >
                        {myOffer ? 'Update Your Offer' : 'Place Offer in Trade'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Side B: Partner's Offer (PARTNER) */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/80 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <div className="text-xl">{partnerAvatar || '🦸‍♀️'}</div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          {partnerName} (PARTNER)
                          {partnerConfirmed && (
                            <span className="px-1.5 py-0.2 text-[10px] rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                              LOCKED & READY
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">Trade Counterpart</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {partnerConfirmed ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <Check className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-700/40 border border-slate-600/40 flex items-center justify-center text-slate-500">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Partner's Offer Display */}
                  <div className="my-4 min-h-[140px] flex items-center justify-center">
                    {partnerOffer ? (
                      partnerOffer.type === 'CHARACTER' ? (
                        <div className={`w-full p-3 rounded-xl border flex items-center gap-3.5 ${getRarityColor(partnerOffer.characterGrade)}`}>
                          <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/20 shadow shrink-0 bg-black/60">
                            <CharacterImage
                              character={{
                                id: partnerOffer.characterId || '',
                                name: partnerOffer.characterName,
                                grade: partnerOffer.characterGrade,
                                imageUrl: partnerOffer.characterImageUrl
                              }}
                              aspect="square"
                              className="w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-black/40 uppercase">
                              {partnerOffer.characterGrade} GRADE
                            </span>
                            <h4 className="text-sm font-bold text-white mt-1">{partnerOffer.characterName}</h4>
                            <p className="text-[11px] text-slate-300">Offered Character Asset</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full p-3 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-200 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                            <Gem className="w-6 h-6 text-amber-300" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-950/60 uppercase text-amber-300">
                              {partnerOffer.shardCategory} CATEGORY
                            </span>
                            <h4 className="text-base font-bold text-white mt-0.5">{partnerOffer.shardAmount} Shards</h4>
                            <p className="text-[11px] text-amber-300/80">Infusion Materials</p>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="text-center p-6 border-2 border-dashed border-slate-700/60 rounded-xl w-full text-slate-500">
                        <Sparkles className="w-8 h-8 mx-auto mb-1 opacity-30 text-amber-400" />
                        <span className="text-xs">Waiting for {partnerName} to select an offer...</span>
                      </div>
                    )}
                  </div>

                  {/* Partner Live Status Box */}
                  <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-xs text-center">
                    {partnerConfirmed ? (
                      <div className="text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> {partnerName} has confirmed this trade!
                      </div>
                    ) : partnerOffer ? (
                      <div className="text-amber-400 font-medium flex items-center justify-center gap-1.5">
                        <Layers className="w-4 h-4" /> {partnerName} placed an offer. Reviewing terms...
                      </div>
                    ) : (
                      <div className="text-slate-400">
                        Waiting for counterpart selection...
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Action Buttons & Two-Phase Confirmation */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Both commanders must lock-in terms. Trades execute atomically on the server.</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleCancelTrade}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                  >
                    Cancel Trade
                  </button>

                  {!myConfirmed ? (
                    <button
                      type="button"
                      disabled={!myOffer || !partnerOffer}
                      onClick={() => setShowFinalConfirm(true)}
                      className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                        myOffer && partnerOffer
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      }`}
                    >
                      <Lock className="w-4 h-4" /> Confirm & Lock Offer
                    </button>
                  ) : (
                    <div className="px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                      Waiting for {partnerName}...
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Final Irreversible Confirmation Dialog */}
        {showFinalConfirm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-slate-900 border border-amber-500/50 rounded-2xl p-6 text-center space-y-4 shadow-2xl shadow-amber-950/40">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Final Trade Confirmation</h3>
              <p className="text-sm font-semibold text-amber-300">
                "Are you sure? This trade cannot be reversed."
              </p>
              <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-left space-y-1">
                <div>• You will transfer: <strong className="text-rose-300">{myOffer?.type === 'CHARACTER' ? myOffer.characterName : `${myOffer?.shardAmount}x ${myOffer?.shardCategory} Shards`}</strong></div>
                <div>• You will receive: <strong className="text-emerald-300">{partnerOffer?.type === 'CHARACTER' ? partnerOffer.characterName : `${partnerOffer?.shardAmount}x ${partnerOffer?.shardCategory} Shards`}</strong></div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFinalConfirm(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmTrade}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
                >
                  Yes, Execute Trade
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
