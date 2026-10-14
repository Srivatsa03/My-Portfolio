// Six candidate backgrounds for the glass design. Each is one idea in one
// color family, lit so it has crisp edges for the glass to blur and bend.
// Colors are CSS variables scoped to each wallpaper's class in
// wallpapers.css, with a light and a dark set.
import type { CSSProperties } from "react";
import { H, W, region, rng, stop, svgProps } from "./util";

const blend = { mixBlendMode: "var(--blend)" as CSSProperties["mixBlendMode"] };

/* 1. Ripple: rings spreading from a drop just off the top right corner. */
export function Ripple() {
  const cx = 1250;
  const cy = 30;
  const squash = 0.55;
  const rings: { r: number; gap: number; a: number }[] = [];
  let r = 70;
  for (let k = 0; k < 10; k++) {
    const gap = 88 * (1 + k * 0.12);
    rings.push({ r, gap, a: Math.pow(0.8, k) });
    r += gap;
  }
  const ring = (rad: number) => ({ cx, cy, rx: rad, ry: rad * squash, fill: "none" });
  return (
    <svg {...svgProps} className={`${svgProps.className} wp-ripple`}>
      <defs>
        <linearGradient id="rp-base" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" style={stop("--base-1")} />
          <stop offset="1" style={stop("--base-2")} />
        </linearGradient>
        <radialGradient id="rp-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={stop("--glow", "var(--glow-a)")} />
          <stop offset="1" style={stop("--glow", 0)} />
        </radialGradient>
        <linearGradient id="rp-lit" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2={H}>
          <stop offset="0" style={stop("--crest")} />
          <stop offset="1" style={stop("--crest", 0.3)} />
        </linearGradient>
        <filter id="rp-trough" {...region}>
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <filter id="rp-crest" {...region}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect width={W} height={H} fill="url(#rp-base)" />
      <ellipse cx={cx} cy={cy} rx={1000} ry={1000 * squash} fill="url(#rp-glow)" />
      <g filter="url(#rp-trough)" style={{ stroke: "var(--shade)" }}>
        {rings.map((g, i) => (
          <ellipse key={i} {...ring(g.r + g.gap * 0.5)} strokeWidth={g.gap * 0.45} style={{ opacity: `calc(var(--trough-a) * ${g.a.toFixed(3)})` }} />
        ))}
      </g>
      <g filter="url(#rp-crest)" stroke="url(#rp-lit)">
        {rings.map((g, i) => (
          <ellipse key={i} {...ring(g.r)} strokeWidth={g.gap * 0.2} style={{ opacity: `calc(var(--crest-a) * ${g.a.toFixed(3)})` }} />
        ))}
      </g>
      <g style={{ stroke: "var(--line)" }}>
        {rings.map((g, i) => (
          <ellipse key={i} {...ring(g.r - g.gap * 0.04)} strokeWidth="1.3" style={{ opacity: `calc(var(--line-a) * ${g.a.toFixed(3)})` }} />
        ))}
      </g>
    </svg>
  );
}

/* 2. Contour: a topographic map of a few hills, every fourth line an index line. */
function contourPaths(): { d: string; index: boolean }[] {
  const peaks = [
    { x: 1150, y: 170, a: 1, sx: 270, sy: 210 },
    { x: 260, y: 740, a: 0.85, sx: 300, sy: 230 },
    { x: 820, y: 560, a: 0.5, sx: 200, sy: 150 },
    { x: 170, y: 110, a: 0.45, sx: 170, sy: 140 },
  ];
  const h = (x: number, y: number) =>
    peaks.reduce((s, p) => s + p.a * Math.exp(-(((x - p.x) / p.sx) ** 2 + ((y - p.y) / p.sy) ** 2) / 2), 0) +
    0.05 * Math.sin(x / 70 + y / 110) +
    0.04 * Math.sin(x / 43 - y / 61);
  const step = 10;
  const nx = Math.ceil(W / step) + 1;
  const ny = Math.ceil(H / step) + 1;
  const grid: number[][] = [];
  for (let j = 0; j < ny; j++) {
    grid.push([]);
    for (let i = 0; i < nx; i++) grid[j].push(h(i * step, j * step));
  }
  const out: { d: string; index: boolean }[] = [];
  const f = (n: number) => n.toFixed(1);
  for (let li = 0; li < 18; li++) {
    const level = 0.05 + li * 0.055;
    let d = "";
    for (let j = 0; j < ny - 1; j++) {
      for (let i = 0; i < nx - 1; i++) {
        const v = [grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]];
        const x0 = i * step;
        const y0 = j * step;
        const corners = [
          [x0, y0],
          [x0 + step, y0],
          [x0 + step, y0 + step],
          [x0, y0 + step],
        ];
        const pts: number[][] = [];
        for (let e = 0; e < 4; e++) {
          const a = v[e];
          const b = v[(e + 1) % 4];
          if ((a < level) !== (b < level)) {
            const t = (level - a) / (b - a);
            const [ax, ay] = corners[e];
            const [bx, by] = corners[(e + 1) % 4];
            pts.push([ax + (bx - ax) * t, ay + (by - ay) * t]);
          }
        }
        if (pts.length >= 2) d += `M${f(pts[0][0])} ${f(pts[0][1])}L${f(pts[1][0])} ${f(pts[1][1])}`;
        if (pts.length === 4) d += `M${f(pts[2][0])} ${f(pts[2][1])}L${f(pts[3][0])} ${f(pts[3][1])}`;
      }
    }
    out.push({ d, index: li % 4 === 3 });
  }
  return out;
}

