/**
 * Shared Framer Motion animation variants — Apple spring physics.
 *
 * Import these into components for consistent, reusable animation patterns.
 * All durations are tuned for Apple HIG: quick, responsive, never sluggish.
 *
 * Respects `prefers-reduced-motion` via Framer Motion's built-in support.
 *
 * @example
 * import { fadeUp, staggerContainer, springTransition } from '@/animations/variants';
 * <motion.div variants={staggerContainer} initial="hidden" animate="visible">
 *   <motion.div variants={fadeUp} transition={springTransition} />
 * </motion.div>
 */

// ── Apple Easings ─────────────────────────────────────────

export const EASING = {
  /** Default Apple ease-out — fast start, gentle settle. */
  easeOut: [0.16, 1, 0.3, 1],
  /** Smooth in-out for larger transitions. */
  easeInOut: [0.76, 0, 0.24, 1],
  /** Subtle deceleration for hover exits. */
  easeIn: [0.4, 0, 1, 1],
};

// ── Apple Spring Presets ──────────────────────────────────

/** Quick, responsive spring — buttons, toggles, micro-interactions. */
export const springQuick = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

/** Smooth, elegant spring — cards, modals, page elements. */
export const springSmooth = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

/** Gentle, luxurious spring — hero content, large elements. */
export const springGentle = {
  type: 'spring',
  stiffness: 200,
  damping: 28,
};

// ── Page Transitions ──────────────────────────────────────

export const pageTransition = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.35, ease: EASING.easeOut },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: EASING.easeOut },
  },
};

// ── Fade Variants ─────────────────────────────────────────

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: EASING.easeOut },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING.easeOut },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING.easeOut },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASING.easeOut },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASING.easeOut },
  },
};

// ── Scale Variants ────────────────────────────────────────

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: EASING.easeOut },
  },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASING.easeOut },
  },
};

// ── Stagger Containers ────────────────────────────────────

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08,
    },
  },
};

export const staggerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

// ── Scroll Reveal ─────────────────────────────────────────

export const scrollFadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASING.easeOut },
  },
};

export const scrollScaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASING.easeOut },
  },
};

// ── Hover Physics ─────────────────────────────────────────

/** Subtle lift — use on card containers. */
export const hoverLift = {
  whileHover: {
    y: -4,
    transition: { duration: 0.25, ease: EASING.easeOut },
  },
};

/** Gentle scale — use on interactive elements. */
export const hoverScale = {
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.25, ease: EASING.easeOut },
  },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
};

/** Card float — subtle breathing animation. */
export const cardFloat = {
  whileHover: {
    y: -6,
    scale: 1.01,
    transition: springSmooth,
  },
  whileTap: {
    y: 0,
    scale: 0.99,
    transition: { duration: 0.1 },
  },
};

// ── Press Interaction ─────────────────────────────────────

export const pressInteraction = {
  whileTap: {
    scale: 0.97,
    transition: { duration: 0.1 },
  },
};
