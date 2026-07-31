import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Users, Clock, X, Plus, Check, Trash2 } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { getNotifications } from '@/admin/AdminData';

const iconMap = { alert: { icon: AlertTriangle, color: 'text-danger-400', bg: 'bg-danger-500/10' }, success: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10' }, info: { icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' }, warning: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' } };

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(() => getNotifications());
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [newNotif, setNewNotif] = useState({ title: '', desc: '', type: 'info' });

  const filtered = filter === 'all' ? notifs : notifs.filter((n) => n.type === filter);
  const unread = notifs.filter((n) => n.unread).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  const markRead = (id) => setNotifs((prev) => prev.map((x) => x.id === id ? { ...x, unread: false } : x));
  // eslint-disable-next-line no-alert
  const clearAll = () => { if (window.confirm('Clear all notifications?')) { setNotifs([]); } };
  const deleteNotif = (id) => setNotifs((prev) => prev.filter((n) => n.id !== id));

  const handleAdd = () => {
    if (!newNotif.title.trim()) { return; }
    const newId = Date.now();
    setNotifs((prev) => [{ id: newId, ...newNotif, time: 'Just now', unread: true }, ...prev]);
    setNewNotif({ title: '', desc: '', type: 'info' }); setShowForm(false);
  };

  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';

  return (
    <div className="space-y-6">
      <SEO title="Notifications — Admin" noIndex />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Notification Center</h1><p className="mt-1 text-sm text-theme-muted">{notifs.length} total · {unread} unread</p></div>
        <div className="flex gap-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-theme-muted bg-surface-raised px-3 py-2 text-xs text-theme-secondary focus:border-accent-500 focus:outline-none">
            <option value="all">All</option><option value="alert">Alerts</option><option value="warning">Warnings</option><option value="info">Info</option><option value="success">Success</option>
          </select>
          {unread > 0 && <button onClick={markAllRead} className="rounded-xl border border-theme-muted px-3 py-2 text-xs text-accent-400 transition-all hover:bg-accent-500/10"><Check className="inline h-3.5 w-3.5 mr-1" />Read All</button>}
          <button onClick={clearAll} className="rounded-xl border border-theme-muted px-3 py-2 text-xs text-theme-muted transition-all hover:border-danger-500/30 hover:text-danger-400"><Trash2 className="inline h-3.5 w-3.5 mr-1" />Clear</button>
          <button onClick={() => { setNewNotif({ title: '', desc: '', type: 'info' }); setShowForm(true); }} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Add</button>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((n) => {
          const ic = iconMap[n.type] || iconMap.info;
          const Nic = ic.icon;
          return (
            <div key={n.id} className={`flex items-start gap-4 rounded-2xl border p-4 transition-all hover:shadow-lg ${n.unread ? 'border-accent-500/20 bg-accent-500/[0.03]' : 'border-theme-muted bg-surface-raised'}`}>
              <button onClick={() => markRead(n.id)} className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ic.bg}`}><Nic className={`h-5 w-5 ${ic.color}`} /></button>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-theme-primary">{n.title} {n.unread && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-accent-500" />}</p><p className="mt-0.5 text-xs text-theme-muted">{n.desc}</p></div>
              <div className="flex items-center gap-1 shrink-0"><span className="text-[10px] text-theme-muted">{n.time}</span><button onClick={() => deleteNotif(n.id)} className="rounded-lg p-1 text-theme-muted hover:bg-danger-500/10 hover:text-danger-400"><X className="h-3.5 w-3.5" /></button></div>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="py-16 text-center"><CheckCircle2 className="mx-auto h-10 w-10 text-theme-muted" /><p className="mt-3 text-sm text-theme-muted">No notifications</p></div>}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} aria-label="Close" />
          <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">Add Notification</h2><button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3">
              <div><label htmlFor="n-title" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Title *</label><input id="n-title" value={newNotif.title} onChange={(e) => setNewNotif((p) => ({ ...p, title: e.target.value }))} className={inputCls} placeholder="Notification title" /></div>
              <div><label htmlFor="n-desc" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Description</label><input id="n-desc" value={newNotif.desc} onChange={(e) => setNewNotif((p) => ({ ...p, desc: e.target.value }))} className={inputCls} placeholder="Details" /></div>
              <div><label htmlFor="n-type" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Type</label><select id="n-type" value={newNotif.type} onChange={(e) => setNewNotif((p) => ({ ...p, type: e.target.value }))} className={inputCls}><option value="info">Info</option><option value="alert">Alert</option><option value="warning">Warning</option><option value="success">Success</option></select></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary">Cancel</button>
              <button onClick={handleAdd} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white"><Check className="inline h-4 w-4 mr-1" /> Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
