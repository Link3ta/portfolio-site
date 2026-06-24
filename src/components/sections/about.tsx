"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLocale } from "@/lib/i18n/locale-provider";

import { SpecialtyTrajectoryChart } from "@/components/sections/specialty-trajectory-chart";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function About() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.from(".about-block", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 md:py-20 bg-[var(--bg-soft)] border-y border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="about-block grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="label-caps mb-4 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
              {t.about.label}
            </div>
            <p
              className="text-[var(--text-secondary)] max-w-2xl"
              style={{ fontSize: "1.0625rem", lineHeight: 1.8 }}
            >
              {t.about.p1Before}
              <strong className="text-[var(--text-primary)] font-semibold">
                {t.about.p1Role}
              </strong>
              {t.about.p1After}
            </p>
            <p
              className="text-[var(--text-secondary)] max-w-2xl mt-5"
              style={{ fontSize: "1.0625rem", lineHeight: 1.8 }}
            >
              {t.about.p2Before}
              <span className="text-[var(--accent-blue)] font-medium">Kian Estate</span>{" "}
              {t.about.p2And}{" "}
              <span className="text-[var(--accent-blue)] font-medium">KE Stays</span>
              {t.about.p2After}
            </p>
          </div>

          <div className="about-block lg:col-span-5 min-w-0">
            <div className="surface-glow p-5">
              <div className="label-caps mb-3">{t.about.currently}</div>
              <p className="text-[var(--text-primary)] text-sm leading-relaxed">
                {t.about.currentlyBefore}
                <span className="text-[var(--accent-blue)] font-semibold">
                  {t.about.currentlyHighlight}
                </span>
                {t.about.currentlyAfter}
              </p>
              <p className="text-[var(--text-muted)] text-xs mt-2">
                {t.about.currentlyFooter}
              </p>
            </div>
            <SpecialtyTrajectoryChart />
          </div>
        </div>
      </div>
    </section>
  );
}
