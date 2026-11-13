# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-STACK · approved · source: requirements:tech-stack

Product owner approved the exact technology stack: FastAPI backend, PostgreSQL database, React frontend, hosted on AWS.

- Backend: FastAPI 0.115 -- handles authentication, per-user expense/budget storage, monthly budget-limit checks, CSV export, and spending-trend/category-breakdown calculations.
- Database: PostgreSQL 16 -- stores structured financial data (expenses, categories, budgets, accounts) with exact money amounts, enforces per-user record validity, and performs date/category grouping for reports.
- Frontend: React 19 -- responsive desktop/mobile web UI for logging expenses, editing budgets, and viewing live-updating trend charts and category breakdowns.
- Cloud: AWS -- hosts the app, managed Postgres database, scheduled budget-alert checks, and backups under one account for GDPR-style privacy handling.
Design must use exactly these; no substitutions.

### REQ-SERVICES · approved · source: requirements:services

SendGrid is the approved transactional email service, used for optional budget alert emails and account-related emails.

- Email: SendGrid (SaaS), configured via env var SENDGRID_API_KEY.
- Purpose: send optional budget-limit/near-limit alert emails and transactional account emails (sign-up, password reset) via API key, without running a mail server.
- Required API key for this app: SENDGRID_API_KEY.

**Related:** NFR-008

### REQ-SCOPE · approved · source: requirements:scope

Delivery scope is lightweight, requirements version 1, approved. Defines what capabilities are in and out of scope.

In scope: email/password sign-up and login; private per-user data; manual expense entry (amount, category, date, note); edit/delete expenses; add/edit custom categories; single currency per account; per-category monthly budgets; personal spending/budget dashboard; default expense categories provided out of the box.
Out of scope (not to be designed or built): bank/card import (connecting accounts or importing statements); receipt image upload/attachment per expense; native iOS/Android mobile apps.

### REQ-FEAT-SIGNIN · approved · source: requirements:functional:Sign-in & accounts

Email/password account sign-up, login, sign-out, and full account+data deletion.

- Sign up with email and password: creates account and signs user in; refused with clear message if email already in use, or if email/password invalid.
- Log in: registered user signs in with email+password and is taken to dashboard; incorrect details leave user signed out.
- Sign out: ends session, requiring login again before accessing data.
- Delete account and data: from account settings, signed-in user can request and confirm deletion, permanently removing account, expenses, budgets, custom categories, and ending active session; login with deleted credentials subsequently fails.

**Related:** NFR-002, NFR-003, NFR-004, NFR-005, NFR-008

### REQ-FEAT-EXPENSES · approved · source: requirements:functional:Logging expenses

Manual expense entry, editing, deletion, and listing.

- Log an expense manually: positive amount, chosen category, date, optional note, saved in selected currency, shown in expense list; refused with validation message if required field missing or amount invalid/non-positive.
- Edit a logged expense: change amount, category, date or note; updates reflected in list, budgets, and reports; invalid changes rejected with validation message.
- Delete a logged expense: removable after confirmation; no longer counts toward budgets or reports.
- View my expenses: list shows amount, category, date, note, most recent readily visible; empty state invites first entry when none logged.

**Related:** NFR-001

### REQ-FEAT-CATEGORIES · approved · source: requirements:functional:Expense categories

Default categories provided out of the box, plus user-defined custom categories and renaming.

- Use default categories out of the box: new accounts already have sensible default categories available for logging expenses or viewing the category list.
- Add a custom category: non-empty, non-duplicate name required; becomes selectable for expenses and budgets; empty/duplicate names rejected with validation message.
- Rename a category: non-empty, non-duplicate new name required; new name shown everywhere the category appears, including existing expenses and budgets.

### REQ-FEAT-CURRENCY · approved · source: requirements:functional:Account currency

Single currency selection per account applied consistently to all amounts.

- Choose account currency: user selects a single currency; all expense amounts, budgets, and reports recorded and displayed in it.
- If no currency chosen when first expense is logged, a default currency is applied and can be changed later in settings.

### REQ-FEAT-BUDGETS · approved · source: requirements:functional:Budgets & alerts

Per-category monthly budgets with spend tracking and in-app plus optional email alerts.

