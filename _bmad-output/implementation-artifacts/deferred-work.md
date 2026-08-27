- source_spec: `_bmad-output/implementation-artifacts/spec-scaffold-nestjs-react-monorepo.md`
  summary: No auth module/strategy implemented — explicitly deferred by the user to build themselves.
  evidence: User said "auth tôi build sau, cứ cài project đã" during scaffold clarification.

- source_spec: `_bmad-output/implementation-artifacts/spec-scaffold-nestjs-react-monorepo.md`
  summary: No TypeORM migrations setup (data-source.ts, migrations folder/scripts) — relies on `synchronize: true` for now.
  evidence: Out of scope for a bare scaffold; needed before this touches real/shared data.

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
