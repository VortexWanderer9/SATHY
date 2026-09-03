# Admin Panel v1 Implementation Plan

## Repository Research

**Current baseline (verified against docs + disk state):**
- SATHY is Next.js 16.3.3 App Router, JavaScript only, Tailwind CSS 4.3.3.
- Route groups `(landing)` (brand-themed, orange cream) and `(app)` (neutral SaaS) each have their own `layout.js` → shell Navbar + main + Footer pattern. No `(admin)` group exists yet.
- UI primitives in `components/ui/`: Button, Card, Badge, Input, Avatar, Container — **6 primitives total**. No Textarea, Select, Tabs, Modal, DataTable, or Sidebar primitive yet. Settings page currently uses a raw `<textarea>` aligned manually to Input styles (flagged as TODO for admin phase).
- Mock data entities in `lib/mock/` are flat arrays of objects with string `id` keys:
  - `mockUsers[]` — 7 entries, id=`user-N` or later `gen-user-N`, fields: name/email/bio/location/age/interests/avatarUrl.
  - `communities[]` — 8 entries, id=kebab-case slug, fields: name/description/tags/location/memberCount/imageUrl.
  - `activities[]` — 8 entries, id=kebab-case slug, fields: title/description/tags/location/date/attendeesCount/imageUrl.
- Auth state: `UserContext` provides `{ currentUser, login(email), signup({name,email}), logout(), updateUser(fields) }` with localStorage persistence (fixed in the prior pass). **No role system exists yet.** Admin entry is URL-only `/admin`, no nav link, reachable by anyone who knows the URL during the frontend-mock phase.
- User hard preferences (must follow):
  1. "Premium SaaS" (Linear/Vercel) aesthetic layered with "Cyberpunk/Futuristic minimalist, spaceship control center feel" — this is why user rejected the vanilla Linear/Vercel shell option in the clarifying questions (chose "Other" visual pattern). The admin shell must feel distinctly different from the neutral (app) shell: dark base, accent glows, neon borders, HUD/grid-line flourishes, monospace numerals for stat values, not the standard white admin tables.
  2. **Cards, graphs, timelines > tables** — entity list pages should render as card grids with filter/search chrome, not `<table>` layouts.
  3. File length limits: components <250 lines, pages <150 lines.
  4. Dead/backend features get explicit **Coming soon** Badges, never silent dead buttons.
- Docs and handoff requirements: `docs/FOLDER_STRUCTURE.md` and `docs/PROGRESS.md` must stay in sync with the new physical tree. `docs/ARCHITECTURE.md` gets a note on how admin fits into the route-group model.

**User confirmed scope from clarifying questions:**
1. **Admin modules (full mock-CRUD entities, not just lists):** Dashboard + 3 entity pages with working Create/Edit/Delete flows *in memory* against the existing mock data arrays (same pattern as UserContext for auth — mutation state is a React Context per entity, no backend, full client-side lifecycle).
2. **Visual shell pattern:** User selected "Other" — interpreted as the **Cyberpunk HUD/Space Control variant** of top-nav + left sidebar (per their user profile UX philosophy). Dark base layer with SATHY accent-neon highlights, HUD line accents, glow utility classes, monospace metrics. This is distinct from the orange-cream landing shell and the neutral-gray (app) shell — the three route groups will look visually separated, which is intentional for role clarity.
3. **Admin entry point:** URL-only at `/admin`, no link in existing LandingNavbar or app Navbar during this pass.

## Files and Modules

