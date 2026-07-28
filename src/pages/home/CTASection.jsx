import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { CTA } from '@/data/home';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

/**
 * Premium CTA banner.
 *
 * A glass-style card with a subtle radial glow behind the content.
 * Two clear actions — request a quote (primary) and call (secondary).
 */
export function CTASection() {
  return (
    <Section spacing="large">
      <Container size="small">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
          className="border-border-default bg-surface-raised relative overflow-hidden rounded-3xl border px-8 py-16 text-center sm:px-16 sm:py-24"
        >
          {/* Decorative glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, oklch(0.55 0.18 255 / 0.12), transparent 60%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-xl">
            <h2 className="font-sans text-3xl font-semibold tracking-[-0.02em] text-neutral-100 sm:text-4xl">
              {CTA.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-400 sm:text-lg">
              {CTA.subheading}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button as={Link} to={CTA.buttons.primary.href} size="lg">
                {CTA.buttons.primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button as="a" href={CTA.buttons.secondary.href} variant="secondary" size="lg">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {CTA.buttons.secondary.label}
              </Button>
            </div>

            {/* Contact info */}
            <p className="mt-8 text-sm text-neutral-600">
              {CTA.contact.phone} &middot; {CTA.contact.email}
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
