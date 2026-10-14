"use client";
import React, { JSX, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../theme-toggle";
import { useTheme } from "next-themes";
import { AnimatedLogo } from "../ui/logo-animation"
import { useTransitionRouter } from "next-view-transitions";
import { CommandPaletteButton } from "../command-palette/command-palette-button";
import { IconBrandGithub, IconStar } from "@tabler/icons-react";
import { useGitHubStars } from "@/hooks/useGitHubStars";

const FALLBACK_REPO_URL = "https://github.com/Srivatsa03/My-Portfolio";
// import Link from "next/link";
// import Image from "next/image";


export const Navbar = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: starsData } = useGitHubStars();
  const repoUrl = starsData?.url ?? FALLBACK_REPO_URL;
  const stars = starsData?.stars ?? 0;
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const router = useTransitionRouter();


  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (current) => {

    if (typeof current === "number") {
      const previous = scrollY.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;

      if (current < 50) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleNavClick = (link: string) => {
    if (link.startsWith("/")) {
      router.push(link);
      return;
    }
    if (window.location.pathname !== "/") {
      router.push(`/#${link}`);
      return;
    }
    const section = document.getElementById(link);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    router.push("/"); // Navigate to the home page
  };



  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "pointer-events-none fixed inset-x-0 top-3 z-[5000] flex justify-center px-3 sm:top-5",
            className
          )}
        >
          <nav className="glass pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-2 rounded-full py-2 pl-4 pr-2 sm:pl-5">
            {/* Logo on the left */}
            <div className="flex items-center">
              {mounted && (
                <AnimatedLogo
                  theme={resolvedTheme === "dark" ? "dark" : "light"}
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  onClick={handleLogoClick}
                />
              )}
            </div>

            {/* Links, then the controls */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              {navItems.map((navItem, idx) => (
                <button
                  key={`link=${idx}`}
                  onClick={() => handleNavClick(navItem.link)}
                  className="relative flex items-center rounded-full px-2.5 py-1.5 text-sm font-semibold text-foreground/75 transition-colors duration-300 hover:bg-foreground/[0.08] hover:text-foreground sm:px-3.5"
                >
                  <span className="block sm:hidden">{navItem.icon}</span>
                  <span className="hidden sm:block">{navItem.name}</span>
                </button>
              ))}
              <span aria-hidden className="mx-1 h-5 w-px self-center bg-foreground/15" />
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Star this site on GitHub (${stars} stars)`}
                className="glass-chip group hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs text-foreground/75 transition-colors hover:text-foreground xs:inline-flex"
              >
                <IconBrandGithub className="h-3.5 w-3.5" />
                <span className="flex items-center gap-0.5 tabular-nums">
                  <IconStar className="h-3 w-3 transition-colors group-hover:animate-spin-grow group-hover:text-amber-400" />
                  {stars}
                </span>
              </a>
              <CommandPaletteButton />
              <ModeToggle />
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};