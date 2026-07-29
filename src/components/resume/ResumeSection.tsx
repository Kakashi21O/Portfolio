"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
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

interface Highlight {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: string;
  glow: string;
}

const highlights: Highlight[] = [
  {
    icon: <GraduationCap size={18} />,
    title: "Education",
    items: ["Computer Science student", "Self-taught developer since 4th grade"],
    color: "rgba(56,189,248,",
    glow: "rgba(56,189,248,",
  },
  {
    icon: <Code size={18} />,
    title: "Skills",
    items: ["Python, FastAPI, Docker, Linux", "React, Next.js, TypeScript"],
    color: "rgba(167,139,250,",
    glow: "rgba(167,139,250,",
  },
  {
    icon: <FolderOpen size={18} />,
    title: "Projects",
    items: ["CodeAzy — AI code review platform", "DevOps Dashboard — server monitoring"],
    color: "rgba(52,211,153,",
    glow: "rgba(52,211,153,",
  },
  {
    icon: <Briefcase size={18} />,
    title: "Experience",
    items: ["Personal projects & open source", "Backend development & automation"],
    color: "rgba(251,191,36,",
    glow: "rgba(251,191,36,",
  },
  {
    icon: <Award size={18} />,
    title: "Achievements",
    items: ["Active GitHub contributor", "500+ contributions"],
    color: "rgba(250,204,21,",
    glow: "rgba(250,204,21,",
  },
  {
    icon: <Wrench size={18} />,
    title: "Tools",
    items: ["VS Code, PyCharm, Postman", "Git, GitHub Actions, Vercel"],
    color: "rgba(148,163,184,",
    glow: "rgba(148,163,184,",
  },
];

const springConfig = { stiffness: 250, damping: 25, mass: 0.5 };

function HighlightCard({ section, index }: { section: Highlight; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), springConfig);
  const liftY = useSpring(0, { stiffness: 300, damping: 20 });

  const hasTilt = !reducedMotion;

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!hasTilt) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    cardRef.current?.style.setProperty("--glow-x", `${x * 100}%`);
    cardRef.current?.style.setProperty("--glow-y", `${y * 100}%`);
  }, [mouseX, mouseY, hasTilt]);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
    if (!hasTilt) return;
    liftY.set(-6);
  }, [hasTilt, liftY]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    if (!hasTilt) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
    liftY.set(0);
    cardRef.current?.style.setProperty("--glow-x", "50%");
    cardRef.current?.style.setProperty("--glow-y", "50%");
  }, [hasTilt, mouseX, mouseY, liftY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: hasTilt ? 1000 : undefined }}
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: hasTilt ? rotateX : 0,
          rotateY: hasTilt ? rotateY : 0,
          y: hasTilt ? liftY : 0,
          borderColor: isHovered ? `${section.color}0.35)` : undefined,
        }}
        className="relative group p-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm shadow-xl shadow-black/20 transition-all duration-500 hover:bg-white/8"
      >
        {/* Glimmer on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-500"
          style={{
            opacity: isHovered && hasTilt ? 1 : 0,
            background: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), ${section.glow}0.08), transparent 60%)`,
          }}
        />

        {/* Top edge light strip */}
        <div
          className="absolute top-0 left-8 right-8 h-px pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(90deg, transparent, ${section.color}0.5), transparent)`,
          }}
        />

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <div
            className="absolute -top-6 -right-6 w-12 h-12 rotate-45"
            style={{ backgroundColor: `${section.color}0.1)` }}
          />
        </div>

        <div className="relative z-10" style={{ transform: hasTilt ? "translateZ(12px)" : undefined }}>
          <div
            className="mb-3 transition-transform duration-300"
            style={{ transform: isHovered && hasTilt ? "scale(1.1)" : "scale(1)" }}
          >
            <span style={{ color: isHovered ? section.color.replace("rgba(", "").split(",").slice(0, 3).join(",") + ",1)" : undefined }} className="transition-colors duration-300">
              {section.icon}
            </span>
          </div>
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
    </motion.div>
  );
}

function DownloadCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), springConfig);
  const liftY = useSpring(0, { stiffness: 300, damping: 20 });

  const hasTilt = !reducedMotion;

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!hasTilt) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    cardRef.current?.style.setProperty("--glow-x", `${x * 100}%`);
    cardRef.current?.style.setProperty("--glow-y", `${y * 100}%`);
  }, [mouseX, mouseY, hasTilt]);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
    if (!hasTilt) return;
    liftY.set(-6);
  }, [hasTilt, liftY]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    if (!hasTilt) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
    liftY.set(0);
    cardRef.current?.style.setProperty("--glow-x", "50%");
    cardRef.current?.style.setProperty("--glow-y", "50%");
  }, [hasTilt, mouseX, mouseY, liftY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
      style={{ perspective: hasTilt ? 1000 : undefined }}
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: hasTilt ? rotateX : 0,
          rotateY: hasTilt ? rotateY : 0,
          y: hasTilt ? liftY : 0,
          borderColor: isHovered ? "rgba(167,139,250,0.35)" : undefined,
        }}
        className="relative group flex flex-col items-center justify-center p-10 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm shadow-xl shadow-black/20 transition-all duration-500 hover:bg-white/8 flex-1"
      >
        {/* Glimmer */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-500"
          style={{
            opacity: isHovered && hasTilt ? 1 : 0,
            background: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(167,139,250,0.08), transparent 60%)`,
          }}
        />

        {/* Top edge strip */}
        <div
          className="absolute top-0 left-12 right-12 h-px pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(90deg, transparent, rgba(167,139,250,0.5), transparent)`,
          }}
        />

        <div className="relative z-10 text-center" style={{ transform: hasTilt ? "translateZ(16px)" : undefined }}>
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl border border-primary/20 bg-primary/10 flex items-center justify-center"
            animate={isHovered ? { scale: 1.08, borderColor: "rgba(167,139,250,0.4)" } : { scale: 1, borderColor: "rgba(167,139,250,0.2)" }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-3xl">📄</span>
          </motion.div>

          <h3 className="text-xl font-semibold text-foreground tracking-tight mb-2">
            Mantu Yadav
          </h3>
          <p className="text-sm text-muted-foreground/60 mb-1">
            Python Developer & Backend Engineer
          </p>
          <p className="text-[10px] font-mono text-muted-foreground/40 mb-6">
            Last updated: July 2025
          </p>

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
            PDF &bull; Printable &bull; Mobile friendly
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ResumeSection() {
  return (
    <section
      id="resume"
      className="relative w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center items-center overflow-visible"
    >
      {/* Ambient glows */}
      <div className="absolute top-40 -right-24 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 -left-24 w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

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
            <HighlightCard key={section.title} section={section} index={index} />
          ))}
        </div>

        {/* Right: Download Card */}
        <DownloadCard />
      </div>
    </section>
  );
}
