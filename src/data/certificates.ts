import { publicPath } from "@/lib/utils";

export interface Certificate {
  id: string;
  title: string;
  image: string;
  issuer?: string;
  date?: string;
}

export const certificates: Certificate[] = [
  {
    id: "devops-internship",
    title: "DevOps Internship Program",
    image: publicPath("/images/certificates/devops-internship.jpg"),
    issuer: "CODEeazy & Modi Institute of Technology",
    date: "July 2026",
  },
  {
    id: "python-programming",
    title: "Python Programming Internship Program",
    image: publicPath("/images/certificates/python-programming.jpg"),
    issuer: "CODEeazy & Modi Institute of Technology",
    date: "July 2026",
  },
  {
    id: "data-analyst-training",
    title: "Data Analyst Training Program",
    image: publicPath("/images/certificates/data-analyst-training.jpg"),
    issuer: "Techzonce IT Solution LLP & Modi Institute of Technology",
    date: "July 2025",
  },
];
