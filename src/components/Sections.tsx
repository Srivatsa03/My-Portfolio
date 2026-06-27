import { useState } from "react";
import { Github, ArrowUpRight, Mail, Linkedin, MapPin } from "lucide-react";
import {
  about, experience, featuredProjects, moreProjects, openSource,
  skills, education, leadership, patent, profile,
} from "@/data/portfolio";

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-12 reveal">
      <span className="text-accent font-mono text-xs tracking-[0.2em] uppercase">{eyebrow}</span>
      <h2 className="text-silver text-4xl md:text-5xl font-black tracking-tight mt-2">{title}</h2>
    </div>
  );
}

function Shell({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative max-w-6xl mx-auto px-5 py-24 scroll-mt-20">
      {children}
    </section>
  );
}

export function About() {
  return (
    <Shell id="about">
      <Heading eyebrow="who's writing this" title="About" />
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
        <div className="space-y-5 reveal">
          {about.map((p, i) => (
            <p key={i} className="text-muted-foreground text-base md:text-lg leading-relaxed">{p}</p>
          ))}
        </div>
        <div className="glass rounded-3xl p-7 reveal">
          <div className="text-sm text-muted-foreground space-y-4">
            <div><div className="text-foreground font-semibold">Based in</div>{profile.location}, open to relocating across the US</div>
            <div><div className="text-foreground font-semibold">Focus</div>AI infrastructure · platform · backend · cloud / DevOps</div>
            <div><div className="text-foreground font-semibold">Now</div>Available for full-time roles</div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function Experience() {
  return (
    <Shell id="experience">
      <Heading eyebrow="where i've done it" title="Experience" />
      <div className="relative border-l border-white/10 pl-6 md:pl-8 space-y-10">
        {experience.map((e, i) => (
          <div key={i} className="relative reveal">
            <span className="absolute -left-[33px] md:-left-[41px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-background" />
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-foreground">{e.role}</h3>
              <div className="text-accent font-medium">{e.company}</div>
              <div className="text-xs text-muted-foreground mt-1 mb-4">{e.duration} · {e.location}</div>
              <ul className="space-y-2">
                {e.points.map((p, j) => (
                  <li key={j} className="text-sm text-muted-foreground leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-accent/60" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function Projects() {
  return (
    <Shell id="projects">
      <Heading eyebrow="things i actually shipped" title="Selected work" />
      <p className="text-muted-foreground max-w-2xl mb-10 reveal">
        Systems I would happily be quizzed on in an interview. Real partners, real constraints, and numbers I can defend.
      </p>

      <div className="space-y-6">
        {featuredProjects.map((p) => (
          <article key={p.title} className="glass rounded-3xl p-7 md:p-9 reveal">
            <span className="text-accent font-mono text-xs tracking-widest uppercase">{p.context}</span>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2">{p.title}</h3>
            {p.lede && <p className="text-foreground/80 mt-1 font-medium">{p.lede}</p>}
            <p className="text-muted-foreground leading-relaxed mt-4 max-w-3xl">{p.story}</p>
            <div className="flex flex-wrap gap-6 mt-6">
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-2xl font-extrabold text-silver">{m.value}</div>
                  <div className="text-xs text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/80 mt-5 font-mono">{p.stack}</p>
            <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent font-semibold mt-4 hover:gap-2 transition-all">
              Read the code <ArrowUpRight className="w-4 h-4" />
            </a>
          </article>
        ))}
      </div>

      <h3 className="text-lg font-bold text-foreground mt-14 mb-6 reveal">A few more things I have built</h3>
      <div className="grid md:grid-cols-2 gap-5">
        {moreProjects.map((p) => (
          <a key={p.name} href={p.link} target="_blank" rel="noreferrer" className="glass rounded-2xl p-6 reveal group">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">{p.name}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.context}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.blurb}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs font-mono text-muted-foreground/70">{p.stack}</span>
              <Github className="w-4 h-4 text-muted-foreground group-hover:text-accent transition" />
            </div>
          </a>
        ))}
      </div>
    </Shell>
  );
}

export function OpenSource() {
  return (
    <Shell id="open-source">
      <Heading eyebrow="fixes that left my machine" title="Open source" />
      <p className="text-muted-foreground max-w-2xl mb-10 reveal">
        Four bugs I found and fixed in tools a lot of people build on, across Haystack, LiteLLM, and LlamaIndex.
        Three merged, one in review. I care less about line count and more about catching the second broken file nobody noticed.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {openSource.map((o, i) => (
          <a key={i} href={o.link} target="_blank" rel="noreferrer" className="glass rounded-2xl p-6 reveal block">
            <div className="flex items-center gap-3 flex-wrap mb-3">
              <span className="font-mono text-sm text-accent">{o.repo}</span>
              <span className="text-[10px] text-muted-foreground">{o.stars}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${o.merged ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
                {o.status}
              </span>
            </div>
            <h3 className="font-bold text-foreground mb-2">{o.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{o.body}</p>
          </a>
        ))}
      </div>
    </Shell>
  );
}

export function Skills() {
  return (
    <Shell id="skills">
      <Heading eyebrow="my toolbox" title="What I work with" />
      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((g) => (
          <div key={g.category} className="glass rounded-2xl p-6 reveal">
            <h3 className="font-bold text-foreground mb-4">{g.category}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <span key={it} className="chip text-sm rounded-full px-3 py-1.5 text-muted-foreground">{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function Education() {
  return (
    <Shell id="education">
      <Heading eyebrow="the paperwork" title="Education" />
      <div className="grid md:grid-cols-2 gap-6">
        {education.map((e) => (
          <div key={e.university} className="glass rounded-2xl p-6 reveal">
            <h3 className="text-lg font-bold text-foreground">{e.degree}</h3>
            {e.specialization && <p className="text-sm text-accent">{e.specialization}</p>}
            <p className="text-accent font-medium mt-1">{e.university}</p>
            <p className="text-xs text-muted-foreground mt-1">{e.duration} · {e.location}</p>
            <p className="text-sm font-semibold text-foreground mt-2">{e.gpa}</p>
            {e.coursework.length > 0 && (
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Relevant coursework</p>
                <div className="flex flex-wrap gap-2">
                  {e.coursework.map((c) => (
                    <span key={c} className="chip text-xs rounded-full px-2.5 py-1 text-muted-foreground">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Leadership + Patent */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="glass rounded-2xl p-6 reveal">
          <span className="text-accent font-mono text-xs tracking-widest uppercase">outside the code</span>
          <h3 className="text-lg font-bold text-foreground mt-2">{leadership.role}</h3>
          <p className="text-accent font-medium">{leadership.org}</p>
          <p className="text-xs text-muted-foreground mt-1 mb-3">{leadership.duration}</p>
          <ul className="space-y-2">
            {leadership.points.map((p, i) => (
              <li key={i} className="text-sm text-muted-foreground leading-relaxed pl-4 relative">
                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-accent/60" />{p}
              </li>
            ))}
          </ul>
        </div>
        <div className="premium-card rounded-2xl p-6 reveal">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 mb-3">★ Patent granted</span>
          <h3 className="text-lg font-bold text-white">{patent.title}</h3>
          <p className="text-xs text-blue-200/70 mt-1">{patent.number}</p>
          <p className="text-xs text-blue-200/50">{patent.date}</p>
          <p className="text-sm text-blue-100/70 mt-3 leading-relaxed">{patent.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {patent.tags.map((t) => (
              <span key={t} className="text-xs rounded-full px-2.5 py-1 bg-white/5 border border-white/10 text-blue-100/80">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\nFrom: ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Shell id="contact">
      <Heading eyebrow="say hello" title="Get in touch" />
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="reveal">
          <p className="text-accent font-mono text-xs tracking-widest uppercase">Open to work</p>
          <h3 className="text-2xl font-bold text-foreground mt-2 mb-3">Have a role, project, or research idea?</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Available now for full-time software engineering, AI infrastructure, platform, cloud, DevOps/SRE, and data infrastructure roles.
          </p>
          <div className="space-y-3">
            <a href={`mailto:${profile.email}`} className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover:text-foreground transition">
              <Mail className="w-5 h-5 text-accent" /><span><strong className="block text-foreground text-sm">Email</strong><span className="text-sm text-muted-foreground">{profile.email}</span></span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover:text-foreground transition">
              <Linkedin className="w-5 h-5 text-accent" /><span><strong className="block text-foreground text-sm">LinkedIn</strong><span className="text-sm text-muted-foreground">linkedin.com/in/srivatsa-kamballa</span></span>
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover:text-foreground transition">
              <Github className="w-5 h-5 text-accent" /><span><strong className="block text-foreground text-sm">GitHub</strong><span className="text-sm text-muted-foreground">github.com/Srivatsa03</span></span>
            </a>
            <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-accent" /><span><strong className="block text-foreground text-sm">Location</strong><span className="text-sm text-muted-foreground">{profile.location}</span></span>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass rounded-3xl p-7 space-y-4 reveal">
          <div>
            <label className="text-sm text-muted-foreground" htmlFor="name">Name</label>
            <input id="name" name="name" required placeholder="Your name" className="w-full mt-1 rounded-lg bg-black/30 border border-white/10 px-3 py-2.5 text-foreground outline-none focus:border-accent" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" className="w-full mt-1 rounded-lg bg-black/30 border border-white/10 px-3 py-2.5 text-foreground outline-none focus:border-accent" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground" htmlFor="message">Message</label>
            <textarea id="message" name="message" required rows={5} placeholder="Tell me what you want to discuss" className="w-full mt-1 rounded-lg bg-black/30 border border-white/10 px-3 py-2.5 text-foreground outline-none focus:border-accent resize-none" />
          </div>
          <button type="submit" className="w-full rounded-lg bg-foreground text-background font-semibold py-3 hover:opacity-90 transition">
            {sent ? "Opening your mail app..." : "Send message"}
          </button>
        </form>
      </div>
    </Shell>
  );
}
