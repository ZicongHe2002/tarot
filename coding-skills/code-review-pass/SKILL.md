---
name: code-review-pass
description: >-
  Run a structured, senior-engineer review of a diff or PR before it merges — correctness, security,
  tests, error handling, readability, and design — and report findings by severity with concrete fixes.
  Use this skill whenever code is about to be committed/merged, whenever someone says "review this",
  "is this ready to ship", or "look over my changes", and at the end of every build checkpoint.
  Trigger it even if the change looks small — the bug you ship at 6pm is usually in the "small" diff.
---

# Code Review Pass

## Goal
Catch the defects and risks a human reviewer would, in a repeatable order, and report them so they're
easy to act on — complementing human review, not replacing it.

## When to use
- Before commit/merge; at the end of each `plan-first-tdd` checkpoint; on request.

## Procedure — review the DIFF in this order
1. **Correctness** — does it do what it claims? Off-by-one, edge cases, null/empty, boundary values,
   concurrency, error paths, wrong operator/condition.
2. **Security** — injection (SQL/command/template), untrusted input reaching a sink, secrets in code/
   logs, authz gaps, unsafe deserialization, dependency risk, path traversal, SSRF.
3. **Tests** — is the new behavior tested? Are failure paths tested, not just the happy path? Do tests
   assert behavior, not implementation? Any flaky/order-dependent tests?
4. **Error handling** — failures surface loudly and early; no silent excepts; typed/clear errors;
   resources released; retries bounded.
5. **Readability & design** — clear names, small functions, no dead code, no needless abstraction,
   consistent style, comments explain *why* not *what*, no copy-paste that should be shared.
6. **Scope** — does the diff do only what was asked? Flag unrelated changes and scope creep.

## Output format
Group findings by severity; for each give file:line, the problem, why it matters, and a concrete fix.
```
[BLOCKER] auth.py:42 — user input concatenated into SQL. Why: injection. Fix: parameterize the query.
[HIGH]    api.py:88 — bare `except:` swallows errors. Why: hides failures. Fix: catch specific + log.
[MEDIUM]  util.py:12 — no test for empty-list path. Fix: add a test asserting [] returns 0.
[LOW]     views.py:5 — name `data2` is unclear. Fix: rename to `parsed_rows`.
```

## Constraints
- Review the diff, not the whole repo, unless asked.
- Every finding needs a concrete fix, not "consider improving".
- Distinguish blocking issues (correctness/security) from taste.
- Don't rewrite the whole file; point to the specific change.

## Validation
- Findings are severity-tagged with file:line and a concrete fix.
- Security and test coverage are always considered, even for small diffs.
- Scope creep is flagged.
