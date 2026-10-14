"use client";

// Liquid Glass motion, tried out on its own page before it goes on the site.
// Every piece is real glass from globals.css with a lens from LiquidLens, and
// moves on springs, so it stretches, settles and hops the way Apple's does.
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import {
  IconHome,
  IconBrush,
  IconGitPullRequest,
  IconBriefcase,
  IconPencil,
  IconPlus,
  IconShare,
  IconHeart,
  IconBookmark,
  IconX,
} from "@tabler/icons-react";

const SPRING = { type: "spring", stiffness: 520, damping: 26, mass: 0.8 } as const;

// Moves the specular highlight to where the pointer is.
function shine(e: ReactPointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/* A panel of sharp content for the glass to sit on, so its bending shows. */
function Stage({ children, className = "", tall = false }: { children: ReactNode; className?: string; tall?: boolean }) {
  const shots = ["rag-redteam", "kubemend", "eci-pipeline", "minja-repro", "metarag", "wuzzyfuzz", "cot-clevr", "devsecops-eks"];
  return (
    <div className={`relative overflow-hidden rounded-[2rem] ${tall ? "h-[26rem]" : "h-72"} ${className}`}>
      <div className="absolute inset-0 grid grid-cols-4 gap-2 p-2">
        {shots.map((s) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={s} src={`/projects/${s}.png`} alt="" className="h-full w-full rounded-2xl object-cover" draggable={false} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-6 select-none text-center text-5xl font-black tracking-tight text-white/90 [text-shadow:0_2px_12px_rgb(0_0_0/0.5)] sm:text-7xl">
        breaks what he builds
      </div>
      {children}
    </div>
  );
}

/* 1. A tab bar whose selection is a drop of glass. It slides on a spring,
 *    stretches with its speed, and can be dragged along the bar. */
const TABS = [
  { label: "Home", icon: IconHome },
  { label: "Projects", icon: IconBrush },
  { label: "Open Source", icon: IconGitPullRequest },
  { label: "Experience", icon: IconBriefcase },
  { label: "Blog", icon: IconPencil },
];

export function LiquidTabs() {
  const [active, setActive] = useState(0);
  const bar = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const spots = useRef<{ left: number; width: number }[]>([]);
  const x = useSpring(0, { stiffness: 420, damping: 32, mass: 0.9 });
  const width = useSpring(90, { stiffness: 420, damping: 32 });
  const speed = useVelocity(x);
  const stretch = useTransform(speed, [-2400, 0, 2400], [1.32, 1, 1.32]);
  const squash = useTransform(speed, [-2400, 0, 2400], [0.82, 1, 0.82]);
  const [dragging, setDragging] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      spots.current = items.current.map((el) => ({ left: el?.offsetLeft ?? 0, width: el?.offsetWidth ?? 0 }));
      const s = spots.current[active];
      if (s) {
        x.jump(s.left);
        width.jump(s.width);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // Only re-measure on mount and resize; selection moves the drop below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (i: number) => {
    setActive(i);
    const s = spots.current[i];
    if (s) {
      x.set(s.left);
      width.set(s.width);
    }
  };

  const nearest = (px: number) => {
    let best = 0;
    spots.current.forEach((s, i) => {
      const d = Math.abs(s.left + s.width / 2 - px);
      if (d < Math.abs(spots.current[best].left + spots.current[best].width / 2 - px)) best = i;
    });
    return best;
  };

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!bar.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    const left = bar.current.getBoundingClientRect().left;
    const i = nearest(e.clientX - left);
    width.set((spots.current[i]?.width ?? 90) * 1.15);
    x.set(e.clientX - left - width.get() / 2);
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || !bar.current) return;
    const left = bar.current.getBoundingClientRect().left;
    x.set(e.clientX - left - width.get() / 2);
  };
  const onUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || !bar.current) return;
    setDragging(false);
    go(nearest(e.clientX - bar.current.getBoundingClientRect().left));
  };

  return (
    <div
      ref={bar}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className="glass relative flex touch-none select-none items-center gap-1 rounded-full p-1.5"
    >
      {TABS.map(({ label, icon: Icon }, i) => (
        <button
          key={label}
          ref={(el) => {
            items.current[i] = el;
          }}
          type="button"
          onClick={() => go(i)}
          className={`relative z-10 flex flex-col items-center gap-0.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors sm:px-4 sm:text-xs ${
            active === i ? "text-violet-600 dark:text-violet-300" : "text-foreground/75"
          }`}
        >
          <Icon className="h-5 w-5" />
          {label}
        </button>
      ))}
      {/* The drop sits over the labels so it magnifies them as it passes. */}
      <motion.span
        aria-hidden
        data-lens="magnify"
        className="glass pointer-events-none absolute bottom-1.5 left-0 top-1.5 z-20 rounded-full"
        style={{ x, width, scaleX: stretch, scaleY: squash }}
        animate={{ scale: dragging ? 1.12 : 1 }}
        transition={SPRING}
      />
    </div>
  );
}

