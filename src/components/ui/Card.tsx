'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';
import { scaleOnHover } from '@/styles/animations';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  as?: 'div' | 'article';
}

/**
 * Flat card with thin --line border. No blur, no shadow, no gradient.
 * Hover: border brightens to accent, subtle y-shift.
 * Focus matches hover for keyboard accessibility.
 */
export function Card({ children, as = 'div', className = '', style, ...props }: CardProps) {
  const reduced = useMotionPreference();
  const Component = as === 'article' ? motion.article : motion.div;

  return (
    <Component
      className={`card ${className}`}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        padding: '1.5rem',
        cursor: 'default',
        transition: `border-color var(--duration-fast) ease`,
        ...style,
      }}
      whileHover={reduced ? undefined : {
        y: -2,
        borderColor: 'hsl(28, 90%, 58%)',
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
      }}
      whileFocus={reduced ? undefined : {
        y: -2,
        borderColor: 'hsl(28, 90%, 58%)',
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
      }}
      tabIndex={0}
      {...props}
    >
      {children}
    </Component>
  );
}
