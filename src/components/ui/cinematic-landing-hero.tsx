"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }
  .cine-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="cn"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23cn)"/></svg>');
  }
  .cine-grid {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }
  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow: 0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent), 0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }
  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; transform: translateZ(0);
      filter: drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent)) drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; transform: translateZ(0);
      filter: drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }
  .premium-depth-card {
      background: linear-gradient(145deg, #162C6D 0%, #0A101D 100%);
      box-shadow: 0 40px 100px -20px rgba(0,0,0,0.9), 0 20px 40px -20px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.8);
      border: 1px solid rgba(255,255,255,0.04); position: relative;
  }
  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }
  .iphone-bezel {
      background-color: #111;
      box-shadow: inset 0 0 0 2px #52525B, inset 0 0 0 7px #000, 0 40px 80px -15px rgba(0,0,0,0.9), 0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }
  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.15), inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  .term-window {
      background: linear-gradient(180deg, #0d1426 0%, #070b16 100%);
      box-shadow: 0 40px 90px -15px rgba(0,0,0,0.9), 0 15px 25px -5px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.08);
  }
  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 0 10px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
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
  .progress-ring { transform: rotate(-90deg); transform-origin: center; stroke-dasharray: 402; stroke-dashoffset: 402; stroke-linecap: round; }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export function CinematicHero({
  brandName = "SRIVATSA",
  tagline1 = "I build systems",
  tagline2 = "that survive production.",
  cardHeading = "Platform + AI engineer.",
  cardDescription = (
    <>
      I build cloud infrastructure, AI retrieval systems, and the security tooling that keeps them
      honest. <span className="text-white font-semibold">MS in Computer Science, UIC.</span>
    </>
  ),
  metricValue = 93,
  metricLabel = "Retrieval %",
  ctaHeading = "Let's build something.",
  ctaDescription = "Open to Software Engineering, Platform, and AI roles across the US. Fastest way to reach me is GitHub or LinkedIn.",
  githubUrl = "https://github.com/Srivatsa03",
  linkedinUrl = "https://www.linkedin.com/in/srivatsa-kamballa",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, { rotationY: xVal * 12, rotationX: -yVal * 12, ease: "power3.out", duration: 1.2 });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(requestRef.current); };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      gsap.timeline({ delay: 0.3 })
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=3200", pin: true, scrub: 1, anticipatePin: 1 },
      })
        .to([".hero-text-wrapper", ".cine-grid-layer"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper", { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 }, { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8")
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.12, ease: "back.out(1.2)", duration: 1.4 }, "-=1.5")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], { scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05 })
        .to(".main-card", { width: isMobile ? "92vw" : "85vw", height: isMobile ? "92vh" : "85vh", borderRadius: isMobile ? "32px" : "40px", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });
    }, containerRef);
    return () => ctx.revert();
  }, [isMobile]);

  // Mobile: skip the scroll-jacking cinematic, show a clean, fast static hero.
  if (isMobile) {
    return (
      <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 py-24 bg-background">
        <p className="text-accent font-mono text-xs tracking-widest mb-3">Available now</p>
        <h1 className="text-silver text-4xl font-black tracking-tight leading-tight">{tagline1}</h1>
        <h1 className="text-silver text-4xl font-black tracking-tight leading-tight mb-5">{tagline2}</h1>
        <h2 className="text-2xl font-extrabold uppercase tracking-tighter text-foreground mb-2">{brandName}</h2>
        <p className="text-foreground/80 font-semibold mb-2">{cardHeading}</p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-7">{cardDescription}</p>
        <div className="flex flex-col gap-3">
          <a href={githubUrl} target="_blank" rel="noreferrer" className="rounded-xl px-5 py-3 font-semibold bg-foreground text-background text-center">GitHub</a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer" className="rounded-xl px-5 py-3 font-semibold glass text-center">LinkedIn</a>
        </div>
        <a href="#about" className="mt-10 text-sm text-muted-foreground text-center">View my work ↓</a>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="cine-grain" aria-hidden="true" />
      <div className="cine-grid-layer cine-grid absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      <a href="#about" className="absolute top-5 right-6 z-[60] text-xs font-medium text-muted-foreground/80 hover:text-foreground transition pointer-events-auto">
        Skip intro ↓
      </a>

      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">{tagline1}</h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">{tagline2}</h1>
      </div>

      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">{ctaHeading}</h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">{ctaDescription}</p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group">
            <Github className="w-7 h-7 transition-transform group-hover:scale-105" aria-hidden="true" />
            <div className="text-left"><div className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase mb-[-2px]">Browse my work</div><div className="text-xl font-bold leading-none tracking-tight">GitHub</div></div>
          </a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group">
            <Linkedin className="w-7 h-7 transition-transform group-hover:scale-105" aria-hidden="true" />
            <div className="text-left"><div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-[-2px]">Connect on</div><div className="text-xl font-bold leading-none tracking-tight">LinkedIn</div></div>
          </a>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div ref={mainCardRef} className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]">
          <div className="card-sheen" aria-hidden="true" />
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver-matte">{brandName}</h2>
            </div>

            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
                <div ref={mockupRef} className="relative w-[440px] max-w-[86vw] rounded-2xl term-window overflow-hidden will-change-transform transform-style-3d text-left font-mono">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                    <span className="ml-3 text-xs text-neutral-400">srivatsa@infra — zsh</span>
                  </div>
                  <div className="p-5 text-[13px] leading-relaxed space-y-2 text-neutral-300">
                    <div className="phone-widget"><span className="text-emerald-400">$</span> rag-redteam run --target prod-rag</div>
                    <div className="phone-widget text-neutral-400">✓ prompt-injection blocked&nbsp;&nbsp;&nbsp;✓ leakage blocked</div>
                    <div className="phone-widget text-blue-300">93% retrieval precision · 0 vulnerabilities</div>
                    <div className="phone-widget mt-2"><span className="text-emerald-400">$</span> kubectl rollout status deploy/api</div>
                    <div className="phone-widget text-neutral-400">deployment "api" successfully rolled out</div>
                    <div className="phone-widget mt-2"><span className="text-emerald-400">$</span> git push origin main</div>
                    <div className="phone-widget text-neutral-400">Everything up-to-date <span className="text-emerald-400">✓</span></div>
                    <div className="phone-widget"><span className="text-emerald-400">$</span> <span className="inline-block w-2.5 h-4 bg-white/70 align-middle animate-pulse" /></div>
                  </div>
                </div>

                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-blue-500/20 to-blue-900/10 flex items-center justify-center border border-blue-400/30"><span className="text-base lg:text-xl" aria-hidden="true">🔒</span></div>
                  <div><p className="text-white text-xs lg:text-sm font-bold tracking-tight">Secret-leak fixed</p><p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Merged in LiteLLM</p></div>
                </div>
                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 flex items-center justify-center border border-indigo-400/30"><span className="text-base lg:text-lg" aria-hidden="true">🚀</span></div>
                  <div><p className="text-white text-xs lg:text-sm font-bold tracking-tight">Shipped to prod</p><p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Zero downtime</p></div>
                </div>
              </div>
            </div>

            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">{cardHeading}</h3>
              <p className="hidden md:block text-blue-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">{cardDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
