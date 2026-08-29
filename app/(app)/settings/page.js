"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SettingsPage() {
  const [name, setName] = useState("Sathy User");
  const [email, setEmail] = useState("you@example.com");
  const [location, setLocation] = useState("Kathmandu, NP");
  const [bio, setBio] = useState(
    "Casual hiker, amateur photographer, and perpetual board game enthusiast.",
  );

  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="py-12">
      <div className="mb-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline underline-offset-4"
        >
          ← Back to Profile
        </Link>
      </div>

      <Card>
        <form onSubmit={handleSave} className="flex flex-col gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Account</h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your display name and contact email.
            </p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Input
                label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="h-px w-full bg-gray-200" />

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm text-gray-500">
              People see this on your profile card and matches.
            </p>
            <div className="mt-5 grid gap-5">
              <Input
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <div className="flex w-full flex-col gap-1.5">
                <label
                  htmlFor="bio"
                  className="text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="submit" variant="primary" size="lg">
              Save
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
}
