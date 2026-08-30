# Sole Health — Task Service

NestJS API scaffold with TypeORM + PostgreSQL + BullMQ/Redis. Runs background jobs — enqueued by this or any other service in the `jobs` queue. No real job handlers yet beyond a `ping` demo.

## Setup

```bash
cp .env.example .env   # adjust DB/Redis credentials if needed
npm install
```

Requires PostgreSQL and Redis running (see root `docker-compose.yml`: `docker compose up -d` from the repo root).

## Run

```bash
npm run start:dev   # watch mode, http://localhost:3002
npm run build        # production build
npm run start:prod   # run compiled build
```

## API

- Versioned via URI: `/v1/...` (default version `1`, see `src/main.ts`).
- Swagger docs: `http://localhost:3002/docs`.
- `POST /v1/jobs` enqueues `{ name, payload }` onto the `jobs` BullMQ queue; `JobsProcessor` routes by `job.name` — only `"ping"` is handled today. Add a `case` per real job type as they're built.

## Test

```bash
npm run test        # unit tests
npm run test:e2e     # e2e tests
```

## Structure

Same layout as `iam-service` (see its README for the full breakdown), plus:

```
src/modules/jobs/
  jobs.module.ts      registers the "jobs" BullMQ queue
  jobs.controller.ts  POST /jobs
  jobs.service.ts     producer — enqueues jobs
  jobs.processor.ts   consumer — routes by job name, only "ping" handled
  dto/create-job.dto.ts
```

`guards/`, `strategy/`, and `libs/` are intentionally empty — auth is deferred, built in `iam-service` first.
