import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { INDUSTRIES } from '@/data/home';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

/**
 * Industries grid — colorful responsive grid of 8 sectors.
 *
 * Each card has a unique accent color, gradient background,
 * and vibrant hover effects.
 */

const INDUSTRY_COLORS = [
  { from: '#3B82F6', to: '#1D4ED8', glow: 'rgba(59,130,246,0.3)' },
  { from: '#6366F1', to: '#4338CA', glow: 'rgba(99,102,241,0.3)' },
  { from: '#10B981', to: '#047857', glow: 'rgba(16,185,129,0.3)' },
  { from: '#F59E0B', to: '#B45309', glow: 'rgba(245,158,11,0.3)' },
  { from: '#06B6D4', to: '#0E7490', glow: 'rgba(6,182,212,0.3)' },
  { from: '#8B5CF6', to: '#6D28D9', glow: 'rgba(139,92,246,0.3)' },
  { from: '#F43F5E', to: '#BE123C', glow: 'rgba(244,63,94,0.3)' },
  { from: '#0EA5E9', to: '#0369A1', glow: 'rgba(14,165,233,0.3)' },
];

export function IndustriesGrid() {
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
          <span className="text-accent-400 mb-3 inline-block font-mono text-xs font-medium tracking-[0.2em] uppercase">Sectors</span>
          <h2 className="text-gradient font-sans text-3xl font-bold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            {INDUSTRIES.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-500 sm:text-lg">
            {INDUSTRIES.subheading}
          </p>
        </motion.div>

        {/* ── Grid ───────────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.items.map((item, index) => {
            const color = INDUSTRY_COLORS[index];
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: APPLE_EASE }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] p-6 transition-all duration-400 sm:p-8"
                style={{
                  background: `linear-gradient(160deg, ${color.from}12, ${color.to}06)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${color.from}50`;
                  e.currentTarget.style.boxShadow = `0 0 32px ${color.glow}, 0 6px 20px rgba(0,0,0,0.3)`;
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
                {/* Glow orb */}
                <div
                  className="absolute -top-4 -right-4 h-12 w-12 rounded-full opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100"
                  style={{ background: color.from }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-400 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${color.from}25, ${color.to}12)`,
                    borderColor: `${color.from}30`,
                    boxShadow: `0 0 20px ${color.glow}`,
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: color.from }} aria-hidden="true" />
                </div>

                {/* Label */}
                <p className="relative z-10 mt-4 text-center text-sm font-semibold text-neutral-200 transition-colors duration-300 group-hover:text-white">
                  {item.label}
                </p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${color.from}, transparent)` }}
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
