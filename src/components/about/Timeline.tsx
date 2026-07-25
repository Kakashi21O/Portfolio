"use client";

import { motion } from "framer-motion";
import { timelineData } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Timeline() {
  return (
    <div className="relative w-full py-8 space-y-12">
      {/* Vertical line connecting the timeline (Desktop mostly, or left-aligned on mobile) */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

      {timelineData.map((chapter, index) => {
        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`relative flex flex-col md:flex-row items-start md:items-center ${
              isEven ? "md:justify-start" : "md:justify-end"
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 md:translate-y-0 mt-6 md:mt-0 shadow-[0_0_10px_var(--color-primary)] hidden md:block" />

            {/* Timeline Content */}
            <div className={`w-full md:w-[45%] ${isEven ? "md:pr-12" : "md:pl-12"} p-4 md:p-0`}>
              <Card className="border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-colors duration-300">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-primary font-mono opacity-80">
                      Chapter 0{index + 1}
                    </span>
                    {chapter.age && (
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                        {chapter.age}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-foreground/90">{chapter.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {chapter.story.map((paragraph, i) => (
                    <p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
