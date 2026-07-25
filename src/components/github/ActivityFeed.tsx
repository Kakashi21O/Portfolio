"use client";

import { motion } from "framer-motion";
import { GitCommitHorizontal, Star, GitFork } from "lucide-react";
import type { ActivityItem } from "./types";

interface ActivityFeedProps {
  activity: ActivityItem[];
}

const typeIcons: Record<ActivityItem["type"], React.ReactNode> = {
  push: <GitCommitHorizontal size={12} />,
  star: <Star size={12} />,
  fork: <GitFork size={12} />,
  issue: <GitCommitHorizontal size={12} />,
  pr: <GitCommitHorizontal size={12} />,
};

const typeColors: Record<ActivityItem["type"], string> = {
  push: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  star: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  fork: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  issue: "text-red-400 bg-red-500/10 border-red-500/20",
  pr: "text-sky-400 bg-sky-500/10 border-sky-500/20",
};

export function ActivityFeed({ activity }: ActivityFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="p-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-xl shadow-xl shadow-black/20"
    >
      <h3 className="text-lg font-semibold text-foreground tracking-tight mb-4">
        Recent Activity
      </h3>

      <div className="space-y-3">
        {activity.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex items-start gap-3"
          >
            <div
              className={`mt-0.5 p-1.5 rounded-lg border flex-shrink-0 ${typeColors[item.type]}`}
            >
              {typeIcons[item.type]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-foreground/80 leading-relaxed truncate">
                {item.message}
              </p>
              <p className="text-[10px] font-mono text-muted-foreground/40 mt-0.5">
                {item.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
