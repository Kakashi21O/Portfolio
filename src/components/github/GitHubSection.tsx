"use client";

import { motion } from "framer-motion";
import { GitFork, Star, Users, TrendingUp } from "lucide-react";
import githubData from "../../../data/github.json";
import { RepositoryCard } from "./RepositoryCard";
import { LanguageBar } from "./LanguageBar";
import { ActivityFeed } from "./ActivityFeed";
import type { GitHubData } from "./types";

const data = githubData as GitHubData;

function StatCard({
  label,
  value,
  icon,
  delay,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative group flex flex-col items-center p-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm shadow-xl shadow-black/20 transition-all duration-500 hover:border-primary/30 hover:bg-white/8"
    >
      <div className="text-primary mb-2">{icon}</div>
      <div className="text-3xl font-bold text-foreground tracking-tight">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider mt-1">
        {label}
      </div>
    </motion.div>
  );
}

export function GitHubSection() {
  return (
    <section
      id="github"
      className="relative w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center items-center overflow-visible"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-40 -right-24 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-accent/5 rounded-full blur-[130px] pointer-events-none -z-10"
      />
      <div
        className="absolute bottom-40 -left-24 w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      {/* Section Header */}
      <div className="w-full text-center md:text-left mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-6 justify-center md:justify-start"
        >
          <div className="h-[1px] w-12 bg-accent/50" />
          <h2 className="text-sm font-mono text-accent uppercase tracking-[0.2em]">
            GitHub
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground max-w-3xl leading-tight"
        >
          Open source contributions and active development.
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard
          label="Contributions"
          value={data.stats.contributions}
          icon={<TrendingUp size={20} />}
          delay={0}
        />
        <StatCard
          label="Stars"
          value={data.stats.totalStars}
          icon={<Star size={20} />}
          delay={0.05}
        />
        <StatCard
          label="Forks"
          value={data.stats.totalForks}
          icon={<GitFork size={20} />}
          delay={0.1}
        />
        <StatCard
          label="Followers"
          value={data.stats.followers}
          icon={<Users size={20} />}
          delay={0.15}
        />
      </div>

      {/* Two Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Languages + Activity */}
        <div className="lg:col-span-1 space-y-6">
          <LanguageBar languages={data.languages} />
          <ActivityFeed activity={data.recentActivity} />
        </div>

        {/* Right: Pinned Repositories */}
        <div className="lg:col-span-2">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg font-semibold text-foreground tracking-tight mb-4"
          >
            Pinned Repositories
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.pinnedRepositories.map((repo, index) => (
              <RepositoryCard key={repo.name} repo={repo} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
