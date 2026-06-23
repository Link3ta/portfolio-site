"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LANGUAGES = [
  "Native Swedish",
  "Fluent English",
  "Professional Norwegian & Danish",
];

const EXPERIENCE = [
  {
    role: "Generative AI Engineer & System Architect",
    org: "repforce.ai / Independent Consultant",
    period: "Oct 2025 – Present · Oslo / Remote",
    points: [
      "Built Jira AI Factory: LLM orchestration over MCP, LangGraph, PostgreSQL checkpointing",
      "End-to-end Florida permit platform across 50+ county sources",
      "Scoped non-human agent identities at MCP boundaries",
    ],
  },
  {
    role: "System Architect Engineer",
    org: "Volvo Buses, Gothenburg",
    period: "Sep 2024 – Jan 2026",
    points: [
      "Safety-critical vehicle platforms (ISO 26262, UNECE R155/R156)",
      "FMEA, TARA, supplier integration",
    ],
  },
  {
    role: "Systems & Validation Engineer",
    org: "Volvo Buses, Gothenburg",
    period: "Jan 2023 – Aug 2024",
    points: [
      "ECU application software · SIL/HIL validation · Arctic field testing (−40°C)",
    ],
  },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.from(".about-headline .line", {
        yPercent: 100,
        opacity: 0,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".about-headline",
          start: "top 80%",
        },
      });

      gsap.from(".about-body p", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".about-body",
          start: "top 78%",
        },
      });

      gsap.from(".about-side > *", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".about-side",
          start: "top 80%",
        },
      });

      gsap.from(".exp-item", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".exp-list",
          start: "top 82%",
        },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-surface) 100%)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="label-caps mb-8 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-[var(--accent-copper)]" />
          About
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2
              className="about-headline font-serif text-[var(--text-primary)] leading-[1.05]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              <span className="line-mask block">
                <span className="line block">From safety-critical buses</span>
              </span>
              <span className="line-mask block">
                <span className="line block">
                  to production AI{" "}
                  <span className="text-[var(--accent-copper)]">in real estate.</span>
                </span>
              </span>
            </h2>

            <div className="about-body mt-10 space-y-6 text-[var(--text-secondary)] max-w-2xl">
              <p style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}>
                I&apos;m an{" "}
                <strong className="text-[var(--text-primary)] font-medium">
                  Applied AI Engineer based in Oslo
                </strong>
                , building production LLM products end to end — from APIs and
                data pipelines to agent orchestration and user-facing workflows.
                I design agentic systems (RAG, tool use, evaluation loops) and
                ship fullstack solutions that survive real-world failure modes:
                brittle extraction, cascading enrichment errors, anti-bot walls,
                and long-running human-in-the-loop approvals.
              </p>
              <p style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}>
                For the past{" "}
                <strong className="text-[var(--text-primary)] font-medium">
                  eight months
                </strong>
                , I&apos;ve worked hands-on with one of Gothenburg&apos;s top
                real estate agents — building bespoke staff portals, AI
                translation engines, MLS integrations, and owner-facing property
                management systems for{" "}
                <span className="text-[var(--accent-amber)]">Kian Estate</span>{" "}
                (luxury Marbella) and{" "}
                <span className="text-[var(--accent-amber)]">KE Stays</span>{" "}
                (vacation rentals). That proptech immersion sits alongside my
                independent work on a{" "}
                <span className="text-[var(--accent-amber)]">
                  Florida Lead Portal
                </span>{" "}
                — a Python/FastAPI platform scraping and enriching permits
                across 67 counties for actionable construction leads.
              </p>
              <p style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}>
                My background is{" "}
                <strong className="text-[var(--text-primary)] font-medium">
                  ISO 26262 / safety-critical systems at Volvo Buses
                </strong>{" "}
                — the same discipline I apply to AI quality: measurable
                outcomes, graceful degradation, and production observability.
              </p>
            </div>
          </div>

          <div className="about-side lg:col-span-5 space-y-8">
            <div className="surface p-6">
              <div className="label-caps mb-4">Languages</div>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1.5 text-sm rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] bg-[var(--bg-elevated)]"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="surface p-6">
              <div className="label-caps mb-4">Education</div>
              <div className="font-serif text-[var(--text-primary)] text-lg" style={{ fontWeight: 500 }}>
                Diploma, Mechatronics &amp; Automation
              </div>
              <div className="text-sm text-[var(--text-secondary)] mt-1">
                Yrkeshögskolan Halmstad · 2020–2022
              </div>
              <div className="text-sm text-[var(--text-muted)] mt-2">
                Embedded systems, control engineering, industrial automation
              </div>
            </div>

            <div className="surface p-6">
              <div className="label-caps mb-4">Currently</div>
              <div className="text-[var(--text-primary)] text-base">
                Exploring a{" "}
                <span className="text-[var(--accent-copper)]">
                  Generative AI Engineer
                </span>{" "}
                role with a proptech AI company in Oslo.
              </div>
              <div className="text-sm text-[var(--text-muted)] mt-2">
                Available via Ladda / Laddwho
              </div>
            </div>
          </div>
        </div>

        {/* Experience timeline */}
        <div className="mt-20">
          <div className="label-caps mb-8 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[var(--accent-copper)]" />
            Experience
          </div>
          <div className="exp-list space-y-0">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className="exp-item grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-6 border-t border-[var(--border-subtle)]"
              >
                <div className="md:col-span-4">
                  <div className="text-[var(--text-muted)] text-sm">
                    {exp.period}
                  </div>
                </div>
                <div className="md:col-span-8">
                  <div className="font-serif text-[var(--text-primary)] text-xl" style={{ fontWeight: 500 }}>
                    {exp.role}
                  </div>
                  <div className="text-[var(--accent-amber)] text-sm mt-1">
                    {exp.org}
                  </div>
                  <ul className="mt-3 space-y-1.5 text-[var(--text-secondary)] text-sm">
                    {exp.points.map((p, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-[var(--accent-copper)] mt-1.5 inline-block w-1 h-1 rounded-full bg-[var(--accent-copper)] shrink-0" />
                        <span style={{ lineHeight: 1.6 }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
