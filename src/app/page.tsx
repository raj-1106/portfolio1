'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/hero/HeroSection';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ChainFilter } from '@/components/projects/ChainFilter';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { NodeDivider } from '@/components/ui/NodeDivider';
import { Card } from '@/components/ui/Card';
import { projects, siteConfig } from '@/content/config';
import { ExperienceList } from '@/components/experience/ExperienceList';
import type { ChainFilter as ChainFilterType } from '@/lib/types';

export default function Home() {
  return (
    <>
      {/* Hero — no scroll animation, renders immediately */}
      <HeroSection />

      <div className="container">
        {/* ──── Projects Section ──── */}
        <NodeDivider dotStatus="in-progress" />

        <AnimatedSection>
          <section id="projects" className="section">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '0.5rem',
              }}
            >
              <h2>Projects</h2>
            </div>

            <p style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              DeFi protocols and on-chain applications across Solana and EVM. Two chains, zero interoperability between them, entirely on purpose for now.
            </p>

            <ChainFilter projects={projects}>
              {(filteredProjects) => <ProjectGrid projects={filteredProjects} />}
            </ChainFilter>
          </section>
        </AnimatedSection>

        {/* ──── Experience Section ──── */}
        <NodeDivider dotStatus="archived" />

        <AnimatedSection>
          <section id="experience" className="section">
            <h2 style={{ marginBottom: '2.5rem' }}>Experience</h2>
            <ExperienceList />
          </section>
        </AnimatedSection>

        {/* ──── Contact Section ──── */}
        <NodeDivider dotStatus="live" />

        <AnimatedSection>
          <section id="contact" className="section">
            <h2 style={{ marginBottom: '1rem' }}>Get in Touch</h2>
            <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Interested in collaborating or discussing on-chain development?
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={`mailto:${siteConfig.socials.email}`}
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
                }}
              >
                Send an Email
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
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
                GitHub
              </a>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </>
  );
}
