"use client";

import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, expertiseAreas, currentlyLearning, exploringSkills, techCategories } from "./data";
import { ExpertiseCard } from "./ExpertiseCard";
import { TechTile } from "./TechTile";

const ALL_ID = "all";

const totalCount = skillCategories.reduce((acc, c) => acc + c.skills.length, 0);

const SectionHeader = memo(function SectionHeader() {
  return (
    <div className="w-full text-center md:text-left mb-16 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4 mb-5 justify-center md:justify-start"
      >
        <div className="h-px w-10 bg-primary/40" />
        <h2 className="text-xs font-mono text-primary/70 uppercase tracking-[0.25em]">
          Skills &amp; Technologies
        </h2>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl md:text-5xl font-medium tracking-tight text-foreground max-w-2xl leading-tight mb-4"
      >
        Technologies I use to design, build, deploy and improve software.
      </motion.h3>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent origin-left max-w-xs"
      />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-4 text-xs font-mono text-muted-foreground/40 tracking-widest uppercase"
      >
        {totalCount} technologies &middot; {expertiseAreas.length} core areas &middot; {currentlyLearning.length} exploring
      </motion.p>
    </div>
  );
});

const CoreExpertise = memo(function CoreExpertise() {
  return (
    <div className="w-full mb-20 md:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="h-px w-6 bg-primary/30" />
        <span className="text-[10px] font-mono text-primary/50 uppercase tracking-[0.2em]">
          Core Expertise
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {expertiseAreas.map((area, i) => (
          <ExpertiseCard key={area.id} area={area} index={i} />
        ))}
      </div>
    </div>
  );
});

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_ID);

  const filteredSkills = useMemo(() => {
    if (activeCategory === ALL_ID) {
      return skillCategories.flatMap((c) => c.skills);
    }
    if (activeCategory === "exploring") {
      return exploringSkills;
    }
    const cat = skillCategories.find((c) => c.id === activeCategory);
    return cat ? cat.skills : [];
  }, [activeCategory]);

  return (
    <section
      id="skills"
      className="relative w-full py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center overflow-visible"
    >
      <div className="absolute top-1/3 -right-32 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-primary/[0.03] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 -left-32 w-[30vw] h-[30vw] max-w-[450px] max-h-[450px] bg-accent/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />

      <SectionHeader />
      <CoreExpertise />

      {/* ── TECHNOLOGY EXPLORER ──────────────────────────────── */}
      <div className="w-full mb-20 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-6 bg-primary/30" />
          <span className="text-[10px] font-mono text-primary/50 uppercase tracking-[0.2em]">
            Technology Explorer
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div
            role="tablist"
            aria-label="Technology categories"
            className="flex flex-wrap gap-3"
          >
            {techCategories.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={[
                    "relative px-4 py-2.5 rounded-xl text-sm font-mono transition-all duration-300 select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                    isActive
                      ? "bg-white/10 border border-white/20 text-foreground shadow-sm"
                      : "border border-transparent text-muted-foreground/50 hover:text-foreground/70 hover:border-white/10 hover:bg-white/[0.04]",
                  ].join(" ")}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skills-tab-pill"
                      className="absolute inset-0 rounded-xl bg-white/8"
                      transition={{ type: "spring", stiffness: 380, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="min-h-[320px] sm:min-h-[280px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              layout
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono text-muted-foreground/40 tracking-wider">
                  {activeCategory === ALL_ID ? "All technologies" : activeCategory === "exploring" ? "Exploring" : techCategories.find((t) => t.id === activeCategory)?.label}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/30">
                  / {String(filteredSkills.length).padStart(2, "0")}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {filteredSkills.map((skill, i) => (
                  <TechTile key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
