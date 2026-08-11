import { cn } from "@/lib/utils";
import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "a" | "li";
  href?: string;
}

/** Card with a soft border and a cursor-following brand glow on hover. */
export function GlowCard({ children, className, as = "div", href }: GlowCardProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const Tag = as as "div";
  const extra = as === "a" ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-300 hover:border-[color-mix(in_oklab,var(--brand)_45%,var(--border))]",
        className
      )}
      {...extra}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--brand) 15%, transparent), transparent 68%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </Tag>
  );
}
