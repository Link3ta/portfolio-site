"use client";

import { Calendar, Linkedin, Phone } from "lucide-react";

type IconProps = { className?: string; size?: number; color?: string };

function StrokeSvg({ size = 24, color = "currentColor", children, className }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Official brand marks via Simple Icons CDN — crisp at any size */
const BRAND_CDN: Record<string, { slug: string; color: string }> = {
  nextjs: { slug: "nextdotjs", color: "000000" },
  react: { slug: "react", color: "61DAFB" },
  postgres: { slug: "postgresql", color: "4169E1" },
  python: { slug: "python", color: "3776AB" },
  fastapi: { slug: "fastapi", color: "009688" },
  typescript: { slug: "typescript", color: "3178C6" },
  tailwind: { slug: "tailwindcss", color: "06B6D4" },
  nodejs: { slug: "nodedotjs", color: "339933" },
  vercel: { slug: "vercel", color: "000000" },
  github: { slug: "github", color: "181717" },
  slack: { slug: "slack", color: "4A154B" },
  docker: { slug: "docker", color: "2496ED" },
  redis: { slug: "redis", color: "DC382D" },
  prisma: { slug: "prisma", color: "2D3748" },
  openai: { slug: "openai", color: "412991" },
  langchain: { slug: "langchain", color: "1C3C3C" },
  railway: { slug: "railway", color: "0B0D0E" },
  arcgis: { slug: "esri", color: "3498DB" },
  deepseek: { slug: "deepseek", color: "4D6BFE" },
};

function BrandIcon({ slug, color, label, size }: { slug: string; color: string; label: string; size: number }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt=""
      width={size}
      height={size}
      className="block object-contain"
      loading="lazy"
      decoding="async"
      aria-hidden
      title={label}
    />
  );
}

export type ToolKey =
  | "nextjs"
  | "openai"
  | "deepseek"
  | "chatgpt"
  | "postgres"
  | "python"
  | "fastapi"
  | "scrapy"
  | "zyte"
  | "alembic"
  | "railway"
  | "arcgis"
  | "sunbiz"
  | "lodgify"
  | "mls"
  | "langgraph"
  | "mcp"
  | "slack"
  | "react"
  | "typescript"
  | "tailwind"
  | "node"
  | "vercel"
  | "langchain"
  | "redis"
  | "docker"
  | "prisma"
  | "github"
  | "api"
  | "rag"
  | "db"
  | "agent"
  | "orchestration";

interface ToolDef {
  label: string;
  color: string;
  brand?: keyof typeof BRAND_CDN;
  generic?: "api" | "brain" | "database" | "plug" | "robot";
}

const MAP: Record<ToolKey, ToolDef> = {
  nextjs: { label: "Next.js", color: "#000000", brand: "nextjs" },
  openai: { label: "OpenAI", color: "#412991", brand: "openai" },
  deepseek: { label: "DeepSeek API", color: "#4D6BFE", brand: "deepseek" },
  chatgpt: { label: "ChatGPT", color: "#412991", brand: "openai" },
  postgres: { label: "PostgreSQL", color: "#4169E1", brand: "postgres" },
  python: { label: "Python", color: "#3776AB", brand: "python" },
  fastapi: { label: "FastAPI", color: "#009688", brand: "fastapi" },
  scrapy: { label: "Scrapy", color: "#60A8E0", brand: "python" },
  zyte: { label: "Zyte API", color: "#B76BD9", generic: "api" },
  alembic: { label: "Alembic", color: "#000000", generic: "database" },
  railway: { label: "Railway", color: "#0B0D0E", brand: "railway" },
  arcgis: { label: "ArcGIS", color: "#3498DB", brand: "arcgis" },
  sunbiz: { label: "Sunbiz", color: "#1565C0", generic: "database" },
  lodgify: { label: "Lodgify API", color: "#00B8A9", generic: "api" },
  mls: { label: "MLS", color: "#0D9488", generic: "api" },
  langgraph: { label: "LangGraph", color: "#1C3C3C", brand: "langchain" },
  mcp: { label: "MCP", color: "#000000", generic: "plug" },
  slack: { label: "Slack HITL", color: "#4A154B", brand: "slack" },
  react: { label: "React", color: "#61DAFB", brand: "react" },
  typescript: { label: "TypeScript", color: "#3178C6", brand: "typescript" },
  tailwind: { label: "Tailwind", color: "#06B6D4", brand: "tailwind" },
  node: { label: "Node.js", color: "#339933", brand: "nodejs" },
  vercel: { label: "Vercel", color: "#000000", brand: "vercel" },
  langchain: { label: "LangChain", color: "#1C3C3C", brand: "langchain" },
  redis: { label: "Redis", color: "#DC382D", brand: "redis" },
  docker: { label: "Docker", color: "#2496ED", brand: "docker" },
  prisma: { label: "Prisma", color: "#2D3748", brand: "prisma" },
  github: { label: "GitHub", color: "#181717", brand: "github" },
  api: { label: "REST API", color: "#2563EB", generic: "api" },
  rag: { label: "RAG", color: "#7C3AED", generic: "brain" },
  db: { label: "DB layer", color: "#475569", generic: "database" },
  agent: { label: "Agents", color: "#0D9488", generic: "robot" },
  orchestration: { label: "Orchestration", color: "#D97706", generic: "plug" },
};

