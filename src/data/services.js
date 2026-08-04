/**
 * Services data — ALQUDABEA SECURITY SERVICES W.L.L.
 *
 * Centralized service definitions used by the Services page.
 * Each service has an icon (lucide-react name), title, description,
 * key benefits, and a CTA anchor.
 */

import {
  Shield,
  Car,
  CalendarCheck,
  Video,
  DoorOpen,
  ClipboardCheck,
  Building2,
  Swords,
  UserRound,
  UserCheck,
  LifeBuoy,
} from 'lucide-react';

export const SERVICES = [
  {
    id: 'manned-guarding',
    icon: Shield,
    title: 'Manned Guarding',
    subtitle: 'Professional on-site security personnel',
    description:
      'Highly trained, GTS-licensed security officers stationed at your premises to deter threats, monitor access points, and respond to incidents. Our guards undergo rigorous background checks, continuous professional development, and adhere to strict operational protocols — ensuring your facility remains secure around the clock.',
    benefits: [
      'GTS Registered and vetted personnel',
      '24/7 shift coverage with seamless handovers',
      'Real-time incident reporting via digital logs',
      'CCTV and access control system integration',
      'Emergency response coordination',
    ],
    cta: 'Request Manned Guarding',
  },
  {
    id: 'lifeguard-services',
    icon: LifeBuoy,
    title: 'Lifeguard Services',
    subtitle: 'Certified aquatic safety professionals',
    description:
      'Our certified lifeguards provide professional aquatic safety for pools, beaches, water parks, and private residences. Each lifeguard holds internationally recognized certifications in water rescue, CPR, and first aid — ensuring the highest standard of safety for your guests, residents, and facilities.',
    benefits: [
      'Internationally certified lifeguards (ILS/Red Cross)',
      'CPR, AED, and first aid trained',
      'Pool and beach water quality monitoring',
      'Emergency water rescue and evacuation protocols',
      'Preventive safety patrols and hazard identification',
    ],
    cta: 'Request Lifeguard Services',
  },
  {
    id: 'cctv-operators',
    icon: Video,
    title: 'CCTV Operators & Installation',
    subtitle: 'Advanced surveillance systems and skilled operators',
    description:
      'From system design and professional installation to 24/7 manned monitoring — we provide complete CCTV solutions. Our certified technicians install high-definition cameras, NVR/DVR systems, and our trained operators monitor feeds in real-time using Nexora AI-powered analytics for motion detection, facial recognition, and anomaly alerts.',
    benefits: [
      'Professional CCTV system design and installation',
      'Nexora AI-powered motion and anomaly detection',
      '24/7 manned monitoring by trained operators',
      'Remote access via secure mobile app',
      'Cloud and on-premise storage with backup',
    ],
    cta: 'Explore CCTV Solutions',
  },
  {
    id: 'event-security',
    icon: CalendarCheck,
    title: 'Event Security',
    subtitle: 'Comprehensive protection for every occasion',
    description:
      'From corporate galas and product launches to private celebrations and public festivals — we design and execute comprehensive event security plans. Our team handles crowd management, access control, VIP protection, and emergency evacuation coordination, allowing you to focus on delivering an unforgettable experience for your guests.',
    benefits: [
      'Pre-event risk assessment and planning',
      'Trained crowd management specialists',
      'Baggage screening and metal detection',
      'Emergency medical response coordination',
      'Post-event security debrief and reporting',
    ],
    cta: 'Plan Your Event Security',
  },
  {
    id: 'reception-concierge',
    icon: DoorOpen,
    title: 'Reception & Concierge',
    subtitle: 'Professional front-of-house security and service',
    description:
      'The reception area is your first line of defense — and your first impression. Our reception and concierge security officers combine professional appearance with rigorous security training. They manage visitor registration, screen deliveries, monitor entry points, and provide concierge-level assistance — all while maintaining a welcoming, five-star atmosphere.',
    benefits: [
      'Professional, corporate-attired officers',
      'Visitor management and ID badge systems',
      'Package and delivery screening protocols',
      'Concierge services integrated with security',
      'Emergency evacuation and guest coordination',
    ],
    cta: 'Request Reception Services',
  },
  {
    id: 'security-supervisors',
    icon: ClipboardCheck,
    title: 'Security Supervisors',
    subtitle: 'On-site leadership and quality assurance',
    description:
      'Experienced security supervisors who oversee guard teams, ensure compliance with site instructions, conduct quality audits, and serve as the primary point of contact for clients. Each supervisor brings years of field experience and advanced training in team leadership, incident management, and client relations.',
    benefits: [
      'Dedicated on-site team leadership',
      'Daily quality audits and compliance checks',
      'Real-time client communication and reporting',
      'Incident investigation and documentation',
      'Shift handover and roster management',
    ],
    cta: 'Request a Security Supervisor',
  },
  {
    id: 'mobile-patrol',
    icon: Car,
    title: 'Mobile Patrol',
    subtitle: 'Rapid response across Bahrain',
    description:
      'Our marked security vehicles conduct scheduled and random patrols across commercial, industrial, and residential zones. Equipped with GPS tracking, real-time communication systems, and trained patrol officers, our mobile units provide a visible deterrent and swift incident response — bridging the gap between static posts and emergency services.',
    benefits: [
      'GPS-tracked patrol vehicles',
      'Randomized route patterns to prevent predictability',
      'Rapid alarm response (sub-15 minute target)',
      'Detailed patrol reports with time-stamped check-ins',
      'Integrated with our 24/7 command center',
    ],
    cta: 'Schedule a Mobile Patrol',
  },
  {
    id: 'corporate-security',
    icon: Building2,
    title: 'Corporate Security',
    subtitle: 'Comprehensive business protection solutions',
    description:
      'Office towers, corporate headquarters, financial institutions, and business parks require layered security that protects assets without disrupting operations. We deliver integrated corporate security programs combining manned guarding, electronic systems, access management, and executive protection — invisible to your clients but unmistakable to threats.',
    benefits: [
      'Multi-tenant building security coordination',
      'Executive and board-level protection details',
      'After-hours patrol and alarm response',
      'Business continuity and crisis management',
      'Employee safety programs and training',
    ],
    cta: 'Protect Your Business',
  },
  {
    id: 'bouncer',
    icon: Swords,
    title: 'Bouncer',
    subtitle: 'Professional venue and door security',
    description:
      'Highly trained door supervisors for nightclubs, bars, hotels, and entertainment venues. Our bouncers are licensed, physically fit, and trained in conflict de-escalation, crowd psychology, ID verification, and emergency procedures. They maintain a firm but professional presence — ensuring venue safety while preserving a welcoming atmosphere for legitimate patrons.',
    benefits: [
      'Licensed and SIA-equivalent trained door supervisors',
      'Conflict de-escalation and crowd management',
      'Age and ID verification enforcement',
      'Drug and weapon detection awareness',
      'Emergency evacuation and first aid response',
    ],
    cta: 'Request Door Security',
  },
  {
    id: 'female-security-guards',
    icon: UserRound,
    title: 'Female Security Guards',
    subtitle: 'Specialized female security personnel',
    description:
      'Professionally trained female security officers for environments where cultural sensitivity, female-only areas, or client preference calls for women security personnel. Our female guards receive the same rigorous training as all our officers — covering access control, surveillance, search procedures, and emergency response — with additional specialization in female patron screening and cultural protocol.',
    benefits: [
      'Culturally sensitive security for female-only areas',
      'Female patron screening and search compliance',
      'Full security training — identical standards',
      'Ideal for schools, hospitals, malls, and events',
      'Arabic and English speaking officers',
    ],
    cta: 'Request Female Security Guards',
  },
  {
    id: 'personal-security',
    icon: UserCheck,
    title: 'Personal Security',
    subtitle: 'Executive-grade close protection',
    description:
      'Discreet, professional personal protection for executives, dignitaries, celebrities, and high-net-worth individuals. Our close protection officers are trained in defensive driving, threat assessment, evasive tactics, and advance route planning. Every detail is meticulously coordinated — from airport transfers to residential security — ensuring complete peace of mind.',
    benefits: [
      'Ex-military and special forces background officers',
      'Armored vehicle fleet availability',
      'Advance route reconnaissance and planning',
      'Secure residential and travel coordination',
      'Counter-surveillance and threat monitoring',
    ],
    cta: 'Inquire About Personal Security',
  },
];

/**
 * Service categories for filtering (future use).
 */
export const SERVICE_CATEGORIES = [
  { id: 'on-site', label: 'On-Site Security', services: ['manned-guarding', 'security-supervisors', 'female-security-guards'] },
  { id: 'specialized', label: 'Specialized', services: ['event-security', 'lifeguard-services', 'bouncer', 'personal-security'] },
  { id: 'technology', label: 'Technology & Operations', services: ['cctv-operators', 'mobile-patrol'] },
  { id: 'corporate', label: 'Corporate & Front-of-House', services: ['corporate-security', 'reception-concierge'] },
];
