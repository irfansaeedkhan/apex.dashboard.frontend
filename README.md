# Apex Dashboard Frontend

Admin / user dashboard for the Apex Order platform. Handles authentication, account management, affiliates, rewards, leaderboard, and related dashboard flows.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | React 19, TypeScript, Tailwind CSS |
| State | Zustand |
| Forms | React Hook Form, Joi |
| Charts | ApexCharts / react-apexcharts |
| HTTP | Axios |
| Auth cookies | cookies-next |
| Icons / SVGs | react-icons, SVGR |
| Tooling | ESLint, Prettier, Yarn |
| Deploy | Docker, Kubernetes manifests included |

## Features

- Auth: login, register, email verification, forgot / reset password
- Dashboard overview with balances, meta assets, and rewards
- Affiliates management
- Leaderboard
- Profile and profile settings
- Invoices (PDF via jsPDF)
- Notifications
- Middleware-based route protection

## Getting started

### Prerequisites

- Node.js **20.9+** (recommended: current LTS)
- Yarn 1.x

### Install

```bash
yarn
```

### Environment

Copy local env values (`.env` is gitignored). A development sample is committed as `.env.development`:

```bash
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_API_HOST=https://your-api-host
NEXT_PUBLIC_BASE_URL=https://your-app-host
```

Create a local `.env` for secrets / overrides as needed.

### Develop

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & production

```bash
yarn build
yarn start
```

### Lint / format

```bash
yarn lint
yarn prettier --write .
```

## Project structure

```
app/           # Next.js App Router pages & layouts
components/    # UI (auth, dashboard, shared, etc.)
stores/        # Zustand stores
lib/           # Auth and shared library code
utils/         # Axios client, helpers
models/        # TypeScript models
middleware.ts  # Auth / route guards
docker/        # Docker configs (playground, staging, production)
k8s/           # Kubernetes manifests
```

## Scripts

| Script | Description |
| --- | --- |
| `yarn dev` | Start Next.js dev server |
| `yarn build` | Production build |
| `yarn start` | Serve production build |
| `yarn lint` | Run ESLint |

## Notes

- Remote images are allowed from the configured S3 host via `images.remotePatterns` in `next.config.mjs`.
- SVG imports are handled with `@svgr/webpack` (Webpack + Turbopack rules).
- `middleware.ts` still powers route protection; Next.js 16 may show a deprecation notice toward `proxy` — left as middleware to keep Edge-compatible auth redirects.

## License

Private — all rights reserved.
