'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';

export function CountUpStat({ value, label, durationMs = 700 }: { value: number; label: string; durationMs?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const reducedMotion = useMotionPreference();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const progress = Math.min((now - start) / durationMs, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, value, durationMs]);

  return (
    <div ref={ref}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'var(--accent)' }}>
        {display}
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{label}</div>
    </div>
  );
}
