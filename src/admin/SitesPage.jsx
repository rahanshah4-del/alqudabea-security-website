import { useState } from 'react';
import { Search, Plus, Shield, MapPin, X, Trash2, Edit3, Check, Download } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { getSites } from '@/admin/AdminData';

const TYPES = ['All Types', 'Commercial', 'Residential', 'Hospitality', 'Healthcare', 'Education', 'Industrial', 'Government', 'Banking'];

export default function SitesPage() {
  const [sites, setSites] = useState(() => getSites());
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', type: 'Commercial', guards: 0, supervisor: '', address: '', status: 'Active', documents: 0 });

  const filtered = sites.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.supervisor.toLowerCase().includes(search.toLowerCase())) { return false; }
    if (typeFilter !== 'All Types' && s.type !== typeFilter) { return false; }
    return true;
  });

  const openAdd = () => { setEditId(null); setForm({ name: '', type: 'Commercial', guards: 0, supervisor: '', address: '', status: 'Active', documents: 0 }); setShowForm(true); };
  const openEdit = (s) => { setEditId(s.id); setForm({ name: s.name, type: s.type, guards: s.guards, supervisor: s.supervisor, address: s.address, status: s.status, documents: s.documents || 0 }); setShowForm(true); };

  const handleSave = () => {
    if (!form.name.trim() || !form.supervisor.trim()) { return; }
    if (editId) { setSites((prev) => prev.map((s) => s.id === editId ? { ...s, ...form } : s)); }
    else { const newId = `S-${String(sites.length + 1).padStart(3, '0')}`; setSites((prev) => [...prev, { id: newId, ...form }]); }
    setShowForm(false);
  };

  const handleDelete = (id) => { setSites((prev) => prev.filter((s) => s.id !== id)); };

  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';

  return (
    <div className="space-y-6">
      <SEO title="Sites — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Site Management</h1><p className="mt-1 text-sm text-theme-muted">{sites.length} sites · {sites.filter((s) => s.status === 'Active').length} active</p></div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl border border-theme-muted px-3 py-2.5 text-sm text-theme-secondary transition-all hover:border-accent-500/30"><Download className="h-4 w-4" /></button>
          <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Add Site</button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-muted" /><input type="text" placeholder="Search site or supervisor..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-theme-muted bg-surface-raised py-2.5 pl-10 pr-4 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none" /></div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-xl border border-theme-muted bg-surface-raised px-4 py-2.5 text-sm text-theme-secondary focus:border-accent-500 focus:outline-none">{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((s) => (
          <div key={s.id} className="group rounded-2xl border border-theme-muted bg-surface-raised p-5 transition-all hover:-translate-y-1 hover:border-accent-500/30 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <span className="rounded-lg bg-accent-500/10 px-2 py-0.5 text-[10px] font-bold text-accent-400">{s.type}</span>
              <span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${s.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>{s.status}</span>
            </div>
            <h3 className="mt-3 font-sans font-semibold text-theme-primary">{s.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-theme-muted"><MapPin className="h-3 w-3" /> {s.address}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-surface-muted/40 p-2 text-center"><p className="font-bold text-theme-primary">{s.guards}</p><p className="text-[10px] text-theme-muted">Guards</p></div>
              <div className="rounded-lg bg-surface-muted/40 p-2 text-center"><p className="font-bold text-theme-primary">{s.documents || 0}</p><p className="text-[10px] text-theme-muted">Docs</p></div>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-theme-muted pt-3 text-xs">
              <Shield className="h-3 w-3 text-theme-muted" /><span className="flex-1 truncate text-theme-muted">{s.supervisor}</span>
            </div>
            <div className="mt-2 flex gap-1">
              <button onClick={() => openEdit(s)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] text-theme-muted transition-colors hover:bg-surface-muted/60 hover:text-accent-400"><Edit3 className="h-3 w-3" /> Edit</button>
              <button onClick={() => handleDelete(s.id)} className="ml-auto flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] text-theme-muted transition-colors hover:bg-danger-500/10 hover:text-danger-400"><Trash2 className="h-3 w-3" /> Delete</button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="py-16 text-center"><MapPin className="mx-auto h-10 w-10 text-theme-muted" /><p className="mt-3 text-sm text-theme-muted">No sites found</p></div>}

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} aria-label="Close" />
          <div className="glass relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">{editId ? 'Edit Site' : 'Add New Site'}</h2><button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><label htmlFor="s-name" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Site Name *</label><input id="s-name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="Site name" /></div>
              <div><label htmlFor="s-type" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Type</label><select id="s-type" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} className={inputCls}>{TYPES.filter((t) => t !== 'All Types').map((t) => <option key={t}>{t}</option>)}</select></div>
              <div><label htmlFor="s-status" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Status</label><select id="s-status" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className={inputCls}><option>Active</option><option>Under Review</option><option>Inactive</option></select></div>
              <div><label htmlFor="s-guards" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Guards</label><input id="s-guards" type="number" value={form.guards} onChange={(e) => setForm((p) => ({ ...p, guards: parseInt(e.target.value) || 0 }))} className={inputCls} /></div>
              <div><label htmlFor="s-docs" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Documents</label><input id="s-docs" type="number" value={form.documents} onChange={(e) => setForm((p) => ({ ...p, documents: parseInt(e.target.value) || 0 }))} className={inputCls} /></div>
              <div className="sm:col-span-2"><label htmlFor="s-supervisor" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Supervisor *</label><input id="s-supervisor" value={form.supervisor} onChange={(e) => setForm((p) => ({ ...p, supervisor: e.target.value }))} className={inputCls} placeholder="Full name and rank" /></div>
              <div className="sm:col-span-2"><label htmlFor="s-address" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Address</label><input id="s-address" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} className={inputCls} placeholder="Full address" /></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={handleSave} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Check className="inline h-4 w-4 mr-1" /> {editId ? 'Save Changes' : 'Add Site'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
