"use client";

import { useMemo } from "react";
import Badge from "@/components/ui/Badge";
import EntityCard from "@/components/admin/EntityCard";
import AdminEntityLayout from "@/components/admin/AdminEntityLayout";
import { useAdminData } from "@/context/AdminDataContext";

const FIELDS = [
  {
    key: "title",
    label: "Event title",
    type: "text",
    required: true,
    placeholder: "Weekend Sunrise Hike — Shivapuri",
  },
  {
    key: "location",
    label: "Location",
    type: "text",
    placeholder: "Kathmandu, NP",
  },
  {
    key: "date",
    label: "Date & time",
    type: "text",
    placeholder: "Sat, Sep 20 · 5:30 AM",
  },
  {
    key: "attendeesCount",
    label: "RSVP count",
    type: "number",
    placeholder: "42",
    comingSoon: "auto-calc from RSVP",
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    fullWidth: true,
    required: true,
    placeholder: "What's happening, who should come, and what to bring…",
  },
  {
    key: "tags",
    label: "Tags",
    type: "chips",
    placeholder: "hiking, outdoors, photography",
  },
];

function confirm(record) {
  return (
    typeof window !== "undefined" &&
    window.confirm(`Delete activity "${record.title}"? This cannot be undone.`)
  );
}

function ActivityCard({ record, onEdit, onDelete, seedPrefix }) {
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
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-slate-50">
          {record.title}
        </h3>
        <Badge className="h-5 shrink-0 border border-amber-400/25 bg-amber-400/10 text-[10px] font-medium text-amber-200">
          {record.attendeesCount} RSVP
        </Badge>
      </div>
      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-400">
        {record.description}
      </p>
      <div className="mt-3 flex flex-col gap-1.5 text-[11px] text-slate-400">
        <p>
          <span className="mr-1 text-amber-400/80">◷</span>
          <span className="text-slate-300">{record.date || "Date TBA"}</span>
        </p>
        <p>
          <span className="mr-1 text-slate-500">◎</span>
          {record.location || "No location"}
        </p>
      </div>
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

export default function AdminActivitiesPage() {
  const ctx = useAdminData();
  const tagOptions = useMemo(
    () =>
      Array.from(
        ctx.activities.reduce((s, a) => {
          (a.tags || []).forEach((t) => s.add(t));
          return s;
        }, new Set()),
      ).sort(),
    [ctx.activities],
  );

  return (
    <AdminEntityLayout
      entityKey="activities"
      entityLabel="Activities"
      accent="amber"
      description="Scheduled events and meetups listed on the public /activities page. Edits are reflected live across the site while the session is open."
      addButtonLabel="+ Plan activity"
      items={ctx.activities}
      seedPrefix="admin-act-"
      searchHint="title, description, location, date"
      tagOptions={tagOptions}
      matchSearch={(a, q) =>
        `${a.title} ${a.description} ${a.location} ${a.date}`
          .toLowerCase()
          .includes(q)
      }
      matchTag={(a, tag) => (a.tags || []).includes(tag)}
      fieldSchema={FIELDS}
      renderCard={({ record, seedPrefix, onEdit, onDelete }) => (
        <ActivityCard
          key={record.id}
          record={record}
          seedPrefix={seedPrefix}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      onCreate={ctx.createActivity}
      onUpdate={ctx.updateActivity}
      onDelete={ctx.deleteActivity}
      confirmDelete={confirm}
      editingInitialValues={(a) => ({
        title: a.title,
        location: a.location,
        date: a.date,
        attendeesCount: a.attendeesCount,
        description: a.description,
        tags: [...(a.tags || [])],
      })}
    />
  );
}
