"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const INJECTED_STYLES = `
  .cine-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 1; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="cn"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23cn)"/></svg>');
  }
  .cine-grid {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
  }
  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 45%, transparent) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; transform: translateZ(0);
      filter: drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent)) drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }
  .term-window {
      background: linear-gradient(180deg, #0d1426 0%, #070b16 100%);
      box-shadow: 0 40px 90px -15px rgba(0,0,0,0.9), 0 15px 25px -5px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.08); transform-style: preserve-3d;
  }
  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 25px 50px -12px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.5);
  }
  .btn-modern-light, .btn-modern-dark { transition: all 0.4s cubic-bezier(0.25,1,0.5,1); }
  .btn-modern-light { background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%); color: #0F172A; box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06); }
  .btn-modern-light:hover { transform: translateY(-3px); }
  .btn-modern-dark { background: linear-gradient(180deg, #27272A 0%, #18181B 100%); color: #FFFFFF; box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8); }
  .btn-modern-dark:hover { transform: translateY(-3px); background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%); }
  .tw-cursor { display: inline-block; width: 0.055em; height: 0.95em; background: var(--color-foreground); margin-left: 6px; vertical-align: -0.06em; border-radius: 1px; animation: tw-blink 1.05s steps(1) infinite; }
  @keyframes tw-blink { 50% { opacity: 0; } }
`;

// Rotating captions for the headline. All read correctly after "I build systems".
const CAPTIONS = [
  "that survive production.",
  "that cite their sources.",
  "you can roll back at 2am.",
  "that never leak a secret.",
  "that pass their own red-team.",
  "that tell you when they break.",
];

// Typewriter: type a word, hold ~3s, erase, type the next. Respects reduced-motion.
function useTypewriter(words: string[], typeMs = 55, deleteMs = 28, holdMs = 3000) {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [text, setText] = useState(reduced ? words[0] : "");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const word = words[i % words.length];
    let t: number;
    if (!deleting) {
      if (text.length < word.length) {
        t = window.setTimeout(() => setText(word.slice(0, text.length + 1)), typeMs);
      } else {
        t = window.setTimeout(() => setDeleting(true), holdMs);
      }
    } else if (text.length > 0) {
      t = window.setTimeout(() => setText(word.slice(0, text.length - 1)), deleteMs);
    } else {
      setDeleting(false);
      setI((v) => (v + 1) % words.length);
    }
    return () => window.clearTimeout(t);
  }, [text, deleting, i, reduced, words, typeMs, deleteMs, holdMs]);
  return text;
}

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  role?: string;
  tagline1?: string;
  tagline2?: string;
  description?: React.ReactNode;
  githubUrl?: string;
  linkedinUrl?: string;
}

const PROOF = ["Patent granted", "AWS Certified", "Merged in LiteLLM (48k★)", "GPA 3.88"];

export function CinematicHero({
  brandName = "Srivatsa Kamballa",
  role = "Platform + AI Engineer",
  tagline1 = "I build systems",
  description = (
    <>
      Cloud infrastructure, AI retrieval systems, and the security tooling that keeps them honest.{" "}
      <span className="text-foreground font-semibold">MS in Computer Science, UIC.</span>
    </>
  ),
  githubUrl = "https://github.com/Srivatsa03",
  linkedinUrl = "https://www.linkedin.com/in/srivatsa-kamballa",
  className,
  ...props
}: CinematicHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const reqRef = useRef<number>(0);
  const typed = useTypewriter(CAPTIONS);

  // Subtle, non-blocking intro. Uses from() so content is visible even if JS never runs.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", { y: 24, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.07 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Gentle parallax tilt on the terminal, pointer devices only. Not scroll-jacking.
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight) return;
      cancelAnimationFrame(reqRef.current);
      reqRef.current = requestAnimationFrame(() => {
        if (!termRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(termRef.current, { rotationY: x * 6, rotationX: -y * 6, ease: "power3.out", duration: 1.0 });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(reqRef.current); };
  }, []);

  const term = (
    <div ref={termRef} className="relative w-[440px] max-w-full rounded-2xl term-window overflow-hidden will-change-transform text-left font-mono">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-neutral-400">srivatsa@infra — zsh</span>
      </div>
      <div className="p-5 text-[13px] leading-relaxed space-y-2 text-neutral-300">
        <div><span className="text-emerald-400">$</span> rag-redteam run --target prod-rag</div>
        <div className="text-neutral-400">✓ prompt-injection blocked&nbsp;&nbsp;&nbsp;✓ leakage blocked</div>
        <div className="text-blue-300">93% retrieval precision · 0 vulnerabilities</div>
        <div className="mt-2"><span className="text-emerald-400">$</span> kubectl rollout status deploy/api</div>
        <div className="text-neutral-400">deployment "api" successfully rolled out</div>
        <div className="mt-2"><span className="text-emerald-400">$</span> git push origin main</div>
        <div className="text-neutral-400">Everything up-to-date <span className="text-emerald-400">✓</span></div>
        <div><span className="text-emerald-400">$</span> <span className="inline-block w-2.5 h-4 bg-white/70 align-middle animate-pulse" /></div>
      </div>
    </div>
  );

  return (
    <section
      id="home"
      ref={rootRef}
      className={cn("relative min-h-screen w-full overflow-hidden flex items-center bg-background text-foreground antialiased", className)}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="cine-grain" aria-hidden="true" />
      <div className="cine-grid absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
        {/* Left: the pitch, fully readable with zero scrolling */}
        <div className="text-center lg:text-left">
          <p className="hero-anim text-xs md:text-sm font-mono tracking-[0.2em] uppercase mb-5">
            <span className="text-foreground font-semibold">{brandName}</span>
            <span className="text-muted-foreground"> · {role}</span>
          </p>
          <h1 className="hero-anim text-silver-matte text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">{tagline1}</h1>
          <h1 className="hero-anim text-silver-matte text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 min-h-[1.15em]" aria-label="that survive production">
            {typed}<span className="tw-cursor" aria-hidden="true" />
          </h1>
          <p className="hero-anim text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-7">{description}</p>

          <div className="hero-anim flex flex-wrap gap-2.5 justify-center lg:justify-start mb-9">
            {PROOF.map((b) => (
              <span key={b} className="floating-ui-badge rounded-full px-4 py-2 text-xs md:text-sm font-medium tracking-tight text-blue-50/90 whitespace-nowrap">{b}</span>
            ))}
          </div>

          <div className="hero-anim flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn-modern-light flex items-center justify-center gap-3 px-7 py-3.5 rounded-[1.25rem] group w-full sm:w-auto">
              <Github className="w-6 h-6 transition-transform group-hover:scale-105" aria-hidden="true" />
              <div className="text-left"><div className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase mb-[-2px]">Browse my work</div><div className="text-lg font-bold leading-none tracking-tight">GitHub</div></div>
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn-modern-dark flex items-center justify-center gap-3 px-7 py-3.5 rounded-[1.25rem] group w-full sm:w-auto">
              <Linkedin className="w-6 h-6 transition-transform group-hover:scale-105" aria-hidden="true" />
              <div className="text-left"><div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-[-2px]">Connect on</div><div className="text-lg font-bold leading-none tracking-tight">LinkedIn</div></div>
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition whitespace-nowrap">see my work ↓</a>
          </div>
        </div>

        {/* Right: the terminal, static, with a gentle tilt. Hidden on small screens for speed. */}
        <div className="hero-anim relative hidden md:flex items-center justify-center" style={{ perspective: "1000px" }}>
          {term}
          <div className="floating-ui-badge absolute top-6 left-[-10px] lg:left-[-40px] rounded-2xl p-3 lg:p-4 flex items-center gap-3 lg:gap-4 z-30">
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-blue-500/20 to-blue-900/10 flex items-center justify-center border border-blue-400/30"><span className="text-lg" aria-hidden="true">🔒</span></div>
            <div><p className="text-white text-xs lg:text-sm font-bold tracking-tight">Secret-leak fixed</p><p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Merged in LiteLLM</p></div>
          </div>
          <div className="floating-ui-badge absolute bottom-10 right-[-10px] lg:right-[-40px] rounded-2xl p-3 lg:p-4 flex items-center gap-3 lg:gap-4 z-30">
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 flex items-center justify-center border border-indigo-400/30"><span className="text-lg" aria-hidden="true">🚀</span></div>
            <div><p className="text-white text-xs lg:text-sm font-bold tracking-tight">Shipped to prod</p><p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Zero downtime</p></div>
          </div>
        </div>
      </div>

      <a href="#about" aria-label="Scroll to content" className="hero-anim absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground/60 hover:text-foreground transition text-lg">↓</a>
    </section>
  );
}
