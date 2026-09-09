'use client';

import { motion } from 'framer-motion';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useMotionPreference();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: 'linear' }}
    >
      {children}
    </motion.div>
  );
}
