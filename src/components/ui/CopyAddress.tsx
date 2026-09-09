'use client';

import { useState } from 'react';

export function CopyAddress({ address, label }: { address: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API can fail: insecure context, permission denied, unsupported browser
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  const short = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Address copied' : `Copy ${label ?? 'address'} to clipboard`}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        color: error ? 'var(--node-progress)' : 'var(--text-secondary)',
        background: 'none',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        padding: '0.3rem 0.7rem',
        cursor: 'pointer',
        transition: 'color 150ms ease, border-color 150ms ease',
      }}
    >
      {error ? 'Copy failed, try manually' : copied ? `Copied — that's ${short}, not your seed phrase` : short}
    </button>
  );
}
