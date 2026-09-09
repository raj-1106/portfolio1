import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { projects, rpcAllowlist } from '@/content/config';
import { NodeDivider } from '@/components/ui/NodeDivider';
import { CaseStudyLayout } from '@/components/ui/CaseStudyLayout';
import { LiveStateBadge } from '@/components/badges/LiveStateBadge';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug } from '@/lib/mdx';

const LiquidationFlowDiagram = dynamic(
  () => import('@/components/diagrams/LiquidationFlowDiagram').then((mod) => mod.LiquidationFlowDiagram)
);

const AMMGraphDiagram = dynamic(
  () => import('@/components/diagrams/AMMGraphDiagram').then((mod) => mod.AMMGraphDiagram)
);

const InflationAttackComparison = dynamic(
  () => import('@/components/diagrams/InflationAttackComparison').then((mod) => mod.InflationAttackComparison)
);

const LpCollateralCpiDiagram = dynamic(
  () => import('@/components/diagrams/LpCollateralCpiDiagram').then((mod) => mod.LpCollateralCpiDiagram)
);


// Generate static params for all projects
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata per project
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = projects.find((p) => p.slug === slug);
    if (!project) return { title: 'Not Found' };
    return {
      title: project.title,
      description: project.description,
    };
  });
}

const statusColorMap = {
  live: 'var(--node-live)',
  'in-progress': 'var(--node-progress)',
  archived: 'var(--node-archived)',
};

const statusLabelMap = {
  live: 'Live',
  'in-progress': 'In Progress',
  archived: 'Archived',
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Keep using the config.ts array for metadata to preserve `liveUrl` and diagram wiring,
  // but fetch the actual prose content from the MDX file.
  const project = projects.find((p) => p.slug === slug);
  const mdxData = getProjectBySlug(slug);

  if (!project || !mdxData) {
    notFound();
  }

  const mdxContent = mdxData.content;

  return (
    <CaseStudyLayout>
    <div className="container" style={{ paddingTop: '96px', paddingBottom: '4rem' }}>
      {/* Back navigation */}
      <Link
        href="/#projects"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          transition: 'color var(--duration-fast) ease',
        }}
        className="back-link"
      >
        ← Back to Projects
      </Link>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          {/* Status dot */}
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: statusColorMap[project.status],
            }}
          />
          <span
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
            }}
          >
            {statusLabelMap[project.status]}
          </span>

          {/* Chain tag */}
          <span
            style={{
              fontSize: '0.675rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-elevated)',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {project.chain}
            {project.evmChain ? ` · ${project.evmChain}` : ''}
          </span>
        </div>

        <h1 style={{ marginBottom: '0.75rem' }}>{project.title}</h1>
        <p style={{ fontSize: '1.125rem', maxWidth: '60ch', marginBottom: '1rem' }}>{project.description}</p>
        
        {/* Live State Badge */}
        {rpcAllowlist[project.slug] && (
          <div style={{ marginBottom: '1rem' }}>
            <LiveStateBadge programSlug={project.slug} />
          </div>
        )}
      </div>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--line)',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius)',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* External links */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.875rem',
              color: 'var(--accent)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            Live Demo ↗
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.875rem',
              color: 'var(--accent)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            Source Code ↗
          </a>
        )}
      </div>

      <NodeDivider dotStatus={project.status} />

      {/* Case study content placeholder */}
      <article
        className="case-study-content"
        style={{
          maxWidth: '65ch',
          lineHeight: 1.8,
        }}
      >
        <MDXRemote source={mdxContent} />

        {project.diagramType === 'liquidation-flow' && (
          <>
            <NodeDivider dotPosition="none" />
            <LiquidationFlowDiagram />
          </>
        )}

        {project.diagramType === 'amm-graph' && (
          <>
            <NodeDivider dotPosition="none" />
            <AMMGraphDiagram />
          </>
        )}

        {project.diagramType === 'inflation-attack-comparison' && (
          <>
            <NodeDivider dotPosition="none" />
            <InflationAttackComparison />
          </>
        )}

        {project.diagramType === 'lp-collateral-cpi' && (
          <>
            <NodeDivider dotPosition="none" />
            <LpCollateralCpiDiagram />
          </>
        )}
      </article>
    </div>
    </CaseStudyLayout>
  );
}
