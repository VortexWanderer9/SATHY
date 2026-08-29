"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Community", href: "#community" },
];

const BRAND_PRIMARY =
  "bg-[#FF5A36] hover:bg-[#E64A28] text-white focus-visible:outline-[#FF5A36]";
const BRAND_GHOST =
  "text-[#1B1F23] hover:bg-[#EDE7DF]/60 focus-visible:outline-[#EDE7DF]";
const BRAND_BORDER =
  "border-[#EDE7DF] bg-white text-[#1B1F23] hover:bg-[#EDE7DF]/60 focus-visible:outline-[#EDE7DF]";

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#EDE7DF] bg-[#FAF8F5]/90 backdrop-blur">
      <Container max="6xl" className="py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="#"
            className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[#1B1F23]"
          >
            SATHY
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
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
            <Button
              asChild
              variant="ghost"
              shape="pill"
              className={BRAND_GHOST}
            >
              <Link href="#">Log In</Link>
            </Button>
            <Button
              asChild
              variant="primary"
              shape="pill"
              className={BRAND_PRIMARY}
            >
              <Link href="#">Get Started</Link>
            </Button>
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
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#1B1F23]/80 hover:bg-[#EDE7DF]/60"
                  >
                    <Badge
                      variant="default"
                      className={cn(
                        "border-0 bg-transparent p-0 text-[13px] font-medium text-[#1B1F23]/80 hover:text-[#1B1F23]",
                      )}
                    >
                      {link.label}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              <Button
                asChild
                variant="outline"
                shape="pill"
                className={cn(BRAND_BORDER, "justify-center")}
              >
                <Link href="#" onClick={() => setIsMenuOpen(false)}>
                  Log In
                </Link>
              </Button>
              <Button
                asChild
                variant="primary"
                shape="pill"
                className={cn(BRAND_PRIMARY, "justify-center")}
              >
                <Link href="#" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
