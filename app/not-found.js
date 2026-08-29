import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="text-blue-600 underline">
        Go back home
      </Link>
    </div>
  );
}
