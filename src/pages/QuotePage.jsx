import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Send, CheckCircle2, MessageCircle, Mail,
  Building2, Phone, User, MapPin, Clock, FileText,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { breadcrumbSchema } from '@/config/seo';
import { cn } from '@/utils/cn';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

const PAGE_TITLE = 'Request a Security Quote — Alqudabea Security Services';
const PAGE_DESC = 'Get a tailored security quote for your property, facility, or event in Bahrain. Fill in your requirements and receive a response within 24 hours.';
const BREADCRUMB = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Request Quote', url: '/quote' }]);

const SERVICE_TYPES = [
  'Select Service Type',
  'Static Security Guards',
  'Mobile Patrol Services',
  'CCTV Surveillance & Monitoring',
  'Alarm Response Services',
  'Event Security',
  'Access Control Systems',
  'Executive Protection / Bodyguard',
  'Multiple Services',
];

const PROPERTY_TYPES = [
  'Select Property Type',
  'Government Building',
  'Corporate Office',
  'Residential Community',
  'Shopping Centre / Retail',
  'Hotel / Hospitality',
  'Healthcare Facility',
  'Educational Institution',
  'Industrial Site / Warehouse',
  'Construction Site',
  'Private Residence / Villa',
  'Other',
];

const COVERAGE_OPTIONS = [
  'Select Coverage',
  '8 Hours (Day Shift)',
  '8 Hours (Night Shift)',
  '12 Hours',
  '24/7 Full Coverage',
  'Event-Based / Temporary',
  'Not Sure — Need Assessment',
];

