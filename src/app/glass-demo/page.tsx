import { Controls, DragLens, HopButtons, MorphMenu, TabStage } from "@/components/glass-demo/demos";

export const metadata = {
  title: "Liquid Glass demos",
  robots: { index: false, follow: false },
};

const DEMOS = [
  { title: "Tab bar", how: "Tap a tab, or press and drag along the bar. The drop of glass slides, stretches with its speed and magnifies the label under it.", C: TabStage },
  { title: "Drag the drop", how: "Grab the glass and throw it around. It stretches the way it moves, wobbles when it lands and magnifies what's under it.", C: DragLens },
  { title: "Press and hop", how: "Press and hold a button: it squishes. Let go: it hops. Move over one to see the light follow you.", C: HopButtons },
  { title: "Switch and slider", how: "Hold a switch: the knob turns to clear glass and widens. Grab the slider: the thumb swells into a lens.", C: Controls },
  { title: "Morph", how: "Tap Share. The button pours itself out into a menu, then back when you close it.", C: MorphMenu },
];

// A local page for trying Liquid Glass motion before it goes on the site.
export default function GlassDemos() {
  return (
    <div data-glass className="relative z-10 px-3 pb-24 pt-32 sm:px-4 sm:pt-40">
      <div className="mx-auto max-w-4xl">
        <h1 className="on-photo text-4xl font-bold tracking-tight sm:text-5xl">Liquid Glass motion</h1>
        <p className="on-photo mt-3 max-w-2xl text-lg text-foreground/85">
          Five demos to try. Each glass piece sits over sharp content so you can see it bend. Best in Chrome, which is
          the only browser that draws the bending.
        </p>
        <div className="mt-12 flex flex-col gap-14">
          {DEMOS.map(({ title, how, C }, i) => (
            <section key={title}>
              <h2 className="on-photo text-2xl font-semibold tracking-tight">
                {i + 1}. {title}
              </h2>
              <p className="on-photo mb-4 mt-1 text-foreground/85">{how}</p>
              <C />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
