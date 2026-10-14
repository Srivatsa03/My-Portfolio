// Shared bits for the background demos.

export const W = 1440;
export const H = 900;

/** Deterministic random numbers, so server and client draw the same scene. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A blur region that covers the whole canvas (the default one clips wide strokes). */
export const region = {
  filterUnits: "userSpaceOnUse" as const,
  x: -300,
  y: -300,
  width: W + 600,
  height: H + 600,
};

export const stop = (v: string, opacity: number | string = 1) => ({
  stopColor: `var(${v})`,
  stopOpacity: opacity,
});

export const svgProps = {
  viewBox: `0 0 ${W} ${H}`,
  preserveAspectRatio: "xMidYMid slice",
  xmlns: "http://www.w3.org/2000/svg",
  className: "absolute inset-0 h-full w-full",
  "aria-hidden": true,
} as const;
