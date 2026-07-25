export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const timelineData: TimelineItem[] = [
  {
    id: "html",
    year: "4th Grade",
    title: "Started HTML",
    description: "First exposure to programming after watching a senior write HTML in a school computer lab. Curiosity turned into a goal.",
    icon: "🌐",
    color: "#e34c26",
  },
  {
    id: "python",
    year: "9th Grade",
    title: "Learned Python",
    description: "Began serious programming with Python. Quickly moved beyond basics into automation and scripting.",
    icon: "🐍",
    color: "#3776ab",
  },
  {
    id: "discord",
    year: "2023",
    title: "Discord Automation",
    description: "Built automation bots and tools for Discord. Learned API integration, WebSockets, and event-driven programming.",
    icon: "🤖",
    color: "#5865f2",
  },
  {
    id: "backend",
    year: "2024",
    title: "Backend Development",
    description: "Dived deep into backend engineering. Built REST APIs, learned authentication, database design, and server architecture.",
    icon: "⚙️",
    color: "#10b981",
  },
  {
    id: "fastapi",
    year: "2024",
    title: "FastAPI",
    description: "Discovered FastAPI and fell in love with its speed, type safety, and developer experience. Became the primary backend framework.",
    icon: "⚡",
    color: "#009688",
  },
  {
    id: "docker",
    year: "2024",
    title: "Docker",
    description: "Learned containerization to standardize development environments and simplify deployment workflows.",
    icon: "🐳",
    color: "#2496ed",
  },
  {
    id: "devops",
    year: "2024",
    title: "DevOps",
    description: "Expanded into CI/CD, Linux administration, Nginx, and infrastructure management. Started automating everything.",
    icon: "🚀",
    color: "#ff6f00",
  },
  {
    id: "ai",
    year: "2025",
    title: "Artificial Intelligence",
    description: "Explored AI integration through OpenAI API, prompt engineering, and building AI-powered applications.",
    icon: "🧠",
    color: "#8b5cf6",
  },
  {
    id: "current",
    year: "Now",
    title: "Current Projects",
    description: "Building CodeAzy, expanding the portfolio, and continuously learning modern software engineering practices.",
    icon: "🔥",
    color: "#f59e0b",
  },
  {
    id: "future",
    year: "Future",
    title: "Future Goals",
    description: "System design, Kubernetes, open-source contributions, and building impactful software at scale.",
    icon: "🎯",
    color: "#ec4899",
  },
];
