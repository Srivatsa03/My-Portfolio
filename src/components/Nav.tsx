import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/portfolio";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-background/70 border-b border-white/5" : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#home" className="font-black tracking-tight text-lg text-silver">SK</a>

        <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="hover:text-foreground transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="hidden md:inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-foreground text-background hover:opacity-90 transition"
        >
          Let's talk
        </a>

        <button
          className="md:hidden text-foreground"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-foreground" />
            <span className="block w-6 h-0.5 bg-foreground" />
            <span className="block w-4 h-0.5 bg-foreground" />
          </div>
        </button>
      </nav>

      {open && (
        <ul className="md:hidden bg-background/95 backdrop-blur-md border-t border-white/5 px-5 py-4 space-y-3 text-muted-foreground">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={() => setOpen(false)} className="block hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