export default function QuotePage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', company: '', phone: '', email: '',
    service: '', propertyType: '', propertyAddress: '',
    coverage: '', startDate: '', message: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!form.name.trim() || !form.phone.trim()) {
        const e = {};
        if (!form.name.trim()) { e.name = 'Name is required.'; }
        if (!form.phone.trim()) { e.phone = 'Phone is required.'; }
        setErrors(e);
        return;
      }
    }
    if (step === 2) {
      if (!form.service || form.service === 'Select Service Type') { setErrors({ service: 'Please select a service.' }); return; }
      if (!form.propertyType || form.propertyType === 'Select Property Type') { setErrors({ propertyType: 'Please select a property type.' }); return; }
      if (!form.coverage || form.coverage === 'Select Coverage') { setErrors({ coverage: 'Please select coverage.' }); return; }
    }
    setErrors({});
    setStep(3);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const buildWhatsAppMsg = () => [
    '*Security Quote Request*%0A%0A',
    `*Name:* ${form.name}%0A`,
    `*Phone:* ${form.phone}%0A`,
    form.company ? `*Company:* ${form.company}%0A` : '',
    form.email ? `*Email:* ${form.email}%0A` : '',
    `*Service:* ${form.service}%0A`,
    `*Property:* ${form.propertyType}%0A`,
    `*Address:* ${form.propertyAddress || 'Not provided'}%0A`,
    `*Coverage:* ${form.coverage}%0A`,
    form.startDate ? `*Start Date:* ${form.startDate}%0A` : '',
    form.message ? `*Message:* ${form.message}%0A` : '',
    '%0A_Sent via Alqudabea Security Services_',
  ].join('');

  const buildEmailBody = () => [
    'Security Quote Request%0D%0A%0D%0A',
    `Name: ${form.name}%0D%0A`,
    `Phone: ${form.phone}%0D%0A`,
    form.company ? `Company: ${form.company}%0D%0A` : '',
    form.email ? `Email: ${form.email}%0D%0A` : '',
    `Service: ${form.service}%0D%0A`,
    `Property Type: ${form.propertyType}%0D%0A`,
    `Address: ${form.propertyAddress || 'Not provided'}%0D%0A`,
    `Coverage: ${form.coverage}%0D%0A`,
    form.startDate ? `Start Date: ${form.startDate}%0D%0A` : '',
    form.message ? `Message: ${form.message}%0D%0A` : '',
  ].join('');

  const inputCls = (f) => cn(
    'w-full rounded-xl border bg-surface-root/60 px-4 py-3 text-sm text-theme-primary placeholder:text-neutral-500',
    'focus:border-accent-500 focus:ring-accent-500/20 focus:ring-2 focus:outline-none transition-all duration-200',
    errors[f] ? 'border-danger-500/50' : 'border-theme',
  );

  const selectCls = (f) => cn(inputCls(f), 'appearance-none cursor-pointer');

  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESC} path="/quote" schema={[BREADCRUMB]} />
      <main ref={ref}>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="from-accent-500/[0.07] via-cyan-500/[0.04] to-surface-root absolute inset-0 bg-gradient-to-br" />
            <div className="to-surface-root absolute top-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 bg-gradient-to-b from-accent-500/[0.06] to-transparent blur-3xl" />
          </div>
          <Container size="small">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: APPLE_EASE }} className="mx-auto max-w-2xl text-center">
              <span className="text-accent-400 mb-4 inline-block font-mono text-xs font-medium tracking-[0.2em] uppercase">Get a Quote</span>
              <h1 className="font-sans text-4xl font-bold tracking-[-0.02em] lg:text-5xl">
                <span className="text-gradient">Request a Security Quote</span>
                <span className="mt-3 block text-balance text-xl bg-gradient-to-r from-neutral-300 to-neutral-500 bg-clip-text text-transparent lg:text-2xl">
                  Tell us your requirements — we&rsquo;ll respond within 24 hours
                </span>
              </h1>
            </motion.div>
          </Container>
        </section>

        {/* Form Section */}
        <section className="pb-20 lg:pb-28">
          <Container size="small">
            {submitted ? (
              /* ── Success State ───────────────────── */
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass mx-auto max-w-xl rounded-3xl p-10 text-center">
                <div className="bg-success-500/10 border-success-500/20 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border">
                  <CheckCircle2 className="text-success-400 h-8 w-8" />
                </div>
                <h2 className="mt-6 font-sans text-2xl font-semibold text-neutral-100">Quote Request Ready!</h2>
                <p className="mt-3 text-sm text-neutral-400">Your security quote details are ready. Choose how you&rsquo;d like to send it:</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/97377907878?text=${buildWhatsAppMsg()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-green-500/30 p-6 transition-all duration-300 hover:border-green-500/60 hover:shadow-lg"
                    style={{ background: 'linear-gradient(160deg, rgba(34,197,94,0.12), rgba(34,197,94,0.04))' }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 border border-green-500/30">
                      <MessageCircle className="h-6 w-6 text-green-400" />
                    </div>
                    <span className="font-sans text-sm font-semibold text-neutral-200">Send via WhatsApp</span>
                    <span className="text-xs text-neutral-500">Fastest response</span>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:security@alqudabeasecurity.online?subject=Security Quote Request - ${form.name}&body=${buildEmailBody()}`}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-blue-500/30 p-6 transition-all duration-300 hover:border-blue-500/60 hover:shadow-lg"
                    style={{ background: 'linear-gradient(160deg, rgba(59,130,246,0.12), rgba(59,130,246,0.04))' }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/30">
                      <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="font-sans text-sm font-semibold text-neutral-200">Send via Email</span>
                    <span className="text-xs text-neutral-500">Formal quotation</span>
                  </a>
                </div>

                <button onClick={() => setSubmitted(false)} className="text-accent-400 mt-6 text-sm font-medium hover:text-accent-300 transition-colors">
                  Edit Details
                </button>
              </motion.div>
            ) : (
              /* ── Form ──────────────────────────── */
              <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="glass mx-auto max-w-2xl rounded-3xl p-8 lg:p-10">
                {/* Steps indicator */}
                <div className="mb-8 flex items-center justify-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all',
                        step >= s ? 'bg-accent-500 text-white' : 'bg-surface-raised text-neutral-600',
                      )}>{s}</div>
                      {s < 3 && <div className={cn('h-0.5 w-8 rounded', step > s ? 'bg-accent-500' : 'bg-surface-raised')} />}
                    </div>
                  ))}
                </div>
                <p className="mb-8 text-center font-mono text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  {step === 1 ? 'Your Details' : step === 2 ? 'Security Requirements' : 'Additional Info'}
                </p>

                {step === 1 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" required error={errors.name}>
                      <div className="relative"><User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" /><input type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} className={cn(inputCls('name'), 'pl-10')} placeholder="Your full name" /></div>
                    </Field>
                    <Field label="Phone Number" required error={errors.phone}>
                      <div className="relative"><Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" /><input type="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} className={cn(inputCls('phone'), 'pl-10')} placeholder="+973 XXXX XXXX" /></div>
                    </Field>
                    <Field label="Company / Organisation">
                      <div className="relative"><Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" /><input type="text" value={form.company} onChange={(e) => handleChange('company', e.target.value)} className={cn(inputCls('company'), 'pl-10')} placeholder="Your company name" /></div>
                    </Field>
                    <Field label="Email">
                      <div className="relative"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" /><input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} className={cn(inputCls('email'), 'pl-10')} placeholder="you@company.com" /></div>
                    </Field>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Service Required" required error={errors.service} className="sm:col-span-2">
                      <select value={form.service} onChange={(e) => handleChange('service', e.target.value)} className={selectCls('service')}>
                        {SERVICE_TYPES.map((s) => <option key={s} value={s} className="bg-surface-root">{s}</option>)}
                      </select>
                    </Field>
                    <Field label="Property Type" required error={errors.propertyType}>
                      <select value={form.propertyType} onChange={(e) => handleChange('propertyType', e.target.value)} className={selectCls('propertyType')}>
                        {PROPERTY_TYPES.map((p) => <option key={p} value={p} className="bg-surface-root">{p}</option>)}
                      </select>
                    </Field>
                    <Field label="Coverage Hours" required error={errors.coverage}>
                      <select value={form.coverage} onChange={(e) => handleChange('coverage', e.target.value)} className={selectCls('coverage')}>
                        {COVERAGE_OPTIONS.map((c) => <option key={c} value={c} className="bg-surface-root">{c}</option>)}
                      </select>
                    </Field>
                    <Field label="Property Address" className="sm:col-span-2">
                      <div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-neutral-600" /><textarea rows={2} value={form.propertyAddress} onChange={(e) => handleChange('propertyAddress', e.target.value)} className={cn(inputCls('propertyAddress'), 'pl-10 resize-none')} placeholder="Property location in Bahrain" /></div>
                    </Field>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Required Start Date">
                      <div className="relative"><Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" /><input type="date" value={form.startDate} onChange={(e) => handleChange('startDate', e.target.value)} className={cn(inputCls('startDate'), 'pl-10')} /></div>
                    </Field>
                    <Field label="Additional Message" className="sm:col-span-2">
                      <div className="relative"><FileText className="absolute left-3 top-3 h-4 w-4 text-neutral-600" /><textarea rows={4} value={form.message} onChange={(e) => handleChange('message', e.target.value)} className={cn(inputCls('message'), 'pl-10 resize-y')} placeholder="Tell us about your specific security needs, number of guards required, special requirements..." /></div>
                    </Field>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex items-center justify-between gap-4">
                  {step > 1 ? (
                    <Button variant="ghost" size="md" onClick={() => setStep(step - 1)}>
                      <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                  ) : <div />}
                  {step < 3 ? (
                    <Button size="lg" onClick={handleNext} className="ml-auto">
                      Continue <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="lg" onClick={handleSubmit} className="ml-auto">
                      Generate Quote <Send className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
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
