# Sole Health — IAM Service

NestJS API scaffold with TypeORM + PostgreSQL. Owns auth, users, organizations, role-based access control, and plan/subscription. No business logic implemented yet — just the base setup.

## Setup

```bash
cp .env.example .env   # adjust DB credentials if needed
npm install
```

Make sure PostgreSQL is running (see root `docker-compose.yml`: `docker compose up -d` from the repo root).

## Run

```bash
npm run start:dev   # watch mode, http://localhost:3000
npm run build        # production build
npm run start:prod   # run compiled build
```

## API

- Versioned via URI: every route is prefixed `/v1/...` (`app.enableVersioning`, default version `1` — see `src/main.ts`). Bump a route's version with `@Version('2')` on the controller/handler when it needs to diverge.
- Swagger docs: `http://localhost:3000/docs` (`@nestjs/swagger`, config in `src/main.ts`). Add `@ApiTags`/`@ApiOperation`/`@ApiOkResponse` to new controllers and `@ApiProperty` to new DTOs — see `src/modules/health` for the pattern.
- Every success response is wrapped by `TransformInterceptor` into `{ statusCode, message, data, timestamp }` — Swagger currently documents the unwrapped `data` shape only (a known gap with global response interceptors), keep that in mind when reading the docs.

## Test

```bash
npm run test        # unit tests
npm run test:e2e     # e2e tests
```

## Structure

```
src/
  common/        shared DTOs (pagination) and constants
  configs/       typed config (registerAs), loaded into ConfigModule
  database/      standalone TypeORM DataSource + migrations for the CLI
  decorators/    @Public, @CurrentUser — stubs, not read by any guard yet
  exceptions/    BusinessException base class
  filters/       AllExceptionsFilter — global, consistent JSON error shape
  guards/        empty — add auth guards here
  i18n/          nestjs-i18n translation files (en, vi)
  interceptor/   LoggingInterceptor, TransformInterceptor (wraps success responses)
  interfaces/    shared response-shape types
  libs/          empty — reserved for shared/external-service wrappers
  middleware/    RequestContextMiddleware (x-request-id)
  modules/       feature modules (see modules/health for the pattern)
  strategy/      empty — add Passport strategies here
```

## Notes

- `TypeOrmModule` is configured in `src/app.module.ts` with `synchronize: true` outside production — fine for local dev, switch to migrations (`npm run migration:generate` / `migration:run`) before shipping anything real.
- Global `ValidationPipe` (whitelist + transform), CORS, `AllExceptionsFilter`, and both interceptors are already wired in `src/app.module.ts` / `src/main.ts`.
- `guards/`, `strategy/`, and `libs/` are intentionally empty — that's where auth (JWT strategy + guards) goes when you build it.
