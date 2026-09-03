export const adminConfig = {
  brand: "SATHY · ADMIN",
  brandSubtitle: "Mission Control — Build 0.1.0",
  sidebarNav: [
    {
      section: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/admin",
          icon: "dashboard",
          countKey: null,
          comingSoon: false,
        },
      ],
    },
    {
      section: "Entities",
      items: [
        {
          label: "Users",
          href: "/admin/users",
          icon: "users",
          countKey: "users",
          comingSoon: false,
        },
        {
          label: "Communities",
          href: "/admin/communities",
          icon: "communities",
          countKey: "communities",
          comingSoon: false,
        },
        {
          label: "Activities",
          href: "/admin/activities",
          icon: "activities",
          countKey: "activities",
          comingSoon: false,
        },
      ],
    },
    {
      section: "Operations",
      items: [
        {
          label: "Moderation",
          href: "/admin/moderation",
          icon: "shield",
          countKey: null,
          comingSoon: true,
        },
        {
          label: "Reports",
          href: "/admin/reports",
          icon: "chart",
          countKey: null,
          comingSoon: true,
        },
      ],
    },
  ],

  dashboardStats: [
    {
      label: "Total Users",
      entity: "users",
      mode: "count",
      delta: "+12.4%",
      tint: "cyan",
      description: "vs. last 30 days",
    },
    {
      label: "Communities",
      entity: "communities",
      mode: "count",
      delta: "+4.1%",
      tint: "emerald",
      description: "active this week",
    },
    {
      label: "Activities",
      entity: "activities",
      mode: "count",
      delta: "+18.9%",
      tint: "amber",
      description: "scheduled next 14 days",
    },
    {
      label: "Messages / Week",
      entity: "messages",
      mode: "derived",
      derivedFactor: 43,
      delta: "+23.6%",
      tint: "violet",
      description: "inter-thread volume",
      comingSoon: true,
    },
  ],

  shortcutTiles: [
    {
      label: "Invite User",
      href: "/admin/users",
      action: "openForm",
      tint: "cyan",
      icon: "plus",
      description: "Create a new operator account",
    },
    {
      label: "Seed Community",
      href: "/admin/communities",
      action: "openForm",
      tint: "emerald",
      icon: "plus",
      description: "Bootstrap an interest group",
    },
    {
      label: "Plan Activity",
      href: "/admin/activities",
      action: "openForm",
      tint: "amber",
      icon: "plus",
      description: "Schedule a new event",
    },
    {
      label: "View Reports",
      href: "/admin/reports",
      action: null,
      tint: "violet",
      icon: "flag",
      description: "Coming soon",
      comingSoon: true,
    },
  ],

  platformHealth: [
    { label: "Uptime (30d)", value: 99.98, tint: "emerald", suffix: "%" },
    { label: "Daily signups", value: 74, tint: "cyan", suffix: "/day" },
    { label: "7-day retention", value: 61.4, tint: "violet", suffix: "%" },
    { label: "Support queue", value: 3, tint: "amber", suffix: "open" },
  ],
};
