"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLocale } from "@/lib/i18n/locale-provider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function CapabilityCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="trust-strip-card shrink-0">
      <h3
        className="font-serif text-[var(--text-primary)] text-base mb-2"
        style={{ fontWeight: 600 }}
      >
        {title}
      </h3>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{description}</p>
    </article>
  );
}

export function Skills() {
  const { t } = useLocale();
  const s = t.skills;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const items = [...s.capabilities, ...s.capabilities];

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

      gsap.from(".trust-strip-wrap", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trust-strip-wrap", start: "top 85%" },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 md:py-32 bg-[var(--bg-base)] overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 mb-12">
        <div className="label-caps mb-8 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
          {s.label}
        </div>

        <h2
          className="skills-headline font-serif text-[var(--text-primary)] leading-[1.12] max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="line-mask line-mask-descenders block">
            <span className="line block">
              {s.titleBefore}
              <span className="text-[var(--accent-blue)]">{s.titleHighlight}</span>
              {s.titleAfter}
            </span>
          </span>
        </h2>
      </div>

      <div className={`trust-strip-wrap relative ${reduced ? "" : "trust-strip-mask"}`}>
        <div
          className={`trust-strip-track ${reduced ? "trust-strip-static" : ""}`}
          aria-label={s.carouselAria}
        >
          {items.map((c, i) => (
            <CapabilityCard key={`${c.title}-${i}`} title={c.title} description={c.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
