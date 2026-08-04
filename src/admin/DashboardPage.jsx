import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Users, Shield, AlertTriangle, Car, UserCheck, Clock, FileText, Activity, RefreshCw, ArrowRight, BellRing, MapPin, Building2, TrendingUp } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { getCollection, NotificationsAPI } from '@/firebase/services';
import { cn } from '@/utils/cn';

const STATIC_KPI = [
  { icon: Users, label: 'Guards On Duty', key: 'guardsOnDuty', suffix: '', color: 'text-green-400', bg: 'bg-green-500/10', link: '/admin/guards' },
  { icon: Shield, label: 'Guards Off Duty', key: 'guardsOffDuty', suffix: '', color: 'text-neutral-400', bg: 'bg-neutral-500/10', link: '/admin/guards' },
  { icon: AlertTriangle, label: 'Active Incidents', key: 'activeIncidents', suffix: '', color: 'text-danger-400', bg: 'bg-danger-500/10', link: '/admin/incidents' },
  { icon: Car, label: 'Active Patrols', key: 'activePatrols', suffix: '', color: 'text-blue-400', bg: 'bg-blue-500/10', link: '/admin/patrol' },
  { icon: UserCheck, label: 'Visitors Today', key: 'visitorsToday', suffix: '', color: 'text-cyan-400', bg: 'bg-cyan-500/10', link: '/admin/visitors' },
  { icon: Building2, label: 'Active Sites', key: 'activeSites', suffix: '', color: 'text-violet-400', bg: 'bg-violet-500/10', link: '/admin/sites' },
  { icon: MapPin, label: 'Unassigned Guards', key: 'unassignedGuards', suffix: '', color: 'text-amber-400', bg: 'bg-amber-500/10', link: '/admin/guards' },
  { icon: TrendingUp, label: 'Total Guards', key: 'totalGuards', suffix: '', color: 'text-rose-400', bg: 'bg-rose-500/10', link: '/admin/guards' },
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
    const duration = 1200; const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round(p * target));
      if (p < 1) { requestAnimationFrame(tick); }
    }
    requestAnimationFrame(tick);
  }, [target]);
  if (typeof target === 'string') { return <span>{target}</span>; }
  return <span>{count.toLocaleString()}</span>;
}

function ProgressBar({ value, total, color = 'bg-accent-500' }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 rounded-full bg-surface-muted">
        <div className={cn('h-1.5 rounded-full transition-all duration-700', color)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] font-bold text-theme-muted tabular-nums">{pct}%</span>
    </div>
  );
}

