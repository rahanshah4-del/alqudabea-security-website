import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Shield, Users, Award, Camera } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { APPLE_EASE } from '@/hooks/useScrollReveal';
import { breadcrumbSchema } from '@/config/seo';

/**
 * GalleryPage — Floating modern gallery of security guard imagery.
 *
 * Features a staggered masonry-style grid with glass-morphism cards,
 * floating hover animations, and a lightbox modal for full-size viewing.
 * Images sourced from Unsplash — replace with real team photos.
 */

// ── Gallery Images ──────────────────────────────────────────
const GALLERY_IMAGES = [
  {
    id: 1,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUkATQRmsjwmxDN3jo4_8wZEpns05EQV76qN6ipDdvQ&s=400',
    alt: 'Security guard on patrol duty',
    title: 'On Patrol',
    category: 'Operations',
    span: 'tall',
  },
  {
    id: 2,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQYWQYFi60sUCvQVKdOCzM_QuJSD0fsb3SH-JVoTLMFQ&s=400',
    alt: 'Corporate security guard in professional uniform',
    title: 'Corporate Security',
    category: 'Commercial',
    span: 'wide',
  },
  {
    id: 3,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5RZ7D_IhJzFnKBmas7p6Mfn0x79AfGXmptSsh0gC4jVWV8PzNSTxRtk&s=400',
    alt: 'Security team briefing session',
    title: 'Team Briefing',
    category: 'Training',
    span: 'default',
  },
  {
    id: 4,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo84KWiOFV7Uh_FxNNXIv6u6clJZ9LD3eulxw0ueIRSGi3pht-a13Sk7Ac&s=400',
    alt: 'CCTV monitoring operations center',
    title: 'Command Center',
    category: 'Technology',
    span: 'default',
  },
  {
    id: 5,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzx3BA9sqXi5oKnsEM6MbpujrJXCuxxH3BP6u8fbnHw&s=400',
    alt: 'Mobile patrol vehicle ready for deployment',
    title: 'Mobile Patrol',
    category: 'Operations',
    span: 'wide',
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/31594272/pexels-photo-31594272/free-photo-of-security-guard-at-modern-entrance-booth-outdoors.jpeg?w=600',
    alt: 'Security guard at entrance checkpoint',
    title: 'Access Point',
    category: 'Commercial',
    span: 'tall',
  },
  {
    id: 7,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiZ-VePOxOjE-BE8YqrNuZLkmhTZbFOXZKtCBcXsDBbA&s=400',
    alt: 'Professional female security officer',
    title: 'VIP Protection',
    category: 'Executive',
    span: 'default',
  },
  {
    id: 8,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvQl5eS65e_0p04objiiCroDzQGAXvts1_0bZ3pNs1Bg&s=400',
    alt: 'Security vehicle fleet',
    title: 'Fleet Operations',
    category: 'Operations',
    span: 'wide',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
    alt: 'Security training exercise',
    title: 'Training Drill',
    category: 'Training',
    span: 'tall',
  },
  {
    id: 10,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbbbkzyKcTuXKvLcX_X4Avz8p6FHiQ9_mpc57NQ038GySnCSnK3uYPEGI&s=400',
    alt: 'Event security coordination',
    title: 'Event Security',
    category: 'Events',
    span: 'default',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600&q=80',
    alt: 'Security supervisor monitoring screens',
    title: 'Surveillance',
    category: 'Technology',
    span: 'default',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
    alt: 'Night patrol security operation',
    title: 'Night Watch',
    category: 'Operations',
    span: 'wide',
  },
];

// ── Category filter colors ─────────────────────────────────
const CATEGORY_COLORS = {
  'Operations': { from: '#D4AF37', to: '#8B7200' },
  'Commercial': { from: '#10B981', to: '#047857' },
  'Training': { from: '#8B5CF6', to: '#6D28D9' },
  'Technology': { from: '#06B6D4', to: '#0E7490' },
  'Executive': { from: '#F59E0B', to: '#B45309' },
  'Events': { from: '#F43F5E', to: '#BE123C' },
};

const CATEGORIES = ['All', ...new Set(GALLERY_IMAGES.map((img) => img.category))];

// ── Stats bar data ─────────────────────────────────────────
const STATS = [
  { icon: Users, value: '500+', label: 'Security Personnel' },
  { icon: Shield, value: '100+', label: 'Active Sites' },
  { icon: Camera, value: '24/7', label: 'Monitoring' },
  { icon: Award, value: '0', label: 'Security Breaches' },
];

