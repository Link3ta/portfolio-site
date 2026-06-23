import type { CaseStudyData } from "@/components/sections/case-study";

export const CASE_STUDIES: CaseStudyData[] = [
  {
    index: "01",
    name: "Kian Estate",
    url: "https://www.kianestate.com/",
    urlLabel: "kianestate.com",
    domain: "Luxury Marbella real estate",
    role: "Fullstack AI engineer — bespoke staff portal",
    duration: "Part of 8-month proptech engagement",
    oneLiner:
      "Bespoke staff portal powering luxury Marbella listings — MLS import, AI translation, image automation, and ChatGPT-assisted bulk operations.",
    challenge:
      "Kian Estate needed more than a brochure site. Their team manages high-value properties across languages and channels — importing from MLS feeds, maintaining SEO-rich listings, auditing image libraries, and producing translations at scale without hiring a full localization team.",
    solution: [
      "I built a custom Staff Portal integrated with their public site:",
      "MLS import pipeline — ingest property data from MLS feeds, normalize fields, and sync to the property CMS",
      "AI translation engine — DeepSeek API-powered translation workflow with review states, batch processing, and quality gates",
      "Image library automation — centralized asset management with AI audit flags for missing alt text, duplicates, and SEO gaps",
      "ChatGPT integration — \"Ask ChatGPT\" dropdown for bulk copy operations: descriptions, meta tags, and multilingual variants",
      "Property CMS — staff-facing CRUD for listings, status workflows, and publish-to-site pipeline",
      "SEO tooling — structured metadata, slug management, and sitemap-aware publishing",
    ],
    outcomes: [
      "Staff can import, translate, and publish luxury listings without developer intervention",
      "AI translation reduced manual copy work across EN/ES/DE/FR/NL/SV markets",
      "Image library audit surfaced SEO and accessibility gaps before go-live",
      "ChatGPT bulk ops accelerated seasonal campaign updates",
    ],
    screenshots: [
      {
        src: "/assets/kianestate-images.png",
        caption:
          "Images library — AI audit panel flagging SEO and duplicate issues",
        alt: "Kian Estate staff portal image library with AI audit panel",
      },
    ],
    techTags: [
      "Next.js",
      "DeepSeek API",
      "OpenAI ChatGPT",
      "MLS integration",
      "PostgreSQL",
      "Custom CMS",
      "SEO pipeline",
    ],
    mermaid: `flowchart LR
    subgraph Staff Portal
        A[Property CMS] --> B[Translation Queue]
        B --> C{Batch or Single?}
    end

    subgraph AI Layer
        C -->|Single field| D[DeepSeek API]
        C -->|Bulk ops| E[ChatGPT Assistant]
        D --> F[Translation Memory Cache]
        E --> F
    end

    subgraph Quality Gates
        F --> G{Review Required?}
        G -->|Yes| H[Staff Review UI]
        G -->|No| I[Auto-approve threshold]
        H --> J[Approved Copy]
        I --> J
    end

    subgraph Publish
        J --> K[Locale-specific CMS Records]
        K --> L[SEO Metadata Generator]
        L --> M[kianestate.com Public Site]
    end

    subgraph Assets
        A --> N[Image Library]
        N --> O[AI Audit — alt text, duplicates]
        O --> M
    end`,
    mermaidLabel: "Translation & publishing pipeline",
    narrative:
      "Staff edits source copy in the CMS. Translations enter a queue — single fields route to DeepSeek for cost-efficient multilingual output; bulk marketing copy routes through ChatGPT for tone-aware rewrites. A translation memory cache prevents redundant API calls. High-confidence translations auto-approve; others land in a staff review UI. Approved copy flows into locale-specific CMS records, SEO metadata is generated per locale, and the public kianestate.com site renders published listings. The image library runs a parallel AI audit for accessibility and SEO before assets go live.",
  },
  {
    index: "02",
    name: "KE Stays",
    url: "https://www.kestays.com/",
    urlLabel: "kestays.com",
    domain: "Vacation rental management",
    role: "Fullstack engineer — owner portal + admin platform",
    duration: "Part of 8-month proptech engagement",
    oneLiner:
      "Dual-portal vacation rental platform — PropertyFlow owner self-service and KE Stays Admin with deep Lodgify sync, onboarding, and property health monitoring.",
    challenge:
      "KE Stays manages vacation rentals for property owners who need transparency without calling the office. The team needed owner self-service (bookings, statements, property status) and an internal admin layer with reliable Lodgify synchronization, onboarding workflows, and health dashboards.",
    solution: [
      "Platform built across two coordinated surfaces:",
      "PropertyFlow Owner Portal — branded login portal where owners view bookings, revenue, and property status",
      "KE Stays Admin — internal dashboard for staff to manage owners, properties, and sync state",
      "Lodgify deep sync — bidirectional property, calendar, and booking sync with conflict detection",
      "Owner onboarding — guided setup flow: property details, payout info, portal credentials",
      "Property health monitoring — sync status, missing data flags, and stale listing alerts",
    ],
    outcomes: [
      "Owners self-serve via PropertyFlow without support tickets for routine queries",
      "Admin team sees sync health across all properties in one dashboard",
      "Lodgify deep sync reduced manual data entry and calendar drift",
      "Onboarding flow cut time-to-live for new owner properties",
    ],
    screenshots: [
      {
        src: "/assets/kestays-owner-portal-login.png",
        caption: "PropertyFlow — owner login portal with KE Stays branding",
        alt: "KE Stays PropertyFlow owner login portal",
      },
      {
        src: "/assets/kestays-admin-owners.png",
        caption: "KE Stays Admin — owners dashboard with onboarding status",
        alt: "KE Stays admin owners dashboard",
      },
      {
        src: "/assets/kestays-admin-properties.png",
        caption: "KE Stays Admin — properties view with Lodgify sync health",
        alt: "KE Stays admin properties view with sync health",
      },
    ],
    techTags: [
      "Next.js",
      "Lodgify API",
      "PostgreSQL",
      "Owner auth",
      "Sync jobs",
      "Admin dashboard",
    ],
    mermaid: `flowchart TB
    subgraph External
        L[Lodgify API]
    end

    subgraph Sync Engine
        L <-->|Webhooks + Polling| S[Sync Orchestrator]
        S --> C[Conflict Resolver]
        C --> D[(PostgreSQL — Source of Truth)]
    end

    subgraph KE Stays Admin
        D --> E[Owners Dashboard]
        D --> F[Properties Dashboard]
        F --> G[Property Health Monitor]
        G -->|Stale / missing| H[Alert Queue]
        E --> I[Onboarding Workflow]
        I --> S
    end

    subgraph PropertyFlow Owner Portal
        D --> J[Owner Auth]
        J --> K[Bookings View]
        J --> M[Revenue / Statements]
        J --> N[Property Status]
    end

    subgraph Public
        D --> O[kestays.com Listings]
    end`,
    mermaidLabel: "Lodgify sync + dual-portal architecture",
    narrative:
      "Lodgify is the channel manager of record. A sync orchestrator pulls webhooks and runs scheduled polls to keep PostgreSQL as the source of truth. A conflict resolver handles calendar overlaps and field mismatches. KE Stays Admin surfaces owner onboarding, property health, and sync alerts. PropertyFlow gives owners a filtered, branded view of their own data — bookings, revenue, and status — without exposing internal admin tools. Published listing data flows to kestays.com.",
  },
  {
    index: "03",
    name: "Florida Lead Portal",
    url: "zavian.ai",
    urlLabel: "portfolio reference",
    domain: "Construction permit intelligence",
    role: "Solo architect & engineer — scrape → enrich → score → portal",
    duration: "Active independent project",
    oneLiner:
      "Multi-county permit intelligence platform — scraping 67 Florida counties via Zyte API, enriching with GIS and corporate data, scoring leads, and serving them through a Railway-hosted ops portal.",
    challenge:
      "Florida construction leads are buried in fragmented county permit portals — Accela, EnerGov, CitizenServe, CityView, and dozens of custom systems. Each has different HTML, anti-bot measures, and data quality. Turning raw permits into contactable, scored leads requires a production pipeline, not a one-off scraper.",
    solution: [
      "Solo-built end-to-end platform with these layers:",
      "67-county coverage map — wired adapters for Accela clones, EnerGov, CitizenServe, and custom portals with priority-tier rollout",
      "Zyte API integration — headless browser fetch for Cloudflare/Turnstile-protected Accela portals when direct scrape fails",
      "Scrape → parse → dedupe — normalized records in PostgreSQL with partial unique indexes and change-event tracking",
      "Enrichment cascade — permit record → Property Appraiser GIS (ArcGIS) → Sunbiz corporate resolution → contact scoring",
      "Lead scoring — tiered classification (high / medium / low) with score-gated enrichment to control API costs",
      "Railway cron — daily scraper worker + separate web portal service on shared Postgres",
      "Ops UI — review leads, mark contacted/ignored/saved, manage users, export CSV products",
    ],
    outcomes: [
      "50+ Florida county permit sources in production pipeline",
      "RAG-style enrichment cascade turned uncontactable records into actionable leads",
      "Zyte deep-fetch recovered high-value failures behind Cloudflare walls",
      "Score-gated enrichment and duplicate prevention via DB-layer partial unique indexes",
      "Observable retry loops and ghost-lead recovery jobs for production reliability",
    ],
    screenshots: [],
    stats: [
      { value: "67", label: "Florida counties targeted" },
      { value: "50+", label: "Sources in production" },
      { value: "Daily", label: "Cron-driven scraper" },
      { value: "3-tier", label: "Lead scoring (H/M/L)" },
    ],
    techTags: [
      "Python",
      "FastAPI",
      "Scrapy",
      "Zyte API",
      "PostgreSQL",
      "Alembic",
      "Railway",
      "ArcGIS",
      "Sunbiz",
      "Lead scoring",
    ],
    mermaid: `flowchart TB
    subgraph Sources["67 Florida Counties"]
        A1[Accela Clones]
        A2[EnerGov / Tyler]
        A3[CitizenServe]
        A4[CityView / Custom]
    end

    subgraph Scrape Layer
        A1 & A2 & A3 & A4 --> B{Direct Scrape}
        B -->|Success| C[HTML Parser + Normalizer]
        B -->|Blocked / CF| D[Zyte API Deep Fetch]
        D --> C
        C --> E[(PostgreSQL)]
        E --> F[Dedupe + Change Events]
    end

    subgraph Enrichment Cascade
        F --> G{Score Gate}
        G -->|High tier| H[Property Appraiser GIS]
        H --> I[ArcGIS Parcel Lookup]
        I --> J[Sunbiz Corporate Resolution]
        J --> K[Contact Scoring]
        G -->|Low tier| L[Queue for Later]
    end

    subgraph Delivery
        K --> M[Lead Tiers — High / Med / Low]
        M --> N[CSV Export Products]
        M --> O[Web Ops Portal]
        N --> P[Buyer-facing leads]
        O --> Q[Staff — review / contact / ignore]
    end

    subgraph Infra
        R[Railway Cron — Daily Scraper]
        S[Railway Web Service — Portal]
        R --> B
        S --> O
        E --- S
    end`,
    mermaidLabel: "Scrape → enrich → score pipeline",
    narrative:
      "County adapters target Accela, EnerGov, CitizenServe, and custom portals across Florida's 67 counties. Direct Scrapy/Playwright scrape is attempted first; Cloudflare-blocked Accela portals fall back to Zyte API browser fetch. Parsed records normalize into PostgreSQL with deduplication and change-event tracking. Enrichment is score-gated: high-tier leads get Property Appraiser GIS lookup via ArcGIS, Sunbiz corporate resolution, and contact scoring. Outputs feed CSV export products and a Railway-hosted ops portal where staff review, contact, or ignore leads. A daily cron worker keeps the pipeline fresh.",
  },
];
