# Folder Structure

```
sathy/
├── app/                      # Routes (App Router) — one folder per URL segment
│   ├── layout.js             # Root layout: wraps all pages in Navbar + Footer
│   ├── page.js                # Home page ("/")
│   ├── not-found.js          # Custom 404 page
│   └── globals.css           # Tailwind entry point + base CSS variables
│
├── components/
│   ├── layout/                # App shell, present on every page
│   │   ├── Navbar.js
│   │   └── Footer.js
│   └── ui/                    # Generic, reusable UI primitives (empty for now)
│
├── hooks/                     # Custom React hooks shared across components (empty for now)
├── context/                   # React Context providers for cross-cutting state (empty for now)
│
├── lib/                       # Framework-agnostic helper functions
│   └── utils.js               # e.g. cn() for combining Tailwind classes
│
├── config/
│   └── site.js                 # Site name, description, nav links — single source of truth
│
├── public/
│   └── assets/
│       ├── images/            # Static images
│       └── icons/             # Static icons
│
├── docs/                       # Project documentation (this file and others)
│   ├── ARCHITECTURE.md
│   ├── FOLDER_STRUCTURE.md
│   ├── ROADMAP.md
│   └── CONTRIBUTING.md
│
├── .env.example                # Template for future environment variables
├── .gitignore
├── eslint.config.mjs           # ESLint flat config (Next.js recommended rules)
├── jsconfig.json               # Enables "@/..." import aliases
├── next.config.mjs
├── postcss.config.mjs          # Wires Tailwind CSS v4 into the build
├── package.json
└── README.md
```

## Where does a new file go?

A quick decision guide for when you start adding features:

- **A new page/route** → `app/<route-name>/page.js`
- **A component used only on one page/feature** → `components/<feature>/`
  (create the folder when the feature is built)
- **A component that's generic enough for any project** (Button, Modal) →
  `components/ui/`
- **Part of the persistent shell** (nav, footer, sidebar) → `components/layout/`
- **A plain function with no React/Next dependency** (formatting, math,
  future API helpers) → `lib/`
- **Reusable stateful logic** (`useX()` hooks) → `hooks/`
- **State needed by many unrelated components** (e.g. current user) →
  `context/`
- **Static config values** (site name, nav structure) → `config/`
- **An image, icon, or font file** → `public/assets/`

If you're unsure which of these a new file is, it's a sign to ask before
creating it — it's easier to place something correctly the first time
than to move it later.
