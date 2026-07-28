/**
 * About page data — Alqudabea Security Services W.L.L.
 *
 * Company story, mission, vision, values, timeline, leadership,
 * training & compliance. All content from official company documents.
 */

import {
  Shield,
  Target,
  Eye,
  Heart,
  Star,
  Users,
  Globe,
  Building2,
  CheckCircle2,
  Clock,
  Award,
  Siren,
  Crosshair,
  FireExtinguisher,
  Video,
  Handshake,
  Phone,
} from 'lucide-react';

// ── Company Story ─────────────────────────────────────────

export const COMPANY_STORY = {
  badge: 'Est. 11 July 2024',
  heading: 'Securing Bahrain with Trust &amp; Excellence',
  paragraphs: [
    'Alqudabea Security Services W.L.L. is a licensed, insured, and highly reputable security services provider committed to delivering peace of mind through exceptional security solutions. With a team of highly trained professionals, cutting-edge technology, and an unwavering dedication to safety, we aim to protect lives, property, and assets across diverse sectors.',
    'Registered under CR No. 176298-1 with the Ministry of Industry and Commerce, Kingdom of Bahrain, Alqudabea operates with full legal authorisation to provide professional security services across the Kingdom. Our active commercial registration reflects our commitment to transparency, regulatory compliance, and professional accountability.',
    'From our headquarters in Riffa/Al Gharbi, we serve government buildings, corporate offices, residential communities, industrial sites, educational institutions, healthcare facilities, and the hospitality sector — delivering tailored security solutions that meet the unique demands of each environment.',
  ],
};

// ── Mission & Vision ──────────────────────────────────────

export const MISSION_VISION = {
  mission: {
    icon: Target,
    label: 'Our Mission',
    title: 'Reliable & responsive security',
    description:
      'To provide reliable and responsive security solutions that ensure safety, reduce risk, and bring peace of mind to our clients — 24/7.',
  },
  vision: {
    icon: Eye,
    label: 'Our Vision',
    title: 'The most trusted name in security',
    description:
      'To be the most trusted name in the security industry, known for integrity, innovation, and excellence.',
  },
};

// ── Core Values ──────────────────────────────────────────

export const CORE_VALUES = {
  heading: 'Our Core Values',
  subheading: 'Five principles that guide every officer, every shift, and every client engagement.',
  items: [
    {
      icon: Shield,
      title: 'Integrity',
      description:
        'We uphold the highest ethical standards in every interaction. Honesty, transparency, and accountability are non-negotiable.',
    },
    {
      icon: Award,
      title: 'Professionalism',
      description:
        'Our personnel are trained, certified, and continuously developed to deliver security services of the highest calibre.',
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description:
        'Every client receives individualised attention. We listen, understand, and design security solutions that fit your specific needs.',
    },
    {
      icon: Crosshair,
      title: 'Vigilance',
      description:
        'Constant alertness is the foundation of effective security. Our officers are trained to observe, assess, and act decisively.',
    },
    {
      icon: Globe,
      title: 'Innovation',
      description:
        'We embrace technology — from AI-powered CCTV to GPS-tracked patrols — to deliver smarter, faster, and more effective protection.',
    },
  ],
};

// ── Timeline ──────────────────────────────────────────────

export const TIMELINE = {
  heading: 'Our Journey',
  subheading: 'Building trust through dedication, training, and technology.',
  events: [
    {
      year: '2024',
      title: 'Company Founded',
      description:
        'Alqudabea Security Services W.L.L. was established on 11 July 2024, registered under CR No. 176298-1 with the Ministry of Industry and Commerce, Bahrain.',
    },
    {
      year: '2024',
      title: 'Ministry Approval',
      description:
        'Received full licensing and regulatory authorisation to provide professional security services across the Kingdom of Bahrain.',
    },
    {
      year: '2025',
      title: 'Operational Launch',
      description:
        'Began security operations with a trained workforce, serving corporate, residential, and government clients across Bahrain.',
    },
    {
      year: '2025',
      title: 'Technology Deployment',
      description:
        'Integrated GPS-tracked mobile patrols, AI-enhanced CCTV monitoring, and digital incident reporting across all service lines.',
    },
    {
      year: '2026',
      title: 'Expanding Coverage',
      description:
        'Growing team of security professionals serving multiple sectors — government, commercial, residential, healthcare, hospitality, and industrial.',
    },
  ],
};

// ── Why Choose Us ─────────────────────────────────────────

