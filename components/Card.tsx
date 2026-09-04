import { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  noPadding?: boolean;
}

export function Card({
  children,
  hoverable = false,
  noPadding = false,
  className = "",
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        "rounded-xl border border-slate-200 bg-white shadow-sm",
        noPadding ? "" : "p-5 sm:p-6",
        hoverable ? "transition-shadow duration-200 hover:shadow-md" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

Card.Image = function CardImage({ src, alt, className = "" }: CardImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={[
        "w-full rounded-t-xl object-cover aspect-[16/9]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
};

Card.Title = function CardTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={["text-lg font-semibold text-slate-900", className].join(" ")}>
      {children}
    </h3>
  );
};

Card.Description = function CardDescription({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={["mt-2 text-sm text-slate-600", className].join(" ")}>
      {children}
    </p>
  );
};