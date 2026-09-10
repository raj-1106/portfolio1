'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const nodes = [
  { id: 'solidity', label: 'Solidity / EVM', x: 60, y: 40 },
  { id: 'anchor', label: 'Rust / Anchor (SVM)', x: 60, y: 140 },
  { id: 'fabric', label: 'Hyperledger Fabric', x: 260, y: 90 },
  { id: 'bridge', label: 'Cross-chain bridge', x: 460, y: 90 },
];

const edges = [
  { from: 'solidity', to: 'fabric' },
  { from: 'anchor', to: 'fabric' },
  { from: 'fabric', to: 'bridge' },
];

export function TechStackGraph() {
  const reducedMotion = useReducedMotion();
  const findNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <svg viewBox="0 0 560 200" style={{ width: '100%', maxWidth: '560px' }}>
      {edges.map((edge, i) => {
        const from = findNode(edge.from);
        const to = findNode(edge.to);
        return (
          <motion.line
            key={i}
            x1={from.x} y1={from.y}
            x2={to.x} y2={to.y}
            stroke="var(--line)"
            strokeWidth="1.5"
            initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
          />
        );
      })}
      {nodes.map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x} cy={node.y} r="5"
            fill={node.id === 'fabric' ? 'var(--accent)' : 'var(--bg-primary)'}
            stroke="var(--accent)"
            strokeWidth="1.5"
            initial={reducedMotion ? { scale: 1 } : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.15 }}
          />
          <text
            x={node.x} y={node.y - 14}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
