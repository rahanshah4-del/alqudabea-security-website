import { useState, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Search, Clock, ChevronRight, Mail, Calendar, Sparkles, BookOpen } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { breadcrumbSchema } from '@/config/seo';
import { cn } from '@/utils/cn';
import { ARTICLES, BLOG_CATEGORIES, AUTHORS } from '@/data/blog';
import { cardReveal, staggerContainer, APPLE_EASE } from '@/hooks/useScrollReveal';

const PAGE_TITLE = 'Security Insights & Updates — ALQUDABEA Blog';
const PAGE_DESC = 'Expert security insights, industry updates, regulatory guidance, and career advice from ALQUDABEA SECURITY SERVICES W.L.L.';
const BREADCRUMB = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]);

const CATEGORY_COLORS = {
  'technology': { from: '#3B82F6', to: '#1D4ED8', glow: 'rgba(59,130,246,0.3)' },
  'security-tips': { from: '#10B981', to: '#047857', glow: 'rgba(16,185,129,0.3)' },
  'industry-insights': { from: '#8B5CF6', to: '#6D28D9', glow: 'rgba(139,92,246,0.3)' },
  'bahrain-regulations': { from: '#F59E0B', to: '#B45309', glow: 'rgba(245,158,11,0.3)' },
  'company-news': { from: '#06B6D4', to: '#0E7490', glow: 'rgba(6,182,212,0.3)' },
  'career-advice': { from: '#F43F5E', to: '#BE123C', glow: 'rgba(244,63,94,0.3)' },
};

