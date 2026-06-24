import type { Messages } from "../types";

export const sv: Messages = {
  nav: {
    work: "Arbete",
    about: "Om mig",
    capabilities: "Kompetens",
    contact: "Kontakt",
    bookMeeting: "Boka möte",
    bookMeetingMobile: "Boka möte idag",
    clientsIn: "Kunder i",
    switchTo: "Byt språk",
  },
  hero: {
    label: "Applied AI Engineer · Oslo",
    line1: "Fastighets-AI",
    line2Before: "som ",
    line2Highlight: "levereras",
    line2After: " i produktion.",
    sub: "Lyxannonser i Marbella, ägarportaler för semesteruthyrning och tillståndsintelligens över flera län — byggt end-to-end med LLM:er, agenter och produktionsdatapipelines.",
    viewProjects: "Se projekt",
    phoneMeeting: "Möte",
    phoneVideoOn: "Video på",
    phoneMicOff: "Mikrofon av",
    phoneSpeaker: "Högtalare",
    phoneBookNow: "Boka nu",
    phoneCall: "Ring",
    phoneLinkedIn: "Meddela mig på LinkedIn",
    phoneAria: "Boka ett möte med Anders",
  },
  about: {
    label: "Om mig",
    p1Before: "Jag är ",
    p1Role: "Applied AI Engineer i Oslo",
    p1After:
      " med fokus på produktionssystem för fastigheter — lyxannonser, semesteruthyrningsdrift och tillståndsintelligens. Jag bygger LLM-arbetsflöden, datapipelines och portaler för personal som klarar skör extraktion, flerspråkigt innehåll i stor skala och långkörande synkjobb.",
    p2Before:
      "I åtta månader arbetade jag direkt med en av Göteborgs bästa mäklare på ",
    p2And: "och",
    p2After:
      ". Jag tillämpar samma produktionsdisciplin från tidigare säkerhetskritiskt ingenjörsarbete — mätbara resultat, graciös degradering och observabilitet.",
    currently: "Just nu",
    currentlyBefore: "Bygger en ",
    currentlyHighlight: "proptech lead generator",
    currentlyAfter:
      " för bygglov i Florida — skrapning, berikning och poängsättning av byggleads i 67 countys.",
    currentlyFooter: "Oslo · Självständig · zavian.ai",
  },
  chart: {
    label: "Specialitetsfokus",
    milestone1: "heltid",
    milestone2: "proptech",
    milestoneDate: "jan 2026",
    redLegend: "Systemarkitektur på tier 1-företag",
    redLegendNote: "· avslutas jan 2026",
    blueLegend: "Proptech AI",
    blueLegendNote: "· från okt 2024",
    aria:
      "Karriärbana: systemarkitektur till januari 2026, sedan heltid proptech AI med snabbare tillväxt",
  },
  work: {
    label: "Arbete",
    titleBefore: "Proptech-system, ",
    titleHighlight: "i produktion.",
    sub: "Åtta månader hands-on med en topmäklare i Göteborg — lyxannonser, semesteruthyrning och tillståndsintelligens.",
    scope: "Omfattning",
    builtWith: "Byggt med",
    pipelineGlance: "Pipeline i korthet",
    countyCoverage: "County-täckning",
    countyState: "Florida",
    countyNote:
      "Tillståndsdata från Accela, EnerGov, CitizenServe och egna portaler.",
    periodPresent: "Nu",
    periods: {
      florida: "2026 – Nu",
      kian: "2025 – Nu",
      kestays: "2025 – Nu",
    },
    projects: {
      florida: {
        category: "Byggleads",
        tagline: "Tillståndsintelligens i 67 countys",
        description:
          "Solo-byggd pipeline för skrapning → berikning → poängsättning över Floridas county-portaler. Zyte deep-fetch mot anti-bot, GIS + Sunbiz-berikning, score-baserade lead-nivåer och Railway ops-portal för granskning.",
        highlights: [
          "50+ county-adaptrar — Accela, EnerGov, CitizenServe, egna portaler",
          "Berikningskaskad: tillstånd → GIS-parcel → bolag → kontaktscore",
          "Daglig cron-skrapare + ops-UI för granskning, kontakt och CSV-export",
        ],
        stats: {
          counties: "Florida-countys",
          sources: "Källor live",
          cron: "Skrapar-cron",
          scoring: "Lead-scoring",
        },
      },
      kian: {
        category: "Lyxfastigheter",
        tagline: "Personalportal för lyxannonser i Marbella",
        description:
          "Skräddarsydd personalportal för en topmäklares lyxmärke i Marbella — MLS-import, flerspråkig AI-översättning, SEO-bildaudit och ChatGPT-assisterad bulktext för värdefulla annonser.",
        highlights: [
          "MLS → CMS-pipeline med publiceringsflöde för lyxfastigheter",
          "DeepSeek-översättningskö med review-gates på EN/ES/DE/FR/NL/SV",
          "AI-audit av bildbibliotek för alt-text, dubbletter och SEO-luckor före lansering",
        ],
        imageAlt: "Kian Estate personalportal",
      },
      kestays: {
        category: "Semesteruthyrning",
        tagline: "Ägarportal + adminplattform",
        description:
          "Dubbel portal för semesteruthyrning — PropertyFlow för ägare (bokningar, intäkter, status) och KE Stays Admin med Lodgify-synk, onboarding och övervakning av fastigheter.",
        highlights: [
          "Ägare hanterar rutinfrågor utan supportärenden",
          "Dubbelriktad Lodgify-synk med konfliktdetektering i kalendrar",
          "Onboarding minskade time-to-live för nya fastigheter",
        ],
        imageAlt: "KE Stays admin med Lodgify-synk",
      },
    },
  },
  skills: {
    label: "Kompetens",
    titleBefore: "Det jag bidrar med som ",
    titleHighlight: "generativ AI engineer",
    titleAfter: ".",
    carouselAria: "Kompetenskarusell",
    capabilities: [
      {
        title: "LLM och NLP",
        description:
          "Produktionsprompter, strukturerade outputs och tool calling över Claude, OpenAI och DeepSeek för fastighetsarbetsflöden.",
      },
      {
        title: "RAG och retrieval",
        description:
          "Berikningskaskader, entitetsupplösning och GIS/bolagsdatapipelines med deduplicering i databaslager.",
      },
      {
        title: "Agenter och orkestrering",
        description:
          "LangGraph state machines, MCP-gränser och human-in-the-loop-godkännande i Slack med checkpointade arbetsflöden.",
      },
      {
        title: "AI-kvalitet och utvärdering",
        description:
          "Retry-policyer, lead-scoring, regressionsfixtures och före/efter-mätvärden så pipelines degraderar graciöst.",
      },
      {
        title: "AI-plattformar",
        description:
          "Anthropic API, Railway + Postgres och moln-AI-mönster på Azure och Vertex för produktionsdeploy.",
      },
      {
        title: "Engineering",
        description:
          "Python, FastAPI, Next.js, Scrapy, PostgreSQL, Alembic — asynkrona jobb och ops-UI:er personal faktiskt använder.",
      },
      {
        title: "Proptech-domän",
        description:
          "MLS-integration, lyx-CMS, semesteruthyrningssynk, tillståndsintelligens och flerspråkig SEO i stor skala.",
      },
      {
        title: "Produktionsdisciplin",
        description:
          "Säkerhetskritiskt mindset: mätbara resultat, FMEA-tänkande och produktionsobservabilitet.",
      },
    ],
  },
  testimonials: {
    label: "Omdömen",
    titleBefore: "Vad partners säger — ",
    titleHighlight: "på rekord.",
    refsNote: "Referenser tillgängliga på begäran. Hovra över ett kort för att se hela omdömet.",
    ctaTitle: "Vill du ha en djupare referens?",
    ctaBody:
      "Fullständiga referenser från Backman Fast, repforce.ai och tidigare Volvo Buses-uppdrag tillgängliga på begäran.",
    ctaButton: "Begär referenser",
    items: [
      {
        coverLabel: "Referens tillgänglig på begäran",
        coverHint: "Hovra för att visa",
        coverOrg: "Backman Fast · Göteborg",
        quote:
          "Anders levererade en personalportal och AI-översättningsmotor som förändrade hur vårt team arbetar över Marbella, Göteborg och sex språkmarknader. Annonser som tog en hel dag med manuell text publicerar sig nu själva — med kvalitetsgrindar mäklare faktiskt litar på. Han arbetar som en ingenjör som förstår mäkleri, inte en konsult som behöver briefing.",
        author: "Elton",
        role: "Senior fastighetsmäklare",
        org: "Backman Fast",
      },
      {
        coverLabel: "Referens tillgänglig på begäran",
        coverHint: "Hovra för att visa",
        coverOrg: "repforce.ai · AI Factory",
        quote:
          "Anders byggde vår Jira AI Factory på LangGraph och MCP med PostgreSQL-checkpointing — agenter som pausar för mänskligt godkännande i Slack och fortsätter utan att hålla compute. Arkitekturen är den renaste agentorkestreringen jag sett levererad i produktion. Han behandlar fellägen som förstklassiga medborgare. Vilket proptech AI-team som än anställer honom får en senior ingenjör från dag ett.",
        author: "repforce.ai",
        role: "Ledning",
        org: "repforce.ai",
      },
    ],
  },
  contact: {
    label: "Kontakt",
    line1: "Låt oss bygga",
    line2Before: "",
    line2Highlight: "proptech AI",
    line2After: " som levereras.",
    bodyBefore: "Jag är baserad i ",
    bodyCity: "Oslo",
    bodyMid: " och tillgänglig för ",
    bodyRole: "Applied AI Engineer",
    bodyAfter: "-uppdrag med proptech-team. Hör av dig — e-post, Calendly eller LinkedIn.",
    meetTitle: "Google Meet / Teams · Anders Ljungstedt",
    meetDuration: "30 minuter · Oslo-tid",
    bookNow: "Boka nu",
    footerNote: "zavian.ai",
  },
  footer: {
    copyright: "© 2026 Anders Ljungstedt · zavian.ai",
    templateBefore: "Gillar du mallen? Hämta",
    skillLink: "SKILL.md",
    templateMid: "och",
    oneshotLink: "one-shot-prompten",
    templateAfter: "på",
    githubLink: "GitHub",
    templateEnd: ".",
    oneshotBefore: "Oneshottad med",
    zaiLink: "z.ai GLM 5.2",
    oneshotMid: "·",
    sourceLink: "portföljkälla",
  },
};
