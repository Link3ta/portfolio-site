"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLocale } from "@/lib/i18n/locale-provider";
import { Quote, Star, Eye, ShieldCheck, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import { CALENDLY_URL } from "@/lib/site";

const TESTIMONIAL_URLS = [
  { url: "https://www.backmanfast.se/", urlLabel: "backmanfast.se", accent: "blue" as const },
  { url: undefined, urlLabel: undefined, accent: "teal" as const },
];

export function Testimonials() {
  const { t } = useLocale();
  const ts = t.testimonials;
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
          {ts.label}
        </div>

        <h2
          className="ts-headline font-serif text-[var(--text-primary)] leading-[1.05] mb-6 max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="line-mask line-mask-descenders block">
            <span className="line block">
              {ts.titleBefore}
              <span className="text-[var(--accent-blue)]">{ts.titleHighlight}</span>
            </span>
          </span>
        </h2>

        <p
          className="ts-refs text-[var(--text-secondary)] max-w-2xl mb-12 flex items-center gap-2 flex-wrap"
          style={{ lineHeight: 1.7 }}
        >
          <ShieldCheck size={16} className="text-[var(--accent-teal)]" />
          {ts.refsNote}
        </p>

        <div className="ts-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {ts.items.map((item, i) => {
            const meta = TESTIMONIAL_URLS[i];
            return (
              <article
                key={i}
                className="ts-card reveal-card"
                style={{ minHeight: "340px" }}
              >
                <div className="reveal-cover">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                    style={{
                      background:
                        meta.accent === "blue"
                          ? "linear-gradient(135deg, var(--accent-blue) 0%, #4F46E5 100%)"
                          : "linear-gradient(135deg, var(--accent-teal) 0%, #0EA5E9 100%)",
                    }}
                  >
                    <Eye size={24} className="text-white" />
                  </div>
                  <div
                    className="text-[var(--text-primary)] font-serif text-xl text-center"
                    style={{ fontWeight: 600 }}
                  >
                    {item.coverLabel}
                  </div>
                  <div className="text-[var(--text-muted)] text-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] animate-pulse" />
                    {item.coverHint}
                  </div>
                  <div className="mt-3 text-[var(--text-secondary)] text-xs font-mono">
                    {item.coverOrg}
                  </div>
                </div>

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
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <div className="mt-6 flex items-center justify-between gap-4 pt-5 border-t border-[var(--border-subtle)]">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center font-serif text-white text-lg"
                        style={{
                          background:
                            meta.accent === "blue"
                              ? "linear-gradient(135deg, var(--accent-blue) 0%, #4F46E5 100%)"
                              : "linear-gradient(135deg, var(--accent-teal) 0%, #0EA5E9 100%)",
                          fontWeight: 600,
                        }}
                        aria-hidden
                      >
                        {item.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[var(--text-primary)] font-semibold text-sm">
                          {item.author}
                        </div>
                        <div className="text-[var(--text-muted)] text-xs">
                          {item.role} · {item.org}
                        </div>
                      </div>
                    </div>
                    {meta.url && (
                      <a
                        href={meta.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent-blue)] text-xs font-mono inline-flex items-center gap-1 hover:underline"
                      >
                        {meta.urlLabel}
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="ts-refs mt-12 surface-soft p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="font-serif text-[var(--text-primary)] text-xl" style={{ fontWeight: 600 }}>
              {ts.ctaTitle}
            </div>
            <div className="text-[var(--text-secondary)] text-sm mt-1">{ts.ctaBody}</div>
          </div>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-blue shrink-0">
            {ts.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
