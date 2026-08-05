import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

/**
 * GuardSlider — Premium auto-playing security guard showcase.
 *
 * Background slider for the hero section. Features:
 *  - Fade + subtle Ken Burns zoom transitions
 *  - Auto-play every 4s with infinite loop
 *  - Prev/Next arrows + dot navigation
 *  - Pause on hover / focus
 *  - Touch swipe (mobile)
 *  - Keyboard accessible (ArrowLeft/Right)
 *  - All images preloaded before first transition
 *  - Dark gradient overlay for text readability
 */

const SLIDES = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=1400&q=80',
    alt: 'Professional security guard in uniform on patrol at modern building',
    label: 'Security Patrol',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/flagged/photo-1570343271132-8949dd284a04?w=1400&q=80',
    alt: 'Professional security guard with arms crossed at commercial building',
    label: 'Professional Guarding',
  },
  {
    id: 3,
    src: 'https://plus.unsplash.com/premium_photo-1748853983673-6e48199324fe?w=1400&q=80',
    alt: 'Female security guard at corporate reception desk',
    label: 'Reception Security',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1571283056653-e9802feac258?w=1400&q=80',
    alt: 'Security guard in uniform standing at building entrance',
    label: 'On-Site Security',
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/12304330/pexels-photo-12304330.jpeg?w=1400&q=80',
    alt: 'Professional security team conducting briefing at corporate office',
    label: 'Elite Team',
  },
];

const AUTOPLAY_INTERVAL = 4000;
const SWIPE_THRESHOLD = 60;

export function GuardSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const loadedRef = useRef({});
  const autoPlayRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const containerRef = useRef(null);

  const total = SLIDES.length;

  // ── Preload ALL images on mount ────────────────────────
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;

    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
      img.onload = () => {
        if (cancelled) return;
        loadedRef.current[slide.id] = true;
        loadedCount++;
        // Mark ready when ALL images are loaded
        if (loadedCount >= total) {
          setImagesReady(true);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedRef.current[slide.id] = true; // mark as loaded anyway to avoid blocking
        loadedCount++;
        if (loadedCount >= total) {
          setImagesReady(true);
        }
      };
    });

    return () => { cancelled = true; };
  }, [total]);

  // ── Navigation helpers ──────────────────────────────
  const goTo = useCallback((index) => {
    setCurrent(((index % total) + total) % total);
  }, [total]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // ── Auto-play — starts only after images are ready ────
  useEffect(() => {
    if (!imagesReady || isPaused) return;
    autoPlayRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(autoPlayRef.current);
  }, [imagesReady, isPaused, goNext]);

  // Pause when window loses focus
  useEffect(() => {
    const onBlur = () => setIsPaused(true);
    const onFocus = () => setIsPaused(false);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  // ── Keyboard navigation ────────────────────────────
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') { goPrev(); }
      else if (e.key === 'ArrowRight') { goNext(); }
    };
    const el = containerRef.current;
    if (el) {
      el.addEventListener('keydown', onKeyDown);
      return () => el.removeEventListener('keydown', onKeyDown);
    }
  }, [goNext, goPrev]);

  // ── Touch swipe ─────────────────────────────────────
  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx > 0) { goPrev(); } else { goNext(); }
    }
  }, [goNext, goPrev]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-black"
      role="region"
      aria-roledescription="carousel"
      aria-label="Security guard showcase slider"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Slides ───────────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={SLIDES[current].id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.8, ease: APPLE_EASE },
            scale: { duration: 5.0, ease: 'linear' },
          }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <img
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            className="h-full w-full object-cover"
            decoding="async"
          />

          {/* Accessibility caption */}
          <span className="sr-only">{SLIDES[current].label}</span>
        </motion.div>
      </AnimatePresence>

      {/* ── Dark gradient overlay ─────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg,
              rgba(0,0,0,0.55) 0%,
              rgba(0,0,0,0.25) 40%,
              rgba(0,0,0,0.45) 70%,
              rgba(0,0,0,0.7) 100%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* ── Prev / Next arrows ────────────────────────── */}
      <button
        type="button"
        onClick={goPrev}
        className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/25 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 md:left-6 lg:left-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={goNext}
        className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/25 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 md:right-6 lg:right-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* ── Dot navigation ────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5"
        role="tablist"
        aria-label="Slide navigation"
      >
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={index === current}
            aria-label={`Go to slide ${index + 1}: ${slide.label}`}
            onClick={() => goTo(index)}
            className="transition-all duration-400 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
            style={{
              width: index === current ? 28 : 8,
              height: 8,
              background: index === current
                ? '#D4AF37'
                : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>

      {/* ── Pause/Play toggle ─────────────────────────── */}
      <button
        type="button"
        onClick={() => setIsPaused((p) => !p)}
        className="absolute top-4 right-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:text-white md:top-6 md:right-6"
        aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
      >
        {isPaused ? (
          <Play className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Pause className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>

      {/* ── Slide counter ──────────────────────────────── */}
      <div
        className="absolute bottom-8 right-4 z-30 hidden font-mono text-xs tracking-wider text-white/50 md:block md:right-6 lg:right-10"
        aria-hidden="true"
      >
        <span className="text-white/80">{(current + 1).toString().padStart(2, '0')}</span>
        <span className="mx-1">/</span>
        <span>{total.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
}
