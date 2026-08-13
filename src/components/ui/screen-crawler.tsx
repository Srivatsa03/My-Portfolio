"use client";

import { useEffect, useRef } from "react";

/**
 * An original creature that appears suddenly and crawls across the screen on
 * its own (edge to edge), then leaves — repeating on a random interval.
 * Not cursor-driven. Desktop only, respects reduced-motion.
 * The character is a generic spider, not any franchise character.
 */
export function ScreenCrawler() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    let start = { x: 0, y: 0 };
    let end = { x: 0, y: 0 };
    let t0 = 0;
    let duration = 6000;

    const rand = (n: number) => Math.random() * n;

    const startTrip = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const M = 90; // spawn/exit off-screen

      const routes = [
        { s: { x: -M, y: rand(H) }, e: { x: W + M, y: rand(H) } }, // left -> right
        { s: { x: W + M, y: rand(H) }, e: { x: -M, y: rand(H) } }, // right -> left
        { s: { x: rand(W), y: -M }, e: { x: rand(W), y: H + M } }, // top -> bottom
        { s: { x: rand(W), y: H + M }, e: { x: rand(W), y: -M } }, // bottom -> top
      ];
      const r = routes[Math.floor(Math.random() * routes.length)];
      start = r.s;
      end = r.e;

      const dist = Math.hypot(end.x - start.x, end.y - start.y);
      duration = (dist / 140) * 1000; // ~140px/s crawl
      t0 = performance.now();
      raf = requestAnimationFrame(step);
    };

    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const x = start.x + (end.x - start.x) * p;
      const y = start.y + (end.y - start.y) * p;
      const angle =
        (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI + 90;

      el.style.opacity = "1";
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg)`;

      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        el.style.opacity = "0";
        timer = setTimeout(startTrip, 9000 + Math.random() * 18000);
      }
    };

    // First appearance shortly after load.
    timer = setTimeout(startTrip, 3500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden opacity-0 transition-opacity duration-300 md:block"
      style={{ willChange: "transform, opacity" }}
    >
      <svg width="48" height="48" viewBox="0 0 100 100" className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.55)]">
        <g
          stroke="#0a0a0c"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
          className="origin-center animate-[legwiggle_0.3s_ease-in-out_infinite]"
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