/* 2. A drop of glass to drag around. It stretches along the way it moves,
 *    wobbles back when let go, and magnifies what's under it. */
export function DragLens() {
  const area = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const vx = useVelocity(x);
  const vy = useVelocity(y);
  const speed = useTransform(() => Math.hypot(vx.get(), vy.get()));
  const angle = useTransform(() => (Math.atan2(vy.get(), vx.get()) * 180) / Math.PI);
  const stretch = useSpring(useTransform(speed, [0, 2600], [1, 1.5]), { stiffness: 380, damping: 14 });
  const thin = useTransform(stretch, (s) => 1 / Math.sqrt(s));

  useEffect(() => {
    const el = area.current;
    if (!el) return;
    x.jump(el.offsetWidth / 2 - 70);
    y.jump(el.offsetHeight / 2 - 70);
  }, [x, y]);

  return (
    <Stage tall>
      <div ref={area} className="absolute inset-0">
        <motion.div
          drag
          dragConstraints={area}
          dragElastic={0.25}
          dragTransition={{ bounceStiffness: 320, bounceDamping: 14 }}
          whileTap={{ scale: 1.14 }}
          transition={SPRING}
          style={{ x, y }}
          className="absolute left-0 top-0 h-[140px] w-[140px] cursor-grab touch-none active:cursor-grabbing"
        >
          <motion.div style={{ rotate: angle, scaleX: stretch, scaleY: thin }} className="h-full w-full">
            <div data-lens="magnify" className="glass h-full w-full rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </Stage>
  );
}

/* 3. Buttons that squish when pressed and hop when let go. */
function HopButton({ children, round = false, tint = false }: { children: ReactNode; round?: boolean; tint?: boolean }) {
  const [scope, animate] = useAnimate();
  return (
    <motion.button
      ref={scope}
      type="button"
      onPointerMove={shine}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scaleX: 1.12, scaleY: 0.88 }}
      transition={SPRING}
      onTap={() => animate(scope.current, { y: [0, -12, 0] }, { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] })}
      className={`${tint ? "glass-tint" : "glass"} glass-shine relative inline-flex items-center justify-center gap-2 rounded-full font-semibold text-foreground ${
        round ? "h-14 w-14" : "px-6 py-3 text-sm"
      }`}
    >
      {children}
    </motion.button>
  );
}

export function HopButtons() {
  return (
    <Stage>
      <div className="absolute inset-x-0 bottom-8 flex flex-wrap items-center justify-center gap-3 px-4">
        <HopButton tint>View my work</HopButton>
        <HopButton>Read the write-up</HopButton>
        <HopButton round>
          <IconShare className="h-6 w-6" />
        </HopButton>
        <HopButton round>
          <IconHeart className="h-6 w-6" />
        </HopButton>
        <HopButton round>
          <IconBookmark className="h-6 w-6" />
        </HopButton>
      </div>
    </Stage>
  );
}

