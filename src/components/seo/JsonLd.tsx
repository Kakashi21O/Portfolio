"use client";

import { useEffect, useState } from "react";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mantu Yadav",
  url: "https://mantuyadav.dev",
  jobTitle: "Python & Backend Developer",
  sameAs: [
    "https://github.com/mantu-yadav",
    "https://linkedin.com/in/mantu-yadav",
  ],
  knowsAbout: [
    "Python",
    "FastAPI",
    "Backend Development",
    "React",
    "Next.js",
    "TypeScript",
    "Docker",
    "PostgreSQL",
  ],
};

export function JsonLd() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