function GenericIcon({ kind, size, color }: { kind: string; size: number; color: string }) {
  if (kind === "api") {
    return (
      <StrokeSvg size={size} color={color}>
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </StrokeSvg>
    );
  }
  if (kind === "brain") {
    return (
      <StrokeSvg size={size} color={color}>
        <path d="M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.142 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      </StrokeSvg>
    );
  }
  if (kind === "database") {
    return (
      <StrokeSvg size={size} color={color}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
        <path d="M3 12a9 3 0 0 0 18 0" />
      </StrokeSvg>
    );
  }
  if (kind === "plug") {
    return (
      <StrokeSvg size={size} color={color}>
        <path d="M12 22v-5" />
        <path d="M9 7V2" />
        <path d="M15 7V2" />
        <path d="M6 13V8h12v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4Z" />
      </StrokeSvg>
    );
  }
  return (
    <StrokeSvg size={size} color={color}>
      <rect width="18" height="10" x="3" y="11" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" x2="8" y1="16" y2="16" />
      <line x1="16" x2="16" y1="16" y2="16" />
    </StrokeSvg>
  );
}

function ToolGlyph({ tool, size }: { tool: ToolKey; size: number }) {
  const def = MAP[tool];
  if (!def) return null;
  if (def.brand && BRAND_CDN[def.brand]) {
    const b = BRAND_CDN[def.brand];
    return <BrandIcon slug={b.slug} color={b.color} label={def.label} size={size} />;
  }
  if (def.generic) {
    return <GenericIcon kind={def.generic} size={size} color={def.color} />;
  }
  return null;
}

export function ToolIcon({ tool, size = 22 }: { tool: ToolKey; size?: number }) {
  const def = MAP[tool];
  if (!def) return null;
  return (
    <span className="inline-flex items-center justify-center" title={def.label} aria-label={def.label}>
      <ToolGlyph tool={tool} size={size} />
    </span>
  );
}

export function ToolIconRow({
  tools,
  size = 20,
  showLabels = true,
}: {
  tools: ToolKey[];
  size?: number;
  showLabels?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-center ${showLabels ? "gap-x-5 gap-y-3" : "gap-1.5"}`}>
      {tools.map((t) => {
        const def = MAP[t];
        if (!def) return null;
        return (
          <span
            key={t}
            className={`group cs-tool-icon inline-flex ${showLabels ? "flex-col items-center gap-1.5" : ""}`}
            title={def.label}
            aria-label={def.label}
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-none bg-[var(--bg-soft)] border border-[var(--border-subtle)] transition-colors duration-150 group-hover:border-[var(--accent-blue)]">
              <ToolGlyph tool={t} size={size} />
            </span>
            {showLabels && (
              <span className="text-[10px] font-medium text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                {def.label}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
