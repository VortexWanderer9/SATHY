"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

const BRAND_PRIMARY =
  "bg-[#FF5A36] hover:bg-[#E64A28] text-white focus-visible:outline-[#FF5A36]";
const BRAND_BORDER =
  "border-[#EDE7DF] bg-white text-[#1B1F23] hover:bg-[#EDE7DF]/60 focus-visible:outline-[#EDE7DF]";

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#EDE7DF] bg-[#FAF8F5]/90 backdrop-blur">
      <Container max="6xl" className="py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[#1B1F23]"
            onClick={() => setIsMenuOpen(false)}
          >
            {siteConfig.name}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[#1B1F23]/70 transition-colors hover:text-[#1B1F23]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <Link href="/profile" aria-label="Profile">
                <Avatar
                  name="Sathy User"
                  size="sm"
                  className="cursor-pointer ring-2 ring-[#EDE7DF]"
                />
              </Link>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="md"
                  shape="pill"
                  className={BRAND_BORDER}
                >
                  <Link href="/login">Log In</Link>
                </Button>
                <Button
                  asChild
                  variant="primary"
                  size="md"
                  shape="pill"
                  className={BRAND_PRIMARY}
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="md"
            shape="pill"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="w-10 px-0 border-[#EDE7DF] text-[#1B1F23] hover:bg-[#EDE7DF]/60 focus-visible:outline-[#EDE7DF] md:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  d="M4 4L16 16M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </Button>
        </nav>
      </Container>

      {isMenuOpen && (
        <div className="border-t border-[#EDE7DF] bg-[#FAF8F5] md:hidden">
          <Container max="6xl" className="pb-6 pt-2">
            <ul className="flex flex-col gap-1">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#1B1F23]/80 hover:bg-[#EDE7DF]/60"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              {isLoggedIn ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#1B1F23]/80 hover:bg-[#EDE7DF]/60"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Avatar
                    name="Sathy User"
                    size="sm"
                    className="ring-2 ring-[#EDE7DF]"
                  />
                  <span>Profile</span>
                </Link>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    shape="pill"
                    className={cn(BRAND_BORDER, "justify-center")}
                  >
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Log In
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="primary"
                    shape="pill"
                    className={cn(BRAND_PRIMARY, "justify-center")}
                  >
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
