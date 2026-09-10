import type { CSSProperties } from 'react';
import type { NodeStatus } from '@/lib/types';

interface NodeDividerProps {
  dotPosition?: 'left' | 'center' | 'right' | 'none';
  dotStatus?: NodeStatus;
  className?: string;
  style?: CSSProperties;
}

const statusColorMap: Record<NodeStatus, string> = {
  live: 'var(--node-live)',
  'in-progress': 'var(--node-progress)',
  archived: 'var(--node-archived)',
  completed: 'var(--node-completed)',
};

/**
 * Horizontal 1px connector line with optional node dot.
 * Echoes diagram connector language — used as section divider throughout.
 */
export function NodeDivider({
  dotPosition = 'center',
  dotStatus = 'in-progress',
  className = '',
  style,
}: NodeDividerProps) {
  const dotColor = statusColorMap[dotStatus];
  const hasDot = dotPosition !== 'none';

  return (
    <div
      className={`node-divider ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent:
          dotPosition === 'left'
            ? 'flex-start'
            : dotPosition === 'right'
              ? 'flex-end'
              : 'center',
        padding: '2rem 0',
        ...style,
      }}
      role="separator"
    >
      {/* Line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--line)',
        }}
      />

      {/* Node dot */}
      {hasDot && (
        <div
          style={{
            position: 'relative',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: dotColor,
            flexShrink: 0,
            zIndex: 1,
            boxShadow: `0 0 0 4px var(--bg-primary)`,
          }}
        />
      )}
    </div>
  );
}
