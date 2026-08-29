import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

const STEPS = [
  {
    number: "01",
    title: "Tell us your interests",
    description:
      "Pick the things you're actually into — hiking, gaming, ceramics, whatever — and set the area you want to connect in.",
  },
  {
    number: "02",
    title: "Discover people & communities near you",
    description:
      "SATHY surfaces the people and groups closest to your interests and your location, not a random citywide feed.",
  },
  {
    number: "03",
    title: "Join activities and connect",
    description:
      "RSVP to a meetup, join a group chat, or say hi directly. The goal is a real hangout, not another endless DM thread.",
  },
];

const EYEBROW = "border-0 bg-transparent p-0 font-[family-name:var(--font-tag)] text-xs uppercase tracking-wide text-[#FF5A36]";

export default function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#FAF8F5]">
      <Container max="6xl" className="py-20 lg:py-24">
        <div className="max-w-2xl">
          <Badge variant="default" className={EYEBROW}>
            how it works
          </Badge>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[#1B1F23] sm:text-4xl">
            From interests to a real hangout in three steps.
          </h2>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex items-center gap-4 lg:block">
                <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-[#FF5A36]/25 sm:text-5xl">
                  {step.number}
                </span>
                <div className="hidden h-px flex-1 bg-[#EDE7DF] lg:mt-6 lg:block" />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[#1B1F23] lg:mt-5">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4A4540]">
                {step.description}
              </p>
              {index < STEPS.length - 1 && (
                <div className="mt-8 h-px w-full bg-[#EDE7DF] lg:hidden" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
