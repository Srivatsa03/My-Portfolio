"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// A local tool for picking the site's background. It sets html[data-bg];
// globals.css draws each one. Remove it once one is picked.
const OPTIONS = [
  { id: "clean", name: "Clean", note: "Plain page, solid cards. Nothing pulls the eye from your name and your work." },
  { id: "glow", name: "Glow", note: "The plain page, with one soft violet glow behind the hero." },
  { id: "dots", name: "Dots", note: "A faint dot grid behind the cards. Quiet, and it looks like an engineer's notebook." },
  { id: "grid", name: "Grid", note: "Faint graph-paper lines behind the hero only. Then a plain page." },
  { id: "chicago", name: "Chicago", note: "Your Chicago photo behind the hero only. The rest of the page is plain." },
  { id: "paper", name: "Paper", note: "A warm paper tone with a fine grain, like a printed resume." },
] as const;

const KEY = "bg-demo";

export function BgPicker() {
  const [bg, setBg] = useState<string>("clean");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setBg(document.documentElement.dataset.bg ?? "clean");
  }, []);

  const pick = (id: string) => {
    setBg(id);
    document.documentElement.dataset.bg = id;
    try {
      localStorage.setItem(KEY, id);
    } catch {}
  };

  // 1 to 6 on the keyboard switch too.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= OPTIONS.length) pick(OPTIONS[n - 1].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = OPTIONS.find((o) => o.id === bg) ?? OPTIONS[0];

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[6000] rounded-full bg-foreground px-3.5 py-2 text-xs font-semibold text-background shadow-lg"
      >
        Background: {current.name}
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-3 z-[6000] flex justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl bg-foreground p-3 text-background shadow-2xl">
        <div className="mb-2 flex items-start justify-between gap-3 px-1">
          <p className="text-xs leading-snug opacity-80">
            <span className="font-semibold opacity-100">Pick a background.</span> {current.note}
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold opacity-70 hover:opacity-100"
          >
            Hide
          </button>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {OPTIONS.map((o, i) => (
            <button
              key={o.id}
              type="button"
              onClick={() => pick(o.id)}
              aria-pressed={bg === o.id}
              className={cn(
                "rounded-xl px-0.5 py-2 text-[11px] font-semibold tracking-tight transition-colors sm:px-1 sm:text-xs sm:tracking-normal",
                bg === o.id ? "bg-background text-foreground" : "hover:bg-background/15",
              )}
            >
              <span className="hidden opacity-50 sm:inline">{i + 1} </span>
              {o.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
