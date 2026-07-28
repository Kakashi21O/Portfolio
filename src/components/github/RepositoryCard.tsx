"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import type { PinnedRepository } from "./types";

interface RepositoryCardProps {
  repo: PinnedRepository;
  index: number;
}

export function RepositoryCard({ repo, index }: RepositoryCardProps) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="relative group flex flex-col p-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm shadow-xl shadow-black/20 transition-all duration-500 hover:border-primary/30 hover:bg-white/8 hover:shadow-2xl hover:shadow-black/30 cursor-pointer"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
            {repo.name}
          </h4>
          <ExternalLink size={12} className="text-muted-foreground/30 group-hover:text-primary/50 transition-colors flex-shrink-0 mt-0.5" />
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground/60 leading-relaxed mb-3 line-clamp-2">
          {repo.description}
        </p>

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="text-[9px] font-mono text-accent/70 px-1.5 py-0.5 rounded-md bg-accent/10 border border-accent/10"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground/50">
          {/* Language */}
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: repo.languageColor }}
            />
            {repo.language}
          </span>

          {/* Stars */}
          <span className="flex items-center gap-1">
            <Star size={10} />
            {repo.stars}
          </span>

          {/* Forks */}
          <span className="flex items-center gap-1">
            <GitFork size={10} />
            {repo.forks}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
