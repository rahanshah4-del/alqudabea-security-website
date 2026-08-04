import { useState, useEffect } from 'react';
import { Car, Wrench, Fuel, Shield, Plus, X, Check, Edit3, Trash2 } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { VehiclesAPI } from '@/firebase/services';
import { getVehicles } from '@/admin/AdminData';

export default function VehiclesPage() {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ plate: '', type: '', year: '2026', driver: 'Unassigned', status: 'Active', fuel: '100%', insurance: 'Valid', maint: '' });

  useEffect(() => {
    getVehicles().then((data) => { setFleet(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const openAdd = () => { setEditId(null); setForm({ plate: '', type: '', year: '2026', driver: 'Unassigned', status: 'Active', fuel: '100%', insurance: 'Valid', maint: '' }); setShowForm(true); };
  const openEdit = (v) => { setEditId(v.id); setForm({ plate: v.plate, type: v.type, year: v.year, driver: v.driver, status: v.status, fuel: v.fuel, insurance: v.insurance, maint: v.maint }); setShowForm(true); };

  const handleSave = async () => {
    if (!form.plate.trim() || !form.type.trim()) { return; }
    if (editId) {
      await VehiclesAPI.update(editId, form);
      setFleet((prev) => prev.map((v) => v.id === editId ? { ...v, ...form } : v));
    } else {
      const newId = await VehiclesAPI.add(form);
      if (newId) { setFleet((prev) => [{ id: newId, ...form }, ...prev]); }
    }
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await VehiclesAPI.delete(id);
    setFleet((prev) => prev.filter((v) => v.id !== id));
  };

  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';
  const activeCount = fleet.filter((v) => v.status === 'Active').length;
  const maintCount = fleet.filter((v) => v.status === 'Maintenance').length;
  const insuredCount = fleet.filter((v) => v.insurance === 'Valid').length;
  const avgFuel = fleet.length > 0 ? Math.round(fleet.filter((v) => v.fuel && v.fuel !== '—').reduce((s, v) => s + parseInt(v.fuel), 0) / fleet.filter((v) => v.fuel && v.fuel !== '—').length) + '%' : '—';

  return (
    <div className="space-y-6">
      <SEO title="Vehicles — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Vehicle Management</h1><p className="mt-1 text-sm text-theme-muted">{loading ? 'Loading...' : `${fleet.length} vehicles · ${activeCount} active · ${maintCount} maintenance`}</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Add Vehicle</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { icon: Car, label: 'Active', value: activeCount, color: 'text-green-400', bg: 'bg-green-500/10' },
          { icon: Wrench, label: 'Maintenance', value: maintCount, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: Fuel, label: 'Avg Fuel', value: avgFuel, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { icon: Shield, label: 'Insured', value: fleet.length > 0 ? `${insuredCount}/${fleet.length}` : '—', color: 'text-green-400', bg: 'bg-green-500/10' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center"><div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div><p className={`mt-2 font-sans text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-[10px] text-theme-muted uppercase tracking-wider">{s.label}</p></div>
        ))}
      </div>

      {loading ? (
        <div className="py-16 text-center"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" /><p className="mt-4 text-sm text-theme-muted">Loading vehicles...</p></div>
      ) : fleet.length === 0 ? (
        <div className="py-16 text-center"><Car className="mx-auto h-10 w-10 text-theme-muted" /><p className="mt-3 text-sm text-theme-muted">No vehicles added yet. Click "Add Vehicle" to get started.</p></div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-theme-muted">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-theme-muted bg-surface-muted/40"><tr><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Vehicle</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Plate</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Driver</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Status</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Fuel</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted hidden lg:table-cell">Insurance</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted hidden lg:table-cell">Next Maint.</th><th className="px-4 py-3" /></tr></thead>
            <tbody>{fleet.map((v) => (
              <tr key={v.id} className="border-b border-theme-muted transition-colors hover:bg-surface-muted/40">
                <td className="px-4 py-3"><p className="font-medium text-theme-primary">{v.type}</p><p className="text-[10px] text-theme-muted">{v.year}</p></td>
                <td className="px-4 py-3 font-mono text-xs text-theme-secondary">{v.plate}</td><td className="px-4 py-3 text-theme-secondary">{v.driver}</td>
                <td className="px-4 py-3"><span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${v.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>{v.status}</span></td>
                <td className="px-4 py-3 text-theme-secondary">{v.fuel}</td><td className="px-4 py-3 hidden lg:table-cell"><span className={`text-[10px] font-bold ${v.insurance === 'Valid' ? 'text-green-400' : 'text-amber-400'}`}>{v.insurance}</span></td>
                <td className="px-4 py-3 hidden lg:table-cell text-theme-muted">{v.maint}</td>
                <td className="px-4 py-3"><div className="flex gap-1"><button onClick={() => openEdit(v)} className="rounded-lg p-1.5 text-theme-muted hover:bg-surface-overlay hover:text-accent-400"><Edit3 className="h-3.5 w-3.5" /></button><button onClick={() => handleDelete(v.id)} className="rounded-lg p-1.5 text-theme-muted hover:bg-surface-overlay hover:text-danger-400"><Trash2 className="h-3.5 w-3.5" /></button></div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} aria-label="Close" />
          <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">{editId ? 'Edit Vehicle' : 'Add Vehicle'}</h2><button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><label htmlFor="vh-plate" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Plate *</label><input id="vh-plate" value={form.plate} onChange={(e) => setForm((p) => ({ ...p, plate: e.target.value }))} className={inputCls} placeholder="BH-XXXXX" /></div>
              <div><label htmlFor="vh-type" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Type *</label><input id="vh-type" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} className={inputCls} placeholder="e.g. Ford Explorer" /></div>
              <div><label htmlFor="vh-year" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Year</label><input id="vh-year" value={form.year} onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))} className={inputCls} /></div>
              <div><label htmlFor="vh-driver" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Driver</label><input id="vh-driver" value={form.driver} onChange={(e) => setForm((p) => ({ ...p, driver: e.target.value }))} className={inputCls} /></div>
              <div><label htmlFor="vh-status" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Status</label><select id="vh-status" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className={inputCls}><option>Active</option><option>Maintenance</option><option>Retired</option></select></div>
              <div><label htmlFor="vh-fuel" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Fuel</label><input id="vh-fuel" value={form.fuel} onChange={(e) => setForm((p) => ({ ...p, fuel: e.target.value }))} className={inputCls} placeholder="e.g. 75%" /></div>
              <div><label htmlFor="vh-insurance" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Insurance</label><select id="vh-insurance" value={form.insurance} onChange={(e) => setForm((p) => ({ ...p, insurance: e.target.value }))} className={inputCls}><option>Valid</option><option>Expiring</option><option>Expired</option></select></div>
              <div><label htmlFor="vh-maint" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Next Maint.</label><input id="vh-maint" type="date" value={form.maint} onChange={(e) => setForm((p) => ({ ...p, maint: e.target.value }))} className={inputCls} /></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={handleSave} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Check className="inline h-4 w-4 mr-1" /> {editId ? 'Save' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
