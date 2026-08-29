/**
 * Simple site footer.
 */
export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} SATHY. All rights reserved.
      </div>
    </footer>
  );
}
