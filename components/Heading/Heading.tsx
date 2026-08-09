import { HTMLAttributes, ReactNode, ElementType } from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingAlign = "left" | "center" | "right";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level?: HeadingLevel;
  size?: HeadingLevel;
  align?: HeadingAlign;
  muted?: boolean;
}

const sizeStyles: Record<HeadingLevel, string> = {
  1: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight",
  2: "text-3xl sm:text-4xl font-bold tracking-tight",
  3: "text-2xl sm:text-3xl font-semibold",
  4: "text-xl sm:text-2xl font-semibold",
  5: "text-lg sm:text-xl font-semibold",
  6: "text-base sm:text-lg font-semibold",
};

const alignStyles: Record<HeadingAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function Heading({
  children,
  level = 2,
  size,
  align = "left",
  muted = false,
  className = "",
  ...rest
}: HeadingProps) {
const Tag = `h${level}` as ElementType;
  const visualSize = size ?? level;

  return (
    <Tag
      className={[
        sizeStyles[visualSize],
        alignStyles[align],
        muted ? "text-slate-500" : "text-slate-900",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}