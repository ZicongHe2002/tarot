---
name: plan-first-tdd
description: >-
  Enforce a plan-first, test-driven, checkpoint-based build loop so the agent understands the task
  before writing code and stops to show work before drifting. Use this skill at the START of any
  non-trivial coding task, whenever a request is more than a one-line change, whenever a build spans
  multiple files or steps, and whenever previous attempts "solved the wrong problem confidently".
  Trigger it even if the user just says "build X" — planning and a failing test come before
  implementation, always.
---

# Plan-First TDD (checkpoint discipline)

## Goal
Prevent the most expensive agent failure — confidently building the wrong thing — by forcing:
**plan → agree → test → code → show → repeat**, in small checkpoints.

## Core loop
1. **Restate the task** in your own words + list assumptions. If any assumption is load-bearing and
   uncertain, ask before coding.
2. **Write a short plan**: the checkpoints, each with a definition of done. Keep each checkpoint small
   enough to review in a few minutes.
3. **Get agreement** on the plan before writing implementation code.
4. **Per checkpoint:** write the test first (or the smallest failing test that captures the
   requirement), then the code to pass it.
5. **Run the gate:** tests + lint + types must be green. No checkpoint "finishes" with skipped or
   failing tests.
6. **STOP and show:** the diff, the test/lint/type output, and a 3–5 line summary. Wait for approval
   before the next checkpoint.

## When to use
- Any multi-step or multi-file change; new modules; refactors; anything with a spec.

## Constraints
- Never batch multiple checkpoints without a review in between — that's where drift and wasted tokens
  come from.
- Don't expand scope silently. If you think something extra is needed, propose it and wait.
- Don't invent requirements or APIs. If a detail isn't specified and isn't inferable, ask.
- Prefer the smallest change that satisfies the test over a clever general solution.

## Anti-patterns this skill kills
- "Big-bang" builds that touch 20 files before any test runs.
- Solving an adjacent, more interesting problem than the one asked.
- Marking work done with red or skipped tests.
- Silent scope creep dressed up as helpfulness.

## Checkpoint template (use per unit of work)
```
Checkpoint N — <name>
  Goal: <one sentence>
  Test(s): <what proves it works>
  Done when: tests + lint + types green; <observable behavior>
  Show: diff + output + 3-5 line summary; STOP for review.
```

## Validation
- A plan with checkpoints exists before implementation code.
- Each checkpoint has a test written before/with the code.
- The agent stops after each checkpoint instead of running ahead.
