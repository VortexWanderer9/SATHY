"use client";

import { useMemo } from "react";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import EntityCard from "@/components/admin/EntityCard";
import AdminEntityLayout from "@/components/admin/AdminEntityLayout";
import { useAdminData } from "@/context/AdminDataContext";

const FIELDS = [
  {
    key: "name",
    label: "Full name",
    type: "text",
    required: true,
    placeholder: "e.g. Alice Test",
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "alice@example.com",
  },
  {
    key: "location",
    label: "Location",
    type: "text",
    placeholder: "Kathmandu, NP",
  },
  { key: "age", label: "Age", type: "number", placeholder: "28" },
  {
    key: "bio",
    label: "Bio",
    type: "textarea",
    fullWidth: true,
    placeholder: "Short intro shown on their profile…",
  },
  {
    key: "interests",
    label: "Interests",
    type: "chips",
    placeholder: "hiking, coffee, photography, board games",
  },
];

function confirm(record) {
  return (
    typeof window !== "undefined" &&
    window.confirm(`Delete user "${record.name}"? This cannot be undone.`)
  );
}

function UserCard({ record, onEdit, onDelete, seedPrefix }) {
  return (
    <EntityCard
      eyebrow={
        record.id.startsWith(seedPrefix) ? "Created via admin" : "Baseline seed"
      }
      actions={[
        { tone: "edit", label: "Edit", onClick: onEdit },
        { tone: "delete", label: "Delete", onClick: onDelete },
      ]}
    >
      <div className="flex items-start gap-3">
        <Avatar
          src={record.avatarUrl || undefined}
          name={record.name}
          size="md"
          className="h-11 w-11 shrink-0 rounded-full border border-sky-400/25 bg-slate-800 text-sm font-bold text-sky-200"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-50">
            {record.name}
          </p>
          <p className="truncate text-xs text-slate-400">{record.email}</p>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-400">
        {record.bio || "No bio yet."}
      </p>
      <p className="mt-3 text-[11px] text-slate-400">
        {record.location || "No location"} · Age {record.age || "—"}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(record.interests || []).slice(0, 4).map((t) => (
          <Badge
            key={t}
            className="h-5 border border-slate-700/60 bg-slate-800/60 px-2 text-[10px] text-slate-300"
          >
            {t}
          </Badge>
        ))}
        {(record.interests || []).length > 4 && (
          <Badge className="h-5 border border-slate-700/60 bg-slate-800/60 px-2 text-[10px] text-slate-400">
            +{(record.interests || []).length - 4}
          </Badge>
        )}
      </div>
    </EntityCard>
  );
}

export default function AdminUsersPage() {
  const { users, createUser, updateUser, deleteUser } = useAdminData();
  const interestSet = useMemo(
    () =>
      Array.from(
        users.reduce((s, u) => {
          (u.interests || []).forEach((i) => s.add(i));
          return s;
        }, new Set()),
      )
        .sort()
        .slice(0, 10),
    [users],
  );

  return (
    <AdminEntityLayout
      entityKey="users"
      entityLabel="Users"
      accent="cyan"
      description="Browse and manage operator and member accounts for the platform."
      addButtonLabel="+ Add user"
      items={users}
      seedPrefix="admin-user-"
      searchHint="name, email, location, bio"
      tagOptions={interestSet}
      matchSearch={(u, q) =>
        `${u.name} ${u.email} ${u.location} ${u.bio}`.toLowerCase().includes(q)
      }
      matchTag={(u, tag) => (u.interests || []).includes(tag)}
      fieldSchema={FIELDS}
      renderCard={({ record, seedPrefix, onEdit, onDelete }) => (
        <UserCard
          key={record.id}
          record={record}
          seedPrefix={seedPrefix}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      onCreate={createUser}
      onUpdate={updateUser}
      onDelete={deleteUser}
      confirmDelete={confirm}
      editingInitialValues={(u) => ({
        name: u.name,
        email: u.email,
        location: u.location,
        age: u.age,
        bio: u.bio,
        interests: [...(u.interests || [])],
      })}
    />
  );
}
