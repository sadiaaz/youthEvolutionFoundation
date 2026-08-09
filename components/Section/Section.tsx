import { HTMLAttributes, ReactNode } from "react";
import { Container, ContainerSize } from "../Container";

export type SectionSpacing = "sm" | "md" | "lg";
export type SectionBackground = "white" | "light" | "dark" | "brand";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  spacing?: SectionSpacing;
  background?: SectionBackground;
  containerSize?: ContainerSize;
  noContainer?: boolean;
}

const spacingStyles: Record<SectionSpacing, string> = {
  sm: "py-8 sm:py-10",
  md: "py-14 sm:py-20",
  lg: "py-20 sm:py-28",
};

const backgroundStyles: Record<SectionBackground, string> = {
  white: "bg-white text-slate-900",
  light: "bg-slate-50 text-slate-900",
  dark: "bg-slate-900 text-white",
  brand: "bg-blue-800 text-white",
};

export function Section({
  children,
  spacing = "md",
  background = "white",
  containerSize = "xl",
  noContainer = false,
  className = "",
  ...rest
}: SectionProps) {
  return (
    <section
      className={[
        spacingStyles[spacing],
        backgroundStyles[background],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {noContainer ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}