import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Users, Shield, AlertTriangle, Car, UserCheck, Clock, FileText, Activity, RefreshCw, ArrowRight, BellRing, MapPin, Building2, TrendingUp } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { cn } from '@/utils/cn';
import { GuardsAPI, SitesAPI, IncidentsAPI, PatrolsAPI, VisitorsAPI, NotificationsAPI } from '@/firebase/services';

const STATIC_KPI = [
  { icon: Users, label: 'Guards On Duty', key: 'guardsOnDuty', color: 'text-green-400', bg: 'bg-green-500/10', link: '/admin/guards' },
  { icon: Shield, label: 'Guards Off Duty', key: 'guardsOffDuty', color: 'text-neutral-400', bg: 'bg-neutral-500/10', link: '/admin/guards' },
  { icon: AlertTriangle, label: 'Active Incidents', key: 'activeIncidents', color: 'text-danger-400', bg: 'bg-danger-500/10', link: '/admin/incidents' },
  { icon: Car, label: 'Active Patrols', key: 'activePatrols', color: 'text-blue-400', bg: 'bg-blue-500/10', link: '/admin/patrol' },
  { icon: UserCheck, label: 'Visitors Today', key: 'visitorsToday', color: 'text-cyan-400', bg: 'bg-cyan-500/10', link: '/admin/visitors' },
  { icon: Building2, label: 'Active Sites', key: 'activeSites', color: 'text-violet-400', bg: 'bg-violet-500/10', link: '/admin/sites' },
  { icon: MapPin, label: 'Unassigned', key: 'unassignedGuards', color: 'text-amber-400', bg: 'bg-amber-500/10', link: '/admin/guards' },
  { icon: TrendingUp, label: 'Total Guards', key: 'totalGuards', color: 'text-rose-400', bg: 'bg-rose-500/10', link: '/admin/guards' },
];

const QUICK_ACTIONS = [
  { label: 'View All Guards', link: '/admin/guards', icon: Users, color: 'text-blue-400' },
  { label: 'Approve Shifts', link: '/admin/shifts', icon: Clock, color: 'text-green-400' },
  { label: 'Export Report', link: '/admin/reports', icon: FileText, color: 'text-violet-400' },
  { label: 'Emergency Alert', link: '/admin/incidents', icon: BellRing, color: 'text-danger-400' },
];

function AnimatedCount({ target }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (typeof target === 'string') { setCount(target); return; }
    let raf;
    const duration = 1200; const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round(p * target));
      if (p < 1) { raf = requestAnimationFrame(tick); }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  if (typeof target === 'string') { return <span>{target}</span>; }
  return <span>{count.toLocaleString()}</span>;
}

function ProgressBar({ value, total, color = 'bg-accent-500' }) {
  const pct = total > 0 ? Math.min(Math.round((value / total) * 100), 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 rounded-full bg-surface-muted">
        <div className={cn('h-1.5 rounded-full transition-all duration-500', pct > 0 ? color : 'bg-transparent')} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] font-bold text-theme-muted tabular-nums">{pct}%</span>
    </div>
  );
}

function PulseDot() {
  return <span className="relative flex h-2 w-2"><span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75" /><span className="relative h-2 w-2 rounded-full bg-green-400" /></span>;
}

