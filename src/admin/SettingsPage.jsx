import { useState } from 'react';
import { Building2, Users, Shield, Palette, Globe, Mail, FileText, Database } from 'lucide-react';
import { SEO } from '@/components/SEO';

const TABS = [
  { id: 'company', icon: Building2, label: 'Company' },
  { id: 'users', icon: Users, label: 'Users' },
  { id: 'roles', icon: Shield, label: 'Roles' },
  { id: 'branding', icon: Palette, label: 'Branding' },
  { id: 'language', icon: Globe, label: 'Languages' },
  { id: 'email', icon: Mail, label: 'Email' },
  { id: 'audit', icon: FileText, label: 'Audit Log' },
  { id: 'backup', icon: Database, label: 'Backup' },
];

export default function SettingsPage() {
  const [tab, setTab] = useState('company');
  return (
    <div className="space-y-6">
      <SEO title="Settings — Admin" noIndex />
      <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Settings</h1><p className="mt-1 text-sm text-theme-muted">System configuration</p></div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${tab === t.id ? 'bg-accent-500/10 text-accent-400' : 'text-theme-muted hover:text-theme-primary hover:bg-surface-raised'}`}><t.icon className="h-4 w-4" /> {t.label}</button>
        ))}
      </div>
      <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
        {tab === 'company' && (
          <div className="space-y-4">
            <h2 className="font-sans text-lg font-semibold text-theme-primary">Company Profile</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Company Name', 'CR Number', 'VAT Number', 'Phone', 'Email', 'Address', 'Website', 'Industry'].map((f) => (
                <div key={f}><label className="mb-1 block text-xs font-medium text-theme-muted">{f}</label><input className="w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none" placeholder={f} defaultValue={f === 'Company Name' ? 'Alqudabea Security Services W.L.L.' : f === 'CR Number' ? '176298-1' : ''} /></div>
              ))}
            </div>
            <button className="rounded-xl bg-accent-500 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400">Save Changes</button>
          </div>
        )}
        {tab === 'users' && <div className="text-center py-8"><Users className="mx-auto h-10 w-10 text-theme-muted" /><p className="mt-3 font-medium text-theme-primary">User Management</p><p className="text-sm text-theme-muted">3 admin users · Add, edit, or deactivate users</p></div>}
        {tab === 'roles' && <div className="text-center py-8"><Shield className="mx-auto h-10 w-10 text-theme-muted" /><p className="mt-3 font-medium text-theme-primary">Roles & Permissions</p><p className="text-sm text-theme-muted">Administrator · Manager · Supervisor · Operator</p></div>}
        {tab === 'branding' && <div className="text-center py-8"><Palette className="mx-auto h-10 w-10 text-theme-muted" /><p className="mt-3 font-medium text-theme-primary">Branding & Themes</p><p className="text-sm text-theme-muted">Light/Dark mode · Logo upload · Color customization</p></div>}
        {tab === 'audit' && <div className="text-center py-8"><FileText className="mx-auto h-10 w-10 text-theme-muted" /><p className="mt-3 font-medium text-theme-primary">Audit Logs</p><p className="text-sm text-theme-muted">Track all system changes · User activity · Login history</p></div>}
        {tab === 'backup' && <div className="text-center py-8"><Database className="mx-auto h-10 w-10 text-theme-muted" /><p className="mt-3 font-medium text-theme-primary">Backup & Restore</p><p className="text-sm text-theme-muted">Automated daily backups · Firebase export · Data integrity checks</p></div>}
      </div>
    </div>
  );
}
