"use client";

import { motion, Variants } from "framer-motion";
import { factsData, quote, personalSide } from "./data";
import { Card, CardContent } from "@/components/ui/card";

export function InterestingFacts() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="w-full mt-16 space-y-16">
      
      {/* Philosophy Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative group"
      >
        <div className="absolute -left-4 -top-6 text-8xl text-primary/10 font-serif leading-none select-none transition-colors duration-500 group-hover:text-primary/20">
          "
        </div>
        <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-foreground/90 relative z-10 pl-6 border-l-2 border-primary/30 group-hover:border-primary transition-colors duration-500">
          {quote}
        </p>
      </motion.div>

      {/* Fun Facts Grid */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-xs font-mono text-primary uppercase tracking-widest">Fun Facts</h3>
          <div className="h-[1px] flex-1 bg-border/50" />
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {factsData.map((fact) => (
            <motion.div key={fact.id} variants={itemVariants} className="group h-full cursor-default">
              <Card className="h-full border-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 relative overflow-hidden rounded-xl">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-5 flex items-start h-full relative z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 shrink-0 shadow-[0_0_8px_var(--color-primary)] group-hover:scale-125 transition-transform duration-300" />
                  <p className="text-sm text-muted-foreground/90 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                    {fact.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Personal Side */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-xs font-mono text-primary uppercase tracking-widest">Beyond Code</h3>
          <div className="h-[1px] flex-1 bg-border/50" />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground/70">
          {personalSide.map((item, index) => (
            <span key={index} className="flex items-center hover:text-primary transition-colors cursor-default">
              {item}
              {index < personalSide.length - 1 && (
                <span className="ml-4 text-border/50 hidden sm:inline">•</span>
              )}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
