"use client";

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Skill } from "./types";
import { cn } from "@/lib/utils";

interface SkillChipProps {
  skill: Skill;
  index: number;
}

export function SkillChip({ skill, index }: SkillChipProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.35,
            delay: index * 0.055,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn(
            "relative group/chip inline-flex items-center gap-2 cursor-pointer select-none",
            "px-3 py-1.5 rounded-lg border transition-all duration-300",
            skill.featured
              ? "border-white/20 bg-white/10 text-foreground shadow-sm"
              : "border-white/[0.07] bg-white/[0.04] text-foreground/75",
            "hover:border-white/30 hover:bg-white/10 hover:text-foreground hover:shadow-md hover:shadow-black/30"
          )}
          aria-label={`${skill.name} — ${skill.level}`}
        >
          {skill.featured && (
            <span
              className="absolute inset-0 rounded-lg opacity-0 group-hover/chip:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)",
              }}
            />
          )}

          <span className="text-sm leading-none shrink-0" aria-hidden>
            {skill.emoji}
          </span>
          <span className="text-sm font-medium leading-none">{skill.name}</span>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[220px] text-xs leading-relaxed text-center"
      >
        <span className="block font-semibold text-foreground mb-0.5">
          {skill.name}
        </span>
        <span className="text-muted-foreground">{skill.tooltip}</span>
      </TooltipContent>
    </Tooltip>
  );
}
