"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useProjectsData } from "@/hooks/useProjectsData";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilters } from "./ProjectFilters";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import type { Project, ProjectCategory } from "./types";

const LATEST_COUNT = 4;

export function ProjectsSection() {
  const { projects, isFetched, lastUpdated } = useProjectsData();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    let base = projects;

    // "Latest" = 4 most recently pushed (hook already sorts by pushed_at desc)
    if (activeCategory === "Latest") {
      base = projects.slice(0, LATEST_COUNT);
    } else if (activeCategory !== "All") {
      base = projects.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim() === "") return base;

    const q = searchQuery.toLowerCase();
    return base.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }, [projects, activeCategory, searchQuery]);

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center items-center overflow-visible"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-40 -right-24 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none -z-10"
      />
      <div
        className="absolute bottom-40 -left-24 w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      {/* Section Header */}
      <div className="w-full text-center md:text-left mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-6 justify-center md:justify-start"
        >
          <div className="h-[1px] w-12 bg-primary/50" />
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-mono text-primary uppercase tracking-[0.2em]">
              Projects
            </h2>
            <span className="text-[10px] font-mono text-muted-foreground/30 tracking-widest">
              / {String(filteredProjects.length).padStart(2, "0")}
            </span>
          </div>
          {/* Live status badge — mirrors GitHub section exactly */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-primary/20 bg-primary/5 text-primary/80">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                !isFetched
                  ? "bg-yellow-400 animate-pulse"
                  : lastUpdated
                  ? "bg-emerald-400"
                  : "bg-slate-400"
              }`}
            />
            {!isFetched
              ? "Fetching…"
              : lastUpdated
              ? `Live · ${lastUpdated}`
              : "Cached"}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground max-w-3xl leading-tight"
        >
          Selected Work &amp; Engineering Projects
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 text-sm text-muted-foreground/50 max-w-xl font-mono"
        >
          Real systems built from scratch, each with its own engineering story.
        </motion.p>
      </div>

      {/* Search and Filters */}
      <div className="w-full mb-8">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-md mb-6"
        >
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            aria-label="Search projects"
          />
          <Search
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
          />
        </motion.div>

        {/* Filters */}
        <ProjectFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Projects Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard
                project={project}
                index={index}
                onOpenDetails={setSelectedProject}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && isFetched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-muted-foreground/60 text-sm font-mono">
            No projects found matching your criteria.
          </p>
        </motion.div>
      )}

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject!}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
