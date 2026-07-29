export type SkillLevel = "Primary" | "Comfortable" | "Learning" | "Exploring";

export interface Skill {
  name: string;
  emoji: string;
  level: SkillLevel;
  tooltip: string;
  featured?: boolean;
  iconPath?: string;
  iconColor?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: Skill[];
}

export interface ExpertiseArea {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  motif: "backend" | "frontend" | "devops" | "ai" | "languages";
}
