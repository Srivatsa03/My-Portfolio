import { Mail, Linkedin, Github, ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { profile } from "@/data/portfolio";
import profilePhoto from "@/images/photo-1.jpg";

const contacts = [
  { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
  { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: profile.github, icon: Github, label: "GitHub" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] flex-col items-center justify-center px-4 pb-16 pt-28 text-center"
    >
      <BlurFade className="flex flex-col items-center">
        {/* Avatar with a soft brand glow; grayscale until hovered. */}
        <div className="group relative mb-8 h-20 w-20">
          <span
            aria-hidden
            className="absolute -inset-3 animate-pulse rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand)_55%,transparent),transparent_70%)] opacity-80 blur-lg"
          />
          <img
            src={profilePhoto}
            alt={profile.name}
            className="relative h-full w-full rounded-full border border-border object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0"
          />
        </div>

        <div className="mb-7 inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available
        </div>
      </BlurFade>

      <BlurFade delay={0.08}>
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          <span className="bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
            Hi. I&rsquo;m{" "}
          </span>
          <span className="align-baseline font-script text-[1.05em] text-brand">Srivatsa</span>
        </h1>
      </BlurFade>

      <BlurFade delay={0.14}>
        <p className="mt-6 text-lg font-medium text-secondary-foreground sm:text-2xl">
          A Software Engineer who{" "}
          <span className="font-script text-[1.12em] text-brand">breaks what he builds</span>.
        </p>
      </BlurFade>

      <BlurFade delay={0.2}>
        <div className="mt-9 flex items-center justify-center gap-5">
          <div className="flex items-center gap-6">
            {contacts.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-secondary-foreground transition-transform duration-300 hover:scale-125 hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <span aria-hidden className="h-5 w-px bg-border" />

          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full border bg-background/40 px-4 py-1.5 text-sm font-medium text-secondary-foreground backdrop-blur-sm transition-colors hover:text-foreground"
          >
            View my work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </BlurFade>
    </section>
  );
}
