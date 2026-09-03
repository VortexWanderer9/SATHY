"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const TYPE_TO_COMPONENT = {
  text: Input,
  number: Input,
  email: Input,
  textarea: Textarea,
};

function TagChipList({ values, onRemove, accent = "cyan" }) {
  if (!values || values.length === 0) return null;
  const accentClasses =
    accent === "cyan"
      ? "bg-cyan-400/10 text-cyan-200 border-cyan-400/30 hover:bg-cyan-400/15"
      : accent === "emerald"
        ? "bg-emerald-400/10 text-emerald-200 border-emerald-400/30 hover:bg-emerald-400/15"
        : "bg-amber-400/10 text-amber-200 border-amber-400/30 hover:bg-amber-400/15";
  return (
    <div className="flex flex-wrap gap-1.5">
      {values.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onRemove(v)}
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium transition",
            accentClasses,
          )}
          aria-label={`Remove ${v}`}
        >
          {v}
          <span aria-hidden className="text-[10px] opacity-60">
            ×
          </span>
        </button>
      ))}
    </div>
  );
}

export default function EntityForm({
  entityLabel,
  fields,
  initialValues = {},
  editingId = null,
  onSubmit,
  onCancel,
  accent = "cyan",
}) {
  const [values, setValues] = useState({});
  const [chips, setChips] = useState({});
  const [chipInputs, setChipInputs] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const nextValues = {};
    const nextChips = {};
    fields.forEach((f) => {
      const existing = initialValues[f.key];
      if (f.type === "chips") {
        nextChips[f.key] = Array.isArray(existing) ? [...existing] : [];
      } else if (existing !== undefined && existing !== null) {
        nextValues[f.key] = existing;
      } else if (f.defaultValue !== undefined) {
        nextValues[f.key] = f.defaultValue;
      } else {
        nextValues[f.key] = "";
      }
    });
    setValues(nextValues);
    setChips(nextChips);
    setErrors({});
  }, [fields, initialValues]);

  const accentPrimaryClasses =
    accent === "cyan"
      ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 focus-visible:outline-cyan-400"
      : accent === "emerald"
        ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 focus-visible:outline-emerald-400"
        : "bg-amber-500 text-slate-950 hover:bg-amber-400 focus-visible:outline-amber-400";

  const updateValue = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const commitChipInput = (fieldKey, separator = ",") => {
    const raw = (chipInputs[fieldKey] || "").trim();
    if (!raw) return;
    const pieces = raw
      .split(separator)
      .map((p) => p.trim())
      .filter(Boolean);
    setChips((prev) => ({
      ...prev,
      [fieldKey]: Array.from(new Set([...(prev[fieldKey] || []), ...pieces])),
    }));
    setChipInputs((prev) => ({ ...prev, [fieldKey]: "" }));
  };

  const removeChip = (fieldKey, value) => {
    setChips((prev) => ({
      ...prev,
      [fieldKey]: (prev[fieldKey] || []).filter((v) => v !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    fields.forEach((f) => {
      if (f.required) {
        const isChips = f.type === "chips";
        const empty = isChips
          ? !chips[f.key] || chips[f.key].length === 0
          : values[f.key] === undefined || values[f.key] === null || `${values[f.key]}`.trim() === "";
        if (empty) {
          nextErrors[f.key] = `${f.label} is required`;
        }
      }
    });
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    const payload = { ...values };
    Object.keys(chips).forEach((k) => {
      payload[k] = chips[k];
    });
    onSubmit(payload, editingId);
  };

  return (
    <form onSubmit={handleSubmit} className="hud-border relative overflow-hidden rounded-xl bg-slate-900/80 p-5 backdrop-blur-sm">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            {editingId ? "Edit record" : "Create record"}
          </p>
          <h3 className="mt-0.5 text-lg font-semibold text-slate-50">
            {editingId ? `Edit ${entityLabel}` : `New ${entityLabel}`}
          </h3>
        </div>
        {editingId && (
          <Badge variant="warning" className="h-5 border-0 bg-amber-400/10 text-[10px] font-medium text-amber-300">
            id: {editingId}
          </Badge>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const Component = TYPE_TO_COMPONENT[f.type];
          const showRaw = !!f.comingSoon;

          if (f.type === "chips") {
            return (
              <div key={f.key} className={cn("sm:col-span-2", f.fullWidth ? "" : "")}>
                <div className="mb-1.5 flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-200">
                    {f.label}
                    {f.required && <span className="ml-0.5 text-rose-400">*</span>}
                  </label>
                  {showRaw && (
                    <Badge variant="default" className="h-4 border-0 bg-slate-800 px-1.5 text-[9px] text-slate-400">
                      comma-separated
                    </Badge>
                  )}
                </div>
                <TagChipList values={chips[f.key] || []} onRemove={(v) => removeChip(f.key, v)} accent={accent} />
                <input
                  type="text"
                  className="mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder={f.placeholder || `Type and press Enter or comma…`}
                  value={chipInputs[f.key] || ""}
                  onChange={(e) => setChipInputs((p) => ({ ...p, [f.key]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      commitChipInput(f.key);
                    }
                    if (e.key === "Backspace" && !chipInputs[f.key] && (chips[f.key] || []).length) {
                      const last = chips[f.key][chips[f.key].length - 1];
                      removeChip(f.key, last);
                    }
                  }}
                  onBlur={() => commitChipInput(f.key)}
                />
                {errors[f.key] && <p className="mt-1 text-xs text-rose-400">{errors[f.key]}</p>}
              </div>
            );
          }

          return (
            <div key={f.key} className={cn(f.fullWidth ? "sm:col-span-2" : "")}>
              <Component
                label={
                  <span className="text-slate-200">
                    {f.label}
                    {f.required && <span className="ml-0.5 text-rose-400">*</span>}
                    {showRaw && (
                      <Badge variant="default" className="ml-2 h-4 border-0 bg-slate-800 px-1.5 text-[9px] text-slate-400">
                        {f.comingSoon}
                      </Badge>
                    )}
                  </span>
                }
                type={f.type === "number" ? "number" : f.type === "email" ? "email" : "text"}
                placeholder={f.placeholder}
                value={values[f.key] ?? ""}
                onChange={(e) => updateValue(f.key, e.target.value)}
                disabled={f.disabled}
                className={cn(
                  "border-slate-700 !bg-slate-950/60 text-slate-100 placeholder:text-slate-500",
                  "focus:border-cyan-500 focus:ring-cyan-500",
                  errors[f.key] ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500" : "",
                )}
                labelClassName="text-slate-200"
              />
              {errors[f.key] && <p className="mt-1 text-xs text-rose-400">{errors[f.key]}</p>}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-2 border-t border-slate-800/70 pt-4">
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={onCancel}
          className="border border-slate-700/60 bg-slate-900/60 text-slate-200 hover:bg-slate-800/60 hover:text-slate-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="md"
          className={`border-0 shadow-[0_0_14px_-6px_rgba(34,211,238,0.55)] ${accentPrimaryClasses}`}
        >
          {editingId ? `Save changes` : `Create ${entityLabel}`}
        </Button>
      </div>
    </form>
  );
}
