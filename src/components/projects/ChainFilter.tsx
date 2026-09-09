'use client';

import { useState } from 'react';
import type { ProjectMeta } from '@/lib/types';

type ChainOption = 'all' | 'svm' | 'evm';

export function ChainFilter({
  projects,
  children,
}: {
  projects: ProjectMeta[];
  children: (filtered: ProjectMeta[]) => React.ReactNode;
}) {
  const [active, setActive] = useState<ChainOption>('all');

  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.chain === active);

  const counts = {
    all: projects.length,
    svm: projects.filter((p) => p.chain === 'svm').length,
    evm: projects.filter((p) => p.chain === 'evm').length,
  };

  return (
    <div>
      <div role="tablist" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {(['all', 'svm', 'evm'] as const).map((option) => (
          <button
            key={option}
            role="tab"
            aria-selected={active === option}
            onClick={() => setActive(option)}
            suppressHydrationWarning
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius)',
              border: `1px solid ${active === option ? 'var(--accent)' : 'var(--line)'}`,
              color: active === option ? 'var(--accent)' : 'var(--text-secondary)',
              background: 'none',
              cursor: 'pointer',
              transition: 'border-color var(--duration-fast) ease, color var(--duration-fast) ease',
            }}
          >
            {option.toUpperCase()} ({counts[option]})
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          No projects in this category yet.
        </p>
      ) : (
        children(filtered)
      )}
    </div>
  );
}
