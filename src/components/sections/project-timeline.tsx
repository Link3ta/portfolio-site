"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLocale } from "@/lib/i18n/locale-provider";
import { ArrowUpRight, Building2, Database, MapPin, RefreshCw } from "lucide-react";
import { PROJECT_TIMELINE } from "./project-timeline-data";
import { ToolIconRow } from "@/components/portfolio/tool-icons";

const FLORIDA_SCOPE_ICONS = [MapPin, Database, RefreshCw] as const;

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ProjectTimeline() {
  const { t } = useLocale();
  const w = t.work;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.from(".tl-entry", {
        y: 32,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section id="work" ref={ref} className="relative py-20 md:py-28 bg-[var(--bg-base)]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="label-caps mb-6 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
          {w.label}
        </div>
        <h2
          className="font-serif text-[var(--text-primary)] leading-[1.05] mb-3 max-w-2xl"
          style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {w.titleBefore}
          <span className="text-[var(--accent-blue)]">{w.titleHighlight}</span>
        </h2>
        <p className="text-[var(--text-secondary)] max-w-xl mb-4" style={{ lineHeight: 1.7 }}>
          {w.sub}
        </p>

        <div className="mt-12">
          {PROJECT_TIMELINE.map((project) => {
            const copy = w.projects[project.id];
            const period = w.periods[project.id];

            return (
              <article key={project.id} className="tl-entry timeline-entry py-10 md:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="label-caps mb-3 text-[var(--text-muted)]">
                      {copy.category}
                    </div>

                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 mb-2"
                      >
                        <h3
                          className="font-serif text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors"
                          style={{
                            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                            fontWeight: 600,
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {project.name}
                        </h3>
                        <ArrowUpRight
                          size={18}
                          className="text-[var(--accent-blue)] opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    ) : (
                      <h3
                        className="font-serif text-[var(--text-primary)] mb-2"
                        style={{
                          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                          fontWeight: 600,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {project.name}
                      </h3>
                    )}

                    <div className="timeline-period mb-1">{period}</div>
                    <p
                      className="text-[var(--text-primary)] font-medium mb-4"
                      style={{ fontSize: "0.9375rem" }}
                    >
                      {copy.tagline}
                    </p>

                    <p
                      className="text-[var(--text-secondary)] mb-6"
                      style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}
                    >
                      {copy.description}
                    </p>

                    <div className="label-caps mb-3 text-[var(--text-muted)]">{w.scope}</div>
                    <ul className="space-y-2.5 mb-8">
                      {copy.highlights.map((h, hi) => {
                        const ScopeIcon =
                          project.id === "florida"
                            ? FLORIDA_SCOPE_ICONS[hi] ?? Building2
                            : null;
                        return (
                          <li
                            key={h}
                            className="flex gap-2.5 text-[var(--text-secondary)] text-sm"
                          >
                            {ScopeIcon ? (
                              <ScopeIcon
                                size={16}
                                className="text-[var(--accent-blue)] mt-0.5 shrink-0"
                              />
                            ) : (
                              <span className="text-[var(--accent-blue)] mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] shrink-0" />
                            )}
                            <span style={{ lineHeight: 1.65 }}>{h}</span>
                          </li>
                        );
                      })}
                    </ul>

                    {project.tools && project.tools.length > 0 && (
                      <>
                        <div className="label-caps mb-3 text-[var(--text-muted)]">
                          {w.builtWith}
                        </div>
                        <ToolIconRow tools={project.tools} showLabels={false} />
                      </>
                    )}

                    {project.urlLabel && (
                      <div className="mt-4 text-xs text-[var(--text-muted)] font-mono">
                        {project.urlLabel}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-7 order-1 lg:order-2">
                    {project.image ? (
                      <div className="shot-frame">
                        <img
                          src={project.image}
                          alt={copy.imageAlt ?? project.name}
                          className="w-full h-auto block"
                          style={{ aspectRatio: "16 / 10", objectFit: "cover" }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="shot-frame p-8">
                          <div className="label-caps mb-5">{w.pipelineGlance}</div>
                          <div className="grid grid-cols-2 gap-4">
                            {(project.stats ?? []).map((st) => (
                              <div
                                key={st.labelKey}
                                className="p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-soft)]"
                              >
                                <div
                                  className="font-serif text-[var(--accent-blue)] text-2xl"
                                  style={{ fontWeight: 600 }}
                                >
                                  {st.value}
                                </div>
                                <div className="text-xs text-[var(--text-muted)] mt-1">
                                  {copy.stats?.[st.labelKey]}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {project.countyImages && project.countyImages.length > 0 && (
                          <div className="hidden md:block">
                            <div className="label-caps mb-3 flex items-center gap-2">
                              <MapPin size={12} className="text-[var(--accent-blue)]" />
                              {w.countyCoverage}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                              {project.countyImages.map((c) => (
                                <div
                                  key={c.name}
                                  className="relative rounded-lg overflow-hidden border border-[var(--border-subtle)] aspect-[4/3] bg-[var(--bg-soft)]"
                                >
                                  <img
                                    src={c.src}
                                    alt={`${c.name}, ${w.countyState}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                  <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                      background:
                                        "linear-gradient(180deg, transparent 35%, rgba(15, 23, 42, 0.72) 100%)",
                                    }}
                                  />
                                  <div className="absolute bottom-2 left-2 right-2">
                                    <div className="text-white text-[11px] font-semibold leading-tight">
                                      {c.name}
                                    </div>
                                    <div className="text-white/70 text-[10px]">{w.countyState}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-[var(--text-muted)] mt-2.5">{w.countyNote}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
