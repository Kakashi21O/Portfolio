"use client";

import { motion } from "framer-motion";
import type { ProjectCategory } from "./types";

const categories: ProjectCategory[] = [
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
          className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
            activeCategory === category
              ? "border-primary/60 text-primary bg-primary/10 shadow-[0_0_12px_rgba(0,0,0,0.15)]"
              : "border-white/10 text-foreground/60 bg-white/5 hover:border-white/20 hover:text-foreground/80"
          }`}
        >
          {category}
        </button>
      ))}
    </motion.div>
  );
}
