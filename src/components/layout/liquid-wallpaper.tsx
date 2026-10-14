// The wallpaper every glass surface sits on: Chicago's skyline across the
// lake, at night in dark mode and by day in light mode. A real photo gives the
// glass plenty to blur and bend, and the city is home. globals.css picks the
// photo for the theme and screen shape, so only one is downloaded. Fixed
// behind the page so cards scroll across it.
export function LiquidWallpaper() {
  return (
    <div aria-hidden className="liquid-wallpaper pointer-events-none fixed inset-0 -z-10">
      <div className="liquid-wallpaper-veil absolute inset-0" />
    </div>
  );
}
