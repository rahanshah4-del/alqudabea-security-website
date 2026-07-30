/**
 * Home page content — Alqudabea Security Services W.L.L.
 *
 * All copy and structured data for the 8 home page sections.
 * Separated from components for future i18n and CMS integration.
 */

import {
  Shield,
  Building2,
  Camera,
  Lock,
  Server,
  Globe,
  Hospital,
  Building,
  Home,
  ShoppingBag,
  GraduationCap,
  Users,
  Star,
  Award,
  Clock,
  HeadphonesIcon,
  Eye,
  Gauge,
} from 'lucide-react';

// ── Hero ─────────────────────────────────────────────────

export const HERO = {
  badge: 'Kingdom of Bahrain',
  heading: {
    line1: 'ALQUDABEA',
    line2: 'SECURITY SERVICES W.L.L.',
  },
  subheading:
    "Protecting what matters most. Bahrain's premier corporate security provider — safeguarding government institutions, commercial enterprises, and VIP clients with uncompromising excellence.",
  cta: {
    primary: { label: 'Request a Quote', href: '/quote' },
    secondary: { label: 'Explore Services', href: '/services' },
  },
};

// ── Trust Bar ───────────────────────────────────────────

export const TRUST_BAR = [
  {
    label: 'Registered in the Kingdom of Bahrain',
    sublabel: 'Commercial Registration',
  },
  {
    label: 'VAT Registered Company',
    sublabel: 'Ministry of Finance',
  },
  {
    label: 'Professional Security Services',
    sublabel: 'Licensed & Certified',
  },
  {
    label: 'Corporate & Government Clients',
    sublabel: 'Trusted Across Bahrain',
  },
];

// ── Services Overview ───────────────────────────────────

export const SERVICES = {
  heading: 'Our Services',
  subheading:
    "Comprehensive security solutions tailored to the unique needs of Bahrain's corporate and government landscape.",
  items: [
    {
      icon: Shield,
      title: 'Manned Guarding',
      description:
        'Highly trained, licensed security personnel for corporate offices, government buildings, and private facilities.',
      href: '/services',
    },
    {
      icon: Camera,
      title: 'CCTV & Surveillance',
      description:
        'Advanced monitoring systems with Nexora AI-powered detection, remote access, and 24/7 surveillance operations.',
      href: '/services',
    },
    {
      icon: Lock,
      title: 'Access Control',
      description:
        'Biometric and card-based entry systems with real-time monitoring and comprehensive audit trails.',
      href: '/services',
    },
    {
      icon: Server,
      title: 'Cybersecurity',
      description:
        'Enterprise-grade digital protection including network security, threat detection, and incident response.',
      href: '/services',
    },
    {
      icon: Eye,
      title: 'Risk Assessment',
      description:
        'Comprehensive security audits and vulnerability assessments for existing and planned facilities.',
      href: '/services',
    },
    {
      icon: HeadphonesIcon,
      title: 'Alarm Monitoring',
      description:
        '24/7 central monitoring station with rapid response protocols for intrusion, fire, and emergency alarms.',
      href: '/services',
    },
  ],
};

// ── About Preview ───────────────────────────────────────

export const ABOUT = {
  heading: "Bahrain's Trusted Security Partner",
  paragraphs: [
    "Alqudabea Security Services W.L.L. is a licensed, insured, and highly reputable security services provider committed to delivering peace of mind through exceptional security solutions. Registered under CR No. 176298-1 with the Ministry of Industry and Commerce, Bahrain.",
    "With a team of highly trained professionals, cutting-edge technology, and an unwavering dedication to safety, we protect lives, property, and assets across diverse sectors — from government buildings to residential communities and corporate offices.",
  ],
  stats: [
    { value: 'CR 176298-1', label: 'Active Registration' },
    { value: '7', label: 'Core Services' },
    { value: '24/7', label: 'Operations' },
  ],
  cta: { label: 'Learn About Us', href: '/about' },
};

