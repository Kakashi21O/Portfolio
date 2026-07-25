"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { siNextdotjs, siReact, siTailwindcss, siTypescript, siGithub, siX, siDiscord, siInstagram } from "simple-icons";
import { FaLinkedin } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: siGithub, label: "GitHub", href: "https://github.com/mantu-yadav" },
  { icon: null, label: "LinkedIn", href: "https://linkedin.com/in/mantu-yadav" },
  { icon: siInstagram, label: "Instagram", href: "#" },
  { icon: siX, label: "X", href: "#" },
  { icon: siDiscord, label: "Discord", href: "#" },
];

const techStack = [
  { icon: siNextdotjs, name: "Next.js" },
  { icon: siReact, name: "React" },
  { icon: siTailwindcss, name: "Tailwind" },
  { icon: siTypescript, name: "TypeScript" },
];

function SiIcon({ path, size = 14 }: { path: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className="inline-block shrink-0">
      <path d={path} fill="currentColor" />
    </svg>
  );
}

export function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-white/5 bg-white/2 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold tracking-widest text-foreground hover:text-primary transition-colors mb-4"
            >
              MY
            </button>
            <p className="text-sm text-muted-foreground/50 leading-relaxed max-w-[260px]">
              Backend &amp; full-stack developer crafting scalable systems and clean interfaces.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono text-muted-foreground/40 uppercase tracking-[0.15em] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-mono text-muted-foreground/40 uppercase tracking-[0.15em] mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground/50 hover:text-foreground transition-colors"
                  >
                    {link.icon ? (
                      <SiIcon path={link.icon.path} />
                    ) : (
                      <FaLinkedin size={14} />
                    )}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech & Meta */}
          <div>
            <h4 className="text-xs font-mono text-muted-foreground/40 uppercase tracking-[0.15em] mb-4">
              Built With
            </h4>
            <div className="flex items-center gap-3 mb-6">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/5 bg-white/3 text-muted-foreground/40"
                  title={tech.name}
                >
                  <SiIcon path={tech.icon.path} size={16} />
                </div>
              ))}
            </div>
            <div className="space-y-1.5 text-[11px] font-mono text-muted-foreground/30">
              <p>Version 0.1.0</p>
              <p>Last deployed: July 2026</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-muted-foreground/25">
            &copy; {new Date().getFullYear()} Mantu Yadav. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground/30 hover:text-foreground/60 transition-colors"
          >
            Back to top
            <ArrowUp size={12} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
