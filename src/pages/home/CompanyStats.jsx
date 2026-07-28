import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/Container';
import { STATISTICS } from '@/data/home';

/**
 * Smooth count-up animation using requestAnimationFrame.
 */
function useAnimatedCount(target, shouldAnimate) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || startedRef.current) { return; }
    startedRef.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplay(target);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); }
    };
  }, [target, shouldAnimate]);

  return display;
}

function StatItem({ stat, animate }) {
  const count = useAnimatedCount(stat.value, animate);

  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-sans text-5xl font-bold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
        <span className="text-gradient">
          {animate ? count.toLocaleString() : '0'}
        </span>
        <span className="text-accent-400">{stat.suffix}</span>
      </p>
      <p className="mt-2 font-mono text-xs font-medium tracking-wider text-neutral-500 uppercase">
        {stat.label}
      </p>
    </div>
  );
}

export function CompanyStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="border-theme-muted bg-surface-raised/20 border-y py-20 lg:py-28">
      <Container ref={ref}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATISTICS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <StatItem stat={stat} animate={inView} />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
