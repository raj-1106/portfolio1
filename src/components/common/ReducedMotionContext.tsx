'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ReducedMotionContext = createContext<boolean>(false);

/**
 * Provider that makes reduced-motion preference available
 * throughout the component tree. Wrap this at the root layout level.
 */
export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ReducedMotionContext.Provider value={prefersReducedMotion}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

/**
 * Consume the reduced-motion preference from context.
 * Prefer this over calling useReducedMotion() directly in components,
 * since the context ensures a single source of truth.
 */
export function useMotionPreference(): boolean {
  return useContext(ReducedMotionContext);
}
