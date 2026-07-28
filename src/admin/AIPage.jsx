import { Shield, FileText, TrendingUp, MessageCircle, BrainCircuit, Users } from 'lucide-react';
import { SEO } from '@/components/SEO';

const MODULES = [
  { icon: Shield, title: 'Nexora AI Incident Assistant', desc: 'Automatically analyze incident reports, suggest severity levels, and recommend corrective actions based on historical patterns.', status: 'Architecture Ready', color: 'text-danger-400', bg: 'bg-danger-500/10' },
  { icon: Users, title: 'Nexora AI Guard Assistant', desc: 'Smart scheduling recommendations, fatigue prediction, performance insights, and training suggestions for each guard.', status: 'Architecture Ready', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: FileText, title: 'Nexora AI Report Generator', desc: 'Generate executive summaries, client reports, and operational insights from raw data using natural language processing.', status: 'Architecture Ready', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: TrendingUp, title: 'Nexora AI Risk Analysis', desc: 'Predictive risk scoring for sites, patrol routes, and shifts. Identify potential security gaps before incidents occur.', status: 'Architecture Ready', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: MessageCircle, title: 'Nexora AI Chat Assistant', desc: 'Conversational AI for quick queries. "Show me today\'s attendance," "Which guards are on duty?", "Generate patrol report."', status: 'Coming Soon', color: 'text-violet-400', bg: 'bg-violet-500/10' },
];

export default function AIPage() {
  return (
    <div className="space-y-6">
      <SEO title="Nexora AI — Admin" noIndex />
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20"><BrainCircuit className="h-6 w-6 text-blue-400" /></div>
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Nexora AI Command Center</h1><p className="mt-1 text-sm text-theme-muted">Enterprise Nexora AI — architecture ready, zero API calls</p></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m) => (
          <div key={m.title} className="rounded-2xl border border-theme-muted bg-surface-raised p-6 transition-all hover:shadow-lg">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${m.bg}`}><m.icon className={`h-6 w-6 ${m.color}`} /></div>
            <h3 className="mt-4 font-sans font-semibold text-theme-primary">{m.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-theme-muted">{m.desc}</p>
            <span className={`mt-3 inline-block rounded-lg px-3 py-1 text-[10px] font-bold ${m.status === 'Architecture Ready' ? 'bg-accent-500/10 text-accent-400' : 'bg-amber-500/10 text-amber-400'}`}>{m.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
