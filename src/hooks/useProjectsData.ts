"use client";

import { useState, useEffect } from "react";
import fallbackData from "../../data/projects.json";
import type { Project } from "@/components/projects/types";

const CACHE_KEY = "portfolio_projects_data_cache_v1";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

const GH_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const GH_USERNAME = "Kakashi21O";
const GH_HEADERS: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  ...(GH_TOKEN ? { Authorization: `Bearer ${GH_TOKEN}` } : {}),
};

const LANGUAGE_TO_CATEGORY: Record<string, string> = {
  TypeScript: "Frontend",
  JavaScript: "Full Stack",
  Python: "Backend",
  HTML: "Frontend",
  CSS: "Frontend",
  "C++": "Backend",
  "C#": "Backend",
  Java: "Backend",
  Go: "Backend",
  Rust: "Backend",
  Ruby: "Backend",
  Shell: "DevOps",
  Dockerfile: "DevOps",
};

const TOPIC_TO_CATEGORY: Record<string, string> = {
  ai: "AI",
  "machine-learning": "AI",
  "deep-learning": "AI",
  ml: "AI",
  "neural-network": "AI",
  nlp: "AI",
  devops: "DevOps",
  docker: "DevOps",
  kubernetes: "DevOps",
  "full-stack": "Full Stack",
  fullstack: "Full Stack",
  backend: "Backend",
  frontend: "Frontend",
  automation: "Automation",
};

function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function inferCategory(repo: { language?: string; topics?: string[] }): string {
  const topics: string[] = Array.isArray(repo.topics) ? repo.topics : [];
  // Check topics first — they're more specific
  for (const topic of topics) {
    if (TOPIC_TO_CATEGORY[topic.toLowerCase()]) {
      return TOPIC_TO_CATEGORY[topic.toLowerCase()];
    }
  }
  return LANGUAGE_TO_CATEGORY[repo.language || ""] || "Backend";
}

function mapRepoToProject(repo: {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  archived: boolean;
  created_at: string;
  pushed_at: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
}): Project {
  const language = repo.language || "";
  const topics: string[] = Array.isArray(repo.topics) ? repo.topics : [];
  const category = inferCategory({ language, topics });

  // Technologies: primary language first, then topics (prettified)
  const technologies = [
    language,
    ...topics.slice(0, 5).map((t) =>
      t.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    ),
  ].filter(Boolean);

  // Features: meaningful topics or language-based fallback
  const features =
    topics.length > 0
      ? topics
          .slice(0, 4)
          .map((t) => t.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
      : language
      ? [`Built with ${language}`]
      : [];

  return {
    id: repo.name.toLowerCase(),
    slug: repo.name.toLowerCase(),
    featured: false, // set externally based on stars
    title: formatRepoName(repo.name),
    shortDescription:
      repo.description?.trim() ||
      (language ? `${language} project repository.` : "Open source project repository."),
    description:
      repo.description?.trim() ||
      (language ? `${language} project repository.` : "Open source project repository."),
    thumbnail: "",
    coverImage: "",
    status: repo.archived ? "Completed" : "Active",
    year: new Date(repo.created_at).getFullYear().toString(),
    category,
    technologies,
    github: repo.html_url,
    demo: repo.homepage?.trim() || "",
    documentation: "",
    problem: "",
    planning: "",
    development: language ? `Built with ${language}.` : "",
    architecture: "",
    features,
    challenges: [],
    solutions: [],
    results:
      repo.stargazers_count > 0
        ? [`${repo.stargazers_count} GitHub star${repo.stargazers_count > 1 ? "s" : ""}`]
        : [],
    screenshots: [],
    futurePlans: [],
    gallery: [],
    video: "",
    metrics: {
      commits: 0,
      files: 0,
      duration: "",
      teamSize: 1,
    },
  };
}

interface CachePayload {
  timestamp: number;
  data: Project[];
}

function getCachedData(): Project[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const payload: CachePayload = JSON.parse(raw);
    if (Date.now() - payload.timestamp < CACHE_TTL_MS && payload.data) {
      return payload.data;
    }
  } catch (err) {
    console.warn("Failed reading projects cache:", err);
  }
  return null;
}

function setCachedData(data: Project[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch (err) {
    console.warn("Failed saving projects cache:", err);
  }
}

export function useProjectsData() {
  const [projects, setProjects] = useState<Project[]>(fallbackData as Project[]);
  const [isFetched, setIsFetched] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      // 1. Try localStorage cache first
      const cached = getCachedData();
      if (cached) {
        if (isMounted) {
          setProjects(cached);
          setIsFetched(true);
        }
        return;
      }

      try {
        // 2. Fetch repos sorted by push date (latest first)
        const res = await fetch(
          `https://api.github.com/users/${GH_USERNAME}/repos?sort=pushed&per_page=100`,
          { headers: GH_HEADERS }
        );

        if (!res.ok) throw new Error(`GitHub repos fetch failed: ${res.status}`);

        const reposData = await res.json();
        if (!Array.isArray(reposData)) throw new Error("Invalid repos response");

        // 3. Filter out profile/readme-only repos (no language AND no description AND no topics)
        const validRepos = reposData.filter(
          (r: { language: string | null; description: string | null; topics: string[] }) =>
            r.language ||
            (r.description && r.description.trim().length > 0) ||
            (Array.isArray(r.topics) && r.topics.length > 0)
        );

        // 4. Sort by pushed_at descending
        const sorted = validRepos.sort(
          (a: { pushed_at: string; updated_at: string }, b: { pushed_at: string; updated_at: string }) =>
            new Date(b.pushed_at || b.updated_at).getTime() -
            new Date(a.pushed_at || a.updated_at).getTime()
        );

        // 5. Mark top 2 by stars as featured
        const byStars = [...sorted].sort(
          (a: { stargazers_count: number }, b: { stargazers_count: number }) =>
            (b.stargazers_count || 0) - (a.stargazers_count || 0)
        );
        const topTwoIds = new Set(
          byStars.slice(0, 2).map((r: { id: number }) => r.id)
        );

        const mappedProjects: Project[] = sorted.map((repo: { id: number }) => ({
          ...mapRepoToProject(repo as Parameters<typeof mapRepoToProject>[0]),
          featured: topTwoIds.has(repo.id),
        }));

        if (isMounted) {
          setProjects(mappedProjects);
          setCachedData(mappedProjects);
          setIsFetched(true);
          setLastUpdated(
            new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          );
        }
      } catch (err) {
        console.warn("Projects fetch error, using fallback data:", err);
        if (isMounted) {
          setIsFetched(true);
        }
      }
    }

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, isFetched, lastUpdated };
}
