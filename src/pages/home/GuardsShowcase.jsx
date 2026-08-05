import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Star, Zap, Eye } from 'lucide-react';
import { Container } from '@/components/Container';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

/**
 * GuardsShowcase — Floating guard portrait cards above Services.
 *
 * Four guard profiles in a balanced 2×2 grid with continuous gentle
 * floating animations, glass-morphism overlays, and premium badge accents.
 * Images from Unsplash — replace with real team photos.
 */

const GUARDS = [
  {
    id: 1,
    name: 'Chief Security Officer',
    badge: 'Command',
    icon: Star,
    src: 'https://images.pexels.com/photos/35562107/pexels-photo-35562107.png?cs=srgb&dl=pexels-shootsaga-35562107.jpg&fm=jpg&w=500',
    alt: 'Senior security commander in tactical uniform',
    color: { from: '#F59E0B', to: '#B45309', glow: 'rgba(245,158,11,0.4)' },
    floatDuration: 4.2,
    floatDelay: 0,
    yOffset: -16,
  },
  {
    id: 2,
    name: 'Tactical Response Unit',
    badge: 'Elite',
    icon: Zap,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAx9cmYECTTRSybe08mHZ_kJhTMOUM1C6m7dXTE694c85i-gFSYD0Qo1Ka&s=400',
    alt: 'Armed tactical response officer on duty',
    color: { from: '#D4AF37', to: '#8B7200', glow: 'rgba(212,175,55,0.4)' },
    floatDuration: 3.8,
    floatDelay: 0.5,
    yOffset: -22,
  },
  {
    id: 3,
    name: 'Head of Operations',
    badge: 'Lead',
    icon: Shield,
    src: 'https://static.vecteezy.com/system/resources/previews/017/658/699/large_2x/security-guard-protection-photo.jpg',
    alt: 'Professional security operations manager',
    color: { from: '#10B981', to: '#047857', glow: 'rgba(16,185,129,0.4)' },
    floatDuration: 4.6,
    floatDelay: 1.0,
    yOffset: -18,
  },
  {
    id: 4,
    name: 'Surveillance Specialist',
    badge: 'Tech',
    icon: Eye,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVeX3S3sTKwKh0fWGptHRPbcuOrVqFf7kehgrVQ5UkHvqmrz9Egz6qFmad&s=400',
    alt: 'Surveillance and monitoring specialist',
    color: { from: '#8B5CF6', to: '#6D28D9', glow: 'rgba(139,92,246,0.4)' },
    floatDuration: 4.0,
    floatDelay: 1.5,
    yOffset: -24,
  },
];

/**
 * Continuous floating keyframe — gentle up/down bob.
 */
function floatKeyframes(yOffset) {
  return `
    @keyframes float-${Math.abs(yOffset)} {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(${yOffset}px); }
    }
  `;
}

export function GuardsShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden py-20 lg:py-32" ref={ref}>
      {/* ── Ambient background glow ─────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 30%, rgba(139,92,246,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 80% 30%, rgba(6,182,212,0.04) 0%, transparent 60%)
          `,
        }}
      />

      <Container>
        {/* ── Header ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: APPLE_EASE }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-accent-400 mb-3 inline-block font-mono text-xs font-medium tracking-[0.2em] uppercase">
            Our Elite Team
          </span>
          <h2 className="font-sans text-3xl font-semibold tracking-[-0.02em] text-neutral-100 sm:text-4xl lg:text-5xl">
            Trained{' '}
            <span className="text-gradient">Professionals</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-500 sm:text-lg">
            Every officer is rigorously vetted, GTS-licensed, and trained to the highest
            standards. Your safety is in expert hands.
          </p>
        </motion.div>

        {/* ── Floating Guard Cards — 4 in a row ────────── */}
        <div className="flex flex-wrap items-end justify-center gap-5 sm:gap-6 lg:gap-8">
          {GUARDS.map((guard, index) => {
            const Icon = guard.icon;

            return (
              <motion.div
                key={guard.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.12,
                  ease: APPLE_EASE,
                }}
                className="group relative flex-shrink-0"
                style={{
                  width: 'clamp(150px, 20vw, 240px)',
                  animation: inView
                    ? `float-${Math.abs(guard.yOffset)} ${guard.floatDuration}s ease-in-out ${guard.floatDelay}s infinite`
                    : 'none',
                }}
              >
                {/* Float keyframes injected once */}
                {index === 0 && (
                  <style>
                    {GUARDS.map((g) => floatKeyframes(g.yOffset)).join('\n')}
                  </style>
                )}

                {/* ── Card Container ─────────────────────── */}
                <div
                  className="relative overflow-hidden rounded-3xl border border-white/[0.08] transition-all duration-500 group-hover:border-white/[0.2]"
                  style={{
                    aspectRatio: '3/4',
                    background: `linear-gradient(180deg, ${guard.color.from}15 0%, ${guard.color.to}05 100%)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 32px 64px rgba(0,0,0,0.5), 0 0 80px ${guard.color.glow}`;
                    e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
                    e.currentTarget.style.zIndex = '20';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.zIndex = '';
                  }}
                >
                  {/* ── Guard Image ──────────────────────── */}
                  <img
                    src={guard.src}
                    alt={guard.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-all duration-600 group-hover:scale-105 group-hover:brightness-110"
                  />

                  {/* ── Gradient Overlay ─────────────────── */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg,
                        transparent 30%,
                        ${guard.color.from}08 60%,
                        ${guard.color.to}40 90%,
                        rgba(0,0,0,0.85) 100%
                      )`,
                    }}
                    aria-hidden="true"
                  />

                  {/* ── Badge Chip ────────────────────────── */}
                  <div
                    className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md transition-all duration-300 group-hover:scale-105"
                    style={{
                      borderColor: `${guard.color.from}40`,
                      background: `${guard.color.from}18`,
                      color: guard.color.from,
                    }}
                  >
                    <Icon className="h-3 w-3" aria-hidden="true" />
                    {guard.badge}
                  </div>

                  {/* ── Name Label ────────────────────────── */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                    <p className="font-sans text-sm font-bold leading-tight text-white transition-all duration-300 group-hover:text-lg">
                      {guard.name}
                    </p>
                    <div
                      className="mt-2 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                      style={{ background: `linear-gradient(90deg, ${guard.color.from}, transparent)` }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* ── Hover Glow Orb ────────────────────── */}
                  <div
                    className="pointer-events-none absolute -bottom-12 -right-12 h-28 w-28 rounded-full opacity-0 blur-2xl transition-all duration-600 group-hover:opacity-60"
                    style={{ background: guard.color.from }}
                    aria-hidden="true"
                  />
                </div>

                {/* ── Reflection shadow ──────────────────── */}
                <div
                  className="mx-auto mt-3 h-2 rounded-full blur-md transition-all duration-500 group-hover:h-3 group-hover:blur-lg"
                  style={{
                    width: '70%',
                    background: guard.color.glow,
                    opacity: 0.35,
                  }}
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
