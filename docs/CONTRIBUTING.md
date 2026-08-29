# Contributing / Development Guide

Notes for working on this codebase day-to-day.

## Setup

```bash
npm install
npm run dev       # start local dev server at http://localhost:3000
npm run build     # production build (also a good sanity check before committing)
npm run lint      # run ESLint
```

Copy `.env.example` to `.env.local` if you need to set any environment
variables (none are required yet).

## Conventions

- **JavaScript only** — no `.ts`/`.tsx` files. Use JSDoc comments for
  light documentation where helpful.
- **Components** — one component per file, filename matches the
  component name (`Navbar.js` exports `Navbar`).
- **Imports** — use the `@/` alias for internal imports
  (`@/components/...`, `@/lib/...`) instead of relative paths like
  `../../`.
- **Styling** — Tailwind utility classes directly in JSX. Avoid adding a
  separate CSS file per component; use `app/globals.css` only for truly
  global rules.
- **Folder placement** — see `docs/FOLDER_STRUCTURE.md` before adding a
  new file if you're unsure where it belongs.
- **Don't build ahead** — add a folder or abstraction (Context, a new
  `lib/` helper, a `ui/` primitive) when it's actually needed by the
  feature you're building, not preemptively.

## Before committing

1. `npm run lint` passes with no errors.
2. `npm run build` completes successfully.
3. New folders that introduce a new concept get a short note in
   `docs/ARCHITECTURE.md` or `docs/FOLDER_STRUCTURE.md`.

## Git

- `.env.local` and `node_modules` are gitignored — never commit secrets.
- Keep commits scoped to one logical change (e.g. "Add community join
  button" rather than a mix of unrelated changes).
