import { useState, useEffect } from 'react';
import { TrendingUp, Users, Target, MessageCircle, Mail, Phone, Plus, BarChart3, X, Check, Trash2 } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { MarketingAPI } from '@/firebase/services';

const STAGES = ['New Lead', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];

export default function MarketingPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MarketingAPI.getAll().then((data) => { setLeads(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ company: '', contact: '', phone: '', email: '', source: 'Website', stage: 'New Lead', value: '', probability: '20%' });
  const [tab, setTab] = useState('pipeline');

  const pipeline = STAGES.map((s) => ({ stage: s, count: leads.filter((l) => l.stage === s).length, value: leads.filter((l) => l.stage === s).reduce((sum, l) => sum + parseInt(l.value.replace(/[^0-9]/g, '')), 0) }));
  const totalValue = leads.reduce((sum, l) => sum + parseInt((l.value || '0').replace(/[^0-9]/g, '')), 0);
  const avgDeal = leads.length > 0 ? Math.round(totalValue / leads.length) : 0;
  const wonCount = leads.filter((l) => l.stage === 'Won').length;
  const conversionRate = leads.length > 0 ? `${Math.round((wonCount / leads.length) * 100)}%` : '0%';

  const handleAdd = async () => {
    if (!form.company.trim() || !form.value.trim()) { return; }
    const newId = await MarketingAPI.add(form);
    if (newId) { setLeads((prev) => [...prev, { id: newId, ...form }]); }
    setForm({ company: '', contact: '', phone: '', email: '', source: 'Website', stage: 'New Lead', value: '', probability: '20%' }); setShowForm(false);
  };
  const handleDelete = async (id) => { await MarketingAPI.delete(id); setLeads((prev) => prev.filter((l) => l.id !== id)); };
  const handleStage = async (id) => {
    const lead = leads.find((l) => l.id === id);
    const idx = STAGES.indexOf(lead.stage);
    const next = idx < STAGES.length - 1 ? STAGES[idx + 1] : STAGES[0];
    const newProb = next === 'Won' ? '100%' : next === 'Lost' ? '0%' : lead.probability;
    await MarketingAPI.update(id, { stage: next, probability: newProb });
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, stage: next, probability: newProb } : l));
  };

  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';

  return (
    <div className="space-y-6">
      <SEO title="Marketing CRM — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Marketing CRM</h1><p className="mt-1 text-sm text-theme-muted">{leads.length} leads · BD {totalValue.toLocaleString()} pipeline</p></div>
        <button onClick={() => { setForm({ company: '', contact: '', phone: '', email: '', source: 'Website', stage: 'New Lead', value: '', probability: '20%' }); setShowForm(true); }} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Add Lead</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { icon: Users, label: 'Total Leads', value: leads.length, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { icon: Target, label: 'Pipeline Value', value: `BD ${totalValue.toLocaleString()}`, color: 'text-green-400', bg: 'bg-green-500/10' },
          { icon: TrendingUp, label: 'Conversion Rate', value: conversionRate, color: 'text-violet-400', bg: 'bg-violet-500/10' },
          { icon: BarChart3, label: 'Avg Deal', value: `BD ${avgDeal.toLocaleString()}`, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center"><div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div><p className={`mt-2 font-sans text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-[10px] text-theme-muted uppercase tracking-wider">{s.label}</p></div>
        ))}
      </div>

      <div className="flex gap-2 border-b border-theme-muted pb-3">
        {['pipeline', 'leads', 'campaigns', 'roi'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all ${tab === t ? 'bg-accent-500/10 text-accent-400' : 'text-theme-muted hover:text-theme-primary'}`}>{t}</button>
        ))}
      </div>

      {tab === 'pipeline' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {pipeline.map((p) => (
            <div key={p.stage} className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center">
              <p className="text-[10px] font-bold text-theme-muted uppercase tracking-wider">{p.stage}</p>
              <p className="mt-2 font-sans text-xl font-bold text-theme-primary">{p.count}</p>
              <p className="text-xs text-theme-muted">BD {p.value.toLocaleString()}</p>
              <div className="mt-2 h-1 rounded-full bg-surface-muted"><div className="h-1 rounded-full bg-accent-500" style={{ width: `${leads.length > 0 ? (p.count / leads.length) * 100 : 0}%` }} /></div>
            </div>
          ))}
        </div>
      )}
      {tab === 'leads' && (
        <div className="overflow-x-auto rounded-2xl border border-theme-muted">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-theme-muted bg-surface-muted/40"><tr>{['Company','Contact','Source','Stage','Value','Prob',''].map((h) => <th key={h} className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">{h}</th>)}</tr></thead>
            <tbody>{leads.map((l) => (
              <tr key={l.id} className="border-b border-theme-muted hover:bg-surface-muted/40">
                <td className="px-4 py-3 font-medium text-theme-primary">{l.company}</td><td className="px-4 py-3 text-theme-secondary">{l.contact}</td><td className="px-4 py-3 text-theme-secondary">{l.source}</td>
                <td className="px-4 py-3"><button onClick={() => handleStage(l.id)} className="rounded-lg bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400 hover:bg-blue-500/20">{l.stage}</button></td>
                <td className="px-4 py-3 font-mono text-sm font-bold text-theme-primary">{l.value}</td><td className="px-4 py-3 font-bold text-green-400">{l.probability}</td>
                <td className="px-4 py-3"><button onClick={() => handleDelete(l.id)} className="rounded-lg p-1 text-theme-muted hover:bg-danger-500/10 hover:text-danger-400"><Trash2 className="h-3.5 w-3.5" /></button></td>
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
              <h3 className="mt-4 font-sans font-semibold text-theme-primary">{c.title}</h3><p className="mt-2 text-xs text-theme-muted">{c.desc}</p>
              <span className="mt-3 inline-block rounded-lg bg-accent-500/10 px-3 py-1 text-[10px] font-bold text-accent-400">{c.status}</span>
            </div>
          ))}
        </div>
      )}
      {tab === 'roi' && (
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Campaign ROI', value: leads.length > 0 ? `${Math.round(totalValue / (leads.length * 100))}x` : '—', up: true, color: 'text-green-400' },
            { label: 'Cost per Lead', value: avgDeal > 0 ? `BD ${Math.round(avgDeal * 0.1).toLocaleString()}` : '—', up: false, color: 'text-amber-400' },
            { label: 'Revenue from Marketing', value: `BD ${Math.round(totalValue * 0.6).toLocaleString()}`, up: true, color: 'text-blue-400' },
          ].map((r) => (
            <div key={r.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-5 text-center">
              <p className="text-xs text-theme-muted uppercase tracking-wider">{r.label}</p>
              <p className={`mt-2 font-sans text-3xl font-bold ${r.color}`}>{r.value}</p>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} aria-label="Close" />
          <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">Add Lead</h2><button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><label htmlFor="l-company" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Company *</label><input id="l-company" value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} className={inputCls} placeholder="Company name" /></div>
              <div><label htmlFor="l-contact" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Contact</label><input id="l-contact" value={form.contact} onChange={(e) => setForm((p) => ({ ...p, contact: e.target.value }))} className={inputCls} /></div>
              <div><label htmlFor="l-phone" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Phone</label><input id="l-phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} className={inputCls} /></div>
              <div><label htmlFor="l-email" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Email</label><input id="l-email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className={inputCls} /></div>
              <div><label htmlFor="l-source" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Source</label><select id="l-source" value={form.source} onChange={(e) => setForm((p) => ({ ...p, source: e.target.value }))} className={inputCls}><option>Website</option><option>Referral</option><option>LinkedIn</option><option>WhatsApp</option><option>Phone</option><option>Email</option></select></div>
              <div className="sm:col-span-2"><label htmlFor="l-value" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Deal Value *</label><input id="l-value" value={form.value} onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))} className={inputCls} placeholder="BD XX,XXX" /></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary">Cancel</button>
              <button onClick={handleAdd} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white"><Check className="inline h-4 w-4 mr-1" /> Add Lead</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
