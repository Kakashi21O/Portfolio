"use client";

import { useState, useEffect } from "react";
import initialData from "../../data/github.json";
import type { GitHubData, Language, PinnedRepository, ActivityItem } from "@/components/github/types";

const CACHE_KEY = "portfolio_github_data_cache_v3";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

const GH_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const GH_HEADERS: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  ...(GH_TOKEN ? { Authorization: `Bearer ${GH_TOKEN}` } : {}),
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  Python: "#3776ab",
  HTML: "#e34c26",
  CSS: "#563d7c",
  JavaScript: "#f7df1e",
  "C++": "#f34b7d",
  C: "#555555",
  Rust: "#dea584",
  Go: "#00add8",
  Shell: "#89e051",
  Java: "#b07219",
  Vue: "#41b883",
  Ruby: "#701516",
  Other: "#6e7681",
};

interface CachePayload {
  timestamp: number;
  data: GitHubData;
}

function getCachedData(): GitHubData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const payload: CachePayload = JSON.parse(raw);
    const now = Date.now();
    if (now - payload.timestamp < CACHE_TTL_MS && payload.data) {
      return payload.data;
    }
  } catch (err) {
    console.warn("Failed reading GitHub cache from localStorage:", err);
  }
  return null;
}

function setCachedData(data: GitHubData) {
  if (typeof window === "undefined") return;
  try {
    const payload: CachePayload = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn("Failed saving GitHub cache to localStorage:", err);
  }
}

function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toISOString().split("T")[0];
  } catch {
    return dateString;
  }
}

