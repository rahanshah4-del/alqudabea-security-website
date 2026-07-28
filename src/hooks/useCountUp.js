import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Animate a number from 0 to a target value.
 *
 * Powered by requestAnimationFrame with an ease-out curve.
 * Respects `prefers-reduced-motion` — when enabled, the target
 * value is displayed instantly without animation.
 *
 * @param {object} options
 * @param {number} options.target  — The final value to count to.
 * @param {number} [options.duration=2000] — Animation duration in ms.
 * @param {number} [options.delay=0]       — Delay before starting in ms.
 * @param {boolean} [options.once=true]    — Only animate the first time.
 * @returns {number} The current animated value.
 */
export function useCountUp({ target, duration = 2000, delay = 0, once = true }) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);
  const rafRef = useRef(null);

  const animate = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: f(t) = 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [target, duration]);

  useEffect(() => {
    if (once && hasAnimated.current) {
      return;
    }

    hasAnimated.current = true;

    const timeout = setTimeout(animate, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, delay, once]);

  return value;
}
