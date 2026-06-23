"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CLUSTERS = [
  {
    title: "LLMs & NLP",
    tags: [
      "Anthropic Claude",
      "OpenAI",
      "DeepSeek",
      "Prompt engineering",
      "Structured outputs",
      "Tool calling",
    ],
  },
  {
    title: "RAG & Retrieval",
    tags: [
      "Enrichment cascades",
      "Entity resolution",
      "GIS/corporate data",
      "Dedupe at DB layer",
    ],
  },
  {
    title: "Agents & Orchestration",
    tags: [
      "LangGraph",
      "ReAct",
      "MCP (Jira, Slack)",
      "Checkpointed / dormant workflows",
      "HITL in Slack",
    ],
  },
  {
    title: "AI Quality & Evaluation",
    tags: [
      "Retry policies",
      "Lead scoring",
      "Regression fixtures",
      "Before/after metrics",
    ],
  },
  {
    title: "AI Platforms",
    tags: [
      "Anthropic API",
      "Railway + Postgres",
      "Cloud AI patterns (Azure / Vertex)",
    ],
  },
  {
    title: "Engineering",
    tags: [
      "Python",
      "FastAPI",
      "Next.js",
      "Scrapy",
      "PostgreSQL",
      "Alembic",
      "Async jobs",
      "Ops UI",
    ],
  },
  {
    title: "Proptech domain",
    tags: [
      "MLS integration",
      "Luxury listings CMS",
      "Vacation rental sync",
      "Permit intelligence",
      "Multilingual SEO",
    ],
  },
  {
    title: "Safety & discipline",
    tags: [
      "ISO 26262 background",
      "FMEA/TARA mindset",
      "Graceful degradation",
      "Production observability",
    ],
  },
];

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.from(".skills-headline .line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".skills-headline", start: "top 82%" },
      });

      gsap.from(".skills-cluster", {
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
      });

      gsap.from(".skills-tag", {
        y: 10,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.03,
        scrollTrigger: { trigger: ".skills-grid", start: "top 75%" },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 md:py-32 bg-[var(--bg-base)]"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="label-caps mb-8 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
          Capabilities
        </div>

        <h2
          className="skills-headline font-serif text-[var(--text-primary)] leading-[1.05] mb-16 max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="line-mask block">
            <span className="line block">
              What I bring to a{" "}
              <span className="text-[var(--accent-blue)]">
                generative AI engineer
              </span>{" "}
              role.
            </span>
          </span>
        </h2>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {CLUSTERS.map((c) => (
            <div key={c.title} className="skills-cluster">
              <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-[var(--border-subtle)]">
                <span className="font-mono text-xs text-[var(--accent-blue)]">◆</span>
                <h3
                  className="font-serif text-[var(--text-primary)] text-lg"
                  style={{ fontWeight: 600 }}
                >
                  {c.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="skills-tag tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
