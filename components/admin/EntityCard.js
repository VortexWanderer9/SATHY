import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const TONE_MAP = {
  edit:
    "border-cyan-400/30 bg-cyan-400/5 text-cyan-200 hover:bg-cyan-400/10 hover:text-cyan-50",
  delete:
    "border-rose-500/30 bg-rose-500/5 text-rose-200 hover:bg-rose-500/10 hover:text-rose-50",
  view:
    "border-slate-600/60 bg-slate-800/50 text-slate-200 hover:bg-slate-700/60 hover:text-slate-50",
};

export default function EntityCard({ children, actions, className, eyebrow, status }) {
  return (
    <article
      className={cn(
        "hud-border group relative flex flex-col overflow-hidden rounded-xl bg-slate-900/60 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-18px_rgba(8,47,73,0.7)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
      <div className="flex flex-col gap-4 p-5">
        {(eyebrow || status) && (
          <div className="flex items-center justify-between">
            {eyebrow && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-400/70">
                {eyebrow}
              </p>
            )}
            {status && <Badge {...status.props}>{status.label}</Badge>}
          </div>
        )}
        <div className="flex min-h-[96px] flex-1 flex-col">{children}</div>
        {actions && (
          <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-slate-800/70 pt-4">
            {actions.map((action, i) => {
              if (action.asBadge) {
                return (
                  <Badge
                    key={i}
                    variant={action.variant || "default"}
                    className={action.className}
                  >
                    {action.label}
                  </Badge>
                );
              }
              return (
                <Button
                  key={i}
                  variant={action.variant || "ghost"}
                  size="sm"
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className={cn(
                    "border",
                    action.tone ? TONE_MAP[action.tone] : TONE_MAP.view,
                    action.className,
                  )}
                >
                  {action.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
