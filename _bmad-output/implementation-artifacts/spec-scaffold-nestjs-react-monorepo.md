---
title: 'Scaffold NestJS backend + React frontend monorepo'
type: 'chore'
created: '2026-08-27'
status: 'done'
route: 'one-shot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The repo had no code yet — the user wants a NestJS backend and a React frontend scaffolded so they can build a healthcare practice project on top, implementing everything else (including auth) themselves.

**Approach:** Scaffold two independent apps side by side (`backend/`, `frontend/`): NestJS wired with TypeORM + PostgreSQL via `@nestjs/config` (no auth logic), and a Vite + React + TypeScript app. Add the connective tissue a fresh two-app scaffold needs to actually run together (CORS, dev proxy, global validation pipe, Postgres via Docker Compose, env examples, per-app READMEs) without building any feature or auth code.

</frozen-after-approval>

## Suggested Review Order

**Backend setup**

- DB config wired via `ConfigService`, `synchronize` only outside production
  [`app.module.ts:13`](../../backend/src/app.module.ts#L13)

- Global CORS + `ValidationPipe` (whitelist, transform) added to bootstrap
  [`main.ts:7`](../../backend/src/main.ts#L7)

- Env template matching the Docker Compose Postgres service
  [`.env.example:4`](../../backend/.env.example#L4)

**Frontend setup**

- Dev-server proxy so `/api/*` reaches the backend without CORS friction
  [`vite.config.ts:8`](../../frontend/vite.config.ts#L8)

- Page title de-genericized from the Vite default
  [`index.html:7`](../../frontend/index.html#L7)

- API base URL env template
  [`.env.example:1`](../../frontend/.env.example#L1)

**Local infra & docs**

- Postgres service matching backend `.env.example` defaults
  [`docker-compose.yml:3`](../../docker-compose.yml#L3)

- Root README ties both apps together with run order
  [`README.md`](../../README.md)

- Per-app READMEs replace unedited framework boilerplate
  [`backend/README.md`](../../backend/README.md), [`frontend/README.md`](../../frontend/README.md)

