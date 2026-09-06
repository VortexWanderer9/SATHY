"use client";

import { useMemo } from "react";
import Badge from "@/components/ui/Badge";
import EntityCard from "@/components/admin/EntityCard";
import AdminEntityLayout from "@/components/admin/AdminEntityLayout";
import { useAdminData } from "@/context/AdminDataContext";

const FIELDS = [
  {
    key: "name",
    label: "Community name",
    type: "text",
    required: true,
    placeholder: "Weekend Hikers Collective",
  },
  {
    key: "location",
    label: "Location",
    type: "text",
    placeholder: "Pokhara, NP",
  },
  {
    key: "memberCount",
    label: "Member count",
    type: "number",
    placeholder: "100",
    comingSoon: "auto-calc from joins",
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    fullWidth: true,
    required: true,
    placeholder: "What ties this community together…",
  },
  {
    key: "tags",
    label: "Tags / Topics",
    type: "chips",
    placeholder: "hiking, outdoors, photography",
  },
];

function confirm(record) {
  return (
    typeof window !== "undefined" &&
    window.confirm(`Delete community "${record.name}"? This cannot be undone.`)
  );
}

function CommunityCard({ record, onEdit, onDelete, seedPrefix }) {
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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-50">{record.name}</h3>
        <Badge className="h-5 border border-emerald-400/25 bg-emerald-400/10 text-[10px] font-medium text-emerald-200">
          {record.memberCount} members
        </Badge>
      </div>
      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-400">
        {record.description}
      </p>
      <p className="mt-3 text-[11px] text-slate-400">
        {record.location || "No location"}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(record.tags || []).slice(0, 5).map((t) => (
          <Badge
            key={t}
            className="h-5 border border-slate-700/60 bg-slate-800/60 px-2 text-[10px] text-slate-300"
          >
            #{t}
          </Badge>
        ))}
        {(record.tags || []).length > 5 && (
          <Badge className="h-5 border border-slate-700/60 bg-slate-800/60 px-2 text-[10px] text-slate-400">
            +{(record.tags || []).length - 5}
          </Badge>
        )}
      </div>
    </EntityCard>
  );
}

export default function AdminCommunitiesPage() {
  const ctx = useAdminData();
  const tagOptions = useMemo(
    () =>
      Array.from(
        ctx.communities.reduce((s, c) => {
          (c.tags || []).forEach((t) => s.add(t));
          return s;
        }, new Set()),
      ).sort(),
    [ctx.communities],
  );

  return (
    <AdminEntityLayout
      entityKey="communities"
      entityLabel="Communities"
      accent="emerald"
      description="Interest-based groups that people can join. Tag-based filtering is reflected live on the public /communities page."
      addButtonLabel="+ New community"
      items={ctx.communities}
      seedPrefix="admin-com-"
      searchHint="name, description, location"
      tagOptions={tagOptions}
      matchSearch={(c, q) =>
        `${c.name} ${c.description} ${c.location}`.toLowerCase().includes(q)
      }
      matchTag={(c, tag) => (c.tags || []).includes(tag)}
      fieldSchema={FIELDS}
      renderCard={({ record, seedPrefix, onEdit, onDelete }) => (
        <CommunityCard
          key={record.id}
          record={record}
          seedPrefix={seedPrefix}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      onCreate={ctx.createCommunity}
      onUpdate={ctx.updateCommunity}
      onDelete={ctx.deleteCommunity}
      confirmDelete={confirm}
      editingInitialValues={(c) => ({
        name: c.name,
        location: c.location,
        memberCount: c.memberCount,
        description: c.description,
        tags: [...(c.tags || [])],
      })}
    />
  );
}
