"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Architecture", href: "#architecture" },
  { label: "Capabilities", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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
        backgroundColor: scrolled ? "rgba(11, 15, 20, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border-subtle)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif lowercase text-xl md:text-2xl tracking-tight text-[var(--text-primary)] hover:text-[var(--accent-copper)] transition-colors"
          style={{ fontWeight: 500 }}
          aria-label="Back to top"
        >
          zavian.ai
        </button>

        <ul className="hidden md:flex items-center gap-8">
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

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
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

      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "320px" : "0px",
          backgroundColor: "rgba(11, 15, 20, 0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: menuOpen ? "1px solid var(--border-subtle)" : "none",
        }}
      >
        <ul className="px-6 py-4 flex flex-col gap-4">
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
        </ul>
      </div>
    </nav>
  );
}
