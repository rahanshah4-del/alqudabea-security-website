/**
 * Careers data — ALQUDABEA SECURITY SERVICES W.L.L.
 *
 * Jobs, departments, culture, benefits, and hiring process.
 * Centralized for future CMS / Firebase integration.
 */

import { Shield, Clock, Heart, BookOpen, Users, GraduationCap } from 'lucide-react';

// ── Company Culture ──────────────────────────────────────

export const CULTURE = {
  badge: 'Join Our Team',
  heading: 'Build Your Career With Bahrain&rsquo;s Premier Security Provider',
  description:
    'At ALQUDABEA, we believe great security starts with great people. We invest in our team — from comprehensive training and competitive benefits to clear career progression pathways. Join 500+ professionals protecting what matters most across the Kingdom of Bahrain.',
};

// ── Benefits ─────────────────────────────────────────────

export const BENEFITS = [
  { icon: Shield, title: 'GTS Training', description: 'Full security licence training and certification, fully sponsored.' },
  { icon: BookOpen, title: 'Career Development', description: 'Structured career pathways with leadership and specialist tracks.' },
  { icon: Heart, title: 'Health Coverage', description: 'Comprehensive medical insurance for you and your dependents.' },
  { icon: Clock, title: 'Flexible Shifts', description: 'Day, night, and rotating shift patterns to suit your lifestyle.' },
  { icon: Users, title: 'Bahraini First', description: 'Over 70% Bahraini workforce — we prioritise local talent development.' },
  { icon: GraduationCap, title: 'Continuous Learning', description: 'Ongoing professional development with international certifications.' },
];

// ── Hiring Process ───────────────────────────────────────

export const HIRING_PROCESS = [
  { step: '01', title: 'Online Application', description: 'Submit your CV and cover letter through our secure application portal.' },
  { step: '02', title: 'Initial Screening', description: 'Our HR team reviews your application and conducts a preliminary phone interview.' },
  { step: '03', title: 'Assessment Centre', description: 'Practical security scenario assessments and competency-based interviews.' },
  { step: '04', title: 'Background Check', description: 'Comprehensive vetting including criminal record, references, and credential verification.' },
  { step: '05', title: 'Offer & Onboarding', description: 'Receive your offer letter and begin our structured onboarding programme.' },
];

// ── Departments ──────────────────────────────────────────

export const DEPARTMENTS = [
  { id: 'manned-guarding', label: 'Manned Guarding', count: 12 },
  { id: 'mobile-patrol', label: 'Mobile Patrol', count: 5 },
  { id: 'cctv-monitoring', label: 'CCTV & Monitoring', count: 4 },
  { id: 'event-security', label: 'Event Security', count: 3 },
  { id: 'vip-protection', label: 'VIP Protection', count: 2 },
  { id: 'administration', label: 'Administration', count: 6 },
  { id: 'management', label: 'Management', count: 3 },
];

// ── Jobs ─────────────────────────────────────────────────

