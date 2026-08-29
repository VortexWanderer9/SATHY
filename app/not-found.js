import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild variant="primary">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </Container>
  );
}
