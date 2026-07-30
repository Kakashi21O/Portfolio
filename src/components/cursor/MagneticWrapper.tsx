"use client";

import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "./CursorContext";
import { useIsMobile } from "@/hooks/useIsMobile";

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  cursorType?: "hovering_link" | "hovering_button" | "magnetic";
}

export function MagneticWrapper({
  children,
  className = "",
  strength = 15,
  cursorType = "hovering_button"
}: MagneticWrapperProps) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef({ left: 0, top: 0, width: 0, height: 0 });
  const { setCursorState } = useCursor();

  // On mobile, render children directly without magnetic effect
  if (isMobile !== false) return <div className={`inline-block ${className}`}>{children}</div>;

  // Use MotionValues + Springs instead of React state — no renders on mousemove
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = rectRef.current;
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    x.set((middleX * strength) / 100);
    y.set((middleY * strength) / 100);
  }, [x, y, strength]);

  const handleEnter = useCallback(() => {
    // Cache the bounding rect on enter — no layout read on every mousemove
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      rectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    }
    setCursorState(cursorType);
  }, [setCursorState, cursorType]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setCursorState("default");
  }, [x, y, setCursorState]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
