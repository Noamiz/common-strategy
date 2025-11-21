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
- 🔜 **Core DTOs**
  - User DTOs
  - Auth/session tokens and verification flows (e.g. email + 6-digit code)
- 🔜 **Error model**
  - Standard error shape and result wrappers
- 🔜 **Gateway envelopes**
  - Message envelope types for WebSocket communication via `gateway-strategy`

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
