/**
 * Combines class name strings, filtering out falsy values.
 * Useful for conditionally applying Tailwind classes.
 *
 * Example: cn("p-4", isActive && "bg-blue-500")
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
