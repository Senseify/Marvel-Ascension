import React, { useMemo, useState } from 'react';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { useAuth } from '../../context/AuthContext';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { Hammer, Sparkles, Check, AlertCircle, Zap } from 'lucide-react';
import { getShardConfig } from '../../data/shardConfig';

const CATEGORIES = ['HERO', 'RARE', 'EPIC', 'VILLAIN', 'COSMIC', 'MYTHIC'] as const;
type ForgeCategory = typeof CATEGORIES[number];

const TOKEN_STYLES: Record<ForgeCategory, {
  label: string; icon: string; gradient: string; border: string;
  text: string; glow: string; craftBtn: string; headerGradient: string;
}> = {
  HERO:   { label: 'HERO',   icon: '✦', gradient: 'from-red-700 to-rose-950', border: 'border-red-500/60', text: 'text-red-100', glow: 'shadow-[0_0_20px_rgba(230,36,41,0.4)]', craftBtn: 'from-red-600 to-red-800', headerGradient: 'from-red-950 via-rose-950 to-slate-900' },
  RARE:   { label: 'RARE',   icon: '🟢', gradient: 'from-emerald-700 to-green-950', border: 'border-emerald-400/60', text: 'text-emerald-100', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]', craftBtn: 'from-emerald-500 to-green-700', headerGradient: 'from-emerald-950 via-green-900 to-slate-900' },
  EPIC:   { label: 'EPIC',   icon: '◆', gradient: 'from-blue-700 to-indigo-950', border: 'border-blue-400/60', text: 'text-blue-100', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]', craftBtn: 'from-blue-500 to-indigo-600', headerGradient: 'from-blue-950 via-indigo-950 to-slate-900' },
  MYTHIC: { label: 'MYTHIC', icon: '🌟', gradient: 'from-amber-600 to-yellow-800',   border: 'border-amber-400/60',  text: 'text-amber-200',   glow: 'shadow-[0_0_30px_rgba(245,158,11,0.5)]',  craftBtn: 'from-amber-400 to-yellow-500',    headerGradient: 'from-amber-950 via-yellow-950 to-slate-900' },
  VILLAIN:{ label: 'VILLAIN',icon: '✦', gradient: 'from-purple-700 to-fuchsia-950',       border: 'border-purple-500/50',    text: 'text-purple-200',     glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',   craftBtn: 'from-purple-500 to-fuchsia-700',        headerGradient: 'from-purple-950 via-fuchsia-900 to-slate-900' },
  COSMIC: { label: 'COSMIC', icon: '✧', gradient: 'from-cyan-700 to-teal-950', border: 'border-cyan-400/60', text: 'text-cyan-100', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]', craftBtn: 'from-cyan-500 to-teal-700', headerGradient: 'from-cyan-950 via-teal-900 to-slate-900' },
};

export function CharacterTokenForge() {
  const { user, craftCharacterToken, redeemCharacterToken } = useAuth();
  const [category, setCategory] = useState<ForgeCategory>('HERO');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);

  const style = TOKEN_STYLES[category];

  const characters = useMemo(() => {
    if (category === 'HERO') return ALL_CHARACTERS.filter(c => c.alignment === 'Hero' || c.alignment === 'Anti-Hero');
    if (category === 'VILLAIN') return ALL_CHARACTERS.filter(c => c.alignment === 'Villain');
    if (category === 'COSMIC') return ALL_CHARACTERS.filter(c => c.alignment === 'Cosmic');
    if (category === 'RARE') return ALL_CHARACTERS.filter(c => c.grade === 'B' || c.grade === 'C');
    if (category === 'EPIC') return ALL_CHARACTERS.filter(c => c.grade === 'A');
    return ALL_CHARACTERS.filter(c => c.grade === 'MYTHIC');
  }, [category]);

  const shards = (user as any)?.shardBalances?.[category] ?? 0;
  const shard = getShardConfig(category);
  const tokens = user?.characterTokens?.[category] || 0;

  const showMsg = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const craft = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const result = await craftCharacterToken(category);
      showMsg(result.success ? 'success' : 'error',
        result.success ? `✅ ${style.label} Token crafted!` : result.error || 'Unable to craft token.');
    } finally { setBusy(false); }
  };

  const redeem = async (characterId: string) => {
    if (busy) return;
    setBusy(true); setRedeemingId(characterId);
    try {
      const result = await redeemCharacterToken(category, characterId);
      showMsg(result.success ? 'success' : 'error',
        result.success ? '🎉 Character permanently added to your collection!' : result.error || 'Unable to redeem token.');
    } finally { setBusy(false); setRedeemingId(null); }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="relative p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-2xl overflow-hidden">
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Hammer className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-heading font-black text-white uppercase tracking-wider">
                TOKEN <span className="text-amber-400">FORGE</span>
              </h2>
            </div>
            <p className="text-sm text-slate-300">Collect 50 matching shards → craft a category Token → choose one eligible character</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[#12141C] border border-white/[0.08] text-amber-400 font-mono font-black text-sm flex items-center gap-2">
            <span>{style.icon}</span>
            <span>{style.label} FORGE</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map(cat => {
          const s = TOKEN_STYLES[cat];
          const isActive = category === cat;
          return (
            <button key={cat} type="button" onClick={() => setCategory(cat)}
              className={`px-4 py-2.5 rounded-xl font-heading font-black text-xs flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                isActive ? 'bg-amber-400 text-black shadow-sm' : 'bg-[#0E1017] text-slate-400 border border-white/[0.08] hover:text-white'
              }`}>
              <span>{s.icon}</span><span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Shards + Craft Row */}
      <div className="p-5 rounded-2xl bg-[#0E1017] border border-white/[0.08] shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="text-center"><div className="text-3xl font-heading font-black" style={{ color: shard.color }}>{shards}</div><div className="text-xs uppercase font-mono" style={{ color: shard.color }}>{shard.name}</div></div>
            <div className="text-slate-500 text-xl font-mono">/</div>
            <div className="text-center"><div className="text-3xl font-heading font-black text-white">50</div><div className="text-xs text-slate-400 uppercase font-mono">Needed</div></div>
            <div className="text-slate-500 text-xl font-mono">→</div>
            <div className="text-center"><div className="text-3xl font-heading font-black text-amber-400">{tokens}</div><div className="text-xs text-slate-400 uppercase font-mono">Tokens</div></div>
          </div>
          <div className="w-56 h-2 bg-black/60 rounded-full overflow-hidden border border-white/[0.08]">
            <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (shards / 50) * 100)}%` }} />
          </div>
        </div>
        <button type="button" disabled={busy || shards < 50} onClick={craft}
          className={`px-6 py-3 rounded-xl font-heading font-black text-xs uppercase tracking-wider disabled:opacity-40 transition-all flex items-center gap-2 cursor-pointer ${
            shards >= 50 ? 'btn-gold-cinematic text-black' : 'bg-[#181B26] text-slate-600 border border-white/[0.05]'
          }`}>
          <Sparkles className="w-4 h-4" /> CRAFT {style.label} TOKEN
        </button>
      </div>

      {/* Toast */}
      {message && (
        <div className={`flex items-center gap-2 p-3 rounded-xl border text-sm ${message.type === 'success' ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200' : 'bg-red-950/60 border-red-500/40 text-red-200'}`}>
          {message.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      {tokens > 0 && (
        <div className={`p-3 rounded-xl border ${style.border} bg-black/30 flex items-center gap-2 text-sm ${style.text}`}>
          <Zap className="w-4 h-4 flex-shrink-0" />
          You have <strong className="mx-1">{tokens} {style.label} Token{tokens !== 1 ? 's' : ''}</strong> — click any unowned character below to unlock them!
        </div>
      )}

      {/* Characters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-h-[540px] overflow-y-auto">
        {characters.map(character => {
          const owned = user?.ownedCharacters?.includes(character.id);
          const isRedeeming = redeemingId === character.id;
          return (
            <div key={character.id} className={`p-3 rounded-2xl border text-center transition-all ${owned ? 'bg-emerald-950/30 border-emerald-500/20' : `bg-black/40 border-white/10 hover:${style.border}`}`}>
              <CharacterPortrait character={character} size="sm" showBadge={false} className="mx-auto" />
              <div className="mt-2 text-xs font-black text-white line-clamp-2 min-h-[2rem] flex items-center justify-center text-center leading-tight">{character.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{character.grade} • {character.alignment}</div>
              <button type="button" disabled={busy || tokens < 1 || !!owned} onClick={() => redeem(character.id)}
                className={`mt-2 w-full py-1.5 rounded-lg text-[10px] font-black transition-all ${
                  owned ? 'bg-emerald-900/50 text-emerald-300 cursor-default'
                    : tokens >= 1 ? `bg-gradient-to-r ${style.craftBtn} text-white hover:opacity-90`
                    : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
                }`}>
                {isRedeeming ? '...' : owned ? '✓ OWNED' : tokens >= 1 ? 'USE TOKEN' : 'NO TOKENS'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
