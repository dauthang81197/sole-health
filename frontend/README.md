# Sole Health — Frontend

React + Vite + TypeScript scaffold. No real UI/feature code yet — just the base setup.

## Setup

```bash
cp .env.example .env
npm install
```

## Run

```bash
npm run dev      # http://localhost:5173
npm run build    # production build
npm run lint      # oxlint
```

Requests to `/api/*` during `npm run dev` are proxied to the backend at `http://localhost:3000` (see `vite.config.ts`).
