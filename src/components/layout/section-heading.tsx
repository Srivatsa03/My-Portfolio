import React from "react";

interface SectionHeadingProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const headingIconClass = "h-5 w-5 sm:h-6 sm:w-6 text-foreground/80";

// Section titles float on the wallpaper as small glass capsules.
export function SectionHeading({ icon, children, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-8 flex items-center justify-center ${className}`}>
      <h2 className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        <span className="text-foreground/80">{icon}</span>
        {children}
      </h2>
    </div>
  );
}
