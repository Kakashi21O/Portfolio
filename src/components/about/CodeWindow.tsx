"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const codeLines = [
  { text: "while learning:", indent: 0 },
  { text: "build()", indent: 4 },
  { text: "fail()", indent: 4 },
  { text: "learn()", indent: 4 },
  { text: "repeat()", indent: 4 }
];

export function CodeWindow() {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; indent: number }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setIsTyping(true);
      }, 3000); // Wait 3 seconds before restarting
      return () => clearTimeout(timeout);
    }

    if (currentLineIndex < codeLines.length) {
      const currentLine = codeLines[currentLineIndex];
      if (currentCharIndex < currentLine.text.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            if (!newLines[currentLineIndex]) {
              newLines[currentLineIndex] = { text: "", indent: currentLine.indent };
            }
            newLines[currentLineIndex].text += currentLine.text[currentCharIndex];
            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, 60); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 200); // Line break delay
        return () => clearTimeout(timeout);
      }
    } else {
      setTimeout(() => setIsTyping(false), 0);
    }
  }, [currentLineIndex, currentCharIndex, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-lg mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-sm shadow-2xl shadow-black/60 font-mono text-sm group"
    >
      {/* Subtle outer glow that activates on hover */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-700 -z-10" />

      {/* VS Code Window Header with Beautiful-UI styled status badge & copy button */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/[0.08] backdrop-blur-md relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90 border border-black/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90 border border-black/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90 border border-black/10" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-white/50 tracking-wider">
            journey.py
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {isTyping ? "executing" : "ready"}
          </span>
          <button
            onClick={() => {
              const fullCode = codeLines.map((l) => " ".repeat(l.indent) + l.text).join("\n");
              navigator.clipboard?.writeText(fullCode);
            }}
            title="Copy code"
            className="text-[10px] font-mono text-muted-foreground/60 hover:text-foreground hover:bg-white/10 px-2 py-0.5 rounded transition-colors"
          >
            copy
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-5 md:p-6 text-gray-300 min-h-[170px] text-xs md:text-sm leading-relaxed relative z-10 bg-gradient-to-b from-transparent to-black/20 font-mono">
        {displayedLines.map((line, index) => (
          <div key={index} className="flex group/line">
            <span className="w-6 text-white/20 select-none text-right mr-5 pr-2 border-r border-white/5 group-hover/line:border-white/20 group-hover/line:text-white/40 transition-colors duration-300">
              {index + 1}
            </span>
            <span style={{ marginLeft: `${line.indent * 0.6}rem` }}>
              {/* Syntax highlighting */}
              {line.text.split(/(\bwhile\b|\(|\)|:)/).map((part, i) => {
                if (part === "while") return <span key={i} className="text-[#c678dd] drop-shadow-[0_0_8px_rgba(198,120,221,0.3)]">{part}</span>;
                if (part === "learning") return <span key={i} className="text-[#e5c07b] drop-shadow-[0_0_8px_rgba(229,192,123,0.3)]">{part}</span>;
                if (part === ":" || part === "(" || part === ")") return <span key={i} className="text-[#abb2bf]">{part}</span>;
                if (["build", "fail", "learn", "repeat"].includes(part)) return <span key={i} className="text-[#61afef] drop-shadow-[0_0_8px_rgba(97,175,239,0.3)]">{part}</span>;
                return <span key={i} className="text-[#98c379]">{part}</span>;
              })}
              {index === currentLineIndex && isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-4 bg-primary ml-1 align-middle shadow-[0_0_8px_var(--color-primary)]"
                />
              )}
            </span>
          </div>
        ))}
        {/* Blinking cursor at the end when done typing */}
        {!isTyping && (
          <div className="flex">
            <span className="w-6 text-white/20 select-none text-right mr-5 pr-2 border-r border-white/5">
              {codeLines.length + 1}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-primary ml-1 align-middle shadow-[0_0_8px_var(--color-primary)]"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
