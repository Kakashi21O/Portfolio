"use client";

import { motion, Variants } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "./AnimatedBackground";
import { TypewriterText } from "./TypewriterText";
import { Hero3DObject } from "./Hero3DObject";

const socialLinks = [
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaEnvelope, href: "mailto:hello@example.com", label: "Email" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function HeroSection() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section id="home" className="relative min-h-screen w-full max-w-[1400px] mx-auto flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="container relative z-10 px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left pt-20 lg:pt-0 order-2 lg:order-1"
        >
          <motion.div variants={itemVariants} className="mb-2 text-lg font-medium text-primary">
            Hello, I&apos;m
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
          >
            Mantu Yadav
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-6">
            <TypewriterText />
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-[600px] mb-8 leading-relaxed"
          >
            I enjoy building backend systems, automation tools, and AI-powered applications that solve real-world problems. Currently exploring DevOps, system design, and scalable software architecture.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
            <Button size="lg" className="rounded-full shadow-lg hover:shadow-primary/25 transition-all text-base h-12 px-8">
              View Projects
            </Button>
            <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base group">
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
              Download Resume
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-sm"
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Side: Visuals */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="order-1 lg:order-2 flex justify-center w-full"
        >
          <Hero3DObject />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
        onClick={handleScroll}
      >
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2 group-hover:text-foreground transition-colors">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-muted-foreground group-hover:text-foreground transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}
