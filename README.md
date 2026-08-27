# Sole Health

Healthcare practice project. Two independent apps in this repo:

- `backend/` — NestJS API, TypeORM + PostgreSQL, config via `.env`.
- `frontend/` — React + Vite + TypeScript.

## Getting started

1. Start PostgreSQL: `docker compose up -d`
2. Backend: `cd backend && cp .env.example .env && npm install && npm run start:dev` (http://localhost:3000)
3. Frontend: `cd frontend && cp .env.example .env && npm install && npm run dev` (http://localhost:5173)

The frontend dev server proxies `/api/*` requests to the backend (see `frontend/vite.config.ts`).

No auth or feature code has been built yet — this is just the scaffold.
