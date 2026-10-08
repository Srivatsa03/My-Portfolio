---
title: ECI Pipeline (SENTINEL)
tagline: Watches Android security, CVE and policy feeds, works out what actually changed, and turns the significant changes into cited risk tickets.
category: Industry
context: Team capstone with TransUnion
role: Built the SENTINEL console, the FastAPI service and the evaluation on a student team
dates: Jan 2026 - Aug 2026
status: Delivered, live console online
order: 4
featured: true
cover: /projects/eci-pipeline.png
stack: [Python, FastAPI, PostgreSQL, pgvector, NetworkX, Groq, Next.js, React]
links:
  - label: View the code
    href: https://github.com/Srivatsa03/ECI-Pipeline
  - label: Live console
    href: https://eci-pipeline-one.vercel.app
flow:
  - name: Scout
    detail: Takes a SHA-256 snapshot of each source and stops early when nothing changed, so an unchanged page never costs an LLM call.
  - name: Delta detection
    detail: Line-diffs the new snapshot against the last one and drops changes below a noise threshold, so a moved banner doesn't trigger anything.
  - name: Chunk and embed
    detail: Splits the changed content and embeds it into pgvector for retrieval.
  - name: Graph builder
    detail: Extracts CVEs, components, policy clauses and API levels into a NetworkX knowledge graph for multi-hop questions.
  - name: Sentinel triage
    detail: An LLM on Groq scores each change for relevance and risk, then marks it triaged or escalated.
  - name: Coordinator
    detail: For escalated items only, combines vector and graph retrieval into an action ticket with an owner, a risk level, next steps and citations.
  - name: SENTINEL console
    detail: A Next.js console over the FastAPI service, which can also run from an offline dataset with no database at all.
results:
  - value: 91.6%
    label: Precision at rank 1 on 95 scored benchmark queries, identical for plain RAG, DeltaRAG and the full system
    source: data/ablation_results.json, 110 gold queries, top-k 5
  - value: 94.5%
    label: nDCG@5 on the same queries
    source: same file
  - value: within 1.1 points
    label: Spread across every retrieval variant, a null result for the DeltaRAG and graph layers
    source: README and the live analytics page
  - value: 0%
    label: False-alarm rejection on 15 control queries, because retrieval never abstains. This is the open gap.
    source: same benchmark
  - value: 14
    label: Feeds in the live console's source registry, with 381 snapshots and 10 action tickets
    source: live /api/stats
---

## The problem

The Android security landscape changes every day: new CVEs, SDK and API changes, Play policy updates. A fraud or risk team can't watch all of it by hand, and an LLM summarizing raw feeds hallucinates and leaves no evidence trail. TransUnion wanted a pipeline that notices what changed and explains why it matters, with sources attached.

This was a team capstone. My part was the SENTINEL console, the FastAPI service behind it, and the evaluation and its fixes.

## How it works

<!-- flow -->

## Decisions and tradeoffs

- **Hash and threshold before any LLM call.** Most polls find nothing new. Checking a hash and a diff ratio first means noise never reaches the model and there are no wasted calls.
- **Retrieve over the delta, not the whole corpus.** DeltaRAG searches what changed, which keeps old, unchanged text from crowding out the new evidence.
- **One data contract, two sources.** The console reads either the live API or an offline dataset through the same interface, so the demo runs with no database and production needs no code change.
- **pgvector instead of a local vector store,** so each run is stateless. Because Vercel's serverless functions can't run long Python jobs, the database also acts as the message queue between stages.
- **Publish the null result.** The benchmark showed the extra layers didn't beat plain RAG, so the analytics page says that, with the y-axis running 0 to 100.

## What broke

- The analytics chart's y-axis started at 60, which made a spread of about one point look like a real difference. It now starts at 0.
- False-alarm queries scored a hard 0.0 on a metric that isn't defined for them, which dragged down the per-type table. They're now reported separately.
- The original README claimed AWS Lambda, Prometheus and IAM that the code never used. I removed those claims.
- Settings crashed at import when the database URL was empty. It now falls back to SQLite.

## Results

<!-- results -->

Retrieval quality is high, and it's the same with or without the DeltaRAG and graph layers, so I don't claim those layers helped. The 25 multi-hop queries scored 100% in every variant, which means the benchmark doesn't separate them yet.

## Limits and what's next

The benchmark doesn't discriminate between variants, retrieval never abstains, and the live change feed is a curated snapshot. Next is a harder benchmark built so the variants can actually win or lose, and an abstain path so the system can say "nothing relevant changed".
