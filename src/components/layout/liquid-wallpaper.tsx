// The wallpaper every glass surface sits on, after the macOS wallpapers on
// apple.com: a few wide sheets of satin in one color family, each with a lit
// rolled edge and a soft shadow on the sheet behind it. The edges are what the
// glass shows off: cards blur them and the navbar bends them. Fixed behind the
// page so cards scroll across it, and static, because an animated backdrop
// would make every visible sheet of glass re-blur each frame. Colors are the
// --wp-* tokens in globals.css, one set per theme.

type Tone = "a" | "b" | "c" | "d";

interface Fold {
  tone: Tone;
  /** The rolled, lit edge of the sheet. */
  edge: string;
  /** Closes the edge into the sheet's area. */
  close: string;
  /** Which way the sheet's shadow falls onto the one behind it. */
  shadow: [number, number];
}

interface Layout {
  id: string;
  width: number;
  height: number;
  /** Back to front. */
  folds: Fold[];
}

// Landscape screens.
const WIDE: Layout = {
  id: "w",
  width: 1440,
  height: 900,
  folds: [
    {
      tone: "a",
      edge: "M500 -60 C 740 120, 980 170, 1180 270 C 1320 340, 1420 440, 1500 540",
      close: "L 1500 -60 Z",
      shadow: [-14, 26],
    },
    {
      tone: "d",
      edge: "M-60 210 C 110 180, 250 90, 330 -60",
      close: "L -60 -60 Z",
      shadow: [16, 20],
    },
    {
      tone: "b",
      edge: "M-60 330 C 220 250, 460 420, 760 470 C 1040 516, 1260 470, 1500 640",
      close: "L 1500 960 L -60 960 Z",
      shadow: [0, -30],
    },
    {
      tone: "c",
      edge: "M-60 900 C 300 860, 600 700, 900 690 C 1150 682, 1320 760, 1500 720",
      close: "L 1500 960 L -60 960 Z",
      shadow: [0, -30],
    },
  ],
};

// Phones, so a tall, narrow screen still gets whole folds instead of a crop.
const TALL: Layout = {
  id: "t",
  width: 800,
  height: 1400,
  folds: [
    {
      tone: "a",
      edge: "M230 -60 C 420 170, 600 260, 860 330",
      close: "L 860 -60 Z",
      shadow: [-12, 24],
    },
    {
      tone: "d",
      edge: "M-60 440 C 70 400, 150 310, 190 -60",
      close: "L -60 -60 Z",
      shadow: [14, 18],
    },
    {
      tone: "b",
      edge: "M-60 760 C 180 640, 420 820, 600 800 C 720 790, 800 720, 860 700",
      close: "L 860 1460 L -60 1460 Z",
      shadow: [0, -28],
    },
    {
      tone: "c",
      edge: "M-60 1250 C 200 1190, 420 1060, 620 1080 C 720 1090, 800 1120, 860 1110",
      close: "L 860 1460 L -60 1460 Z",
      shadow: [0, -28],
    },
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
  // Blurs cover the whole canvas. The default region is the shape's bounding
  // box, which ignores stroke width and so cuts a wide stroke's blur off flat.
  const region = {
    filterUnits: "userSpaceOnUse" as const,
    x: -300,
    y: -300,
    width: layout.width + 600,
    height: layout.height + 600,
  };

  return (
    <svg
      className={className}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id("base")} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" style={stop("--wp-base-1")} />
          <stop offset="1" style={stop("--wp-base-2")} />
        </linearGradient>
        {/* A faint pool of the accent color, so the satin isn't flat gray. */}
        <radialGradient id={id("glow")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={stop("--wp-glow", "var(--wp-glow-strength)")} />
          <stop offset="1" style={stop("--wp-glow", 0)} />
        </radialGradient>
        {/* Each sheet is lit along its edge and falls off into its own fold. */}
        {TONES.map((t) => (
          <linearGradient key={t} id={id(t)} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={stop(`--wp-${t}-1`)} />
            <stop offset="1" style={stop(`--wp-${t}-2`)} />
          </linearGradient>
        ))}
        {layout.folds.map((f, i) => (
          <clipPath key={i} id={id(`clip${i}`)}>
            <path d={`${f.edge} ${f.close}`} />
          </clipPath>
        ))}
        <filter id={id("shadow")} {...region}>
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <filter id={id("sheen")} {...region}>
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id={id("trough")} {...region}>
          <feGaussianBlur stdDeviation="55" />
        </filter>
      </defs>

      <rect width={layout.width} height={layout.height} fill={url("base")} />
      <ellipse
        cx={layout.width * 0.5}
        cy={layout.height * 0.36}
        rx={layout.width * 0.55}
        ry={layout.height * 0.45}
        fill={url("glow")}
      />

      {layout.folds.map((f, i) => (
        <g key={i}>
          {/* The shadow this sheet casts on whatever is behind it. */}
          <path
            d={`${f.edge} ${f.close}`}
            transform={`translate(${f.shadow[0]} ${f.shadow[1]})`}
            filter={url("shadow")}
            style={{ fill: "var(--wp-shade)", opacity: "var(--wp-shadow-strength)" }}
          />
          <path d={`${f.edge} ${f.close}`} fill={url(f.tone)} />
          {/* The roll: a shaded trough just inside the edge, then light caught
              on the edge itself, both kept inside the sheet. */}
          <g clipPath={url(`clip${i}`)}>
            <path
              d={f.edge}
              transform={`translate(${-f.shadow[0] * 5} ${-f.shadow[1] * 5})`}
              fill="none"
              strokeWidth="170"
              filter={url("trough")}
              style={{ stroke: "var(--wp-shade)", opacity: "var(--wp-trough-strength)" }}
            />
            <path
              d={f.edge}
              fill="none"
              strokeWidth="70"
              filter={url("sheen")}
              style={{ stroke: "var(--wp-sheen)", opacity: "var(--wp-sheen-strength)" }}
            />
          </g>
          <path
            d={f.edge}
            fill="none"
            strokeWidth="1.5"
            style={{ stroke: "var(--wp-rim)", opacity: "var(--wp-rim-strength)" }}
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
      <div className="liquid-wallpaper-grain absolute inset-0" />
    </div>
  );
}
