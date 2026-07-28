"use client";

import { motion } from "framer-motion";
import type { Language } from "./types";

interface LanguageBarProps {
  languages: Language[];
}

export function LanguageBar({ languages }: LanguageBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="p-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm shadow-xl shadow-black/20"
    >
      <h3 className="text-lg font-semibold text-foreground tracking-tight mb-4">
        Languages
      </h3>

      {/* Stacked bar */}
      <div className="w-full h-3 rounded-full overflow-hidden flex mb-4 bg-white/5">
        {languages.map((lang) => (
          <motion.div
            key={lang.name}
            initial={{ width: 0 }}
            whileInView={{ width: `${lang.percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
            style={{ backgroundColor: lang.color }}
            title={`${lang.name}: ${lang.percentage}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: lang.color }}
            />
            {lang.name}
            <span className="text-muted-foreground/30">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
