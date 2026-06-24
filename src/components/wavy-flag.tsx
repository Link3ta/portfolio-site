import type { ReactElement, ReactNode } from "react";
import type { Locale } from "@/lib/i18n/types";

const W = 48;
const H = 32;

function FlagSvg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="locale-flag" aria-hidden>
      {children}
    </svg>
  );
}

function FlagNorway() {
  return (
    <FlagSvg>
      <rect width={W} height={H} fill="#BA0C2F" />
      <rect x="13" width="5" height={H} fill="#fff" />
      <rect y="12.5" width={W} height="7" fill="#fff" />
      <rect x="14.5" width="2" height={H} fill="#00205B" />
      <rect y="13.75" width={W} height="4.5" fill="#00205B" />
    </FlagSvg>
  );
}

function FlagSweden() {
  return (
    <FlagSvg>
      <rect width={W} height={H} fill="#006AA7" />
      <rect x="13" width="5" height={H} fill="#FECC00" />
      <rect y="12.5" width={W} height="7" fill="#FECC00" />
    </FlagSvg>
  );
}

function FlagSpain() {
  return (
    <FlagSvg>
      <rect width={W} height={H} fill="#AA151B" />
      <rect y="8" width={W} height="16" fill="#F1BF00" />
      <rect x="9" y="11.5" width="6" height="8" fill="#AA151B" opacity="0.85" />
    </FlagSvg>
  );
}

function FlagUSA() {
  const stripeH = H / 13;
  const cantonW = W * 0.42;
  const cantonH = stripeH * 7;

  const starRows = [
    { y: 2.8, xs: [3, 7.5, 12, 16.5] },
    { y: 5.6, xs: [5.2, 9.7, 14.2] },
    { y: 8.4, xs: [3, 7.5, 12, 16.5] },
    { y: 11.2, xs: [5.2, 9.7, 14.2] },
    { y: 14, xs: [3, 7.5, 12, 16.5] },
  ];

  return (
    <FlagSvg>
      {Array.from({ length: 13 }, (_, i) => (
          <rect
            key={`stripe-${i}`}
            y={i * stripeH}
            width={W}
            height={stripeH + 0.15}
            fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
          />
        ))}
        <rect width={cantonW} height={cantonH} fill="#3C3B6E" />
        {starRows.flatMap((row, ri) =>
          row.xs.map((x, ci) => (
            <polygon
              key={`star-${ri}-${ci}`}
              points={starPoints(x, row.y, 0.9)}
              fill="#FFFFFF"
            />
          )),
        )}
    </FlagSvg>
  );
}

function starPoints(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const radius = i % 2 === 0 ? r : r * 0.38;
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
