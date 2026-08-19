---
title: "Failing safe and failing silently are the same mechanism"
description: "A component I built so it could never break the main path turned out to be able to hide its own bugs. The two properties arrive together, and separating them took a per-request connection and a real socket."
date: "2026-08-18"
tags: ["kubernetes", "agents", "sre", "reliability"]
image: "/blog/failing-safe.png"
imageAlt: "kubemend: failing safe and failing silently are the same mechanism."
---

kubemend is a Kubernetes remediation agent whose only write surface is a git commit. Its incident log is deliberately non-load-bearing: if the journal cannot be written, the write degrades to a note in the output and the run keeps going. Failing to fix a broken cluster because a log file was read-only would be a bad trade.

That reasoning is sound, and it is also the whole problem. Every component built so it can never break the main path is, by the same mechanism, a component that can hide its own defects. The second property arrives free with the first.

Here is how it showed up. The read-only console was built on the same journal. SQLite connections are bound to the thread that created them, the server was threaded, so every request after the first raised, and the raise was swallowed by the exact error handling that exists so bookkeeping can never break remediation. The user saw an empty list, rendered as "no incidents". That is the worst available failure: a wrong answer indistinguishable from a valid one. A crash would have been better. An error banner would have been better. "No incidents recorded" is a sentence the reader has no reason to doubt.

Two changes came out of it. The console now opens a connection per request instead of sharing one, which is cheap for SQLite and has the nice side effect that a console reading a file a run is still appending to shows what was just written. And the regression test drives a real socket, because an in-process call to the router would have passed happily against the broken design. The test was verified to fail against the old code before it was trusted.

The rule I took away: when a component is designed to swallow errors, something outside it has to be able to see them. The journal already exposed its `available` and `error` state, and the CLI printed it. That path existed. Nothing consumed it on the read side, and that gap was the bug.

This is one of seven findings from building an agent that is allowed to change production. The rest are in the repo's [findings write-up](https://github.com/Srivatsa03/kubemend/blob/main/docs/FINDINGS.md), alongside a [threat model](https://github.com/Srivatsa03/kubemend/blob/main/docs/THREAT-MODEL.md) and an [evaluation](https://github.com/Srivatsa03/kubemend/blob/main/docs/EVALUATION.md).
