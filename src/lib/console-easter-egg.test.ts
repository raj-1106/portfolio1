import { describe, it, expect, vi } from 'vitest';
import { initConsoleEasterEgg } from './console-easter-egg';

describe('initConsoleEasterEgg', () => {
  it('logs the easter egg messages (main case)', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    initConsoleEasterEgg();
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });

  it('does nothing when window is undefined, i.e. during SSR (failure case)', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const originalWindow = global.window;
    // @ts-ignore simulating SSR
    delete (global as any).window;
    initConsoleEasterEgg();
    expect(spy).not.toHaveBeenCalled();
    (global as any).window = originalWindow;
    spy.mockRestore();
  });
});
