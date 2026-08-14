"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// A clean, elegant single-stroke script "S", drawn like a signature.
const S_PATH =
  "M71 29 C71 18 53 15 44 21 C31 29 34 43 51 48 C68 53 73 65 61 74 C51 82 34 81 27 71";

export const AnimatedLogo = ({
  className,
  onClick,
}: {
  theme?: "dark" | "light";
  className?: string;
  onClick?: () => void;
}) => {
  const [drawKey, setDrawKey] = useState(0);

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        setDrawKey((k) => k + 1);
      }}
      aria-label="Home"
      className={cn("inline-flex items-center justify-center", className)}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <motion.path
          key={drawKey}
          d={S_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={7.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-violet-500 dark:text-violet-300"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 1.4, ease: "easeInOut" },
            opacity: { duration: 0.2 },
          }}
        />
      </svg>
    </button>
  );
};
