'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';
import { staggerContainer } from '@/styles/animations';
import type { ProjectMeta } from '@/lib/types';

interface ProjectGridProps {
  projects: ProjectMeta[];
}

/**
 * Responsive grid of ProjectCards with staggered reveal.
 * 1 col mobile → 2 col tablet → 3 col desktop.
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  const reduced = useMotionPreference();

  return (
    <motion.div
      variants={staggerContainer(reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginTop: '1.5rem',
      }}
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <motion.div
            key={project.slug}
            layout={!reduced}
            initial={reduced ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
