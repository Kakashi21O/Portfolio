"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineData } from "./data";
import type { TimelineChapter } from "./types";
import { useIsMobile } from "@/hooks/useIsMobile";

function ChapterEntry({
  chapter,
  index,
  isLeft,
}: {
  chapter: TimelineChapter;
  index: number;
  isLeft: boolean;
}) {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const color = chapter.color || "#3b82f6";
  return (
    <motion.div
      initial={isMobile !== false ? false : { opacity: 0, x: isLeft ? -50 : 50, y: 30 }}
      whileInView={isMobile !== false ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex items-center gap-6 md:gap-10 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* ── Content Card ─────────────────────────── */}
      <div className={`flex-1 ${isLeft ? "md:flex md:justify-end" : ""}`}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsExpanded((prev) => !prev)}
          onMouseLeave={() => setIsExpanded(false)}
          className="relative group p-5 rounded-2xl border border-white/[0.09] bg-white/[0.03] backdrop-blur-sm shadow-xl shadow-black/30 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/40 cursor-pointer w-full md:max-w-[420px]"
        >
          {/* Subtle colored accent glow on the card itself */}
          <div
            className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${isLeft ? "100%" : "0%"} 50%, ${color}12 0%, transparent 60%)`,
            }}
          />
          {/* Top edge light strip */}
          <div
            className="absolute top-0 left-6 right-6 h-px rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span
                className="text-[10px] font-mono uppercase tracking-widest font-semibold"
                style={{ color: `${color}dd` }}
              >
                CHAPTER 0{index + 1}
              </span>
              {chapter.age && (
                <span className="text-[10px] font-mono text-muted-foreground uppercase bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full">
                  {chapter.age}
                </span>
              )}
            </div>
            <h3 className="text-base font-semibold text-foreground tracking-tight mb-1.5">
              {chapter.title}
            </h3>
            {chapter.description && (
              <p className="text-xs text-muted-foreground/75 leading-relaxed mb-1">
                {chapter.description}
              </p>
            )}

             {/* Click to expand hint */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium pt-1 select-none" style={{ color: `${color}cc` }}>
              <span>{isExpanded ? "Click to collapse" : "Click to read story"}</span>
              <span
                className="text-xs inline-block transition-transform duration-200"
                style={{ transform: isExpanded ? "rotate(180deg)" : "none" }}
              >
                ↓
              </span>
            </div>
            {/* Story Paragraphs - revealed on click */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2.5 pt-3 mt-2 border-t border-white/[0.06]">
                    {chapter.story.map((paragraph, i) => (
                      <p key={i} className="text-xs text-muted-foreground/85 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ── Center Spine Dot (Balanced UI/UX: Subtle tinted node) ────────────────── */}
      <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-6">
        <motion.div
          initial={isMobile !== false ? false : { scale: 0, opacity: 0 }}
          whileInView={isMobile !== false ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.08 + 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-3 h-3 rounded-full border transition-all duration-300"
          style={{
            backgroundColor: `${color}25`,
            borderColor: `${color}88`,
            boxShadow: `0 0 6px ${color}33`,
          }}
        />
      </div>
      {/* ── Empty spacer (desktop alternate side) ──────────── */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export function Timeline() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-8">
      {/* Center spine on md+, left spine on mobile */}
      <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-px bg-white/[0.08] -translate-x-1/2" />
      {/* Chapters */}
      <div className="space-y-12 md:space-y-16">
        {timelineData.map((chapter, index) => (
          <ChapterEntry
            key={chapter.id}
            chapter={chapter}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
