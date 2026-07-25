"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timelineData } from "./data";
import type { TimelineItem } from "./data";

function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex items-center gap-8 md:gap-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} text-left`}>
        <motion.div
          whileHover={{ y: -3 }}
          className="relative group p-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-xl shadow-xl shadow-black/20 transition-all duration-500 hover:border-primary/30 hover:bg-white/8 hover:shadow-2xl hover:shadow-black/30 inline-block w-full"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10">
            <div className="text-[10px] font-mono text-primary/70 uppercase tracking-wider mb-1">
              {item.year}
            </div>
            <h3 className="text-base font-semibold text-foreground tracking-tight mb-1.5">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Center Dot */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg shadow-lg transition-all duration-300"
          style={{
            borderColor: item.color,
            backgroundColor: `${item.color}15`,
            boxShadow: `0 0 20px ${item.color}25`,
          }}
        >
          {item.icon}
        </motion.div>
      </div>

      {/* Empty spacer for desktop layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const glow1Y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center items-center overflow-visible"
    >
      {/* Ambient glows */}
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
            Journey
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground max-w-3xl leading-tight"
        >
          From curiosity to engineering — the path so far.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Animated vertical line */}
        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-white/8 -translate-x-1/2">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-primary/60 via-accent/40 to-transparent"
          />
        </div>

        {/* Timeline entries */}
        <div className="space-y-12 md:space-y-16">
          {timelineData.map((item, index) => (
            <TimelineEntry key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
