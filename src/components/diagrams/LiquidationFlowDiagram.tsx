'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';
import { DiagramRenderer } from '@/components/diagrams/DiagramRenderer';

type NodeId = 'oracle' | 'health' | 'check' | 'execution' | null;

interface FlowNode {
  id: NodeId;
  label: string;
  description: string;
  cx: number;
  cy: number;
  status: 'live' | 'progress' | 'archived';
}

const nodes: FlowNode[] = [
  { id: 'oracle', label: 'Price Oracle', description: 'Pyth network feed provides sub-second price updates for collateral assets.', cx: 50, cy: 60, status: 'live' },
  { id: 'health', label: 'Health Factor', description: 'Protocol recalculates collateralization ratio (collateral value / borrow value).', cx: 250, cy: 60, status: 'progress' },
  { id: 'check', label: 'Eligibility Check', description: 'If health factor < 1.0, position is marked for liquidation.', cx: 450, cy: 60, status: 'progress' },
  { id: 'execution', label: 'Liquidation Execution', description: 'Liquidator repays debt, claims collateral + bonus, restoring protocol solvency.', cx: 650, cy: 60, status: 'archived' },
];

const legend = [
  { label: 'External Data', color: 'var(--node-live)' },
  { label: 'Protocol State', color: 'var(--node-progress)' },
  { label: 'State Transition', color: 'var(--node-archived)' },
];

export function LiquidationFlowDiagram() {
  const [activeNode, setActiveNode] = useState<NodeId>(null);
  const reduced = useMotionPreference();

  const activeIndex = activeNode ? nodes.findIndex((n) => n.id === activeNode) : -1;

  const handleNodeClick = (id: NodeId) => {
    setActiveNode(activeNode === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: NodeId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNodeClick(id);
    } else if (e.key === 'Escape') {
      setActiveNode(null);
    }
  };

  return (
    <DiagramRenderer
      title="Liquidation Flow"
      description="Interactive sequence of events triggering an on-chain liquidation. Click nodes to view step details."
      legend={legend}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: '700px' }}>
        <svg
          viewBox="0 0 700 120"
          style={{ width: '100%', height: 'auto', overflow: 'visible' }}
          aria-hidden="true"
        >
          {/* Base connectors (unhighlighted) */}
          <path
            d="M 50 60 L 650 60"
            stroke="var(--line)"
            strokeWidth="2"
            fill="none"
          />

          {/* Highlighted connectors (animate based on active node) */}
          {nodes.slice(0, -1).map((node, i) => {
            const nextNode = nodes[i + 1];
            const isHighlighted = activeIndex > i;

            return (
              <motion.path
                key={`connector-${i}`}
                d={`M ${node.cx} ${node.cy} L ${nextNode.cx} ${nextNode.cy}`}
                stroke="var(--accent)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: isHighlighted ? 1 : 0,
                  opacity: isHighlighted ? 1 : 0,
                }}
                transition={reduced ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isActive = activeNode === node.id;
            const isPast = activeIndex >= i;
            const statusColor = `var(--node-${node.status})`;

            return (
              <g
                key={node.id}
                transform={`translate(${node.cx}, ${node.cy})`}
                onClick={() => handleNodeClick(node.id)}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                {/* Node highlight ring */}
                <motion.circle
                  r="16"
                  fill="none"
                  stroke={isActive ? 'var(--accent)' : 'transparent'}
                  strokeWidth="2"
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={reduced ? { duration: 0 } : { duration: 0.2 }}
                />

                {/* Node dot base */}
                <circle
                  r="8"
                  fill="var(--bg-secondary)"
                  stroke={isActive || isPast ? 'var(--accent)' : statusColor}
                  strokeWidth="2"
                />

                {/* Inner fill */}
                <motion.circle
                  r="4"
                  fill={isActive || isPast ? 'var(--accent)' : statusColor}
                  animate={{
                    scale: isActive ? 1.5 : 1,
                  }}
                  transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}
                />

                {/* Label */}
                <text
                  y="30"
                  textAnchor="middle"
                  fill={isActive ? 'var(--text-primary)' : 'var(--text-secondary)'}
                  fontSize="12"
                  fontFamily="var(--font-mono)"
                  style={{ userSelect: 'none', transition: 'fill 0.2s ease' }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* HTML overlay for focusable invisible buttons (accessibility) */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {nodes.map((node) => (
            <button
              key={`btn-${node.id}`}
              onClick={() => handleNodeClick(node.id)}
              onKeyDown={(e) => handleKeyDown(e, node.id)}
              aria-label={`Step: ${node.label}. ${node.description}`}
              aria-expanded={activeNode === node.id}
              style={{
                position: 'absolute',
                left: `${(node.cx / 700) * 100}%`,
                top: `${(node.cy / 120) * 100}%`,
                width: '32px',
                height: '32px',
                transform: 'translate(-50%, -50%)',
                opacity: 0,
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
              className="diagram-node-btn"
            />
          ))}
        </div>

        {/* Info Panel */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{
                marginTop: '1rem',
                padding: '1rem 1.5rem',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--accent)',
                borderRadius: 'var(--radius)',
                color: 'var(--text-primary)',
              }}
            >
              <h4 style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem', color: 'var(--accent)' }}>
                {nodes.find((n) => n.id === activeNode)?.label}
              </h4>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                {nodes.find((n) => n.id === activeNode)?.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx>{`
          .diagram-node-btn:focus-visible {
            opacity: 1 !important;
            outline: 2px solid var(--accent);
            outline-offset: 4px;
            border-radius: 50%;
            background: transparent;
          }
        `}</style>
      </div>
    </DiagramRenderer>
  );
}
