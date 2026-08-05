import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { SERVICES } from '@/data/home';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

/**
 * Premium colorful services overview grid.
 *
 * Six cards in a responsive 3-column grid. Each card has a unique
 * accent color, gradient background, glow orb, hover lift, and
 * vibrant icon container.
 */

const CARD_COLORS = [
  { from: '#D4AF37', to: '#8B7200', glow: 'rgba(212,175,55,0.35)', name: 'Gold' },
  { from: '#06B6D4', to: '#0E7490', glow: 'rgba(6,182,212,0.35)', name: 'Cyan' },
  { from: '#10B981', to: '#047857', glow: 'rgba(16,185,129,0.35)', name: 'Emerald' },
  { from: '#8B5CF6', to: '#6D28D9', glow: 'rgba(139,92,246,0.35)', name: 'Violet' },
  { from: '#F59E0B', to: '#B45309', glow: 'rgba(245,158,11,0.35)', name: 'Amber' },
  { from: '#F43F5E', to: '#BE123C', glow: 'rgba(244,63,94,0.35)', name: 'Rose' },
];

export function ServicesOverview() {
  return (
    <Section spacing="large">
      <Container>
        {/* ── Header ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: APPLE_EASE }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-accent-400 mb-3 inline-block font-mono text-xs font-medium tracking-[0.2em] uppercase">What We Offer</span>
          <h2 className="font-sans text-3xl font-semibold tracking-[-0.02em] text-neutral-100 sm:text-4xl lg:text-5xl">
            <span className="text-gradient">{SERVICES.heading}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-500 sm:text-lg">
            {SERVICES.subheading}
          </p>
        </motion.div>

        {/* ── Grid ───────────────────────────────────── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.items.map((service, index) => {
            const color = CARD_COLORS[index];
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: APPLE_EASE }}
              >
                <Link
                  to={service.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] p-7 transition-all duration-400 lg:p-8"
                  style={{
                    background: `linear-gradient(160deg, ${color.from}12, ${color.to}06)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color.from}50`;
                    e.currentTarget.style.boxShadow = `0 0 40px ${color.glow}, 0 12px 32px rgba(0,0,0,0.35)`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.background = `linear-gradient(160deg, ${color.from}20, ${color.to}10)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.background = `linear-gradient(160deg, ${color.from}12, ${color.to}06)`;
                  }}
                >
                  {/* Top glow orb */}
                  <div
                    className="absolute -top-8 -right-8 h-20 w-20 rounded-full opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100"
                    style={{ background: color.from }}
                    aria-hidden="true"
                  />

                  {/* Icon container */}
                  <div
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-400 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${color.from}25, ${color.to}12)`,
                      borderColor: `${color.from}35`,
                      boxShadow: `0 0 24px ${color.glow}`,
                    }}
                  >
                    <Icon className="h-6 w-6" style={{ color: color.from }} aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 mt-6 font-sans text-lg font-bold tracking-[-0.01em] text-neutral-100 transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 mt-2 flex-1 text-sm leading-relaxed text-neutral-500 transition-colors duration-300 group-hover:text-neutral-400">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <span
                    className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5 group-hover:text-white"
                    style={{ color: color.from }}
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${color.from}, transparent)` }}
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
