import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  once?: boolean;
}

/** Reveal-on-scroll wrapper: fades, un-blurs, and lifts into place. */
export function BlurFade({
  children,
  className,
  delay = 0,
  yOffset = 12,
  once = true,
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-64px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(6px)", y: yOffset }}
      animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
