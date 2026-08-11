import { ArrowUpRight, GitPullRequest, Star } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { openSource } from "@/data/portfolio";

export function OpenSource() {
  return (
    <section id="open-source" className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <BlurFade>
        <SectionHeading title="Open Source" icon={<GitPullRequest className="h-5 w-5 sm:h-6 sm:w-6" />} />
        <p className="mx-auto -mt-4 mb-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Seven pull requests merged across LiteLLM, LlamaIndex, Pydantic, and Haystack,
          plus two open, all solo. The pattern is silent-correctness bugs: the ones that
          throw no error while quietly corrupting data, leaking secrets, or mispricing usage.
        </p>
      </BlurFade>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {openSource.map((pr, i) => (
          <BlurFade key={pr.link} delay={0.03 * i}>
            <GlowCard as="a" href={pr.link} className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-muted-foreground">{pr.repo}</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Star className="h-3 w-3" />
                  {pr.stars}
                </span>
              </div>

              <div className="mt-2 flex items-start gap-2">
                <span
                  className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    pr.merged
                      ? "bg-emerald-500/15 text-emerald-500"
                      : "bg-amber-500/15 text-amber-500"
                  }`}
                >
                  {pr.merged ? "merged" : "open"}
                </span>
                <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
                  {pr.title}
                </h3>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pr.body}</p>

              <div className="mt-auto pt-3 text-xs font-medium text-muted-foreground">
                {pr.status}
              </div>
            </GlowCard>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
