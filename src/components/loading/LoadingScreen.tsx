"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Sequences ─────────────────────────────────────────────────────────────────

const BOOT_LINES = [
  { text: "Initializing portfolio...",     delay: 0 },
  { text: "Loading assets...",             delay: 320 },
  { text: "Compiling components...",       delay: 580 },
  { text: "Connecting to GitHub...",       delay: 820 },
  { text: "Loading developer profile...", delay: 1050 },
  { text: "Initializing renderer...",      delay: 1280 },
];

const ERRORS = [
  { title: "404  Portfolio Not Found",         desc: "Cannot resolve module: developer.ts" },
  { title: "Build Failed",                     desc: "TypeError: undefined is not a function" },
  { title: "Module Resolution Failed",         desc: "Cannot find package 'motivation'" },
  { title: "Runtime Exception",               desc: "Uncaught ReferenceError: sleep is not defined" },
  { title: "Rendering Engine Crashed",        desc: "WebGL context lost unexpectedly" },
  { title: "GPU Initialisation Failed",       desc: "Device adapter not available" },
];

const EASTER_EGGS = [
  { title: "Too much anime detected...",       desc: "Fixing priorities..." },
  { title: "AI refused to write bad code...", desc: "Trying again with lower standards..." },
  { title: "Loading caffeine...",              desc: "Developer motivation not found" },
  { title: "Searching for bugs...",           desc: "Unfortunately... found none." },
  { title: "Compiling personality...",        desc: "Done." },
];

const RECOVERY_LINES = [
  "Attempting recovery...",
  "Restoring components...",
  "Rebuilding interface...",
  "Recovery successful.",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isEasterEgg() {
  return Math.random() < 0.05; // 5% chance
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
      className="inline-block w-[7px] h-4 ml-1 bg-primary align-middle"
    />
  );
}

function TerminalLine({ text, color = "text-muted-foreground" }: { text: string; color?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18 }}
      className={`font-mono text-sm leading-6 ${color}`}
    >
      <span className="text-primary/60 mr-2">›</span>
      {text}
    </motion.p>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

type Phase =
  | "booting"     // boot lines typing
  | "error"       // fake error displayed
  | "recovering"  // recovery lines
  | "done";       // fade out → reveal portfolio

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase]               = useState<Phase>("booting");
  const [visibleBoot, setVisibleBoot]   = useState<number>(0);
  const [visibleRec, setVisibleRec]     = useState<number>(0);
  const [progress, setProgress]         = useState<number>(0);
  const [errorEntry]                    = useState(() =>
    isEasterEgg() ? pick(EASTER_EGGS) : pick(ERRORS)
  );

  // ── Phase: booting ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "booting") return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => setVisibleBoot(i + 1), line.delay + 200)
      );
    });

    // Transition to error after all boot lines
    timers.push(
      setTimeout(() => setPhase("error"), 1700)
    );

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // ── Phase: error → recovering ───────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "error") return;
    const t = setTimeout(() => {
      setPhase("recovering");
    }, 900);
    return () => clearTimeout(t);
  }, [phase]);

  // ── Phase: recovering ───────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "recovering") return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    RECOVERY_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleRec(i + 1), i * 300));
    });

    // Progress bar
    let p = 0;
    const interval = setInterval(() => {
      p += 4;
      setProgress(Math.min(p, 100));
      if (p >= 100) clearInterval(interval);
    }, 40);

    // Done after recovery
    timers.push(setTimeout(() => setPhase("done"), RECOVERY_LINES.length * 300 + 500));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [phase]);

  // ── Phase: done → reveal ────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(onComplete, 700);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loading"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          {/* Subtle bg blobs */}
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

          <div className="w-full max-w-xl mx-6">
            {/* Terminal window chrome */}
            <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">

              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-black/20">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  mantu@portfolio ~ bash
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-6 space-y-1 min-h-[260px]">
                {/* Boot lines */}
                {BOOT_LINES.slice(0, visibleBoot).map((line, i) => (
                  <TerminalLine key={i} text={line.text} />
                ))}

                {/* Blinking cursor during boot */}
                {phase === "booting" && visibleBoot > 0 && (
                  <p className="font-mono text-sm leading-6 text-muted-foreground">
                    <span className="text-primary/60 mr-2">›</span>
                    <Cursor />
                  </p>
                )}

                {/* Error block */}
                {(phase === "error" || phase === "recovering") && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 rounded-lg border border-red-500/25 bg-red-500/8 p-4"
                  >
                    <p className="font-mono text-sm font-bold text-red-400">
                      ✕  {errorEntry.title}
                    </p>
                    <p className="font-mono text-xs text-red-400/70 mt-1">
                      {errorEntry.desc}
                    </p>
                  </motion.div>
                )}

                {/* Recovery lines */}
                {phase === "recovering" && (
                  <div className="mt-4 space-y-1">
                    {RECOVERY_LINES.slice(0, visibleRec).map((line, i) => (
                      <TerminalLine
                        key={i}
                        text={line}
                        color={
                          i === RECOVERY_LINES.length - 1
                            ? "text-green-400"
                            : "text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Progress bar */}
              {phase === "recovering" && (
                <div className="px-6 pb-6">
                  <div className="flex justify-between font-mono text-xs text-muted-foreground mb-1.5">
                    <span>Rebuilding interface...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-border overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer hint */}
            <p className="mt-4 text-center font-mono text-xs text-muted-foreground/40">
              mantu.dev — v1.0.0
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
