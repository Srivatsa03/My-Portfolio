import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlurFade } from "../ui/blur-fade";
import { TransitionLink } from "@/components/ui/transition-link";
import { IconBrush, IconArrowRight } from "@tabler/icons-react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { getAllProjects, repoOf, type Project } from "@/lib/projects";
import { RepoCard } from "@/components/projects/repo-card";

// Server component: reads the project write-ups in src/content/projects and
// shows the featured ones. Each card opens that project's own page.
export default function Projects() {
    const all = getAllProjects();
    const featured = all.filter((p) => p.featured);
    const repos = all
        .map((p) => ({ project: p, repo: repoOf(p) }))
        .filter((r): r is { project: Project; repo: string } => r.repo !== null);

    return (
        <div className="flex flex-col">
            <SectionHeading icon={<IconBrush className={headingIconClass} />}>
                Projects
            </SectionHeading>
            <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
                {featured.map((project, index) => (
                    <BlurFade key={project.slug} delay={0.04 * 12 + index * 0.05}>
                        <ProjectCard project={project} />
                    </BlurFade>
                ))}
            </div>
            <TransitionLink
                href="/projects"
                className="mx-auto mt-8 inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
                See all {all.length} projects
                <IconArrowRight className="h-4 w-4" />
            </TransitionLink>

            <h3 className="mt-14 text-center text-lg font-semibold tracking-tight">On GitHub</h3>
            <p className="mt-1 text-center text-sm text-muted-foreground">
                Live stars and forks, refreshed every week.
            </p>
            <div className="mx-auto mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                {repos.map(({ project, repo }) => (
                    <RepoCard key={repo} repo={repo} label={project.title} />
                ))}
            </div>
        </div>
    );
}

export function ProjectCard({ project }: { project: Project }) {
    return (
        <TransitionLink href={`/projects/${project.slug}`} className="group block h-full">
            <Card className="relative flex h-full flex-col overflow-hidden border transition-all duration-300 ease-out hover:shadow-md">
                {project.cover && (
                    <div className={`relative aspect-[16/10] overflow-hidden border-b border-border/60 ${project.coverFit === "contain" ? "bg-white" : ""}`}>
                        <Image
                            src={project.cover}
                            alt=""
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className={`${project.coverFit === "contain" ? "object-contain p-2" : "object-cover object-left-top"} transition-transform duration-500 group-hover:scale-[1.03]`}
                        />
                    </div>
                )}
                <CardHeader className="px-2">
                    <div className="space-y-1">
                        <CardTitle className="mt-2 text-base">{project.title}</CardTitle>
                        <div className="text-xs text-muted-foreground">
                            {project.dates}
                            {project.context ? `, ${project.context}` : ""}
                        </div>
                        <p className="mt-2 text-pretty text-sm text-muted-foreground">{project.tagline}</p>
                    </div>
                </CardHeader>
                <CardContent className="mt-auto flex flex-col px-2 pb-3">
                    {project.stack.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {project.stack.slice(0, 5).map((tag) => (
                                <Badge className="px-1 py-0.5 text-[12px]" variant="secondary" key={tag}>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                        Read the write-up
                        <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                </CardContent>
            </Card>
        </TransitionLink>
    );
}