// ── SEO ────────────────────────────────────────────────────
const PAGE_TITLE = 'Gallery — ALQUDABEA Security Services W.L.L.';
const PAGE_DESC =
  'Explore our security operations gallery. See our trained guards, mobile patrol units, command centers, and security teams in action across Bahrain.';
const BREADCRUMB = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Gallery', url: '/gallery' },
]);

// ── Span map for grid layout ───────────────────────────────
function getSpanClass(span) {
  switch (span) {
    case 'tall':
      return 'row-span-2';
    case 'wide':
      return 'col-span-1 sm:col-span-2';
    default:
      return '';
  }
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null); // image object or null

  const filtered =
    activeCategory === 'All'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESC} breadcrumb={BREADCRUMB} />

      {/* ── Hero ───────────────────────────────────────── */}
      <Section spacing="small" className="relative overflow-hidden">
        {/* Background ambient glow */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-[0.12] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent 70%)' }}
          aria-hidden="true"
        />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
            className="relative z-10 text-center"
          >
            <span className="text-accent-400 mb-4 inline-block font-mono text-xs font-medium tracking-[0.2em] uppercase">
              Our Team in Action
            </span>
            <h1 className="font-sans text-4xl font-bold tracking-[-0.03em] text-neutral-100 sm:text-5xl lg:text-6xl">
              Security{' '}
              <span className="text-gradient">Gallery</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg">
              A visual showcase of our trained security personnel, advanced monitoring
              infrastructure, and operational excellence across the Kingdom of Bahrain.
            </p>
          </motion.div>

          {/* ── Stats bar ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: APPLE_EASE }}
            className="relative z-10 mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-5 backdrop-blur-sm transition-all duration-400 hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  <Icon className="h-5 w-5 text-accent-400" aria-hidden="true" />
                  <span className="font-sans text-2xl font-bold text-neutral-100">{stat.value}</span>
                  <span className="text-xs text-neutral-500">{stat.label}</span>
                </div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* ── Category Filter ────────────────────────────── */}
      <Section spacing="small" className="!pt-0">
        <Container>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const colors = CATEGORY_COLORS[cat];
              return (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300"
                  style={
                    isActive && colors
                      ? {
                          background: `linear-gradient(135deg, ${colors.from}20, ${colors.to}15)`,
                          borderColor: `${colors.from}50`,
                          color: colors.from,
                          borderWidth: 1,
                          borderStyle: 'solid',
                        }
                      : {
                          background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
                          borderColor: isActive ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)',
                          color: isActive ? '#60A5FA' : '#9CA3AF',
                          borderWidth: 1,
                          borderStyle: 'solid',
                        }
                  }
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 rounded-xl border border-white/[0.1]"
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                      aria-hidden="true"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* ── Floating Masonry Grid ──────────────────── */}
          <motion.div
            layout
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[200px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -12 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: APPLE_EASE,
                  }}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] ${getSpanClass(image.span)}`}
                  onClick={() => setLightbox(image)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.boxShadow =
                      '0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.zIndex = '10';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.zIndex = '';
                  }}
                  style={{ transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  {/* Image */}
                  <div className="absolute inset-0 bg-surface-raised">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-all duration-600 group-hover:scale-110 group-hover:brightness-110"
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-400 group-hover:opacity-90"
                    style={{
                      background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Content overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 p-5">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.15em] uppercase text-accent-400">
                      {image.category}
                    </span>
                    <h3 className="font-sans text-base font-bold text-white">{image.title}</h3>
                  </div>

                  {/* Zoom icon on hover */}
                  <div className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-black/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <ZoomIn className="h-4 w-4 text-white" aria-hidden="true" />
                  </div>

                  {/* Floating glow orb on hover */}
                  <div
                    className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-40"
                    style={{
                      background:
                        CATEGORY_COLORS[image.category]?.from || '#D4AF37',
                    }}
                    aria-hidden="true"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 py-20 text-center"
            >
              <Camera className="h-10 w-10 text-neutral-600" aria-hidden="true" />
              <p className="text-sm text-neutral-500">No images in this category yet.</p>
            </motion.div>
          )}
        </Container>
      </Section>

      {/* ── Lightbox Modal ─────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: APPLE_EASE }}
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-h-[85vh] w-auto object-contain rounded-2xl"
              />

              {/* Caption bar */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 rounded-b-2xl bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 py-5">
                <div>
                  <span className="font-mono text-[10px] font-semibold tracking-[0.15em] uppercase text-accent-400">
                    {lightbox.category}
                  </span>
                  <h3 className="font-sans text-xl font-bold text-white">{lightbox.title}</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
