'use client';
import { useEffect } from 'react';
import { initConsoleEasterEgg } from '@/lib/console-easter-egg';

export function ConsoleEasterEgg() {
  useEffect(() => {
    initConsoleEasterEgg();
  }, []);
  return null;
}
