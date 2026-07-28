"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillChip } from "./SkillChip";
import type { SkillCategory } from "./types";

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

export function SkillCard({ category, index }: SkillCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group flex flex-col h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 overflow-hidden transition-colors duration-500 hover:border-white/15 hover:bg-white/[0.06]"
    >
      {/* Subtle top-edge light strip on hover */}
      <motion.div
        className="absolute top-0 left-8 right-8 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Card Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl border border-white/10 bg-white/[0.06] flex items-center justify-center text-lg transition-colors duration-500 group-hover:border-white/20">
          {category.icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground/90 tracking-tight">
            {category.title}
          </h3>
          <p className="text-[11px] text-muted-foreground/50 mt-0.5 leading-relaxed">
            {category.description}
          </p>
        </div>
        {/* Skill count badge */}
        <span className="ml-auto text-[10px] font-mono text-muted-foreground/40 tabular-nums shrink-0">
          {category.skills.length} skills
        </span>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-4" />

      {/* Skill Chips — only re-animate when card becomes visible */}
      <AnimatePresence>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <SkillChip key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}
