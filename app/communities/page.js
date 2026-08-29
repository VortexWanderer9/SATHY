import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { communities } from "@/lib/mock/communities";

const TAG_VARIANTS = ["info", "purple", "pink", "success", "warning", "danger"];

function pickTagVariant(index) {
  return TAG_VARIANTS[index % TAG_VARIANTS.length];
}

export default function CommunitiesPage() {
  return (
    <Container className="py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Communities</h1>
        <p className="mt-2 text-gray-600">
          Join groups of people who share your interests, from trail running to
          traditional pottery.
        </p>
      </header>

      <section
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Communities"
      >
        {communities.map((community) => (
          <Link
            key={community.id}
            href={`/communities/${community.id}`}
            className="h-full transition-transform hover:-translate-y-0.5"
          >
            <Card className="flex h-full flex-col gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-semibold text-gray-900">
                  {community.name}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {community.location}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-700">
                  {community.memberCount.toLocaleString()} members
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {community.tags.map((tag, idx) => (
                  <Badge key={tag} variant={pickTagVariant(idx)}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </Container>
  );
}
