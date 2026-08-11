import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  icon?: ReactNode;
  className?: string;
}

/** Centered icon + title, matching the reference. */
export function SectionHeading({ title, icon, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 flex items-center justify-center gap-2", className)}>
      <span className="text-secondary-foreground">{icon}</span>
      <h2 className="text-xl font-bold tracking-tight text-secondary-foreground sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}
