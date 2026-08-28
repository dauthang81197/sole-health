---
title: 'Add notification-service + task-service, GitHub Actions CI/CD, and devops deploy config'
type: 'feature'
created: '2026-08-28'
status: 'done'
route: 'one-shot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The project is heading toward multiple backend services (iam-service already exists), but has no CI/CD, no notification service, no job runner, and no deploy config for the dedicated Linux server that already runs Postgres + Redis containers.

**Approach:** Scaffold two more NestJS services on the same base as `iam-service` (enterprise folder layout, Swagger, URI versioning): `notification-service` (BullMQ queue "notifications", processor stub, no real delivery channel) and `task-service` (BullMQ queue "jobs", processor stub handling a demo "ping" job). Add per-service GitHub Actions CI (path-filtered — only the changed service builds) that lints, builds, and — on push to `develop`/`main` — pushes a Docker image to Docker Hub. Add a `devops/` folder with a manual-deploy `docker-compose.prod.yml` targeting the existing server's Postgres/Redis via an external Docker network (auto-deploy explicitly deferred per user's choice).

</frozen-after-approval>

## Suggested Review Order

**Service wiring (entry points)**

- BullMQ connected via `ConfigService` (redis config), alongside TypeORM + i18n
  [`notification-service/src/app.module.ts:42`](../../notification-service/src/app.module.ts#L42)

- Same pattern in task-service
  [`task-service/src/app.module.ts:42`](../../task-service/src/app.module.ts#L42)

**Notification queue**

- Queue "notifications" registered
  [`notification-service/src/modules/notifications/notifications.module.ts:9`](../../notification-service/src/modules/notifications/notifications.module.ts#L9)

- Producer — `POST /v1/notifications` enqueues here
  [`notification-service/src/modules/notifications/notifications.service.ts:13`](../../notification-service/src/modules/notifications/notifications.service.ts#L13)

- Consumer — no real channel yet, just logs what it would send
  [`notification-service/src/modules/notifications/notifications.processor.ts:16`](../../notification-service/src/modules/notifications/notifications.processor.ts#L16)

**Job queue**

- Queue "jobs" registered
  [`task-service/src/modules/jobs/jobs.module.ts:9`](../../task-service/src/modules/jobs/jobs.module.ts#L9)

- Consumer — routes by job name, only "ping" handled today
  [`task-service/src/modules/jobs/jobs.processor.ts:14`](../../task-service/src/modules/jobs/jobs.processor.ts#L14)

**CI/CD**

- Shared reusable workflow: lint+build always, Docker Hub push gated to `develop`/`main` pushes
  [`.github/workflows/_backend-service-ci.yml:34`](../../.github/workflows/_backend-service-ci.yml#L34)

- Thin per-service callers with path filters (`iam-service.yml`, `task-service.yml`, `frontend.yml` follow the same shape)
  [`.github/workflows/notification-service.yml`](../../.github/workflows/notification-service.yml)

**Containers & deploy**

- Multi-stage Dockerfile (build → slim production image), same shape across all three backend services
  [`iam-service/Dockerfile:1`](../../iam-service/Dockerfile#L1)

- Local dev: Redis added alongside existing Postgres
  [`docker-compose.yml:15`](../../docker-compose.yml#L15)

- Prod: joins the server's existing Postgres/Redis via an external network (name supplied at deploy time)
  [`devops/docker-compose.prod.yml:49`](../../devops/docker-compose.prod.yml#L49)

