"use client";

import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { discoverItems } from "@/lib/mock/discover";
import { cn } from "@/lib/utils";

const TYPE_FILTERS = [
  { key: "all", label: "All", value: null },
  { key: "person", label: "People", value: "person" },
  { key: "community", label: "Communities", value: "community" },
  { key: "activity", label: "Activities", value: "activity" },
];

const TAG_VARIANTS = ["info", "purple", "pink", "success", "warning", "danger"];

function pickTagVariant(index) {
  return TAG_VARIANTS[index % TAG_VARIANTS.length];
}

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return discoverItems.filter((item) => {
      const matchesType =
        activeType === "all" ? true : item.type === activeType;
      if (!matchesType) return false;
      if (!q) return true;
      if (item.name.toLowerCase().includes(q)) return true;
      return item.tags.some((tag) => tag.toLowerCase().includes(q));
    });
  }, [search, activeType]);

  return (
    <Container className="py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Discover</h1>
        <p className="mt-2 text-gray-600">
          Find people, communities, and activities matched to your interests
          and location.
        </p>
      </header>

      <section className="mb-8 flex flex-col gap-4">
        <Input
          label="Search"
          placeholder="Search by name or interest (e.g. hiking, yoga, pottery)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
        />

        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by type"
        >
          {TYPE_FILTERS.map((f) => {
            const active = f.key === activeType;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveType(f.key)}
                aria-pressed={active}
              >
                <Badge
                  variant={active ? "primary" : "default"}
                  className={cn(
                    "cursor-pointer transition-colors",
                    active
                      ? "bg-gray-900 text-white border-gray-900"
                      : "hover:bg-gray-200",
                  )}
                >
                  {f.label}
                </Badge>
              </button>
            );
          })}
        </div>
      </section>

      {filtered.length === 0 ? (
        <section className="py-16 text-center">
          <p className="text-base text-gray-500">No results found.</p>
          <p className="mt-1 text-sm text-gray-400">
            Try adjusting your search or clearing the type filter.
          </p>
        </section>
      ) : (
        <section
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Discover results"
        >
          {filtered.map((item) => (
            <Card key={item.id} className="flex h-full flex-col gap-4">
              <div className="flex items-start gap-4">
                <Avatar
                  src={item.avatarUrl || undefined}
                  name={item.name}
                  alt={item.name}
                  size="lg"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="info" className="capitalize">
                      {item.type}
                    </Badge>
                  </div>
                  <h2 className="mt-1 text-base font-semibold text-gray-900">
                    {item.name}
                  </h2>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {item.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag, idx) => (
                  <Badge key={tag} variant={pickTagVariant(idx)}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </section>
      )}
    </Container>
  );
}
