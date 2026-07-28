import { AlertTriangle, Clock, Image, FileText, MoreVertical, Plus } from 'lucide-react';
import { SEO } from '@/components/SEO';

const INCIDENTS = [
  { id: 'INC-001', title: 'Unauthorized Access — Gate B', site: 'Manama HQ Tower', severity: 'High', time: '09:45 AM', status: 'Resolved', officer: 'Ahmed Al Khalifa', description: 'Individual attempted to enter without valid credentials. Detained and handed over to authorities.' },
  { id: 'INC-002', title: 'Fire Alarm Triggered', site: 'Riffa Gardens', severity: 'High', time: '11:20 AM', status: 'Investigating', officer: 'Omar Bucheeri', description: 'Smoke detector activated in Block C. Civil Defence notified. No visible fire. Investigating cause.' },
  { id: 'INC-003', title: 'Vehicle Collision — Parking', site: 'The Gulf Hotel', severity: 'Medium', time: '02:15 PM', status: 'Resolved', officer: 'Khalid Al Ansari', description: 'Minor collision between two vehicles in guest parking. Police report filed. No injuries.' },
  { id: 'INC-004', title: 'Suspicious Package Found', site: 'Bahrain Airport', severity: 'High', time: '04:00 PM', status: 'Resolved', officer: 'Abdullah Al Khalifa', description: 'Unattended bag in Terminal 1. EOD team cleared. Area reopened after 45 minutes.' },
  { id: 'INC-005', title: 'Medical Emergency', site: 'Alba Smelter', severity: 'Medium', time: '06:30 PM', status: 'Resolved', officer: 'Hassan Al Qahtani', description: 'Worker reported dizziness. First aid administered on site. Transported to hospital for observation.' },
];

const sevCls = (s) => s === 'High' ? 'bg-danger-500/10 text-danger-400' : 'bg-amber-500/10 text-amber-400';
const statCls = (s) => s === 'Resolved' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400';

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <SEO title="Incidents — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Incident Management</h1><p className="mt-1 text-sm text-theme-muted">{INCIDENTS.length} incidents logged</p></div>
        <button className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Report Incident</button>
      </div>
      <div className="space-y-3">
        {INCIDENTS.map((inc) => (
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
            <div className="mt-4 flex gap-3">
              <button className="flex items-center gap-1.5 rounded-lg bg-surface-muted/40 px-3 py-1.5 text-xs text-theme-muted transition-colors hover:text-theme-primary"><Image className="h-3.5 w-3.5" /> Evidence</button>
              <button className="flex items-center gap-1.5 rounded-lg bg-surface-muted/40 px-3 py-1.5 text-xs text-theme-muted transition-colors hover:text-theme-primary"><FileText className="h-3.5 w-3.5" /> Report</button>
              <button className="flex items-center gap-1.5 rounded-lg bg-surface-muted/40 px-3 py-1.5 text-xs text-theme-muted transition-colors hover:text-theme-primary"><MoreVertical className="h-3.5 w-3.5" /> Actions</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
