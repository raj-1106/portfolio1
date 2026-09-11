'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { StatusIndicator } from '@/components/badges/StatusIndicator';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { useLiveState } from '@/hooks/useLiveState';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';

interface LiveStateBadgeProps {
  programSlug: string;
}

function formatTimeAgo(timestamp: number | null): string {
  if (!timestamp) return '';
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

function formatBalance(balanceWei: bigint | number): string {
  const wei = typeof balanceWei === 'bigint' ? balanceWei : BigInt(balanceWei);
  if (wei === 0n) return 'No liquidity yet';
  const eth = Number(wei) / 1e18;
  return `${eth.toFixed(4)} ETH pooled`;
}

/**
 * Live-state badge for project cards.
 * Shows loading skeleton → live data → stale data → error.
 * AnimatePresence for smooth transitions between states.
 */
export function LiveStateBadge({ programSlug }: LiveStateBadgeProps) {
  const { status, data, lastUpdated, error } = useLiveState(programSlug);
  const reduced = useMotionPreference();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontSize: '0.7rem',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <AnimatePresence mode="wait">
        {status === 'loading' && (
          <motion.div
            key="loading"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <SkeletonLoader width="60px" height="16px" />
          </motion.div>
        )}

        {status === 'success' && data && (
          <motion.div
            key={`success-${lastUpdated}`}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            <StatusIndicator status="success" pulse />
            <span style={{ color: 'var(--text-secondary)' }}>
              {data.balanceWei !== undefined ? formatBalance(data.balanceWei as number) : 'Live'} · updated {formatTimeAgo(lastUpdated)}
            </span>
          </motion.div>
        )}

        {status === 'stale' && data && (
          <motion.div
            key="stale"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            <StatusIndicator status="stale" pulse={false} />
            <span style={{ color: 'var(--node-progress)' }}>
              Updated {formatTimeAgo(lastUpdated)}
            </span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="error"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            <StatusIndicator status="error" pulse={false} />
            <span style={{ color: 'var(--node-archived)' }}>RPC unavailable. Data may be stale.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
