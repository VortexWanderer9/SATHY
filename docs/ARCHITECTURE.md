# Architecture

SATHY is a Next.js App Router frontend with a static data layer and a shared UI system. The current version is product-facing and visually complete for the frontend baseline, but it is still mock-driven and does not include a real backend, database, or authenticated user state.

## High-level structure

```
app/                Routes and route-group layouts
└── (landing)       Marketing page shell
└── (app)           Main product shell

components/         Presentational and shared UI code
├── landing/        Marketing-page-only sections
├── layout/         Navbar and Footer shell
└── ui/             Generic UI primitives reused across routes

config/             Static site config and nav metadata
lib/                Utility functions and mock data
context/            Placeholder area for future shared app state
hooks/              Placeholder area for future custom hooks
public/             Static images/icons
```

## Routing model

The app uses route groups to separate the public landing experience from the authenticated-style product experience.

### Public/marketing routes

- `/` — landing page

### Product routes

- `/login`
- `/signup`
- `/discover`
- `/communities`
- `/communities/[id]`
- `/activities`
- `/activities/[id]`
- `/profile`
- `/settings`
- `/make-friends`
- `/messages`

The route group layouts are not standalone pages; they are layout wrappers enabling consistent shell behavior across the app.

## UI system

The shared design system currently lives in `components/ui/` and is intentionally generic:

- `Button` — shared action styling and sizing
- `Card` — consistent page/card container pattern
- `Badge` — tags and status labels
- `Input` — form field wrapper with form semantics
- `Avatar` — user image or initials
- `Container` — width and spacing wrapper

The app uses these primitives rather than embedding ad hoc styled markup in each page.

## Data flow

The product pages are driven by mock data under `lib/mock/`:

- `activities.js`
- `communities.js`
- `discover.js`

This keeps the UI stable while the product is still front-end only. Route detail pages resolve the requested item by id from those arrays.

## State and auth

There is currently no `UserContext` or authenticated session flow in the codebase. Local component state is used for small forms and search/filter interactions; global user state is intentionally not introduced until there is a real app requirement for it.

## Configuration

`config/site.js` is the single source of truth for shared navigation and footer metadata. This keeps top-level links consistent across the Navbar and Footer without repeating hardcoded values in multiple components.

## Styling

Tailwind utilities are used directly in JSX, and the UI primitives provide the consistent baseline for spacing, border radius, shadows, and typography. The styling system is shared rather than split into page-specific CSS conventions.

## Current status

The frontend baseline is in place and stable. The next product phase should extend the current structure and keep route names, UI primitives, and documentation aligned as the app grows.
