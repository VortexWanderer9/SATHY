import Link from "next/link";
import Container from "@/components/ui/Container";

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: ["Features", "How it Works", "Community", "Download"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Safety"],
  },
];

export default function LandingFooter() {
  return (
    <footer className="mt-auto border-t border-[#EDE7DF] bg-[#FAF8F5]">
      <Container max="6xl" className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[#1B1F23]"
            >
              SATHY
            </Link>
            <p className="mt-3 max-w-xs text-sm text-[#6B6660]">
              Find your people, not just your feed.
            </p>
          </div>

          {FOOTER_LINKS.map((column) => (
            <div key={column.heading}>
              <p className="font-[family-name:var(--font-tag)] text-xs uppercase tracking-wide text-[#6B6660]">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-[#4A4540] transition-colors hover:text-[#1B1F23]"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[#EDE7DF] pt-6">
          <p className="text-xs text-[#6B6660]">
            © {new Date().getFullYear()} SATHY. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
