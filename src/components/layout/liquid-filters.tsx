"use client";

import { useEffect } from "react";

type BrandedNavigator = Navigator & { userAgentData?: { brands?: { brand: string }[] } };

// The SVG filter behind `.glass-refract`. Only Chromium renders an SVG filter
// inside backdrop-filter, so the class that turns it on is added there alone;
// everywhere else the glass is plain blur, which still looks right.
export function LiquidFilters() {
  useEffect(() => {
    // userAgentData only exists on https; window.chrome covers plain http.
    const brands = (navigator as BrandedNavigator).userAgentData?.brands ?? [];
    if (brands.some((b) => b.brand === "Chromium") || "chrome" in window) {
      document.documentElement.classList.add("lg-refract");
    }
  }, []);

  return (
    <svg aria-hidden width="0" height="0" className="pointer-events-none absolute">
      <filter
        id="lg-refract"
        x="0"
        y="0"
        width="100%"
        height="100%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.014" numOctaves="1" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="3" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="42" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
