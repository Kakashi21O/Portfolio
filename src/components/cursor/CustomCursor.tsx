"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "./CursorContext";

export function CustomCursor() {
  const { cursorState } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the cursor ring
  const ringX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    // Detect touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || cursorState === "hidden") return null;

  // Define variants based on cursor state
  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(167, 139, 250, 0)",
      borderColor: "rgba(167, 139, 250, 0.5)",
      borderWidth: 1,
    },
    hovering_link: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(167, 139, 250, 0.1)",
      borderColor: "rgba(167, 139, 250, 1)",
      borderWidth: 2,
    },
    hovering_button: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(167, 139, 250, 0)",
      borderColor: "rgba(167, 139, 250, 0.8)",
      borderWidth: 2,
      scale: 1.1,
    },
    magnetic: {
      width: 0,
      height: 0,
      backgroundColor: "rgba(167, 139, 250, 0)",
      borderColor: "rgba(167, 139, 250, 0)",
      borderWidth: 0,
    },
    text: {
      width: 4,
      height: 24,
      backgroundColor: "rgba(167, 139, 250, 1)",
      borderColor: "rgba(167, 139, 250, 0)",
      borderWidth: 0,
      borderRadius: "2px",
    },
  };

  const dotVariants = {
    default: {
      width: 6,
      height: 6,
      opacity: 1,
    },
    hovering_link: {
      width: 8,
      height: 8,
      opacity: 1,
    },
    hovering_button: {
      width: 0,
      height: 0,
      opacity: 0,
    },
    magnetic: {
      width: 0,
      height: 0,
      opacity: 0,
    },
    text: {
      width: 0,
      height: 0,
      opacity: 0,
    },
  };

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        variants={ringVariants}
        animate={cursorState}
        initial="default"
        transition={{ type: "spring", stiffness: 300, damping: 20, opacity: { duration: 0.3 } }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        variants={dotVariants}
        animate={cursorState}
        initial="default"
        transition={{ type: "spring", stiffness: 500, damping: 28, opacity: { duration: 0.3 } }}
      />
    </>
  );
}
