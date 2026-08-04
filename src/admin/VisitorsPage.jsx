import { useState, useEffect } from 'react';
import { QrCode, Clock, Car, Plus, Download, X, Check, Search, LogOut, Trash2 } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { getCollection, addDocument, updateDocument, deleteDocument } from '@/firebase/services';

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', host: '', purpose: 'Meeting', vehicle: '' });
  const [qrPass, setQrPass] = useState(null);

  useEffect(() => {
    getCollection('visitors').then((data) => { setVisitors(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = visitors.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()) || v.host.toLowerCase().includes(search.toLowerCase()));
  const insideCount = visitors.filter((v) => v.status === 'Inside').length;

  const handleAdd = async () => {
    if (!form.name.trim() || !form.host.trim()) { return; }
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const newId = await addDocument('visitors', { ...form, entry: now, exit: '—', status: 'Inside' });
    if (newId) { setVisitors((prev) => [{ id: newId, ...form, entry: now, exit: '—', status: 'Inside' }, ...prev]); }
    setForm({ name: '', host: '', purpose: 'Meeting', vehicle: '' }); setShowForm(false);
  };

  const handleCheckOut = async (id) => {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    await updateDocument('visitors', id, { exit: now, status: 'Exited' });
    setVisitors((prev) => prev.map((v) => v.id === id ? { ...v, exit: now, status: 'Exited' } : v));
  };

  const handleDelete = async (id) => {
    await deleteDocument('visitors', id);
    setVisitors((prev) => prev.filter((v) => v.id !== id));
  };
  const handleQr = () => { setQrPass(`ALQ-VISITOR-${Date.now().toString(36).toUpperCase()}`); setTimeout(() => setQrPass(null), 4000); };

  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';

  return (
    <div className="space-y-6">
      <SEO title="Visitors — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Visitor Management</h1><p className="mt-1 text-sm text-theme-muted">{loading ? 'Loading...' : `${visitors.length} total · ${insideCount} currently inside`}</p></div>
        <div className="flex gap-2">
          <button onClick={handleQr} className="flex items-center gap-2 rounded-xl border border-theme-muted px-3 py-2.5 text-sm text-theme-secondary transition-all hover:border-accent-500/30">{qrPass ? <><Check className="h-4 w-4 text-green-400" /> Generated!</> : <><QrCode className="h-4 w-4" /> QR Pass</>}</button>
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl border border-theme-muted p-2.5 text-sm text-theme-secondary transition-all hover:border-accent-500/30"><Download className="h-4 w-4" /></button>
          <button onClick={() => { setForm({ name: '', host: '', purpose: 'Meeting', vehicle: '' }); setShowForm(true); }} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> New Pass</button>
        </div>
      </div>

      {qrPass && (
        <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6 text-center">
          <QrCode className="mx-auto h-12 w-12 text-green-400" />
          <p className="mt-3 font-mono text-lg font-bold text-green-400">{qrPass}</p>
          <p className="mt-1 text-xs text-theme-muted">QR Pass generated — valid for 24 hours</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5 text-center"><QrCode className="mx-auto h-8 w-8 text-accent-400" /><p className="mt-2 font-medium text-theme-primary">QR Pass Generation</p><p className="text-xs text-theme-muted">Instant visitor QR codes</p></div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5 text-center"><Clock className="mx-auto h-8 w-8 text-green-400" /><p className="mt-2 font-medium text-theme-primary">Real-Time Entry/Exit</p><p className="text-xs text-theme-muted">Auto time-stamped logging</p></div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5 text-center"><Car className="mx-auto h-8 w-8 text-blue-400" /><p className="mt-2 font-medium text-theme-primary">Vehicle Registration</p><p className="text-xs text-theme-muted">Plate number tracking</p></div>
      </div>

      <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-muted" /><input type="text" placeholder="Search visitors..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-theme-muted bg-surface-raised py-2.5 pl-10 pr-4 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none" /></div>

      {loading ? (
        <div className="py-16 text-center"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" /><p className="mt-4 text-sm text-theme-muted">Loading visitors...</p></div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center"><QrCode className="mx-auto h-10 w-10 text-theme-muted" /><p className="mt-3 text-sm text-theme-muted">{visitors.length === 0 ? 'No visitors yet. Click "New Pass" to register one.' : 'No visitors match your search.'}</p></div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-theme-muted">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-theme-muted bg-surface-muted/40"><tr>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Visitor</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Host</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Purpose</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Entry</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Exit</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Vehicle</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Status</th><th className="px-4 py-3" />
            </tr></thead>
            <tbody>{filtered.map((v) => (
              <tr key={v.id} className="border-b border-theme-muted transition-colors hover:bg-surface-muted/40">
                <td className="px-4 py-3 font-medium text-theme-primary">{v.name}</td><td className="px-4 py-3 text-theme-secondary">{v.host}</td><td className="px-4 py-3 text-theme-secondary">{v.purpose}</td>
                <td className="px-4 py-3 text-theme-secondary">{v.entry}</td><td className="px-4 py-3 text-theme-secondary">{v.exit}</td>
                <td className="px-4 py-3 font-mono text-xs text-theme-muted">{v.vehicle}</td>
                <td className="px-4 py-3"><span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${v.status === 'Inside' ? 'bg-green-500/10 text-green-400' : 'bg-neutral-500/10 text-neutral-400'}`}>{v.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {v.status === 'Inside' && <button onClick={() => handleCheckOut(v.id)} className="rounded-lg p-1.5 text-theme-muted hover:bg-surface-overlay hover:text-amber-400" title="Check Out"><LogOut className="h-3.5 w-3.5" /></button>}
                    <button onClick={() => handleDelete(v.id)} className="rounded-lg p-1.5 text-theme-muted hover:bg-surface-overlay hover:text-danger-400" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} aria-label="Close" />
          <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">New Visitor Pass</h2><button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3">
              <div><label htmlFor="v-name" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Visitor Name *</label><input id="v-name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="Full name" /></div>
              <div><label htmlFor="v-host" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Host *</label><input id="v-host" value={form.host} onChange={(e) => setForm((p) => ({ ...p, host: e.target.value }))} className={inputCls} placeholder="Host name" /></div>
              <div><label htmlFor="v-purpose" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Purpose</label><select id="v-purpose" value={form.purpose} onChange={(e) => setForm((p) => ({ ...p, purpose: e.target.value }))} className={inputCls}><option>Meeting</option><option>Site Inspection</option><option>Contractor</option><option>Interview</option><option>Vendor Meeting</option><option>Delivery</option><option>Other</option></select></div>
              <div><label htmlFor="v-vehicle" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Vehicle Plate</label><input id="v-vehicle" value={form.vehicle} onChange={(e) => setForm((p) => ({ ...p, vehicle: e.target.value }))} className={inputCls} placeholder="BH-XXXXX or —" /></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={handleAdd} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Check className="inline h-4 w-4 mr-1" /> Issue Pass</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
