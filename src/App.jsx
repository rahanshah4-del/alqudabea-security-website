import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { useLenis } from '@/hooks/useLenis';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { AdminLayout } from '@/admin/AdminLayout';
import { trackPageView } from '@/services/analytics';

/**
 * Application root.
 *
 * Code-split pages with route prefetching, analytics page views,
 * and production-ready lazy loading with skeleton fallbacks.
 */

// ── Lazy page imports ────────────────────────────────────
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const IndustriesPage = lazy(() => import('@/pages/IndustriesPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const CareersPage = lazy(() => import('@/pages/CareersPage'));
const CareerDetailsPage = lazy(() => import('@/pages/CareerDetailsPage'));
const JobApplicationPage = lazy(() => import('@/pages/JobApplicationPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogDetailsPage = lazy(() => import('@/pages/BlogDetailsPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const QuotePage = lazy(() => import('@/pages/QuotePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const CatalogPage = lazy(() => import('@/pages/CatalogPage'));
const DashboardPage = lazy(() => import('@/admin/DashboardPage'));
const CommandPage = lazy(() => import('@/admin/CommandPage'));
const GuardsPage = lazy(() => import('@/admin/GuardsPage'));
const ShiftsPage = lazy(() => import('@/admin/ShiftsPage'));
const AttendancePage = lazy(() => import('@/admin/AttendancePage'));
const ClientsPage = lazy(() => import('@/admin/ClientsPage'));
const SitesPage = lazy(() => import('@/admin/SitesPage'));
const PatrolPage = lazy(() => import('@/admin/PatrolPage'));
const IncidentsPage = lazy(() => import('@/admin/IncidentsPage'));
const VisitorsPage = lazy(() => import('@/admin/VisitorsPage'));
const VehiclesPage = lazy(() => import('@/admin/VehiclesPage'));
const HRPage = lazy(() => import('@/admin/HRPage'));
const FinancePage = lazy(() => import('@/admin/FinancePage'));
const MarketingPage = lazy(() => import('@/admin/MarketingPage'));
const BlogAdminPage = lazy(() => import('@/admin/BlogPage'));
const ReportsPage = lazy(() => import('@/admin/ReportsPage'));
const SettingsPage = lazy(() => import('@/admin/SettingsPage'));
const AIPage = lazy(() => import('@/admin/AIPage'));
const NotificationsPage = lazy(() => import('@/admin/NotificationsPage'));
const UsersPage = lazy(() => import('@/admin/UsersPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// ── Prefetchable page modules ────────────────────────────
const prefetchMap = {
  '/services': () => import('@/pages/ServicesPage'),
  '/about': () => import('@/pages/AboutPage'),
  '/industries': () => import('@/pages/IndustriesPage'),
  '/contact': () => import('@/pages/ContactPage'),
  '/careers': () => import('@/pages/CareersPage'),
  '/blog': () => import('@/pages/BlogPage'),
  '/search': () => import('@/pages/SearchPage'),
  '/quote': () => import('@/pages/QuotePage'),
};

/**
 * Prefetch a route's code chunk on hover/intent.
 * Call on mouseenter of navigation links.
 */
function prefetchRoute(path) {
  const loader = prefetchMap[path];
  if (loader) {
    loader();
  }
}

const PageSuspense = ({ children }) => (
  <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
);

export default function App() {
  useLenis();
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  // Prefetch high-probability next pages on idle
  useEffect(() => {
    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(() => {
        prefetchRoute('/services');
        prefetchRoute('/about');
        prefetchRoute('/contact');
      });
      return () => cancelIdleCallback(id);
    }
  }, []);

  // Expose prefetch to the window for NavLink use
  useEffect(() => {
    window.__prefetchRoute = prefetchRoute;
    return () => { delete window.__prefetchRoute; };
  }, []);

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<PageSuspense><ServicesPage /></PageSuspense>} />
        <Route path="about" element={<PageSuspense><AboutPage /></PageSuspense>} />
        <Route path="industries" element={<PageSuspense><IndustriesPage /></PageSuspense>} />
        <Route path="contact" element={<PageSuspense><ContactPage /></PageSuspense>} />
        <Route path="catalog" element={<PageSuspense><CatalogPage /></PageSuspense>} />
        <Route path="careers" element={<PageSuspense><CareersPage /></PageSuspense>} />
        <Route path="careers/:jobId" element={<PageSuspense><CareerDetailsPage /></PageSuspense>} />
        <Route path="careers/:jobId/apply" element={<PageSuspense><JobApplicationPage /></PageSuspense>} />
        <Route path="blog" element={<PageSuspense><BlogPage /></PageSuspense>} />
        <Route path="blog/:slug" element={<PageSuspense><BlogDetailsPage /></PageSuspense>} />
        <Route path="search" element={<PageSuspense><SearchPage /></PageSuspense>} />
        <Route path="quote" element={<PageSuspense><QuotePage /></PageSuspense>} />
        <Route path="offline" element={<PageSuspense><LazyOfflinePage /></PageSuspense>} />
        <Route path="*" element={<PageSuspense><NotFoundPage /></PageSuspense>} />
        <Route path="solutions" element={<PagePlaceholder title="Solutions" description="Tailored security solutions for your organization." />} />
        <Route path="privacy" element={<PagePlaceholder title="Privacy Policy" description="How we handle and protect your data." />} />
        <Route path="terms" element={<PagePlaceholder title="Terms of Service" description="Terms and conditions for using our platform." />} />
      </Route>
      {/* Standalone routes — no Navbar/Footer */}
      <Route path="login" element={<PageSuspense><LoginPage /></PageSuspense>} />
      {/* Admin routes — protected dashboard */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<PageSuspense><DashboardPage /></PageSuspense>} />
        <Route path="dashboard" element={<PageSuspense><DashboardPage /></PageSuspense>} />
        <Route path="command" element={<PageSuspense><CommandPage /></PageSuspense>} />
        <Route path="guards" element={<PageSuspense><GuardsPage /></PageSuspense>} />
        <Route path="shifts" element={<PageSuspense><ShiftsPage /></PageSuspense>} />
        <Route path="attendance" element={<PageSuspense><AttendancePage /></PageSuspense>} />
        <Route path="clients" element={<PageSuspense><ClientsPage /></PageSuspense>} />
        <Route path="sites" element={<PageSuspense><SitesPage /></PageSuspense>} />
        <Route path="patrol" element={<PageSuspense><PatrolPage /></PageSuspense>} />
        <Route path="incidents" element={<PageSuspense><IncidentsPage /></PageSuspense>} />
        <Route path="visitors" element={<PageSuspense><VisitorsPage /></PageSuspense>} />
        <Route path="vehicles" element={<PageSuspense><VehiclesPage /></PageSuspense>} />
        <Route path="hr" element={<PageSuspense><HRPage /></PageSuspense>} />
        <Route path="finance" element={<PageSuspense><FinancePage /></PageSuspense>} />
        <Route path="marketing" element={<PageSuspense><MarketingPage /></PageSuspense>} />
        <Route path="blog" element={<PageSuspense><BlogAdminPage /></PageSuspense>} />
        <Route path="reports" element={<PageSuspense><ReportsPage /></PageSuspense>} />
        <Route path="settings" element={<PageSuspense><SettingsPage /></PageSuspense>} />
        <Route path="ai" element={<PageSuspense><AIPage /></PageSuspense>} />
        <Route path="notifications" element={<PageSuspense><NotificationsPage /></PageSuspense>} />
        <Route path="users" element={<PageSuspense><UsersPage /></PageSuspense>} />
      </Route>
    </Routes>
  );
}

const LazyOfflinePage = lazy(() => import('@/pages/OfflinePage'));

function PageSkeleton() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-surface-root">
      <div className="flex flex-col items-center gap-4">
        <div className="h-3 w-24 animate-pulse rounded-full bg-surface-raised" />
        <div className="h-8 w-72 animate-pulse rounded-lg bg-surface-raised" />
        <div className="h-4 w-48 animate-pulse rounded-full bg-surface-raised" />
      </div>
    </main>
  );
}

function PagePlaceholder({ title, description }) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-surface-root">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent-500" aria-hidden="true">Coming Soon</span>
        <h1 className="font-sans text-2xl font-semibold text-neutral-100">{title}</h1>
        <p className="max-w-sm text-sm text-neutral-500">{description}</p>
      </div>
    </main>
  );
}
