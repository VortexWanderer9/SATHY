import { cn } from "@/lib/utils";

const TONES = {
  cyan:
    "bg-cyan-400/10 text-cyan-200 border-cyan-400/30 hover:bg-cyan-400/15",
  emerald:
    "bg-emerald-400/10 text-emerald-200 border-emerald-400/30 hover:bg-emerald-400/15",
  amber:
    "bg-amber-400/10 text-amber-200 border-amber-400/30 hover:bg-amber-400/15",
  slate:
    "bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800",
};

export default function TagChip({ value, tone = "slate", onRemove, className, children }) {
  const classes =
    typeof onRemove === "function"
      ? "cursor-pointer inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium transition"
      : "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium";
  if (onRemove) {
    return (
      <button
        type="button"
        onClick={() => onRemove(value)}
        aria-label={typeof value === "string" ? `Remove ${value}` : "Remove tag"}
        className={cn(classes, TONES[tone] || TONES.slate, className)}
      >
        {children ?? value}
        <span aria-hidden className="text-[10px] opacity-60">
          ×
        </span>
      </button>
    );
  }
  return (
    <span className={cn(classes, TONES[tone] || TONES.slate, className)}>
      {children ?? value}
    </span>
  );
}

export function TagFilterBar({ options, selected, onSelect, tone = "cyan" }) {
  const toneActive = {
    cyan: "border-cyan-400/60 bg-cyan-400/10 text-cyan-200",
    emerald: "border-emerald-400/60 bg-emerald-400/10 text-emerald-200",
    amber: "border-amber-400/60 bg-amber-400/10 text-amber-200",
  }[tone];
  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] transition",
          !selected
            ? toneActive
            : "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/60",
        )}
      >
        All
      </button>
      {options.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onSelect(selected === t ? null : t)}
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] transition",
            selected === t
              ? toneActive
              : "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/60",
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
