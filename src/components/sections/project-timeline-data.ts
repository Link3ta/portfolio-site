import type { ToolKey } from "@/components/portfolio/tool-icons";

export type ProjectId = "florida" | "kian" | "kestays";

export interface TimelineProject {
  id: ProjectId;
  name: string;
  url?: string;
  urlLabel?: string;
  image?: string;
  stats?: { value: string; labelKey: "counties" | "sources" | "cron" | "scoring" }[];
  tools?: ToolKey[];
  countyImages?: { src: string; name: string }[];
}

/** Newest first — Matthew Don–style timeline */
export const PROJECT_TIMELINE: TimelineProject[] = [
  {
    id: "florida",
    name: "Florida Lead Portal",
    stats: [
      { value: "67", labelKey: "counties" },
      { value: "50+", labelKey: "sources" },
      { value: "Daily", labelKey: "cron" },
      { value: "3-tier", labelKey: "scoring" },
    ],
    tools: ["python", "fastapi", "scrapy", "zyte", "postgres", "railway", "arcgis", "rag"],
    countyImages: [
      { src: "/assets/county-miami-dade.jpg", name: "Miami-Dade" },
      { src: "/assets/county-orange.jpg", name: "Orange County" },
      { src: "/assets/county-hillsborough.jpg", name: "Hillsborough" },
      { src: "/assets/county-sarasota.jpg", name: "Sarasota" },
      { src: "/assets/county-palm-beach.jpg", name: "Palm Beach" },
    ],
  },
  {
    id: "kian",
    name: "Kian Estate",
    url: "https://www.kianestate.com/",
    urlLabel: "kianestate.com",
    image: "/assets/kianestate-overview.png",
    tools: ["nextjs", "react", "deepseek", "chatgpt", "mls", "postgres"],
  },
  {
    id: "kestays",
    name: "KE Stays",
    url: "https://www.kestays.com/",
    urlLabel: "kestays.com",
    image: "/assets/kestays-admin-properties.png",
    tools: ["nextjs", "react", "lodgify", "postgres", "api"],
  },
];
