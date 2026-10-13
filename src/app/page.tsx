import Hero from "@/components/home/hero"
import Experience from "@/components/home/experience"
import Dashboard from "@/components/home/dashboard";
import Projects from "@/components/home/projects"
import OpenSource from "@/components/home/open-source"
import Terminal from "@/components/home/terminal"
import Writing from "@/components/home/writing"
import { BlurFade } from "@/components/ui/blur-fade";
import { getWriting } from "@/lib/writing";


const BLUR_FADE_DELAY = 0.005;

// Medium and Dev.to are re-read at most once an hour.
export const revalidate = 3600;

export default async function Home() {
  // Latest engineering posts; opinion pieces and the full list are on /blog.
  const writing = (await getWriting()).filter((item) => item.technical).slice(0, 3);

  return (
    <div className="relative min-h-screen w-full">
      <div className="mx-auto flex max-w-5xl flex-col space-y-12 sm:space-y-32 px-4">
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <section id="hero">
            <Hero />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
          <section id="dashboard">
            <Dashboard />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
          <section id="terminal">
            <Terminal />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
          <section id="projects">
            <Projects />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
          <section id="open-source">
            <OpenSource />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <section id="writing">
            <Writing items={writing} />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <section id="experience">
            <Experience />
          </section>
        </BlurFade>
      </div>
    </div>
  );
}
