"use client";

import { useLocale } from "@/lib/i18n/locale-provider";
import {
  GITHUB_ONESHOT_URL,
  GITHUB_PORTFOLIO_REPO,
  GITHUB_SKILL_URL,
  ZAI_GLM_URL,
} from "@/lib/site";

export function Footer() {
  const { t } = useLocale();
  const f = t.footer;

  return (
    <footer className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-base)] mt-auto">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="font-serif text-[var(--text-primary)]"
              style={{ fontWeight: 600, fontSize: "1.1rem" }}
            >
              Anders Ljungstedt
            </span>
            <span className="text-[var(--text-muted)] text-sm">· zavian.ai</span>
          </div>
          <div className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider">
            {f.copyright}
          </div>
        </div>

        <div className="footer-meta mt-6 pt-5 border-t border-[var(--border-subtle)] text-center space-y-2">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {f.templateBefore}{" "}
            <a
              href={GITHUB_SKILL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-blue)] hover:underline font-medium"
            >
              {f.skillLink}
            </a>{" "}
            {f.templateMid}{" "}
            <a
              href={GITHUB_ONESHOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-blue)] hover:underline font-medium"
            >
              {f.oneshotLink}
            </a>{" "}
            {f.templateAfter}{" "}
            <a
              href={GITHUB_PORTFOLIO_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-blue)] hover:underline font-medium"
            >
              {f.githubLink}
            </a>
            {f.templateEnd}
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            {f.oneshotBefore}{" "}
            <a
              href={ZAI_GLM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-blue)] hover:underline"
            >
              {f.zaiLink}
            </a>{" "}
            {f.oneshotMid}{" "}
            <a
              href={GITHUB_PORTFOLIO_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-blue)] hover:underline"
            >
              {f.sourceLink}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
