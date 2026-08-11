---
title: "Hunting silent-correctness bugs in LLM infrastructure"
description: "Seven merged pull requests across LiteLLM, LlamaIndex, Pydantic, and Haystack. The pattern is always the same: no error, no warning, just quietly wrong."
date: "2026-06-05"
tags: ["open-source", "python", "correctness"]
image: "/blog/silent-bugs.svg"
imageAlt: "Silent-correctness bugs: seven merged fixes in LLM infrastructure."
---

The bugs I like are the ones that throw no error. No stack trace, no warning line, just output that is quietly wrong while everything reports success. Those are the ones that survive in production for months, because nothing is on fire.

Here are a few I found and fixed, all solo, in libraries a lot of people build on.

## A masker that leaked short secrets

LiteLLM's `SensitiveDataMasker` returned any secret of eight characters or fewer verbatim, an off-by-one threshold plus a zero-length boundary mask. Short redis passwords, API keys, and tokens were landing in logs and the admin UI in the clear. I made short values mask by default, kept the legitimate non-secret callers working through dependency injection, and audited all 16 call sites. (#30764, merged.)

## An ingestion pipeline that dropped your data

In LlamaIndex's `IngestionPipeline`, the upsert path keyed nodes by document id in a dict, so every chunk of a document except the last was silently dropped, never embedded, never stored. You would ingest a 40-page PDF and retrieve one page. I fixed both the sync and async paths with regression tests for each. (#22133, merged.)

## A schema config that vanished

In Pydantic, a `json_schema_extra` dict was silently dropped, and JSON-schema generation could crash, when a callable followed it in an `Annotated` type. The warning said the callable would be ignored; the code did the opposite. I made the behavior match the warning. (#13374, merged, approved by a core maintainer.)

## The pattern

A 10x embedding price error inflating everyone's cost reports. Parser corruption leaking marker characters into values. The common thread is that correctness bugs hide in the gap between what a warning promises and what the code does. You find them by reading carefully and distrusting the happy path.
