import { TimelineChapter, Interest, InterestingFact } from "./types";

export const timelineData: TimelineChapter[] = [
  {
    id: "chapter-01",
    title: "The Beginning",
    age: "4th Grade",
    description: "Curiosity sparked in the school computer lab watching HTML come alive.",
    icon: "🌐",
    color: "#e34c26",
    story: [
      "One day, during a computer class, the PT teacher allowed students to visit the computer lab.",
      "There, I noticed a senior student writing HTML code.",
      "I didn't fully understand what he was building, but seeing text turn into something on the screen fascinated me.",
      "That moment sparked my curiosity about programming."
    ]
  },
  {
    id: "chapter-02",
    title: "First Laptop",
    description: "Gained a dedicated machine to explore how computers work and build things.",
    icon: "💻",
    color: "#3b82f6",
    story: [
      "After that experience, I asked my parents for a laptop.",
      "It wasn't about playing games—it was about understanding how computers worked and learning to create things myself.",
      "That laptop became the starting point of everything that followed."
    ]
  },
  {
    id: "chapter-03",
    title: "Learning Python",
    age: "9th Grade",
    description: "Ventured into programming fundamentals and discovered the joy of problem-solving.",
    icon: "🐍",
    color: "#3776ab",
    story: [
      "I began learning Python.",
      "Initially it was basic programming—variables, loops, functions, and operators.",
      "As I kept practicing, I discovered that programming wasn't just writing code—it was solving problems."
    ]
  },
  {
    id: "chapter-04",
    title: "Discovering Backend Development",
    description: "Ventured behind the scenes into APIs, automation, WebSockets, and servers.",
    icon: "⚙️",
    color: "#10b981",
    story: [
      "As I became more comfortable with Python, I started exploring APIs, Automation, WebSockets, and Backend Development.",
      "I enjoyed building systems that worked behind the scenes.",
      "Creating automation and making computers perform repetitive tasks became exciting."
    ]
  },
  {
    id: "chapter-05",
    title: "Discord Automation",
    description: "Engineered bots and automation, mastering async patterns and networking.",
    icon: "🤖",
    color: "#5865f2",
    story: [
      "I spent several years experimenting with Discord bots and automation projects.",
      "Some projects explored advanced automation techniques and APIs.",
      "These projects taught me a great deal about asynchronous programming, networking, and Python, even though they were experimental and not intended for production use."
    ]
  },
  {
    id: "chapter-06",
    title: "Today",
    description: "Specializing in FastAPI, Docker, DevOps, AI, and scalable backend systems.",
    icon: "🚀",
    color: "#f59e0b",
    story: [
      "Currently exploring FastAPI, Docker, Linux, DevOps, and Artificial Intelligence.",
      "My focus is building scalable backend applications while continuously improving my engineering skills."
    ]
  }
];

export const interestsData: Interest[] = [
  { label: "Python" },
  { label: "FastAPI" },
  { label: "Docker" },
  { label: "Linux" },
  { label: "Automation" },
  { label: "AI" },
  { label: "Backend" },
  { label: "DevOps" }
];

export const personalSide: string[] = [
  "Chess",
  "PC Games",
  "Offline Games",
  "Anime",
  "Movies"
];

export const factsData: InterestingFact[] = [
  { id: "fact-1", text: "Started coding because of curiosity." },
  { id: "fact-2", text: "Loves solving logic problems." },
  { id: "fact-3", text: "Enjoys backend more than frontend." },
  { id: "fact-4", text: "Still learning something new every week." }
];

export const quote = "I don't enjoy memorizing. I enjoy understanding. Programming is interesting because every problem has patterns waiting to be discovered.";
