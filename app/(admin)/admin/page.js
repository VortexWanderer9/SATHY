"use client";

import Link from "next/link";
import { useMemo } from "react";
import Badge from "@/components/ui/Badge";
import StatCard from "@/components/admin/StatCard";
import TimelineCard from "@/components/admin/TimelineCard";
import { adminConfig } from "@/config/admin";
import { useAdminData } from "@/context/AdminDataContext";
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

function TileIcon({ icon, tint }) {
  const classes = `h-9 w-9 inline-flex items-center justify-center rounded-lg ${TINT_TILE[tint]?.icon || TINT_TILE.cyan.icon}`;
  if (icon === "plus") {
    return (
      <span className={classes}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (icon === "flag") {
    return (
      <span className={classes}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M5 3v18M5 5l13-2v11L5 14" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className={classes}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <circle cx="12" cy="12" r="8" />
      </svg>
    </span>
  );
}

function TrafficSparkline() {
  const data = [42, 55, 48, 64, 72, 68, 86, 79, 92, 105, 98, 114, 128, 122];
  const w = 620;
  const h = 140;
  const step = w / (data.length - 1);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const normalize = (v) => h - ((v - min) / (max - min)) * (h - 24) - 12;
  const pts = data.map((v, i) => `${(i * step).toFixed(1)},${normalize(v).toFixed(1)}`).join(" ");
  const fill = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-36 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke="rgba(34,211,238,0.08)" strokeDasharray="2 6">
        {[0.25, 0.5, 0.75].map((p, i) => (
          <line key={i} x1="0" x2={w} y1={h * p} y2={h * p} />
        ))}
      </g>
      <polygon points={fill} fill="url(#g1)" />
      <polyline
        points={pts}
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((v, i) => {
        const x = (i * step).toFixed(1);
        const y = normalize(v).toFixed(1);
        return (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#020617" stroke="#22d3ee" strokeWidth="1.5" />
        );
      })}
    </svg>
  );
}

function HealthBar({ value, tint }) {
  const color = {
    emerald: "bg-emerald-400",
    cyan: "bg-cyan-400",
    violet: "bg-violet-400",
    amber: "bg-amber-400",
  }[tint] || "bg-cyan-400";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80">
      <div className={cn("h-full rounded-full", color)} style={{ width: `${Math.min(100, Number(value))}%` }} />
    </div>
  );
}

export default function AdminDashboard() {
  const { userCount, communityCount, activityCount, counts } = useAdminData();

  const statValues = useMemo(
    () =>
      adminConfig.dashboardStats.map((s) => {
        if (s.mode === "count") {
          return { ...s, value: counts[s.entity] ?? 0 };
        }
        if (s.mode === "derived") {
          return { ...s, value: Math.round(userCount * (s.derivedFactor || 1)) };
        }
        return { ...s, value: 0 };
      }),
    [counts, userCount],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400/70">
              Mission control
            </p>
            <Badge variant="warning" className="h-5 border-0 bg-amber-400/10 text-[10px] font-medium text-amber-300">
              Role gates coming soon
            </Badge>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">
            Welcome back — here's how SATHY is performing.
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Live seed data with <span className="mono-numerals text-cyan-300">{userCount}</span> users,
            <span className="mono-numerals text-emerald-300"> {communityCount}</span> communities, and
            <span className="mono-numerals text-amber-300"> {activityCount}</span> upcoming activities.
            Mutations here are in-memory only — reloading the page restores the seed baseline.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statValues.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            delta={s.delta}
            description={s.description}
            tint={s.tint}
            comingSoon={s.comingSoon}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="hud-border col-span-2 overflow-hidden rounded-xl bg-slate-900/70 p-5 backdrop-blur-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Engagement
              </p>
              <h3 className="mt-0.5 text-base font-semibold text-slate-50">
                Signups × new communities — last 14 days
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_0_rgba(34,211,238,0.6)]" />
                Signups
              </span>
              <Badge className="h-5 border border-slate-700 bg-slate-800/70 text-[10px] text-slate-300">
                Mock dataset
              </Badge>
            </div>
          </div>
          <TrafficSparkline />
        </div>

        <div className="hud-border overflow-hidden rounded-xl bg-slate-900/70 p-5 backdrop-blur-sm">
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Platform health
            </p>
            <h3 className="mt-0.5 text-base font-semibold text-slate-50">
              Node telemetry
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            {adminConfig.platformHealth.map((row) => (
              <div key={row.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs text-slate-300">{row.label}</span>
                  <span className="mono-numerals text-xs font-semibold text-slate-50">
                    {row.value}
                    <span className="ml-1 font-normal text-slate-400">{row.suffix}</span>
                  </span>
                </div>
                <HealthBar value={Number(String(row.value).replace("%", ""))} tint={row.tint} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Quick actions
            </p>
            <h3 className="mt-0.5 text-base font-semibold text-slate-50">
              Shortcut tiles
            </h3>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {adminConfig.shortcutTiles.map((tile) => {
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
                  <TileIcon icon={tile.icon} tint={tile.tint} />
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
      </div>

      <TimelineCard limit={8} />
    </div>
  );
}
