# Folder Structure

```
sathy/
├── app/                           # Routes (App Router) with route groups
│   ├── layout.js                  # Root layout — html/body shell, global metadata
│   ├── globals.css                # Tailwind entry point + base CSS variables
│   ├── not-found.js               # Custom 404 page (shared across all routes)
│   │
│   ├── (landing)/                 # Marketing route group — LandingNavbar + LandingFooter shell
│   │   ├── layout.js              # Landing layout wrapper
│   │   └── page.js                # Landing homepage ("/")
│   │
│   ├── (app)/                     # Product route group — app Navbar + Footer shell
│   │   ├── layout.js              # App-shell layout wrapper
│   │   ├── login/page.js          # "/login"
│   │   ├── signup/page.js         # "/signup"
│   │   ├── discover/page.js       # "/discover"
│   │   ├── communities/
│   │   │   ├── page.js            # "/communities"
│   │   │   └── [id]/page.js       # "/communities/[id]" — dynamic detail page
│   │   ├── activities/
│   │   │   ├── page.js            # "/activities"
│   │   │   └── [id]/page.js       # "/activities/[id]" — dynamic detail page
│   │   ├── profile/
│   │   │   ├── page.js            # "/profile" — current user's profile
│   │   │   └── [id]/page.js       # "/profile/[id]" — other user profiles
│   │   ├── settings/page.js       # "/settings"
│   │   ├── make-friends/page.js   # "/make-friends" — post-auth landing
│   │   └── messages/page.js       # "/messages"
│   │
│   └── (admin)/                   # Admin route group — AdminTopNav + AdminSidebar shell
│       ├── layout.js              # Admin-shell layout wrapper (auth-gated)
│       └── admin/                 # URL segment — everything here prefixes "/admin"
│           ├── page.js            # "/admin" — Mission control dashboard
│           ├── users/page.js      # "/admin/users" — User CRUD
│           ├── communities/page.js# "/admin/communities" — Community CRUD
│           └── activities/page.js # "/admin/activities" — Activity CRUD
│
├── components/
│   ├── ui/                        # Generic, reusable UI primitives
│   │   ├── Button.js              # Action buttons — variants, sizes, asChild
│   │   ├── Card.js                # Consistent card container
│   │   ├── Badge.js               # Tags and status labels
│   │   ├── Input.js               # Form field wrapper (text-based inputs)
│   │   ├── Textarea.js            # Multiline form field
│   │   ├── Avatar.js              # User image or auto-initials fallback
│   │   ├── Container.js           # Max-width and spacing wrapper
│   │   └── TagChip.js             # Interactive tag/filter chip
│   │
│   ├── layout/                    # App shell for product routes
│   │   ├── Navbar.js              # Product top nav (inside (app) layout)
│   │   └── Footer.js              # Product footer (inside (app) layout)
│   │
│   ├── landing/                   # Marketing-page-only sections
│   │   ├── index.js               # Barrel export of all landing components
│   │   ├── LandingNavbar.js       # Sticky brand-themed top nav
│   │   ├── LandingFooter.js       # Brand-themed footer
│   │   ├── LandingHero.js         # Above-the-fold hero with CTA
│   │   ├── LandingFeatures.js     # 3-column value-prop cards
│   │   ├── LandingHowItWorks.js   # 3-step onboarding explanation
│   │   ├── LandingTestimonials.js # Social-proof quotes
│   │   └── LandingCTA.js          # Bottom signup call-to-action
│   │
│   └── admin/                     # Admin-panel-only components
│       ├── AdminTopNav.js         # Admin top nav bar with menu toggle
│       ├── AdminSidebar.js        # Admin left sidebar with nav groups
│       ├── AdminEntityLayout.js   # Shared CRUD layout (search + grid + form modal)
│       ├── StatCard.js            # Dashboard KPI tile
│       ├── TimelineCard.js        # Audit/event timeline card
│       ├── EntityCard.js          # Generic entity card with action buttons
│       ├── EntityForm.js          # Dynamic entity form (driven by field schema)
│       ├── DashboardCharts.js     # Sparkline + platform health bars
│       └── DashboardShortcuts.js  # Quick-action shortcut tiles
│
├── context/                       # React context providers (cross-cutting state)
│   ├── UserContext.js             # Current user session + localStorage persistence
│   ├── AdminDataContext.js        # Admin mock data + CRUD mutation state
│   └── README.md
│
├── hooks/                         # Reusable React hooks (reserved)
│   └── README.md
│
├── lib/                           # Framework-agnostic helpers and data
│   ├── utils.js                   # cn() — combines Tailwind class names
│   └── mock/                      # Static mock data (frontend-only phase)
│       ├── users.js               # User mock records (shared by admin + profile)
│       ├── communities.js         # 8 community records with detail IDs
│       ├── activities.js          # 8 activity records with detail IDs
│       ├── discover.js            # 12 mixed items (people/communities/activities)
│       └── adminEvents.js         # Admin timeline / audit log events
│
├── config/
│   ├── site.js                    # Single source of truth: name, tagline, navLinks, footerLinks
│   └── admin.js                   # Admin nav, dashboard stats, shortcut tiles, platform health
│
├── public/                        # Static assets (currently empty)
│   └── assets/
│       ├── images/
│       └── icons/
│
├── docs/                          # Project documentation
│   ├── PROGRESS.md                # Milestone tracker + final cleanup handoff
│   ├── FRONTEND_PLAN.md           # Frontend phase completion doc
│   ├── ARCHITECTURE.md            # System architecture overview
│   ├── FOLDER_STRUCTURE.md        # This file
│   ├── ROADMAP.md                 # Long-term product roadmap
│   └── CONTRIBUTING.md            # Contribution guidelines
│
├── .env.example                   # Template for future environment variables
├── .gitignore
├── eslint.config.mjs              # ESLint flat config (Next.js recommended rules)
├── jsconfig.json                  # Enables "@/..." import aliases
├── next.config.mjs
├── postcss.config.mjs             # Wires Tailwind CSS into the build
├── package.json
└── README.md
```

