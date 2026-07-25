"use client";

import { motion, Variants } from "framer-motion";
import { interestsData } from "./data";

export function Interests() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="w-full mt-16 mb-8">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-xl font-medium text-foreground tracking-tight">Currently Exploring</h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-border/50 to-transparent" />
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-wrap gap-3 md:gap-4"
      >
        {interestsData.map((interest, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group cursor-pointer"
          >
            {/* Ambient Background Glow on Hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Inner Border Glow */}
            <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-primary/50 transition-colors duration-500 z-10" />
            
            {/* Chip content */}
            <div className="relative px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-muted-foreground group-hover:text-white group-hover:shadow-[0_0_20px_var(--color-primary)] transition-all duration-300 z-20 overflow-hidden">
              <span className="relative z-10 tracking-wide">{interest.label}</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
