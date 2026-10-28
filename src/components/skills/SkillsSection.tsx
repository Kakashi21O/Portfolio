"use client";

import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Repeat2 } from "lucide-react";
import { skillCategories, expertiseAreas, currentlyLearning, exploringSkills, techCategories } from "./data";
import { ExpertiseCard } from "./ExpertiseCard";
import { TechTile } from "./TechTile";

const ALL_ID = "all";

const totalCount = skillCategories.reduce((acc, c) => acc + c.skills.length, 0);

interface FlipButtonProps {
  onFlip: () => void;
  targetViewLabel: string;
}

const FlipButton = memo(function FlipButton({ onFlip, targetViewLabel }: FlipButtonProps) {
  return (
    <button
      type="button"
      onClick={onFlip}
      aria-label={`Switch to ${targetViewLabel}`}
      title="Switch view"
      className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 text-muted-foreground hover:text-foreground transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer select-none"
    >
      <Repeat2 className="w-4 h-4 text-primary transition-transform duration-500 group-hover:rotate-180" />
      <span className="hidden sm:inline">Flip View</span>
    </button>
  );
});

const SectionHeader = memo(function SectionHeader() {
  return (
    <div className="w-full text-center md:text-left mb-12 md:mb-16">
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
        className="h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent origin-left max-w-xs mx-auto md:mx-0"
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
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {expertiseAreas.map((area, i) => (
          <ExpertiseCard key={area.id} area={area} index={i} />
        ))}
      </div>
    </div>
  );
});

export function SkillsSection() {
  const [view, setView] = useState<"core" | "explorer">("core");
  const [activeCategory, setActiveCategory] = useState<string>(ALL_ID);
  const shouldReduceMotion = useReducedMotion();

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

  const toggleView = () => setView((prev) => (prev === "core" ? "explorer" : "core"));

  const transitionConfig = {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <section
      id="skills"
      className="relative w-full py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center overflow-visible"
    >
      <div className="absolute top-1/3 -right-32 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-primary/[0.03] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 -left-32 w-[30vw] h-[30vw] max-w-[450px] max-h-[450px] bg-accent/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />

      <SectionHeader />

      {/* ── UNIFIED FIXED TITLE & FLIP VIEW BUTTON BAR ─────────────────────────── */}
      <div className="w-full flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-px w-6 bg-primary/30" />
          <span className="text-[10px] font-mono text-primary/50 uppercase tracking-[0.2em]">
            {view === "core" ? "My Skills" : "Tech Library"}
          </span>
        </div>
        <FlipButton
          onFlip={toggleView}
          targetViewLabel={view === "core" ? "Tech Library" : "My Skills"}
        />
      </div>

      <div className="w-full">
        <AnimatePresence mode="wait" initial={false}>
          {view === "core" ? (
            <motion.div
              key="core-view"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={transitionConfig}
              className="w-full"
            >
              <CoreExpertise />
            </motion.div>
          ) : (
            <motion.div
              key="explorer-view"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={transitionConfig}
              className="w-full"
            >
              {/* ── CATEGORY TABS ───────────────────── */}
              <div className="mb-8">
                <div
                  role="tablist"
                  aria-label="Technology categories"
                  className="flex flex-wrap gap-2.5 sm:gap-3"
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
                          "relative px-4 py-2.5 rounded-xl text-sm font-mono transition-all duration-300 select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer",
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
              </div>

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
                        {activeCategory === ALL_ID
                          ? "All technologies"
                          : activeCategory === "exploring"
                          ? "Exploring"
                          : techCategories.find((t) => t.id === activeCategory)?.label}
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
