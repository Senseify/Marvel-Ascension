import { useState } from 'react';
import { Player, Character, ArtifactItem } from '../../types/game';
import { MARVEL_ARTIFACTS } from '../../data/artifacts';
import { getSkillsForCharacter, CharacterSkill } from '../../data/skills/characterSkills';
import { CharacterPortrait } from '../common/CharacterPortrait';
import { soundManager } from '../../audio/soundManager';
import { DiscardConfirmModal } from '../common/DiscardConfirmModal';
import { Sparkles, DollarSign, Shield, Zap, Swords, ArrowRight, Check, ShoppingBag, Flame, Layers, Filter, Trash2 } from 'lucide-react';

interface Props {
  players: Player[];
  onUpdatePlayerCollection: (playerId: string, updatedCollection: Character[], updatedMoney: number) => void;
  onDiscardCharacter?: (playerId: string, characterId: string) => void;
  onProceedToBattles: () => void;
  onBack?: () => void;
  isLocalMode?: boolean;
  controllingPlayerId?: string;
}

export function EquipmentShop({
  players,
  onUpdatePlayerCollection,
  onDiscardCharacter,
  onProceedToBattles,
  onBack,
  isLocalMode = true,
  controllingPlayerId,
}: Props) {
  const initialPlayerId = (!isLocalMode && controllingPlayerId)
    ? (players.find(p => p.id === controllingPlayerId)?.id || players[0]?.id || '')
    : (players[0]?.id || '');

  const [activeTab, setActiveTab] = useState<'SKILL_VAULT' | 'RELIC_VAULT'>('SKILL_VAULT');
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(initialPlayerId);
  const [selectedHeroIndex, setSelectedHeroIndex] = useState<number>(0);
  const [relicPriceFilter, setRelicPriceFilter] = useState<'ALL' | '1-5' | '6-10' | '11-15' | '16-20'>('ALL');

  const activePlayer = players.find(p => p.id === selectedPlayerId) || players[0];
  const selectedHero: Character | undefined = activePlayer?.collection[selectedHeroIndex];

  // 1. Equip Relic
  const handleBuyAndEquipRelic = (artifact: ArtifactItem) => {
    if (!activePlayer || !selectedHero) return;
    
    const refund = selectedHero.equippedArtifact ? selectedHero.equippedArtifact.cost : 0;
    if (activePlayer.money + refund < artifact.cost) return;

    soundManager.playClick();
    soundManager.playAbilityTrigger();

    const updatedCollection = activePlayer.collection.map((hero, idx) => {
      if (idx === selectedHeroIndex) {
        return {
          ...hero,
          equippedArtifact: artifact,
        };
      }
      return hero;
    });

    const newMoney = activePlayer.money + refund - artifact.cost;
    onUpdatePlayerCollection(activePlayer.id, updatedCollection, newMoney);
  };

  // 2. Remove Relic
  const handleRemoveArtifact = () => {
    if (!activePlayer || !selectedHero || !selectedHero.equippedArtifact) return;
    soundManager.playClick();

    const refund = selectedHero.equippedArtifact.cost;
    const updatedCollection = activePlayer.collection.map((hero, idx) => {
      if (idx === selectedHeroIndex) {
        return {
          ...hero,
          equippedArtifact: null,
        };
      }
      return hero;
    });

    onUpdatePlayerCollection(activePlayer.id, updatedCollection, activePlayer.money + refund);
  };

  // 3. Buy & Equip Character Skill
  const handleBuySkill = (skill: CharacterSkill) => {
    if (!activePlayer || !selectedHero) return;
    if (activePlayer.money < skill.cost) return;

    soundManager.playAbilityTrigger();

    const currentSkills = selectedHero.equippedSkills || [];
    if (currentSkills.some(s => s.id === skill.id)) return;

    const updatedCollection = activePlayer.collection.map((hero, idx) => {
      if (idx === selectedHeroIndex) {
        return {
          ...hero,
          equippedSkills: [...(hero.equippedSkills || []), skill],
          overallPower: hero.overallPower + Math.floor(skill.bonusPower / 2)
        };
      }
      return hero;
    });

    const newMoney = activePlayer.money - skill.cost;
    onUpdatePlayerCollection(activePlayer.id, updatedCollection, newMoney);
  };

  // Filter Relics by Price Range
  const filteredRelics = MARVEL_ARTIFACTS.filter(artifact => {
    if (relicPriceFilter === '1-5') return artifact.cost >= 1 && artifact.cost <= 5;
    if (relicPriceFilter === '6-10') return artifact.cost >= 6 && artifact.cost <= 10;
    if (relicPriceFilter === '11-15') return artifact.cost >= 11 && artifact.cost <= 15;
    if (relicPriceFilter === '16-20') return artifact.cost >= 16 && artifact.cost <= 20;
    return true;
  });

  const heroSkills = selectedHero ? getSkillsForCharacter(selectedHero) : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="text-center relative space-y-2">
        {onBack && (
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="sm:absolute left-0 top-0 mb-3 sm:mb-0 px-3.5 py-1.5 bg-black/40 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 rounded-xl text-xs font-bold transition-all"
          >
            ← Return to Match
          </button>
        )}

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141C] border border-amber-500/40 shadow-sm text-amber-300 text-xs font-black uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>HERO MASTERY & ARSENAL VAULT</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-wider">
          SKILL & RELIC VAULT
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Unlock 5 character-specific skills and equip legendary Marvel relics ($1 - $20) onto your heroes before entering the arena!
        </p>

        {/* Tab Toggle: Skill Vault (Step 1) vs Relic Vault (Step 2) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 pt-3">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('SKILL_VAULT');
            }}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-heading font-black tracking-wider transition-all border cursor-pointer ${
              activeTab === 'SKILL_VAULT'
                ? 'bg-cyan-900/80 text-white border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-[1.02]'
                : 'bg-[#12141C] text-slate-400 border-white/[0.08] hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-cyan-300" />
            <span>1. HERO SKILL VAULT (5 SKILLS)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('RELIC_VAULT');
            }}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-heading font-black tracking-wider transition-all border cursor-pointer ${
              activeTab === 'RELIC_VAULT'
                ? 'bg-amber-900/80 text-white border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-[1.02]'
                : 'bg-[#12141C] text-slate-400 border-white/[0.08] hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>2. MARVEL RELIC VAULT ($1 - $20)</span>
          </button>
        </div>
      </div>

      {/* Local Mode Player Switcher */}
      {isLocalMode && players.length > 1 && (
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {players.map(p => (
            <button
              key={p.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedPlayerId(p.id);
                setSelectedHeroIndex(0);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-black transition-all border ${
                p.id === selectedPlayerId
                  ? 'bg-purple-900/80 text-white border-purple-400/50 shadow-md'
                  : 'bg-[#12141C] text-slate-400 border-white/[0.08] hover:text-white'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-black border border-white/10 overflow-hidden flex items-center justify-center text-xs shrink-0">
                {p.customAvatarUrl || p.profile?.customAvatarUrl ? (
                  <img src={p.customAvatarUrl || p.profile?.customAvatarUrl} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{p.avatar}</span>
                )}
              </div>
              <span>{p.name} (${p.money})</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Grid: Left Roster Heroes (5 cols), Right Vault Options (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Player Roster & Selected Hero (5 cols) */}
        <div className="lg:col-span-5 bg-[#0E1017] p-5 rounded-3xl border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.8)] space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-400 font-mono block">CURRENT SQUAD</span>
              <h2 className="text-base font-heading font-black text-white">{activePlayer.name}'s Roster</h2>
            </div>
            <div className="flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-xl text-emerald-300 font-black text-sm font-mono">
              <DollarSign className="w-3.5 h-3.5" />
              <span>${activePlayer.money} Left</span>
            </div>
          </div>

          {/* Hero Selection Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {activePlayer.collection.map((hero, idx) => {
              const isSelected = selectedHeroIndex === idx;
              const skillCount = hero.equippedSkills?.length || 0;

              return (
                <div
                  key={hero.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedHeroIndex(idx);
                  }}
                  className={`p-2 rounded-xl border cursor-pointer flex flex-col items-center text-center transition-all ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/40 shadow-glow-cosmic scale-[1.02]'
                      : 'border-white/10 bg-black/40 hover:border-slate-500'
                  }`}
                >
                  <CharacterPortrait character={hero} size="sm" showBadge={true} />
                  <span className="font-bold text-[11px] text-white mt-1 truncate w-full">{hero.name}</span>
                  
                  {hero.equippedArtifact && (
                    <span className="text-[9px] text-amber-400 font-extrabold flex items-center gap-0.5 mt-0.5 truncate">
                      <span>{hero.equippedArtifact.icon}</span>
                      <span className="truncate">{hero.equippedArtifact.name}</span>
                    </span>
                  )}

                  {skillCount > 0 && (
                    <span className="text-[9px] text-cyan-300 font-bold block">
                      ✨ {skillCount} Skills
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Selected Hero Showcase & Loadout */}
          {selectedHero && (
            <div className="p-4 bg-black/60 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <CharacterPortrait character={selectedHero} size="sm" showBadge={false} />
                <div>
                  <span className="text-[10px] font-black uppercase text-cyan-400">HERO TARGET:</span>
                  <h3 className="font-heading font-black text-base text-white">{selectedHero.name}</h3>
                  <span className="text-xs text-slate-400 font-semibold">PWR {selectedHero.overallPower} • {selectedHero.grade} Tier</span>
                </div>
              </div>

              {/* Equipped Relic Slot */}
              {selectedHero.equippedArtifact ? (
                <div className="p-3 bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/50 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-300 flex items-center gap-1">
                      <span className="text-base">{selectedHero.equippedArtifact.icon}</span>
                      <span>{selectedHero.equippedArtifact.name} (${selectedHero.equippedArtifact.cost})</span>
                    </span>
                    <button
                      onClick={handleRemoveArtifact}
                      className="text-[10px] bg-red-950 hover:bg-red-900 text-red-200 border border-red-500/40 px-2 py-0.5 rounded font-bold transition-colors"
                    >
                      Unequip (+${selectedHero.equippedArtifact.cost})
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {selectedHero.equippedArtifact.description}
                  </p>
                </div>
              ) : (
                <div className="p-2.5 bg-black/40 border border-dashed border-white/10 rounded-xl text-center text-xs text-slate-400">
                  No Relic Equipped (Select Relic Vault tab to arm)
                </div>
              )}

              {/* Equipped Skills Summary */}
              {selectedHero.equippedSkills && selectedHero.equippedSkills.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-black uppercase text-cyan-400 block">Equipped Skills:</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {selectedHero.equippedSkills.map((sk: CharacterSkill) => (
                      <div key={sk.id} className="p-2 bg-cyan-950/40 border border-cyan-500/40 rounded-lg text-xs space-y-0.5">
                        <span className="font-black text-cyan-200 flex items-center gap-1">
                          <span>{sk.icon}</span>
                          <span className="truncate">{sk.name}</span>
                        </span>
                        <span className="text-[10px] text-amber-400 block">+{sk.bonusPower} PWR</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sell Hero Action Button (60% Refund) */}
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setShowDiscardModal(true);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 text-amber-300 font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Trash2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>SELL {selectedHero.name.toUpperCase()} (+${Math.floor((selectedHero.startingPrice || 1) * 0.6)} • 60% REFUND)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Content Area (Skill Vault OR Relic Vault) (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {activeTab === 'SKILL_VAULT' ? (
            /* ================= SKILL VAULT TAB ================= */
            <div className="bg-[#0E1017] p-5 rounded-3xl border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.8)] space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-base font-heading font-black text-white uppercase tracking-wider">
                    5 Unique Skills for {selectedHero ? selectedHero.name : 'Selected Hero'}
                  </h2>
                </div>
                <span className="text-[11px] text-cyan-400 font-semibold font-mono">$6 - $15 Non-P2W</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                {heroSkills.map(skill => {
                  const isEquipped = selectedHero?.equippedSkills?.some(s => s.id === skill.id);
                  const canAfford = activePlayer.money >= skill.cost;

                  return (
                    <div
                      key={skill.id}
                      className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${
                        isEquipped
                          ? 'bg-cyan-950/60 border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                          : 'bg-[#12141C] border-white/[0.08] hover:border-cyan-500/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xl">{skill.icon}</span>
                            <span className="font-heading font-black text-xs sm:text-sm text-white">
                              {skill.name}
                            </span>
                          </div>
                          <span className="font-black text-emerald-400 text-xs bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
                            ${skill.cost}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-300 leading-snug mb-2">
                          {skill.description}
                        </p>

                        <div className="text-[10px] text-amber-400 font-bold mb-2 font-mono">
                          +{skill.bonusPower} PWR • {Math.round(skill.triggerRate * 100)}% Trigger
                        </div>
                      </div>

                      <button
                        onClick={() => handleBuySkill(skill)}
                        disabled={isEquipped || !canAfford || !selectedHero}
                        className={`w-full py-2.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                          isEquipped
                            ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-400/40 cursor-default'
                            : canAfford
                            ? 'btn-primary-cinematic'
                            : 'bg-[#141722] text-slate-600 border border-white/5 cursor-not-allowed'
                        }`}
                      >
                        {isEquipped ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>EQUIPPED</span>
                          </>
                        ) : canAfford ? (
                          <span>BUY & LEARN SKILL (${skill.cost})</span>
                        ) : (
                          <span>NEED ${skill.cost}</span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ================= RELIC VAULT TAB ($1 - $20) ================= */
            <div className="bg-[#0E1017] p-5 rounded-3xl border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.8)] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <h2 className="text-base font-heading font-black text-white uppercase tracking-wider">
                    Marvel Relic Arsenal ({filteredRelics.length} Relics)
                  </h2>
                </div>

                {/* Price Range Filter Pills */}
                <div className="flex items-center gap-1 flex-wrap">
                  {(['ALL', '1-5', '6-10', '11-15', '16-20'] as const).map(tier => (
                    <button
                      key={tier}
                      onClick={() => setRelicPriceFilter(tier)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all border ${
                        relicPriceFilter === tier
                          ? 'bg-amber-400 text-black border-amber-300 font-bold shadow'
                          : 'bg-[#141722] text-slate-400 border-white/[0.08] hover:text-white'
                      }`}
                    >
                      {tier === 'ALL' ? 'All ($1-$20)' : `$${tier}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Relics Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                {filteredRelics.map(artifact => {
                  const refundAmount = selectedHero?.equippedArtifact ? selectedHero.equippedArtifact.cost : 0;
                  const canAfford = (activePlayer.money + refundAmount) >= artifact.cost;
                  const isEquippedOnHero = selectedHero?.equippedArtifact?.id === artifact.id;

                  return (
                    <div
                      key={artifact.id}
                      className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${
                        isEquippedOnHero
                          ? 'bg-purple-950/60 border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                          : 'bg-[#12141C] border-white/[0.08] hover:border-amber-400/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xl">{artifact.icon}</span>
                            <span className="font-heading font-black text-xs sm:text-sm text-white">
                              {artifact.name}
                            </span>
                          </div>
                          <span className="font-black text-emerald-400 text-xs bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
                            ${artifact.cost}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-300 leading-snug mb-2">
                          {artifact.description}
                        </p>

                        <div className="text-[10px] text-amber-400 font-bold mb-2 font-mono">
                          +{artifact.bonusPower} Power Boost
                        </div>
                      </div>

                      <button
                        onClick={() => handleBuyAndEquipRelic(artifact)}
                        disabled={!canAfford || isEquippedOnHero || !selectedHero}
                        className={`w-full py-2.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                          isEquippedOnHero
                            ? 'bg-purple-900/60 text-purple-200 border border-purple-400/40 cursor-default'
                            : canAfford
                            ? 'btn-gold-cinematic'
                            : 'bg-[#141722] text-slate-600 border border-white/5 cursor-not-allowed'
                        }`}
                      >
                        {isEquippedOnHero ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>EQUIPPED</span>
                          </>
                        ) : canAfford ? (
                          <span>BUY & EQUIP (${artifact.cost})</span>
                        ) : (
                          <span>NEED ${artifact.cost}</span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Proceed to Tournament Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onProceedToBattles();
            }}
            className="w-full py-4 rounded-2xl btn-gold-cinematic text-base font-black uppercase tracking-wider shadow-[0_12px_32px_rgba(230,175,46,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <span>PROCEED TO TOURNAMENT BATTLES</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Discard Confirmation Modal */}
      {showDiscardModal && selectedHero && (
        <DiscardConfirmModal
          character={selectedHero}
          currentCount={activePlayer.collection.length}
          characterLimit={players.length > 0 ? 5 : 5}
          onConfirm={() => {
            if (onDiscardCharacter) {
              onDiscardCharacter(activePlayer.id, selectedHero.id);
            }
            setShowDiscardModal(false);
            setSelectedHeroIndex(0);
          }}
          onCancel={() => setShowDiscardModal(false)}
        />
      )}
    </div>
  );
}
