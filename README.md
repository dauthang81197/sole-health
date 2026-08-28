# Sole Health

Healthcare practice project. Two independent apps in this repo:

- `iam-service/` — NestJS API, TypeORM + PostgreSQL, config via `.env`. Handles auth, users, organizations, role-based access control, and plan/subscription.
- `frontend/` — React + Vite + TypeScript.

## Getting started

1. Start PostgreSQL: `docker compose up -d`
2. IAM service: `cd iam-service && cp .env.example .env && npm install && npm run start:dev` (http://localhost:3000)
3. Frontend: `cd frontend && cp .env.example .env && npm install && npm run dev` (http://localhost:5173)

The frontend dev server proxies `/api/*` requests to the IAM service (see `frontend/vite.config.ts`).

No auth or feature code has been built yet — this is just the scaffold.
