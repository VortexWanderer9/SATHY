"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useUser } from "@/context/UserContext";

const TAG_VARIANTS = ["info", "purple", "pink", "success", "warning", "danger"];

function pickTagVariant(i) {
  return TAG_VARIANTS[i % TAG_VARIANTS.length];
}

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser } = useUser();

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  const interests = Array.isArray(currentUser.interests)
    ? currentUser.interests
    : [];

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
            <Avatar
              src={currentUser.avatarUrl || undefined}
              name={currentUser.name}
              size="xl"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {currentUser.name || "Untitled profile"}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {currentUser.location || "No location set"}
              </p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-700">
                {currentUser.bio ||
                  "This user hasn't written a bio yet. Say hi and start the conversation!"}
              </p>

              {interests.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {interests.map((tag, idx) => (
                    <Badge key={tag} variant={pickTagVariant(idx)}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-xs italic text-gray-500">
                  No interests listed yet.
                </p>
              )}
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
