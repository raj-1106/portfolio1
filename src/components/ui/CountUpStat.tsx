'use client';

import { useEffect, useState, useRef } from 'react';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';

interface CountUpStatProps {
  value: number;
  label: string;
  suffix?: string;
  durationMs?: number;
}

export function CountUpStat({ value, label, suffix = '', durationMs = 800 }: CountUpStatProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();

  useEffect(() => {
    if (reduced) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
            
            // easeOutQuad - restrained, no bounce
            const easeOutProgress = 1 - (1 - progress) * (1 - progress);
            
            setCount(Math.floor(easeOutProgress * value));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, durationMs, hasAnimated, reduced]);

  return (
    <div ref={elementRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </div>
      <div
        style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
        }}
      >
        {label}
      </div>
    </div>
  );
}
