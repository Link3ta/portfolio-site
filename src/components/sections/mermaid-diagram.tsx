"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    // dark editorial copper palette
    background: "transparent",
    primaryColor: "#1A2230",
    primaryTextColor: "#F4F0EA",
    primaryBorderColor: "#C4895A",
    lineColor: "#9BA8B8",
    secondaryColor: "#121820",
    secondaryTextColor: "#F4F0EA",
    secondaryBorderColor: "#5C6B7A",
    tertiaryColor: "#0B0F14",
    tertiaryTextColor: "#F4F0EA",
    tertiaryBorderColor: "#5C6B7A",
    noteBkgColor: "#1A2230",
    noteTextColor: "#F4F0EA",
    noteBorderColor: "#C4895A",
    edgeLabelBackground: "#0B0F14",
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: "13px",
    clusterBkg: "rgba(244, 240, 234, 0.03)",
    clusterBorder: "rgba(196, 137, 90, 0.4)",
    // decision diamond
    altBackground: "#121820",
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
          <span className="inline-block w-6 h-px bg-[var(--accent-copper)]" />
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
