"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function LenisScrollTriggerSync() {
  // Drive ScrollTrigger updates from Lenis scroll events
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Refresh after mount so triggers calculate correct positions
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        ...(typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? { lerp: 1, duration: 0, smoothWheel: false }
          : {}),
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
