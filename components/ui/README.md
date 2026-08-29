# components/ui

Small, generic, reusable UI primitives that have no knowledge of SATHY's
features — things like buttons, inputs, cards, modals, badges.

Rule of thumb: a component goes here if it would make sense in *any*
project (e.g. `Button.js`, `Input.js`), not just SATHY. Feature-specific
components (e.g. a "CommunityCard") belong in their own feature folder
under `components/` instead, once that feature exists.

Nothing lives here yet — it will fill in naturally as shared UI patterns
emerge across features.
