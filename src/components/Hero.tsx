import { useEffect, useState } from "react";
import { Mail, Linkedin, Github, ArrowRight, MapPin } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { profile } from "@/data/portfolio";
import profilePhoto from "@/images/photo-1.jpg";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      2600
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] flex-col items-center justify-center px-4 pb-16 pt-24 text-center"
    >
      <BlurFade className="flex flex-col items-center">
        {/* Profile photo, black and white until hovered. */}
        <div className="group relative mb-7 h-24 w-24 sm:h-28 sm:w-28">
          <span
            aria-hidden
            className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand)_35%,transparent),transparent_70%)] opacity-60 blur-md"
          />
          <img
            src={profilePhoto}
            alt={profile.name}
            className="relative h-full w-full rounded-full border border-border object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0"
          />
        </div>

        {/* Availability pill. */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {profile.availableNote}
        </div>
      </BlurFade>

      <BlurFade delay={0.08}>
        <h1 className="text-4xl font-bold tracking-tight text-gradient sm:text-6xl">
          Hi, I&rsquo;m{" "}
          <span className="font-script font-normal text-brand">Srivatsa</span>
        </h1>
      </BlurFade>

      <BlurFade delay={0.14}>
        <p className="mt-4 flex h-7 items-center justify-center text-lg font-medium text-secondary-foreground sm:text-2xl">
          <span
            key={roleIndex}
            className="animate-[fadeUp_0.5s_ease] bg-gradient-to-r from-brand to-foreground bg-clip-text text-transparent"
            style={{ animation: "fadeUp 0.5s ease" }}
          >
            {profile.roles[roleIndex]}
          </span>
        </p>
      </BlurFade>

      <BlurFade delay={0.2}>
        <p className="mx-auto mt-6 max-w-xl text-balance text-base text-foreground sm:text-lg">
          {profile.thesis}
        </p>
        <p className="mx-auto mt-3 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground">
          {profile.blurb}
        </p>
      </BlurFade>

      <BlurFade delay={0.26}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            View my work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <div className="flex items-center gap-1">
            {[
              { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
              { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: profile.github, icon: Github, label: "GitHub" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border bg-card text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {profile.location}
        </div>
      </BlurFade>
    </section>
  );
}