- Set a monthly budget for a category: positive limit stored and used for current-month tracking going forward; non-positive/invalid amounts rejected with validation message.
- Track spending against budget: for each budgeted category, shows amount spent, limit, and remaining for the current month in selected currency; spent amount resets at start of new calendar month while limit carries over.
- In-app budget alerts: warns when spending reaches near-limit threshold, and again when it exceeds the limit.
- Optional email budget alerts: emailed to account address when email service is configured and user has opted in; otherwise no email sent but in-app alert still appears.

**Related:** REQ-SERVICES

### REQ-FEAT-REPORTS · approved · source: requirements:functional:Dashboard & reports

Personal dashboard, category breakdown, and spending trends reporting.

- Personal spending dashboard: summarizes current-month spending and budget status in selected currency; empty state invites first expense log when none exist.
- Category breakdown report: shows total spent per category for a period in selected currency.
- Spending trends report: shows total spending changes over time, comparing periods, in selected currency.

### REQ-FEAT-EXPORT · approved · source: requirements:functional:Data export & privacy

CSV export of expense data, including empty-state export.

- Export my data as CSV: produces a file containing amount, category, date, and note for all expenses.
- When no expenses exist, a valid CSV with headers and no data rows is produced.

**Related:** NFR-006

### REQ-FEAT-WEBACCESS · approved · source: requirements:functional:Web access

App is fully free to use with no paid tiers or billing flows.

- Free to use: user can use every feature of the app without ever being asked to pay, enter billing details, or choose a plan.

**Related:** NFR-007

### NFR-001 · approved · source: requirements:NFR-001

[privacy] Each signed-in user sees and changes only their own data.

Every signed-in user can see and change only the expenses, budgets, and categories belonging to their own account, and can never view or modify another user's data in any list, report, record, or API resource.

**Related:** REQ-FEAT-EXPENSES, REQ-FEAT-SIGNIN

### NFR-002 · approved · source: requirements:NFR-002

[security] Unauthenticated requests to protected resources are rejected.

A request to any protected page or API resource is rejected and the user is prompted to log in unless they are signed in.

**Related:** REQ-FEAT-SIGNIN

### NFR-003 · approved · source: requirements:NFR-003

[security] Passwords are stored only as hashes.

User passwords are stored only in hashed form and never in plain text.

**Related:** REQ-FEAT-SIGNIN

### NFR-004 · approved · source: requirements:NFR-004

[security] Sessions end on sign-out and expire after inactivity.

A user's session ends when they sign out and expires after a period of inactivity, after which an expired session is rejected and they must log in again; deleting an account also ends its active session.

**Related:** REQ-FEAT-SIGNIN

### NFR-005 · approved · source: requirements:NFR-005

[security] Login failures reveal nothing about which field was wrong.

A failed login shows a generic failure message that does not reveal whether the email or the password was wrong.

**Related:** REQ-FEAT-SIGNIN

### NFR-006 · approved · source: requirements:NFR-006

GDPR-style: right to erasure. Personal financial data handled under general, GDPR-style privacy expectations with full account/data erasure on request. For human confirmation, not legal advice.

Personal financial data is handled under general, GDPR-style data-privacy expectations, and a user can permanently and completely erase their account and all associated expenses, budgets, and custom categories on request. No specific jurisdiction is named.

**Related:** REQ-FEAT-EXPORT, REQ-FEAT-SIGNIN

### NFR-007 · approved · source: requirements:NFR-007

[usability] Responsive on both mobile and desktop browsers.

The app is a responsive web app usable in both mobile and desktop browsers: on small screens the layout adapts and all core actions (log expense, budgets, reports) remain usable without horizontal scrolling; on desktop the layout uses available space with all features accessible.

**Related:** REQ-FEAT-WEBACCESS

### NFR-008 · approved · source: requirements:NFR-008

[security] (accepted risk) Email+password authentication only; no MFA/SSO/social login.

Authentication is by email and password only; no multi-factor authentication, single sign-on, or social login is provided in this version. This is an accepted risk per the requirements.

**Related:** REQ-FEAT-SIGNIN
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-13

