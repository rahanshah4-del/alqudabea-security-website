/**
 * Site-wide configuration — Alqudabea Security Services W.L.L.
 *
 * Centralized metadata, navigation, and branding constants.
 * All values sourced from official company documents.
 */

export const SITE = {
  name: 'Alqudabea',
  nameFull: 'Alqudabea Security Services W.L.L.',
  tagline: 'Protecting Bahrain with trust, technology, and excellence.',
  description:
    "Alqudabea Security Services W.L.L. — a licensed, insured, and highly reputable security services provider in Bahrain. Uniformed officers, mobile patrols, CCTV monitoring, event security, and executive protection.",
  url: import.meta.env.VITE_APP_URL || 'http://localhost:5180',
  locale: 'en-BH',
  ogImage: '/og-image.png',
  company: {
    registration: 'CR No. 176298-1',
    vat: 'Ministry of Industry and Commerce, Bahrain — Active',
    founded: 'Est. 11 July 2024',
    headquarters: 'Riffa/Al Gharbi, Kingdom of Bahrain',
  },
  contact: {
    phone: ['+973 7790 7878', '+973 3445 2144', '+973 3456 9393'],
    email: 'info@alqudabeasecurity.online',
    emailSecurity: 'security@alqudabeasecurity.online',
    emailHelp: 'help@alqudabeasecurity.online',
    emailAI: 'ai@alqudabeasecurity.online',
    address: 'Office 22, Building 2552, Road 1275, Block 912, Riffa/Al Gharbi, Bahrain',
  },
};

export const NAVIGATION = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Industries', href: '/industries' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: {
    label: 'Request a Quote',
    href: '/quote',
  },
};

export const SOCIAL = {
  linkedin: 'https://linkedin.com',
};
