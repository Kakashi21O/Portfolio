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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex justify-center items-center w-full aspect-square max-w-[280px] mx-auto mb-8 rounded-full border border-border/50 bg-card/20 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] group"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
      
      {imagePath ? (
        <Image 
          src={imagePath} 
          alt="Mantu Yadav Avatar" 
          fill 
          className="object-cover relative z-10"
        />
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center text-muted-foreground">
          <User className="w-20 h-20 opacity-50 mb-4" />
          <span className="text-xs font-mono uppercase tracking-widest opacity-60 text-center px-4">
            Avatar Placeholder
          </span>
        </div>
      )}
    </motion.div>
  );
}
