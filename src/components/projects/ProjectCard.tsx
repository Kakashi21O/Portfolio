"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork, ArrowRight } from "lucide-react";
import Image from "next/image";
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

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetails?: (project: Project) => void;
}

export function ProjectCard({ project, index, onOpenDetails }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="relative group flex flex-col h-full rounded-2xl border border-white/8 bg-white/4 backdrop-blur-xl shadow-xl shadow-black/20 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:bg-white/8 hover:shadow-2xl hover:shadow-black/30"
    >
      {/* Cover Image */}
      <div className="relative h-36 sm:h-48 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent overflow-hidden">
        {project.thumbnail && (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg border border-primary/50 bg-primary/20 text-primary">
              Featured
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
            project.status === "Completed" 
              ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
              : "border-amber-500/40 text-amber-400 bg-amber-500/10"
          }`}>
            {project.status}
          </span>
        </div>

        {/* Year */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-xs font-mono text-white/60">{project.year}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 relative z-10">
        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground/70 leading-relaxed mb-4">
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 5).map((tech) => {
            const icon = iconMap[tech];
            return (
              <span
                key={tech}
                className="flex items-center gap-1.5 text-[11px] font-mono text-foreground/70 px-2 py-1 rounded-md border border-white/10 bg-white/5"
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

        {/* Features Preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="text-[10px] font-mono text-accent/80 px-2 py-0.5 rounded-md bg-accent/10"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium text-foreground/70 hover:text-primary transition-colors duration-200"
              aria-label={`View ${project.title} on GitHub`}
            >
              <GitFork size={14} />
              <span>Code</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium text-foreground/70 hover:text-primary transition-colors duration-200"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink size={14} />
              <span>Demo</span>
            </a>
          )}
          <div className="flex-1" />
          <button
            onClick={() => onOpenDetails?.(project)}
            className="flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            aria-label={`View ${project.title} case study`}
          >
            <span>Case Study</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
