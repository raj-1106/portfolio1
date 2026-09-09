'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';

type Tab = 'vulnerable' | 'virtual-offset' | 'min-deposit';

interface Step {
  id: string;
  type: 'attacker' | 'victim' | 'vault' | 'result';
  title: string;
  desc: string;
}

const flows: Record<Tab, Step[]> = {
  vulnerable: [
    { id: 'v1', type: 'attacker', title: 'Attacker deposits 1 wei', desc: 'Vault: 1 Asset | 1 Share' },
    { id: 'v2', type: 'attacker', title: 'Attacker donates 1000 ETH', desc: 'Vault: 1000 ETH + 1 wei | 1 Share' },
    { id: 'v3', type: 'victim', title: 'Victim deposits 1000 ETH', desc: 'Share calculation rounds down to 0 shares.' },
    { id: 'v4', type: 'result', title: 'Attacker redeems 1 share', desc: 'Attacker drains 2000 ETH. Victim loses everything.' },
  ],
  'virtual-offset': [
    { id: 'o1', type: 'vault', title: 'Vault applies virtual offset', desc: 'Internal accounting starts with +1000 Virtual Assets & Shares.' },
    { id: 'o2', type: 'attacker', title: 'Attacker deposits 1 wei', desc: 'Attacker gets 0 shares (diluted by virtual offset).' },
    { id: 'o3', type: 'attacker', title: 'Attacker donates 1000 ETH', desc: 'Donation inflates virtual pool, no profit margin created.' },
    { id: 'o4', type: 'result', title: 'Victim deposits 1000 ETH', desc: 'Victim receives fair shares. Attacker loses donation.' },
  ],
  'min-deposit': [
    { id: 'm1', type: 'attacker', title: 'Attacker deposits 1 wei', desc: 'REVERT: Amount below minimum deposit threshold.' },
    { id: 'm2', type: 'attacker', title: 'Attacker deposits threshold', desc: 'First shares permanently minted to dead address.' },
    { id: 'm3', type: 'result', title: 'Victim deposits 1000 ETH', desc: 'Victim receives fair shares. Attack thwarted.' },
  ],
};

const nodeColors = {
  attacker: 'var(--accent)',
  victim: 'var(--node-live)',
  vault: 'var(--node-archived)',
  result: 'var(--text-primary)',
};

export function InflationAttackComparison() {
  const reduced = useMotionPreference();
  const [activeTab, setActiveTab] = useState<Tab>('vulnerable');

  const steps = flows[activeTab];

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
        {(['vulnerable', 'virtual-offset', 'min-deposit'] as const).map((tab) => (
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
            {tab === 'vulnerable' ? 'Vulnerable Flow' : tab === 'virtual-offset' ? 'Fix: Virtual Offset' : 'Fix: Min Deposit'}
          </button>
        ))}
      </div>

      <div style={{ padding: '2rem 1rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', width: '100%', maxWidth: '400px' }}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}
            >
              {/* Connecting Line */}
              <div
                style={{
                  position: 'absolute',
                  left: '11px',
                  top: '20px',
                  bottom: '20px',
                  width: '2px',
                  backgroundColor: 'var(--line)',
                  zIndex: 0,
                }}
              />

              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={reduced ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                  style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1 }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-secondary)',
                      border: `2px solid ${nodeColors[step.type]}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: nodeColors[step.type] }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {step.title}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {step.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
