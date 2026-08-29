import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { siteConfig } from "@/config/site";

const COLUMNS = [
  { heading: "Product", links: siteConfig.footerLinks.product },
  { heading: "Company", links: siteConfig.footerLinks.company },
  { heading: "Legal", links: siteConfig.footerLinks.legal },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="text-xl font-bold text-gray-900">{siteConfig.name}</p>
            <p className="mt-3 max-w-xs text-sm text-gray-500">
              {siteConfig.tagline}
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label} className="flex items-center gap-2">
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                    {link.comingSoon && (
                      <Badge variant="default" className="h-5 border-0 bg-gray-100 px-2 text-[10px] font-medium text-gray-500">
                        Coming soon
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
