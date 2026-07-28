import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield } from 'lucide-react';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { HERO } from '@/data/home';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

/**
 * Premium full-viewport hero.
 *
 * Apple-inspired minimalism: dark background with an animated gradient
 * orb tracked to mouse position, procedural noise grain, precise typography,
 * and exactly two CTAs. The scroll indicator invites exploration.
 */
export function HeroSection() {
  const containerRef = useRef(null);

  // ── Mouse-tracking gradient orb ──────────────────
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const orbPosition = useMotionTemplate`${springX.get() * 100}% ${springY.get() * 100}%`;

  function handleMouseMove(e) {
    if (!containerRef.current) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Background Layers ──────────────────────────── */}
      <div className="bg-surface-root pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Animated gradient orb — follows cursor subtly */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: useMotionTemplate`radial-gradient(ellipse 50% 50% at ${orbPosition}, oklch(0.55 0.18 255 / 0.18), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Secondary static glow for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.55 0.18 255 / 0.06), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Fine grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
        aria-hidden="true"
      />

      {/* ── Content ──────────────────────────────────────── */}
      <Container size="small" className="relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: APPLE_EASE }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
              <Shield className="text-accent-500 h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-mono text-[0.6875rem] font-medium tracking-[0.15em] text-neutral-400 uppercase">
                {HERO.badge}
              </span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: APPLE_EASE }}
            className="mt-8 max-w-5xl font-sans text-[2.75rem] leading-[1.08] font-bold tracking-[-0.025em] sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="text-gradient">
              {HERO.heading.line1}
            </span>
            <br />
            <span className="bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              {HERO.heading.line2}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: APPLE_EASE }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg"
          >
            {HERO.subheading}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: APPLE_EASE }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <ChevronDown className="h-6 w-6 animate-bounce text-neutral-700" />
      </motion.div>
    </section>
  );
}
