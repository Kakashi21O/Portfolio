export interface TechItem {
  name: string;
  iconPath: string;
  iconColor: string;
  description: string;
  featured?: boolean;
}

export interface TechCategory {
  id: string;
  title: string;
  description: string;
  categoryIcon: string;
  items: TechItem[];
}
