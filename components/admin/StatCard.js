import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

const TINT_MAP = {
  cyan: {
    ring: "border-cyan-400/20",
    accent: "text-cyan-300",
    bar: "bg-cyan-400",
    pill: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
  },
  emerald: {
    ring: "border-emerald-400/20",
    accent: "text-emerald-300",
    bar: "bg-emerald-400",
    pill: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  },
  amber: {
    ring: "border-amber-400/20",
    accent: "text-amber-300",
    bar: "bg-amber-400",
    pill: "bg-amber-400/10 text-amber-300 border-amber-400/20",
  },
  violet: {
    ring: "border-violet-400/20",
    accent: "text-violet-300",
    bar: "bg-violet-400",
    pill: "bg-violet-400/10 text-violet-300 border-violet-400/20",
  },
};

function Sparkline({ tint }) {
  const seed = {
    cyan: [3, 6, 4, 9, 7, 12, 11, 16, 14, 18, 20],
    emerald: [8, 6, 10, 7, 12, 10, 13, 12, 15, 16, 18],
    amber: [2, 5, 3, 8, 6, 11, 9, 14, 12, 17, 22],
    violet: [6, 4, 8, 6, 11, 14, 12, 18, 16, 20, 26],
  }[tint] || [5, 8, 6, 10, 12, 11, 14, 16, 18, 20, 22];
  const max = Math.max(...seed);
  const min = Math.min(...seed);
  const w = 88;
  const h = 28;
  const step = w / (seed.length - 1);
  const normalize = (v) => h - ((v - min) / Math.max(1, max - min)) * (h - 4) - 2;
  const points = seed.map((v, i) => `${(i * step).toFixed(1)},${normalize(v).toFixed(1)}`).join(" ");
  const area = `0,${h} ${points} ${w},${h}`;
  const tintFill = {
    cyan: "#22d3ee",
    emerald: "#34d399",
    amber: "#fbbf24",
    violet: "#a78bfa",
  }[tint] || "#22d3ee";
  return (
    <svg width={`${w}px`} height={`${h}px`} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polygon points={area} fill={tintFill} opacity="0.12" />
      <polyline
        points={points}
        fill="none"
        stroke={tintFill}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StatCard({ label, value, delta, description, tint = "cyan", comingSoon }) {
  const t = TINT_MAP[tint] || TINT_MAP.cyan;
  return (
    <div className={cn("hud-border relative overflow-hidden rounded-xl bg-slate-900/70 p-5 backdrop-blur-sm", t.ring)}>
      <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-10 blur-2xl" style={{ background: `radial-gradient(circle, ${tint === 'cyan' ? '#22d3ee' : tint === 'emerald' ? '#34d399' : tint === 'amber' ? '#fbbf24' : '#a78bfa'}, transparent 70%)` }} />
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            {label}
          </p>
          <p className={cn("mono-numerals mt-1 text-3xl font-bold tracking-tight", t.accent)}>
            {value}
          </p>
        </div>
        <Sparkline tint={tint} />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Badge className={cn("h-5 border px-2 text-[10px] font-medium", t.pill)}>
          {delta}
        </Badge>
        <p className="flex items-center gap-1 text-[11px] text-slate-400">
          {description}
          {comingSoon && (
            <Badge
              variant="default"
              className="ml-1 h-4 border-0 bg-slate-800 px-1.5 text-[9px] text-slate-400"
            >
              Mock
            </Badge>
          )}
        </p>
      </div>
    </div>
  );
}
