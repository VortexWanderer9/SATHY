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
  { key: "title", label: "Event title", type: "text", required: true, placeholder: "e.g. Weekend Sunrise Hike — Shivapuri" },
  { key: "location", label: "Location", type: "text", placeholder: "Kathmandu, NP" },
  { key: "date", label: "Date & time", type: "text", placeholder: "Sat, Sep 20 · 5:30 AM" },
  {
    key: "attendeesCount",
    label: "RSVP count",
    type: "number",
    placeholder: "42",
    comingSoon: "auto-calc from RSVP",
  },
  { key: "description", label: "Description", type: "textarea", fullWidth: true, required: true, placeholder: "What's happening, who should come, and what to bring…" },
  { key: "tags", label: "Tags", type: "chips", placeholder: "hiking, outdoors, photography" },
];

export default function AdminActivitiesPage() {
  const { activities, createActivity, updateActivity, deleteActivity } = useAdminData();
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const tagSet = useMemo(() => {
    const s = new Set();
    activities.forEach((a) => (a.tags || []).forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [activities]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return activities.filter((a) => {
      if (tagFilter && !(a.tags || []).includes(tagFilter)) return false;
      if (!q) return true;
      return (
        (a.title || "").toLowerCase().includes(q) ||
        (a.description || "").toLowerCase().includes(q) ||
        (a.location || "").toLowerCase().includes(q) ||
        (a.date || "").toLowerCase().includes(q)
      );
    });
  }, [activities, query, tagFilter]);

  const editingValues = useMemo(() => {
    if (!editingId) return {};
    const a = activities.find((x) => x.id === editingId);
    if (!a) return {};
    return {
      title: a.title,
      location: a.location,
      date: a.date,
      attendeesCount: a.attendeesCount,
      description: a.description,
      tags: [...(a.tags || [])],
    };
  }, [editingId, activities]);

  const openCreate = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  const startEdit = (id) => {
    setEditingId(id);
    setIsFormOpen(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = (a) => {
    const ok =
      typeof window !== "undefined" &&
      window.confirm(`Delete activity "${a.title}"? This cannot be undone.`);
    if (ok) {
      deleteActivity(a.id);
      if (editingId === a.id) {
        setEditingId(null);
        setIsFormOpen(false);
      }
    }
  };

  const handleSubmit = (payload, id) => {
    if (id) updateActivity(id, payload);
    else createActivity(payload);
    setIsFormOpen(false);
    setEditingId(null);
  };

  const accentClasses =
    "bg-amber-500 text-slate-950 hover:bg-amber-400 focus-visible:outline-amber-400 shadow-[0_0_14px_-6px_rgba(251,191,36,0.55)]";

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/70">
              Entity
            </p>
            <Badge className="h-5 border border-amber-500/20 bg-amber-500/10 text-[10px] text-amber-200">
              {activities.length} total
            </Badge>
            {filtered.length !== activities.length && (
              <Badge variant="default" className="h-5 border-0 bg-slate-800 text-[10px] text-slate-300">
                {filtered.length} match
              </Badge>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">
            Activities
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Scheduled events and meetups listed on the public `/activities` page. Edits are reflected live across the site while the session is open.
          </p>
        </div>
        <Button onClick={openCreate} size="md" className={`border-0 ${accentClasses}`}>
          + Plan activity
        </Button>
      </header>

      {isFormOpen && (
        <EntityForm
          entityLabel="Activity"
          accent="amber"
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
              Search <span className="ml-1 text-slate-500">(title, description, location, date)</span>
            </span>
          }
          placeholder="Search activities…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-slate-700 !bg-slate-950/60 text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500"
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
                  ? "border-amber-400/60 bg-amber-400/10 text-amber-200"
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
                    ? "border-amber-400/60 bg-amber-400/10 text-amber-200"
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
          <h3 className="text-base font-semibold text-slate-100">No activities match</h3>
          <p className="mt-1 text-sm text-slate-400">Reset filters or plan a new activity.</p>
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
              + Plan activity
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((a) => (
            <EntityCard
              key={a.id}
              eyebrow={a.id.startsWith("admin-act-") ? "Created via admin" : "Baseline seed"}
              actions={[
                { tone: "edit", label: "Edit", onClick: () => startEdit(a.id) },
                { tone: "delete", label: "Delete", onClick: () => confirmDelete(a) },
              ]}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold leading-snug text-slate-50">{a.title}</h3>
                <Badge className="h-5 shrink-0 border border-amber-400/25 bg-amber-400/10 text-[10px] font-medium text-amber-200">
                  <span className="mono-numerals">{a.attendeesCount}</span> RSVP
                </Badge>
              </div>
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-400">
                {a.description}
              </p>
              <div className="mt-3 flex flex-col gap-1.5 text-[11px] text-slate-400">
                <p className="inline-flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-amber-400/80">
                    <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
                    <path d="M8 3v5M16 3v5M3.5 10h17" strokeLinecap="round" />
                  </svg>
                  <span className="text-slate-300">{a.date || "Date TBA"}</span>
                </p>
                <p className="inline-flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-slate-500">
                    <path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {a.location || "No location"}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(a.tags || []).slice(0, 5).map((t) => (
                  <Badge key={t} className="h-5 border border-slate-700/60 bg-slate-800/60 px-2 text-[10px] text-slate-300">
                    #{t}
                  </Badge>
                ))}
                {(a.tags || []).length > 5 && (
                  <Badge className="h-5 border border-slate-700/60 bg-slate-800/60 px-2 text-[10px] text-slate-400">
                    +{(a.tags || []).length - 5}
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
