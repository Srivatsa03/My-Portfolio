"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// A local tool for picking the site's background. It sets html[data-bg];
// globals.css draws each one. Remove it once one is picked.
const OPTIONS = [
  { id: "navy", name: "Navy", note: "Deep navy, and a soft light follows your mouse. The best-known dev portfolio look." },
  { id: "gradient", name: "Gradient", note: "Big soft color blobs drift slowly behind the page, like the Stripe and Linear heroes." },
  { id: "sky", name: "Night sky", note: "Faint stars twinkle and a meteor goes by now and then. Stars show in dark mode." },
  { id: "chicago", name: "Chicago", note: "The full Chicago photo on every page. Cards are solid now, so text stays easy to read." },
] as const;

const KEY = "bg-demo-2";

export function BgPicker() {
  const [bg, setBg] = useState<string>("navy");
  const [open, setOpen] = useState(true);

  const pick = (id: string) => {
    setBg(id);
    document.documentElement.dataset.bg = id;
    try {
      localStorage.setItem(KEY, id);
    } catch {}
  };

  useEffect(() => {
    const saved = document.documentElement.dataset.bg;
    if (OPTIONS.some((o) => o.id === saved)) setBg(saved!);
    else pick(OPTIONS[0].id);
  }, []);

  // The number keys switch too.
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
        <div className="grid grid-cols-4 gap-1">
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
              <span className="hidden opacity-50 sm:inline">{i + 1} </span>
              {o.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
