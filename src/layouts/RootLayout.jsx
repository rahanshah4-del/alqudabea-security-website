import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '@/layouts/Navbar';
import { Footer } from '@/layouts/Footer';
import { AIChatLauncher } from '@/components/AIChatLauncher';
import { ScrollToTop } from '@/components/ScrollToTop';

/**
 * Root layout wrapping all public routes.
 *
 * Composes Navbar, animated main content with page transitions,
 * and Footer. Includes a skip-to-content link as the first focusable
 * element for keyboard and screen reader users.
 */
export function RootLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip-to-content — first focusable element */}
      <a
        href="#main-content"
        className="focus:bg-accent-500 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-6 focus:z-[100] focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>

      <ScrollToTop />
      <Navbar />

      <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <AIChatLauncher />
    </div>
  );
}
