# Security Platform

Production-grade security platform built with React 19, Vite 6, and Tailwind CSS v4. Deployed to Cloudflare Pages.

---

## Tech Stack

| Layer           | Technology                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| Framework       | [React 19](https://react.dev)                                                                                |
| Build Tool      | [Vite 6](https://vite.dev)                                                                                   |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com)                                                                   |
| Routing         | [React Router v7](https://reactrouter.com)                                                                   |
| Animation       | [Framer Motion](https://motion.dev) + [GSAP](https://gsap.com) + [Lenis](https://lenis.darkroom.engineering) |
| Forms           | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)                                      |
| Backend         | [Firebase](https://firebase.google.com) (modular SDK)                                                        |
| Icons           | [Lucide React](https://lucide.dev)                                                                           |
| Head Management | [React Helmet Async](https://github.com/vuer-ai/react-helmet-async)                                          |
| Utilities       | clsx · tailwind-merge                                                                                        |
| Fonts           | Inter · JetBrains Mono                                                                                       |
| Hosting         | [Cloudflare Pages](https://pages.cloudflare.com)                                                             |
| Linting         | [ESLint 9](https://eslint.org) (flat config)                                                                 |
| Formatting      | [Prettier](https://prettier.io)                                                                              |

---

## Installation

```bash
npm install
```

Copy the environment template and fill in your values:

```bash
cp .env.example .env
```

---

## Development

```bash
npm run dev
```

Starts the Vite dev server at [http://localhost:5180](http://localhost:5180) with HMR.

### Linting

```bash
npm run lint        # Check for errors (zero-warnings policy)
npm run lint:fix    # Auto-fix where possible
```

### Formatting

```bash
npm run format       # Check formatting
npm run format:fix   # Auto-format all files
```

---

## Build

```bash
npm run build
```

Produces an optimized production build in `dist/`.

### Preview

```bash
npm run preview
```

Serves the production build locally at `http://localhost:4173`.

---

## Deploy to Cloudflare Pages

### One-time setup

```bash
npx wrangler login
```

### Deploy

```bash
npm run deploy             # Production
npm run deploy:preview     # Preview branch
```

Alternatively, connect your repository to Cloudflare Pages for automatic deployments on push.

### Secrets

Set Firebase keys and other secrets via the Cloudflare dashboard or CLI:

```bash
npx wrangler pages secret put VITE_FIREBASE_API_KEY --project-name=security-website
```

---

## Environment Variables

| Variable                            | Required | Description                               |
| ----------------------------------- | -------- | ----------------------------------------- |
| `VITE_APP_NAME`                     | No       | Application display name                  |
| `VITE_APP_URL`                      | No       | Canonical URL                             |
| `VITE_FIREBASE_API_KEY`             | Yes*     | Firebase API key                          |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Yes*     | Firebase auth domain                      |
| `VITE_FIREBASE_PROJECT_ID`          | Yes*     | Firebase project ID                       |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Yes*     | Firebase storage bucket                   |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Yes*     | Firebase sender ID                        |
| `VITE_FIREBASE_APP_ID`              | Yes*     | Firebase app ID                           |
| `VITE_ENABLE_ANALYTICS`             | No       | Enable Firebase Analytics                 |
| `VITE_ENABLE_AUTH`                  | No       | Enable authentication                     |
| `VITE_LOG_LEVEL`                    | No       | Log level (`debug`/`info`/`warn`/`error`) |

_\*Required only when Firebase features are enabled._

---

## Folder Structure

```
├── public/                    # Static assets (copied as-is to dist)
├── src/
│   ├── animations/            # Framer Motion variants, GSAP timelines
│   ├── assets/                # Images, icons, fonts, static files
│   ├── components/            # Shared/reusable UI components
│   ├── config/                # App configuration, constants
│   ├── data/                  # Static data, mock data, JSON fixtures
│   ├── firebase/              # Firebase init, auth, firestore helpers
│   ├── hooks/                 # Custom React hooks (e.g. useLenis)
│   ├── layouts/               # Page layout components
│   ├── pages/                 # Route-level page components
│   ├── services/              # API clients, third-party integrations
│   ├── styles/                # Global styles, Tailwind entry, theme tokens
│   └── utils/                 # Pure utility functions, helpers
├── .env.example               # Environment variable template
├── .gitignore
├── eslint.config.js           # ESLint 9 flat config
├── index.html                 # Entry HTML
├── jsconfig.json              # Path aliases for IDE support
├── package.json
├── prettier.config.js
├── README.md
├── vite.config.js             # Vite configuration + aliases
└── wrangler.toml              # Cloudflare Pages configuration
```

---

## Path Aliases

All imports use the `@` prefix mapped to `src/`:

| Alias            | Resolves To        |
| ---------------- | ------------------ |
| `@/components/*` | `src/components/*` |
| `@/pages/*`      | `src/pages/*`      |
| `@/layouts/*`    | `src/layouts/*`    |
| `@/hooks/*`      | `src/hooks/*`      |
| `@/utils/*`      | `src/utils/*`      |
| `@/services/*`   | `src/services/*`   |
| `@/firebase/*`   | `src/firebase/*`   |
| `@/animations/*` | `src/animations/*` |
| `@/styles/*`     | `src/styles/*`     |
| `@/assets/*`     | `src/assets/*`     |
| `@/data/*`       | `src/data/*`       |
| `@/config/*`     | `src/config/*`     |

Example:

```jsx
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
```

---

## Design System

### Theme Tokens

All design tokens are defined in `src/styles/index.css` via Tailwind CSS v4 `@theme` directive:

| Category   | Tokens                                                                       |
| ---------- | ---------------------------------------------------------------------------- |
| Typography | Inter (sans), JetBrains Mono (mono) — weights 400–700                        |
| Colors     | `accent` (electric blue), `cyan` (secondary), `success`, `warning`, `danger` |
| Surfaces   | `surface-root`, `surface-raised`, `surface-overlay`, `surface-muted`         |
| Borders    | `border-default`, `border-muted`, `border-accent`                            |
| Shadows    | `surface`, `raised`, `overlay`, `glow-accent`, `glow-success`, `glow-danger` |
| Animations | `fade-in`, `fade-up`, `scale-in`, `slide-in-right`, `pulse-glow`             |

### Smooth Scrolling

Lenis provides hardware-accelerated smooth scrolling. The `useLenis` hook (in `@/hooks/useLenis`) handles initialization and cleanup. It respects `prefers-reduced-motion` — smooth scrolling is automatically disabled for users who request reduced motion.

---

## Coding Standards

- **Zero warnings** — ESLint `--max-warnings 0` is enforced.
- **Zero lint errors** — all lint rules must pass before merge.
- **Prettier formatting** — all code is auto-formatted; format-on-save recommended.
- **Named exports preferred** — use `export function` / `export const` over default exports.
- **No barrel files** — import directly from the module file.
- **Hooks-first components** — hooks at the top, early returns, then JSX.
- **Tailwind-first styling** — use utility classes; custom CSS only for complex animations or third-party overrides.
- **`clsx` for conditional classes** — never concatenate class strings manually.
- **`tailwind-merge` for composed components** — merge incoming `className` with base classes.
- **Firebase modular SDK only** — no `firebase/compat` imports.
- **Environment variables** — all configurable values live in `.env`; never hardcode keys.
