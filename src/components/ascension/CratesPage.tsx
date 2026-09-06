import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CrateInfo, CrateOpening } from './CrateOpening';

interface Props {
  onBack: () => void;
}

export function CratesPage({ onBack }: Props) {
  const { user } = useAuth();
  const crates = useMemo<CrateInfo[]>(() => {
    const level = user?.level || 1;
    const claimed = user?.claimedLevelCrates || [];
    return [
      ...Array.from({ length: user?.crateInventory?.shard || 0 }, (_, index) => ({
        level: 0,
        type: 'SHARD_CRATE' as const,
        canClaim: true,
        inventory: true,
        id: `shard-${index}`,
      })),
      ...Array.from({ length: user?.crateInventory?.character || 0 }, (_, index) => ({
        level: 0,
        type: 'CHARACTER_CRATE' as const,
        canClaim: true,
        inventory: true,
        id: `character-${index}`,
      })),
      ...[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map(value => ({
        level: value,
        type: value % 25 === 0 ? 'CHARACTER_CRATE' as const : 'SHARD_CRATE' as const,
        canClaim: level >= value && !claimed.includes(value),
        inventory: false,
        id: `level-${value}`,
      })),
    ];
  }, [user?.level, user?.crateInventory?.shard, user?.crateInventory?.character, user?.claimedLevelCrates]);

  return (
    <CrateOpening
      crates={crates}
      onClose={onBack}
      onClaimed={() => undefined}
    />
  );
}
