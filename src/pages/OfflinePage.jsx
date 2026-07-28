import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { WifiOff, Home, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

/**
 * Offline fallback page.
 *
 * Served when the user has no network connection.
 * Provides a clear status and recovery actions.
 */
export default function OfflinePage() {
  return (
    <>
      <SEO title="You're Offline" path="/offline" noIndex />
      <main className="flex min-h-[100svh] items-center justify-center bg-surface-root">
        <Container size="small">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
            className="flex flex-col items-center text-center"
          >
            <div className="bg-warning-500/10 border-warning-500/20 flex h-20 w-20 items-center justify-center rounded-3xl border">
              <WifiOff className="text-warning-400 h-10 w-10" aria-hidden="true" />
            </div>
            <h1 className="mt-6 font-sans text-3xl font-bold tracking-[-0.02em] text-neutral-100">
              You&rsquo;re Offline
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
              It looks like your internet connection has been lost.
              Check your connection and try again.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button onClick={() => window.location.reload()} size="md">
                <RefreshCw className="h-4 w-4" /> Try Again
              </Button>
              <Button as={Link} to="/" variant="secondary" size="md">
                <Home className="h-4 w-4" /> Home
              </Button>
            </div>
          </motion.div>
        </Container>
      </main>
    </>
  );
}
