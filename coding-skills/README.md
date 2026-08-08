# Coding Skill Pack (portable across agents)

Six original, tool-agnostic Agent Skills that fix the most common ways an AI coding agent wastes your
time. They're the `SKILL.md` format read by Claude Code, and — as of 2026 — also by Codex, Cursor,
Copilot, and Gemini CLI, so they work wherever you drive the build.

## What's inside
| Skill | Fixes |
|---|---|
| `plan-first-tdd` | agent "solves the wrong problem confidently"; big-bang builds |
| `schema-first-contracts` | bad data propagating; untyped boundaries; unvalidated LLM output |
| `code-review-pass` | bugs/security issues slipping through before merge |
| `mock-first-providers` | can't run without keys; slow/flaky/paid tests; vendor lock-in |
| `debug-root-cause` | symptom-patching; fixing on a guess; recurring bugs |
| `python-repo-hygiene` | style noise in review; "works on my machine"; local-vs-CI drift |

## How they work together
`plan-first-tdd` sets the checkpoint loop → `schema-first-contracts` + `mock-first-providers` shape the
code → `code-review-pass` runs at each checkpoint's stop → `debug-root-cause` when a test fails →
`python-repo-hygiene` keeps the gate green. This is exactly the loop in the build prompt for the
fashion-ad-agent project, so the two packs reinforce each other.

## Install
- **Claude Code:** copy folders into `.claude/skills/` (personal) or the repo's `skills/`/`.claude/`
  tree (project-scoped, versioned with code). They load by description via progressive disclosure.
- **Other agents:** same folders; Codex/Cursor/Gemini CLI read the same `SKILL.md`.
- **Pair with the official bundled skills:** `/code-review` and `/security-review` ship in Claude Code;
  `superpowers` (community) is a heavier plan-first/TDD framework if you want more structure than
  `plan-first-tdd`. Get more from Anthropic's official repo: github.com/anthropics/skills.

## Security note
Skills can run shell commands and read files — treat every third-party skill like a dependency. Snyk's
2026 "ToxicSkills" scan found a large share of public skills had security flaws and some were
outright malicious, so read the `SKILL.md` (and any scripts) before trusting one. These six are
instructions-only (no scripts), so they're easy to audit.
