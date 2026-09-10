// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { CountUpStat } from './CountUpStat';
import React from 'react';

afterEach(cleanup);

import * as MotionContext from '@/components/common/ReducedMotionContext';

vi.mock('@/components/common/ReducedMotionContext', () => ({
  useMotionPreference: vi.fn(),
}));

class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
window.IntersectionObserver = MockIntersectionObserver as any;

describe('CountUpStat', () => {
  it('renders the final value immediately under reduced motion (main case for accessibility)', () => {
    vi.mocked(MotionContext.useMotionPreference).mockReturnValue(true);
    render(<CountUpStat value={5} label="Projects" />);
    expect(screen.getByText('5')).toBeTruthy();
  });

  it('starts at 0 before animating when motion is not reduced (edge case)', () => {
    vi.mocked(MotionContext.useMotionPreference).mockReturnValue(false);
    render(<CountUpStat value={5} label="Projects" />);
    // The test environment doesn't intersection observer, so it stays at 0
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('handles value=0 without dividing by zero or erroring (failure case)', () => {
    render(<CountUpStat value={0} label="Audit findings" />);
    expect(screen.getByText('0')).toBeTruthy();
  });
});
