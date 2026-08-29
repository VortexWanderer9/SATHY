import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-900",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:outline-gray-500",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-500",
  outline:
    "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:outline-gray-500",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export default function Button({
  className,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
