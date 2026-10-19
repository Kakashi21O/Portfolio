"use client";

import { motion } from "framer-motion";
import type { ProjectCategory } from "./types";

const categories: ProjectCategory[] = [
  "Latest",
  "All",
  "Backend",
  "Frontend",
  "AI",
  "DevOps",
];


interface ProjectFiltersProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
}

export function ProjectFilters({ activeCategory, onCategoryChange }: ProjectFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap gap-2 mb-8"
      role="tablist"
      aria-label="Filter projects by category"
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          role="tab"
          aria-selected={activeCategory === category}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider border transition-all duration-300 ${
            activeCategory === category
              ? "border-primary/50 text-primary bg-primary/10 shadow-[0_0_12px_rgba(167,139,250,0.15)] font-semibold"
              : "border-white/[0.08] text-muted-foreground/70 bg-white/[0.02] hover:border-white/20 hover:text-foreground hover:bg-white/[0.05]"
          }`}
        >
          {category}
        </button>
      ))}
    </motion.div>
  );
}
