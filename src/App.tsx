import { Nav } from "@/components/Nav";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { About, Experience, Projects, OpenSource, Skills, Education, Contact } from "@/components/Sections";
import { Footer } from "@/components/Footer";
import { useReveal } from "@/lib/useReveal";

export default function App() {
  useReveal();
  return (
    <div className="relative overflow-x-hidden">
      <div className="bg-aurora" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <div className="relative z-10">
        <Nav />
        {/* The 3D cinematic template — scroll through it to play the full sequence */}
        <CinematicHero />
        <main>
          <About />
          <Experience />
          <Projects />
          <OpenSource />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
