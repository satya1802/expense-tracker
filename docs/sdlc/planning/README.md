# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Private, password-protected user accounts: sign up, log in, stay within private per-user data, and delete account.

Scope: email+password signup/login, session sign-out and inactivity expiry, strict per-user data isolation, and full account/data deletion. Assumption stated in input: authentication is email+password only -- no social login, SSO, or multi-factor was discussed for this MVP.

**Related:** US-001, US-002, US-003, US-004, US-005

### EPIC-002 · approved · source: planning:EPIC-002

Manual expense logging with amount, category, date, and optional note, including edit, delete, and list views.

Expenses are entered manually only; bank/card import and receipt image upload are explicitly out of scope per the input.

**Related:** US-006, US-007, US-008, US-009

### EPIC-003 · approved · source: planning:EPIC-003

Default expense categories ship out of the box, with support for adding and renaming custom categories.

Categories classify expenses and drive per-category budgets.

**Related:** US-010, US-011, US-012

### EPIC-004 · approved · source: planning:EPIC-004

Each account uses a single user-selected currency applied consistently across expenses, budgets, and reports.

No multi-currency support or exchange-rate conversion is in scope.

**Related:** US-013

### EPIC-005 · approved · source: planning:EPIC-005

Per-category monthly budgets with in-app alerts when nearing or exceeding the limit, plus optional email alerts.

Budgets are monthly only -- no weekly or annual periods in this version. Email notification depends on a configured transactional email service (requires an email API key) and user opt-in; this is called out as an assumption in the input.

**Related:** US-014, US-015, US-016, US-017

### EPIC-006 · approved · source: planning:EPIC-006

Personal dashboard and reports showing current spending/budget status, category breakdown, and spending trends over time.

All figures shown in the user's selected currency. Input calls this out as a core value of the product alongside budgets.

**Related:** US-018, US-019, US-020

### EPIC-007 · approved · source: planning:EPIC-007

Users can export their expense data as a CSV file for personal copies or external use.

Personal financial data is handled under general, GDPR-style data-privacy expectations with no specific region named. Account deletion itself is covered under EPIC-001, not here.

**Related:** US-021

### EPIC-008 · approved · source: planning:EPIC-008

Delivered as a responsive web app usable on both desktop and mobile browsers, free of charge.

No native iOS/Android app is in scope. No payments, billing, or paid plans exist anywhere in the product.

**Related:** US-022, US-023

### SPRINT-1 · draft · source: planning:Sprint 1

Sprint 1 goal: stand up the authentication foundation -- signup, login, per-user data isolation, and default categories. Capacity 20 points.

Plan status is 'generated, version 1' (not marked approved). The input does not provide an explicit item-to-sprint assignment list; the stories linked here (US-001, US-002, US-004, US-010) are those whose scope matches this sprint's stated goal text. Related backend tasks under US-004 (US-004-T1 authentication dependency/session validation, US-004-T2 per-user scoping of data endpoints, US-004-T3 authorization test suite) fall under the per-user data isolation portion of this goal.

**Related:** EPIC-001, US-001, US-002, US-004, EPIC-003, US-010

### SPRINT-2 · draft · source: planning:Sprint 2

Sprint 2 goal: complete session lifecycle and account deletion; enable custom categories and account currency selection. Capacity 20 points.

Plan status is 'generated, version 1' (not marked approved). No explicit item-to-sprint mapping was given in the input; stories linked here (US-003, US-005, US-011, US-012, US-013) are those matching this sprint's stated goal text.

**Related:** US-003, US-005, US-011, US-012, US-013

### SPRINT-3 · draft · source: planning:Sprint 3

Sprint 3 goal: deliver core expense logging (create, edit, delete, view) and monthly budget setup. Capacity 20 points.

Plan status is 'generated, version 1' (not marked approved). No explicit item-to-sprint mapping was given in the input; stories linked here (US-006 through US-009, US-014) are those matching this sprint's stated goal text.

**Related:** US-006, US-007, US-008, US-009, US-014

### SPRINT-4 · draft · source: planning:Sprint 4

Sprint 4 goal: track spending against budgets and deliver the personal dashboard and category breakdown report. Capacity 20 points.

Plan status is 'generated, version 1' (not marked approved). No explicit item-to-sprint mapping was given in the input; stories linked here (US-015, US-018, US-019) are those matching this sprint's stated goal text. Backend/frontend tasks under US-018 (US-018-T1 dashboard aggregation endpoint, US-018-T2 dashboard summary screen) fall under the dashboard portion of this goal.

**Related:** US-015, US-018, US-019

### SPRINT-5 · draft · source: planning:Sprint 5

Sprint 5 goal: deliver in-app and email budget alerts, spending trends, and CSV export. Capacity 20 points.

Plan status is 'generated, version 1' (not marked approved). No explicit item-to-sprint mapping was given in the input; stories linked here (US-016, US-017, US-020, US-021) are those matching this sprint's stated goal text.

**Related:** US-016, US-017, US-020, US-021

### SPRINT-6 · draft · source: planning:Sprint 6

Sprint 6 goal: polish responsive layout across core screens for mobile and desktop. Capacity 20 points.

Plan status is 'generated, version 1' (not marked approved). No explicit item-to-sprint mapping was given in the input; stories linked here (US-022, US-023) are those matching this sprint's stated goal text.

**Related:** US-022, US-023
<!-- sdlc:auto:end narrative -->
