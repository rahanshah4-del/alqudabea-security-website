import { useState, useEffect } from 'react';
import { Search, Download, Printer, X, Trash2, Edit3, Check, UserPlus, Shield, MapPin, Building2, ArrowRightLeft } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { cn } from '@/utils/cn';
import { GuardsAPI } from '@/firebase/services';
import { getGuards } from '@/admin/AdminData';
import { getCollection, updateDocument } from '@/firebase/services';

const DEPTS = ['All Departments', 'Manned Guarding', 'Mobile Patrol', 'CCTV Monitoring', 'Event Security', 'VIP Protection', 'Access Control', 'Reception Security', 'Industrial Security'];
const STATUSES = ['All Status', 'On Duty', 'Off Duty', 'Leave'];

const statusCls = (s) => cn('rounded-lg px-2 py-0.5 text-[10px] font-bold', s === 'On Duty' ? 'bg-green-500/10 text-green-400' : s === 'Off Duty' ? 'bg-neutral-500/10 text-neutral-400' : 'bg-amber-500/10 text-amber-400');
const docCls = (v) => cn('rounded px-1.5 py-0.5 text-[9px] font-bold', v === 'Valid' || v === 'N/A' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400');

export default function GuardsPage() {
  const [guards, setGuards] = useState([]);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [siteFilter, setSiteFilter] = useState('All Sites');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showAssign, setShowAssign] = useState(null); // guard id being assigned
  const [form, setForm] = useState({ name: '', dept: 'Manned Guarding', position: '', nationality: 'Bahraini', joinDate: '', status: 'On Duty', cpr: 'Valid', visa: 'N/A', passport: 'Valid', assignedSite: '' });

  useEffect(() => {
    Promise.all([getGuards(), getCollection('sites')])
      .then(([g, s]) => { setGuards(g); setSites(s); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const getSiteName = (siteId) => {
    if (!siteId) { return '—'; }
    const site = sites.find((s) => s.id === siteId);
    return site ? site.name : siteId;
  };

  const filtered = guards.filter((g) => {
    if (search && !g.name.toLowerCase().includes(search.toLowerCase()) && !g.id.toLowerCase().includes(search.toLowerCase())) { return false; }
    if (deptFilter !== 'All Departments' && g.dept !== deptFilter) { return false; }
    if (statusFilter !== 'All Status' && g.status !== statusFilter) { return false; }
    if (siteFilter !== 'All Sites') {
      if (siteFilter === 'Unassigned') { return !g.assignedSite; }
      return g.assignedSite === siteFilter;
    }
    return true;
  });

  // Stats
  const assignedCount = guards.filter((g) => g.assignedSite).length;
  const unassignedCount = guards.filter((g) => !g.assignedSite).length;
  const onDutyCount = guards.filter((g) => g.status === 'On Duty').length;

  const openAdd = () => { setEditId(null); setForm({ name: '', dept: 'Manned Guarding', position: '', nationality: 'Bahraini', joinDate: '', status: 'On Duty', cpr: 'Valid', visa: 'N/A', passport: 'Valid', assignedSite: '' }); setShowForm(true); };
  const openEdit = (g) => { setEditId(g.id); setForm({ name: g.name, dept: g.dept, position: g.position, nationality: g.nationality, joinDate: g.joinDate, status: g.status, cpr: g.cpr, visa: g.visa, passport: g.passport, assignedSite: g.assignedSite || '' }); setShowForm(true); };

  const handleSave = async () => {
    if (!form.name.trim()) { return; }
    if (editId) {
      await GuardsAPI.update(editId, form);
      setGuards((prev) => prev.map((g) => g.id === editId ? { ...g, ...form } : g));
    } else {
      const newId = await GuardsAPI.add(form);
      if (newId) { setGuards((prev) => [{ id: newId, ...form }, ...prev]); }
    }
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await GuardsAPI.delete(id);
    setGuards((prev) => prev.filter((g) => g.id !== id));
  };

  const handleAssignSite = async (guardId, siteId) => {
    await updateDocument('guards', guardId, { assignedSite: siteId || '' });
    setGuards((prev) => prev.map((g) => g.id === guardId ? { ...g, assignedSite: siteId || '' } : g));
    setShowAssign(null);
  };

  const selectCls = 'rounded-xl border border-theme-muted bg-surface-raised px-3 py-2 text-xs text-theme-secondary focus:border-accent-500 focus:outline-none';
  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';

  return (
    <div className="space-y-6">
      <SEO title="Guard Management — Admin" noIndex />

      {/* Header + Stats Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Guard Management</h1>
          <p className="mt-1 text-sm text-theme-muted">{loading ? 'Loading...' : `${guards.length} guards · ${onDutyCount} on duty · ${assignedCount} assigned to sites · ${unassignedCount} unassigned`}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl border border-theme-muted p-2.5 text-sm text-theme-secondary transition-all hover:border-accent-500/30" title="Export"><Download className="h-4 w-4" /></button>
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl border border-theme-muted p-2.5 text-sm text-theme-secondary transition-all hover:border-accent-500/30" title="Print"><Printer className="h-4 w-4" /></button>
          <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><UserPlus className="h-4 w-4" /> Add Guard</button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Guards', value: guards.length, color: 'text-blue-400', icon: Shield },
          { label: 'On Duty', value: onDutyCount, color: 'text-green-400', icon: Check },
          { label: 'Assigned to Sites', value: assignedCount, color: 'text-accent-400', icon: Building2 },
          { label: 'Unassigned', value: unassignedCount, color: 'text-amber-400', icon: MapPin },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-theme-muted bg-surface-raised p-3 text-center">
            <s.icon className={`mx-auto h-5 w-5 ${s.color}`} />
            <p className={`mt-1 font-sans text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-theme-muted uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-muted" /><input type="text" placeholder="Search name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-theme-muted bg-surface-raised py-2.5 pl-10 pr-4 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none" /></div>
        <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className={selectCls}>{DEPTS.map((d) => <option key={d}>{d}</option>)}</select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectCls}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
        <select value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)} className={selectCls}>
          <option value="All Sites">All Sites</option>
          <option value="Unassigned">⚠ Unassigned</option>
          {sites.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      {/* Guards Table */}
      {loading ? (
        <div className="py-16 text-center"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" /><p className="mt-4 text-sm text-theme-muted">Loading guards...</p></div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center"><Shield className="mx-auto h-10 w-10 text-theme-muted" /><p className="mt-3 text-sm text-theme-muted">{guards.length === 0 ? 'No guards added yet. Click "Add Guard" to get started.' : 'No guards match your filters.'}</p></div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-theme-muted">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-theme-muted bg-surface-muted/40"><tr>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Guard</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Dept</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Assigned Site</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted hidden lg:table-cell">Position</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted hidden lg:table-cell">Joined</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Status</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">CPR/Visa</th>
              <th className="px-4 py-3" />
            </tr></thead>
            <tbody>{filtered.map((g) => (
              <tr key={g.id} className="border-b border-theme-muted transition-colors hover:bg-surface-muted/40">
                <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 text-xs font-bold text-accent-400">{g.name.split(' ').map((n) => n[0]).join('')}</div><div><p className="font-medium text-theme-primary">{g.name}</p><p className="text-[10px] text-theme-muted">{g.id}</p></div></div></td>
                <td className="px-4 py-3 text-theme-secondary">{g.dept}</td>
                <td className="px-4 py-3">
                  {g.assignedSite ? (
                    <span className="flex items-center gap-1 rounded-lg bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-400">
                      <MapPin className="h-3 w-3" />{getSiteName(g.assignedSite)}
                    </span>
                  ) : (
                    <span className="rounded-lg bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400">Unassigned</span>
                  )}
                </td>
                <td className="px-4 py-3 text-theme-secondary hidden lg:table-cell">{g.position}</td>
                <td className="px-4 py-3 text-theme-muted hidden lg:table-cell">{g.joinDate}</td>
                <td className="px-4 py-3"><span className={statusCls(g.status)}>{g.status}</span></td>
                <td className="px-4 py-3"><div className="flex gap-1"><span className={docCls(g.cpr)}>CPR</span><span className={docCls(g.visa === 'Valid' || g.visa === 'N/A' ? 'Valid' : 'Expiring')}>VISA</span></div></td>
                <td className="px-4 py-3 relative">
                  <div className="flex gap-1">
                    {/* Quick Assign Button */}
                    <button onClick={() => setShowAssign(showAssign === g.id ? null : g.id)} className="rounded-lg p-1.5 text-theme-muted transition-colors hover:bg-accent-500/10 hover:text-accent-400" title="Assign to Site"><ArrowRightLeft className="h-3.5 w-3.5" /></button>
                    <button onClick={() => openEdit(g)} className="rounded-lg p-1.5 text-theme-muted transition-colors hover:bg-surface-overlay hover:text-accent-400" title="Edit"><Edit3 className="h-3.5 w-3.5" /></button>
                    <button onClick={() => handleDelete(g.id)} className="rounded-lg p-1.5 text-theme-muted transition-colors hover:bg-surface-overlay hover:text-danger-400" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>

                  {/* Inline Assign Dropdown */}
                  {showAssign === g.id && (
                    <div className="absolute right-0 z-50 mt-1 w-56 rounded-xl border border-theme-muted bg-surface-raised p-2 shadow-overlay">
                      <p className="mb-2 text-[10px] font-bold text-theme-muted uppercase px-2">Assign to Site</p>
                      <div className="max-h-40 overflow-y-auto space-y-0.5">
                        <button
                          onClick={() => handleAssignSite(g.id, '')}
                          className={`w-full rounded-lg px-3 py-1.5 text-left text-xs transition-colors ${!g.assignedSite ? 'bg-accent-500/10 text-accent-400 font-bold' : 'text-theme-muted hover:bg-surface-muted'}`}
                        >
                          ⚠ Unassigned
                        </button>
                        {sites.map((site) => (
                          <button
                            key={site.id}
                            onClick={() => handleAssignSite(g.id, site.id)}
                            className={`w-full rounded-lg px-3 py-1.5 text-left text-xs transition-colors ${g.assignedSite === site.id ? 'bg-accent-500/10 text-accent-400 font-bold' : 'text-theme-muted hover:bg-surface-muted'}`}
                          >
                            <MapPin className="inline h-3 w-3 mr-1" />{site.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Guard Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} aria-label="Close" />
          <div className="glass relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">{editId ? 'Edit Guard' : 'Add New Guard'}</h2><button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><label htmlFor="g-name" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Full Name *</label><input id="g-name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="Full name" /></div>
              <div><label htmlFor="g-dept" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Department</label><select id="g-dept" value={form.dept} onChange={(e) => setForm((p) => ({ ...p, dept: e.target.value }))} className={inputCls}>{DEPTS.filter((d) => d !== 'All Departments').map((d) => <option key={d}>{d}</option>)}</select></div>
              <div><label htmlFor="g-pos" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Position</label><input id="g-pos" value={form.position} onChange={(e) => setForm((p) => ({ ...p, position: e.target.value }))} className={inputCls} placeholder="e.g. Senior Officer" /></div>

              {/* ASSIGNED SITE FIELD */}
              <div className="sm:col-span-2">
                <label htmlFor="g-site" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Assigned Site</label>
                <select id="g-site" value={form.assignedSite} onChange={(e) => setForm((p) => ({ ...p, assignedSite: e.target.value }))} className={inputCls}>
                  <option value="">— Unassigned —</option>
                  {sites.map((site) => <option key={site.id} value={site.id}>{site.name} ({site.type})</option>)}
                </select>
              </div>

              <div><label htmlFor="g-nat" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Nationality</label><input id="g-nat" value={form.nationality} onChange={(e) => setForm((p) => ({ ...p, nationality: e.target.value }))} className={inputCls} /></div>
              <div><label htmlFor="g-date" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Join Date</label><input id="g-date" type="date" value={form.joinDate} onChange={(e) => setForm((p) => ({ ...p, joinDate: e.target.value }))} className={inputCls} /></div>
              <div><label htmlFor="g-status" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Status</label><select id="g-status" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className={inputCls}><option>On Duty</option><option>Off Duty</option><option>Leave</option></select></div>
              <div><label htmlFor="g-cpr" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">CPR</label><select id="g-cpr" value={form.cpr} onChange={(e) => setForm((p) => ({ ...p, cpr: e.target.value }))} className={inputCls}><option>Valid</option><option>Expiring</option><option>Expired</option></select></div>
              <div><label htmlFor="g-visa" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Visa</label><input id="g-visa" value={form.visa} onChange={(e) => setForm((p) => ({ ...p, visa: e.target.value }))} className={inputCls} placeholder="N/A or Expiry date" /></div>
              <div><label htmlFor="g-passport" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Passport</label><select id="g-passport" value={form.passport} onChange={(e) => setForm((p) => ({ ...p, passport: e.target.value }))} className={inputCls}><option>Valid</option><option>Expiring</option><option>Expired</option></select></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={handleSave} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Check className="inline h-4 w-4 mr-1" /> {editId ? 'Save Changes' : 'Add Guard'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Close assign dropdown on outside click */}
      {showAssign && <div className="fixed inset-0 z-40" onClick={() => setShowAssign(null)} />}
    </div>
  );
}
