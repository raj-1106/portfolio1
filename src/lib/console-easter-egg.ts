// src/lib/console-easter-egg.ts
export function initConsoleEasterEgg() {
  if (typeof window === 'undefined') return;

  const styles = 'color: #E8A33D; font-family: monospace; font-size: 12px;';
  console.log('%cLooking at the network tab already? Good instinct.', styles);
  console.log('%cThe RPC proxy lives at /api/rpc/[program]. Go easy on it, the cache is best-effort.', styles);
}
