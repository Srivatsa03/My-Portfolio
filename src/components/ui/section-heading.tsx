import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  icon?: ReactNode;
  className?: string;
}

export function SectionHeading({ eyebrow, title, icon, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-center gap-2">
        <span className="text-brand">{icon}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gradient sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
