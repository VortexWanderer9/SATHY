import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { activities } from "@/lib/mock/activities";

const TAG_VARIANTS = ["info", "purple", "pink", "success", "warning", "danger"];

function pickTagVariant(index) {
  return TAG_VARIANTS[index % TAG_VARIANTS.length];
}

export default function ActivitiesPage() {
  return (
    <Container className="py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Activities</h1>
        <p className="mt-2 text-gray-600">
          Find upcoming events, meetups, and workshops to attend in person.
        </p>
      </header>

      <section
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Activities"
      >
        {activities.map((activity) => (
          <Link
            key={activity.id}
            href={`/activities/${activity.id}`}
            className="h-full transition-transform hover:-translate-y-0.5"
          >
            <Card className="flex h-full flex-col gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-600">
                  {activity.date}
                </p>
                <h2 className="mt-1 text-base font-semibold text-gray-900">
                  {activity.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {activity.location}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-700">
                  {activity.attendeesCount.toLocaleString()} attending
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {activity.tags.map((tag, idx) => (
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
