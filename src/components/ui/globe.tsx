"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

// Direct flight path: Tirupati -> Bangalore -> Chicago. The great-circle arc
// naturally sweeps over the globe, no intermediate stops.
const CITIES = [
  { name: "Tirupati", lat: 13.6288, lng: 79.4192, dot: true },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, dot: true },
  { name: "Chicago", lat: 41.8781, lng: -87.6298, dot: true },
];
const DOT = "rgb(34, 197, 94)";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.4,
  dark: 0,
  diffuse: 0.5,
  mapSamples: 22000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [34 / 255, 197 / 255, 94 / 255],
  glowColor: [1, 1, 1],
  markers: [],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const { resolvedTheme } = useTheme();

  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 50, stiffness: 500 });

  const globeConfig = useMemo(() => ({
    ...config,
    dark: resolvedTheme === "dark" ? 1 : 0,
    baseColor: (resolvedTheme === "dark" ? [0.8, 0.9, 1.2] : [1, 1, 1]) as [number, number, number],
  }), [config, resolvedTheme]);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let currentPhi = 0;
    let overlayAnimId = 0;
    const theta = globeConfig.theta ?? 0.4;
    const isDark = resolvedTheme === "dark";

    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...globeConfig,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.004;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
        currentPhi = state.phi;
      },
    } as COBEOptions);

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);

    // Cobe's coordinate convention (lng=0 sits on the +X axis).
    const toVec = (lat: number, lng: number) => {
      const latR = (lat * Math.PI) / 180;
      const lngR = (lng * Math.PI) / 180;
      const cosLat = Math.cos(latR);
      return { x: cosLat * Math.cos(lngR), y: Math.sin(latR), z: -cosLat * Math.sin(lngR) };
    };

    const project = (p: { x: number; y: number; z: number }, phiRot: number) => {
      const cosP = Math.cos(phiRot);
      const sinP = Math.sin(phiRot);
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      const x1 = cosP * p.x + sinP * p.z;
      const y1 = p.y;
      const z1 = -sinP * p.x + cosP * p.z;
      return { x: x1, y: cosT * y1 - sinT * z1, z: sinT * y1 + cosT * z1 };
    };

    // Precompute great-circle arc points across every city segment.
    const PER = 60;
    const LIFT = 0.16;
    const arcPoints: { x: number; y: number; z: number }[] = [];
    for (let s = 0; s < CITIES.length - 1; s++) {
      const v1 = toVec(CITIES[s].lat, CITIES[s].lng);
      const v2 = toVec(CITIES[s + 1].lat, CITIES[s + 1].lng);
      const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
      const omega = Math.acos(Math.max(-1, Math.min(1, dot)));
      const sinO = Math.sin(omega);
      for (let i = s === 0 ? 0 : 1; i <= PER; i++) {
        const t = i / PER;
        const a = sinO === 0 ? 1 - t : Math.sin((1 - t) * omega) / sinO;
        const b = sinO === 0 ? t : Math.sin(t * omega) / sinO;
        const x = a * v1.x + b * v2.x;
        const y = a * v1.y + b * v2.y;
        const z = a * v1.z + b * v2.z;
        const lift = 1 + Math.sin(Math.PI * t) * LIFT;
        arcPoints.push({ x: x * lift, y: y * lift, z: z * lift });
      }
    }

    let beamProgress = 0;

    const drawOverlay = () => {
      const overlay = overlayRef.current;
      if (!overlay || width === 0) {
        overlayAnimId = requestAnimationFrame(drawOverlay);
        return;
      }
      const ctx = overlay.getContext("2d");
      if (!ctx) return;

      const dpr = 2;
      const W = width;
      if (overlay.width !== W * dpr) {
        overlay.width = W * dpr;
        overlay.height = W * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, W);

      const cx = W / 2;
      const cy = W / 2;
      const radius = (W / 2) * 0.8;

      const projected = arcPoints.map((p) => {
        const pr = project(p, currentPhi);
        return { sx: cx + pr.x * radius, sy: cy - pr.y * radius, z: pr.z };
      });

      // Arc line with z-based fade (hidden behind the globe).
      const lineRgb = isDark ? "167, 139, 250" : "124, 58, 237";
      ctx.lineWidth = 1.3;
      ctx.lineCap = "round";
      for (let i = 0; i < projected.length - 1; i++) {
        const a = projected[i];
        const b = projected[i + 1];
        const zAvg = (a.z + b.z) / 2;
        if (zAvg < -0.05) continue;
        const alpha = Math.max(0, Math.min(0.6, ((zAvg + 0.05) / 0.6) * 0.6));
        ctx.strokeStyle = `rgba(${lineRgb}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      // Beam flowing continuously along the whole path (no pause).
      beamProgress = (beamProgress + 0.004) % 1;
      {
        const trailLength = 16;
        for (let i = 0; i < trailLength; i++) {
          const t = beamProgress - i * 0.014;
          if (t < 0 || t > 1) continue;
          const idx = Math.min(projected.length - 1, Math.floor(t * (projected.length - 1)));
          const p = projected[idx];
          if (p.z < -0.05) continue;
          const fade = 1 - i / trailLength;
          const zAlpha = Math.max(0, Math.min(1, (p.z + 0.05) / 0.6));
          const size = Math.max(0.6, 2.2 - i * 0.1);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196, 181, 253, ${fade * zAlpha})`;
          ctx.fill();
        }
      }

      // City dots.
      const drawDot = (lat: number, lng: number) => {
        const pr = project(toVec(lat, lng), currentPhi);
        if (pr.z < -0.02) return;
        const sx = cx + pr.x * radius;
        const sy = cy - pr.y * radius;
        const zAlpha = Math.max(0.25, Math.min(1, pr.z + 0.4));

        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 10);
        glow.addColorStop(0, DOT);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = zAlpha * 0.45;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(sx, sy, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = zAlpha;
        ctx.fillStyle = DOT;
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      };

      for (const c of CITIES) if (c.dot) drawDot(c.lat, c.lng);

      overlayAnimId = requestAnimationFrame(drawOverlay);
    };

    overlayAnimId = requestAnimationFrame(drawOverlay);

    return () => {
      cancelAnimationFrame(overlayAnimId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, globeConfig, resolvedTheme]);

  return (
    <div
      className={cn(
        "absolute inset-0 mt-8 mx-auto aspect-[1/1] w-full max-w-[450px]",
        className,
      )}
    >
      <canvas
        className={cn("size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]")}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
      <canvas ref={overlayRef} className="absolute inset-0 size-full pointer-events-none" />
    </div>
  );
}
