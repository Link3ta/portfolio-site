"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Calendar, Video, Clock, ArrowRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CALENDLY_URL = "https://calendly.com/anders-ljungstedt/intro";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set(".hero-line-inner", { y: 0, opacity: 1 });
        gsap.set(".hero-sub, .hero-meta, .hero-ctas, .hero-portrait, .hero-booking", {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8 })
        .from(
          ".hero-line-inner",
          { yPercent: 110, opacity: 0, duration: 1.2, stagger: 0.1 },
          "-=0.4",
        )
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".hero-meta", { y: 16, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(
          ".hero-ctas > *",
          { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 },
          "-=0.4",
        )
        .from(
          ".hero-side > *",
          { y: 40, opacity: 0, duration: 1.0, stagger: 0.15, ease: "power3.out" },
          "-=0.9",
        );

      // Glow pulse
      gsap.to(".hero-glow", {
        scale: 1.15,
        opacity: 0.7,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax fade on scroll
      gsap.to(".hero-content", {
        y: -60,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to(".hero-portrait-img", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
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
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />
      <div
        className="hero-glow glow-blob"
        aria-hidden
        style={{
          top: "-10%",
          right: "-5%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(37, 99, 235, 0.08) 40%, transparent 70%)",
        }}
      />
      <div
        className="glow-blob"
        aria-hidden
        style={{
          bottom: "-15%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(13, 148, 136, 0.18) 0%, transparent 70%)",
          opacity: 0.6,
        }}
      />

      <div className="hero-content relative mx-auto max-w-[1200px] w-full px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: name + headline + CTAs */}
          <div className="lg:col-span-7">
            <div className="hero-eyebrow label-caps mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
              Applied AI Engineer · Oslo
            </div>

            {/* Name — prominent */}
            <div className="hero-name mb-2">
              <h2
                className="font-serif text-[var(--text-primary)] leading-none"
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                Anders Ljungstedt
              </h2>
            </div>

            {/* Headline */}
            <h1
              className="font-serif text-[var(--text-primary)] leading-[0.98] tracking-tight mt-2"
              style={{
                fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              <span className="line-mask block">
                <span className="hero-line-inner line-inner block">Applied AI</span>
              </span>
              <span className="line-mask block">
                <span className="hero-line-inner line-inner block">
                  for{" "}
                  <span className="text-[var(--accent-blue)]">Proptech</span>
                </span>
              </span>
              <span className="line-mask block">
                <span className="hero-line-inner line-inner block">
                  that ships.
                </span>
              </span>
            </h1>

            <p
              className="hero-sub mt-8 max-w-xl text-[var(--text-secondary)]"
              style={{ fontSize: "clamp(1rem, 1.3vw, 1.2rem)", lineHeight: 1.7 }}
            >
              Luxury real estate portals, vacation-rental operations, and
              multi-county permit intelligence — built end to end with LLMs,
              agents, and production-grade data pipelines.
            </p>

            <div className="hero-meta mt-6 flex items-center gap-3 text-sm text-[var(--text-muted)] flex-wrap">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] inline-block" />
                Available · Oslo
              </span>
              <span className="text-[var(--border-strong)]">·</span>
              <span>zavian.ai</span>
              <span className="text-[var(--border-strong)]">·</span>
              <span>8 months proptech craft</span>
            </div>

            <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-blue"
              >
                <Calendar size={18} />
                Book a meeting with me today
              </a>
              <button onClick={() => scrollTo("#work")} className="btn-ghost">
                View case studies
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right: portrait + booking card */}
          <div className="hero-side lg:col-span-5 flex flex-col gap-6">
            {/* Portrait — forest photo, girlfriend removed */}
            <div className="hero-portrait relative">
              <div
                className="relative rounded-2xl overflow-hidden border border-[var(--border-subtle)]"
                style={{
                  boxShadow: "var(--shadow-elevated)",
                  aspectRatio: "4 / 5",
                }}
              >
                <img
                  src="/assets/anders-portrait.png"
                  alt="Anders Ljungstedt portrait"
                  className="hero-portrait-img w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(15, 23, 42, 0.35) 100%)",
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <div className="text-white font-serif text-lg" style={{ fontWeight: 600 }}>
                      Anders Ljungstedt
                    </div>
                    <div className="text-white/80 text-xs">
                      Applied AI Engineer · Oslo
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
                    Available
                  </span>
                </div>
              </div>
            </div>

            {/* Booking card — Teams/Calendly style */}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-booking booking-card p-5 flex items-center gap-4 group hover:border-[var(--accent-blue)] transition-colors"
              style={{ textDecoration: "none" }}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-blue) 0%, #4F46E5 100%)",
                  }}
                >
                  <Video size={22} className="text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-[var(--text-primary)] font-semibold text-sm">
                    Intro call · 30 min
                  </div>
                  <div className="text-[var(--text-muted)] text-xs flex items-center gap-1.5 mt-0.5">
                    <Clock size={12} />
                    Google Meet / Teams · Oslo time
                  </div>
                </div>
              </div>
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-[var(--accent-blue)] text-white group-hover:translate-x-0.5 transition-transform"
                aria-hidden
              >
                <ArrowRight size={16} />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]">
        <span className="label-caps text-[10px]">Scroll</span>
        <span className="block w-px h-10 bg-gradient-to-b from-[var(--accent-blue)] to-transparent" />
      </div>
    </section>
  );
}
