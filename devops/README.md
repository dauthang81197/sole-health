# DevOps — dedicated server deploy

CI (`.github/workflows/`) lints, builds, and — on push to `develop`/`main` — pushes each service's Docker image to Docker Hub. It does **not** deploy anywhere yet; that's this folder, run manually for now.

## One-time server setup

1. Confirm the Docker network your existing Postgres/Redis containers are on:
   ```bash
   docker inspect <postgres-container-name> --format '{{json .NetworkSettings.Networks}}'
   ```
   If they're on the default bridge network (no custom network), create one and attach them, or attach a network to those containers — `docker-compose.prod.yml` expects to join an existing named network, not create its own database/cache containers.

2. Copy the env templates and fill in real values:
   ```bash
   cp .env.production.example .env.production
   cp iam-service.env.example iam-service.env
   cp notification-service.env.example notification-service.env
   cp task-service.env.example task-service.env
   ```
   `DB_HOST`/`REDIS_HOST` in each `*.env` should be the existing containers' names (if sharing the Docker network) or a reachable host — not `localhost`.

## Deploy (manual, for now)

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production pull
docker compose -f docker-compose.prod.yml --env-file .env.production up -d
```

## GitHub secrets required for CI's Docker Hub push

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN` (a Docker Hub access token, not your account password)

Add both under repo Settings → Secrets and variables → Actions.

## Notes

- Each service publishes two tags per push: `:latest` and `:<git-sha>`. `docker-compose.prod.yml` currently pulls `:latest` — pin to a sha tag once you want reproducible/rollback-able deploys.
- No auto-deploy step exists yet on purpose — add an SSH or self-hosted-runner deploy job to `.github/workflows/_backend-service-ci.yml` when ready to automate this.
