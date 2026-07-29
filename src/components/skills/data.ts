import type { SkillCategory, ExpertiseArea, Skill } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    description: "The languages I think and build in daily.",
    icon: "⌨️",
    skills: [
      { name: "Python", emoji: "🐍", level: "Primary", tooltip: "Primary programming language used for automation, backend development, AI experiments, and scripting.", featured: true },
      { name: "JavaScript", emoji: "🟨", level: "Comfortable", tooltip: "Used for web development, scripting, and building interactive UIs." },
      { name: "TypeScript", emoji: "🔷", level: "Learning", tooltip: "Actively learning to write safer, more scalable frontend and full-stack applications." },
      { name: "SQL", emoji: "🗄️", level: "Comfortable", tooltip: "Writing queries, managing relational databases, and designing schemas." },
      { name: "HTML", emoji: "🌐", level: "Comfortable", tooltip: "Semantic, accessible HTML for structuring web content." },
      { name: "CSS", emoji: "🎨", level: "Comfortable", tooltip: "Styling and layout — from vanilla CSS to utility-first frameworks." },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs, servers, and the systems that power applications.",
    icon: "⚙️",
    skills: [
      { name: "FastAPI", emoji: "⚡", level: "Primary", tooltip: "Preferred backend framework for building scalable, async REST APIs with Python.", featured: true },
      { name: "Flask", emoji: "🫙", level: "Comfortable", tooltip: "Lightweight Python web framework for smaller services and prototyping." },
      { name: "REST APIs", emoji: "🔗", level: "Primary", tooltip: "Designing and consuming RESTful API architectures." },
      { name: "WebSockets", emoji: "📡", level: "Comfortable", tooltip: "Real-time bidirectional communication for live features." },
      { name: "Authentication", emoji: "🔐", level: "Comfortable", tooltip: "JWT, OAuth, session management, and secure auth flows." },
      { name: "API Design", emoji: "📐", level: "Comfortable", tooltip: "Structuring clean, versioned, and well-documented APIs." },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces that are fast, accessible, and delightful.",
    icon: "🖥️",
    skills: [
      { name: "React", emoji: "⚛️", level: "Learning", tooltip: "Building component-driven UIs with hooks, context, and modern React patterns." },
      { name: "Next.js", emoji: "▲", level: "Learning", tooltip: "Full-stack React framework used for this very portfolio." },
      { name: "Tailwind CSS", emoji: "💨", level: "Comfortable", tooltip: "Utility-first CSS framework for rapid, consistent styling." },
      { name: "shadcn/ui", emoji: "🧩", level: "Comfortable", tooltip: "Accessible component library built on Radix UI and Tailwind." },
      { name: "Framer Motion", emoji: "✨", level: "Learning", tooltip: "Production-ready animation library for React." },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Shipping reliably from code to production.",
    icon: "🚀",
    skills: [
      { name: "Docker", emoji: "🐳", level: "Primary", tooltip: "Containerization and deployment. Used across personal and production projects.", featured: true },
      { name: "Linux", emoji: "🐧", level: "Primary", tooltip: "Daily driver OS. Server administration, shell scripting, and system management.", featured: true },
      { name: "Git", emoji: "📋", level: "Primary", tooltip: "Version control, branching strategies, and collaborative workflows." },
      { name: "GitHub", emoji: "🐙", level: "Primary", tooltip: "Repository hosting, pull requests, code reviews, and project management." },
      { name: "GitHub Actions", emoji: "⚙️", level: "Comfortable", tooltip: "CI/CD pipelines for automated testing and deployment." },
      { name: "Nginx", emoji: "🌊", level: "Comfortable", tooltip: "Reverse proxy and web server configuration." },
      { name: "CI/CD", emoji: "🔄", level: "Comfortable", tooltip: "Automated build, test, and deploy pipelines." },
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Exploring the frontier where software meets intelligence.",
    icon: "🤖",
    skills: [
      { name: "OpenAI API", emoji: "🧠", level: "Comfortable", tooltip: "Integrating GPT models into applications for automation and AI features." },
      { name: "Hugging Face", emoji: "🤗", level: "Learning", tooltip: "Using open-source models for NLP and ML experiments." },
      { name: "Prompt Engineering", emoji: "💬", level: "Comfortable", tooltip: "Crafting effective prompts for reliable and useful model outputs." },
      { name: "AI Automation", emoji: "🤖", level: "Comfortable", tooltip: "Building pipelines and agents that automate tasks using AI." },
      { name: "Transformers", emoji: "🔬", level: "Exploring", tooltip: "Learning the architecture behind modern large language models." },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "The tools that make the workflow smooth.",
    icon: "🛠️",
    skills: [
      { name: "VS Code", emoji: "💙", level: "Primary", tooltip: "Primary code editor with a deeply customized setup." },
      { name: "PyCharm", emoji: "🟢", level: "Comfortable", tooltip: "Used for complex Python projects with debugging and profiling." },
      { name: "Postman", emoji: "📮", level: "Comfortable", tooltip: "API testing, documentation, and collection management." },
      { name: "Figma", emoji: "🎨", level: "Exploring", tooltip: "UI design and prototyping for planning interfaces before coding." },
      { name: "Vercel", emoji: "▲", level: "Comfortable", tooltip: "Serverless deployment platform for Next.js and frontend projects." },
      { name: "npm / pnpm", emoji: "📦", level: "Comfortable", tooltip: "Package management for JavaScript and Node.js projects." },
    ],
  },
];

export const expertiseAreas: ExpertiseArea[] = [
  {
    id: "backend-dev",
    number: "01",
    title: "Python Backend",
    description: "Building scalable APIs, automation systems, and server-side logic with Python.",
    icon: "⚙️",
    technologies: ["Python", "FastAPI", "Flask", "REST APIs", "WebSockets"],
    motif: "backend",
  },
  {
    id: "devops-infra",
    number: "02",
    title: "DevOps & Infrastructure",
    description: "Containerization, CI/CD pipelines, Linux administration, and reliable deployments.",
    icon: "🚀",
    technologies: ["Docker", "Linux", "Nginx", "GitHub Actions", "CI/CD"],
    motif: "devops",
  },
  {
    id: "frontend-dev",
    number: "03",
    title: "Frontend",
    description: "Component-driven interfaces with modern React, Next.js, and utility-first styling.",
    icon: "🖥️",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    motif: "frontend",
  },
  {
    id: "ai-auto",
    number: "04",
    title: "AI & Automation",
    description: "Integrating LLMs, prompt engineering, and building intelligent automation pipelines.",
    icon: "🤖",
    technologies: ["OpenAI API", "Hugging Face", "AI Automation", "Prompt Engineering"],
    motif: "ai",
  },
];

export const exploringSkills: Skill[] = [
  { name: "DevOps & Kubernetes", emoji: "☸️", level: "Exploring", tooltip: "Exploring container orchestration and infrastructure at scale." },
  { name: "TypeScript", emoji: "🔷", level: "Exploring", tooltip: "Leveling up frontend type safety across all projects." },
  { name: "Next.js App Router", emoji: "▲", level: "Exploring", tooltip: "Mastering the latest Next.js architecture patterns." },
  { name: "System Design", emoji: "🏗️", level: "Exploring", tooltip: "Designing large-scale distributed systems." },
  { name: "Transformers", emoji: "🔬", level: "Exploring", tooltip: "Deep-diving into the ML model architecture that powers modern AI." },
];

export const currentlyLearning = exploringSkills.map(({ name, emoji, tooltip }) => ({ name, emoji, tooltip }));

export const techCategories = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "devops", label: "DevOps" },
  { id: "ai", label: "AI" },
  { id: "tools", label: "Tools" },
  { id: "exploring", label: "Exploring" },
];
