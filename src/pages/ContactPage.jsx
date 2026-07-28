import { useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Copy,
  Check,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { SITE_URL, breadcrumbSchema, LOCAL_BUSINESS_SCHEMA } from '@/config/seo';
import { SOCIAL } from '@/config/site';
import { cn } from '@/utils/cn';
import { useContactForm, SERVICE_OPTIONS } from '@/hooks/useContactForm';
import { sectionHeaderReveal, scaleReveal, APPLE_EASE } from '@/hooks/useScrollReveal';

// ── SEO ───────────────────────────────────────────────────

const PAGE_TITLE = 'Contact ALQUDABEA — Get in Touch with Our Security Team';
const PAGE_DESC =
  'Contact ALQUDABEA SECURITY SERVICES W.L.L. in Manama, Bahrain. Request a security consultation, get a quote, or speak with our team. Phone, email, WhatsApp, and online form.';
const BREADCRUMB = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Contact', url: '/contact' },
]);
const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: PAGE_TITLE,
  description: PAGE_DESC,
  about: { '@id': `${SITE_URL}/#localbusiness` },
};

// ── Company Info ──────────────────────────────────────────

const CONTACT_INFO = {
  address: {
    line1: 'Office 22, Building 2552, Road 1275',
    line2: 'Block 912, Riffa/Al Gharbi, Bahrain',
  },
  phone: '+973 7790 7878',
  email: 'info@alqudabeass.com',
  hours: [
    { days: 'Sunday — Thursday', time: '08:00 — 17:00' },
    { days: 'Operations Centre', time: '24/7' },
  ],
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
          <span className="text-accent-400 mb-4 inline-block font-mono text-xs font-medium tracking-[0.2em] uppercase" aria-hidden="true">Contact Us</span>
          <h1 className="font-sans text-4xl font-bold tracking-[-0.02em] lg:text-6xl">
            <span className="text-gradient">
              Get in Touch
            </span>
            <span className="mt-3 block text-balance text-2xl bg-gradient-to-r from-neutral-300 to-neutral-500 bg-clip-text text-transparent lg:mt-4 lg:text-4xl">
              Let&rsquo;s discuss your security needs
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 lg:text-lg">
            Whether you need a quote for manned guarding, a security assessment for your facility, or simply want to learn more — our team is ready to help.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Contact Cards + Map ───────────────────────────────────

function ContactCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [copied, setCopied] = useState(null);

  const copyToClipboard = useCallback(async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback for older browsers — select the text
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  }, []);

  const cards = [
    {
      icon: MapPin,
      label: 'Office Address',
      lines: [CONTACT_INFO.address.line1, CONTACT_INFO.address.line2],
      action: { href: '#map', label: 'View on Map' },
    },
    {
      icon: Phone,
      label: 'Phone',
      lines: [CONTACT_INFO.phone],
      actions: [
        { href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`, label: 'Call Now', icon: Phone },
        { onClick: () => copyToClipboard(CONTACT_INFO.phone, 'phone'), label: copied === 'phone' ? 'Copied!' : 'Copy', icon: copied === 'phone' ? Check : Copy },
      ],
    },
    {
      icon: Mail,
      label: 'Email',
      lines: [CONTACT_INFO.email],
      actions: [
        { href: `mailto:${CONTACT_INFO.email}`, label: 'Send Email', icon: Mail },
        { onClick: () => copyToClipboard(CONTACT_INFO.email, 'email'), label: copied === 'email' ? 'Copied!' : 'Copy', icon: copied === 'email' ? Check : Copy },
      ],
    },
    {
      icon: Clock,
      label: 'Business Hours',
      lines: CONTACT_INFO.hours.map((h) => `${h.days}: ${h.time}`),
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: APPLE_EASE }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((card) => (
            <div key={card.label} className="border-border-muted bg-surface-root/60 hover:border-accent-500/20 rounded-2xl border p-6 transition-colors duration-300">
              <div className="bg-accent-500/10 border-accent-500/20 mb-4 flex h-10 w-10 items-center justify-center rounded-lg border">
                <card.icon className="text-accent-400 h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-sans text-sm font-semibold text-neutral-200">{card.label}</h3>
              <div className="mt-2 space-y-0.5">
                {card.lines.map((line) => (
                  <p key={line} className="text-sm text-neutral-500">{line}</p>
                ))}
              </div>
              {card.actions && (
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {card.actions.map((act) => (
                    act.onClick ? (
                      <button
                        key={act.label}
                        type="button"
                        onClick={act.onClick}
                        className="text-accent-400 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent-300"
                      >
                        <act.icon className="h-3 w-3" /> {act.label}
                      </button>
                    ) : (
                      <a
                        key={act.label}
                        href={act.href}
                        className="text-accent-400 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent-300"
                      >
                        {act.label} <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    )
                  ))}
                </div>
              )}
              {card.action && (
                <a
                  href={card.action.href}
                  className="text-accent-400 mt-3 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent-300"
                >
                  {card.action.label} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Quick CTAs ────────────────────────────────────────────

function QuickCTAs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const ctas = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/97377907878',
      variant: 'primary',
    },
    {
      icon: Phone,
      label: 'Call Now',
      href: 'tel:+97377907878',
      variant: 'secondary',
    },
    {
      icon: Mail,
      label: 'Email Us',
      href: 'mailto:info@alqudabeass.com',
      variant: 'secondary',
    },
  ];

  return (
    <section ref={ref} className="bg-surface-muted/40 border-border-muted border-y py-12 lg:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: APPLE_EASE }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {ctas.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              target={cta.label === 'WhatsApp' ? '_blank' : undefined}
              rel={cta.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
              className={cn(
                'inline-flex items-center gap-3 rounded-xl px-6 py-3.5 font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                cta.variant === 'primary'
                  ? 'bg-accent-500 text-white shadow-glow-accent hover:bg-accent-400'
                  : 'bg-surface-raised border-border-default text-neutral-200 border hover:bg-surface-overlay hover:text-neutral-100',
              )}
            >
              <cta.icon className="h-5 w-5" aria-hidden="true" />
              {cta.label}
            </a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Map Placeholder ───────────────────────────────────────

function MapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section ref={ref} id="map" className="py-20 lg:py-28">
      <Container>
        <motion.div
          variants={sectionHeaderReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">Find Us in Manama</h2>
          <p className="mt-4 text-pretty text-base text-neutral-500">
            Our headquarters are centrally located in Manama, Kingdom of Bahrain — serving clients nationwide.
          </p>
        </motion.div>
        <motion.div
          variants={scaleReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="border-border-muted bg-surface-raised/60 relative overflow-hidden rounded-3xl border"
        >
          {/* Placeholder for Google Maps embed */}
          <div className="flex h-80 items-center justify-center lg:h-96">
            <div className="text-center">
              <MapPin className="text-accent-400 mx-auto h-12 w-12" aria-hidden="true" />
              <p className="mt-4 font-sans text-lg font-semibold text-neutral-200">Manama, Kingdom of Bahrain</p>
              <p className="mt-1 text-sm text-neutral-500">
                Google Maps integration — embed your map here
              </p>
              <a
                href="https://maps.google.com/?q=Manama+Bahrain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-400 mt-3 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent-300"
              >
                Open in Google Maps <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Contact Form ──────────────────────────────────────────

function ContactFormSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { formData, status, errorMessage, fieldErrors, handleChange, handleSubmit } = useContactForm();

  const inputClasses = (field) =>
    cn(
      'w-full rounded-xl border bg-surface-root/60 px-4 py-3 text-sm text-neutral-100',
      'placeholder:text-neutral-600',
      'focus:border-accent-500 focus:ring-accent-500/20 focus:ring-2 focus:outline-none',
      'transition-colors duration-200',
      fieldErrors[field]
        ? 'border-danger-500/50'
        : 'border-border-default hover:border-border-muted',
    );

  return (
    <section ref={ref} id="contact-form" className="bg-surface-muted/40 py-20 lg:py-28">
      <Container size="small">
        <motion.div
          variants={sectionHeaderReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">Send a Message</span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">
            Request a Consultation
          </h2>
          <p className="mt-4 text-pretty text-base text-neutral-500">
            Fill in the form below and a member of our team will respond within one business day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: APPLE_EASE }}
          className="border-border-muted bg-surface-root/60 mx-auto max-w-2xl rounded-3xl border p-8 lg:p-10"
        >
          {/* Success State */}
          {status === 'success' ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="bg-success-500/10 border-success-500/20 flex h-16 w-16 items-center justify-center rounded-2xl border">
                <CheckCircle2 className="text-success-400 h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-sans text-2xl font-semibold text-neutral-100">Message Sent</h3>
              <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-neutral-400">
                Thank you for reaching out. A member of our team will review your enquiry and respond within one business day.
              </p>
              <Button
                as="button"
                variant="ghost"
                size="md"
                className="mt-6"
                onClick={() => {
                  handleChange('_reset', '');
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot — hidden from real users */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="_honeypot">Leave this empty</label>
                <input
                  type="text"
                  id="_honeypot"
                  name="_honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._honeypot}
                  onChange={(e) => handleChange('_honeypot', e.target.value)}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs font-medium text-neutral-400 uppercase">
                    Full Name <span className="text-danger-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={inputClasses('name')}
                    placeholder="Your full name"
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? 'err-name' : undefined}
                  />
                  {fieldErrors.name && (
                    <p id="err-name" className="mt-1 text-xs text-danger-400">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="contact-company" className="mb-1.5 block font-mono text-xs font-medium text-neutral-400 uppercase">Company</label>
                  <input
                    id="contact-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className={inputClasses('company')}
                    placeholder="Your company (optional)"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs font-medium text-neutral-400 uppercase">
                    Email <span className="text-danger-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={inputClasses('email')}
                    placeholder="you@company.com"
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                  />
                  {fieldErrors.email && (
                    <p id="err-email" className="mt-1 text-xs text-danger-400">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" className="mb-1.5 block font-mono text-xs font-medium text-neutral-400 uppercase">Phone</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={inputClasses('phone')}
                    placeholder="+973 XXXX XXXX"
                    aria-invalid={!!fieldErrors.phone}
                    aria-describedby={fieldErrors.phone ? 'err-phone' : undefined}
                  />
                  {fieldErrors.phone && (
                    <p id="err-phone" className="mt-1 text-xs text-danger-400">{fieldErrors.phone}</p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="contact-service" className="mb-1.5 block font-mono text-xs font-medium text-neutral-400 uppercase">Service Required</label>
                  <select
                    id="contact-service"
                    value={formData.service}
                    onChange={(e) => handleChange('service', e.target.value)}
                    className={cn(inputClasses('service'), 'appearance-none cursor-pointer')}
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-surface-root text-neutral-200">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs font-medium text-neutral-400 uppercase">
                    Message <span className="text-danger-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={cn(inputClasses('message'), 'resize-y min-h-[120px]')}
                    placeholder="Tell us about your security requirements..."
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? 'err-message' : undefined}
                  />
                  {fieldErrors.message && (
                    <p id="err-message" className="mt-1 text-xs text-danger-400">{fieldErrors.message}</p>
                  )}
                </div>

                {/* Consent */}
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => handleChange('consent', e.target.checked)}
                      className="border-border-default bg-surface-root checked:bg-accent-500 checked:border-accent-500 focus:ring-accent-500/20 mt-0.5 h-4 w-4 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    />
                    <span className="text-sm leading-relaxed text-neutral-400">
                      I consent to ALQUDABEA SECURITY SERVICES W.L.L. storing my information and contacting me regarding my enquiry. My data will be handled in accordance with the privacy policy.{' '}
                      <span className="text-danger-400">*</span>
                    </span>
                  </label>
                  {fieldErrors.consent && (
                    <p className="mt-1.5 ml-7 text-xs text-danger-400">{fieldErrors.consent}</p>
                  )}
                </div>
              </div>

              {/* Error Banner */}
              {status === 'error' && errorMessage && (
                <div className="border-danger-500/20 bg-danger-500/5 mt-6 flex items-start gap-3 rounded-xl border p-4">
                  <AlertCircle className="text-danger-400 mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <p className="text-sm text-danger-300">{errorMessage}</p>
                </div>
              )}

              {/* Submit */}
              <div className="mt-6">
                <Button
                  type="submit"
                  size="lg"
                  loading={status === 'loading'}
                  className="w-full"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                  {status !== 'loading' && <Send className="h-4 w-4" />}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Social Links ──────────────────────────────────────────

function SocialSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section ref={ref} className="py-16 lg:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <span className="font-mono text-xs font-medium tracking-wider text-neutral-600 uppercase">Connect With Us</span>
          <div className="flex items-center gap-6">
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 transition-colors hover:text-neutral-200"
              aria-label="ALQUDABEA on LinkedIn"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESC}
        path="/contact"
        schema={[BREADCRUMB, CONTACT_SCHEMA, LOCAL_BUSINESS_SCHEMA]}
      />
      <main>
        <HeroSection />
        <ContactCards />
        <QuickCTAs />
        <ContactFormSection />
        <MapSection />
        <SocialSection />
      </main>
    </>
  );
}
