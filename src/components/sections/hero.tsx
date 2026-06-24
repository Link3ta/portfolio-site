"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ArrowLeft, ArrowRight, Linkedin, MicOff, Phone, Video, Volume2 } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import { CALENDLY_URL, LINKEDIN, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { useLocale } from "@/lib/i18n/locale-provider";

export function Hero() {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [portraitOk, setPortraitOk] = useState(true);

  useGSAP(
    () => {
      if (reduced) {
        gsap.set(".hero-line-inner, .hero-sub, .hero-ctas, .hero-phone-wrap", {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(
        ".hero-line-inner",
        { yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.1 },
        0,
      )
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-ctas > *", { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(
          ".hero-phone-wrap",
          { y: 40, opacity: 0, duration: 1.0, ease: "power3.out" },
          "-=0.7",
        );

      gsap.to(".hero-glow", {
        scale: 1.12,
        opacity: 0.65,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef, dependencies: [reduced] },
  );

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 pb-16"
    >
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden />

      {/* Ambient real estate photography — Marbella left, Florida right */}
      <div className="hero-re-bg" aria-hidden>
        <div className="hero-re-cluster hero-re-cluster-left">
          <img src="/assets/hero-real-estate.jpg" alt="" className="hero-re-tile hero-re-tile-a" />
          <img src="/assets/hero-marbella-villa.jpg" alt="" className="hero-re-tile hero-re-tile-b" />
          <img src="/assets/hero-marbella-estate.jpg" alt="" className="hero-re-tile hero-re-tile-c" />
        </div>
        <div className="hero-re-cluster hero-re-cluster-right">
          <img src="/assets/hero-florida-miami.jpg" alt="" className="hero-re-tile hero-re-tile-d" />
          <img src="/assets/hero-florida-downtown.jpg" alt="" className="hero-re-tile hero-re-tile-e" />
          <img src="/assets/hero-florida-tampa.jpg" alt="" className="hero-re-tile hero-re-tile-f" />
        </div>
        <div className="hero-re-bg-wash" />
      </div>

      <div
        className="hero-glow glow-blob"
        aria-hidden
        style={{
          top: "-10%",
          right: "5%",
          width: "520px",
          height: "520px",
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, rgba(37, 99, 235, 0.06) 45%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] w-full px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-7 relative z-[1]">
            <p className="label-caps mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
              {t.hero.label}
            </p>

            <h1
              className="font-serif text-[var(--text-primary)] leading-[0.98] tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              <span className="line-mask block">
                <span className="hero-line-inner line-inner block">{t.hero.line1}</span>
              </span>
              <span className="line-mask block">
                <span className="hero-line-inner line-inner block">
                  {t.hero.line2Before}
                  <span className="text-[var(--accent-blue)]">{t.hero.line2Highlight}</span>
                  {t.hero.line2After}
                </span>
              </span>
            </h1>

            <p
              className="hero-sub mt-6 max-w-xl text-[var(--text-secondary)]"
              style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)", lineHeight: 1.75 }}
            >
              {t.hero.sub}
            </p>

            <div className="hero-ctas mt-8 flex flex-wrap items-center gap-3">
              <button onClick={() => scrollTo("#work")} className="btn-blue">
                {t.hero.viewProjects}
                <ArrowRight size={16} />
              </button>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right — Teams-style phone */}
          <div className="hero-phone-wrap lg:col-span-5 flex justify-center lg:justify-end relative z-[1]">
            <div className="iphone-device" aria-label={t.hero.phoneAria}>
              <span className="iphone-side-btn iphone-side-silent" aria-hidden />
              <span className="iphone-side-btn iphone-side-vol-up" aria-hidden />
              <span className="iphone-side-btn iphone-side-vol-down" aria-hidden />
              <span className="iphone-side-btn iphone-side-power" aria-hidden />

              <div className="iphone-frame">
                <div className="iphone-bezel">
                  <div className="iphone-status-bar" aria-hidden>
                    <span className="iphone-time">9:41</span>
                    <div className="iphone-dynamic-island">
                      <span className="iphone-island-cam" />
                    </div>
                    <div className="iphone-status-icons">
                      <span className="iphone-signal" />
                      <span className="iphone-wifi" />
                      <span className="iphone-battery" />
                    </div>
                  </div>

                  <div className="hero-phone-screen">
                    <div className="hero-phone-header">
                      <ArrowLeft size={18} className="opacity-80" aria-hidden />
                      <span>{t.hero.phoneMeeting}</span>
                    </div>

                    <div className="hero-phone-preview">
                      {portraitOk ? (
                        <img
                          src="/assets/anders-portrait.png"
                          alt="Anders Ljungstedt"
                          onError={() => setPortraitOk(false)}
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center bg-[#1e293b] text-[#c8c4ef] font-serif"
                          style={{ fontSize: "2.5rem", fontWeight: 600 }}
                        >
                          AL
                        </div>
                      )}
                      <div className="hero-phone-preview-fade" aria-hidden />
                      <div className="hero-phone-controls" aria-hidden>
                        <div className="hero-phone-control">
                          <span className="hero-phone-control-icon">
                            <Video size={16} />
                          </span>
                          {t.hero.phoneVideoOn}
                        </div>
                        <div className="hero-phone-control">
                          <span className="hero-phone-control-icon">
                            <MicOff size={16} />
                          </span>
                          {t.hero.phoneMicOff}
                        </div>
                        <div className="hero-phone-control">
                          <span className="hero-phone-control-icon">
                            <Volume2 size={16} />
                          </span>
                          {t.hero.phoneSpeaker}
                        </div>
                      </div>
                    </div>

                    <div className="hero-phone-body">
                      <div className="hero-phone-name">Anders Ljungstedt</div>

                      <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-phone-btn-primary"
                      >
                        {t.hero.phoneBookNow}
                      </a>

                      <a href={PHONE_TEL} className="hero-phone-btn-secondary">
                        <Phone size={16} className="shrink-0" />
                        {t.hero.phoneCall} {PHONE_DISPLAY}
                      </a>

                      <a
                        href={LINKEDIN}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-phone-privacy"
                      >
                        {t.hero.phoneLinkedIn}
                      </a>
                    </div>
                  </div>

                  <div className="iphone-home-indicator" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
