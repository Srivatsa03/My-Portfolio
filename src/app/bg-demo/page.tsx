import "@/components/wallpapers/wallpapers.css";
import { WALLPAPERS } from "@/components/wallpapers/demos";

export const metadata = {
  title: "Background demos",
  robots: { index: false, follow: false },
};

// A local page for picking the site's background. Each section puts the same
// glass pieces the site uses over one candidate, so they compare like for like.
export default function BackgroundDemos() {
  return (
    <div className="relative z-10">
      <section className="px-4 pt-32 pb-14 text-center sm:pt-40">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Pick a background</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
          Round two: the kinds of backgrounds glass portfolios use. Each has the site&apos;s glass on top. Scroll through, try the theme toggle, then tell me the number.
        </p>
        <nav className="mt-8 flex flex-wrap justify-center gap-2">
          {WALLPAPERS.map((w, i) => (
            <a key={w.key} href={`#${w.key}`} className="glass glass-hover rounded-full px-4 py-2 text-sm font-medium text-foreground">
              {i + 1} · {w.name}
            </a>
          ))}
        </nav>
      </section>

      {WALLPAPERS.map(({ key, name, blurb, C }, i) => (
        <section key={key} id={key} className="relative flex min-h-[100svh] items-center overflow-hidden px-4 py-28">
          <div className="absolute inset-0">
            <C />
          </div>
          <div className="relative mx-auto w-full max-w-4xl">
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <span className="glass rounded-full px-4 py-1.5 text-sm font-semibold text-foreground">
                {i + 1} · {name}
              </span>
              <span className="glass rounded-full px-4 py-1.5 text-sm text-foreground/80">{blurb}</span>
            </div>

            <h2 className="text-5xl font-bold tracking-tight sm:text-7xl">
              <span className="bg-gradient-to-b from-zinc-700 to-zinc-950 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
                Hi. I&apos;m{" "}
              </span>
              <span className="font-script text-[1.05em] font-normal text-violet-500 dark:text-violet-400">Srivatsa</span>
            </h2>
            <p className="mt-4 text-lg text-foreground/85">
              A Software Engineer who <span className="font-script">breaks what he builds.</span>
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="glass glass-hover rounded-[1.75rem] p-5">
                <p className="text-sm font-semibold text-foreground">Contributions</p>
                <p className="mt-2 text-4xl font-semibold tracking-tighter text-foreground">408</p>
              </div>
              <div className="glass glass-hover rounded-[1.75rem] p-5">
                <p className="text-sm font-semibold text-foreground">Merged PRs</p>
                <p className="mt-2 text-4xl font-semibold tracking-tighter text-foreground">10</p>
              </div>
              <div className="glass glass-hover col-span-2 rounded-[1.75rem] p-5">
                <p className="text-sm font-semibold text-foreground">Glass check</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The background behind this card should look blurred and frosted, while it stays sharp around the card.
                </p>
              </div>
            </div>

            <div className="glass-thick mt-4 rounded-[1.75rem] p-6">
              <p className="text-sm font-semibold text-foreground">Reading panel</p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Project and blog pages put long text on this denser glass. It should stay easy to read on every
                background, in both light and dark mode.
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
