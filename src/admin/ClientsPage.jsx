import { useState } from 'react';
import { Search, Plus, Phone, Mail, FileText, X, Building2, Trash2, Edit3, Check, Download } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { getClients } from '@/admin/AdminData';

const TYPES = ['All Types', 'Corporate', 'Hospitality', 'Healthcare', 'Banking', 'Construction', 'Education', 'Government'];
const STATUSES = ['All Status', 'Active', 'Pending', 'Inactive'];

export default function ClientsPage() {
  const [clients, setClients] = useState(() => getClients());
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', type: 'Corporate', contact: '', phone: '', email: '', status: 'Active', branches: 1, billing: '', address: '' });

  const filtered = clients.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.contact.toLowerCase().includes(search.toLowerCase())) { return false; }
    if (typeFilter !== 'All Types' && c.type !== typeFilter) { return false; }
    if (statusFilter !== 'All Status' && c.status !== statusFilter) { return false; }
    return true;
  });

  const openAdd = () => { setEditId(null); setForm({ name: '', type: 'Corporate', contact: '', phone: '', email: '', status: 'Active', branches: 1, billing: '', address: '' }); setShowForm(true); };
  const openEdit = (c) => { setEditId(c.id); setForm({ name: c.name, type: c.type, contact: c.contact, phone: c.phone, email: c.email, status: c.status, branches: c.branches, billing: c.billing, address: c.address || '' }); setShowForm(true); };

  const handleSave = () => {
    if (!form.name.trim() || !form.contact.trim()) { return; }
    if (editId) {
      setClients((prev) => prev.map((c) => c.id === editId ? { ...c, ...form } : c));
    } else {
      const newId = `C-${String(clients.length + 1).padStart(3, '0')}`;
      setClients((prev) => [...prev, { id: newId, ...form }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => { setClients((prev) => prev.filter((c) => c.id !== id)); };
  const toggleStatus = (id) => {
    setClients((prev) => prev.map((c) => c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c));
  };

  const statusCls = (s) => s === 'Active' ? 'bg-green-500/10 text-green-400' : s === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-neutral-500/10 text-neutral-400';
  const selectCls = 'rounded-xl border border-theme-muted bg-surface-muted/40 px-3 py-2 text-xs text-theme-secondary focus:border-accent-500 focus:outline-none';
  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';

  return (
    <div className="space-y-6">
      <SEO title="Clients — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Client Management</h1><p className="mt-1 text-sm text-theme-muted">{clients.length} clients · {clients.filter((c) => c.status === 'Active').length} active</p></div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl border border-theme-muted px-3 py-2.5 text-sm text-theme-secondary transition-all hover:border-accent-500/30"><Download className="h-4 w-4" /></button>
          <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Add Client</button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-muted" /><input type="text" placeholder="Search name or contact..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-theme-muted bg-surface-raised py-2.5 pl-10 pr-4 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none" /></div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={selectCls}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectCls}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.id} className="group rounded-2xl border border-theme-muted bg-surface-raised p-5 transition-all hover:-translate-y-1 hover:border-accent-500/30 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-sm font-bold text-accent-400">{c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div>
                <div><p className="font-medium text-theme-primary">{c.name}</p><p className="text-[10px] text-theme-muted">{c.type} · {c.branches} branch{ c.branches !== 1 ? 'es' : '' }</p></div>
              </div>
              <button onClick={() => toggleStatus(c.id)} className={`rounded-lg px-2 py-0.5 text-[10px] font-bold transition-all hover:opacity-80 ${statusCls(c.status)}`}>{c.status}</button>
            </div>
            <div className="mt-4 space-y-1.5 text-xs">
              <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-theme-muted transition-colors hover:text-accent-400"><Phone className="h-3 w-3" /> {c.phone}</a>
              <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-theme-muted transition-colors hover:text-accent-400"><Mail className="h-3 w-3" /> {c.email}</a>
              <div className="flex items-center gap-2 text-theme-muted"><FileText className="h-3 w-3" /> {c.billing}</div>
            </div>
            <div className="mt-3 flex gap-1 border-t border-theme-muted pt-3">
              <button onClick={() => openEdit(c)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] text-theme-muted transition-colors hover:bg-surface-muted/60 hover:text-accent-400"><Edit3 className="h-3 w-3" /> Edit</button>
              <button onClick={() => handleDelete(c.id)} className="ml-auto flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] text-theme-muted transition-colors hover:bg-danger-500/10 hover:text-danger-400"><Trash2 className="h-3 w-3" /> Delete</button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="py-16 text-center"><Building2 className="mx-auto h-10 w-10 text-theme-muted" /><p className="mt-3 text-sm text-theme-muted">No clients match your filters</p></div>}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} aria-label="Close" />
          <div className="glass relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">{editId ? 'Edit Client' : 'Add New Client'}</h2><button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><label htmlFor="c-name" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Company Name *</label><input id="c-name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="Company name" /></div>
              <div><label htmlFor="c-type" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Type</label><select id="c-type" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} className={inputCls}>{TYPES.filter((t) => t !== 'All Types').map((t) => <option key={t}>{t}</option>)}</select></div>
              <div><label htmlFor="c-status" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Status</label><select id="c-status" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className={inputCls}><option>Active</option><option>Pending</option><option>Inactive</option></select></div>
              <div className="sm:col-span-2"><label htmlFor="c-contact" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Contact Person *</label><input id="c-contact" value={form.contact} onChange={(e) => setForm((p) => ({ ...p, contact: e.target.value }))} className={inputCls} placeholder="Full name" /></div>
              <div><label htmlFor="c-phone" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Phone</label><input id="c-phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} className={inputCls} placeholder="+973 XXXX XXXX" /></div>
              <div><label htmlFor="c-email" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Email</label><input id="c-email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className={inputCls} placeholder="email@company.com" /></div>
              <div><label htmlFor="c-branches" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Branches</label><input id="c-branches" type="number" value={form.branches} onChange={(e) => setForm((p) => ({ ...p, branches: parseInt(e.target.value) || 1 }))} className={inputCls} /></div>
              <div><label htmlFor="c-billing" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Billing</label><input id="c-billing" value={form.billing} onChange={(e) => setForm((p) => ({ ...p, billing: e.target.value }))} className={inputCls} placeholder="BD XX,XXX/yr" /></div>
              <div className="sm:col-span-2"><label htmlFor="c-address" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Address</label><input id="c-address" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} className={inputCls} placeholder="Office address" /></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={handleSave} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Check className="inline h-4 w-4 mr-1" /> {editId ? 'Save Changes' : 'Add Client'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
