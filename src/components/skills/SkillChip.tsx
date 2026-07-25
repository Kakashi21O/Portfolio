"use client";

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Skill } from "./types";
import { cn } from "@/lib/utils";

const levelStyles: Record<Skill["level"], string> = {
  Primary:     "border-primary/60 text-primary bg-primary/10",
  Comfortable: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
  Learning:    "border-amber-500/40 text-amber-400 bg-amber-500/10",
  Exploring:   "border-violet-500/40 text-violet-400 bg-violet-500/10",
};

interface SkillChipProps {
  skill: Skill;
  index: number;
}

export function SkillChip({ skill, index }: SkillChipProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          "relative group/chip flex items-center gap-2 cursor-pointer select-none",
          "px-3 py-2 rounded-xl border backdrop-blur-md transition-all duration-300",
          "hover:shadow-[0_0_20px_var(--color-primary)] hover:border-primary/60",
          skill.featured
            ? "px-4 py-2.5 text-sm font-semibold border-primary/50 bg-primary/10 shadow-[0_0_12px_rgba(0,0,0,0.15)]"
            : "text-sm font-medium border-white/10 bg-white/5"
        )}
        aria-label={`${skill.name} — ${skill.level}`}
      >
        {/* Hover glow layer */}
        <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover/chip:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <span className="text-base leading-none relative z-10" aria-hidden>
          {skill.emoji}
        </span>
        <span className="relative z-10 text-foreground/90 group-hover/chip:text-white transition-colors duration-200">
          {skill.name}
        </span>

        {/* Experience label badge */}
        <span
          className={cn(
            "relative z-10 ml-1 text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-md border",
            levelStyles[skill.level]
          )}
        >
          {skill.level}
        </span>

        {/* Featured star */}
        {skill.featured && (
          <span className="absolute -top-1.5 -right-1.5 text-[10px] leading-none z-20" aria-hidden>
            ⭐
          </span>
        )}
      </TooltipTrigger>
      <TooltipContent className="max-w-[200px] text-xs text-center leading-relaxed">
        {skill.tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
