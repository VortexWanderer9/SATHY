import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const BRAND_PRIMARY = "bg-[#FF5A36] hover:bg-[#E64A28] text-white focus-visible:outline-[#FF5A36]";

export default function LandingCTA() {
  return (
    <section className="bg-[#14453D]">
      <Container
        max="6xl"
        className="py-16 text-center sm:py-20"
      >
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to find your people?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-white/70">
          It takes two minutes to set up your interests. The rest is just
          showing up.
        </p>
        <div className="mt-8">
          <Button
            asChild
            variant="primary"
            shape="pill"
            size="lg"
            className={cn("px-8 py-3.5", BRAND_PRIMARY)}
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
