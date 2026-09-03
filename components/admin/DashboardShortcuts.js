import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const TINT_TILE = {
  cyan: {
    ring: "border-cyan-400/20 hover:border-cyan-400/60",
    icon: "bg-cyan-400/10 text-cyan-300",
  },
  emerald: {
    ring: "border-emerald-400/20 hover:border-emerald-400/60",
    icon: "bg-emerald-400/10 text-emerald-300",
  },
  amber: {
    ring: "border-amber-400/20 hover:border-amber-400/60",
    icon: "bg-amber-400/10 text-amber-300",
  },
  violet: {
    ring: "border-violet-400/20 hover:border-violet-400/60",
    icon: "bg-violet-400/10 text-violet-300",
  },
};

function IconGlyph({ icon, tint }) {
  const cls = `h-9 w-9 inline-flex items-center justify-center rounded-lg ${TINT_TILE[tint]?.icon || TINT_TILE.cyan.icon}`;
  if (icon === "plus") {
    return (
      <span className={cls}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (icon === "flag") {
    return (
      <span className={cls}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M5 3v18M5 5l13-2v11L5 14" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className={cls}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <circle cx="12" cy="12" r="8" />
      </svg>
    </span>
  );
}

export default function DashboardShortcuts({ tiles }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((tile) => {
        const tint = TINT_TILE[tile.tint] || TINT_TILE.cyan;
        return (
          <Link
            key={tile.label}
            href={tile.href}
            className={cn(
              "hud-border group relative flex flex-col gap-3 rounded-xl bg-slate-900/60 p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-20px_rgba(8,47,73,0.85)]",
              tint.ring,
            )}
          >
            <div className="flex items-center justify-between">
              <IconGlyph icon={tile.icon} tint={tile.tint} />
              {tile.comingSoon && (
                <Badge variant="default" className="h-5 border-0 bg-slate-800 px-2 text-[10px] text-slate-400">
                  Soon
                </Badge>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-50">{tile.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                {tile.description}
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300/90">
              Open
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
