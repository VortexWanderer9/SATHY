/**
 * Central place for site-wide, non-secret configuration.
 * Import this instead of hardcoding strings like the app name in components.
 *
 * As real routes are built (Discover, Communities, Activities...),
 * add them to `navLinks` here rather than hardcoding links in Navbar.js.
 */
export const siteConfig = {
  name: "SATHY",
  tagline: "Find your people, not just your feed.",
  description:
    "SATHY is a simple social platform for discovering friends, communities, and activities based on shared interests and location.",
  navLinks: [
    { label: "Discover", href: "/discover" },
    { label: "Communities", href: "/communities" },
    { label: "Activities", href: "/activities" },
    { label: "Make Friends", href: "/make-friends" },
  ],
  footerLinks: {
    product: [
      { label: "Discover", href: "/discover", comingSoon: false },
      { label: "Communities", href: "/communities", comingSoon: false },
      { label: "Activities", href: "/activities", comingSoon: false },
    ],
    company: [{ label: "About", href: "#", comingSoon: true }],
    legal: [
      { label: "Privacy", href: "#", comingSoon: true },
      { label: "Terms", href: "#", comingSoon: true },
    ],
  },
};
