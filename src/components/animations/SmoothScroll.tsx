"use client";

import { ReactLenis } from "lenis/react";
import { useIsMobile } from "@/hooks/useIsMobile";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile !== false) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.15,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