| Path | Operation | Purpose |
|---|---|---|
| `app/(admin)/layout.js` | Create | Admin shell layout: renders AdminTopNav + AdminSidebar + main content area (no footer; admin panels rarely have footers). |
| `app/(admin)/page.js` | Create | `/admin` Dashboard page: stat cards, mock "activity feed" timeline card, KPI sparkline area, shortcut tiles to each entity. |
| `app/(admin)/users/page.js` | Create | `/admin/users` list: search + tag filter bar, user cards (avatar + meta), Create User button, per-card Edit/Delete actions. |
| `app/(admin)/communities/page.js` | Create | `/admin/communities` list: same pattern with community cards (memberCount pill, tag chips, CRUD actions). |
| `app/(admin)/activities/page.js` | Create | `/admin/activities` list: card grid with date/location meta, CRUD actions. |
| `components/admin/AdminTopNav.js` | Create | Admin top bar: brand "SATHY ADMIN" monochrome badge, search placeholder (Coming soon), current user avatar + logout link to `/`. |
| `components/admin/AdminSidebar.js` | Create | Left-side vertical nav: section group links with icons (Dashboard / Users / Communities / Activities) + a "Moderation" + "Reports" item badged Coming soon. Accordion-collapsible on mobile. |
| `components/admin/StatCard.js` | Create | Dashboard primitive: dark HUD-flavored card with metric value, delta pill, sparkline placeholder. |
| `components/admin/TimelineCard.js` | Create | Dashboard primitive: vertical rail timeline of recent "admin events" (mock generated). |
| `components/admin/EntityForm.js` | Create | **Generic** modal-free inline Create/Edit form (expando card): dynamic field set per entity, Submit / Cancel. Avoids Modal primitive (not in ui/ yet) by collapsing into an empty-slot above the grid. |
| `components/admin/EntityCard.js` | Create | **Generic** card wrapper with actions slot: each entity page composes by passing children (avatar/meta) + card-level Edit/Delete button props with entity-specific labels. |
| `components/ui/Textarea.js` | Create | New UI primitive (flagged TODO). Tailwind class parity with Input.js: same border/focus/radius/padding/size, `<textarea>` + form semantics. Needed for bio/description multi-line fields. |
| `components/ui/Tag.js` (or extend Badge) | Decide at impl | Reusable removable chip component for multi-value tag input on forms. If Badge variant supports onRemove just use that — new file only if Badge can't cleanly carry a close-icon. |
| `context/AdminDataContext.js` | Create | Centralized mock-CRUD store for Users / Communities / Activities: exports `useAdminData()` returning `{ users, communities, activities, createX(), updateX(), deleteX() }`. All mutations update the in-context arrays via spread; initialize seed state from `lib/mock/*` arrays ONCE (spread copy to avoid mutating module exports). `didSeed = useRef(false)` on mount to prevent double-seed under strict mode. Persists session-wide (across admin page navigations) — no localStorage (mock mutations are intentionally ephemeral per page load so `npm run build` can produce deterministic static HTML for the list shells). |
| `config/admin.js` | Create | Admin-only static config: sidebar nav structure, stat-card definitions (label, mock formula, delta), mock timeline seed events. |
| `lib/mock/adminEvents.js` | Create | 12 mock admin timeline events (audited records) for the dashboard feed. |
| `app/globals.css` | Edit (tailwind layer only) | 4–6 new CSS utility classes for the cyberpunk HUD theme: `hud-border`, `hud-grid-bg`, `neon-glow-[primary]`, `mono-numerals`, plus the `dark:` selector will NOT be used — the admin shell applies a literal class-scoped palette (`admin-dark` wrapper class) instead of the document-level `dark` variant so it doesn't bleed into landing/app shells. |
| `docs/FOLDER_STRUCTURE.md` | Edit | Insert `app/(admin)/` block into the routes section, `components/admin/` block, `context/AdminDataContext.js`, `config/admin.js`, and `lib/mock/adminEvents.js` entries. |
| `docs/ARCHITECTURE.md` | Edit | Add admin route-group bullet point to High-level structure + Routing model. Note that admin uses its own `admin-dark` palette scope to prevent visual bleed. |
| `docs/PROGRESS.md` | Edit | New section `## Admin Panel v1 — Cyberpunk HUD shell + mock CRUD _(YYYY-MM-DD)_` after the current Fix section and before the Historical notes separator. |
| `lib/mock/users.js`, `lib/mock/communities.js`, `lib/mock/activities.js` | **No edit** (read-only seed data) | AdminDataContext initializes with spread copies only. Rule from prior pass: don't touch the mock data arrays unless forced by a bug. |

## Implementation Steps

1. **Palette + primitive prerequisites:**
   - Add `components/ui/Textarea.js` first — reuses Input's class set verbatim but with `<textarea>`, `rows={4}` default, and auto-resize skipped for now (frontend mock, fixed height fine).
   - Edit `app/globals.css` with a `.admin-dark` wrapper-scoped palette (body text -gray-100, base -slate-900, accent cyan-400 glow, utility classes for hud-border 1px glow inset, monospaced numeric font-feature-settings, HUD-lines background gradient). No global `dark:` class — everything nests under `.admin-dark` so the (landing) and (app) shells are completely untouched.

