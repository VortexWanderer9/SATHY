import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { discoverItems } from "@/lib/mock/discover";

const TAG_VARIANTS = ["info", "purple", "pink", "success", "warning", "danger"];

function pickTagVariant(index) {
  return TAG_VARIANTS[index % TAG_VARIANTS.length];
}

const people = discoverItems.filter((i) => i.type === "person");

export default function MakeFriendsPage() {
  return (
    <Container className="py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Make Friends</h1>
        <p className="mt-2 text-gray-600">
          People nearby who share your interests — click through to say hi and plan a real
          hangout.
        </p>
      </header>

      <section
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="People"
      >
        {people.map((person) => (
          <Card
            key={person.id}
            className="flex h-full flex-col gap-4"
          >
            <div className="flex items-start gap-4">
              <Avatar
                src={person.avatarUrl || undefined}
                name={person.name}
                alt={person.name}
                size="lg"
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-semibold text-gray-900">
                  {person.name}
                </h2>
                <p className="mt-0.5 text-sm text-gray-500">
                  {person.location}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {person.tags.map((tag, idx) => (
                <Badge key={tag} variant={pickTagVariant(idx)}>
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-auto flex justify-end pt-2">
              <Link
                href={`/discover`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline underline-offset-4"
              >
                View details →
              </Link>
            </div>
          </Card>
        ))}
      </section>
    </Container>
  );
}
