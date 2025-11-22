# common-strategy

Shared **TypeScript contracts and utilities** for the _End to End Company Products_ system.

This package is the **single source of truth** for:

- Cross-service **types and DTOs**
- Shared **constants** and configuration shapes
- Standardized **logging interfaces** and helpers
- Common **API contracts** (HTTP + real-time envelopes) used by all apps and services

All other repositories (`server-strategy`, `gateway-strategy`, `web-client-strategy`, `mobile-client-strategy`, `ai-strategy`) are expected to depend on this package instead of redefining their own versions of the same types.

---

## Table of Contents

- [Background](#background)
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Related Repositories](#related-repositories)
- [Documentation](#documentation)
- [License](#license)

---

## Background

We are building a multi-repo, multi-service system:

- `server-strategy` – core Node.js API server (auth, business logic, PostgreSQL)
- `gateway-strategy` – real-time Node.js gateway behind Nginx (WebSockets on LAN)
- `web-client-strategy` – React + TypeScript web dashboard
- `mobile-client-strategy` – React Native + Expo mobile app
- `ai-strategy` – AI/ML services (later phase)

To avoid **drift** and **duplication**, all shared concepts (user DTOs, auth tokens, error shapes, message envelopes, logging interfaces, etc.) live here in `common-strategy`.

If you’re working in any of the other repos and you find yourself thinking _“this type should probably be shared”_ — it probably belongs here.

---

## Features

Planned / evolving features:

- ✅ **Shared primitives**
  - `UUID`, `UnixMs`, and base entity shapes
- ✅ **Logging interfaces**
  - Minimal logger interface (`info`, `warn`, `error`, `debug`)
  - Simple console-based implementation for quick usage
- ✅ **Constants & environment helpers**
  - Environment flags (`isDev`, `isProd`)
  - Shared constants for cross-service behavior
- ✅ **Core DTOs**
  - User profiles, auth/session tokens, verification-code flows
- ✅ **Error & result model**
  - Shared `CommonError`, `Result`, and helpers for consistent error handling
- ✅ **HTTP & pagination envelopes**
  - API envelopes with typed metadata for cross-service responses
- 🛠 **Gateway envelopes**
  - Real-time envelope + ack types exist; concrete channel enums to follow

This list will grow as the system evolves.

---

## Installation

> ⚠️ During early development this package may not be published to npm yet.  
> We may use workspace linking or git-based installation until publishing is set up.

### Once published to npm (planned)

```bash
yarn add @your-org/common-strategy
# or
npm install @your-org/common-strategy
```

For internal development we currently use Yarn workspaces / git dependencies while the package remains unpublished.

---

## Getting Started

1. **Clone** this repository alongside the other strategy repos.
2. **Install dependencies**
   ```bash
   yarn install
   ```
3. **Validate the build**
   ```bash
   yarn test
   yarn lint
   yarn build
   ```
4. Use `yarn dev` while iterating so `tsup` rebuilds the dist bundle on changes.

---

## Scripts

- `yarn build` – Compile `src/index.ts` to ESM + CJS bundles with type declarations.
- `yarn dev` – Same as build but with file watching for local iteration.
- `yarn test` – Run the Vitest smoke suite under `src/__tests__`.
- `yarn lint` – ESLint over all TypeScript sources.
- `yarn prepare` – Hook for package managers; ensures the dist bundle exists before publish/linking.

---

## Project Structure

```
dist/                # tsup build output (ESM, CJS, and type declarations)
src/
  index.ts           # Package entrypoint that re-exports the public surface
  __tests__/smoke.test.ts
                     # Vitest smoke test covering env helpers, logger, and DTOs
  api/
    http.ts          # HTTP envelope + pagination shapes shared by services
    gateway.ts       # Real-time gateway envelopes, acks, and cursors
  constants/
    env.ts           # `APP_NAME` + ENV helper flags
  errors/
    base.ts          # `CommonError`, `ValidationError`, and `createError`
    result.ts        # Functional-style `Result`, `ok`, and `err` helpers
  logging/
    logger.ts        # Logger interface + `consoleLogger` implementation
  types/
    base.ts          # UUID/Unix timestamp primitives + `BaseEntity`
    user.ts          # User DTO shape + email alias
    auth.ts          # Auth token/session DTOs + send/verify-code contracts
    api.ts           # API-facing `Result` + `ApiError` definitions
```

All exports are wired through `src/index.ts` so downstream packages can import from the root (e.g., `import { User } from '@our-org/common-strategy'`).

---

## Contributing

- Prefer adding/adjusting shared contracts here instead of duplicating them downstream.
- Update this README and `SYSTEM_SYNC.md` whenever the public surface changes.
- Run `yarn lint && yarn test && yarn build` before raising a PR to keep CI happy.
- Breaking changes should include upgrade notes and coordination across the other repos.

---

## Related Repositories

- `server-strategy` – Node.js HTTP API server (auth, DB, business logic).
- `gateway-strategy` – Real-time WebSocket gateway behind Nginx.
- `web-client-strategy` – React dashboard that consumes these shared contracts.
- `mobile-client-strategy` – React Native app sharing DTOs and envelopes.
- `ai-strategy` – ML/AI services that depend on the same DTOs and constants.

---

## Documentation

- `SYSTEM_SYNC.md` – quick-start brief for agents working in this repo.
- Confluence “End to End Company Products” space:
  - `02 – System Architecture` for cross-repo diagrams.
  - `03 – Repositories → common-strategy` for deeper contract notes.
  - `05 – APIs & Contracts` for downstream consumption guidelines.

---

## License

© End to End Company Products — internal use only until a formal license is published.
