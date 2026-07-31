import { useState } from 'react';
import { Shield, Search, X, Check, Edit3, Trash2, UserPlus, Key, ToggleLeft, ToggleRight, Settings } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { cn } from '@/utils/cn';

const ALL_PERMISSIONS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'command', label: 'Command Center', icon: '🛡️' },
  { id: 'clients', label: 'Clients', icon: '🏢' },
  { id: 'sites', label: 'Sites', icon: '📍' },
  { id: 'guards', label: 'Guards', icon: '👥' },
  { id: 'shifts', label: 'Shifts', icon: '📅' },
  { id: 'attendance', label: 'Attendance', icon: '🕐' },
  { id: 'patrol', label: 'Patrol', icon: '🚔' },
  { id: 'incidents', label: 'Incidents', icon: '🚨' },
  { id: 'visitors', label: 'Visitors', icon: '👤' },
  { id: 'vehicles', label: 'Vehicles', icon: '🚗' },
  { id: 'hr', label: 'HR', icon: '👥' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'marketing', label: 'Marketing', icon: '📈' },
  { id: 'reports', label: 'Reports', icon: '📊' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'ai', label: 'Nexora AI', icon: '🤖' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'users', label: 'User Management', icon: '🔑' },
];

const DEFAULT_ROLES = {
  admin: ['all'],
  manager: ['dashboard','command','clients','sites','guards','shifts','attendance','patrol','incidents','visitors','vehicles','hr','finance','reports','notifications'],
  supervisor: ['guards','attendance','shifts','patrol','incidents','reports'],
  operator: ['attendance','patrol','incidents'],
  reception: ['visitors'],
};

const INITIAL_USERS = [
  { id: 'U-001', name: 'Admin User', email: 'admin@nexora.com', role: 'admin', status: 'Active', lastLogin: 'Today 08:45 AM' },
  { id: 'U-002', name: 'Khalid Al Ansari', email: 'khalid@alqudabea.com', role: 'manager', status: 'Active', lastLogin: 'Today 09:30 AM' },
  { id: 'U-003', name: 'Noor Al Balooshi', email: 'noor@alqudabea.com', role: 'supervisor', status: 'Active', lastLogin: 'Yesterday 04:15 PM' },
  { id: 'U-004', name: 'Ahmed Reception', email: 'reception@alqudabea.com', role: 'reception', status: 'Active', lastLogin: 'Today 07:00 AM' },
  { id: 'U-005', name: 'Fatima Operator', email: 'operator@alqudabea.com', role: 'operator', status: 'Inactive', lastLogin: 'Jul 25 2026' },
];

