import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Scrolls the window to the top on every route change.
 *
 * Uses instant scroll (no animation) to prevent visual jank,
 * since page transitions are handled by framer-motion.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
