"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { mockUsers } from "@/lib/mock/users";
import { communities as seedCommunities } from "@/lib/mock/communities";
import { activities as seedActivities } from "@/lib/mock/activities";

const AdminDataContext = createContext(null);

let nextUserId = 100;
let nextCommunityId = 100;
let nextActivityId = 100;

function slugify(str) {
  return (str || "new")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function genUserId(name) {
  nextUserId += 1;
  return `admin-user-${nextUserId}-${slugify(name)}`;
}

function genCommunityId(name) {
  nextCommunityId += 1;
  return `admin-com-${nextCommunityId}-${slugify(name)}`;
}

function genActivityId(title) {
  nextActivityId += 1;
  return `admin-act-${nextActivityId}-${slugify(title)}`;
}

function parseCsvString(raw) {
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (!raw) return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function AdminDataProvider({ children }) {
  const [users, setUsers] = useState(() =>
    mockUsers.map((u) => ({ ...u })),
  );
  const [communities, setCommunities] = useState(() =>
    seedCommunities.map((c) => ({ ...c, tags: [...(c.tags || [])] })),
  );
  const [activities, setActivities] = useState(() =>
    seedActivities.map((a) => ({ ...a, tags: [...(a.tags || [])] })),
  );

  const api = useMemo(() => {
    const createUser = (fields) => {
      const name = fields.name?.trim() || "New User";
      const record = {
        id: genUserId(name),
        name,
        email: fields.email?.trim() || `${slugify(name)}@example.com`,
        bio: fields.bio?.trim() || "This user hasn't written a bio yet.",
        location: fields.location?.trim() || "Kathmandu, NP",
        age: Number(fields.age) || 0,
        interests: parseCsvString(fields.interests),
        avatarUrl: null,
      };
      setUsers((prev) => [record, ...prev]);
      return record;
    };

    const updateUser = (id, fields) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? {
                ...u,
                ...(fields.name !== undefined ? { name: fields.name } : {}),
                ...(fields.email !== undefined ? { email: fields.email } : {}),
                ...(fields.bio !== undefined ? { bio: fields.bio } : {}),
                ...(fields.location !== undefined
                  ? { location: fields.location }
                  : {}),
                ...(fields.age !== undefined
                  ? { age: Number(fields.age) || 0 }
                  : {}),
                ...(fields.interests !== undefined
                  ? { interests: parseCsvString(fields.interests) }
                  : {}),
              }
            : u,
        ),
      );
    };

    const deleteUser = (id) => {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    const createCommunity = (fields) => {
      const name = fields.name?.trim() || "New Community";
      const record = {
        id: genCommunityId(name),
        name,
        description:
          fields.description?.trim() || "A place to share interests.",
        tags: parseCsvString(fields.tags),
        location: fields.location?.trim() || "Kathmandu, NP",
        memberCount: Number(fields.memberCount) || 1,
        imageUrl: null,
      };
      setCommunities((prev) => [record, ...prev]);
      return record;
    };

    const updateCommunity = (id, fields) => {
      setCommunities((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                ...(fields.name !== undefined ? { name: fields.name } : {}),
                ...(fields.description !== undefined
                  ? { description: fields.description }
                  : {}),
                ...(fields.tags !== undefined
                  ? { tags: parseCsvString(fields.tags) }
                  : {}),
                ...(fields.location !== undefined
                  ? { location: fields.location }
                  : {}),
                ...(fields.memberCount !== undefined
                  ? { memberCount: Number(fields.memberCount) || 0 }
                  : {}),
              }
            : c,
        ),
      );
    };

    const deleteCommunity = (id) => {
      setCommunities((prev) => prev.filter((c) => c.id !== id));
    };

    const createActivity = (fields) => {
      const title = fields.title?.trim() || "New Activity";
      const record = {
        id: genActivityId(title),
        title,
        description:
          fields.description?.trim() || "Join us for a shared experience.",
        tags: parseCsvString(fields.tags),
        location: fields.location?.trim() || "Kathmandu, NP",
        date: fields.date?.trim() || "TBA",
        attendeesCount: Number(fields.attendeesCount) || 0,
        imageUrl: null,
      };
      setActivities((prev) => [record, ...prev]);
      return record;
    };

    const updateActivity = (id, fields) => {
      setActivities((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                ...(fields.title !== undefined ? { title: fields.title } : {}),
                ...(fields.description !== undefined
                  ? { description: fields.description }
                  : {}),
                ...(fields.tags !== undefined
                  ? { tags: parseCsvString(fields.tags) }
                  : {}),
                ...(fields.location !== undefined
                  ? { location: fields.location }
                  : {}),
                ...(fields.date !== undefined ? { date: fields.date } : {}),
                ...(fields.attendeesCount !== undefined
                  ? { attendeesCount: Number(fields.attendeesCount) || 0 }
                  : {}),
              }
            : a,
        ),
      );
    };

    const deleteActivity = (id) => {
      setActivities((prev) => prev.filter((a) => a.id !== id));
    };

    return {
      users,
      communities,
      activities,
      userCount: users.length,
      communityCount: communities.length,
      activityCount: activities.length,
      counts: {
        users: users.length,
        communities: communities.length,
        activities: activities.length,
      },
      createUser,
      updateUser,
      deleteUser,
      createCommunity,
      updateCommunity,
      deleteCommunity,
      createActivity,
      updateActivity,
      deleteActivity,
    };
  }, [users, communities, activities]);

  return (
    <AdminDataContext.Provider value={api}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) {
    throw new Error("useAdminData must be used within AdminDataProvider");
  }
  return ctx;
}
