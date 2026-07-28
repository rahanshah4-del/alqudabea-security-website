import { Helmet } from '@vuer-ai/react-helmet-async';
import { titleTemplate, DEFAULT_META, SITE_URL, SITE_LOCALE } from '@/config/seo';

/**
 * Reusable SEO component for every page.
 *
 * Renders all meta tags, Open Graph, Twitter Cards, canonical URL,
 * and optional JSON-LD structured data. Uses the centralized title
 * template: "{page} — ALQUDABEA SECURITY SERVICES W.L.L."
 *
 * @param {object} props
 * @param {string} [props.title]            — Page title (auto-appends brand).
 * @param {string} [props.description]      — Meta description (falls back to default).
 * @param {string} [props.path]             — Canonical path (e.g. "/services").
 * @param {string} [props.ogImage]          — Open Graph image URL.
 * @param {string} [props.ogType]           — OG type (default: "website").
 * @param {object | object[]} [props.schema] — JSON-LD schema object(s) to inject.
 * @param {boolean} [props.noIndex]          — Set to true to add noindex.
 * @param {string} [props.canonical]         — Override canonical URL.
 */
export function SEO({
  title,
  description = DEFAULT_META.description,
  path = '/',
  ogImage = DEFAULT_META.ogImage,
  ogType = 'website',
  schema,
  noIndex = false,
  canonical,
}) {
  const pageTitle = titleTemplate(title);
  const canonicalUrl = canonical || `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* ── Primary ──────────────────────────────── */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noIndex && <meta name="robots" content="noindex, follow" />}

      {/* ── Open Graph ────────────────────────────── */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={DEFAULT_META.ogImageAlt} />
      <meta property="og:site_name" content="ALQUDABEA SECURITY SERVICES W.L.L." />
      <meta property="og:locale" content={SITE_LOCALE} />

      {/* ── Twitter Card ──────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ── Structured Data ───────────────────────── */}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
