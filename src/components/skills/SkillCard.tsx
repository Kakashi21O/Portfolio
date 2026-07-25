"use client";

import { motion } from "framer-motion";
import { SkillChip } from "./SkillChip";
import type { SkillCategory } from "./types";

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

export function SkillCard({ category, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="relative group flex flex-col h-full rounded-2xl border border-white/8 bg-white/4 backdrop-blur-xl shadow-xl shadow-black/20 p-6 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:bg-white/8 hover:shadow-2xl hover:shadow-black/30"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-start gap-4 mb-5 relative z-10">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-xl shadow-inner group-hover:border-primary/30 group-hover:shadow-[0_0_16px_var(--color-primary)] transition-all duration-500">
          {category.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground tracking-tight">
            {category.title}
          </h3>
          <p className="text-xs text-muted-foreground/70 mt-0.5 leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-border/50 via-border/30 to-transparent mb-5 relative z-10" />

      {/* Skill Chips */}
      <div className="flex flex-wrap gap-2.5 relative z-10">
        {category.skills.map((skill, i) => (
          <SkillChip key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
