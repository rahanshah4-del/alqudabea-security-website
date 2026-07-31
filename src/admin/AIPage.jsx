import { useState } from 'react';
import { Shield, FileText, TrendingUp, MessageCircle, BrainCircuit, Users, Send, Sparkles, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';

const MODULES = [
  { icon: Shield, title: 'Nexora AI Incident Assistant', desc: 'Automatically analyze incident reports, suggest severity levels, and recommend corrective actions based on historical patterns.', status: 'Architecture Ready', color: 'text-danger-400', bg: 'bg-danger-500/10' },
  { icon: Users, title: 'Nexora AI Guard Assistant', desc: 'Smart scheduling recommendations, fatigue prediction, performance insights, and training suggestions for each guard.', status: 'Architecture Ready', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: FileText, title: 'Nexora AI Report Generator', desc: 'Generate executive summaries, client reports, and operational insights from raw data using natural language processing.', status: 'Architecture Ready', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: TrendingUp, title: 'Nexora AI Risk Analysis', desc: 'Predictive risk scoring for sites, patrol routes, and shifts. Identify potential security gaps before incidents occur.', status: 'Architecture Ready', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: MessageCircle, title: 'Nexora AI Chat Assistant', desc: 'Conversational AI for quick queries. "Show me today\'s attendance," "Which guards are on duty?", "Generate patrol report."', status: 'Coming Soon', color: 'text-violet-400', bg: 'bg-violet-500/10' },
];

const DEMOS = [
  'Show me guards on duty today',
  'Generate July patrol report',
  'Analyze incident trends this week',
  'Which sites need more coverage?',
  'Predict next month staffing needs',
];

export default function AIPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuery = () => {
    if (!query.trim()) { return; }
    setLoading(true); setResponse('');
    setTimeout(() => {
      setResponse('Nexora AI is in architecture mode. When connected to the AI provider, this will process your query in real-time and return actionable insights from your security operations data. Your query has been logged for future processing.');
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <SEO title="Nexora AI — Admin" noIndex />
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20"><BrainCircuit className="h-6 w-6 text-blue-400" /></div>
        <div><h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Nexora AI Command Center</h1><p className="mt-1 text-sm text-theme-muted">Enterprise AI — architecture ready</p></div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m) => (
          <div key={m.title} className="group rounded-2xl border border-theme-muted bg-surface-raised p-6 transition-all hover:-translate-y-1 hover:border-accent-500/30 hover:shadow-lg">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${m.bg}`}><m.icon className={`h-6 w-6 ${m.color}`} /></div>
            <h3 className="mt-4 font-sans font-semibold text-theme-primary">{m.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-theme-muted">{m.desc}</p>
            <span className={`mt-3 inline-block rounded-lg px-3 py-1 text-[10px] font-bold ${m.status === 'Architecture Ready' ? 'bg-accent-500/10 text-accent-400' : 'bg-amber-500/10 text-amber-400'}`}>{m.status}</span>
          </div>
        ))}
      </div>

      {/* Demo Chat */}
      <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
        <h2 className="flex items-center gap-2 font-sans text-lg font-semibold text-theme-primary"><Sparkles className="h-5 w-5 text-blue-400" /> Try Demo Query</h2>
        <div className="mt-4 flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleQuery(); } }} placeholder="Ask Nexora AI..." className="flex-1 rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none" />
          <button onClick={handleQuery} disabled={loading} className="flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-accent-400 disabled:opacity-50"><Send className="h-4 w-4" /> {loading ? 'Thinking...' : 'Ask'}</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {DEMOS.map((d) => (
            <button key={d} onClick={() => setQuery(d)} className="rounded-lg border border-theme-muted bg-surface-muted/40 px-3 py-1.5 text-xs text-theme-muted transition-colors hover:border-accent-500/30 hover:text-accent-400">{d}</button>
          ))}
        </div>
        {response && (
          <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <div className="flex items-center gap-2 mb-2"><Check className="h-4 w-4 text-green-400" /><span className="text-xs font-bold text-green-400">Nexora AI</span></div>
            <p className="text-sm text-theme-secondary">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
