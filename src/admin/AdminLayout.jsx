import { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router';
import { motion } from 'framer-motion';
import { LayoutDashboard, Shield, Users, CalendarCheck, Clock, Building2, MapPin, Radio, AlertTriangle, UserCheck, Car, GraduationCap, DollarSign, TrendingUp, FileText, Settings, Sparkles, BellRing, Search, Menu, LogOut, Bell, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useAdminAuth } from '@/admin/AdminAuth';
import { cn } from '@/utils/cn';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Shield, label: 'Command Center', path: '/admin/command' },
  { icon: Building2, label: 'Clients', path: '/admin/clients' },
  { icon: MapPin, label: 'Sites', path: '/admin/sites' },
  { icon: Users, label: 'Guards', path: '/admin/guards' },
  { icon: CalendarCheck, label: 'Shifts', path: '/admin/shifts' },
  { icon: Clock, label: 'Attendance', path: '/admin/attendance' },
  { icon: Radio, label: 'Patrol', path: '/admin/patrol' },
  { icon: AlertTriangle, label: 'Incidents', path: '/admin/incidents' },
  { icon: UserCheck, label: 'Visitors', path: '/admin/visitors' },
  { icon: Car, label: 'Vehicles', path: '/admin/vehicles' },
  { icon: GraduationCap, label: 'HR', path: '/admin/hr' },
  { icon: DollarSign, label: 'Finance', path: '/admin/finance' },
  { icon: TrendingUp, label: 'Marketing', path: '/admin/marketing' },
  { icon: FileText, label: 'Reports', path: '/admin/reports' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
  { icon: Sparkles, label: 'Nexora AI', path: '/admin/ai' },
  { icon: BellRing, label: 'Notifications', path: '/admin/notifications' },
];

export function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const location = useLocation();

  if (!user) { return <Navigate to="/login" replace />; }

  const handleLogout = () => { logout(); setShowLogout(false); };

  return (
    <div className="flex h-screen overflow-hidden bg-surface-root">
      {/* Sidebar */}
      <aside className={cn('fixed inset-y-0 left-0 z-50 flex flex-col border-r border-theme-muted bg-surface-raised/80 backdrop-blur-xl transition-all duration-300 lg:translate-x-0', collapsed ? 'w-[68px]' : 'w-64', sidebarOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className={cn('flex h-16 shrink-0 items-center border-b border-theme-muted', collapsed ? 'justify-center px-2' : 'gap-3 px-6')}>
          {!collapsed && <img src="/logo-main.png" alt="ALQUDABEA" className="h-9 w-auto object-contain" />}
          {!collapsed && <span className="font-sans text-sm font-bold text-theme-primary">ALQUDABEA</span>}
          <button onClick={() => setCollapsed(!collapsed)} className={cn('rounded-xl p-2 text-theme-muted transition-all hover:bg-surface-overlay hover:text-theme-primary', collapsed && 'mx-auto')} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {collapsed ? <PanelLeft className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain p-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => { setSidebarOpen(false); }} title={collapsed ? item.label : undefined}
                className={cn('flex items-center gap-3 rounded-xl text-sm font-medium transition-all', collapsed ? 'justify-center px-2 py-3' : 'px-4 py-3', active ? 'bg-accent-500/10 text-accent-400' : 'text-theme-secondary hover:bg-surface-overlay hover:text-theme-primary')}>
                <item.icon className="h-5 w-5 shrink-0" /> {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>
        <div className="shrink-0 border-t border-theme-muted p-2">
          <button onClick={() => setShowLogout(true)} className={cn('flex w-full items-center gap-3 rounded-xl text-sm font-medium text-theme-muted transition-all hover:bg-danger-500/10 hover:text-danger-400', collapsed ? 'justify-center px-2 py-3' : 'px-4 py-3')} title="Sign Out">
            <LogOut className="h-5 w-5 shrink-0" /> {!collapsed && 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div role="presentation" className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} onKeyDown={(e) => { if (e.key === 'Escape') { setSidebarOpen(false); } }} />}

      {/* Main */}
      <div className={`flex flex-1 flex-col overflow-hidden transition-all duration-300 ${collapsed ? 'lg:pl-[68px]' : 'lg:pl-64'}`}>
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-theme-muted px-6">
          <button onClick={() => setSidebarOpen(true)} className="rounded-xl p-2 text-theme-secondary hover:bg-surface-overlay lg:hidden"><Menu className="h-5 w-5" /></button>
          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden items-center rounded-xl border border-theme-muted bg-surface-muted/40 px-3 py-1.5 sm:flex"><Search className="h-4 w-4 text-theme-muted" /><input type="text" placeholder="Search... (⌘K)" className="ml-2 w-32 bg-transparent text-sm text-theme-primary placeholder:text-theme-muted focus:outline-none lg:w-48" /></div>
            <Link to="/admin/notifications" className="relative rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><Bell className="h-5 w-5" /><span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[9px] font-bold text-white">3</span></Link>
            <div className="relative">
              <button onClick={() => setUserMenu(!userMenu)} className="flex items-center gap-2 rounded-xl p-1.5 transition-all hover:bg-surface-overlay">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500/10 text-xs font-bold text-accent-400">A</div>
                <span className="hidden text-sm font-medium text-theme-secondary sm:block">{user?.name}</span>
              </button>
              {userMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-theme-muted bg-surface-raised p-2 shadow-overlay">
                  <div className="border-b border-theme-muted px-3 pb-3 pt-1">
                    <p className="text-sm font-medium text-theme-primary">{user?.name}</p>
                    <p className="text-[10px] text-theme-muted">Administrator</p>
                  </div>
                  <div className="mt-1 space-y-0.5">
                    <Link to="/admin/settings" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-theme-secondary transition-all hover:bg-surface-overlay hover:text-theme-primary"><Settings className="h-4 w-4" /> Settings</Link>
                    <Link to="/admin/notifications" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-theme-secondary transition-all hover:bg-surface-overlay hover:text-theme-primary"><Bell className="h-4 w-4" /> Notifications</Link>
                    <button onClick={() => { setUserMenu(false); setShowLogout(true); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-danger-400 transition-all hover:bg-danger-500/10"><LogOut className="h-4 w-4" /> Sign Out</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-surface-muted/40 p-4 lg:p-6">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} key={location.pathname}>
            <Outlet />
          </motion.div>
        </main>
        <footer className="border-t border-theme-muted bg-surface-raised/50 px-4 py-2.5 text-center">
          <p className="font-mono text-[10px] text-theme-muted">Designed &amp; Developed by <span className="font-medium text-theme-secondary">Nexora Solution</span></p>
        </footer>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogout && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Sign out confirmation">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogout(false)} aria-label="Cancel sign out" type="button" />
          <div className="glass relative mx-4 w-full max-w-sm rounded-3xl p-8 text-center shadow-overlay">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-500/10 border border-danger-500/20">
              <LogOut className="h-7 w-7 text-danger-400" />
            </div>
            <h2 className="mt-5 font-sans text-xl font-bold text-theme-primary">Sign Out</h2>
            <p className="mt-2 text-sm text-theme-muted">Are you sure you want to sign out of the admin panel?</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowLogout(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay" type="button">Cancel</button>
              <button onClick={handleLogout} className="flex-1 rounded-xl bg-danger-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-danger-400" type="button">Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
