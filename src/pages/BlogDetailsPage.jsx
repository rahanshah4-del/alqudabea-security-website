import { useRef, useMemo, useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, Calendar, Share2, ChevronLeft, ChevronRight,
  Tag, BookOpen, User, MessageCircle, Copy, Check, Link2, ArrowUp,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { SITE_URL, breadcrumbSchema } from '@/config/seo';
import { useBlog } from '@/context/BlogContext';
import { cn } from '@/utils/cn';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

const ACCENT = { from: '#3B82F6', to: '#6366F1' };

// ── Table of Contents Generator ────────────────────────
function extractHeadings(content) {
  if (!content) return [];
  return content
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = line.slice(3);
      return { id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), text };
    });
}

// ── Rich Content Renderer ──────────────────────────────
function RenderedContent({ content }) {
  return useMemo(() => {
    if (!content) return null;
    const elements = [];
    let inList = false;
    let listItems = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(<ul key={`ul-${elements.length}`} className="my-4 space-y-1.5 pl-5">{listItems}</ul>);
        listItems = [];
        inList = false;
      }
    };

    content.split('\n').forEach((line, i) => {
      // H2 heading
      if (line.startsWith('## ')) {
        flushList();
        const text = line.slice(3);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        elements.push(
          <h2 key={i} id={id} className="group mt-14 mb-5 scroll-mt-24 font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary lg:text-3xl">
            {text}
            <a href={`#${id}`} className="ml-2 inline-block opacity-0 transition-opacity group-hover:opacity-50 text-accent-400 text-lg" aria-hidden="true">#</a>
          </h2>
        );
      }
      // Bold sub-heading
      else if (line.startsWith('**') && line.endsWith('**')) {
        flushList();
        elements.push(
          <h3 key={i} className="mt-8 mb-3 font-sans text-lg font-semibold text-theme-secondary">
            {line.replace(/\*\*/g, '')}
          </h3>
        );
      }
      // List item
      else if (line.startsWith('- ')) {
        inList = true;
        listItems.push(
          <li key={i} className="flex items-start gap-2 text-theme-body leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
            <span>{line.slice(2)}</span>
          </li>
        );
      }
      // Empty line
      else if (line.trim() === '') {
        flushList();
        elements.push(<div key={i} className="h-3" />);
      }
      // Normal paragraph
      else {
        flushList();
        elements.push(
          <p key={i} className="text-theme-body leading-relaxed text-[15px] lg:text-base">
            {line}
          </p>
        );
      }
    });

    flushList();
    return elements;
  }, [content]);
}

// ── Copy Button ────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 rounded-xl border border-theme-muted px-4 py-2 text-xs font-medium text-theme-muted transition-all hover:border-accent-500/30 hover:text-accent-400 hover:bg-accent-500/5"
    >
      {copied ? <><Check className="h-3.5 w-3.5 text-green-400" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy Link</>}
    </button>
  );
}

// ── Floating Action Bar ────────────────────────────────
function FloatingBar({ article, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-theme-muted bg-surface-raised/90 backdrop-blur-xl px-4 py-3 shadow-2xl">
            <span className="text-xs font-medium text-theme-secondary truncate max-w-[200px]">{article.title}</span>
            <span className="h-4 w-px bg-theme-muted" />
            <CopyButton text={typeof window !== 'undefined' ? window.location.href : ''} />
            <a
              href={`https://wa.me/?text=${encodeURIComponent(article.title + ' — ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400 transition-all hover:bg-green-500/20"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Share
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Author Hero Card ───────────────────────────────────
function AuthorCard({ author }) {
  if (!author) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 rounded-3xl border border-theme-muted bg-surface-raised p-8 lg:p-10"
    >
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/20 to-cyan-500/10 ring-1 ring-accent-500/20">
          <span className="font-sans text-xl font-bold text-accent-400">{author.avatar}</span>
        </div>
        <div>
          <h3 className="font-sans text-lg font-bold text-theme-primary">{author.name}</h3>
          <p className="text-sm text-theme-muted">{author.role}</p>
          <p className="mt-2 text-sm text-theme-muted leading-relaxed max-w-lg">
            Security professional with extensive experience in Bahrain&rsquo;s security industry.
            Writing about best practices, regulations, and innovations.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Related Card ───────────────────────────────────────
const CARD_ACCENTS = [
  { from: '#3B82F6', to: '#6366F1' },
  { from: '#10B981', to: '#34D399' },
  { from: '#8B5CF6', to: '#A78BFA' },
];

function RelatedArticle({ article, index, categories }) {
  const acc = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const cat = categories.find((c) => c.slug === article.category);

  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-theme-muted bg-surface-raised p-6 transition-all duration-400 hover:-translate-y-1 hover:border-accent-500/20 hover:shadow-xl"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${acc.from}, ${acc.to})` }} />
      {cat && <span className="font-mono text-[10px] font-semibold tracking-wider uppercase" style={{ color: acc.from }}>{cat.label}</span>}
      <h3 className="font-sans font-semibold text-theme-primary transition-colors group-hover:text-accent-400 line-clamp-2">{article.title}</h3>
      <p className="text-xs text-theme-muted line-clamp-2">{article.excerpt}</p>
      <div className="mt-auto flex items-center gap-3 text-[11px] text-theme-muted">
        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
        <span>{article.publishedDate || article.date}</span>
      </div>
    </Link>
  );
}

