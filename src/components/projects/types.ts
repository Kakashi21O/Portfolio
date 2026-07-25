export interface ProjectMetrics {
  commits: number;
  files: number;
  duration: string;
  teamSize: number;
}

export interface Project {
  id: string;
  slug: string;
  featured: boolean;
  title: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  coverImage: string;
  status: string;
  year: string;
  category: string;
  technologies: string[];
  github: string;
  demo: string;
  documentation: string;
  problem: string;
  planning: string;
  development: string;
  architecture: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  screenshots: string[];
  futurePlans: string[];
  gallery: string[];
  video: string;
  metrics: ProjectMetrics;
}

export type ProjectCategory = "All" | "Backend" | "Frontend" | "AI" | "DevOps" | "Automation" | "Full Stack" | "Open Source";
