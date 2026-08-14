"use client";

import { useEffect, useState } from "react";

// Original, dry-sarcastic one-liners about Srivatsa's actual work.
const LINES = [
  "whoami  →  builds AI infra, then breaks it before an attacker gets the chance.",
  "recruiter: 'any production experience?'  →  7 PRs merged into libraries you imported this morning.",
  "'the model hallucinated.'  no. the pipeline handed it a poisoned document and asked politely.",
  "yes, I read strangers' code for fun. yes, I found the bug. no, it is not a personality disorder.",
  "'it works on my machine.'  wonderful. I will ship your machine to prod then.",
  "on-call rule: if kubemend can't fix it as one reversible git commit, it doesn't touch the cluster.",
  "fixed a 10x pricing bug in prod billing. saved everyone real money. received one (1) thumbs-up.",
  "a Pydantic maintainer approved my PR. I have peaked. it's all downhill and I've made peace with it.",
  "impostor syndrome? I have a patent, an AWS cert, and 7 merged PRs. the impostor is thriving, honestly.",
  "my commits are small. the regressions they quietly prevent are not. that's the whole trick.",
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