**Capabilities in scope:** Email and password account sign-up and login, Private per-user data (user sees only their own records), Manual expense entry with amount, category, date and note, Edit and delete logged expenses, Add and edit custom expense categories, Single currency selection per account, Per-category monthly budget setup, Personal spending and budget dashboard, Set of default expense categories provided out of the box

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The backend work here is well-defined: authenticate a user, store and return only their expenses and budgets, run the monthly budget-limit checks, and generate CSV exports. FastAPI is a lean Python framework that does this cleanly, and Python's data tooling makes the spending-trend and category-breakdown calculations straightforward to write and verify. |
| cloud | AWS | You need somewhere to host the web app, the database, and the scheduled budget-alert checks, with room to grow if the free app gains users. AWS covers all of this with managed Postgres and reliable email-friendly infrastructure, and keeps everything — app, data, backups — under one account you control for the GDPR-style privacy handling you asked for. |
| database | PostgreSQL | Every core feature is structured financial data — expenses, categories, per-category monthly budgets, user accounts — with exact money amounts that must add up correctly in reports. PostgreSQL stores this reliably, enforces that each user only has valid records, and does the date- and category-based grouping your trend and breakdown reports need directly in the database. |
| frontend | React | Your product is a responsive web app that people use in both desktop and mobile browsers, and its screens are interactive: logging expenses, editing budgets, and viewing trend charts and category breakdowns that update as data changes. React handles exactly this kind of live, form-and-chart interface, and its large ecosystem gives you ready-made charting and date components so the reporting views don't have to be built from scratch. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Account & Authentication

Private, password-protected user accounts. Each user signs up with an email and password, logs in, stays within their own private data, and can delete their account. Assumption: authentication is email+password only; no social login, SSO, or multi-factor was discussed for this MVP.

### US-001: Sign up with email and password

**Priority:** critical

> As a new visitor, I want to create an account with my email and a password, so that I have a private space to track my own expenses and budgets.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am on the sign-up page and no account exists for my email | I submit a valid email and a password that meets the minimum requirements | my account is created, my password is stored only in hashed form (never in plain text), and I am signed in |
| AC-002 | I am on the sign-up page | I submit an email that already has an account | the account is not created and I am told the email is already in use |
| AC-003 | I am on the sign-up page | I submit an invalid email or a password that does not meet the minimum requirements | the account is not created and I see a validation message explaining what to fix |

### US-002: Log in to my account

**Priority:** critical

> As a registered user, I want to log in with my email and password, so that I can access my private expenses and budgets.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I have a registered account | I submit my correct email and password | I am signed in and taken to my dashboard |
| AC-005 | I have a registered account | I submit an incorrect email or password | I am not signed in and I see a generic failure message that does not reveal which field was wrong |

### US-003: Sign out and session expiry

**Priority:** high

> As a signed-in user, I want my session to end when I sign out and to expire after a period of inactivity, so that my financial data is not left accessible on a shared or unattended device.

| ID | Given | When | Then |
|---|---|---|---|
| AC-006 | I am signed in | I choose to sign out | my session ends and I must log in again to access any of my data |
| AC-007 | I am signed in but inactive beyond the session lifetime | I next try to access a protected page or action | my expired session is rejected and I am prompted to log in again |

### US-004: Private per-user data

**Priority:** critical

> As a signed-in user, I want to see and change only my own records, so that no other user can view or modify my expenses, budgets, or categories.

| ID | Given | When | Then |
|---|---|---|---|
| AC-008 | another user has their own expenses and budgets | I am signed in and view any list, report, or record | I see only data belonging to my account and never any other user's data |
| AC-009 | I am not signed in | I try to access a protected page or API resource directly | the request is rejected and I am prompted to log in |

### US-005: Delete my account and data

**Priority:** high

> As a signed-in user, I want to permanently delete my account and all its data, so that I can exercise my privacy rights and remove my personal financial information.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | I am signed in and on the account settings page | I request account deletion and confirm the action | my account, expenses, budgets, and custom categories are permanently removed and any active session ends |
| AC-011 | my account has been deleted | I try to log in with the deleted account's credentials | login fails because the account no longer exists |

## EPIC-002: Expense Logging

Manual recording of expenses with amount, category, date, and optional note, plus editing and deleting logged expenses. Expenses are entered manually only — bank/card import and receipt image upload are out of scope.

### US-006: Log an expense manually

**Priority:** critical

> As a signed-in user, I want to record an expense with an amount, category, date, and optional note, so that I can keep an accurate record of my spending.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | I am on the add-expense form | I enter a positive amount, choose one of my categories, set a date, optionally add a note, and save | the expense is saved to my account in my selected currency and appears in my expense list |
| AC-013 | I am on the add-expense form | I try to save without a required field (amount, category, or date) or with a non-positive/invalid amount | the expense is not saved and I see a validation message indicating what is missing or invalid |

