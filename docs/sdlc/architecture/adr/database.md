<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-13

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because Stores users, categories, expenses, budgets and alerts with exact numeric money columns and does date- and category-based GROUP BY aggregation for dashboard, breakdown and trend reports directly in the database, with cascade deletes for GDPR-style erasure.

## Consequences

Requires a managed instance (RDS) to operate and back up; heavier than a file database for a lightweight app but gives referential integrity and reliable monetary totals.
<!-- sdlc:auto:end adr -->