"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HEADLINE_LINES = ["Applied AI", "for Proptech", "that ships."];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set(".hero-line-inner", { y: 0, opacity: 1 });
        gsap.set(".hero-sub, .hero-meta, .hero-ctas, .hero-glow", {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-line-inner",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
          },
          "-=0.4",
        )
        .from(
          ".hero-sub",
          {
            y: 24,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.5",
        )
        .from(
          ".hero-meta",
          {
            y: 16,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          ".hero-ctas > *",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.4",
        );

      // Glow pulse
      gsap.to(".hero-glow", {
        scale: 1.15,
        opacity: 0.85,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax fade on scroll
      gsap.to(".hero-content", {
        y: -80,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: containerRef, dependencies: [reduced] },
  );

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background grid + grain */}
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="grain" aria-hidden />

      {/* Copper radial glow */}
      <div
        className="hero-glow absolute pointer-events-none"
        aria-hidden
        style={{
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "900px",
          maxWidth: "120vw",
          maxHeight: "120vw",
          background:
            "radial-gradient(circle, var(--accent-glow-strong) 0%, var(--accent-glow) 30%, transparent 65%)",
          opacity: 0.6,
          filter: "blur(20px)",
        }}
      />

      <div className="hero-content relative mx-auto max-w-[1200px] w-full px-6 lg:px-10 pt-24 pb-20">
        <div className="hero-eyebrow label-caps mb-8 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-[var(--accent-copper)]" />
          Applied AI Engineer · Oslo
        </div>

        <h1
          className="font-serif text-[var(--text-primary)] leading-[0.95] tracking-tight"
          style={{
            fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          {HEADLINE_LINES.map((line, i) => (
            <span key={i} className="line-mask block">
              <span className="hero-line-inner line-inner block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="hero-sub mt-8 max-w-2xl text-[var(--text-secondary)]"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.7 }}
        >
          Luxury real estate portals, vacation-rental operations, and
          multi-county permit intelligence — built end to end with LLMs, agents,
          and production-grade data pipelines.
        </p>

        <div className="hero-meta mt-6 flex items-center gap-3 text-sm text-[var(--text-muted)] flex-wrap">
          <span>Oslo</span>
          <span className="text-[var(--accent-copper)]">·</span>
          <span>zavian.ai</span>
          <span className="text-[var(--accent-copper)]">·</span>
          <span>8 months proptech craft with a top Gothenburg agent</span>
        </div>

        <div className="hero-ctas mt-12 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollTo("#work")}
            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--accent-copper)] text-[#0B0F14] font-medium rounded-md hover:bg-[var(--accent-amber)] transition-colors"
            style={{ minHeight: 44 }}
          >
            View case studies
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 px-6 py-3.5 border border-[var(--border-strong)] text-[var(--text-primary)] font-medium rounded-md hover:border-[var(--accent-copper)] hover:text-[var(--accent-copper)] transition-colors"
            style={{ minHeight: 44 }}
          >
            Contact
          </button>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]">
        <span className="label-caps text-[10px]">Scroll</span>
        <span className="block w-px h-10 bg-gradient-to-b from-[var(--accent-copper)] to-transparent" />
      </div>
    </section>
  );
}
