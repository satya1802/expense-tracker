# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Private, password-protected user accounts: sign up, log in, stay within private data, and delete account.

Assumption stated in plan: authentication is email+password only; no social login, SSO, or multi-factor was discussed for this MVP.

**Related:** US-001, US-002, US-003, US-004, US-005

### EPIC-002 · approved · source: planning:EPIC-002

Manual recording of expenses with amount, category, date, and optional note, plus editing and deleting.

Expenses are entered manually only -- bank/card import and receipt image upload are explicitly out of scope for this epic.

**Related:** US-006, US-007, US-008, US-009

### EPIC-003 · approved · source: planning:EPIC-003

Default expense categories shipped out of the box, plus user-created and editable custom categories.

Categories are used to classify expenses and set per-category budgets.

**Related:** US-010, US-011, US-012

### EPIC-004 · approved · source: planning:EPIC-004

Each account uses a single user-selected currency for all expenses and budgets.

No multi-currency support or exchange-rate conversion is included.

**Related:** US-013

### EPIC-005 · approved · source: planning:EPIC-005

Per-category monthly budgets with alerts when nearing or exceeding the limit.

Budgets are monthly only -- no weekly or annual periods in this version. Alerts appear in-app, with optional email notification delivered via a transactional email service (requires an email API key). Assumption: email notifications depend on a configured email service and the user opting in.

**Related:** US-014, US-015, US-016, US-017

### EPIC-006 · approved · source: planning:EPIC-006

A personal dashboard and reports showing spending trends over time and category breakdowns, all in the user's selected currency.

Noted in plan as a core value of the product alongside budgets.

**Related:** US-018, US-019, US-020

### EPIC-007 · approved · source: planning:EPIC-007

Users can export their expense data as CSV; personal financial data handled under general, GDPR-style privacy expectations.

No specific region is named for the GDPR-style handling. Account deletion itself is covered under the Account & Authentication epic (EPIC-001), not here.

**Related:** US-021

### EPIC-008 · approved · source: planning:EPIC-008

The application is delivered as a responsive web app usable on desktop and mobile browsers, free to use with no payments or billing.

No native iOS/Android app is in scope.

**Related:** US-022, US-023
<!-- sdlc:auto:end narrative -->
