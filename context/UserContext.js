"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { mockUsers } from "@/lib/mock/users";

const UserContext = createContext(null);
const STORAGE_KEY = "sathy-current-user";

let nextGeneratedUserId = mockUsers.length + 1;
function generateUserId() {
  const id = `gen-user-${nextGeneratedUserId}`;
  nextGeneratedUserId += 1;
  return id;
}

function readStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const didRestore = useRef(false);

  useEffect(() => {
    if (didRestore.current) return;
    didRestore.current = true;
    queueMicrotask(() => {
      const stored = readStoredUser();
      if (stored) {
        setCurrentUser(stored);
      }
    });
  }, []);

  useEffect(() => {
    if (!didRestore.current) return;
    if (currentUser) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
      } catch {
        /* ignore quota / serialization errors */
      }
    } else {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }, [currentUser]);

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
        const displayName =
          (name || "").trim() || normalizedEmail.split("@")[0] || "New User";
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
        setCurrentUser((prev) => (prev ? { ...prev, ...fields } : prev));
      },
    }),
    [currentUser],
  );

  return <UserContext.Provider value={api}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside <UserProvider>");
  }
  return ctx;
}

export default UserContext;
