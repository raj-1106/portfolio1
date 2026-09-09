'use client';

import type { ReactNode } from 'react';

/**
 * Client component wrapper for case-study pages.
 * Needed because styled-jsx (hover styles) requires 'use client',
 * but the page itself uses server-only generateStaticParams/generateMetadata.
 */
export function CaseStudyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <style jsx global>{`
        .back-link:hover {
          color: var(--accent) !important;
        }
        .case-study-content h2 {
          font-size: 1.5rem;
          margin-top: 2rem;
        }
        .case-study-content h3 {
          font-size: 1.25rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .case-study-content p {
          color: var(--text-secondary);
        }
      `}</style>
    </>
  );
}
