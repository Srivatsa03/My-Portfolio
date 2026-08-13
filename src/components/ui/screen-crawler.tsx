"use client";

import { useEffect, useRef } from "react";

/**
 * An original little crawler that chases the cursor around the screen.
 * Demo/example only — the character is a generic spider, not any franchise.
 */
export function ScreenCrawler() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    let x = window.innerWidth * 0.5;
    let y = window.innerHeight * 0.5;
    let px = x;
    let py = y;
    let angle = 0;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const dx = tx - x;
      const dy = ty - y;
      const dist = Math.hypot(dx, dy);
      // Follow, but hang back a little so it "crawls after" the cursor.
      if (dist > 40) {
        x += dx * 0.045;
        y += dy * 0.045;
      }
      if (Math.hypot(x - px, y - py) > 0.4) {
        angle = (Math.atan2(y - py, x - px) * 180) / Math.PI + 90;
      }
      px = x;
      py = y;
      const el = ref.current;
      if (el) {
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
      style={{ willChange: "transform" }}
    >
      <svg width="46" height="46" viewBox="0 0 100 100" className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.55)]">
        <g
          stroke="#0a0a0c"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
          className="origin-center animate-[legwiggle_0.32s_ease-in-out_infinite]"
        >
          <path d="M42 45 L18 30 L9 41" />
          <path d="M42 53 L13 52 L6 63" />
          <path d="M42 60 L16 71 L11 84" />
          <path d="M44 65 L31 84 L35 95" />
          <path d="M58 45 L82 30 L91 41" />
          <path d="M58 53 L87 52 L94 63" />
          <path d="M58 60 L84 71 L89 84" />
          <path d="M56 65 L69 84 L65 95" />
        </g>
        <ellipse cx="50" cy="60" rx="16" ry="21" fill="#0a0a0c" />
        <circle cx="50" cy="41" r="12.5" fill="#141416" />
        <path d="M43 37c1-4 4-4 5 1c-3 1-4 1-5-1z" fill="#ececf1" />
        <path d="M57 37c-1-4-4-4-5 1c3 1 4 1 5-1z" fill="#ececf1" />
        <circle cx="46" cy="38.5" r="1.4" fill="#7c3aed" />
        <circle cx="54" cy="38.5" r="1.4" fill="#7c3aed" />
      </svg>
    </div>
  );
}
