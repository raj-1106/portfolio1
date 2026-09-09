'use client';

import { useState } from 'react';

interface CopyAddressProps {
  address: string;
  label?: string;
}

export function CopyAddress({ address, label }: CopyAddressProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {label && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          {label}
        </span>
      )}
      <button
        onClick={handleCopy}
        aria-label="Copy address"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius)',
          padding: '0.25rem 0.5rem',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          cursor: 'pointer',
          transition: 'border-color var(--duration-fast) ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; }}
      >
        <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
        
        {/* Micro-feedback icon swap */}
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--node-live)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
      </button>
    </div>
  );
}
