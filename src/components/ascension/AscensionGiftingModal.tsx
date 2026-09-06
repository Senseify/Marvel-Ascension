import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../audio/soundManager';
import { Gift, X, Send, AlertCircle, Check, Sparkles, Coins, Shield } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function AscensionGiftingModal({ onClose }: Props) {
  const { user, sendGift } = useAuth();
  const [recipient, setRecipient] = useState('');
  const [giftType, setGiftType] = useState<'COINS' | 'CHARACTER' | 'RELIC'>('COINS');
  const [coinAmount, setCoinAmount] = useState('500');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [statusNotice, setStatusNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) {
      setStatusNotice({ type: 'error', text: 'Please enter recipient commander username.' });
      return;
    }

    const amount = Number(coinAmount) || 500;
    if (giftType === 'COINS' && (user?.ascensionCoins || 0) < amount) {
      soundManager.playAttackHit();
      setStatusNotice({ type: 'error', text: `Insufficient Ascension Coins. You have 🪙 ${user?.ascensionCoins || 0}.` });
      return;
    }

    setIsSending(true);
    setStatusNotice(null);

    const result = await sendGift(recipient.trim(), giftType, undefined, amount, message.trim());
    setIsSending(false);

    if (result.success) {
      soundManager.playVictory();
      setStatusNotice({ type: 'success', text: `Gift successfully delivered to Commander "${recipient}"!` });
      setTimeout(() => {
        onClose();
      }, 2500);
    } else {
      soundManager.playAttackHit();
      setStatusNotice({ type: 'error', text: result.error || 'Failed to dispatch gift.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fadeIn select-none">
      <div className="relative w-full max-w-md bg-[#0E1017] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden p-5 sm:p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#12141C] border border-white/[0.08] text-amber-400">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-heading font-black text-white uppercase tracking-wider">
                MULTIVERSE <span className="text-amber-400">GIFT DISPATCH</span>
              </h2>
              <span className="text-[10px] text-slate-400 font-mono">
                Send Coins & Artifacts to Allied Commanders
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Toast */}
        {statusNotice && (
          <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold ${
            statusNotice.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
              : 'bg-red-950/80 border-red-500/50 text-red-300'
          }`}>
            {statusNotice.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{statusNotice.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSend} className="space-y-4">
          
          {/* Recipient Username */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-300 uppercase block">
              RECIPIENT USERNAME:
            </label>
            <input
              type="text"
              required
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              placeholder="e.g. IronCommander3000"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12141C] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 font-mono"
            />
          </div>

          {/* Gift Type Pills */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-300 uppercase block">
              GIFT TYPE:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['COINS', 'CHARACTER', 'RELIC'] as const).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setGiftType(t);
                  }}
                  className={`py-2 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
                    giftType === t
                      ? 'bg-amber-400 text-black shadow-sm'
                      : 'bg-[#12141C] text-slate-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Coin Amount (if coins) */}
          {giftType === 'COINS' && (
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-amber-400 uppercase flex items-center justify-between">
                <span>COIN AMOUNT (🪙):</span>
                <span className="text-slate-400 font-normal font-mono">Available: 🪙 {user?.ascensionCoins.toLocaleString() || 0}</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['250', '500', '1000', '2500'].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setCoinAmount(amt);
                    }}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      coinAmount === amt
                        ? 'bg-amber-400 text-black shadow-sm font-black'
                        : 'bg-[#12141C] text-amber-300 border border-white/[0.08]'
                    }`}
                  >
                    🪙 {amt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Message */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-300 uppercase block">
              COMMANDER MESSAGE (OPTIONAL):
            </label>
            <input
              type="text"
              maxLength={80}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="e.g. For our next Multiverse Raid!"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12141C] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 font-mono"
            />
          </div>

          {/* Send Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3 rounded-xl btn-gold-cinematic text-black font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? 'DISPATCHING GIFT...' : 'SEND MULTIVERSE GIFT'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
