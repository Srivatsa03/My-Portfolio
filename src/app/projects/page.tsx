import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects, type ProjectCategory } from "@/lib/projects";
import { BlurFade } from "@/components/ui/blur-fade";
import { TransitionLink } from "@/components/ui/transition-link";
import { IconArrowLeft } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Projects — Srivatsa Kamballa",
  description:
    "Open-source tools, industry systems and research by Srivatsa Kamballa, each written up with how it works, the tradeoffs, and measured results.",
};

const ORDER: { category: ProjectCategory; blurb: string }[] = [
  { category: "Open source", blurb: "Tools I build and maintain in public." },
  { category: "Industry", blurb: "Systems built with and for company partners." },
  { category: "Research", blurb: "Fuzzing and code-translation research at UIC with Penn State collaborators." },
  { category: "Coursework", blurb: "Course projects, with my part on team projects spelled out." },
  { category: "Personal", blurb: "Builds I did to learn a stack end to end." },
];

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="relative z-10 pt-32 sm:pt-40 pb-16 px-3 sm:px-4">
      <div className="mx-auto max-w-4xl">
        <BlurFade delay={0.005} inView>
          <Link
            href="/"
            className="glass glass-hover mb-8 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <h1 className="on-photo mb-3 text-4xl font-bold tracking-tight sm:text-5xl">Projects</h1>
          <p className="on-photo mb-16 max-w-2xl text-lg text-foreground/85">
            Each one is written up the way I&#39;d explain it in a design review: the problem, how it works, what
            I chose and why, what broke, and the numbers with their sources.
          </p>
        </BlurFade>

        <div className="space-y-16">
          {ORDER.map(({ category, blurb }) => {
            const group = projects.filter((p) => p.category === category);
            if (group.length === 0) return null;
            return (
              <section key={category} aria-labelledby={`cat-${category}`}>
                <h2 id={`cat-${category}`} className="glass inline-flex rounded-full px-4 py-1.5 text-lg font-semibold tracking-tight">
                  {category}
                </h2>
                <p className="mt-3 pl-1 text-sm text-muted-foreground">{blurb}</p>
                <ul className="mt-5 flex flex-col gap-4">
                  {group.map((p) => (
                    <li key={p.slug}>
                      <TransitionLink
                        href={`/projects/${p.slug}`}
                        className="glass glass-hover group flex items-start gap-4 rounded-[1.75rem] p-3 sm:gap-6 sm:p-4"
                      >
                        {p.cover && (
                          <div className={`relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-[1.1rem] sm:w-40 ${p.coverFit === "contain" ? "bg-white" : "bg-foreground/5"}`}>
                            <Image src={p.cover} alt="" fill unoptimized sizes="(max-width: 640px) 96px, 160px" className={p.coverFit === "contain" ? "object-contain p-1" : "object-cover object-left-top"} />
                          </div>
                        )}
                        <div className="min-w-0 flex-1 sm:pt-1">
                          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                            <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                              {p.title}
                            </h3>
                            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{p.dates}</span>
                          </div>
                          <p className="mt-1.5 leading-relaxed text-muted-foreground">{p.tagline}</p>
                          {p.context && <p className="mt-2 text-xs text-muted-foreground">{p.context}</p>}
                        </div>
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
