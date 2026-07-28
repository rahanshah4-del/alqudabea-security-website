import { MapPin, Clock, CheckCircle2, QrCode, Radio, AlertTriangle } from 'lucide-react';
import { SEO } from '@/components/SEO';

const ROUTES = [
  { id: 'R-001', name: 'Manama City Loop', checkpoints: 12, completed: 12, time: '45 min', status: 'Completed', officer: 'Mohammed Hassan' },
  { id: 'R-002', name: 'Riffa Residential Zone', checkpoints: 8, completed: 8, time: '32 min', status: 'Completed', officer: 'Ahmed Al Khalifa' },
  { id: 'R-003', name: 'Seef Commercial District', checkpoints: 15, completed: 13, time: 'In Progress', status: 'Active', officer: 'Rajesh Kumar' },
  { id: 'R-004', name: 'Amwaj Islands', checkpoints: 10, completed: 10, time: '28 min', status: 'Completed', officer: 'John Smith' },
  { id: 'R-005', name: 'Hidd Industrial Zone', checkpoints: 6, completed: 4, time: 'In Progress', status: 'Active', officer: 'Omar Farooq' },
];

const MISSED = [
  { route: 'Seef Commercial', checkpoint: 'CP-13', time: '14:30', reason: 'GPS signal lost' },
  { route: 'Seef Commercial', checkpoint: 'CP-14', time: '14:45', reason: 'Traffic delay' },
  { route: 'Hidd Industrial', checkpoint: 'CP-05', time: '15:10', reason: 'Road closure' },
  { route: 'Hidd Industrial', checkpoint: 'CP-06', time: '15:25', reason: 'Waiting investigation' },
];

export default function PatrolPage() {
  return (
    <div className="space-y-6">
      <SEO title="Patrols — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Patrol Management</h1><p className="mt-1 text-sm text-theme-muted">Real-time patrol tracking</p></div>
        <button className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><QrCode className="h-4 w-4" /> Generate QR Codes</button>
      </div>

      {/* Live Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { icon: Radio, label: 'Active Patrols', value: '2', color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { icon: CheckCircle2, label: 'Completed Today', value: '18', color: 'text-green-400', bg: 'bg-green-500/10' },
          { icon: AlertTriangle, label: 'Missed Checkpoints', value: '4', color: 'text-danger-400', bg: 'bg-danger-500/10' },
          { icon: Clock, label: 'Avg Response', value: '4.2m', color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center"><div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div><p className={`mt-2 font-sans text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-[10px] text-theme-muted uppercase tracking-wider">{s.label}</p></div>
        ))}
      </div>

      {/* Patrol Routes */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="font-sans text-lg font-semibold text-theme-primary">Active Routes</h2>
          {ROUTES.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-2xl border border-theme-muted bg-surface-raised p-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent-400" />
                <div><p className="font-medium text-theme-primary">{r.name}</p><p className="text-xs text-theme-muted">{r.officer} · {r.time}</p></div>
              </div>
              <div className="text-right"><p className="text-sm font-bold text-theme-primary">{r.completed}/{r.checkpoints}</p><p className={`text-[10px] font-bold ${r.status === 'Completed' ? 'text-green-400' : 'text-blue-400'}`}>{r.status}</p></div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <h2 className="flex items-center gap-2 font-sans text-lg font-semibold text-theme-primary"><AlertTriangle className="h-5 w-5 text-danger-400" /> Missed Checkpoints</h2>
          <div className="mt-3 space-y-2">
            {MISSED.map((m) => (
              <div key={`${m.route}-${m.checkpoint}`} className="rounded-xl border border-theme-muted bg-surface-muted/40 p-3"><p className="text-sm font-medium text-theme-primary">{m.route} — {m.checkpoint}</p><p className="mt-0.5 text-xs text-theme-muted">{m.time} · {m.reason}</p></div>
            ))}
          </div>
        </div>
      </div>

      {/* QR / NFC Architecture */}
      <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
        <h2 className="font-sans text-lg font-semibold text-theme-primary">QR &amp; NFC Checkpoint Architecture</h2>
        <p className="mt-2 text-sm text-theme-muted">Each checkpoint is tagged with a unique QR code. Officers scan using the mobile app. NFC tags available for offline verification. All scans are GPS-stamped and synced in real-time.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 text-center text-xs">
          <div className="rounded-xl border border-theme-muted bg-surface-muted/40 p-4"><QrCode className="mx-auto h-6 w-6 text-accent-400" /><p className="mt-2 font-medium text-theme-primary">QR Scanning</p><p className="text-theme-muted">Mobile app camera</p></div>
          <div className="rounded-xl border border-theme-muted bg-surface-muted/40 p-4"><Radio className="mx-auto h-6 w-6 text-green-400" /><p className="mt-2 font-medium text-theme-primary">NFC Tags</p><p className="text-theme-muted">Offline-ready</p></div>
          <div className="rounded-xl border border-theme-muted bg-surface-muted/40 p-4"><MapPin className="mx-auto h-6 w-6 text-blue-400" /><p className="mt-2 font-medium text-theme-primary">GPS Verified</p><p className="text-theme-muted">Real-time sync</p></div>
        </div>
      </div>
    </div>
  );
}
