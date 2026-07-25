"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skillCategories } from "./data";
import { SkillCard } from "./SkillCard";
import { LearningCard } from "./LearningCard";

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const glow1Y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center items-center overflow-visible"
    >
      {/* Ambient background glows */}
      <motion.div
        style={{ y: glow1Y }}
        className="absolute top-40 -right-24 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none -z-10"
      />
      <motion.div
        style={{ y: glow2Y }}
        className="absolute bottom-40 -left-24 w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      {/* Section Header */}
      <div className="w-full text-center md:text-left mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-6 justify-center md:justify-start"
        >
          <div className="h-[1px] w-12 bg-primary/50" />
          <h2 className="text-sm font-mono text-primary uppercase tracking-[0.2em]">
            Skills &amp; Technologies
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground max-w-3xl leading-tight"
        >
          The technologies I enjoy building with and the ones I&apos;m currently exploring.
        </motion.p>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start"
          aria-label="Skill level legend"
        >
          {[
            { label: "Primary",     color: "border-primary/60 text-primary bg-primary/10" },
            { label: "Comfortable", color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" },
            { label: "Learning",    color: "border-amber-500/40 text-amber-400 bg-amber-500/10" },
            { label: "Exploring",   color: "border-violet-500/40 text-violet-400 bg-violet-500/10" },
          ].map(({ label, color }) => (
            <span
              key={label}
              className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg border ${color}`}
            >
              {label}
            </span>
          ))}
          <span className="text-xs text-muted-foreground/50 self-center font-mono ml-2">
            — no fake percentages
          </span>
        </motion.div>
      </div>

      {/* Category Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {skillCategories.map((category, index) => (
          <SkillCard key={category.id} category={category} index={index} />
        ))}
        <LearningCard />
      </div>
    </section>
  );
}
