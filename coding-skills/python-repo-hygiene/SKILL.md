---
name: python-repo-hygiene
description: >-
  Set up and maintain a clean Python project — ruff + mypy + black + pytest, a sane src layout, pinned
  deps, and a green pre-commit/CI gate — so quality checks run automatically instead of by memory. Use
  this skill when bootstrapping a Python repo, when a project lacks linting/typing/tests config, when
  builds pass locally but fail in CI, and when someone asks to "set up the project" or "add tooling".
  Trigger it even for a small script that's about to grow — hygiene is cheapest at the start.
---

# Python Repo Hygiene

## Goal
A project where formatting, linting, typing, and tests are automated and green, so reviewers spend
their attention on logic, not style.

## When to use
- New repo bootstrap; adding tooling to an untooled project; fixing local-vs-CI drift.

## The baseline (Python 3.11+)
- **Layout:** `src/<package>/`, `tests/`, `pyproject.toml`. Import the package, don't rely on cwd.
- **Format:** `black` (or `ruff format`).
- **Lint:** `ruff check` (fast; covers most flake8/isort/pyupgrade rules).
- **Types:** `mypy src` (start lenient, tighten over time; type public function signatures first).
- **Tests:** `pytest`; fixtures for setup; one smoke test that runs the whole happy path.
- **Deps:** pin them (lockfile or pinned `pyproject`); separate dev deps.
- **Gate:** pre-commit hooks + a CI job running the exact same commands as local.

## Procedure
1. Create the `src/` layout and `pyproject.toml` with ruff/black/mypy/pytest config in one place.
2. Add a `Makefile` or task runner so `make check` == what CI runs (kills "works on my machine").
3. Add pre-commit hooks for format + lint (+ type/test if fast enough).
4. Ensure the suite runs with **no external services or secrets** (pairs with `mock-first-providers`).
5. Add a README "local run" section: install, `make check`, run.

## `make check` target (the one command that must stay green)
```makefile
check:
	ruff check .
	black --check .
	mypy src
	pytest -q
```

## Constraints
- CI runs the *same* commands as local — no divergence.
- Don't commit secrets, `.env`, caches, or build artifacts (`.gitignore` them).
- Don't disable a lint/type rule to silence a real problem; fix it or scope the ignore with a comment.
- Keep config in `pyproject.toml`, not scattered dotfiles, where practical.

## Validation
- `make check` is green locally and in CI, with no keys set.
- A new clone runs the suite from the README instructions alone.
- Formatting/linting are automated (pre-commit), not manual.
