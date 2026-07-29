"use client";

import { useRef, useCallback, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate, useReducedMotion } from "framer-motion";
import { ExternalLink, GitFork, ArrowRight } from "lucide-react";
import { TechIcon } from "@/components/tech-stack/TechIcon";
import {
  siPython,
  siFastapi,
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siDocker,
  siLinux,
  siGit,
  siGithub,
  siNginx,
  siVercel,
  siPostgresql,
  siRedis,
} from "simple-icons";
import type { Project } from "./types";
import { ProjectMotif } from "./ProjectMotif";

const iconMap: Record<string, { path: string; color: string }> = {
  Python: { path: siPython.path, color: `#${siPython.hex}` },
  FastAPI: { path: siFastapi.path, color: `#${siFastapi.hex}` },
  React: { path: siReact.path, color: `#${siReact.hex}` },
  "Next.js": { path: siNextdotjs.path, color: `#${siNextdotjs.hex}` },
  TypeScript: { path: siTypescript.path, color: `#${siTypescript.hex}` },
  "Tailwind CSS": { path: siTailwindcss.path, color: `#${siTailwindcss.hex}` },
  Docker: { path: siDocker.path, color: `#${siDocker.hex}` },
  Linux: { path: siLinux.path, color: `#${siLinux.hex}` },
  Git: { path: siGit.path, color: `#${siGit.hex}` },
  GitHub: { path: siGithub.path, color: `#${siGithub.hex}` },
  Nginx: { path: siNginx.path, color: `#${siNginx.hex}` },
  Vercel: { path: siVercel.path, color: `#${siVercel.hex}` },
  PostgreSQL: { path: siPostgresql.path, color: `#${siPostgresql.hex}` },
  Redis: { path: siRedis.path, color: `#${siRedis.hex}` },
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetails?: (project: Project) => void;
}

const springConfig = { stiffness: 250, damping: 25, mass: 0.5 };

export function ProjectCard({ project, index, onOpenDetails }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), springConfig);
  const liftY = useSpring(0, { stiffness: 300, damping: 20 });
  const cardScale = useSpring(1, { stiffness: 300, damping: 20 });

  const hasTilt = !reducedMotion && !isTouchDevice;

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
    cardScale.set(1.008);
  }, [hasTilt, liftY, cardScale]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    if (!hasTilt) return;
    animate(mouseX, 0.5, { duration: 0.3 });
    animate(mouseY, 0.5, { duration: 0.3 });
    liftY.set(0);
    cardScale.set(1);
    cardRef.current?.style.setProperty("--glow-x", "50%");
    cardRef.current?.style.setProperty("--glow-y", "50%");
  }, [hasTilt, mouseX, mouseY, liftY, cardScale]);

  const handleCardClick = useCallback(() => {
    onOpenDetails?.(project);
  }, [onOpenDetails, project]);

  const handleLinkClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const isLeft = index % 2 === 0;
  const projectNum = String(index + 1).padStart(2, "0");

  const alternateReveal = useMemo(() => ({
    hidden: {
      opacity: 0,
      x: reducedMotion ? 0 : isLeft ? -50 : 50,
      rotateY: reducedMotion ? 0 : isLeft ? -2 : 2,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }), [isLeft, index, reducedMotion]);

  return (
    <motion.div
      variants={alternateReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{ perspective: hasTilt ? 800 : undefined }}
      className="h-full"
    >
      <motion.article
        ref={cardRef}
        onClick={handleCardClick}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: hasTilt ? rotateX : 0,
          rotateY: hasTilt ? rotateY : 0,
          y: hasTilt ? liftY : 0,
          scale: hasTilt ? cardScale : 1,
        }}
        className={`relative h-full cursor-pointer rounded-2xl border transition-colors duration-500 overflow-hidden ${
          isHovered
            ? "border-primary/30 bg-[#1a1a1a]"
            : "border-white/8 bg-[#151515]"
        }`}
        role="button"
        tabIndex={0}
        aria-label={`View ${project.title} details`}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleCardClick(); }}
      >
        {/* Glow overlay */}
        <div
          className={`absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-500 ${
            isHovered && hasTilt ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(167, 139, 250, 0.1), transparent 60%)",
          }}
        />

        {/* Background motif */}
        <div className="absolute inset-0 z-[1]" style={{ transform: "translateZ(0)" }}>
          <ProjectMotif category={project.category} isHovered={isHovered} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-6">
          {/* Top row: Number, Featured, Status */}
          <div
            className="flex items-center gap-3 mb-5"
            style={{ transform: "translateZ(8px)" }}
          >
            <span className="text-[11px] font-mono text-white/30 tracking-widest select-none">
              {projectNum}
            </span>

            {project.featured && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-primary/40 bg-primary/15 text-primary/80">
                Featured
              </span>
            )}

            <div className="flex-1" />

            <div className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  project.status === "Completed"
                    ? "bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.3)]"
                    : "bg-amber-500 animate-pulse"
                }`}
              />
              <span
                className={`text-[10px] font-mono uppercase tracking-wider ${
                  project.status === "Completed"
                    ? "text-emerald-400/70"
                    : "text-amber-400/70"
                }`}
              >
                {project.status}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-3 transition-colors duration-300 ${
              isHovered ? "text-primary" : "text-foreground"
            }`}
            style={{ transform: "translateZ(18px)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm text-muted-foreground/70 leading-relaxed max-w-lg mb-5"
            style={{ transform: "translateZ(12px)" }}
          >
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div
            className="flex flex-wrap gap-1.5 mb-4"
            style={{ transform: "translateZ(20px)" }}
          >
            {project.technologies.slice(0, 5).map((tech) => {
              const icon = iconMap[tech];
              return (
                <span
                  key={tech}
                  className={`flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded-md border transition-all duration-200 ${
                    isHovered
                      ? "border-white/15 bg-white/8 text-foreground/80"
                      : "border-white/10 bg-white/5 text-foreground/70"
                  }`}
                >
                  {icon && (
                    <TechIcon path={icon.path} color={icon.color} size={12} />
                  )}
                  {tech}
                </span>
              );
            })}
            {project.technologies.length > 5 && (
              <span className="text-[11px] font-mono text-muted-foreground/50 px-2 py-1">
                +{project.technologies.length - 5} more
              </span>
            )}
          </div>

          {/* Highlights */}
          <div
            className="flex flex-wrap gap-x-4 gap-y-1 mb-5"
            style={{ transform: "translateZ(10px)" }}
          >
            {project.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="text-[11px] text-accent/70 flex items-center gap-1.5"
              >
                <span className="w-1 h-1 rounded-full bg-accent/50" />
                {feature}
              </span>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div
            className="flex items-center gap-4 pt-4 border-t border-white/5"
            style={{ transform: "translateZ(24px)" }}
          >
            <span className="text-xs font-mono text-muted-foreground/50">
              {project.year}
            </span>

            <div className="flex-1" />

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex items-center gap-1.5 text-xs font-medium text-foreground/60 hover:text-primary transition-colors duration-200"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GitFork size={13} />
                <span>Code</span>
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex items-center gap-1.5 text-xs font-medium text-foreground/60 hover:text-primary transition-colors duration-200"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink size={13} />
                <span>Live</span>
              </a>
            )}

            <button
              onClick={(e) => { e.stopPropagation(); onOpenDetails?.(project); }}
              className="flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-all duration-200 group"
              aria-label={`View ${project.title} case study`}
            >
              <span>Study</span>
              <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
