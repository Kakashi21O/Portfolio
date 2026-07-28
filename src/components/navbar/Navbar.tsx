"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCursor } from "@/components/cursor/CursorContext";
import { MagneticWrapper } from "@/components/cursor/MagneticWrapper";

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(167,139,250,0.6)] animate-pulse" />
      <span className="font-mono text-sm font-medium tracking-wider text-foreground">
        {time || "--:--:--"}
      </span>
    </>
  );
}

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

  // Active section via single Intersection Observer
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as Element[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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

          {/* Time Display + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={false}
              animate={{
                opacity: activeSection === "home" ? 1 : 0,
                pointerEvents: activeSection === "home" ? "auto" : "none",
              }}
              transition={{ duration: 0.3 }}
              className="hidden md:block"
            >
              <MagneticWrapper strength={15}>
                <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-full bg-transparent">
                  <LocalTime />
                </div>
              </MagneticWrapper>
            </motion.div>

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
              <motion.div
                initial={false}
                animate={{
                  opacity: activeSection === "home" ? 1 : 0,
                  pointerEvents: activeSection === "home" ? "auto" : "none",
                }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex items-center gap-2.5 px-4 py-2 rounded-full bg-transparent"
              >
                <LocalTime />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
