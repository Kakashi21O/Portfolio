"use client";

import { useRef, useCallback, useState, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const springConfig = { stiffness: 250, damping: 25, mass: 0.5 };

const categoryMotif: Record<string, { glow: string; border: string; tag: string; tagBg: string }> = {
  Backend: { glow: "rgba(167,139,250,", border: "rgba(167,139,250,", tag: "text-primary/60", tagBg: "bg-primary/[0.03]" },
  DevOps: { glow: "rgba(251,191,36,", border: "rgba(251,191,36,", tag: "text-amber-400/60", tagBg: "bg-amber-400/[0.08]" },
  Frontend: { glow: "rgba(56,189,248,", border: "rgba(56,189,248,", tag: "text-sky-400/60", tagBg: "bg-sky-400/[0.08]" },
  AI: { glow: "rgba(52,211,153,", border: "rgba(52,211,153,", tag: "text-emerald-400/60", tagBg: "bg-emerald-400/[0.08]" },
  Automation: { glow: "rgba(52,211,153,", border: "rgba(52,211,153,", tag: "text-emerald-400/60", tagBg: "bg-emerald-400/[0.08]" },
};

export const ProjectCard = memo(function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [2.5, -2.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-2.5, 2.5]), springConfig);
  const liftY = useSpring(0, { stiffness: 300, damping: 20 });

  const hasTilt = !reducedMotion;

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!hasTilt) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    cardRef.current?.style.setProperty("--glow-x", `${x * 100}%`);
    cardRef.current?.style.setProperty("--glow-y", `${y * 100}%`);
  }, [mouseX, mouseY, hasTilt]);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
    if (!hasTilt) return;
    liftY.set(-4);
  }, [hasTilt, liftY]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    if (!hasTilt) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
    liftY.set(0);
    cardRef.current?.style.setProperty("--glow-x", "50%");
    cardRef.current?.style.setProperty("--glow-y", "50%");
  }, [hasTilt, mouseX, mouseY, liftY]);

  const openRepo = useCallback(() => {
    if (project.github) {
      window.open(project.github, "_blank", "noopener,noreferrer");
    }
  }, [project.github]);

  const projectNum = String(index + 1).padStart(2, "0");
  const mc = categoryMotif[project.category] || categoryMotif.Backend;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: hasTilt ? 900 : undefined }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onClick={openRepo}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openRepo(); }}
        role="button"
        tabIndex={0}
        aria-label={`View ${project.title} on GitHub`}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: hasTilt ? rotateX : 0,
          rotateY: hasTilt ? rotateY : 0,
          y: hasTilt ? liftY : 0,
          borderColor: isHovered ? `${mc.border}0.25)` : undefined,
        }}
        className="relative h-full cursor-pointer rounded-2xl border border-white/[0.03] bg-white/[0.01] p-5 overflow-hidden transition-all duration-500 hover:bg-white/[0.02]"
      >
        {/* Pointer glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-500"
          style={{
            opacity: isHovered && hasTilt ? 1 : 0,
            background: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), ${mc.glow}0.07), transparent 60%)`,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-8 right-8 h-px pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(90deg, transparent, ${mc.border}0.2), transparent)`,
          }}
        />

        {/* Content layers with depth */}
        <div className="relative z-10 flex flex-col h-full gap-3">
          {/* Header with number and live demo link */}
          <div
            className="flex items-center justify-between"
            style={{ transform: hasTilt ? "translateZ(8px)" : undefined }}
          >
            <span
              className="text-[11px] font-mono font-medium tracking-[0.2em] select-none"
              style={{ color: `${mc.border}0.5)`, transform: hasTilt ? "translateZ(8px)" : undefined }}
            >
              {projectNum}
            </span>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 -mr-1.5 text-foreground/50 hover:text-primary transition-colors duration-200"
                aria-label={`Live demo for ${project.title}`}
                title="Live Demo"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-xl font-semibold text-foreground tracking-tight leading-snug transition-colors duration-300"
            style={{ transform: hasTilt ? "translateZ(18px)" : undefined }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm text-foreground/60 leading-relaxed flex-1"
            style={{ transform: hasTilt ? "translateZ(12px)" : undefined }}
          >
            {project.shortDescription || project.description}
          </p>

          {/* Tech tags */}
          <div
            className="flex flex-wrap gap-1.5 mt-auto pt-2"
            style={{ transform: hasTilt ? "translateZ(22px)" : undefined }}
          >
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`text-[11px] font-mono ${mc.tag} ${mc.tagBg} px-2 py-0.5 rounded-md`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});
