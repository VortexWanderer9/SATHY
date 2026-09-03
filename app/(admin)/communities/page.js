"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import EntityCard from "@/components/admin/EntityCard";
import EntityForm from "@/components/admin/EntityForm";
import { useAdminData } from "@/context/AdminDataContext";
import { cn } from "@/lib/utils";

const FIELDS = [
  { key: "name", label: "Community name", type: "text", required: true, placeholder: "e.g. Weekend Hikers Collective" },
  { key: "location", label: "Location", type: "text", placeholder: "Pokhara, NP" },
  {
    key: "memberCount",
    label: "Member count",
    type: "number",
    placeholder: "100",
    comingSoon: "auto-calc from joins",
  },
  { key: "description", label: "Description", type: "textarea", fullWidth: true, required: true, placeholder: "What ties this community together…" },
  { key: "tags", label: "Tags / Topics", type: "chips", placeholder: "hiking, outdoors, photography" },
];

export default function AdminCommunitiesPage() {
  const { communities, createCommunity, updateCommunity, deleteCommunity } = useAdminData();
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const tagSet = useMemo(() => {
    const s = new Set();
    communities.forEach((c) => (c.tags || []).forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [communities]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return communities.filter((c) => {
      if (tagFilter && !(c.tags || []).includes(tagFilter)) return false;
      if (!q) return true;
      return (
        (c.name || "").toLowerCase().includes(q) ||
        (c.description || "").toLowerCase().includes(q) ||
        (c.location || "").toLowerCase().includes(q)
      );
    });
  }, [communities, query, tagFilter]);

  const editingValues = useMemo(() => {
    if (!editingId) return {};
    const c = communities.find((x) => x.id === editingId);
    if (!c) return {};
    return {
      name: c.name,
      location: c.location,
      memberCount: c.memberCount,
      description: c.description,
      tags: [...(c.tags || [])],
    };
  }, [editingId, communities]);

  const openCreate = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  const startEdit = (id) => {
    setEditingId(id);
    setIsFormOpen(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = (c) => {
    const ok =
      typeof window !== "undefined" &&
      window.confirm(`Delete community "${c.name}"? This cannot be undone.`);
    if (ok) {
      deleteCommunity(c.id);
      if (editingId === c.id) {
        setEditingId(null);
        setIsFormOpen(false);
      }
    }
  };

  const handleSubmit = (payload, id) => {
    if (id) updateCommunity(id, payload);
    else createCommunity(payload);
    setIsFormOpen(false);
    setEditingId(null);
  };

  const accentClasses =
    "bg-emerald-500 text-slate-950 hover:bg-emerald-400 focus-visible:outline-emerald-400 shadow-[0_0_14px_-6px_rgba(52,211,153,0.55)]";

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400/70">
              Entity
            </p>
            <Badge className="h-5 border border-emerald-500/20 bg-emerald-500/10 text-[10px] text-emerald-200">
              {communities.length} total
            </Badge>
            {filtered.length !== communities.length && (
              <Badge variant="default" className="h-5 border-0 bg-slate-800 text-[10px] text-slate-300">
                {filtered.length} match
              </Badge>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">
            Communities
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Interest-based groups that people can join. Tag-based filtering is reflected live on the public `/communities` page.
          </p>
        </div>
        <Button onClick={openCreate} size="md" className={`border-0 ${accentClasses}`}>
          + New community
        </Button>
      </header>

      {isFormOpen && (
        <EntityForm
          entityLabel="Community"
          accent="emerald"
          fields={FIELDS}
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
              Search <span className="ml-1 text-slate-500">(name, description, location)</span>
            </span>
          }
          placeholder="Search communities…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-slate-700 !bg-slate-950/60 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
        />
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-xs text-slate-300">Tag filter</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setTagFilter(null)}
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] transition",
                !tagFilter
                  ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-200"
                  : "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/60",
              )}
            >
              All
            </button>
            {tagSet.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTagFilter(tagFilter === t ? null : t)}
                className={cn(
                  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] transition",
                  tagFilter === t
                    ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-200"
                    : "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/60",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="hud-border rounded-xl bg-slate-900/60 p-10 text-center backdrop-blur-sm">
          <h3 className="text-base font-semibold text-slate-100">No communities match</h3>
          <p className="mt-1 text-sm text-slate-400">Reset filters or seed a new community.</p>
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
            <Button onClick={openCreate} size="sm" className={`border-0 ${accentClasses}`}>
              + New community
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c) => (
            <EntityCard
              key={c.id}
              eyebrow={c.id.startsWith("admin-com-") ? "Created via admin" : "Baseline seed"}
              actions={[
                { tone: "edit", label: "Edit", onClick: () => startEdit(c.id) },
                { tone: "delete", label: "Delete", onClick: () => confirmDelete(c) },
              ]}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-50">{c.name}</h3>
                <Badge className="h-5 border border-emerald-400/25 bg-emerald-400/10 text-[10px] font-medium text-emerald-200">
                  <span className="mono-numerals">{c.memberCount}</span> members
                </Badge>
              </div>
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-400">
                {c.description}
              </p>
              <p className="mt-3 inline-flex items-center gap-1 text-[11px] text-slate-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-slate-500">
                  <path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {c.location || "No location"}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(c.tags || []).slice(0, 5).map((t) => (
                  <Badge key={t} className="h-5 border border-slate-700/60 bg-slate-800/60 px-2 text-[10px] text-slate-300">
                    #{t}
                  </Badge>
                ))}
                {(c.tags || []).length > 5 && (
                  <Badge className="h-5 border border-slate-700/60 bg-slate-800/60 px-2 text-[10px] text-slate-400">
                    +{(c.tags || []).length - 5}
                  </Badge>
                )}
              </div>
            </EntityCard>
          ))}
        </div>
      )}
    </div>
  );
}
