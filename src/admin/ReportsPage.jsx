import { Download, TrendingUp, Users, Shield, AlertTriangle, DollarSign, BarChart3, Calendar, Building2 } from 'lucide-react';
import { SEO } from '@/components/SEO';

const REPORTS = [
  { icon: TrendingUp, title: 'Executive Summary', desc: 'High-level overview of all operations, revenue, and KPIs for executive review.', type: 'PDF / Excel' },
  { icon: Calendar, title: 'Attendance Report', desc: 'Daily, weekly, and monthly attendance logs with late arrivals and absences.', type: 'PDF / Excel' },
  { icon: Users, title: 'Guard Performance', desc: 'Individual guard metrics, incident involvement, training completion, and evaluations.', type: 'PDF / Excel' },
  { icon: Shield, title: 'Patrol Reports', desc: 'Route completion rates, missed checkpoints, GPS tracking logs, and response times.', type: 'PDF / Excel' },
  { icon: AlertTriangle, title: 'Incident Analysis', desc: 'Incident trends, severity distribution, resolution times, and corrective actions.', type: 'PDF / Excel' },
  { icon: Building2, title: 'Client Reports', desc: 'Client satisfaction, contract status, billing summary, and site performance.', type: 'PDF / Excel' },
  { icon: DollarSign, title: 'Revenue & Finance', desc: 'Monthly revenue, invoice aging, expense breakdown, and profit margins.', type: 'PDF / Excel' },
  { icon: BarChart3, title: 'Marketing Analytics', desc: 'Lead conversion, campaign ROI, cost per lead, and channel performance.', type: 'PDF / Excel' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <SEO title="Reports — Admin" noIndex />
      <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Reports Center</h1><p className="mt-1 text-sm text-theme-muted">Generate and export reports</p></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {REPORTS.map((r) => (
          <div key={r.title} className="rounded-2xl border border-theme-muted bg-surface-raised p-5 transition-all hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10"><r.icon className="h-6 w-6 text-accent-400" /></div>
            <h3 className="mt-4 font-sans font-semibold text-theme-primary">{r.title}</h3>
            <p className="mt-2 text-xs text-theme-muted">{r.desc}</p>
            <div className="mt-4 flex gap-2">
              <button className="flex items-center gap-1.5 rounded-lg bg-surface-muted/40 px-3 py-1.5 text-xs font-medium text-theme-muted transition-colors hover:text-accent-400"><Download className="h-3.5 w-3.5" /> PDF</button>
              <button className="flex items-center gap-1.5 rounded-lg bg-surface-muted/40 px-3 py-1.5 text-xs font-medium text-theme-muted transition-colors hover:text-green-400"><Download className="h-3.5 w-3.5" /> Excel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
