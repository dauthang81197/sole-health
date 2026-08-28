- source_spec: `_bmad-output/implementation-artifacts/spec-scaffold-nestjs-react-monorepo.md`
  summary: No auth module/strategy implemented — explicitly deferred by the user to build themselves.
  evidence: User said "auth tôi build sau, cứ cài project đã" during scaffold clarification.

- source_spec: `_bmad-output/implementation-artifacts/spec-scaffold-nestjs-react-monorepo.md`
  summary: No env validation schema (e.g. Joi) on `ConfigModule` — malformed `.env` values fail late with opaque errors instead of failing fast at boot.
  evidence: Adds a design decision (validation library/shape) beyond what "just scaffold the project" asked for.

- source_spec: `_bmad-output/implementation-artifacts/spec-scaffold-nestjs-react-monorepo.md`
  summary: No CI configuration (e.g. GitHub Actions) running each app's lint/test/build scripts.
  evidence: No CI/hosting decisions were made yet; premature before the project has real code to gate.

- source_spec: `_bmad-output/implementation-artifacts/spec-scaffold-nestjs-react-monorepo.md`
  summary: Frontend has no test framework/`test` script (backend already has Jest unit+e2e).
  evidence: Adding a frontend test stack is a tooling decision beyond bare scaffolding; defer until there's UI to test.

- source_spec: `_bmad-output/implementation-artifacts/spec-scaffold-nestjs-react-monorepo.md`
  summary: Repo is not yet under version control (no `.git`) — no commit was created for this scaffold.
  evidence: User indicated they'll take over in this folder; git init/commit was offered but not yet confirmed.

- source_spec: `_bmad-output/implementation-artifacts/spec-backend-enterprise-folder-structure.md`
  summary: `/health` endpoint and the full request pipeline (filter/interceptors/i18n/TypeORM connection) were verified only via `build`/`lint`, not a live run — Docker daemon wasn't running so `docker compose up -d` (Postgres) couldn't start.
  evidence: `docker compose up -d` failed with "Cannot connect to the Docker daemon". Start Docker Desktop, then `docker compose up -d && cd backend && npm run start:dev` and hit `GET /health` to confirm end-to-end.
