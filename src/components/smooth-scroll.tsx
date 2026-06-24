"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

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
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const smooth = !reduced && !isMobile;

  return (
    <ReactLenis
      root
      options={{
        lerp: smooth ? 0.14 : 1,
        duration: smooth ? 0.85 : 0,
        smoothWheel: smooth,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
