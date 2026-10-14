// The page behind everything. The fixed layer is the page color, plus a
// texture for some backgrounds; the banner sits behind the hero and scrolls
// away with it. globals.css draws both for the html[data-bg] in use.
export function LiquidWallpaper() {
  return (
    <>
      <div aria-hidden className="liquid-wallpaper pointer-events-none fixed inset-0 -z-10">
        <div className="liquid-wallpaper-veil absolute inset-0" />
      </div>
      <div aria-hidden className="page-banner pointer-events-none absolute inset-x-0 top-0 -z-10 h-[max(640px,100svh)]" />
    </>
  );
}