### US-007: Edit a logged expense

**Priority:** high

> As a signed-in user, I want to edit an expense I previously logged, so that I can correct mistakes in amount, category, date, or note.

| ID | Given | When | Then |
|---|---|---|---|
| AC-014 | I have a logged expense | I change one or more of its fields to valid values and save | the updated values are stored and reflected in my expense list, budgets, and reports |
| AC-015 | I am editing an expense | I submit an invalid change (e.g. empty required field or non-positive amount) | the change is not saved and I see a validation message |

### US-008: Delete a logged expense

**Priority:** high

> As a signed-in user, I want to delete an expense I logged, so that I can remove entries I no longer want recorded.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I have a logged expense | I delete it and confirm | the expense is removed from my list and no longer counts toward my budgets or reports |

### US-009: View my expenses

**Priority:** high

> As a signed-in user, I want to see a list of my logged expenses, so that I can review what I have spent and find entries to edit or delete.

| ID | Given | When | Then |
|---|---|---|---|
| AC-017 | I have logged several expenses | I open my expense list | I see my expenses showing amount, category, date, and note, with the most recent readily visible |
| AC-018 | I have logged no expenses | I open my expense list | I see an empty state prompting me to add my first expense |

## EPIC-003: Expense Categories

The app ships with a set of default expense categories and lets users add and edit their own custom categories. Categories are used to classify expenses and set per-category budgets.

### US-010: Use default categories out of the box

**Priority:** medium

> As a new user, I want a set of sensible default expense categories available immediately, so that I can start logging expenses without first setting up categories.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | I have just created my account | I open the add-expense form or the categories list | a set of default categories is already available to choose from |

### US-011: Add a custom category

**Priority:** medium

> As a signed-in user, I want to create my own expense categories, so that I can classify spending in ways that match my life.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | I am on the categories page | I add a new category with a non-empty name that does not duplicate an existing one | the category is saved to my account and becomes selectable when logging expenses and setting budgets |
| AC-021 | I am on the categories page | I try to add a category with an empty name or a name that duplicates an existing category | it is not saved and I see a validation message |

### US-012: Edit a category

**Priority:** low

> As a signed-in user, I want to rename my categories, so that I can keep my category names accurate and meaningful.

| ID | Given | When | Then |
|---|---|---|---|
| AC-022 | I have a category | I rename it to a non-empty, non-duplicate name and save | the new name is shown everywhere that category appears, including existing expenses and budgets |

## EPIC-004: Currency Selection

Each account uses a single user-selected currency for all expenses and budgets. No multi-currency support or exchange-rate conversion.

### US-013: Select my account currency

**Priority:** high

> As a signed-in user, I want to choose a single currency for my account, so that all my amounts are recorded and displayed consistently.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | I am setting up my account or on account settings | I select a currency | all expense amounts, budgets, and reports are displayed in that currency |
| AC-024 | I have not explicitly chosen a currency yet | I log my first expense | a default currency is applied and I can change it later in settings |

## EPIC-005: Budgets & Alerts

Per-category monthly budgets with alerts when nearing or exceeding the limit. Budgets are monthly only — no weekly or annual periods in this version. Alerts appear in-app, with optional email notification delivered via a transactional email service (requires an email API key). Assumption: email notifications depend on a configured email service and the user opting in.

### US-014: Set a monthly budget for a category

**Priority:** high

> As a signed-in user, I want to set a monthly spending limit for a category, so that I can control how much I spend in that category each month.

| ID | Given | When | Then |
|---|---|---|---|
| AC-025 | I am on the budgets page | I set a positive monthly limit for a category and save | the budget is stored for that category and used to track my spending for the current month |
| AC-026 | I am setting a budget | I enter a non-positive or invalid amount | the budget is not saved and I see a validation message |
| AC-027 | I have set a monthly budget for a category | I change the limit | the updated limit is used for tracking and alerting going forward |

### US-015: Track spending against budget

**Priority:** high

> As a signed-in user, I want to see how much of each category's monthly budget I have used, so that I know how much I have left to spend.

