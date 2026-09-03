"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { AdminDataProvider } from "@/context/AdminDataContext";
import AdminTopNav from "@/components/admin/AdminTopNav";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { currentUser } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [guarded, setGuarded] = useState(false);

  useEffect(() => {
    if (!guarded && currentUser === null) {
      router.push("/login");
    }
    setGuarded(true);
  }, [currentUser, guarded, router]);

  if (!guarded || !currentUser) {
    return (
      <div className="admin-dark min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto flex h-screen max-w-5xl items-center justify-center px-6">
          <div className="hud-border flex flex-col items-center gap-3 rounded-xl px-8 py-10">
            <div className="h-6 w-6 animate-pulse rounded-full border-2 border-cyan-400/40 border-t-cyan-400" />
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-400/70">
              Authenticating
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dark min-h-screen bg-slate-950 text-slate-100 hud-grid-bg">
      <AdminDataProvider>
        <AdminTopNav
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="min-h-[calc(100vh-4rem)] md:pl-64">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-8 md:px-8 md:py-10">
            {children}
          </div>
        </main>
      </AdminDataProvider>
    </div>
  );
}
