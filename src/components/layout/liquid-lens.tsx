"use client";

import { useEffect } from "react";

type BrandedNavigator = Navigator & { userAgentData?: { brands?: { brand: string }[] } };

const NS = "http://www.w3.org/2000/svg";
// Glass that gets a lens. The thick reading sheets and the terminal stay flat:
// bending the text behind a paragraph only makes it harder to read.
const SELECTOR = ".glass:not(.glass-thick):not(.glass-dark), .glass-tint";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * A displacement map for one rounded rectangle. Near the rim each pixel points
 * inward along the edge's normal, harder the closer it is to the edge, so the
 * glass pulls the backdrop in like the thick, curved edge of a lens. The flat
 * middle stays neutral (128, 128), which leaves the view through it undistorted.
 * With `magnify`, the face also pulls toward its center, so what's under it
 * looks bigger, like a drop of water on a page.
 * Drawn at half size; the map is smooth, so scaling it back up loses nothing.
 */
function lensMap(w: number, h: number, r: number, bezel: number, magnify: number): string {
  const s = 0.5;
  const cw = Math.max(2, Math.round(w * s));
  const ch = Math.max(2, Math.round(h * s));
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(cw, ch);
  const rr = Math.min(r, w / 2, h / 2);
  // Signed distance to the rounded rectangle: negative inside.
  const sd = (x: number, y: number) => {
    const qx = Math.abs(x - w / 2) - (w / 2 - rr);
    const qy = Math.abs(y - h / 2) - (h / 2 - rr);
    return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - rr;
  };
  for (let j = 0; j < ch; j++) {
    for (let i = 0; i < cw; i++) {
      const x = (i + 0.5) / s;
      const y = (j + 0.5) / s;
      const depth = -sd(x, y);
      let dx = 0;
      let dy = 0;
      if (depth > 0 && depth < bezel) {
        // The edge of a circular bezel: steep at the rim, flat where it meets the face.
        const t = 1 - depth / bezel;
        const m = 1 - Math.sqrt(1 - t * t);
        const nx = sd(x + 1, y) - sd(x - 1, y);
        const ny = sd(x, y + 1) - sd(x, y - 1);
        const len = Math.hypot(nx, ny) || 1;
        dx = (-nx / len) * m;
        dy = (-ny / len) * m;
      }
      if (magnify && depth > 0) {
        dx -= ((x - w / 2) / (w / 2)) * magnify;
        dy -= ((y - h / 2) / (h / 2)) * magnify;
      }
      const k = (j * cw + i) * 4;
      img.data[k] = 128 + Math.round(clamp(dx, -1, 1) * 127);
      img.data[k + 1] = 128 + Math.round(clamp(dy, -1, 1) * 127);
      img.data[k + 2] = 128;
      img.data[k + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

// Gives every glass surface a lens filter sized to it. Only Chromium runs an
// SVG filter inside backdrop-filter; everywhere else --lens stays unset and the
// glass is the frosted version, which still reads as glass.
export function LiquidLens() {
  useEffect(() => {
    const brands = (navigator as BrandedNavigator).userAgentData?.brands ?? [];
    // userAgentData only exists on https; window.chrome covers plain http.
    if (!brands.some((b) => b.brand === "Chromium") && !("chrome" in window)) return;
    if (window.matchMedia("(prefers-reduced-transparency: reduce)").matches) return;

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.style.pointerEvents = "none";
    document.body.appendChild(svg);

    const made = new Map<string, string>();
    const filterFor = (w: number, h: number, r: number, magnify: number) => {
      const key = `${w}x${h}r${r}m${magnify}`;
      const known = made.get(key);
      if (known) return known;
      const bezel = clamp(Math.min(w, h) * 0.3, 8, 26);
      // A short pill can't take a deep bend: its rim would pull the label in
      // again as a sliver, so the navbar drop gets a shallow one.
      const scale =
        magnify >= 0.5
          ? clamp(Math.min(w, h) * 0.45, 24, 90)
          : magnify > 0
            ? clamp(Math.min(w, h) * 0.3, 8, 14)
            : clamp(bezel * 1.7, 12, 44);
      const id = `lg-lens-${made.size}`;
      const filter = document.createElementNS(NS, "filter");
      filter.setAttribute("id", id);
      filter.setAttribute("x", "0");
      filter.setAttribute("y", "0");
      filter.setAttribute("width", String(w));
      filter.setAttribute("height", String(h));
      filter.setAttribute("filterUnits", "userSpaceOnUse");
      filter.setAttribute("primitiveUnits", "userSpaceOnUse");
      filter.setAttribute("color-interpolation-filters", "sRGB");
      const map = document.createElementNS(NS, "feImage");
      map.setAttribute("href", lensMap(w, h, r, bezel, magnify));
      map.setAttribute("x", "0");
      map.setAttribute("y", "0");
      map.setAttribute("width", String(w));
      map.setAttribute("height", String(h));
      map.setAttribute("preserveAspectRatio", "none");
      map.setAttribute("result", "map");
      const bend = document.createElementNS(NS, "feDisplacementMap");
      bend.setAttribute("in", "SourceGraphic");
      bend.setAttribute("in2", "map");
      bend.setAttribute("scale", String(Math.round(scale)));
      bend.setAttribute("xChannelSelector", "R");
      bend.setAttribute("yChannelSelector", "G");
      filter.append(map, bend);
      svg.appendChild(filter);
      made.set(key, id);
      return id;
    };

    const fit = (el: HTMLElement) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w < 16 || h < 16 || w * h > 1_600_000) {
        el.style.removeProperty("--lens");
        return;
      }
      const r = Math.round(Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, w / 2, h / 2));
      // data-lens="magnify" marks a drop that enlarges what's under it.
      // "drop" is a gentler one, for the selected tab in the navbar.
      const magnify = el.dataset.lens === "magnify" ? 0.5 : el.dataset.lens === "drop" ? 0.18 : 0;
      el.style.setProperty("--lens", `url(#${filterFor(w, h, r, magnify)})`);
    };

    const resized = new ResizeObserver((entries) => {
      for (const e of entries) fit(e.target as HTMLElement);
    });
    const watched = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        resized.observe(el);
      });
    };
    scan();

    // New glass arrives with client navigation and late-loading sections.
    let pending = 0;
    const added = new MutationObserver(() => {
      window.clearTimeout(pending);
      pending = window.setTimeout(scan, 60);
    });
    // Class changes too: some controls turn into glass only while held.
    added.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    document.documentElement.classList.add("lg-lens");

    return () => {
      added.disconnect();
      resized.disconnect();
      window.clearTimeout(pending);
      svg.remove();
      document.documentElement.classList.remove("lg-lens");
    };
  }, []);

  return null;
}
