import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, type Project } from "@/data/portfolio";

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <GlowCard as="a" href={project.href} className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-foreground transition-colors group-hover:text-brand">
              {project.title}
            </h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{project.tagline}</p>
        </div>
        <span className="shrink-0 rounded-full border bg-secondary px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {project.meta}
        </span>
      </div>

      <p
        className={`mt-3 text-sm leading-relaxed text-muted-foreground ${
          featured ? "" : "line-clamp-4"
        }`}
      >
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </GlowCard>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <BlurFade>
        <SectionHeading title="Projects" icon={<FolderGit2 className="h-5 w-5 sm:h-6 sm:w-6" />} />
      </BlurFade>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {featured.map((p, i) => (
          <BlurFade key={p.title} className="md:col-span-2" delay={0.04 * i}>
            <ProjectCard project={p} featured />
          </BlurFade>
        ))}
        {rest.map((p, i) => (
          <BlurFade key={p.title} delay={0.04 * i}>
            <ProjectCard project={p} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
