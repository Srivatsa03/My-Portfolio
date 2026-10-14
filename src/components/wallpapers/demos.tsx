// Candidate backgrounds for the glass design, round two: the kinds most glass
// portfolios use. Four photos (free Unsplash license, loaded straight from
// Unsplash for the demo) and two drawn ones. Colors and motion live in
// wallpapers.css.

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`;

function Photo({ id, position = "center" }: { id: string; position?: string }) {
  return (
    <div
      className="wp-photo absolute inset-0"
      style={{ backgroundImage: `url(${unsplash(id)})`, backgroundPosition: position }}
    >
      {/* Keeps text on the photo readable, darker in dark mode. */}
      <div className="wp-photo-veil absolute inset-0" />
    </div>
  );
}

/* Slow-moving blobs of color, the classic glassmorphism backdrop. */
export function Flow() {
  return (
    <div className="wp-flow absolute inset-0 overflow-hidden">
      <span className="wp-blob wp-blob-1" />
      <span className="wp-blob wp-blob-2" />
      <span className="wp-blob wp-blob-3" />
      <span className="wp-blob wp-blob-4" />
      <div className="wp-noise absolute inset-0" />
    </div>
  );
}

/* A spotlight from above on a dark stage, with a faint grid. */
export function Spotlight() {
  return (
    <div className="wp-spot absolute inset-0 overflow-hidden">
      <div className="wp-spot-grid absolute inset-0" />
      <div className="wp-spot-beam absolute" />
      <div className="wp-spot-glow absolute" />
      <div className="wp-noise absolute inset-0" />
    </div>
  );
}

const Chicago = () => <Photo id="photo-1581373449483-37449f962b6c" />;
const Glow = () => <Photo id="photo-1614851099511-773084f6911d" />;
const Waves = () => <Photo id="photo-1620641788421-7a1c342ea42e" />;
const Haze = () => <Photo id="photo-1618397746666-63405ce5d015" />;

export const WALLPAPERS = [
  { key: "chicago", name: "Chicago at night", blurb: "A photo of the skyline over the lake. Personal, since you live there.", C: Chicago },
  { key: "glow", name: "Violet glow", blurb: "An abstract photo of pink light in deep violet.", C: Glow },
  { key: "waves", name: "Color waves", blurb: "An abstract photo of vivid purple and pink waves.", C: Waves },
  { key: "haze", name: "Blue haze", blurb: "An abstract photo of soft blue and purple. Light and airy.", C: Haze },
  { key: "flow", name: "Flow", blurb: "Drawn: soft blobs of color that drift slowly. Common on glass portfolios.", C: Flow },
  { key: "spotlight", name: "Spotlight", blurb: "Drawn: a spotlight on a dark stage with a faint grid. Clean and techy.", C: Spotlight },
];
