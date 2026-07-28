import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Optimized smooth scrolling via Lenis.
 *
 * Fast, responsive scroll physics:
 * - duration: 0.6s (was 1.2s) — snappier feel
 * - lerp: 0.15 (was 0.1) — more responsive to wheel input
 * - Mobile touch: native scroll (no smoothing overhead)
 * - Respects prefers-reduced-motion.
 *
 * @returns {{ current: import('lenis').default | null }} Ref to the Lenis instance.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const lenis = new Lenis({
      duration: 0.6,              // Faster scroll duration (was 1.2)
      easing: (t) => 1 - Math.pow(1 - t, 3), // Ease-out cubic — quick settle
      smoothWheel: !prefersReducedMotion,
      smoothTouch: false,         // Native touch scroll on mobile — fastest
      lerp: isMobile ? 0.2 : 0.15, // Higher lerp = faster response
      wheelMultiplier: 0.8,       // Slightly reduce wheel intensity
      touchMultiplier: 1,         // Native touch
      normalizeWheel: true,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
