"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// The cycle of name variants shown in the hero.
const NAMES = ["Sri", "Srivatsa", "Srivatsaaahhh", "Vatsa"];
const ELONGATED = "Srivatsaaahhh";

const TYPE_MS = 95;      // per character while typing
const DELETE_MS = 45;    // per character while deleting
const HOLD_MS = 1250;    // pause on a fully typed name
const EMPTY_MS = 280;    // pause before the next name starts

type Phase = "typing" | "deleting";

export function AnimatedName({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    const full = NAMES[index];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < full.length) {
        timer = setTimeout(() => setText(full.slice(0, text.length + 1)), TYPE_MS);
      } else {
        timer = setTimeout(() => setPhase("deleting"), HOLD_MS);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(full.slice(0, text.length - 1)), DELETE_MS);
      } else {
        timer = setTimeout(() => {
          setIndex((i) => (i + 1) % NAMES.length);
          setPhase("typing");
        }, EMPTY_MS);
      }
    }

    return () => clearTimeout(timer);
  }, [text, phase, index]);

  // Elastic stretch fires when the elongated variant is fully typed (the "aaahhh").
  const stretching =
    phase === "typing" && NAMES[index] === ELONGATED && text === ELONGATED;

  return (
    <span className={className}>
      <span
        className={cn(
          // Explicit color so it stays visible (an inline-block child does not
          // inherit the parent's background-clip:text gradient).
          "inline-block will-change-transform bg-gradient-to-b from-violet-500 to-violet-700 bg-clip-text text-transparent dark:from-violet-300 dark:to-violet-500",
          stretching && "animate-[stretch_0.7s_ease-out]"
        )}
        style={{ transformOrigin: "center" }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="ml-[0.03em] inline-block h-[0.82em] w-[0.055em] translate-y-[0.06em] rounded-full bg-violet-400/90 align-baseline animate-[blink_1s_steps(1)_infinite]"
      />
    </span>
  );
}
