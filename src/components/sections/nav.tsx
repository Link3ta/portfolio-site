"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Architecture", href: "#architecture" },
  { label: "Capabilities", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// Calendly / cal.com booking link — adjust to the user's real scheduling URL
const CALENDLY_URL = "https://calendly.com/anders-ljungstedt/intro";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean,
    ) as Element[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: scrolled
          ? "1px solid var(--border-subtle)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Name wordmark — prominent */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-baseline gap-2 group"
          aria-label="Back to top"
        >
          <span
            className="font-serif text-[var(--text-primary)] tracking-tight leading-none"
            style={{
              fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Anders Ljungstedt
          </span>
          <span className="hidden sm:inline text-[11px] font-mono text-[var(--accent-blue)] uppercase tracking-wider">
            · zavian.ai
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7">
          <ul className="flex items-center gap-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNav(l.href)}
                  className={`nav-link ${active === l.href ? "active" : ""}`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-blue"
            style={{ padding: "0.55rem 1.1rem", minHeight: 40, fontSize: "0.875rem" }}
          >
            Book a meeting
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className="block w-6 h-px bg-[var(--text-primary)] transition-transform duration-300"
            style={{
              transform: menuOpen ? "translateY(3.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-6 h-px bg-[var(--text-primary)] transition-transform duration-300"
            style={{
              transform: menuOpen
                ? "translateY(-3.5px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "420px" : "0px",
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: menuOpen ? "1px solid var(--border-subtle)" : "none",
        }}
      >
        <ul className="px-6 py-4 flex flex-col gap-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
                className={`nav-link text-base ${active === l.href ? "active" : ""}`}
              >
                {l.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-blue w-full"
            >
              Book a meeting today
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
