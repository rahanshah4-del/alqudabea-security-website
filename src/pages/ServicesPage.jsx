import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Shield,
  Headphones,
  Clock,
  Award,
  Sparkles,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { SERVICES } from '@/data/services';
import { SITE_URL } from '@/config/seo';
import { breadcrumbSchema } from '@/config/seo';
import { cn } from '@/utils/cn';
import {
  sectionHeaderReveal,
  cardReveal,
  scaleReveal,
  staggerContainer,
  APPLE_EASE,
} from '@/hooks/useScrollReveal';

// ── SEO ───────────────────────────────────────────────────

const PAGE_TITLE = 'Professional Security Services in Bahrain';
const PAGE_DESCRIPTION =
  'ALQUDABEA SECURITY SERVICES W.L.L. offers comprehensive security solutions across Bahrain — static guards, mobile patrols, event security, VIP protection, CCTV monitoring, access control, and more. GTS Licensed, 24/7 operations.';
const SERVICE_SCHEMA = {
  '@context': 'https://schema.org', '@type': 'ItemList',
  name: 'Security Services — ALQUDABEA SECURITY SERVICES W.L.L.',
  description: PAGE_DESCRIPTION, numberOfItems: SERVICES.length,
  itemListElement: SERVICES.map((service, i) => ({
    '@type': 'ListItem', position: i + 1,
    item: { '@type': 'Service', name: service.title, description: service.description,
      provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'Bahrain' },
    },
  })),
};
const BREADCRUMB = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]);

// ── Color palette per service ─────────────────────────────

const SERVICE_COLORS = [
  { from: '#3B82F6', to: '#1D4ED8', glow: 'rgba(59,130,246,0.3)', bg: 'from-blue-500/15 to-blue-600/5' },
  { from: '#6366F1', to: '#4338CA', glow: 'rgba(99,102,241,0.3)', bg: 'from-indigo-500/15 to-indigo-600/5' },
  { from: '#8B5CF6', to: '#6D28D9', glow: 'rgba(139,92,246,0.3)', bg: 'from-violet-500/15 to-violet-600/5' },
  { from: '#F59E0B', to: '#B45309', glow: 'rgba(245,158,11,0.3)', bg: 'from-amber-500/15 to-amber-600/5' },
  { from: '#06B6D4', to: '#0E7490', glow: 'rgba(6,182,212,0.3)', bg: 'from-cyan-500/15 to-cyan-600/5' },
  { from: '#10B981', to: '#047857', glow: 'rgba(16,185,129,0.3)', bg: 'from-emerald-500/15 to-emerald-600/5' },
  { from: '#0EA5E9', to: '#0369A1', glow: 'rgba(14,165,233,0.3)', bg: 'from-sky-500/15 to-sky-600/5' },
  { from: '#F97316', to: '#C2410C', glow: 'rgba(249,115,22,0.3)', bg: 'from-orange-500/15 to-orange-600/5' },
  { from: '#3B82F6', to: '#1E40AF', glow: 'rgba(59,130,246,0.3)', bg: 'from-blue-500/15 to-blue-600/5' },
  { from: '#22C55E', to: '#15803D', glow: 'rgba(34,197,94,0.3)', bg: 'from-green-500/15 to-green-600/5' },
];

// ── Trust Bar ─────────────────────────────────────────────

const TRUST_ITEMS = [
  { icon: Shield, label: 'GTS Licensed', value: 'Ministry of Interior Approved' },
  { icon: Clock, label: '24/7 Operations', value: 'Round-the-clock coverage' },
  { icon: Award, label: 'ISO Certified', value: 'International quality standards' },
  { icon: Headphones, label: 'Dedicated Support', value: 'Account manager per client' },
];

