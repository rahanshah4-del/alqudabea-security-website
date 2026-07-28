/**
 * Centralized SEO configuration — ALQUDABEA SECURITY SERVICES W.L.L.
 *
 * Title templates, meta defaults, and structured data schemas.
 * Import into page components and the SEO utility component.
 */

import { SITE } from '@/config/site';

// ── Site Identity ────────────────────────────────────────

export const SITE_NAME = 'ALQUDABEA SECURITY SERVICES W.L.L.';
export const SITE_SHORT = 'Alqudabea';
export const SITE_DESCRIPTION = SITE.description;
export const SITE_URL = SITE.url;
export const SITE_LOCALE = 'en_BH';
export const SITE_LOCALE_ALT = 'ar_BH';

// ── Title Template ──────────────────────────────────────

/**
 * Generate a page title using the template:
 *   "{page title} — ALQUDABEA SECURITY SERVICES W.L.L."
 *
 * Pass null or omit to use the default site title.
 *
 * @param {string} [pageTitle] — The page-specific title.
 * @returns {string}
 */
export function titleTemplate(pageTitle) {
  if (!pageTitle) {
    return SITE_NAME;
  }
  return `${pageTitle} — ${SITE_NAME}`;
}

// ── Default Meta ────────────────────────────────────────

export const DEFAULT_META = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  ogImage: `${SITE_URL}/og-image.png`,
  ogImageAlt: `${SITE_NAME} — Bahrain's premier security provider`,
  twitterHandle: '', // Add when Twitter/X account is created
};

// ── Organization Schema (JSON-LD) ───────────────────────

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: SITE_SHORT,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/og-image.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Manama',
    addressCountry: 'BH',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    telephone: '+973-7790-7878',
    email: 'info@alqudabeass.com',
    availableLanguage: ['English', 'Arabic'],
  },
  sameAs: ['https://linkedin.com/company/alqudabea'],
  foundingDate: '2024-07-11',
};

// ── LocalBusiness Schema (JSON-LD) ──────────────────────

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Office 22, Building 2552, Road 1275, Block 912',
    addressLocality: 'Riffa/Al Gharbi',
    addressCountry: 'BH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '26.1100',
    longitude: '50.5500',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '08:00',
    closes: '17:00',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    telephone: '+973-7790-7878',
    email: 'info@alqudabeass.com',
  },
};

// ── Breadcrumb Schema Generator ─────────────────────────

/**
 * Generate a BreadcrumbList schema for the current page.
 *
 * @param {Array<{ name: string; url: string }>} items — Breadcrumb items (name, url).
 * @returns {object} JSON-LD BreadcrumbList schema.
 *
 * @example
 * breadcrumbSchema([
 *   { name: 'Home', url: '/' },
 *   { name: 'Services', url: '/services' },
 * ]);
 */
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

// ── WebSite Schema (for search) ─────────────────────────

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// ── Social Profile URLs ─────────────────────────────────

export const SOCIAL_PROFILES = ['https://linkedin.com/company/alqudabea'];

// ── Google / Bing Verification Placeholders ─────────────

/**
 * Verification tokens for search consoles.
 * Set these in .env — never hardcode.
 */
export const VERIFICATION = {
  google: import.meta.env.VITE_GOOGLE_VERIFICATION || '',
  bing: import.meta.env.VITE_BING_VERIFICATION || '',
};

// ── GA4 Measurement ID Placeholder ──────────────────────

export const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';
