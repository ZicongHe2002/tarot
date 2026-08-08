---
name: debug-root-cause
description: >-
  Diagnose a bug or failing test by reproducing it, isolating the cause, and fixing the ROOT cause with
  a regression test — instead of guessing or patching symptoms. Use this skill whenever a test fails,
  an exception or stack trace appears, behavior is wrong or flaky, or someone says "why is this
  broken / this doesn't work / it worked yesterday". Trigger it even if a quick fix seems obvious —
  reproduce and confirm the cause before changing code.
---

# Debug Root Cause

## Goal
Fix the actual cause once, with a test that fails before the fix and passes after — not a symptom
patch that returns next week.

## Core principle
**Reproduce before you fix.** A bug you can't reproduce, you can't confirm you fixed. Never change code
on a guess about a failure you haven't seen.

## Procedure
1. **Reproduce reliably.** Get a minimal, repeatable trigger. If it's flaky, find what makes it flaky
   (order, timing, state, randomness, external service) before anything else.
2. **Read the actual error.** The stack trace / assertion usually names the site. Don't skim it.
3. **Isolate.** Binary-search the input, the commit history (`git bisect`), or the code path. Add
   temporary logging/assertions at the boundaries to see where good input becomes bad.
4. **Form one hypothesis** about the root cause and test it — confirm the mechanism, not just the
   symptom. Ask "why" until you reach the real cause, not the first suspicious line.
5. **Write a failing test** that captures the bug at the right level (unit if possible).
6. **Fix the root cause.** Smallest change that makes the failing test pass without breaking others.
7. **Re-run the full suite** + lint + types. Remove temporary logging.

## Constraints
- No fix without a reproduction and a test that fails first.
- Fix the cause, not the symptom (don't `try/except` around a bug you don't understand).
- Don't broaden a fix beyond what the test requires.
- If the cause is in a dependency or unclear input contract, surface it rather than working around it
  silently.

## Common root-cause buckets to check
State/ordering, off-by-one/boundary, null/empty, type coercion, timezone/encoding, caching/staleness,
concurrency/races, unhandled error paths, external-service failure, config/env differences.

## Validation
- A reproduction exists and is captured as a test that failed before the fix.
- The full suite is green after the fix.
- Temporary debug code is removed.
