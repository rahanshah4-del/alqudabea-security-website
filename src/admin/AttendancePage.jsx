import { useState } from 'react';
import { Clock, AlertTriangle, Download, MapPin, Search, UserCheck, UserX } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { cn } from '@/utils/cn';

const ALL_GUARDS = [
  { id: 'G-001', name: 'Ahmed Al Khalifa', dept: 'Manned Guarding', site: 'Manama HQ', shift: 'Morning' },
  { id: 'G-002', name: 'Mohammed Hassan', dept: 'Mobile Patrol', site: 'Riffa Complex', shift: 'Morning' },
  { id: 'G-003', name: 'Rajesh Kumar', dept: 'CCTV Monitoring', site: 'Seef District', shift: 'Morning' },
  { id: 'G-004', name: 'Fatima Al Doseri', dept: 'Event Security', site: 'Manama HQ', shift: 'Evening' },
  { id: 'G-005', name: 'John Smith', dept: 'VIP Protection', site: 'Amwaj Islands', shift: 'Evening' },
  { id: 'G-006', name: 'Ali Mohammed', dept: 'Access Control', site: 'Muharraq Site', shift: 'Evening' },
  { id: 'G-007', name: 'Sarah Ahmed', dept: 'Reception Security', site: 'Manama HQ', shift: 'Night' },
  { id: 'G-008', name: 'Omar Farooq', dept: 'Industrial Security', site: 'Hidd Industrial', shift: 'Night' },
];

