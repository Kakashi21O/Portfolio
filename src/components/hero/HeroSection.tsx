"use client";

import { useCallback } from "react";
import { motion, Variants } from "framer-motion";
import { Download } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import dynamic from "next/dynamic";
import { AnimatedBackground } from "./AnimatedBackground";
import { TypewriterText } from "./TypewriterText";
import { MagneticWrapper } from "@/components/cursor/MagneticWrapper";
import { publicPath } from "@/lib/utils";

const Hero3DObject = dynamic(
  () => import("./Hero3DObject").then((mod) => mod.Hero3DObject),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center" />
    ),
  }
);

const socialLinks = [
  { icon: FaGithub,   href: "https://github.com/Kakashi21O",   label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com",             label: "LinkedIn" },
  { icon: FaTwitter,  href: "https://twitter.com",              label: "Twitter" },
  { icon: FaEnvelope, href: "mailto:hello@example.com",         label: "Email" },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } },
};

export function HeroSection() {
  const scrollDown = () =>
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });

  const scrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        {/* ── Left: Content ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left pt-24 lg:pt-0 order-2 lg:order-1"
        >
          {/* Greeting chip */}
          <motion.div variants={item} className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Available for hire
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-3 leading-[1.05]"
          >
            <span className="bg-gradient-to-br from-white via-white/90 to-primary/60 bg-clip-text text-transparent">
              Mantu
            </span>
            <br />
            <span className="bg-gradient-to-br from-primary via-primary/80 to-white/60 bg-clip-text text-transparent">
              Yadav
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={item} className="mb-6">
            <TypewriterText />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-muted-foreground max-w-[520px] mb-10 leading-relaxed"
          >
            I build backend systems, automation tools, and AI-powered apps that solve
            real-world problems. Exploring DevOps, system design, and scalable architecture.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
            <MagneticWrapper>
              <button
                onClick={scrollToProjects}
                className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-[1.03] active:scale-[0.98]"
              >
                View Projects
                <span className="absolute inset-0 rounded-full ring-1 ring-primary/50" />
              </button>
            </MagneticWrapper>
            <MagneticWrapper>
              <a
                href={publicPath("/resume/Mantu-Yadav-Resume.pdf")}
                download
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white/5 px-8 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-white/10 hover:border-primary/50 active:scale-[0.98]"
              >
                <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Download Resume
              </a>
            </MagneticWrapper>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={item} className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <MagneticWrapper key={label} strength={20}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/5 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-primary/10 hover:text-primary hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              </MagneticWrapper>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: 3D Visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 80 }}
          className="order-1 lg:order-2 flex justify-center w-full"
        >
          <Hero3DObject />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-7 w-5 items-start justify-center rounded-full border border-border/60 pt-1.5"
        >
          <div className="h-1.5 w-1 rounded-full bg-primary" />
        </motion.div>
      </motion.button>
    </section>
  );
}
