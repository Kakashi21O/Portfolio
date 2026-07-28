"use client";

import { motion } from "framer-motion";
import { currentlyLearning } from "./data";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function LearningCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative group rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm shadow-xl shadow-black/20 p-6 overflow-hidden col-span-full md:col-span-2 lg:col-span-3 transition-all duration-500 hover:border-amber-500/40 hover:shadow-2xl"
    >
      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-amber-500/10 blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <div className="w-11 h-11 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-xl">
          📚
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground tracking-tight">Currently Learning</h3>
          <p className="text-xs text-muted-foreground/70 mt-0.5">Continuous growth — always expanding the stack.</p>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-amber-500/30 via-amber-500/10 to-transparent mb-5 relative z-10" />

      {/* Learning chips */}
      <div className="flex flex-wrap gap-3 relative z-10">
        {currentlyLearning.map((item, i) => (
          <Tooltip key={item.name}>
            <TooltipTrigger
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-sm font-medium text-amber-300/90 cursor-pointer hover:border-amber-500/60 hover:bg-amber-500/20 hover:shadow-[0_0_16px_rgba(251,191,36,0.25)] transition-all duration-300 select-none"
              aria-label={item.name}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="text-base leading-none" aria-hidden>{item.emoji}</span>
              <span>{item.name}</span>
            </TooltipTrigger>
            <TooltipContent className="max-w-[200px] text-xs text-center leading-relaxed">
              {item.tooltip}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </motion.div>
  );
}
