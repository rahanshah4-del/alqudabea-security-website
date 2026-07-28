import { useState } from 'react';
import { TrendingUp, Users, Target, MessageCircle, Mail, Phone, Plus, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react';
import { SEO } from '@/components/SEO';

const LEADS = [
  { id: 'L-001', company: 'Gulf Air', contact: 'Khalid Al Ansari', phone: '+973 1733 7777', email: 'khalid@gulfair.com', source: 'Website', stage: 'Proposal Sent', value: 'BD 52,000', probability: '70%' },
  { id: 'L-002', company: 'BAPCO', contact: 'Nasser Al Dossari', phone: '+973 1775 5555', email: 'nasser@bapco.bh', source: 'Referral', stage: 'Negotiation', value: 'BD 85,000', probability: '50%' },
  { id: 'L-003', company: 'Bahrain Mall', contact: 'Mariam Al Khalifa', phone: '+973 1722 3333', email: 'mariam@bmall.bh', source: 'LinkedIn', stage: 'Qualified', value: 'BD 22,000', probability: '40%' },
  { id: 'L-004', company: 'AMH Hospital', contact: 'Dr. Ali Redha', phone: '+973 1725 8888', email: 'ali@amh.bh', source: 'WhatsApp', stage: 'Contacted', value: 'BD 38,000', probability: '30%' },
  { id: 'L-005', company: 'Al Moayyed Tower', contact: 'Yusuf Ahmed', phone: '+973 1711 2222', email: 'yusuf@almoayyed.bh', source: 'Website', stage: 'New Lead', value: 'BD 15,000', probability: '20%' },
];

const STAGES = ['New Lead', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];
const PIPELINE = STAGES.map((s) => ({ stage: s, count: LEADS.filter((l) => l.stage === s).length, value: LEADS.filter((l) => l.stage === s).reduce((sum, l) => sum + parseInt(l.value.replace(/[^0-9]/g, '')), 0) }));

export default function MarketingPage() {
  const [tab, setTab] = useState('pipeline');
  return (
    <div className="space-y-6">
      <SEO title="Marketing CRM — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Marketing CRM</h1><p className="mt-1 text-sm text-theme-muted">Leads, pipeline &amp; campaigns</p></div>
        <button className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Add Lead</button>
      </div>

      {/* KPI */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: 'Total Leads', value: '47', color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { icon: Target, label: 'Pipeline Value', value: 'BD 212K', color: 'text-green-400', bg: 'bg-green-500/10' },
          { icon: TrendingUp, label: 'Conversion Rate', value: '34%', color: 'text-violet-400', bg: 'bg-violet-500/10' },
          { icon: BarChart3, label: 'Avg Deal Size', value: 'BD 42K', color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center"><div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div><p className={`mt-2 font-sans text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-[10px] text-theme-muted uppercase tracking-wider">{s.label}</p></div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-theme-muted pb-3">
        {['pipeline', 'leads', 'campaigns', 'roi'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all ${tab === t ? 'bg-accent-500/10 text-accent-400' : 'text-theme-muted hover:text-theme-primary'}`}>{t}</button>
        ))}
      </div>

      {tab === 'pipeline' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {PIPELINE.map((p) => (
            <div key={p.stage} className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center">
              <p className="text-[10px] font-bold text-theme-muted uppercase tracking-wider">{p.stage}</p>
              <p className="mt-2 font-sans text-xl font-bold text-theme-primary">{p.count}</p>
              <p className="text-xs text-theme-muted">BD {p.value.toLocaleString()}</p>
              <div className="mt-2 h-1 rounded-full bg-surface-muted"><div className="h-1 rounded-full bg-accent-500" style={{ width: `${(p.count / LEADS.length) * 100}%` }} /></div>
            </div>
          ))}
        </div>
      )}
      {tab === 'leads' && (
        <div className="overflow-x-auto rounded-2xl border border-theme-muted">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-theme-muted bg-surface-muted/40"><tr>{['Company','Contact','Source','Stage','Value','Probability'].map((h) => <th key={h} className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">{h}</th>)}</tr></thead>
            <tbody>{LEADS.map((l) => (
              <tr key={l.id} className="border-b border-theme-muted hover:bg-surface-muted/40">
                <td className="px-4 py-3 font-medium text-theme-primary">{l.company}</td><td className="px-4 py-3 text-theme-secondary">{l.contact}</td><td className="px-4 py-3 text-theme-secondary">{l.source}</td>
                <td className="px-4 py-3"><span className="rounded-lg bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400">{l.stage}</span></td>
                <td className="px-4 py-3 font-mono text-sm font-bold text-theme-primary">{l.value}</td><td className="px-4 py-3 font-bold text-green-400">{l.probability}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      {tab === 'campaigns' && (
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: MessageCircle, title: 'WhatsApp Campaigns', desc: 'Bulk messaging via WhatsApp Business API. Template-based with personalization.', color: 'text-green-400', bg: 'bg-green-500/10', status: 'Architecture Ready' },
            { icon: Mail, title: 'Email Campaigns', desc: 'Newsletter and drip campaigns. Segmentation, A/B testing, analytics.', color: 'text-blue-400', bg: 'bg-blue-500/10', status: 'Architecture Ready' },
            { icon: Phone, title: 'SMS Campaigns', desc: 'Bulk SMS with scheduling. Opt-in management, delivery reports.', color: 'text-amber-400', bg: 'bg-amber-500/10', status: 'Architecture Ready' },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-theme-muted bg-surface-raised p-6 text-center">
              <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${c.bg}`}><c.icon className={`h-7 w-7 ${c.color}`} /></div>
              <h3 className="mt-4 font-sans font-semibold text-theme-primary">{c.title}</h3>
              <p className="mt-2 text-xs text-theme-muted">{c.desc}</p>
              <span className="mt-3 inline-block rounded-lg bg-accent-500/10 px-3 py-1 text-[10px] font-bold text-accent-400">{c.status}</span>
            </div>
          ))}
        </div>
      )}
      {tab === 'roi' && (
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Campaign ROI', value: '320%', up: true, color: 'text-green-400' },
            { label: 'Cost per Lead', value: 'BD 18', up: false, color: 'text-amber-400' },
            { label: 'Revenue from Marketing', value: 'BD 98K', up: true, color: 'text-blue-400' },
          ].map((r) => (
            <div key={r.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-5 text-center">
              <p className="text-xs text-theme-muted uppercase tracking-wider">{r.label}</p>
              <p className={`mt-2 font-sans text-3xl font-bold ${r.color}`}>{r.value}</p>
              <span className={`text-xs ${r.up ? 'text-green-400' : 'text-amber-400'}`}>{r.up ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />} vs last quarter</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
