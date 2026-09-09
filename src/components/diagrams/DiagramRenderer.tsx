'use client';

import type { ReactNode } from 'react';
import { NodeDivider } from '@/components/ui/NodeDivider';

interface DiagramRendererProps {
  children: ReactNode;
  title: string;
  description?: string;
  legend?: { label: string; color: string }[];
}

/**
 * Shared container for interactive diagrams.
 * Provides consistent styling, border, padding, and an optional legend.
 * The SVG itself is passed as children.
 */
export function DiagramRenderer({ children, title, description, legend }: DiagramRendererProps) {
  return (
    <div
      className="diagram-renderer"
      style={{
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        backgroundColor: 'var(--bg-secondary)',
        overflow: 'hidden',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
      role="region"
      aria-label={title}
    >
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--line)' }}>
        <h3 style={{ fontSize: '1.125rem', marginBottom: description ? '0.5rem' : 0 }}>{title}</h3>
        {description && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {description}
          </p>
        )}
      </div>

      <div
        className="diagram-viewport"
        style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          overflowX: 'auto',
          position: 'relative',
        }}
      >
        {children}
      </div>

      {legend && legend.length > 0 && (
        <>
          <NodeDivider dotPosition="none" style={{ padding: 0 }} />
          <div
            className="diagram-legend"
            style={{
              padding: '1rem 1.5rem',
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              backgroundColor: 'var(--bg-primary)',
            }}
          >
            {legend.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        .diagram-viewport::-webkit-scrollbar {
          height: 6px;
        }
        .diagram-viewport::-webkit-scrollbar-track {
          background: var(--bg-secondary);
        }
        .diagram-viewport::-webkit-scrollbar-thumb {
          background: var(--line);
          border-radius: 3px;
        }
        .diagram-viewport::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }
      `}</style>
    </div>
  );
}
