import { useState, useEffect } from 'react';
import { Sun, Moon, Sunset, ChevronLeft, ChevronRight, Plus, RefreshCw, X, Check, Edit3, Trash2 } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { cn } from '@/utils/cn';
import { getShifts } from '@/admin/AdminData';
import { addDocument, updateDocument, deleteDocument } from '@/firebase/services';

const TABS = [
  { id: 'morning', label: 'Morning', icon: Sun, color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/5' },
  { id: 'evening', label: 'Evening', icon: Sunset, color: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-500/5' },
  { id: 'night', label: 'Night', icon: Moon, color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/5' },
];

export default function ShiftsPage() {
  const [shifts, setShifts] = useState({ morning: [], evening: [], night: [] });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('morning');
  const [weekOffset, setWeekOffset] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', site: '', time: '', days: 'Sun-Thu', shift: 'morning' });

  useEffect(() => {
    getShifts().then((data) => {
      setShifts({ morning: data.morning || [], evening: data.evening || [], night: data.night || [] });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const active = TABS.find((t) => t.id === tab);
  const currentData = shifts[tab];

  const getWeekLabel = () => {
    const d = new Date(); d.setDate(d.getDate() + weekOffset * 7);
    const start = new Date(d); start.setDate(d.getDate() - d.getDay());
    const end = new Date(start); end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} — ${end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  };

  const openAdd = () => { setEditId(null); setForm({ name: '', site: '', time: '', days: 'Sun-Thu', shift: tab }); setShowForm(true); };
  const openEdit = (s) => { setEditId(s.id); setForm({ name: s.name, site: s.site, time: s.time, days: s.days, shift: tab }); setShowForm(true); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.site.trim() || !form.time.trim()) { return; }
    const shiftData = { name: form.name, site: form.site, time: form.time, days: form.days, shift: form.shift };
    if (editId) {
      await updateDocument('shifts', editId, shiftData);
      setShifts((prev) => {
        const updated = { ...prev };
        for (const key of Object.keys(updated)) {
          updated[key] = updated[key].map((s) => s.id === editId ? { ...s, ...shiftData } : s);
        }
        return updated;
      });
    } else {
      const newId = await addDocument('shifts', shiftData);
      if (newId) {
        setShifts((prev) => ({ ...prev, [form.shift]: [...prev[form.shift], { id: newId, ...shiftData }] }));
      }
    }
    setShowForm(false);
  };

  const handleDelete = async (shiftKey, id) => {
    await deleteDocument('shifts', id);
    setShifts((prev) => ({ ...prev, [shiftKey]: prev[shiftKey].filter((s) => s.id !== id) }));
  };

  const handleAutoAssign = () => {
    // eslint-disable-next-line no-alert
    window.confirm('Auto-assign will distribute guards evenly across shifts. Continue?');
  };

  const totalShifts = Object.values(shifts).flat().length;
  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';

  return (
    <div className="space-y-6">
      <SEO title="Shift Management — Admin" noIndex />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Shift Management</h1><p className="mt-1 text-sm text-theme-muted">{loading ? 'Loading...' : `${totalShifts} shifts scheduled`}</p></div>
        <div className="flex gap-2">
          <button onClick={handleAutoAssign} className="flex items-center gap-2 rounded-xl border border-theme-muted px-3 py-2 text-sm text-theme-secondary transition-all hover:border-accent-500/30"><RefreshCw className="h-4 w-4" /> Auto Assign</button>
          <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Add Shift</button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-theme-muted bg-surface-raised px-4 py-3">
        <button onClick={() => setWeekOffset((p) => p - 1)} className="rounded-lg p-1 text-theme-muted transition-colors hover:text-theme-primary"><ChevronLeft className="h-5 w-5" /></button>
        <span className="font-sans text-sm font-semibold text-theme-primary">{getWeekLabel()}</span>
        <button onClick={() => setWeekOffset((p) => p + 1)} className="rounded-lg p-1 text-theme-muted transition-colors hover:text-theme-primary"><ChevronRight className="h-5 w-5" /></button>
      </div>

      <div className="flex gap-2">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cn('flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all', tab === t.id ? `bg-surface-raised border shadow-sm ${t.border}` : 'text-theme-muted hover:text-theme-primary')}>
            <t.icon className={cn('h-4 w-4', t.color)} /> {t.label} <span className="text-[10px] text-theme-muted">({shifts[t.id].length})</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-16 text-center"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" /><p className="mt-4 text-sm text-theme-muted">Loading shifts...</p></div>
      ) : currentData.length === 0 ? (
        <div className="py-16 text-center"><active.icon className={cn('mx-auto h-10 w-10', active.color)} /><p className="mt-3 text-sm text-theme-muted">{totalShifts === 0 ? 'No shifts scheduled yet. Click "Add Shift" to get started.' : 'No shifts in this category.'}</p></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentData.map((s) => (
            <div key={s.id} className={`rounded-2xl border border-theme-muted bg-surface-raised p-5 transition-all hover:shadow-lg ${active.border} ${active.bg}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 text-xs font-bold text-accent-400">{s.name.split(' ').map((n) => n[0]).join('')}</div>
                  <div><p className="text-sm font-medium text-theme-primary">{s.name}</p><p className="text-[10px] text-theme-muted">{s.id}</p></div>
                </div>
                <active.icon className={cn('h-5 w-5', active.color)} />
              </div>
              <div className="mt-4 space-y-2 rounded-xl border border-theme-muted bg-surface-muted/40 p-3">
                <div className="flex justify-between text-xs"><span className="text-theme-muted">Site</span><span className="font-medium text-theme-primary">{s.site}</span></div>
                <div className="flex justify-between text-xs"><span className="text-theme-muted">Time</span><span className="font-medium text-theme-primary">{s.time}</span></div>
                <div className="flex justify-between text-xs"><span className="text-theme-muted">Days</span><span className="font-medium text-theme-primary">{s.days}</span></div>
              </div>
              <div className="mt-3 flex gap-1 border-t border-theme-muted pt-3">
                <button onClick={() => openEdit(s)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] text-theme-muted transition-colors hover:bg-surface-overlay hover:text-accent-400"><Edit3 className="h-3 w-3" /> Edit</button>
                <button onClick={() => handleDelete(tab, s.id)} className="ml-auto flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] text-theme-muted transition-colors hover:bg-danger-500/10 hover:text-danger-400"><Trash2 className="h-3 w-3" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} aria-label="Close" />
          <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">{editId ? 'Edit Shift' : 'Add Shift'}</h2><button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3">
              <div><label htmlFor="s-name" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Guard Name *</label><input id="s-name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="Full name" /></div>
              <div><label htmlFor="s-site" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Site *</label><input id="s-site" value={form.site} onChange={(e) => setForm((p) => ({ ...p, site: e.target.value }))} className={inputCls} placeholder="Site name" /></div>
              <div><label htmlFor="s-time" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Time *</label><input id="s-time" value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))} className={inputCls} placeholder="e.g. 06:00 - 14:00" /></div>
              <div><label htmlFor="s-days" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Days</label><select id="s-days" value={form.days} onChange={(e) => setForm((p) => ({ ...p, days: e.target.value }))} className={inputCls}><option>Sun-Thu</option><option>Mon-Sat</option><option>Sun-Sat</option><option>Custom</option></select></div>
              <div><label htmlFor="s-shift" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Shift</label><select id="s-shift" value={form.shift} onChange={(e) => setForm((p) => ({ ...p, shift: e.target.value }))} className={inputCls}>{TABS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={handleSave} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Check className="inline h-4 w-4 mr-1" /> {editId ? 'Save' : 'Add Shift'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