export default function AttendancePage() {
  const [records, setRecords] = useState([
    { id: 'G-001', name: 'Ahmed Al Khalifa', timeIn: '05:52 AM', timeOut: '02:05 PM', status: 'On Time', dept: 'Manned Guarding', site: 'Manama HQ' },
    { id: 'G-002', name: 'Mohammed Hassan', timeIn: '06:15 AM', timeOut: '02:00 PM', status: 'Late (15m)', dept: 'Mobile Patrol', site: 'Riffa Complex' },
    { id: 'G-003', name: 'Rajesh Kumar', timeIn: '05:48 AM', timeOut: '02:10 PM', status: 'On Time', dept: 'CCTV Monitoring', site: 'Seef District' },
    { id: 'G-004', name: 'Fatima Al Doseri', timeIn: '—', timeOut: '—', status: 'Absent', dept: 'Event Security', site: 'Manama HQ' },
    { id: 'G-005', name: 'John Smith', timeIn: '02:02 PM', timeOut: '—', status: 'On Time', dept: 'VIP Protection', site: 'Amwaj Islands' },
    { id: 'G-006', name: 'Ali Mohammed', timeIn: '02:18 PM', timeOut: '—', status: 'Late (18m)', dept: 'Access Control', site: 'Muharraq Site' },
    { id: 'G-007', name: 'Sarah Ahmed', timeIn: '09:55 PM', timeOut: '—', status: 'On Time', dept: 'Reception Security', site: 'Manama HQ' },
    { id: 'G-008', name: 'Omar Farooq', timeIn: '10:08 PM', timeOut: '—', status: 'Late (8m)', dept: 'Industrial Security', site: 'Hidd Industrial' },
  ]);
  const [search, setSearch] = useState('');
  const [clocking, setClocking] = useState(null);

  const onTime = records.filter((r) => r.status === 'On Time').length;
  const late = records.filter((r) => r.status.includes('Late')).length;
  const absent = records.filter((r) => r.status === 'Absent').length;
  const present = onTime + late;
  const total = records.length;

  const handleClockIn = (guardId) => {
    setClocking(guardId);
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setTimeout(() => {
      setRecords((prev) => prev.map((r) => r.id === guardId ? { ...r, timeIn: now, status: 'On Time' } : r));
      setClocking(null);
    }, 600);
  };

  const handleClockOut = (guardId) => {
    setClocking(guardId);
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setTimeout(() => {
      setRecords((prev) => prev.map((r) => r.id === guardId ? { ...r, timeOut: now } : r));
      setClocking(null);
    }, 600);
  };

  const filtered = records.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.site.toLowerCase().includes(search.toLowerCase()) || r.dept.toLowerCase().includes(search.toLowerCase()));

  const statCls = (s) => cn('rounded-lg px-2 py-0.5 text-[10px] font-bold', s === 'Absent' ? 'bg-danger-500/10 text-danger-400' : s.includes('Late') ? 'bg-amber-500/10 text-amber-400' : 'bg-green-500/10 text-green-400');

  return (
    <div className="space-y-6">
      <SEO title="Attendance — Admin" noIndex />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Attendance &amp; Time Tracking</h1><p className="mt-1 text-sm text-theme-muted">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p></div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl border border-theme-muted px-4 py-2.5 text-sm text-theme-secondary transition-all hover:border-accent-500/30"><Download className="h-4 w-4" /> Export</button>
        </div>
      </div>

      {/* Clock In/Out Panel */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10"><UserCheck className="h-6 w-6 text-green-400" /></div><div><p className="font-sans text-3xl font-bold text-green-400">{present}</p><p className="text-xs text-theme-muted">Present Today</p></div></div>
        </div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10"><AlertTriangle className="h-6 w-6 text-amber-400" /></div><div><p className="font-sans text-3xl font-bold text-amber-400">{late}</p><p className="text-xs text-theme-muted">Late Arrivals</p></div></div>
        </div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger-500/10"><UserX className="h-6 w-6 text-danger-400" /></div><div><p className="font-sans text-3xl font-bold text-danger-400">{absent}</p><p className="text-xs text-theme-muted">Absent</p></div></div>
        </div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10"><Clock className="h-6 w-6 text-blue-400" /></div><div><p className="font-sans text-3xl font-bold text-blue-400">{total}</p><p className="text-xs text-theme-muted">Total Guards</p></div></div>
        </div>
      </div>

      {/* Quick Clock Actions */}
      <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
        <h2 className="mb-4 font-sans text-sm font-semibold text-theme-primary">Quick Clock Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ALL_GUARDS.filter((g) => g.shift === 'Morning' || g.shift === 'Evening').slice(0, 4).map((g) => {
            const rec = records.find((r) => r.id === g.id);
            const isClockedIn = rec && rec.timeIn !== '—';
            const isClockedOut = rec && rec.timeOut !== '—';
            return (
              <div key={g.id} className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 p-4">
                <div>
                  <p className="text-sm font-medium text-theme-primary">{g.name}</p>
                  <p className="text-[10px] text-theme-muted">{g.site} · {g.shift}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleClockIn(g.id)} disabled={clocking === g.id || isClockedIn} className={`rounded-lg px-3 py-1.5 text-[10px] font-bold transition-all ${isClockedIn ? 'bg-green-500/10 text-green-400' : 'bg-green-500 text-white hover:bg-green-400'}`}>{clocking === g.id ? '...' : 'IN'}</button>
                  <button onClick={() => handleClockOut(g.id)} disabled={clocking === g.id || !isClockedIn || isClockedOut} className={`rounded-lg px-3 py-1.5 text-[10px] font-bold transition-all ${isClockedOut ? 'bg-blue-500/10 text-blue-400' : isClockedIn ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-surface-muted/40 text-theme-muted'}`}>OUT</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance Table */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-muted" /><input type="text" placeholder="Search by name, site, or department..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-theme-muted bg-surface-raised py-2.5 pl-10 pr-4 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none" /></div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-theme-muted">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-theme-muted bg-surface-muted/40"><tr>
            <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Guard</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Site</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Clock In</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Clock Out</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Status</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted hidden lg:table-cell">GPS</th>
          </tr></thead>
          <tbody>{filtered.map((r) => (
            <tr key={r.id} className="border-b border-theme-muted transition-colors hover:bg-surface-muted/40">
              <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10 text-xs font-bold text-accent-400">{r.name.split(' ').map((n) => n[0]).join('')}</div><div><p className="font-medium text-theme-primary">{r.name}</p><p className="text-[10px] text-theme-muted">{r.dept}</p></div></div></td>
              <td className="px-4 py-3 text-theme-secondary">{r.site}</td>
              <td className="px-4 py-3 font-mono text-xs text-theme-secondary">{r.timeIn}</td>
              <td className="px-4 py-3 font-mono text-xs text-theme-secondary">{r.timeOut}</td>
              <td className="px-4 py-3"><span className={statCls(r.status)}>{r.status}</span></td>
              <td className="px-4 py-3 hidden lg:table-cell"><MapPin className="h-4 w-4 text-theme-muted cursor-pointer hover:text-accent-400" title="GPS: Manama, Bahrain" /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
