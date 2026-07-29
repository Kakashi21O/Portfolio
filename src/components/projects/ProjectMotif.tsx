"use client";

import { useId } from "react";

interface ProjectMotifProps {
  category: string;
  isHovered: boolean;
}

function NodesMotif({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 300"
      fill="none"
      aria-hidden="true"
    >
      <g
        className="transition-all duration-700"
        style={{ opacity: isHovered ? 0.12 : 0.05 }}
      >
        <circle cx="80" cy="60" r="3" className="fill-primary/40" />
        <circle cx="200" cy="40" r="2" className="fill-primary/40" />
        <circle cx="320" cy="70" r="2.5" className="fill-primary/40" />
        <circle cx="140" cy="120" r="2" className="fill-primary/40" />
        <circle cx="260" cy="100" r="3" className="fill-primary/40" />
        <circle cx="350" cy="150" r="2" className="fill-primary/40" />
        <circle cx="60" cy="180" r="2.5" className="fill-primary/40" />
        <circle cx="180" cy="200" r="2" className="fill-primary/40" />
        <circle cx="300" cy="230" r="3" className="fill-primary/40" />
        <circle cx="380" cy="250" r="2" className="fill-primary/40" />

        <path d="M80 60 L200 40 L320 70 L260 100 L350 150" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
        <path d="M80 60 L140 120 L180 200" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
        <path d="M200 40 L260 100 L300 230" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
        <path d="M320 70 L350 150 L380 250" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
        <path d="M140 120 L60 180" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
      </g>
    </svg>
  );
}

function GridMotif({ isHovered }: { isHovered: boolean }) {
  const id = useId();
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 300"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`grid-${id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect
        width="400"
        height="300"
        fill={`url(#grid-${id})`}
        className="text-primary/40 transition-all duration-700"
        style={{ opacity: isHovered ? 0.2 : 0.08 }}
      />

      <g
        className="transition-all duration-700"
        style={{ opacity: isHovered ? 0.15 : 0.06 }}
      >
        <rect x="60" y="50" width="16" height="16" rx="2" fill="currentColor" className="fill-primary/30 text-primary/20" strokeWidth="0.5" />
        <rect x="180" y="30" width="20" height="20" rx="2" fill="currentColor" className="fill-primary/30 text-primary/20" strokeWidth="0.5" />
        <rect x="300" y="60" width="14" height="14" rx="2" fill="currentColor" className="fill-primary/30 text-primary/20" strokeWidth="0.5" />
        <rect x="120" y="120" width="12" height="12" rx="2" fill="currentColor" className="fill-primary/30 text-primary/20" strokeWidth="0.5" />
        <rect x="240" y="100" width="18" height="18" rx="2" fill="currentColor" className="fill-primary/30 text-primary/20" strokeWidth="0.5" />
        <rect x="40" y="200" width="14" height="14" rx="2" fill="currentColor" className="fill-primary/30 text-primary/20" strokeWidth="0.5" />
        <rect x="160" y="220" width="16" height="16" rx="2" fill="currentColor" className="fill-primary/30 text-primary/20" strokeWidth="0.5" />
        <rect x="320" y="180" width="20" height="20" rx="2" fill="currentColor" className="fill-primary/30 text-primary/20" strokeWidth="0.5" />

        <circle cx="68" cy="58" r="2" className="fill-emerald-500/40" />
        <circle cx="190" cy="40" r="2.5" className="fill-emerald-500/40" />
        <circle cx="307" cy="67" r="2" className="fill-emerald-500/40" />
        <circle cx="126" cy="126" r="1.5" className="fill-emerald-500/40" />
        <circle cx="249" cy="109" r="2" className="fill-emerald-500/40" />
      </g>
    </svg>
  );
}

function RoutingMotif({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 300"
      fill="none"
      aria-hidden="true"
    >
      <g
        className="transition-all duration-700"
        style={{ opacity: isHovered ? 0.15 : 0.06 }}
      >
        <circle cx="60" cy="50" r="4" className="fill-primary/40" />
        <circle cx="340" cy="50" r="4" className="fill-primary/40" />
        <circle cx="60" cy="250" r="4" className="fill-primary/40" />
        <circle cx="340" cy="250" r="4" className="fill-primary/40" />
        <circle cx="200" cy="150" r="5" className="fill-primary/50" />

        <path d="M60 50 L200 150 L340 50" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
        <path d="M60 50 L200 150 L60 250" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
        <path d="M340 50 L200 150 L340 250" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
        <path d="M60 250 L200 150 L340 250" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />

        <circle cx="130" cy="100" r="2" className="fill-accent/50" />
        <circle cx="270" cy="100" r="2" className="fill-accent/50" />
        <circle cx="130" cy="200" r="2" className="fill-accent/50" />
        <circle cx="270" cy="200" r="2" className="fill-accent/50" />

        <path d="M200 150 L130 100" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" className="text-accent/20" />
        <path d="M200 150 L270 100" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" className="text-accent/20" />
        <path d="M200 150 L130 200" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" className="text-accent/20" />
        <path d="M200 150 L270 200" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" className="text-accent/20" />
      </g>
    </svg>
  );
}

function OrbitMotif({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 300"
      fill="none"
      aria-hidden="true"
    >
      <g
        className="transition-all duration-700"
        style={{ opacity: isHovered ? 0.15 : 0.06 }}
      >
        <ellipse cx="200" cy="150" rx="140" ry="80" stroke="currentColor" strokeWidth="0.4" className="text-primary/30" transform="rotate(-10 200 150)" />
        <ellipse cx="200" cy="150" rx="100" ry="55" stroke="currentColor" strokeWidth="0.4" className="text-primary/30" transform="rotate(15 200 150)" />
        <ellipse cx="200" cy="150" rx="60" ry="30" stroke="currentColor" strokeWidth="0.3" className="text-primary/30" transform="rotate(-5 200 150)" />

        <circle cx="80" cy="90" r="2" className="fill-primary/40" />
        <circle cx="310" cy="110" r="2" className="fill-primary/40" />
        <circle cx="140" cy="100" r="1.5" className="fill-primary/40" />
        <circle cx="260" cy="80" r="1.5" className="fill-primary/40" />
        <circle cx="100" cy="200" r="2" className="fill-primary/40" />
        <circle cx="290" cy="210" r="2" className="fill-primary/40" />

        <circle cx="200" cy="150" r="8" fill="currentColor" className="fill-primary/20 text-primary/20" strokeWidth="0.3" />
      </g>
    </svg>
  );
}

export function ProjectMotif({ category, isHovered }: ProjectMotifProps) {
  const variant =
    category === "AI" ? "nodes" :
    category === "DevOps" ? "grid" :
    category === "Backend" ? "routing" :
    "orbit";

  switch (variant) {
    case "nodes":
      return <NodesMotif isHovered={isHovered} />;
    case "grid":
      return <GridMotif isHovered={isHovered} />;
    case "routing":
      return <RoutingMotif isHovered={isHovered} />;
    case "orbit":
      return <OrbitMotif isHovered={isHovered} />;
  }
}
