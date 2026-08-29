import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { siteConfig } from "@/config/site";

const COLUMNS = [
  { heading: "Product", links: siteConfig.footerLinks.product },
  { heading: "Company", links: siteConfig.footerLinks.company },
  { heading: "Legal", links: siteConfig.footerLinks.legal },
];

export default function LandingFooter() {
  return (
    <footer className="mt-auto border-t border-[#EDE7DF] bg-[#FAF8F5]">
      <Container max="6xl" className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[#1B1F23]">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-xs text-sm text-[#6B6660]">
              {siteConfig.tagline}
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <p className="font-[family-name:var(--font-tag)] text-xs uppercase tracking-wide text-[#6B6660]">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label} className="flex items-center gap-2">
                    <Link
                      href={link.href}
                      className="text-sm text-[#4A4540] transition-colors hover:text-[#1B1F23]"
                    >
                      {link.label}
                    </Link>
                    {link.comingSoon && (
                      <Badge
                        variant="default"
                        className="h-5 border-0 bg-[#EDE7DF] px-2 text-[10px] font-medium text-[#6B6660]"
                      >
                        Coming soon
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[#EDE7DF] pt-6">
          <p className="text-xs text-[#6B6660]">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
