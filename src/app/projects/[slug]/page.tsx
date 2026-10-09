import { getAllProjects, getProjectBySlug, renderProjectBody, repoOf } from "@/lib/projects";
import { RepoCard } from "@/components/projects/repo-card";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlurFade } from "@/components/ui/blur-fade";
import { TransitionLink } from "@/components/ui/transition-link";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ProjectFlow } from "@/components/projects/project-flow";
import { ProjectResults } from "@/components/projects/project-results";
import { ProjectFacts } from "@/components/projects/project-facts";
import { IconArrowLeft, IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const SITE_URL = "https://srivatsa-kamballa.vercel.app";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Srivatsa Kamballa`,
    description: project.tagline,
    openGraph: {
      type: "article",
      url: `${SITE_URL}/projects/${slug}`,
      title: project.title,
      description: project.tagline,
      images: project.cover ? [{ url: project.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.tagline,
    },
  };
}

const proseClasses =
  "prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-headings:scroll-mt-[50px] prose-h2:mt-12 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:my-1";

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const parts = await renderProjectBody(project.content);
  const repo = repoOf(project);
  const all = getAllProjects();
  const next = all[(all.findIndex((p) => p.slug === slug) + 1) % all.length];

  return (
    <div className="relative z-10 pt-32 sm:pt-40 pb-16 px-3 sm:px-4">
      <div className="mx-auto max-w-5xl">
        <BlurFade delay={0.005} inView>
          <TransitionLink
            href="/projects"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconArrowLeft className="h-4 w-4" />
            All projects
          </TransitionLink>

          <header className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{project.tagline}</p>
            {project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.links.map((link, i) => {
                  const isRepo = link.href.includes("github.com");
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        i === 0
                          ? "border-foreground bg-foreground text-background hover:bg-foreground/90"
                          : "border-border text-foreground hover:bg-secondary",
                      )}
                    >
                      {isRepo ? <IconBrandGithub className="h-4 w-4" /> : <IconExternalLink className="h-4 w-4" />}
                      {link.label}
                    </a>
                  );
                })}
              </div>
            )}
            {repo && (
              <div className="mt-8 max-w-[420px]">
                <RepoCard repo={repo} label={project.title} />
              </div>
            )}
          </header>
        </BlurFade>


        <div className="mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
          <div className="min-w-0 max-w-[68ch]">
            <div className="mb-10 rounded-lg border border-border/60 p-4 lg:hidden">
              <ProjectFacts project={project} />
            </div>

            {parts.map((part, i) => {
              if (part.kind === "flow") return <ProjectFlow key={i} stages={project.flow} />;
              if (part.kind === "results") return <ProjectResults key={i} results={project.results} />;
              return (
                <div key={i} className={proseClasses} dangerouslySetInnerHTML={{ __html: part.html ?? "" }} />
              );
            })}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-10">
              <ProjectFacts project={project} />
              {project.headings.length > 0 && <TableOfContents headings={project.headings} />}
            </div>
          </aside>
        </div>

        {next && next.slug !== slug && (
          <div className="mt-20 border-t pt-8">
            <p className="text-sm text-muted-foreground">Next project</p>
            <TransitionLink
              href={`/projects/${next.slug}`}
              className="mt-1 inline-block text-xl font-semibold tracking-tight text-foreground hover:underline"
            >
              {next.title}
            </TransitionLink>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{next.tagline}</p>
          </div>
        )}
      </div>
    </div>
  );
}
