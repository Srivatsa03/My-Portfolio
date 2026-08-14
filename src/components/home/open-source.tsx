"use client";

import { data } from "@/data/data";
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { IconGitPullRequest, IconStar, IconArrowUpRight } from "@tabler/icons-react";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";

export default function OpenSource() {
  return (
    <div className="flex flex-col">
      <SectionHeading icon={<IconGitPullRequest className={headingIconClass} />}>
        Open Source
      </SectionHeading>

      <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
        Seven pull requests merged across LiteLLM, LlamaIndex, Pydantic, and Haystack,
        plus two open, all solo. The pattern is silent-correctness bugs: the ones that
        throw no error while quietly corrupting data, leaking secrets, or mispricing usage.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.openSource.map((pr, index) => (
          <BlurFade
            key={pr.link}
            delay={0.1 + index * 0.05}
            direction="up"
            inView
          >
            <a
              href={pr.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/glow relative flex h-full flex-col overflow-hidden rounded-lg border bg-background p-4 transition-all duration-400 hover:shadow-md"
            >
              <SpotlightGlow />

              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-muted-foreground">{pr.repo}</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <IconStar className="h-3 w-3" />
                  {pr.stars} stars
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
                <h3 className="text-sm font-bold leading-snug text-primary sm:text-base">
                  {pr.title}
                </h3>
                <IconArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover/glow:-translate-y-0.5 group-hover/glow:translate-x-0.5" />
              </div>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pr.body}</p>

              <div className="mt-auto pt-3 text-xs font-medium text-muted-foreground">
                {pr.status}
              </div>
            </a>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
