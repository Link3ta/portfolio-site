"use client";

import { useEffect, useState } from "react";
import { CALENDLY_URL } from "@/lib/site";
import { useLocale } from "@/lib/i18n/locale-provider";
import { LocaleSwitcher } from "@/components/locale-switcher";

const LINKS = [
  { key: "work" as const, href: "#work" },
  { key: "about" as const, href: "#about" },
  { key: "capabilities" as const, href: "#skills" },
  { key: "contact" as const, href: "#contact" },
];

export function Nav() {
  const { t } = useLocale();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const NAV_OFFSET = 100;

    const updateActive = () => {
      const scrollPos = window.scrollY + NAV_OFFSET;
      const heroEl = document.querySelector("#hero") as HTMLElement | null;

      if (heroEl && scrollPos < heroEl.offsetTop + heroEl.offsetHeight - 80) {
        setActive("");
        return;
      }

      let current = "";
      let bestTop = -1;
      for (const link of LINKS) {
        const el = document.querySelector(link.href) as HTMLElement | null;
        if (el && el.offsetTop <= scrollPos && el.offsetTop > bestTop) {
          bestTop = el.offsetTop;
          current = link.href;
        }
      }
      setActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [mounted]);

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
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 flex items-center justify-between h-16 md:h-20 gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-baseline gap-2 group min-w-0"
            aria-label="Back to top"
          >
            <span
              className="font-serif text-[var(--text-primary)] tracking-tight leading-none truncate"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Anders Ljungstedt
            </span>
            <span className="hidden sm:inline text-[11px] font-mono text-[var(--accent-blue)] uppercase tracking-wider shrink-0">
              · zavian.ai
            </span>
          </button>
          <LocaleSwitcher />
        </div>

        <div className="hidden lg:flex items-center gap-7 shrink-0">
          <ul className="flex items-center gap-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNav(l.href)}
                  className={`nav-link ${active === l.href ? "active" : ""}`}
                >
                  {t.nav[l.key]}
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
            {t.nav.bookMeeting}
          </a>
        </div>

        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2 shrink-0"
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
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "480px" : "0px",
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
                {t.nav[l.key]}
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
              {t.nav.bookMeetingMobile}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
