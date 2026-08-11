import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { profile } from "@/data/portfolio";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <BlurFade>
        <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-14 text-center sm:px-10">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-3/4 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand)_28%,transparent),transparent_70%)] blur-2xl"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            {profile.availableNote}
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
            Let&rsquo;s build something that holds up under attack.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Selectively exploring 2026 roles in software engineering, AI platform,
            infrastructure, and LLM security. Authorized to work in the US on F-1 OPT with
            STEM extension eligibility, so no immediate sponsorship required.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
            {[
              { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: profile.github, icon: Github, label: "GitHub" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-[color-mix(in_oklab,var(--brand)_45%,var(--border))]"
              >
                <Icon className="h-4 w-4" />
                {label}
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-8 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {year} {profile.name}
        </p>
        <p>Built from scratch with React, Vite, and Tailwind.</p>
      </div>
    </footer>
  );
}
