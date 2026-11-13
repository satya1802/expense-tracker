<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-13

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because Builds the responsive, form-and-chart expense/budget/report screens as a SPA served from its own origin, reading the API base URL from VITE_API_BASE_URL and sending the session token as a Bearer header.

## Consequences

A SPA needs its own build/hosting pipeline and client-side routing; charting and date handling come from ecosystem libraries rather than the framework itself.
<!-- sdlc:auto:end adr -->