export const WHY_CHOOSE_US = {
  heading: 'Why Choose Alqudabea',
  subheading: 'The qualities that distinguish us in Bahrain\'s security industry.',
  items: [
    {
      icon: Building2,
      title: 'Licensed & Registered',
      description:
        'CR No. 176298-1 — fully registered with the Ministry of Industry and Commerce, Bahrain. Active and compliant.',
    },
    {
      icon: Shield,
      title: 'Insured & Bonded',
      description:
        'Fully insured security operations protecting both our clients and our personnel across every deployment.',
    },
    {
      icon: Users,
      title: 'Trained Professionals',
      description:
        'Every officer undergoes rigorous training — emergency response, first aid & CPR, conflict resolution, and surveillance techniques.',
    },
    {
      icon: Clock,
      title: '24/7 Operations',
      description:
        'Round-the-clock security coverage with onsite supervision, mobile patrols, and continuous monitoring centre support.',
    },
    {
      icon: Globe,
      title: 'Technology-Driven',
      description:
        'Real-time GPS tracking, incident reporting software, remote video monitoring, and smart patrol systems.',
    },
    {
      icon: Award,
      title: 'Regulatory Compliance',
      description:
        'We comply with all local regulations and ensure our team maintains all required certifications and licences.',
    },
  ],
};

// ── Training & Compliance ─────────────────────────────────

export const TRAINING_COMPLIANCE = {
  heading: 'Training &amp; Compliance',
  subheading:
    'Our security professionals undergo comprehensive training to ensure the highest standards of service.',
  description:
    'We comply with all local regulations and ensure our team maintains all required certifications.',
  items: [
    { icon: Siren, title: 'Emergency Response', description: 'Rapid assessment and coordinated action during critical incidents.' },
    { icon: Heart, title: 'First Aid & CPR', description: 'Certified life-saving skills for medical emergencies on site.' },
    { icon: Handshake, title: 'Conflict Resolution & De-escalation', description: 'Verbal and non-verbal techniques to resolve situations peacefully.' },
    { icon: Building2, title: 'Law Enforcement Liaison', description: 'Established protocols for coordination with Bahrain authorities.' },
    { icon: Video, title: 'Surveillance Techniques', description: 'Advanced CCTV monitoring, behavioural analysis, and evidence preservation.' },
    { icon: FireExtinguisher, title: 'Fire Safety & Evacuation', description: 'Fire prevention, extinguisher operation, and emergency evacuation procedures.' },
  ],
};

// ── Technology Integration ────────────────────────────────

export const TECHNOLOGY = {
  heading: 'Technology Integration',
  subheading: 'Smart security powered by cutting-edge technology.',
  items: [
    { icon: Globe, title: 'Real-Time GPS Tracking', description: 'All patrol vehicles and mobile units tracked live for accountability and rapid dispatch.' },
    { icon: Video, title: 'Remote Video Monitoring', description: 'AI-integrated CCTV with remote access, motion detection, and instant alerts.' },
    { icon: CheckCircle2, title: 'Incident Reporting Software', description: 'Digital reports with time-stamped documentation, photos, and GPS coordinates.' },
    { icon: Award, title: 'Smart Patrol Systems', description: 'GPS-verified checkpoint scanning ensuring complete patrol coverage.' },
  ],
};

// ── Leadership Placeholder ────────────────────────────────

export const LEADERSHIP = {
  heading: 'Leadership',
  subheading:
    'Our management team brings extensive experience in security operations, training, and client service.',
  members: [
    {
      initials: 'MD',
      role: 'Managing Director',
      bio: 'Leads corporate strategy, client relationships, and overall operational direction for Alqudabea Security Services.',
    },
    {
      initials: 'DO',
      role: 'Director of Operations',
      bio: 'Oversees all manned guarding, mobile patrol, and event security deployments across Bahrain.',
    },
    {
      initials: 'TD',
      role: 'Training & Compliance Manager',
      bio: 'Ensures all personnel meet certification requirements and regulatory compliance standards.',
    },
  ],
};

// ── Statistics ────────────────────────────────────────────

export const COMPANY_STATS = [
  { value: 2024, prefix: '', suffix: '', label: 'Established', icon: Star },
  { value: 7, suffix: '', label: 'Core Services', icon: Shield },
  { value: 8, suffix: '+', label: 'Industry Sectors', icon: Building2 },
  { value: 24, suffix: '/7', label: 'Operations', icon: Clock },
  { value: 3, suffix: '', label: 'Contact Lines', icon: Phone },
  { value: 1, suffix: '', label: 'Active CR', icon: CheckCircle2 },
];

// ── CTA ───────────────────────────────────────────────────

export const ABOUT_CTA = {
  badge: 'Get Started',
  heading: 'Partner with a licensed Bahraini security provider',
  subheading:
    'Let us design a security solution tailored to your organisation, facility, or event. Contact our team for a complimentary consultation.',
};
