'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-secondary)',
          border: '2px solid var(--node-archived)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}
      >
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--node-archived)' }} />
      </div>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        404
      </h1>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px' }}>
        This route doesn't exist. Unlike your funds, which are always exactly where the smart contract says they are.
      </p>

      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--accent)',
          color: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        Return to Safety
      </Link>
    </div>
  );
}
