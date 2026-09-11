'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypingEffect } from '@/components/hero/TypingEffect';
import { siteConfig, taglines } from '@/content/config';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';

/**
 * Three-node SVG fragment — echoes diagram visual language. Purely decorative.
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
      <line x1="28" y1="20" x2="88" y2="20" stroke="var(--line)" strokeWidth="1" />
      <line x1="112" y1="20" x2="172" y2="20" stroke="var(--line)" strokeWidth="1" />

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
 * - Name renders immediately
 * - First tagline types out
 * - Second tagline fades in once typing completes
 * - No particle backgrounds, no floating shapes, no gradient mesh
 */
export function HeroSection() {
  const [line1Done, setLine1Done] = useState(false);
  const reducedMotion = useMotionPreference();

  return (
    <section
      id="hero"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '64px',
      }}
    >
      <div className="container">
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

        <p
          style={{
            marginTop: '1rem',
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            minHeight: '3.2em', // reserve space, avoid layout shift
          }}
        >
          <TypingEffect
            text={taglines[0]}
            speed={22} // faster than a "savor this" pace — this is meant to resolve quickly
            delay={400}
            onComplete={() => setLine1Done(true)}
          />
        </p>

        {(line1Done || reducedMotion) && (
          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              marginTop: '0.5rem',
              maxWidth: '58ch',
              lineHeight: 1.6,
            }}
          >
            {taglines[1]}
          </motion.p>
        )}

        <HeroNodeFragment />

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
