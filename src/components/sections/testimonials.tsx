"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Quote, Star, Eye, ShieldCheck, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CALENDLY_URL = "https://calendly.com/anders-ljungstedt/intro";

interface Testimonial {
  // Cover: the neutral/teaser shown by default
  coverLabel: string;
  coverHint: string;
  coverOrg: string;
  // Content: revealed on hover
  quote: string;
  author: string;
  role: string;
  org: string;
  url?: string;
  urlLabel?: string;
  accent: "blue" | "teal";
}

const TESTIMONIALS: Testimonial[] = [
  {
    coverLabel: "Reference available upon request",
    coverHint: "Hover to reveal",
    coverOrg: "Backman Fast · Gothenburg",
    quote:
      "Anders shipped a staff portal and AI translation engine that changed how our team works across Marbella, Gothenburg, and six language markets. Listings that used to take a full day of manual copy now publish themselves — with quality gates our agents actually trust. He works like an engineer who understands brokerage, not a contractor who needs briefing.",
    author: "Elton",
    role: "Senior Real Estate Agent",
    org: "Backman Fast",
    url: "https://www.backmanfast.se/",
    urlLabel: "backmanfast.se",
    accent: "blue",
  },
  {
    coverLabel: "Reference available upon request",
    coverHint: "Hover to reveal",
    coverOrg: "repforce.ai · AI Factory",
    quote:
      "Anders built our Jira AI Factory on LangGraph and MCP with PostgreSQL checkpointing — agents that pause for human approval in Slack and resume without holding compute. The architecture is the cleanest agent orchestration I've seen shipped to production. He treats failure modes as first-class citizens, not edge cases. Any proptech AI team hiring him is getting a senior engineer on day one.",
    author: "repforce.ai",
    role: "Leadership",
    org: "repforce.ai",
    url: undefined,
    urlLabel: undefined,
    accent: "teal",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.from(".ts-headline .line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".ts-headline", start: "top 82%" },
      });

      gsap.from(".ts-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".ts-grid", start: "top 80%" },
      });

      gsap.from(".ts-refs", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ts-refs", start: "top 85%" },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 md:py-32 bg-[var(--bg-base)]"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="label-caps mb-8 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
          Testimonials
        </div>

        <h2
          className="ts-headline font-serif text-[var(--text-primary)] leading-[1.05] mb-6 max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="line-mask block">
            <span className="line block">
              What partners say —{" "}
              <span className="text-[var(--accent-blue)]">on the record.</span>
            </span>
          </span>
        </h2>

        <p
          className="ts-refs text-[var(--text-secondary)] max-w-2xl mb-12 flex items-center gap-2 flex-wrap"
          style={{ lineHeight: 1.7 }}
        >
          <ShieldCheck size={16} className="text-[var(--accent-teal)]" />
          References available upon request. Hover a card to reveal the full
          testimonial.
        </p>

        <div className="ts-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={i}
              className="ts-card reveal-card"
              style={{ minHeight: "340px" }}
            >
              {/* Cover — shown by default */}
              <div className="reveal-cover">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                  style={{
                    background:
                      t.accent === "blue"
                        ? "linear-gradient(135deg, var(--accent-blue) 0%, #4F46E5 100%)"
                        : "linear-gradient(135deg, var(--accent-teal) 0%, #0EA5E9 100%)",
                  }}
                >
                  <Eye size={24} className="text-white" />
                </div>
                <div className="text-[var(--text-primary)] font-serif text-xl text-center" style={{ fontWeight: 600 }}>
                  {t.coverLabel}
                </div>
                <div className="text-[var(--text-muted)] text-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] animate-pulse" />
                  {t.coverHint}
                </div>
                <div className="mt-3 text-[var(--text-secondary)] text-xs font-mono">
                  {t.coverOrg}
                </div>
              </div>

              {/* Content — revealed on hover */}
              <div className="reveal-content flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star
                        key={s}
                        size={15}
                        className="text-[var(--accent-amber)]"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <Quote
                    size={28}
                    className="text-[var(--border-strong)]"
                    fill="currentColor"
                  />
                </div>

                <blockquote
                  className="text-[var(--text-primary)] flex-1"
                  style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center justify-between gap-4 pt-5 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-serif text-white text-lg"
                      style={{
                        background:
                          t.accent === "blue"
                            ? "linear-gradient(135deg, var(--accent-blue) 0%, #4F46E5 100%)"
                            : "linear-gradient(135deg, var(--accent-teal) 0%, #0EA5E9 100%)",
                        fontWeight: 600,
                      }}
                      aria-hidden
                    >
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[var(--text-primary)] font-semibold text-sm">
                        {t.author}
                      </div>
                      <div className="text-[var(--text-muted)] text-xs">
                        {t.role} · {t.org}
                      </div>
                    </div>
                  </div>
                  {t.url && (
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent-blue)] text-xs font-mono inline-flex items-center gap-1 hover:underline"
                    >
                      {t.urlLabel}
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA strip */}
        <div className="ts-refs mt-12 surface-soft p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="font-serif text-[var(--text-primary)] text-xl" style={{ fontWeight: 600 }}>
              Want a deeper reference?
            </div>
            <div className="text-[var(--text-secondary)] text-sm mt-1">
              Full references from Backman Fast, repforce.ai, and prior Volvo
              Buses engagements available on request.
            </div>
          </div>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-blue shrink-0">
            Request references
          </a>
        </div>
      </div>
    </section>
  );
}
