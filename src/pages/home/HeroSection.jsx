import { lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield } from 'lucide-react';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { HERO } from '@/data/home';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

// Lazy-load Three.js globe — never blocks initial render
const GlobeBackground = lazy(() => import('@/components/GlobeBackground'));

/**
 * Apple-Style Premium Hero.
 *
 * Clean light background, ultra-subtle 3D globe behind the heading,
 * crisp typography with precise color grading, generous whitespace.
 * Enterprise security brand positioning — Fortune 500 ready.
 */
export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Background ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 45%, #FFFFFF 100%)`,
        }}
        aria-hidden="true"
      />

      {/* ── 3D Globe Layer ──────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      >
        {/* Soft radial glow behind globe */}
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: 'min(1100px, 100vw)',
            height: 'min(1100px, 100vw)',
            background: 'radial-gradient(circle, rgba(10,132,255,0.10) 0%, rgba(58,190,255,0.05) 30%, rgba(10,132,255,0.02) 55%, transparent 70%)',
          }}
        />

        {/* Globe canvas */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            width: 'clamp(340px, 88vw, 820px)',
            height: 'clamp(340px, 88vw, 820px)',
            maxWidth: '100vw',
            maxHeight: '100vh',
          }}
        >
          <Suspense fallback={null}>
            <GlobeBackground />
          </Suspense>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <Container size="small" className="relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Bahrain Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-black/[0.02] px-4 py-1.5">
              <Shield className="h-3.5 w-3.5 text-[#0A84FF]" aria-hidden="true" />
              <span className="font-sans text-[0.6875rem] font-medium tracking-[0.15em] text-neutral-500 uppercase">
                {HERO.badge}
              </span>
            </span>
          </motion.div>

          {/* H1 — Crisp Apple-style typography */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: APPLE_EASE }}
            className="mt-10 sm:mt-12 max-w-5xl font-sans font-black tracking-[-0.04em] leading-[0.9] antialiased"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 7rem)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            <span style={{ color: '#0A84FF' }}>
              {HERO.heading.line1}
            </span>
            <br />
            <span style={{ color: '#111111' }}>
              SECURITY
            </span>
            <br />
            <span style={{ color: '#111111' }}>
              SERVICES W.L.L.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: APPLE_EASE }}
            className="mt-8 sm:mt-10 max-w-2xl font-sans text-base sm:text-lg leading-relaxed text-neutral-500 antialiased"
            style={{ WebkitFontSmoothing: 'antialiased' }}
          >
            {HERO.subheading}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: APPLE_EASE }}
            className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <Button as={Link} to={HERO.cta.primary.href} size="lg">
              {HERO.cta.primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button as={Link} to={HERO.cta.secondary.href} variant="secondary" size="lg">
              {HERO.cta.secondary.label}
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* ── Scroll Indicator ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-neutral-300" />
      </motion.div>
    </section>
  );
}
