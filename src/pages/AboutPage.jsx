import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { SITE_URL, breadcrumbSchema, ORGANIZATION_SCHEMA } from '@/config/seo';
import { cn } from '@/utils/cn';
import {
  COMPANY_STORY,
  MISSION_VISION,
  CORE_VALUES,
  TIMELINE,
  WHY_CHOOSE_US,
  TRAINING_COMPLIANCE,
  TECHNOLOGY,
  LEADERSHIP,
  COMPANY_STATS,
  ABOUT_CTA,
} from '@/data/about';
import { sectionHeaderReveal, cardReveal, scaleReveal, staggerContainer, APPLE_EASE } from '@/hooks/useScrollReveal';

// ── SEO ───────────────────────────────────────────────────

const PAGE_TITLE = 'About ALQUDABEA — Bahrain\'s Trusted Security Partner';
const PAGE_DESC =
  'Learn about ALQUDABEA SECURITY SERVICES W.L.L. — a Bahrain-registered security company with 15+ years of excellence. Licensed by the Ministry of Interior. 500+ personnel, 100+ client sites, zero breaches.';
const BREADCRUMB = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
]);
const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: PAGE_TITLE,
  description: PAGE_DESC,
  about: { '@id': `${SITE_URL}/#organization` },
};

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
          <span className="text-accent-400 mb-4 inline-block font-mono text-xs font-medium tracking-[0.2em] uppercase" aria-hidden="true">
            {COMPANY_STORY.badge}
          </span>
          <h1 className="font-sans text-4xl font-bold tracking-[-0.02em] lg:text-6xl">
            <span className="text-gradient">
              About ALQUDABEA
            </span>
            <span className="mt-3 block text-balance text-2xl bg-gradient-to-r from-neutral-300 to-neutral-500 bg-clip-text text-transparent lg:mt-4 lg:text-4xl">
              {COMPANY_STORY.heading}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 lg:text-lg">
            A Bahrain-registered, Ministry-licensed security company with over 15 years of experience, 500+ trained personnel, and a spotless security record across 100+ active client sites.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button as={Link} to="/contact" size="lg">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href="#story" variant="ghost" size="lg">
              Our Story <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Stats Bar ─────────────────────────────────────────────

