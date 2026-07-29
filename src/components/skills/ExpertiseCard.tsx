"use client";

import { useRef, useCallback, useState, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import type { ExpertiseArea } from "./types";

interface ExpertiseCardProps {
  area: ExpertiseArea;
  index: number;
}

const springConfig = { stiffness: 250, damping: 25, mass: 0.5 };

const motifColors: Record<ExpertiseArea["motif"], { glow: string; border: string; tag: string; tagBg: string; accent: string }> = {
  backend:  { glow: "rgba(167,139,250,", border: "rgba(167,139,250,", tag: "text-primary/60",    tagBg: "bg-primary/[0.03]",    accent: "primary" },
  devops:   { glow: "rgba(251,191,36,",  border: "rgba(251,191,36,",  tag: "text-amber-400/60",  tagBg: "bg-amber-400/[0.08]",  accent: "amber" },
  frontend: { glow: "rgba(56,189,248,",  border: "rgba(56,189,248,",  tag: "text-sky-400/60",    tagBg: "bg-sky-400/[0.08]",   accent: "sky" },
  ai:       { glow: "rgba(52,211,153,",  border: "rgba(52,211,153,",  tag: "text-emerald-400/60", tagBg: "bg-emerald-400/[0.08]", accent: "emerald" },
  languages:{ glow: "rgba(167,139,250,", border: "rgba(167,139,250,", tag: "text-primary/60",    tagBg: "bg-primary/[0.03]",    accent: "primary" },
};

function Motif({ type }: { type: ExpertiseArea["motif"] }) {

  if (type === "backend") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.008]" viewBox="0 0 400 300" fill="none" aria-hidden="true">
        <circle cx="80" cy="80" r="24" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="200" cy="50" r="16" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="320" cy="90" r="20" stroke="currentColor" strokeWidth="0.5" />
        <line x1="100" y1="72" x2="188" y2="54" stroke="currentColor" strokeWidth="0.3" />
        <line x1="212" y1="58" x2="304" y2="82" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="80" cy="200" r="6" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="320" cy="220" r="6" stroke="currentColor" strokeWidth="0.3" />
        <line x1="80" y1="80" x2="80" y2="194" stroke="currentColor" strokeWidth="0.2" strokeDasharray="4 4" />
        <line x1="320" y1="90" x2="320" y2="214" stroke="currentColor" strokeWidth="0.2" strokeDasharray="4 4" />
      </svg>
    );
  }
  if (type === "devops") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.008]" viewBox="0 0 400 300" fill="none" aria-hidden="true">
        <rect x="60" y="60" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" />
        <rect x="60" y="130" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" />
        <rect x="260" y="60" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" />
        <rect x="260" y="130" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" />
        <line x1="140" y1="80" x2="260" y2="80" stroke="currentColor" strokeWidth="0.3" />
        <line x1="100" y1="100" x2="100" y2="130" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 4" />
        <line x1="300" y1="100" x2="300" y2="130" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 4" />
        <path d="M 160 200 h 80 v 40 h -80 z" stroke="currentColor" strokeWidth="0.3" fill="none" />
        <line x1="200" y1="200" x2="200" y2="240" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
      </svg>
    );
  }
  if (type === "frontend") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.008]" viewBox="0 0 400 300" fill="none" aria-hidden="true">
        <rect x="80" y="60" width="240" height="40" rx="2" stroke="currentColor" strokeWidth="0.4" />
        <rect x="80" y="110" width="100" height="120" rx="2" stroke="currentColor" strokeWidth="0.4" />
        <rect x="190" y="110" width="130" height="55" rx="2" stroke="currentColor" strokeWidth="0.4" />
        <rect x="190" y="175" width="130" height="55" rx="2" stroke="currentColor" strokeWidth="0.4" />
        <line x1="120" y1="75" x2="120" y2="85" stroke="currentColor" strokeWidth="0.5" />
        <line x1="135" y1="75" x2="135" y2="85" stroke="currentColor" strokeWidth="0.5" />
        <line x1="150" y1="75" x2="150" y2="85" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    );
  }
  if (type === "ai") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.008]" viewBox="0 0 400 300" fill="none" aria-hidden="true">
        <circle cx="100" cy="80" r="6" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="200" cy="50" r="6" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="300" cy="80" r="6" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="150" cy="150" r="6" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="250" cy="150" r="6" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="200" cy="200" r="6" stroke="currentColor" strokeWidth="0.4" />
        <line x1="104" y1="76" x2="196" y2="54" stroke="currentColor" strokeWidth="0.3" />
        <line x1="204" y1="54" x2="296" y2="76" stroke="currentColor" strokeWidth="0.3" />
        <line x1="104" y1="84" x2="146" y2="146" stroke="currentColor" strokeWidth="0.3" />
        <line x1="296" y1="84" x2="254" y2="146" stroke="currentColor" strokeWidth="0.3" />
        <line x1="154" y1="154" x2="196" y2="196" stroke="currentColor" strokeWidth="0.3" />
        <line x1="246" y1="154" x2="204" y2="196" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="200" cy="200" r="24" stroke="currentColor" strokeWidth="0.2" strokeDasharray="3 3" />
      </svg>
    );
  }
  return null;
}

