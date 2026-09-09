'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';

type Tab = 'direct' | 'cpi';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'user' | 'lending' | 'amm' | 'state';
}

interface Edge {
  id: string;
  from: string;
  to: string;
  label: string;
  status: 'safe' | 'danger';
}

const directNodes: Node[] = [
  { id: 'u', label: 'User', x: 50, y: 150, type: 'user' },
  { id: 'l', label: 'Lending Program', x: 250, y: 150, type: 'lending' },
  { id: 's', label: 'LP Pool Account', x: 450, y: 150, type: 'state' },
];

const directEdges: Edge[] = [
  { id: 'e1', from: 'u', to: 'l', label: 'Deposit LP', status: 'safe' },
  { id: 'e2', from: 'l', to: 's', label: 'Raw State Read (Fragile)', status: 'danger' },
];

const cpiNodes: Node[] = [
  { id: 'u', label: 'User', x: 50, y: 150, type: 'user' },
  { id: 'l', label: 'Lending Program', x: 250, y: 150, type: 'lending' },
  { id: 'a', label: 'AMM Program', x: 450, y: 80, type: 'amm' },
  { id: 's', label: 'LP Pool Account', x: 450, y: 220, type: 'state' },
];

const cpiEdges: Edge[] = [
  { id: 'e1', from: 'u', to: 'l', label: 'Deposit LP', status: 'safe' },
  { id: 'e2', from: 'l', to: 'a', label: 'CPI: get_lp_value()', status: 'safe' },
  { id: 'e3', from: 'a', to: 's', label: 'Validated Read', status: 'safe' },
];

const nodeColors = {
  user: 'var(--text-secondary)',
  lending: 'var(--node-live)',
  amm: 'var(--accent)',
  state: 'var(--node-archived)',
};

export function LpCollateralCpiDiagram() {
  const reduced = useMotionPreference();
  const [activeTab, setActiveTab] = useState<Tab>('direct');

  const nodes = activeTab === 'direct' ? directNodes : cpiNodes;
  const edges = activeTab === 'direct' ? directEdges : cpiEdges;

  return (
    <div
      style={{
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        backgroundColor: 'var(--bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '2.5rem',
        marginBottom: '2.5rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-elevated)' }}>
        {(['direct', 'cpi'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              padding: '1rem',
              color: activeTab === tab ? 'var(--accent)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab ? 600 : 400,
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              transition: 'color var(--duration-fast) ease, background-color var(--duration-fast) ease',
              borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
            }}
          >
            {tab === 'direct' ? 'V1: Direct Account Reads' : 'V2: Cross-Program Invocation (CPI)'}
          </button>
        ))}
      </div>

      <div style={{ padding: '2rem 1rem', display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <svg width="600" height="300" viewBox="0 0 600 300" style={{ overflow: 'visible' }}>
          
          <AnimatePresence mode="wait">
            <motion.g
              key={activeTab}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Edges */}
              {edges.map((edge) => {
                const fromNode = nodes.find(n => n.id === edge.from)!;
                const toNode = nodes.find(n => n.id === edge.to)!;
                const isDanger = edge.status === 'danger';
                
                // Calculate line path
                const dx = toNode.x - fromNode.x;
                const dy = toNode.y - fromNode.y;
                const angle = Math.atan2(dy, dx);
                const r = 40; // node radius approx padding
                const startX = fromNode.x + Math.cos(angle) * r;
                const startY = fromNode.y + Math.sin(angle) * r;
                const endX = toNode.x - Math.cos(angle) * (r + 10);
                const endY = toNode.y - Math.sin(angle) * (r + 10);

                return (
                  <g key={edge.id}>
                    {/* Arrow Marker Definitions */}
                    <defs>
                      <marker id={`arrow-${edge.id}`} markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill={isDanger ? 'var(--node-archived)' : 'var(--text-secondary)'} opacity="0.6" />
                      </marker>
                    </defs>

                    {/* Path */}
                    <motion.path
                      d={`M ${startX} ${startY} L ${endX} ${endY}`}
                      stroke={isDanger ? 'var(--node-archived)' : 'var(--text-secondary)'}
                      strokeWidth="2"
                      strokeDasharray={isDanger ? '4,4' : 'none'}
                      fill="none"
                      opacity="0.6"
                      markerEnd={`url(#arrow-${edge.id})`}
                      initial={reduced ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />

                    {/* Edge Label */}
                    <text
                      x={(startX + endX) / 2}
                      y={(startY + endY) / 2 - 10}
                      textAnchor="middle"
                      fill={isDanger ? 'var(--node-archived)' : 'var(--text-secondary)'}
                      fontSize="12"
                      fontFamily="var(--font-mono)"
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => (
                <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                  <circle
                    r="6"
                    fill="var(--bg-secondary)"
                    stroke={nodeColors[node.type]}
                    strokeWidth="2"
                  />
                  <circle
                    r="3"
                    fill={nodeColors[node.type]}
                  />
                  <text
                    y="25"
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="13"
                    fontWeight="500"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </motion.g>
          </AnimatePresence>

        </svg>
      </div>

      <div style={{ padding: '1rem 2rem', borderTop: '1px solid var(--line)', backgroundColor: 'var(--bg-primary)' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
          {activeTab === 'direct' 
            ? 'Direct reads parse raw account data buffers manually. If the AMM upgrades its struct layout, the lending protocol silently deserializes garbage data, mispricing collateral.' 
            : 'CPI routes through the AMM program itself. If state layouts change, the CPI fails cleanly or returns correct data. Strongly typed, upgrade-resilient.'}
        </p>
      </div>
    </div>
  );
}
