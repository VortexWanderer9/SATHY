import { Children, cloneElement, isValidElement } from "react";
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

const shapes = {
  md: "rounded-md",
  pill: "rounded-full",
};

export default function Button({
  asChild = false,
  className,
  variant = "primary",
  size = "md",
  shape = "md",
  disabled = false,
  type = "button",
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-colors",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    shapes[shape] || shapes.md,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className,
  );

  if (asChild && isValidElement(Children.only(children))) {
    const child = Children.only(children);
    return cloneElement(child, {
      className: cn(child.props.className, classes),
      ...props,
    });
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
