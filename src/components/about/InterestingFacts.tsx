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
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full mt-16 space-y-10">
      
      {/* Philosophy Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="absolute -left-2 -top-4 text-6xl text-primary/20 font-serif leading-none select-none">
          "
        </div>
        <p className="text-lg md:text-xl font-medium leading-relaxed italic text-foreground/90 relative z-10 pl-6 border-l-2 border-primary/50">
          {quote}
        </p>
      </motion.div>

      {/* Fun Facts Grid */}
      <div>
        <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-wider">Fun Facts</h3>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {factsData.map((fact) => (
            <motion.div key={fact.id} variants={itemVariants}>
              <Card className="h-full border-border/40 bg-card/20 backdrop-blur hover:bg-card/40 transition-colors duration-300">
                <CardContent className="p-4 flex items-center h-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 shrink-0" />
                  <p className="text-sm text-muted-foreground">{fact.text}</p>
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
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-sm font-mono text-primary mb-3 uppercase tracking-wider">Beyond Code</h3>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          {personalSide.map((item, index) => (
            <span key={index} className="flex items-center">
              {item}
              {index < personalSide.length - 1 && (
                <span className="mx-2 text-border">•</span>
              )}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
