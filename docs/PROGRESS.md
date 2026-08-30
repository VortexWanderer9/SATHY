# Progress Tracking

Status: **Phase 2, Part 2 — Multi-User Profiles complete. User can view other people's profiles from Make Friends and Messages entry points. Self-ID redirects to the editable profile. Pipeline clean.**

---

## Phase 2, Part 1 — Mock Auth & Session _(2026-08-30)_

End-to-end, no backend, no passwords. Context-based session that genuinely
survives navigation between routes, drives the Navbar UI, and protects 4
routes. Designed to be swapped for a real backend call later by replacing
the body of `login()` / `signup()` / `logout()` / `updateUser()` in
`context/UserContext.js` only — every other site surface uses the
`useUser()` hook and never touches mock data directly.

### Checklist

- [x] **Task 1** — `lib/mock/users.js` exists and exports a `mockUsers` array of
      7 user objects with fields `{ id, name, email, bio, location, age, interests[], avatarUrl }`.
      Shape matches exactly what the Profile + Settings pages use. Includes the
      canonical test entry `email: "user@gmail.com"` → **Demo User** (id `user-1`).

- [x] **Task 2** — `context/UserContext.js` provides `<UserProvider>` and `useUser()`.
      API surface: - `currentUser` (null when logged out) - `login(email)` — case-insensitive lookup in mockUsers; if not found,
      creates a new user object inline with a generated `gen-user-N` id, the
      email prefix as display name, empty bio/interests/location, and sets
      it as currentUser (the "signup via just email" flow). - `signup({ name, email })` — same create-a-new-user branch but accepts
      an explicit name. - `logout()` → `currentUser = null` - `updateUser(fields)` → shallow-merge fields into the in-context user
      copy (does **not** write to the mock data file).
      Root `app/layout.js` wraps `<body>` contents in `<UserProvider>`.

- [x] **Task 3** — `app/(app)/login/page.js` updated to email-only single-field
      form (Password Input removed). On submit calls `login(email)` then
      `router.push("/profile")`. "Don't have an account? Sign up" link still
      present.

- [x] **Task 4** — `app/(app)/signup/page.js` updated to name + email only
      (Password Input removed). On submit calls `signup({ name, email })` then
      `router.push("/profile")`. "Already have an account? Log in" link still
      present.

- [x] **Task 5** — `components/layout/Navbar.js` re-wired. Local state
      `isLoggedIn` boolean was removed; reads `currentUser` from context
      instead (Navbar still `"use client"`). - Desktop: logged-in state shows `Avatar` linking to `/profile` (using
      `currentUser.name` / `avatarUrl`) plus a small ghost "Log out" Button
      that calls `logout()` then `router.push("/")`. - Logged-out state: Log In + Sign Up Buttons remain unchanged. - Mobile hamburger panel mirrors the same split (avatar-link + logout
      button vs login + signup buttons).

- [x] **Task 6** — Soft route protection implemented on 4 routes. All 4 were
      converted to `"use client"` and use the same pattern: 1. `useEffect` watching `currentUser` + `router` deps. 2. If `!currentUser` → `router.replace("/login")`. 3. Guard clause `if (!currentUser) return null;` before any JSX that
      would otherwise try to render user data.
      Protected list: - [x] `/profile` — also **rewired to actually render `currentUser` data**:
      Avatar, name, location, bio, and interests array (array of Badges with
      cyclic 6-variant rainbow). Sensible empty-state text for missing
      location, missing bio, or empty interests. - [x] `/settings` — also **rewired to `updateUser()` on Save**:
      `SettingsForm` inner component is mounted with `key={currentUser.id}`,
      which causes a clean remount when switching users (avoids stale form
      state without cascading `setState` inside an `useEffect`, which the
      linter would reject). On Submit: `updateUser({ name, email, location, bio })`
      then `router.push("/profile")` — changes are visible immediately on the
      profile page because both read from the same context object. - [x] `/make-friends` — guard only; content unchanged. - [x] `/messages` — guard only; content unchanged.

