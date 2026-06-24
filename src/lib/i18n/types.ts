export type Locale = "en" | "no" | "sv" | "es";

export const LOCALE_STORAGE_KEY = "zavian-locale";

export const LOCALES: {
  code: Locale;
  country: string;
  htmlLang: string;
}[] = [
  { code: "no", country: "Norway", htmlLang: "nb" },
  { code: "sv", country: "Sweden", htmlLang: "sv" },
  { code: "es", country: "Spain", htmlLang: "es" },
  { code: "en", country: "America", htmlLang: "en" },
];

export interface CapabilityMessage {
  title: string;
  description: string;
}

export interface ProjectMessage {
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  imageAlt?: string;
  stats?: {
    counties: string;
    sources: string;
    cron: string;
    scoring: string;
  };
}

export interface TestimonialMessage {
  coverLabel: string;
  coverHint: string;
  coverOrg: string;
  quote: string;
  author: string;
  role: string;
  org: string;
}

export interface Messages {
  nav: {
    work: string;
    about: string;
    capabilities: string;
    contact: string;
    bookMeeting: string;
    bookMeetingMobile: string;
    clientsIn: string;
    switchTo: string;
  };
  hero: {
    label: string;
    line1: string;
    line2Before: string;
    line2Highlight: string;
    line2After: string;
    sub: string;
    viewProjects: string;
    phoneMeeting: string;
    phoneVideoOn: string;
    phoneMicOff: string;
    phoneSpeaker: string;
    phoneBookNow: string;
    phoneCall: string;
    phoneLinkedIn: string;
    phoneAria: string;
  };
  about: {
    label: string;
    p1Before: string;
    p1Role: string;
    p1After: string;
    p2Before: string;
    p2And: string;
    p2After: string;
    currently: string;
    currentlyBefore: string;
    currentlyHighlight: string;
    currentlyAfter: string;
    currentlyFooter: string;
  };
  chart: {
    label: string;
    milestone1: string;
    milestone2: string;
    milestoneDate: string;
    redLegend: string;
    redLegendNote: string;
    blueLegend: string;
    blueLegendNote: string;
    aria: string;
  };
  work: {
    label: string;
    titleBefore: string;
    titleHighlight: string;
    sub: string;
    scope: string;
    builtWith: string;
    pipelineGlance: string;
    countyCoverage: string;
    countyState: string;
    countyNote: string;
    periodPresent: string;
    periods: {
      florida: string;
      kian: string;
      kestays: string;
    };
    projects: {
      florida: ProjectMessage;
      kian: ProjectMessage;
      kestays: ProjectMessage;
    };
  };
  skills: {
    label: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    carouselAria: string;
    capabilities: CapabilityMessage[];
  };
  testimonials: {
    label: string;
    titleBefore: string;
    titleHighlight: string;
    refsNote: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    items: TestimonialMessage[];
  };
  contact: {
    label: string;
    line1: string;
    line2Before: string;
    line2Highlight: string;
    line2After: string;
    bodyBefore: string;
    bodyCity: string;
    bodyMid: string;
    bodyRole: string;
    bodyAfter: string;
    meetTitle: string;
    meetDuration: string;
    bookNow: string;
    footerNote: string;
  };
  footer: {
    copyright: string;
    templateBefore: string;
    skillLink: string;
    templateMid: string;
    oneshotLink: string;
    templateAfter: string;
    githubLink: string;
    templateEnd: string;
    oneshotBefore: string;
    zaiLink: string;
    oneshotMid: string;
    sourceLink: string;
  };
}
