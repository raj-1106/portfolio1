import type { Variants, Transition } from 'framer-motion';


export const smoothTransition: Transition = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1], // ease-out-expo
};

export const quickTransition: Transition = {
  duration: 0.2,
  ease: [0.16, 1, 0.3, 1],
};

/**
 * Returns variants adjusted for reduced-motion preference.
 * When reduced is true, initial and animate states are identical (no animation).
 */
function motionSafe<T extends Variants>(variants: T, reduced: boolean): T {
  if (reduced) {
    return {
      hidden: {},
      visible: {},
      exit: {},
    } as unknown as T;
  }
  return variants;
}

// Variant factories — call with useMotionPreference() result.

export const fadeInUp = (reduced: boolean): Variants =>
  motionSafe(
    {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: smoothTransition,
      },
    },
    reduced,
  );

export const fadeIn = (reduced: boolean): Variants =>
  motionSafe(
    {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: smoothTransition,
      },
    },
    reduced,
  );

export const scaleOnHover = (reduced: boolean) =>
  reduced
    ? {}
    : {
        scale: 1.02,
        y: -2,
        transition: quickTransition,
      };

export const staggerContainer = (reduced: boolean): Variants =>
  motionSafe(
    {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.05,
        },
      },
    },
    reduced,
  );

export const nodeAppear = (reduced: boolean): Variants =>
  motionSafe(
    {
      hidden: { opacity: 0, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        },
      },
    },
    reduced,
  );

export const slideInFromLeft = (reduced: boolean): Variants =>
  motionSafe(
    {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: smoothTransition,
      },
    },
    reduced,
  );

export const slideInFromRight = (reduced: boolean): Variants =>
  motionSafe(
    {
      hidden: { opacity: 0, x: 30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: smoothTransition,
      },
    },
    reduced,
  );