// ── Hero ──────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="from-accent-500/[0.07] via-cyan-500/[0.04] to-surface-root absolute inset-0 bg-gradient-to-br" />
        <div className="to-surface-root absolute top-0 left-1/2 h-[700px] w-[900px] -translate-x-1/2 bg-gradient-to-b from-accent-500/[0.06] via-accent-500/[0.03] to-transparent blur-3xl" />
        <div className="to-surface-root absolute bottom-0 left-0 h-[400px] w-[600px] bg-gradient-to-t from-cyan-500/[0.04] to-transparent blur-3xl" />
      </div>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: APPLE_EASE }} className="mx-auto max-w-3xl text-center">
          <span className="text-accent-400 mb-4 inline-block font-mono text-xs font-medium tracking-[0.2em] uppercase" aria-hidden="true">Our Services</span>
          <h1 className="font-sans text-4xl font-bold tracking-[-0.02em] lg:text-6xl">
            <span className="text-gradient">ALQUDABEA SECURITY SERVICES W.L.L.</span>{' '}
            <span className="mt-3 block text-balance bg-gradient-to-r from-neutral-300 to-neutral-500 bg-clip-text text-transparent lg:mt-4">Professional Security Services in Bahrain</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 lg:text-lg">
            From manned guarding to intelligent surveillance, we deliver comprehensive security solutions trusted by government, commercial, and private clients across the Kingdom of Bahrain.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button as={Link} to="/contact" size="lg">Request a Consultation <ArrowRight className="h-4 w-4" /></Button>
            <Button as="a" href="#services-list" variant="ghost" size="lg">Explore Services <ChevronDown className="h-4 w-4" /></Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Trust Bar ─────────────────────────────────────────────

