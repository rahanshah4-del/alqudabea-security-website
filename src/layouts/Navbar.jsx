import { useState, useCallback } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Phone, MessageCircle, LogIn } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { NavLink } from '@/components/NavLink';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NAVIGATION } from '@/config/site';
import { useScrollPosition } from '@/hooks/useScrollPosition';

/**
 * Premium Apple-style navigation with animated mobile drawer.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const { scrolled } = useScrollPosition({ threshold: 60 });

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass border-b border-theme-muted shadow-lg shadow-black/10'
            : 'border-b border-white/[0.06] bg-surface-root/90 backdrop-blur-xl',
        )}
      >
        <Container>
          <nav
            className={cn(
              'flex items-center justify-between transition-all duration-500',
              scrolled ? 'h-14' : 'h-16',
            )}
            aria-label="Main navigation"
          >
            {/* ── Logo ─────────────────────────────────── */}
            <Link
              to="/"
              className="flex shrink-0 items-center gap-3 transition-all duration-500"
              style={{ height: scrolled ? '38px' : '50px' }}
              aria-label="ALQUDABEA SECURITY SERVICES W.L.L. — Home"
            >
              <img src="/logo-main.png" alt="" aria-hidden="true" className="h-full w-auto object-contain transition-all duration-500" />
              <div className="hidden flex-col justify-center leading-tight sm:flex">
                <span className="text-gradient font-sans text-base font-extrabold tracking-[-0.03em] lg:text-lg">ALQUDABEA</span>
                <span className="font-sans text-[11px] font-semibold tracking-[0.12em] text-accent-400 uppercase lg:text-xs">Security Services</span>
              </div>
            </Link>

            {/* ── Desktop Links ────────────────────────── */}
            <div className="hidden items-center gap-1 md:flex">
              {NAVIGATION.main.map((item) => (
                <NavLink key={item.href} to={item.href} className="rounded-lg px-3 py-2 text-sm transition-colors hover:text-neutral-100">
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* ── Desktop Actions ─────────────────────── */}
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/login" className="flex h-9 w-9 items-center justify-center rounded-xl border border-theme-muted text-theme-muted transition-all duration-200 hover:border-accent-500/30 hover:text-accent-400" aria-label="Admin Login">
                <LogIn className="h-4 w-4" />
              </Link>
              <ThemeToggle />
              <Button as={Link} to={NAVIGATION.cta.href} size="sm">{NAVIGATION.cta.label}</Button>
            </div>

            {/* ── Mobile Actions ──────────────────────── */}
            <div className="flex items-center gap-1 md:hidden">
              <Link
                to="/search"
                className="flex h-12 w-12 items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-surface-raised hover:text-neutral-200"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Link>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 hover:bg-surface-raised"
                style={{ color: mobileOpen ? '#3B82F6' : undefined }}
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="h-6 w-6" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      {/* Apple-style 2-line hamburger */}
                      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="text-neutral-400">
                        <path d="M2 2H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M2 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* ── Apple-Style Mobile Menu ──────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-surface-root/98 backdrop-blur-2xl md:hidden"
            aria-hidden="true"
          >
            <nav className="flex h-full flex-col px-6 pt-24 pb-10" aria-label="Mobile navigation">
              <div className="flex flex-1 flex-col justify-center gap-0">
                {NAVIGATION.main.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.35, delay: 0.08 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.href}
                      onClick={closeMobile}
                      className="group flex items-center justify-between px-4 py-4 transition-colors duration-200"
                    >
                      <span className="font-sans text-[28px] font-semibold tracking-[-0.02em] text-theme-primary transition-colors duration-200 group-hover:text-accent-400">
                        {item.label}
                      </span>
                      <ChevronRight className="h-5 w-5 text-theme-muted opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3"
              >
                <Button as={Link} to={NAVIGATION.cta.href} size="lg" className="w-full" onClick={closeMobile}>
                  {NAVIGATION.cta.label}
                </Button>
                <div className="flex items-center justify-between gap-3">
                  <a href="tel:+97377907878" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-theme py-3 text-sm font-medium text-theme-body transition-colors hover:border-accent-500/30 hover:text-accent-400">
                    <Phone className="h-4 w-4" /> Call
                  </a>
                  <a href="https://wa.me/97377907878" target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-theme py-3 text-sm font-medium text-theme-body transition-colors hover:border-green-500/40 hover:text-green-400">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                  <ThemeToggle />
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
