import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Search, MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { SITE_URL, breadcrumbSchema } from '@/config/seo';
import { CULTURE, BENEFITS, HIRING_PROCESS, JOBS, JOB_FILTERS } from '@/data/careers';
import { sectionHeaderReveal, cardReveal, staggerContainer, APPLE_EASE } from '@/hooks/useScrollReveal';

const PAGE_TITLE = 'Careers at ALQUDABEA — Join Bahrain\'s Premier Security Team';
const PAGE_DESC = 'Explore security careers at ALQUDABEA SECURITY SERVICES W.L.L. in Bahrain. Security officers, CCTV operators, VIP protection, management roles. Training provided.';
const BREADCRUMB = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Careers', url: '/careers' }]);
const JOB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Careers at ALQUDABEA SECURITY SERVICES W.L.L.',
  numberOfItems: JOBS.length,
  itemListElement: JOBS.map((j, i) => ({
    '@type': 'ListItem', position: i + 1,
    item: {
      '@type': 'JobPosting', title: j.title,
      description: j.description,
      datePosted: j.postedDate,
      employmentType: j.type === 'Full-time' ? 'FULL_TIME' : 'CONTRACTOR',
      hiringOrganization: { '@type': 'Organization', name: 'ALQUDABEA SECURITY SERVICES W.L.L.', sameAs: SITE_URL },
      jobLocation: { '@type': 'Place', address: { addressLocality: j.location, addressCountry: 'BH' } },
    },
  })),
};

export default function CareersPage() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [type, setType] = useState('All Types');
  const [dept, setDept] = useState('All Departments');

  const filtered = useMemo(() => JOBS.filter((j) => {
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.department.toLowerCase().includes(search.toLowerCase())) { return false; }
    if (location !== 'All Locations' && j.location !== location) { return false; }
    if (type !== 'All Types' && j.type !== type) { return false; }
    if (dept !== 'All Departments' && j.department !== dept) { return false; }
    return true;
  }), [search, location, type, dept]);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' });

  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESC} path="/careers" schema={[BREADCRUMB, JOB_SCHEMA]} />
      <main>
        {/* Hero */}
        <section ref={heroRef} className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="from-accent-500/[0.07] via-cyan-500/[0.04] to-surface-root absolute inset-0 bg-gradient-to-br" />
            <div className="to-surface-root absolute top-0 left-1/2 h-[700px] w-[900px] -translate-x-1/2 bg-gradient-to-b from-accent-500/[0.06] via-accent-500/[0.03] to-transparent blur-3xl" />
          </div>
          <Container>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: APPLE_EASE }} className="mx-auto max-w-3xl text-center">
              <span className="text-accent-400 mb-4 inline-block font-mono text-xs font-medium tracking-[0.2em] uppercase">{CULTURE.badge}</span>
              <h1 className="font-sans text-4xl font-bold tracking-[-0.02em] lg:text-6xl">
                <span className="text-gradient">Careers at ALQUDABEA</span>
                <span className="mt-3 block text-balance text-2xl bg-gradient-to-r from-neutral-300 to-neutral-500 bg-clip-text text-transparent lg:mt-4 lg:text-4xl">{CULTURE.heading}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 lg:text-lg">{CULTURE.description}</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button as="a" href="#open-positions" size="lg">View Open Positions <ArrowRight className="h-4 w-4" /></Button>
                <Button as={Link} to="/about" variant="ghost" size="lg">About ALQUDABEA</Button>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Benefits */}
        <BenefitsSection />
        {/* Hiring Process */}
        <ProcessSection />
        {/* Open Positions */}
        <PositionsSection jobs={filtered} search={search} setSearch={setSearch} location={location} setLocation={setLocation} type={type} setType={setType} dept={dept} setDept={setDept} />
      </main>
    </>
  );
}

function BenefitsSection() {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="bg-surface-muted/40 py-20 lg:py-28">
      <Container>
        <motion.div variants={sectionHeaderReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">Why Join Us</span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">Benefits &amp; Culture</h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <motion.div key={b.title} variants={cardReveal} custom={i} className="card-premium group flex flex-col items-center gap-3 p-6 text-center">
              <div className="bg-accent-500/10 border-accent-500/15 group-hover:border-accent-500/30 flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-300">
                <b.icon className="text-accent-400 h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-sans text-sm font-semibold text-neutral-200">{b.title}</h3>
              <p className="text-xs leading-relaxed text-neutral-500">{b.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="py-20 lg:py-28">
      <Container size="small">
        <motion.div variants={sectionHeaderReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">Process</span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">Our Hiring Process</h2>
        </motion.div>
        <div className="space-y-4">
          {HIRING_PROCESS.map((step, i) => (
            <motion.div key={step.step} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.08, ease: APPLE_EASE }} className="glass rounded-2xl flex items-center gap-5 p-5">
              <span className="font-mono text-2xl font-bold text-accent-400">{step.step}</span>
              <div>
                <h3 className="font-sans font-semibold text-neutral-100">{step.title}</h3>
                <p className="text-sm text-neutral-500">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PositionsSection({ jobs, search, setSearch, location, setLocation, type, setType, dept, setDept }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: '-60px' });
  const selectClass = 'rounded-xl border border-theme bg-surface-root/60 px-3 py-2 text-xs text-neutral-300 focus:border-accent-500 focus:outline-none cursor-pointer appearance-none';

  return (
    <section ref={ref} id="open-positions" className="bg-surface-muted/40 py-20 lg:py-28">
      <Container>
        <motion.div variants={sectionHeaderReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-accent-400 font-mono text-xs font-medium tracking-[0.2em] uppercase">Opportunities</span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-neutral-100 lg:text-4xl">Open Positions</h2>
        </motion.div>
        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="mb-10 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-600" aria-hidden="true" />
            <input type="text" placeholder="Search positions..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-theme bg-surface-root/60 py-2.5 pl-10 pr-4 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-accent-500 focus:outline-none" aria-label="Search jobs" />
          </div>
          <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass} aria-label="Filter by location">
            {JOB_FILTERS.locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass} aria-label="Filter by type">
            {JOB_FILTERS.types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={dept} onChange={(e) => setDept(e.target.value)} className={selectClass} aria-label="Filter by department">
            {JOB_FILTERS.departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </motion.div>

        {jobs.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="glass rounded-3xl py-16 text-center">
            <Briefcase className="mx-auto h-10 w-10 text-neutral-700" aria-hidden="true" />
            <p className="mt-4 font-sans text-lg font-medium text-neutral-400">No positions match your filters</p>
            <p className="mt-1 text-sm text-neutral-600">Try adjusting your search or browse all departments.</p>
            <Button variant="ghost" size="sm" className="mt-4" onClick={() => { setSearch(''); setLocation('All Locations'); setType('All Types'); setDept('All Departments'); }}>Clear Filters</Button>
          </motion.div>
        ) : (
          <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, i) => (
              <motion.div key={job.id} variants={cardReveal} custom={i}>
                <Link to={`/careers/${job.id}`} className="card-premium group flex h-full flex-col justify-between gap-4 p-5">
                  <div>
                    <span className="font-mono text-[10px] font-medium tracking-wider text-accent-400 uppercase">{job.department}</span>
                    <h3 className="mt-1.5 font-sans font-semibold text-neutral-100 transition-colors group-hover:text-accent-400">{job.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-500 line-clamp-2">{job.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{job.type}</span>
                    <span className="ml-auto inline-flex items-center gap-1 font-medium text-accent-400">Apply <ChevronRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
