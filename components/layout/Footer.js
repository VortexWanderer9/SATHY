import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
