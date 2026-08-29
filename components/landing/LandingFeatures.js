import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    label: "Discover People",
    description:
      "See real people nearby who share your specific interests — not a generic list of everyone in your zip code.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="11" cy="7.2" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M4 18c1.2-3.4 4-5 7-5s5.8 1.6 7 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Join Communities",
    description:
      "From hiking crews to book clubs to weekend photo walks — find groups built around what you already love doing.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="7.5" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="14.5" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M2.5 17c.9-2.7 2.8-4 5-4s4.1 1.3 5 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M11.5 13c2.2 0 4.1 1.3 5 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Find Activities",
    description:
      "Browse local events and meetups tied to your interests, so the connection turns into plans, not just a chat thread.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="3.5"
          y="4.5"
          width="15"
          height="14"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M3.5 8.5h15" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 2.5v3.5M15 2.5v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="8" cy="13" r="1" fill="currentColor" />
        <circle cx="12" cy="13" r="1" fill="currentColor" />
        <circle cx="16" cy="13" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

const EYEBROW = "border-0 bg-transparent p-0 font-[family-name:var(--font-tag)] text-xs uppercase tracking-wide text-[#FF5A36]";

export default function LandingFeatures() {
  return (
    <section id="features" className="border-t border-[#EDE7DF] bg-white">
      <Container max="6xl" className="py-20 lg:py-24">
        <div className="max-w-2xl">
          <Badge variant="default" className={EYEBROW}>
            what sathy does
          </Badge>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[#1B1F23] sm:text-4xl">
            Three ways to actually meet people.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card
              key={feature.label}
              className={cn(
                "rounded-2xl border-[#EDE7DF] bg-[#FAF8F5] p-6 shadow-sm",
              )}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF5A36]/12 text-[#FF5A36]">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#1B1F23]">
                {feature.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4A4540]">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
