import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ProjectMeta } from './types';

const PROJECTS_DIR = path.join(process.cwd(), 'src/content/projects');

export function getProjectSlugs(): string[] {
  return fs.readdirSync(PROJECTS_DIR).map((f) => f.replace(/\.mdx$/, ''));
}

export function getProjectBySlug(slug: string): { meta: ProjectMeta; content: string } | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { meta: data as ProjectMeta, content };
}
