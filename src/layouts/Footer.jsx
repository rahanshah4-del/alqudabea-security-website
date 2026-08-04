import { Link } from 'react-router';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Container } from '@/components/Container';
import { NavLink } from '@/components/NavLink';
import { SITE, NAVIGATION, SOCIAL } from '@/config/site';

/**
 * Modern premium footer with balanced columns, contact info, and proper spacing.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-theme-muted bg-surface-muted/60 border-t">
      {/* ── Top Section ─────────────────────────── */}
      <Container>
        <div className="py-16 lg:py-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
              <Link to="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-80">
                <img src="/logo-main.png" alt="" aria-hidden="true" className="h-11 w-auto object-contain" />
                <div className="flex flex-col leading-tight">
                  <span className="text-gradient font-sans text-lg font-extrabold tracking-[-0.03em]">ALQUDABEA</span>
                  <span className="font-sans text-[11px] font-semibold tracking-[0.12em] text-accent-400 uppercase">Security Services</span>
                </div>
              </Link>
              <p className="text-sm leading-relaxed text-neutral-500">{SITE.tagline}</p>
              {/* Quick contact row */}
              <div className="flex flex-wrap gap-3">
                <a href="tel:+97377907878" className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs font-medium text-neutral-400 transition-colors hover:border-accent-500/30 hover:text-neutral-200">
                  <Phone className="h-3 w-3" /> Call
                </a>
                <a href="mailto:info@alqudabeass.com" className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs font-medium text-neutral-400 transition-colors hover:border-accent-500/30 hover:text-neutral-200">
                  <Mail className="h-3 w-3" /> info@alqudabeass.com
                </a>
                <a href="https://wa.me/97377907878" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs font-medium text-neutral-400 transition-colors hover:border-accent-500/30 hover:text-neutral-200">
                  <MessageCircle className="h-3 w-3" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-5 font-mono text-[11px] font-semibold tracking-[0.15em] text-neutral-400 uppercase">Quick Links</h4>
              <ul className="flex flex-col gap-2.5">
                {NAVIGATION.main.map((item) => (
                  <li key={item.href}>
                    <NavLink to={item.href} className="text-sm">{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="mb-5 font-mono text-[11px] font-semibold tracking-[0.15em] text-neutral-400 uppercase">Contact</h4>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-600" />
                  <div>
                    <a href="tel:+97377907878" className="text-sm text-neutral-400 transition-colors hover:text-neutral-200">+973 7790 7878</a>
                    <p className="mt-0.5 font-mono text-[10px] text-neutral-600">+973 3445 2144 / +973 3456 9393</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-600" />
                  <a href="mailto:info@alqudabeass.com" className="text-sm text-neutral-400 transition-colors hover:text-neutral-200">info@alqudabeass.com</a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-600" />
                  <a href="mailto:security@alqudabeasecurity.online" className="text-sm text-neutral-400 transition-colors hover:text-neutral-200">security@alqudabeasecurity.online</a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-600" />
                  <a href="mailto:help@alqudabeasecurity.online" className="text-sm text-neutral-400 transition-colors hover:text-neutral-200">help@alqudabeasecurity.online</a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-600" />
                  <span className="text-sm text-neutral-500">Office 22, Bldg 2552, Road 1275<br />Block 912, Riffa/Al Gharbi, Bahrain</span>
                </li>
              </ul>
            </div>

            {/* Legal & Trust */}
            <div>
              <h4 className="mb-5 font-mono text-[11px] font-semibold tracking-[0.15em] text-neutral-400 uppercase">Legal &amp; Trust</h4>
              <ul className="flex flex-col gap-2.5">
                <li><NavLink to="/privacy" className="text-sm text-neutral-400 hover:text-neutral-100">Privacy Policy</NavLink></li>
                <li><NavLink to="/terms" className="text-sm text-neutral-400 hover:text-neutral-100">Terms of Service</NavLink></li>
                <li><NavLink to="/careers" className="text-sm text-neutral-400 hover:text-neutral-100">Careers</NavLink></li>
              </ul>
              <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                <p className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">Licensed &amp; Registered</p>
                <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-neutral-500">CR No. 176298-1</p>
                <p className="font-mono text-[10px] text-neutral-600">Ministry of Industry &amp; Commerce, Bahrain</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Bottom Bar ──────────────────────────── */}
      <div className="border-theme-muted border-t">
        <Container>
          <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
            <p className="font-mono text-[11px] text-neutral-600">
              &copy; {currentYear} {SITE.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-600 transition-colors hover:text-neutral-400" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <p className="font-mono text-[10px] tracking-wide text-neutral-700">
                Designed &amp; Developed by <span className="font-medium text-neutral-500">Nexora Solution</span>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