const CARD_ACCENTS = [
  { from: '#3B82F6', to: '#1D4ED8', glow: 'rgba(59,130,246,0.25)' },
  { from: '#10B981', to: '#047857', glow: 'rgba(16,185,129,0.25)' },
  { from: '#8B5CF6', to: '#6D28D9', glow: 'rgba(139,92,246,0.25)' },
  { from: '#F59E0B', to: '#B45309', glow: 'rgba(245,158,11,0.25)' },
  { from: '#06B6D4', to: '#0E7490', glow: 'rgba(6,182,212,0.25)' },
  { from: '#F43F5E', to: '#BE123C', glow: 'rgba(244,63,94,0.25)' },
  { from: '#6366F1', to: '#4338CA', glow: 'rgba(99,102,241,0.25)' },
  { from: '#0EA5E9', to: '#0369A1', glow: 'rgba(14,165,233,0.25)' },
];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState(null);

  const filtered = ARTICLES.filter((a) => {
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.excerpt.toLowerCase().includes(search.toLowerCase())) { return false; }
    if (activeCat && a.category !== activeCat) { return false; }
    return true;
  });

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESC} path="/blog" schema={[BREADCRUMB]} />
      <main>
        {/* Hero */}
        <section ref={ref} className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="from-accent-500/[0.07] via-cyan-500/[0.04] to-surface-root absolute inset-0 bg-gradient-to-br" />
            <div className="to-surface-root absolute top-0 left-1/2 h-[700px] w-[900px] -translate-x-1/2 bg-gradient-to-b from-accent-500/[0.06] via-accent-500/[0.03] to-transparent blur-3xl" />
          </div>
          <Container>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: APPLE_EASE }} className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-mono text-[0.6875rem] font-medium tracking-[0.15em] text-neutral-400 uppercase">Insights</span>
              </span>
              <h1 className="mt-6 font-sans text-4xl font-bold tracking-[-0.02em] lg:text-6xl">
                <span className="text-gradient">Security Insights</span>
                <span className="mt-3 block text-balance text-2xl bg-gradient-to-r from-neutral-300 to-neutral-500 bg-clip-text text-transparent lg:mt-4 lg:text-4xl">Expert perspectives from Bahrain&rsquo;s security leader</span>
              </h1>
              <div className="mt-8 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-600" />
                  <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-theme bg-surface-root/60 py-3 pl-10 pr-4 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-accent-500 focus:outline-none" />
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Categories */}
        <section className="border-theme-muted border-b py-4">
          <Container>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setActiveCat(null)} className={cn('rounded-lg px-3.5 py-2 font-sans text-xs font-medium transition-all duration-200', !activeCat ? 'bg-accent-500 text-white shadow-glow-accent' : 'text-neutral-400 hover:text-neutral-200 hover:bg-surface-raised')}>All Articles</button>
              {BLOG_CATEGORIES.map((c) => {
                const cc = CATEGORY_COLORS[c.slug];
                const isActive = activeCat === c.slug;
                return (
                  <button key={c.id} onClick={() => setActiveCat(isActive ? null : c.slug)} className={cn('rounded-lg px-3.5 py-2 font-sans text-xs font-medium transition-all duration-200', isActive ? 'text-white shadow-lg' : 'text-neutral-400 hover:text-neutral-200 hover:bg-surface-raised')} style={isActive && cc ? { background: `linear-gradient(135deg, ${cc.from}, ${cc.to})` } : {}}>
                    {c.label}
                  </button>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Featured + Grid */}
        <section className="py-16 lg:py-24">
          <Container>
            {featured && (() => {
              const fc = CATEGORY_COLORS[featured.category] || CATEGORY_COLORS.technology;
              const author = AUTHORS[featured.author];
              return (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
                  <Link to={`/blog/${featured.slug}`} className="group relative grid gap-0 overflow-hidden rounded-3xl border border-white/[0.06] transition-all duration-400 hover:border-white/[0.12] hover:shadow-2xl lg:grid-cols-5" style={{ background: `linear-gradient(160deg, ${fc.from}08, ${fc.to}03)` }}>
                    {/* Left visual */}
                    <div className="relative flex items-center justify-center overflow-hidden p-10 lg:col-span-2" style={{ background: `linear-gradient(160deg, ${fc.from}15, ${fc.to}08)` }}>
                      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl" style={{ background: fc.from, opacity: 0.3 }} />
                      <BookOpen className="relative h-20 w-20 lg:h-28 lg:w-28" style={{ color: fc.from, opacity: 0.5 }} />
                    </div>
                    {/* Right content */}
                    <div className="flex flex-col justify-center p-8 lg:col-span-3 lg:p-12">
                      <span className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.2em] uppercase" style={{ color: fc.from }}>Featured</span>
                      <h2 className="mt-3 font-sans text-2xl font-bold tracking-[-0.01em] text-neutral-100 transition-colors duration-300 group-hover:text-white lg:text-3xl">{featured.title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-500 line-clamp-3">{featured.excerpt}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-600">
                        {author && <span className="inline-flex items-center gap-1.5"><span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: `${fc.from}20`, color: fc.from }}>{author.avatar}</span>{author.name}</span>}
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readTime}</span>
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{featured.publishedDate}</span>
                      </div>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5" style={{ color: fc.from }}>Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                    </div>
                  </Link>
                </motion.div>
              );
            })()}

            {rest.length > 0 && (
              <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article, i) => {
                  const ac = CARD_ACCENTS[i % CARD_ACCENTS.length];
                  const cat = BLOG_CATEGORIES.find((c) => c.slug === article.category);
                  return (
                    <motion.div key={article.id} variants={cardReveal} custom={i}>
                      <Link
                        to={`/blog/${article.slug}`}
                        className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.06] p-5 transition-all duration-400"
                        style={{ background: `linear-gradient(160deg, ${ac.from}08, ${ac.to}03)` }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `${ac.from}50`;
                          e.currentTarget.style.boxShadow = `0 0 30px ${ac.glow}, 0 8px 24px rgba(0,0,0,0.25)`;
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.background = `linear-gradient(160deg, ${ac.from}15, ${ac.to}08)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                          e.currentTarget.style.boxShadow = '';
                          e.currentTarget.style.transform = '';
                          e.currentTarget.style.background = `linear-gradient(160deg, ${ac.from}08, ${ac.to}03)`;
                        }}
                      >
                        <div className="absolute -top-4 -right-4 h-12 w-12 rounded-full opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" style={{ background: ac.from }} />
                        <div className="relative z-10">
                          {cat && <span className="font-mono text-[10px] font-medium tracking-wider uppercase" style={{ color: ac.from }}>{cat.label}</span>}
                          <h3 className="mt-2 font-sans text-base font-bold tracking-[-0.01em] text-neutral-100 transition-colors duration-300 group-hover:text-white line-clamp-2">{article.title}</h3>
                          <p className="mt-2 text-xs leading-relaxed text-neutral-500 line-clamp-3">{article.excerpt}</p>
                        </div>
                        <div className="relative z-10 mt-auto flex items-center gap-3 text-xs text-neutral-600">
                          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                          <span>{article.publishedDate}</span>
                          <span className="ml-auto inline-flex items-center gap-1 font-medium transition-all duration-300 group-hover:gap-1.5" style={{ color: ac.from }}>Read <ChevronRight className="h-3.5 w-3.5" /></span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {filtered.length === 0 && (
              <div className="glass rounded-3xl py-16 text-center">
                <Search className="mx-auto h-12 w-12 text-neutral-700" />
                <p className="mt-4 font-sans text-lg font-medium text-neutral-400">No articles found</p>
                <p className="mt-1 text-sm text-neutral-600">Try a different search term or browse all categories.</p>
                <Button variant="ghost" size="sm" className="mt-5" onClick={() => { setSearch(''); setActiveCat(null); }}>Clear All Filters</Button>
              </div>
            )}
          </Container>
        </section>

        {/* Newsletter */}
        <section className="bg-surface-muted/40 py-16 lg:py-24">
          <Container size="small">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] p-10 text-center lg:p-14" style={{ background: 'linear-gradient(160deg, rgba(59,130,246,0.06), rgba(139,92,246,0.04), rgba(6,182,212,0.03))' }}>
              <div className="pointer-events-none absolute top-0 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: 'rgba(59,130,246,0.08)' }} />
              <div className="relative">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border" style={{ background: 'rgba(59,130,246,0.15)', borderColor: 'rgba(59,130,246,0.2)' }}>
                  <Mail className="h-7 w-7 text-blue-400" />
                </div>
                <h2 className="mt-5 font-sans text-2xl font-bold tracking-[-0.01em] text-neutral-100 lg:text-3xl">Stay Informed</h2>
                <p className="mt-2 text-sm text-neutral-500">Get the latest security insights, regulatory updates, and expert advice delivered to your inbox.</p>
                <div className="mt-6 mx-auto flex max-w-md gap-2">
                  <input type="email" placeholder="your@email.com" className="flex-1 rounded-xl border border-theme bg-surface-root/60 px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-accent-500 focus:ring-accent-500/20 focus:ring-2 focus:outline-none" />
                  <Button size="lg">Subscribe</Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
