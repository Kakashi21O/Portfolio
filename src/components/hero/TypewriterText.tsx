"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const roles = [
  "Python Developer",
  "Backend Engineer",
  "FastAPI Developer",
  "DevOps Learner",
  "Automation Enthusiast",
  "Open Source Learner",
];

export function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      if (text === "") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        timeoutId = setTimeout(() => {
          setText(currentRole.substring(0, text.length - 1));
        }, 50); // Deleting speed
      }
    } else {
      if (text === currentRole) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Pause before deleting
      } else {
        timeoutId = setTimeout(() => {
          setText(currentRole.substring(0, text.length + 1));
        }, 100); // Typing speed
      }
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, roleIndex]);

  return (
    <div className="flex items-center text-xl sm:text-2xl font-medium text-muted-foreground h-8">
      <span className="inline-block">{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="ml-1 inline-block w-[2px] h-6 bg-primary"
      />
    </div>
  );
}
