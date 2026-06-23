"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CARDS = [
  {
    index: "01",
    title: "Enrichment cascades",
    body: "Permit → GIS parcel → corporate entity → contact score. Each stage has fallbacks, retry policies, and quality gates so one brittle source doesn't poison the pipeline.",
    tags: ["ArcGIS", "Sunbiz", "Score-gated", "Fallback chains"],
  },
  {
    index: "02",
    title: "Agent orchestration",
    body: "Jira AI Factory: LangGraph state machines, MCP tool boundaries (Jira, Slack), PostgreSQL checkpointing — agents pause for human approval and resume without holding compute.",
    tags: ["LangGraph", "MCP", "Postgres checkpoint", "HITL in Slack"],
  },
  {
    index: "03",
    title: "Anti-bot resilience",
    body: "Session rotation, proxy routing, Zyte deep-fetch, observable retry loops. Production scrapers that save raw HTML on failure instead of faking success.",
    tags: ["Zyte API", "Proxy rotation", "Raw HTML save", "Retry loops"],
  },
];

export function Architecture() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.from(".arch-headline .line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".arch-headline",
          start: "top 82%",
        },
      });

      gsap.from(".arch-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".arch-grid",
          start: "top 80%",
        },
      });

      // Subtle parallax on the background grid
      gsap.to(".arch-bg", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section
      id="architecture"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div
        className="arch-bg absolute inset-0 grid-bg opacity-40 pointer-events-none"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="label-caps mb-8 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-[var(--accent-copper)]" />
          Architecture
        </div>

        <h2
          className="arch-headline font-serif text-[var(--text-primary)] leading-[1.05] mb-16 max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="line-mask block">
            <span className="line block">
              Pipelines designed for{" "}
              <span className="text-[var(--accent-copper)]">
                real-world failure modes.
              </span>
            </span>
          </span>
        </h2>

        <div className="arch-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((c) => (
            <div
              key={c.index}
              className="arch-card surface p-6 lg:p-8 group hover:border-[var(--accent-copper)] transition-colors duration-300 flex flex-col"
              style={{ minHeight: "320px" }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-sm text-[var(--accent-copper)]">
                  {c.index}
                </span>
                <span className="block w-6 h-px bg-[var(--border-strong)] group-hover:bg-[var(--accent-copper)] group-hover:w-10 transition-all duration-300" />
              </div>
              <h3
                className="font-serif text-[var(--text-primary)] mb-4"
                style={{ fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.2 }}
              >
                {c.title}
              </h3>
              <p
                className="text-[var(--text-secondary)] mb-6 flex-1"
                style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}
              >
                {c.body}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-muted)]"
                  >
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