export default function UsersPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [rolePerms, setRolePerms] = useState(DEFAULT_ROLES);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'operator', password: '', status: 'Active' });
  const [permTab, setPermTab] = useState(null);

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()));

  const togglePerm = (role, perm) => {
    setRolePerms((prev) => {
      const current = prev[role] || [];
      if (current.includes('all')) { return { ...prev, [role]: ALL_PERMISSIONS.filter((p) => p.id !== perm).map((p) => p.id) }; }
      if (current.includes(perm)) { return { ...prev, [role]: current.filter((p) => p !== perm) }; }
      const updated = [...current, perm];
      if (updated.length === ALL_PERMISSIONS.length) { return { ...prev, [role]: ['all'] }; }
      return { ...prev, [role]: updated };
    });
  };

  const openAdd = () => { setEditId(null); setForm({ name: '', email: '', role: 'operator', password: '', status: 'Active' }); setShowForm(true); };
  const openEdit = (u) => { setEditId(u.id); setForm({ name: u.name, email: u.email, role: u.role, password: '', status: u.status }); setShowForm(true); };
  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) { return; }
    if (editId) { setUsers((prev) => prev.map((u) => u.id === editId ? { ...u, name: form.name, email: form.email, role: form.role, status: form.status } : u)); }
    else { const newId = `U-${String(users.length + 1).padStart(3, '0')}`; setUsers((prev) => [...prev, { id: newId, ...form, lastLogin: 'Never' }]); }
    setShowForm(false);
  };
  const handleDelete = (id) => { setUsers((prev) => prev.filter((u) => u.id !== id)); };
  const hasPerm = (role, perm) => { const p = rolePerms[role] || []; return p.includes('all') || p.includes(perm); };

  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';

  return (
    <div className="space-y-6">
      <SEO title="User Management — Admin" noIndex />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">User Management</h1><p className="mt-1 text-sm text-theme-muted">{users.length} users · Role-based access control</p></div>
        <div className="flex gap-2">
          <button onClick={() => setPermTab((p) => !p)} className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${permTab ? 'bg-accent-500 text-white' : 'border border-theme-muted text-theme-secondary hover:border-accent-500/30 hover:text-accent-400'}`}><Settings className="h-4 w-4" /> {permTab ? 'Hide Permissions' : 'Manage Permissions'}</button>
          <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><UserPlus className="h-4 w-4" /> Add User</button>
        </div>
      </div>

      {/* Permissions Manager */}
      {permTab && (
        <div className="rounded-2xl border border-accent-500/20 bg-surface-raised p-5">
          <h2 className="mb-4 flex items-center gap-2 font-sans text-base font-semibold text-theme-primary"><Key className="h-5 w-5 text-accent-400" /> Role Permissions Manager</h2>
          <p className="mb-4 text-xs text-theme-muted">Toggle permissions for each role. Changes apply immediately. Admin role always has full access.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-theme-muted"><tr>
                <th className="px-3 py-2 font-mono text-[9px] uppercase text-theme-muted sticky left-0 bg-surface-raised">Module</th>
                {Object.keys(DEFAULT_ROLES).map((r) => <th key={r} className="px-3 py-2 text-center font-mono text-[9px] uppercase text-theme-muted">{r}</th>)}
              </tr></thead>
              <tbody>
                {ALL_PERMISSIONS.map((perm) => (
                  <tr key={perm.id} className="border-b border-theme-muted hover:bg-surface-muted/40">
                    <td className="px-3 py-2.5 font-medium text-theme-primary sticky left-0 bg-surface-raised">{perm.icon} {perm.label}</td>
                    {Object.keys(DEFAULT_ROLES).map((role) => (
                      <td key={role} className="px-3 py-2.5 text-center">
                        <button onClick={() => togglePerm(role, perm.id)} className="transition-all hover:scale-110">
                          {hasPerm(role, perm.id) ? <ToggleRight className="h-5 w-5 text-green-400" /> : <ToggleLeft className="h-5 w-5 text-neutral-600" />}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Role Summary */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(DEFAULT_ROLES).map(([roleId]) => {
          const perms = rolePerms[roleId] || [];
          const count = perms.includes('all') ? 'Full' : perms.length;
          const colors = { admin: 'text-danger-400 bg-danger-500/10', manager: 'text-blue-400 bg-blue-500/10', supervisor: 'text-amber-400 bg-amber-500/10', operator: 'text-green-400 bg-green-500/10', reception: 'text-cyan-400 bg-cyan-500/10' };
          const roleNames = { admin: 'Administrator', manager: 'Manager', supervisor: 'Supervisor', operator: 'Operator', reception: 'Reception' };
          return (
            <div key={roleId} className={`rounded-2xl border border-theme-muted p-4 text-center ${colors[roleId]?.split(' ')[1]}`}>
              <Shield className={`mx-auto h-6 w-6 ${colors[roleId]?.split(' ')[0]}`} />
              <p className={`mt-2 font-sans text-sm font-bold ${colors[roleId]?.split(' ')[0]}`}>{roleNames[roleId]}</p>
              <p className="mt-1 text-[10px] text-theme-muted">{count} modules</p>
              <p className="mt-1 text-[10px] text-theme-muted">{users.filter((u) => u.role === roleId).length} users</p>
            </div>
          );
        })}
      </div>

      <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-muted" /><input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-theme-muted bg-surface-raised py-2.5 pl-10 pr-4 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none" /></div>

      <div className="overflow-x-auto rounded-2xl border border-theme-muted">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-theme-muted bg-surface-muted/40"><tr><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">User</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Email</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Role</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Status</th><th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-theme-muted">Last Login</th><th className="px-4 py-3" /></tr></thead>
          <tbody>{filtered.map((u) => {
            const colors = { admin: 'text-danger-400 bg-danger-500/10', manager: 'text-blue-400 bg-blue-500/10', supervisor: 'text-amber-400 bg-amber-500/10', operator: 'text-green-400 bg-green-500/10', reception: 'text-cyan-400 bg-cyan-500/10' };
            const names = { admin: 'Administrator', manager: 'Manager', supervisor: 'Supervisor', operator: 'Operator', reception: 'Reception' };
            return (
            <tr key={u.id} className="border-b border-theme-muted hover:bg-surface-muted/40">
              <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10 text-xs font-bold text-accent-400">{u.name.split(' ').map((n) => n[0]).join('')}</div><p className="font-medium text-theme-primary">{u.name}</p></div></td>
              <td className="px-4 py-3 text-theme-secondary text-xs">{u.email}</td>
              <td className="px-4 py-3"><span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${colors[u.role]}`}>{names[u.role]}</span></td>
              <td className="px-4 py-3"><span className={cn('rounded-lg px-2 py-0.5 text-[10px] font-bold', u.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-neutral-500/10 text-neutral-400')}>{u.status}</span></td>
              <td className="px-4 py-3 text-xs text-theme-muted">{u.lastLogin}</td>
              <td className="px-4 py-3"><div className="flex gap-1"><button onClick={() => openEdit(u)} className="rounded-lg p-1.5 text-theme-muted hover:bg-surface-overlay hover:text-accent-400"><Edit3 className="h-3.5 w-3.5" /></button><button onClick={() => handleDelete(u.id)} className="rounded-lg p-1.5 text-theme-muted hover:bg-surface-overlay hover:text-danger-400"><Trash2 className="h-3.5 w-3.5" /></button></div></td>
            </tr>
          )})}</tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} aria-label="Close" />
          <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">{editId ? 'Edit User' : 'Add User'}</h2><button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3">
              <div><label htmlFor="uname" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Full Name *</label><input id="uname" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="Full name" /></div>
              <div><label htmlFor="uemail" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Email *</label><input id="uemail" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className={inputCls} placeholder="user@alqudabea.com" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label htmlFor="urole" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Role</label><select id="urole" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} className={inputCls}><option value="admin">Administrator</option><option value="manager">Manager</option><option value="supervisor">Supervisor</option><option value="operator">Operator</option><option value="reception">Reception</option></select></div>
                <div><label htmlFor="ustatus" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Status</label><select id="ustatus" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className={inputCls}><option>Active</option><option>Inactive</option></select></div>
              </div>
              {!editId && <div><label htmlFor="upass" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Password</label><input id="upass" type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} className={inputCls} placeholder="Min 6 characters" /></div>}
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary">Cancel</button>
              <button onClick={handleSave} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white"><Check className="inline h-4 w-4 mr-1" /> {editId ? 'Save' : 'Add User'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
