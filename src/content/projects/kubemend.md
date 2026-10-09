---
title: kubemend
tagline: A Kubernetes remediation tool that holds no cluster credentials. Its only write is a git commit, so every fix it makes can be undone with git revert.
category: Open source
context: Technical report and live demo
role: Author
dates: Aug 2026 - Present
status: v0.2.0, alpha
order: 3
featured: true
cover: /projects/media/kubemend-console-crop.jpg
hero: /projects/media/kubemend-demo.gif
heroAlt: kubemend committing a fix, watching it recover, and reverting a second fix that did not hold
media:
  - src: /projects/media/kubemend-console-crop.jpg
    alt: The kubemend incident console showing two incidents, one verified and one reverted
    caption: The read-only incident console after the demo. One fix was verified and kept, and the other was reverted when the workload kept failing.
stack: [Python, Kubernetes, k3d, Git, GitHub Actions, SQLite]
links:
  - label: View the code
    href: https://github.com/Srivatsa03/kubemend
  - label: Docs and demo
    href: https://srivatsa03.github.io/kubemend/
  - label: Technical report (PDF)
    href: https://github.com/Srivatsa03/kubemend/blob/main/docs/kubemend-report.pdf
flow:
  - name: Detect
    detail: Eight read-only rules (crash loops, OOM kills, image pull failures, bad config, stuck rollouts, replica shortfalls, unschedulable pods, flapping) run against a live cluster or a recorded snapshot.
  - name: Plan
    detail: A deterministic planner picks one plan per incident from a closed set of six typed actions, each carrying the state it found and the state it intends. When no safe action exists, it abstains.
  - name: Gate
    detail: A pure policy function checks protected namespaces, deny-by-default action kinds, a computable undo, blast radius, a rate limit and an autonomy ceiling, before anything is written.
  - name: Emit
    detail: The fix becomes a one-line diff in the GitOps repo. In apply mode it commits to mainline, and in propose mode it opens a branch and pull request for a human.
  - name: Verify
    detail: A fix counts as healthy only after two consecutive clean reads. If the workload is still failing, kubemend reverts its own commit.
  - name: Record
    detail: An append-only SQLite journal tracks every incident, the revert rate and repeat offenders, shown in a read-only local console.
results:
  - value: 26 s
    label: Time for a good fix to recover in the live demo, after which the commit was kept
    source: demo transcript, real k3d cluster
  - value: 76 s
    label: Time before a bad fix was judged still failing and its commit reverted automatically
    source: same demo run
  - value: 13 to 4
    label: Findings on a recorded broken cluster, reduced to plans, with 5 findings deliberately producing no action
    source: EVALUATION.md, recorded fixture
  - value: 2, 1, 1
    label: Plans applied, proposed for review, and refused under the conservative policy
    source: EVALUATION.md
  - value: 195
    label: Tests, with zero runtime dependencies, and a CI job that runs the real-cluster demo on every push
    source: pytest collection and EVALUATION.md
---

## The problem

Plenty of tools will read your cluster and tell you what they think is wrong. Almost none are trusted to act on it, because nobody has a convincing answer to what stops the tool doing something catastrophic at 3am. "The model is usually careful" isn't an answer.

kubemend's answer is that every constraint on it is code with tests. It diagnoses freely and acts narrowly.

## How it works

<!-- flow -->

<!-- media -->

The planner is deterministic and there's no model in the loop yet. That's on purpose. The safety layer has to hold before anything smarter gets to propose changes.

## Decisions and tradeoffs

- **Write through git, not the Kubernetes API.** Undo, audit and review come for free, because a fix is just a commit and undoing it is git revert. The alternative meant holding cluster credentials and building my own undo system.
- **Surgical text edits instead of parsing and re-dumping YAML.** A one-value change produces a one-line diff a reviewer can read. The cost is more fragile editing code and an extra test suite to cover it.
- **A closed set of typed actions instead of shell commands or raw manifests.** Each action can be listed, its blast radius computed before it runs, and undone mechanically, because the inverse is just the before and after values swapped.
- **Never revert on an unreadable poll.** If the cluster can't be read, the result is indeterminate, so it neither keeps nor reverts the fix.
- **Demotion stops at propose.** When a workload's fixes keep failing, kubemend loses the right to apply them, but it keeps proposing, so it never goes quiet right after a failure.

## What broke

Wiring it up to a real Argo CD setup exposed three bugs that a full green test suite had missed:

- Apply mode committed the fix but never pushed it, so kubemend would have reverted a correct fix that was never delivered. 33 GitOps tests had been running without a remote.
- Every revert SHA it reported was dangling, because it read HEAD before amending the commit.
- Git hung at credential prompts, and the suite slowed from 13 seconds to 346.

Separately, the console showed "no incidents" because the SQLite connection was bound to the thread that created it, and the journal's fail-safe swallowed the error. Each fix shipped with a test that would have caught it.

## Results

<!-- results -->

These come from injected incidents on a local k3d cluster and a recorded snapshot. They show the mechanism working end to end. They aren't production accuracy numbers.

## Limits and what's next

There's no production deployment yet, no measured precision or recall for the planner, and only Deployments are covered, so no StatefulSets, DaemonSets or Jobs. The console has no auth and the journal isn't tamper-evident. The Argo CD end-to-end run is still unfinished. After that comes a model layer that can propose actions, kept behind the same policy gate.
