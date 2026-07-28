"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "./data";
import { SkillCard } from "./SkillCard";
import { LearningCard } from "./LearningCard";

const ALL_ID = "all";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_ID);

  const tabs = [
    { id: ALL_ID, label: "All", icon: "✦" },
    ...skillCategories.map((c) => ({ id: c.id, label: c.title, icon: c.icon })),
  ];

  const visibleCategories =
    activeCategory === ALL_ID
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center items-center overflow-visible"
    >
      {/* Ambient background glows — very subtle */}
      <div className="absolute top-40 -right-24 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-primary/4 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 -left-24 w-[22vw] h-[22vw] max-w-[300px] max-h-[300px] bg-primary/3 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ─── Section Header ─────────────────────────────────────── */}
      <div className="w-full text-center md:text-left mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-5 justify-center md:justify-start"
        >
          <div className="h-px w-10 bg-primary/40" />
          <h2 className="text-xs font-mono text-primary/70 uppercase tracking-[0.25em]">
            Skills &amp; Technologies
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-medium tracking-tight text-foreground max-w-2xl leading-tight"
        >
          The technologies I build with, and the ones I&apos;m exploring.
        </motion.p>

        {/* Minimal legend — text only, no colored chips */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-xs font-mono text-muted-foreground/40 tracking-widest uppercase"
        >
          Hover any skill for context &nbsp;·&nbsp; no fake percentages
        </motion.p>
      </div>

      {/* ─── Category Filter Tabs ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="w-full mb-10"
      >
        <div
          role="tablist"
          aria-label="Skill categories"
          className="flex flex-wrap gap-2"
        >
          {tabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(tab.id)}
                className={[
                  "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                  isActive
                    ? "bg-white/10 border border-white/20 text-foreground shadow-sm"
                    : "bg-transparent border border-transparent text-muted-foreground/60 hover:text-foreground/80 hover:border-white/10 hover:bg-white/[0.04]",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl bg-white/8"
                    transition={{ type: "spring", stiffness: 380, damping: 35 }}
                  />
                )}
                <span className="relative z-10 text-[13px] leading-none" aria-hidden>
                  {tab.icon}
                </span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ─── Cards Grid ─────────────────────────────────────────── */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={[
              "w-full grid gap-5",
              activeCategory === ALL_ID
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1",
            ].join(" ")}
          >
            {visibleCategories.map((category, index) => (
              <SkillCard
                key={category.id}
                category={category}
                index={activeCategory === ALL_ID ? index : 0}
              />
            ))}

            {/* Learning card — always at the bottom */}
            {activeCategory === ALL_ID && <LearningCard />}
          </motion.div>
        </AnimatePresence>

        {/* When a single category is focused, show learning card below */}
        {activeCategory !== ALL_ID && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-5"
          >
            <LearningCard />
          </motion.div>
        )}
      </div>
    </section>
  );
}
