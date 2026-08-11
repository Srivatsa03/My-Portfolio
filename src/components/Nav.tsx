import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Moon, Sun, Github, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { getInitialTheme, setTheme, type Theme } from "@/lib/theme";

export function Nav() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [theme, setThemeState] = useState<Theme>("dark");
  const [open, setOpen] = useState(false);

  useEffect(() => setThemeState(getInitialTheme()), []);

  useMotionValueEvent(scrollY, "change", (current) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (current < 60) setVisible(true);
    else setVisible(current < prev);
  });

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setThemeState(next);
    setTheme(next);
  };

  const links = navLinks.filter((l) => l.id !== "hero");

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.header
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-0 z-50 mx-auto flex w-full max-w-5xl items-center justify-between border-b border-border/60 bg-background/60 px-5 py-3 backdrop-blur-lg sm:top-4 sm:rounded-xl sm:border sm:bg-background/30"
        >
          <a href="#hero" aria-label="Home" className="inline-flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg border bg-card pb-1 font-script text-xl text-brand">
              S
            </span>
          </a>

          <div className="flex items-center gap-3 sm:gap-5">
            <ul className="hidden items-center gap-5 md:flex">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <span aria-hidden className="hidden h-5 w-px bg-border md:block" />

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-md border bg-background/40 px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground sm:inline-flex"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>

            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-8 w-8 place-items-center rounded-lg border bg-card text-muted-foreground transition-colors hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="grid h-8 w-8 place-items-center rounded-lg border bg-card text-muted-foreground md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {open && (
            <div className="absolute inset-x-3 top-[calc(100%+0.5rem)] rounded-xl border bg-background/95 p-2 backdrop-blur-lg md:hidden">
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.header>
      )}
    </AnimatePresence>
  );
}
