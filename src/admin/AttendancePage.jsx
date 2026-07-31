import { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2, XCircle, Download, MapPin } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { cn } from '@/utils/cn';
import { getAttendance } from '@/admin/AdminData';

export default function AttendancePage() {
  const [data] = useState(() => getAttendance());
  const [records, setRecords] = useState(data.records);
  const [clocking, setClocking] = useState(false);

  const stats = [
    { icon: CheckCircle2, label: 'On Time Today', value: records.filter((r) => r.status === 'On Time').length, color: 'text-green-400', bg: 'bg-green-500/10' },
    { icon: AlertTriangle, label: 'Late Arrivals', value: records.filter((r) => r.status.includes('Late')).length, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: XCircle, label: 'Absent Today', value: records.filter((r) => r.status === 'Absent').length, color: 'text-danger-400', bg: 'bg-danger-500/10' },
    { icon: Clock, label: 'Avg Clock-In', value: data.avgClockIn, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ];

  const handleClockIn = () => {
    setClocking(true);
    setTimeout(() => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setRecords((prev) => prev.map((r) => r.id === 'G-004' ? { ...r, timeIn: time, status: 'On Time' } : r));
      setClocking(false);
    }, 800);
  };

  const handleExport = () => { window.print(); };

  return (
    <div className="space-y-6">
      <SEO title="Attendance — Admin" noIndex />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Attendance</h1><p className="mt-1 text-sm text-theme-muted">Today — {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p></div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 rounded-xl border border-theme-muted px-4 py-2.5 text-sm text-theme-secondary transition-all hover:border-accent-500/30"><Download className="h-4 w-4" /> Export</button>
          <button onClick={handleClockIn} disabled={clocking} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400 disabled:opacity-50"><Clock className={`h-4 w-4 ${clocking ? 'animate-spin' : ''}`} /> {clocking ? 'Clocking...' : 'Clock In'}</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-5 transition-all hover:shadow-lg">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div>
            <p className="mt-4 font-sans text-3xl font-bold text-theme-primary">{s.value}</p>
            <p className="mt-1 text-xs text-theme-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-theme-muted">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-theme-muted bg-surface-muted/40"><tr>
            <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Guard</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Clock In</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Clock Out</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Status</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted hidden lg:table-cell">GPS</th>
          </tr></thead>
          <tbody>{records.map((r) => (
            <tr key={r.id} className="border-b border-theme-muted transition-colors hover:bg-surface-muted/40">
              <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10 text-xs font-bold text-accent-400">{r.name.split(' ').map((n) => n[0]).join('')}</div><div><p className="font-medium text-theme-primary">{r.name}</p><p className="text-[10px] text-theme-muted">{r.id}</p></div></div></td>
              <td className="px-4 py-3 font-mono text-xs text-theme-secondary">{r.timeIn}</td>
              <td className="px-4 py-3 font-mono text-xs text-theme-secondary">{r.timeOut}</td>
              <td className="px-4 py-3"><span className={cn('rounded-lg px-2 py-0.5 text-[10px] font-bold', r.status === 'Absent' ? 'bg-danger-500/10 text-danger-400' : r.status.includes('Late') ? 'bg-amber-500/10 text-amber-400' : 'bg-green-500/10 text-green-400')}>{r.status}</span></td>
              <td className="px-4 py-3 hidden lg:table-cell"><MapPin className="h-4 w-4 text-theme-muted cursor-pointer hover:text-accent-400" title="GPS: Manama, Bahrain" /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
