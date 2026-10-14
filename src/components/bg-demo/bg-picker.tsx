"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// A local tool for picking the site's background. It sets html[data-bg] and
// html[data-solid] (glass off); globals.css draws each one. Remove it once one is picked.
const OPTIONS = [
  { id: "sky", name: "Night sky", note: "Stars, a few that twinkle, and a meteor now and then." },
  { id: "mountains", name: "Mountains", note: "Stars and a low moon over dark ridges. By day it turns into a dawn sky." },
  { id: "milkyway", name: "Milky Way", note: "A photo of the Milky Way over snowy mountains." },
  { id: "aurora", name: "Aurora", note: "A photo of green northern lights over a mountain lake." },
  { id: "chicago", name: "Chicago", note: "The skyline across the lake. Night in dark mode, day in light mode." },
  { id: "river", name: "River", note: "A photo of the Chicago river at blue hour, with the towers lit up." },
] as const;

const KEY = "bg-demo-3";
const GLASS_KEY = "bg-demo-glass";

const save = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};

export function BgPicker() {
  const [bg, setBg] = useState<string>(OPTIONS[0].id);
  const [glass, setGlass] = useState(true);
  const [open, setOpen] = useState(true);

  const pick = (id: string) => {
    setBg(id);
    document.documentElement.dataset.bg = id;
    save(KEY, id);
  };

  const toggleGlass = () => {
    const html = document.documentElement;
    const on = "solid" in html.dataset;
    if (on) delete html.dataset.solid;
    else html.dataset.solid = "";
    save(GLASS_KEY, on ? "on" : "off");
    setGlass(on);
  };

  useEffect(() => {
    const { dataset } = document.documentElement;
    if (OPTIONS.some((o) => o.id === dataset.bg)) setBg(dataset.bg!);
    else pick(OPTIONS[0].id);
    setGlass(!("solid" in dataset));
  }, []);

  // The number keys switch the background, G turns the glass on and off.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "g" || e.key === "G") return toggleGlass();
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
      <div className="w-full max-w-2xl rounded-2xl bg-foreground p-3 text-background shadow-2xl">
        <div className="mb-2 flex items-start justify-between gap-3 px-1">
          <p className="text-xs leading-snug opacity-80">
            <span className="font-semibold opacity-100">Pick a background.</span> {current.note}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={toggleGlass}
              aria-pressed={glass}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                glass ? "bg-background text-foreground" : "opacity-70 ring-1 ring-background/40 hover:opacity-100",
              )}
            >
              Glass {glass ? "on" : "off"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-2 py-0.5 text-xs font-semibold opacity-70 hover:opacity-100"
            >
              Hide
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 sm:grid-cols-6">
          {OPTIONS.map((o, i) => (
            <button
              key={o.id}
              type="button"
              onClick={() => pick(o.id)}
              aria-pressed={bg === o.id}
              className={cn(
                "rounded-xl px-1 py-2 text-xs font-semibold transition-colors",
                bg === o.id ? "bg-background text-foreground" : "hover:bg-background/15",
              )}
            >
              <span className="opacity-50">{i + 1} </span>
              {o.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
