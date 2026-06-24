import type { Messages } from "../types";

export const es: Messages = {
  nav: {
    work: "Proyectos",
    about: "Sobre mí",
    capabilities: "Capacidades",
    contact: "Contacto",
    bookMeeting: "Reservar reunión",
    bookMeetingMobile: "Reservar reunión hoy",
    clientsIn: "Clientes en",
    switchTo: "Cambiar idioma",
  },
  hero: {
    label: "Applied AI Engineer · Oslo",
    line1: "IA inmobiliaria",
    line2Before: "que ",
    line2Highlight: "llega",
    line2After: " a producción.",
    sub: "Anuncios de lujo en Marbella, portales para propietarios de alquiler vacacional e inteligencia de permisos en varios condados — construido de extremo a extremo con LLM, agentes y pipelines de datos en producción.",
    viewProjects: "Ver proyectos",
    phoneMeeting: "Reunión",
    phoneVideoOn: "Vídeo activado",
    phoneMicOff: "Micrófono apagado",
    phoneSpeaker: "Altavoz",
    phoneBookNow: "Reservar",
    phoneCall: "Llamar",
    phoneLinkedIn: "Escríbeme en LinkedIn",
    phoneAria: "Reservar una reunión con Anders",
  },
  about: {
    label: "Sobre mí",
    p1Before: "Soy ",
    p1Role: "Applied AI Engineer en Oslo",
    p1After:
      " centrado en sistemas inmobiliarios en producción — anuncios de lujo, operaciones de alquiler vacacional e inteligencia de permisos. Construyo flujos LLM, pipelines de datos y portales para el personal que resisten extracción frágil, contenido multilingüe a escala y trabajos de sincronización prolongados.",
    p2Before:
      "Durante ocho meses trabajé directamente con uno de los mejores agentes de Gotemburgo en ",
    p2And: "y",
    p2After:
      ". Aplico la misma disciplina de producción de mi trabajo previo en ingeniería de seguridad crítica — resultados medibles, degradación elegante y observabilidad.",
    currently: "Actualmente",
    currentlyBefore: "Construyendo un ",
    currentlyHighlight: "generador de leads proptech",
    currentlyAfter:
      " para permisos de construcción en Florida — scraping, enriquecimiento y puntuación de leads en 67 condados.",
    currentlyFooter: "Oslo · Independiente · zavian.ai",
  },
  chart: {
    label: "Enfoque de especialidad",
    milestone1: "tiempo completo",
    milestone2: "proptech",
    milestoneDate: "ene 2026",
    redLegend: "Arquitectura de sistemas en empresa tier 1",
    redLegendNote: "· termina ene 2026",
    blueLegend: "Proptech AI",
    blueLegendNote: "· desde oct 2024",
    aria:
      "Trayectoria profesional: arquitectura de sistemas hasta enero de 2026, luego proptech AI a tiempo completo con mayor crecimiento",
  },
  work: {
    label: "Proyectos",
    titleBefore: "Sistemas proptech, ",
    titleHighlight: "en producción.",
    sub: "Ocho meses de trabajo directo con un agente top de Gotemburgo — anuncios de lujo, alquiler vacacional e inteligencia de permisos.",
    scope: "Alcance",
    builtWith: "Construido con",
    pipelineGlance: "Pipeline de un vistazo",
    countyCoverage: "Cobertura por condado",
    countyState: "Florida",
    countyNote:
      "Registros de permisos de Accela, EnerGov, CitizenServe y portales personalizados.",
    periodPresent: "Actualidad",
    periods: {
      florida: "2026 – Actualidad",
      kian: "2025 – Actualidad",
      kestays: "2025 – Actualidad",
    },
    projects: {
      florida: {
        category: "Leads de construcción",
        tagline: "Inteligencia de permisos en 67 condados",
        description:
          "Pipeline scrape → enriquecer → puntuar construido en solitario en portales de permisos de Florida. Zyte deep-fetch contra anti-bot, enriquecimiento GIS + Sunbiz, niveles de leads por puntuación y portal ops en Railway para revisión.",
        highlights: [
          "50+ adaptadores de condados — Accela, EnerGov, CitizenServe, portales propios",
          "Cascada de enriquecimiento: permiso → parcela GIS → entidad corporativa → puntuación de contacto",
          "Scraper cron diario + UI ops para revisión, contacto y exportación CSV",
        ],
        stats: {
          counties: "Condados de Florida",
          sources: "Fuentes activas",
          cron: "Cron del scraper",
          scoring: "Puntuación de leads",
        },
      },
      kian: {
        category: "Inmobiliaria de lujo",
        tagline: "Portal interno para anuncios de lujo en Marbella",
        description:
          "Portal a medida para la marca de lujo en Marbella de un agente top — importación MLS, traducción IA multilingüe, auditoría SEO de imágenes y copy masivo asistido por ChatGPT para anuncios de alto valor.",
        highlights: [
          "Pipeline MLS → CMS con flujo de publicación para propiedades de lujo",
          "Cola de traducción DeepSeek con revisiones en EN/ES/DE/FR/NL/SV",
          "Auditoría IA de biblioteca de imágenes para alt text, duplicados y huecos SEO antes del lanzamiento",
        ],
        imageAlt: "Panel del portal Kian Estate",
      },
      kestays: {
        category: "Alquiler vacacional",
        tagline: "Portal de propietarios + plataforma admin",
        description:
          "Operaciones dual-portal — PropertyFlow para autoservicio de propietarios (reservas, ingresos, estado) y KE Stays Admin con sincronización Lodgify, onboarding y monitorización de propiedades.",
        highlights: [
          "Propietarios resuelven consultas rutinarias sin tickets de soporte",
          "Sincronización Lodgify bidireccional con detección de conflictos en calendarios",
          "Flujo de onboarding redujo el time-to-live de nuevas propiedades",
        ],
        imageAlt: "Admin KE Stays con sincronización Lodgify",
      },
    },
  },
  skills: {
    label: "Capacidades",
    titleBefore: "Lo que aporto como ",
    titleHighlight: "ingeniero de IA generativa",
    titleAfter: ".",
    carouselAria: "Carrusel de capacidades",
    capabilities: [
      {
        title: "LLM y NLP",
        description:
          "Prompts de producción, salidas estructuradas y tool calling con Claude, OpenAI y DeepSeek para flujos inmobiliarios.",
      },
      {
        title: "RAG y recuperación",
        description:
          "Cascadas de enriquecimiento, resolución de entidades y pipelines GIS/corporativos con deduplicación en la capa de base de datos.",
      },
      {
        title: "Agentes y orquestación",
        description:
          "Máquinas de estado LangGraph, límites MCP y aprobaciones human-in-the-loop en Slack con flujos con checkpoint.",
      },
      {
        title: "Calidad y evaluación IA",
        description:
          "Políticas de reintento, puntuación de leads, fixtures de regresión y métricas antes/después para degradación elegante.",
      },
      {
        title: "Plataformas IA",
        description:
          "API Anthropic, Railway + Postgres y patrones de IA en nube en Azure y Vertex para despliegues en producción.",
      },
      {
        title: "Ingeniería",
        description:
          "Python, FastAPI, Next.js, Scrapy, PostgreSQL, Alembic — trabajos async y UIs ops que el personal realmente usa.",
      },
      {
        title: "Dominio proptech",
        description:
          "Integración MLS, CMS de lujo, sincronización de alquiler vacacional, inteligencia de permisos y SEO multilingüe a escala.",
      },
      {
        title: "Disciplina de producción",
        description:
          "Mentalidad de seguridad crítica: resultados medibles, pensamiento FMEA y observabilidad en producción.",
      },
    ],
  },
  testimonials: {
    label: "Testimonios",
    titleBefore: "Lo que dicen los partners — ",
    titleHighlight: "oficialmente.",
    refsNote: "Referencias disponibles bajo solicitud. Pasa el cursor sobre una tarjeta para ver el testimonio completo.",
    ctaTitle: "¿Quieres una referencia más detallada?",
    ctaBody:
      "Referencias completas de Backman Fast, repforce.ai y anteriores proyectos en Volvo Buses disponibles bajo solicitud.",
    ctaButton: "Solicitar referencias",
    items: [
      {
        coverLabel: "Referencia disponible bajo solicitud",
        coverHint: "Pasa el cursor para revelar",
        coverOrg: "Backman Fast · Gotemburgo",
        quote:
          "Anders entregó un portal interno y motor de traducción IA que cambió cómo trabaja nuestro equipo en Marbella, Gotemburgo y seis mercados lingüísticos. Anuncios que antes llevaban un día de copy manual ahora se publican solos — con controles de calidad en los que nuestros agentes confían. Trabaja como un ingeniero que entiende la intermediación, no un contratista que necesita briefing.",
        author: "Elton",
        role: "Agente inmobiliario senior",
        org: "Backman Fast",
      },
      {
        coverLabel: "Referencia disponible bajo solicitud",
        coverHint: "Pasa el cursor para revelar",
        coverOrg: "repforce.ai · AI Factory",
        quote:
          "Anders construyó nuestra Jira AI Factory con LangGraph y MCP con checkpointing PostgreSQL — agentes que pausan para aprobación humana en Slack y reanudan sin mantener compute. La arquitectura es la orquestación de agentes más limpia que he visto en producción. Trata los modos de fallo como ciudadanos de primera clase. Cualquier equipo proptech IA que lo contrate obtiene un ingeniero senior desde el día uno.",
        author: "repforce.ai",
        role: "Dirección",
        org: "repforce.ai",
      },
    ],
  },
  contact: {
    label: "Contacto",
    line1: "Construyamos",
    line2Before: "",
    line2Highlight: "proptech IA",
    line2After: " que llegue a producción.",
    bodyBefore: "Estoy basado en ",
    bodyCity: "Oslo",
    bodyMid: " y disponible para ",
    bodyRole: "Applied AI Engineer",
    bodyAfter: " con equipos proptech. Escríbeme — email, Calendly o LinkedIn.",
    meetTitle: "Google Meet / Teams · Anders Ljungstedt",
    meetDuration: "30 minutos · hora de Oslo",
    bookNow: "Reservar",
    footerNote: "zavian.ai",
  },
  footer: {
    copyright: "© 2026 Anders Ljungstedt · zavian.ai",
    templateBefore: "¿Te gusta la plantilla? Descarga",
    skillLink: "SKILL.md",
    templateMid: "y el",
    oneshotLink: "prompt one-shot",
    templateAfter: "en",
    githubLink: "GitHub",
    templateEnd: ".",
    oneshotBefore: "Generado con",
    zaiLink: "z.ai GLM 5.2",
    oneshotMid: "·",
    sourceLink: "código fuente",
  },
};