| ID | Given | When | Then |
|---|---|---|---|
| AC-028 | I have a monthly budget and logged expenses in that category this month | I view my budgets | I see the amount spent, the limit, and the remaining amount for the current month in my selected currency |
| AC-029 | a new calendar month begins | I view a category's budget | the spent amount resets to reflect only the new month's expenses while the limit carries over |

### US-016: Receive in-app alert when nearing or exceeding a budget

**Priority:** high

> As a signed-in user, I want to be alerted in-app when my spending nears or exceeds a category's monthly budget, so that I can adjust my spending before or as soon as I go over.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | I have a monthly budget for a category | my logged spending in that category reaches the near-limit threshold for the month | an in-app alert indicates I am nearing the budget for that category |
| AC-031 | I have a monthly budget for a category | my logged spending in that category exceeds the limit for the month | an in-app alert indicates I have exceeded the budget for that category |

### US-017: Optional email notification for budget alerts

**Priority:** low

> As a signed-in user, I want to optionally receive budget alerts by email, so that I am notified even when I am not using the app.

| ID | Given | When | Then |
|---|---|---|---|
| AC-032 | a transactional email service is configured and I have opted in to email alerts | a nearing or over-limit budget alert is triggered | an email notification about that alert is sent to my account email |
| AC-033 | I have not opted in to email alerts, or no email service is configured | a budget alert is triggered | no email is sent and the alert is still shown in-app |

## EPIC-006: Reports & Dashboard

A personal dashboard and reports showing spending trends over time and category breakdowns, all in the user's selected currency. This is a core value of the product alongside budgets.

### US-018: View personal spending dashboard

**Priority:** high

> As a signed-in user, I want a dashboard summarising my spending and budget status, so that I can see my financial picture at a glance.

| ID | Given | When | Then |
|---|---|---|---|
| AC-034 | I have logged expenses and set budgets | I open my dashboard | I see a summary of my current-month spending and budget status in my selected currency |
| AC-035 | I have no expenses yet | I open my dashboard | I see an empty state that invites me to log my first expense |

### US-019: View category breakdown

**Priority:** high

> As a signed-in user, I want to see how my spending is split across categories, so that I can understand where my money goes.

| ID | Given | When | Then |
|---|---|---|---|
| AC-036 | I have logged expenses across several categories in a period | I view the category breakdown report | I see the total spent per category for that period in my selected currency |

### US-020: View spending trends over time

**Priority:** medium

> As a signed-in user, I want to see how my spending changes over time, so that I can spot trends and manage my finances better.

| ID | Given | When | Then |
|---|---|---|---|
| AC-037 | I have logged expenses across multiple months | I view the spending trends report | I see my total spending compared across time periods in my selected currency |

## EPIC-007: Data Export & Privacy

Users can export their expense data as CSV. Personal financial data is handled under general, GDPR-style data-privacy expectations with no specific region named. Account deletion is covered under the Account & Authentication epic.

### US-021: Export my data as CSV

**Priority:** medium

> As a signed-in user, I want to export my expense data as a CSV file, so that I can keep my own copy or use it elsewhere.

| ID | Given | When | Then |
|---|---|---|---|
| AC-038 | I have logged expenses | I request a data export | I receive a CSV file containing my expenses with amount, category, date, and note |
| AC-039 | I have no logged expenses | I request a data export | I receive a valid CSV file with headers and no data rows |

## EPIC-008: Responsive Web Delivery

The application is delivered as a responsive web app usable on desktop and mobile browsers. No native iOS/Android app is in scope. The app is free to use with no payments, billing, or paid plans.

### US-022: Use the app on mobile and desktop browsers

**Priority:** medium

> As a user, I want the app to work well on both mobile and desktop browsers, so that I can log and review expenses from any device I have.

| ID | Given | When | Then |
|---|---|---|---|
| AC-040 | I open the app in a mobile browser | I navigate the core screens (log expense, budgets, reports) | the layout adapts to the smaller screen and all actions remain usable without horizontal scrolling |
| AC-041 | I open the app in a desktop browser | I navigate the core screens | the layout uses the available space and all features are accessible |

### US-023: Use the app free of charge

**Priority:** low

> As a user, I want to use all features without payment, so that I can track my finances without a subscription or fees.

| ID | Given | When | Then |
|---|---|---|---|
| AC-042 | I have an account | I use any feature of the app | I am never asked to pay, enter billing details, or choose a plan |
<!-- sdlc:auto:end epics -->
