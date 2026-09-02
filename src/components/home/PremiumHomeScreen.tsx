import React from 'react';
import {
  ArrowUpRight, Award, BookOpen, Crown, Crosshair, Dices, Flame,
  Gamepad2, Gem, Globe2, HelpCircle, Rocket, Swords, Trophy, Users,
} from 'lucide-react';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { useAuth } from '../../context/AuthContext';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { soundManager } from '../../audio/soundManager';

interface Props {
  onPlayAscension?: () => void;
  onPlayLocal: () => void;
  onPlayChaosAuction?: () => void;
  onPlayBlindBidding: () => void;
  onPlayMultiplayer: () => void;
  onPlayDungeon?: () => void;
  onPlayBossRaid?: () => void;
  onPlayBlitz?: () => void;
  onOpenEncyclopedia: () => void;
  onOpenHowToPlay: () => void;
  onOpenSandbox: () => void;
  onOpenRelicShop: () => void;
  onOpenSkillVault?: () => void;
  onPlayIntro?: () => void;
}

export function PremiumHomeScreen(props: Props) {
  const { user } = useAuth();
  const spotlight = ALL_CHARACTERS.find(character => character.grade === 'MYTHIC') || ALL_CHARACTERS[0];
  const level = user?.level || 1;
  const xp = Math.min(100, Math.max(0, user?.progressPercent || 0));
  const rank = user?.rankedTier && user.rankedTier !== 'UNRANKED' ? user.rankedTier : 'UNRANKED';

  const launch = (callback?: () => void) => {
    if (!callback) return;
    soundManager.playClick();
    callback();
  };

  const modes = [
    { label: 'Ascension', eyebrow: 'Flagship RPG / PvP', detail: 'Build your roster and climb the multiverse.', icon: Rocket, accent: 'cyan', callback: props.onPlayAscension },
    { label: 'Auction Wars', eyebrow: 'Bid • Build • Battle', detail: 'Win the lot. Shape the perfect squad.', icon: Gem, accent: 'amber', callback: props.onPlayLocal },
    { label: 'Ranked Arena', eyebrow: 'Competitive circuit', detail: 'Prove your rank against real commanders.', icon: Trophy, accent: 'violet', callback: props.onPlayAscension },
    { label: 'Dungeon Run', eyebrow: 'PvE expedition', detail: 'Descend deeper for relics and rewards.', icon: Crosshair, accent: 'rose', callback: props.onPlayDungeon },
  ];

  return (
    <div className="premium-home">
      <div className="premium-home__aurora premium-home__aurora--red" />
      <div className="premium-home__aurora premium-home__aurora--blue" />
      <div className="premium-home__grid" />

      <section className="premium-home__hero">
        <div className="premium-home__hero-copy">
          <div className="premium-kicker"><span className="premium-live-dot" /> SEASON 01 / COSMIC ASCENSION</div>
          <h1>Own the<br /><span>multiverse.</span></h1>
          <p>Assemble legends, outplay rivals, and write your name into the Marvel Ascension record.</p>
          <div className="premium-home__actions">
            <button className="premium-button premium-button--primary" onClick={() => launch(props.onPlayAscension)}>
              <Swords size={17} /> Enter battle <ArrowUpRight size={16} />
            </button>
            <button className="premium-button premium-button--quiet" onClick={() => launch(props.onOpenSandbox)}>
              <Gamepad2 size={16} /> Duel simulator
            </button>
          </div>
        </div>

        <div className="premium-home__spotlight">
          <div className="premium-home__spotlight-glow" />
          <div className="premium-home__spotlight-label"><span>FEATURED LEGEND</span><span>MYTHIC / 001</span></div>
          <CharacterPortrait character={spotlight} size="lg" className="premium-home__portrait" />
          <div className="premium-home__spotlight-info">
            <div><span className="premium-rarity">MYTHIC</span><span className="premium-stat">POWER {spotlight.overallPower}</span></div>
            <h2>{spotlight.name}</h2>
            <span>{spotlight.powers}</span>
          </div>
        </div>
      </section>

      <section className="premium-home__identity">
        <div className="premium-identity-main">
          <div className="premium-avatar">{user?.customAvatarUrl ? <img src={user.customAvatarUrl} alt="" /> : (user?.avatar || '🦸')}</div>
          <div><span className="premium-label">COMMANDER PROFILE</span><h3>{user?.displayName || user?.username || 'Guest Commander'}</h3></div>
        </div>
        <div className="premium-identity-stat"><span className="premium-label">LEVEL</span><strong>{level}</strong></div>
        <div className="premium-identity-stat premium-identity-stat--wide"><span className="premium-label">XP TO NEXT LEVEL</span><div className="premium-progress"><i style={{ width: `${xp}%` }} /></div><small>{xp}%</small></div>
        <div className="premium-identity-stat"><span className="premium-label">RANK</span><strong className="premium-rank">{rank}</strong></div>
        <div className="premium-identity-stat"><span className="premium-label">ASTRA</span><strong className="premium-astra">✦ {(user?.astra || user?.ascensionCoins || 0).toLocaleString()}</strong></div>
      </section>

      <section className="premium-section-heading"><div><span className="premium-label">COMMAND DECK</span><h2>Choose your front.</h2></div><button className="premium-link" onClick={() => launch(props.onOpenHowToPlay)}>How it works <ArrowUpRight size={14} /></button></section>
      <section className="premium-mode-grid">
        {modes.map(({ label, eyebrow, detail, icon: Icon, accent, callback }) => (
          <button key={label} className={`premium-mode-card premium-mode-card--${accent}`} onClick={() => launch(callback)}>
            <div className="premium-mode-card__top"><span>{eyebrow}</span><Icon size={20} /></div>
            <h3>{label}</h3><p>{detail}</p><div className="premium-mode-card__cta">Launch mode <ArrowUpRight size={14} /></div>
          </button>
        ))}
      </section>

      <section className="premium-home__lower">
        <div className="premium-panel premium-panel--event"><div><span className="premium-label">LIMITED EVENT / 06 DAYS</span><h2>Battle for<br />Knowhere</h2><p>Earn exclusive shards and a cosmic title.</p><button className="premium-link" onClick={() => launch(props.onPlayDungeon)}>View event <ArrowUpRight size={14} /></button></div><div className="premium-event-orb"><Flame size={38} /></div></div>
        <div className="premium-panel premium-panel--utility"><span className="premium-label">YOUR PROGRESS</span><div className="premium-utility-row"><Award size={18} /><span>Collection</span><strong>{user?.ownedCharacters?.length || 0}<small> / {ALL_CHARACTERS.length}</small></strong></div><div className="premium-utility-row"><Crown size={18} /><span>Battle pass</span><strong>LEVEL {Math.max(1, Math.floor(level / 2))}</strong></div><div className="premium-utility-row"><Users size={18} /><span>Alliance</span><strong>{user?.friendsCount || 0} <small>friends</small></strong></div></div>
        <div className="premium-panel premium-panel--links"><span className="premium-label">EXPLORE</span><button onClick={() => launch(props.onOpenEncyclopedia)}><BookOpen size={17} /> Character archive <ArrowUpRight size={14} /></button><button onClick={() => launch(props.onOpenRelicShop)}><Dices size={17} /> Astra marketplace <ArrowUpRight size={14} /></button><button onClick={() => launch(props.onPlayMultiplayer)}><Globe2 size={17} /> Multiplayer rooms <ArrowUpRight size={14} /></button><button onClick={() => launch(props.onOpenHowToPlay)}><HelpCircle size={17} /> Operations guide <ArrowUpRight size={14} /></button></div>
      </section>
    </div>
  );
}
