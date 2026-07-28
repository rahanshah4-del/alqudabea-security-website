import { useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Briefcase, CheckCircle2, Send } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { SITE_URL, breadcrumbSchema } from '@/config/seo';
import { cn } from '@/utils/cn';
import { JOBS } from '@/data/careers';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

export default function CareerDetailsPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { jobId } = useParams();
  const job = JOBS.find((j) => j.id === jobId);

  if (!job) { return <Navigate to="/careers" replace />; }

  const PAGE_TITLE = `${job.title} — Careers at ALQUDABEA`;
  const BREADCRUMB = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Careers', url: '/careers' }, { name: job.title, url: `/careers/${job.id}` }]);
  const JOB_SCHEMA = {
    '@context': 'https://schema.org', '@type': 'JobPosting',
    title: job.title, description: job.description, datePosted: job.postedDate,
    employmentType: job.type === 'Full-time' ? 'FULL_TIME' : 'CONTRACTOR',
    hiringOrganization: { '@type': 'Organization', name: 'ALQUDABEA SECURITY SERVICES W.L.L.', sameAs: SITE_URL },
    jobLocation: { '@type': 'Place', address: { addressLocality: job.location, addressCountry: 'BH' } },
    skills: job.skills?.join(', '),
    qualifications: job.requirements?.join(', '),
    jobBenefits: job.benefits?.join(', '),
  };

  return (
    <>
      <SEO title={PAGE_TITLE} description={job.description} path={`/careers/${job.id}`} schema={[BREADCRUMB, JOB_SCHEMA]} />
      <main ref={ref}>
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="from-accent-500/[0.07] via-cyan-500/[0.04] to-surface-root absolute inset-0 bg-gradient-to-br" />
            <div className="to-surface-root absolute top-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 bg-gradient-to-b from-accent-500/[0.06] to-transparent blur-3xl" />
          </div>
          <Container size="small">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: APPLE_EASE }}>
              <Link to="/careers" className="text-accent-400 mb-6 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent-300">
                <ArrowLeft className="h-4 w-4" /> Back to Careers
              </Link>
              <span className="font-mono text-xs font-medium tracking-[0.2em] text-accent-400 uppercase">{job.department}</span>
              <h1 className="mt-3 font-sans text-3xl font-bold tracking-[-0.02em] lg:text-5xl">
                <span className="text-gradient">{job.title}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400">{job.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-400">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent-400" />{job.location}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-accent-400" />{job.type}</span>
                <span className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-accent-400" />{job.experience}</span>
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="pb-20 lg:pb-28">
          <Container size="small">
            <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
              <div className="space-y-12">
                <ListSection title="Responsibilities" items={job.responsibilities} icon={CheckCircle2} iconClass="text-success-400" />
                <ListSection title="Requirements" items={job.requirements} icon={CheckCircle2} iconClass="text-accent-400" />
                <ListSection title="Benefits" items={job.benefits} icon={CheckCircle2} iconClass="text-cyan-400" />
                {job.skills && (
                  <div>
                    <h2 className="font-sans text-xl font-semibold text-neutral-100">Skills</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.skills.map((s) => (<span key={s} className="bg-accent-500/10 border-accent-500/15 rounded-lg border px-3 py-1.5 font-mono text-xs text-accent-400">{s}</span>))}
                    </div>
                  </div>
                )}
                <div>
                  <h2 className="font-sans text-xl font-semibold text-neutral-100">Working Hours</h2>
                  <p className="mt-2 text-sm text-neutral-400">{job.workingHours}</p>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="glass sticky top-24 rounded-2xl p-6">
                  <h3 className="font-sans font-semibold text-neutral-100">Interested?</h3>
                  <p className="mt-2 text-sm text-neutral-500">Apply now and join Bahrain&rsquo;s premier security team.</p>
                  <Button as={Link} to={`/careers/${job.id}/apply`} size="lg" className="mt-5 w-full">
                    Apply Now <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:hidden">
              <Button as={Link} to={`/careers/${job.id}/apply`} size="lg" className="w-full">
                Apply Now <Send className="h-4 w-4" />
              </Button>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}

function ListSection({ title, items, icon: Icon, iconClass }) {
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-neutral-100">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', iconClass)} aria-hidden="true" />
            <span className="text-sm text-neutral-400">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
