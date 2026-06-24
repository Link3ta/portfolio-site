"use client";

import { useId } from "react";
import { useLocale } from "@/lib/i18n/locale-provider";

/** Jan 2023 → Jul 2026 timeline */
const X_MIN = 56;
const X_MAX = 444;
const Y_MIN = 58;
const Y_MAX = 178;

function dateToX(year: number, month: number) {
  const months = (year - 2023) * 12 + (month - 1);
  const total = 42; // Jan 2023 – Jul 2026
  return X_MIN + (months / total) * (X_MAX - X_MIN);
}

const JAN_2026_X = dateToX(2026, 1);

const RED_POINTS = [
  { x: dateToX(2023, 1), y: 162 },
  { x: dateToX(2023, 9), y: 146 },
  { x: dateToX(2024, 6), y: 122 },
  { x: dateToX(2025, 3), y: 102 },
  { x: dateToX(2025, 10), y: 86 },
  { x: JAN_2026_X, y: 76 },
];

const BLUE_BEFORE = [
  { x: dateToX(2024, 10), y: 152 },
  { x: dateToX(2025, 2), y: 136 },
  { x: dateToX(2025, 8), y: 116 },
  { x: JAN_2026_X, y: 100 },
];

const BLUE_AFTER = [
  { x: JAN_2026_X, y: 100 },
  { x: dateToX(2026, 4), y: 72 },
  { x: dateToX(2026, 7), y: 56 },
];

function toPath(points: { x: number; y: number }[]) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

export function SpecialtyTrajectoryChart() {
  const { t } = useLocale();
  const c = t.chart;
  const id = useId().replace(/:/g, "");
  const redPath = toPath(RED_POINTS);
  const bluePath = `${toPath(BLUE_BEFORE)} ${toPath(BLUE_AFTER).replace("M", "L")}`;

  return (
    <div className="trajectory-chart surface p-5 mt-4">
      <div className="label-caps mb-3 text-[var(--text-muted)]">{c.label}</div>

      <svg
        viewBox="0 0 500 228"
        className="w-full h-auto"
        role="img"
        aria-label={c.aria}
      >
        <defs>
          <linearGradient id={`${id}-blue-glow`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[2023, 2024, 2025, 2026].map((year) => {
          const x = dateToX(year, 1);
          return (
            <g key={year}>
              <line
                x1={x}
                y1={Y_MIN}
                x2={x}
                y2={Y_MAX}
                stroke="var(--border-subtle)"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <text
                x={x}
                y={212}
                textAnchor="middle"
                className="trajectory-axis-label"
              >
                {year}
              </text>
            </g>
          );
        })}

        {/* Jan 2026 milestone */}
        <line
          x1={JAN_2026_X}
          y1={Y_MIN - 2}
          x2={JAN_2026_X}
          y2={Y_MAX + 4}
          stroke="#0F172A"
          strokeWidth="2"
        />
        <text
          x={JAN_2026_X}
          y={34}
          textAnchor="middle"
          className="trajectory-milestone-label"
        >
          {c.milestone1}
        </text>
        <text
          x={JAN_2026_X}
          y={48}
          textAnchor="middle"
          className="trajectory-milestone-label"
        >
          {c.milestone2}
        </text>
        <text
          x={JAN_2026_X}
          y={62}
          textAnchor="middle"
          className="trajectory-milestone-sub"
        >
          {c.milestoneDate}
        </text>

        {/* Blue area after pivot */}
        <path
          d={`${bluePath} L ${dateToX(2026, 7)} ${Y_MAX} L ${JAN_2026_X} ${Y_MAX} Z`}
          fill={`url(#${id}-blue-glow)`}
        />

        {/* Red — system architecture */}
        <path
          d={redPath}
          fill="none"
          stroke="#DC2626"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="trajectory-line trajectory-line-red"
        />

        {/* Blue — proptech AI */}
        <path
          d={bluePath}
          fill="none"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="trajectory-line trajectory-line-blue"
        />

        {/* End dots */}
        <circle cx={JAN_2026_X} cy={76} r="4" fill="#DC2626" />
        <circle cx={dateToX(2026, 7)} cy={56} r="4.5" fill="#2563EB" />
        <circle cx={dateToX(2024, 10)} cy={152} r="3.5" fill="#2563EB" />
      </svg>

      <ul className="flex flex-col gap-2.5 mt-3 pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
        <li className="flex items-start gap-2 leading-snug">
          <span className="w-5 h-0.5 rounded-full bg-[#DC2626] shrink-0 mt-[0.45em]" />
          <span>
            {c.redLegend}
            <span className="text-[var(--text-muted)]"> {c.redLegendNote}</span>
          </span>
        </li>
        <li className="flex items-start gap-2 leading-snug">
          <span className="w-5 h-0.5 rounded-full bg-[var(--accent-blue)] shrink-0 mt-[0.45em]" />
          <span>
            {c.blueLegend}
            <span className="text-[var(--text-muted)]"> {c.blueLegendNote}</span>
          </span>
        </li>
      </ul>
    </div>
  );
}
