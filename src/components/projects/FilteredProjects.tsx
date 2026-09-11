'use client';

import { ChainFilter } from '@/components/projects/ChainFilter';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import type { ProjectMeta } from '@/lib/types';

interface FilteredProjectsProps {
  projects: ProjectMeta[];
}

/**
 * Client wrapper that owns ChainFilter + ProjectGrid.
 * Lives in its own 'use client' boundary so page.tsx can remain a Server Component.
 * The render-prop function stays entirely client-side here.
 */
export function FilteredProjects({ projects }: FilteredProjectsProps) {
  return (
    <ChainFilter projects={projects}>
      {(filtered) => <ProjectGrid projects={filtered} />}
    </ChainFilter>
  );
}
