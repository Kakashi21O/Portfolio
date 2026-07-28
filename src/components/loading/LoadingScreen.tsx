"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ERROR_MESSAGES = [
  { code: "404", type: "NOT_FOUND",      desc: "The portfolio you requested\ncould not be located on this server." },
  { code: "500", type: "INTERNAL_ERROR", desc: "Developer is currently in\ndeep focus mode. Please stand by." },
  { code: "403", type: "FORBIDDEN",      desc: "Insufficient coolness level\nto access this resource." },
  { code: "418", type: "TEAPOT_ERROR",   desc: "Server is a teapot. Cannot\nbrew coffee for this request." },
  { code: "502", type: "BAD_GATEWAY",    desc: "Too much awesome detected.\nSystem overload imminent." },
  { code: "429", type: "RATE_LIMITED",   desc: "Brain capacity exceeded.\nThrottle your expectations." },
];

type Phase = "idle" | "glitching" | "done";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [error] = useState(() => ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("glitching"), 1200);
    const t2 = setTimeout(() => setPhase("done"),      2000);
    const t3 = setTimeout(() => onComplete(),           2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: "circIn" }}
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ background: "oklch(0.09 0.005 265)" }}
        >
          {/* ── Exact same layers as AnimatedBackground.tsx ── */}
          {/* Base radial */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.13_0.015_265)_0%,_oklch(0.09_0.005_265)_70%)]" />
          {/* Top-left violet blob */}
          <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-[oklch(0.55_0.22_280)] opacity-[0.12] blur-[120px]" />
          {/* Bottom-right blue blob */}
          <div className="absolute bottom-0 -right-32 w-[550px] h-[550px] rounded-full bg-[oklch(0.55_0.22_250)] opacity-[0.10] blur-[100px]" />
          {/* Center-top accent */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-[oklch(0.68_0.22_270)] opacity-[0.06] blur-[80px]" />
          {/* Center spotlight */}
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2"
               style={{ background: "radial-gradient(circle, oklch(0.68 0.22 270 / 0.08) 0%, transparent 70%)" }} />
          {/* Noise grain */}
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

          {/* ── Centred content ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12">
            <motion.div
              animate={
                phase === "glitching"
                  ? {
                      x:     [0, -12, 12, -6, 6, -22, 22, 0],
                      y:     [0,   5, -5,  10, -10,  2, -2, 0],
                      skewX: [0, -15, 15, -5,   5, -25, 25, 0],
                      filter: [
                        "drop-shadow(0 0 0 transparent)",
                        "drop-shadow(-5px 0 0 rgba(255,0,0,.85)) drop-shadow(5px 0 0 rgba(0,255,255,.85))",
                        "drop-shadow(5px 0 0 rgba(255,0,0,.85)) drop-shadow(-5px 0 0 rgba(0,255,255,.85))",
                        "drop-shadow(-3px 2px 0 rgba(167,139,250,.9)) drop-shadow(3px -2px 0 rgba(0,255,255,.9))",
                        "drop-shadow(0 0 0 transparent)",
                      ],
                    }
                  : {}
              }
              transition={
                phase === "glitching"
                  ? { duration: 0.15, repeat: Infinity, repeatType: "mirror" }
                  : {}
              }
              className="w-full max-w-2xl"
            >
              {/* Label row */}
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase"
                      style={{ color: "oklch(0.68 0.22 270 / 0.7)" }}>
                  CRITICAL ERROR
                </span>
                <span className="h-px flex-1" style={{ background: "oklch(0.68 0.22 270 / 0.2)" }} />
              </div>

              {/* Giant code */}
              <h1
                className="font-mono font-black tracking-tight leading-none mb-4"
                style={{
                  fontSize: "clamp(6rem, 22vw, 11rem)",
                  color: "oklch(0.97 0.005 265)",
                }}
              >
                {error.code}
              </h1>

              {/* Error type */}
              <h2
                className="font-mono font-bold uppercase tracking-[0.25em] mb-5 text-base sm:text-xl"
                style={{ color: "oklch(0.68 0.22 270)" }}
              >
                {error.type}
              </h2>

              {/* Divider */}
              <div className="h-px w-full mb-5" style={{ background: "oklch(1 0 0 / 0.08)" }} />

              {/* Description */}
              <p
                className="font-mono text-sm sm:text-base leading-relaxed whitespace-pre-line pl-4"
                style={{
                  color: "oklch(0.58 0.015 265)",
                  borderLeft: "2px solid oklch(0.68 0.22 270 / 0.4)",
                }}
              >
                {error.desc}
              </p>
            </motion.div>
          </div>

          {/* ── Bottom status text ── */}
          {phase === "glitching" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1, 0] }}
              transition={{ duration: 0.22, repeat: Infinity }}
              className="absolute bottom-6 sm:bottom-10 left-0 right-0 text-center font-mono tracking-widest uppercase px-4"
              style={{ color: "oklch(0.65 0.22 25 / 0.85)", fontSize: "clamp(0.6rem, 2vw, 0.75rem)" }}
            >
              SYSTEM_REBOOT_INITIATED · BYPASSING_ERROR · LAUNCHING_PORTFOLIO
            </motion.div>
          )}

          {/* ── Violet scanline ── */}
          {phase === "glitching" && (
            <motion.div
              animate={{ top: ["-5%", "110%"] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] pointer-events-none"
              style={{ background: "oklch(0.68 0.22 270 / 0.5)" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
