"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    // light SaaS — blue accents
    background: "transparent",
    primaryColor: "#EFF6FF",
    primaryTextColor: "#0F172A",
    primaryBorderColor: "#2563EB",
    lineColor: "#475569",
    secondaryColor: "#F0FDFA",
    secondaryTextColor: "#0F172A",
    secondaryBorderColor: "#0D9488",
    tertiaryColor: "#FFFFFF",
    tertiaryTextColor: "#0F172A",
    tertiaryBorderColor: "#CBD5E1",
    noteBkgColor: "#FEF3C7",
    noteTextColor: "#0F172A",
    noteBorderColor: "#D97706",
    edgeLabelBackground: "#FFFFFF",
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: "13px",
    clusterBkg: "#F8FAFC",
    clusterBorder: "#2563EB",
    altBackground: "#F1F5F9",
  },
  flowchart: {
    htmlLabels: true,
    curve: "basis",
    padding: 12,
  },
});

let idCounter = 0;

export function MermaidDiagram({
  chart,
  label,
}: {
  chart: string;
  label?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const id = `mermaid-${++idCounter}`;
    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (!cancelled) {
          setSvg(svg);
          setError("");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message ?? "Failed to render diagram");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div className="my-6">
      {label && (
        <div className="label-caps mb-3 flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-[var(--accent-blue)]" />
          {label}
        </div>
      )}
      <div className="mermaid-wrap">
        {error ? (
          <pre className="text-xs text-[var(--text-muted)] font-mono whitespace-pre-wrap p-4">
            {error}
            {"\n\n"}
            {chart}
          </pre>
        ) : (
          <div
            ref={containerRef}
            className="mermaid"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>
    </div>
  );
}