export function Contour() {
  const lines = contourPaths();
  return (
    <svg {...svgProps} className={`${svgProps.className} wp-contour`}>
      <defs>
        <linearGradient id="ct-base" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" style={stop("--base-1")} />
          <stop offset="1" style={stop("--base-2")} />
        </linearGradient>
        <radialGradient id="ct-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={stop("--glow", "var(--glow-a)")} />
          <stop offset="1" style={stop("--glow", 0)} />
        </radialGradient>
        <filter id="ct-bloom" {...region}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect width={W} height={H} fill="url(#ct-base)" />
      <ellipse cx={1150} cy={170} rx={620} ry={480} fill="url(#ct-glow)" />
      <ellipse cx={260} cy={740} rx={560} ry={420} fill="url(#ct-glow)" style={{ opacity: 0.6 }} />
      <g fill="none" strokeLinecap="round" style={{ stroke: "var(--line)" }}>
        {lines.map((l, i) =>
          l.index ? (
            <g key={i}>
              <path d={l.d} strokeWidth="3" filter="url(#ct-bloom)" style={{ opacity: "var(--index-glow-a)" }} />
              <path d={l.d} strokeWidth="1.4" style={{ opacity: "var(--index-a)" }} />
            </g>
          ) : (
            <path key={i} d={l.d} strokeWidth="0.9" style={{ opacity: "var(--line-a)" }} />
          ),
        )}
      </g>
    </svg>
  );
}

