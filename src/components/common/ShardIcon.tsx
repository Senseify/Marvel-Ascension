import React from 'react';
import { getRewardShardCategory, getShardConfig } from '../../data/shardConfig';

export function ShardIcon({ category, sourceId, tier, amount, className = '' }: { category?: string; sourceId?: string; tier?: string; amount?: number; className?: string }) {
  const shard = getShardConfig(category || (sourceId ? getRewardShardCategory(sourceId, tier) : undefined));
  return (
    <span className={`inline-flex items-center gap-1 font-mono font-black ${className}`} title={shard.name}>
      <span aria-hidden="true" style={{ color: shard.color }}>{shard.icon}</span>
      {amount !== undefined && <span>{amount.toLocaleString()}</span>}
    </span>
  );
}
