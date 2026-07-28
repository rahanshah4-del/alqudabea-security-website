/**
 * Centralized Analytics Service — ALQUDABEA SECURITY SERVICES W.L.L.
 *
 * Supports GA4, Google Tag Manager, Microsoft Clarity.
 * All events flow through a single dispatch for consistency.
 *
 * Environment variables:
 *   VITE_GA4_MEASUREMENT_ID — Google Analytics 4 measurement ID
 *   VITE_GTM_ID              — Google Tag Manager container ID
 *   VITE_CLARITY_ID          — Microsoft Clarity project ID
 */

// ── Configuration ────────────────────────────────────────

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';
const GTM_ID = import.meta.env.VITE_GTM_ID || '';
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID || '';

let initialized = false;

// ── Initialize ───────────────────────────────────────────

/**
 * Initialize all configured analytics providers.
 * Call once at app startup. Safe to call multiple times (idempotent).
 */
export function initAnalytics() {
  if (initialized) { return; }
  if (typeof window === 'undefined') { return; }

  // Delay analytics until browser is idle to avoid blocking LCP
  const load = () => {
    if (GTM_ID) { initGTM(GTM_ID); }
    if (GA4_ID && !GTM_ID) { initGA4(GA4_ID); }
    if (CLARITY_ID) { initClarity(CLARITY_ID); }
    initialized = true;
  };

  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(load, { timeout: 4000 });
  } else {
    setTimeout(load, 2000);
  }
}

function initGTM(id) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
}

function initGA4(id) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id, { send_page_view: false });
}

function initClarity(id) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${id}`;
  document.head.appendChild(script);
}

// ── Event Tracking ───────────────────────────────────────

/**
 * Track a user event across all configured providers.
 *
 * @param {string} eventName  — snake_case event identifier
 * @param {object} [params]   — optional event parameters
 *
 * @example
 * trackEvent('cta_click', { cta_name: 'request_consultation', page: '/services' });
 * trackEvent('contact_form_submit', { service: 'CCTV Monitoring' });
 * trackEvent('whatsapp_click', { page: '/contact' });
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') { return; }

  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    ...params,
  };

  // GA4
  if (window.gtag) {
    window.gtag('event', eventName.replace(/_/g, '_'), params);
  }

  // GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push(payload);
  }

  // Clarity (custom tag for heatmaps)
  if (window.clarity && typeof window.clarity === 'function') {
    window.clarity('set', eventName, 'true');
  }

  // Dev logging
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[Analytics]', eventName, params);
  }
}

// ── Page View ────────────────────────────────────────────

/**
 * Track a page view. Call on route change.
 *
 * @param {string} path  — current page path
 * @param {string} [title] — page title
 */
export function trackPageView(path, title = '') {
  if (typeof window === 'undefined') { return; }

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page: path,
      title: title || document.title,
    });
  }
}

// ── Named Events ─────────────────────────────────────────

export const AnalyticsEvents = {
  // Contact
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  WHATSAPP_CLICK: 'whatsapp_click',
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
  COPY_PHONE: 'copy_phone',
  COPY_EMAIL: 'copy_email',

  // CTAs
  CTA_CLICK: 'cta_click',
  REQUEST_CONSULTATION: 'request_consultation',
  REQUEST_QUOTE: 'request_quote',
  GET_ASSESSMENT: 'get_assessment',

  // Careers
  CAREER_APPLY_START: 'career_apply_start',
  CAREER_APPLY_SUBMIT: 'career_apply_submit',
  JOB_VIEW: 'job_view',

  // Blog
  BLOG_READ: 'blog_read',
  BLOG_SEARCH: 'blog_search',
  BLOG_SHARE: 'blog_share',
  NEWSLETTER_SUBSCRIBE: 'newsletter_subscribe',

  // Search
  SEARCH_QUERY: 'search_query',
  SEARCH_NO_RESULTS: 'search_no_results',

  // Navigation
  NAV_CLICK: 'nav_click',
  MOBILE_MENU_OPEN: 'mobile_menu_open',
  THEME_CHANGE: 'theme_change',
};
