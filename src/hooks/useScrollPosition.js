import { useState, useEffect, useRef } from 'react';

/**
 * Track scroll position, direction, and whether the user has scrolled.
 *
 * Uses requestAnimationFrame for smooth, throttled updates.
 * Returns stable values for navbar glass/blur/shrink effects.
 *
 * @param {object} [options]
 * @param {number} [options.threshold=10] — Min px before "scrolled" flips to true.
 * @returns {{ y: number, scrolled: boolean, direction: 'up' | 'down' | null }}
 */
export function useScrollPosition({ threshold = 10 } = {}) {
  const [state, setState] = useState({ y: 0, scrolled: false, direction: null });
  const lastY = useRef(0);

  useEffect(() => {
    let rafId;

    function tick() {
      const currentY = window.scrollY;
      const direction = currentY > lastY.current ? 'down' : currentY < lastY.current ? 'up' : null;

      setState({
        y: currentY,
        scrolled: currentY > threshold,
        direction,
      });

      lastY.current = currentY;
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [threshold]);

  return state;
}
