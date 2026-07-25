"use client";

import { motion } from "framer-motion";
import { Timeline } from "./Timeline";
import { Avatar } from "./Avatar";
import { CodeWindow } from "./CodeWindow";
import { Interests } from "./Interests";
import { InterestingFacts } from "./InterestingFacts";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col justify-center items-center">
      
      {/* Section Introduction */}
      <div className="w-full text-center md:text-left mb-16 md:mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl"
        >
          My journey into programming started much earlier than I ever expected.
        </motion.p>
      </div>

      {/* Main Layout Grid */}
      {/* Mobile: 1 col, Tablet: 40/60 or 50/50 depending on how we treat 'md' vs 'lg', Desktop: 50/50 */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Side: Timeline & Interests */}
        <div className="md:col-span-7 lg:col-span-7 flex flex-col space-y-12">
          <Timeline />
          <Interests />
        </div>

        {/* Right Side: Avatar, Code Window & Facts */}
        <div className="md:col-span-5 lg:col-span-5 flex flex-col space-y-16 mt-8 md:mt-0 sticky top-24 self-start">
          <div className="flex flex-col items-center">
            <Avatar />
            <div className="w-full mt-4 transform md:translate-x-4 lg:translate-x-8">
              <CodeWindow />
            </div>
          </div>
          
          <InterestingFacts />
        </div>

      </div>

    </section>
  );
}
