# Sole Health — Backend

NestJS API scaffold with TypeORM + PostgreSQL. No auth or business logic yet — just the base setup.

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

## Test

```bash
npm run test        # unit tests
npm run test:e2e     # e2e tests
```

## Notes

- `TypeOrmModule` is configured in `src/app.module.ts` with `synchronize: true` outside production — fine for local dev, switch to migrations before shipping anything real.
- Global `ValidationPipe` (whitelist + transform) and CORS are already enabled in `src/main.ts`.
