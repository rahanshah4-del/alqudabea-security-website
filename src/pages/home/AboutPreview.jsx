import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { ABOUT } from '@/data/home';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

/**
 * About preview — company introduction with premium image placeholder.
 *
 * Two-column layout: text content on the left, a subtle image placeholder
 * on the right. Statistics are presented cleanly below the copy.
 */
export function AboutPreview() {
  return (
    <Section spacing="large">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* ── Text ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
          >
            <h2 className="font-sans text-3xl font-semibold tracking-[-0.02em] text-neutral-100 sm:text-4xl">
              {ABOUT.heading}
            </h2>

            <div className="mt-6 space-y-4">
              {ABOUT.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-neutral-400 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Mini stats */}
            <div className="mt-10 flex gap-8">
              {ABOUT.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-mono text-2xl font-semibold text-neutral-100">{stat.value}</p>
                  <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button as={Link} to={ABOUT.cta.href} variant="secondary" size="md">
                {ABOUT.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>

          {/* ── Manama City Image ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: APPLE_EASE }}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl transition-shadow duration-500 hover:shadow-glow-accent lg:aspect-[3/4]"
          >
            {/* Manama Bahrain City Image */}
            <img
              src="/manama-city.webp"
              alt="Manama, Kingdom of Bahrain city skyline"
              width="720"
              height="1520"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />

            {/* Premium gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-root via-surface-root/40 to-transparent" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-transparent" aria-hidden="true" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
              <div className="glass mx-4 rounded-xl px-5 py-3 text-center backdrop-blur-md">
                <p className="font-sans text-sm font-semibold text-white">ALQUDABEA Headquarters</p>
                <p className="mt-1 font-mono text-[11px] tracking-wider text-neutral-400 uppercase">Manama, Kingdom of Bahrain</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
