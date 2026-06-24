import { useId, type ReactElement, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/types";

const W = 60;
const H = 38;

/** Strong multi-ripple fabric wave — 6 peaks, opposing top/bottom phase */
function buildWavePath(w: number, h: number) {
  const top = [
    `M0 8`,
    `C2 2 5 12 9 6`,
    `C13 0 16 11 20 5`,
    `C24 -1 27 10 31 4`,
    `C35 -2 38 9 42 3`,
    `C46 -3 49 8 53 2`,
    `C56 -2 58 7 ${w} 8`,
  ];
  const bottom = [
    `L${w} ${h - 8}`,
    `C58 ${h - 2} 56 ${h - 12} 53 ${h - 6}`,
    `C49 0 46 ${h - 11} 42 ${h - 5}`,
    `C38 1 35 ${h - 10} 31 ${h - 4}`,
    `C27 -2 24 ${h - 9} 20 ${h - 3}`,
    `C16 1 13 ${h - 10} 9 ${h - 4}`,
    `C5 0 2 ${h - 11} 0 ${h - 8}`,
  ];
  return [...top, ...bottom, "Z"].join(" ");
}

const WAVE_CLIP = buildWavePath(W, H);

function FlagShell({ children }: { children: ReactNode }) {
  const uid = useId().replace(/:/g, "");
  const clipId = `flag-wave-${uid}`;
  const sheenId = `flag-sheen-${uid}`;

  return (
    <svg
      viewBox={`0 -2 ${W} ${H + 4}`}
      className="wavy-flag"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={WAVE_CLIP} />
        </clipPath>
        <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${clipId})`}>{children}</g>
      <path
        d={WAVE_CLIP}
        fill={`url(#${sheenId})`}
        style={{ mixBlendMode: "soft-light" }}
        pointerEvents="none"
      />
    </svg>
  );
}

function FlagNorway() {
  return (
    <FlagShell>
      <rect width={W} height={H} fill="#BA0C2F" />
      <rect x="16" width="6.5" height={H} fill="#fff" />
      <rect y="15" width={W} height="8" fill="#fff" />
      <rect x="18" width="2.5" height={H} fill="#00205B" />
      <rect y="16.5" width={W} height="5" fill="#00205B" />
    </FlagShell>
  );
}

function FlagSweden() {
  return (
    <FlagShell>
      <rect width={W} height={H} fill="#006AA7" />
      <rect x="16" width="6.5" height={H} fill="#FECC00" />
      <rect y="15" width={W} height="8" fill="#FECC00" />
    </FlagShell>
  );
}

function FlagSpain() {
  return (
    <FlagShell>
      <rect width={W} height={H} fill="#AA151B" />
      <rect y="9.5" width={W} height="19" fill="#F1BF00" />
      <rect x="11" y="13.5" width="7.5" height="9.5" rx="0.4" fill="#AA151B" opacity="0.9" />
    </FlagShell>
  );
}

function FlagUSA() {
  const stripeH = H / 13;
  const cantonW = W * 0.4;
  const cantonH = stripeH * 7;
  const starR = 0.5;

  const starRows = Array.from({ length: 9 }, (_, i) => ({
    y: stripeH * 0.55 + (i * (cantonH - stripeH * 1.1)) / 8,
    count: i % 2 === 0 ? 6 : 5,
    x0: i % 2 === 0 ? 2.8 : 4.7,
    step: 3.6,
  }));

  return (
    <FlagShell>
      {Array.from({ length: 13 }, (_, i) => (
        <rect
          key={`stripe-${i}`}
          y={i * stripeH}
          width={W}
          height={stripeH + 0.2}
          fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}
      <rect x={0} y={0} width={cantonW} height={cantonH} fill="#3C3B6E" />
      {starRows.flatMap((row, ri) =>
        Array.from({ length: row.count }, (_, ci) => (
          <polygon
            key={`star-${ri}-${ci}`}
            points={starPoints(row.x0 + ci * row.step, row.y, starR)}
            fill="#FFFFFF"
          />
        )),
      )}
    </FlagShell>
  );
}

function starPoints(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 2) * -1 + (i * Math.PI) / 5;
    const radius = i % 2 === 0 ? r : r * 0.42;
    pts.push(`${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`);
  }
  return pts.join(" ");
}

const FLAGS: Record<Locale, () => ReactElement> = {
  no: FlagNorway,
  sv: FlagSweden,
  es: FlagSpain,
  en: FlagUSA,
};

export function WavyFlag({ locale }: { locale: Locale }) {
  const Flag = FLAGS[locale];
  return <Flag />;
}
