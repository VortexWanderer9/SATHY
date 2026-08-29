import { cn } from "@/lib/utils";

const maxWidths = {
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "4xl": "max-w-4xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

export default function Container({
  className,
  children,
  max = "5xl",
  ...props
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4",
        maxWidths[max] || maxWidths["5xl"],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
