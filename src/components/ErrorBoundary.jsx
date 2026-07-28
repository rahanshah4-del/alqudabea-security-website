import { Component } from 'react';
import { Link } from 'react-router';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';

/**
 * Enterprise error boundary.
 *
 * Catches unhandled React errors in the component tree.
 * Displays a premium fallback UI with recovery actions:
 * retry, go home, or contact support.
 *
 * Chunk loading errors (failed lazy imports) are handled
 * separately via the Suspense fallback in App.jsx.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    // Log to analytics if available
    if (import.meta.env.PROD && window.gtag) {
      window.gtag('event', 'exception', {
        description: error?.message || 'Unknown error',
        fatal: true,
      });
    }

    console.error('[ErrorBoundary]', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ error: null, errorInfo: null });
  };

  render() {
    if (this.state.error) {
      return (
        <main className="flex min-h-[100svh] items-center justify-center bg-surface-root">
          <Container size="small">
            <div className="flex flex-col items-center text-center">
              <div className="bg-danger-500/10 border-danger-500/20 flex h-16 w-16 items-center justify-center rounded-2xl border">
                <AlertTriangle className="text-danger-400 h-8 w-8" aria-hidden="true" />
              </div>
              <h1 className="mt-6 font-sans text-2xl font-semibold text-neutral-100">
                Something went wrong
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
                An unexpected error occurred. Please try again, or return to the home page.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button onClick={this.handleRetry} size="md">
                  <RefreshCw className="h-4 w-4" /> Try Again
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

    return this.props.children;
  }
}
