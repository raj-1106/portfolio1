'use client';

import { useState, useEffect, useRef } from 'react';

export function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        /* Browser extensions (password managers, etc.) inject attributes into
           buttons after hydration, causing false-positive mismatch warnings.
           suppressHydrationWarning is the standard fix for this pattern. */
        suppressHydrationWarning
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          border: '1px solid var(--line)',
          padding: '0.4rem 0.9rem',
          borderRadius: 'var(--radius)',
          background: 'none',
          cursor: 'pointer',
        }}
      >
        Resume
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90vw',
              maxWidth: '800px',
              height: '85vh',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <button
              ref={closeButtonRef}
              onClick={() => setIsOpen(false)}
              aria-label="Close resume viewer"
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--line)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                zIndex: 1,
              }}
            >
              ✕
            </button>
            <iframe
              src="/resume.pdf"
              title="Resume"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
            <a
              href="/resume.pdf"
              download
              style={{
                position: 'absolute',
                bottom: '0.75rem',
                right: '0.75rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent)',
              }}
            >
              Download instead
            </a>
          </div>
        </div>
      )}
    </>
  );
}
