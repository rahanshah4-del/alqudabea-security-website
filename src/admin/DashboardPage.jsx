import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { Users, Shield, AlertTriangle, Car, UserCheck, DollarSign, FileText, Clock, TrendingUp, Activity, RefreshCw, ArrowRight, BellRing } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { getDashboardStats, getActivityFeed } from '@/admin/AdminData';

const STATIC_KPI = [
  { icon: Users, label: 'Guards On Duty', key: 'guardsOnDuty', suffix: '', color: 'text-green-400', bg: 'bg-green-500/10', link: '/admin/guards' },
  { icon: Shield, label: 'Guards Off Duty', key: 'guardsOffDuty', suffix: '', color: 'text-neutral-400', bg: 'bg-neutral-500/10', link: '/admin/guards' },
  { icon: AlertTriangle, label: 'Active Incidents', key: 'activeIncidents', suffix: '', color: 'text-danger-400', bg: 'bg-danger-500/10', link: '/admin/incidents' },
  { icon: Car, label: 'Active Patrols', key: 'activePatrols', suffix: '', color: 'text-blue-400', bg: 'bg-blue-500/10', link: '/admin/patrol' },
  { icon: UserCheck, label: 'Visitors Today', key: 'visitorsToday', suffix: '', color: 'text-cyan-400', bg: 'bg-cyan-500/10', link: '/admin/visitors' },
  { icon: DollarSign, label: 'Monthly Revenue', key: 'monthlyRevenue', suffix: '', color: 'text-amber-400', bg: 'bg-amber-500/10', link: '/admin/finance' },
  { icon: FileText, label: 'Pending Invoices', key: 'pendingInvoices', suffix: '', color: 'text-violet-400', bg: 'bg-violet-500/10', link: '/admin/finance' },
  { icon: TrendingUp, label: 'Response Time', key: 'avgResponseTime', suffix: '', color: 'text-emerald-400', bg: 'bg-emerald-500/10', link: '/admin/command' },
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

export default function DashboardPage() {
  const [time, setTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  // Real operational data — refreshes on each render cycle
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stats = useMemo(() => getDashboardStats(), [refreshKey]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activities = useMemo(() => getActivityFeed(), [refreshKey]);

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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Dashboard</h1>
          <p className="mt-1 text-sm text-theme-muted">Welcome back, Admin. {time.toLocaleDateString('en-BH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · {time.toLocaleTimeString('en-BH', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <button onClick={handleRefresh} className={`flex items-center gap-2 rounded-xl border border-theme-muted px-4 py-2.5 text-sm font-medium text-theme-secondary transition-all hover:border-accent-500/30 hover:text-accent-400 ${refreshing ? 'animate-spin' : ''}`} disabled={refreshing}>
          <RefreshCw className="h-4 w-4" /> Refresh Data
        </button>
      </div>

      {/* KPI Grid — Clickable */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATIC_KPI.map((k) => {
          const value = stats[k.key];
          const subLabels = {
            guardsOnDuty: `${stats.guardsOffDuty} off duty`,
            guardsOffDuty: 'Scheduled rest',
            activeIncidents: '2 pending review',
            activePatrols: 'GPS tracked',
            visitorsToday: '+18 from yesterday',
            monthlyRevenue: '+8.2% vs last month',
            pendingInvoices: 'BD 34,500 total',
            avgResponseTime: 'Avg this week',
          };
          return (
          <Link key={k.label} to={k.link} className="group rounded-2xl border border-theme-muted bg-surface-raised p-5 transition-all hover:-translate-y-1 hover:border-accent-500/30 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${k.bg}`}><k.icon className={`h-5 w-5 ${k.color}`} /></div>
              <span className={`font-mono text-[10px] font-medium ${k.color}`}>{subLabels[k.key]}</span>
            </div>
            <p className="mt-4 font-sans text-3xl font-bold text-theme-primary"><AnimatedCount target={value} />{k.suffix}</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xs text-theme-muted">{k.label}</p>
              <ArrowRight className="h-3 w-3 text-theme-muted opacity-0 transition-all group-hover:opacity-100" />
            </div>
          </Link>
        )})}
      </div>

      {/* Activity + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-theme-muted bg-surface-raised p-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-sans text-lg font-semibold text-theme-primary"><Activity className="h-5 w-5 text-accent-400" /> Live Activity Feed</h2>
            <Link to="/admin/notifications" className="text-xs font-medium text-accent-400 hover:text-accent-300">View All</Link>
          </div>
          <div className="mt-4 space-y-2">
            {activities.map((a) => (
              <div key={`${a.user}-${a.time}`} className="flex cursor-pointer items-start gap-3 rounded-xl border border-theme-muted bg-surface-muted/40 p-3 transition-all hover:border-accent-500/20 hover:bg-surface-muted/60">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-xs font-bold text-accent-400">{a.user[0]}</div>
                <div className="flex-1 min-w-0"><p className="text-sm text-theme-primary truncate"><span className="font-medium">{a.user}</span> {a.action}</p><p className="mt-0.5 text-xs text-theme-muted truncate">{a.target}</p></div>
                <span className="shrink-0 text-[10px] text-theme-muted">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
            <h2 className="flex items-center gap-2 font-sans text-lg font-semibold text-theme-primary"><Clock className="h-5 w-5 text-accent-400" /> Quick Actions</h2>
            <div className="mt-4 space-y-2">
              {QUICK_ACTIONS.map((act) => (
                <button key={act.label} onClick={() => navigate(act.link)} className="group flex w-full items-center gap-3 rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-3 text-left text-sm font-medium text-theme-secondary transition-all hover:border-accent-500/30 hover:bg-surface-muted/60">
                  <act.icon className={`h-4 w-4 ${act.color}`} />
                  {act.label}
                  <ArrowRight className="ml-auto h-3.5 w-3.5 text-theme-muted opacity-0 transition-all group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
            <h2 className="flex items-center gap-2 font-sans text-sm font-semibold text-theme-primary"><Shield className="h-4 w-4 text-danger-400" /> Emergency Hotline</h2>
            <div className="mt-3 space-y-2">
              <a href="tel:+97377907878" className="flex items-center justify-between rounded-xl bg-danger-500/5 border border-danger-500/10 px-4 py-3 text-sm font-bold text-danger-400 transition-all hover:bg-danger-500/10">+973 7790 7878 <ArrowRight className="h-3.5 w-3.5" /></a>
              <p className="text-[10px] text-theme-muted text-center">24/7 Operations Centre — Immediate Response</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
