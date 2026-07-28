import { Shield, AlertTriangle, Car, Wrench, Activity, MapPin, Thermometer, CloudRain } from 'lucide-react';
import { SEO } from '@/components/SEO';

const STATUS = [
  { icon: Shield, label: 'Threat Level', value: 'Low', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: AlertTriangle, label: 'Active Incidents', value: '3', color: 'text-danger-400', bg: 'bg-danger-500/10' },
  { icon: Car, label: 'Patrols Active', value: '24/28', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Wrench, label: 'Equipment Status', value: '94%', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: Activity, label: 'Site Health', value: '98.5%', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: MapPin, label: 'Sites Covered', value: '87', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
];

const SITES = [
  { name: 'Manama HQ', guards: 45, status: 'Operational', color: 'text-green-400' },
  { name: 'Riffa Complex', guards: 28, status: 'Operational', color: 'text-green-400' },
  { name: 'Muharraq Site', guards: 18, status: 'Alert', color: 'text-amber-400' },
  { name: 'Amwaj Islands', guards: 32, status: 'Operational', color: 'text-green-400' },
  { name: 'Seef District', guards: 22, status: 'Operational', color: 'text-green-400' },
  { name: 'Hidd Industrial', guards: 15, status: 'Maintenance', color: 'text-neutral-400' },
];

export default function CommandPage() {
  return (
    <div className="space-y-6">
      <SEO title="Command Center — Admin" noIndex />
      <div>
        <h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Smart Command Center</h1>
        <p className="mt-1 text-sm text-theme-muted">Real-time operations overview and monitoring.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {STATUS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center transition-all hover:shadow-lg">
            <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div>
            <p className={`mt-3 font-sans text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-[10px] text-theme-muted uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-theme-muted bg-surface-raised p-6">
          <h2 className="font-sans text-lg font-semibold text-theme-primary">Site Status</h2>
          <div className="mt-4 space-y-2">
            {SITES.map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-3">
                <div><p className="text-sm font-medium text-theme-primary">{s.name}</p><p className="text-xs text-theme-muted">{s.guards} guards</p></div>
                <span className={`font-mono text-xs font-bold ${s.color}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5 text-center">
            <Thermometer className="mx-auto h-6 w-6 text-amber-400" />
            <p className="mt-2 font-sans text-2xl font-bold text-theme-primary">34°C</p>
            <p className="text-xs text-theme-muted">Manama, Bahrain</p>
          </div>
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5 text-center">
            <CloudRain className="mx-auto h-6 w-6 text-blue-400" />
            <p className="mt-1 text-xs text-theme-muted">Weather Forecast</p>
            <p className="text-sm text-theme-primary">Clear skies — No weather alerts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
