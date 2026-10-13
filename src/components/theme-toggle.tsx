"use client";

// import { Button } from "@/components/ui/button";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useState } from "react";


export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = () => {
    const next = theme === "dark" ? "light" : "dark";

    // Triggers the spin-grow keyframe (500ms, defined in tailwind.config.js).
    const spinIcon = () => {
      setIsToggling(true);
      setTimeout(() => setIsToggling(false), 500);
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => unknown) => { finished: Promise<void> };
    };

    if (typeof doc.startViewTransition !== "function") {
      setTheme(next);
      spinIcon();
      return;
    }

    // Run the view transition first so the page palette cross-fades, THEN
    // spin the now-visible icon. Otherwise the cross-fade snapshot freezes
    // the icon mid-spin and the animation reads as a flicker.
    const transition = doc.startViewTransition(() => setTheme(next));
    transition.finished.then(spinIcon).catch(() => spinIcon());
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Switch between light and dark mode"
      className="grid h-8 w-8 place-items-center rounded-full text-foreground/75 transition-colors hover:bg-foreground/[0.08] hover:text-foreground"
    >
      <IconSun
        className={`h-[18px] w-[18px] dark:hidden ${isToggling ? "animate-spin-grow" : ""}`}
      />
      <IconMoonStars
        className={`hidden h-[18px] w-[18px] dark:block ${isToggling ? "animate-spin-grow" : ""}`}
      />
    </button>
  );
}