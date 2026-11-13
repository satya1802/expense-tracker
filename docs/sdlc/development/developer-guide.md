# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `1d02158` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
Expense Tracker is a generated two-app repository from the Quorq AI SDLC platform. The frontend is a Vite + React 19 single-page app containing every approved screen, currently rendering seeded sample data rather than live API calls. The backend is a FastAPI 0.115 service scaffolded from an approved (but still largely undefined) architecture: it exposes only a health check today, with SQLAlchemy models/routers as the seam for future endpoints. The backend defaults to a local SQLite file so it runs with no database server, while docker-compose provides a Postgres 16 container for when DATABASE_URL is pointed at it.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for npm/Vite/React 19, see frontend/package.json)
- Python 3.12 (matches backend/Dockerfile base image)
- pip
- Docker and Docker Compose (optional, for the Postgres service in docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository and copy .env.example to .env, filling in any values it defines
2. cd frontend && npm install
3. cd backend && pip install -r requirements.txt
4. (optional) from the repo root, run docker-compose up -d db to start Postgres instead of the default SQLite file
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `cd frontend && npm run dev` | Starts the Vite dev server for the React SPA |
| backend dev | `cd backend && uvicorn app.main:app --reload` | Runs the FastAPI app with auto-reload; creates SQLite tables on startup via the lifespan hook |
| frontend build | `cd frontend && npm run build` | Bundles the app with Vite (does not typecheck) |
| frontend preview | `cd frontend && npm run preview` | Serves the production build locally |
| db only | `docker-compose up -d db` | Starts the Postgres 16 container defined in docker-compose.yml |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `backend` | FastAPI service: entrypoint, DB engine/session, models, Pydantic schemas, routers, tests |
| `backend/app` | Application package: main.py (entrypoint + health route), database.py (engine/session), models.py (SQLAlchemy models), schemas.py (Pydantic schemas), routers/ (per-component route modules) |
| `backend/tests` | pytest suite: unit/ and integration/ tests, e.g. integration/test_health.py |
| `frontend` | Vite + React 19 SPA with the approved, seeded-data screens |
| `frontend/src` | App source: main.tsx entry, lib/ (api client, UI/icon vocabulary, navigation), index.css |
| `frontend/e2e` | Playwright end-to-end specs and support helpers |
| `.devcontainer` | Dev container configuration for a consistent local environment |
| `.quorq` | Platform metadata (handoff.json) used by the Quorq SDLC platform |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend follows one router per architecture component that owns endpoints, with one stub route per declared API endpoint returning a typed StubResponse until implemented
- SQLAlchemy models inherit from the shared Base in app/database.py; app/main.py imports models before calling Base.metadata.create_all so tables register at startup, not import time
- Pydantic schemas are defined one pair per entity in app/schemas.py
- Backend session handling is request-scoped via the get_db dependency generator, closing the session after each request
- DATABASE_URL env var switches the backend between its default SQLite file and a real server (e.g. Postgres) with no code changes
- ALLOWED_ORIGINS env var (comma-separated) configures CORS; falls back to localhost Vite dev origins
- Frontend screens currently render seeded sample data; frontend/src/lib/api.ts is the designated seam for wiring a screen to the real API via apiFetch, using VITE_API_BASE_URL and VITE_API_SECRET_KEY
- Frontend uses path alias @/ mapped to src/, Tailwind CSS via @tailwindcss/vite, and ESLint + Prettier for linting/formatting
- Ruff is used for backend linting and formatting
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit | `cd frontend && npm test` | Runs Vitest component tests located beside the components they cover |
| frontend lint | `cd frontend && npm run lint` | Runs ESLint over the whole frontend app |
| frontend format check | `cd frontend && npm run format:check` | Checks formatting with Prettier |
| frontend typecheck | `cd frontend && npm run typecheck` | Runs tsc --noEmit (not run by npm run build) |
| frontend e2e | `cd frontend && npm run test:e2e` | Runs Playwright acceptance tests from e2e/; boots backend (SQLite) and frontend preview locally unless E2E_BASE_URL is set |
| frontend e2e browser install | `cd frontend && npm run test:e2e:install` | Installs the Chromium browser Playwright needs |
| backend tests | `cd backend && pytest` | Runs the pytest suite in backend/tests (unit and integration) |
| backend lint | `cd backend && ruff check .` | Lints the backend code with Ruff |
| backend format | `cd backend && ruff format .` | Formats the backend code with Ruff |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend API calls fail with a CORS error in the browser | Set ALLOWED_ORIGINS on the backend to include the frontend's origin (comma-separated); it otherwise only allows the local Vite dev origins |
| Backend pytest cannot import app modules when run from an unexpected directory | Run pytest from backend/ so pytest.ini's pythonpath = . is honored, giving access to `import app` |
| Want to use Postgres instead of the default SQLite file | Start docker-compose up -d db and set DATABASE_URL to point at it (e.g. the credentials in docker-compose.yml: app/app@localhost:5432/app); no code changes needed |
| Playwright e2e tests fail to launch a browser | Run npm run test:e2e:install first to fetch the Chromium browser |
| npm run build succeeds but npm run typecheck fails | This is expected per frontend/README.md; build does not typecheck, so run npm run typecheck separately and fix reported type errors before relying on tsc passing |
<!-- sdlc:auto:end troubleshooting -->
