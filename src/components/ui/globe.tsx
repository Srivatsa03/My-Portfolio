import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Auto-rotating cobe globe with a marker on Chicago. */
export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 4.9; // start near North America
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.28,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.32, 0.36, 0.5],
      markerColor: [0.42, 0.56, 1],
      glowColor: [0.22, 0.28, 0.45],
      markers: [{ location: [41.881, -87.623], size: 0.09 }],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.0045;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("aspect-square", className)}
      style={{ width: "100%", height: "100%", maxWidth: "100%" }}
    />
  );
}