## Route groups primer

The project uses Next.js route groups (the parentheses names like `(landing)`, `(app)`, and `(admin)`). These folders do **not** appear in the URL — they only let you swap the surrounding navbar/footer layout without duplicating shell code.

- **Routes under `(landing)`** get the brand-themed `LandingNavbar` / `LandingFooter`.
- **Routes under `(app)`** get the product-style `Navbar` / `Footer`.
- **Routes under `(admin)`** get the admin-specific `AdminTopNav` / `AdminSidebar` shell with auth gating.
- The root `app/layout.js` wraps both groups with the shared `<html>` / `<body>` and metadata.

**Important distinction** — inside the `(admin)` route group lives an `admin/` URL segment folder (no parentheses). This is intentional:

- `(admin)/` = route group → only for layout/shell, no URL effect
- `(admin)/admin/` = real URL segment → all admin pages get the `/admin` URL prefix

So the dashboard lives at `app/(admin)/admin/page.js` in the file tree and resolves to the URL `/admin` at runtime.

## Where does a new file go?

A quick decision guide for when you extend the project:

- **A new product page/route** → `app/(app)/<route-name>/page.js`
- **A new marketing page/route** → `app/(landing)/<route-name>/page.js`
- **A new admin page/route** → `app/(admin)/admin/<route-name>/page.js` (gets `/admin/...` URL + admin shell)
- **A component used only on one page/feature** → `components/<feature>/` (e.g. `components/admin/`, `components/landing/`)
- **A component that's generic enough for any project** (Modal, Tabs, Select) → `components/ui/`
- **Part of the persistent shell** (nav, footer, sidebar) → `components/layout/` (or `components/landing/` / `components/admin/` when group-specific)
- **A plain function with no React/Next dependency** (formatting, math, future API helpers) → `lib/`
- **Static mock data driving list/detail pages** → `lib/mock/`
- **Reusable stateful logic** (`useX()` hooks) → `hooks/`
- **State needed by many unrelated components** (e.g. current user) → `context/`
- **Static config values** (site name, nav structure, dashboard tiles) → `config/`
- **An image, icon, or font file** → `public/assets/`

If you're unsure which bucket a new file falls into, it's a sign to ask before creating — placing correctly the first time avoids later migrations.
