"use client";

import { motion } from "framer-motion";
import { timelineData } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Timeline() {
  return (
    <div className="relative w-full py-8 space-y-16">
      {/* Vertical line connecting the timeline with a gradient */}
      <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 -translate-x-1/2 hidden lg:block" />
      <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 -translate-x-1/2 lg:hidden block" />

      {timelineData.map((chapter, index) => {
        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col lg:flex-row items-start lg:items-center ${
              isEven ? "lg:justify-start" : "lg:justify-end"
            }`}
          >
            {/* Timeline Dot (Desktop & Mobile) */}
            <div className="absolute left-6 lg:left-1/2 w-4 h-4 rounded-full border-2 border-background bg-primary -translate-x-1/2 lg:translate-y-0 mt-7 lg:mt-0 shadow-[0_0_15px_var(--color-primary)] z-10" />

            {/* Timeline Content */}
            <div className={`w-full lg:w-[47%] pl-16 lg:pl-0 ${isEven ? "lg:pr-12" : "lg:pl-12"}`}>
              <Card className="relative overflow-hidden border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/20 group hover:bg-white/10 transition-all duration-500 rounded-2xl">
                {/* Subtle gradient glow behind the card on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs md:text-sm text-primary font-mono tracking-widest opacity-90">
                      CHAPTER 0{index + 1}
                    </span>
                    {chapter.age && (
                      <span className="text-[10px] md:text-xs font-mono text-muted-foreground uppercase bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                        {chapter.age}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-medium tracking-tight text-foreground/95">{chapter.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  {chapter.story.map((paragraph, i) => (
                    <p key={i} className="text-base text-muted-foreground/80 leading-relaxed">
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
