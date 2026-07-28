/**
 * Blog data — ALQUDABEA SECURITY SERVICES W.L.L.
 *
 * Articles, categories, tags, and authors.
 * Centralized for future CMS / headless CMS / Firebase integration.
 */

// ── Categories ───────────────────────────────────────────

export const BLOG_CATEGORIES = [
  { id: 'security-tips', label: 'Security Tips', count: 8, slug: 'security-tips' },
  { id: 'industry-insights', label: 'Industry Insights', count: 6, slug: 'industry-insights' },
  { id: 'technology', label: 'Technology', count: 5, slug: 'technology' },
  { id: 'bahrain-regulations', label: 'Bahrain Regulations', count: 4, slug: 'bahrain-regulations' },
  { id: 'company-news', label: 'Company News', count: 3, slug: 'company-news' },
  { id: 'career-advice', label: 'Career Advice', count: 4, slug: 'career-advice' },
];

// ── Tags ─────────────────────────────────────────────────

export const BLOG_TAGS = [
  'Security', 'Bahrain', 'CCTV', 'Access Control', 'VIP Protection',
  'Risk Assessment', 'GTS', 'Ministry of Interior', 'Cyber Security',
  'Manned Guarding', 'Event Security', 'Mobile Patrol', 'AI',
  'Surveillance', 'Compliance', 'Training', 'Leadership',
];

// ── Authors ──────────────────────────────────────────────

export const AUTHORS = {
  'ahmed-al-mahmood': { name: 'Ahmed Al Mahmood', role: 'Managing Director', avatar: 'AM' },
  'fatima-hassan': { name: 'Fatima Hassan', role: 'Head of Training', avatar: 'FH' },
  'yusuf-ali': { name: 'Yusuf Ali', role: 'Technical Director', avatar: 'YA' },
  'noor-ibrahim': { name: 'Noor Ibrahim', role: 'Security Consultant', avatar: 'NI' },
};

// ── Articles ─────────────────────────────────────────────

