'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';
import { fadeInUp } from '@/styles/animations';
import { rpcAllowlist } from '@/content/config';
import { LiveStateBadge } from '@/components/badges/LiveStateBadge';
import type { ProjectMeta } from '@/lib/types';

interface ProjectCardProps {
  project: ProjectMeta;
}

const statusColorMap = {
  live: 'var(--node-live)',
  'in-progress': 'var(--node-progress)',
  archived: 'var(--node-archived)',
  completed: 'var(--node-completed)',
};

const statusLabelMap = {
  live: 'Live',
  'in-progress': 'In Progress',
  archived: 'Archived',
  completed: 'Completed',
};

/**
 * Project card using the flat Card base.
 * Status node dot, chain tag pill, tech stack, case-study link.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const reduced = useMotionPreference();

  return (
    <motion.div variants={fadeInUp(reduced)}>
      <Card as="article" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header: status dot + chain tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Status node dot */}
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: statusColorMap[project.status],
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {statusLabelMap[project.status]}
            </span>
          </div>

          {/* Chain tag pill */}
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
          </span>
        </div>

        {/* Live State Badge if configured */}
        {rpcAllowlist[project.slug] && (
          <div style={{ marginBottom: '0.5rem' }}>
            <LiveStateBadge programSlug={project.slug} />
          </div>
        )}

        {/* Title */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech stack tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.375rem',
            marginBottom: '1.25rem',
          }}
        >
          {project.techStack.map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--line)',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Case study link */}
        <Link
          href={`/projects/${project.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--accent)',
            marginTop: 'auto',
          }}
          className="case-study-link"
        >
          View Case Study
          <span className="case-study-arrow" style={{ transition: 'transform var(--duration-fast) ease' }}>
            →
          </span>
        </Link>

        <style jsx global>{`
          .case-study-link:hover .case-study-arrow {
            transform: translateX(4px);
          }
        `}</style>
      </Card>
    </motion.div>
  );
}
