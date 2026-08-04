import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, FileText, Download, Plus, ArrowUp, ArrowDown, X, Check, Trash2 } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { getCollection, addDocument, updateDocument, deleteDocument } from '@/firebase/services';

const statCls = (s) => s === 'Paid' ? 'bg-green-500/10 text-green-400' : s === 'Pending' ? 'bg-blue-500/10 text-blue-400' : 'bg-danger-500/10 text-danger-400';

export default function FinancePage() {
  const [invoices, setInvoices] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCollection('invoices'), getCollection('quotes')])
      .then(([inv, qts]) => { setInvoices(inv); setQuotes(qts); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);
  const [showInvForm, setShowInvForm] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [invForm, setInvForm] = useState({ client: '', amount: '', status: 'Pending' });
  const [quoteForm, setQuoteForm] = useState({ client: '', amount: '', status: 'Draft' });

  const paid = invoices.filter((i) => i.status === 'Paid').reduce((s, i) => s + parseInt(i.amount.replace(/[^0-9]/g, '')), 0);
  const pending = invoices.filter((i) => i.status === 'Pending').reduce((s, i) => s + parseInt(i.amount.replace(/[^0-9]/g, '')), 0);
  const overdue = invoices.filter((i) => i.status === 'Overdue').reduce((s, i) => s + parseInt(i.amount.replace(/[^0-9]/g, '')), 0);

  const handleAddInv = async () => {
    if (!invForm.client.trim() || !invForm.amount.trim()) { return; }
    const newId = await addDocument('invoices', { ...invForm, date: new Date().toISOString().split('T')[0] });
    if (newId) { setInvoices((prev) => [...prev, { id: newId, ...invForm, date: new Date().toISOString().split('T')[0] }]); }
    setInvForm({ client: '', amount: '', status: 'Pending' }); setShowInvForm(false);
  };
  const handleAddQuote = async () => {
    if (!quoteForm.client.trim() || !quoteForm.amount.trim()) { return; }
    const newId = await addDocument('quotes', { ...quoteForm, date: new Date().toISOString().split('T')[0] });
    if (newId) { setQuotes((prev) => [...prev, { id: newId, ...quoteForm, date: new Date().toISOString().split('T')[0] }]); }
    setQuoteForm({ client: '', amount: '', status: 'Draft' }); setShowQuoteForm(false);
  };
  const handleDeleteInv = async (id) => { await deleteDocument('invoices', id); setInvoices((prev) => prev.filter((i) => i.id !== id)); };
  const handleDeleteQuote = async (id) => { await deleteDocument('quotes', id); setQuotes((prev) => prev.filter((q) => q.id !== id)); };
  const handleToggleInv = async (id) => {
    const inv = invoices.find((i) => i.id === id);
    const newStatus = inv.status === 'Paid' ? 'Pending' : inv.status === 'Pending' ? 'Overdue' : 'Paid';
    await updateDocument('invoices', id, { status: newStatus });
    setInvoices((prev) => prev.map((i) => i.id === id ? { ...i, status: newStatus } : i));
  };

  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';

  return (
    <div className="space-y-6">
      <SEO title="Finance — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Finance</h1><p className="mt-1 text-sm text-theme-muted">{invoices.length} invoices · {quotes.length} quotes</p></div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl border border-theme-muted px-3 py-2.5 text-sm text-theme-secondary transition-all hover:border-accent-500/30"><Download className="h-4 w-4" /></button>
          <button onClick={() => { setQuoteForm({ client: '', amount: '', status: 'Draft' }); setShowQuoteForm(true); }} className="flex items-center gap-2 rounded-xl border border-theme-muted px-3 py-2 text-sm text-theme-secondary transition-all hover:border-accent-500/30"><Plus className="h-4 w-4" /> Quote</button>
          <button onClick={() => { setInvForm({ client: '', amount: '', status: 'Pending' }); setShowInvForm(true); }} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Invoice</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: DollarSign, label: 'Monthly Revenue', value: `BD ${(paid + pending).toLocaleString()}`, change: '+8.2%', up: true, color: 'text-green-400', bg: 'bg-green-500/10' },
          { icon: TrendingUp, label: 'Paid', value: `BD ${paid.toLocaleString()}`, change: '+12%', up: true, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { icon: TrendingDown, label: 'Pending + Overdue', value: `BD ${(pending + overdue).toLocaleString()}`, change: '-3.1%', up: false, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: FileText, label: 'Expenses', value: `BD ${(paid + pending + overdue).toLocaleString()}`, change: '—', up: false, color: 'text-danger-400', bg: 'bg-danger-500/10' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
            <div className="flex items-center justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div><span className={`flex items-center gap-1 text-xs font-bold ${s.up ? 'text-green-400' : 'text-danger-400'}`}>{s.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}{s.change}</span></div>
            <p className="mt-4 font-sans text-3xl font-bold text-theme-primary">{s.value}</p><p className="mt-1 text-xs text-theme-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <div className="flex items-center justify-between"><h2 className="font-sans text-lg font-semibold text-theme-primary">Invoices</h2><span className="text-xs text-theme-muted">{invoices.length}</span></div>
          <div className="mt-3 space-y-2">{invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 p-3">
              <div><p className="text-sm font-medium text-theme-primary">{inv.client}</p><p className="text-[10px] text-theme-muted">{inv.id} · {inv.date}</p></div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleToggleInv(inv.id)} className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${statCls(inv.status)}`}>{inv.status}</button>
                <span className="font-mono text-sm font-bold text-theme-primary">{inv.amount}</span>
                <button onClick={() => handleDeleteInv(inv.id)} className="rounded-lg p-1 text-theme-muted hover:bg-danger-500/10 hover:text-danger-400"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}</div>
        </div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <div className="flex items-center justify-between"><h2 className="font-sans text-lg font-semibold text-theme-primary">Quotations</h2><span className="text-xs text-theme-muted">{quotes.length}</span></div>
          <div className="mt-3 space-y-2">{quotes.map((q) => (
            <div key={q.id} className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 p-3">
              <div><p className="text-sm font-medium text-theme-primary">{q.client}</p><p className="text-[10px] text-theme-muted">{q.id} · {q.date}</p></div>
              <div className="flex items-center gap-2"><span className="font-mono text-sm font-bold text-theme-primary">{q.amount}</span><span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${q.status === 'Sent' ? 'bg-blue-500/10 text-blue-400' : 'bg-neutral-500/10 text-neutral-400'}`}>{q.status}</span><button onClick={() => handleDeleteQuote(q.id)} className="rounded-lg p-1 text-theme-muted hover:bg-danger-500/10 hover:text-danger-400"><Trash2 className="h-3.5 w-3.5" /></button></div>
            </div>
          ))}</div>
        </div>
      </div>

      {showInvForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowInvForm(false)} aria-label="Close" />
          <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">New Invoice</h2><button onClick={() => setShowInvForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3">
              <div><label htmlFor="inv-client" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Client *</label><input id="inv-client" value={invForm.client} onChange={(e) => setInvForm((p) => ({ ...p, client: e.target.value }))} className={inputCls} placeholder="Client name" /></div>
              <div><label htmlFor="inv-amount" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Amount *</label><input id="inv-amount" value={invForm.amount} onChange={(e) => setInvForm((p) => ({ ...p, amount: e.target.value }))} className={inputCls} placeholder="BD XX,XXX" /></div>
              <div><label htmlFor="inv-status" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Status</label><select id="inv-status" value={invForm.status} onChange={(e) => setInvForm((p) => ({ ...p, status: e.target.value }))} className={inputCls}><option>Pending</option><option>Paid</option><option>Overdue</option></select></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowInvForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary">Cancel</button>
              <button onClick={handleAddInv} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white"><Check className="inline h-4 w-4 mr-1" /> Add</button>
            </div>
          </div>
        </div>
      )}
      {showQuoteForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowQuoteForm(false)} aria-label="Close" />
          <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">New Quotation</h2><button onClick={() => setShowQuoteForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3">
              <div><label htmlFor="q-client" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Client *</label><input id="q-client" value={quoteForm.client} onChange={(e) => setQuoteForm((p) => ({ ...p, client: e.target.value }))} className={inputCls} placeholder="Client name" /></div>
              <div><label htmlFor="q-amount" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Amount *</label><input id="q-amount" value={quoteForm.amount} onChange={(e) => setQuoteForm((p) => ({ ...p, amount: e.target.value }))} className={inputCls} placeholder="BD XX,XXX" /></div>
              <div><label htmlFor="q-status" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Status</label><select id="q-status" value={quoteForm.status} onChange={(e) => setQuoteForm((p) => ({ ...p, status: e.target.value }))} className={inputCls}><option>Draft</option><option>Sent</option><option>Accepted</option></select></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowQuoteForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary">Cancel</button>
              <button onClick={handleAddQuote} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white"><Check className="inline h-4 w-4 mr-1" /> Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
