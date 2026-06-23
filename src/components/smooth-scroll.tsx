"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function LenisScrollTriggerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    // Sync Lenis scroll events with ScrollTrigger
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    // Refresh after mount + after images/layout settle
    const refresh = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refresh, 400);
    const t2 = setTimeout(refresh, 1500);
    const t3 = setTimeout(refresh, 3000);

    return () => {
      lenis.off("scroll", onScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [lenis]);

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
