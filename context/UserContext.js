"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { mockUsers } from "@/lib/mock/users";

const UserContext = createContext(null);

let nextGeneratedUserId = mockUsers.length + 1;
function generateUserId() {
  const id = `gen-user-${nextGeneratedUserId}`;
  nextGeneratedUserId += 1;
  return id;
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const api = useMemo(
    () => ({
      currentUser,

      login(email) {
        const normalized = (email || "").trim().toLowerCase();
        const match = mockUsers.find(
          (u) => u.email.toLowerCase() === normalized,
        );
        if (match) {
          setCurrentUser({ ...match });
          return;
        }
        const newUser = {
          id: generateUserId(),
          name: normalized.split("@")[0] || "New User",
          email: normalized,
          bio: "",
          location: "",
          age: null,
          interests: [],
          avatarUrl: null,
        };
        setCurrentUser(newUser);
      },

      signup({ name, email }) {
        const normalizedEmail = (email || "").trim().toLowerCase();
        const displayName = (name || "").trim() || normalizedEmail.split("@")[0] || "New User";
        const existing = mockUsers.find(
          (u) => u.email.toLowerCase() === normalizedEmail,
        );
        if (existing) {
          setCurrentUser({ ...existing });
          return;
        }
        const newUser = {
          id: generateUserId(),
          name: displayName,
          email: normalizedEmail,
          bio: "",
          location: "",
          age: null,
          interests: [],
          avatarUrl: null,
        };
        setCurrentUser(newUser);
      },

      logout() {
        setCurrentUser(null);
      },

      updateUser(fields) {
        setCurrentUser((prev) =>
          prev ? { ...prev, ...fields } : prev,
        );
      },
    }),
    [currentUser],
  );

  return (
    <UserContext.Provider value={api}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside <UserProvider>");
  }
  return ctx;
}

export default UserContext;
