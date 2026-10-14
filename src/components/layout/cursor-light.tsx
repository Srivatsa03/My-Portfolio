"use client";

import { useEffect, useRef } from "react";

// A soft light that follows the mouse (globals.css shows it for the navy
// background). On touch screens it stays at the top of the page.
export function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        ref.current?.style.setProperty("--cx", `${x}px`);
        ref.current?.style.setProperty("--cy", `${y}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden className="cursor-light pointer-events-none fixed inset-0 -z-10" />;
}
