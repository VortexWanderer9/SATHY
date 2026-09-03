import Badge from "@/components/ui/Badge";
import { adminEvents } from "@/lib/mock/adminEvents";

const TONE_MAP = {
  info: {
    dot: "bg-cyan-400 shadow-[0_0_10px_0_rgba(34,211,238,0.55)]",
    rail: "from-cyan-400/40",
    pill: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
  },
  success: {
    dot: "bg-emerald-400 shadow-[0_0_10px_0_rgba(52,211,153,0.55)]",
    rail: "from-emerald-400/40",
    pill: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  },
  warning: {
    dot: "bg-amber-400 shadow-[0_0_10px_0_rgba(251,191,36,0.55)]",
    rail: "from-amber-400/40",
    pill: "bg-amber-400/10 text-amber-300 border-amber-400/20",
  },
  danger: {
    dot: "bg-rose-400 shadow-[0_0_10px_0_rgba(251,113,133,0.55)]",
    rail: "from-rose-400/40",
    pill: "bg-rose-400/10 text-rose-300 border-rose-400/20",
  },
};

function VerbBadge({ verb, tone }) {
  const t = TONE_MAP[tone] || TONE_MAP.info;
  return (
    <Badge
      className={`border text-[10px] font-semibold uppercase tracking-wider ${t.pill}`}
    >
      {verb}
    </Badge>
  );
}

export default function TimelineCard({ limit = 12 }) {
  const rows = adminEvents.slice(0, limit);
  return (
    <div className="hud-border relative overflow-hidden rounded-xl bg-slate-900/70 p-5 backdrop-blur-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Mission log
          </p>
          <h3 className="mt-1 text-base font-semibold text-slate-50">
            Recent admin events
          </h3>
        </div>
        <Badge className="h-5 border-0 bg-cyan-400/10 px-2 text-[10px] font-medium text-cyan-300">
          {rows.length} entries
        </Badge>
      </div>

      <ol className="relative">
        <span
          className="pointer-events-none absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-cyan-400/20 via-slate-700/60 to-transparent"
          aria-hidden="true"
        />
        {rows.map((evt, idx) => {
          const tone = TONE_MAP[evt.tone] || TONE_MAP.info;
          const isLast = idx === rows.length - 1;
          return (
            <li
              key={evt.id}
              className={`relative flex gap-4 pl-6 ${isLast ? "" : "pb-5"}`}
            >
              <span
                className={`absolute left-0 top-1 h-3.5 w-3.5 rounded-full ${tone.dot} ring-4 ring-slate-950`}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <VerbBadge verb={evt.verb} tone={evt.tone} />
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    {evt.entityType}
                  </span>
                  <span className="ml-auto text-[10px] text-slate-500">
                    {evt.relative}
                  </span>
                </div>
                <p className="truncate text-sm text-slate-100">
                  <span className="text-slate-300">{evt.entityName}</span>
                  <span className="mx-1.5 text-slate-600">·</span>
                  <span className="text-slate-400">by {evt.actor}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
