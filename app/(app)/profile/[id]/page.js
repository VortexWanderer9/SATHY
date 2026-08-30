"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useUser } from "@/context/UserContext";
import { mockUsers } from "@/lib/mock/users";

const TAG_VARIANTS = ["info", "purple", "pink", "success", "warning", "danger"];

function pickTagVariant(i) {
  return TAG_VARIANTS[i % TAG_VARIANTS.length];
}

const AGE_VARIANT = "default";
const LOCATION_VARIANT = "info";

export default function OtherProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useUser();

  const id = typeof params.id === "string" ? params.id : "";

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
      return;
    }
    if (id === currentUser.id) {
      router.replace("/profile");
    }
  }, [currentUser, router, id]);

  if (!currentUser) {
    return null;
  }

  if (id === currentUser.id) {
    return null;
  }

  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return (
      <Container className="py-12">
        <div className="mb-6">
          <Link
            href="/make-friends"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline underline-offset-4"
          >
            ← Back to Make Friends
          </Link>
        </div>
        <Card className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">User not found</h1>
          <p className="mt-2 text-sm text-gray-600">
            The person you&apos;re looking for doesn&apos;t exist or has left
            SATHY.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href="/make-friends">Browse people</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/discover">Go to Discover</Link>
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  const interests = Array.isArray(user.interests) ? user.interests : [];
  const ageLabel = user.age ? `${user.age} yrs` : null;
  const locationLabel = user.location || null;

  return (
    <Container className="py-12">
      <div className="mb-6">
        <Link
          href="/make-friends"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline underline-offset-4"
        >
          ← Back to Make Friends
        </Link>
      </div>

      <Card className="gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-5">
            <Avatar
              src={user.avatarUrl || undefined}
              name={user.name}
              alt={user.name}
              size="xl"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {user.name || "Untitled profile"}
                </h1>
                {ageLabel && (
                  <Badge variant={AGE_VARIANT}>{ageLabel}</Badge>
                )}
                {locationLabel && (
                  <Badge variant={LOCATION_VARIANT}>{locationLabel}</Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {locationLabel || "No location set"}
              </p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-700">
                {user.bio ||
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

          <div className="flex shrink-0 flex-col gap-3 sm:ml-8 sm:items-end">
            <Button asChild size="lg" variant="primary">
              <Link href="/messages">Send Message</Link>
            </Button>
            <Button size="lg" variant="secondary" disabled>
              Add Friend
            </Button>
            <p className="text-[11px] text-gray-400">
              Coming soon — no backend yet
            </p>
          </div>
        </div>
      </Card>
    </Container>
  );
}
