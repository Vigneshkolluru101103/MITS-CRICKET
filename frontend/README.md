<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
=======
# DILMAN Premier League (DPL) - Official Web Platform

The official digital platform for **DILMAN Premier League (DPL)**, featuring player registrations (Active Students & Alumni), tournament schedules, committee information, sponsor tiers, video gallery, and live stream redirects to CricHeroes.

## Repository Structure

```
dilman-premier-league/
├── frontend/             # Production React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion
├── backend/              # Node.js + Express + Prisma + PostgreSQL (Backend scaffold)
└── README.md
```

## Quick Start (Frontend)

```bash
cd frontend
npm install
npm run dev
```

The app will launch at `http://localhost:5173`.

## Core Features
- **Aesthetic Luxury Sports Design**: Dark mode aesthetic with champagne gold & metallic accents.
- **Player Registration**: Multi-step interactive form with Zod validation, role selection, photo preview, and digital player pass generator.
- **CricHeroes Integration**: Prominent CTAs for live score tracking & streaming on CricHeroes.
- **Dynamic Content**: Countdown timer, interactive sponsor pitch kit, filterable gallery, rules & regulations viewer, committee directory, and news timeline.
>>>>>>> 7bbff3c5784eb3b956eb771ebfa9a170da3e4342