2. **Admin shell scaffold (`app/(admin)/layout.js` + `components/admin/AdminTopNav.js` + `components/admin/AdminSidebar.js`):**
   - `(admin)/layout.js` wraps children in `<div className="admin-dark min-h-screen bg-slate-950 text-slate-100">` → TopNav → flex row (Sidebar + main).
   - AdminTopNav: brand "SATHY · ADMIN" monochrome badge, right-side avatar (current user, links to `/profile`) + ghost "Exit admin" Button → onClick does NOT logout; only navigates to `/` (still keeps session — clean UX).
   - AdminSidebar: fixed `w-64` desktop, mobile collapsible via a hamburger in TopNav. Section links: **Dashboard** (→ `/admin`), **Users** (→ `/admin/users`, count pill), **Communities** (→ `/admin/communities`, count pill), **Activities** (→ `/admin/activities`, count pill), **Moderation** (→ disabled, Badge Coming soon), **Reports** (→ disabled, Badge Coming soon). Active link = cyan-400 left border bar + text.
   - Rule: both TopNav and Sidebar are `<250 lines`.

3. **Centralized mock-CRUD context (`context/AdminDataContext.js`):**
   - Single `<AdminDataProvider>` in the admin `layout.js`.
   - On mount: `const [users, setUsers] = useState(() => mockUsers.map(u => ({...u})))` — spread-seed from `lib/mock/*` once; `communities` / `activities` same pattern. No lazy-init SSR issue because admin Client Components use `"use client"` explicitly and Provider only mounts after Navigate (no SSR of entity data — static shells are fine).
   - Exports per entity:
     - `createUser(fields)` / `updateUser(id, fields)` / `deleteUser(id)`
     - `createCommunity(fields)` / `updateCommunity(id, fields)` / `deleteCommunity(id)`
     - `createActivity(fields)` / `updateActivity(id, fields)` / `deleteActivity(id)`
   - All use spread + `.filter` / `.concat` patterns — never mutate the state array in place.
   - `deleteX()`: optimistic remove + if it's the last item, don't wipe the grid header chrome (no-op fine).
   - Public API surface is 9 CRUD functions + 3 entity arrays + derived `{ userCount, communityCount, activityCount }` for sidebar pills.

4. **Config + mock timeline data (`config/admin.js` + `lib/mock/adminEvents.js`):**
   - `admin.js`: sidebar nav array (label/href/icon/countKey/comingSoon), dashboard stats (kpi label / entity / "count" | "sum-field" / delta mock percentage / tint color), dashboard shortcut tile definitions.
   - `adminEvents.js`: 12 timeline entries (timestamp, verb ("Created", "Deleted", "Updated", "Reported"), entity type, entity name, actor name — mock realistic distribution across past 14 days).

