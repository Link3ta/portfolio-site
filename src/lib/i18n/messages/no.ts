import type { Messages } from "../types";

export const no: Messages = {
  nav: {
    work: "Arbeid",
    about: "Om meg",
    capabilities: "Kompetanse",
    contact: "Kontakt",
    bookMeeting: "Book møte",
    bookMeetingMobile: "Book møte i dag",
    clientsIn: "Kunder i",
    switchTo: "Bytt språk",
  },
  hero: {
    label: "Applied AI Engineer · Oslo",
    line1: "Eiendoms-AI",
    line2Before: "som ",
    line2Highlight: "leveres",
    line2After: " i produksjon.",
    sub: "Luksusannonser i Marbella, eierportaler for ferieleie og tillatelsesintelligens på tvers av fylker — bygget ende-til-ende med LLM-er, agenter og produksjonsdatapipelines.",
    viewProjects: "Se prosjekter",
    phoneMeeting: "Møte",
    phoneVideoOn: "Video på",
    phoneMicOff: "Mikrofon av",
    phoneSpeaker: "Høyttaler",
    phoneBookNow: "Book nå",
    phoneCall: "Ring",
    phoneLinkedIn: "Send melding på LinkedIn",
    phoneAria: "Book et møte med Anders",
  },
  about: {
    label: "Om meg",
    p1Before: "Jeg er ",
    p1Role: "Applied AI Engineer i Oslo",
    p1After:
      " med fokus på produksjonssystemer for eiendom — luksusannonser, ferieleiedrift og tillatelsesintelligens. Jeg bygger LLM-arbeidsflyter, datapipelines og portaler for ansatte som tåler skjør ekstraksjon, flerspråklig innhold i stor skala og langvarige synkjobber.",
    p2Before:
      "I åtte måneder jobbet jeg direkte med en av Göteborgs beste meglere på ",
    p2And: "og",
    p2After:
      ". Jeg bruker samme produksjonsdisiplin fra tidligere sikkerhetskritisk ingeniørarbeid — målbare resultater, grasiøs degradering og observabilitet.",
    currently: "Nå",
    currentlyBefore: "Bygger en ",
    currentlyHighlight: "proptech lead generator",
    currentlyAfter:
      " for byggetillatelser i Florida — skraping, berikelse og scoring av byggeleads i 67 fylker.",
    currentlyFooter: "Oslo · Selvstendig · zavian.ai",
  },
  chart: {
    label: "Spesialitetsfokus",
    milestone1: "heltid",
    milestone2: "proptech",
    milestoneDate: "jan 2026",
    redLegend: "Systemarkitektur i tier 1-selskap",
    redLegendNote: "· avsluttes jan 2026",
    blueLegend: "Proptech AI",
    blueLegendNote: "· fra okt 2024",
    aria:
      "Karriereløp: systemarkitektur til januar 2026, deretter heltid proptech AI med raskere vekst",
  },
  work: {
    label: "Arbeid",
    titleBefore: "Proptech-systemer, ",
    titleHighlight: "i produksjon.",
    sub: "Åtte måneder hands-on med en topmegler i Göteborg — luksusannonser, ferieleie og tillatelsesintelligens.",
    scope: "Omfang",
    builtWith: "Bygget med",
    pipelineGlance: "Pipeline i korte trekk",
    countyCoverage: "Fylkesdekning",
    countyState: "Florida",
    countyNote:
      "Tillatelsesdata fra Accela, EnerGov, CitizenServe og egne portaler.",
    periodPresent: "Nå",
    periods: {
      florida: "2026 – Nå",
      kian: "2025 – Nå",
      kestays: "2025 – Nå",
    },
    projects: {
      florida: {
        category: "Byggeleads",
        tagline: "Tillatelsesintelligens i 67 fylker",
        description:
          "Solo-bygget pipeline for skraping → berikelse → scoring på tvers av Floridas fylkesportaler. Zyte deep-fetch mot anti-bot, GIS + Sunbiz-berikelse, score-baserte lead-nivåer og Railway ops-portal for gjennomgang.",
        highlights: [
          "50+ fylkesadaptere — Accela, EnerGov, CitizenServe, egne portaler",
          "Berikelseskaskade: tillatelse → GIS-parcel → selskap → kontaktscore",
          "Daglig cron-skraper + ops-UI for gjennomgang, kontakt og CSV-eksport",
        ],
        stats: {
          counties: "Florida-fylker",
          sources: "Kilder live",
          cron: "Skraper-cron",
          scoring: "Lead-scoring",
        },
      },
      kian: {
        category: "Luksuseiendom",
        tagline: "Ansattportal for luksusannonser i Marbella",
        description:
          "Skreddersydd ansattportal for en topmeglers luksusmerke i Marbella — MLS-import, flerspråklig AI-oversettelse, SEO-bildeaudit og ChatGPT-assistert bulktekst for verdifulle annonser.",
        highlights: [
          "MLS → CMS-pipeline med publiseringsflyt for luksuseiendommer",
          "DeepSeek-oversettelseskø med review-gates på EN/ES/DE/FR/NL/SV",
          "AI-audit av bildebibliotek for alt-tekst, duplikater og SEO-hull før lansering",
        ],
        imageAlt: "Kian Estate ansattportal",
      },
      kestays: {
        category: "Ferieutleie",
        tagline: "Eierportal + adminplattform",
        description:
          "Dobbel portal for ferieleie — PropertyFlow for eierselvbetjening (bookinger, inntekt, status) og KE Stays Admin med Lodgify-synk, onboarding og overvåking av eiendommer.",
        highlights: [
          "Eiere håndterer rutinehenvendelser uten supportbilletter",
          "Toveis Lodgify-synk med konfliktdeteksjon i kalendere",
          "Onboarding reduserte time-to-live for nye eiendommer",
        ],
        imageAlt: "KE Stays admin med Lodgify-synk",
      },
    },
  },
  skills: {
    label: "Kompetanse",
    titleBefore: "Det jeg bringer til en ",
    titleHighlight: "generativ AI engineer",
    titleAfter: "-rolle.",
    carouselAria: "Kompetansekarusell",
    capabilities: [
      {
        title: "LLM og NLP",
        description:
          "Produksjonsprompter, strukturerte outputs og tool calling på tvers av Claude, OpenAI og DeepSeek for eiendomsarbeidsflyter.",
      },
      {
        title: "RAG og retrieval",
        description:
          "Berikelseskaskader, entitetsoppløsning og GIS/selskapsdatapipelines med deduplisering i databaselaget.",
      },
      {
        title: "Agenter og orkestrering",
        description:
          "LangGraph state machines, MCP-grenser og human-in-the-loop-godkjenning i Slack med checkpointede arbeidsflyter.",
      },
      {
        title: "AI-kvalitet og evaluering",
        description:
          "Retry-policyer, lead-scoring, regresjonsfixtures og før/etter-metrikker så pipelines degraderer grasiøst.",
      },
      {
        title: "AI-plattformer",
        description:
          "Anthropic API, Railway + Postgres og sky-AI-mønstre på Azure og Vertex for produksjonsdeploy.",
      },
      {
        title: "Engineering",
        description:
          "Python, FastAPI, Next.js, Scrapy, PostgreSQL, Alembic — asynkrone jobber og ops-UI-er ansatte faktisk bruker.",
      },
      {
        title: "Proptech-domene",
        description:
          "MLS-integrasjon, luksus-CMS, ferieleiesynk, tillatelsesintelligens og flerspråklig SEO i stor skala.",
      },
      {
        title: "Produksjonsdisiplin",
        description:
          "Sikkerhetskritisk mindset: målbare resultater, FMEA-tenkning og produksjonsobservabilitet.",
      },
    ],
  },
  testimonials: {
    label: "Anbefalinger",
    titleBefore: "Det partnere sier — ",
    titleHighlight: "på rekord.",
    refsNote: "Referanser tilgjengelig på forespørsel. Hold over et kort for å se hele anbefalingen.",
    ctaTitle: "Vil du ha en dypere referanse?",
    ctaBody:
      "Fullstendige referanser fra Backman Fast, repforce.ai og tidligere Volvo Buses-oppdrag tilgjengelig på forespørsel.",
    ctaButton: "Be om referanser",
    items: [
      {
        coverLabel: "Referanse tilgjengelig på forespørsel",
        coverHint: "Hold over for å vise",
        coverOrg: "Backman Fast · Göteborg",
        quote:
          "Anders leverte en ansattportal og AI-oversettelsesmotor som endret hvordan teamet vårt jobber på tvers av Marbella, Göteborg og seks språkmarkeder. Annonser som tok en hel dag med manuell tekst publiserer seg nå selv — med kvalitetsporter meglere faktisk stoler på. Han jobber som en ingeniør som forstår megling, ikke en konsulent som trenger briefing.",
        author: "Elton",
        role: "Senior eiendomsmegler",
        org: "Backman Fast",
      },
      {
        coverLabel: "Referanse tilgjengelig på forespørsel",
        coverHint: "Hold over for å vise",
        coverOrg: "repforce.ai · AI Factory",
        quote:
          "Anders bygde vår Jira AI Factory på LangGraph og MCP med PostgreSQL-checkpointing — agenter som pauser for menneskelig godkjenning i Slack og fortsetter uten å holde compute. Arkitekturen er den reneste agentorkestreringen jeg har sett levert i produksjon. Han behandler feilmoduser som førsteklasses borgere. Ethvert proptech AI-team som ansetter ham får en senior ingeniør fra dag én.",
        author: "repforce.ai",
        role: "Ledelse",
        org: "repforce.ai",
      },
    ],
  },
  contact: {
    label: "Kontakt",
    line1: "La oss bygge",
    line2Before: "",
    line2Highlight: "proptech AI",
    line2After: " som leveres.",
    bodyBefore: "Jeg er basert i ",
    bodyCity: "Oslo",
    bodyMid: " og tilgjengelig for ",
    bodyRole: "Applied AI Engineer",
    bodyAfter: "-oppdrag med proptech-team. Ta kontakt — e-post, Calendly eller LinkedIn.",
    meetTitle: "Google Meet / Teams · Anders Ljungstedt",
    meetDuration: "30 minutter · Oslo-tid",
    bookNow: "Book nå",
    footerNote: "zavian.ai",
  },
  footer: {
    copyright: "© 2026 Anders Ljungstedt · zavian.ai",
    templateBefore: "Liker du malen? Hent",
    skillLink: "SKILL.md",
    templateMid: "og",
    oneshotLink: "one-shot-prompten",
    templateAfter: "på",
    githubLink: "GitHub",
    templateEnd: ".",
    oneshotBefore: "Oneshottet med",
    zaiLink: "z.ai GLM 5.2",
    oneshotMid: "·",
    sourceLink: "porteføljekilde",
  },
};
