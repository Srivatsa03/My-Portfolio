"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// A single-stroke "S" spine, drawn like a signature.
const S_PATH =
  "M72 28 C72 17 53 14 43 21 C30 30 33 44 50 49 C67 54 70 65 60 73 C50 81 32 80 28 70";

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
          strokeWidth={9}
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
