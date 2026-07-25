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
        }, 80); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 300); // Line break delay
        return () => clearTimeout(timeout);
      }
    } else {
      setIsTyping(false);
    }
  }, [currentLineIndex, currentCharIndex, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md mx-auto rounded-xl overflow-hidden border border-border/50 bg-[#1e1e1e] shadow-2xl font-mono text-sm"
    >
      {/* VS Code Window Header */}
      <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-white/5">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="ml-4 flex-1 text-center text-xs text-white/40 mr-12 select-none">
          journey.py
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 md:p-6 text-gray-300 min-h-[160px]">
        {displayedLines.map((line, index) => (
          <div key={index} className="flex">
            <span className="w-6 text-white/20 select-none text-right mr-4">{index + 1}</span>
            <span style={{ marginLeft: `${line.indent * 0.5}rem` }}>
              {/* Basic syntax highlighting */}
              {line.text.split(/(\bwhile\b|\(|\)|:)/).map((part, i) => {
                if (part === "while") return <span key={i} className="text-[#c678dd]">{part}</span>;
                if (part === "learning") return <span key={i} className="text-[#e5c07b]">{part}</span>;
                if (part === ":" || part === "(" || part === ")") return <span key={i} className="text-[#abb2bf]">{part}</span>;
                if (["build", "fail", "learn", "repeat"].includes(part)) return <span key={i} className="text-[#61afef]">{part}</span>;
                return <span key={i}>{part}</span>;
              })}
              {index === currentLineIndex && isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-[2px] h-4 bg-primary ml-1 align-middle"
                />
              )}
            </span>
          </div>
        ))}
        {/* Blinking cursor at the end when done typing */}
        {!isTyping && (
          <div className="flex">
            <span className="w-6 text-white/20 select-none text-right mr-4">{codeLines.length + 1}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-[2px] h-4 bg-primary align-middle"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
