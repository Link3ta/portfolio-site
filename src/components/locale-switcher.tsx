"use client";

import { LOCALES } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n/locale-provider";

export function LocaleSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className={`flex items-center gap-1.5 shrink-0 ${compact ? "" : "ml-1"}`}
      role="group"
      aria-label={t.nav.switchTo}
    >
      {!compact && (
        <span className="hidden xl:inline text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] whitespace-nowrap">
          {t.nav.clientsIn}
        </span>
      )}
      <div className="flex items-center gap-0.5">
        {LOCALES.map((item) => {
          const active = locale === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLocale(item.code)}
              className={`locale-flag-btn ${active ? "locale-flag-btn-active" : ""}`}
              aria-label={`${item.country} (${item.code})`}
              aria-pressed={active}
              title={item.country}
            >
              <span className="text-base leading-none" aria-hidden>
                {item.flag}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
