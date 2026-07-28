import { Users, GraduationCap, Calendar, TrendingUp, Plus } from 'lucide-react';
import { SEO } from '@/components/SEO';

const EMPLOYEES = [
  { id: 'E-001', name: 'Sarah Al Mahmood', dept: 'HR', position: 'HR Manager', joinDate: '2024-07-15', status: 'Active', leave: '5 days', performance: 'A' },
  { id: 'E-002', name: 'Tariq Al Ansari', dept: 'Training', position: 'Training Coordinator', joinDate: '2024-08-01', status: 'Active', leave: '12 days', performance: 'A' },
  { id: 'E-003', name: 'Layla Noor', dept: 'Recruitment', position: 'Recruiter', joinDate: '2024-09-10', status: 'Active', leave: '3 days', performance: 'B+' },
  { id: 'E-004', name: 'Hamad Al Buainain', dept: 'Payroll', position: 'Payroll Officer', joinDate: '2024-10-01', status: 'Active', leave: '8 days', performance: 'A' },
];

const INTERVIEWS = [
  { candidate: 'Nasser Al Dossari', position: 'Security Officer', date: '2026-07-30', time: '10:00 AM', status: 'Scheduled' },
  { candidate: 'Mariam Al Khalifa', position: 'CCTV Operator', date: '2026-07-31', time: '02:00 PM', status: 'Scheduled' },
  { candidate: 'Yusuf Ahmed', position: 'Patrol Driver', date: '2026-08-01', time: '11:00 AM', status: 'Confirmed' },
];

export default function HRPage() {
  return (
    <div className="space-y-6">
      <SEO title="HR — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Human Resources</h1><p className="mt-1 text-sm text-theme-muted">Personnel &amp; recruitment</p></div>
        <button className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Add Employee</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: 'Total Staff', value: '512', color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { icon: GraduationCap, label: 'In Training', value: '28', color: 'text-green-400', bg: 'bg-green-500/10' },
          { icon: Calendar, label: 'On Leave Today', value: '17', color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: TrendingUp, label: 'Avg Performance', value: 'B+', color: 'text-violet-400', bg: 'bg-violet-500/10' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center"><div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div><p className={`mt-2 font-sans text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-[10px] text-theme-muted uppercase tracking-wider">{s.label}</p></div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <h2 className="font-sans text-lg font-semibold text-theme-primary">Upcoming Interviews</h2>
          <div className="mt-3 space-y-2">
            {INTERVIEWS.map((i) => (
              <div key={i.candidate} className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 p-3">
                <div><p className="text-sm font-medium text-theme-primary">{i.candidate}</p><p className="text-xs text-theme-muted">{i.position}</p></div>
                <div className="text-right"><p className="text-xs font-medium text-theme-primary">{i.date}</p><p className="text-[10px] text-theme-muted">{i.time}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <h2 className="font-sans text-lg font-semibold text-theme-primary">Admin Staff</h2>
          <div className="mt-3 space-y-2">
            {EMPLOYEES.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 p-3">
                <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10 text-xs font-bold text-accent-400">{e.name.split(' ').map((n) => n[0]).join('')}</div><div><p className="text-sm font-medium text-theme-primary">{e.name}</p><p className="text-[10px] text-theme-muted">{e.dept} · {e.position}</p></div></div>
                <div className="text-right"><span className="rounded bg-green-500/10 px-1.5 py-0.5 text-[10px] font-bold text-green-400">{e.performance}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
