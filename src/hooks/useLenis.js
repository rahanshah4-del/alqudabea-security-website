import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import Lenis from 'lenis';

/**
 * Smooth scrolling via Lenis — disabled on /admin pages.
 */
export function useLenis() {
  const lenisRef = useRef(null);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: !prefersReducedMotion,
      smoothTouch: false,
      lerp: isMobile ? 0.2 : 0.15,
      wheelMultiplier: isAdmin ? 0 : 0.8,
      touchMultiplier: isAdmin ? 0 : 1,
      normalizeWheel: true,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      if (!isAdmin) { lenis.raf(time); }
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isAdmin]);

  return lenisRef;
}
