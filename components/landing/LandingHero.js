import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const BRAND_PRIMARY = "bg-[#FF5A36] hover:bg-[#E64A28] text-white focus-visible:outline-[#FF5A36]";
const BRAND_BORDER = "border-[#EDE7DF] bg-white text-[#1B1F23] hover:bg-[#EDE7DF]/60 focus-visible:outline-[#EDE7DF]";
const BRAND_BADGE_PILL = "border-[#EDE7DF] bg-white text-[#6B6660] font-[family-name:var(--font-tag)] tracking-normal";

export default function LandingHero() {
  return (
    <Container max="6xl" className="pb-20 pt-16 sm:pt-24 lg:pb-28">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div>
          <Badge
            variant="default"
            className={cn("gap-2 px-3 py-1", BRAND_BADGE_PILL)}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5A36]" />
            now matching in 40+ cities
          </Badge>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-[#1B1F23] sm:text-5xl lg:text-6xl">
            Find your people,
            <br />
            not just your feed.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#4A4540]">
            Tell SATHY what you&apos;re into and where you are. We&apos;ll help
            you find the people, communities, and activities nearby that
            actually match — so you can meet up in real life, not just scroll
            past each other.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              asChild
              variant="primary"
              shape="pill"
              size="lg"
              className={cn("px-7 py-3.5", BRAND_PRIMARY)}
            >
              <Link href="#">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              shape="pill"
              size="lg"
              className={cn("px-7 py-3.5", BRAND_BORDER)}
            >
              <Link href="#">Log In</Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-[#6B6660]">
            Free to join. No swiping, no cold networking — just shared
            interests.
          </p>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-md sm:h-[460px]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 400 460"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M120 130 C 180 170, 190 210, 230 250"
              stroke="#FF5A36"
              strokeOpacity="0.45"
              strokeWidth="2"
              strokeDasharray="5 7"
            />
            <path
              d="M230 250 C 210 300, 170 320, 130 355"
              stroke="#14453D"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeDasharray="5 7"
            />
          </svg>

          <div className="absolute left-0 top-4 w-52 sm:w-56">
            <Card
              className={cn(
                "gap-4 rounded-2xl border-[#EDE7DF] p-4 shadow-md",
              )}
            >
              <div className="flex items-center gap-3">
                <Avatar
                  name="Maya R."
                  className="h-10 w-10 ring-0 bg-[#FF5A36]/15 text-[#FF5A36] font-[family-name:var(--font-display)] font-bold"
                />
                <div>
                  <p className="text-sm font-semibold text-[#1B1F23]">
                    Maya R.
                  </p>
                  <Badge
                    variant="default"
                    className="border-0 bg-transparent p-0 font-[family-name:var(--font-tag)] text-[11px] font-normal text-[#6B6660]"
                  >
                    2.4 mi away
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Badge
                  variant="default"
                  className="border-0 bg-[#FAF3EE] px-2.5 py-1 font-[family-name:var(--font-tag)] text-[11px] text-[#B4441F]"
                >
                  #hiking
                </Badge>
                <Badge
                  variant="default"
                  className="border-0 bg-[#FAF3EE] px-2.5 py-1 font-[family-name:var(--font-tag)] text-[11px] text-[#B4441F]"
                >
                  #film photography
                </Badge>
              </div>
            </Card>
          </div>

          <div className="absolute left-24 top-[190px] w-48 sm:w-52">
            <Card
              className={cn(
                "gap-2 rounded-2xl border-[#EDE7DF] p-4 shadow-md",
              )}
            >
              <Badge
                variant="default"
                className="border-0 bg-transparent p-0 font-[family-name:var(--font-tag)] text-[11px] uppercase tracking-wide text-[#6B6660]"
              >
                community
              </Badge>
              <p className="text-sm font-semibold text-[#1B1F23]">
                Ridge &amp; Trail Hikers
              </p>
              <Badge
                variant="default"
                className="border-0 bg-transparent p-0 text-xs text-[#6B6660]"
              >
                312 members nearby
              </Badge>
            </Card>
          </div>

          <div className="absolute bottom-0 left-4 w-56 sm:w-60">
            <Card
              className={cn(
                "gap-2 rounded-2xl border-0 bg-[#14453D] p-4 text-white shadow-md",
              )}
            >
              <Badge
                variant="default"
                className="border-0 bg-transparent p-0 font-[family-name:var(--font-tag)] text-[11px] uppercase tracking-wide text-white/60"
              >
                activity · sat 9am
              </Badge>
              <p className="text-sm font-semibold">Sunrise trail meetup</p>
              <Badge
                variant="default"
                className="border-0 bg-transparent p-0 text-xs text-white/70"
              >
                Griffith Park — 8 going
              </Badge>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
