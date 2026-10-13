"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import React, { useEffect, useLayoutEffect, useRef } from "react";

interface ScratchToRevealProps {
  children: React.ReactNode;
  minScratchPercentage?: number;
  className?: string;
  onComplete?: () => void;
  /** Foil gradient, top-left to bottom-right. Must be opaque. */
  gradientColors?: [string, string, string];
  /** Printed on the foil. */
  label?: string;
  labelColor?: string;
  /** Changing it puts the foil back on. */
  resetKey?: string | number;
}

const BRUSH = 20;

// A white ring, centered on the pointer by its 16 16 hotspot.
const CURSOR =
  "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNSIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MXB4OyIgLz4KPC9zdmc+') 16 16, auto";

export const ScratchToReveal: React.FC<ScratchToRevealProps> = ({
  minScratchPercentage = 50,
  onComplete,
  children,
  className,
  gradientColors = ["#d9dcf7", "#f3d9ec", "#f7e6d2"],
  label,
  labelColor = "rgb(40 32 72 / 0.72)",
  resetKey,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratching = useRef(false);
  const done = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const controls = useAnimation();

  // The latest props, so the foil can be repainted from a ResizeObserver
  // without re-subscribing on every render.
  const foil = useRef({ gradientColors, label, labelColor });
  foil.current = { gradientColors, label, labelColor };
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const paint = () => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;
    const width = wrap.offsetWidth;
    const height = wrap.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    const [c0, c1, c2] = foil.current.gradientColors;
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, c0);
    g.addColorStop(0.5, c1);
    g.addColorStop(1, c2);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    // Diagonal sheen, like a lottery ticket's foil.
    ctx.strokeStyle = "rgb(255 255 255 / 0.16)";
    ctx.lineWidth = 5;
    for (let x = -height; x < width; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(x + height, 0);
      ctx.stroke();
    }

    if (foil.current.label) {
      ctx.fillStyle = foil.current.labelColor;
      ctx.font = "600 13px ui-sans-serif, system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(foil.current.label, width / 2, height / 2);
    }
    done.current = false;
  };

  // A layout effect, so a new card never shows for a frame before its foil.
  const colorKey = gradientColors.join();
  useLayoutEffect(() => {
    // paint reads its inputs from refs.
    paint();
  }, [resetKey, colorKey, label, labelColor]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => {
      if (!done.current) paint();
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Pointer position in the canvas's own (unscaled) coordinates, so the
  // reveal pop, which scales the card, doesn't throw the brush off.
  const toCanvas = (canvas: HTMLCanvasElement, clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.offsetWidth,
      y: ((clientY - rect.top) / rect.height) * canvas.offsetHeight,
    };
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { x, y } = toCanvas(canvas, clientX, clientY);
    ctx.globalCompositeOperation = "destination-out";
    if (last.current) {
      ctx.lineCap = "round";
      ctx.lineWidth = BRUSH * 2;
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, BRUSH, 0, Math.PI * 2);
    ctx.fill();
    last.current = { x, y };
  };

  const checkCompletion = () => {
    if (done.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) clear++;
    }
    if ((clear / (pixels.length / 4)) * 100 < minScratchPercentage) return;

    done.current = true;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    controls.start({
      scale: [1, 1.06, 1],
      rotate: [0, -2, 2, 0],
      transition: { duration: 0.45 },
    });
    onCompleteRef.current?.();
  };

  const stop = () => {
    if (!scratching.current) return;
    scratching.current = false;
    last.current = null;
    checkCompletion();
  };

  return (
    <motion.div ref={wrapRef} className={cn("relative select-none touch-none", className)} animate={controls}>
      {children}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 h-full w-full"
        style={{ cursor: CURSOR }}
        onPointerDown={(e) => {
          if (done.current) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          scratching.current = true;
          scratchAt(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (scratching.current) scratchAt(e.clientX, e.clientY);
        }}
        onPointerUp={stop}
        onPointerCancel={stop}
      />
    </motion.div>
  );
};
