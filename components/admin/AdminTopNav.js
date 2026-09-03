"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { adminConfig } from "@/config/admin";

function HamburgerButton({ onClick, isOpen }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-cyan-500/20 text-slate-200 transition hover:bg-slate-800/60 md:hidden"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        {isOpen ? (
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        ) : (
          <>
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </>
        )}
      </svg>
    </button>
  );
}

export default function AdminTopNav({ sidebarOpen, onToggleSidebar }) {
  const router = useRouter();
  const { currentUser, logout } = useUser();

  const handleExit = () => {
    router.push("/");
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1600px items-center gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <HamburgerButton onClick={onToggleSidebar} isOpen={sidebarOpen} />
          <Link href="/admin" className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-cyan-400/30 bg-cyan-400/10 text-[10px] font-bold tracking-widest text-cyan-300 neon-glow-cyan">
              S
            </span>
            <span className="text-base font-bold tracking-wider text-slate-50">
              {adminConfig.brand.split(" · ")[0]}
            </span>
            <span className="hidden text-xs font-semibold tracking-[0.18em] text-cyan-400/80">
              {adminConfig.brand.split(" · ")[1]}
            </span>
          </div>
          </Link>
        </div>

        <div className="hidden flex-1 md:block">
          <div className="pointer-events-none mx-auto flex h-9 w-full max-w-md items-center gap-2 rounded-md border border-slate-700/60 bg-slate-900/60 px-3 text-sm text-slate-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0">
              <circle cx="11" cy="11" r="6" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
            <span className="truncate">Global search…</span>
            <Badge
              variant="default"
              className="ml-auto h-5 border border-slate-600/60 bg-slate-800 px-1.5 text-[10px] text-slate-400"
            >
              ⌘ K
            </Badge>
            <Badge
              variant="default"
              className="h-5 border-0 bg-cyan-400/10 px-2 text-[10px] font-medium text-cyan-300"
            >
              Coming soon
            </Badge>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <Badge
            variant="warning"
            className="hidden h-6 border-0 bg-amber-500/10 text-[10px] font-medium text-amber-300 md:inline-flex"
          >
            Role gates coming soon
          </Badge>

          {currentUser && (
            <Link href="/profile" aria-label="Profile">
              <div className="flex h-9 w-9 items-center justify-center">
                <Avatar
                src={currentUser.avatarUrl || undefined}
                name={currentUser.name}
                size="sm"
                className="h-6 w-6 rounded-full border border-cyan-400/30 bg-slate-800 text-xs font-bold text-cyan-200"
              />
              </div>
            </Link>
          )}

          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExit}
              className="border border-slate-700/60 bg-slate-900/60 text-slate-200 hover:bg-slate-800/60 hover:text-slate-50"
            >
              Exit admin
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="border border-rose-500/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20 hover:text-rose-50"
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