5. **Dashboard page (`app/(admin)/page.js`):**
   - `<150 lines` — composes primitives, no inline logic.
   - Structure (cards > tables rule):
     1. **Top KPI row (4 StatCards):** Total users, Total communities, Total activities, Total "messages sent this week" (mock formula: `Math.round(users*43)` with random seed — Coming soon Badge if we can't compute)
     2. **Mid row:** Sparkline area (plain SVG mock line chart inside a Card — no chart lib since none in package.json) + Shortcut tiles grid (goto Users/Create, Communities/Create etc — large clickable cards)
     3. **Bottom row:** TimelineCard (recent admin events rail) + "Platform health" mock indicators (uptime 99.98%, Signups/day, Retention — labels only, all with tiny cyan progress bars inside Card body)

6. **Entity page pattern (replicated 3× for users / communities / activities):**
   - All files `<150 lines`; compose shared `EntityCard` + `EntityForm`.
   - Page anatomy per entity:
     1. **Header bar:** Heading ("Users" / "Communities" / "Activities") + pill count from AdminDataContext + primary CTA "Add {X}" Button that toggles the EntityForm expando above the grid.
     2. **Filter/search bar:** Input search (case-insensitive string match on name/title/description) + inline tag chips. No "no-results" is a dead empty grid, show Card with "No {entities} match your filters" heading + reset link.
     3. **EntityForm expando:** Inline Card above grid. Field set per entity:
        - User: name (Input), email (Input), bio (Textarea), location (Input), age (Input type=number), interests (comma-delimited comma-to-chips, Tag remove on click)
        - Community: name, description (Textarea), tags (chips), location, memberCount (number create-only — Coming soon Badge "auto-calculated from join events")
        - Activity: title, description (Textarea), tags (chips), location, date (plain string Input with placeholder "Sat, Sep 20 · 5:30 AM" since no Date primitive yet), attendeesCount (number create-only + Coming soon)
       - Submit → calls `createX` or `updateX(currentEditingId, fields)` then clears form + closes expando. Cancel → no-op + close.
     4. **EntityCard grid:** `grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` inside Container.
       - Per card children are entity-specific (avatar/name/email for user; name/memberCount/tags for community; title/date/tags for activity)
       - Per card footer slot: **Edit** (populates EntityForm, switches it into edit mode) + **Delete** (confirm with native `confirm()` browser dialog — no Modal primitive exists yet. No silent deletes.)
   - **Rule:** Entity pages only export default page component and import shared primitives. No CRUD logic lives in the page itself — all state is lifted into AdminDataContext + a local page-level `{ editingId, isFormOpen }` useState.

7. **Shared admin primitives (`StatCard`, `TimelineCard`, `EntityCard`, `EntityForm`):**
   - All `<250 lines`. StatCard and TimelineCard `<100 lines` each.
   - EntityCard uses the children + actions pattern (`<EntityCard actions={<div>buttons</div>}>{children}</EntityCard>`) — the outer shell is the HUD-themed card (`hud-border + bg-slate-900/60 + backdrop-blur-sm`).
   - EntityForm accepts a config prop listing fields with labels/types/validators (text/textarea/number/chips) — 90% of the Create/Edit logic is generic. Validators are simple required-checks, missing fields highlight red border on submit (no complex form library needed).

8. **Docs sync (last step before build+lint):**
   - `FOLDER_STRUCTURE.md`: add `app/(admin)/` sub-tree, `components/admin/` section with 6 new files, `config/admin.js`, `context/AdminDataContext.js`, `lib/mock/adminEvents.js` + Textarea/Tag in ui/ list.
   - `ARCHITECTURE.md`: Routing model gets `(admin)` block. Data flow gets a single sentence noting AdminDataContext is the mock-CRUD seed for admin pages. UI System: add Textarea to the primitive list.
   - `PROGRESS.md`: New `## Admin Panel v1 — Cyberpunk HUD shell + mock CRUD _(date)_` section inserted AFTER the "Fix — Session Persistence" section and BEFORE `---` + `## Historical notes`. Contents: scope summary (dashboard + 3 full mock-CRUD entities), shell pattern rationale (cyberpunk HUD per user "Other" selection), AdminDataContext mutation model (spread-only, no localStorage), 3-page route inventory table, files changed table, hard-rule compliance checklist (no mock data file edits, file length limits, no raw HTML tags for primary actions, dead areas badged Coming soon).

## Dependencies and Considerations

- **No new npm packages.** Build must run with `package.json` unchanged. All admin visuals are pure Tailwind utility classes + scoped CSS in globals.css. Sparklines are inline SVG (no chart lib).
- **Role-based access intentionally skipped in v1.** Because we have no backend, there's no way to distinguish admins from regular users. A route guard in `app/(admin)/layout.js` DOES redirect to `/login` if `currentUser === null` (standard Client Component `useEffect` redirect, same guard pattern as `/profile`). But once logged in as any user, `/admin` is reachable. This is documented as "Frontend mock limitation" in PROGRESS.md with a Coming soon Badge inline.
- **AdminDataContext mutations are in-memory only and do NOT persist to localStorage.** This is deliberate: static generation (`next build`) must produce deterministic empty-state list shells. If a user creates a user and then refreshes, the seed state is reloaded. That's acceptable for a frontend mock and explicitly noted in docs. If we ever want persistence, we'd add a second localStorage context key like `sathy-admin-overrides-{entity}` with base+delta model, but it's out of scope here.
- **`confirm()` for delete confirmation.** Since Modal primitive is not in ui/ yet and not in scope (this phase is admin feature work, not generic-primitive work), delete confirmation uses the browser's native confirm dialog. A TODO comment in EntityCard notes "replace with ui/Modal + DialogPrimitive when Modal lands". No silent deletes without confirmation.
- **No sidebar bleed. Admin shell uses a class-scoped dark palette (`.admin-dark`) and never writes Tailwind's `dark:` variant — because `dark:` is document-level and applying it would leak into (app)/landing shells on a shared SPA navigation back out.** Every admin-specific color class is either explicitly `text-slate-*` / `bg-slate-*` (no dark variant modifier) OR nested under `.admin-dark` in globals.css. This is the #1 visual-bleed risk.
- **Build-time static generation:** All admin pages will be pre-rendered as empty forms + initial seeded grid state on the server (they use `"use client"` so server renders the skeleton, client hydrates with AdminDataContext seed state — fine, seed is deterministic from the imported mock arrays).
- **File length budget enforcement:** If any page/component approaches the limits, split the offending file into sub-components (e.g. Dashboard can extract SparklineCard as a primitive, EntityForm can have a fields.render helper split into a sibling file if needed).

## Validation

1. **Pipeline gates (non-negotiable):**
   - `npm run build` exits 0 · 12 original routes + 4 new admin routes (16 total, with 3 static entity pages + 1 dashboard, all generated successfully).
   - `npm run lint` exits 0 · all files pass the React 19 `react-hooks/set-state-in-effect` rule (use `queueMicrotask(() => setState())` if any effect-body setState fires during the AdminDataContext seed).
2. **Browser-based flow, one continuous integrated-MCP session:**
   - Login as `user@gmail.com` → navigate via URL bar to `/admin` → dashboard renders in cyberpunk HUD palette (verify by snapshot: body `.admin-dark` class, stat cards with hud-border class, sidebar 4 links active-inactive)
   - Click Sidebar → `/admin/users`: 7 seed user cards rendered with correct initials avatars
   - **Mock CRUD roundtrip (Users):** Click "Add User" → fill form (name="Test Admin", email="test.admin@example.com") → submit → grid count increases to 8 with new card visible → click Edit on that card → change name to "Test Admin Edited" → submit → card updates → click Delete → `confirm()` dialog → count back to 7
   - Repeat CRUD sanity test on Communities: create community, edit tags, delete → seed back to 8
   - Repeat CRUD sanity on Activities: create + edit date, delete → back to 8
   - Logout (Exit admin in top nav → navigates to `/` → LandingNavbar shows guest state (Login/Signup), NOT the HUD theme → proves NO palette bleed back to (landing) shell.
   - Full-document reload to `/admin` → seed state reloads (mock mutations intentionally lost — verify 7 users / 8 communities / 8 activities), not the prior edited counts. This is the expected "frontend mock, persisted via URL-only seed" behavior, write it into the PROGRESS.md section.
3. **Coming-soon audit:** Moderation + Reports sidebar items → Badge visible; Community memberCount "auto-calc" → Badge; Activity attendees → Badge; Access-control note at dashboard top small text badge "Coming soon: role gates". All count.
4. **File-length audit (run `wc -l` on each new file, record max):** every page ≤ 150, every component ≤ 250. Report numbers in the PROGRESS.md compliance table.
5. **No-mock-data-edit audit:** `git diff --stat lib/mock/users.js lib/mock/communities.js lib/mock/activities.js` → output empty (zero bytes changed).

## Risks

| Risk | Handling |
|---|---|
| Palette bleed between route groups (admin HUD CSS pollutes landing/app) | Use literal `.admin-dark` wrapper class for EVERY admin-specific style, never Tailwind's `dark:` variant. Final browser test: navigate admin → `/` → confirm landing page palette is still original orange-cream, not slate-dark. |
| AdminDataContext re-seeds on route navigation (because Provider is remounted) | Place `<AdminDataProvider>` ONCE at `app/(admin)/layout.js` level, not per page. The layout wraps all admin routes, so Provider stays alive across SPA navigations. `didSeed = useRef(false)` guard to prevent double-mount seed in React 19 strict mode (but since we spread-init in useState lazy, double-seed is harmless because the seed arrays are identical — guard is defense-in-depth). |
| React 19 `set-state-in-effect` lint fires | Wrap any direct setState inside effect in `queueMicrotask` identical to the UserContext fix. |
| Entity list pages grow past 150-line limit | Pre-emptively structure them to delegate search+filter bar rendering into a single `renderFilters` helper returned from a small hook file OR inline a compact FilterBar children component; keep the page itself just assembling pieces. If limit hit, extract `components/admin/<Entity>FilterBar.js` file, it's still `<250`. |
| No Modal primitive makes delete confirmation feel janky | Use native `confirm()` + comment TODO "replace with ui/Modal when available". Explicitly mention this limitation in PROGRESS.md admin section; it's accepted as a known frontend-mock compromise, not a hidden silent-delete bug. |
| Tailwind classes for the HUD theme look great at design time but break static generation (e.g. arbitrary-values not scanned by JIT) | All color/shadow values use standard Tailwind palette tokens, no arbitrary `[#HEX]` values outside the defined config. Keep the 4 HUD utility classes as real CSS in `globals.css` with real Tailwind color names — they are always in the CSS output regardless of JIT scanning. |
