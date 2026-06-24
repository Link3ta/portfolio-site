"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLocale } from "@/lib/i18n/locale-provider";
import { Mail, Linkedin, ArrowUpRight, Clock, Video } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import { CALENDLY_URL, EMAIL, LINKEDIN, PHONE_DISPLAY } from "@/lib/site";

export function Contact() {
  const { t } = useLocale();
  const c = t.contact;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.from(".contact-headline .line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".contact-headline", start: "top 82%" },
      });

      gsap.from(".contact-body", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-body", start: "top 82%" },
      });

      gsap.from(".contact-bar", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-bar", start: "top 85%" },
      });

      gsap.to(".contact-glow", {
        scale: 1.2,
        opacity: 0.6,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-36 overflow-hidden bg-[var(--bg-soft)]"
    >
      <div
        className="contact-glow glow-blob"
        aria-hidden
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(37, 99, 235, 0.05) 40%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1000px] px-6 lg:px-10 text-center">
        <div className="label-caps mb-8 flex items-center justify-center gap-3">
          <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
          {c.label}
          <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
        </div>

        <h2
          className="contact-headline font-serif text-[var(--text-primary)] leading-[1.12] mb-8"
          style={{
            fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="line-mask line-mask-descenders block">
            <span className="line block">{c.line1}</span>
          </span>
          <span className="line-mask line-mask-descenders block">
            <span className="line block">
              <span className="text-[var(--accent-blue)]">{c.line2Highlight}</span>
              {c.line2After}
            </span>
          </span>
        </h2>

        <p
          className="contact-body text-[var(--text-secondary)] max-w-xl mx-auto"
          style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}
        >
          {c.bodyBefore}
          <strong className="text-[var(--text-primary)] font-semibold">{c.bodyCity}</strong>
          {c.bodyMid}
          <strong className="text-[var(--text-primary)] font-semibold">{c.bodyRole}</strong>
          {c.bodyAfter}
        </p>

        <div className="contact-card contact-bar mt-12 booking-card max-w-2xl mx-auto p-5 flex items-center gap-4 text-left">
          <div
            className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--accent-blue) 0%, #4F46E5 100%)",
            }}
          >
            <Video size={22} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[var(--text-primary)] font-semibold text-sm">{c.meetTitle}</div>
            <div className="text-[var(--text-muted)] text-xs flex items-center gap-1.5 mt-0.5">
              <Clock size={12} />
              {c.meetDuration}
            </div>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-blue shrink-0"
            style={{ padding: "0.55rem 1.1rem", minHeight: 40 }}
          >
            {c.bookNow}
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors"
          >
            <Mail size={15} />
            {EMAIL}
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors"
          >
            <Linkedin size={15} />
            LinkedIn
          </a>
        </div>

        <div className="mt-8 text-sm text-[var(--text-muted)]">
          {PHONE_DISPLAY} · {c.footerNote}
        </div>
      </div>
    </section>
  );
}
