// components/Section.tsx
import React from "react";

interface SectionProps {
  children: React.ReactNode;
  background?: "brand" | "white" | "light" | "dark" | string;
  spacing?: "sm" | "md" | "lg" | string;
  className?: string;
}

export function Section({
  children,
  background = "white",
  spacing = "md",
  className = "",
}: SectionProps) {
  const bgClasses: Record<string, string> = {
    brand: "bg-blue-600 text-white",
    white: "bg-white text-slate-900",
    light: "bg-slate-50 text-slate-900",
    dark: "bg-slate-900 text-white",
  };

  const spacingClasses: Record<string, string> = {
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
  };

  const bg = bgClasses[background] || background;
  const py = spacingClasses[spacing] || spacing;

  return <section className={`${bg} ${py} ${className}`}>{children}</section>;
}