import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
}

/** Horizontal marquee built on the CSS animate-marquee utility. */
export function Marquee({
  children,
  className,
  reverse,
  pauseOnHover = true,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex flex-row overflow-hidden [--duration:32s] [--gap:1rem]",
        className
      )}
      style={{ gap: "var(--gap)" }}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 flex-row items-center justify-around animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
          style={{ gap: "var(--gap)" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
