import type { NodeStatus } from '@/lib/types';

interface StatusIndicatorProps {
  status: 'loading' | 'success' | 'error' | 'stale';
  pulse?: boolean;
  size?: number;
}

const statusToNodeColor: Record<StatusIndicatorProps['status'], string> = {
  success: 'var(--node-live)',
  stale: 'var(--node-progress)',
  error: 'var(--node-archived)',
  loading: 'var(--line)',
};

/**
 * Small node dot (6px) with optional pulse animation.
 * CSS-only pulse, no JS animation overhead.
 */
export function StatusIndicator({
  status,
  pulse = status === 'success',
  size = 6,
}: StatusIndicatorProps) {
  const color = statusToNodeColor[status];

  return (
    <>
      <span
        className={`status-indicator ${pulse ? 'status-pulse' : ''}`}
        style={{
          display: 'inline-block',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: color,
          flexShrink: 0,
        }}
      />

      <style jsx>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 currentColor; }
          70% { box-shadow: 0 0 0 4px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        .status-pulse {
          color: ${color};
          animation: pulse-ring 2s ease-out infinite;
        }
      `}</style>
    </>
  );
}
