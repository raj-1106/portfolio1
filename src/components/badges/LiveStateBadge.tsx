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
      <AnimatePresence mode="popLayout">
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
            key={`success-${JSON.stringify(data)}`}
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
            <span style={{ color: 'var(--node-live)' }}>Live</span>
            {Object.entries(data).slice(0, 2).map(([key, value]) => (
              <span key={key} style={{ color: 'var(--text-secondary)' }}>
                {key}: {value}
              </span>
            ))}
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
            <span style={{ color: 'var(--node-archived)' }}>RPC's not answering. Neither would I, at this hour.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
