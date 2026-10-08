---
title: WuzzyFuzz
tagline: A fuzzy-logic language embedded in Scala 3, with fuzzy sets, logic gates, scoped variables, classes and partial evaluation.
category: Coursework
context: CS476 Programming Language Design
role: Solo
dates: Nov 2024
status: Complete
order: 11
featured: false
cover: /projects/wuzzyfuzz.png
stack: [Scala 3, sbt, ScalaTest]
links:
  - label: View the code
    href: https://github.com/Srivatsa03/WuzzyFuzz-03
flow:
  - name: Fuzzy sets
    detail: Union (max), intersection (min), complement, addition, multiplication, XOR and alpha-cuts.
  - name: Gates and assignment
    detail: A gate evaluates its inputs when they're known, and returns a partial result when one is still unresolved.
  - name: Scopes
    detail: Immutable maps chained to a parent, so lookups walk outward through enclosing scopes.
  - name: Partial evaluation
    detail: Constant folding over addition and multiplication, leaving unresolved parts as expressions.
  - name: Classes
    detail: Classes with inheritance, nested classes and method dispatch.
  - name: Tests
    detail: 31 ScalaTest cases covering the operators, scoping and classes.
results: []
---

## The problem

The assignment was to model fuzzy logic as language constructs, so programs reason with degrees of truth instead of booleans. The interesting part is evaluating an expression when some of its inputs aren't known yet: the language should simplify what it can and leave the rest as an expression.

## How it works

<!-- flow -->

## Decisions and tradeoffs

- **`Either[FuzzySet, String]` for values.** A value is either a resolved fuzzy set or the name of something not bound yet, so every operation has to handle the unresolved case explicitly.
- **Immutable scopes.** Assignment returns a new scope instead of mutating the old one, which keeps evaluation free of side effects.

## Limits

It's an embedded language, so programs are built as Scala case-class trees. There's no text parser, and the optimizer is constant folding. The grader also pointed out that partial evaluation of conditionals still needed values for variables that should have stayed symbolic. If I came back to it, that's the first thing I'd fix, and then I'd add a parser.
