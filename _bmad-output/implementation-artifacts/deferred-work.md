- source_spec: `_bmad-output/implementation-artifacts/spec-scaffold-nestjs-react-monorepo.md`
  summary: No auth module/strategy implemented in `iam-service` — explicitly deferred by the user to build themselves.
  evidence: User said "auth tôi build sau, cứ cài project đã" during scaffold clarification.

- source_spec: `_bmad-output/implementation-artifacts/spec-scaffold-nestjs-react-monorepo.md`
  summary: No env validation schema (e.g. Joi) on `ConfigModule` in any of the three backend services — malformed `.env` values fail late with opaque errors instead of failing fast at boot.
  evidence: Adds a design decision (validation library/shape) beyond what "just scaffold the project" asked for.

- source_spec: `_bmad-output/implementation-artifacts/spec-scaffold-nestjs-react-monorepo.md`
  summary: Frontend has no test framework/`test` script (backend services already have Jest unit+e2e).
  evidence: Adding a frontend test stack is a tooling decision beyond bare scaffolding; defer until there's UI to test.

- source_spec: `_bmad-output/implementation-artifacts/spec-backend-enterprise-folder-structure.md`
  summary: No live run/verification of any backend service or `docker compose up` — Docker daemon has been unavailable in this environment every time it was checked.
  evidence: `docker compose up -d` and `docker info` both failed with "Cannot connect to the Docker daemon". Once Docker Desktop is running: `docker compose up -d`, then per service `npm run start:dev` and hit `/v1/health` + `/docs`.

- source_spec: `_bmad-output/implementation-artifacts/spec-notification-task-services-cicd.md`
  summary: `notification-service` has no real delivery channel (SMTP/SMS/push provider) — `NotificationsProcessor` only logs what it would send.
  evidence: Out of scope for this pass; user asked for the service + queue wiring, not a specific provider integration.

- source_spec: `_bmad-output/implementation-artifacts/spec-notification-task-services-cicd.md`
  summary: `task-service`'s `JobsProcessor` only handles a demo `"ping"` job name — no real job types implemented.
  evidence: No real background-job requirements specified yet; scaffold proves the queue end-to-end.

- source_spec: `_bmad-output/implementation-artifacts/spec-notification-task-services-cicd.md`
  summary: CI builds/lints and pushes Docker images to Docker Hub, but nothing deploys them — `devops/docker-compose.prod.yml` is manual-only (`docker compose pull && up -d` run by hand on the server).
  evidence: User's explicit choice: "Giờ cứ làm bước lint, build, push image lên docker đã rồi tính tiếp sau" (do lint/build/push for now, figure out deploy later).

- source_spec: `_bmad-output/implementation-artifacts/spec-notification-task-services-cicd.md`
  summary: `devops/docker-compose.prod.yml` assumes the existing Postgres/Redis containers on the target server are reachable via a named external Docker network — that network's actual name, and whether those containers are even attached to a shared network today, is unverified (no access to that server from here).
  evidence: `EXISTING_INFRA_NETWORK` in `devops/.env.production.example` is a placeholder; user must confirm/create it on the real server before first deploy.

- source_spec: `_bmad-output/implementation-artifacts/spec-notification-task-services-cicd.md`
  summary: Docker image builds (`docker build` against the three new `Dockerfile`s) were never actually run — Docker daemon unavailable in this environment.
  evidence: Same daemon-unavailable issue as above; Dockerfiles follow a standard multi-stage Node pattern but haven't been build-tested here.

- source_spec: `_bmad-output/implementation-artifacts/spec-notification-task-services-cicd.md`
  summary: `iam-service` does not yet enqueue anything to `notification-service` (e.g. a welcome email on signup) — the two services aren't wired together, each was verified independently.
  evidence: Natural next step once auth/signup exists in `iam-service`, but out of scope for this pass.
