# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Sign up with email and password | US-001 | 1 | POST /auth/signup, api_backend, database, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Log in to my account | US-002 | 1 | POST /auth/login, api_backend, database, sessions, users | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-003 | EPIC-001 | Sign out and session expiry | US-003 | 2 | POST /auth/logout, api_backend, database, sessions | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-004 | EPIC-001 | Private per-user data | US-004, US-004-T1, US-004-T2, US-004-T3 | 1 | GET /budgets, GET /categories, GET /expenses, GET /me, api_backend, budgets, categories, database, expenses, sessions, users | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-005 | EPIC-001 | Delete my account and data | US-005 | 2 | DELETE /me, api_backend, budgets, categories, database, expenses, sessions, users | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-006 | EPIC-002 | Log an expense manually | US-006 | 3 | POST /expenses, api_backend, categories, database, expenses, web_spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-007 | EPIC-002 | Edit a logged expense | US-007 | 3 | PATCH /expenses/{id}, api_backend, database, expenses | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-008 | EPIC-002 | Delete a logged expense | US-008 | 3 | DELETE /expenses/{id}, api_backend, database, expenses | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-009 | EPIC-002 | View my expenses | US-009 | 3 | GET /expenses, api_backend, expenses, web_spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-010 | EPIC-003 | Use default categories out of the box | US-010 | 1 | GET /categories, api_backend, categories, database | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-011 | EPIC-003 | Add a custom category | US-011 | 2 | POST /categories, api_backend, categories, database | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-012 | EPIC-003 | Edit a category | US-012 | 2 | PATCH /categories/{id}, api_backend, categories, database | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-013 | EPIC-004 | Select my account currency | US-013 | 2 | PATCH /me, api_backend, database, users | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-014 | EPIC-005 | Set a monthly budget for a category | US-014 | 3 | PUT /budgets/{category_id}, api_backend, budgets, database | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-015 | EPIC-005 | Track spending against budget | US-015 | 4 | GET /budgets, api_backend, budgets, database, expenses | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-016 | EPIC-005 | Receive in-app alert when nearing or exceeding a budget | US-016 | 5 | GET /alerts, api_backend, budget_alerts, budget_scheduler, budgets, database | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-017 | EPIC-005 | Optional email notification for budget alerts | US-017 | 5 | PATCH /me, api_backend, budget_alerts, budget_scheduler, email_service, users | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-018 | EPIC-006 | View personal spending dashboard | US-018, US-018-T1, US-018-T2 | 4 | GET /reports/dashboard, api_backend, budget_alerts, budgets, database, expenses, web_spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-019 | EPIC-006 | View category breakdown | US-019 | 4 | GET /reports/breakdown, api_backend, database, expenses, web_spa | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-020 | EPIC-006 | View spending trends over time | US-020 | 5 | GET /reports/trends, api_backend, database, expenses, web_spa | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-021 | EPIC-007 | Export my data as CSV | US-021 | 5 | GET /expenses/export, api_backend, database, expenses | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-022 | EPIC-008 | Use the app on mobile and desktop browsers | US-022 | 6 | web_spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-023 | EPIC-008 | Use the app free of charge | US-023 | 1 | — | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
<!-- sdlc:auto:end matrix -->
