"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCursor } from "@/components/cursor/CursorContext";
import { MagneticWrapper } from "@/components/cursor/MagneticWrapper";

const navLinks = [
  { label: "Home",      href: "#home" },
  { label: "About",     href: "#about" },
  { label: "Skills",    href: "#skills" },
  { label: "Projects",  href: "#projects" },
  { label: "Timeline",  href: "#timeline" },
  { label: "Contact",   href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState("home");
  const { setCursorState }          = useCursor();

  // Transparent → Glass on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via Intersection Observer
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/10"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-[72px]">
          
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="text-xl font-bold tracking-widest text-foreground hover:text-primary transition-colors"
          >
            MY
          </button>

          {/* Desktop Nav Links */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  onMouseEnter={() => setCursorState("hovering_link")}
                  onMouseLeave={() => setCursorState("default")}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Resume Button + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <MagneticWrapper strength={15}>
              <button
                onClick={() => scrollTo("#contact")}
                className="hidden md:flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-md shadow-primary/20"
              >
                Hire Me
              </button>
            </MagneticWrapper>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 md:hidden bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-xl"
          >
            <nav className="flex flex-col items-center gap-1 py-6 px-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-center py-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="mt-4 px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm"
              >
                Hire Me
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
