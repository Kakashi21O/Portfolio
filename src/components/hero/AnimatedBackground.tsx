"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    /* fixed → covers the entire viewport behind everything */
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Mouse glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(700px circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.04), transparent 70%)`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.6 }}
      />

      {/* Soft ambient blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px]" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
