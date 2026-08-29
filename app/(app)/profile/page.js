import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";

const PROFILE_TAGS = ["hiking", "photography", "coffee", "board games"];
const TAG_VARIANTS = ["info", "purple", "pink", "success", "warning", "danger"];

function pickTagVariant(i) {
  return TAG_VARIANTS[i % TAG_VARIANTS.length];
}

export default function ProfilePage() {
  return (
    <Container className="py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline underline-offset-4"
        >
          ← Back home
        </Link>
      </div>

      <Card className="gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-5">
            <Avatar name="Sathy User" size="xl" />
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Sathy User
              </h1>
              <p className="mt-1 text-sm text-gray-500">Kathmandu, NP</p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-700">
                Casual hiker, amateur photographer, and perpetual board game
                enthusiast. Looking to meet more people around the valley who
                share the same vibe.
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {PROFILE_TAGS.map((tag, idx) => (
                  <Badge key={tag} variant={pickTagVariant(idx)}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 sm:ml-8">
            <Button asChild size="lg" variant="primary">
              <Link href="/settings">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
}
