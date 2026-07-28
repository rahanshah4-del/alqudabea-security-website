import { useState } from 'react';
import { Sun, Moon, Sunset, ChevronLeft, ChevronRight, Plus, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { cn } from '@/utils/cn';

const MORNING = [
  { id: 'S-001', name: 'Ahmed Al Khalifa', site: 'Manama HQ', time: '06:00 - 14:00', days: 'Sun-Thu' },
  { id: 'S-002', name: 'Mohammed Hassan', site: 'Riffa Complex', time: '06:00 - 14:00', days: 'Sun-Thu' },
  { id: 'S-003', name: 'Rajesh Kumar', site: 'Seef District', time: '06:00 - 14:00', days: 'Sun-Thu' },
];
const EVENING = [
  { id: 'S-004', name: 'Fatima Al Doseri', site: 'Manama HQ', time: '14:00 - 22:00', days: 'Sun-Thu' },
  { id: 'S-005', name: 'John Smith', site: 'Amwaj Islands', time: '14:00 - 22:00', days: 'Sun-Thu' },
  { id: 'S-006', name: 'Ali Mohammed', site: 'Muharraq Site', time: '14:00 - 22:00', days: 'Sun-Thu' },
];
const NIGHT = [
  { id: 'S-007', name: 'Sarah Ahmed', site: 'Manama HQ', time: '22:00 - 06:00', days: 'Sun-Thu' },
  { id: 'S-008', name: 'Omar Farooq', site: 'Hidd Industrial', time: '22:00 - 06:00', days: 'Sun-Thu' },
];

const TABS = [
  { id: 'morning', label: 'Morning', icon: Sun, color: 'text-amber-400', data: MORNING },
  { id: 'evening', label: 'Evening', icon: Sunset, color: 'text-orange-400', data: EVENING },
  { id: 'night', label: 'Night', icon: Moon, color: 'text-indigo-400', data: NIGHT },
];

export default function ShiftsPage() {
  const [tab, setTab] = useState('morning');
  const active = TABS.find((t) => t.id === tab);

  return (
    <div className="space-y-6">
      <SEO title="Shift Management — Admin" noIndex />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Shift Management</h1><p className="mt-1 text-sm text-theme-muted">Roster &amp; scheduling</p></div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-theme-muted px-3 py-2 text-sm text-theme-secondary transition-all hover:border-accent-500/30"><RefreshCw className="h-4 w-4" /> Auto Assign</button>
          <button className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> Add Shift</button>
        </div>
      </div>

      {/* Calendar Strip */}
      <div className="flex items-center justify-between rounded-2xl border border-theme-muted bg-surface-raised px-4 py-3">
        <button className="rounded-lg p-1 text-theme-muted hover:text-theme-primary"><ChevronLeft className="h-5 w-5" /></button>
        <span className="font-sans text-sm font-semibold text-theme-primary">July 28 — August 3, 2026</span>
        <button className="rounded-lg p-1 text-theme-muted hover:text-theme-primary"><ChevronRight className="h-5 w-5" /></button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cn('flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all', tab === t.id ? 'bg-surface-raised border border-theme-muted shadow-sm' : 'text-theme-muted hover:text-theme-primary')}>
            <t.icon className={cn('h-4 w-4', t.color)} /> {t.label} <span className="text-[10px] text-theme-muted">({t.data.length})</span>
          </button>
        ))}
      </div>

      {/* Shift Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {active?.data.map((s) => (
          <div key={s.id} className="rounded-2xl border border-theme-muted bg-surface-raised p-5 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 text-xs font-bold text-accent-400">{s.name.split(' ').map((n) => n[0]).join('')}</div>
                <div><p className="text-sm font-medium text-theme-primary">{s.name}</p><p className="text-[10px] text-theme-muted">{s.id}</p></div>
              </div>
              <active.icon className={cn('h-5 w-5', active.color)} />
            </div>
            <div className="mt-4 space-y-2 rounded-xl border border-theme-muted bg-surface-muted/40 p-3">
              <div className="flex justify-between text-xs"><span className="text-theme-muted">Site</span><span className="font-medium text-theme-primary">{s.site}</span></div>
              <div className="flex justify-between text-xs"><span className="text-theme-muted">Time</span><span className="font-medium text-theme-primary">{s.time}</span></div>
              <div className="flex justify-between text-xs"><span className="text-theme-muted">Days</span><span className="font-medium text-theme-primary">{s.days}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
