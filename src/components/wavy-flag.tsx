import type { ReactElement, ReactNode } from "react";
import type { Locale } from "@/lib/i18n/types";

const W = 56;
const H = 36;

/** Multi-ripple fabric wave — top and bottom edges undulate in opposite phase */
const WAVE_CLIP = [
  `M0 9`,
  `C4 5 8 11 14 8`,
  `C20 5 26 10 32 7`,
  `C38 4 44 9 50 6`,
  `C53 4 55 7 ${W} 8`,
  `L${W} 28`,
  `C55 31 53 28 50 30`,
  `C44 33 38 28 32 31`,
  `C26 34 20 29 14 32`,
  `C8 35 4 30 0 33`,
  `Z`,
].join(" ");

function FlagShell({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const clipId = `flag-wave-${id}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="wavy-flag" aria-hidden>
      <defs>
        <clipPath id={clipId}>
          <path d={WAVE_CLIP} />
        </clipPath>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${clipId})`}>{children}</g>
      <path d={WAVE_CLIP} fill={`url(#${id}-sheen)`} style={{ mixBlendMode: "soft-light" }} />
    </svg>
  );
}

function FlagNorway() {
  return (
    <FlagShell id="no">
      <rect width={W} height={H} fill="#BA0C2F" />
      <rect x="15" width="6" height={H} fill="#fff" />
      <rect y="14" width={W} height="8" fill="#fff" />
      <rect x="17" width="2.5" height={H} fill="#00205B" />
      <rect y="15.5" width={W} height="5" fill="#00205B" />
    </FlagShell>
  );
}

function FlagSweden() {
  return (
    <FlagShell id="sv">
      <rect width={W} height={H} fill="#006AA7" />
      <rect x="15" width="6" height={H} fill="#FECC00" />
      <rect y="14" width={W} height="8" fill="#FECC00" />
    </FlagShell>
  );
}

function FlagSpain() {
  return (
    <FlagShell id="es">
      <rect width={W} height={H} fill="#AA151B" />
      <rect y="9" width={W} height="18" fill="#F1BF00" />
      <rect x="10" y="13" width="7" height="9" rx="0.4" fill="#AA151B" opacity="0.9" />
    </FlagShell>
  );
}

function FlagUSA() {
  const stripeH = H / 13;
  const cantonW = W * 0.42;
  const cantonH = stripeH * 7;

  return (
    <FlagShell id="us">
      {Array.from({ length: 13 }, (_, i) => (
        <rect
          key={i}
          y={i * stripeH}
          width={W}
          height={stripeH + 0.15}
          fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}
      <rect width={cantonW} height={cantonH} fill="#3C3B6E" />
      {[
        [4, 2.2],
        [10, 2.2],
        [16, 2.2],
        [22, 2.2],
        [7, 4.8],
        [13, 4.8],
        [19, 4.8],
        [4, 7.4],
        [10, 7.4],
        [16, 7.4],
        [22, 7.4],
        [7, 10],
        [13, 10],
        [19, 10],
        [10, 12.6],
        [16, 12.6],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="0.7" fill="#FFFFFF" />
      ))}
    </FlagShell>
  );
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
