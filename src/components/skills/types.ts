export type SkillLevel = "Primary" | "Comfortable" | "Learning" | "Exploring";

export interface Skill {
  name: string;
  emoji: string;
  level: SkillLevel;
  tooltip: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji icon for the category
  skills: Skill[];
}
