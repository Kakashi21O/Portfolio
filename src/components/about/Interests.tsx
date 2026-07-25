"use client";

import { motion, Variants } from "framer-motion";
import { interestsData } from "./data";

export function Interests() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="w-full mt-16 mb-8">
      <h3 className="text-xl font-semibold mb-6 text-foreground/80">Currently Exploring</h3>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap gap-3"
      >
        {interestsData.map((interest, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group cursor-pointer"
          >
            {/* Glow Background on Hover */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Chip content */}
            <div className="relative px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
              {interest.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
