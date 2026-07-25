"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  const [mouse, setMouse] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

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

      {/* Mouse spotlight */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{
          left: mouse.x,
          top: mouse.y,
          background: "radial-gradient(circle, oklch(0.68 0.22 270 / 0.08) 0%, transparent 70%)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
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
