import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield } from 'lucide-react';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { GuardSlider } from '@/pages/home/GuardSlider';
import { HERO } from '@/data/home';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

/**
 * Premium Hero with Guard Showcase Slider.
 *
 * Auto-playing security guard image slider as the full-bleed background.
 * Dark gradient overlay ensures crisp text readability. Gold accent
 * typography with generous whitespace. Enterprise security positioning.
 */
export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black"
      aria-labelledby="hero-heading"
    >
      {/* ── Guard Image Slider (Background) ──────────────── */}
      <GuardSlider />

      {/* ── Content ──────────────────────────────────────── */}
      <Container size="small" className="relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Bahrain Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <Shield className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span className="font-sans text-[0.6875rem] font-medium tracking-[0.15em] text-white/80 uppercase">
                {HERO.badge}
              </span>
            </span>
          </motion.div>

          {/* H1 — Premium Gold + White typography */}
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
            <span style={{ color: '#D4AF37' }}>
              {HERO.heading.line1}
            </span>
            <br />
            <span style={{ color: '#FFFFFF' }}>
              SECURITY
            </span>
            <br />
            <span style={{ color: '#FFFFFF' }}>
              SERVICES W.L.L.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: APPLE_EASE }}
            className="mt-8 sm:mt-10 max-w-2xl font-sans text-base sm:text-lg leading-relaxed text-white/70 antialiased"
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
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-white/50" />
      </motion.div>
    </section>
  );
}
