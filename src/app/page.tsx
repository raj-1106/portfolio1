import { HeroSection } from '@/components/hero/HeroSection';
import { AboutSection } from '@/components/about/AboutSection';
import { FilteredProjects } from '@/components/projects/FilteredProjects';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { NodeDivider } from '@/components/ui/NodeDivider';
import { projects, siteConfig } from '@/content/config';
import { ExperienceList } from '@/components/experience/ExperienceList';

export default function Home() {
  return (
    <>
      {/* Hero — no scroll animation, renders immediately */}
      <HeroSection />

      <div className="container">
        {/* ──── About ──── */}
        <AnimatedSection>
          <section id="about" className="section" style={{ paddingTop: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>About</h2>
            <AboutSection />
          </section>
        </AnimatedSection>

        {/* ──── Projects ──── */}
        <NodeDivider dotStatus="in-progress" />

        <AnimatedSection>
          <section id="projects" className="section">
            <h2 style={{ marginBottom: '0.5rem' }}>Projects</h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              DeFi protocols and on-chain applications across Solana and EVM. Two chains, zero
              interoperability between them, entirely on purpose for now.
            </p>
            <FilteredProjects projects={projects} />
          </section>
        </AnimatedSection>

        {/* ──── Experience ──── */}
        <NodeDivider dotStatus="archived" />

        <AnimatedSection>
          <section id="experience" className="section">
            <h2 style={{ marginBottom: '2.5rem' }}>Experience</h2>
            <ExperienceList />
          </section>
        </AnimatedSection>

        {/* ──── Contact ──── */}
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
                className="contact-github-link"
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
