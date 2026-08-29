# Architecture

This document describes how SATHY is put together today, and the shape
it's expected to grow into. It reflects the current foundation only —
nothing here describes code that has been written ahead of time.

## High-level approach

SATHY is a Next.js App Router application, currently **frontend-only**.
There is no backend, database, or authentication yet. The app renders
static/client content and will grow backend capabilities feature by
feature.

```
┌─────────────────────────────┐
│           app/              │  Routes (URL structure) + layouts
├─────────────────────────────┤
│        components/          │  Presentational UI, split by scope:
│   layout/  ui/  <feature>/  │   layout = shell, ui = generic, feature = specific
├─────────────────────────────┤
│      hooks/   context/      │  Shared stateful logic & cross-cutting state
├─────────────────────────────┤
│           lib/              │  Framework-agnostic helper functions
├─────────────────────────────┤
│          config/            │  Static site configuration (non-secret)
└─────────────────────────────┘
```

Each layer only depends on the layers below it. `app/` can import from
anywhere; `lib/` should never import from `components/` or `app/`.

## Routing (`app/`)

Next.js App Router: each folder under `app/` maps to a URL segment, and
`page.js` is the content rendered at that route. `layout.js` wraps every
route in the shared Navbar/Footer shell.

Planned route groups as features are built (none exist yet):

| Route            | Purpose                                   |
|-------------------|-------------------------------------------|
| `/`               | Landing / home (exists today)             |
| `/discover`       | Browse people, communities, activities    |
| `/communities`    | Community listing & detail pages          |
| `/activities`     | Activity listing & detail pages           |
| `/profile/[id]`   | User profile pages                        |
| `/messages`       | Messaging                                 |
| `/login`, `/signup` | Authentication                          |

When a feature is built, its routes get their own folder under `app/`,
and, if it needs several components, a matching folder under
`components/<feature>/`.

## Components (`components/`)

Split by scope, not by feature-readiness:

- **`layout/`** — the app shell that appears on every page (Navbar,
  Footer). Rarely changes once set.
- **`ui/`** — generic, feature-agnostic primitives (Button, Input, Card).
  Reusable in any project, not specific to SATHY.
- **`<feature>/`** (future) — components specific to one feature, e.g.
  `components/communities/CommunityCard.js`. Created when that feature
  is built, not before.

## Shared logic (`hooks/`, `context/`, `lib/`)

- **`hooks/`** — reusable stateful logic shared by multiple components.
- **`context/`** — React Context for state genuinely needed across many
  unrelated components (e.g. a future logged-in user). Avoided until it's
  actually needed, to keep state simple and local by default.
- **`lib/`** — plain JS helpers with no React/Next dependency. Safe to
  unit test in isolation. Once a backend exists, API client helpers and
  data-fetching functions will live here too.

## Configuration (`config/`)

Static, non-secret configuration such as the site name, description, and
navigation structure, kept out of components so it's edited in one place.

Secrets and environment-specific values go through `.env.local`
(see `.env.example`), never through `config/`.

## Styling

Tailwind CSS v4, configured via `postcss.config.mjs` and imported once in
`app/globals.css`. No CSS-in-JS or component-scoped stylesheets — utility
classes directly in JSX, which keeps styling colocated with markup.

## State management

Plain React state (`useState`, `useReducer`) for now. No global state
library (Redux/Zustand/etc.) has been introduced, and shouldn't be until
there's a concrete cross-cutting state need that Context can't handle
cleanly.

## What's deliberately not here yet

Authentication, a database, API routes, and all product features
(profiles, communities, activities, posts, messaging, recommendations)
are intentionally absent. See `ROADMAP.md` for the planned build order.
When each is added, this file should be updated to describe how it fits
into the architecture above.
