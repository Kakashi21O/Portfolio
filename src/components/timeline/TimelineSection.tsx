"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { timelineData } from "./data";
import type { TimelineItem } from "./data";

/* ─── Per-entry card with 3-D tilt ─────────────────────────────── */
function TimelineEntry({
  item,
  index,
  isLeft,
}: {
  item: TimelineItem;
  index: number;
  isLeft: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 260, damping: 20 };
  const rx = useSpring(rotateX, springConfig);
  const ry = useSpring(rotateY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const cx = (e.clientX - left) / width - 0.5;
    const cy = (e.clientY - top) / height - 0.5;
    rotateX.set(-cy * 10);
    rotateY.set(cx * 10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex items-center gap-6 md:gap-10 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
      style={{ perspective: 1200 }}
    >
      {/* ── Content Card ─────────────────────────── */}
      <div className={`flex-1 ${isLeft ? "md:flex md:justify-end" : ""}`}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="relative group p-5 rounded-2xl border border-white/[0.09] bg-white/[0.03] backdrop-blur-sm shadow-xl shadow-black/30 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/40 cursor-default w-full md:max-w-[340px]"
        >
          {/* Glimmer on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${item.color}14 0%, transparent 65%)`,
            }}
          />
          {/* Top edge light strip */}
          <div
            className="absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${item.color}60, transparent)` }}
          />

          {/* 3-D elevated content layer */}
          <div style={{ transform: "translateZ(16px)" }} className="relative z-10">
            <div
              className="text-[10px] font-mono uppercase tracking-widest mb-1.5 font-medium"
              style={{ color: `${item.color}cc` }}
            >
              {item.year}
            </div>
            <h3 className="text-base font-semibold text-foreground tracking-tight mb-1.5">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground/55 leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Center Spine Dot ─────────────────────── */}
      <div className="relative z-10 flex-shrink-0 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.07 + 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.25 }}
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg shadow-lg transition-shadow duration-300"
          style={{
            borderColor: `${item.color}99`,
            backgroundColor: `${item.color}18`,
            boxShadow: `0 0 0 4px ${item.color}10, 0 0 24px ${item.color}30`,
          }}
        >
          {item.icon}
        </motion.div>
      </div>

      {/* ── Empty spacer (desktop only) ──────────── */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll-driven line draw
  const rawHeight = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "100%"]);
  const lineHeight = useSpring(rawHeight, { stiffness: 80, damping: 25 });

  // Parallax for ambient glows
  const glow1Y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center items-center overflow-visible"
    >
      {/* Parallax ambient glows */}
      <motion.div
        style={{ y: glow1Y }}
        className="absolute top-40 -right-24 w-[30vw] h-[30vw] max-w-[420px] max-h-[420px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10"
      />
      <motion.div
        style={{ y: glow2Y }}
        className="absolute bottom-40 -left-24 w-[22vw] h-[22vw] max-w-[320px] max-h-[320px] bg-accent/4 rounded-full blur-[120px] pointer-events-none -z-10"
      />

      {/* ── Section Header ───────────────────────── */}
      <div className="w-full text-center md:text-left mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-5 justify-center md:justify-start"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-12 bg-primary/50 origin-left"
          />
          <h2 className="text-xs font-mono text-primary/70 uppercase tracking-[0.25em]">
            Journey
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground max-w-3xl leading-tight"
        >
          From curiosity to engineering —{" "}
          <span className="text-foreground/40">the path so far.</span>
        </motion.p>
      </div>

      {/* ── Timeline ─────────────────────────────── */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Vertical spine */}
        <div
          ref={spineRef}
          className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-1/2"
        >
          {/* Scroll-driven fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="w-full origin-top rounded-full"
            css={{}}
          >
            <div className="w-full h-full bg-gradient-to-b from-primary/70 via-accent/50 to-transparent" />
          </motion.div>
          {/* Ambient glow on the spine */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute inset-0 w-[3px] -left-px blur-sm origin-top"
          >
            <div className="w-full h-full bg-gradient-to-b from-primary/40 via-accent/30 to-transparent" />
          </motion.div>
        </div>

        {/* Entries */}
        <div className="space-y-12 md:space-y-16">
          {timelineData.map((item, index) => (
            <TimelineEntry
              key={item.id}
              item={item}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
