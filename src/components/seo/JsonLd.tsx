"use client";

import { useEffect, useState } from "react";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mantu Yadav",
  url: "https://mantuyadav.dev",
  jobTitle: "Python & Backend Developer",
  sameAs: [
    "https://github.com/Kakashi21O",
    "https://www.linkedin.com/in/mantu-yadavo1",
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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
