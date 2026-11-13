# Data Model

<!-- sdlc:auto:start entities -->
### users

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| email | citext | False | — | False |
| password_hash | text | False | — | False |
| currency | varchar(3) | False | — | False |
| email_alerts_opt_in | boolean | False | — | False |
| created_at | timestamptz | False | — | False |

### sessions

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| token_hash | text | False | — | False |
| created_at | timestamptz | False | — | False |
| expires_at | timestamptz | False | — | False |

### categories

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| name | varchar(100) | False | — | False |
| is_default | boolean | False | — | False |
| created_at | timestamptz | False | — | False |

### expenses

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| category_id | uuid | False | categories.id | False |
| amount | numeric(12,2) | False | — | False |
| currency | varchar(3) | False | — | False |
| spent_on | date | False | — | False |
| note | text | False | — | True |
| created_at | timestamptz | False | — | False |

### budgets

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| category_id | uuid | False | categories.id | False |
| monthly_limit | numeric(12,2) | False | — | False |
| created_at | timestamptz | False | — | False |
| updated_at | timestamptz | False | — | False |

### budget_alerts

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| category_id | uuid | False | categories.id | False |
| period_month | date | False | — | False |
| kind | varchar(10) | False | — | False |
| emailed | boolean | False | — | False |
| created_at | timestamptz | False | — | False |
<!-- sdlc:auto:end entities -->

<!-- sdlc:auto:start relationships -->
| Source | Target | Type |
|---|---|---|
| users | sessions | one-to-many |
| users | categories | one-to-many |
| users | expenses | one-to-many |
| users | budgets | one-to-many |
| users | budget_alerts | one-to-many |
| categories | expenses | one-to-many |
| categories | budgets | one-to-many |
| categories | budget_alerts | one-to-many |
<!-- sdlc:auto:end relationships -->

<!-- sdlc:auto:start er-diagram -->
```mermaid
erDiagram
  users {
    uuid id PK
    citext email
    text password_hash
    varchar_3_ currency
    boolean email_alerts_opt_in
    timestamptz created_at
  }
  sessions {
    uuid id PK
    uuid user_id FK
    text token_hash
    timestamptz created_at
    timestamptz expires_at
  }
  categories {
    uuid id PK
    uuid user_id FK
    varchar_100_ name
    boolean is_default
    timestamptz created_at
  }
  expenses {
    uuid id PK
    uuid user_id FK
    uuid category_id FK
    numeric_12_2_ amount
    varchar_3_ currency
    date spent_on
    text note
    timestamptz created_at
  }
  budgets {
    uuid id PK
    uuid user_id FK
    uuid category_id FK
    numeric_12_2_ monthly_limit
    timestamptz created_at
    timestamptz updated_at
  }
  budget_alerts {
    uuid id PK
    uuid user_id FK
    uuid category_id FK
    date period_month
    varchar_10_ kind
    boolean emailed
    timestamptz created_at
  }
  users ||--o{ sessions : "one-to-many"
  users ||--o{ categories : "one-to-many"
  users ||--o{ expenses : "one-to-many"
  users ||--o{ budgets : "one-to-many"
  users ||--o{ budget_alerts : "one-to-many"
  categories ||--o{ expenses : "one-to-many"
  categories ||--o{ budgets : "one-to-many"
  categories ||--o{ budget_alerts : "one-to-many"
```
<!-- sdlc:auto:end er-diagram -->
