// The wallpaper every glass surface sits on: glossy shapes floating over a
// soft mesh of color, fixed behind the page so cards scroll across them. The
// crisp edges are what make the glass read as glass: the blur softens them and
// the navbar bends them. Colors are the --wp-* tokens in globals.css, one set
// per theme. Static on purpose: an animated backdrop would make every visible
// sheet of glass re-blur each frame.

type Tone = "a" | "b" | "c" | "d";

interface Sphere {
  cx: number;
  cy: number;
  r: number;
  tone: Tone;
}

interface Layout {
  id: string;
  width: number;
  height: number;
  ribbon: { body: string; top: string; bottom: string };
  ring: { cx: number; cy: number; r: number };
  spheres: Sphere[];
}

// Landscape screens.
const WIDE: Layout = {
  id: "w",
  width: 1440,
  height: 900,
  ribbon: {
    body: "M-100 640 C 220 520, 420 760, 760 610 C 1060 480, 1200 330, 1540 390 L 1540 560 C 1240 500, 1100 650, 800 770 C 470 900, 220 700, -100 820 Z",
    top: "M-100 640 C 220 520, 420 760, 760 610 C 1060 480, 1200 330, 1540 390",
    bottom: "M1540 560 C 1240 500, 1100 650, 800 770 C 470 900, 220 700, -100 820",
  },
  ring: { cx: 170, cy: 190, r: 92 },
  spheres: [
    { cx: 1250, cy: 170, r: 210, tone: "a" },
    { cx: 150, cy: 790, r: 170, tone: "b" },
    { cx: 420, cy: 330, r: 54, tone: "c" },
    { cx: 1090, cy: 800, r: 96, tone: "d" },
  ],
};

// Phones, so the shapes aren't cropped away by a tall, narrow screen.
const TALL: Layout = {
  id: "t",
  width: 800,
  height: 1400,
  ribbon: {
    body: "M-100 820 C 150 700, 350 900, 560 800 C 700 730, 780 640, 900 680 L 900 860 C 780 830, 690 930, 560 990 C 340 1090, 160 900, -100 1010 Z",
    top: "M-100 820 C 150 700, 350 900, 560 800 C 700 730, 780 640, 900 680",
    bottom: "M900 860 C 780 830, 690 930, 560 990 C 340 1090, 160 900, -100 1010",
  },
  ring: { cx: 110, cy: 360, r: 72 },
  spheres: [
    { cx: 690, cy: 190, r: 210, tone: "a" },
    { cx: 130, cy: 1250, r: 180, tone: "b" },
    { cx: 690, cy: 560, r: 46, tone: "c" },
    { cx: 650, cy: 1240, r: 84, tone: "d" },
  ],
};

const TONES: Tone[] = ["a", "b", "c", "d"];

const stop = (v: string, opacity: number | string = 1) => ({
  stopColor: `var(${v})`,
  stopOpacity: opacity,
});

function Scene({ layout, className }: { layout: Layout; className: string }) {
  const id = (name: string) => `wp-${layout.id}-${name}`;
  const url = (name: string) => `url(#${id(name)})`;
  const { ribbon, ring, spheres } = layout;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Each sphere is lit from the top left and falls off to a deep edge. */}
        {TONES.map((t) => (
          <radialGradient key={t} id={id(`s${t}`)} cx="0.36" cy="0.3" r="0.78">
            <stop offset="0" style={stop(`--wp-${t}-hi`)} />
            <stop offset="0.5" style={stop(`--wp-${t}`)} />
            <stop offset="1" style={stop(`--wp-${t}-lo`)} />
          </radialGradient>
        ))}
        <radialGradient id={id("spec")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("ribbon")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={stop("--wp-r1")} />
          <stop offset="0.5" style={stop("--wp-r2")} />
          <stop offset="1" style={stop("--wp-r3")} />
        </linearGradient>
        <linearGradient id={id("ring")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={stop("--wp-ring-1")} />
          <stop offset="1" style={stop("--wp-ring-2")} />
        </linearGradient>
        <filter id={id("shadow")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id={id("soft")} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Soft colored shadows under everything, never black. */}
      <g filter={url("shadow")} style={{ opacity: "var(--wp-shadow-strength)" }}>
        <path d={ribbon.body} transform="translate(0 34)" style={{ fill: "var(--wp-shade)" }} />
        {spheres.map((s, i) => (
          <circle key={i} cx={s.cx + s.r * 0.08} cy={s.cy + s.r * 0.22} r={s.r} style={{ fill: "var(--wp-shade)" }} />
        ))}
      </g>

      {/* The ribbon: a glossy band with a lit top edge and a shaded underside. */}
      <path d={ribbon.body} fill={url("ribbon")} />
      <path d={ribbon.bottom} fill="none" strokeWidth="44" filter={url("soft")} style={{ stroke: "var(--wp-shade)", opacity: 0.45 }} />
      <path d={ribbon.top} fill="none" stroke="#fff" strokeWidth="22" filter={url("soft")} style={{ opacity: "var(--wp-gloss)" }} />
      <path d={ribbon.top} fill="none" stroke="#fff" strokeWidth="2.5" style={{ opacity: "var(--wp-gloss)" }} />

      {/* A ring, for one shape with a hole the glass can show through. */}
      <circle cx={ring.cx} cy={ring.cy} r={ring.r} fill="none" stroke={url("ring")} strokeWidth={ring.r * 0.38} />
      <circle
        cx={ring.cx - ring.r * 0.12}
        cy={ring.cy - ring.r * 0.14}
        r={ring.r * 1.08}
        fill="none"
        stroke="#fff"
        strokeWidth={ring.r * 0.08}
        strokeDasharray={`${ring.r * 1.6} ${ring.r * 10}`}
        strokeDashoffset={ring.r * 3.4}
        strokeLinecap="round"
        filter={url("soft")}
        style={{ opacity: "var(--wp-gloss)" }}
      />

      {spheres.map((s, i) => (
        <g key={i}>
          <circle cx={s.cx} cy={s.cy} r={s.r} fill={url(`s${s.tone}`)} />
          <ellipse
            cx={s.cx - s.r * 0.32}
            cy={s.cy - s.r * 0.42}
            rx={s.r * 0.42}
            ry={s.r * 0.26}
            transform={`rotate(-28 ${s.cx - s.r * 0.32} ${s.cy - s.r * 0.42})`}
            fill={url("spec")}
            style={{ opacity: "var(--wp-gloss)" }}
          />
        </g>
      ))}
    </svg>
  );
}

export function LiquidWallpaper() {
  return (
    <div aria-hidden className="liquid-wallpaper pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Scene layout={WIDE} className="liquid-wallpaper-wide absolute inset-0 h-full w-full" />
      <Scene layout={TALL} className="liquid-wallpaper-tall absolute inset-0 h-full w-full" />
      <div className="liquid-wallpaper-veil absolute inset-0" />
      <div className="liquid-wallpaper-grain absolute inset-0" />
    </div>
  );
}
