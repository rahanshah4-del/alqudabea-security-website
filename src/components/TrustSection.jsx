import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, Building2, Clock, Globe, CheckCircle2, Star, Users } from 'lucide-react';
import { Container } from '@/components/Container';
import { sectionHeaderReveal, staggerContainer, cardReveal, APPLE_EASE } from '@/hooks/useScrollReveal';

const TRUST_ITEMS = [
  {
    icon: Building2,
    title: 'CR No. 176298-1',
    description: 'Active commercial registration with the Ministry of Industry and Commerce, Kingdom of Bahrain.',
    accent: 'card-accent-blue',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description: 'Fully licensed security provider with comprehensive insurance coverage for all operations.',
    accent: 'card-accent-amber',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    icon: Award,
    title: 'Certified Personnel',
    description: 'Every officer trained in emergency response, first aid & CPR, conflict resolution, and surveillance.',
    accent: 'card-accent-cyan',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: CheckCircle2,
    title: 'Regulatory Compliance',
    description: 'Full compliance with all local regulations. All required certifications maintained.',
    accent: 'card-accent-green',
    iconBg: 'bg-green-500/10 border-green-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: Globe,
    title: 'Bahrain-Wide Coverage',
    description: 'Serving government, corporate, residential, healthcare, hospitality, and industrial sectors.',
    accent: 'card-accent-blue',
    iconBg: 'bg-sky-500/10 border-sky-500/20',
    iconColor: 'text-sky-400',
  },
  {
    icon: Clock,
    title: '24/7 Operations',
    description: 'Round-the-clock security with onsite supervision, mobile patrols, and continuous monitoring.',
    accent: 'card-accent-purple',
    iconBg: 'bg-violet-500/10 border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: Star,
    title: 'Technology-Driven',
    description: 'Real-time GPS tracking, Nexora AI-integrated CCTV, incident reporting software, and smart patrol systems.',
    accent: 'card-accent-amber',
    iconBg: 'bg-yellow-500/10 border-yellow-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Users,
    title: 'Trained Professionals',
    description: 'Highly trained team with continuous development in security, safety, and customer service.',
    accent: 'card-accent-rose',
    iconBg: 'bg-rose-500/10 border-rose-500/20',
    iconColor: 'text-rose-400',
  },
];

const CLIENTS = [
  { name: 'Government Ministries', emoji: '🏛️' },
  { name: 'Financial Institutions', emoji: '🏦' },
  { name: 'Luxury Hotels', emoji: '🏨' },
  { name: 'Commercial Towers', emoji: '🏢' },
  { name: 'Residential Compounds', emoji: '🏘️' },
  { name: 'Industrial Facilities', emoji: '🏭' },
  { name: 'Healthcare Centres', emoji: '🏥' },
  { name: 'Retail Destinations', emoji: '🛍️' },
];

/**
 * Premium trust-building section for enterprise credibility.
 *
 * Displays licensing, certifications, operational stats, and
 * client sector placeholders. Designed to instil confidence
 * in enterprise and government prospects.
 */
export function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <Container>
        {/* Header */}
        <motion.div
          variants={sectionHeaderReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">
            Trust &amp; Compliance
          </span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">
            Why Bahrain&rsquo;s Leading Organisations Trust Us
          </h2>
          <p className="mt-4 text-pretty text-base text-neutral-500">
            Licensed, certified, and battle-tested — our credentials speak for themselves.
          </p>
        </motion.div>

        {/* Trust Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              variants={cardReveal}
              custom={i}
              className={`card-premium group flex flex-col items-center gap-3 p-6 text-center ${item.accent}`}
            >
              <div className={`card-icon-container flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${item.iconBg}`}>
                <item.icon className={`h-6 w-6 ${item.iconColor}`} aria-hidden="true" />
              </div>
              <h3 className="font-sans text-sm font-semibold text-neutral-200">{item.title}</h3>
              <p className="text-xs leading-relaxed text-neutral-500">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Sectors */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: APPLE_EASE }}
          className="mt-16"
        >
          <p className="text-center font-mono text-xs font-medium tracking-wider text-neutral-500 uppercase">
            Trusted Across Bahrain
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CLIENTS.map((sector) => (
              <div
                key={sector.name}
                className="card-premium group flex items-center gap-4 p-5"
              >
                <span className="text-2xl transition-transform duration-300 group-hover:scale-110" role="img" aria-hidden="true">
                  {sector.emoji}
                </span>
                <span className="font-sans text-sm font-semibold text-neutral-200 transition-colors group-hover:text-accent-400">
                  {sector.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
