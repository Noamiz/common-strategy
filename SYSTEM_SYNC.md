# System Sync – End to End Company Products

## 1. Purpose of This File

This document gives **AI coding tools (Cursor, ChatGPT, etc.)** and developers a compact overview of:

- The overall multi-repo system.
- The role of this specific repository: `common-strategy`.
- Where to find deeper documentation (Confluence).

When starting a new session or a big change, load/reference this file so the agent understands the **whole picture**.

---

## 2. Global System Overview

We are building a **multi-service, multi-app architecture** with 6 main repositories:

1. **common-strategy**  
   Shared TypeScript library: types, DTOs, constants, logging interfaces, and API contracts used by all other repos.

2. **server-strategy**  
   Core Node.js TypeScript HTTP API server: auth, user management, business logic, PostgreSQL access, Swagger/OpenAPI docs.

3. **gateway-strategy**  
   Node.js TypeScript real-time gateway running behind Nginx (on a NUC or similar LAN device).  
   Handles secure WebSocket connections and acts as a hub for real-time communication between services and clients.

4. **web-client-strategy**  
   React + TypeScript web application.  
   Dashboard for users of all levels. Talks to `server-strategy` over HTTP and `gateway-strategy` for real-time features.

5. **mobile-client-strategy**  
   React Native + Expo + TypeScript mobile application.  
   Users can register/login (e.g., via email + 6-digit code), and interact with the system via `server-strategy` and `gateway-strategy`.

6. **ai-strategy**  
   AI/ML services (to be defined later).  
   Consumes data from `server-strategy` and/or `gateway-strategy` and returns insights or predictions.

### Key Principles

- **TypeScript everywhere** – shared types from `common-strategy` are the source of truth for DTOs and envelopes.
- **Separation of concerns**:
  - `server-strategy` = core APIs + DB.
  - `gateway-strategy` = real-time WebSocket routing.
  - `web-client` / `mobile-client` = UI and UX.
  - `ai-strategy` = advanced logic/insights.
- **Production mindset**:
  - Real domains (e.g., via Squarespace).
  - Hosting on AWS (or similar).
  - Real PostgreSQL databases.
  - CI/CD and logging in every service.

---

## 3. This Repo: `common-strategy`

**Role**:  
`common-strategy` is a shared TypeScript NPM package that defines **common contracts and utilities** used by all other repos.

**Responsibilities**:

- **Shared types and DTOs**

  - User DTOs
  - Auth tokens, sessions, and verification-code flows
  - Error shapes, `Result` helpers, and HTTP/gateway envelopes

- **Shared constants and config interfaces**

  - Environment keys and config shapes
  - Cross-service constants (timeout defaults, enums)

- **Logging interfaces and thin helpers**
  - Standard logging interface (info, warn, error, debug)
  - Minimal implementations that other repos can wrap/extend

**Out of scope**:

- Business logic.
- Running servers or clients.
- Direct database or network calls.

---

## 4. Current Code Modules (Nov 2025)

- `src/index.ts` – central re-export surface for everything listed below. Downstream packages should import from the package root instead of deep paths.
- `src/types/`
  - `base.ts` defines primitives such as `UUID`, `UnixMs`, and `BaseEntity`.
  - `user.ts` contains the canonical `User` DTO + email alias.
  - `auth.ts` adds auth token/session DTOs plus `send-code` / `verify-code` contracts.
  - `api.ts` provides API-facing `ApiError` + `{ ok, error }` style results.
- `src/api/`
  - `http.ts` standardizes HTTP envelopes and cursor-based pagination results.
  - `gateway.ts` defines real-time envelopes, ack payloads, and subscription cursors (channel enums pending).
- `src/constants/`
  - `env.ts` exposes `APP_NAME` and `ENV` helpers (`isDev`, `isProd`, `nodeEnv`).
- `src/errors/`
  - `base.ts` standardizes `CommonError`, `ValidationError`, and the `createError` helper.
  - `result.ts` provides functional helpers `ok/err` built on the shared `Result<T>`.
- `src/logging/logger.ts`
  - Logger interface (`debug/info/warn/error`) plus a minimal `consoleLogger`.
- `src/__tests__/smoke.test.ts`
  - Vitest suite verifying that env flags, logger, and DTO exports work through the package entrypoint.

Keep this section updated whenever new shared contracts land so the other repos (and agents) know what is ready to consume.

---

## 5. Workflow Notes

- Install dependencies with `yarn install`.
- Primary scripts:
  - `yarn dev` – watch-mode bundle via tsup.
  - `yarn build` – emit CJS + ESM bundles with `.d.ts` files.
  - `yarn test` – Vitest smoke tests.
  - `yarn lint` – ESLint over `src`.
- Any change to exported contracts must include README + System Sync updates and coordination across `server-`, `gateway-`, `web-client-`, and `mobile-client-strategy`.

---

## 6. Documentation Sources

- **Confluence Space**: “End to End Company Products”
  - `01 – Vision & Strategy` – product vision, personas, roadmap.
  - `02 – System Architecture` – overall architecture and interactions.
  - `03 – Repositories → common-strategy` – detailed docs for this package.
  - `05 – APIs & Contracts` – DTOs and contracts shared between services.

If this file and Confluence ever disagree, **Confluence is the source of truth**, and this file should be updated.

---

## 7. How Agents Should Use This

- Assume all repos **eventually depend** on `common-strategy` for shared contracts.
- When adding new DTOs, envelopes, or cross-cutting types, prefer adding them here.
- When proposing breaking changes to shared types, consider:
  - Impact on `server-strategy`, `gateway-strategy`, `web-client-strategy`, `mobile-client-strategy`, and `ai-strategy`.
  - The need to update all dependent repos and Confluence documentation.
