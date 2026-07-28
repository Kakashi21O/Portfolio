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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative group rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 overflow-hidden col-span-full transition-colors duration-500 hover:border-white/15 hover:bg-white/[0.06]"
    >
      {/* Subtle top shimmer on hover */}
      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.06] flex items-center justify-center text-lg">
          📚
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground/90 tracking-tight">
            Currently Learning
          </h3>
          <p className="text-[11px] text-muted-foreground/50 mt-0.5">
            Continuous growth — always expanding the stack.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-wider">
            Active
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-4" />

      {/* Learning chips — horizontal flow */}
      <div className="flex flex-wrap gap-2">
        {currentlyLearning.map((item, i) => (
          <Tooltip key={item.name}>
            <TooltipTrigger>
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.35,
                  delay: 0.35 + i * 0.065,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.04] text-foreground/75 text-sm font-medium cursor-pointer select-none transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-foreground"
                aria-label={item.name}
              >
                <span className="text-sm leading-none shrink-0" aria-hidden>
                  {item.emoji}
                </span>
                <span>{item.name}</span>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="max-w-[220px] text-xs leading-relaxed text-center"
            >
              <span className="block font-semibold text-foreground mb-0.5">
                {item.name}
              </span>
              <span className="text-muted-foreground">{item.tooltip}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </motion.div>
  );
}
