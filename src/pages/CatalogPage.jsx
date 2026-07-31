import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Download, Share2, FileText, Mail, MessageCircle, Phone,
  BookOpen, CloudLightning, Shield, Building2, FileArchive, Eye, ExternalLink,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { breadcrumbSchema } from '@/config/seo';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

// ── R2 Storage (Cloudflare) ──────────────────────────────
const R2_PUBLIC_URL =
  import.meta.env.VITE_R2_PUBLIC_URL || 'https://pub-alqudabea-assets.r2.dev';

// ── Document definitions ─────────────────────────────────
const DOCUMENTS = [
  {
    id: 'company-catalog',
    title: 'Company Catalog',
    subtitle: 'Al Qabeya Security — Full Product & Services Catalog',
    description:
      'Comprehensive product catalog covering all security equipment, systems, surveillance solutions, and service offerings.',
    r2Path: `${R2_PUBLIC_URL}/Al%20Qabeya%20Security_260731_164811.pdf`,
    size: '37 MB',
    pages: null,
    icon: FileArchive,
    color: 'cyan',
  },
];

const PAGE_TITLE = 'Company Catalog — ALQUDABEA Security Services';
const PAGE_DESC =
  'Download or view the ALQUDABEA Security Services product catalog. Comprehensive coverage of security equipment, systems, surveillance solutions, and service offerings in Bahrain.';
const BREADCRUMB = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Company Catalog', url: '/catalog' },
]);

const TOC = [
  { id: 'company-catalog', label: 'Company Catalog', icon: FileArchive },
  { id: 'contact', label: 'Contact', icon: Phone },
];

