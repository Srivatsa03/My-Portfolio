import Hero from "@/components/home/hero"
import Experience from "@/components/home/experience"
import Dashboard from "@/components/home/dashboard";
import Projects from "@/components/home/projects"
import OpenSource from "@/components/home/open-source"
import Writing from "@/components/home/writing"
import { BlurFade } from "@/components/ui/blur-fade";
import { getAllPosts } from "@/lib/blog";


const BLUR_FADE_DELAY = 0.005;

export default async function Home() {
  const recentPosts = getAllPosts()
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.date,
      readingTime: p.readingTime,
      image: p.image,
      imageAlt: p.imageAlt,
    }));

  return (
    <div className="relative min-h-screen w-full bg-background">
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
            <Writing posts={recentPosts} />
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
