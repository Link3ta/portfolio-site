"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { MermaidDiagram } from "./mermaid-diagram";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface Screenshot {
  src: string;
  caption: string;
  alt: string;
}

export interface CaseStudyData {
  index: string;
  name: string;
  url: string;
  urlLabel: string;
  domain: string;
  role: string;
  duration: string;
  oneLiner: string;
  challenge: string;
  solution: string[];
  outcomes: string[];
  screenshots: Screenshot[];
  techTags: string[];
  mermaid: string;
  mermaidLabel: string;
  narrative: string;
  stats?: { value: string; label: string }[];
}

export function CaseStudy({ data }: { data: CaseStudyData }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      // Section label + headline line reveal
      gsap.from(".cs-label", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cs-label",
          start: "top 85%",
        },
      });

      gsap.from(".cs-name .line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".cs-name",
          start: "top 82%",
        },
      });

      gsap.from(".cs-oneliner", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cs-oneliner",
          start: "top 82%",
        },
      });

      gsap.from(".cs-meta-row > *", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".cs-meta-row",
          start: "top 85%",
        },
      });

      // Challenge / solution / outcomes
      gsap.from(".cs-section-block", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cs-section-block",
          start: "top 80%",
        },
      });

      // Stagger bullets
      gsap.from(".cs-bullet", {
        x: -12,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: ".cs-bullets",
          start: "top 82%",
        },
      });

      // Sticky screenshot parallax — desktop only, applies scale + slight y
      if (window.matchMedia("(min-width: 1024px)").matches) {
        const shotInner = gsap.utils.toArray<HTMLElement>(".cs-shot-inner");
        shotInner.forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.96, y: 20 },
            {
              scale: 1,
              y: -20,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest(".cs-shot-pin"),
                start: "top top+=80",
                end: "bottom bottom",
                scrub: 0.8,
              },
            },
          );
        });

        // Multi-screenshot carousel: crossfade between shots within a pinned frame
        const shots = gsap.utils.toArray<HTMLElement>(".cs-shot-slide");
        if (shots.length > 1) {
          shots.forEach((s, i) => {
            gsap.set(s, {
              opacity: i === 0 ? 1 : 0,
              zIndex: i === 0 ? 2 : 1,
            });
          });
          ScrollTrigger.create({
            trigger: ".cs-shot-pin",
            start: "top top+=80",
            end: "bottom bottom",
            scrub: 0.8,
            onUpdate: (self) => {
              const total = shots.length;
              const seg = 1 / total;
              shots.forEach((s, i) => {
                let opacity = 0;
                const center = (i + 0.5) * seg;
                const dist = Math.abs(self.progress - center);
                opacity = Math.max(0, 1 - dist / seg);
                gsap.set(s, { opacity, zIndex: opacity > 0.5 ? 3 : 1 });
              });
            },
          });
        }
      }

      // Mermaid fade in
      gsap.from(".cs-mermaid-block", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cs-mermaid-block",
          start: "top 80%",
        },
      });

      gsap.from(".cs-narrative", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cs-narrative",
          start: "top 82%",
        },
      });

      // Tech tags stagger
      gsap.from(".cs-tag", {
        y: 12,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: ".cs-tags",
          start: "top 85%",
        },
      });

      gsap.from(".cs-link", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cs-link",
          start: "top 88%",
        },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <article ref={ref} className="relative">
      {/* Header block */}
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 pt-24 md:pt-32">
        <div className="cs-label label-caps flex items-center gap-3 mb-6">
          <span className="text-[var(--accent-copper)] font-mono">{data.index}</span>
          <span className="inline-block w-8 h-px bg-[var(--accent-copper)]" />
          {data.domain}
        </div>

        <h3
          className="cs-name font-serif text-[var(--text-primary)] leading-[1.05] mb-6"
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="line-mask block">
            <span className="line block">{data.name}</span>
          </span>
        </h3>

        <p
          className="cs-oneliner text-[var(--text-secondary)] max-w-2xl"
          style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}
        >
          {data.oneLiner}
        </p>

        <div className="cs-meta-row mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[var(--text-muted)]">
          <span>
            <span className="text-[var(--text-muted)]">Role · </span>
            <span className="text-[var(--text-secondary)]">{data.role}</span>
          </span>
          <span>
            <span className="text-[var(--text-muted)]">Duration · </span>
            <span className="text-[var(--text-secondary)]">{data.duration}</span>
          </span>
        </div>
      </div>

      {/* Two-column: copy left, sticky screenshot right (desktop) */}
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 mt-12 lg:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Copy column */}
          <div className="lg:col-span-6 lg:order-1 order-2">
            <div className="cs-section-block mb-10">
              <div className="label-caps mb-3">Challenge</div>
              <p className="text-[var(--text-secondary)]" style={{ lineHeight: 1.75 }}>
                {data.challenge}
              </p>
            </div>

            <div className="cs-section-block mb-10">
              <div className="label-caps mb-3">Solution</div>
              <p className="text-[var(--text-secondary)] mb-4" style={{ lineHeight: 1.75 }}>
                {data.solution[0]}
              </p>
              <ul className="cs-bullets space-y-2.5">
                {data.solution.slice(1).map((s, i) => (
                  <li key={i} className="cs-bullet flex gap-3 text-[var(--text-secondary)]">
                    <span className="text-[var(--accent-copper)] mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-copper)] shrink-0" />
                    <span style={{ lineHeight: 1.7 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="cs-section-block">
              <div className="label-caps mb-3">Outcomes</div>
              <ul className="cs-bullets space-y-2.5">
                {data.outcomes.map((o, i) => (
                  <li key={i} className="cs-bullet flex gap-3 text-[var(--text-primary)]">
                    <span className="text-[var(--accent-amber)] mt-1.5 shrink-0">→</span>
                    <span style={{ lineHeight: 1.65 }}>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky screenshot column */}
          <div className="lg:col-span-6 lg:order-2 order-1">
            <div
              className="cs-shot-pin relative"
              style={{ minHeight: "60vh" }}
            >
              <div className="lg:sticky lg:top-24">
                <div className="cs-shot-inner relative">
                  {data.screenshots.length > 0 ? (
                    <div className="relative" style={{ minHeight: "320px" }}>
                      {data.screenshots.map((s, i) => (
                        <div
                          key={i}
                          className="cs-shot-slide shot-frame"
                          style={{
                            position:
                              data.screenshots.length > 1 ? "absolute" : "relative",
                            top: 0,
                            left: 0,
                            right: 0,
                          }}
                        >
                          <img
                            src={s.src}
                            alt={s.alt}
                            className="w-full h-auto block"
                            style={{ aspectRatio: "16 / 10", objectFit: "cover" }}
                          />
                          <div className="px-4 py-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                            <span className="text-xs text-[var(--text-secondary)] truncate">
                              {s.caption}
                            </span>
                            {data.screenshots.length > 1 && (
                              <span className="text-xs text-[var(--text-muted)] font-mono shrink-0">
                                {String(i + 1).padStart(2, "0")} /{" "}
                                {String(data.screenshots.length).padStart(2, "0")}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // No screenshot — stylized stats card (Florida Lead Portal)
                    <div className="shot-frame p-8">
                      <div className="label-caps mb-4">Pipeline at a glance</div>
                      <div className="grid grid-cols-2 gap-4">
                        {(data.stats ?? []).map((st, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
                          >
                            <div className="font-serif text-[var(--accent-copper)] text-2xl" style={{ fontWeight: 500 }}>
                              {st.value}
                            </div>
                            <div className="text-xs text-[var(--text-muted)] mt-1">
                              {st.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-sm text-[var(--text-secondary)]" style={{ lineHeight: 1.7 }}>
                        Daily cron-driven scraper feeds a Railway-hosted web
                        ops portal backed by Postgres. Staff review, contact, or
                        ignore leads; CSV products ship to buyers.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture diagram + narrative */}
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 mt-16 lg:mt-24">
        <div className="cs-mermaid-block">
          <MermaidDiagram chart={data.mermaid} label={data.mermaidLabel} />
        </div>
        <div className="cs-narrative surface p-6 lg:p-8 mt-6 max-w-4xl">
          <div className="label-caps mb-3">How it runs</div>
          <p className="text-[var(--text-secondary)]" style={{ lineHeight: 1.75 }}>
            {data.narrative}
          </p>
        </div>

        {/* Tech tags */}
        <div className="cs-tags mt-10">
          <div className="label-caps mb-4">Tech stack</div>
          <div className="flex flex-wrap gap-2">
            {data.techTags.map((t, i) => (
              <span key={i} className="cs-tag tech-tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* External link */}
        <div className="cs-link mt-10 pb-4">
          {data.url !== "zavian.ai" ? (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[var(--text-primary)] hover:text-[var(--accent-copper)] transition-colors"
            >
              <span className="font-serif text-lg" style={{ fontWeight: 500 }}>
                View live
              </span>
              <span className="text-[var(--accent-copper)] transition-transform group-hover:translate-x-1">
                ↗
              </span>
              <span className="text-[var(--text-muted)] text-sm font-mono">
                {data.urlLabel}
              </span>
            </a>
          ) : (
            <div className="text-[var(--text-muted)] text-sm">
              Reference · {data.urlLabel}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
