"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "./CursorContext";

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How much it pulls towards cursor (default 15)
  cursorType?: "hovering_link" | "hovering_button" | "magnetic"; // Which state to trigger
}

export function MagneticWrapper({ 
  children, 
  className = "", 
  strength = 15,
  cursorType = "hovering_button"
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { setCursorState } = useCursor();

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    setPosition({ 
      x: (middleX * strength) / 100, 
      y: (middleY * strength) / 100 
    });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setCursorState("default");
  };

  const enter = () => {
    setCursorState(cursorType);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={enter}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
