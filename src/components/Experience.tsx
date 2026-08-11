import { Briefcase, GraduationCap, BookOpen, Award } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience, teaching, education, patent } from "@/data/portfolio";

const headIcon = "h-5 w-5 sm:h-6 sm:w-6";

function Monogram({ text }: { text: string }) {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border bg-secondary text-xs font-bold text-secondary-foreground sm:h-10 sm:w-10">
      {text}
    </span>
  );
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <BlurFade>
        <SectionHeading title="Experience" icon={<Briefcase className={headIcon} />} />
      </BlurFade>

      <div className="flex flex-col gap-4">
        {experience.map((item, i) => (
          <BlurFade key={`${item.org}-${item.role}`} delay={0.05 * i}>
            <GlowCard>
              <div className="flex gap-3">
                <Monogram text={item.short} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                    <p className="text-sm font-bold text-foreground sm:text-base">
                      {item.role}
                      <span className="mx-1.5 font-normal text-muted-foreground">·</span>
                      {item.org}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.date}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                  </div>

                  {item.summary && (
                    <p className="mt-1.5 text-sm italic leading-relaxed text-muted-foreground">
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
              </div>
            </GlowCard>
          </BlurFade>
        ))}
      </div>

      {/* Teaching — kept separate from engineering experience. */}
      <BlurFade className="mt-16 block">
        <SectionHeading title="Teaching" icon={<BookOpen className={headIcon} />} />
      </BlurFade>
      <div className="grid gap-4 sm:grid-cols-2">
        {teaching.map((t, i) => (
          <BlurFade key={t.course} delay={0.05 * i}>
            <GlowCard className="h-full">
              <p className="text-sm font-bold text-foreground">{t.role}</p>
              <p className="mt-0.5 text-xs font-medium text-brand">{t.course}</p>
              <p className="text-xs text-muted-foreground">
                {t.org} · {t.date}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.detail}</p>
            </GlowCard>
          </BlurFade>
        ))}
      </div>

      {/* Education */}
      <BlurFade className="mt-16 block">
        <SectionHeading title="Education" icon={<GraduationCap className={headIcon} />} />
      </BlurFade>
      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((e, i) => (
          <BlurFade key={e.degree} delay={0.05 * i}>
            <GlowCard className="h-full">
              <p className="text-sm font-bold text-foreground">{e.degree}</p>
              <p className="text-sm text-foreground">{e.org}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {e.date} · {e.location} · {e.detail}
              </p>
            </GlowCard>
          </BlurFade>
        ))}
      </div>

      {/* Patent */}
      <BlurFade className="mt-16 block">
        <SectionHeading title="Patent" icon={<Award className={headIcon} />} />
      </BlurFade>
      <BlurFade>
        <GlowCard className="mx-auto max-w-2xl">
          <p className="text-sm font-bold text-foreground">{patent.title}</p>
          <p className="mt-1 text-xs font-medium text-brand">{patent.number}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{patent.detail}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            {patent.authority} · {patent.date}
          </p>
        </GlowCard>
      </BlurFade>
    </section>
  );
}
