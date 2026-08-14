"use client";

import Image from "next/image";
import { data } from "@/data/data";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { IconGitPullRequest, IconGitMerge, IconArrowUpRight } from "@tabler/icons-react";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";

const REPO_LOGOS: Record<string, string> = {
  "BerriAI/litellm": "/oss/litellm.png",
  "run-llama/llama_index": "/oss/llamaindex.png",
  "pydantic/pydantic": "/oss/pydantic.png",
  "deepset-ai/haystack": "/oss/haystack.png",
  "stanfordnlp/dspy": "/oss/dspy.png",
};

// Live diff stats pulled from the GitHub API.
const DIFF: Record<string, { add: number; del: number; approved?: boolean }> = {
  "https://github.com/pydantic/pydantic/pull/13374": { add: 9, del: 0, approved: true },
  "https://github.com/BerriAI/litellm/pull/30764": { add: 59, del: 5 },
  "https://github.com/run-llama/llama_index/pull/22133": { add: 68, del: 9 },
  "https://github.com/BerriAI/litellm/pull/29693": { add: 36, del: 2 },
  "https://github.com/deepset-ai/haystack/pull/11670": { add: 27, del: 0 },
  "https://github.com/BerriAI/litellm/pull/31725": { add: 259, del: 8 },
  "https://github.com/stanfordnlp/dspy/pull/9942": { add: 24, del: 2 },
};

const LOGO_WALL = [
  { src: "/oss/litellm.png", name: "LiteLLM" },
  { src: "/oss/llamaindex.png", name: "LlamaIndex" },
  { src: "/oss/pydantic.png", name: "Pydantic" },
  { src: "/oss/haystack.png", name: "Haystack" },
  { src: "/oss/dspy.png", name: "DSPy" },
];

function Stat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
        <NumberTicker value={value} />
        {suffix}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

export default function OpenSource() {
  return (
    <div className="flex flex-col">
      <SectionHeading icon={<IconGitPullRequest className={headingIconClass} />}>
        Open Source
      </SectionHeading>

      {/* Proof band */}
      <BlurFade delay={0.05} inView>
        <div className="mb-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <Stat value={7} label="merged" />
          <Stat value={2} label="open" />
          <Stat value={194} suffix="K★" label="combined stars" />
          <Stat value={5} label="major projects" />
        </div>
      </BlurFade>

      {/* Logo wall */}
      <BlurFade delay={0.1} inView>
        <div className="mb-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {LOGO_WALL.map((l) => (
            <div
              key={l.name}
              title={l.name}
              className="grid h-11 w-11 place-items-center rounded-lg border bg-white/95 p-1.5 opacity-90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-100 sm:h-12 sm:w-12"
            >
              <Image src={l.src} alt={l.name} width={40} height={40} className="h-full w-full object-contain" />
            </div>
          ))}
        </div>
      </BlurFade>

      {/* PR cards, GitHub-style */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.openSource.map((pr, index) => {
          const diff = DIFF[pr.link];
          const prNumber = pr.status.match(/#\d+/)?.[0] ?? "";
          return (
            <BlurFade key={pr.link} delay={0.1 + index * 0.05} direction="up" inView>
              <a
                href={pr.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/glow relative flex h-full flex-col overflow-hidden rounded-lg border bg-background p-4 transition-all duration-400 hover:shadow-md"
              >
                <SpotlightGlow />

                <div className="flex items-center gap-2">
                  {REPO_LOGOS[pr.repo] && (
                    <Image src={REPO_LOGOS[pr.repo]} alt="" width={20} height={20} className="h-5 w-5 rounded" />
                  )}
                  <span className="font-mono text-xs text-muted-foreground">
                    {pr.repo} <span className="text-foreground/70">{prNumber}</span>
                  </span>
                  {diff && (
                    <span className="ml-auto font-mono text-[11px]">
                      <span className="text-emerald-500">+{diff.add}</span>{" "}
                      <span className="text-red-400">&minus;{diff.del}</span>
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      pr.merged ? "bg-[#8957e5]/15 text-[#a371f7]" : "bg-emerald-500/15 text-emerald-500"
                    }`}
                  >
                    {pr.merged ? <IconGitMerge className="h-3 w-3" /> : <IconGitPullRequest className="h-3 w-3" />}
                    {pr.merged ? "Merged" : "Open"}
                  </span>
                  {diff?.approved && (
                    <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-500">
                      approved by a maintainer
                    </span>
                  )}
                  <IconArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover/glow:-translate-y-0.5 group-hover/glow:translate-x-0.5" />
                </div>

                <h3 className="mt-2 text-sm font-bold leading-snug text-primary sm:text-base">{pr.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pr.body}</p>
              </a>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
