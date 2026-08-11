import { Briefcase, GraduationCap, Award } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience, education, patent } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <BlurFade>
        <SectionHeading
          eyebrow="the receipts"
          title="Experience"
          icon={<Briefcase className="h-4 w-4" />}
        />
      </BlurFade>

      {/* Timeline */}
      <div className="relative ml-1 border-l border-border pl-6 sm:pl-8">
        {experience.map((item, i) => (
          <BlurFade key={`${item.org}-${item.role}`} delay={0.04 * i} className="relative pb-8 last:pb-0">
            <span className="absolute -left-[1.65rem] top-1.5 grid h-3 w-3 place-items-center sm:-left-[2.15rem]">
              <span className="h-3 w-3 rounded-full border-2 border-brand bg-background" />
            </span>

            <div className="rounded-xl border bg-card p-4 transition-colors hover:border-[color-mix(in_oklab,var(--brand)_40%,var(--border))]">
              <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                <p className="text-sm font-bold text-foreground sm:text-base">
                  {item.role}
                  <span className="mx-1.5 text-muted-foreground">·</span>
                  <span className="font-semibold text-foreground">{item.org}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.date}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
              </div>

              {item.summary && (
                <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              )}

              <ul className="mt-2 space-y-1.5">
                {item.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Education + Patent */}
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        <BlurFade>
          <SectionHeading
            eyebrow="foundations"
            title="Education"
            icon={<GraduationCap className="h-4 w-4" />}
            className="mb-4"
          />
          <div className="flex flex-col gap-3">
            {education.map((e) => (
              <div key={e.degree} className="rounded-xl border bg-card p-4">
                <p className="text-sm font-bold text-foreground">{e.degree}</p>
                <p className="text-sm text-foreground">{e.org}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {e.date} · {e.location} · {e.detail}
                </p>
              </div>
            ))}
          </div>
        </BlurFade>

        <BlurFade delay={0.06}>
          <SectionHeading
            eyebrow="a differentiator"
            title="Patent"
            icon={<Award className="h-4 w-4" />}
            className="mb-4"
          />
          <GlowCard className="h-[calc(100%-3.75rem)]">
            <p className="text-sm font-bold text-foreground">{patent.title}</p>
            <p className="mt-1 text-xs font-medium text-brand">{patent.number}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{patent.detail}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              {patent.authority} · {patent.date}
            </p>
          </GlowCard>
        </BlurFade>
      </div>
    </section>
  );
}
