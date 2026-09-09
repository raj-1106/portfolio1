'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';
import { DiagramRenderer } from '@/components/diagrams/DiagramRenderer';

type NodeId = 'tokenA' | 'tokenB' | 'swap' | 'lp' | 'fees' | null;

interface GraphNode {
  id: NodeId;
  label: string;
  description: string;
  cx: number;
  cy: number;
  status: 'live' | 'progress' | 'archived';
}

interface GraphEdge {
  source: NodeId;
  target: NodeId;
  label?: string;
}

const nodes: GraphNode[] = [
  { id: 'lp', label: 'LP Tokens', description: 'Minted to liquidity providers representing their share of the pool.', cx: 350, cy: 50, status: 'archived' },
  { id: 'tokenA', label: 'Token A Pool', description: 'Reserve X in the constant product formula.', cx: 150, cy: 150, status: 'live' },
  { id: 'swap', label: 'Swap Engine', description: 'Executes trades against the curve (x * y = k) ensuring constant product.', cx: 350, cy: 150, status: 'progress' },
  { id: 'tokenB', label: 'Token B Pool', description: 'Reserve Y in the constant product formula.', cx: 550, cy: 150, status: 'live' },
  { id: 'fees', label: 'Fee Accumulator', description: 'Collects 0.3% protocol fee from each swap routing to the treasury.', cx: 350, cy: 250, status: 'progress' },
];

const edges: GraphEdge[] = [
  { source: 'lp', target: 'tokenA' },
  { source: 'lp', target: 'tokenB' },
  { source: 'tokenA', target: 'swap' },
  { source: 'swap', target: 'tokenB' },
  { source: 'swap', target: 'fees' },
];

const legend = [
  { label: 'Token Reserves', color: 'var(--node-live)' },
  { label: 'Core Logic', color: 'var(--node-progress)' },
  { label: 'Derived Assets', color: 'var(--node-archived)' },
];

export function AMMGraphDiagram() {
  const [activeNode, setActiveNode] = useState<NodeId>(null);
  const reduced = useMotionPreference();

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
      title="AMM Architecture"
      description="Constant-product automated market maker (x·y=k). Click components to highlight token flow."
      legend={legend}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: '700px' }}>
        <svg
          viewBox="0 0 700 320"
          style={{ width: '100%', height: 'auto', overflow: 'visible' }}
          aria-hidden="true"
        >
          {/* Base edges (unhighlighted) */}
          {edges.map((edge, i) => {
            const sourceNode = nodes.find((n) => n.id === edge.source)!;
            const targetNode = nodes.find((n) => n.id === edge.target)!;
            
            // Check if this edge is connected to the active node
            const isConnected = activeNode === edge.source || activeNode === edge.target;
            const isAnyNodeActive = activeNode !== null;

            return (
              <g key={`edge-${i}`}>
                {/* Base line */}
                <path
                  d={`M ${sourceNode.cx} ${sourceNode.cy} L ${targetNode.cx} ${targetNode.cy}`}
                  stroke={isAnyNodeActive && !isConnected ? 'var(--line)' : 'var(--line)'}
                  strokeWidth="2"
                  fill="none"
                  opacity={isAnyNodeActive && !isConnected ? 0.3 : 1}
                  style={{ transition: 'opacity 0.3s ease' }}
                />
                
                {/* Highlighted line */}
                <motion.path
                  d={`M ${sourceNode.cx} ${sourceNode.cy} L ${targetNode.cx} ${targetNode.cy}`}
                  stroke="var(--accent)"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: isConnected ? 1 : 0,
                    opacity: isConnected ? 1 : 0,
                  }}
                  transition={reduced ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isActive = activeNode === node.id;
            const isAnyNodeActive = activeNode !== null;
            
            // Check if this node is connected to the active node
            const isConnected = edges.some(e => 
              (e.source === activeNode && e.target === node.id) || 
              (e.target === activeNode && e.source === node.id)
            );
            
            const isFaded = isAnyNodeActive && !isActive && !isConnected;
            const statusColor = `var(--node-${node.status})`;

            return (
              <g
                key={node.id}
                transform={`translate(${node.cx}, ${node.cy})`}
                onClick={() => handleNodeClick(node.id)}
                style={{ 
                  cursor: 'pointer', 
                  outline: 'none',
                  opacity: isFaded ? 0.4 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {/* Node highlight ring */}
                <motion.circle
                  r="18"
                  fill="var(--bg-primary)"
                  stroke={isActive ? 'var(--accent)' : 'transparent'}
                  strokeWidth="2"
                  animate={{
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={reduced ? { duration: 0 } : { duration: 0.2 }}
                />

                {/* Node box / container */}
                <rect
                  x="-60"
                  y="-20"
                  width="120"
                  height="40"
                  rx="20"
                  fill="var(--bg-secondary)"
                  stroke={isActive ? 'var(--accent)' : statusColor}
                  strokeWidth="2"
                  style={{ transition: 'stroke 0.2s ease' }}
                />

                {/* Status dot */}
                <circle
                  cx="-45"
                  cy="0"
                  r="4"
                  fill={isActive ? 'var(--accent)' : statusColor}
                  style={{ transition: 'fill 0.2s ease' }}
                />

                {/* Label */}
                <text
                  x="-30"
                  y="4"
                  textAnchor="start"
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
              aria-label={`${node.label}. ${node.description}`}
              aria-expanded={activeNode === node.id}
              style={{
                position: 'absolute',
                left: `${(node.cx / 700) * 100}%`,
                top: `${(node.cy / 320) * 100}%`,
                width: '120px',
                height: '40px',
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
        <div style={{ minHeight: '80px', marginTop: '1.5rem' }}>
          <AnimatePresence mode="wait">
            {activeNode && (
              <motion.div
                key={activeNode}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                style={{
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
        </div>

        <style jsx>{`
          .diagram-node-btn:focus-visible {
            opacity: 1 !important;
            outline: 2px solid var(--accent);
            outline-offset: 4px;
            border-radius: 20px;
            background: transparent;
          }
        `}</style>
      </div>
    </DiagramRenderer>
  );
}
