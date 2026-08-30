"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const router = useRouter();
  const { currentUser, logout } = useUser();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  return (
    <header className="border-b border-gray-200">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900"
            onClick={() => setOpen(false)}
          >
            {siteConfig.name}
          </Link>

          <ul className="hidden items-center gap-6 md:flex">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            {currentUser ? (
              <>
                <Link href="/profile" aria-label="Profile">
                  <Avatar
                    src={currentUser.avatarUrl || undefined}
                    name={currentUser.name}
                    size="sm"
                    className="cursor-pointer"
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="md">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild variant="primary" size="md">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="md"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="w-10 px-0 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </Button>
        </nav>

        {open && (
          <div className="pb-4 md:hidden">
            <ul className="flex flex-col gap-1">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              {currentUser ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    <Avatar
                      src={currentUser.avatarUrl || undefined}
                      name={currentUser.name}
                      size="sm"
                    />
                    <span>{currentUser.name}</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={handleLogout}
                    className="justify-start text-gray-600 hover:text-gray-900"
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    size="md"
                    className="justify-center"
                  >
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Log In
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="primary"
                    size="md"
                    className="justify-center"
                  >
                    <Link href="/signup" onClick={() => setOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
