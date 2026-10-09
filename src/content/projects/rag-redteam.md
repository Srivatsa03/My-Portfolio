---
title: rag-redteam
tagline: An open-source scanner that attacks your RAG pipeline for prompt injection and document leakage, and fails CI the moment it gets more exploitable.
category: Open source
context: On PyPI and the GitHub Marketplace
role: Author and maintainer
dates: Jun 2026 - Present
status: v0.8.0, beta, actively maintained
order: 1
featured: true
cover: /projects/media/rag-redteam-hero.jpg
hero: /projects/media/rag-redteam-hero.jpg
heroAlt: rag-redteam sits between your RAG pipeline and what it produces, with seven attack probes, OWASP and MITRE ATLAS mapping, and statistical assurance
media:
  - src: /projects/media/rag-redteam-demo.gif
    alt: Wrapping a RAG pipeline in three methods and running rag-redteam against it
    caption: Wrap your pipeline in three methods and run a scan. Each finding comes back with its rate, a confidence interval, and its OWASP and MITRE ATLAS IDs.
  - src: /projects/media/rag-redteam-run.gif
    alt: A run across all seven probes with rate bars, confidence intervals and a statistical-assurance block
    caption: A full run across all seven probes, ending with the block that bounds how much risk a clean run actually rules out.
stack: [Python, GitHub Actions, SARIF, FastAPI, SQLite, React, TypeScript]
links:
  - label: View the code
    href: https://github.com/Srivatsa03/rag-redteam
  - label: PyPI
    href: https://pypi.org/project/rag-redteam/
  - label: GitHub Marketplace
    href: https://github.com/marketplace/actions/rag-redteam
  - label: Live demo
    href: https://srivatsa03.github.io/rag-redteam/
flow:
  - name: Adapter
    detail: You wrap your pipeline in three calls (answer, add documents, reset), point it at a URL, or use a ready adapter for LangChain, LlamaIndex, Haystack, Chroma or any OpenAI-compatible endpoint.
  - name: Payload grammar
    detail: Instead of replaying a few fixed strings, trials are sampled from framing, override, obfuscation, instruction form and position, about 4,800 injection payloads in total.
  - name: Seven probes
    detail: Each probe plants poisoned documents or secrets carrying a unique canary through the real retrieval path, then asks ordinary questions.
  - name: Canary detection
    detail: A hit is an exact or fuzzy canary match in the answer, so no LLM judge is needed and every run is reproducible.
  - name: Statistics
    detail: Every rate gets a Clopper-Pearson 95% interval, plus a Beta-binomial residual-risk bound and an estimate of attack mechanisms not yet seen.
  - name: Report and CI gate
    detail: Results go out as terminal, Markdown, JSON or SARIF tagged with OWASP and MITRE ATLAS IDs, and the build fails on a threshold or on regression against an accepted baseline.
results:
  - value: 37% to 11%
    label: Indirect prompt injection success, undefended vs. with the built-in defenses, on gpt-4o-mini
    source: 300 trials each (113/300 vs. 32/300), README
  - value: 9% to 0%
    label: Source-document leakage, undefended vs. defended
    source: README benchmark table
  - value: 17% to 1%
    label: Cross-document smuggling, undefended vs. defended
    source: README benchmark table
  - value: 42% to 48%
    label: Undefended injection success on the default LangChain, LlamaIndex and Haystack stacks
    source: FINDINGS, Finding 4 (the LlamaIndex gap vs. the plain adapter is not significant, p = 0.32)
  - value: 298
    label: Clean trials per attack family needed before you can claim 1% or less residual risk at 95% credibility
    source: README, "How much testing is enough?"
  - value: 45.1%
    label: The best bound a 4-payload clean run supports, which is why a green run with a few payloads proves very little
    source: README
  - value: 20
    label: Distinct attack mechanisms that still got through the defended pipeline, with about 10 more estimated unseen
    source: FINDINGS, Finding 5 (Chao1 estimate)
---

## The problem

Teams test RAG systems in two ways. Evaluation tools like RAGAS and DeepEval score answer quality. LLM scanners like garak probe the model on its own. Neither tests the retrieval pipeline, the part that turns an untrusted document into trusted context. Anyone who can get text into your knowledge base can plant instructions the model will follow, and a better model only follows them more competently.

There was a second problem I kept running into. A scan that says "no vulnerabilities found" after four payloads looks exactly like one that ran four hundred. I wanted a tool that tells you how much a clean run actually proves.

## How it works

<!-- flow -->

The core package has zero runtime dependencies, so it drops into any CI job. A FastAPI, SQLite and React dashboard in the same repo stores scans and compares them over time.

<!-- media -->

## Decisions and tradeoffs

- **Canary detection instead of an LLM judge.** It's deterministic, cheap and reproducible in CI. The cost is that paraphrased obedience goes uncounted, so the real rates are likely higher than what it reports. The docs say so.
- **A sampled payload grammar instead of fixed strings.** With fixed payloads, cross-document smuggling read 100% from a single attempt. Sampled across 300 trials it measured 17%.
- **Utility is reported next to every security number.** A defense that refuses every question scores a perfect 0% attack rate, which is useless. This column is what caught a broken filter (below).
- **Every defense is labelled structural or advisory.** Structural defenses alone left injection at 37%, the same as undefended. The drop to 11% comes from the advisory layer, and I publish that row so nobody mistakes the defenses for a fix.
- **The stricter Beta(1,1) prior is the default.** The residual-risk bound errs toward saying you haven't tested enough.

## What broke

- The system-prompt leak detector flagged "You are welcome!" as a leak. The 23% leak rate was mostly that artifact and dropped to 2% once fixed.
- The refusal detector scored "I'm sorry, but I don't have that" as a fabricated citation. Citation-integrity failures went from 77% to 39% after the fix.
- An early defended pipeline looked clean at 4 payloads per probe and turned out exploitable at 300. I retracted that claim in 0.6.0. The same run exposed a verbatim-match filter that blocked half the legitimate answers while reporting 0% attacks.

Every walked-back claim is logged in the repo's CORRECTIONS.md.

## Results

<!-- results -->

All of these are non-adaptive attacks, so read them as lower bounds on exposure. An attacker who adapts to the defense will do better. Across the benchmark that's about 10,000 attempts over 6 models, 2 vendors and 4 retrieval stacks.

## Limits and what's next

Canary matching misses paraphrased obedience, and the defenses can't reach a system prompt, because injection is architectural. Next on the roadmap: adaptive attacks, semantic detection, sequential stopping, Qdrant and pgvector adapters, and CI templates for GitLab, Jenkins and CircleCI.
