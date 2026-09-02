import React from 'react';
import { ArrowRight, BookOpen, Crown, Gem, Map, Play, Swords, Trophy, Users } from 'lucide-react';
import { ALL_CHARACTERS } from '../../data/characters/index';
import { useAuth } from '../../context/AuthContext';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { soundManager } from '../../audio/soundManager';

interface Props {
  onPlayAscension?: () => void; onPlayLocal: () => void; onPlayMultiplayer: () => void;
  onPlayDungeon?: () => void; onOpenEncyclopedia: () => void; onOpenHowToPlay: () => void;
  onOpenSandbox: () => void; onOpenRelicShop: () => void;
  onPlayChaosAuction?: () => void; onPlayBlindBidding?: () => void; onPlayBossRaid?: () => void;
  onPlayBlitz?: () => void; onOpenSkillVault?: () => void; onPlayIntro?: () => void;
}

export function AscensionLauncherHome({ onPlayAscension, onPlayLocal, onPlayMultiplayer, onPlayDungeon, onOpenEncyclopedia, onOpenHowToPlay, onOpenSandbox, onOpenRelicShop }: Props) {
  const { user } = useAuth();
  const hero = ALL_CHARACTERS.find(character => character.name === 'Spider-Man') || ALL_CHARACTERS[0];
  const launch = (action?: () => void) => { if (!action) return; soundManager.playClick(); action(); };
  const level = user?.level || 1;
  const rank = user?.rankedTier && user.rankedTier !== 'UNRANKED' ? user.rankedTier : 'UNRANKED';
  return (
    <main className="launcher-home">
      <div className="launcher-home__noise" />
      <section className="launcher-hero">
        <div className="launcher-hero__copy">
          <div className="launcher-eyebrow"><i /> MARVEL ASCENSION / SEASON ONE</div>
          <h1>YOUR<br /><em>LEGEND</em><br />STARTS HERE.</h1>
          <p>Collect iconic heroes. Build impossible teams. Enter the fight for the fate of every universe.</p>
          <div className="launcher-actions">
            <button className="launcher-primary" onClick={() => launch(onPlayAscension)}><Play size={17} fill="currentColor" /> PLAY ASCENSION <ArrowRight size={16} /></button>
            <button className="launcher-secondary" onClick={() => launch(onPlayLocal)}><Swords size={16} /> QUICK MATCH</button>
          </div>
          <div className="launcher-meta"><span><b>350</b> heroes</span><span><b>01</b> active season</span><span><b>∞</b> ways to play</span></div>
        </div>
        <div className="launcher-hero__art">
          <div className="launcher-orbit launcher-orbit--one" /><div className="launcher-orbit launcher-orbit--two" />
          <div className="launcher-hero__tag"><span>01</span><small>FEATURED<br />CHAMPION</small></div>
          <CharacterPortrait character={hero} size="lg" className="launcher-hero__portrait" />
          <div className="launcher-hero__name"><small>{hero.grade} / {hero.alignment}</small><strong>{hero.name}</strong><span>{hero.overallPower} POWER</span></div>
        </div>
      </section>
      <section className="launcher-status">
        <div className="launcher-user"><div className="launcher-avatar">{user?.customAvatarUrl ? <img src={user.customAvatarUrl} alt="" /> : user?.avatar || '🦸'}</div><div><small>COMMANDER</small><strong>{user?.displayName || user?.username || 'Guest'}</strong></div></div>
        <div><small>LEVEL</small><strong>{level}</strong></div><div><small>RANK</small><strong className="launcher-status__violet">{rank}</strong></div><div className="launcher-xp"><small>XP PROGRESS</small><div><i style={{ width: `${user?.progressPercent || 0}%` }} /></div></div><div><small>ASTRA</small><strong className="launcher-status__gold">✦ {(user?.astra || user?.ascensionCoins || 0).toLocaleString()}</strong></div>
      </section>
      <section className="launcher-section-head"><div><small>CHOOSE YOUR OPERATION</small><h2>Enter the multiverse</h2></div><button onClick={() => launch(onOpenHowToPlay)}>VIEW GUIDE <ArrowRight size={14} /></button></section>
      <section className="launcher-modes">
        <button className="launcher-mode launcher-mode--wide" onClick={() => launch(onPlayAscension)}><div><small>FLAGSHIP / RPG + PVP</small><h3>ASCENSION</h3><p>Build, upgrade, and battle your way to the top.</p><span>ENTER MODE <ArrowRight size={14} /></span></div><Trophy size={42} /></button>
        <button className="launcher-mode" onClick={() => launch(onPlayLocal)}><Gem size={25} /><small>AUCTION WARS</small><h3>BID. BUILD. BATTLE.</h3><span>PLAY NOW <ArrowRight size={14} /></span></button>
        <button className="launcher-mode" onClick={() => launch(onPlayMultiplayer)}><Users size={25} /><small>MULTIPLAYER</small><h3>FIND YOUR SQUAD</h3><span>JOIN ROOMS <ArrowRight size={14} /></span></button>
        <button className="launcher-mode" onClick={() => launch(onPlayDungeon)}><Map size={25} /><small>PVE EXPEDITION</small><h3>THE DUNGEON</h3><span>DESCEND <ArrowRight size={14} /></span></button>
      </section>
      <section className="launcher-quicklinks"><button onClick={() => launch(onOpenEncyclopedia)}><BookOpen size={18} /> CHARACTER ARCHIVE</button><button onClick={() => launch(onOpenSandbox)}><Swords size={18} /> DUEL SIMULATOR</button><button onClick={() => launch(onOpenRelicShop)}><Crown size={18} /> ASTRA SHOP</button></section>
    </main>
  );
}
