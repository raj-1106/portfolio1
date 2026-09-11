// src/components/about/TechStackGraph.tsx
'use client';

import { motion } from 'framer-motion';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';

const nodes = [
  { id: 'solidity', label: 'Solidity / EVM', x: 60, y: 40, r: 5 },
  { id: 'anchor', label: 'Rust / Anchor (SVM)', x: 60, y: 150, r: 5 },
  { id: 'fabric', label: 'Hyperledger Fabric', x: 280, y: 95, r: 8 }, // larger — convergence point
  { id: 'bridge', label: 'Cross-chain bridge', x: 480, y: 95, r: 5 },
];

const edges = [
  { from: 'solidity', to: 'fabric' },
  { from: 'anchor', to: 'fabric' },
  { from: 'fabric', to: 'bridge', pulse: true }, // only the bridge edge pulses
];

function curvePath(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${y1} Q ${midX} ${y1} ${midX} ${(y1 + y2) / 2} T ${x2} ${y2}`;
}

export function TechStackGraph() {
  const reducedMotion = useMotionPreference();
  const findNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <svg viewBox="0 0 560 200" style={{ width: '100%', maxWidth: '560px', overflow: 'visible' }}>
      <defs>
        <filter id="node-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="var(--accent)" floodOpacity="0.5" />
        </filter>
      </defs>

      {edges.map((edge, i) => {
        const from = findNode(edge.from);
        const to = findNode(edge.to);
        const d = curvePath(from.x, from.y, to.x, to.y);
        return (
          <g key={i}>
            <motion.path
              d={d}
              fill="none"
              stroke="var(--line)"
              strokeWidth="1.5"
              initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
            />
            {edge.pulse && !reducedMotion && (
              <motion.circle
                r="3"
                fill="var(--accent)"
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 1.5 }}
                style={{ offsetPath: `path("${d}")` }}
              />
            )}
          </g>
        );
      })}

      {nodes.map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x} cy={node.y} r={node.r}
            fill={node.id === 'fabric' ? 'var(--accent)' : 'var(--bg-primary)'}
            stroke="var(--accent)"
            strokeWidth="1.5"
            filter={node.id === 'fabric' ? 'url(#node-glow)' : undefined}
            initial={reducedMotion ? { scale: 1 } : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
          />
          <rect
            x={node.x - node.label.length * 2.8}
            y={node.y - 28}
            width={node.label.length * 5.6}
            height="16"
            rx="4"
            fill="var(--bg-secondary)"
            stroke="var(--line)"
            strokeWidth="0.5"
          />
          <text
            x={node.x} y={node.y - 17}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
