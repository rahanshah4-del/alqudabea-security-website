/**
 * Standardized scroll-reveal animation presets.
 *
 * Every section uses the same easing and duration for consistent feel.
 * Import these variants and apply them with Framer Motion `whileInView`
 * or the `initial`/`animate` pattern.
 *
 * All animations respect `prefers-reduced-motion` via Framer Motion's
 * built-in support (set globally, no per-component code needed).
 */

// ── Core Easing ──────────────────────────────────────────

/** Apple-style ease-out — fast start, gentle settle. */
export const APPLE_EASE = [0.16, 1, 0.3, 1];

// ── Apple Spring Presets ─────────────────────────────────

/** Quick, responsive spring — buttons, toggles. */
export const springQuick = { type: 'spring', stiffness: 400, damping: 30 };

/** Smooth, elegant spring — cards, page elements. */
export const springSmooth = { type: 'spring', stiffness: 300, damping: 30 };

// ── Section Headers ─────────────────────────────────────

export const sectionHeaderReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: APPLE_EASE },
  },
};

// ── Cards ───────────────────────────────────────────────

export const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: APPLE_EASE },
  }),
};

// ── Stagger Containers ──────────────────────────────────

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

// ── Fade Only ───────────────────────────────────────────

export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: APPLE_EASE },
  },
};

// ── Scale Reveal ────────────────────────────────────────

export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: APPLE_EASE },
  },
};

// ── Hover Physics ───────────────────────────────────────

/** Subtle lift — use on card containers. */
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.25, ease: APPLE_EASE } },
};

/** Gentle scale — use on interactive elements. */
export const hoverScale = {
  whileHover: { scale: 1.02, transition: { duration: 0.25, ease: APPLE_EASE } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
};

/** Card float — subtle breathing animation on hover. */
export const cardFloat = {
  whileHover: { y: -6, scale: 1.01, transition: springSmooth },
  whileTap: { y: 0, scale: 0.99, transition: { duration: 0.1 } },
};

// ── Press Interaction ───────────────────────────────────

export const pressInteraction = {
  whileTap: { scale: 0.97, transition: { duration: 0.1 } },
};
