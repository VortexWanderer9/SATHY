import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl",
};

function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export default function Avatar({
  className,
  src,
  alt,
  name,
  size = "md",
  ...props
}) {
  const initials = getInitials(name || alt);
  const sizeClass = sizes[size] || sizes.md;

  return (
    <div
      className={cn(
        "relative inline-flex overflow-hidden rounded-full bg-gray-200 ring-2 ring-white",
        sizeClass,
        className,
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || name || ""}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center font-medium text-gray-600">
          {initials}
        </span>
      )}
    </div>
  );
}
