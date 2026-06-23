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
      "Defined electric bus E/E architecture — battery, drivetrain, ECU network, CAN bus, ADAS",
      "FMEA, TARA, supplier integration",
    ],
    image: "/assets/bus-architecture.png",
    imageAlt:
      "Futuristic electric bus system architecture — battery, drivetrain, ECU network, CAN bus",
    imageCaption: "Electric bus E/E architecture — battery, drivetrain, ECU network, CAN bus, ADAS",
  },
  {
    role: "Systems & Validation Engineer",
    org: "Volvo Buses, Gothenburg",
    period: "Jan 2023 – Aug 2024",
    points: [
      "ECU application software · SIL/HIL validation",
      "Arctic winter field testing (−40°C) on the road to Kebnekaise, Kiruna",
    ],
    image: "/assets/kiruna-bus-test.png",
    imageAlt:
      "Electric bus winter-tested on the snowy road to Kebnekaise, Kiruna, northern Sweden",
    imageCaption:
      "Winter field test — road to Kebnekaise, Kiruna. Real-world validation at −40°C.",
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
        scrollTrigger: { trigger: ".about-headline", start: "top 80%" },
      });

      gsap.from(".about-body p", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".about-body", start: "top 78%" },
      });

      gsap.from(".about-side > *", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".about-side", start: "top 80%" },
      });

      gsap.from(".exp-item", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".exp-list", start: "top 82%" },
      });

      gsap.from(".exp-image", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-image", start: "top 85%" },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 bg-[var(--bg-soft)]"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="label-caps mb-8 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
          About
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2
              className="about-headline font-serif text-[var(--text-primary)] leading-[1.05]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              <span className="line-mask block">
                <span className="line block">From safety-critical buses</span>
              </span>
              <span className="line-mask block">
                <span className="line block">
                  to production AI{" "}
                  <span className="text-[var(--accent-blue)]">in real estate.</span>
                </span>
              </span>
            </h2>

            <div className="about-body mt-10 space-y-6 text-[var(--text-secondary)] max-w-2xl">
              <p style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}>
                I&apos;m an{" "}
                <strong className="text-[var(--text-primary)] font-semibold">
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
                <strong className="text-[var(--text-primary)] font-semibold">
                  eight months
                </strong>
                , I&apos;ve worked hands-on with one of Gothenburg&apos;s top
                real estate agents — building bespoke staff portals, AI
                translation engines, MLS integrations, and owner-facing property
                management systems for{" "}
                <span className="text-[var(--accent-blue)] font-medium">Kian Estate</span>{" "}
                (luxury Marbella) and{" "}
                <span className="text-[var(--accent-blue)] font-medium">KE Stays</span>{" "}
                (vacation rentals). That proptech immersion sits alongside my
                independent work on a{" "}
                <span className="text-[var(--accent-blue)] font-medium">
                  Florida Lead Portal
                </span>{" "}
                — a Python/FastAPI platform scraping and enriching permits
                across 67 counties for actionable construction leads.
              </p>
              <p style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}>
                My background is{" "}
                <strong className="text-[var(--text-primary)] font-semibold">
                  ISO 26262 / safety-critical systems at Volvo Buses
                </strong>{" "}
                — the same discipline I apply to AI quality: measurable
                outcomes, graceful degradation, and production observability.
              </p>
            </div>
          </div>

          <div className="about-side lg:col-span-5 space-y-6">
            <div className="surface p-6">
              <div className="label-caps mb-4">Languages</div>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1.5 text-sm rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] bg-[var(--bg-soft)]"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="surface p-6">
              <div className="label-caps mb-4">Education</div>
              <div
                className="font-serif text-[var(--text-primary)] text-lg"
                style={{ fontWeight: 600 }}
              >
                Diploma, Mechatronics &amp; Automation
              </div>
              <div className="text-sm text-[var(--text-secondary)] mt-1">
                Yrkeshögskolan Halmstad · 2020–2022
              </div>
              <div className="text-sm text-[var(--text-muted)] mt-2">
                Embedded systems, control engineering, industrial automation
              </div>
            </div>

            <div className="surface-glow p-6">
              <div className="label-caps mb-4">Currently</div>
              <div className="text-[var(--text-primary)] text-base">
                Exploring a{" "}
                <span className="text-[var(--accent-blue)] font-semibold">
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

        {/* Experience timeline with imagery */}
        <div className="mt-20">
          <div className="label-caps mb-8 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
            Experience
          </div>
          <div className="exp-list space-y-0">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className="exp-item grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-[var(--border-subtle)]"
              >
                <div className="md:col-span-4">
                  <div className="text-[var(--accent-blue)] text-sm font-mono font-medium">
                    {exp.period}
                  </div>
                  <div
                    className="font-serif text-[var(--text-primary)] text-xl mt-2"
                    style={{ fontWeight: 600 }}
                  >
                    {exp.role}
                  </div>
                  <div className="text-[var(--text-secondary)] text-sm mt-1">
                    {exp.org}
                  </div>
                </div>
                <div className="md:col-span-8">
                  <ul className="space-y-2 text-[var(--text-secondary)] text-sm mb-0">
                    {exp.points.map((p, j) => (
                      <li key={j} className="flex gap-2.5">
                        <span className="text-[var(--accent-blue)] mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] shrink-0" />
                        <span style={{ lineHeight: 1.65 }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.image && (
                    <figure className="exp-image mt-5">
                      <div className="shot-frame">
                        <img
                          src={exp.image}
                          alt={exp.imageAlt}
                          className="w-full h-auto block"
                          style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                        />
                        <figcaption className="px-4 py-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                          {exp.imageCaption}
                        </figcaption>
                      </div>
                    </figure>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