- [x] **Task 7** (Manual test matrix, verified at code + data-flow level since
      the sandbox cannot keep a persistent browser tab across invocations):

      | Flow | Expected | OK? |
      |------|----------|-----|
      | Login as `user@gmail.com` → /login submit | `login("user@gmail.com")` finds `user-1` "Demo User", `router.push("/profile")`, Profile page renders Demo User data | ✅ |
      | Logged-in state of Navbar | Avatar + name "Demo User" in mobile menu + "Log out" Button visible in both breakpoints, Login/Signup hidden | ✅ |
      | Log out button clicked | `logout()` → `currentUser = null`, `router.push("/")` → homepage, Navbar reverts to Login/Signup | ✅ |
      | Visit `/profile` directly after logout | `useEffect` guard fires → `router.replace("/login")`, JSX returns `null` during transit | ✅ |
      | Visit `/settings` after logout | Same | ✅ |
      | Visit `/make-friends` after logout | Same | ✅ |
      | Visit `/messages` after logout | Same | ✅ |
      | Sign up with `{ name: "New Person", email: "new@example.com" }` | New user object created with id `gen-user-N` + blank bio/int/loc → `router.push("/profile")` → Profile page shows "New Person" + empty placeholders | ✅ |
      | Login with a brand-new email (not in mockUsers) | Triggers the "signup via email" branch of `login()` → creates a gen-user entry with email prefix as name → lands on profile | ✅ |
      | Settings → Save edits | `updateUser({ name, email, location, bio })` writes back to context. Immediate navigation to /profile shows the edited values because both read from the **same** `currentUser` reference | ✅ |

- [x] **Task 8** — Final `npm run build` + `npm run lint` both exit 0 clean
      (12/12 pages, 0 warnings, 0 lint errors).

### Files changed / added (Phase 2, Part 1)

**Created:**

- `lib/mock/users.js`
- `context/UserContext.js`

**Modified:**

- `app/layout.js` — wrap children in `<UserProvider>`
- `app/(app)/login/page.js` — email-only + context login + redirect to /profile
- `app/(app)/signup/page.js` — name+email only + context signup + redirect to /profile
- `components/layout/Navbar.js` — read from useUser(), avatar + logout, both breakpoints
- `app/(app)/profile/page.js` — guard + render from currentUser
- `app/(app)/settings/page.js` — guard + updateUser() on Save + key-driven remount pattern
- `app/(app)/make-friends/page.js` — guard
- `app/(app)/messages/page.js` — guard

**Nothing was deleted.**

### Lint catch (and how it was resolved)

During Task 6b, the first Settings draft loaded initial form values by
calling `setName/setEmail/setLocation/setBio` synchronously inside the
body of a `useEffect`. The `react-hooks/set-state-in-effect` ESLint rule
flagged this correctly — cascading re-renders.

Resolved by:

1. Splitting the page into `SettingsPage` (owns the guard + passes a
   `key={currentUser.id}` down) + inner `SettingsForm` component.
2. `SettingsForm` initializes each field once with `useState(() => currentUser?.field ?? "")`
   (lazy initializer).
3. When `currentUser.id` changes, React remounts `SettingsForm` with fresh
   initial state automatically — no setState-in-effect needed, no stale
   edits bleeding across accounts, and linter is happy.

Pattern is reusable for any page that needs "reset local state when the
context user changes" behavior without fighting the linter.

### Continue from here

N/A — all 8 checklist items are complete. Next work is Phase 2, Part 2
(defined by product), which can safely assume the `useUser()` hook exists
and `currentUser` correctly drives Navbar + route protection.

### Notes for real backend swap later

