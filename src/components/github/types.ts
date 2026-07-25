export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  following: number;
  contributions: number;
}

export interface Language {
  name: string;
  percentage: number;
  color: string;
}

export interface PinnedRepository {
  name: string;
  description: string;
  url: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
}

export interface ActivityItem {
  type: "push" | "star" | "fork" | "issue" | "pr";
  repo: string;
  message: string;
  date: string;
}

export interface ContributionGraph {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
}

export interface GitHubData {
  username: string;
  profileUrl: string;
  stats: GitHubStats;
  languages: Language[];
  pinnedRepositories: PinnedRepository[];
  recentActivity: ActivityItem[];
  contributionGraph: ContributionGraph;
}
