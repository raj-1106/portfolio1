'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

/**
 * Single-use typing animation.
 * Uses requestAnimationFrame for smooth character rendering.
 * Degrades to full static text under prefers-reduced-motion.
 * Container has fixed min-height to prevent CLS.
 */
export function TypingEffect({ text, speed = 50, delay = 0, onComplete }: TypingEffectProps) {
  const reduced = useMotionPreference();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const charIndex = useRef(0);
  const lastTimestamp = useRef(0);

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimestamp.current) lastTimestamp.current = timestamp;

      const elapsed = timestamp - lastTimestamp.current;

      if (elapsed >= speed) {
        lastTimestamp.current = timestamp;
        charIndex.current += 1;

        if (charIndex.current <= text.length) {
          setDisplayedText(text.slice(0, charIndex.current));
          requestAnimationFrame(animate);
        } else {
          setIsComplete(true);
          onComplete?.();
        }
      } else {
        requestAnimationFrame(animate);
      }
    },
    [text, speed],
  );

  useEffect(() => {
    if (reduced) {
      setDisplayedText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setHasStarted(true);
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [reduced, text, delay, animate]);

  if (reduced) {
    return (
      <span style={{ fontFamily: 'inherit' }}>
        {text}
      </span>
    );
  }

  return (
    <span
      style={{
        fontFamily: 'inherit',
        display: 'inline',
      }}
    >
      {displayedText}
      {!isComplete && hasStarted && (
        <span
          className="typing-cursor"
          style={{
            color: 'var(--accent)',
            fontWeight: 400,
            marginLeft: '1px',
          }}
        >
          |
        </span>
      )}

    </span>
  );
}
