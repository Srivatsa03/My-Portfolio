// A seeded random sequence, so the server and the browser draw the same sky.
function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// A star field as box-shadows on one tiny dot per layer: drawn once, and
// never redrawn, so the glass over it has nothing to redo.
function starField(count: number, seed: number) {
  const rand = seeded(seed);
  const stars: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.round(rand() * 2560);
    const y = Math.round(rand() * 1600);
    stars.push(`${x}px ${y}px rgb(255 255 255 / ${(0.5 + rand() * 0.5).toFixed(2)})`);
  }
  return stars.join(", ");
}

const STARS = [starField(420, 7), starField(150, 13), starField(45, 29)];

// The few stars that twinkle are their own small dots, so each one only
// touches its own corner of the screen.
const TWINKLES = (() => {
  const rand = seeded(101);
  return Array.from({ length: 14 }, () => ({
    left: `${(rand() * 96 + 2).toFixed(1)}%`,
    top: `${(rand() * 70 + 2).toFixed(1)}%`,
    animationDelay: `${(-rand() * 3).toFixed(2)}s`,
    animationDuration: `${(2.4 + rand() * 2.4).toFixed(2)}s`,
  }));
})();

const METEORS = [
  { top: "4%", left: "78%", animationDelay: "2s" },
  { top: "12%", left: "92%", animationDelay: "9s" },
  { top: "2%", left: "58%", animationDelay: "15s" },
  { top: "22%", left: "100%", animationDelay: "20s" },
];

// Three ridges, back to front.
const RIDGES = [
  "M0 250 L110 196 L210 228 L330 136 L430 188 L530 118 L650 206 L770 150 L870 188 L990 96 L1100 176 L1210 128 L1330 196 L1450 146 L1600 204 V400 H0 Z",
  "M0 296 L150 246 L270 286 L390 226 L530 296 L670 236 L810 288 L940 218 L1090 288 L1230 236 L1370 298 L1490 256 L1600 286 V400 H0 Z",
  "M0 342 L180 302 L340 350 L510 310 L700 362 L880 320 L1060 356 L1240 314 L1420 352 L1600 322 V400 H0 Z",
];

// The page behind everything. globals.css draws the html[data-bg] in use:
// the fixed layer holds the color or photo, and the sky and the ridges only
// show for the backgrounds that use them. Fixed behind the page, so cards
// scroll across it.
export function LiquidWallpaper() {
  return (
    <>
      <div aria-hidden className="liquid-wallpaper pointer-events-none fixed inset-0 -z-10">
        <div className="liquid-wallpaper-veil absolute inset-0" />
      </div>
      <div aria-hidden className="sky pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {STARS.map((shadow, i) => (
          <span key={i} className={`star star-${i + 1}`} style={{ boxShadow: shadow }} />
        ))}
        {TWINKLES.map((style, i) => (
          <span key={i} className="twinkle" style={style} />
        ))}
        {METEORS.map((style, i) => (
          <span key={i} className="meteor" style={style} />
        ))}
      </div>
      <svg
        aria-hidden
        className="peaks pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[38vh] w-full"
        viewBox="0 0 1600 400"
        preserveAspectRatio="xMidYMax slice"
      >
        {RIDGES.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </>
  );
}