function TrustBar() {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <section ref={ref} className="border-theme-muted border-y py-8 lg:py-10">
      <Container>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 text-center">
              <item.icon className="text-accent-400 h-5 w-5" aria-hidden="true" />
              <span className="font-mono text-[10px] font-medium tracking-wider text-neutral-500 uppercase">{item.label}</span>
              <span className="text-sm font-medium text-neutral-300">{item.value}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Modern Colorful Service Grid Cards ────────────────────

function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} id="services-list" className="py-20 lg:py-28">
      <Container>
        <motion.div variants={sectionHeaderReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">What We Offer</span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">Comprehensive Security Solutions</h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-neutral-500">
            Every service is delivered by trained professionals, supported by our 24/7 command center, and backed by international standards.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SERVICES.map((service, i) => {
            const color = SERVICE_COLORS[i];
            const Icon = service.icon;
            return (
              <motion.div key={service.id} variants={cardReveal} custom={i}>
                <a
                  href={`#${service.id}`}
                  className="group relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.06] p-6 transition-all duration-400"
                  style={{
                    background: `linear-gradient(160deg, ${color.from}10, ${color.to}05)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color.from  }60`;
                    e.currentTarget.style.boxShadow = `0 0 40px ${color.glow}, 0 8px 24px rgba(0,0,0,0.3)`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.background = `linear-gradient(160deg, ${color.from}20, ${color.to}10)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.background = `linear-gradient(160deg, ${color.from}10, ${color.to}05)`;
                  }}
                >
                  {/* Glow orb behind icon */}
                  <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full opacity-0 blur-2xl transition-opacity duration-400 group-hover:opacity-100" style={{ background: color.from }} />

                  {/* Icon container */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-400" style={{ background: `linear-gradient(135deg, ${color.from}20, ${color.to}10)`, borderColor: `${color.from  }30` }}>
                    <Icon className="h-7 w-7 transition-all duration-400 group-hover:scale-110" style={{ color: color.from }} aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 text-center font-sans text-sm font-bold text-neutral-200 transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="relative z-10 text-center text-xs leading-relaxed text-neutral-500 transition-colors duration-300 group-hover:text-neutral-400">
                    {service.subtitle}
                  </p>

                  {/* Accent line */}
                  <div className="mt-auto h-0.5 w-12 rounded-full transition-all duration-400 group-hover:w-20" style={{ background: `linear-gradient(90deg, ${color.from}, transparent)` }} />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Detailed Service Sections ─────────────────────────────

function ServiceSection({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;
  const Icon = service.icon;
  const color = SERVICE_COLORS[index];

  return (
    <section ref={ref} id={service.id} className={cn('py-16 lg:py-24', !isEven && 'bg-surface-muted/40')}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.1 }}
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
        >
          {/* Content */}
          <div className={cn(!isEven && 'lg:order-2')}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300" style={{ background: `linear-gradient(135deg, ${color.from}25, ${color.to}10)`, borderColor: `${color.from  }40`, boxShadow: `0 0 20px ${color.glow}` }}>
                <Icon className="h-7 w-7" style={{ color: color.from }} aria-hidden="true" />
              </div>
              <span className="font-mono text-xs font-medium tracking-wider text-neutral-600 uppercase">Service {String(index + 1).padStart(2, '0')}</span>
            </div>

            <h3 className="font-sans text-2xl font-bold tracking-tight text-neutral-100 lg:text-3xl">{service.title}</h3>
            <p className="mt-2 text-lg font-semibold" style={{ color: color.from }}>{service.subtitle}</p>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-neutral-400">{service.description}</p>

            {/* Colorful Benefits */}
            <ul className="mt-6 space-y-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 rounded-xl border border-white/[0.04] p-3 transition-all duration-300 hover:border-white/[0.08]" style={{ background: `linear-gradient(90deg, ${color.from}08, transparent)` }}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: color.from }} aria-hidden="true" />
                  <span className="text-sm text-neutral-300">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button as={Link} to="/contact" size="md" style={{ background: `linear-gradient(135deg, ${color.from}, ${color.to})`, borderColor: 'transparent' }}>
                {service.cta} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Visual Card */}
          <motion.div variants={scaleReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={cn('relative overflow-hidden rounded-3xl border p-8 flex items-center justify-center h-72 lg:h-96', !isEven && 'lg:order-1')} style={{ background: `linear-gradient(160deg, ${color.from}10, ${color.to}05)`, borderColor: `${color.from  }20` }}>
            <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${color.from}15, transparent 70%)` }} aria-hidden="true" />
            <div className="relative flex h-36 w-36 items-center justify-center rounded-3xl border" style={{ background: `linear-gradient(135deg, ${color.from}20, ${color.to}10)`, borderColor: `${color.from  }30`, boxShadow: `0 0 50px ${color.glow}` }}>
              <Icon className="h-18 w-18" style={{ color: color.from, width: '70px', height: '70px' }} aria-hidden="true" />
            </div>
            <div className="absolute top-6 right-6 flex gap-2" aria-hidden="true">
              <span className="block h-2 w-2 rounded-full" style={{ background: color.from, opacity: 0.6 }} />
              <span className="block h-2 w-2 rounded-full" style={{ background: color.from, opacity: 0.3 }} />
              <span className="block h-2 w-2 rounded-full" style={{ background: color.from, opacity: 0.15 }} />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────

function CTASection() {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="py-20 lg:py-28">
      <Container size="small">
        <motion.div variants={scaleReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="relative overflow-hidden rounded-3xl border border-white/[0.06] p-10 text-center lg:p-16" style={{ background: 'linear-gradient(160deg, rgba(59,130,246,0.08), rgba(139,92,246,0.05), rgba(6,182,212,0.03))' }}>
          <div className="pointer-events-none absolute top-0 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: 'rgba(59,130,246,0.08)' }} aria-hidden="true" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              <span className="font-mono text-[0.6875rem] font-medium tracking-[0.15em] text-neutral-400 uppercase">Get Started</span>
            </span>
            <h2 className="mt-6 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">Ready to secure what matters most?</h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-neutral-400">Contact our team today for a complimentary security consultation. We&rsquo;ll assess your requirements and design a tailored security plan — no obligation.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button as={Link} to="/contact" size="lg">Request a Consultation <ArrowRight className="h-4 w-4" /></Button>
              <Button as="a" href="tel:+97377907878" variant="secondary" size="lg">Call Us Now</Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESCRIPTION} path="/services" schema={[BREADCRUMB, SERVICE_SCHEMA]} />
      <main>
        <HeroSection />
        <TrustBar />
        <ServicesGrid />
        {SERVICES.map((service, index) => (
          <ServiceSection key={service.id} service={service} index={index} />
        ))}
        <CTASection />
      </main>
    </>
  );
}