/* 3. Aurora: curtains of light over a starry sky (a pale dawn in light mode). */
export function Aurora() {
  const rand = rng(7);
  const stars = Array.from({ length: 140 }, () => ({
    x: rand() * W,
    y: rand() * H * 0.75,
    r: 0.5 + rand() * 1.2,
    a: 0.25 + rand() * 0.7,
  }));
  // Each curtain: a wavy bottom edge, rising into a fading top.
  const curtain = (y: number, amp: number, phase: number, height: number) => {
    const pts: string[] = [];
    for (let x = -40; x <= W + 40; x += 40) {
      pts.push(`${x} ${(y + amp * Math.sin(x / 210 + phase) + amp * 0.4 * Math.sin(x / 90 + phase * 2)).toFixed(1)}`);
    }
    const top = [...pts].reverse().map((p) => {
      const [x, yy] = p.split(" ").map(Number);
      return `${x} ${(yy - height - 40 * Math.sin(x / 160 + phase)).toFixed(1)}`;
    });
    return `M${pts.join(" L")} L${top.join(" L")} Z`;
  };
  const bands = [
    { d: curtain(420, 60, 0.4, 300), tone: "--c1", a: 0.6 },
    { d: curtain(330, 80, 2.1, 240), tone: "--c2", a: 0.5 },
    { d: curtain(560, 40, 4.0, 180), tone: "--c3", a: 0.32 },
  ];
  return (
    <svg {...svgProps} className={`${svgProps.className} wp-aurora`}>
      <defs>
        <linearGradient id="au-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={stop("--base-1")} />
          <stop offset="1" style={stop("--base-2")} />
        </linearGradient>
        {bands.map((b, i) => (
          <linearGradient key={i} id={`au-b${i}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" style={stop(b.tone, 0)} />
            <stop offset="0.12" style={stop(b.tone, b.a)} />
            <stop offset="0.45" style={stop(b.tone, b.a * 0.45)} />
            <stop offset="1" style={stop(b.tone, 0)} />
          </linearGradient>
        ))}
        <pattern id="au-rays" width="7" height={H} patternUnits="userSpaceOnUse">
          <rect width="2" height={H} fill="#fff" opacity="0.35" />
        </pattern>
        <filter id="au-soft" {...region}>
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id="au-haze" {...region}>
          <feGaussianBlur stdDeviation="40" />
        </filter>
      </defs>
      <rect width={W} height={H} fill="url(#au-sky)" />
      <g style={{ fill: "var(--star)", opacity: "var(--star-a)" }}>
        {stars.map((s, i) => (
          <circle key={i} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.r.toFixed(2)} opacity={s.a.toFixed(2)} />
        ))}
      </g>
      <g style={blend}>
        {bands.map((b, i) => (
          <g key={i}>
            <path d={b.d} fill={`url(#au-b${i})`} filter="url(#au-haze)" />
            <path d={b.d} fill={`url(#au-b${i})`} filter="url(#au-soft)" />
          </g>
        ))}
        {/* Fine rays inside the brightest curtain. */}
        <mask id="au-mask">
          <path d={bands[0].d} fill="url(#au-b0)" />
        </mask>
        <rect width={W} height={H} fill="url(#au-rays)" mask="url(#au-mask)" style={{ opacity: "var(--ray-a)" }} />
      </g>
      {/* A still lake line along the bottom. */}
      <rect y={H - 120} width={W} height={120} style={{ fill: "var(--base-2)", opacity: 0.6 }} />
      <line x1="0" x2={W} y1={H - 120} y2={H - 120} strokeWidth="1" style={{ stroke: "var(--star)", opacity: 0.25 }} />
    </svg>
  );
}

/* 4. Bokeh: out-of-focus lights, like a city at night through a lens. */
export function Bokeh() {
  const rand = rng(21);
  const tones = ["--c1", "--c2", "--c3", "--c4"];
  const discs = Array.from({ length: 24 }, (_, i) => ({
    x: rand() * W,
    y: rand() * H,
    r: 16 + Math.pow(rand(), 2.2) * 140,
    tone: tones[Math.floor(rand() * tones.length)],
    depth: i % 3,
  }));
  return (
    <svg {...svgProps} className={`${svgProps.className} wp-bokeh`}>
      <defs>
        <radialGradient id="bk-base" cx="0.45" cy="0.4" r="0.8">
          <stop offset="0" style={stop("--base-1")} />
          <stop offset="1" style={stop("--base-2")} />
        </radialGradient>
        {tones.map((t) => (
          <radialGradient key={t} id={`bk${t}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" style={stop(t, "calc(var(--disc-a) * 0.55)")} />
            <stop offset="0.85" style={stop(t, "calc(var(--disc-a) * 0.8)")} />
            <stop offset="1" style={stop(t, "var(--disc-a)")} />
          </radialGradient>
        ))}
        <filter id="bk-1" {...region}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="bk-2" {...region}>
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <rect width={W} height={H} fill="url(#bk-base)" />
      {[2, 1, 0].map((depth) => (
        <g
          key={depth}
          filter={depth === 0 ? undefined : `url(#bk-${depth})`}
          style={blend}
        >
          {discs
            .filter((d) => d.depth === depth)
            .map((d, i) => (
              <circle
                key={i}
                cx={d.x.toFixed(1)}
                cy={d.y.toFixed(1)}
                r={d.r.toFixed(1)}
                fill={`url(#bk${d.tone})`}
                strokeWidth="1.2"
                style={{ stroke: `var(${d.tone})`, strokeOpacity: "var(--rim-a)" }}
              />
            ))}
        </g>
      ))}
    </svg>
  );
}

/* 5. Monogram: a giant glossy "S", the site's own mark, as a lit glass tube. */
const S_PATH = "M1130 170 C 1010 40, 640 50, 600 230 C 560 410, 860 430, 900 560 C 950 720, 700 860, 380 760";

export function Monogram() {
  return (
    <svg {...svgProps} className={`${svgProps.className} wp-monogram`}>
      <defs>
        <linearGradient id="mg-base" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" style={stop("--base-1")} />
          <stop offset="1" style={stop("--base-2")} />
        </linearGradient>
        <radialGradient id="mg-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={stop("--glow", "var(--glow-a)")} />
          <stop offset="1" style={stop("--glow", 0)} />
        </radialGradient>
        <linearGradient id="mg-body" gradientUnits="userSpaceOnUse" x1="380" y1="80" x2="1130" y2="860">
          <stop offset="0" style={stop("--c1")} />
          <stop offset="0.5" style={stop("--c2")} />
          <stop offset="1" style={stop("--c3")} />
        </linearGradient>
        <mask id="mg-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <path d={S_PATH} fill="none" stroke="#fff" strokeWidth="130" strokeLinecap="round" />
        </mask>
        <filter id="mg-shadow" {...region}>
          <feGaussianBlur stdDeviation="34" />
        </filter>
        <filter id="mg-soft" {...region}>
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="mg-fine" {...region}>
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>
      <rect width={W} height={H} fill="url(#mg-base)" />
      <ellipse cx={760} cy={450} rx={720} ry={520} fill="url(#mg-glow)" />
      <g fill="none" strokeLinecap="round">
        <path d={S_PATH} strokeWidth="150" transform="translate(22 40)" filter="url(#mg-shadow)" style={{ stroke: "var(--shade)", opacity: "var(--shadow-a)" }} />
        <path d={S_PATH} strokeWidth="130" stroke="url(#mg-body)" />
        <g mask="url(#mg-mask)">
          <path d={S_PATH} strokeWidth="120" transform="translate(16 22)" filter="url(#mg-soft)" style={{ stroke: "var(--shade)", opacity: "var(--inner-a)" }} />
          <path d={S_PATH} strokeWidth="46" transform="translate(-20 -24)" filter="url(#mg-soft)" style={{ stroke: "var(--light)", opacity: "var(--light-a)" }} />
          <path d={S_PATH} strokeWidth="5" transform="translate(-30 -36)" filter="url(#mg-fine)" style={{ stroke: "#fff", opacity: "var(--spec-a)" }} />
        </g>
      </g>
    </svg>
  );
}

/* 6. Grid: a fine dot grid lit by two pools of color, over a glowing horizon. */
export function Grid() {
  return (
    <svg {...svgProps} className={`${svgProps.className} wp-grid`}>
      <defs>
        <radialGradient id="gr-b1" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={stop("--c1", "var(--bloom-a)")} />
          <stop offset="1" style={stop("--c1", 0)} />
        </radialGradient>
        <radialGradient id="gr-b2" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={stop("--c2", "var(--bloom-a)")} />
          <stop offset="1" style={stop("--c2", 0)} />
        </radialGradient>
        <pattern id="gr-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="1.15" style={{ fill: "var(--dot)" }} />
        </pattern>
        <radialGradient id="gr-fade" cx="0.5" cy="0.42" r="0.62">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="gr-mask">
          <rect width={W} height={H} fill="url(#gr-fade)" />
        </mask>
        <linearGradient id="gr-arc" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
          <stop offset="0" style={stop("--arc", 0)} />
          <stop offset="0.5" style={stop("--arc", 1)} />
          <stop offset="1" style={stop("--arc", 0)} />
        </linearGradient>
        <filter id="gr-glow" {...region}>
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect width={W} height={H} style={{ fill: "var(--base-1)" }} />
      <ellipse cx={280} cy={120} rx={620} ry={460} fill="url(#gr-b1)" />
      <ellipse cx={1220} cy={760} rx={640} ry={460} fill="url(#gr-b2)" />
      <rect width={W} height={H} fill="url(#gr-dots)" mask="url(#gr-mask)" style={{ opacity: "var(--dot-a)" }} />
      {/* The horizon: a huge planet whose lit rim crosses the bottom of the screen. */}
      <circle cx={W / 2} cy={1960} r={1280} strokeWidth="34" fill="none" filter="url(#gr-glow)" stroke="url(#gr-arc)" style={{ opacity: "var(--arc-glow-a)" }} />
      <circle cx={W / 2} cy={1960} r={1280} style={{ fill: "var(--base-1)" }} />
      <circle cx={W / 2} cy={1960} r={1280} strokeWidth="1.5" fill="none" stroke="url(#gr-arc)" />
    </svg>
  );
}

export const WALLPAPERS = [
  { key: "ripple", name: "Ripple", blurb: "Rings spreading from a drop on a still pool, in your violet.", C: Ripple },
  { key: "contour", name: "Contour", blurb: "A topographic map of a few hills, with brighter index lines.", C: Contour },
  { key: "aurora", name: "Aurora", blurb: "Curtains of light over a starry sky. Light mode is a pale dawn.", C: Aurora },
  { key: "bokeh", name: "Bokeh", blurb: "Out-of-focus lights, like a city at night through a lens.", C: Bokeh },
  { key: "monogram", name: "Monogram", blurb: "Your S logo as a giant glossy glass tube.", C: Monogram },
  { key: "grid", name: "Grid", blurb: "A fine dot grid lit by two pools of color, over a glowing horizon.", C: Grid },
];
