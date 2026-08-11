"use client";

import { cn } from "@/lib/utils";

export const AnimatedLogo = ({
  className,
  onClick,
}: {
  theme?: "dark" | "light";
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Home"
      className={cn(
        "inline-flex items-center justify-center rounded-md text-foreground transition-colors hover:text-primary",
        className
      )}
    >
      <span className="font-script text-2xl leading-none pb-1 sm:text-3xl">S</span>
    </button>
  );
};