export const ExpertiseCard = memo(function ExpertiseCard({ area, index }: ExpertiseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [2.5, -2.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-2.5, 2.5]), springConfig);
  const liftY = useSpring(0, { stiffness: 300, damping: 20 });

  const hasTilt = !reducedMotion;

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!hasTilt) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    cardRef.current?.style.setProperty("--glow-x", `${x * 100}%`);
    cardRef.current?.style.setProperty("--glow-y", `${y * 100}%`);
  }, [mouseX, mouseY, hasTilt]);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
    if (!hasTilt) return;
    liftY.set(-4);
  }, [hasTilt, liftY]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    if (!hasTilt) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
    liftY.set(0);
    cardRef.current?.style.setProperty("--glow-x", "50%");
    cardRef.current?.style.setProperty("--glow-y", "50%");
  }, [hasTilt, mouseX, mouseY, liftY]);

  const mc = motifColors[area.motif];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: hasTilt ? 900 : undefined }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: hasTilt ? rotateX : 0,
          rotateY: hasTilt ? rotateY : 0,
          y: hasTilt ? liftY : 0,
          borderColor: isHovered ? `${mc.border}0.15)` : undefined,
        }}
        className="relative h-full rounded-2xl border border-white/[0.03] bg-white/[0.01] p-5 overflow-hidden transition-all duration-500 hover:bg-white/[0.02]"
      >
        {/* Pointer glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-500"
          style={{
            opacity: isHovered && hasTilt ? 1 : 0,
            background: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), ${mc.glow}0.05), transparent 60%)`,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-8 right-8 h-px pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(90deg, transparent, ${mc.border}0.12), transparent)`,
          }}
        />

        {/* Background motif */}
        <Motif type={area.motif} />

        {/* Content layers with depth */}
        <div className="relative z-10 flex flex-col h-full gap-3">
          {/* Header with number and icon */}
          <div
            className="flex items-center justify-between"
            style={{ transform: hasTilt ? "translateZ(8px)" : undefined }}
          >
            <span
              className="text-[11px] font-mono font-medium tracking-[0.2em] select-none"
              style={{ color: `${mc.border}0.4)`, transform: hasTilt ? "translateZ(8px)" : undefined }}
            >
              {area.number}
            </span>
            <span className="text-lg text-foreground/50" aria-hidden>
              {area.icon}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-xl font-semibold text-foreground tracking-tight leading-snug"
            style={{ transform: hasTilt ? "translateZ(18px)" : undefined }}
          >
            {area.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm text-foreground/60 leading-relaxed flex-1"
            style={{ transform: hasTilt ? "translateZ(12px)" : undefined }}
          >
            {area.description}
          </p>

          {/* Tech tags */}
          <div
            className="flex flex-wrap gap-1.5 mt-auto pt-2"
            style={{ transform: hasTilt ? "translateZ(22px)" : undefined }}
          >
            {area.technologies.map((tech) => (
              <span
                key={tech}
                className={`text-[11px] font-mono ${mc.tag} ${mc.tagBg} px-2 py-0.5 rounded-md`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});
