import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Jordan P.",
    location: "Austin, TX",
    quote:
      "I moved to Austin knowing nobody. Three weeks on SATHY and I had a standing Sunday climbing group. It actually got me off my couch.",
  },
  {
    name: "Sofia N.",
    location: "Portland, OR",
    quote:
      "Every other app was either dating or LinkedIn. SATHY was the first one where 'making friends' didn't feel like a weird category.",
  },
  {
    name: "Devon K.",
    location: "Chicago, IL",
    quote:
      "Found a board game group two blocks from my apartment I didn't even know existed. Now it's the best part of my week.",
  },
];

const EYEBROW = "border-0 bg-transparent p-0 font-[family-name:var(--font-tag)] text-xs uppercase tracking-wide text-[#FF5A36]";

export default function LandingTestimonials() {
  return (
    <section id="community" className="border-t border-[#EDE7DF] bg-white">
      <Container max="6xl" className="py-20 lg:py-24">
        <div className="max-w-2xl">
          <Badge variant="default" className={EYEBROW}>
            the community
          </Badge>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[#1B1F23] sm:text-4xl">
            People who found their people.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <Card
              key={testimonial.name}
              className={cn(
                "h-full rounded-2xl border-[#EDE7DF] bg-[#FAF8F5] p-6 shadow-sm",
              )}
            >
              <figure className="flex h-full flex-col">
                <blockquote className="flex-1 text-sm leading-relaxed text-[#4A4540]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Avatar
                    name={testimonial.name}
                    className="h-10 w-10 ring-0 bg-[#14453D]/10 text-[#14453D] font-[family-name:var(--font-display)] font-bold"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#1B1F23]">
                      {testimonial.name}
                    </p>
                    <Badge
                      variant="default"
                      className="border-0 bg-transparent p-0 font-[family-name:var(--font-tag)] text-xs text-[#6B6660]"
                    >
                      {testimonial.location}
                    </Badge>
                  </div>
                </figcaption>
              </figure>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