export const ARTICLES = [
  {
    id: 'ai-cctv-bahrain-2026',
    slug: 'ai-powered-cctv-transforming-security-bahrain',
    title: 'How AI-Powered CCTV Is Transforming Security in Bahrain',
    excerpt: 'Artificial intelligence is revolutionising video surveillance. From behavioural analytics to real-time threat detection, discover how Bahraini businesses are adopting AI-driven CCTV to stay ahead of emerging threats.',
    content: `
## The Evolution of Surveillance

Traditional CCTV systems served as passive recording devices — useful for post-incident investigation but limited in prevention. AI-powered surveillance changes this paradigm entirely.

Modern AI CCTV systems can analyse video feeds in real-time, detecting anomalies that human operators might miss. From unauthorised access attempts to unusual crowd behaviour, AI algorithms process thousands of data points per second — alerting security teams before incidents escalate.

## Key Capabilities in 2026

**Behavioural Analytics**

AI systems now recognise patterns of normal behaviour and flag deviations. A person loitering near a restricted entrance, a vehicle repeatedly circling a facility, or unusual movement at odd hours — these triggers generate immediate alerts with contextual information for rapid response.

**Facial Recognition & Access Control**

Integrated facial recognition eliminates the need for physical access cards in high-security zones. Authorised personnel are identified and granted access automatically, while unauthorised individuals trigger silent alarms. In Bahrain, this technology is increasingly deployed at government buildings, financial institutions, and critical infrastructure sites.

**License Plate Recognition (LPR)**

AI-powered LPR cameras at entry gates automatically log all vehicle movements, cross-reference against watchlists, and flag vehicles of interest. For logistics and industrial facilities, this provides an unbroken chain of custody for every vehicle entering and leaving the premises.

**Object Detection & Left-Item Alerting**

AI models trained on millions of images can identify abandoned bags, packages, or equipment in public areas — triggering immediate investigation protocols. This capability has proven invaluable for hotel lobbies, shopping centres, and event venues across Bahrain.

## The Bahrain Context

The Kingdom of Bahrain's regulatory environment encourages technological innovation in security. The Ministry of Interior has established clear guidelines for AI surveillance deployment, balancing public safety with privacy protections.

For businesses, the business case is compelling: AI-augmented CCTV reduces the number of monitoring staff required, increases detection accuracy, and provides a documented audit trail for compliance and insurance purposes.

## Choosing an AI CCTV Partner

When selecting an AI CCTV provider in Bahrain, consider:

- **Local expertise:** Does the provider understand Bahrain's regulatory landscape?
- **Integration capability:** Can the AI system integrate with your existing security infrastructure?
- **Training & support:** Is comprehensive operator training included?
- **Data sovereignty:** Where is your video data stored and processed?

ALQUDABEA's AI monitoring centre in Manama processes all data within Bahrain, ensuring compliance with local data protection requirements while delivering world-class AI surveillance capabilities.

## The Future

As AI models continue to improve, we anticipate even more sophisticated capabilities — predictive analytics that forecast security risks before they materialise, drone integration for perimeter surveillance, and seamless coordination between AI systems and human response teams.

The future of security is intelligent, proactive, and already being deployed in Bahrain.
    `,
    category: 'technology',
    tags: ['CCTV', 'AI', 'Surveillance', 'Bahrain', 'Technology'],
    author: 'yusuf-ali',
    publishedDate: '2026-07-25',
    readTime: '8 min',
    featured: true,
    image: null,
  },
  {
    id: 'gts-licensing-guide-2026',
    slug: 'complete-guide-gts-security-licensing-bahrain',
    title: 'The Complete Guide to GTS Security Licensing in Bahrain',
    excerpt: 'Everything security professionals and employers need to know about GTS licensing requirements, renewal processes, and compliance in the Kingdom of Bahrain.',
    content: `
## Understanding GTS Licensing

The Security Industry Regulatory Authority (GTS) framework governs all professional security services in Bahrain. Whether you are an individual seeking to work as a security officer or a company providing security services, compliance with GTS regulations is mandatory.

## Individual Licence Requirements

**Basic Security Officer Licence**
- Minimum age: 21 years
- High school diploma or equivalent
- Clear criminal record check
- Medical fitness certificate
- Completion of GTS-approved basic training course (80 hours)

**Specialist Licences**
- CCTV Operator: Additional 40-hour technical training
- VIP Protection Officer: Advanced certification + defensive driving
- Security Supervisor: Minimum 2 years operational experience + leadership assessment

**Licence Renewal**
- Annual renewal required
- Continuing Professional Development (CPD): 20 hours minimum per year
- Renewal fee: BHD 50 (standard), BHD 100 (specialist)

## Employer Responsibilities

Companies employing security personnel must:

1. Verify all licences before deployment
2. Maintain a licence register available for MoI inspection
3. Report licence suspensions or revocations within 48 hours
4. Ensure all personnel complete CPD requirements
5. Sponsor licence applications for new hires

## Common Compliance Pitfalls

**Expired Licences:** Deploying officers with expired licences carries penalties of up to BHD 5,000 per incident. Implement a 90-day advance renewal tracking system.

**Incomplete Training Records:** MoI inspectors require complete training documentation. Digitise all training records and maintain both physical and cloud backups.

**Unlicensed Subcontractors:** If you subcontract security services, verify that all subcontracted personnel hold valid licences. Primary contractors bear joint liability.

## How ALQUDABEA Supports Compliance

As a Ministry-licensed provider, ALQUDABEA handles all licensing and compliance for our clients. Our HR team manages the full lifecycle:
- Initial licence application and sponsorship
- CPD tracking and training coordination
- Automatic renewal reminders
- Regulatory change monitoring
- MoI liaison and inspection support

## Looking Ahead

The MoI has signalled potential updates to the GTS framework in 2027, including enhanced digital verification and possible reciprocity arrangements with GCC partner states. Stay informed through our blog and regulatory updates.
    `,
    category: 'bahrain-regulations',
    tags: ['GTS', 'Ministry of Interior', 'Compliance', 'Training', 'Bahrain'],
    author: 'fatima-hassan',
    publishedDate: '2026-07-22',
    readTime: '6 min',
    featured: true,
    image: null,
  },
  {
    id: 'event-security-best-practices-2026',
    slug: 'event-security-best-practices-bahrain',
    title: 'Event Security Best Practices for Bahrain&rsquo;s Hospitality Sector',
    excerpt: 'From Formula 1 to private celebrations — essential event security planning, crowd management, and emergency protocols for Bahrain&rsquo;s world-class events.',
    content: `
## Bahrain's Unique Event Landscape

From the Bahrain Grand Prix attracting 35,000 spectators to intimate diplomatic gatherings, the Kingdom hosts events of every scale. Each requires meticulous security planning tailored to venue, audience, and threat profile.

## The Four-Phase Event Security Model

### Phase 1: Pre-Event Planning (2-8 weeks before)

Comprehensive planning is the foundation of successful event security:

- **Threat & Risk Assessment:** Evaluate specific risks based on event type, VIP attendance, venue location, and current threat climate.
- **Venue Survey:** Physical inspection of all access points, evacuation routes, staging areas, and perimeter vulnerabilities.
- **Stakeholder Coordination:** Align with venue management, local police, civil defence, and medical services.
- **Staffing Plan:** Determine the number and type of security personnel required — static guards, mobile patrols, CCTV operators, and supervisors.

### Phase 2: Security Design (1-4 weeks before)

- **Access Control Architecture:** Design credential zones (public, VIP, backstage, media) with appropriate screening levels at each boundary.
- **CCTV Placement:** Strategic camera coverage focusing on entry points, crowd concentration areas, and back-of-house access routes.
- **Evacuation Plan:** Multiple egress routes with clearly designated marshalling points. Coordinate with civil defence on emergency vehicle access.
- **Communication Protocols:** Radio channel assignments, escalation procedures, and liaison contacts shared with all stakeholders.

### Phase 3: Day-of Execution

- **Pre-Event Sweep:** Thorough security sweep of the venue before doors open — check for unattended items, verify equipment placement, confirm all systems operational.
- **Briefing:** All security personnel receive a final briefing covering event specifics, assigned positions, communication protocols, and emergency procedures.
- **Layered Screening:** Bag checks at perimeter, ticket/credential verification at entry, metal detection where appropriate. VIP lanes with enhanced screening for high-profile attendees.
- **Continuous Monitoring:** CCTV operators maintain active surveillance while supervisors conduct roaming inspections.

### Phase 4: Post-Event

- **Controlled Dispersal:** Manage exit flow to prevent bottlenecks. Position security at transport pickup points.
- **Venue Handover:** Formal sign-off with venue management confirming no damage or security concerns.
- **Incident Report:** Comprehensive documentation of any incidents, interventions, or observations for the client and regulatory records.
- **Debrief & Improvement:** Team debrief within 48 hours capturing lessons learned for continuous improvement.

## Technology Integration

Modern event security leverages technology for enhanced protection:

- **AI Crowd Analytics:** Real-time density monitoring to prevent overcrowding
- **Digital Credential Verification:** QR-coded badges with instant validation
- **Drone Surveillance:** Aerial monitoring for large outdoor events (subject to CAA approval)
- **Emergency Mass Notification:** SMS/App-based alerts to all personnel simultaneously

## Why Choose ALQUDABEA for Events

With extensive experience securing Bahrain's most prestigious events, ALQUDABEA brings:
- Pre-established relationships with Bahrain's regulatory and emergency services
- A trained pool of event security specialists available at scale
- 24/7 command centre coordination during every event
- Comprehensive insurance coverage meeting all venue requirements
    `,
    category: 'security-tips',
    tags: ['Event Security', 'Bahrain', 'Crowd Management', 'Risk Assessment', 'Hospitality'],
    author: 'ahmed-al-mahmood',
    publishedDate: '2026-07-18',
    readTime: '7 min',
    featured: false,
    image: null,
  },
  {
    id: 'access-control-trends-2026',
    slug: 'access-control-trends-2026-biometrics-mobile',
    title: 'The Future of Access Control: Biometrics, Mobile, and Cloud',
    excerpt: 'Access control has evolved far beyond key cards. Explore the latest trends — biometric authentication, mobile credentials, and cloud-managed systems — and what they mean for Bahraini businesses.',
    content: `
## Beyond the Key Card

For decades, access control meant plastic cards and PIN pads. While still widely deployed, these technologies are increasingly being supplemented — or replaced — by more secure, more convenient alternatives.

## Biometric Authentication

Fingerprint, facial recognition, and iris scanning technologies have matured significantly. Modern biometric readers offer:

- **Spoof Detection:** Advanced sensors differentiate between live tissue and replicas
- **Touchless Operation:** Post-pandemic preference for contact-free access
- **Multi-Factor Capability:** Combine biometrics with PIN or mobile credential for high-security areas
- **Speed:** Sub-second authentication for high-traffic entry points

In Bahrain, biometric access control is seeing rapid adoption in banking, government, and critical infrastructure sectors.

## Mobile Credentials

Smartphones are replacing plastic access cards. Employees receive encrypted digital credentials delivered to their phones via secure apps. Benefits include:

- **No Physical Cards to Lose:** Credentials are tied to the device, protected by biometric phone unlock
- **Remote Provisioning:** Grant or revoke access instantly from anywhere
- **Audit Trail:** Every access event is logged with user, location, and timestamp
- **Visitor Management:** Send temporary mobile credentials to guests before they arrive

## Cloud-Managed Access Control

Moving access control management to the cloud transforms how organisations operate:

- **Centralised Management:** Control access across multiple sites from a single dashboard
- **Real-Time Updates:** Permission changes take effect immediately across all doors
- **Integration Ready:** APIs connect access control with HR systems, visitor management, and CCTV
- **Scalability:** Add doors, sites, and users without deploying additional servers

## Choosing the Right System

When evaluating access control for your Bahrain facility, consider:

1. **Security Level:** What are you protecting? Choose technology proportionate to risk.
2. **User Experience:** Complex systems reduce compliance. Prioritise ease of use.
3. **Integration:** Can the system work with your existing security infrastructure?
4. **Compliance:** Does the system meet Bahrain's data protection requirements?
5. **Support:** Is local installation, training, and ongoing support available?

ALQUDABEA provides end-to-end access control — from system design and installation to ongoing management and 24/7 monitoring.
    `,
    category: 'technology',
    tags: ['Access Control', 'Biometrics', 'Technology', 'Cloud', 'Security'],
    author: 'yusuf-ali',
    publishedDate: '2026-07-15',
    readTime: '5 min',
    featured: false,
    image: null,
  },
  {
    id: 'bahrain-security-regulations-2026',
    slug: 'bahrain-security-regulations-overview-2026',
    title: 'Bahrain Security Industry Regulations: What Every Business Should Know',
    excerpt: 'An overview of the regulatory framework governing security services in Bahrain — Ministry of Interior requirements, compliance obligations, and upcoming changes.',
    content: `
## The Regulatory Framework

The security industry in Bahrain operates under the supervision of the Ministry of Interior (MoI). All security service providers must be licensed, and all security personnel must hold valid individual licences. This framework ensures professional standards, accountability, and public safety.

## Key Regulatory Bodies

**Ministry of Interior (MoI)**
Primary regulator for all security services. Issues company operating licences, individual GTS licences, and conducts compliance inspections.

**Labour Market Regulatory Authority (LMRA)**
Regulates employment of expatriate security personnel. Work permits and visa compliance fall under LMRA jurisdiction.

**National Cyber Security Centre (NCSC)**
Oversees cybersecurity aspects of electronic security systems, including CCTV networks and access control databases.

## Company Licensing Requirements

To operate as a security services provider in Bahrain, companies must:

- Hold a valid Commercial Registration (CR) with security services activity
- Obtain MoI operating licence (renewed annually)
- Maintain minimum insurance coverage
- Employ a qualified Security Manager (MoI-approved)
- Submit quarterly operational reports to MoI
- Allow unannounced MoI inspections

## Individual Licensing

Every security officer deployed in Bahrain must hold a valid GTS licence. The licensing process includes:

- Criminal background check
- Medical fitness assessment
- Completion of approved training programme
- Written and practical examination
- Annual renewal with CPD requirements

## Upcoming Regulatory Changes

The MoI has indicated several areas of regulatory development:

**Digital Verification (Expected 2027):** A centralised digital database allowing real-time licence verification by employers and clients.

**Enhanced Training Standards:** Proposed increase in minimum training hours from 80 to 120 for basic security officer licensing.

**Environmental Security:** Emerging requirements for security providers to incorporate environmental risk considerations into facility security plans.

## Compliance Best Practices

- Maintain a compliance calendar with all renewal dates
- Digitise all licensing records with secure cloud backup
- Conduct quarterly internal compliance audits
- Designate a compliance officer responsible for regulatory tracking
- Engage legal counsel specialising in Bahrain security law

ALQUDABEA maintains full compliance with all current and anticipated regulations. Our clients benefit from our proactive regulatory monitoring and established relationships with Bahrain's security authorities.
    `,
    category: 'bahrain-regulations',
    tags: ['Bahrain', 'Regulations', 'Ministry of Interior', 'Compliance', 'GTS'],
    author: 'ahmed-al-mahmood',
    publishedDate: '2026-07-12',
    readTime: '6 min',
    featured: false,
    image: null,
  },
  {
    id: 'retail-loss-prevention-2026',
    slug: 'retail-security-loss-prevention-strategies',
    title: 'Retail Security: Modern Loss Prevention Strategies for Bahrain&rsquo;s Shopping Sector',
    excerpt: 'Organised retail crime costs Bahraini businesses millions annually. Discover integrated loss prevention strategies combining technology, training, and operational procedures.',
    content: `
## The Cost of Retail Crime

Retail crime — from opportunistic shoplifting to organised theft rings — represents a significant cost to Bahrain's retail sector. Beyond direct merchandise losses, retailers face increased insurance premiums, staff safety concerns, and reputational impact.

## The Layered Approach

Effective retail security requires multiple complementary layers:

### Layer 1: Visible Deterrence
Uniformed security officers at entrances and throughout the sales floor serve as the primary deterrent. Their presence alone reduces opportunistic theft by an estimated 40-60%.

### Layer 2: Electronic Article Surveillance (EAS)
RFID and EAS tags on high-value merchandise trigger alarms at exit points. Modern systems integrate with CCTV to capture footage of every alarm activation.

### Layer 3: CCTV with AI Analytics
Strategic camera placement covering entry/exit points, high-value displays, fitting rooms, and stock rooms. AI algorithms detect suspicious behaviour patterns — loitering, concealment gestures, tag removal attempts.

### Layer 4: Access Control for Stock Areas
Biometric or PIN-restricted access to stock rooms, cash offices, and delivery bays. Every access event is logged with user identity and timestamp.

### Layer 5: Staff Training & Awareness
Employees trained to recognise suspicious behaviour, follow confrontation protocols, and understand the legal framework for detaining suspected shoplifters in Bahrain.

## Organised Retail Crime (ORC)

ORC groups operate differently from individual shoplifters:

- They work in teams — one distracts while others steal
- They target specific high-value, easily resold items
- They may use booster bags (foil-lined bags that defeat EAS)
- They often return stolen goods for refunds (return fraud)

Counter-ORC strategies include:
- CCTV facial recognition and cross-store intelligence sharing
- EAS tower placement at all exits including staff entrances
- Receipt verification at returns desk
- Coordination with other retailers and Bahrain authorities

## Staff Dishonesty

Internal theft accounts for a significant portion of retail losses. Mitigation strategies:

- Thorough background checks during recruitment
- Cash handling procedures with dual verification
- Random till audits and stock checks
- CCTV coverage of cash offices and stock rooms
- Clear consequences communicated in employment contracts

## ALQUDABEA Retail Solutions

Our retail security programmes are tailored to each store's layout, product mix, and risk profile. We provide uniformed guards, plain-clothes store detectives, AI-monitored CCTV, and comprehensive staff training — all managed through our 24/7 command centre.
    `,
    category: 'security-tips',
    tags: ['Retail', 'Loss Prevention', 'CCTV', 'Security', 'Bahrain'],
    author: 'noor-ibrahim',
    publishedDate: '2026-07-08',
    readTime: '7 min',
    featured: false,
    image: null,
  },
  {
    id: 'security-career-path-bahrain',
    slug: 'building-security-career-bahrain-2026',
    title: 'Building a Career in Security: Pathways and Opportunities in Bahrain',
    excerpt: 'The security industry in Bahrain offers diverse, rewarding career paths. From entry-level officer to senior management — explore the opportunities, qualifications, and earning potential.',
    content: `
## A Growing Industry

Bahrain's security industry has experienced consistent growth, driven by expanding commercial real estate, major events, and increasing awareness of security as a critical business function. For job seekers, this translates to diverse opportunities with clear progression pathways.

## Entry Points

### Security Officer (Entry Level)
The most common entry point into the industry. Requirements:
- Bahraini national or valid work permit
- High school diploma
- Completion of GTS basic training (sponsored by employer)
- Good physical fitness and clear criminal record

Starting salary range: BHD 250–350/month plus benefits.

### CCTV Operator
For those with technical aptitude. Requirements:
- Computer literacy
- Attention to detail and concentration
- Employer-provided CCTV operator training

Starting salary range: BHD 280–380/month plus benefits.

## Career Progression

### From Officer to Supervisor (2-4 years)
With experience and demonstrated reliability, officers can advance to supervisory roles managing teams of 8–15 personnel. Additional leadership training provided.

Salary range: BHD 400–600/month.

### Specialist Roles (3-5 years)
Experienced officers can specialise in:
- **VIP Protection:** Premium compensation for close protection of executives and dignitaries
- **Event Security:** Coordination of security for major events
- **Training & Development:** Become a GTS-certified trainer

Salary range: BHD 500–800+/month depending on specialisation.

### Management Track (5+ years)
Senior positions include:
- Security Manager — oversee all operations at a client site
- Operations Manager — manage multiple sites and teams
- Account Manager — client relationship and contract management

Salary range: BHD 800–1,500+/month plus performance bonuses.

## Qualifications That Accelerate Your Career

- **GTS Advanced Certification:** Essential for supervisory roles
- **First Aid / AED Certification:** Valued across all roles
- **Fire Safety & Warden Training:** Required for management positions
- **Health & Safety Qualifications (NEBOSH/IOSH):** Valuable for industrial security roles
- **Degree in Security Management or related field:** Preferred for senior management

## Why Choose ALQUDABEA

- **Training Investment:** We sponsor all GTS training and CPD requirements
- **Clear Pathways:** Published career progression framework
- **Promote from Within:** Over 80% of supervisory roles filled by internal promotion
- **Bahraini First:** We actively develop Bahraini talent for leadership roles
- **Stability:** Established company with 15+ years of operations in Bahrain
    `,
    category: 'career-advice',
    tags: ['Career', 'Training', 'GTS', 'Bahrain', 'Jobs'],
    author: 'fatima-hassan',
    publishedDate: '2026-07-05',
    readTime: '6 min',
    featured: false,
    image: null,
  },
  {
    id: 'construction-site-security-bahrain',
    slug: 'securing-construction-sites-bahrain-guide',
    title: 'Securing Construction Sites: Protecting Bahrain&rsquo;s Growing Skyline',
    excerpt: 'Construction sites face unique security challenges — from equipment theft to unauthorised access. Learn how professional security protects Bahrain&rsquo;s construction projects.',
    content: `
## A Vulnerable Environment

Construction sites are inherently difficult to secure — open perimeters, high-value equipment and materials, transient workforce, and rapidly changing site conditions. In Bahrain's active construction sector, these challenges are magnified by the scale and value of projects.

## The Risks

**Equipment & Material Theft**
Heavy machinery, copper wiring, tools, and building materials are attractive targets. A single incident can cost tens of thousands of dinars in direct losses plus project delays.

**Unauthorised Access**
Trespassers, vandals, and curious members of the public pose safety and liability risks. Unauthorised access to active construction zones can result in serious injury — and legal exposure for the site owner.

**Internal Theft**
Without proper controls, materials and tools can disappear through contractor or worker channels. Systematic theft can continue for months before detection.

**Fuel Theft**
Construction sites store large quantities of diesel and petrol. Fuel theft — often an inside job — is one of the most common and costly security issues on construction sites.

## The ALQUDABEA Construction Security Model

### Phase 1: Site Assessment
Before breaking ground, we conduct a comprehensive security assessment:
- Perimeter vulnerability analysis
- Access point mapping
- Material and equipment storage planning
- Lighting and CCTV placement recommendations

### Phase 2: 24/7 Manned Security
- Static guards at all active entry/exit points
- Mobile patrol rounds with GPS-verified checkpoint logging
- Gatehouse operations — vehicle and personnel verification

### Phase 3: Technology Deployment
- CCTV towers with solar power for remote areas
- Thermal imaging cameras for night surveillance
- AI-based intrusion detection with automated alerts
- Vehicle number plate recognition at site gates

### Phase 4: Access Control
- Worker biometric registration and credentialling
- Contractor and supplier vehicle logging
- Delivery verification and escort procedures
- After-hours access restrictions

### Phase 5: Reporting & Accountability
- Daily security reports with incident logs
- Weekly site security reviews with project management
- Monthly trend analysis and recommendations

## The Business Case

Professional construction site security delivers measurable ROI:
- Reduced equipment and material losses (typically 70-90% reduction)
- Lower insurance premiums
- Fewer project delays from theft or vandalism
- Improved worker safety and morale
- Regulatory compliance and reduced liability exposure
    `,
    category: 'industry-insights',
    tags: ['Construction', 'Security', 'Bahrain', 'Industrial', 'Risk Assessment'],
    author: 'noor-ibrahim',
    publishedDate: '2026-07-01',
    readTime: '6 min',
    featured: false,
    image: null,
  },
];

// ── Helper: Get article by slug ──────────────────────────

export function getArticleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug) || null;
}

// ── Helper: Get related articles ─────────────────────────

export function getRelatedArticles(article, count = 3) {
  return ARTICLES
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, count);
}

// ── Helper: Get articles by category ─────────────────────

export function getArticlesByCategory(categorySlug) {
  return ARTICLES.filter((a) => a.category === categorySlug);
}
