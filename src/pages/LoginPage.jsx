import { useState } from 'react';
import { Link, Navigate } from 'react-router';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, initializing, loginLoading, error, login, isReady } = useAuth();

  // ── Redirect after Firebase confirms user is logged in ──
  // This is the SINGLE redirect — no navigate() needed in handleSubmit
  if (isReady && user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    // Just call login — the redirect above handles navigation on next render
    await login(email, password);
  };

  const inputCls =
    'w-full rounded-xl border border-theme bg-surface-root/60 px-4 py-3.5 pl-11 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:ring-accent-500/20 focus:ring-2 focus:outline-none transition-all duration-200';

  return (
    <>
      <SEO title="Admin Login — Alqudabea Security Services" path="/login" noIndex />
      <main className="relative flex min-h-[100svh] items-center justify-center bg-surface-root px-4">
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="from-accent-500/[0.05] via-cyan-500/[0.03] to-surface-root absolute inset-0 bg-gradient-to-br" />
          <div className="to-surface-root absolute top-0 left-1/2 h-[500px] w-[600px] -translate-x-1/2 bg-gradient-to-b from-accent-500/[0.06] to-transparent blur-3xl" />
        </div>

        <Container size="small" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: APPLE_EASE }}
            className="glass mx-auto max-w-md overflow-hidden rounded-3xl p-8 sm:p-10"
          >
            {/* Logo + Title */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/logo-main.png"
                alt="Alqudabea Security Services"
                className="h-16 w-auto object-contain"
              />
              <h1 className="mt-5 font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">
                Admin Login
              </h1>
              <p className="mt-2 text-sm text-theme-muted">
                Alqudabea Security Services W.L.L.
              </p>
            </div>

            {/* Checking session state */}
            {initializing && (
              <div className="mt-8 flex flex-col items-center gap-3 py-6">
                <Loader2 className="h-6 w-6 animate-spin text-accent-400" />
                <p className="text-sm text-theme-muted">Checking session...</p>
              </div>
            )}

            {/* Error */}
            {!initializing && error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-center gap-2.5 rounded-xl border border-danger-500/20 bg-danger-500/5 px-4 py-3"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-danger-400" />
                <p className="text-sm text-danger-300">{error}</p>
              </motion.div>
            )}

            {/* Form — hidden while initializing */}
            {!initializing && (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@alqudabeasecurity.online"
                    className={inputCls}
                    autoComplete="email"
                    required
                    disabled={loginLoading}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={cn(inputCls, 'pr-11')}
                    autoComplete="current-password"
                    required
                    disabled={loginLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-theme-muted transition-colors hover:text-theme-secondary"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  loading={loginLoading}
                  className="w-full"
                >
                  {loginLoading ? 'Signing in...' : 'Sign In'}
                  {!loginLoading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>
            )}

            {/* Back link */}
            <p className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm text-theme-muted transition-colors hover:text-accent-400"
              >
                &larr; Back to website
              </Link>
            </p>
          </motion.div>

          {/* Footer */}
          <div className="mt-8 space-y-1 text-center">
            <p className="font-mono text-[11px] text-theme-muted">
              Alqudabea Security Services W.L.L. &copy; {new Date().getFullYear()}
            </p>
            <p className="font-mono text-[10px] text-theme-muted/60">
              Designed &amp; Developed by{' '}
              <span className="font-medium text-theme-muted">Nexora Solution</span>
            </p>
          </div>
        </Container>
      </main>
    </>
  );
}