// ── PDF Preview Card ────────────────────────────────────
function PdfViewer({ doc }) {
  const Icon = doc.icon;
  const pdfSrc = doc.r2Path;

  return (
    <div
      id={doc.id}
      className="glass relative rounded-3xl overflow-hidden border border-theme-muted shadow-2xl scroll-mt-24"
    >
      <div className="flex flex-col items-center justify-center py-24 px-8 text-center lg:py-32">
        {/* Icon */}
        <motion.div
          className="flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-500/10 ring-1 ring-accent-500/20"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <Icon className="h-10 w-10 text-accent-400" />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="mt-6 font-sans text-xl font-semibold text-theme-primary"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          {doc.title}
        </motion.h2>

        {/* Meta */}
        <motion.p
          className="mt-2 text-sm text-theme-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {doc.pages && `${doc.pages} Pages · `}{doc.size} · PDF
        </motion.p>

        <motion.p
          className="mt-1 text-xs text-neutral-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          Served via Cloudflare R2 CDN ⚡
        </motion.p>

        {/* Actions */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <Button as="a" href={pdfSrc} target="_blank" rel="noopener noreferrer" size="lg">
            <ExternalLink className="h-4 w-4" /> Open PDF
          </Button>
          <Button as="a" href={pdfSrc} download variant="secondary" size="lg">
            <Download className="h-4 w-4" /> Download ({doc.size})
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

// ── Document Hero Card ───────────────────────────────────
function DocumentCard({ doc, index, inView }) {
  const Icon = doc.icon;
  const isAccent = doc.color === 'accent';
  const gradientBorder = isAccent
    ? 'from-accent-500/30 to-cyan-500/20'
    : 'from-cyan-500/30 to-accent-500/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: APPLE_EASE }}
      className="glass relative rounded-3xl border border-theme-muted p-8 lg:p-10"
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${gradientBorder} opacity-30`}
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
            isAccent ? 'bg-accent-500/15 text-accent-400' : 'bg-cyan-500/15 text-cyan-400'
          }`}
        >
          <Icon className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <h2 className="font-sans text-xl font-bold text-theme-primary lg:text-2xl">
            {doc.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-theme-muted">{doc.subtitle}</p>
          <p className="mt-2 text-sm text-theme-secondary max-w-lg">{doc.description}</p>
          <p className="mt-3 flex flex-wrap gap-3 text-xs text-neutral-500">
            {doc.pages && <span>{doc.pages} Pages</span>}
            {doc.pages && <span aria-hidden="true">·</span>}
            <span>{doc.size}</span>
            <span aria-hidden="true">·</span>
            <span>PDF Format</span>
            <span aria-hidden="true">·</span>
            <span className="text-accent-400">Cloudflare R2 CDN</span>
          </p>
        </div>
        <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
          <Button as="a" href={`#${doc.id}`} size="sm">
            <Eye className="h-4 w-4" /> View
          </Button>
          <Button as="a" href={doc.r2Path} download variant="secondary" size="sm">
            <Download className="h-4 w-4" /> Download
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ────────────────────────────────────────────
export default function CatalogPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState(DOCUMENTS[0].id);

  const activeDoc = DOCUMENTS.find((d) => d.id === activeTab) || DOCUMENTS[0];

  return (
    <>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESC}
        path="/catalog"
        schema={[BREADCRUMB]}
      />
      <main ref={ref}>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="from-accent-500/[0.07] via-cyan-500/[0.04] to-surface-root absolute inset-0 bg-gradient-to-br" />
            <div className="to-surface-root absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 bg-gradient-to-b from-accent-500/[0.06] to-transparent blur-3xl" />
          </div>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: APPLE_EASE }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="text-accent-400 mb-4 inline-block font-mono text-xs font-medium tracking-[0.2em] uppercase">
                Company Catalog
              </span>
              <h1 className="font-sans text-4xl font-bold tracking-[-0.02em] lg:text-6xl">
                <span className="text-gradient">ALQUDABEA</span>
                <span className="mt-3 block text-balance text-2xl bg-gradient-to-r from-neutral-300 to-neutral-500 bg-clip-text text-transparent lg:mt-4 lg:text-4xl">
                  Security Services W.L.L.
                </span>
              </h1>
              <p className="mt-6 max-w-xl mx-auto text-sm text-neutral-400">
                View or download our complete product catalog covering all security
                equipment, systems, and services. Served via Cloudflare R2 for fast,
                reliable global delivery.
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Document Cards */}
        <section className="pb-10 lg:pb-16">
          <Container>
            <div className="space-y-6">
              {DOCUMENTS.map((doc, i) => (
                <DocumentCard key={doc.id} doc={doc} index={i} inView={inView} />
              ))}
            </div>
          </Container>
        </section>

        {/* TOC + Viewer */}
        <section className="pb-20 lg:pb-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
              {/* Sticky TOC / Tab Switcher */}
              <aside className="hidden lg:block">
                <nav className="sticky top-24 space-y-1 rounded-2xl border border-theme-muted bg-surface-raised p-4">
                  <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-theme-muted">
                    Documents
                  </p>
                  {DOCUMENTS.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => {
                        setActiveTab(doc.id);
                        document.getElementById(doc.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all ${
                        activeTab === doc.id
                          ? 'bg-accent-500/10 text-accent-400 font-medium'
                          : 'text-theme-secondary hover:bg-surface-muted/60 hover:text-accent-400'
                      }`}
                    >
                      <doc.icon className="h-3.5 w-3.5" />
                      {doc.title}
                    </button>
                  ))}
                  <hr className="my-2 border-theme-muted" />
                  <a
                    href="#contact"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-theme-secondary transition-all hover:bg-surface-muted/60 hover:text-accent-400"
                  >
                    <Phone className="h-3.5 w-3.5" /> Contact
                  </a>
                </nav>
              </aside>

              {/* PDF Viewers */}
              <div className="space-y-10">
                {DOCUMENTS.map((doc) => (
                  <PdfViewer
                    key={doc.id}
                    doc={doc}
                    defaultTab={doc.id === DOCUMENTS[0].id}
                  />
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Floating Buttons */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
          <a
            href={activeDoc.r2Path}
            download
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500 text-white shadow-glow-accent transition-all hover:scale-105 active:scale-95"
            title={`Download ${activeDoc.title}`}
          >
            <Download className="h-5 w-5" />
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-theme-muted bg-surface-raised text-theme-secondary shadow-lg transition-all hover:scale-105 active:scale-95"
            title="Share Link"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        {/* CTA */}
        <section id="contact" className="bg-surface-muted/40 py-16 lg:py-24 scroll-mt-24">
          <Container size="small">
            <div className="glass rounded-3xl p-10 text-center lg:p-14">
              <BookOpen className="mx-auto h-8 w-8 text-accent-400" />
              <h2 className="mt-5 font-sans text-2xl font-bold text-theme-primary">
                Request Company Catalog
              </h2>
              <p className="mt-2 text-sm text-theme-muted">
                Need a customized version or have questions? Contact us directly.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="mailto:info@alqudabeasecurity.online?subject=Catalog Request"
                  className="flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-accent-400"
                >
                  <Mail className="h-4 w-4" /> Email Request
                </a>
                <a
                  href="https://wa.me/97377907878?text=I%20would%20like%20to%20request%20the%20company%20catalog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-3 text-sm font-medium text-green-400 transition-all hover:bg-green-500/20"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
