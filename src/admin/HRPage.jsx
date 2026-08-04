import { useState, useEffect } from 'react';
import { Users, GraduationCap, Calendar, TrendingUp, X, Check, Edit3, Trash2, UserPlus, CalendarPlus } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { getCollection, addDocument, updateDocument, deleteDocument } from '@/firebase/services';

export default function HRPage() {
  const [employees, setEmployees] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCollection('employees'), getCollection('interviews')])
      .then(([emp, int]) => { setEmployees(emp); setInterviews(int); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);
  const [showEmpForm, setShowEmpForm] = useState(false);
  const [showIntForm, setShowIntForm] = useState(false);
  const [editEmpId, setEditEmpId] = useState(null);
  const [empForm, setEmpForm] = useState({ name: '', dept: 'Manned Guarding', position: '', joinDate: '', status: 'Active', leave: '0 days', performance: 'B+' });

  const openAddEmp = () => { setEditEmpId(null); setEmpForm({ name: '', dept: 'Manned Guarding', position: '', joinDate: '', status: 'Active', leave: '0 days', performance: 'B+' }); setShowEmpForm(true); };
  const openEditEmp = (e) => { setEditEmpId(e.id); setEmpForm({ name: e.name, dept: e.dept, position: e.position, joinDate: e.joinDate, status: e.status, leave: e.leave, performance: e.performance }); setShowEmpForm(true); };
  const [intForm, setIntForm] = useState({ candidate: '', position: '', date: '', time: '', status: 'Scheduled' });

  const handleSaveEmp = async () => {
    if (!empForm.name.trim()) { return; }
    if (editEmpId) {
      await updateDocument('employees', editEmpId, empForm);
      setEmployees((prev) => prev.map((e) => e.id === editEmpId ? { ...e, ...empForm } : e));
    } else {
      const newId = await addDocument('employees', empForm);
      if (newId) { setEmployees((prev) => [...prev, { id: newId, ...empForm }]); }
    }
    setShowEmpForm(false);
  };
  const handleDeleteEmp = async (id) => { await deleteDocument('employees', id); setEmployees((prev) => prev.filter((e) => e.id !== id)); };

  const handleAddInt = async () => {
    if (!intForm.candidate.trim()) { return; }
    const newId = await addDocument('interviews', intForm);
    if (newId) { setInterviews((prev) => [...prev, { id: newId, ...intForm }]); }
    setIntForm({ candidate: '', position: '', date: '', time: '', status: 'Scheduled' }); setShowIntForm(false);
  };
  const handleDeleteInt = async (idx) => {
    const item = interviews[idx];
    if (item?.id) { await deleteDocument('interviews', item.id); }
    setInterviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none';

  return (
    <div className="space-y-6">
      <SEO title="HR — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Human Resources</h1><p className="mt-1 text-sm text-theme-muted">{employees.length} admin staff · {interviews.length} upcoming interviews</p></div>
        <div className="flex gap-2">
          <button onClick={() => { setIntForm({ candidate: '', position: '', date: '', time: '', status: 'Scheduled' }); setShowIntForm(true); }} className="flex items-center gap-2 rounded-xl border border-theme-muted px-3 py-2 text-sm text-theme-secondary transition-all hover:border-accent-500/30"><CalendarPlus className="h-4 w-4" /> Schedule</button>
          <button onClick={openAddEmp} className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><UserPlus className="h-4 w-4" /> Add Employee</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { icon: Users, label: 'Admin Staff', value: employees.length, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { icon: GraduationCap, label: 'In Training', value: employees.filter((e) => e.status === 'Training').length, color: 'text-green-400', bg: 'bg-green-500/10' },
          { icon: Calendar, label: 'On Leave', value: employees.filter((e) => e.status === 'On Leave').length, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: TrendingUp, label: 'Upcoming Interviews', value: interviews.length, color: 'text-violet-400', bg: 'bg-violet-500/10' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center"><div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div><p className={`mt-2 font-sans text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-[10px] text-theme-muted uppercase tracking-wider">{s.label}</p></div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <div className="flex items-center justify-between"><h2 className="font-sans text-lg font-semibold text-theme-primary">Upcoming Interviews</h2><span className="text-xs text-theme-muted">{interviews.length}</span></div>
          <div className="mt-3 space-y-2">
            {interviews.map((i, idx) => (
              <div key={i.candidate} className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 p-3">
                <div><p className="text-sm font-medium text-theme-primary">{i.candidate}</p><p className="text-xs text-theme-muted">{i.position}</p></div>
                <div className="flex items-center gap-2"><div className="text-right"><p className="text-xs font-medium text-theme-primary">{i.date}</p><p className="text-[10px] text-theme-muted">{i.time}</p></div><button onClick={() => handleDeleteInt(idx)} className="rounded-lg p-1 text-theme-muted hover:bg-danger-500/10 hover:text-danger-400"><Trash2 className="h-3.5 w-3.5" /></button></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <div className="flex items-center justify-between"><h2 className="font-sans text-lg font-semibold text-theme-primary">Admin Staff</h2><span className="text-xs text-theme-muted">{employees.length}</span></div>
          <div className="mt-3 space-y-2">
            {employees.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 p-3">
                <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10 text-xs font-bold text-accent-400">{e.name.split(' ').map((n) => n[0]).join('')}</div><div><p className="text-sm font-medium text-theme-primary">{e.name}</p><p className="text-[10px] text-theme-muted">{e.dept} · {e.position}</p></div></div>
                <div className="flex items-center gap-2"><span className="rounded bg-green-500/10 px-1.5 py-0.5 text-[10px] font-bold text-green-400">{e.performance}</span><button onClick={() => openEditEmp(e)} className="rounded-lg p-1 text-theme-muted hover:bg-surface-overlay hover:text-accent-400"><Edit3 className="h-3.5 w-3.5" /></button><button onClick={() => handleDeleteEmp(e.id)} className="rounded-lg p-1 text-theme-muted hover:bg-danger-500/10 hover:text-danger-400"><Trash2 className="h-3.5 w-3.5" /></button></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employee Form Modal */}
      {showEmpForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowEmpForm(false)} aria-label="Close" />
          <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">{editEmpId ? 'Edit Employee' : 'Add Employee'}</h2><button onClick={() => setShowEmpForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><label htmlFor="e-name" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Full Name *</label><input id="e-name" value={empForm.name} onChange={(e) => setEmpForm((p) => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="Full name" /></div>
              <div><label htmlFor="e-dept" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Department</label><select id="e-dept" value={empForm.dept} onChange={(e) => setEmpForm((p) => ({ ...p, dept: e.target.value }))} className={inputCls}><option>Manned Guarding</option><option>Mobile Patrol</option><option>CCTV Monitoring</option><option>Event Security</option><option>VIP Protection</option><option>HR</option><option>Training</option><option>Recruitment</option><option>Payroll</option><option>Management</option></select></div>
              <div><label htmlFor="e-pos" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Position</label><input id="e-pos" value={empForm.position} onChange={(e) => setEmpForm((p) => ({ ...p, position: e.target.value }))} className={inputCls} placeholder="Job title" /></div>
              <div><label htmlFor="e-date" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Join Date</label><input id="e-date" type="date" value={empForm.joinDate} onChange={(e) => setEmpForm((p) => ({ ...p, joinDate: e.target.value }))} className={inputCls} /></div>
              <div><label htmlFor="e-perf" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Performance</label><select id="e-perf" value={empForm.performance} onChange={(e) => setEmpForm((p) => ({ ...p, performance: e.target.value }))} className={inputCls}><option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option></select></div>
              <div><label htmlFor="e-status" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Status</label><select id="e-status" value={empForm.status} onChange={(e) => setEmpForm((p) => ({ ...p, status: e.target.value }))} className={inputCls}><option>Active</option><option>On Leave</option><option>Inactive</option></select></div>
              <div><label htmlFor="e-leave" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Leave Balance</label><input id="e-leave" value={empForm.leave} onChange={(e) => setEmpForm((p) => ({ ...p, leave: e.target.value }))} className={inputCls} placeholder="e.g. 5 days" /></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowEmpForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={handleSaveEmp} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Check className="inline h-4 w-4 mr-1" /> {editEmpId ? 'Save' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Form Modal */}
      {showIntForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowIntForm(false)} aria-label="Close" />
          <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-overlay">
            <div className="flex items-center justify-between mb-5"><h2 className="font-sans text-lg font-bold text-theme-primary">Schedule Interview</h2><button onClick={() => setShowIntForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-3">
              <div><label htmlFor="i-cand" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Candidate *</label><input id="i-cand" value={intForm.candidate} onChange={(e) => setIntForm((p) => ({ ...p, candidate: e.target.value }))} className={inputCls} placeholder="Full name" /></div>
              <div><label htmlFor="i-pos" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Position</label><input id="i-pos" value={intForm.position} onChange={(e) => setIntForm((p) => ({ ...p, position: e.target.value }))} className={inputCls} placeholder="Job title" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label htmlFor="i-date" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Date</label><input id="i-date" type="date" value={intForm.date} onChange={(e) => setIntForm((p) => ({ ...p, date: e.target.value }))} className={inputCls} /></div>
                <div><label htmlFor="i-time" className="mb-1 block text-[10px] font-bold text-theme-muted uppercase">Time</label><input id="i-time" type="time" value={intForm.time} onChange={(e) => setIntForm((p) => ({ ...p, time: e.target.value }))} className={inputCls} /></div>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowIntForm(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={handleAddInt} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Check className="inline h-4 w-4 mr-1" /> Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
