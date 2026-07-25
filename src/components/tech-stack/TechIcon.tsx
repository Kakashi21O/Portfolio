"use client";

interface TechIconProps {
  path: string;
  color: string;
  size?: number;
  className?: string;
}

export function TechIcon({ path, color, size = 20, className }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path d={path} fill={color} />
    </svg>
  );
}
