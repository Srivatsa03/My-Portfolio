"use client";
import React, { JSX, useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../theme-toggle";
import { useTheme } from "next-themes";
import { AnimatedLogo } from "../ui/logo-animation"
import { useTransitionRouter } from "next-view-transitions";
import { CommandPaletteButton } from "../command-palette/command-palette-button";
import { IconBrandGithub, IconStar } from "@tabler/icons-react";
import { useGitHubStars } from "@/hooks/useGitHubStars";

const FALLBACK_REPO_URL = "https://github.com/Srivatsa03/My-Portfolio";

type NavItem = { name: string; link: string; icon?: JSX.Element };

const SPRING = { type: "spring", stiffness: 520, damping: 28, mass: 0.8 } as const;

/**
 * Which tab the glass drop sits on. On the home page it follows the section in
 * view; elsewhere it follows the route; -1 means none.
 */
function useActiveTab(items: NavItem[], hold: React.RefObject<number>) {
  const pathname = usePathname();
  const [inView, setInView] = useState(0);

  useEffect(() => {
    if (pathname !== "/") return;
    const onScroll = () => {
      // A click scrolls past other sections on the way; don't chase them.
      if (performance.now() < hold.current) return;
      const line = window.innerHeight * 0.35;
      let at = 0;
      items.forEach((item, i) => {
        if (item.link.startsWith("/")) return;
        const el = document.getElementById(item.link);
        if (el && el.getBoundingClientRect().top <= line) at = i;
      });
      setInView(at);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, items, hold]);

  if (pathname === "/") return inView;
  const page = items.findIndex((item) => item.link.startsWith("/") && pathname.startsWith(item.link));
  if (page >= 0) return page;
  if (pathname.startsWith("/projects")) return items.findIndex((item) => item.link === "projects");
  return -1;
}

/**
 * The links as a Liquid Glass tab bar: the selected tab sits under a drop of
 * clear glass that slides between tabs on a spring, stretches with its speed
 * and magnifies the label under it. Press and drag along the bar to slide it
 * yourself; letting go picks the nearest tab.
 */
function NavTabs({ items, active, onSelect }: { items: NavItem[]; active: number; onSelect: (i: number) => void }) {
  const row = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const spots = useRef<{ left: number; width: number }[]>([]);
  const [box, setBox] = useState({ top: 0, height: 0, tick: 0 });
  const x = useSpring(0, { stiffness: 420, damping: 32, mass: 0.9 });
  const width = useSpring(0, { stiffness: 420, damping: 32 });
  const speed = useVelocity(x);
  const stretch = useTransform(speed, [-2400, 0, 2400], [1.3, 1, 1.3]);
  const squash = useTransform(speed, [-2400, 0, 2400], [0.84, 1, 0.84]);
  const [dragging, setDragging] = useState(false);
  const press = useRef<{ x: number; moved: boolean } | null>(null);
  const placed = useRef(false);

  const measure = useCallback(() => {
    spots.current = tabs.current.map((t) => ({ left: t?.offsetLeft ?? 0, width: t?.offsetWidth ?? 0 }));
    const first = tabs.current[0];
    setBox((b) => ({ top: first?.offsetTop ?? 0, height: first?.offsetHeight ?? 0, tick: b.tick + 1 }));
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (row.current) ro.observe(row.current);
    return () => ro.disconnect();
  }, [measure]);

  const settle = useCallback(
    (i: number) => {
      const s = spots.current[i];
      if (!s || !s.width) return;
      // A jump the first time, so the drop doesn't fly in on page load.
      if (!placed.current) {
        x.jump(s.left);
        width.jump(s.width);
        placed.current = true;
      } else {
        x.set(s.left);
        width.set(s.width);
      }
    },
    [x, width],
  );

  useEffect(() => {
    if (active >= 0 && !press.current) settle(active);
  }, [active, box.tick, settle]);

  const nearest = (px: number) => {
    let best = 0;
    spots.current.forEach((s, i) => {
      const b = spots.current[best];
      if (Math.abs(s.left + s.width / 2 - px) < Math.abs(b.left + b.width / 2 - px)) best = i;
    });
    return best;
  };
  const rowX = (clientX: number) => clientX - (row.current?.getBoundingClientRect().left ?? 0);

  return (
    <div
      ref={row}
      className="relative flex touch-none select-none items-center gap-0.5 sm:gap-1"
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        press.current = { x: e.clientX, moved: false };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const p = press.current;
        if (!p) return;
        if (!p.moved && Math.abs(e.clientX - p.x) < 6) return;
        if (!p.moved) {
          p.moved = true;
          setDragging(true);
        }
        const w = width.get();
        const max = (row.current?.offsetWidth ?? w) - w;
        x.set(Math.min(max, Math.max(0, rowX(e.clientX) - w / 2)));
      }}
      onPointerUp={(e) => {
        if (!press.current) return;
        press.current = null;
        setDragging(false);
        const i = nearest(rowX(e.clientX));
        settle(i);
        onSelect(i);
      }}
      onPointerCancel={() => {
        press.current = null;
        setDragging(false);
        if (active >= 0) settle(active);
      }}
    >
      {items.map((item, i) => (
        <button
          key={item.link}
          ref={(el) => {
            tabs.current[i] = el;
          }}
          type="button"
          aria-current={active === i ? "page" : undefined}
          // Pointer presses are handled by the row; this is for the keyboard.
          onClick={(e) => {
            if (e.detail === 0) onSelect(i);
          }}
          className={cn(
            "relative flex items-center rounded-full px-2.5 py-1.5 text-sm font-semibold transition-colors duration-300 sm:px-3.5",
            active === i ? "text-violet-600 dark:text-violet-300" : "text-foreground/75 hover:text-foreground",
          )}
        >
          <span className="block sm:hidden">{item.icon}</span>
          <span className="hidden sm:block">{item.name}</span>
        </button>
      ))}
      {/* Over the labels, so the one under it is seen through the glass. */}
      <motion.span
        aria-hidden
        data-lens="drop"
        className="glass glass-drop pointer-events-none absolute left-0 z-20 rounded-full"
        style={{ x, width, top: box.top, height: box.height, scaleX: stretch, scaleY: squash }}
        initial={false}
        animate={{ opacity: active < 0 && !dragging ? 0 : 1, scale: dragging ? 1.16 : 1 }}
        transition={SPRING}
      />
    </div>
  );
}


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
  // Until when scrolling shouldn't move the drop (set by a click).
  const hold = useRef(0);
  const inPlace = useActiveTab(navItems, hold);
  const [picked, setPicked] = useState<number | null>(null);
  const active = picked ?? inPlace;

  // A pick wins until the scroll it started is over, then the page leads again.
  useEffect(() => {
    if (picked === null) return;
    const t = window.setTimeout(() => setPicked(null), 1100);
    return () => window.clearTimeout(t);
  }, [picked]);


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
          <nav data-glass className="glass pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-2 rounded-full py-2 pl-4 pr-2 sm:pl-5">
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
              <NavTabs
                items={navItems}
                active={active}
                onSelect={(i) => {
                  hold.current = performance.now() + 1100;
                  setPicked(i);
                  handleNavClick(navItems[i].link);
                }}
              />
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