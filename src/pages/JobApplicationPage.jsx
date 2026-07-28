import { useState, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2, Upload } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { breadcrumbSchema } from '@/config/seo';
import { cn } from '@/utils/cn';
import { JOBS } from '@/data/careers';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

export default function JobApplicationPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [form, setForm] = useState({ name: '', email: '', phone: '', nationality: '', location: '', experience: '', cv: null, coverLetter: '', consent: false });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const { jobId } = useParams();
  const job = JOBS.find((j) => j.id === jobId);

  if (!job) { return <Navigate to="/careers" replace />; }

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) { e.name = 'Full name is required.'; }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { e.email = 'Valid email is required.'; }
    if (form.phone && !/^[+\d][\d\s\-()]{6,20}$/.test(form.phone)) { e.phone = 'Valid phone number please.'; }
    if (!form.consent) { e.consent = 'You must agree to the privacy terms.'; }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) { return; }
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  const inputCls = (f) => cn('w-full rounded-xl border bg-surface-root/60 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-accent-500 focus:ring-accent-500/20 focus:ring-2 focus:outline-none transition-colors', errors[f] ? 'border-danger-500/50' : 'border-theme');

  const PAGE_TITLE = `Apply for ${job.title} — ALQUDABEA Careers`;
  const BREADCRUMB = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Careers', url: '/careers' }, { name: job.title, url: `/careers/${job.id}` }, { name: 'Apply', url: `/careers/${job.id}/apply` }]);

  return (
    <>
      <SEO title={PAGE_TITLE} description={`Apply for ${job.title} at ALQUDABEA. ${job.location}, Bahrain.`} path={`/careers/${job.id}/apply`} schema={[BREADCRUMB]} />
      <main ref={ref}>
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="from-accent-500/[0.07] via-cyan-500/[0.04] to-surface-root absolute inset-0 bg-gradient-to-br" />
          </div>
          <Container size="small">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: APPLE_EASE }}>
              <Link to={`/careers/${job.id}`} className="text-accent-400 mb-6 inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent-300"><ArrowLeft className="h-4 w-4" /> Back to Job Details</Link>
              <h1 className="font-sans text-3xl font-bold tracking-[-0.02em] lg:text-4xl"><span className="text-gradient">Apply for {job.title}</span></h1>
              <p className="mt-3 text-neutral-400">{job.department} — {job.location}</p>
            </motion.div>

            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass mt-12 rounded-3xl p-10 text-center">
                <div className="bg-success-500/10 border-success-500/20 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border"><CheckCircle2 className="text-success-400 h-8 w-8" /></div>
                <h2 className="mt-6 font-sans text-2xl font-semibold text-neutral-100">Application Submitted</h2>
                <p className="mt-3 max-w-md mx-auto text-sm text-neutral-400">Thank you for your interest. Our HR team will review your application and contact you within 5 business days.</p>
                <Button as={Link} to="/careers" variant="ghost" size="md" className="mt-6">View More Positions</Button>
              </motion.div>
            ) : (
              <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }} className="border-theme bg-surface-root/60 mt-12 rounded-3xl border p-8 lg:p-10" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" required error={errors.name}><input id="name" type="text" required value={form.name} onChange={(e) => handleChange('name', e.target.value)} className={inputCls('name')} placeholder="Your full name" /></Field>
                  <Field label="Email" required error={errors.email}><input id="email" type="email" required value={form.email} onChange={(e) => handleChange('email', e.target.value)} className={inputCls('email')} placeholder="you@email.com" /></Field>
                  <Field label="Phone"><input id="phone" type="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} className={inputCls('phone')} placeholder="+973 XXXX XXXX" /></Field>
                  <Field label="Nationality"><input id="nationality" type="text" value={form.nationality} onChange={(e) => handleChange('nationality', e.target.value)} className={inputCls('nationality')} placeholder="e.g. Bahraini" /></Field>
                  <Field label="Current Location"><input id="location" type="text" value={form.location} onChange={(e) => handleChange('location', e.target.value)} className={inputCls('location')} placeholder="e.g. Manama" /></Field>
                  <Field label="Years of Experience"><input id="experience" type="text" value={form.experience} onChange={(e) => handleChange('experience', e.target.value)} className={inputCls('experience')} placeholder="e.g. 3 years" /></Field>
                  <Field label="CV / Resume" className="sm:col-span-2">
                    <div className="border-theme bg-surface-root/60 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-6 transition-colors hover:border-accent-500/50">
                      <Upload className="text-neutral-600 h-5 w-5 shrink-0" />
                      <span className="text-sm text-neutral-500">Upload your CV (PDF or Word) — Firebase Storage integration ready</span>
                    </div>
                  </Field>
                  <Field label="Cover Letter" className="sm:col-span-2">
                    <textarea id="coverLetter" rows={4} value={form.coverLetter} onChange={(e) => handleChange('coverLetter', e.target.value)} className={inputCls('coverLetter')} placeholder="Tell us why you&rsquo;re the right person for this role..." />
                  </Field>
                  <Field label="" className="sm:col-span-2" error={errors.consent}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={form.consent} onChange={(e) => handleChange('consent', e.target.checked)} className="border-theme bg-surface-root checked:bg-accent-500 mt-0.5 h-4 w-4 rounded" />
                      <span className="text-sm text-neutral-400">I consent to ALQUDABEA processing my personal data for recruitment purposes. <span className="text-danger-400">*</span></span>
                    </label>
                  </Field>
                </div>
                <Button type="submit" size="lg" loading={status === 'loading'} className="mt-8 w-full">
                  {status === 'loading' ? 'Submitting...' : 'Submit Application'} {status !== 'loading' && <Send className="h-4 w-4" />}
                </Button>
              </motion.form>
            )}
          </Container>
        </section>
      </main>
    </>
  );
}

function Field({ label, required, error, children, className }) {
  return (
    <div className={className}>
      {label && <label className="mb-1.5 block font-mono text-xs font-medium text-neutral-400 uppercase">{label}{required && <span className="text-danger-400"> *</span>}</label>}
      {children}
      {error && <p className="mt-1 text-xs text-danger-400">{error}</p>}
    </div>
  );
}
