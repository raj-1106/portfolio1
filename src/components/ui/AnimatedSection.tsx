'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';
import { fadeInUp, slideInFromLeft, slideInFromRight, staggerContainer } from '@/styles/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  stagger?: boolean;
  className?: string;
}

const directionVariants = {
  up: fadeInUp,
  left: slideInFromLeft,
  right: slideInFromRight,
} as const;

/**
 * Scroll-reveal wrapper using Framer Motion's whileInView.
 * - Triggers 100px before element enters viewport
 * - Plays once (no re-trigger on scroll back)
 * - If reduced motion → renders children immediately, no animation
 * - Do NOT wrap above-the-fold / hero content with this
 */
export function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  stagger = false,
  className = '',
}: AnimatedSectionProps) {
  const reduced = useMotionPreference();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const variants = stagger
    ? staggerContainer(false)
    : directionVariants[direction](false);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
