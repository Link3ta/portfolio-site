"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Calendar, Mail, Linkedin, ArrowUpRight, Clock, Video } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EMAIL = "anders.ljungstedt1@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/anders-ljungstedt-7a1723176/";
const CALENDLY_URL = "https://calendly.com/anders-ljungstedt/intro";

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
        scrollTrigger: { trigger: ".contact-headline", start: "top 82%" },
      });

      gsap.from(".contact-body", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-body", start: "top 82%" },
      });

      gsap.from(".contact-card", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".contact-grid", start: "top 85%" },
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
          Contact
          <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
        </div>

        <h2
          className="contact-headline font-serif text-[var(--text-primary)] leading-[1.05] mb-8"
          style={{
            fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="line-mask block">
            <span className="line block">Let&apos;s build</span>
          </span>
          <span className="line-mask block">
            <span className="line block">
              <span className="text-[var(--accent-blue)]">proptech AI</span>{" "}
              that ships.
            </span>
          </span>
        </h2>

        <p
          className="contact-body text-[var(--text-secondary)] max-w-xl mx-auto"
          style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}
        >
          I&apos;m based in{" "}
          <strong className="text-[var(--text-primary)] font-semibold">Oslo</strong>{" "}
          and exploring a{" "}
          <strong className="text-[var(--text-primary)] font-semibold">
            Generative AI Engineer
          </strong>{" "}
          role with a proptech AI company. Reach out directly or via{" "}
          <span className="text-[var(--accent-blue)] font-medium">
            Ladda / Laddwho
          </span>
          .
        </p>

        {/* Contact cards */}
        <div className="contact-grid mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card btn-blue flex-col py-6 px-4"
            style={{ borderRadius: 14, minHeight: "auto" }}
          >
            <Calendar size={22} className="mb-2" />
            <div className="font-semibold text-sm">Book a meeting</div>
            <div className="text-white/80 text-xs mt-1">30 min intro · cal.com</div>
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="contact-card btn-ghost flex-col py-6 px-4"
            style={{ borderRadius: 14, minHeight: "auto" }}
          >
            <Mail size={22} className="mb-2" />
            <div className="font-semibold text-sm">Email me</div>
            <div className="text-[var(--text-muted)] text-xs mt-1 truncate w-full">
              {EMAIL}
            </div>
          </a>

          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card btn-ghost flex-col py-6 px-4"
            style={{ borderRadius: 14, minHeight: "auto" }}
          >
            <Linkedin size={22} className="mb-2" />
            <div className="font-semibold text-sm">LinkedIn</div>
            <div className="text-[var(--text-muted)] text-xs mt-1">/anders-ljungstedt</div>
          </a>
        </div>

        {/* Teams-style meeting preview strip */}
        <div className="contact-card mt-8 booking-card max-w-2xl mx-auto p-5 flex items-center gap-4 text-left">
          <div
            className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--accent-blue) 0%, #4F46E5 100%)",
            }}
          >
            <Video size={22} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[var(--text-primary)] font-semibold text-sm">
              Google Meet / Teams · Anders Ljungstedt
            </div>
            <div className="text-[var(--text-muted)] text-xs flex items-center gap-1.5 mt-0.5">
              <Clock size={12} />
              30 minutes · Oslo time
            </div>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-blue shrink-0"
            style={{ padding: "0.55rem 1.1rem", minHeight: 40 }}
          >
            Join
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="mt-8 text-sm text-[var(--text-muted)]">
          +46 761 61 38 73 · zavian.ai
        </div>
      </div>
    </section>
  );
}
