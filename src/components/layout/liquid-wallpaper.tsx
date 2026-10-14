// The wallpaper every glass surface sits on: the Milky Way over snowy
// mountains (globals.css picks the photo for the screen shape, so only one is
// downloaded). Fixed behind the page, so cards scroll across it.
export function LiquidWallpaper() {
  return (
    <div aria-hidden className="liquid-wallpaper pointer-events-none fixed inset-0 -z-10">
      <div className="liquid-wallpaper-veil absolute inset-0" />
    </div>
  );
}
