"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Badge from "@/components/ui/Badge";
import { adminConfig } from "@/config/admin";
import { useAdminData } from "@/context/AdminDataContext";
import { cn } from "@/lib/utils";

const TINT_BY_TONE = {
  dashboard: "border-l-cyan-400 text-cyan-300",
  users: "border-l-sky-400 text-sky-300",
  communities: "border-l-emerald-400 text-emerald-300",
  activities: "border-l-amber-400 text-amber-300",
  shield: "border-l-rose-400 text-rose-300",
  chart: "border-l-violet-400 text-violet-300",
};

function IconGlyph({ name }) {
  const common = "w-4 h-4 shrink-0";
  switch (name) {
    case "dashboard":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M3 12l4-8h10l4 8v8H3z" strokeLinejoin="round" />
          <path d="M8 20V12M16 20V12M12 20V12" strokeLinecap="round" />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20c.7-3.5 3.5-5.5 6.5-5.5s5.8 2 6.5 5.5" strokeLinecap="round" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M15 20c.4-2 2-3.3 4-3.3" strokeLinecap="round" />
        </svg>
      );
    case "communities":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M4 20V9l8-5 8 5v11" strokeLinejoin="round" />
          <path d="M9 20v-6h6v6" strokeLinejoin="round" />
        </svg>
      );
    case "activities":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
          <path d="M8 3v5M16 3v5M3.5 10h17" strokeLinecap="round" />
          <path d="M8 14l2.5 2 3.5-4L18 16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" strokeLinejoin="round" />
          <path d="M9 12l2.5 2.5L16 10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { counts } = useAdminData();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-cyan-500/10 bg-slate-950/60 backdrop-blur-xl",
          "transition-transform duration-200 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-6">
          <div className="px-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-500/60">
              {adminConfig.brandSubtitle}
            </p>
          </div>

          {adminConfig.sidebarNav.map((group) => (
            <div key={group.section} className="flex flex-col gap-1.5">
              <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                {group.section}
              </p>
              {group.items.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.href || pathname?.startsWith(`${item.href}/`);
                const count = item.countKey ? counts[item.countKey] : null;
                const toneClasses = isActive
                  ? TINT_BY_TONE[item.icon] || TINT_BY_TONE.dashboard
                  : "";

                const content = (
                  <span
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg border-l-2 px-3 py-2 text-sm transition-colors",
                      item.comingSoon
                        ? "border-transparent text-slate-500"
                        : isActive
                          ? cn(
                              toneClasses,
                              "bg-cyan-500/5",
                            )
                          : "border-transparent text-slate-300 hover:bg-slate-800/50 hover:text-slate-50",
                    )}
                  >
                    <IconGlyph name={item.icon} />
                    <span className="flex-1">{item.label}</span>
                    {count !== null && !item.comingSoon && (
                      <span className="mono-numerals rounded border border-slate-700 bg-slate-800/60 px-1.5 py-0.5 text-[10px] text-slate-300">
                        {count}
                      </span>
                    )}
                    {item.comingSoon && (
                      <Badge
                        variant="default"
                        className="h-5 border-0 bg-slate-800 px-2 text-[10px] text-slate-400"
                      >
                        Soon
                      </Badge>
                    )}
                  </span>
                );

                if (item.comingSoon) {
                  return (
                    <div key={item.label} onClick={onClose} role="button" tabIndex={0}>
                      {content}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          ))}

          <div className="mt-auto flex flex-col gap-2 rounded-lg border border-cyan-500/10 bg-slate-900/60 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-400/60">
              Node status
            </p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_0_rgba(52,211,153,0.6)]" />
              <span className="text-xs text-slate-200">All systems nominal</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Seed data is reloaded on every full document reload — mock mutations are intentionally ephemeral.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
