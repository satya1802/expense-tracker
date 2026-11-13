# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Stand up authentication foundation: signup, login, per-user data isolation, and default categories.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Sign up with email and password | 5 | backend-agent | — |
| US-002 | Story | Log in to my account | 3 | backend-agent | US-001 |
| US-004 | Story | Private per-user data | 8 | backend-agent | US-002 |
| ↳ US-004-T1 | Task | Implement authentication dependency and session validation | — | backend-agent | — |
| ↳ US-004-T2 | Task | Apply per-user scoping to data endpoints | — | backend-agent | — |
| ↳ US-004-T3 | Task | Add authorization test suite | — | qa-agent | — |
| US-010 | Story | Use default categories out of the box | 2 | backend-agent | US-001 |
| US-023 | Story | Use the app free of charge | 1 | qa-agent | US-001 |

## Sprint 2: Sprint 2

Complete session lifecycle and account deletion; enable custom categories and account currency selection.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-003 | Story | Sign out and session expiry | 5 | backend-agent | US-002 |
| US-005 | Story | Delete my account and data | 5 | backend-agent | US-004 |
| US-011 | Story | Add a custom category | 3 | backend-agent | US-010, US-004 |
| US-012 | Story | Edit a category | 2 | backend-agent | US-011 |
| US-013 | Story | Select my account currency | 3 | backend-agent | US-001 |

## Sprint 3: Sprint 3

Deliver core expense logging (create, edit, delete, view) and monthly budget setup.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-006 | Story | Log an expense manually | 5 | backend-agent | US-004, US-010 |
| US-007 | Story | Edit a logged expense | 3 | backend-agent | US-006 |
| US-008 | Story | Delete a logged expense | 2 | backend-agent | US-006 |
| US-009 | Story | View my expenses | 3 | frontend-agent | US-006 |
| US-014 | Story | Set a monthly budget for a category | 5 | backend-agent | US-011, US-004 |

## Sprint 4: Sprint 4

Track spending against budgets and deliver the personal dashboard and category breakdown report.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-015 | Story | Track spending against budget | 5 | backend-agent | US-014, US-006 |
| US-018 | Story | View personal spending dashboard | 8 | backend-agent | US-006, US-015, US-013 |
| ↳ US-018-T1 | Task | Implement dashboard aggregation endpoint | — | backend-agent | — |
| ↳ US-018-T2 | Task | Build dashboard summary screen | — | frontend-agent | — |
| US-019 | Story | View category breakdown | 5 | backend-agent | US-006, US-011 |

## Sprint 5: Sprint 5

Deliver in-app and email budget alerts, spending trends, and CSV export.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-016 | Story | Receive in-app alert when nearing or exceeding a budget | 5 | backend-agent | US-015 |
| US-017 | Story | Optional email notification for budget alerts | 5 | integration-agent | US-016 |
| US-020 | Story | View spending trends over time | 5 | backend-agent | US-006 |
| US-021 | Story | Export my data as CSV | 3 | backend-agent | US-006 |

## Sprint 6: Sprint 6

Polish responsive layout across core screens for mobile and desktop.

Capacity: 20 points · Committed: 5

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-022 | Story | Use the app on mobile and desktop browsers | 5 | frontend-agent | US-006, US-018 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
