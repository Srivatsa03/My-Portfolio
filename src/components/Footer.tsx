import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative max-w-6xl mx-auto px-5 py-16 text-center border-t border-white/5">
      <p className="text-silver text-xl md:text-2xl font-semibold mb-6">"{profile.motto}"</p>
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-6">
        <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-foreground transition">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground transition">LinkedIn</a>
        <a href={`mailto:${profile.email}`} className="hover:text-foreground transition">Email</a>
      </div>
      <p className="text-xs text-muted-foreground/60">Designed & built by {profile.name} © 2026</p>
    </footer>
  );
}
