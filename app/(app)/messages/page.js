"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useUser } from "@/context/UserContext";

const THREADS = [
  {
    id: 1,
    name: "Maya Chen",
    preview: "Still up for the sunrise hike this weekend?",
    time: "2m ago",
    unread: 2,
    participantId: "user-6",
  },
  {
    id: 2,
    name: "Trail Crew",
    preview: "Made the route list for next Friday’s meetup.",
    time: "1h ago",
    unread: 0,
    participantId: null,
  },
  {
    id: 3,
    name: "Priya N.",
    preview: "I can send you a few spots for pottery classes.",
    time: "Yesterday",
    unread: 0,
    participantId: "user-3",
  },
];

export default function MessagesPage() {
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

  return (
    <Container className="py-12">
      <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="mt-2 text-gray-600">
            Keep up with your matches, communities, and shared plans.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/make-friends">Find more people</Link>
        </Button>
      </header>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>
            <p className="text-sm text-gray-500">Recent conversations</p>
          </div>
          <Badge variant="info">3 threads</Badge>
        </div>

        <div className="mt-4 space-y-3">
          {THREADS.map((thread) => (
            <div
              key={thread.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{thread.name}</p>
                  {thread.unread > 0 && (
                    <Badge
                      variant="primary"
                      className="px-2 py-0.5 text-[10px]"
                    >
                      {thread.unread} new
                    </Badge>
                  )}
                </div>
                <p className="mt-1 truncate text-sm text-gray-600">
                  {thread.preview}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-gray-500">{thread.time}</p>
                <Button
                  asChild
                  variant={thread.participantId ? "ghost" : "ghost"}
                  size="sm"
                  className="mt-2"
                  disabled={!thread.participantId}
                >
                  <Link
                    href={
                      thread.participantId
                        ? `/profile/${thread.participantId}`
                        : "#"
                    }
                  >
                    Open
                  </Link>
                </Button>
                {!thread.participantId && (
                  <p className="mt-1 text-[10px] text-gray-400">Group thread</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Container>
  );
}
