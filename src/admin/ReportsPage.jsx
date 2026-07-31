import { useState } from 'react';
import { Download, TrendingUp, Users, Shield, AlertTriangle, DollarSign, BarChart3, Calendar, Building2, FileText, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';

const REPORTS = [
  { icon: TrendingUp, title: 'Executive Summary', desc: 'High-level overview of all operations, revenue, and KPIs for executive review.' },
  { icon: Calendar, title: 'Attendance Report', desc: 'Daily, weekly, and monthly attendance logs with late arrivals and absences.' },
  { icon: Users, title: 'Guard Performance', desc: 'Individual guard metrics, incident involvement, training completion, and evaluations.' },
  { icon: Shield, title: 'Patrol Reports', desc: 'Route completion rates, missed checkpoints, GPS tracking logs, and response times.' },
  { icon: AlertTriangle, title: 'Incident Analysis', desc: 'Incident trends, severity distribution, resolution times, and corrective actions.' },
  { icon: Building2, title: 'Client Reports', desc: 'Client satisfaction, contract status, billing summary, and site performance.' },
  { icon: DollarSign, title: 'Revenue & Finance', desc: 'Monthly revenue, invoice aging, expense breakdown, and profit margins.' },
  { icon: BarChart3, title: 'Marketing Analytics', desc: 'Lead conversion, campaign ROI, cost per lead, and channel performance.' },
];

export default function ReportsPage() {
  const [generating, setGenerating] = useState(null);

  const handleGenerate = (title, format) => {
    setGenerating(`${title}-${format}`);
    setTimeout(() => {
      window.print();
      setGenerating(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <SEO title="Reports — Admin" noIndex />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Reports Center</h1><p className="mt-1 text-sm text-theme-muted">Generate and export operational reports</p></div>
        <div className="flex items-center gap-2 text-xs text-theme-muted">
          <Calendar className="h-4 w-4" /> {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {REPORTS.map((r) => (
          <div key={r.title} className="group rounded-2xl border border-theme-muted bg-surface-raised p-5 transition-all hover:-translate-y-1 hover:border-accent-500/30 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10"><r.icon className="h-6 w-6 text-accent-400" /></div>
            <h3 className="mt-4 font-sans font-semibold text-theme-primary">{r.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-theme-muted">{r.desc}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleGenerate(r.title, 'PDF')}
                className="flex items-center gap-1.5 rounded-lg bg-surface-muted/40 px-3 py-1.5 text-xs font-medium text-theme-muted transition-all hover:bg-accent-500/10 hover:text-accent-400"
              >
                {generating === `${r.title}-PDF` ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Download className="h-3.5 w-3.5" />}
                PDF
              </button>
              <button
                onClick={() => handleGenerate(r.title, 'Excel')}
                className="flex items-center gap-1.5 rounded-lg bg-surface-muted/40 px-3 py-1.5 text-xs font-medium text-theme-muted transition-all hover:bg-green-500/10 hover:text-green-400"
              >
                {generating === `${r.title}-Excel` ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Download className="h-3.5 w-3.5" />}
                Excel
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6 text-center">
        <FileText className="mx-auto h-8 w-8 text-theme-muted" />
        <p className="mt-3 text-sm text-theme-muted">All reports are generated as PDF or Excel files. Click any report above to generate. For automated scheduling, contact your Nexora AI administrator.</p>
      </div>
    </div>
  );
}
