"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import EntityCard from "@/components/admin/EntityCard";
import EntityForm from "@/components/admin/EntityForm";
import { useAdminData } from "@/context/AdminDataContext";
import { cn } from "@/lib/utils";

const FIELDS = [
  { key: "name", label: "Full name", type: "text", required: true, placeholder: "e.g. Alice Test" },
  { key: "email", label: "Email", type: "email", required: true, placeholder: "alice@example.com" },
  { key: "location", label: "Location", type: "text", placeholder: "Kathmandu, NP" },
  { key: "age", label: "Age", type: "number", placeholder: "28" },
  { key: "bio", label: "Bio", type: "textarea", fullWidth: true, placeholder: "Short intro shown on their profile…" },
  { key: "interests", label: "Interests", type: "chips", placeholder: "hiking, coffee, photography, board games" },
];

export default function AdminUsersPage() {
  const { users, createUser, updateUser, deleteUser } = useAdminData();
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const interestSet = useMemo(() => {
    const s = new Set();
    users.forEach((u) => (u.interests || []).forEach((i) => s.add(i)));
    return Array.from(s).sort().slice(0, 10);
  }, [users]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      if (tagFilter && !(u.interests || []).includes(tagFilter)) return false;
      if (!q) return true;
      return (
        (u.name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.location || "").toLowerCase().includes(q) ||
        (u.bio || "").toLowerCase().includes(q)
      );
    });
  }, [users, query, tagFilter]);

  const editingValues = useMemo(() => {
    if (!editingId) return {};
    const u = users.find((x) => x.id === editingId);
    if (!u) return {};
    return {
      name: u.name,
      email: u.email,
      location: u.location,
      age: u.age,
      bio: u.bio,
      interests: [...(u.interests || [])],
    };
  }, [editingId, users]);

  const openCreate = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  const startEdit = (id) => {
    setEditingId(id);
    setIsFormOpen(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const confirmDelete = (u) => {
    const ok = typeof window !== "undefined" && window.confirm(`Delete user "${u.name}"? This cannot be undone.`);
    if (ok) {
      deleteUser(u.id);
      if (editingId === u.id) {
        setEditingId(null);
        setIsFormOpen(false);
      }
    }
  };

  const handleSubmit = (payload, id) => {
    if (id) updateUser(id, payload);
    else createUser(payload);
    setIsFormOpen(false);
    setEditingId(null);
  };

  const accentClasses =
    "bg-sky-500 text-slate-950 hover:bg-sky-400 focus-visible:outline-sky-400 shadow-[0_0_14px_-6px_rgba(56,189,248,0.55)]";

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-400/70">
              Entity
            </p>
            <Badge className="h-5 border border-sky-500/20 bg-sky-500/10 text-[10px] text-sky-200">
              {users.length} total
            </Badge>
            {filtered.length !== users.length && (
              <Badge variant="default" className="h-5 border-0 bg-slate-800 text-[10px] text-slate-300">
                {filtered.length} match
              </Badge>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">
            Users
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Browse and manage operator and member accounts for the platform.
          </p>
        </div>
        <Button
          onClick={openCreate}
          size="md"
          className={`border-0 ${accentClasses}`}
        >
          + Add user
        </Button>
      </header>

      {isFormOpen && (
        <EntityForm
          entityLabel="User"
          accent="cyan"
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
              Search <span className="ml-1 text-slate-500">(name, email, location, bio)</span>
            </span>
          }
          placeholder="Search users…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-slate-700 !bg-slate-950/60 text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500"
        />
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-xs text-slate-300">
            Filter by interest <span className="ml-1 text-slate-500">(top 10)</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setTagFilter(null)}
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] transition",
                !tagFilter
                  ? "border-sky-400/60 bg-sky-400/10 text-sky-200"
                  : "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/60",
              )}
            >
              All
            </button>
            {interestSet.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTagFilter(tagFilter === t ? null : t)}
                className={cn(
                  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] transition",
                  tagFilter === t
                    ? "border-sky-400/60 bg-sky-400/10 text-sky-200"
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
          <h3 className="text-base font-semibold text-slate-100">No users match your filters</h3>
          <p className="mt-1 text-sm text-slate-400">
            Clear the search or reset the interest tag to browse the full list.
          </p>
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
            <Button
              onClick={openCreate}
              size="sm"
              className={`border-0 ${accentClasses}`}
            >
              + Add user instead
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((u) => (
            <EntityCard
              key={u.id}
              eyebrow={u.id.startsWith("admin-user-") ? "Created via admin" : "Baseline seed"}
              actions={[
                { tone: "edit", label: "Edit", onClick: () => startEdit(u.id) },
                { tone: "delete", label: "Delete", onClick: () => confirmDelete(u) },
              ]}
            >
              <div className="flex items-start gap-3">
                <Avatar
                  src={u.avatarUrl || undefined}
                  name={u.name}
                  size="md"
                  className="h-11 w-11 shrink-0 rounded-full border border-sky-400/25 bg-slate-800 text-sm font-bold text-sky-200"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-50">{u.name}</p>
                  <p className="truncate text-xs text-slate-400">{u.email}</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-400">
                {u.bio || "No bio yet."}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-slate-500">
                    <path d="M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM4 20c.8-3.6 3.8-5.5 8-5.5s7.2 1.9 8 5.5" strokeLinecap="round" />
                  </svg>
                  {u.location || "No location"}
                </span>
                <span className="inline-flex items-center gap-1 mono-numerals text-slate-500">
                  ·
                  <span>Age {u.age || "—"}</span>
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(u.interests || []).slice(0, 4).map((t) => (
                  <Badge key={t} className="h-5 border border-slate-700/60 bg-slate-800/60 px-2 text-[10px] text-slate-300">
                    {t}
                  </Badge>
                ))}
                {(u.interests || []).length > 4 && (
                  <Badge className="h-5 border border-slate-700/60 bg-slate-800/60 px-2 text-[10px] text-slate-400">
                    +{(u.interests || []).length - 4}
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
