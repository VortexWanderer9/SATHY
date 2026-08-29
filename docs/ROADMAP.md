# Roadmap

This is the planned order of feature work. It is a sequencing guide, not
a spec — each phase will be designed in detail when it's actually built.
Nothing beyond Phase 0 has been implemented yet.

## Phase 0 — Foundation ✅
Next.js + App Router + JavaScript + Tailwind + ESLint project setup,
basic layout/navigation shell, no backend.

## Phase 1 — Authentication
Sign up, log in, log out, session handling. Introduces the first real
backend dependency (auth provider and/or database).

## Phase 2 — User Profiles
Basic profile data (name, bio, interests, location), viewing and editing
your own profile.

## Phase 3 — Communities
Creating, joining, and browsing communities built around shared
interests.

## Phase 4 — Activities
Creating and joining local activities/events.

## Phase 5 — Discovery
Search and browse people, communities, and activities based on shared
interests and location — the core "discovery" value of SATHY.

## Phase 6 — Messaging
Direct messages between users, likely scoped initially to shared
communities/activities.

## Phase 7 — Recommendations
Suggesting relevant people, communities, and activities based on
interests and location, building on data from earlier phases.

---

Each phase, when started, should get:
1. A short design note (data shape, routes, main components needed)
2. Its own route(s) under `app/`
3. Its own component folder under `components/<feature>/` if needed
4. An update to `docs/ARCHITECTURE.md` describing how it fits in
