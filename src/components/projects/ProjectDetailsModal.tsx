"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  ExternalLink,
  GitFork,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Layers,
  Target,
  Code,
  Puzzle,
  AlertTriangle,
  BarChart3,
  Lightbulb,
  Rocket,
  X,
} from "lucide-react";
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

interface ProjectDetailsModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

function SectionCollapsible({
  title,
  icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/8 rounded-xl overflow-hidden bg-white/3 backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-white/5 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-primary">{icon}</span>
        <span className="text-lg font-semibold text-foreground tracking-tight flex-1">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp size={16} className="text-muted-foreground/50" />
        ) : (
          <ChevronDown size={16} className="text-muted-foreground/50" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProjectDetailsModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailsModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const projectId = project && typeof project === "object" ? project.id : "";
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";

      lenis?.stop();
      scrollRef.current?.scrollTo(0, 0);
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollYRef.current);

      lenis?.start();
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    if (!isOpen) return;
    scrollRef.current?.scrollTo(0, 0);
  }, [isOpen, projectId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overscrollBehavior: "contain" }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl mx-4 my-8 rounded-2xl border border-white/10 bg-[hsl(var(--background))] shadow-2xl shadow-black/40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Banner */}
            <div className="relative h-64 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md text-foreground/70 hover:text-foreground hover:border-white/20 transition-all duration-200"
                aria-label="Close project details"
              >
                <X size={18} />
              </button>

              {/* Project Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <div className="flex items-center gap-3 mb-3">
                  {project.featured && (
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg border border-primary/50 bg-primary/20 text-primary">
                      Featured
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                      project.status === "Completed"
                        ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                        : "border-amber-500/40 text-amber-400 bg-amber-500/10"
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground/50">
                    {project.year}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                  {project.title}
                </h2>

                <p className="text-muted-foreground/70 max-w-2xl leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech) => {
                    const icon = iconMap[tech];
                    return (
                      <span
                        key={tech}
                        className="flex items-center gap-1.5 text-[11px] font-mono text-foreground/70 px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
                      >
                        {icon && (
                          <TechIcon
                            path={icon.path}
                            color={icon.color}
                            size={12}
                          />
                        )}
                        {tech}
                      </span>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-200"
                    >
                      <GitFork size={14} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-200"
                    >
                      <ExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-6 md:p-8 space-y-4">
              {/* Overview */}
              <SectionCollapsible
                title="Overview"
                icon={<Target size={18} />}
              >
                <div className="pt-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground/80 mb-1">
                      Problem
                    </h4>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground/80 mb-1">
                      Planning
                    </h4>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed">
                      {project.planning}
                    </p>
                  </div>
                </div>
              </SectionCollapsible>

              {/* Development */}
              <SectionCollapsible
                title="Development"
                icon={<Code size={18} />}
              >
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">
                    {project.development}
                  </p>
                </div>
              </SectionCollapsible>

              {/* Architecture */}
              <SectionCollapsible
                title="Architecture"
                icon={<Layers size={18} />}
              >
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">
                    {project.architecture}
                  </p>
                </div>
              </SectionCollapsible>

              {/* Features */}
              <SectionCollapsible
                title="Features"
                icon={<Puzzle size={18} />}
              >
                <div className="pt-4">
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground/70"
                      >
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </SectionCollapsible>

              {/* Challenges & Solutions */}
              <SectionCollapsible
                title="Challenges & Solutions"
                icon={<AlertTriangle size={18} />}
              >
                <div className="pt-4 space-y-4">
                  {project.challenges.map((challenge, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="mt-1 w-2 h-2 rounded-full bg-amber-500/60 flex-shrink-0" />
                        <p className="text-sm text-foreground/80 font-medium">
                          {challenge}
                        </p>
                      </div>
                      {project.solutions[i] && (
                        <div className="flex items-start gap-2 ml-4">
                          <ArrowRight
                            size={12}
                            className="mt-1 text-emerald-500/60 flex-shrink-0"
                          />
                          <p className="text-sm text-muted-foreground/70">
                            {project.solutions[i]}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SectionCollapsible>

              {/* Metrics */}
              <SectionCollapsible
                title="Metrics"
                icon={<BarChart3 size={18} />}
                defaultOpen={false}
              >
                <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-xl border border-white/5 bg-white/3">
                    <div className="text-2xl font-bold text-primary">
                      {project.metrics.commits}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider mt-1">
                      Commits
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-xl border border-white/5 bg-white/3">
                    <div className="text-2xl font-bold text-primary">
                      {project.metrics.files}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider mt-1">
                      Files
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-xl border border-white/5 bg-white/3">
                    <div className="text-2xl font-bold text-primary">
                      {project.metrics.duration}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider mt-1">
                      Duration
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-xl border border-white/5 bg-white/3">
                    <div className="text-2xl font-bold text-primary">
                      {project.metrics.teamSize}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider mt-1">
                      Team Size
                    </div>
                  </div>
                </div>
              </SectionCollapsible>

              {/* Results */}
              {project.results.length > 0 && (
                <SectionCollapsible
                  title="Results"
                  icon={<Lightbulb size={18} />}
                  defaultOpen={false}
                >
                  <div className="pt-4">
                    <ul className="space-y-2">
                      {project.results.map((result) => (
                        <li
                          key={result}
                          className="flex items-start gap-2 text-sm text-muted-foreground/70"
                        >
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500/60 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionCollapsible>
              )}

              {/* Future Roadmap */}
              <SectionCollapsible
                title="Future Roadmap"
                icon={<Rocket size={18} />}
                defaultOpen={false}
              >
                <div className="pt-4">
                  <ul className="space-y-2">
                    {project.futurePlans.map((plan) => (
                      <li
                        key={plan}
                        className="flex items-start gap-2 text-sm text-muted-foreground/70"
                      >
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                        {plan}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionCollapsible>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
