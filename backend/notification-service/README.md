# Sole Health — Notification Service

NestJS API scaffold with TypeORM + PostgreSQL + BullMQ/Redis. Queues and (eventually) delivers notifications — email/SMS/push. No real channel integration yet, no business logic beyond proving the queue wiring end-to-end.

## Setup

```bash
cp .env.example .env   # adjust DB/Redis credentials if needed
npm install
```

Requires PostgreSQL and Redis running (see root `docker-compose.yml`: `docker compose up -d` from the repo root).

## Run

```bash
npm run start:dev   # watch mode, http://localhost:3001
npm run build        # production build
npm run start:prod   # run compiled build
```

## API

- Versioned via URI: `/v1/...` (default version `1`, see `src/main.ts`).
- Swagger docs: `http://localhost:3001/docs`.
- `POST /v1/notifications` enqueues a job onto the `notifications` BullMQ queue; `NotificationsProcessor` consumes it and just logs what it *would* send — swap in a real provider (SMTP/SNS/FCM/etc.) there when ready.

## Test

```bash
npm run test        # unit tests
npm run test:e2e     # e2e tests
```

## Structure

Same layout as `iam-service` (see its README for the full breakdown), plus:

```
src/modules/notifications/
  notifications.module.ts      registers the "notifications" BullMQ queue
  notifications.controller.ts  POST /notifications
  notifications.service.ts     producer — enqueues jobs
  notifications.processor.ts   consumer — currently just logs
  dto/create-notification.dto.ts
```

`guards/`, `strategy/`, and `libs/` are intentionally empty — auth is deferred, built in `iam-service` first.
