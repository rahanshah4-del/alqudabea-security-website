import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Users, Clock } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { getNotifications } from '@/admin/AdminData';

const iconMap = { alert: { icon: AlertTriangle, color: 'text-danger-400', bg: 'bg-danger-500/10' }, success: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10' }, info: { icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' }, warning: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' } };

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(() => getNotifications());
  const unread = notifs.filter((n) => n.unread).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <div className="space-y-6">
      <SEO title="Notifications — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Notification Center</h1><p className="mt-1 text-sm text-theme-muted">{unread} unread</p></div>
        {unread > 0 && <button onClick={markAllRead} className="text-sm font-medium text-accent-400 hover:text-accent-300">Mark all read</button>}
      </div>
      <div className="space-y-2">
        {notifs.map((n) => {
          const ic = iconMap[n.type] || iconMap.info;
          const Nic = ic.icon;
          return (
            <button key={n.id} className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all hover:shadow-lg ${n.unread ? 'border-accent-500/20 bg-accent-500/[0.03]' : 'border-theme-muted bg-surface-raised'}`} onClick={() => setNotifs((prev) => prev.map((x) => x.id === n.id ? { ...x, unread: false } : x))}>
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ic.bg}`}><Nic className={`h-5 w-5 ${ic.color}`} /></div>
              <div className="flex-1"><p className="text-sm font-medium text-theme-primary">{n.title} {n.unread && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-accent-500" />}</p><p className="mt-0.5 text-xs text-theme-muted">{n.desc}</p></div>
              <span className="text-[10px] text-theme-muted whitespace-nowrap">{n.time}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
