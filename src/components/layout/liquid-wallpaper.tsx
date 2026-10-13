// The wallpaper every glass surface sits on: soft folds of color over a mesh
// of glows, fixed behind the page so cards scroll across it. Colors come from
// the --wp-* tokens in globals.css, one set per theme. Static on purpose: an
// animated backdrop would make every visible sheet of glass re-blur each frame.
const stop = (v: string, opacity: number | string = 1) => ({
  stopColor: `var(${v})`,
  stopOpacity: opacity,
});

const RIBBON_A =
  "M-80 120 C 260 40, 520 260, 780 230 C 1040 200, 1220 60, 1520 140 L 1520 420 C 1240 330, 1060 470, 800 500 C 520 530, 260 360, -80 430 Z";
const RIBBON_B =
  "M-80 660 C 220 540, 460 720, 760 640 C 1060 560, 1240 400, 1520 450 L 1520 660 C 1260 620, 1080 800, 780 840 C 480 880, 220 780, -80 840 Z";
const RIBBON_C =
  "M-80 930 C 260 830, 560 990, 880 910 C 1160 840, 1320 770, 1520 810 L 1520 1060 L -80 1060 Z";

export function LiquidWallpaper() {
  return (
    <div aria-hidden className="liquid-wallpaper pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 960"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wp-base" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={stop("--wp-base-1")} />
            <stop offset="1" style={stop("--wp-base-2")} />
          </linearGradient>
          <radialGradient id="wp-glow-1" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" style={stop("--wp-glow-1", 0.9)} />
            <stop offset="1" style={stop("--wp-glow-1", 0)} />
          </radialGradient>
          <radialGradient id="wp-glow-2" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" style={stop("--wp-glow-2", 0.9)} />
            <stop offset="1" style={stop("--wp-glow-2", 0)} />
          </radialGradient>
          <linearGradient id="wp-a" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0" style={stop("--wp-a1", 0.95)} />
            <stop offset="0.55" style={stop("--wp-a2", 0.85)} />
            <stop offset="1" style={stop("--wp-a2", 0.55)} />
          </linearGradient>
          <linearGradient id="wp-b" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" style={stop("--wp-b1", 0.6)} />
            <stop offset="0.5" style={stop("--wp-b1", 0.9)} />
            <stop offset="1" style={stop("--wp-b2", 0.85)} />
          </linearGradient>
          <linearGradient id="wp-c" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={stop("--wp-c1", 0.85)} />
            <stop offset="1" style={stop("--wp-c2", 0.75)} />
          </linearGradient>
          <radialGradient id="wp-d" cx="0.35" cy="0.3" r="0.75">
            <stop offset="0" style={stop("--wp-d1")} />
            <stop offset="1" style={stop("--wp-d2", 0.85)} />
          </radialGradient>
          {/* Each fold is lit from above and shaded below. */}
          <linearGradient id="wp-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.75" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.35" />
          </linearGradient>
          <filter id="wp-soft" x="-10%" y="-20%" width="120%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="soft" />
            <feDropShadow in="soft" dx="0" dy="18" stdDeviation="28" style={{ floodColor: "var(--wp-shadow)", floodOpacity: 0.35 }} />
          </filter>
          <filter id="wp-haze" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>

        <rect width="1440" height="960" fill="url(#wp-base)" />
        <g filter="url(#wp-haze)">
          <ellipse cx="260" cy="250" rx="520" ry="360" fill="url(#wp-glow-1)" />
          <ellipse cx="1180" cy="760" rx="560" ry="380" fill="url(#wp-glow-2)" />
        </g>

        <g filter="url(#wp-soft)" style={{ opacity: "var(--wp-strength)" }}>
          <circle cx="1190" cy="150" r="190" fill="url(#wp-d)" />
          <path d={RIBBON_A} fill="url(#wp-a)" />
          <path d={RIBBON_B} fill="url(#wp-b)" />
          <path d={RIBBON_C} fill="url(#wp-c)" />
        </g>

        <g fill="url(#wp-light)" style={{ opacity: "var(--wp-gloss)" }}>
          <circle cx="1190" cy="150" r="190" />
          <path d={RIBBON_A} />
          <path d={RIBBON_B} />
          <path d={RIBBON_C} />
        </g>
      </svg>
      <div className="liquid-wallpaper-veil absolute inset-0" />
    </div>
  );
}
