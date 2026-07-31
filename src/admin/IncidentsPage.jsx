import { useState } from 'react';
import { AlertTriangle, Clock, Image, FileText, Plus, X, Check, Edit3, Trash2 } from 'lucide-react';
import { SEO } from '@/components/SEO';

const INITIAL = [
  { id: 'INC-001', title: 'Unauthorized Access — Gate B', site: 'Manama HQ Tower', severity: 'High', time: '09:45 AM', status: 'Resolved', officer: 'Ahmed Al Khalifa', description: 'Individual attempted to enter without valid credentials. Detained and handed over to authorities.' },
  { id: 'INC-002', title: 'Fire Alarm Triggered', site: 'Riffa Gardens', severity: 'High', time: '11:20 AM', status: 'Investigating', officer: 'Omar Bucheeri', description: 'Smoke detector activated in Block C. Civil Defence notified. No visible fire. Investigating cause.' },
  { id: 'INC-003', title: 'Vehicle Collision — Parking', site: 'The Gulf Hotel', severity: 'Medium', time: '02:15 PM', status: 'Resolved', officer: 'Khalid Al Ansari', description: 'Minor collision between two vehicles in guest parking. Police report filed. No injuries.' },
  { id: 'INC-004', title: 'Suspicious Package Found', site: 'Bahrain Airport', severity: 'High', time: '04:00 PM', status: 'Resolved', officer: 'Abdullah Al Khalifa', description: 'Unattended bag in Terminal 1. EOD team cleared. Area reopened after 45 minutes.' },
  { id: 'INC-005', title: 'Medical Emergency', site: 'Alba Smelter', severity: 'Medium', time: '06:30 PM', status: 'Resolved', officer: 'Hassan Al Qahtani', description: 'Worker reported dizziness. First aid administered. Transported for observation.' },
];

const sevCls = (s) => s === 'High' ? 'bg-danger-500/10 text-danger-400' : s === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400';
const statCls = (s) => s === 'Resolved' ? 'bg-green-500/10 text-green-400' : s === 'Investigating' ? 'bg-blue-500/10 text-blue-400' : 'bg-danger-500/10 text-danger-400';

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState(INITIAL);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', site: '', severity: 'Medium', officer: '', description: '', status: 'Open' });

  const openAdd = () => { setEditId(null); setForm({ title: '', site: '', severity: 'Medium', officer: '', description: '', status: 'Open' }); setShowForm(true); };
  const openEdit = (inc) => { setEditId(inc.id); setForm({ title: inc.title, site: inc.site, severity: inc.severity, officer: inc.officer, description: inc.description, status: inc.status }); setShowForm(true); };

  const handleSave = () => {
    if (!form.title.trim() || !form.site.trim()) { return; }
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    if (editId) { setIncidents((prev) => prev.map((i) => i.id === editId ? { ...i, ...form } : i)); }
    else { const newId = `INC-${String(incidents.length + 1).padStart(3, '0')}`; setIncidents((prev) => [{ id: newId, ...form, time: now }, ...prev]); }
    setShowForm(false);
  };

  const handleDelete = (id) => { setIncidents((prev) => prev.filter((i) => i.id !== id)); };
  const toggleStatus = (id) => {
    setIncidents((prev) => prev.map((i) => i.id === id ? { ...i, status: i.status === 'Resolved' ? 'Investigating' : 'Resolved' } : i));
  };

  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';

  return (
    <div className="space-y-6">
      <SEO title="Incidents — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Incident Management</h1><p className="mt-1 text-sm text-theme-muted">{incidents.length} incidents · {incidents.filter((i) => i.status !== 'Resolved').length} open</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Report Incident</button>
      </div>
      <div className="space-y-3">
        {incidents.map((inc) => (
          <div key={inc.id} className="rounded-2xl border border-theme-muted bg-surface-raised p-5 transition-all hover:shadow-lg">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${sevCls(inc.severity).split(' ')[0]}`}><AlertTriangle className={`h-5 w-5 ${sevCls(inc.severity).split(' ')[1]}`} /></div>
                <div>
                  <div className="flex items-center gap-2"><h3 className="font-semibold text-theme-primary">{inc.title}</h3><span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${sevCls(inc.severity)}`}>{inc.severity}</span><span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${statCls(inc.status)}`}>{inc.status}</span></div>
                  <p className="mt-1 text-sm text-theme-muted">{inc.site} · {inc.officer} · <Clock className="inline h-3 w-3" /> {inc.time}</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-theme-secondary">{inc.description}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => toggleStatus(inc.id)} className="flex items-center gap-1.5 rounded-lg bg-surface-muted/40 px-3 py-1.5 text-xs text-theme-muted transition-colors hover:text-green-400"><Check className="h-3.5 w-3.5" /> {inc.status === 'Resolved' ? 'Reopen' : 'Resolve'}</button>
              <button className="flex items-center gap-1.5 rounded-lg bg-surface-muted/40 px-3 py-1.5 text-xs text-theme-muted transition-colors hover:text-theme-primary"><Image className="h-3.5 w-3.5" /> Evidence</button>
              <button className="flex items-center gap-1.5 rounded-lg bg-surface-muted/40 px-3 py-1.5 text-xs text-theme-muted transition-colors hover:text-theme-primary"><FileText className="h-3.5 w-3.5" /> Report</button>
              <button onClick={() => openEdit(inc)} className="flex items-center gap-1.5 rounded-lg bg-surface-muted/40 px-3 py-1.5 text-xs text-theme-muted transition-colors hover:text-accent-400"><Edit3 className="h-3.5 w-3.5" /> Edit</button>
              <button onClick={() => handleDelete(inc.id)} className="ml-auto flex items-center gap-1.5 rounded-lg bg-surface-muted/40 px-3 py-1.5 text-xs text-theme-muted transition-colors hover:text-danger-400"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} aria-label="Close" />
          <div className="glass relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">{editId ? 'Edit Incident' : 'Report Incident'}</h2><button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><label htmlFor="i-title" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Title *</label><input id="i-title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className={inputCls} placeholder="Incident title" /></div>
              <div className="sm:col-span-2"><label htmlFor="i-site" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Site *</label><input id="i-site" value={form.site} onChange={(e) => setForm((p) => ({ ...p, site: e.target.value }))} className={inputCls} placeholder="Site name" /></div>
              <div><label htmlFor="i-sev" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Severity</label><select id="i-sev" value={form.severity} onChange={(e) => setForm((p) => ({ ...p, severity: e.target.value }))} className={inputCls}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></div>
              <div><label htmlFor="i-status" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Status</label><select id="i-status" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className={inputCls}><option>Open</option><option>Investigating</option><option>Resolved</option></select></div>
              <div><label htmlFor="i-officer" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Officer</label><input id="i-officer" value={form.officer} onChange={(e) => setForm((p) => ({ ...p, officer: e.target.value }))} className={inputCls} placeholder="Officer name" /></div>
              <div className="sm:col-span-2"><label htmlFor="i-desc" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Description</label><textarea id="i-desc" rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className={inputCls} placeholder="Describe the incident..." /></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={handleSave} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Check className="inline h-4 w-4 mr-1" /> {editId ? 'Save' : 'Report'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