export default function DashboardPage() {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  // ── Live state from Firestore listeners ──────────────────
  const [guards, setGuards] = useState([]);
  const [sites, setSites] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [patrols, setPatrols] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [activities, setActivities] = useState([]);
  const [liveReady, setLiveReady] = useState(false);

  // ── Subscribe to ALL collections in real-time ────────────
  useEffect(() => {
    const unsubs = [
      GuardsAPI.listen(setGuards),
      SitesAPI.listen(setSites),
      IncidentsAPI.listen(setIncidents),
      PatrolsAPI.listen(setPatrols),
      VisitorsAPI.listen(setVisitors),
      NotificationsAPI.listen((data) => {
        setActivities(
          data.slice(0, 6).map((a) => ({
            user: a.user || 'System',
            action: a.title,
            target: a.desc,
            time: a.createdAt?.toDate ? new Date(a.createdAt.toDate()).toLocaleTimeString() : '—',
          })),
        );
      }),
    ];

    // Mark as live after a short delay so the UI doesn't flicker
    const timer = setTimeout(() => setLiveReady(true), 600);

    return () => {
      unsubs.forEach((u) => u?.());
      clearTimeout(timer);
    };
  }, []);

  // ── Clock ──────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  // ── Computed stats ─────────────────────────────────────
  const onDuty = guards.filter((g) => g.status === 'On Duty').length;
  const assigned = guards.filter((g) => g.assignedSite).length;

  const stats = {
    guardsOnDuty: onDuty,
    guardsOffDuty: guards.length - onDuty,
    activeIncidents: incidents.filter((i) => i.status === 'Open').length,
    activePatrols: patrols.filter((p) => p.status === 'Active').length,
    visitorsToday: visitors.length,
    activeSites: sites.filter((s) => s.status === 'Active').length,
    unassignedGuards: guards.length - assigned,
    totalGuards: guards.length,
  };

  // Site summary (top 6 by guard count)
  const siteSummary = sites
    .map((s) => ({ ...s, assignedCount: guards.filter((g) => g.assignedSite === s.id).length }))
    .sort((a, b) => b.assignedCount - a.assignedCount)
    .slice(0, 6);

  // Open incidents
  const openIncidents = incidents
    .filter((i) => i.status !== 'Resolved')
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <SEO title="Dashboard — Admin" noIndex />

      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Dashboard</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-theme-muted">
            {liveReady && <PulseDot />}
            {liveReady ? 'Live' : 'Connecting...'} · {time.toLocaleDateString('en-BH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · {time.toLocaleTimeString('en-BH', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {/* ── KPI Grid ───────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATIC_KPI.map((k) => {
          const value = stats[k.key];
          const subLabels = {
            guardsOnDuty: `${stats.guardsOffDuty} off duty`,
            guardsOffDuty: `${stats.guardsOnDuty} on duty`,
            activeIncidents: stats.activeIncidents === 0 ? 'All clear ✓' : `${stats.activeIncidents} need attention`,
            activePatrols: `${stats.activePatrols} GPS tracked`,
            visitorsToday: 'Checked in today',
            activeSites: `${stats.activeSites} operational`,
            unassignedGuards: stats.unassignedGuards === 0 ? 'All assigned ✓' : 'Need assignment',
            totalGuards: 'Total workforce',
          };
          return (
            <Link
              key={k.label}
              to={k.link}
              className="group rounded-2xl border border-theme-muted bg-surface-raised p-5 transition-all hover:-translate-y-1 hover:border-accent-500/30 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${k.bg}`}>
                  <k.icon className={`h-5 w-5 ${k.color}`} />
                </div>
                <span className={cn('font-mono text-[10px] font-medium', k.color)}>
                  {subLabels[k.key]}
                </span>
              </div>
              <p className="mt-4 font-sans text-3xl font-bold text-theme-primary">
                <AnimatedCount target={value} />
              </p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs text-theme-muted">{k.label}</p>
                <ArrowRight className="h-3 w-3 text-theme-muted opacity-0 transition-all group-hover:opacity-100" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Main Content ───────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Activity Feed */}
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-sans text-lg font-semibold text-theme-primary">
                <Activity className="h-5 w-5 text-accent-400" /> Live Activity Feed
              </h2>
              <Link to="/admin/notifications" className="text-xs font-medium text-accent-400 hover:text-accent-300">View All</Link>
            </div>
            {activities.length === 0 ? (
              <div className="mt-6 py-10 text-center">
                <Activity className="mx-auto h-8 w-8 text-theme-muted" />
                <p className="mt-3 text-sm text-theme-muted">No activity yet — data will appear live as operations run</p>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                {activities.map((a, i) => (
                  <div key={i} className="flex cursor-pointer items-start gap-3 rounded-xl border border-theme-muted bg-surface-muted/40 p-3 transition-all hover:border-accent-500/20 hover:bg-surface-muted/60">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-xs font-bold text-accent-400">{a.user[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-theme-primary truncate"><span className="font-medium">{a.user}</span> {a.action}</p>
                      <p className="mt-0.5 text-xs text-theme-muted truncate">{a.target}</p>
                    </div>
                    <span className="shrink-0 text-[10px] text-theme-muted">{a.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Incidents */}
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-sans text-lg font-semibold text-theme-primary">
                <AlertTriangle className="h-5 w-5 text-danger-400" /> Open Incidents
              </h2>
              <Link to="/admin/incidents" className="text-xs font-medium text-accent-400 hover:text-accent-300">All Incidents</Link>
            </div>
            {openIncidents.length === 0 ? (
              <div className="mt-6 py-10 text-center">
                <Shield className="mx-auto h-8 w-8 text-green-400" />
                <p className="mt-3 text-sm font-medium text-green-400">All Clear — No open incidents</p>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                {openIncidents.map((inc) => (
                  <Link key={inc.id} to="/admin/incidents" className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 p-3 transition-all hover:border-danger-500/20 hover:bg-surface-muted/60">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', inc.severity === 'High' || inc.severity === 'Critical' ? 'bg-danger-500/10' : 'bg-amber-500/10')}>
                        <AlertTriangle className={cn('h-4 w-4', inc.severity === 'High' || inc.severity === 'Critical' ? 'text-danger-400' : 'text-amber-400')} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-theme-primary">{inc.title}</p>
                        <p className="text-[10px] text-theme-muted">{inc.site} · {inc.severity} · {inc.status}</p>
                      </div>
                    </div>
                    <span className={cn('ml-2 shrink-0 rounded-lg px-2 py-0.5 text-[10px] font-bold', inc.severity === 'High' || inc.severity === 'Critical' ? 'bg-danger-500/10 text-danger-400' : 'bg-amber-500/10 text-amber-400')}>{inc.severity}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
            <h2 className="flex items-center gap-2 font-sans text-lg font-semibold text-theme-primary"><Clock className="h-5 w-5 text-accent-400" /> Quick Actions</h2>
            <div className="mt-4 space-y-2">
              {QUICK_ACTIONS.map((act) => (
                <button key={act.label} onClick={() => navigate(act.link)} className="group flex w-full items-center gap-3 rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-3 text-left text-sm font-medium text-theme-secondary transition-all hover:border-accent-500/30 hover:bg-surface-muted/60">
                  <act.icon className={`h-4 w-4 ${act.color}`} />{act.label}<ArrowRight className="ml-auto h-3.5 w-3.5 text-theme-muted opacity-0 transition-all group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* Site Guard Distribution (LIVE) */}
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-sans text-sm font-semibold text-theme-primary"><MapPin className="h-4 w-4 text-accent-400" /> Site Coverage</h2>
              {liveReady && <PulseDot />}
            </div>
            {siteSummary.length === 0 ? (
              <p className="mt-4 py-6 text-center text-xs text-theme-muted">No sites yet</p>
            ) : (
              <div className="mt-4 space-y-3">
                {siteSummary.map((s) => (
                  <Link key={s.id} to="/admin/sites" className="block group">
                    <div className="flex items-center justify-between mb-1">
                      <p className="truncate text-xs font-medium text-theme-primary group-hover:text-accent-400">{s.name}</p>
                      <span className="shrink-0 ml-2 text-[10px] font-bold text-theme-muted tabular-nums">{s.assignedCount}/{stats.totalGuards || '—'}</span>
                    </div>
                    <ProgressBar value={s.assignedCount} total={stats.totalGuards} color={s.assignedCount > 0 ? 'bg-accent-500' : 'bg-surface-muted'} />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* On Duty Guards (Live) */}
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-sans text-sm font-semibold text-theme-primary"><Users className="h-4 w-4 text-green-400" /> On Duty Now</h2>
              <span className="text-lg font-bold text-green-400">{stats.guardsOnDuty}</span>
            </div>
            <div className="mt-3 max-h-[200px] space-y-1 overflow-y-auto">
              {guards.filter((g) => g.status === 'On Duty').slice(0, 8).map((g) => (
                <div key={g.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span className="flex-1 truncate text-xs text-theme-primary">{g.name}</span>
                  <span className="shrink-0 text-[10px] text-theme-muted">{g.assignedSite ? sites.find((s) => s.id === g.assignedSite)?.name?.split(' ')[0] || '—' : '—'}</span>
                </div>
              ))}
              {guards.filter((g) => g.status === 'On Duty').length === 0 && (
                <p className="py-4 text-center text-xs text-theme-muted">No guards on duty</p>
              )}
            </div>
          </div>

          {/* Emergency */}
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
            <h2 className="flex items-center gap-2 font-sans text-sm font-semibold text-theme-primary"><Shield className="h-4 w-4 text-danger-400" /> Emergency Hotline</h2>
            <div className="mt-3 space-y-2">
              <a href="tel:+97377907878" className="flex items-center justify-between rounded-xl bg-danger-500/5 border border-danger-500/10 px-4 py-3 text-sm font-bold text-danger-400 transition-all hover:bg-danger-500/10">+973 7790 7878 <ArrowRight className="h-3.5 w-3.5" /></a>
              <p className="text-[10px] text-theme-muted text-center">24/7 Operations — Immediate Response</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
