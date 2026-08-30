# Sole Health

Healthcare practice project. Independent apps/services in this repo:

| Service | Port | Purpose |
|---|---|---|
| `backend/iam-service/` | 3000 | Auth, users, organizations, role-based access control, plan/subscription |
| `backend/notification-service/` | 3001 | Queues/delivers notifications (email/SMS/push) |
| `backend/task-service/` | 3002 | Runs background jobs enqueued by other services |
| `frontend/` | 5173 | React + Vite + TypeScript |

All three backend services share the same base: NestJS, TypeORM + PostgreSQL, URI API versioning (`/v1/...`), Swagger at `/docs`. `notification-service` and `task-service` also use BullMQ + Redis for their job queues.

## Getting started

1. Start local infra (PostgreSQL + Redis): `docker compose up -d`
   - First run only: this also creates the `sole_health_notification` and `sole_health_task` databases via `postgres/init-databases.sh`. If you already had a `postgres_data` volume from before this existed, reset it once: `docker compose down -v && docker compose up -d`.
2. Per service: `cd backend/<service> && cp .env.example .env && npm install && npm run start:dev`
3. Frontend: `cd frontend && cp .env.example .env && npm install && npm run dev`

The frontend dev server proxies `/api/*` requests to `iam-service` (see `frontend/vite.config.ts`) — the other two services aren't wired into the frontend yet.

No auth, notification-channel, or job-handler logic has been built yet — this is just the scaffold, plus a proven-out queue wiring in `notification-service`/`task-service` (see their READMEs).

## CI/CD

`.github/workflows/` — one workflow per service, triggered only when that service's folder changes (`paths:` filter). Each: `npm ci && npm run lint && npm run build`; on push to `develop`/`main` it also builds and pushes a Docker image to Docker Hub (`:latest` + `:<git-sha>`). See `.github/workflows/_backend-service-ci.yml` for the shared logic.

Requires repo secrets `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` (Settings → Secrets and variables → Actions) for the push step to succeed — lint/build run regardless.

No auto-deploy yet — see `devops/README.md` for the manual deploy path to the dedicated Linux server (which already runs Postgres/Redis as separate containers).
