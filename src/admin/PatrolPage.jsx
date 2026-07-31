import { useState } from 'react';
import { MapPin, Clock, CheckCircle2, QrCode, Radio, AlertTriangle, Plus, X, Check, Edit3, Trash2 } from 'lucide-react';
import { SEO } from '@/components/SEO';

const INITIAL_ROUTES = [
  { id: 'R-001', name: 'Manama City Loop', checkpoints: 12, completed: 12, time: '45 min', status: 'Completed', officer: 'Mohammed Hassan' },
  { id: 'R-002', name: 'Riffa Residential Zone', checkpoints: 8, completed: 8, time: '32 min', status: 'Completed', officer: 'Ahmed Al Khalifa' },
  { id: 'R-003', name: 'Seef Commercial District', checkpoints: 15, completed: 13, time: 'In Progress', status: 'Active', officer: 'Rajesh Kumar' },
  { id: 'R-004', name: 'Amwaj Islands', checkpoints: 10, completed: 10, time: '28 min', status: 'Completed', officer: 'John Smith' },
  { id: 'R-005', name: 'Hidd Industrial Zone', checkpoints: 6, completed: 4, time: 'In Progress', status: 'Active', officer: 'Omar Farooq' },
];

const INITIAL_MISSED = [
  { route: 'Seef Commercial', checkpoint: 'CP-13', time: '14:30', reason: 'GPS signal lost' },
  { route: 'Seef Commercial', checkpoint: 'CP-14', time: '14:45', reason: 'Traffic delay' },
  { route: 'Hidd Industrial', checkpoint: 'CP-05', time: '15:10', reason: 'Road closure' },
  { route: 'Hidd Industrial', checkpoint: 'CP-06', time: '15:25', reason: 'Waiting investigation' },
];

