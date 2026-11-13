<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-13

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Flask
- Django REST Framework

## Decision Outcome

Chosen option: FastAPI 0.115, because Provides the lean REST API for auth, per-user CRUD, budget evaluation, report aggregation and CSV export, with Pydantic validation enforcing positive amounts and required fields, and Python data tooling making trend/breakdown math straightforward.

## Consequences

Async stack and typed models add a small learning curve; background scheduling is handled by AWS EventBridge rather than a built-in job system.
<!-- sdlc:auto:end adr -->