import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { activities } from "@/lib/mock/activities";

const TAG_VARIANTS = ["info", "purple", "pink", "success", "warning", "danger"];

function pickTagVariant(index) {
  return TAG_VARIANTS[index % TAG_VARIANTS.length];
}

export default async function ActivityDetailPage({ params }) {
  const resolvedParams = await params;
  const activity = activities.find((a) => a.id === resolvedParams.id);

  if (!activity) {
    notFound();
  }

  return (
    <Container className="py-12">
      <Card className="gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {activity.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
              <span className="font-semibold text-gray-900">
                {activity.date}
              </span>
              <span className="text-gray-300" aria-hidden="true">
                ·
              </span>
              <span>{activity.location}</span>
              <span className="text-gray-300" aria-hidden="true">
                ·
              </span>
              <span>{activity.attendeesCount.toLocaleString()} attending</span>
            </div>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
              {activity.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {activity.tags.map((tag, idx) => (
                <Badge key={tag} variant={pickTagVariant(idx)}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="shrink-0 lg:ml-8">
            <Button size="lg">RSVP</Button>
          </div>
        </div>
      </Card>
    </Container>
  );
}
