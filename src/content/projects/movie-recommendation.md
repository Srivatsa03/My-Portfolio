---
title: Movie Recommendation (MLOps)
tagline: A team course project that served an SVD++ recommender through FastAPI with model routing, per-request provenance, data checks and CI.
category: Coursework
context: Responsible AI Engineering, team of 6
role: Built the provenance logging, build-time commit injection, the Kafka ingestion notebook and the Docker setup
dates: Mar 2025 - May 2025
status: Complete
order: 8
featured: false
cover: /projects/movie-recommendation.png
media:
  - src: /projects/media/movie-metrics.png
    alt: Line charts of click-through rate, watch-through rate and average rating over two weeks
    caption: The team's online telemetry over two weeks of simulated users. It shows the logging working end to end, not real engagement.
stack: [Python, FastAPI, Surprise, Docker, Jenkins, LaunchDarkly, Evidently]
links:
  - label: View the code
    href: https://github.com/Srivatsa03/Movie-Recommendation
flow:
  - name: Ingest
    detail: A Kafka extraction notebook turns the event stream into the processed training dataset.
  - name: Train and retrain
    detail: SVD++ with grid search, with dated snapshots kept for each retraining run.
  - name: Serve
    detail: A FastAPI recommendation endpoint in Docker. A LaunchDarkly flag picks which model variant answers, with a fallback when no key is set.
  - name: Provenance
    detail: Every response logs the user, model version, data version and the pipeline commit that built the container.
  - name: Checks
    detail: Schema validation, drift reports, a fairness check and offline and online evaluation.
  - name: CI
    detail: Jenkins runs formatting, tests and a full compose bring-up, then coverage.
results:
  - value: 312 of 316
    label: Logged recommendation calls that carry the exact commit that built the serving container
    source: provenance_logs/provenance_log.jsonl (the 4 without one predate the injection)
  - value: 30.7%
    label: Online click-through rate across 304 recommendation events from 100 simulated users
    source: evaluation/online, online_evaluation_report.json
  - value: 26
    label: Test functions across the API and pipeline
    source: tests/
---

## The problem

A recommender in a notebook is the easy part. The course asked for everything around it: serving, routing between model versions, knowing which model and which build produced a given recommendation, data checks and CI.

There were six of us. My part was provenance: every recommendation records the model version, data version and the exact pipeline commit. I also wrote the Kafka ingestion notebook and the Dockerfile, and added the GitHub Actions workflows after the course. Teammates built the LaunchDarkly routing, the Jenkinsfile and tests, model tuning and evaluation, and the drift and schema checks.

## How it works

<!-- flow -->

## Decisions and tradeoffs

- **Inject the commit hash at build time.** Jenkins passes it into the Docker build, with fallbacks to `git rev-parse` and then "unknown", so a container with no `.git` folder still logs where it came from.
- **A fallback flag client,** so the API still runs locally without a LaunchDarkly key.

## Results

<!-- results -->

<!-- media -->

## Limits

The schema check is a standalone script and doesn't run in CI, and there's no production traffic behind any of it.
