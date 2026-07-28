"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AnimatedBackground() {
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);

  // Smooth the spotlight position with a light spring
  const spotlightX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">

      {/* Base radial — gives center depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.13_0.015_265)_0%,_oklch(0.09_0.005_265)_70%)]" />

      {/* Top-left violet blob */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-[oklch(0.55_0.22_280)] opacity-[0.12] blur-[120px]" />

      {/* Bottom-right blue blob */}
      <div className="absolute bottom-0 -right-32 w-[550px] h-[550px] rounded-full bg-[oklch(0.55_0.22_250)] opacity-[0.10] blur-[100px]" />

      {/* Center-top subtle accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-[oklch(0.68_0.22_270)] opacity-[0.06] blur-[80px]" />

      {/* Static spotlight — removes continuous React/Framer Motion updates on mouse move */}
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.22 270 / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
