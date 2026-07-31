import { useState, useRef, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { Search, ArrowRight, FileText, Shield, Building2, Briefcase } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { breadcrumbSchema } from '@/config/seo';
import { cn } from '@/utils/cn';
import { useBlog } from '@/context/BlogContext';
import { JOBS } from '@/data/careers';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

const SERVICES_LIST = [
  'Static Security Guards', 'Mobile Patrol Services', 'Event Security', 'VIP Protection',
  'CCTV Monitoring', 'Access Control', 'Reception Security', 'Industrial Security',
  'Commercial Security', 'Residential Security',
];

const INDUSTRIES_LIST = [
  'Banking & Finance', 'Government & Public Sector', 'Commercial Buildings',
  'Residential Communities', 'Hotels & Hospitality', 'Healthcare Facilities',
  'Industrial Facilities', 'Construction Sites', 'Retail & Shopping', 'Logistics & Warehousing',
];

const BREADCRUMB = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Search', url: '/search' }]);

export default function SearchPage() {
  const { articles: blogArticles } = useBlog();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const [input, setInput] = useState(query);
  const [activeTab, setActiveTab] = useState('all');
  const ref = useRef(null); const inView = useInView(ref, { once: true });

  const results = useMemo(() => {
    if (!query) { return { articles: [], jobs: [], services: [], industries: [] }; }
    const q = query.toLowerCase();
    return {
      articles: blogArticles.filter((a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags?.some((t) => t.toLowerCase().includes(q))),
      jobs: JOBS.filter((j) => j.title.toLowerCase().includes(q) || j.department.toLowerCase().includes(q) || j.description.toLowerCase().includes(q)),
      services: SERVICES_LIST.filter((s) => s.toLowerCase().includes(q)),
      industries: INDUSTRIES_LIST.filter((i) => i.toLowerCase().includes(q)),
    };
  }, [query]);

  const total = results.articles.length + results.jobs.length + results.services.length + results.industries.length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) { setParams({ q: input.trim() }); }
  };

  return (
    <>
      <SEO title="Search — ALQUDABEA" description="Search across security services, industries, careers, and insights." path="/search" schema={[BREADCRUMB]} />
      <main ref={ref}>
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="from-accent-500/[0.07] via-cyan-500/[0.04] to-surface-root absolute inset-0 bg-gradient-to-br" />
          </div>
          <Container size="small">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: APPLE_EASE }}>
              <h1 className="font-sans text-4xl font-bold tracking-[-0.02em] lg:text-5xl"><span className="text-gradient">Search</span></h1>
              <form onSubmit={handleSearch} className="mt-6 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-neutral-600" />
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search services, industries, careers, articles..." className="w-full rounded-xl border border-theme bg-surface-root/60 py-3 pl-11 pr-4 text-base text-neutral-200 placeholder:text-neutral-600 focus:border-accent-500 focus:outline-none" aria-label="Search" />
                </div>
                <Button type="submit" size="lg">Search</Button>
              </form>
            </motion.div>
          </Container>
        </section>

        <section className="pb-20 lg:pb-28">
          <Container size="small">
            {query && (
              <>
                <div className="mb-8 flex items-center gap-2 text-sm text-neutral-500">
                  <span>{total} result{total !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</span>
                  <div className="ml-auto flex gap-2">
                    {['all', 'services', 'industries', 'articles', 'jobs'].map((t) => (
                      <button key={t} onClick={() => setActiveTab(t)} className={cn('rounded-lg px-3 py-1 font-mono text-xs capitalize transition-colors', activeTab === t ? 'bg-accent-500 text-white' : 'text-neutral-500 hover:text-neutral-300')}>{t}</button>
                    ))}
                  </div>
                </div>

                {total === 0 && (
                  <div className="glass rounded-3xl py-16 text-center">
                    <Search className="mx-auto h-12 w-12 text-neutral-700" />
                    <p className="mt-4 font-sans text-lg font-medium text-neutral-400">No results found</p>
                    <p className="mt-1 text-sm text-neutral-600">Try a different search term or browse our services.</p>
                    <Button as={Link} to="/services" variant="ghost" size="sm" className="mt-4">Browse Services</Button>
                  </div>
                )}

                <div className="space-y-8">
                  {(activeTab === 'all' || activeTab === 'services') && results.services.length > 0 && (
                    <div>
                      <h2 className="mb-3 font-sans text-lg font-semibold text-neutral-200"><Shield className="mr-2 inline h-4 w-4 text-accent-400" />Services</h2>
                      <div className="space-y-2">{results.services.map((s) => (<Link key={s} to="/services" className="glass flex items-center justify-between rounded-xl p-4 transition-colors hover:border-accent-500/30"><span className="text-sm text-neutral-300">{s}</span><ArrowRight className="h-4 w-4 text-neutral-600" /></Link>))}</div>
                    </div>
                  )}
                  {(activeTab === 'all' || activeTab === 'industries') && results.industries.length > 0 && (
                    <div>
                      <h2 className="mb-3 font-sans text-lg font-semibold text-neutral-200"><Building2 className="mr-2 inline h-4 w-4 text-accent-400" />Industries</h2>
                      <div className="space-y-2">{results.industries.map((i) => (<Link key={i} to="/industries" className="glass flex items-center justify-between rounded-xl p-4 transition-colors hover:border-accent-500/30"><span className="text-sm text-neutral-300">{i}</span><ArrowRight className="h-4 w-4 text-neutral-600" /></Link>))}</div>
                    </div>
                  )}
                  {(activeTab === 'all' || activeTab === 'articles') && results.articles.length > 0 && (
                    <div>
                      <h2 className="mb-3 font-sans text-lg font-semibold text-neutral-200"><FileText className="mr-2 inline h-4 w-4 text-accent-400" />Articles</h2>
                      <div className="space-y-2">{results.articles.map((a) => (<Link key={a.id} to={`/blog/${a.slug}`} className="glass flex items-center justify-between rounded-xl p-4 transition-colors hover:border-accent-500/30"><span className="text-sm text-neutral-300">{a.title}</span><ArrowRight className="h-4 w-4 text-neutral-600" /></Link>))}</div>
                    </div>
                  )}
                  {(activeTab === 'all' || activeTab === 'jobs') && results.jobs.length > 0 && (
                    <div>
                      <h2 className="mb-3 font-sans text-lg font-semibold text-neutral-200"><Briefcase className="mr-2 inline h-4 w-4 text-accent-400" />Careers</h2>
                      <div className="space-y-2">{results.jobs.map((j) => (<Link key={j.id} to={`/careers/${j.id}`} className="glass flex items-center justify-between rounded-xl p-4 transition-colors hover:border-accent-500/30"><span className="text-sm text-neutral-300">{j.title} — {j.department}</span><ArrowRight className="h-4 w-4 text-neutral-600" /></Link>))}</div>
                    </div>
                  )}
                </div>
              </>
            )}
            {!query && (
              <div className="glass rounded-3xl py-16 text-center">
                <Search className="mx-auto h-12 w-12 text-neutral-600" />
                <p className="mt-4 font-sans text-lg font-medium text-neutral-400">Search across the entire website</p>
                <p className="mt-1 text-sm text-neutral-600">Find services, industries, career opportunities, and security insights.</p>
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  );
}
