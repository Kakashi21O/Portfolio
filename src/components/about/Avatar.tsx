"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import Image from "next/image";

interface AvatarProps {
  // TODO: Point this to the final anime avatar asset when available (e.g., "/images/anime-avatar.png")
  imagePath?: string;
}

export function Avatar({ imagePath }: AvatarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full group mx-auto mb-8"
    >
      {/* Decorative rotating glow rings */}
      <div className="absolute inset-0 rounded-full border border-primary/20 scale-[1.05] group-hover:scale-[1.1] group-hover:border-primary/40 transition-all duration-700 pointer-events-none" />
      <div className="absolute inset-0 rounded-full border border-dashed border-primary/20 scale-[1.12] group-hover:scale-[1.2] group-hover:rotate-45 transition-all duration-1000 pointer-events-none" />
      <div className="absolute inset-0 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />

      {/* Floating animation for the avatar itself */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full rounded-full border border-white/10 bg-card/20 overflow-hidden flex items-center justify-center relative shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] transition-shadow duration-700 z-10"
      >
        {imagePath ? (
          <Image 
            src={imagePath} 
            alt="Mantu Yadav Avatar" 
            fill 
            sizes="(max-width: 768px) 224px, (max-width: 1024px) 256px, 256px"
            className="object-cover relative z-10"
          />
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center text-muted-foreground opacity-50 group-hover:opacity-80 transition-opacity duration-300">
            <User className="w-16 h-16 md:w-20 md:h-20 mb-2" />
            <span className="text-xs font-mono uppercase tracking-widest text-center px-4">
              Avatar Placeholder
            </span>
          </div>
        )}

        {/* Highlight inner rim */}
        <div className="absolute inset-0 rounded-full border border-white/5 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}
