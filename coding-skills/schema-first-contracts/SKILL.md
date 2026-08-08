---
name: schema-first-contracts
description: >-
  Design typed, validated data contracts (Pydantic v2 / dataclasses / TypedDict / JSON Schema) BEFORE
  writing business logic, and validate at every boundary so malformed data fails loudly instead of
  propagating. Use this skill whenever building agent/service I/O, API request/response models, LLM
  structured outputs, message-passing between components, or anything with a shared state object.
  Trigger it even if the request is just "wire these steps together" — the contract comes first, and
  every cross-component output must be schema-validated.
---

# Schema-First Contracts

## Goal
Make invalid states unrepresentable and catch bad data at boundaries, so bugs surface where they
happen, not three components downstream.

## Core principle
**Define the schema before the logic.** Every value that crosses a boundary (agent→agent, API in/out,
LLM output, queue message) is a validated typed model. A malformed value raises a typed error and is
never silently passed on.

## When to use
- Multi-agent / multi-service systems; shared state; LLM structured outputs; public APIs.

## Procedure
1. **Model the data first.** For each boundary, write the input and output model with explicit types,
   constraints (ranges, enums, non-empty), and defaults. Prefer `Literal`/enums over free strings.
2. **Validate at the boundary.** Parse-don't-validate: accept raw input, parse into the model at the
   edge, and pass typed objects inward. Never thread raw dicts through logic.
3. **Round-trip test every contract.** Assert the model parses the canonical sample and rejects
   malformed variants. This is the cheapest, highest-value test you can write.
4. **Version the schema.** Add a `schema_version`; treat field renames/removals as major changes.
5. **For LLM outputs:** constrain to the schema (structured outputs / tool schema), and re-validate —
   never trust free text. On failure, one repair attempt, then a typed error.
6. **Keep one source of truth.** Don't redefine the same contract in two places; import it.

## Constraints
- No raw dicts across boundaries once a model exists.
- No "stringly-typed" enums; use `Literal`/Enum.
- Defaults must be valid; a default that fails validation is a bug.
- Don't loosen a schema to make bad data pass — fix the producer.

## Pydantic v2 pattern
```python
from pydantic import BaseModel, Field
from typing import Literal

class Result(BaseModel):
    schema_version: str = "1.0"
    status: Literal["ok", "blocked"]
    score: float = Field(ge=0, le=100)
    notes: list[str] = []

# boundary: parse raw -> typed, or raise
def handle(raw: dict) -> Result:
    return Result.model_validate(raw)   # raises on malformed input
```

## Validation
- Every boundary has an input and output model.
- Each model has a round-trip test (valid parses, malformed rejected).
- No component consumes unvalidated cross-boundary data.