function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section ref={ref} className="border-border-muted border-y py-8 lg:py-10">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6"
        >
          {COMPANY_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5 text-center">
              <stat.icon className="text-accent-400 h-5 w-5" aria-hidden="true" />
              <span className="font-sans text-xl font-bold text-neutral-100 lg:text-2xl">
                {stat.prefix}{stat.value}{stat.suffix}
              </span>
              <span className="font-mono text-[10px] font-medium tracking-wider text-neutral-500 uppercase">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Story ─────────────────────────────────────────────────

function StorySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} id="story" className="py-20 lg:py-28">
      <Container size="small">
        <motion.div
          variants={sectionHeaderReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">Our Story</span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">Who We Are</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: APPLE_EASE }}
          className="mx-auto mt-12 max-w-3xl space-y-5"
        >
          {COMPANY_STORY.paragraphs.map((p) => (
            <p key={p.slice(0, 20)} className="text-pretty text-base leading-relaxed text-neutral-400 lg:text-lg">
              {p}
            </p>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Mission & Vision ──────────────────────────────────────

function MissionVisionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-surface-muted/40 py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: APPLE_EASE }}
          className="grid gap-10 lg:grid-cols-2"
        >
          {/* Mission */}
          <div className="border-border-muted bg-surface-root/60 rounded-3xl border p-8 lg:p-10">
            <div className="bg-accent-500/10 border-accent-500/20 mb-5 flex h-12 w-12 items-center justify-center rounded-xl border">
              <MISSION_VISION.mission.icon className="text-accent-400 h-6 w-6" aria-hidden="true" />
            </div>
            <span className="font-mono text-xs font-medium tracking-wider text-neutral-600 uppercase">{MISSION_VISION.mission.label}</span>
            <h3 className="mt-3 font-sans text-2xl font-semibold text-neutral-100">{MISSION_VISION.mission.title}</h3>
            <p className="mt-4 text-pretty text-base leading-relaxed text-neutral-400">{MISSION_VISION.mission.description}</p>
          </div>
          {/* Vision */}
          <div className="border-border-muted bg-surface-root/60 rounded-3xl border p-8 lg:p-10">
            <div className="bg-cyan-500/10 border-cyan-500/20 mb-5 flex h-12 w-12 items-center justify-center rounded-xl border">
              <MISSION_VISION.vision.icon className="text-cyan-400 h-6 w-6" aria-hidden="true" />
            </div>
            <span className="font-mono text-xs font-medium tracking-wider text-neutral-600 uppercase">{MISSION_VISION.vision.label}</span>
            <h3 className="mt-3 font-sans text-2xl font-semibold text-neutral-100">{MISSION_VISION.vision.title}</h3>
            <p className="mt-4 text-pretty text-base leading-relaxed text-neutral-400">{MISSION_VISION.vision.description}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Core Values ───────────────────────────────────────────

function CoreValuesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <Container>
        <motion.div variants={sectionHeaderReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">Principles</span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">{CORE_VALUES.heading}</h2>
          <p className="mt-4 text-pretty text-base text-neutral-500">{CORE_VALUES.subheading}</p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CORE_VALUES.items.map((v, i) => (
            <motion.div
              key={v.title}
              variants={cardReveal}
              custom={i}
              className="border-border-muted bg-surface-root/50 hover:border-accent-500/20 rounded-2xl border p-6 transition-colors duration-300"
            >
              <div className="bg-surface-raised border-border-muted mb-4 flex h-10 w-10 items-center justify-center rounded-lg border">
                <v.icon className="text-accent-400 h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-sans text-lg font-semibold text-neutral-100">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{v.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Timeline Event ────────────────────────────────────────

function TimelineEvent({ event, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05, ease: APPLE_EASE }}
      className={cn('relative pl-16 lg:w-1/2 lg:pl-0', isLeft ? 'lg:pr-12 lg:text-right' : 'lg:ml-auto lg:pl-12')}
    >
      <div
        className="bg-accent-500 border-surface-root absolute top-1.5 left-3.5 h-5 w-5 rounded-full border-4 lg:top-1.5"
        style={{
          right: isLeft ? undefined : 'auto',
          left: isLeft ? undefined : 0,
          transform: isLeft ? 'translateX(50%)' : 'translateX(-50%)',
        }}
        aria-hidden="true"
      />
      <span className="text-accent-400 font-mono text-sm font-bold">{event.year}</span>
      <h3 className="mt-1 font-sans text-lg font-semibold text-neutral-100">{event.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-400">{event.description}</p>
    </motion.div>
  );
}

// ── Timeline Section ──────────────────────────────────────

function TimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-surface-muted/40 py-20 lg:py-28">
      <Container size="small">
        <motion.div variants={sectionHeaderReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">History</span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">{TIMELINE.heading}</h2>
          <p className="mt-4 text-pretty text-base text-neutral-500">{TIMELINE.subheading}</p>
        </motion.div>
        <div className="relative">
          {/* Vertical line */}
          <div className="bg-border-muted absolute top-0 bottom-0 left-6 w-px lg:left-1/2 lg:-translate-x-px" aria-hidden="true" />
          <div className="space-y-12">
            {TIMELINE.events.map((event, i) => (
              <TimelineEvent key={event.year} event={event} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Why Choose Us ─────────────────────────────────────────

function WhyChooseUsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <Container>
        <motion.div variants={sectionHeaderReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">Differentiators</span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">{WHY_CHOOSE_US.heading}</h2>
          <p className="mt-4 text-pretty text-base text-neutral-500">{WHY_CHOOSE_US.subheading}</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.items.map((item, i) => (
            <motion.div key={item.title} variants={cardReveal} custom={i} className="border-border-muted bg-surface-root/50 rounded-2xl border p-6 transition-colors duration-300 hover:border-accent-500/20">
              <div className="bg-surface-raised border-border-muted mb-4 flex h-10 w-10 items-center justify-center rounded-lg border">
                <item.icon className="text-accent-400 h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-sans text-lg font-semibold text-neutral-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Training & Compliance ────────────────────────────────

function TrainingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <Container>
        <motion.div variants={sectionHeaderReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">Training</span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">{TRAINING_COMPLIANCE.heading}</h2>
          <p className="mt-4 text-pretty text-base text-neutral-500">{TRAINING_COMPLIANCE.subheading}</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRAINING_COMPLIANCE.items.map((item, i) => (
            <motion.div key={item.title} variants={cardReveal} custom={i} className="card-premium group flex flex-col items-center gap-3 p-6 text-center">
              <div className="card-icon-container bg-accent-500/10 border-accent-500/15 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300">
                <item.icon className="text-accent-400 h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-sans text-sm font-semibold text-neutral-200">{item.title}</h3>
              <p className="text-xs leading-relaxed text-neutral-500">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="glass mt-10 rounded-2xl p-6 text-center text-sm text-neutral-400">
          {TRAINING_COMPLIANCE.description}
        </motion.p>
      </Container>
    </section>
  );
}

// ── Technology Integration ────────────────────────────────

function TechnologySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-surface-muted/40 py-20 lg:py-28">
      <Container>
        <motion.div variants={sectionHeaderReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">Innovation</span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">{TECHNOLOGY.heading}</h2>
          <p className="mt-4 text-pretty text-base text-neutral-500">{TECHNOLOGY.subheading}</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNOLOGY.items.map((item, i) => (
            <motion.div key={item.title} variants={cardReveal} custom={i} className="card-premium group flex flex-col items-center gap-3 p-6 text-center">
              <div className="card-icon-container bg-accent-500/10 border-accent-500/15 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300">
                <item.icon className="text-accent-400 h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-sans text-sm font-semibold text-neutral-200">{item.title}</h3>
              <p className="text-xs leading-relaxed text-neutral-500">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Leadership ────────────────────────────────────────────

function LeadershipSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-surface-muted/40 py-20 lg:py-28">
      <Container>
        <motion.div variants={sectionHeaderReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">People</span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">{LEADERSHIP.heading}</h2>
          <p className="mt-4 text-pretty text-base text-neutral-500">{LEADERSHIP.subheading}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: APPLE_EASE }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {LEADERSHIP.members.map((member) => (
            <div key={member.role} className="border-border-muted bg-surface-root/60 rounded-3xl border p-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-500/20 to-cyan-500/20">
                <span className="font-sans text-xl font-bold text-accent-400">{member.initials}</span>
              </div>
              <h3 className="mt-5 font-sans text-lg font-semibold text-neutral-100">{member.role}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{member.bio}</p>
            </div>
          ))}
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
            <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">{ABOUT_CTA.badge}</span>
            <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">{ABOUT_CTA.heading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-neutral-400">{ABOUT_CTA.subheading}</p>
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

export default function AboutPage() {
  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESC} path="/about" schema={[BREADCRUMB, ABOUT_SCHEMA, ORGANIZATION_SCHEMA]} />
      <main>
        <HeroSection />
        <StatsBar />
        <StorySection />
        <MissionVisionSection />
        <CoreValuesSection />
        <TimelineSection />
        <WhyChooseUsSection />
        <TrainingSection />
        <TechnologySection />
        <LeadershipSection />
        <CTASection />
      </main>
    </>
  );
}
