import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { Projects } from "@/components/Projects";
import { OpenSource } from "@/components/OpenSource";
import { Experience } from "@/components/Experience";
import { Contact, Footer } from "@/components/Contact";

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="bg-glow-ambient" aria-hidden="true" />
      <div className="bg-grid-ambient" aria-hidden="true" />

      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Dashboard />
          <Projects />
          <OpenSource />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
