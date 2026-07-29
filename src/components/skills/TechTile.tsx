"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Skill } from "./types";

interface TechTileProps {
  skill: Skill;
  index: number;
}

export function TechTile({ skill, index }: TechTileProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 260, damping: 20 };
  const rx = useSpring(rotateX, springConfig);
  const ry = useSpring(rotateY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const cx = (e.clientX - left) / width - 0.5;
    const cy = (e.clientY - top) / height - 0.5;
    rotateX.set(-cy * 5);
    rotateY.set(cx * 5);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: index * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group/tile relative flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.02] cursor-pointer select-none transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-0.5"
          aria-label={`${skill.name} — ${skill.level}`}
        >
          {/* Glow on hover */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover/tile:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 65%)" }} />
          {/* Top edge light strip */}
          <div className="absolute top-0 left-4 right-4 h-px rounded-full opacity-0 group-hover/tile:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* 3-D content layer */}
          <div style={{ transform: "translateZ(8px)" }} className="relative z-10 flex items-center gap-3 w-full">
            {/* Icon */}
            <div className="flex-shrink-0 transition-transform duration-300 group-hover/tile:scale-110">
              <span className="text-base leading-none">{skill.emoji}</span>
            </div>

            {/* Info */}
            <div className="text-left min-w-0">
              <div className="text-sm font-medium text-foreground/80 group-hover/tile:text-foreground transition-colors duration-200 truncate">
                {skill.name}
              </div>
              <div className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-wider">
                {skill.level}
              </div>
            </div>
          </div>

          {/* Featured indicator */}
          {skill.featured && (
            <div className="absolute top-1 right-1.5 z-20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
            </div>
          )}
        </motion.div>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="max-w-[240px] text-left !border-primary/25 p-3 shadow-xl shadow-black/40"
      >
        <span className="block font-semibold text-primary text-sm mb-1">
          {skill.name}
        </span>
        <span className="block text-xs text-muted-foreground/70 leading-relaxed">
          {skill.tooltip}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}