export default function DashboardPage() {
  const [time, setTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    guardsOnDuty: 0, guardsOffDuty: 0, activeIncidents: 0, activePatrols: 0,
    visitorsToday: 0, activeSites: 0, unassignedGuards: 0, totalGuards: 0,
  });
  const [activities, setActivities] = useState([]);
  const [siteSummary, setSiteSummary] = useState([]);
  const [recentIncidents, setRecentIncidents] = useState([]);

  const fetchData = async () => {
    try {
      const [guards, incidents, patrols, visitors, sites] = await Promise.all([
        getCollection('guards'), getCollection('incidents'), getCollection('patrols'),
        getCollection('visitors'), getCollection('sites'),
      ]);

      const onDuty = guards.filter((g) => g.status === 'On Duty').length;
      const assigned = guards.filter((g) => g.assignedSite).length;

      setStats({
        guardsOnDuty: onDuty,
        guardsOffDuty: guards.length - onDuty,
        activeIncidents: incidents.filter((i) => i.status === 'Open').length,
        activePatrols: patrols.filter((p) => p.status === 'Active').length,
        visitorsToday: visitors.length,
        activeSites: sites.filter((s) => s.status === 'Active').length,
        unassignedGuards: guards.length - assigned,
        totalGuards: guards.length,
      });

      // Site summary with guard counts
      setSiteSummary(
        sites.slice(0, 6).map((s) => ({
          ...s,
          assignedCount: guards.filter((g) => g.assignedSite === s.id).length,
        })),
      );

      // Recent incidents
      setRecentIncidents(
        incidents
          .filter((i) => i.status !== 'Resolved')
          .sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0))
          .slice(0, 4),
      );

      const acts = await NotificationsAPI.getAll();
      setActivities(
        acts.slice(0, 6).map((a) => ({
          user: a.user || 'System',
          action: a.title,
          target: a.desc,
          time: a.createdAt?.toDate ? new Date(a.createdAt.toDate()).toLocaleTimeString() : '—',
        })),
      );
    } catch { /* silent */ }
  };

  useEffect(() => { fetchData(); }, [refreshKey]);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setRefreshKey((k) => k + 1);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="space-y-6">
      <SEO title="Dashboard — Admin" noIndex />

      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Dashboard</h1>
          <p className="mt-1 text-sm text-theme-muted">
            Welcome back, Admin. {time.toLocaleDateString('en-BH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · {time.toLocaleTimeString('en-BH', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className={cn('flex items-center gap-2 rounded-xl border border-theme-muted px-4 py-2.5 text-sm font-medium text-theme-secondary transition-all hover:border-accent-500/30 hover:text-accent-400', refreshing && 'animate-spin')}
          disabled={refreshing}
        >
          <RefreshCw className="h-4 w-4" /> Refresh Data
        </button>
      </div>

      {/* ── KPI Grid (8 cards = 2 perfect rows of 4) ──────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATIC_KPI.map((k) => {
          const value = stats[k.key];
          const subLabels = {
            guardsOnDuty: `${stats.guardsOffDuty} off duty`,
            guardsOffDuty: `${stats.guardsOnDuty} on duty`,
            activeIncidents: `${stats.activeIncidents === 0 ? 'All clear' : stats.activeIncidents + ' need attention'}`,
            activePatrols: `${stats.activePatrols} GPS tracked`,
            visitorsToday: 'Checked in today',
            activeSites: `${stats.activeSites} operational`,
            unassignedGuards: `${stats.unassignedGuards === 0 ? 'All assigned ✓' : 'Need assignment'}`,
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
                {k.suffix}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs text-theme-muted">{k.label}</p>
                <ArrowRight className="h-3 w-3 text-theme-muted opacity-0 transition-all group-hover:opacity-100" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Main Content: Activity + Sidebar ──────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Activity Feed + Recent Incidents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Feed */}
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-sans text-lg font-semibold text-theme-primary">
                <Activity className="h-5 w-5 text-accent-400" /> Live Activity Feed
              </h2>
              <Link to="/admin/notifications" className="text-xs font-medium text-accent-400 hover:text-accent-300">
                View All
              </Link>
            </div>
            {activities.length === 0 ? (
              <div className="mt-6 py-8 text-center">
                <Activity className="mx-auto h-8 w-8 text-theme-muted" />
                <p className="mt-3 text-sm text-theme-muted">No recent activity. Data will appear here as operations run.</p>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                {activities.map((a) => (
                  <div
                    key={`${a.user}-${a.time}`}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-theme-muted bg-surface-muted/40 p-3 transition-all hover:border-accent-500/20 hover:bg-surface-muted/60"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-xs font-bold text-accent-400">
                      {a.user[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-theme-primary truncate">
                        <span className="font-medium">{a.user}</span> {a.action}
                      </p>
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
                <AlertTriangle className="h-5 w-5 text-danger-400" /> Recent Incidents
              </h2>
              <Link to="/admin/incidents" className="text-xs font-medium text-accent-400 hover:text-accent-300">
                All Incidents
              </Link>
            </div>
            {recentIncidents.length === 0 ? (
              <div className="mt-6 py-8 text-center">
                <Shield className="mx-auto h-8 w-8 text-green-400" />
                <p className="mt-3 text-sm text-green-400">All clear — no open incidents</p>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                {recentIncidents.map((inc) => (
                  <Link
                    key={inc.id}
                    to="/admin/incidents"
                    className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 p-3 transition-all hover:border-danger-500/20 hover:bg-surface-muted/60"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                        inc.severity === 'High' || inc.severity === 'Critical' ? 'bg-danger-500/10' : 'bg-amber-500/10',
                      )}>
                        <AlertTriangle className={cn('h-4 w-4', inc.severity === 'High' || inc.severity === 'Critical' ? 'text-danger-400' : 'text-amber-400')} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-theme-primary">{inc.title}</p>
                        <p className="text-[10px] text-theme-muted">{inc.site} · {inc.severity} · {inc.status}</p>
                      </div>
                    </div>
                    <span className={cn('ml-2 shrink-0 rounded-lg px-2 py-0.5 text-[10px] font-bold',
                      inc.severity === 'High' || inc.severity === 'Critical' ? 'bg-danger-500/10 text-danger-400' : 'bg-amber-500/10 text-amber-400',
                    )}>{inc.severity}</span>
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
            <h2 className="flex items-center gap-2 font-sans text-lg font-semibold text-theme-primary">
              <Clock className="h-5 w-5 text-accent-400" /> Quick Actions
            </h2>
            <div className="mt-4 space-y-2">
              {QUICK_ACTIONS.map((act) => (
                <button
                  key={act.label}
                  onClick={() => navigate(act.link)}
                  className="group flex w-full items-center gap-3 rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-3 text-left text-sm font-medium text-theme-secondary transition-all hover:border-accent-500/30 hover:bg-surface-muted/60"
                >
                  <act.icon className={`h-4 w-4 ${act.color}`} />
                  {act.label}
                  <ArrowRight className="ml-auto h-3.5 w-3.5 text-theme-muted opacity-0 transition-all group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* Site Guard Distribution */}
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
            <h2 className="flex items-center gap-2 font-sans text-sm font-semibold text-theme-primary">
              <MapPin className="h-4 w-4 text-accent-400" /> Site Guard Distribution
            </h2>
            {siteSummary.length === 0 ? (
              <p className="mt-4 text-center text-xs text-theme-muted py-4">No sites configured yet</p>
            ) : (
              <div className="mt-4 space-y-3">
                {siteSummary.map((s) => (
                  <Link key={s.id} to="/admin/sites" className="block">
                    <div className="flex items-center justify-between mb-1">
                      <p className="truncate text-xs font-medium text-theme-primary">{s.name}</p>
                      <span className="shrink-0 ml-2 text-[10px] font-bold text-theme-muted">
                        {s.assignedCount}/{stats.totalGuards || '—'}
                      </span>
                    </div>
                    <ProgressBar
                      value={s.assignedCount}
                      total={stats.totalGuards}
                      color={s.assignedCount > 0 ? 'bg-accent-500' : 'bg-surface-muted'}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Emergency Hotline */}
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
            <h2 className="flex items-center gap-2 font-sans text-sm font-semibold text-theme-primary">
              <Shield className="h-4 w-4 text-danger-400" /> Emergency Hotline
            </h2>
            <div className="mt-3 space-y-2">
              <a
                href="tel:+97377907878"
                className="flex items-center justify-between rounded-xl bg-danger-500/5 border border-danger-500/10 px-4 py-3 text-sm font-bold text-danger-400 transition-all hover:bg-danger-500/10"
              >
                +973 7790 7878 <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <p className="text-[10px] text-theme-muted text-center">
                24/7 Operations Centre — Immediate Response
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
