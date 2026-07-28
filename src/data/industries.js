/**
 * Industries data — ALQUDABEA SECURITY SERVICES W.L.L.
 *
 * Ten industry sectors with descriptions, security challenges,
 * solutions, and CTAs. Centralized for future i18n / CMS.
 */

import {
  Landmark,
  Building2,
  Building,
  Home,
  Hotel,
  Stethoscope,
  Factory,
  HardHat,
  ShoppingBag,
  Truck,
} from 'lucide-react';

export const INDUSTRIES_DATA = [
  {
    id: 'banking',
    icon: Landmark,
    title: 'Banking &amp; Finance',
    subtitle: 'Protecting Bahrain\'s financial heart',
    description:
      'Banks, investment firms, and financial institutions face a uniquely elevated threat profile — from armed robbery and fraud to cyber-attacks and insider threats. ALQUDABEA delivers multi-layered security programmes that protect physical branches, cash-in-transit operations, data centres, and executive offices — all while maintaining the discreet, professional atmosphere that financial clients expect.',
    challenges: [
      'Armed robbery and cash-handling risks',
      'Insider threat and employee vetting',
      'Regulatory compliance with Central Bank of Bahrain',
      'Data centre and server room physical security',
      'VIP banking and private wealth client protection',
    ],
    solutions: [
      'Armed and unarmed guards trained for financial environments',
      'Access control with biometric authentication for vaults',
      'CCTV with AI behavioural analytics at all entry points',
      'Cash-in-transit escort and secure logistics coordination',
      'Executive protection for senior banking leadership',
    ],
    cta: 'Discuss Financial Security',
  },
  {
    id: 'government',
    icon: Building2,
    title: 'Government &amp; Public Sector',
    subtitle: 'Securing the institutions that serve Bahrain',
    description:
      'Government buildings, ministries, embassies, and public facilities require security that is both robust and diplomatic. Our government security teams are trained in public-sector protocols, threat assessment, and inter-agency coordination — ensuring the safety of officials, staff, and citizens without compromising the accessibility that public institutions must maintain.',
    challenges: [
      'High-profile threat exposure and political risk',
      'Public access management and visitor screening',
      'Emergency evacuation and crisis coordination',
      'Sensitive document and classified area protection',
      'Coordination with law enforcement agencies',
    ],
    solutions: [
      'Government-cleared security personnel with security vetting',
      'Perimeter security with anti-vehicle barriers',
      'Visitor management and ID credentialling systems',
      'Emergency operations centre integration',
      'Counter-surveillance and intelligence support',
    ],
    cta: 'Explore Government Security',
  },
  {
    id: 'commercial',
    icon: Building,
    title: 'Commercial Buildings',
    subtitle: 'Complete protection for office environments',
    description:
      'Modern commercial buildings house multiple tenants, valuable assets, and hundreds of daily visitors — creating complex security dynamics. ALQUDABEA provides integrated security management for office towers, business parks, and mixed-use developments. Our solutions protect people and property while maintaining the efficient flow that businesses depend on.',
    challenges: [
      'Multi-tenant access and visitor management',
      'After-hours security and alarm response',
      'Package and delivery screening',
      'Parking structure security and patrol',
      'Fire safety and emergency evacuation',
    ],
    solutions: [
      'Dedicated lobby and reception security officers',
      '24/7 CCTV monitoring with remote access for tenants',
      'Access card and visitor badge management systems',
      'Regular floor-by-floor patrol reporting',
      'Fire warden coordination and evacuation drills',
    ],
    cta: 'Secure Your Commercial Property',
  },
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Communities',
    subtitle: 'Peace of mind where families live',
    description:
      'Gated communities, luxury villas, apartment complexes, and private estates require security that protects residents while preserving the tranquility of home life. Our residential security programmes are designed to be visible enough to deter threats, yet discreet enough to never feel intrusive — a balance we have perfected across Bahrain\'s most prestigious addresses.',
    challenges: [
      'Balancing security presence with residential privacy',
      'Domestic staff and contractor access management',
      'Family safety and child protection',
      'Package theft and visitor verification',
      'Community-wide emergency communication',
    ],
    solutions: [
      'Gatehouse staffing and vehicle access control',
      'Community patrol vehicles with GPS tracking',
      'Residential alarm monitoring and response',
      'Domestic staff background verification service',
      'Community safety workshops and family emergency planning',
    ],
    cta: 'Protect Your Community',
  },
  {
    id: 'hotels',
    icon: Hotel,
    title: 'Hotels &amp; Hospitality',
    subtitle: 'Discreet security for world-class hospitality',
    description:
      'Five-star hotels, resorts, and hospitality venues operate in a unique environment where security must be invisible yet ever-present. Guests should feel welcomed, never surveilled — yet the property, staff, and visitors must be protected around the clock. Our hospitality security teams blend seamlessly into the hotel environment while maintaining rigorous protective protocols.',
    challenges: [
      'Guest privacy vs. security monitoring balance',
      'VIP and celebrity guest protection',
      'Luggage and delivery screening',
      'Event and conference security overflow',
      'Night-time venue and bar security',
    ],
    solutions: [
      'Plain-clothes security officers for lobby and floors',
      'VIP arrival and departure security coordination',
      'CCTV with privacy-compliant monitoring zones',
      'Event security scaling for weddings, conferences, galas',
      'Emergency medical response and evacuation planning',
    ],
    cta: 'Discuss Hospitality Security',
  },
  {
    id: 'healthcare',
    icon: Stethoscope,
    title: 'Healthcare Facilities',
    subtitle: 'Protecting places of care and healing',
    description:
      'Hospitals, clinics, and medical centres present unique security challenges — from protecting vulnerable patients and controlled substances to managing emergency room volatility. Our healthcare security officers receive specialised training in patient interaction, de-escalation, infection control protocols, and regulatory compliance for healthcare environments.',
    challenges: [
      'Patient and staff safety in high-stress environments',
      'Controlled substance and pharmacy security',
      'Emergency room volatility and de-escalation',
      'Infant and paediatric ward protection',
      'Infection control and health screening compliance',
    ],
    solutions: [
      'Healthcare-trained security officers with de-escalation skills',
      'Pharmacy and controlled-drug storage access control',
      'Emergency department 24/7 security presence',
      'Infant security systems and maternity ward protocols',
      'Visiting hours enforcement and visitor management',
    ],
    cta: 'Explore Healthcare Security',
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial Facilities',
    subtitle: 'Heavy protection for heavy industry',
    description:
      'Factories, refineries, warehouses, and manufacturing plants span large areas with valuable equipment, hazardous materials, and complex shift patterns. ALQUDABEA\'s industrial security solutions ensure perimeter integrity, employee safety, and asset protection — all while navigating the operational realities of 24-hour industrial environments.',
    challenges: [
      'Large perimeter security and intrusion detection',
      'Hazardous materials and safety compliance',
      'Shift-worker access at all hours',
      'Equipment and raw material theft prevention',
      'Contractor and supplier access management',
    ],
    solutions: [
      'Perimeter patrol with GPS-verified checkpoints',
      'Gatehouse and weighbridge security staffing',
      'CCTV with thermal imaging for night surveillance',
      'Contractor induction and access credentialling',
      'Fire watch and HSSE officer cross-training',
    ],
    cta: 'Discuss Industrial Security',
  },
  {
    id: 'construction',
    icon: HardHat,
    title: 'Construction Sites',
    subtitle: 'Securing projects from ground to completion',
    description:
      'Construction sites are uniquely vulnerable — open perimeters, high-value materials and equipment, transient workforce, and rapidly changing site conditions. ALQUDABEA provides construction security that adapts with each project phase, from ground-breaking through to handover, ensuring materials, machinery, and personnel remain protected.',
    challenges: [
      'Open and changing site perimeters',
      'High-value plant and material theft',
      'Transient workforce with high turnover',
      'Multiple contractor and supplier access points',
      'After-hours and weekend vulnerability',
    ],
    solutions: [
      '24/7 site security with mobile patrol rounds',
      'Material storage area access control',
      'Worker credential checks and site induction monitoring',
      'CCTV tower deployment for remote site monitoring',
      'Plant and fuel storage security protocols',
    ],
    cta: 'Secure Your Construction Site',
  },
  {
    id: 'retail',
    icon: ShoppingBag,
    title: 'Retail &amp; Shopping Centres',
    subtitle: 'Protecting customers, staff, and merchandise',
    description:
      'Retail environments — from boutique storefronts to major shopping malls — must balance open, welcoming access with effective loss prevention and customer safety. ALQUDABEA\'s retail security solutions are designed to be approachable and customer-friendly while maintaining vigilant protection against theft, fraud, and safety incidents.',
    challenges: [
      'Shoplifting and organised retail crime',
      'Customer and staff safety during operating hours',
      'Cash office and deposit security',
      'Crowd management during sales and events',
      'After-hours delivery and stock room security',
    ],
    solutions: [
      'Uniformed and plain-clothes store detectives',
      'CCTV with AI-based theft detection analytics',
      'Cash office access control and deposit escorts',
      'Event-day crowd management and queue control',
      'Loading bay and delivery verification protocols',
    ],
    cta: 'Protect Your Retail Business',
  },
  {
    id: 'logistics',
    icon: Truck,
    title: 'Logistics &amp; Warehousing',
    subtitle: 'Securing the supply chain end to end',
    description:
      'Logistics hubs, distribution centres, freight terminals, and warehouse facilities are the backbone of commerce — and prime targets for organised theft and cargo crime. ALQUDABEA delivers end-to-end logistics security that protects goods in transit, secures warehouse facilities, and maintains the integrity of supply chains across Bahrain and the GCC.',
    challenges: [
      'Cargo theft and supply chain disruption',
      'Cross-dock and loading bay access control',
      'Fleet and vehicle security',
      'Inventory shrinkage and internal theft',
      'Customs-bonded and high-value goods storage',
    ],
    solutions: [
      'Warehouse security with dock-to-dock coverage',
      'Vehicle and container seal verification protocols',
      'CCTV with licence plate recognition at gates',
      'Employee and visitor search procedures',
      'GPS-tracked escort for high-value shipments',
    ],
    cta: 'Discuss Logistics Security',
  },
];

/**
 * Industry categories for filtering (future use).
 */
export const INDUSTRY_CATEGORIES = [
  { id: 'corporate', label: 'Corporate', industries: ['banking', 'commercial'] },
  { id: 'public', label: 'Public Sector', industries: ['government', 'healthcare'] },
  { id: 'living', label: 'Living & Leisure', industries: ['residential', 'hotels', 'retail'] },
  { id: 'operations', label: 'Operations', industries: ['industrial', 'construction', 'logistics'] },
];