export const JOBS = [
  {
    id: 'security-officer-manama-01',
    title: 'Security Officer',
    department: 'Manned Guarding',
    location: 'Manama',
    type: 'Full-time',
    experience: 'Entry Level',
    postedDate: '2026-07-20',
    description: 'Join our front-line security team protecting corporate and government facilities across Manama. Full training provided.',
    responsibilities: [
      'Monitor and patrol assigned premises to prevent security breaches',
      'Control access points and verify visitor credentials',
      'Respond to alarms and security incidents',
      'Maintain detailed incident and shift reports',
      'Coordinate with the 24/7 command centre',
      'Provide excellent customer service while maintaining security protocols',
    ],
    requirements: [
      'Bahraini national or valid Bahrain work permit',
      'Minimum high school diploma',
      'GTS licence (or willingness to obtain — training provided)',
      'Good physical fitness',
      'Clear criminal record',
      'Basic English communication skills (Arabic proficiency preferred)',
    ],
    benefits: [
      'Competitive salary with overtime',
      'Full GTS licence sponsorship',
      'Medical insurance',
      'Uniform and equipment provided',
      'Career progression pathways',
      '24/7 support from command centre',
    ],
    skills: ['Physical Security', 'Access Control', 'Incident Reporting', 'CCTV Monitoring', 'First Aid'],
    workingHours: 'Rotating shifts — 8 hours. Day, night, and weekend coverage.',
  },
  {
    id: 'security-supervisor-muharraq-02',
    title: 'Security Supervisor',
    department: 'Manned Guarding',
    location: 'Muharraq',
    type: 'Full-time',
    experience: 'Mid-Level',
    postedDate: '2026-07-18',
    description: 'Lead a team of security officers at a major commercial facility. Ideal for experienced officers ready for leadership.',
    responsibilities: [
      'Supervise and schedule a team of 8–15 security officers',
      'Conduct shift briefings and handover meetings',
      'Perform quality assurance inspections',
      'Investigate and escalate security incidents',
      'Liaise with client management on security matters',
      'Ensure compliance with ALQUDABEA SOPs and MoI regulations',
    ],
    requirements: [
      'Minimum 3 years security experience',
      'Current valid GTS licence',
      'Previous supervisory experience preferred',
      'Strong leadership and communication skills',
      'Proficiency in English and Arabic',
    ],
    benefits: [
      'Leadership career track',
      'Management training programme',
      'Enhanced medical coverage',
      'Performance bonus eligibility',
      'Company mobile phone',
    ],
    skills: ['Team Leadership', 'Shift Management', 'Client Relations', 'Incident Investigation', 'Report Writing'],
    workingHours: 'Rotating shifts with on-call responsibility.',
  },
  {
    id: 'cctv-operator-manama-03',
    title: 'CCTV Control Room Operator',
    department: 'CCTV & Monitoring',
    location: 'Manama',
    type: 'Full-time',
    experience: 'Entry Level',
    postedDate: '2026-07-15',
    description: 'Operate our state-of-the-art monitoring centre. Monitor multiple client sites using Nexora AI-assisted surveillance technology.',
    responsibilities: [
      'Monitor CCTV feeds across multiple client sites',
      'Identify and report suspicious activity using Nexora AI-assisted analytics',
      'Maintain detailed monitoring logs',
      'Coordinate with mobile patrol units for incident response',
      'Perform system health checks and report technical issues',
      'Archive and retrieve footage for investigations',
    ],
    requirements: [
      'Bahraini national or valid Bahrain work permit',
      'Computer literacy — confident with multiple screens and software',
      'Attention to detail and sustained concentration',
      'Clear criminal record',
      'English proficiency required',
    ],
    benefits: [
      'Full training on AI monitoring systems',
      'Climate-controlled work environment',
      'Fixed shift patterns available',
      'Career progression to senior operator',
    ],
    skills: ['CCTV Systems', 'Attention to Detail', 'Multi-tasking', 'Report Writing', 'Communication'],
    workingHours: '12-hour shifts — day and night rotations. 4 days on, 4 days off.',
  },
  {
    id: 'vip-protection-officer-manama-04',
    title: 'VIP Protection Officer',
    department: 'VIP Protection',
    location: 'Manama',
    type: 'Full-time',
    experience: 'Senior',
    postedDate: '2026-07-10',
    description: 'Provide executive-grade close protection for high-net-worth individuals, corporate executives, and dignitaries in Bahrain.',
    responsibilities: [
      'Conduct advance route reconnaissance and planning',
      'Provide close protection during transit and at venues',
      'Perform counter-surveillance and threat monitoring',
      'Coordinate with client household or corporate security teams',
      'Maintain absolute discretion and professionalism',
      'Prepare detailed security assessments and reports',
    ],
    requirements: [
      'Minimum 5 years close protection experience',
      'Military or law enforcement background strongly preferred',
      'Valid GTS licence and advanced protection certification',
      'Defensive and evasive driving qualification',
      'Excellent physical fitness',
      'Absolute discretion — references required',
    ],
    benefits: [
      'Premium salary package',
      'Executive benefits programme',
      'International training opportunities',
      'Discretionary performance bonuses',
    ],
    skills: ['Close Protection', 'Defensive Driving', 'Threat Assessment', 'Counter-Surveillance', 'First Aid', 'Firearms (Optional)'],
    workingHours: 'Flexible — client-dependent schedules with on-call availability.',
  },
  {
    id: 'events-security-coordinator-manama-05',
    title: 'Events Security Coordinator',
    department: 'Event Security',
    location: 'Manama',
    type: 'Contract',
    experience: 'Mid-Level',
    postedDate: '2026-07-08',
    description: 'Plan and coordinate security for high-profile events — conferences, galas, product launches, and private celebrations.',
    responsibilities: [
      'Conduct pre-event security assessments and risk analysis',
      'Develop comprehensive event security plans',
      'Coordinate staffing, equipment, and logistics',
      'Liaise with venue management and local authorities',
      'Supervise event-day security operations',
      'Conduct post-event debrief and reporting',
    ],
    requirements: [
      'Minimum 2 years event security experience',
      'Strong organisational and planning skills',
      'Experience with crowd management',
      'Valid GTS licence',
      'Flexibility for evening and weekend work',
    ],
    benefits: [
      'Per-event competitive rates',
      'Opportunity to work at Bahrain&rsquo;s most prestigious events',
      'Flexible scheduling',
      'Pathway to permanent role',
    ],
    skills: ['Event Planning', 'Crowd Management', 'Risk Assessment', 'Team Coordination', 'Client Management'],
    workingHours: 'Per-event — flexible scheduling.',
  },
  {
    id: 'hr-officer-manama-06',
    title: 'HR Officer',
    department: 'Administration',
    location: 'Manama',
    type: 'Full-time',
    experience: 'Mid-Level',
    postedDate: '2026-07-05',
    description: 'Support our growing team with recruitment, onboarding, employee relations, and HR administration at our Manama headquarters.',
    responsibilities: [
      'Manage end-to-end recruitment for security and administrative roles',
      'Coordinate onboarding and GTS licence processing',
      'Handle employee relations and grievance procedures',
      'Maintain HR records and compliance documentation',
      'Support training and development programme coordination',
      'Assist with payroll and benefits administration',
    ],
    requirements: [
      'Bachelor&rsquo;s degree in HR, Business, or related field',
      'Minimum 3 years HR experience',
      'Knowledge of Bahrain labour law',
      'Proficiency in English and Arabic',
      'HR certification preferred (CIPD, SHRM, or equivalent)',
    ],
    benefits: [
      'Professional development budget',
      'Office-based role — standard business hours',
      'Medical insurance',
      'Annual performance bonus',
    ],
    skills: ['Recruitment', 'Employee Relations', 'Bahrain Labour Law', 'HR Systems', 'Arabic & English'],
    workingHours: 'Sunday–Thursday, 08:00–17:00.',
  },
];

// ── Filters ──────────────────────────────────────────────

export const JOB_FILTERS = {
  locations: ['All Locations', 'Manama', 'Muharraq', 'Northern', 'Southern'],
  types: ['All Types', 'Full-time', 'Contract', 'Part-time'],
  experience: ['All Levels', 'Entry Level', 'Mid-Level', 'Senior'],
  departments: ['All Departments', ...DEPARTMENTS.map((d) => d.label)],
};
