import { CursorLight } from "./cursor-light";

// A fixed star field: box-shadows on one tiny dot per layer, so each layer
// is drawn once and only its opacity animates. Seeded, so the server and the
// browser draw the same sky.
function starField(count: number, seed: number) {
  let s = seed;
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const stars: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.round(rand() * 2560);
    const y = Math.round(rand() * 1600);
    stars.push(`${x}px ${y}px rgb(255 255 255 / ${(0.5 + rand() * 0.5).toFixed(2)})`);
  }
  return stars.join(", ");
}

const STARS = [starField(420, 7), starField(150, 13), starField(45, 29)];

const METEORS = [
  { top: "4%", left: "78%", animationDelay: "2s" },
  { top: "12%", left: "92%", animationDelay: "9s" },
  { top: "2%", left: "58%", animationDelay: "15s" },
  { top: "22%", left: "100%", animationDelay: "20s" },
];

// The page behind everything. globals.css draws the html[data-bg] in use:
// the fixed layer holds the color or photo, and the other layers only show
// for the background that uses them. Fixed behind the page, so cards scroll
// across it.
export function LiquidWallpaper() {
  return (
    <>
      <div aria-hidden className="liquid-wallpaper pointer-events-none fixed inset-0 -z-10">
        <div className="liquid-wallpaper-veil absolute inset-0" />
      </div>
      <CursorLight />
      <div aria-hidden className="blobs pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
      </div>
      <div aria-hidden className="sky pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {STARS.map((shadow, i) => (
          <span key={i} className={`star star-${i + 1}`} style={{ boxShadow: shadow }} />
        ))}
        {METEORS.map((style, i) => (
          <span key={i} className="meteor" style={style} />
        ))}
      </div>
    </>
  );
}
