"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EMAIL = "anders.ljungstedt1@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/anders-ljungstedt-7a1723176/";

export function Contact() {
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
        scrollTrigger: {
          trigger: ".contact-headline",
          start: "top 82%",
        },
      });

      gsap.from(".contact-body", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-body",
          start: "top 82%",
        },
      });

      gsap.from(".contact-link", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".contact-links",
          start: "top 85%",
        },
      });

      // glow pulse
      gsap.to(".contact-glow", {
        scale: 1.2,
        opacity: 0.7,
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
      className="relative py-24 md:py-40 overflow-hidden"
    >
      <div
        className="contact-glow absolute pointer-events-none"
        aria-hidden
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          maxWidth: "120vw",
          maxHeight: "120vw",
          background:
            "radial-gradient(circle, var(--accent-glow-strong) 0%, var(--accent-glow) 30%, transparent 65%)",
          opacity: 0.5,
          filter: "blur(30px)",
        }}
      />
      <div className="grain" aria-hidden />

      <div className="relative mx-auto max-w-[1000px] px-6 lg:px-10 text-center">
        <div className="label-caps mb-8 flex items-center justify-center gap-3">
          <span className="inline-block w-8 h-px bg-[var(--accent-copper)]" />
          Contact
          <span className="inline-block w-8 h-px bg-[var(--accent-copper)]" />
        </div>

        <h2
          className="contact-headline font-serif text-[var(--text-primary)] leading-[1.05] mb-8"
          style={{
            fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="line-mask block">
            <span className="line block">Let&apos;s build</span>
          </span>
          <span className="line-mask block">
            <span className="line block">
              <span className="text-[var(--accent-copper)]">
                proptech AI
              </span>{" "}
              that ships.
            </span>
          </span>
        </h2>

        <p
          className="contact-body text-[var(--text-secondary)] max-w-xl mx-auto"
          style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}
        >
          I&apos;m based in{" "}
          <strong className="text-[var(--text-primary)] font-medium">Oslo</strong>{" "}
          and exploring a{" "}
          <strong className="text-[var(--text-primary)] font-medium">
            Generative AI Engineer
          </strong>{" "}
          role with a proptech AI company. Reach out directly or via{" "}
          <span className="text-[var(--accent-amber)]">Ladda / Laddwho</span>.
        </p>

        <div className="contact-links mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="contact-link group inline-flex items-center gap-3 px-7 py-4 bg-[var(--accent-copper)] text-[#0B0F14] font-medium rounded-md hover:bg-[var(--accent-amber)] transition-colors"
            style={{ minHeight: 52 }}
          >
            <span>{EMAIL}</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link inline-flex items-center gap-3 px-7 py-4 border border-[var(--border-strong)] text-[var(--text-primary)] font-medium rounded-md hover:border-[var(--accent-copper)] hover:text-[var(--accent-copper)] transition-colors"
            style={{ minHeight: 52 }}
          >
            LinkedIn
            <span>↗</span>
          </a>
        </div>

        <div className="mt-8 text-sm text-[var(--text-muted)]">
          +46 761 61 38 73 · zavian.ai
        </div>
      </div>
    </section>
  );
}
