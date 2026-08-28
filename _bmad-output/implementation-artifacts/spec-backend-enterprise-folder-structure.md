---
title: 'Restructure backend/src into enterprise NestJS folder layout'
type: 'chore'
created: '2026-08-27'
status: 'done'
route: 'one-shot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** User has a preferred backend folder layout from a prior project (common, configs, database, decorators, exceptions, filters, guards, i18n, interceptor, interfaces, libs, middleware, modules, strategy) and wants `backend/src` to follow it, with standard infra boilerplate wired in — but with no auth logic, since that's still deferred.

**Approach:** Create every named folder under `backend/src`. Fill the non-auth infra folders with working boilerplate (global exception filter, logging + response-transform interceptors, request-id middleware, typed config via `registerAs`, TypeORM CLI data-source + migrations dir, i18n via `nestjs-i18n`, base decorators, a `modules/health` sample module wired end-to-end). Leave `guards/`, `strategy/`, and `libs/` as empty placeholders since auth and shared external-service wrappers are out of scope. Replace the default Nest "Hello World" `AppController`/`AppService` with the `HealthModule` so the module pattern is demonstrated by real code, not boilerplate destined for deletion.

</frozen-after-approval>

## Suggested Review Order

**Wiring (entry point)**

- All infra pieces assembled: typed config, TypeORM via `ConfigService`, i18n, global filter/interceptors, request-id middleware
  [`app.module.ts:1`](../../backend/src/app.module.ts#L1)

**Config & database**

- Namespaced config factories
  [`configs/app.config.ts`](../../backend/src/configs/app.config.ts), [`configs/database.config.ts`](../../backend/src/configs/database.config.ts)

- Standalone TypeORM `DataSource` for CLI migrations (separate from the Nest DI-wired connection)
  [`database/data-source.ts`](../../backend/src/database/data-source.ts)

**Cross-cutting infra**

- Consistent JSON error shape for every uncaught exception
  [`filters/all-exceptions.filter.ts`](../../backend/src/filters/all-exceptions.filter.ts)

- Wraps every success response in `{ statusCode, message, data, timestamp }`
  [`interceptor/transform.interceptor.ts`](../../backend/src/interceptor/transform.interceptor.ts)

- Per-request duration logging
  [`interceptor/logging.interceptor.ts`](../../backend/src/interceptor/logging.interceptor.ts)

- Stamps/propagates `x-request-id`
  [`middleware/request-context.middleware.ts`](../../backend/src/middleware/request-context.middleware.ts)

**Auth-adjacent stubs (no logic yet — for when auth lands)**

- `@Public()` marker, not yet read by any guard
  [`decorators/public.decorator.ts`](../../backend/src/decorators/public.decorator.ts)

- `@CurrentUser()` reads `request.user`, undefined until a guard sets it
  [`decorators/current-user.decorator.ts`](../../backend/src/decorators/current-user.decorator.ts)

**First real module**

- Sample module proving the `modules/` pattern end-to-end, replaces default `AppController`
  [`modules/health/health.controller.ts`](../../backend/src/modules/health/health.controller.ts)

**Peripherals**

- i18n strings backing the health endpoint's message
  [`i18n/en/common.json`](../../backend/src/i18n/en/common.json)

- e2e test updated for the new `/health` route and wrapped response shape
  [`test/app.e2e-spec.ts`](../../backend/test/app.e2e-spec.ts)

