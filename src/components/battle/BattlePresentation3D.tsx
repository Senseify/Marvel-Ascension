import React from 'react';
import { Swords } from 'lucide-react';
import { Character } from '../../types/game';
import { BattleFighterCard } from './BattleFighterCard';
import { CombatFXOverlay, CombatEffectType, ComicBurst } from './fx/CombatFXOverlay';
import { getCharacterImageUrl } from '../../data/marvelImageMap';

export interface BattlePresentation3DProps {
  player: Character;
  opponent: Character;
  playerAttacking?: boolean;
  opponentAttacking?: boolean;
  playerTakingHit?: boolean;
  opponentTakingHit?: boolean;
  playerDefending?: boolean;
  opponentDefending?: boolean;
  playerSuper?: boolean;
  opponentSuper?: boolean;
  playerDamage?: number | null;
  opponentDamage?: number | null;
  effectType?: CombatEffectType;
  comicBurst?: ComicBurst | null;
  signatureMoveName?: string;
  title?: string;
  className?: string;
  playerControls?: React.ReactNode;
  opponentControls?: React.ReactNode;
  compact?: boolean;
}

/** Shared, high-fidelity battle stage used by local, online, sandbox, and dungeon battles. */
export function BattlePresentation3D({
  player,
  opponent,
  playerAttacking = false,
  opponentAttacking = false,
  playerTakingHit = false,
  opponentTakingHit = false,
  playerDefending = false,
  opponentDefending = false,
  playerSuper = false,
  opponentSuper = false,
  playerDamage = null,
  opponentDamage = null,
  effectType = 'melee',
  comicBurst = null,
  signatureMoveName = '',
  title = 'BATTLE SPOTLIGHT',
  className = '',
  playerControls,
  opponentControls,
  compact = false,
}: BattlePresentation3DProps) {
  const hp = (hero: Character) => Math.max(0, Math.min(100, hero.currentHp ?? 100));
  const image = (hero: Character) => getCharacterImageUrl(hero);

  const [mobileTab, setMobileTab] = React.useState<'player' | 'opponent'>('player');

  return (
    <section className={`battle-presentation-3d relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#131620] via-[#0A0C12] to-[#07080A] p-3 sm:p-6 shadow-[0_14px_40px_rgba(0,0,0,0.9)] ${className}`}>
      <div className="absolute inset-0 pointer-events-none opacity-20 [background:radial-gradient(ellipse_at_center,rgba(230,36,41,.25),transparent_70%)]" />
      <div className="absolute inset-x-3 bottom-3 h-1/2 rounded-[50%] border border-white/10 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:32px_32px] [transform:perspective(500px)_rotateX(62deg)] [transform-origin:bottom] opacity-40 pointer-events-none" />
      <div className="absolute left-1/4 top-1/3 h-32 w-32 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 top-1/3 h-32 w-32 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
      <CombatFXOverlay
        effectType={effectType}
        attackerSide={playerAttacking ? 'left' : 'right'}
        comicBurst={comicBurst}
        isSuperMove={playerSuper || opponentSuper}
        superHeroName={playerAttacking ? player.name : opponent.name}
        superHeroImageUrl={image(playerAttacking ? player : opponent)}
        superAbilityName={(playerAttacking ? player : opponent).specialAbilities?.[0]?.name || 'COSMIC STRIKE'}
        signatureMoveName={signatureMoveName}
      />
      {title && (
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2 mb-4">
          <span className="text-xs font-heading font-black uppercase tracking-widest text-amber-300">{title}</span>
          <Swords className="h-4 w-4 text-amber-400 animate-pulse" />
        </div>
      )}

      {/* MOBILE COMBAT VIEW (Screen < lg): ONE clearly visible Character Card + Controls */}
      <div className="lg:hidden relative z-10 space-y-3">
        {/* If both players have controls (hotseat), show quick switcher tab */}
        {opponentControls && (
          <div className="flex rounded-xl bg-black/70 p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setMobileTab('player')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-heading font-black uppercase transition-all ${
                mobileTab === 'player'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🔴 {player.name}
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('opponent')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-heading font-black uppercase transition-all ${
                mobileTab === 'opponent'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🟡 {opponent.name}
            </button>
          </div>
        )}

        {/* Compact Opponent Strip for the non-active fighter */}
        {(() => {
          const shownOpponent = mobileTab === 'player' ? opponent : player;
          return (
            <div className="p-2.5 rounded-2xl bg-[#0C0F17]/95 border border-amber-500/30 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-white/20 shrink-0">
                  <img src={image(shownOpponent)} alt={shownOpponent.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">RIVAL TARGET</span>
                  <h4 className="font-heading font-black text-xs text-white uppercase truncate">{shownOpponent.name}</h4>
                </div>
              </div>
              <div className="text-right shrink-0 space-y-1">
                <span className="text-[10px] font-mono font-black text-emerald-400 block">{hp(shownOpponent)} HP</span>
                <div className="w-20 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400" style={{ width: `${hp(shownOpponent)}%` }} />
                </div>
              </div>
            </div>
          );
        })()}

        {/* ONE Active Character Card + Attack/Ability Buttons */}
        {mobileTab === 'player' ? (
          <BattleFighterCard
            character={player}
            side="p1"
            currentHp={hp(player)}
            isAttacking={playerAttacking}
            isTakingHit={playerTakingHit}
            isDefending={playerDefending}
            isSuperActive={playerSuper}
            damageTaken={playerDamage}
            compact={compact}
          >
            {playerControls}
          </BattleFighterCard>
        ) : (
          <BattleFighterCard
            character={opponent}
            side="p2"
            currentHp={hp(opponent)}
            isAttacking={opponentAttacking}
            isTakingHit={opponentTakingHit}
            isDefending={opponentDefending}
            isSuperActive={opponentSuper}
            damageTaken={opponentDamage}
            compact={compact}
          >
            {opponentControls}
          </BattleFighterCard>
        )}
      </div>

      {/* DESKTOP COMBAT VIEW (Screen >= lg): Dual 5-col + 1-col VS layout */}
      <div className="hidden lg:grid relative z-10 grid-cols-11 gap-4 sm:gap-6 items-start">
        <div className="col-span-5">
          <BattleFighterCard
            character={player}
            side="p1"
            currentHp={hp(player)}
            isAttacking={playerAttacking}
            isTakingHit={playerTakingHit}
            isDefending={playerDefending}
            isSuperActive={playerSuper}
            damageTaken={playerDamage}
            compact={compact}
          >
            {playerControls}
          </BattleFighterCard>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center pt-8 sm:pt-28">
          <div className="rounded-full border border-amber-400/70 bg-black/80 p-3 shadow-glow-amber">
            <Swords className="h-5 w-5 text-amber-300 animate-spin" />
          </div>
          <span className="mt-2 text-xs font-black text-white tracking-widest font-heading">VS</span>
        </div>
        <div className="col-span-5">
          <BattleFighterCard
            character={opponent}
            side="p2"
            currentHp={hp(opponent)}
            isAttacking={opponentAttacking}
            isTakingHit={opponentTakingHit}
            isDefending={opponentDefending}
            isSuperActive={opponentSuper}
            damageTaken={opponentDamage}
            compact={compact}
          >
            {opponentControls}
          </BattleFighterCard>
        </div>
      </div>
    </section>
  );
}