export default function PatrolPage() {
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  const [missed, setMissed] = useState(INITIAL_MISSED);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [form, setForm] = useState({ name: '', checkpoints: 10, officer: '', time: '', status: 'Active' });

  const activeRoutes = routes.filter((r) => r.status === 'Active').length;
  const completedToday = routes.filter((r) => r.status === 'Completed').length + 13;

  const openAdd = () => { setEditId(null); setForm({ name: '', checkpoints: 10, officer: '', time: '', status: 'Active' }); setShowForm(true); };
  const openEdit = (r) => { setEditId(r.id); setForm({ name: r.name, checkpoints: r.checkpoints, officer: r.officer, time: r.time, status: r.status }); setShowForm(true); };

  const handleSave = () => {
    if (!form.name.trim() || !form.officer.trim()) { return; }
    if (editId) { setRoutes((prev) => prev.map((r) => r.id === editId ? { ...r, ...form, completed: r.completed } : r)); }
    else { const newId = `R-${String(routes.length + 1).padStart(3, '0')}`; setRoutes((prev) => [...prev, { id: newId, ...form, completed: 0, time: 'Just started' }]); }
    setShowForm(false);
  };

  const handleDelete = (id) => { setRoutes((prev) => prev.filter((r) => r.id !== id)); };
  const handleQr = () => { setQrGenerated(true); setTimeout(() => setQrGenerated(false), 3000); };
  const resolveMissed = (idx) => { setMissed((prev) => prev.filter((_, i) => i !== idx)); };

  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';

  return (
    <div className="space-y-6">
      <SEO title="Patrols — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Patrol Management</h1><p className="mt-1 text-sm text-theme-muted">{routes.length} routes · {activeRoutes} active</p></div>
        <div className="flex gap-2">
          <button onClick={handleQr} className="flex items-center gap-2 rounded-xl border border-theme-muted px-4 py-2.5 text-sm text-theme-secondary transition-all hover:border-accent-500/30">{qrGenerated ? <Check className="h-4 w-4 text-green-400" /> : <QrCode className="h-4 w-4" />} {qrGenerated ? 'Generated!' : 'Generate QR Codes'}</button>
          <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Add Route</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { icon: Radio, label: 'Active Patrols', value: activeRoutes, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { icon: CheckCircle2, label: 'Completed Today', value: completedToday, color: 'text-green-400', bg: 'bg-green-500/10' },
          { icon: AlertTriangle, label: 'Missed Checkpoints', value: missed.length, color: 'text-danger-400', bg: 'bg-danger-500/10' },
          { icon: Clock, label: 'Avg Response', value: '4.2m', color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center"><div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div><p className={`mt-2 font-sans text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-[10px] text-theme-muted uppercase tracking-wider">{s.label}</p></div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="font-sans text-lg font-semibold text-theme-primary">Active Routes</h2>
          {routes.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-2xl border border-theme-muted bg-surface-raised p-4 transition-all hover:shadow-lg">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent-400" />
                <div><p className="font-medium text-theme-primary">{r.name}</p><p className="text-xs text-theme-muted">{r.officer} · {r.time}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right"><p className="text-sm font-bold text-theme-primary">{r.completed}/{r.checkpoints}</p><p className={`text-[10px] font-bold ${r.status === 'Completed' ? 'text-green-400' : 'text-blue-400'}`}>{r.status}</p></div>
                <div className="flex gap-1 ml-2">
                  <button onClick={() => openEdit(r)} className="rounded-lg p-1.5 text-theme-muted hover:bg-surface-overlay hover:text-accent-400"><Edit3 className="h-3.5 w-3.5" /></button>
                  <button onClick={() => handleDelete(r.id)} className="rounded-lg p-1.5 text-theme-muted hover:bg-surface-overlay hover:text-danger-400"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <h2 className="flex items-center gap-2 font-sans text-lg font-semibold text-theme-primary"><AlertTriangle className="h-5 w-5 text-danger-400" /> Missed Checkpoints</h2>
          {missed.length === 0 ? <p className="mt-4 text-center text-sm text-theme-muted">All clear — no missed checkpoints</p> : (
            <div className="mt-3 space-y-2">
              {missed.map((m, i) => (
                <div key={`${m.route}-${m.checkpoint}`} className="flex items-start justify-between rounded-xl border border-theme-muted bg-surface-muted/40 p-3">
                  <div><p className="text-sm font-medium text-theme-primary">{m.route} — {m.checkpoint}</p><p className="mt-0.5 text-xs text-theme-muted">{m.time} · {m.reason}</p></div>
                  <button onClick={() => resolveMissed(i)} className="ml-2 shrink-0 rounded-lg p-1 text-theme-muted hover:bg-surface-overlay hover:text-green-400"><Check className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
        <h2 className="font-sans text-lg font-semibold text-theme-primary">QR &amp; NFC Checkpoint Architecture</h2>
        <p className="mt-2 text-sm text-theme-muted">Officers scan QR codes at each checkpoint. NFC tags provide offline verification. All scans are GPS-stamped and synced in real-time.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 text-center text-xs">
          <div className="rounded-xl border border-theme-muted bg-surface-muted/40 p-4"><QrCode className="mx-auto h-6 w-6 text-accent-400" /><p className="mt-2 font-medium text-theme-primary">QR Scanning</p><p className="text-theme-muted">Mobile camera</p></div>
          <div className="rounded-xl border border-theme-muted bg-surface-muted/40 p-4"><Radio className="mx-auto h-6 w-6 text-green-400" /><p className="mt-2 font-medium text-theme-primary">NFC Tags</p><p className="text-theme-muted">Offline-ready</p></div>
          <div className="rounded-xl border border-theme-muted bg-surface-muted/40 p-4"><MapPin className="mx-auto h-6 w-6 text-blue-400" /><p className="mt-2 font-medium text-theme-primary">GPS Verified</p><p className="text-theme-muted">Real-time sync</p></div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} aria-label="Close" />
          <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">{editId ? 'Edit Route' : 'Add Patrol Route'}</h2><button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3">
              <div><label htmlFor="p-name" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Route Name *</label><input id="p-name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="Route name" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label htmlFor="p-cp" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Checkpoints</label><input id="p-cp" type="number" value={form.checkpoints} onChange={(e) => setForm((p) => ({ ...p, checkpoints: parseInt(e.target.value) || 0 }))} className={inputCls} /></div>
                <div><label htmlFor="p-status" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Status</label><select id="p-status" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className={inputCls}><option>Active</option><option>Completed</option><option>Paused</option></select></div>
              </div>
              <div><label htmlFor="p-officer" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Officer *</label><input id="p-officer" value={form.officer} onChange={(e) => setForm((p) => ({ ...p, officer: e.target.value }))} className={inputCls} placeholder="Officer name" /></div>
              <div><label htmlFor="p-time" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Time / ETA</label><input id="p-time" value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))} className={inputCls} placeholder="e.g. 45 min" /></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={handleSave} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Check className="inline h-4 w-4 mr-1" /> {editId ? 'Save' : 'Add Route'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
