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
  Crown,
  Video,
  Lock,
  UserCheck,
  Factory,
  Building2,
  Home,
} from 'lucide-react';

export const SERVICES = [
  {
    id: 'static-security-guards',
    icon: Shield,
    title: 'Static Security Guards',
    subtitle: 'On-site protection you can trust',
    description:
      'Highly trained, GTS Licensed security officers stationed at your premises to deter threats, monitor access points, and respond to incidents. Our static guards undergo rigorous background checks, continuous professional development, and adhere to strict operational protocols — ensuring your facility remains secure around the clock.',
    benefits: [
      'GTS Registered (No. 34569393) and vetted personnel',
      '24/7 shift coverage with seamless handovers',
      'Real-time incident reporting via digital logs',
      'CCTV and access control system integration',
      'Emergency response coordination',
    ],
    cta: 'Request Static Guard Services',
  },
  {
    id: 'mobile-patrol',
    icon: Car,
    title: 'Mobile Patrol Services',
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
    id: 'event-security',
    icon: CalendarCheck,
    title: 'Event Security',
    subtitle: 'Flawless security for every occasion',
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
    id: 'vip-protection',
    icon: Crown,
    title: 'VIP Protection',
    subtitle: 'Executive-grade personal security',
    description:
      'Discreet, professional close protection for executives, dignitaries, celebrities, and high-net-worth individuals. Our protection officers are trained in defensive driving, threat assessment, evasive tactics, and advance route planning. Every detail is meticulously coordinated — from airport transfers to residential security — ensuring peace of mind at every step.',
    benefits: [
      'Ex-military and special forces background officers',
      'Armored vehicle fleet availability',
      'Advance route reconnaissance and planning',
      'Secure residential and travel coordination',
      'Counter-surveillance and threat monitoring',
    ],
    cta: 'Inquire About VIP Protection',
  },
  {
    id: 'cctv-monitoring',
    icon: Video,
    title: 'CCTV Monitoring',
    subtitle: 'Eyes on your property — 24/7/365',
    description:
      'Our state-of-the-art monitoring center operates around the clock, leveraging AI-powered video analytics, motion detection, and remote camera access. Whether you need live monitoring, forensic review, or system health checks, our team ensures your surveillance infrastructure delivers maximum security value — not just recordings.',
    benefits: [
      'AI-powered motion and anomaly detection',
      '24/7 manned monitoring center in Bahrain',
      'Remote access via secure mobile app',
      'Automatic system health monitoring and alerts',
      'Cloud and on-premise storage options',
    ],
    cta: 'Explore CCTV Solutions',
  },
  {
    id: 'access-control',
    icon: Lock,
    title: 'Access Control',
    subtitle: 'Intelligent entry management',
    description:
      'Modern access control goes beyond keys and cards. We design, install, and manage biometric, RFID, and mobile-based access systems that give you granular control over who enters your facility — and when. From single-door installations to enterprise-wide deployments with thousands of users, our solutions scale with your needs.',
    benefits: [
      'Biometric (fingerprint, facial) authentication',
      'Cloud-managed access permissions and logs',
      'Integration with CCTV and alarm systems',
      'Visitor management and temporary access tokens',
      'Real-time access audit trails and reporting',
    ],
    cta: 'Secure Your Access Points',
  },
  {
    id: 'reception-security',
    icon: UserCheck,
    title: 'Reception Security',
    subtitle: 'Professional front-of-house protection',
    description:
      'The reception area is your first line of defense — and your first impression. Our reception security officers combine professional appearance with rigorous security training. They manage visitor registration, screen deliveries, monitor entry points, and coordinate with building security — all while maintaining a welcoming atmosphere.',
    benefits: [
      'Professional, corporate-attired officers',
      'Visitor management and ID badge systems',
      'Package and delivery screening protocols',
      'Integration with building-wide security systems',
      'Emergency evacuation coordination',
    ],
    cta: 'Request Reception Security',
  },
  {
    id: 'industrial-security',
    icon: Factory,
    title: 'Industrial Security',
    subtitle: 'Protecting heavy industry and infrastructure',
    description:
      'Industrial facilities face unique challenges — hazardous materials, large perimeters, shift-worker access, and regulatory compliance. Our industrial security solutions combine manned guarding, CCTV, access control, and health & safety protocols to create a comprehensive security ecosystem tailored to factories, warehouses, and critical infrastructure sites.',
    benefits: [
      'Hazardous environment safety training',
      'Large-perimeter surveillance and patrol',
      'Contractor and shift-worker access management',
      'Regulatory compliance documentation',
      'Fire watch and safety officer cross-training',
    ],
    cta: 'Discuss Industrial Security',
  },
  {
    id: 'commercial-security',
    icon: Building2,
    title: 'Commercial Security',
    subtitle: 'Comprehensive business protection',
    description:
      'Office towers, retail centers, banks, and commercial complexes require layered security that protects assets without disrupting business operations. We deliver integrated security programs that combine manned guarding, electronic systems, and operational procedures — designed to be invisible to your customers but unmistakable to potential threats.',
    benefits: [
      'Multi-tenant building security coordination',
      'Retail loss prevention specialists',
      'After-hours patrol and alarm response',
      'Tenant and employee safety programs',
      'Business continuity and crisis management',
    ],
    cta: 'Protect Your Business',
  },
  {
    id: 'residential-security',
    icon: Home,
    title: 'Residential Security',
    subtitle: 'Peace of mind where you live',
    description:
      'Your home should be your safest place. We provide security solutions for villas, gated communities, apartment complexes, and private estates — from individual guard posts to community-wide security programs. Our residential teams understand the delicate balance between security presence and quality of life.',
    benefits: [
      'Community patrol and gatehouse staffing',
      'Residential alarm monitoring and response',
      'Domestic staff vetting and security training',
      'Family emergency planning and coordination',
      'Smart home security system integration',
    ],
    cta: 'Secure Your Residence',
  },
];

/**
 * Service categories for filtering (future use).
 */
export const SERVICE_CATEGORIES = [
  { id: 'manned', label: 'Manned Guarding', services: ['static-security-guards', 'mobile-patrol'] },
  { id: 'specialized', label: 'Specialized', services: ['event-security', 'vip-protection'] },
  { id: 'electronic', label: 'Electronic', services: ['cctv-monitoring', 'access-control'] },
  { id: 'corporate', label: 'Corporate', services: ['reception-security', 'commercial-security'] },
  {
    id: 'sector',
    label: 'Sector-Specific',
    services: ['industrial-security', 'residential-security'],
  },
];