/* 4. A switch whose knob turns into clear glass and widens while you hold it,
 *    and a slider whose thumb swells into a lens when grabbed. */
function GlassSwitch({ start = false }: { start?: boolean }) {
  const [on, setOn] = useState(start);
  const [held, setHeld] = useState(false);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      onPointerDown={() => setHeld(true)}
      onPointerUp={() => setHeld(false)}
      onPointerLeave={() => setHeld(false)}
      className="relative h-9 w-[4.25rem] rounded-full transition-colors duration-300"
      style={{ background: on ? "oklch(0.62 0.2 262)" : "rgb(120 120 128 / 0.4)" }}
    >
      <motion.span
        data-lens="magnify"
        className={`absolute top-[3px] h-[30px] rounded-full ${held ? "glass" : "bg-white shadow-md"}`}
        animate={{ width: held ? 42 : 30, x: on ? (held ? 20 : 32) : 3, scale: held ? 1.18 : 1 }}
        transition={SPRING}
      />
    </button>
  );
}

function GlassSlider() {
  const track = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0.4);
  const [held, setHeld] = useState(false);
  const set = (clientX: number) => {
    const r = track.current?.getBoundingClientRect();
    if (!r) return;
    setValue(Math.min(1, Math.max(0, (clientX - r.left) / r.width)));
  };
  return (
    <div
      ref={track}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setHeld(true);
        set(e.clientX);
      }}
      onPointerMove={(e) => held && set(e.clientX)}
      onPointerUp={() => setHeld(false)}
      onPointerCancel={() => setHeld(false)}
      className="relative h-10 w-64 touch-none select-none"
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
    >
      <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/30" />
      <div className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full" style={{ width: `${value * 100}%`, background: "oklch(0.62 0.2 262)" }} />
      <motion.span
        data-lens="magnify"
        className={`absolute top-1/2 h-7 w-10 rounded-full ${held ? "glass" : "bg-white shadow-md"}`}
        style={{ left: `calc(${value * 100}% - 20px)`, y: "-50%" }}
        animate={{ scale: held ? 1.45 : 1 }}
        transition={SPRING}
      />
    </div>
  );
}

export function Controls() {
  return (
    <Stage>
      <div className="absolute inset-x-0 bottom-8 flex flex-wrap items-center justify-center gap-6 px-4">
        <div className="glass flex items-center gap-4 rounded-full px-5 py-3">
          <GlassSwitch />
          <GlassSwitch start />
        </div>
        <div className="glass rounded-full px-6 py-2">
          <GlassSlider />
        </div>
      </div>
    </Stage>
  );
}

/* 5. A button that pours itself out into a menu, and back. */
export function MorphMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Stage>
      <div className="absolute inset-0 flex items-end justify-center pb-8">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          className="glass overflow-hidden"
          style={{ borderRadius: open ? 28 : 999 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {open ? (
              <motion.div
                key="menu"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                className="w-64 p-2"
              >
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-semibold text-foreground">Share this project</span>
                  <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 text-foreground/70 hover:text-foreground">
                    <IconX className="h-4 w-4" />
                  </button>
                </div>
                {["Copy link", "Open on GitHub", "Email it", "Post on LinkedIn"].map((t) => (
                  <button key={t} type="button" className="block w-full rounded-2xl px-3 py-2.5 text-left text-sm text-foreground/85 hover:bg-white/15">
                    {t}
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.button
                key="button"
                type="button"
                onClick={() => setOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-foreground"
              >
                <IconPlus className="h-4 w-4" />
                Share
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Stage>
  );
}

export function TabStage() {
  return (
    <Stage>
      <div className="absolute inset-x-0 bottom-8 flex justify-center px-4">
        <LiquidTabs />
      </div>
    </Stage>
  );
}
