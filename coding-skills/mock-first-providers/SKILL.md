---
name: mock-first-providers
description: >-
  Build systems that depend on external services (LLM APIs, vision, search, databases, payment) behind
  a clean interface with a MOCK default, so the whole app runs and tests with zero API keys and one
  flag flips to real. Use this skill whenever integrating any third-party API or model, whenever a
  demo must run offline/without secrets, and whenever tests would otherwise hit a paid or flaky
  network service. Trigger it even if the task is "just call the API" — wrap it behind an interface
  with a mock first.
---

# Mock-First Providers

## Goal
Make every external dependency swappable and mockable so the system runs end-to-end with no keys, and
so tests are fast, deterministic, and free — with real providers a single flag away.

## Core principle
**Depend on an interface, not a vendor.** Ship a `Mock*` implementation as the default. Real providers
implement the same interface and are enabled by config/flag, never hard-wired into logic.

## When to use
- Any LLM/vision/search/DB/payment integration; demos; CI; anything with secrets or network cost.

## Procedure
1. **Define the interface** for the capability, not the vendor: e.g. `LLMProvider.complete(prompt) ->
   str`, `VisionProvider.analyze(image) -> ProductFacts`. Keep it minimal.
2. **Write the mock first.** Deterministic, fixture-backed outputs that exercise the real code paths
   (including error/edge cases). The mock is the default.
3. **Put real providers behind a flag.** `PROVIDER=mock|openai|gemini`. Selection lives in one factory,
   not scattered `if` checks.
4. **Never leak the vendor upward.** Callers see the interface only. Prompt text, retries, and parsing
   live in the adapter.
5. **Record traces the same way** for mock and real (latency, cost, tokens) so switching providers
   doesn't change observability.
6. **Test against the mock; smoke-test the real path** separately, opt-in, keys from env only.

## Constraints
- No API keys required to run the app or the test suite.
- No secrets in code, fixtures, logs, or errors — env/secret-store only.
- One selection point (a factory), not vendor `if`s throughout the code.
- Mocks must exercise real code paths, including failures — a mock that always returns success hides
  bugs.

## Pattern
```python
class LLMProvider(Protocol):
    def complete(self, prompt: str, **kw) -> str: ...

class MockLLM:
    def complete(self, prompt, **kw): return FIXTURES.get(hash_key(prompt), "…mock…")

def make_llm(cfg) -> LLMProvider:
    return {"mock": MockLLM, "openai": OpenAILLM, "gemini": GeminiLLM}[cfg.provider](cfg)
```

## Validation
- App + tests run green with `PROVIDER=mock` and no keys set.
- Swapping to a real provider changes no caller code.
- Traces are emitted identically for mock and real.
