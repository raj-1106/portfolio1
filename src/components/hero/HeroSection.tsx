'use client';

import { TypingEffect } from '@/components/hero/TypingEffect';
import { siteConfig } from '@/content/config';

/**
 * Static 3-node SVG fragment — echoes diagram visual language.
 * Purely decorative. Will be replaced by a LiquidationFlowDiagram subset in Phase 5.
 */
function HeroNodeFragment() {
  return (
    <svg
      width="200"
      height="40"
      viewBox="0 0 200 40"
      fill="none"
      aria-hidden="true"
      style={{ marginTop: '2rem', opacity: 0.7 }}
    >
      {/* Connector lines */}
      <line x1="28" y1="20" x2="88" y2="20" stroke="var(--line)" strokeWidth="1" />
      <line x1="112" y1="20" x2="172" y2="20" stroke="var(--line)" strokeWidth="1" />

      {/* Node dots */}
      <circle cx="20" cy="20" r="8" fill="none" stroke="var(--node-live)" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="3" fill="var(--node-live)" />

      <circle cx="100" cy="20" r="8" fill="none" stroke="var(--node-progress)" strokeWidth="1.5" />
      <circle cx="100" cy="20" r="3" fill="var(--node-progress)" />

      <circle cx="180" cy="20" r="8" fill="none" stroke="var(--node-archived)" strokeWidth="1.5" />
      <circle cx="180" cy="20" r="3" fill="var(--node-archived)" />
    </svg>
  );
}

/**
 * Full-viewport hero.
 * - Name/title renders immediately (no animation delay)
 * - TypingEffect for tagline
 * - Static 3-node diagram fragment as visual anchor
 * - No particle backgrounds, no floating shapes, no gradient mesh
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '64px', // Clear fixed navbar
      }}
    >
      <div className="container">
        {/* Name — rendered immediately, no animation */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          {siteConfig.name}
        </h1>

        {/* Tagline — typing effect */}
        <p
          style={{
            marginTop: '1rem',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            color: 'var(--text-secondary)',
            minHeight: '2.5rem', // Prevent CLS during typing
          }}
        >
          <TypingEffect text={siteConfig.tagline} speed={60} delay={400} />
        </p>

        {/* Description */}
        <p
          style={{
            marginTop: '1.5rem',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: '50ch',
            lineHeight: 1.7,
          }}
        >
          {siteConfig.description}
        </p>

        {/* Node fragment — decorative visual anchor */}
        <HeroNodeFragment />

        {/* CTA links */}
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'opacity var(--duration-fast) ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            View Projects
          </a>
          <a
            href={`mailto:${siteConfig.socials.email}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              border: '1px solid var(--line)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius)',
              fontWeight: 500,
              fontSize: '0.875rem',
              transition: 'border-color var(--duration-fast) ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
