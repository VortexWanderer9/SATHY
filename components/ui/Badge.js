import { cn } from "@/lib/utils";

const variants = {
  default: "bg-gray-100 text-gray-700 border-gray-200",
  primary: "bg-gray-900 text-white border-gray-900",
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  pink: "bg-pink-50 text-pink-700 border-pink-200",
};

export default function Badge({
  className,
  variant = "default",
  children,
  ...props
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant] || variants.default,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
