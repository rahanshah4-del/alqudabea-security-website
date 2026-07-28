import { useMemo } from 'react';
import { DollarSign, TrendingUp, TrendingDown, FileText, Download, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { getFinance } from '@/admin/AdminData';

const statCls = (s) => s === 'Paid' ? 'bg-green-500/10 text-green-400' : s === 'Pending' ? 'bg-blue-500/10 text-blue-400' : 'bg-danger-500/10 text-danger-400';

export default function FinancePage() {
  const data = useMemo(() => getFinance(), []);
  return (
    <div className="space-y-6">
      <SEO title="Finance — Admin" noIndex />
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Finance</h1><p className="mt-1 text-sm text-theme-muted">Revenue, invoices &amp; expenses</p></div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl border border-theme-muted px-4 py-2.5 text-sm text-theme-secondary transition-all hover:border-accent-500/30"><Download className="h-4 w-4" /> Export</button>
          <button className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"><Plus className="h-4 w-4" /> New Invoice</button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: DollarSign, label: 'Monthly Revenue', value: data.monthlyRevenue, change: '+8.2%', up: true, color: 'text-green-400', bg: 'bg-green-500/10' },
          { icon: TrendingUp, label: 'Paid Invoices', value: data.paidInvoices, change: '+12%', up: true, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { icon: TrendingDown, label: 'Pending', value: data.pending, change: '-3.1%', up: false, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: FileText, label: 'Expenses', value: data.expenses, change: '+5.7%', up: false, color: 'text-danger-400', bg: 'bg-danger-500/10' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
            <div className="flex items-center justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div><span className={`flex items-center gap-1 text-xs font-bold ${s.up ? 'text-green-400' : 'text-danger-400'}`}>{s.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}{s.change}</span></div>
            <p className="mt-4 font-sans text-3xl font-bold text-theme-primary">{s.value}</p><p className="mt-1 text-xs text-theme-muted">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <h2 className="font-sans text-lg font-semibold text-theme-primary">Recent Invoices</h2>
          <div className="mt-3 space-y-2">{data.invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 p-3 hover:bg-surface-muted/60 cursor-pointer">
              <div><p className="text-sm font-medium text-theme-primary">{inv.client}</p><p className="text-[10px] text-theme-muted">{inv.id} · {inv.date}</p></div>
              <div className="flex items-center gap-3"><span className="font-mono text-sm font-bold text-theme-primary">{inv.amount}</span><span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${statCls(inv.status)}`}>{inv.status}</span></div>
            </div>
          ))}</div>
        </div>
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-5">
          <h2 className="font-sans text-lg font-semibold text-theme-primary">Active Quotations</h2>
          <div className="mt-3 space-y-2">{data.quotes.map((q) => (
            <div key={q.id} className="flex items-center justify-between rounded-xl border border-theme-muted bg-surface-muted/40 p-3 hover:bg-surface-muted/60 cursor-pointer">
              <div><p className="text-sm font-medium text-theme-primary">{q.client}</p><p className="text-[10px] text-theme-muted">{q.id} · {q.date}</p></div>
              <div className="flex items-center gap-3"><span className="font-mono text-sm font-bold text-theme-primary">{q.amount}</span><span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${q.status === 'Sent' ? 'bg-blue-500/10 text-blue-400' : 'bg-neutral-500/10 text-neutral-400'}`}>{q.status}</span></div>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  );
}
