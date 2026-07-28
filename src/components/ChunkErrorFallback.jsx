import { Link } from 'react-router';
import { RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';

/**
 * Fallback shown when a lazy-loaded chunk fails to load.
 *
 * Common causes: network interruption during navigation,
 * stale cached chunks after deployment, CDN issues.
 *
 * Users can retry (most likely fix: reload → fresh fetch)
 * or go home.
 */
export function ChunkErrorFallback({ onRetry }) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-surface-root">
      <Container size="small">
        <div className="flex flex-col items-center text-center">
          <div className="bg-warning-500/10 border-warning-500/20 flex h-16 w-16 items-center justify-center rounded-2xl border">
            <RefreshCw className="text-warning-400 h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="mt-6 font-sans text-2xl font-semibold text-neutral-100">
            Connection Interrupted
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
            The page couldn&rsquo;t load completely. This usually happens when your
            connection is unstable or after a site update.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button onClick={handleRetry} size="md">
              <RefreshCw className="h-4 w-4" /> Reload Page
            </Button>
            <Button as={Link} to="/" variant="secondary" size="md">
              <Home className="h-4 w-4" /> Go Home
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
