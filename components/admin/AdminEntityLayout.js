"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import EntityForm from "@/components/admin/EntityForm";
import { TagFilterBar } from "@/components/ui/TagChip";
import { cn } from "@/lib/utils";

const ACCENT_HEADER = {
  cyan: {
    eyebrow: "text-sky-400/70",
    countBadge: "border-sky-500/20 bg-sky-500/10 text-sky-200",
    searchFocus: "focus:border-sky-500 focus:ring-sky-500",
    cta: "bg-sky-500 text-slate-950 hover:bg-sky-400 focus-visible:outline-sky-400 shadow-[0_0_14px_-6px_rgba(56,189,248,0.55)]",
  },
  emerald: {
    eyebrow: "text-emerald-400/70",
    countBadge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-200",
    searchFocus: "focus:border-emerald-500 focus:ring-emerald-500",
    cta: "bg-emerald-500 text-slate-950 hover:bg-emerald-400 focus-visible:outline-emerald-400 shadow-[0_0_14px_-6px_rgba(52,211,153,0.55)]",
  },
  amber: {
    eyebrow: "text-amber-400/70",
    countBadge: "border-amber-500/20 bg-amber-500/10 text-amber-200",
    searchFocus: "focus:border-amber-500 focus:ring-amber-500",
    cta: "bg-amber-500 text-slate-950 hover:bg-amber-400 focus-visible:outline-amber-400 shadow-[0_0_14px_-6px_rgba(251,191,36,0.55)]",
  },
};

const EMPTY_SUBTITLE = {
  users: "Clear the search or reset the interest tag to browse the full list.",
  communities: "Reset filters or seed a new community.",
  activities: "Reset filters or plan a new activity.",
};

export default function AdminEntityLayout({
  entityKey,
  entityLabel,
  accent = "cyan",
  description,
  addButtonLabel,
  items,
  seedPrefix,
  idField = "id",
  searchHint,
  tagOptions,
  matchSearch,
  matchTag,
  fieldSchema,
  renderCard,
  onCreate,
  onUpdate,
  onDelete,
  confirmDelete,
  editingInitialValues,
}) {
  const tokens = ACCENT_HEADER[accent] || ACCENT_HEADER.cyan;
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const count = items.length;
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((r) => {
      if (tagFilter && !matchTag(r, tagFilter)) return false;
      if (!q) return true;
      return matchSearch(r, q);
    });
  }, [items, query, tagFilter, matchSearch, matchTag]);

  const editingValues = useMemo(() => {
    if (!editingId) return {};
    const found = items.find((x) => x[idField] === editingId);
    return found ? editingInitialValues(found) : {};
  }, [editingId, items, idField, editingInitialValues]);

  const scrollTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openCreate = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  const startEdit = (id) => {
    setEditingId(id);
    setIsFormOpen(true);
    scrollTop();
  };

  const handleDelete = (record) => {
    if (confirmDelete(record)) {
      onDelete(record[idField]);
      if (editingId === record[idField]) {
        setEditingId(null);
        setIsFormOpen(false);
      }
    }
  };

  const handleSubmit = (payload, id) => {
    if (id) onUpdate(id, payload);
    else onCreate(payload);
    setIsFormOpen(false);
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className={cn("text-[10px] font-semibold uppercase tracking-[0.2em]", tokens.eyebrow)}>
              Entity
            </p>
            <Badge className={cn("h-5 border text-[10px]", tokens.countBadge)}>
              {count} total
            </Badge>
            {filtered.length !== count && (
              <Badge variant="default" className="h-5 border-0 bg-slate-800 text-[10px] text-slate-300">
                {filtered.length} match
              </Badge>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">
            {entityLabel}
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">{description}</p>
        </div>
        <Button onClick={openCreate} size="md" className={`border-0 ${tokens.cta}`}>
          {addButtonLabel}
        </Button>
      </header>

      {isFormOpen && (
        <EntityForm
          entityLabel={entityLabel}
          accent={accent}
          fields={fieldSchema}
          initialValues={editingValues}
          editingId={editingId}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingId(null);
          }}
        />
      )}

      <div className="hud-border flex flex-col gap-3 rounded-xl bg-slate-900/60 p-4 backdrop-blur-sm md:flex-row md:items-center">
        <Input
          label={
            <span className="text-xs text-slate-300">
              Search <span className="ml-1 text-slate-500">({searchHint})</span>
            </span>
          }
          placeholder={`Search ${entityLabel.toLowerCase()}…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            "border-slate-700 !bg-slate-950/60 text-slate-100 placeholder:text-slate-500",
            tokens.searchFocus,
          )}
        />
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-xs text-slate-300">Tag filter</span>
          <TagFilterBar options={tagOptions} selected={tagFilter} onSelect={setTagFilter} tone={accent} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="hud-border rounded-xl bg-slate-900/60 p-10 text-center backdrop-blur-sm">
          <h3 className="text-base font-semibold text-slate-100">No {entityLabel.toLowerCase()} match</h3>
          <p className="mt-1 text-sm text-slate-400">{EMPTY_SUBTITLE[entityKey] || "Reset filters or create a new one."}</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery("");
                setTagFilter(null);
              }}
              className="border border-slate-700/60 bg-slate-900/60 text-slate-200 hover:bg-slate-800/60 hover:text-slate-50"
            >
              Reset filters
            </Button>
            <Button onClick={openCreate} size="sm" className={`border-0 ${tokens.cta}`}>
              {addButtonLabel}
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((record) =>
            renderCard({
              record,
              seedPrefix,
              idField,
              onEdit: () => startEdit(record[idField]),
              onDelete: () => handleDelete(record),
            }),
          )}
        </div>
      )}
    </div>
  );
}
