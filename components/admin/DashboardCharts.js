import Badge from "@/components/ui/Badge";

function TrafficSparkline() {
  const data = [42, 55, 48, 64, 72, 68, 86, 79, 92, 105, 98, 114, 128, 122];
  const w = 620;
  const h = 140;
  const step = w / (data.length - 1);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const normalize = (v) => h - ((v - min) / (max - min)) * (h - 24) - 12;
  const points = data
    .map((v, i) => `${(i * step).toFixed(1)},${normalize(v).toFixed(1)}`)
    .join(" ");
  const fill = `0,${h} ${points} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-36 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="adminSparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke="rgba(34,211,238,0.08)" strokeDasharray="2 6">
        {[0.25, 0.5, 0.75].map((p, i) => (
          <line key={i} x1="0" x2={w} y1={h * p} y2={h * p} />
        ))}
      </g>
      <polygon points={fill} fill="url(#adminSparkFill)" />
      <polyline
        points={points}
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

export default function DashboardEngagementCard() {
  return (
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
  );
}

const HEALTH_BAR_TINT = {
  emerald: "bg-emerald-400",
  cyan: "bg-cyan-400",
  violet: "bg-violet-400",
  amber: "bg-amber-400",
};

export function DashboardHealthCard({ rows }) {
  return (
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
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs text-slate-300">{row.label}</span>
              <span className="text-xs font-semibold text-slate-50">
                {row.value}
                <span className="ml-1 font-normal text-slate-400">{row.suffix}</span>
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80">
              <div
                className={`h-full rounded-full ${HEALTH_BAR_TINT[row.tint] || HEALTH_BAR_TINT.cyan}`}
                style={{ width: `${Math.min(100, Number(String(row.value).replace("%", "")))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