All mock-sensitive code lives in exactly one file:
[context/UserContext.js](file:///home/tyrell-wellick/Documents/TEMP/sathy-foundation/sathy/context/UserContext.js).

When backend auth arrives, only this file needs changes — replace the body
of `login()`, `signup()`, `logout()`, and `updateUser()` with real fetch()
calls, and optionally read a JWT/token from `localStorage` inside a
provider-side `useEffect` on first mount. All callers use the same public
API (`useUser()`) and require zero changes.

---

## Final Cleanup — Frontend Complete _(2026-08-30)_

This section is the official handoff from the frontend build phase to the admin panel build phase. It represents the exact state of the codebase after the 9-step cleanup pass.

### Full route inventory

The App Router currently serves the following 12 user-facing routes, confirmed to render without errors during static generation (12/12 pages built successfully).

| #   | Route               | Source file                          | Render mode        | Shell                         |
| --- | ------------------- | ------------------------------------ | ------------------ | ----------------------------- |
| 1   | `/`                 | `app/(landing)/page.js`              | ○ Static           | LandingNavbar + LandingFooter |
| 2   | `/login`            | `app/(app)/login/page.js`            | ○ Static           | Navbar + Footer               |
| 3   | `/signup`           | `app/(app)/signup/page.js`           | ○ Static           | Navbar + Footer               |
| 4   | `/discover`         | `app/(app)/discover/page.js`         | ○ Static           | Navbar + Footer               |
| 5   | `/communities`      | `app/(app)/communities/page.js`      | ○ Static           | Navbar + Footer               |
| 6   | `/communities/[id]` | `app/(app)/communities/[id]/page.js` | ƒ Dynamic (server) | Navbar + Footer               |
| 7   | `/activities`       | `app/(app)/activities/page.js`       | ○ Static           | Navbar + Footer               |
| 8   | `/activities/[id]`  | `app/(app)/activities/[id]/page.js`  | ƒ Dynamic (server) | Navbar + Footer               |
| 9   | `/profile`          | `app/(app)/profile/page.js`          | ○ Static           | Navbar + Footer               |
| 10  | `/settings`         | `app/(app)/settings/page.js`         | ○ Static           | Navbar + Footer               |
| 11  | `/make-friends`     | `app/(app)/make-friends/page.js`     | ○ Static           | Navbar + Footer               |
| 12  | `/messages`         | `app/(app)/messages/page.js`         | ○ Static           | Navbar + Footer               |

Additional framework routes (not product-facing):

- `/_not-found` — served by `app/not-found.js` (shared 404 for invalid URLs)
- Route groups `app/(app)/` and `app/(landing)/` — layout wrappers only, no URL segment

### What was deleted (with reasons)

**No files were deleted** during this cleanup pass. The audit concluded:

- Every file in `components/` (ui/, layout/, landing/) is imported by at least one route or sibling barrel export.
- Every file in `lib/` (utils.js + 3 mock files in lib/mock/) is imported.
- `config/site.js` is the single source of truth and imported in 5+ locations.
- Landing-shell components (`LandingNavbar`/`LandingFooter`) vs app-shell (`Navbar`/`Footer`) are themed variants, not duplicates — both are needed by their respective route-group layouts.
- No components were confirmed redundant; the repo intentionally carries a lean file set.

### What was fixed during cleanup

1. **Discover page — hardcoded detail HREFs** _(critical routing bug)_
   - **Before:** All community-type discover items linked to `/communities/nepal-trail-runners` (regardless of which community the card represented). All activity-type items similarly hardcoded to `/activities/weekend-sunrise-hike-shivapuri`.
   - **Fix:** Added an explicit `detailId` field to each community and activity record in [lib/mock/discover.js](file:///home/tyrell-wellick/Documents/TEMP/sathy-foundation/sathy/lib/mock/discover.js). Updated [app/(app)/discover/page.js](<file:///home/tyrell-wellick/Documents/TEMP/sathy-foundation/sathy/app/(app)/discover/page.js#L101-L107>) to interpolate `item.detailId` into the href for each type. The person type still correctly falls through to `/make-friends`.
   - **Mappings added:**
     - `community-1 → nepal-trail-runners`
     - `community-2 → kathmandu-board-game-nights`
     - `community-3 → open-source-nepal`
     - `community-4 → home-cooks-collective`
     - `activity-1 → weekend-sunrise-hike-shivapuri`
     - `activity-2 → intro-to-pottery-workshop`
     - `activity-3 → mountain-photography-walk`
     - `activity-4 → sunrise-yoga-swayambhunath`

2. **Folder-structure doc was materially stale**
   - **Before:** [docs/FOLDER_STRUCTURE.md](file:///home/tyrell-wellick/Documents/TEMP/sathy-foundation/sathy/docs/FOLDER_STRUCTURE.md) described the old pre-route-group layout — page.js at `app/page.js` root, no route groups, empty `hooks/` and `context/` listed as present, no `components/landing/` or `lib/mock/` folders, incomplete `docs/` listing.
   - **Fix:** Rewrote the entire doc to match the current tree. Includes: both route groups and every route file in tree form, all 21 component files categorized, the `lib/mock/` triplet, route-groups primer section, and updated "where does a new file go?" decision guide. `hooks/` and `context/` are now described as "would go in … when first created" (accurate since neither folder exists yet).

### Possibly unused (needs confirmation, but left in place)

None. The import audit was exhaustive:

- **components/ui/** (6 files): Button, Card, Badge, Input, Avatar, Container → all used.
- **components/layout/** (2 files): Navbar, Footer → both imported by `app/(app)/layout.js`.
- **components/landing/** (8 files): LandingNavbar + LandingFooter imported by `app/(landing)/layout.js`; the other 5 section components + barrel index imported by `app/(landing)/page.js`.
- **lib/utils.js**: `cn()` used by every ui/ primitive + landing components + Discover page.
- **lib/mock/discover.js**: used by Discover and Make Friends pages.
- **lib/mock/communities.js**: used by Communities list + Communities [id] detail pages.
- **lib/mock/activities.js**: used by Activities list + Activities [id] detail pages.
- **config/site.js**: used by Root layout metadata, both Navbars (app + landing), both Footers (app + landing).

### Dead-link final check result

Every `Link` href and `Button asChild` href across the codebase was scanned against the nav/footer/page-link spec:

- **Top nav** (both shells): `/discover`, `/communities`, `/activities`, `/make-friends`, `/messages` → matches siteConfig.navLinks exactly.
- **Footer product column** (both shells): same 4 routes → matches.
- **Footer company/legal**: About, Privacy, Terms → href="#" with `comingSoon: true` flag, and both Footer components show a "Coming soon" Badge next to each link → **not** silent dead links.
- **Auth pages**: login ↔ signup crosslinks correct; submit handler `router.push("/profile")` correct (per Mock Auth & Session spec).
- **List pages**: Communities and Activities cards link to `/communities/${id}` and `/activities/${id}` using actual item IDs → correct.
- **Detail pages**: "← Back to …" links return to the correct list. "Join Community" / "RSVP" buttons are `disabled` with a "Coming soon" caption below → explicit, not silent.
- **Discover page**: Fixed per-item detail links (see fix #1 above). Person cards → `/make-friends` → correct per spec.
- **Profile** → Edit Profile → `/settings`; **Settings** ← Back to Profile → `/profile` → correct.
- **Messages** → "Find more people" → `/make-friends`; thread-row "Open" → `/profile` → correct.
- **Landing Hero "Learn More"** → anchor `#features` → matches the `id="features"` on LandingFeatures section.
- **Landing CTA** → `/signup` → correct.
- **404 (not-found)** → "/" home → correct.
- **App back links**: Profile links "← Back home" to "/" → correct (it sits in the app shell but returns to landing, which is the canonical homepage).

### Visual/component consistency check result

All pages pass the consistency baseline:

- **Button**: Pages use variants `primary`, `secondary`, `ghost`, `outline` with sizes `sm/md/lg` — only the 4 variants defined in the Button primitive. No raw `<button>` tags anywhere in page or layout code. Landing pages layer brand-themed `className` overrides on top of the shared Button primitive (correct, not a separate component).
- **Card**: Every page uses the `components/ui/Card` primitive — no raw `<div class="rounded-xl border … p-6">` containers standing in for cards. Landing components layer brand-themed overrides via className.
- **Badge**: Consistent use of the Badge primitive with the 8 defined variants (`default`, `primary`, `success`, `warning`, `danger`, `info`, `purple`, `pink`). Footer "Coming soon" uses the Badge primitive — never a raw span.
- **Spacing scale**: All pages use `Container className="py-12"` or `Container max="4xl" className="py-16"`; list sections use `grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3` uniformly; form fields use `flex flex-col gap-5` inside Cards.
- **Container widths**: App shell defaults to `Container max="5xl"` (default); auth pages set `max="4xl"` with inner `max-w-md`; landing uses `max="6xl"` for the branded feel.
- **Raw HTML check**: Settings page carries a raw `<textarea>` for the bio field — not ideal, but there is no Textarea primitive yet and creating one is outside the cleanup scope. Styling on the raw textarea is manually aligned to the Input primitive's Tailwind class set (same border, focus, radius, spacing). This is flagged as a **small TODO** for the admin-panel phase if a reusable multiline field is needed there.
- **Messages thread rows**: Raw `<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">` inside a parent Card — these are list-item rows inside a Card, not standalone cards, which is acceptable.

### Console-warning sweep result

The Next.js static-generation pipeline ran 12/12 pages to completion with no React warnings in the build output (no missing-key warnings, no invalid-prop warnings, no hydration hints). The code-level audit of all map blocks confirms:

- Every `.map()` call returns an element with a stable, unique `key` prop:
  - Navbar/Footer navLinks → `key={link.href}`
  - Discover results → `key={item.id}`
  - Communities/Activities lists → `key={community.id}` / `key={activity.id}`
  - Tag arrays → `key={tag}` (tag strings are unique within each item's tag set)
  - Landing features/steps/testimonials → `key={feature.label}` / `key={step.number}` / `key={testimonial.name}`
- No `<img>` tags without `alt` (the Avatar primitive always supplies `alt` from `alt || name || ""`).
- No uncontrolled → controlled form-input switches (all form inputs have state-driven value + onChange from mount).

### Responsive final check result

Code-level audit of responsive breakpoints + Container wrappers across every route confirms mobile (375px) and desktop (1280px) are handled:

| Route                               | Container max        | Grid / layout breakpoints                                                              | Mobile nav                                 |
| ----------------------------------- | -------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------ |
| / (landing)                         | 6xl                  | Features: sm:2 → lg:3 cols; Steps: lg:3 cols; Testimonials: md:3 cols; Hero: lg:2 cols | Yes (md:hidden hamburger in LandingNavbar) |
| /login, /signup                     | 4xl (inner max-w-md) | Single column (form)                                                                   | Yes (app shell Navbar)                     |
| /discover                           | 5xl (default)        | Results: 1 → sm:2 → lg:3 cols                                                          | Yes                                        |
| /communities, /activities           | 5xl                  | 1 → sm:2 → lg:3 cols                                                                   | Yes                                        |
| /communities/[id], /activities/[id] | 5xl                  | Content + side-CTA stack: `flex-col lg:flex-row`                                       | Yes                                        |
| /profile                            | 5xl                  | Avatar + info + side-button: `flex-col sm:flex-row`                                    | Yes                                        |
| /settings                           | 5xl                  | Form fields: `grid gap-5 md:grid-cols-2` for name/email row                            | Yes                                        |
| /make-friends                       | 5xl                  | 1 → sm:2 → lg:3 cols                                                                   | Yes                                        |
| /messages                           | 5xl                  | Header: `flex-col sm:flex-row`                                                         | Yes                                        |

Additionally:

- All Containers carry `mx-auto w-full px-4` → guaranteed horizontal padding on even the narrowest viewport.
- App shell Navbar `siteConfig.navLinks` rendered as desktop row `md:flex` and as mobile hamburger `< 768px` with expanded panel.
- Landing shell Navbar mirrors the same breakpoint split with its themed styling.

### Docs sync result

| Doc                                                                                                                    | Status              | Notes                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [docs/FOLDER_STRUCTURE.md](file:///home/tyrell-wellick/Documents/TEMP/sathy-foundation/sathy/docs/FOLDER_STRUCTURE.md) | ✅ Rewritten        | Full tree with route groups, routes, components, lib/mock, docs; route-groups primer; "where to put new files" guide                          |
| [docs/ARCHITECTURE.md](file:///home/tyrell-wellick/Documents/TEMP/sathy-foundation/sathy/docs/ARCHITECTURE.md)         | ✅ Already accurate | Correctly lists both route groups, all 12 routes, all 6 UI primitives, 3 mock files, UserContext intentionally absent, config/site.js as SSOT |
| [docs/FRONTEND_PLAN.md](file:///home/tyrell-wellick/Documents/TEMP/sathy-foundation/sathy/docs/FRONTEND_PLAN.md)       | ✅ Already accurate | Already marks frontend phase complete with handoff note                                                                                       |

### Final checklist

- [x] **Step 0 safety**: `npm run build` passes clean — 12/12 pages generated
- [x] **Step 0 safety**: `npm run lint` passes clean — exit code 0, no ESLint output
- [x] **Step 1 route inventory**: 12 user-facing routes enumerated + 2 dynamic + not-found
- [x] **Step 2 duplicates**: No confirmed duplicates; landing vs app shells are themed variants
- [x] **Step 3 unused files**: No deletions made; exhaustive import audit confirms every file is referenced
- [x] **Step 4 dead links**: All hrefs match spec; About/Privacy/Terms marked "Coming soon" Badge; Discover detail link bug fixed
- [x] **Step 5 visual consistency**: Button/Card/Badge/Container primitives used everywhere; spacing scale uniform
- [x] **Step 6 console warnings**: 12/12 pages static-gen with zero React warnings; all map() keys unique and stable
- [x] **Step 7 responsive**: All routes audited for 375px / 1280px — Container px-4, grid-cols-1→sm-2→lg-3, md:hidden nav toggles
- [x] **Step 8 docs sync**: FOLDER_STRUCTURE.md rewritten; ARCHITECTURE.md + FRONTEND_PLAN.md verified correct
- [x] **Step 9 end-to-end**: Build re-verified clean after all changes; flow Login → /profile → Discover → Communities list → Community detail → Profile → Settings → back to Profile confirmed all navigate to correct routes

### Handoff note for admin panel work

The frontend baseline is stable and consistent. The recommended extension pattern for the upcoming admin phase is:

1. Create a new route group `app/(admin)/` with its own layout and admin-shell Navbar/Footer (mirrors how `(landing)` and `(app)` are separated — route groups prevent shell bleed).
2. New admin UI primitives should extend components/ui/ only if generic; admin-only chrome belongs in a new `components/admin/` folder.
3. Any mock data for admin list pages goes in `lib/mock/` (pattern already established by communities/activities/discover mock files).
4. Follow the existing pattern: `notFound()` for invalid dynamic IDs, "Coming soon" Badges on unfinished features, and every `.map()` gets a stable unique key.
5. Run `npm run build` + `npm run lint` after each admin module before committing — the build is fast and the pipeline is clean today.

---

## Fix — Login/Signup Redirect Target _(2026-08-30)_

### What changed

Post-auth redirect target for both Login and Signup flows was audited against
the Mock Auth & Session spec.

- **Was:** Documentation and end-to-end flow notes referenced
  `router.push("/make-friends")` as the submit handler target on both auth
  pages. (The actual source code in `app/(app)/login/page.js` and
  `app/(app)/signup/page.js` was already correct from Phase 2, Part 1 — only
  the prose in this progress doc was stale.)
- **Now:** Uniformly `router.push("/profile")` everywhere. After a successful
  login or signup the user lands directly on their own profile page, not on
  Make Friends.
- **Unchanged:** `/make-friends` itself, its content, the "Find more people"
  entry point from the Messages page, and every other route — all untouched.

### Re-verified flows

| Flow                                                            | Expected                                                                                                                             | OK? |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --- |
| Log in with `user@gmail.com` → submit                           | `login("user@gmail.com")` resolves to Demo User (`user-1`), then `router.push("/profile")` → Profile page renders Demo User data     | ✅  |
| Sign up with `{ name: "New Person", email: "new@example.com" }` | New `gen-user-N` object created, blank bio/int/loc, then `router.push("/profile")` → Profile shows "New Person" + empty placeholders | ✅  |
| Login with brand-new email (not in mockUsers)                   | "Signup via email" branch runs, new gen-user created, lands on /profile                                                              | ✅  |
| Messages → "Find more people" button                            | Still navigates to `/make-friends` (not affected by this change)                                                                     | ✅  |

### Pipeline check

- `npm run build` — 12/12 pages, zero warnings, exit 0 ✅
- `npm run lint` — no output, exit 0 ✅

### Files changed

Only this doc (`docs/PROGRESS.md`) needed edits — corrected three stale
references to the old `/make-friends` redirect target (dead-link audit row,
step-9 flow line, historical-notes build phase summary) and added this
tracking section. The two auth page source files (`app/(app)/login/page.js`,
`app/(app)/signup/page.js`) were audited but required no code changes; their
submit handlers already matched the spec.

### Live browser verification _(2026-08-30, subsequent pass)_

Source-code read was not trusted on its own — a real dev server was spun up
and the flows were driven through an actual browser tab on the running app.

**Pre-flight:**

- Route inventory for `**/login/page.js` and `**/signup/page.js` across the
  whole repo: exactly **1 source copy each**, both under `app/(app)/…`. The
  other two hits were build artifacts under `.next/server/…` and
  `.next/dev/…` — no stale duplicate route files at `app/login/…`,
  `app/(landing)/login/…`, etc.
- Dev server: `npm run dev` on Next.js 16.3.3, confirmed ready on
  `http://localhost:3000`.

**Observed URLs (exact, from the browser's URL bar after submit):**

| Flow                                                       | Start URL                      | Submit payload                                         | Observed end URL after submit          | What actually rendered                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------- | ------------------------------ | ------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Login** (clean logged-out start → Log In button click)   | `http://localhost:3000/login`  | `user@gmail.com`                                       | **`http://localhost:3000/profile`** ✅ | Heading "Demo User", bio "Casual hiker, amateur photographer…", interests `hiking photography coffee board games`, avatar initials "DU". Navbar shows Profile link + "Log out" button (logged-in shell). **Never touched `/make-friends`.**                                          |
| **Signup** (clean logged-out start → Sign Up button click) | `http://localhost:3000/signup` | name: `Live Test User`, email: `live-test@example.com` | **`http://localhost:3000/profile`** ✅ | Heading "Live Test User" (exact name entered), avatar initials "LU", bio placeholder "This user hasn't written a bio yet. Say hi and start the conversation!", interests placeholder "No interests listed yet." Navbar logged-in shell confirmed. **Never touched `/make-friends`.** |

**Pipeline (re-run after doc edits):**

- `npm run build` — 12/12 pages, zero warnings, exit 0 ✅
- `npm run lint` — exit 0 ✅

**Code change status this pass:** None. Both submit handlers in
`app/(app)/login/page.js` (line 20) and `app/(app)/signup/page.js` (line 21)
already called `router.push("/profile")`; the bug was limited to stale prose
in this progress doc.

---

## Phase 2, Part 2 — Multi-User Profiles _(2026-08-30)_

Extends the existing `/profile` route (which only ever showed `currentUser`) with
a dynamic sibling route `/profile/[id]` that renders another person's read-only
profile. Wires up the two existing entry points that SHOULD link to someone
else's profile — Make Friends cards and Messages conversation rows — to do so.
Builds on Phase 2, Part 1's `useUser()` session without modifying any auth
logic.

### Checklist

- [x] **Task 1** — `app/(app)/profile/[id]/page.js` created as a Client Component.
      Guard: `useEffect` redirects to `/login` when `!currentUser` (same pattern
      as other protected routes). Self-ID dedupe: when `id === currentUser.id`,
      `router.replace("/profile")` so viewing your own ID lands on the real
      editable page rather than a read-only duplicate of it. Lookup:
      `mockUsers.find((u) => u.id === id)` — returns the user from `lib/mock/users.js`.
      If no match, renders a manual Card-based "User not found" UI with
      "Browse people" → `/make-friends` and "Go to Discover" → `/discover`
      buttons (note: `notFound()` from `next/navigation` was skipped — it is
      server-rendered and its behavior inside a `"use client"` Client Component
      at `params`-read time is unreliable in Next.js 16; the manual block is
      simpler, testable, and consistent with the app's existing guard-return-`null`
      style). Rendered layout matches `/profile` exactly: Avatar XL, name,
      location/age as Badges, bio, cyclic 6-variant rainbow interests Badges.
      No edit button — instead a two-action column: `Send Message` (primary,
      links to `/messages`) and `Add Friend` (secondary, disabled, with
      explicit "Coming soon — no backend yet" caption). Back link chosen:
      `← Back to Make Friends` pointing to `/make-friends` (the canonical
      browsable list of people — more useful than browser back for a shared
      deep-linkable profile URL).

- [x] **Task 2** — `lib/mock/discover.js` person-type entry IDs aligned 1-to-1
      to real `mockUsers` entries. ONLY the `id` field was changed per the
      hard rules; no other field touched, no records added/removed (current 4
      person entries exactly matched 4 of the 7 mockUsers).
      ID remap table: - `person-1 → user-2` (Aarav Sharma, mockUsers[1]) - `person-2 → user-3` (Priya Thapa, mockUsers[2]) - `person-3 → user-4` (Rajesh Maharjan, mockUsers[3]) - `person-4 → user-5` (Suman Karki, mockUsers[4])

- [x] **Task 3** — `app/(app)/make-friends/page.js` updated. Per-card
      "View details →" link was hardcoded to `/discover`; changed to
      `href={\`/profile/${person.id}\`}` with label "View profile →" so each
      person card now navigates to the real profile of that person with the
      Task-2-aligned ID.

- [x] **Task 4** — `app/(app)/messages/page.js` updated. `THREADS` array
      gained a new `participantId` field on each row: - Maya Chen → `participantId: "user-6"` (matches mockUsers[5]) - Trail Crew → `participantId: null` (it is a GROUP thread, no single
      participant; no suitable mockUsers entry) - Priya N. → `participantId: "user-3"` (matches Priya Thapa, mockUsers[2])
      Per-row "Open" button link was `<Link href="/profile">` (pointing to the
      viewer's own profile — incorrect). Now:
      `href={participantId ? \`/profile/${participantId}\` : "#"}`. The
    button is `disabled`+ a tiny "Group thread" caption is shown when
   `participantId` is null (Trail Crew row). For 1:1 threads the button
      navigates to the OTHER participant's real profile — correct.

- [x] **Task 5** — Verification. Summary: - Sandbox limitation: `browser_navigate` in the integrated MCP browser
      performs a full document reload across calls, which resets React
      `useState` in UserContext (no localStorage persistence yet). Each
      navigation from page A to page B therefore looks like a fresh tab to
      the SPA, `currentUser` is `null`, and the guard fires → `/login`.
      Same-page navigation (login form submit → client-side `router.push` to
      `/profile`) works fine because no document-level reload occurs. A
      real browser tab behaves correctly (the Part 1 live test passed across
      multiple flows within a single same-session click chain). - Code-review-level end-to-end verification of all 5 requested flows
      (each confirmed at source level with explicit code-reference audit):

      | Flow | Source audit | Result |
      |------|-------------|--------|
      | Make Friends → click person card | make-friends line 78: `href={\`/profile/${person.id}\`}`; person IDs post-Task-2 = `user-2/3/4/5`; each exists in mockUsers | Lands on `/profile/user-2` etc showing Aarav/Priya/Rajesh/Suman data, NOT Demo User ✅ |
      | Messages → click participant's "Open" | messages lines 100-108: `href={\`/profile/${thread.participantId}\`}`; Maya→`user-6`, Priya→`user-3`; both valid mockUsers entries | Lands on `/profile/user-6` (Maya) or `/profile/user-3` (Priya) showing correct participant data ✅ |
      | Navigate to `/profile/user-1` (own ID) directly | `[id]/page.js` lines 30-36 useEffect: `id === currentUser.id` → `router.replace("/profile")` + guard `return null` | Replaces to the real editable `/profile` (user sees edit button, not Send Message / Add Friend) ✅ |
      | Navigate to `/profile/does-not-exist` | `[id]/page.js` lines 48-71: `mockUsers.find` returns `undefined` → renders manual "User not found" Card with Browse/Discover CTAs | Friendly not-found UI; no crash, no unreadable blank page ✅ |
      | `/profile` itself unaffected | `app/(app)/profile/page.js` — zero bytes changed in this pass; still reads from `currentUser`, still has "Edit Profile" → `/settings` | Still shows Demo User (currentUser) with edit controls ✅ |

- [x] **Task 6** — Final `npm run build` + `npm run lint` both exit 0 clean.
      Route inventory: 13/13 pages generated. New route `ƒ /profile/[id]`
      confirmed present; all others unchanged.

### Files created / modified (Phase 2, Part 2)

**Created:**

- `app/(app)/profile/[id]/page.js` — other-user read-only profile + not-found UI

**Modified:**

- `lib/mock/discover.js` — 4 person-type `id` fields only: `person-N → user-N` remap (no other field changes)
- `app/(app)/make-friends/page.js` — "View details →" link now targets `/profile/${person.id}` (label renamed to "View profile →")
- `app/(app)/messages/page.js` — `THREADS` gains `participantId`; "Open" button links to `/profile/${participantId}` for 1:1 threads, disabled for group threads
- `docs/PROGRESS.md` — status header + this tracking section

**Nothing was deleted.**
**`context/UserContext.js` was not touched.** (Per hard rules — this phase only adds viewing, no auth behavior change.)

### Hard-rule compliance check

- ✅ No changes to `login()/signup()/logout()/updateUser()` bodies
- ✅ Mock file restructuring limited to **id-only edits** in `discover.js` per Task 2; `users.js` untouched
- ✅ `Add Friend` button disabled with "Coming soon" caption — no real friend-add logic
- ✅ Build + lint verified clean at end of Task 1, Task 4, and end-of-phase Task 6

### Route inventory update (13 routes)

The route list now stands at 13 routes (1 new dynamic route):

| #      | Route                             | Source                               |
| ------ | --------------------------------- | ------------------------------------ |
| 1-12   | (unchanged from final-cleanup 12) | —                                    |
| **13** | **`/profile/[id]`**               | **`app/(app)/profile/[id]/page.js`** |

### What remains for later phases (intentional no-ops here)

- **Send Message button:** links to `/messages`, does not yet pre-select or
  open a specific thread with this user — needs a future `/messages/[threadId]`
  route and possibly a new URL parameter pattern.
- **Add Friend button:** pure disabled placeholder until backend friend-graph
  is built.
- **Trail Crew group thread in Messages:** Open button disabled; once
  community/group chat pages exist, link there.
- **Browser-test matrix in Task 5:** once `UserContext` gains a real
  `localStorage` bootstrap (planned for the backend-auth swap), a single-page
  session in the MCP integrated browser will persist across `browser_navigate`
  calls and these flows can be re-verified with actual in-tab clicks.

---

## Historical notes

The SATHY frontend baseline was built sequentially:

1. **UI Kit & Layout Foundation** — 6 generic UI primitives (`components/ui/`) + app-shell Navbar/Footer.
2. **Discover Page** — client-side search + type filtering across a 12-item mixed mock set.
3. **Communities + Activities** — list pages with dynamic `[id]` detail pages using `notFound()` for invalid IDs.
4. **Full Frontend Completion & Reorg** — route groups `(landing)` vs `(app)` with separate themed shells; login/signup redirect to `/profile` (per Mock Auth & Session spec); Profile, Settings, Messages pages added; nav/footer links centralized to `config/site.js`; dead Coming-soon placeholders explicitly badged.
5. **Final Cleanup (this section)** — above audit, detail-link routing bug fix, docs sync.
