import { QrCode, Clock, Car, Plus, Download } from 'lucide-react';
import { SEO } from '@/components/SEO';

const VISITORS = [
  { id: 'V-001', name: 'Abdulrahman Al Qahtani', host: 'Capt. Rashid', purpose: 'Meeting', entry: '09:15 AM', exit: '10:45 AM', vehicle: 'BH-12345', status: 'Exited' },
  { id: 'V-002', name: 'Emily Watson', host: 'Sarah Wilson', purpose: 'Site Inspection', entry: '10:00 AM', exit: '—', vehicle: 'BH-67890', status: 'Inside' },
  { id: 'V-003', name: 'Mohammed Al Buainain', host: 'Khalid Al Ansari', purpose: 'Contractor', entry: '11:30 AM', exit: '—', vehicle: 'BH-34567', status: 'Inside' },
  { id: 'V-004', name: 'Fatima Al Noaimi', host: 'Noor Al Balooshi', purpose: 'Interview', entry: '12:00 PM', exit: '12:45 PM', vehicle: '—', status: 'Exited' },
  { id: 'V-005', name: 'James Wilson', host: 'Abdullah Al Khalifa', purpose: 'Vendor Meeting', entry: '01:30 PM', exit: '03:15 PM', vehicle: 'BH-89012', status: 'Exited' },
];

export default function VisitorsPage() {
  return (
    <div className="space-y-6">
      <SEO title="Visitors — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Visitor Management</h1><p className="mt-1 text-sm text-theme-muted">{VISITORS.filter((v) => v.status === 'Inside').length} currently inside</p></div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-theme-muted px-4 py-2.5 text-sm text-theme-secondary transition-all hover:border-accent-500/30"><Download className="h-4 w-4" /> Export</button>
          <button className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> New Pass</button>
        </div>
      </div>

      {/* QR Architecture */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5 text-center">
          <QrCode className="mx-auto h-8 w-8 text-accent-400" /><p className="mt-2 font-medium text-theme-primary">QR Pass Generation</p><p className="text-xs text-theme-muted">Instant visitor QR codes</p>
        </div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5 text-center">
          <Clock className="mx-auto h-8 w-8 text-green-400" /><p className="mt-2 font-medium text-theme-primary">Real-Time Entry/Exit</p><p className="text-xs text-theme-muted">Auto time-stamped logging</p>
        </div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5 text-center">
          <Car className="mx-auto h-8 w-8 text-blue-400" /><p className="mt-2 font-medium text-theme-primary">Vehicle Registration</p><p className="text-xs text-theme-muted">Plate number tracking</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-theme-muted">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-theme-muted bg-surface-muted/40">
            <tr>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Visitor</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Host</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Purpose</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Entry</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Exit</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Vehicle</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {VISITORS.map((v) => (
              <tr key={v.id} className="border-b border-theme-muted transition-colors hover:bg-surface-muted/40">
                <td className="px-4 py-3 font-medium text-theme-primary">{v.name}</td>
                <td className="px-4 py-3 text-theme-secondary">{v.host}</td>
                <td className="px-4 py-3 text-theme-secondary">{v.purpose}</td>
                <td className="px-4 py-3 text-theme-secondary">{v.entry}</td>
                <td className="px-4 py-3 text-theme-secondary">{v.exit}</td>
                <td className="px-4 py-3 font-mono text-xs text-theme-muted">{v.vehicle}</td>
                <td className="px-4 py-3"><span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${v.status === 'Inside' ? 'bg-green-500/10 text-green-400' : 'bg-neutral-500/10 text-neutral-400'}`}>{v.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
