import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Shield, AlertTriangle, Car, MapPin, Thermometer, Search, Users, Building2, TrendingUp, Download, UserPlus, Plus, QrCode, Clock, FileText, Sun, Bell, MessageSquare, Send, X, Cloud, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { GuardsAPI, ClientsAPI, SitesAPI, PatrolsAPI, IncidentsAPI, MarketingAPI, ComplaintsAPI } from '@/firebase/services';
import { addDocument, updateDocument, deleteDocument } from '@/firebase/services';
import { cn } from '@/utils/cn';

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  return <span className="font-mono text-sm font-bold text-theme-primary tabular-nums">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</span>;
}

export default function CommandPage() {
  const [guards, setGuards] = useState([]);
  const [clients, setClients] = useState([]);
  const [sites, setSites] = useState([]);
  const [marketingLeads, setMarketingLeads] = useState([]);
  const [patrols, setPatrols] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubs = [
      GuardsAPI.listen((d) => { setGuards(d); setLoading(false); }),
      ClientsAPI.listen(setClients),
      SitesAPI.listen(setSites),
      MarketingAPI.listen(setMarketingLeads),
      PatrolsAPI.listen(setPatrols),
      IncidentsAPI.listen(setIncidents),
    ];
    return () => unsubs.forEach((u) => u?.());
  }, []);

  const onDuty = guards.filter((g) => g.status === 'On Duty');
  const offDuty = guards.filter((g) => g.status === 'Off Duty');
  const onLeave = guards.filter((g) => g.status === 'Leave');
  const activeSites = sites.filter((s) => s.status === 'Active');
  const activePatrols = patrols.filter((p) => p.status === 'Active').length;
  const openIncidents = incidents.filter((i) => i.status === 'Open').length;
  const allSearchable = [...guards.map((g) => ({ type: 'Guard', ...g })), ...clients.map((c) => ({ type: 'Client', ...c })), ...sites.map((s) => ({ type: 'Site', ...s })), ...marketingLeads.map((l) => ({ type: 'Lead', ...l }))];
  const searchResults = search.trim() ? allSearchable.filter((item) => { const text = (item.name || item.company || '').toLowerCase(); const contact = (item.contact || '').toLowerCase(); const q = search.toLowerCase(); return text.includes(q) || contact.includes(q); }) : [];
  const grouped = { Guard: searchResults.filter((r) => r.type === 'Guard'), Client: searchResults.filter((r) => r.type === 'Client'), Site: searchResults.filter((r) => r.type === 'Site'), Lead: searchResults.filter((r) => r.type === 'Lead') };

  return (
    <div className="space-y-4">
      <SEO title="Command Center — Admin" noIndex />

      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-theme-muted bg-surface-raised px-5 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" /><span className="text-xs font-semibold text-green-400">LIVE</span></div>
          <LiveClock />
          <span className="hidden sm:inline text-xs text-theme-muted">· {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-theme-muted">{guards.length} Guards · {clients.length} Clients · {sites.length} Sites</span>
          <div className="flex items-center gap-2">
            <NexoraCloudButton />
            <button onClick={() => window.print()} className="rounded-lg border border-theme-muted p-2 text-theme-muted hover:text-accent-400"><Download className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: 'Guards On Duty', value: onDuty.length, total: guards.length, pct: Math.round((onDuty.length/guards.length)*100), color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-600/5', bar: 'bg-blue-500' },
          { icon: Shield, label: 'Active Sites', value: activeSites.length, total: sites.length, pct: Math.round((activeSites.length/sites.length)*100), color: 'text-green-400', bg: 'from-green-500/20 to-green-600/5', bar: 'bg-green-500' },
          { icon: AlertTriangle, label: 'Open Incidents', value: openIncidents, total: incidents.length, pct: incidents.length > 0 ? Math.round((openIncidents / incidents.length) * 100) : 0, color: 'text-danger-400', bg: 'from-danger-500/20 to-danger-600/5', bar: 'bg-danger-500' },
          { icon: Car, label: 'Active Patrols', value: activePatrols, total: patrols.length, pct: patrols.length > 0 ? Math.round((activePatrols / patrols.length) * 100) : 0, color: 'text-cyan-400', bg: 'from-cyan-500/20 to-cyan-600/5', bar: 'bg-cyan-500' },
        ].map((k) => (
          <div key={k.label} className="group relative overflow-hidden rounded-2xl border border-theme-muted bg-surface-raised p-5 transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${k.bg} opacity-30`} />
            <div className="relative flex items-center justify-between mb-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5"><k.icon className={`h-5 w-5 ${k.color}`} /></div><span className={`text-[10px] font-bold ${k.color}`}>{k.pct}%</span></div>
            <p className="relative font-sans text-[34px] font-bold tracking-[-0.03em] text-theme-primary">{k.value}<span className="text-base text-theme-muted font-normal">/{k.total || '—'}</span></p>
            <p className="relative mt-1 text-[10px] font-semibold text-theme-muted uppercase tracking-wider">{k.label}</p>
            <div className="relative mt-3 h-1 rounded-full bg-surface-muted"><div className={`h-1 rounded-full ${k.bar} transition-all`} style={{ width: `${k.pct}%` }} /></div>
          </div>
        ))}
      </div>

      {/* Mini Stats Row */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-8">
        {[
          { label: 'On Duty', value: onDuty.length, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Off Duty', value: offDuty.length, color: 'text-neutral-400', bg: 'bg-neutral-500/10' },
          { label: 'On Leave', value: onLeave.length, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Sites Active', value: `${activeSites.length}/${sites.length}`, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Threat Level', value: 'LOW', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Response', value: '4.2m', color: 'text-violet-400', bg: 'bg-violet-500/10' },
          { label: 'Equipment', value: '94%', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Temp', value: '34°C', color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-theme-muted bg-surface-raised p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-[9px] font-semibold text-theme-muted uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions + Search */}
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="relative"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-theme-muted" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search all data — guards, clients, sites, leads..." className="w-full rounded-2xl border border-theme-muted bg-surface-raised py-3.5 pl-12 pr-4 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none" /></div>
        <div className="flex gap-2">
          <Link to="/admin/guards" className="flex items-center gap-1.5 rounded-xl bg-blue-500 px-4 py-3 text-xs font-semibold text-white transition-all hover:bg-blue-400"><UserPlus className="h-4 w-4" /><span className="hidden sm:inline">Guard</span></Link>
          <Link to="/admin/clients" className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-3 text-xs font-semibold text-white transition-all hover:bg-amber-400"><Plus className="h-4 w-4" /><span className="hidden sm:inline">Client</span></Link>
          <Link to="/admin/attendance" className="flex items-center gap-1.5 rounded-xl bg-violet-500 px-4 py-3 text-xs font-semibold text-white transition-all hover:bg-violet-400"><Clock className="h-4 w-4" /><span className="hidden sm:inline">Clock</span></Link>
          <Link to="/admin/incidents" className="flex items-center gap-1.5 rounded-xl bg-danger-500 px-4 py-3 text-xs font-semibold text-white transition-all hover:bg-danger-400"><AlertTriangle className="h-4 w-4" /><span className="hidden sm:inline">Alert</span></Link>
        </div>
      </div>
      {search && <p className="-mt-1 ml-4 text-[10px] text-theme-muted">{searchResults.length} results found</p>}

      {/* Search Results */}
      {search && searchResults.length > 0 && (
        <div className="space-y-5">
          {grouped.Guard.length > 0 && <DetailTable title="Guards" icon={Users} color="text-blue-400" border="border-blue-500/20" cols={['Name','ID','Dept','Position','Nationality','Status','CPR','Visa']} data={grouped.Guard.map((g) => [g.name, g.id, g.dept, g.position, g.nationality, <span key="s" className={g.status==='On Duty'?'text-green-400':'text-neutral-400'}>{g.status}</span>, <span key="c" className={g.cpr==='Valid'?'text-green-400':'text-amber-400'}>{g.cpr}</span>, g.visa])} />}
          {grouped.Client.length > 0 && <DetailTable title="Clients" icon={Building2} color="text-amber-400" border="border-amber-500/20" cols={['Company','Contact','Phone','Email','Type','Status','Branches','Billing']} data={grouped.Client.map((c) => [c.name, c.contact, c.phone, c.email, c.type, <span key="s" className={c.status==='Active'?'text-green-400':'text-amber-400'}>{c.status}</span>, c.branches, c.billing])} />}
          {grouped.Site.length > 0 && <DetailTable title="Sites" icon={MapPin} color="text-green-400" border="border-green-500/20" cols={['Site','Type','Guards','Supervisor','Address','Status']} data={grouped.Site.map((s) => [s.name, s.type, s.guards, s.supervisor, s.address, <span key="s" className={s.status==='Active'?'text-green-400':'text-amber-400'}>{s.status}</span>])} />}
          {grouped.Lead.length > 0 && <DetailTable title="Marketing Leads" icon={TrendingUp} color="text-violet-400" border="border-violet-500/20" cols={['Company','Contact','Deal Value']} data={grouped.Lead.map((l) => [l.company, l.contact, l.value])} />}
        </div>
      )}
      {search && searchResults.length === 0 && <div className="rounded-2xl border border-theme-muted bg-surface-raised py-12 text-center"><Search className="mx-auto h-8 w-8 text-theme-muted" /><p className="mt-3 text-sm text-theme-muted">No results for &ldquo;{search}&rdquo;</p></div>}

      {/* Complaint Center — Always at Top */}
      <ComplaintSection />

      {!search && (
        <>
          {/* Main Content Grid */}
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {/* Sites */}
              <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
                <div className="flex items-center justify-between mb-4"><h2 className="font-sans text-base font-semibold text-theme-primary">Site Status</h2><span className="rounded-lg bg-green-500/10 px-2.5 py-1 text-[10px] font-bold text-green-400">{activeSites.length} Active</span></div>
                <div className="space-y-1.5">{sites.map((s) => (<div key={s.id} className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 hover:bg-surface-muted/60"><div className="flex items-center gap-3"><div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.status==='Active'?'bg-green-500/10':'bg-amber-500/10'}`}><MapPin className={`h-4 w-4 ${s.status==='Active'?'text-green-400':'text-amber-400'}`} /></div><div><p className="text-sm font-medium text-theme-primary">{s.name}</p><p className="text-[10px] text-theme-muted">{s.address}</p></div></div><div className="flex items-center gap-4"><div className="text-right"><p className="text-xs font-bold text-theme-primary">{s.guards}</p><p className="text-[9px] text-theme-muted">Guards</p></div><span className={cn('rounded-lg px-2 py-0.5 text-[10px] font-bold', s.status==='Active'?'bg-green-500/10 text-green-400':'bg-amber-500/10 text-amber-400')}>{s.status}</span></div></div>))}</div>
              </div>
              {/* Client Overview */}
              <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
                <div className="flex items-center justify-between mb-4"><h2 className="font-sans text-base font-semibold text-theme-primary">Client Overview</h2><span className="text-[10px] text-theme-muted">{clients.length} clients</span></div>
                <div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="border-b border-theme-muted"><tr>{['Client','Contact','Type','Status','Branches','Billing'].map((h) => <th key={h} className="px-3 py-2 font-mono text-[9px] font-semibold uppercase text-theme-muted">{h}</th>)}</tr></thead><tbody>{clients.map((c) => (<tr key={c.id} className="border-b border-theme-muted hover:bg-surface-muted/40"><td className="px-3 py-2 font-medium text-theme-primary">{c.name}</td><td className="px-3 py-2 text-theme-secondary">{c.contact}</td><td className="px-3 py-2 text-theme-secondary">{c.type}</td><td className="px-3 py-2"><span className={cn('rounded px-2 py-0.5 text-[9px] font-bold', c.status==='Active'?'bg-green-500/10 text-green-400':'bg-amber-500/10 text-amber-400')}>{c.status}</span></td><td className="px-3 py-2 text-theme-muted">{c.branches}</td><td className="px-3 py-2 font-mono font-medium text-theme-primary">{c.billing}</td></tr>))}</tbody></table></div>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
                <div className="flex items-center justify-between mb-3"><h2 className="font-sans text-sm font-semibold text-theme-primary">On Duty ({onDuty.length})</h2><span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" /></div>
                <div className="max-h-[240px] space-y-1 overflow-y-auto">{onDuty.map((g) => (<div key={g.id} className="flex items-center gap-3 rounded-lg bg-surface-muted/40 px-3 py-2"><div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-400">{g.name.split(' ').map((n)=>n[0]).join('')}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-theme-primary">{g.name}</p><p className="text-[9px] text-theme-muted">{g.dept}</p></div></div>))}</div>
              </div>
              <div className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center">
                <div className="flex items-center justify-center gap-4"><Thermometer className="h-6 w-6 text-amber-400" /><Sun className="h-6 w-6 text-amber-400" /></div>
                <p className="mt-2 font-sans text-2xl font-bold text-theme-primary">34°C</p><p className="text-[10px] text-theme-muted">Manama, Bahrain · Clear skies</p>
              </div>
              <div className="rounded-2xl border border-theme-muted bg-surface-raised p-4">
                <h2 className="mb-3 font-sans text-sm font-semibold text-theme-primary">Quick Links</h2>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/admin/patrol" className="flex items-center gap-2 rounded-xl bg-cyan-500/10 px-3 py-2.5 text-xs font-medium text-cyan-400 transition-all hover:bg-cyan-500/20"><QrCode className="h-4 w-4" /> Patrol</Link>
                  <Link to="/admin/sites" className="flex items-center gap-2 rounded-xl bg-green-500/10 px-3 py-2.5 text-xs font-medium text-green-400 transition-all hover:bg-green-500/20"><MapPin className="h-4 w-4" /> Sites</Link>
                  <Link to="/admin/reports" className="flex items-center gap-2 rounded-xl bg-violet-500/10 px-3 py-2.5 text-xs font-medium text-violet-400 transition-all hover:bg-violet-500/20"><FileText className="h-4 w-4" /> Reports</Link>
                  <Link to="/admin/notifications" className="flex items-center gap-2 rounded-xl bg-amber-500/10 px-3 py-2.5 text-xs font-medium text-amber-400 transition-all hover:bg-amber-500/20"><Bell className="h-4 w-4" /> Alerts</Link>
                </div>
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
}

function ComplaintSection() {
  const [complaints, setComplaints] = useState([]);
  const [complaintsLoaded, setComplaintsLoaded] = useState(false);

  useEffect(() => {
    const unsub = ComplaintsAPI.listen((data) => { setComplaints(data); setComplaintsLoaded(true); });
    return () => unsub?.();
  }, []);
  const [newComplaint, setNewComplaint] = useState({ subject: '', priority: 'Medium', notes: '' });
  const [complaintSearch, setComplaintSearch] = useState('');

  const filteredComplaints = complaints.filter((c) => c.subject.toLowerCase().includes(complaintSearch.toLowerCase()) || c.user.toLowerCase().includes(complaintSearch.toLowerCase()));

  const handleAdd = async () => {
    if (!newComplaint.subject.trim()) { return; }
    const newId = await addDocument('complaints', { user: 'Admin User', subject: newComplaint.subject, priority: newComplaint.priority, status: 'Open', time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), notes: newComplaint.notes, createdAt: new Date().toISOString() });
    if (newId) { setComplaints((prev) => [{ id: newId, user: 'Admin User', subject: newComplaint.subject, priority: newComplaint.priority, status: 'Open', time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), notes: newComplaint.notes }, ...prev]); }
    setNewComplaint({ subject: '', priority: 'Medium', notes: '' });
  };

  const toggleStatus = async (id) => {
    const complaint = complaints.find((c) => c.id === id);
    const newStatus = complaint.status === 'Open' ? 'In Progress' : complaint.status === 'In Progress' ? 'Resolved' : 'Open';
    await updateDocument('complaints', id, { status: newStatus });
    setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, status: newStatus } : c));
  };

  return (
    <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="flex items-center gap-2 font-sans text-base font-semibold text-theme-primary"><MessageSquare className="h-5 w-5 text-amber-400" /> Complaint Center</h2>
        <div className="flex gap-2">
          <input type="text" value={complaintSearch} onChange={(e) => setComplaintSearch(e.target.value)} placeholder="Search complaints..." className="rounded-xl border border-theme-muted bg-surface-muted/40 px-3 py-1.5 text-xs text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none w-40" />
          <span className="rounded-lg bg-danger-500/10 px-2 py-1 text-[10px] font-bold text-danger-400">{complaints.filter((c) => c.status === 'Open').length} Open</span>
        </div>
      </div>
      {/* Add Complaint */}
      <div className="mb-4 flex gap-2">
        <input type="text" value={newComplaint.subject} onChange={(e) => setNewComplaint((p) => ({ ...p, subject: e.target.value }))} onKeyDown={(e) => { if (e.key === 'Enter') { handleAdd(); } }} placeholder="New complaint subject..." className="flex-1 rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2 text-xs text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none" />
        <select value={newComplaint.priority} onChange={(e) => setNewComplaint((p) => ({ ...p, priority: e.target.value }))} className="rounded-xl border border-theme-muted bg-surface-muted/40 px-3 py-2 text-xs text-theme-secondary focus:border-accent-500 focus:outline-none"><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select>
        <button onClick={handleAdd} className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-amber-400"><Send className="h-3.5 w-3.5" /> Log</button>
      </div>
      {/* Complaints Table */}
      <div className="overflow-x-auto"><table className="w-full text-left text-xs">
        <thead className="border-b border-theme-muted"><tr><th className="px-3 py-2 font-mono text-[9px] uppercase text-theme-muted">ID</th><th className="px-3 py-2 font-mono text-[9px] uppercase text-theme-muted">User</th><th className="px-3 py-2 font-mono text-[9px] uppercase text-theme-muted">Subject</th><th className="px-3 py-2 font-mono text-[9px] uppercase text-theme-muted">Priority</th><th className="px-3 py-2 font-mono text-[9px] uppercase text-theme-muted">Status</th><th className="px-3 py-2 font-mono text-[9px] uppercase text-theme-muted">Time</th><th className="px-3 py-2 font-mono text-[9px] uppercase text-theme-muted">Notes</th><th /></tr></thead>
        <tbody>{filteredComplaints.map((c) => (
          <tr key={c.id} className="border-b border-theme-muted hover:bg-surface-muted/40">
            <td className="px-3 py-2 text-theme-muted">#{c.id}</td><td className="px-3 py-2 font-medium text-theme-primary">{c.user}</td><td className="px-3 py-2">{c.subject}</td>
            <td className="px-3 py-2"><span className={cn('rounded px-2 py-0.5 text-[9px] font-bold', c.priority==='High'||c.priority==='Critical'?'bg-danger-500/10 text-danger-400':c.priority==='Medium'?'bg-amber-500/10 text-amber-400':'bg-blue-500/10 text-blue-400')}>{c.priority}</span></td>
            <td className="px-3 py-2"><button onClick={() => toggleStatus(c.id)} className={cn('rounded px-2 py-0.5 text-[9px] font-bold', c.status==='Open'?'bg-danger-500/10 text-danger-400':c.status==='In Progress'?'bg-blue-500/10 text-blue-400':'bg-green-500/10 text-green-400')}>{c.status}</button></td>
            <td className="px-3 py-2 text-theme-muted">{c.time}</td><td className="px-3 py-2 text-theme-muted">{c.notes}</td>
            <td className="px-3 py-2"><button onClick={async () => { await deleteDocument('complaints', c.id); setComplaints((prev) => prev.filter((x) => x.id !== c.id)); }} className="text-theme-muted hover:text-danger-400"><X className="h-3 w-3" /></button></td>
          </tr>
        ))}</tbody>
      </table></div>
    </div>
  );
}

function NexoraCloudButton() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(() => {
    try { return parseInt(localStorage.getItem('nexora_last_sync') || '0', 10) || Date.now(); } catch { return Date.now(); }
  });
  const [syncMsg, setSyncMsg] = useState('');

  const handleSync = async () => {
    setSyncing(true);
    try {
      const { db } = await import('@/firebase/config');
      if (!db) { setSyncMsg('Firebase not configured'); setSyncing(false); return; }
      const { setDocument } = await import('@/firebase/services');
      const syncData = {
        syncedAt: new Date().toISOString(),
        guards: guards.length, onDuty: onDuty.length, offDuty: offDuty.length, clients: clients.length, sites: sites.length, incidents: incidents.length, patrols: patrols.length,
      };
      await setDocument('company', 'dashboard_stats', syncData);
      const now = Date.now();
      localStorage.setItem('nexora_last_sync', String(now));
      setLastSync(now);
      setSyncMsg('Synced to Firestore');
      setTimeout(() => setSyncMsg(''), 2000);
    } catch { setSyncMsg('Sync failed'); }
    setSyncing(false);
  };

  const secondsAgo = Math.floor((Date.now() - lastSync) / 1000);
  const timeAgo = secondsAgo < 60 ? `${secondsAgo}s ago` : `${Math.floor(secondsAgo / 60)}m ago`;

  return (
    <button onClick={handleSync} disabled={syncing} className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-bold transition-all ${syncing ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' : 'border-green-500/30 bg-green-500/10 text-green-400'}`} title={syncMsg || `Last sync: ${timeAgo}`}>
      {syncing ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Cloud className="h-3 w-3" />}
      Nexora Cloud <span className="hidden sm:inline">· {syncing ? 'Syncing...' : syncMsg || timeAgo}</span>
    </button>
  );
}

/* eslint-disable react/no-array-index-key */
function DetailTable({ title, icon: Icon, color, border, cols, data }) {
  return (
    <div className={`rounded-2xl border ${border} bg-surface-raised p-5`}>
      <h2 className={`mb-4 flex items-center gap-2 font-sans text-base font-semibold ${color}`}><Icon className="h-5 w-5" /> {title} ({data.length})</h2>
      <div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="border-b border-theme-muted"><tr>{cols.map((h) => <th key={h} className="px-3 py-2 font-mono text-[9px] font-semibold uppercase text-theme-muted">{h}</th>)}</tr></thead><tbody>{data.map((row, i) => (<tr key={i} className="border-b border-theme-muted hover:bg-surface-muted/40">{row.map((cell, j) => <td key={j} className="px-3 py-2 text-theme-secondary">{cell}</td>)}</tr>))}</tbody></table></div>
    </div>
  );
}
