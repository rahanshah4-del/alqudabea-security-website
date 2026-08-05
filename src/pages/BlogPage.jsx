import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Search, Clock, Calendar, ArrowRight, ArrowUpRight, Mail,
  Sparkles, TrendingUp, Flame, BookOpen, User, Tag, X, ChevronRight,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { breadcrumbSchema } from '@/config/seo';
import { cn } from '@/utils/cn';
import { useBlog } from '@/context/BlogContext';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

const PAGE_TITLE = 'Security Insights & Updates — ALQUDABEA Blog';
const PAGE_DESC = 'Expert security insights, industry updates, regulatory guidance, and career advice from ALQUDABEA SECURITY SERVICES W.L.L.';
const BREADCRUMB = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]);

const ACCENTS = [
  { from: '#3B82F6', to: '#6366F1', bg: 'rgba(212,175,55,0.08)', border: 'rgba(212,175,55,0.2)' },
  { from: '#10B981', to: '#34D399', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
  { from: '#8B5CF6', to: '#A78BFA', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
  { from: '#F59E0B', to: '#FBBF24', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  { from: '#06B6D4', to: '#22D3EE', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)' },
  { from: '#F43F5E', to: '#FB7185', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.2)' },
  { from: '#6366F1', to: '#818CF8', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)' },
  { from: '#0EA5E9', to: '#38BDF8', bg: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.2)' },
];

// ── Hero ──────────────────────────────────────────────
function Hero({ search, setSearch, inView }) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 lg:pt-40 lg:pb-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-500/[0.04] via-transparent to-transparent" />
      </div>
      <Container>
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-theme-muted bg-surface-raised/60 px-4 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              <span className="font-mono text-[11px] font-semibold tracking-[0.15em] text-theme-muted uppercase">Bahrain&rsquo;s Security Blog</span>
            </motion.span>

            <h1 className="mt-6 font-sans text-4xl font-bold tracking-[-0.03em] text-theme-primary sm:text-5xl lg:text-6xl">
              Insights &amp; perspectives from the
              <span className="relative mx-2 inline-block">
                <span className="relative z-10 bg-gradient-to-r from-accent-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">frontlines</span>
                <span className="absolute bottom-1 left-0 -z-0 h-3 w-full rounded-full bg-accent-500/10 blur-sm" />
              </span>
              of security.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-theme-muted lg:text-lg">
              Expert analysis, regulatory updates, and practical guides from Bahrain&rsquo;s most trusted security services provider.
            </p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative mx-auto mt-8 max-w-lg"
            >
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-accent-500/30 to-cyan-500/20 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100" />
                <div className="relative flex items-center rounded-2xl border border-theme-muted bg-surface-raised/80 backdrop-blur-xl transition-all duration-300 group-focus-within:border-accent-500/50">
                  <Search className="ml-4 h-4 w-4 shrink-0 text-theme-muted transition-colors group-focus-within:text-accent-400" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, keywords…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent py-3.5 pl-3 pr-4 text-sm text-theme-primary placeholder:text-theme-muted/60 focus:outline-none"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="mr-3 rounded-lg p-1 text-theme-muted hover:bg-surface-muted hover:text-theme-primary transition-all">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ── Category Bar ──────────────────────────────────────
function CategoryBar({ categories, activeCat, setActiveCat }) {
  const scrollRef = useRef(null);

  return (
    <div className="sticky top-14 z-30 border-b border-theme-muted bg-surface-root/80 backdrop-blur-xl">
      <Container>
        <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar" ref={scrollRef}>
          <button
            onClick={() => setActiveCat(null)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
              !activeCat
                ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20'
                : 'text-theme-muted hover:bg-surface-muted hover:text-theme-primary'
            )}
          >
            All
          </button>
          {categories.map((c) => {
            const isActive = activeCat === c.slug;
            const acc = ACCENTS[categories.indexOf(c) % ACCENTS.length];
            return (
              <button
                key={c.id}
                onClick={() => setActiveCat(isActive ? null : c.slug)}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
                  isActive ? 'text-white shadow-lg' : 'text-theme-muted hover:bg-surface-muted hover:text-theme-primary'
                )}
                style={isActive ? { background: `linear-gradient(135deg, ${acc.from}, ${acc.to})` } : {}}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </Container>
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
    </div>
  );
}

// ── Featured Hero Card ────────────────────────────────
function FeaturedCard({ article, authors, categories, accent }) {
  const author = authors[article.author];
  const cat = categories.find((c) => c.slug === article.category);

  return (
    <Link to={`/blog/${article.slug}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-theme-muted bg-surface-raised transition-all duration-500 hover:border-accent-500/30 hover:shadow-2xl"
      >
        {/* Top color bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }} />

        <div className="grid lg:grid-cols-2">
          {/* Visual Panel */}
          <div className="relative flex items-center justify-center overflow-hidden p-12 lg:p-16" style={{ background: `radial-gradient(ellipse at center, ${accent.from}15 0%, transparent 70%)` }}>
            {/* Abstract shapes */}
            <div className="absolute top-6 left-6 h-20 w-20 rounded-full blur-3xl" style={{ background: accent.from, opacity: 0.25 }} />
            <div className="absolute bottom-6 right-6 h-16 w-16 rounded-full blur-2xl" style={{ background: accent.to, opacity: 0.2 }} />
            <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: accent.from, opacity: 0.15 }} />

            {/* Icon */}
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-2 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-glow-accent" style={{ background: `linear-gradient(135deg, ${accent.from}20, ${accent.to}10)`, borderColor: accent.border }}>
                <BookOpen className="h-12 w-12 transition-colors duration-500" style={{ color: accent.from }} />
              </div>
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-3xl border-2 animate-ping opacity-20" style={{ borderColor: accent.from }} />
            </div>
          </div>

          {/* Content Panel */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: `${accent.from}15`, color: accent.from }}>
                <Flame className="h-3 w-3" /> Featured
              </span>
              {cat && <span className="font-mono text-[11px] tracking-wider text-theme-muted uppercase">{cat.label}</span>}
            </div>
            <h2 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary transition-colors group-hover:text-accent-400 lg:text-3xl">
              {article.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-theme-muted line-clamp-3">{article.excerpt}</p>

            {/* Meta */}
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-theme-muted">
              {author && (
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: `${accent.from}20`, color: accent.from }}>{author.avatar}</span>
                  <span className="font-medium text-theme-secondary">{author.name}</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.publishedDate || article.date}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
            </div>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3" style={{ color: accent.from }}>
              Read Article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// ── Article Card ──────────────────────────────────────
function ArticleCard({ article, index, categories, authors }) {
  const acc = ACCENTS[index % ACCENTS.length];
  const cat = categories.find((c) => c.slug === article.category);
  const author = authors[article.author];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/blog/${article.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-theme-muted bg-surface-raised p-6 transition-all duration-400 hover:-translate-y-1 hover:border-accent-500/25 hover:shadow-xl"
      >
        {/* Gradient glow on hover */}
        <div
          className="absolute -top-10 -right-10 h-20 w-20 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: acc.from }}
        />

        {/* Category */}
        <div className="relative z-10 flex items-center gap-2 mb-3">
          {cat && (
            <span className="inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider" style={{ background: `${acc.from}12`, color: acc.from }}>
              {cat.label}
            </span>
          )}
          {article.featured && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/12 px-2 py-0.5 text-[10px] font-semibold text-amber-400">⭐</span>
          )}
        </div>

        {/* Title */}
        <h3 className="relative z-10 font-sans text-base font-bold tracking-[-0.01em] text-theme-primary transition-colors group-hover:text-theme-primary line-clamp-2 lg:text-lg">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="relative z-10 mt-2 text-sm leading-relaxed text-theme-muted line-clamp-2">{article.excerpt}</p>

        {/* Spacer */}
        <div className="mt-auto pt-4" />

        {/* Meta Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-theme-muted/50 pt-4">
          <div className="flex items-center gap-3">
            {author && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold" style={{ background: `${acc.from}18`, color: acc.from }}>
                {author.avatar}
              </span>
            )}
            <span className="text-[11px] text-theme-muted">{article.readTime}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium transition-all duration-300 group-hover:gap-1.5" style={{ color: acc.from }}>
            Read <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Trending Sidebar ──────────────────────────────────
function TrendingPosts({ articles, categories, authors }) {
  const trending = useMemo(() => {
    return [...articles].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [articles]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-theme-muted bg-surface-raised/60 p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="h-4 w-4 text-accent-400" />
        <h3 className="font-sans text-sm font-semibold text-theme-primary">Trending Now</h3>
      </div>
      <div className="space-y-0">
        {trending.map((a, i) => {
          const acc = ACCENTS[i % ACCENTS.length];
          const cat = categories.find((c) => c.slug === a.category);
          return (
            <Link
              key={a.id}
              to={`/blog/${a.slug}`}
              className="group flex items-start gap-3 rounded-xl p-2.5 -mx-2 transition-all duration-200 hover:bg-surface-muted/60"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold" style={{ background: `${acc.from}15`, color: acc.from }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-theme-secondary line-clamp-2 transition-colors group-hover:text-theme-primary">{a.title}</p>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-theme-muted">
                  {cat && <span style={{ color: acc.from }}>{cat.label}</span>}
                  {cat && <span aria-hidden="true">·</span>}
                  <span>{a.readTime}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Newsletter CTA ────────────────────────────────────
function NewsletterCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-theme-muted bg-surface-raised p-10 lg:p-14"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/4 -translate-y-1/4 rounded-full blur-3xl bg-accent-500/[0.06]" />
        <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/4 translate-y-1/4 rounded-full blur-3xl bg-cyan-500/[0.04]" />
      </div>

      <div className="relative text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/20 to-cyan-500/10 ring-1 ring-accent-500/20">
          <Mail className="h-7 w-7 text-accent-400" />
        </div>
        <h2 className="mt-5 font-sans text-2xl font-bold tracking-[-0.01em] text-theme-primary lg:text-3xl">
          Never miss an insight
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-theme-muted">
          Weekly security briefings, regulatory updates, and expert analysis — straight to your inbox.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-xl border border-theme-muted bg-surface-root/60 px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted/60 transition-all focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/15"
          />
          <Button type="submit" size="lg">Subscribe</Button>
        </form>
        <p className="mt-3 text-[11px] text-theme-muted/60">No spam. Unsubscribe anytime.</p>
      </div>
    </motion.div>
  );
}

// ── Empty State ───────────────────────────────────────
function EmptyState({ setSearch, setActiveCat }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center py-24 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-surface-muted">
        <Search className="h-10 w-10 text-theme-muted" />
      </div>
      <h2 className="mt-6 font-sans text-xl font-semibold text-theme-primary">No articles found</h2>
      <p className="mt-2 text-sm text-theme-muted">Try adjusting your search or filter to find what you&rsquo;re looking for.</p>
      <Button variant="ghost" size="sm" className="mt-5" onClick={() => { setSearch(''); setActiveCat(null); }}>
        Clear All Filters
      </Button>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────
export default function BlogPage() {
  const { articles, categories, authors } = useBlog();
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState(null);

  const filtered = articles.filter((a) => {
    if (search) {
      const q = search.toLowerCase();
      if (!a.title.toLowerCase().includes(q) && !a.excerpt?.toLowerCase().includes(q)) return false;
    }
    if (activeCat && a.category !== activeCat) return false;
    return true;
  });

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESC} path="/blog" schema={[BREADCRUMB]} />
      <main ref={ref}>
        {/* ── Hero ───────────────────────────────────── */}
        <Hero search={search} setSearch={setSearch} inView={inView} />

        {/* ── Sticky Category Bar ────────────────────── */}
        <CategoryBar categories={categories} activeCat={activeCat} setActiveCat={setActiveCat} />

        {/* ── Content Area ───────────────────────────── */}
        <section className="py-12 lg:py-20">
          <Container>
            {filtered.length === 0 ? (
              <EmptyState setSearch={setSearch} setActiveCat={setActiveCat} />
            ) : (
              <div className="grid gap-10 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">
                {/* Main Column */}
                <div className="space-y-10">
                  {/* Featured */}
                  {featured && (
                    <FeaturedCard
                      article={featured}
                      authors={authors}
                      categories={categories}
                      accent={ACCENTS[0]}
                    />
                  )}

                  {/* Article Grid */}
                  {rest.length > 0 && (
                    <>
                      <div className="flex items-center gap-2">
                        <h2 className="font-sans text-lg font-semibold text-theme-primary">Latest Articles</h2>
                        <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[11px] font-medium text-theme-muted">{rest.length}</span>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        {rest.map((article, i) => (
                          <ArticleCard
                            key={article.id}
                            article={article}
                            index={i}
                            categories={categories}
                            authors={authors}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                  <TrendingPosts articles={articles} categories={categories} authors={authors} />

                  {/* Topics Cloud */}
                  <div className="rounded-2xl border border-theme-muted bg-surface-raised/60 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="h-4 w-4 text-accent-400" />
                      <h3 className="font-sans text-sm font-semibold text-theme-primary">Topics</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((c, i) => {
                        const acc = ACCENTS[i % ACCENTS.length];
                        const count = articles.filter((a) => a.category === c.id).length;
                        return (
                          <button
                            key={c.id}
                            onClick={() => setActiveCat(activeCat === c.slug ? null : c.slug)}
                            className={cn(
                              'rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all duration-200',
                              activeCat === c.slug
                                ? 'text-white'
                                : 'text-theme-muted hover:text-theme-primary'
                            )}
                            style={activeCat === c.slug ? { background: `linear-gradient(135deg, ${acc.from}, ${acc.to})` } : { background: `${acc.from}0a` }}
                          >
                            {c.label} <span className="opacity-60 ml-0.5">{count}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="rounded-2xl border border-theme-muted bg-surface-raised/60 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <h3 className="font-sans text-sm font-semibold text-theme-primary">Explore</h3>
                    </div>
                    <div className="space-y-0.5">
                      {[
                        { label: 'Security Services', href: '/services' },
                        { label: 'Industries We Serve', href: '/industries' },
                        { label: 'Request a Quote', href: '/quote' },
                        { label: 'Company Catalog', href: '/catalog' },
                        { label: 'Contact Us', href: '/contact' },
                      ].map((link) => (
                        <Link key={link.href} to={link.href} className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-theme-muted transition-all hover:bg-surface-muted/60 hover:text-theme-primary group">
                          {link.label}
                          <ChevronRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </Container>
        </section>

        {/* ── Newsletter ──────────────────────────────── */}
        <section className="pb-16 lg:pb-24">
          <Container size="small">
            <NewsletterCTA />
          </Container>
        </section>
      </main>
    </>
  );
}
