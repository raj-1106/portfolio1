import { describe, it, expect } from 'vitest';
import { getProjectBySlug, getProjectSlugs } from './mdx';

describe('mdx content loading', () => {
  it('loads a real project\'s frontmatter and body (main case)', () => {
    const result = getProjectBySlug('dex');
    expect(result).not.toBeNull();
    expect(result?.meta.chain).toBe('evm');
    expect(result?.content).toContain('real design gotcha');
  });

  it('returns null for a slug with no matching file (edge case)', () => {
    expect(getProjectBySlug('does-not-exist')).toBeNull();
  });

  it('every slug returned by getProjectSlugs actually resolves (failure case, catches drift between filesystem and slug list)', () => {
    const slugs = getProjectSlugs();
    for (const slug of slugs) {
      expect(getProjectBySlug(slug)).not.toBeNull();
    }
  });
});
