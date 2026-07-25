"use client";

import { TechIcon } from "./TechIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { TechItem as TechItemType } from "./types";

interface TechItemProps {
  item: TechItemType;
}

export function TechItem({ item }: TechItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        className={`relative group/item flex items-center gap-2.5 cursor-pointer select-none px-3 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_var(--color-primary)] hover:border-primary/60 ${
          item.featured
            ? "px-4 py-2.5 border-primary/50 bg-primary/10 shadow-[0_0_12px_rgba(0,0,0,0.15)]"
            : "border-white/10 bg-white/5"
        }`}
        aria-label={item.name}
      >
        {/* Hover glow layer */}
        <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <TechIcon
          path={item.iconPath}
          color={item.iconColor}
          size={item.featured ? 22 : 18}
          className="relative z-10 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110"
        />

        <span className="relative z-10 text-sm font-medium text-foreground/90 group-hover/item:text-white transition-colors duration-200">
          {item.name}
        </span>

        {/* Featured badge */}
        {item.featured && (
          <span className="absolute -top-1.5 -right-1.5 text-[10px] leading-none z-20" aria-hidden>
            ⭐
          </span>
        )}
      </TooltipTrigger>
      <TooltipContent className="max-w-[220px] text-xs text-center leading-relaxed">
        {item.description}
      </TooltipContent>
    </Tooltip>
  );
}
