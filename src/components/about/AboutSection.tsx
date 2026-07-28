"use client";

import { motion } from "framer-motion";
import { Timeline } from "./Timeline";
import { Avatar } from "./Avatar";
import { CodeWindow } from "./CodeWindow";
import { Interests } from "./Interests";
import { InterestingFacts } from "./InterestingFacts";
import { publicPath } from "@/lib/utils";

export function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center items-center overflow-visible"
    >
      {/* Ambient Background Glows */}
      <div 
        className="absolute top-40 -left-20 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" 
      />
      <div 
        className="absolute bottom-40 -right-20 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" 
      />

      {/* Section Introduction */}
      <div className="w-full text-center md:text-left mb-20 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-6 justify-center md:justify-start"
        >
          <div className="h-[1px] w-12 bg-primary/50" />
          <h2 className="text-sm font-mono text-primary uppercase tracking-[0.2em]">
            About Me
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground max-w-3xl leading-tight"
        >
          My journey into programming started much earlier than I ever expected.
        </motion.p>
      </div>

      {/* Main Layout Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side: Timeline & Interests */}
        <div className="lg:col-span-7 flex flex-col space-y-16">
          <Timeline />
          <Interests />
        </div>

        {/* Right Side: Avatar, Code Window & Facts */}
        <div className="lg:col-span-5 flex flex-col space-y-20 mt-8 lg:mt-0 lg:sticky lg:top-32 self-start pb-32">
          <div className="flex flex-col items-center relative">
            <Avatar imagePath={publicPath("/images/avatar.webp")} />
            <div className="w-full mt-8 transform md:translate-x-6 lg:translate-x-12 z-20">
              <CodeWindow />
            </div>
          </div>
          
          <InterestingFacts />
        </div>

      </div>

    </section>
  );
}
