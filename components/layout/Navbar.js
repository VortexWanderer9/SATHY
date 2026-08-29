import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * Top navigation bar.
 * `siteConfig.navLinks` is empty for now — add entries there (not here)
 * once real routes like Discover/Communities/Activities exist.
 */
export default function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          {siteConfig.name}
        </Link>

        {siteConfig.navLinks.length > 0 && (
          <ul className="flex items-center gap-6">
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
        )}
      </nav>
    </header>
  );
}
