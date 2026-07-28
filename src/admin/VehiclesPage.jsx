import { useMemo } from 'react';
import { Car, Wrench, Fuel, Shield, Plus } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { getVehicles } from '@/admin/AdminData';

export default function VehiclesPage() {
  const fleet = useMemo(() => getVehicles(), []);
  return (
    <div className="space-y-6">
      <SEO title="Vehicles — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Vehicle Management</h1><p className="mt-1 text-sm text-theme-muted">{fleet.length} vehicles · {fleet.filter((v) => v.status === 'Active').length} active</p></div>
        <button className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Add Vehicle</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Car, label: 'Active', value: fleet.filter((v) => v.status === 'Active').length, color: 'text-green-400', bg: 'bg-green-500/10' },
          { icon: Wrench, label: 'Maintenance', value: fleet.filter((v) => v.status === 'Maintenance').length, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: Fuel, label: 'Avg Fuel', value: '58%', color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { icon: Shield, label: 'Insured', value: `${fleet.filter((v) => v.insurance === 'Valid').length}/${fleet.length}`, color: 'text-green-400', bg: 'bg-green-500/10' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center"><div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div><p className={`mt-2 font-sans text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-[10px] text-theme-muted uppercase tracking-wider">{s.label}</p></div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-theme-muted">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-theme-muted bg-surface-muted/40"><tr><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Vehicle</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Plate</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Driver</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Status</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Fuel</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted hidden lg:table-cell">Insurance</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted hidden lg:table-cell">Next Maint.</th></tr></thead>
          <tbody>{fleet.map((v) => (
            <tr key={v.id} className="border-b border-theme-muted transition-colors hover:bg-surface-muted/40">
              <td className="px-4 py-3"><p className="font-medium text-theme-primary">{v.type}</p><p className="text-[10px] text-theme-muted">{v.year}</p></td>
              <td className="px-4 py-3 font-mono text-xs text-theme-secondary">{v.plate}</td><td className="px-4 py-3 text-theme-secondary">{v.driver}</td>
              <td className="px-4 py-3"><span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${v.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>{v.status}</span></td>
              <td className="px-4 py-3 text-theme-secondary">{v.fuel}</td><td className="px-4 py-3 hidden lg:table-cell"><span className={`text-[10px] font-bold ${v.insurance === 'Valid' ? 'text-green-400' : 'text-amber-400'}`}>{v.insurance}</span></td>
              <td className="px-4 py-3 hidden lg:table-cell text-theme-muted">{v.maint}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