// ── Main Page ─────────────────────────────────────────
export default function BlogDetailsPage() {
  const { articles, categories, authors } = useBlog();
  const { slug } = useParams();
  const contentRef = useRef(null);
  const articleRef = useRef(null);

  // Reading progress
  const { scrollYProgress } = useScroll({ target: articleRef, offset: ['start start', 'end end'] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const article = articles.find((a) => a.slug === slug);
  const [showFloating, setShowFloating] = useState(false);

  // Show floating bar after scrolling past hero
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowFloating(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el.querySelector('[data-hero]'));
    return () => obs.disconnect();
  }, [article]);

  if (!article) return <Navigate to="/blog" replace />;

  const headings = extractHeadings(article.content);
  const related = articles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags?.some((t) => article.tags?.includes(t))))
    .slice(0, 3);
  const author = authors[article.author];
  const category = categories.find((c) => c.slug === article.category);
  const idx = articles.findIndex((a) => a.id === article.id);
  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;
  const [activeHeading, setActiveHeading] = useState('');

  // Intersection Observer for active TOC heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const PAGE_TITLE = `${article.title} — ALQUDABEA Blog`;
  const BREADCRUMB = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: article.title, url: `/blog/${article.slug}` },
  ]);
  const ARTICLE_SCHEMA = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: article.title, description: article.excerpt,
    datePublished: article.publishedDate,
    author: { '@type': 'Person', name: author?.name || 'ALQUDABEA' },
    publisher: { '@type': 'Organization', name: 'ALQUDABEA SECURITY SERVICES W.L.L.', url: SITE_URL },
    articleSection: category?.label,
    keywords: article.tags?.join(', '),
  };

  return (
    <>
      <SEO title={PAGE_TITLE} description={article.excerpt} path={`/blog/${article.slug}`} schema={[BREADCRUMB, ARTICLE_SCHEMA]} />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent-500 via-blue-500 to-cyan-400"
        style={{ scaleX }}
      />

      <main ref={articleRef}>
        {/* ── Hero Header ────────────────────────────── */}
        <div data-hero className="relative overflow-hidden pt-28 pb-8 lg:pt-36 lg:pb-12">
          {/* Background */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-b from-accent-500/[0.06] via-transparent to-transparent" />
            <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full blur-[120px] bg-accent-500/[0.04]" />
            <div className="absolute bottom-0 left-0 h-[300px] w-[300px] -translate-x-1/3 translate-y-1/3 rounded-full blur-[100px] bg-cyan-500/[0.03]" />
          </div>

          <Container size="small">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-theme-muted transition-colors hover:text-accent-400"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Link>
            </motion.div>

            {/* Category + Date Row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              {category && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/10 px-3.5 py-1.5 text-[11px] font-semibold text-accent-400 ring-1 ring-accent-500/20">
                  {category.label}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-[13px] text-theme-muted">
                <Calendar className="h-3.5 w-3.5" />
                {article.publishedDate || article.date}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[13px] text-theme-muted">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime} read
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-4xl font-sans text-3xl font-bold tracking-[-0.03em] text-theme-primary sm:text-4xl lg:text-5xl"
            >
              {article.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-4 max-w-3xl text-base leading-relaxed text-theme-muted lg:text-lg"
            >
              {article.excerpt}
            </motion.p>

            {/* Author Row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center gap-4"
            >
              {author && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/20 to-cyan-500/10 ring-1 ring-accent-500/20">
                    <span className="text-sm font-bold text-accent-400">{author.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-theme-primary">{author.name}</p>
                    <p className="text-[11px] text-theme-muted">{author.role}</p>
                  </div>
                </div>
              )}
              <span className="hidden sm:inline h-5 w-px bg-theme-muted" />
              <div className="flex items-center gap-2">
                <CopyButton text={typeof window !== 'undefined' ? window.location.href : ''} />
              </div>
            </motion.div>
          </Container>
        </div>

        {/* ── Content + Sidebar ───────────────────────── */}
        <section className="pb-16 lg:pb-24">
          <Container size="small">
            <div className="grid gap-12 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_280px]">
              {/* Article Content */}
              <div ref={contentRef} className="min-w-0 max-w-none">
                <div className="rounded-3xl border border-theme-muted/60 bg-surface-raised/40 p-8 lg:p-12">
                  <RenderedContent content={article.content} />
                </div>

                {/* Tags Row */}
                {article.tags?.length > 0 && (
                  <div className="mt-8 flex flex-wrap items-center gap-2">
                    <Tag className="h-4 w-4 text-theme-muted" />
                    {article.tags.map((t) => (
                      <span key={t} className="rounded-lg bg-surface-muted/60 px-3 py-1.5 text-[11px] font-medium text-theme-muted hover:text-theme-secondary transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Author Card */}
                <AuthorCard author={author} />
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-5">
                  {/* Table of Contents */}
                  {headings.length > 0 && (
                    <nav className="rounded-2xl border border-theme-muted bg-surface-raised/60 p-5">
                      <h4 className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-theme-muted">
                        <BookOpen className="h-3.5 w-3.5" /> On this page
                      </h4>
                      <ul className="mt-3 space-y-0.5">
                        {headings.map((h) => (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              className={cn(
                                'block rounded-lg px-3 py-2 text-xs transition-all',
                                activeHeading === h.id
                                  ? 'bg-accent-500/10 text-accent-400 font-medium'
                                  : 'text-theme-muted hover:bg-surface-muted/60 hover:text-theme-secondary'
                              )}
                            >
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}

                  {/* Share */}
                  <div className="rounded-2xl border border-theme-muted bg-surface-raised/60 p-5">
                    <h4 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-theme-muted mb-3">Share</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '')}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-theme-muted transition-all hover:bg-surface-muted/60 hover:text-theme-secondary"
                      >
                        <Link2 className="h-3.5 w-3.5" /> Copy Link
                      </button>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(article.title + ' — ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-theme-muted transition-all hover:bg-surface-muted/60 hover:text-green-400"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>

        {/* ── Prev / Next Navigation ───────────────────── */}
        <section className="border-y border-theme-muted py-8">
          <Container size="small">
            <div className="flex items-center justify-between gap-6">
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  className="group flex max-w-[45%] flex-col items-start gap-1 rounded-2xl p-3 -ml-3 transition-all hover:bg-surface-muted/40"
                >
                  <span className="flex items-center gap-1 text-[11px] font-medium text-theme-muted"><ChevronLeft className="h-3.5 w-3.5" /> Previous</span>
                  <span className="text-sm font-medium text-theme-secondary line-clamp-1 transition-colors group-hover:text-theme-primary">{prev.title}</span>
                </Link>
              ) : <div />}
              {next ? (
                <Link
                  to={`/blog/${next.slug}`}
                  className="group flex max-w-[45%] flex-col items-end gap-1 rounded-2xl p-3 -mr-3 text-right transition-all hover:bg-surface-muted/40 ml-auto"
                >
                  <span className="flex items-center gap-1 text-[11px] font-medium text-theme-muted">Next <ChevronRight className="h-3.5 w-3.5" /></span>
                  <span className="text-sm font-medium text-theme-secondary line-clamp-1 transition-colors group-hover:text-theme-primary">{next.title}</span>
                </Link>
              ) : <div />}
            </div>
          </Container>
        </section>

        {/* ── Related Articles ─────────────────────────── */}
        {related.length > 0 && (
          <section className="py-16 lg:py-24">
            <Container>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Related Articles</h2>
                  <p className="mt-1 text-sm text-theme-muted">Continue reading on similar topics</p>
                </div>
                <Link to="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((ra, i) => (
                  <RelatedArticle key={ra.id} article={ra} index={i} categories={categories} />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── Floating Bar ─────────────────────────────── */}
        <FloatingBar article={article} show={showFloating} />

        {/* ── Back to Top ──────────────────────────────── */}
        <AnimatePresence>
          {showFloating && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-2xl border border-theme-muted bg-surface-raised text-theme-muted shadow-xl transition-all hover:text-theme-primary hover:border-accent-500/30"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
