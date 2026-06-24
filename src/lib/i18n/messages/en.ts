import type { Messages } from "./types";

export const en: Messages = {
  nav: {
    work: "Work",
    about: "About",
    capabilities: "Capabilities",
    contact: "Contact",
    bookMeeting: "Book a meeting",
    bookMeetingMobile: "Book a meeting today",
    clientsIn: "Clients in",
    switchTo: "Switch language",
  },
  hero: {
    label: "Applied AI Engineer · Oslo",
    line1: "Real estate AI",
    line2Before: "that ",
    line2Highlight: "ships",
    line2After: " in production.",
    sub: "Luxury Marbella listings, vacation-rental owner portals, and multi-county permit intelligence — built end to end with LLMs, agents, and production data pipelines.",
    viewProjects: "View projects",
    phoneMeeting: "Meeting",
    phoneVideoOn: "Video is on",
    phoneMicOff: "Mic is off",
    phoneSpeaker: "Speaker",
    phoneBookNow: "Book now",
    phoneCall: "Call",
    phoneLinkedIn: "Message me on LinkedIn",
    phoneAria: "Book a meeting with Anders",
  },
  about: {
    label: "About",
    p1Before: "I'm an ",
    p1Role: "Applied AI Engineer in Oslo",
    p1After:
      " focused on production real estate systems — luxury listings, vacation-rental ops, and permit intelligence. I build LLM workflows, data pipelines, and staff-facing portals that survive brittle extraction, multilingual copy at scale, and long-running sync jobs.",
    p2Before:
      "For eight months I worked directly with one of Gothenburg's top agents on ",
    p2And: "and",
    p2After:
      ". I apply the same production discipline from prior safety-critical engineering work — measurable outcomes, graceful degradation, observability.",
    currently: "Currently",
    currentlyBefore: "Building a ",
    currentlyHighlight: "proptech lead generator",
    currentlyAfter:
      " for Florida building permits — scrape, enrich, and score construction leads across 67 counties.",
    currentlyFooter: "Oslo · Independent · zavian.ai",
  },
  chart: {
    label: "Speciality focus",
    milestone1: "full time",
    milestone2: "proptech",
    milestoneDate: "Jan 2026",
    redLegend: "System architecture at tier 1 company",
    redLegendNote: "· ends Jan 2026",
    blueLegend: "Proptech AI",
    blueLegendNote: "· from Oct 2024",
    aria:
      "Career trajectory: system architecture until January 2026, then full-time proptech AI with accelerated growth",
  },
  work: {
    label: "Work",
    titleBefore: "Proptech systems, ",
    titleHighlight: "in production.",
    sub: "Eight months hands-on with a top Gothenburg agent — luxury listings, vacation rentals, and permit intelligence.",
    scope: "Scope",
    builtWith: "Built with",
    pipelineGlance: "Pipeline at a glance",
    countyCoverage: "County coverage",
    countyState: "Florida",
    countyNote:
      "Permit records sourced across Accela, EnerGov, CitizenServe & custom portals.",
    periodPresent: "Present",
    periods: {
      florida: "2026 – Present",
      kian: "2025 – Present",
      kestays: "2025 – Present",
    },
    projects: {
      florida: {
        category: "Construction leads",
        tagline: "67-county permit intelligence",
        description:
          "Solo-built scrape → enrich → score pipeline across Florida county permit portals. Zyte deep-fetch for anti-bot walls, GIS + Sunbiz enrichment, score-gated lead tiers, and a Railway ops portal for staff review.",
        highlights: [
          "50+ county adapters — Accela, EnerGov, CitizenServe, custom portals",
          "Enrichment cascade: permit → parcel GIS → corporate entity → contact score",
          "Daily cron scraper + ops UI for review, contact, and CSV export",
        ],
        stats: {
          counties: "Florida counties",
          sources: "Sources live",
          cron: "Scraper cron",
          scoring: "Lead scoring",
        },
      },
      kian: {
        category: "Luxury real estate",
        tagline: "Staff portal for luxury Marbella listings",
        description:
          "Bespoke staff portal for a top Gothenburg agent's luxury Marbella brand — MLS import, multilingual AI translation, image SEO audits, and ChatGPT-assisted bulk copy for high-value listings.",
        highlights: [
          "MLS → CMS pipeline with publish-to-site workflow for luxury properties",
          "DeepSeek translation queue with review gates across EN/ES/DE/FR/NL/SV",
          "Image library AI audit for alt text, duplicates, and SEO gaps before go-live",
        ],
        imageAlt: "Kian Estate staff portal dashboard",
      },
      kestays: {
        category: "Vacation rentals",
        tagline: "Owner portal + admin platform",
        description:
          "Dual-portal vacation rental ops — PropertyFlow for owner self-service (bookings, revenue, status) and KE Stays Admin with Lodgify deep sync, onboarding, and property health monitoring.",
        highlights: [
          "Owners self-serve routine queries without support tickets",
          "Bidirectional Lodgify sync with conflict detection on calendars",
          "Onboarding workflow cut time-to-live for new owner properties",
        ],
        imageAlt: "KE Stays admin properties with Lodgify sync",
      },
    },
  },
  skills: {
    label: "Capabilities",
    titleBefore: "What I bring to a ",
    titleHighlight: "generative AI engineer",
    titleAfter: " role.",
    carouselAria: "Capabilities carousel",
    capabilities: [
      {
        title: "LLMs & NLP",
        description:
          "Production prompts, structured outputs, and tool calling across Claude, OpenAI, and DeepSeek for real estate workflows.",
      },
      {
        title: "RAG & Retrieval",
        description:
          "Enrichment cascades, entity resolution, and GIS/corporate data pipelines with dedupe at the database layer.",
      },
      {
        title: "Agents & Orchestration",
        description:
          "LangGraph state machines, MCP tool boundaries, and human-in-the-loop approvals in Slack with checkpointed workflows.",
      },
      {
        title: "AI Quality & Evaluation",
        description:
          "Retry policies, lead scoring, regression fixtures, and before/after metrics so pipelines degrade gracefully.",
      },
      {
        title: "AI Platforms",
        description:
          "Anthropic API, Railway + Postgres, and cloud AI patterns on Azure and Vertex for production deployments.",
      },
      {
        title: "Engineering",
        description:
          "Python, FastAPI, Next.js, Scrapy, PostgreSQL, Alembic — async jobs and ops UIs that staff actually use.",
      },
      {
        title: "Proptech domain",
        description:
          "MLS integration, luxury listings CMS, vacation-rental sync, permit intelligence, and multilingual SEO at scale.",
      },
      {
        title: "Production discipline",
        description:
          "Safety-critical mindset: measurable outcomes, FMEA-style failure thinking, and production observability.",
      },
    ],
  },
  testimonials: {
    label: "Testimonials",
    titleBefore: "What partners say — ",
    titleHighlight: "on the record.",
    refsNote: "References available upon request. Hover a card to reveal the full testimonial.",
    ctaTitle: "Want a deeper reference?",
    ctaBody:
      "Full references from Backman Fast, repforce.ai, and prior Volvo Buses engagements available on request.",
    ctaButton: "Request references",
    items: [
      {
        coverLabel: "Reference available upon request",
        coverHint: "Hover to reveal",
        coverOrg: "Backman Fast · Gothenburg",
        quote:
          "Anders shipped a staff portal and AI translation engine that changed how our team works across Marbella, Gothenburg, and six language markets. Listings that used to take a full day of manual copy now publish themselves — with quality gates our agents actually trust. He works like an engineer who understands brokerage, not a contractor who needs briefing.",
        author: "Elton",
        role: "Senior Real Estate Agent",
        org: "Backman Fast",
      },
      {
        coverLabel: "Reference available upon request",
        coverHint: "Hover to reveal",
        coverOrg: "repforce.ai · AI Factory",
        quote:
          "Anders built our Jira AI Factory on LangGraph and MCP with PostgreSQL checkpointing — agents that pause for human approval in Slack and resume without holding compute. The architecture is the cleanest agent orchestration I've seen shipped to production. He treats failure modes as first-class citizens, not edge cases. Any proptech AI team hiring him is getting a senior engineer on day one.",
        author: "repforce.ai",
        role: "Leadership",
        org: "repforce.ai",
      },
    ],
  },
  contact: {
    label: "Contact",
    line1: "Let's build",
    line2Before: "",
    line2Highlight: "proptech AI",
    line2After: " that ships.",
    bodyBefore: "I'm based in ",
    bodyCity: "Oslo",
    bodyMid: " and available for ",
    bodyRole: "Applied AI Engineer",
    bodyAfter: " engagements with proptech teams. Reach out — email, Calendly, or LinkedIn.",
    meetTitle: "Google Meet / Teams · Anders Ljungstedt",
    meetDuration: "30 minutes · Oslo time",
    bookNow: "Book now",
    footerNote: "zavian.ai",
  },
  footer: {
    copyright: "© 2026 Anders Ljungstedt · zavian.ai",
  },
};
