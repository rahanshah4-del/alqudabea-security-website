import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, CheckCircle2, Shield } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { breadcrumbSchema } from '@/config/seo';
import { cn } from '@/utils/cn';
import { INDUSTRIES_DATA } from '@/data/industries';
import { sectionHeaderReveal, cardReveal, scaleReveal, staggerContainer, APPLE_EASE } from '@/hooks/useScrollReveal';

// ── SEO ───────────────────────────────────────────────────

const PAGE_TITLE = 'Industries We Serve — Sector-Specific Security in Bahrain';
const PAGE_DESC =
  'ALQUDABEA provides specialised security for banking, government, commercial, residential, hotels, healthcare, industrial, construction, retail, and logistics sectors across Bahrain.';
const BREADCRUMB = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Industries', url: '/industries' },
]);

// ── Hero ──────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="from-accent-500/[0.07] via-cyan-500/[0.04] to-surface-root absolute inset-0 bg-gradient-to-br" />
        <div className="to-surface-root absolute top-0 left-1/2 h-[700px] w-[900px] -translate-x-1/2 bg-gradient-to-b from-accent-500/[0.06] via-accent-500/[0.03] to-transparent blur-3xl" />
        <div className="to-surface-root absolute bottom-0 left-0 h-[400px] w-[600px] bg-gradient-to-t from-cyan-500/[0.04] to-transparent blur-3xl" />
      </div>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-accent-400 mb-4 inline-block font-mono text-xs font-medium tracking-[0.2em] uppercase" aria-hidden="true">Industries</span>
          <h1 className="font-sans text-4xl font-bold tracking-[-0.02em] lg:text-6xl">
            <span className="text-gradient">
              Industries We Serve
            </span>
            <span className="mt-3 block text-balance text-2xl bg-gradient-to-r from-neutral-300 to-neutral-500 bg-clip-text text-transparent lg:mt-4 lg:text-4xl">
              Sector-specific security across Bahrain
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 lg:text-lg">
            Every industry faces unique security challenges. From banking regulations to construction site vulnerabilities — ALQUDABEA delivers tailored security solutions for ten key sectors across the Kingdom of Bahrain.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button as={Link} to="/contact" size="lg">
              Request a Consultation <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href="#industries-list" variant="ghost" size="lg">
              Explore Industries <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Industries Grid ───────────────────────────────────────

function IndustriesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} id="industries-list" className="py-20 lg:py-28">
      <Container>
        <motion.div variants={sectionHeaderReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">Ten Sectors, One Standard</h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-neutral-500">
            Select your industry to learn about the specific security challenges and how we address them.
          </p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {INDUSTRIES_DATA.map((industry, i) => (
            <motion.div key={industry.id} variants={cardReveal} custom={i} className="group relative">
              <a
                href={`#${industry.id}`}
                className={cn(
                  'border-border-muted bg-surface-root/50 hover:bg-surface-raised/80 hover:border-accent-500/30',
                  'flex h-full flex-col items-center gap-4 rounded-2xl border p-6 transition-all duration-300 hover:shadow-glow-accent',
                )}
              >
                <div className="bg-surface-raised border-border-muted group-hover:border-accent-500/30 flex h-14 w-14 items-center justify-center rounded-xl border transition-colors duration-300">
                  <industry.icon className="text-accent-400 h-6 w-6 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                </div>
                <h3 className="text-center font-sans text-sm font-semibold text-neutral-200 transition-colors group-hover:text-neutral-100">{industry.title}</h3>
                <p className="text-center text-xs leading-relaxed text-neutral-600 transition-colors group-hover:text-neutral-500">{industry.subtitle}</p>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Industry Detail Section ───────────────────────────────

function IndustrySection({ industry, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = industry.icon;

  return (
    <section ref={ref} id={industry.id} className={cn('py-16 lg:py-24', index % 2 === 0 ? '' : 'bg-surface-muted/40')}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.1 }}
          className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16"
        >
          {/* Left — Content */}
          <div className={cn('lg:col-span-3', index % 2 !== 0 && 'lg:col-start-3')}>
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-accent-500/10 border-accent-500/20 flex h-12 w-12 items-center justify-center rounded-xl border">
                <Icon className="text-accent-400 h-6 w-6" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs font-medium tracking-wider text-neutral-600 uppercase">Sector {String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="font-sans text-2xl font-semibold tracking-tight text-neutral-100 lg:text-3xl">{industry.title}</h3>
            <p className="text-accent-400 mt-2 text-lg font-medium">{industry.subtitle}</p>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400">{industry.description}</p>

            {/* Challenges */}
            <div className="mt-8">
              <h4 className="font-sans text-sm font-semibold tracking-wide text-danger-400 uppercase">Security Challenges</h4>
              <ul className="mt-3 space-y-2">
                {industry.challenges.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <Shield className="text-danger-400 mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="text-sm text-neutral-400">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="mt-6">
              <h4 className="font-sans text-sm font-semibold tracking-wide text-success-400 uppercase">Our Solutions</h4>
              <ul className="mt-3 space-y-2">
                {industry.solutions.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <CheckCircle2 className="text-success-400 mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="text-sm text-neutral-300">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Button as={Link} to="/contact" variant="secondary" size="md">
                {industry.cta} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right — Visual Card */}
          <motion.div
            variants={scaleReveal}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className={cn('lg:col-span-2', index % 2 !== 0 && 'lg:col-start-1 lg:row-start-1')}
          >
            <div className="border-border-muted bg-surface-root/60 relative overflow-hidden rounded-3xl border p-8 flex items-center justify-center h-72 lg:h-full lg:min-h-[400px]">
              <div className="from-accent-500/5 to-cyan-500/5 pointer-events-none absolute inset-0 bg-gradient-to-br" aria-hidden="true" />
              <div className="to-surface-root pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-accent-500/[0.08] to-transparent blur-2xl" aria-hidden="true" />
              <div className="bg-surface-raised/80 border-border-muted relative flex h-32 w-32 items-center justify-center rounded-3xl border shadow-glow-accent">
                <Icon className="text-accent-400 h-16 w-16" aria-hidden="true" />
              </div>
              <div className="absolute top-6 right-6 flex gap-1.5" aria-hidden="true">
                <span className="bg-accent-500/40 block h-1.5 w-1.5 rounded-full" />
                <span className="bg-cyan-500/40 block h-1.5 w-1.5 rounded-full" />
                <span className="bg-accent-500/20 block h-1.5 w-1.5 rounded-full" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────

function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <Container size="small">
        <motion.div
          variants={scaleReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="border-border-muted bg-surface-root/60 relative overflow-hidden rounded-3xl border p-10 text-center lg:p-16"
        >
          <div className="from-accent-500/5 via-cyan-500/3 pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent" aria-hidden="true" />
          <div className="to-surface-root pointer-events-none absolute top-0 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-accent-500/[0.08] to-transparent blur-3xl" aria-hidden="true" />
          <div className="relative">
            <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">Get Started</span>
            <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">Need security for your industry?</h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-neutral-400">
              Tell us about your sector and requirements. Our team will design a security solution tailored to your industry&rsquo;s specific challenges and regulations.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button as={Link} to="/contact" size="lg">
                Request a Consultation <ArrowRight className="h-4 w-4" />
              </Button>
              <Button as="a" href="tel:+97377907878" variant="secondary" size="lg">Call Us Now</Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────

export default function IndustriesPage() {
  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESC} path="/industries" schema={[BREADCRUMB]} />
      <main>
        <HeroSection />
        <IndustriesGrid />
        {INDUSTRIES_DATA.map((industry, i) => (
          <IndustrySection key={industry.id} industry={industry} index={i} />
        ))}
        <CTASection />
      </main>
    </>
  );
}