export function useGitHubData(username: string = "Kakashi21O") {
  const [data, setData] = useState<GitHubData>(initialData as GitHubData);
  const [isFetched, setIsFetched] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubProfile() {
      // 1. Check if we have valid 12-hour cached data in localStorage
      const cached = getCachedData();
      if (cached) {
        if (isMounted) {
          setData(cached);
          setIsFetched(true);
        }
        return;
      }

      try {
        // 2. Fetch User Profile, Repositories, Public Events, and Contributions in parallel
        const [userRes, reposRes, eventsRes, contribRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${username}`, { headers: GH_HEADERS }),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers: GH_HEADERS }),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, { headers: GH_HEADERS }),
          fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
        ]);

        if (userRes.status !== "fulfilled" || !userRes.value.ok ||
            reposRes.status !== "fulfilled" || !reposRes.value.ok) {
          throw new Error("GitHub API request failed");
        }

        const userData = await userRes.value.json();
        const reposData = await reposRes.value.json();
        const eventsData = eventsRes.status === "fulfilled" && eventsRes.value.ok ? await eventsRes.value.json() : [];
        let totalContributions = (initialData as GitHubData).stats.contributions;

        if (contribRes.status === "fulfilled" && contribRes.value.ok) {
          try {
            const contribData = await contribRes.value.json();
            if (contribData?.total?.lastYear) {
              totalContributions = contribData.total.lastYear;
            }
          } catch (e) {
            console.warn("Contributions parse fallback:", e);
          }
        }

        if (!Array.isArray(reposData)) {
          throw new Error("Invalid repos response");
        }

        // 3. Compute accurate stars & forks
        const totalStars = reposData.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);
        const totalForks = reposData.reduce((acc: number, r: any) => acc + (r.forks_count || 0), 0);

        // 4. Compute byte-accurate language distribution across repos
        const langBytes: Record<string, number> = {};
        await Promise.allSettled(
          reposData.map(async (r: any) => {
            if (!r.languages_url) return;
            try {
              const res = await fetch(r.languages_url, { headers: GH_HEADERS });
              if (res.ok) {
                const bytes = await res.json();
                for (const [lang, count] of Object.entries(bytes)) {
                  langBytes[lang] = (langBytes[lang] || 0) + (count as number);
                }
              }
            } catch {
              // Ignore single repo language fetch failures
            }
          })
        );

        const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0);
        let finalLanguages: Language[] = [];

        if (totalBytes > 0) {
          // Largest-remainder method: percentages guaranteed to sum to exactly 100
          const raw = Object.entries(langBytes)
            .map(([name, bytes]) => ({
              name,
              color: LANGUAGE_COLORS[name] || "#6e7681",
              exact: (bytes / totalBytes) * 100,
              floor: Math.floor((bytes / totalBytes) * 100),
              remainder: ((bytes / totalBytes) * 100) % 1,
            }))
            .filter((l) => l.exact >= 0.5) // drop sub-0.5% langs
            .sort((a, b) => b.exact - a.exact);

          const floorSum = raw.reduce((s, l) => s + l.floor, 0);
          let leftover = 100 - floorSum;
          const sorted = [...raw].sort((a, b) => b.remainder - a.remainder);
          for (const l of sorted) {
            if (leftover <= 0) break;
            l.floor += 1;
            leftover--;
          }

          finalLanguages = raw
            .filter((l) => l.floor > 0)
            .sort((a, b) => b.floor - a.floor)
            .map(({ name, color, floor }) => ({ name, percentage: floor, color }));
        }

        if (finalLanguages.length === 0) {
          finalLanguages = (initialData as GitHubData).languages;
        }

        // 5. Select Pinned/Top Repositories (sort by stars descending then updated date)
        const nonForks = reposData.filter((r: any) => !r.fork);
        const sortedRepos = (nonForks.length > 0 ? nonForks : reposData).sort((a: any, b: any) => {
          if ((b.stargazers_count || 0) !== (a.stargazers_count || 0)) {
            return (b.stargazers_count || 0) - (a.stargazers_count || 0);
          }
          return new Date(b.pushed_at || b.updated_at).getTime() - new Date(a.pushed_at || a.updated_at).getTime();
        });

        const pinnedRepositories: PinnedRepository[] = sortedRepos.slice(0, 4).map((repo: any) => ({
          name: repo.name,
          description: repo.description || (repo.language ? `${repo.language} project repository.` : "Open source project repository."),
          url: repo.html_url,
          language: repo.language || "TypeScript",
          languageColor: LANGUAGE_COLORS[repo.language] || "#3178c6",
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          topics: Array.isArray(repo.topics) && repo.topics.length > 0
            ? repo.topics
            : [repo.language?.toLowerCase() || "code", "github"].filter(Boolean),
          updatedAt: formatDate(repo.pushed_at || repo.updated_at),
        }));

        // 6. Parse Recent Activity from public events
        const recentActivity: ActivityItem[] = Array.isArray(eventsData) && eventsData.length > 0
          ? eventsData.slice(0, 5).map((evt: any) => {
              const repoShort = (evt.repo?.name || "").replace(`${username}/`, "");
              let type: ActivityItem["type"] = "push";
              let message = `Activity in ${repoShort}`;

              if (evt.type === "PushEvent") {
                type = "push";
                const commitMsg = evt.payload?.commits?.[0]?.message;
                message = commitMsg ? `${commitMsg.slice(0, 50)} (${repoShort})` : `Pushed commits to ${repoShort}`;
              } else if (evt.type === "WatchEvent") {
                type = "star";
                message = `Starred ${evt.repo?.name || "repository"}`;
              } else if (evt.type === "ForkEvent") {
                type = "fork";
                message = `Forked ${evt.repo?.name || "repository"}`;
              } else if (evt.type === "IssuesEvent") {
                type = "issue";
                message = `${evt.payload?.action || "Opened issue"} in ${repoShort}`;
              } else if (evt.type === "PullRequestEvent") {
                type = "pr";
                message = `${evt.payload?.action || "Opened PR"} in ${repoShort}`;
              } else if (evt.type === "CreateEvent") {
                type = "push";
                message = `Created ${evt.payload?.ref_type || "repo"} ${repoShort}`;
              }

              return {
                type,
                repo: repoShort,
                message,
                date: formatDate(evt.created_at),
              };
            })
          : (initialData as GitHubData).recentActivity;

        // 7. Assemble GitHubData
        const updatedData: GitHubData = {
          username: userData.login || username,
          profileUrl: userData.html_url || `https://github.com/${username}`,
          stats: {
            totalRepos: userData.public_repos ?? reposData.length,
            totalStars,
            totalForks,
            followers: userData.followers ?? (initialData as GitHubData).stats.followers,
            following: userData.following ?? (initialData as GitHubData).stats.following,
            contributions: totalContributions,
          },
          languages: finalLanguages,
          pinnedRepositories: pinnedRepositories.length > 0 ? pinnedRepositories : (initialData as GitHubData).pinnedRepositories,
          recentActivity,
          contributionGraph: {
            totalContributions,
            currentStreak: (initialData as GitHubData).contributionGraph.currentStreak,
            longestStreak: (initialData as GitHubData).contributionGraph.longestStreak,
          },
        };

        if (isMounted) {
          setData(updatedData);
          setCachedData(updatedData);
          setIsFetched(true);
          setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      } catch (err) {
        console.warn("GitHub fetch error, using cached / initial data:", err);
        if (isMounted) {
          setIsFetched(true);
        }
      }
    }

    fetchGitHubProfile();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { data, isFetched, lastUpdated };
}
