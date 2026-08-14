"use client";

import { useEffect, useState } from "react";

// Original coding-humor one-liners (my own writing, in the relatable-dev vibe).
const LINES = [
  "whoami  →  builds AI infra, then breaks it before an attacker gets the chance.",
  "git commit -m 'final'. git commit -m 'final for real'. git commit -m 'ok THIS one'.",
  "'quick 5-minute fix.'  narrator: it was neither quick nor 5 minutes.",
  "code review: comments left, 1. comments received, 47. the natural order holds.",
  "prod is quiet. too quiet. I don't trust it. refreshing the dashboards again.",
  "on-call at 3am: not a bug. a feature. a hostile, screaming feature.",
  "works on my machine → deploys → breaks → works on my machine while I stare at it.",
  "// TODO: fix later. git blame says 2 years ago, also me. we meet again.",
  "estimated: 2 hours. actual: 2 hours, 3 refactors, and one small identity crisis.",
  "reading a stranger's stack trace for fun isn't a red flag. it's a hobby. it found your bug.",
  "the bug only reproduces when no one is watching. it's shy. it's also winning.",
  "step 1: write the test. step 2: watch it pass. step 3: distrust it immediately.",
  "impostor syndrome and a granted patent, sharing one desk. neither is leaving.",
  "a Pydantic maintainer approved my PR. peak achieved; it's all downhill and I'm at peace.",
  "my commits are small. the 3am incidents they quietly prevent are not. that's the trick.",
];

export default function Terminal() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const line = LINES[index];
    if (typed.length < line.length) {
      const t = setTimeout(() => setTyped(line.slice(0, typed.length + 1)), 30);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setHistory((h) => [...h.slice(-3), line]);
      setTyped("");
      setIndex((i) => (i + 1) % LINES.length);
    }, 2200);
    return () => clearTimeout(t);
  }, [typed, index]);

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-[#0c0e16] shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-xs text-zinc-500">srivatsa@chicago: ~/portfolio</span>
      </div>
      <div className="min-h-[168px] p-4 font-mono text-[13px] leading-relaxed sm:text-sm">
        {history.map((h, i) => (
          <p key={`${h}-${i}`} className="text-zinc-500">
            <span className="text-emerald-400">$</span> {h}
          </p>
        ))}
        <p className="text-zinc-100">
          <span className="text-emerald-400">$</span> {typed}
          <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-violet-400 align-baseline animate-[blink_1s_steps(1)_infinite]" />
        </p>
      </div>
    </div>
  );
}