// ── Why Choose Us ───────────────────────────────────────

export const WHY_CHOOSE_US = {
  heading: 'Why Alqudabea',
  subheading: "Six reasons why Bahrain's leading organisations trust us with their security.",
  items: [
    {
      icon: Award,
      title: 'Licensed & Certified',
      description:
        'Fully licensed by the Ministry of Interior, Bahrain. All personnel hold valid security licenses and undergo continuous professional development.',
    },
    {
      icon: Users,
      title: 'Bahraini Leadership',
      description:
        'Bahraini-owned and managed. We understand the local culture, regulations, and business environment — essential for effective security in the Kingdom.',
    },
    {
      icon: Gauge,
      title: 'Rapid Response',
      description:
        'Our 24/7 operations centre ensures response times under 15 minutes anywhere in Manama. Critical incidents receive immediate escalation.',
    },
    {
      icon: Star,
      title: 'Premium Standards',
      description:
        'We serve a selective client base. Every contract receives executive-level attention and bespoke security planning — never a one-size-fits-all approach.',
    },
    {
      icon: Building2,
      title: 'Infrastructure Ready',
      description:
        'CCTV monitoring centres, armed response vehicles, and secure communications infrastructure already deployed across Bahrain.',
    },
    {
      icon: Clock,
      title: 'Proven Track Record',
      description:
        'Zero security breaches across all active client sites. Our reputation is built on consistent, reliable protection delivered year after year.',
    },
  ],
};

// ── Company Statistics ──────────────────────────────────

export const STATISTICS = [
  { value: 500, suffix: '+', label: 'Security Personnel', prefix: '' },
  { value: 100, suffix: '+', label: 'Active Client Sites', prefix: '' },
  { value: 15, suffix: '', label: 'Years of Excellence', prefix: '' },
  { value: 24, suffix: '/7', label: 'Operations Centre', prefix: '' },
];

// ── Industries ──────────────────────────────────────────

export const INDUSTRIES = {
  heading: 'Industries We Serve',
  subheading: "Specialised security solutions for every sector of Bahrain's economy.",
  items: [
    { icon: Building, label: 'Government Buildings' },
    { icon: Building2, label: 'Corporate Offices & Financial Institutions' },
    { icon: Home, label: 'Residential Communities' },
    { icon: ShoppingBag, label: 'Shopping Centres' },
    { icon: Hospital, label: 'Healthcare Facilities' },
    { icon: Globe, label: 'Hotels & Hospitality' },
    { icon: GraduationCap, label: 'Educational Institutions' },
    { icon: Shield, label: 'Industrial Sites & Warehouses' },
  ],
};

// ── CTA ─────────────────────────────────────────────────

export const CTA = {
  heading: 'Protect Your Organisation',
  subheading:
    'Speak with our security consultants about a tailored solution for your property, facility, or organisation in Bahrain.',
  buttons: {
    primary: { label: 'Request a Quote', href: '/quote' },
    secondary: { label: 'Call Us', href: 'tel:+97377907878' },
  },
  contact: {
    phone: '+973 7790 7878',
    email: 'info@alqudabeasecurity.online',
  },
};

// ── SEO ─────────────────────────────────────────────────

export const HOME_SEO = {
  title: 'Alqudabea Security Services W.L.L. — Premium Security Solutions in Bahrain',
  description:
    "Bahrain's premier security provider. Licensed by the Ministry of Interior. Manned guarding, CCTV surveillance, access control, cybersecurity, and risk assessment for corporate, government, and VIP clients.",
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Alqudabea Security Services W.L.L.',
    description:
      'Premium security services provider based in the Kingdom of Bahrain, offering manned guarding, CCTV surveillance, access control, cybersecurity, and risk assessment.',
    url: 'http://localhost:5180',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Manama',
      addressCountry: 'BH',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      telephone: '+973-0000-0000',
    },
  },
};
