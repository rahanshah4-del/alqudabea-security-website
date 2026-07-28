import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Search, Home } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

/**
 * Premium 404 page — Apple-inspired minimal design.
 */
export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" path="/404" noIndex />
      <main className="flex min-h-[100svh] items-center justify-center">
        <Container size="small">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15, ease: APPLE_EASE }}
              className="text-gradient font-sans text-[8rem] font-bold leading-none lg:text-[12rem]"
              aria-hidden="true"
            >
              404
            </motion.span>
            <h1 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">
              Page Not Found
            </h1>
            <p className="mx-auto mt-4 max-w-md text-pretty text-base text-neutral-500">
              The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
              Let us help you find what you need.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button as={Link} to="/" size="lg">
                <Home className="h-4 w-4" /> Go Home
              </Button>
              <Button as={Link} to="/search" variant="secondary" size="lg">
                <Search className="h-4 w-4" /> Search
              </Button>
            </div>
          </motion.div>
        </Container>
      </main>
    </>
  );
}
