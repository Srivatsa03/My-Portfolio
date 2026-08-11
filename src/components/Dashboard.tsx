import { MapPin, Hammer, Award, ArrowUpRight, ShieldCheck } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { GlowCard } from "@/components/ui/glow-card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import { Globe } from "@/components/ui/globe";
import { stats, stack, highlight, certification, profile } from "@/data/portfolio";

const focus = ["AI infrastructure", "LLM & RAG security", "Platform / SRE"];

function CardLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-muted-foreground">
      <span className="text-brand">{icon}</span>
      <span className="text-xs font-semibold uppercase tracking-[0.16em]">{children}</span>
    </div>
  );
}

export function Dashboard() {
  return (
    <section id="dashboard" className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* The lane */}
        <BlurFade className="sm:col-span-2" delay={0.04}>
          <GlowCard className="h-full">
            <CardLabel icon={<ShieldCheck className="h-4 w-4" />}>The lane</CardLabel>
            <p className="text-lg font-semibold leading-snug text-foreground sm:text-xl">
              {profile.thesis}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Research background in fuzzing and Bayesian risk estimation, platform
              background in Kubernetes and Terraform, AI background in RAG and LLM
              evaluation. All of it points at one thing.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {focus.map((f) => (
                <span
                  key={f}
                  className="rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {f}
                </span>
              ))}
            </div>
          </GlowCard>
        </BlurFade>

        {/* Currently building */}
        <BlurFade className="sm:col-span-2" delay={0.08}>
          <GlowCard className="h-full">
            <CardLabel icon={<Hammer className="h-4 w-4" />}>Currently building</CardLabel>
            <div className="flex flex-col gap-4">
              {highlight.items.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item block"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-sm font-semibold text-foreground group-hover/item:text-brand">
                      {item.name}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5" />
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                      {item.meta}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.note}
                  </p>
                </a>
              ))}
            </div>
          </GlowCard>
        </BlurFade>

        {/* Stats */}
        <BlurFade className="sm:col-span-2" delay={0.12}>
          <GlowCard className="h-full">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="flex items-baseline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    <NumberTicker value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
                  </div>
                  <div className="mt-1 text-xs font-semibold text-foreground">{s.label}</div>
                  <div className="text-[11px] leading-tight text-muted-foreground">{s.sub}</div>
                </div>
              ))}
            </div>
          </GlowCard>
        </BlurFade>

        {/* Globe / location */}
        <BlurFade delay={0.16}>
          <GlowCard className="h-full">
            <CardLabel icon={<MapPin className="h-4 w-4" />}>Based in</CardLabel>
            <div className="relative mx-auto h-36 w-36">
              <Globe />
            </div>
            <p className="mt-2 text-center text-sm font-medium text-foreground">{profile.location}</p>
          </GlowCard>
        </BlurFade>

        {/* Certification */}
        <BlurFade delay={0.2}>
          <GlowCard className="h-full">
            <CardLabel icon={<Award className="h-4 w-4" />}>Certified</CardLabel>
            <div className="flex h-[calc(100%-2rem)] flex-col justify-center">
              <p className="text-sm font-semibold leading-snug text-foreground">
                AWS Solutions Architect
              </p>
              <p className="text-xs text-muted-foreground">Associate</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {certification.authority}
              </p>
            </div>
          </GlowCard>
        </BlurFade>

        {/* Stack marquee */}
        <BlurFade className="col-span-full" delay={0.24}>
          <GlowCard className="overflow-hidden">
            <CardLabel icon={<Hammer className="h-4 w-4" />}>Stack</CardLabel>
            <div className="relative">
              <div className="fade-mask-left" />
              <div className="fade-mask-right" />
              <Marquee className="[--duration:34s]">
                {stack.map((t) => (
                  <span
                    key={t}
                    className="whitespace-nowrap rounded-lg border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </Marquee>
            </div>
          </GlowCard>
        </BlurFade>
      </div>
    </section>
  );
}
