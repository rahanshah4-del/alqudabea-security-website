import { SEO } from '@/components/SEO';
import { HeroSection } from '@/pages/home/HeroSection';
import { TrustBar } from '@/pages/home/TrustBar';
import { ServicesOverview } from '@/pages/home/ServicesOverview';
import { AboutPreview } from '@/pages/home/AboutPreview';
import { WhyChooseUs } from '@/pages/home/WhyChooseUs';
import { CompanyStats } from '@/pages/home/CompanyStats';
import { TrustSection } from '@/components/TrustSection';
import { IndustriesGrid } from '@/pages/home/IndustriesGrid';
import { CTASection } from '@/pages/home/CTASection';
import { SITE_DESCRIPTION } from '@/config/seo';
import {
  ORGANIZATION_SCHEMA,
  LOCAL_BUSINESS_SCHEMA,
  WEBSITE_SCHEMA,
  breadcrumbSchema,
} from '@/config/seo';

/**
 * ALQUDABEA SECURITY SERVICES W.L.L. — Home Page.
 *
 * Eight premium sections following Apple Human Interface Guidelines.
 * Production-grade SEO: Organization, LocalBusiness, WebSite, and
 * Breadcrumb schemas. Single H1 — the full company name.
 */
export function HomePage() {
  return (
    <>
      <SEO
        description={SITE_DESCRIPTION}
        path="/"
        schema={[
          ORGANIZATION_SCHEMA,
          LOCAL_BUSINESS_SCHEMA,
          WEBSITE_SCHEMA,
          breadcrumbSchema([{ name: 'Home', url: '/' }]),
        ]}
      />

      <HeroSection />
      <TrustBar />
      <ServicesOverview />
      <AboutPreview />
      <CompanyStats />
      <WhyChooseUs />
      <TrustSection />
      <IndustriesGrid />
      <CTASection />
    </>
  );
}
