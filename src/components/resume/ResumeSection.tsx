"use client";

import { motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Award,
  Code,
  Wrench,
  FolderOpen,
} from "lucide-react";
import { publicPath } from "@/lib/utils";

const highlights = [
  {
    icon: <GraduationCap size={18} />,
    title: "Education",
    items: ["Computer Science student", "Self-taught developer since 4th grade"],
  },
  {
    icon: <Code size={18} />,
    title: "Skills",
    items: ["Python, FastAPI, Docker, Linux", "React, Next.js, TypeScript"],
  },
  {
    icon: <FolderOpen size={18} />,
    title: "Projects",
    items: ["CodeAzy — AI code review platform", "DevOps Dashboard — server monitoring"],
  },
  {
    icon: <Briefcase size={18} />,
    title: "Experience",
    items: ["Personal projects & open source", "Backend development & automation"],
  },
  {
    icon: <Award size={18} />,
    title: "Achievements",
    items: ["Active GitHub contributor", "500+ contributions"],
  },
  {
    icon: <Wrench size={18} />,
    title: "Tools",
    items: ["VS Code, PyCharm, Postman", "Git, GitHub Actions, Vercel"],
  },
];

export function ResumeSection() {
  return (
    <section
      id="resume"
      className="relative w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center items-center overflow-visible"
    >
      {/* Ambient glows */}
      <div
        className="absolute top-40 -right-24 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none -z-10"
      />
      <div
        className="absolute bottom-40 -left-24 w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      {/* Section Header */}
      <div className="w-full text-center md:text-left mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-6 justify-center md:justify-start"
        >
          <div className="h-[1px] w-12 bg-primary/50" />
          <h2 className="text-sm font-mono text-primary uppercase tracking-[0.2em]">
            Resume
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground max-w-3xl leading-tight"
        >
          A snapshot of my journey and capabilities.
        </motion.p>
      </div>

      {/* Content */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -3 }}
              className="relative group p-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm shadow-xl shadow-black/20 transition-all duration-500 hover:border-primary/30 hover:bg-white/8"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="text-primary mb-3">{section.icon}</div>
                <h3 className="text-sm font-semibold text-foreground tracking-tight mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-muted-foreground/60 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Download Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <div className="relative group flex flex-col items-center justify-center p-10 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm shadow-xl shadow-black/20 transition-all duration-500 hover:border-primary/30 hover:bg-white/8 flex-1">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 text-center">
              {/* PDF Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl border border-primary/20 bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">📄</span>
              </div>

              <h3 className="text-xl font-semibold text-foreground tracking-tight mb-2">
                Mantu Yadav
              </h3>
              <p className="text-sm text-muted-foreground/60 mb-1">
                Python Developer & Backend Engineer
              </p>
              <p className="text-[10px] font-mono text-muted-foreground/40 mb-6">
                Last updated: July 2025
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3 justify-center">
                <a
                  href={publicPath("/resume/Mantu-Yadav-Resume.pdf")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/50 bg-primary/10 text-sm font-medium text-primary hover:bg-primary/20 hover:border-primary/70 transition-all duration-300"
                  aria-label="Download resume"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>
                <a
                  href={publicPath("/resume/Mantu-Yadav-Resume.pdf")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-foreground/70 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  aria-label="View resume in new tab"
                >
                  <ExternalLink size={14} />
                  <span>View</span>
                </a>
              </div>

              <p className="text-[10px] text-muted-foreground/40 mt-4">
                PDF • Printable • Mobile friendly
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
